"""Canonical URL → local path mapping + reconstruction rewriting.

The SAME mapping algorithm is implemented in studio/interceptor.js (u2r()).
Any change here MUST be mirrored there — the interceptor maps runtime URLs
that were never seen statically.
"""
import json
import os
import re
import shutil
from pathlib import Path
from urllib.parse import unquote, urljoin, urlsplit, urlunsplit

from bs4 import BeautifulSoup

# NOTE: url_to_rel is defined here; studio/mirror.py and studio/interceptor.js
# must stay in sync with this canonical algorithm.
def url_to_rel(url):
    """Mirror-root relative path for an absolute URL (pure function of the URL)."""
    s = urlsplit(url)
    host = "".join(c if c.isalnum() or c in "._-" else "_" for c in s.netloc) or "_"
    path = unquote(s.path or "")
    if not path or path.endswith("/"):
        path += "index.html"
    segs = [seg for seg in path.split("/") if seg]
    segs = ["".join(c if c.isalnum() or c in "._-" else "_" for c in seg) for seg in segs]
    name = segs.pop() if segs else "index.html"
    qhash = "".join(c if c.isalnum() or c in "._-" else "_" for c in (s.query or ""))[:12]
    idx = name.rfind(".")
    stem, ext = (name[:idx], name[idx:]) if idx > 0 else (name, "")
    if qhash:
        name = f"{stem}__q{qhash}{ext}"
    segs.append(name)
    return host + "/" + "/".join(segs)


TEXT_EXTS = {".html", ".htm", ".css", ".js", ".mjs"}
_SKIP_PREFIXES = ("data:", "blob:", "javascript:", "about:", "chrome:", "file:")
_CSS_URL = re.compile(r"url\(\s*(['\"]?)([^'\")]+)\1\s*\)")
_CSS_IMPORT = re.compile(r"@import\s+(['\"])([^'\"]+)\1")
_JS_URL = re.compile(r'(["\'])((?:https?:)?//[^"\')\s]{4,})\1')


def _resolve(exact, known_rels, abs_url):
    """Map an absolute URL to its local rel path, or None if not acquired.

    Order: exact manifest map → constructed canonical path if the file was
    acquired → None (left untouched and reported as unresolved).
    """
    if not abs_url or abs_url.lower().startswith(_SKIP_PREFIXES):
        return None
    s = urlsplit(abs_url)
    if s.scheme not in ("http", "https"):
        return None
    clean = abs_url.split("#", 1)[0]
    if clean in exact:
        return exact[clean]
    rel = url_to_rel(clean)
    if rel in known_rels:
        return rel
    if s.query:
        noq = urlunsplit((s.scheme, s.netloc, s.path, "", ""))
        if noq in exact:
            return exact[noq]
    return None


def rewrite_html(text, page_url, resolver, interceptor_src, root_prefix):
    """Rewrite resource refs to mirror-root-relative paths (prefixed for the
    page's own depth) and inject the interceptor as the first script."""
    soup = BeautifulSoup(text, "lxml")
    resolved, unresolved = [], []
    for tag in soup.find_all(True):
        for attr in ("src", "href", "data-src", "poster"):
            v = tag.get(attr)
            if not v or not isinstance(v, str) or v.startswith(_SKIP_PREFIXES):
                continue
            rel = resolver(urljoin(page_url, v.strip()))
            if rel:
                tag[attr] = root_prefix + rel
                resolved.append(v.strip())
            else:
                unresolved.append(f"<{tag.name} {attr}> {v.strip()[:160]}")
        if tag.has_attr("srcset") and isinstance(tag.get("srcset"), str):
            parts = []
            for item in tag["srcset"].split(","):
                bits = item.strip().split()
                if bits:
                    rel = resolver(urljoin(page_url, bits[0]))
                    if rel:
                        bits[0] = root_prefix + rel
                        resolved.append(bits[0])
                    else:
                        unresolved.append(f"<{tag.name} srcset> {bits[0][:160]}")
                parts.append(" ".join(bits))
            tag["srcset"] = ", ".join(parts)
    for st in soup.find_all("style"):
        if st.string:
            st.string.replace_with(rewrite_css(st.string, page_url, resolver, root_prefix)[0])
    # inject interceptor as the very first script that runs
    if soup.head is None:
        soup.insert(0, soup.new_tag("head"))
    sc = soup.new_tag("script", src=interceptor_src)
    soup.head.insert(0, sc)
    return str(soup), resolved, unresolved


def rewrite_css(text, css_url, resolver, root_prefix):
    resolved, unresolved = [], []

    def repl_url(m):
        v = m.group(2).strip()
        if v.lower().startswith(_SKIP_PREFIXES):
            return m.group(0)
        rel = resolver(urljoin(css_url, v))
        if rel:
            resolved.append(v)
            return f'url("{root_prefix}{rel}")'
        unresolved.append(v[:160])
        return m.group(0)

    def repl_import(m):
        rel = resolver(urljoin(css_url, m.group(2)))
        if rel:
            resolved.append(m.group(2))
            return f'@import "{root_prefix}{rel}"'
        return m.group(0)

    return _CSS_URL.sub(repl_url, _CSS_IMPORT.sub(repl_import, text)), resolved, unresolved


def rewrite_js(text, file_url, resolver, root_prefix):
    """Replace only whole string literals equal to acquired absolute URLs.
    No blind string replacement; runtime URLs are handled by the interceptor."""

    def repl(m):
        q, u = m.group(1), m.group(2)
        absu = ("https:" + u) if u.startswith("//") else u
        rel = resolver(absu)
        if rel:
            return q + root_prefix + rel + q
        return m.group(0)

    return _JS_URL.sub(repl, text)


def build_reconstruction(project_dir, manifest, progress=print):
    project_dir = Path(project_dir)
    acq = project_dir / "acquisition" / "original"
    mirror = project_dir / "mirror"
    if mirror.exists():
        shutil.rmtree(mirror)
    (mirror / "__studio__").mkdir(parents=True)

    exact, origins = {}, set()
    for e in manifest["resources"]:
        if "error" in e:
            continue
        exact[e["url"].split("#", 1)[0]] = e["rel"]
        s = urlsplit(e["url"])
        origins.add(f"{s.scheme}://{s.netloc}")
        if s.query:
            noq = urlunsplit((s.scheme, s.netloc, s.path, "", ""))
            exact.setdefault(noq, e["rel"])
    known = set(manifest["known_rels"])
    resolver = lambda u: _resolve(exact, known, u)  # noqa: E731

    stats = {"rewritten": {"html": 0, "css": 0, "js": 0}, "copied_binary": 0, "unresolved": []}
    edges = []

    for e in manifest["resources"]:
        rel = e["rel"]
        src = acq / rel
        if not src.exists():
            continue
        dst = mirror / rel
        dst.parent.mkdir(parents=True, exist_ok=True)
        ext = Path(rel).suffix.lower()
        if ext in TEXT_EXTS:
            text = src.read_text(encoding="utf-8", errors="replace")
            depth = rel.count("/")
            prefix = "../" * depth
            page_url = e["url"]
            if ext in (".html", ".htm"):
                new, res_, unres = rewrite_html(text, page_url, resolver,
                                                prefix + "__studio__/interceptor.js", prefix)
                stats["rewritten"]["html"] += 1
            elif ext == ".css":
                new, res_, unres = rewrite_css(text, page_url, resolver, prefix)
                stats["rewritten"]["css"] += 1
            else:
                new, res_, unres = rewrite_js(text, page_url, resolver, prefix), [], []
            stats["unresolved"] += [f"{rel}: {u}" for u in unres[:20]]
            for r in res_:
                rrel = resolver(urljoin(page_url, r))
                if rrel:
                    edges.append({"from": rel, "to": rrel})
            dst.write_text(new, encoding="utf-8")
        else:
            stats["copied_binary"] += 1
            try:
                os.link(src, dst)
            except OSError:
                shutil.copy2(src, dst)

    # root index → entry page
    entry_rel = manifest["entry_rel"]
    (mirror / "index.html").write_text(
        '<!doctype html><meta charset="utf-8">'
        f'<meta http-equiv="refresh" content="0; url=./{entry_rel}">', encoding="utf-8")

    # interceptor with embedded per-project mapping
    mapping = {"origins": sorted(origins), "exact": exact}
    js = (Path(__file__).parent / "interceptor.js").read_text(encoding="utf-8")
    js = js.replace("__MAPPING_JSON__", json.dumps(mapping))
    (mirror / "__studio__" / "interceptor.js").write_text(js, encoding="utf-8")

    reports = project_dir / "reports"
    reports.mkdir(parents=True, exist_ok=True)
    (reports / "rewrite.json").write_text(json.dumps(stats, indent=2))
    depgraph = {"nodes": sorted(known), "edges": edges[:2000],
                "unresolved_refs": stats["unresolved"][:200],
                "external_hosts": sorted({urlsplit(e["url"]).netloc for e in manifest["resources"]
                                          if e.get("external") and "error" not in e})}
    (reports / "depgraph.json").write_text(json.dumps(depgraph, indent=2))
    progress(f"reconstruct: {stats['rewritten']} files rewritten, "
             f"{stats['copied_binary']} binaries copied, {len(stats['unresolved'])} unresolved refs")
    return stats
