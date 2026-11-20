"""Post-pass: placeholder files for references that could not be acquired.

Every unresolved ref (an external CDN file the capture never got, a relative
path pointing at something absent from the mirror, a runtime fetch of a
query-string URL) leaves a 404 in the mirror — and many game loaders hang
forever waiting for it ("Caricamento 90%…"). This pass scans the REWRITTEN
mirror for references, computes the local path each one maps to (the same
canonical algorithm as rewrite.url_to_rel / interceptor.js u2r(), plus plain
relative joins on the mirror layout for relative refs) and, wherever the
file is missing, writes a minimal placeholder:

  js/css/json → tiny valid text stubs · png/jpg/webp/gif/ico → 1×1 images
  (PIL) · svg → 1×1 vector · wav → 44-byte silent clip · xml → empty root
  document · everything else → empty file (still a 200 instead of a 404,
  which is what unblocks the loader).

Results go to reports/stubs.json; reports/depgraph.json's unresolved_refs
list is pruned accordingly. Purely additive — it never touches existing files.
"""
import io
import json
import posixpath
import re
import struct
from pathlib import Path
from urllib.parse import urlsplit, urlunsplit

from bs4 import BeautifulSoup

from . import rewrite as rw

_SCHEME_RE = re.compile(r"^[a-zA-Z][a-zA-Z0-9+.\-]*:")
# ONLY image/audio formats with always-valid placeholder content get stubbed.
# Everything else (js/json/wasm/fonts/webp/data…) is left 404-ing on purpose:
# an empty/corrupt 200 hard-crashes or silently empties loaders that handled
# a missing file gracefully — proven regression on a working 91/100 game.
SAFE_STUB_EXTS = {".png", ".jpg", ".jpeg", ".gif", ".bmp", ".ico", ".svg", ".wav", ".webp"}
# relative asset paths quoted in JS code — whitelist of asset extensions only,
# so API endpoints ("api/level?id=2") and version strings never get stubbed
_JS_REL_ASSET = re.compile(
    r'(["\'])((?:\.{0,2}/)?[\w\-./@]+?\.(?:json|wasm|unity3d|unityweb|bin|pck|pak|data|'
    r'bundle|manifest|atlas|fnt|bytes|asset|res|xml|csv|tsv|mp3|ogg|m4a|wav|png|jpg|'
    r'jpeg|webp|gif|ttf|otf|woff|woff2|mp4|webm))\1', re.I)


def _wav_silent():
    hdr = b"RIFF" + struct.pack("<I", 36) + b"WAVE"
    hdr += b"fmt " + struct.pack("<IHHIIHH", 16, 1, 1, 22050, 22050, 1, 16)
    return hdr + b"data" + struct.pack("<I", 0)


def _stub_bytes(rel):
    ext = Path(rel).suffix.lower()
    if ext in (".js", ".mjs"):
        return b"/* ugs-stub: placeholder for a reference that could not be acquired */\n"
    if ext == ".css":
        return b"/* ugs-stub */\n"
    if ext in (".json", ".map"):
        return b"{}"
    if ext == ".xml":
        return b'<?xml version="1.0"?>\n<root/>\n'
    if ext == ".svg":
        return (b'<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"></svg>\n')
    if ext in (".html", ".htm"):
        return b"<!doctype html>\n"
    if ext in (".png", ".gif", ".jpg", ".jpeg", ".webp", ".ico", ".bmp"):
        try:
            from PIL import Image
            fmt = {"jpg": "JPEG", "jpeg": "JPEG"}.get(ext[1:], ext[1:].upper())
            img = Image.new("RGB" if fmt == "JPEG" else "RGBA", (1, 1),
                            (255, 255, 255) if fmt == "JPEG" else (0, 0, 0, 0))
            buf = io.BytesIO()
            img.save(buf, fmt)
            return buf.getvalue()
        except Exception:
            return b""
    if ext == ".wav":
        return _wav_silent()
    return b""


def _rels_for(src_rel, v):
    """Local mirror paths a reference value could resolve to at runtime."""
    v = (v or "").strip()
    if not v:
        return []
    if v.startswith("//"):
        v = "https:" + v
    if _SCHEME_RE.match(v):
        if not v.lower().startswith(("http://", "https://")):
            return []
        clean = v.split("#", 1)[0]
        out = [rw.url_to_rel(clean)]
        s = urlsplit(clean)
        if s.query:  # u2r() maps query URLs to a __q… name — cover both forms
            out.append(rw.url_to_rel(urlunsplit((s.scheme, s.netloc, s.path, "", ""))))
        return out
    clean = v.split("#", 1)[0]
    path, _, q = clean.partition("?")
    if not path:
        return []
    joined = posixpath.normpath(posixpath.join(posixpath.dirname(src_rel), path))
    if joined.startswith("..") or not joined or joined == ".":
        return []
    out = [joined]
    if q:  # runtime interceptor appends the sanitized query to the file name
        d, name = posixpath.split(joined)
        idx = name.rfind(".")
        stem, ext = (name[:idx], name[idx:]) if idx > 0 else (name, "")
        qv = "".join(c if c.isalnum() or c in "._-" else "_" for c in q)[:12]
        out.append(posixpath.join(d, f"{stem}__q{qv}{ext}") if d else f"{stem}__q{qv}{ext}")
    return out


def _is_asset(rel):
    """Skip nav links / directory URLs — only stub things a loader would fetch."""
    name = posixpath.basename(rel)
    return bool(name) and "." in name and not name.endswith(".html") and not name.endswith(".htm")


def apply_stubs(project_dir, progress=print):
    """Scan the rewritten mirror for unresolvable references and stub them."""
    project_dir = Path(project_dir)
    mirror = project_dir / "mirror"
    if not mirror.is_dir():
        return {"count": 0, "stubs": []}

    cands = {}  # rel -> [source descriptions]

    def add(rel, desc, pages=False):
        rel = rel.strip("/")
        if not rel or "__studio__" in rel:
            return
        if Path(rel).suffix.lower() not in SAFE_STUB_EXTS:
            return
        if not pages and not _is_asset(rel):
            return
        cands.setdefault(rel, []).append(desc[:140])

    files = [p for p in mirror.rglob("*") if p.is_file() and p.suffix.lower() in rw.TEXT_EXTS]
    for p in files:
        rel = p.relative_to(mirror).as_posix()
        ext = p.suffix.lower()
        text = p.read_text(encoding="utf-8", errors="replace")
        if ext in (".html", ".htm"):
            soup = BeautifulSoup(text, "lxml")
            for tag in soup.find_all(True):
                for attr in ("src", "data-src", "poster"):
                    v = tag.get(attr)
                    if isinstance(v, str) and v.strip():
                        for r in _rels_for(rel, v):
                            add(r, f"{rel}: <{tag.name} {attr}> {v}", pages=True)
                href = tag.get("href")
                if isinstance(href, str) and href.strip():
                    for r in _rels_for(rel, href):  # href: assets only (no nav pages)
                        add(r, f"{rel}: <{tag.name} href> {href}")
                ss = tag.get("srcset")
                if isinstance(ss, str):
                    for item in ss.split(","):
                        bits = item.strip().split()
                        if bits:
                            for r in _rels_for(rel, bits[0]):
                                add(r, f"{rel}: <{tag.name} srcset> {bits[0]}")
        elif ext == ".css":
            for m in rw._CSS_URL.finditer(text):
                for r in _rels_for(rel, m.group(2)):
                    add(r, f"{rel}: css url() {m.group(2)}")
            for m in rw._CSS_IMPORT.finditer(text):
                for r in _rels_for(rel, m.group(2)):
                    add(r, f"{rel}: css @import {m.group(2)}")
        else:  # .js / .mjs
            for m in rw._JS_URL.finditer(text):
                for r in _rels_for(rel, m.group(2)):
                    add(r, f"{rel}: js {m.group(2)}")
            for m in _JS_REL_ASSET.finditer(text):
                for r in _rels_for(rel, m.group(2)):
                    add(r, f"{rel}: js rel {m.group(2)}")

    created = []
    for rel in sorted(cands):
        f = mirror / rel
        if f.exists():
            continue
        f.parent.mkdir(parents=True, exist_ok=True)
        f.write_bytes(_stub_bytes(rel))
        created.append({"rel": rel, "refs": cands[rel][:6]})

    if created:
        _prune_depgraph(project_dir, created, progress)
    report = {"count": len(created), "stubs": created}
    reports = project_dir / "reports"
    reports.mkdir(parents=True, exist_ok=True)
    (reports / "stubs.json").write_text(json.dumps(report, indent=2))
    progress(f"stubs: {len(created)} placeholder files written for unresolved refs")
    return report


def _prune_depgraph(project_dir, created, progress=print):
    gpath = project_dir / "reports" / "depgraph.json"
    if not gpath.exists():
        return
    try:
        g = json.loads(gpath.read_text())
        stubbed = {c["rel"] for c in created}
        kept = []
        for u in g.get("unresolved_refs", []):
            src_rel, _, desc = u.partition(": ")
            m = re.search(r"> (.+)$", desc)
            v = m.group(1) if m else re.sub(r"^(css url\(\)|css @import|js rel|js) ", "", desc)
            rels = _rels_for(src_rel, v) or _rels_for("", v)
            if rels and all(r in stubbed for r in rels):
                continue  # fully covered by stubs now
            kept.append(u)
        g["unresolved_refs"] = kept
        g["stubs_added"] = len(created)
        gpath.write_text(json.dumps(g, indent=2))
    except Exception as e:
        progress(f"stubs: depgraph update skipped ({type(e).__name__}: {e})")
