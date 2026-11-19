"""Pipeline orchestrator: recon → mirror → reconstruct → audit → assets → verify."""
import json
import re
import time
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlsplit

from . import config
from . import recon as recon_mod
from . import mirror as mirror_mod
from . import rewrite as rewrite_mod
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


def run_pipeline(url, slug=None, out_dir=None, progress=print):
    """Run the full Stage A/B pipeline on a game URL. Returns summary dict."""
    t0 = time.time()
    out_dir = Path(out_dir) if out_dir else config.GAMES_DIR
    out_dir.mkdir(parents=True, exist_ok=True)
    slug = slugify(slug or urlsplit(url).netloc + "-" + (urlsplit(url).path.strip("/").split("/")[0] or "game"))
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
    manifest["rewrite"] = json.loads((reports / "rewrite.json").read_text())
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
