"""Pipeline orchestrator: recon → mirror → reconstruct → audit → assets → verify."""
import json
import os
import re
import shutil
import time
import zipfile
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlsplit

from . import config
from . import recon as recon_mod
from . import mirror as mirror_mod
from . import rewrite as rewrite_mod
from . import stubs as stubs_mod
from . import audit as audit_mod
from . import assets as assets_mod
from . import verify as verify_mod


def slugify(text):
    s = re.sub(r"[^a-zA-Z0-9]+", "-", text).strip("-").lower()
    return (s or "game")[:48]


def _unique_dir(base: Path, slug: str) -> Path:
    cand, n = base / slug, 1
    while cand.exists() and any((cand / "reports").glob("*.json")):
        n += 1
        cand = base / f"{slug}-{n}"
    cand.mkdir(parents=True, exist_ok=True)
    return cand


def _slug_from_url(url):
    """Host + most specific path segment (the game name). The first segment
    used to collapse every crazygames.com/it/game/<name> into one slug."""
    s = urlsplit(url)
    segs = [seg for seg in s.path.strip("/").split("/") if seg]
    tail = segs[-1] if segs else ""
    for ext in (".html", ".htm", ".php", ".aspx"):
        if tail.endswith(ext):
            tail = tail[:-len(ext)]
    return slugify(s.netloc + "-" + (tail or "game"))


def run_pipeline(url, slug=None, out_dir=None, progress=print):
    """Run the full Stage A/B pipeline on a game URL. Returns summary dict."""
    t0 = time.time()
    out_dir = Path(out_dir) if out_dir else config.GAMES_DIR
    out_dir.mkdir(parents=True, exist_ok=True)
    slug = slugify(slug) if slug else _slug_from_url(url)
    project = _unique_dir(out_dir, slug)
    slug = project.name
    reports = project / "reports"
    reports.mkdir(parents=True, exist_ok=True)

    progress(f"project: {slug} ({url})")
    rec = recon_mod.run_recon(url, project, progress)
    if rec.get("fatal"):
        summary = {"slug": slug, "url": url, "status": "failed", "error": rec["fatal"],
                   "created": datetime.now(timezone.utc).isoformat(), "duration_s": round(time.time() - t0)}
        (reports / "summary.json").write_text(json.dumps(summary, indent=2))
        return summary

    manifest = mirror_mod.build_mirror(project, rec, progress)
    rewrite_mod.build_reconstruction(project, manifest, progress)
    stub_res = stubs_mod.apply_stubs(project, progress)
    manifest["rewrite"] = json.loads((reports / "rewrite.json").read_text())
    manifest["stubs"] = stub_res.get("count", 0)
    (reports / "manifest.json").write_text(json.dumps(manifest, indent=2))

    audit_res = audit_mod.run_audit(project, manifest, progress)
    assets_res = assets_mod.run_assets(project, manifest, progress)
    verify_res = verify_mod.verify_project(project, manifest, progress)

    summary = {
        "slug": slug, "url": url, "status": "complete",
        "final_url": rec.get("final_url"), "entry_url": manifest["entry_url"],
        "entry_rel": manifest["entry_rel"], "engine": rec.get("engine", {}),
        "counts": manifest["counts"],
        "score": verify_res["score"]["total"], "verdict": verify_res["verdict"],
        "audit_summary": audit_res.get("summary", {}),
        "assets_summary": assets_res.get("summary", {}),
        "created": datetime.now(timezone.utc).isoformat(),
        "duration_s": round(time.time() - t0, 1),
        "preview_url": f"/games/{slug}/mirror/{manifest['entry_rel']}",
        "reports": {name: f"games/{slug}/reports/{name}.json" for name in config.REPORTS},
    }
    (reports / "summary.json").write_text(json.dumps(summary, indent=2))
    progress(f"done: {slug} — score {summary['score']}/100 in {summary['duration_s']}s")
    return summary


def _safe_extract(zpath: Path, dest: Path, progress=print):
    """Stream-extract a zip (no size limit), blocking zip-slip and encrypted
    entries. Returns (extracted, skipped)."""
    extracted, skipped = 0, 0
    dest = dest.resolve()
    with zipfile.ZipFile(zpath) as z:
        for info in z.infolist():
            name = info.filename
            if name.endswith("/"):
                continue
            p = (dest / name).resolve()
            if not str(p).startswith(str(dest) + os.sep):
                skipped += 1
                continue
            if info.flag_bits & 0x1:  # encrypted entry
                skipped += 1
                continue
            try:
                p.parent.mkdir(parents=True, exist_ok=True)
                with z.open(info) as src, open(p, "wb") as out:
                    shutil.copyfileobj(src, out, 1024 * 1024)
            except Exception as e:
                progress(f"zip: failed to extract {name}: {str(e)[:120]}")
                skipped += 1
                continue
            extracted += 1
            if extracted % 250 == 0:
                progress(f"zip: extracted {extracted} files…")
    return extracted, skipped


def _find_entry(orig: Path, progress=print):
    """Pick the most game-like .html page: shallow, index-named, canvas-bearing."""
    htmls = [p for p in orig.rglob("*") if p.is_file() and p.suffix.lower() in (".html", ".htm")]
    if not htmls:
        return None

    def score(p):
        rel = p.relative_to(orig).as_posix()
        s = -min(rel.count("/") + 1, 6) * 3        # shallower is better
        if p.name.lower().startswith("index"):
            s += 40
        try:
            low = p.read_text(errors="ignore")[:200000].lower()
        except Exception:
            return s
        if "<canvas" in low:
            s += 30
        s += low.count("<script") * 2
        if any(k in low for k in ("unity", "phaser", "godot", "babylon", "playcanvas")):
            s += 5
        return s

    htmls.sort(key=score, reverse=True)
    rel = htmls[0].relative_to(orig).as_posix()
    progress(f"zip: entry page {rel} (best of {len(htmls)} html candidates)")
    return rel


def _engine_from_files(orig: Path):
    names = " ".join(p.name.lower() for p in orig.rglob("*") if p.is_file())
    for key, engine in (("unity", "unity/webgl"), ("godot", "godot"),
                        ("phaser", "phaser"), ("babylon", "babylon"),
                        ("playcanvas", "playcanvas"), ("construct", "construct"),
                        (".wasm", "html5/wasm"), (".pck", "godot")):
        if key in names:
            return {"engine": engine, "confidence": "medium"}
    return {"engine": "html5/js", "confidence": "low"}


def run_pipeline_zip(zip_path, name=None, out_dir=None, progress=print):
    """Build a playable local project from an uploaded game ZIP. The upload is
    preserved byte-identically under acquisition/upload.zip; the mirror is the
    extracted copy. Extraction streams from disk — no practical size limit
    (only a 20 GB decompressed ceiling to protect the sandbox)."""
    t0 = time.time()
    zpath = Path(zip_path)
    out_dir = Path(out_dir) if out_dir else config.GAMES_DIR
    out_dir.mkdir(parents=True, exist_ok=True)
    base_slug = slugify(Path(name or zpath.name).stem or "zip-game")
    project = _unique_dir(out_dir, base_slug)
    slug = project.name
    reports = project / "reports"
    reports.mkdir(parents=True, exist_ok=True)
    size_mb = zpath.stat().st_size / 1048576
    progress(f"project: {slug} (zip: {zpath.name}, {size_mb:.1f} MB)")

    def _fail(err):
        summary = {"slug": slug, "url": f"zip:{zpath.name}", "status": "failed",
                   "error": err, "created": datetime.now(timezone.utc).isoformat(),
                   "duration_s": round(time.time() - t0, 1)}
        (reports / "summary.json").write_text(json.dumps(summary, indent=2))
        return summary

    acq = project / "acquisition"
    acq.mkdir(parents=True, exist_ok=True)
    shutil.copy2(zpath, acq / "upload.zip")  # keep the upload byte-identically
    try:
        with zipfile.ZipFile(zpath) as z:
            total = sum(i.file_size for i in z.infolist())
    except zipfile.BadZipFile:
        return _fail("corrupt zip file")
    if total > 20 * 1024 ** 3:
        return _fail(f"zip decompresses to {total / 1024 ** 3:.1f} GB (> 20 GB limit)")

    orig = acq / "original"
    orig.mkdir(parents=True, exist_ok=True)
    n, skipped = _safe_extract(zpath, orig, progress)
    progress(f"zip: extracted {n} files ({skipped} skipped: unsafe paths / encrypted)")
    entry_rel = _find_entry(orig, progress)
    if not entry_rel:
        return _fail("no .html entry page found in the zip")

    resources = []
    for p in sorted(orig.rglob("*")):
        if p.is_file():
            rel = p.relative_to(orig).as_posix()
            resources.append({"url": f"zip://{rel}", "rel": rel, "method": "GET",
                              "status": 200, "mime": "", "resource_type": "",
                              "phase": "upload", "external": False,
                              "initiator_frame": "", "size": p.stat().st_size})
    manifest = {
        "source_url": f"zip:{zpath.name}", "entry_url": f"zip://{entry_rel}",
        "entry_rel": entry_rel, "created": datetime.now(timezone.utc).isoformat(),
        "engine": _engine_from_files(orig), "resources": resources,
        "counts": {"discovered": len(resources), "captured": len(resources),
                   "downloaded": 0, "failed": 0, "duplicates": 0},
        "missing": [], "known_rels": [r["rel"] for r in resources],
        "interaction_attempted": False,
        "warnings": ["uploaded zip — no web session captured, refs assumed self-contained"],
    }
    (reports / "manifest.json").write_text(json.dumps(manifest, indent=2))

    progress(f"zip: building mirror from {len(resources)} files")
    mirror = project / "mirror"
    if mirror.exists():
        shutil.rmtree(mirror)
    shutil.copytree(orig, mirror)
    stub_res = stubs_mod.apply_stubs(project, progress)  # zips can reference missing files too

    audit_res = audit_mod.run_audit(project, manifest, progress)
    assets_res = assets_mod.run_assets(project, manifest, progress)
    verify_res = verify_mod.verify_project(project, manifest, progress)

    summary = {
        "slug": slug, "url": f"zip:{zpath.name}", "status": "complete",
        "final_url": None, "entry_url": manifest["entry_url"],
        "entry_rel": manifest["entry_rel"], "engine": manifest["engine"],
        "counts": manifest["counts"], "stubs": stub_res.get("count", 0),
        "score": verify_res["score"]["total"], "verdict": verify_res["verdict"],
        "audit_summary": audit_res.get("summary", {}),
        "assets_summary": assets_res.get("summary", {}),
        "created": datetime.now(timezone.utc).isoformat(),
        "duration_s": round(time.time() - t0, 1),
        "preview_url": f"/games/{slug}/mirror/{manifest['entry_rel']}",
        "reports": {name_: f"games/{slug}/reports/{name_}.json" for name_ in config.REPORTS},
    }
    (reports / "summary.json").write_text(json.dumps(summary, indent=2))
    progress(f"done: {slug} — score {summary['score']}/100 in {summary['duration_s']}s")
    return summary
