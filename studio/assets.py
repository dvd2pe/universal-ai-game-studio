"""Universal asset inventory + reskin feasibility scoring.

Walks the served reconstruction, catalogs every asset (2D, audio, video,
code/config, bundles) with real metadata (Pillow, ffprobe) and assigns an
explainable 0-100 reskin feasibility score per asset. Scores reflect
TECHNICAL feasibility only — never aesthetic quality or approval.
"""
import json
import shutil
import subprocess
from pathlib import Path

from PIL import Image

BASE_SCORE = {
    "image": 85, "sprite-sheet": 70, "font": 70, "audio": 75, "video": 65,
    "config": 55, "code": 40, "bundle": 25, "wasm": 15, "other": 50,
}
IMAGE_EXTS = {".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg", ".bmp"}
AUDIO_EXTS = {".mp3", ".ogg", ".wav", ".m4a", ".aac", ".flac", ".webm"}
VIDEO_EXTS = {".mp4", ".webm", ".mov", ".avi", ".mkv"}
CODE_EXTS = {".js", ".mjs", ".html", ".htm", ".css"}
CONFIG_EXTS = {".json", ".xml", ".yaml", ".yml", ".ini", ".cfg", ".tmx"}
BUNDLE_EXTS = {".data", ".unityweb", ".pak", ".pck", ".arcd", ".bin", ".assets", ".zip"}
FONT_EXTS = {".ttf", ".otf", ".woff", ".woff2", ".eot"}
SHEET_HINTS = ("sheet", "atlas", "tiles", "tileset", "sprites")


def _probe_media(path):
    ff = shutil.which("ffprobe")
    if not ff:
        return {}
    try:
        out = subprocess.run(
            [ff, "-v", "quiet", "-print_format", "json", "-show_format", "-show_streams", str(path)],
            capture_output=True, timeout=15).stdout
        d = json.loads(out or "{}")
        st = (d.get("streams") or [{}])[0]
        return {"duration_s": float(d.get("format", {}).get("duration", 0)) or None,
                "channels": st.get("channels"), "sample_rate": st.get("sample_rate"),
                "width": st.get("width"), "height": st.get("height")}
    except Exception:
        return {}


def _classify(path):
    ext = path.suffix.lower()
    name = path.stem.lower()
    if ext == ".wasm":
        return "wasm"
    if ext in BUNDLE_EXTS:
        return "bundle"
    if ext in FONT_EXTS:
        return "font"
    if ext in IMAGE_EXTS:
        return "sprite-sheet" if any(h in name for h in SHEET_HINTS) else "image"
    if ext in AUDIO_EXTS:
        return "audio"
    if ext in VIDEO_EXTS:
        return "video"
    if ext in CONFIG_EXTS:
        return "config"
    if ext in CODE_EXTS:
        return "code"
    return "other"


def _feasibility(category, meta, fpath, referenced_count):
    score = BASE_SCORE.get(category, 50)
    notes = []
    if category == "image":
        meta.update(_image_meta(fpath))
    if category == "sprite-sheet":
        score -= 0
        notes.append("sprite sheet/atlas: frame layout and atlas coordinates must be preserved")
    if category == "bundle":
        notes.append("packed engine bundle: assets inside require engine-specific extraction")
    if category == "wasm":
        notes.append("compiled WebAssembly: not reskinnable, only replaceable as a whole")
    if category == "code":
        notes.append("logic code: changes risk breaking gameplay behavior")
    if referenced_count > 1:
        score -= 5
        notes.append(f"shared asset referenced from {referenced_count} locations")
    if category == "image" and meta.get("format") in ("JPEG",):
        notes.append("no alpha channel: transparency-sensitive placements need care")
    score = max(0, min(100, score))
    cls = ("easy" if score >= 80 else "moderate" if score >= 50 else
           "difficult" if score >= 25 else "very-difficult")
    return {"score": score, "class": cls, "notes": notes,
            "recommended_action": ("replace file directly" if cls == "easy" else
                                   "replace with technical validation" if cls == "moderate" else
                                   "specialist pipeline required" if cls == "difficult" else
                                   "out of scope for automated reskin")}


def _image_meta(path):
    try:
        im = Image.open(path)
        return {"width": im.width, "height": im.height, "mode": im.mode,
                "format": im.format, "alpha": im.mode in ("RGBA", "LA", "PA")}
    except Exception:
        return {}


def run_assets(project_dir, manifest, progress=print):
    project_dir = Path(project_dir)
    mirror = project_dir / "mirror"

    # count references per rel (from depgraph edges) to flag shared assets
    refs = {}
    try:
        dg = json.loads((project_dir / "reports" / "depgraph.json").read_text())
        for e in dg.get("edges", []):
            refs[e["to"]] = refs.get(e["to"], 0) + 1
    except Exception:
        pass

    items, cat_counts = [], {}
    for f in sorted(mirror.rglob("*")):
        if not f.is_file() or "__studio__" in f.parts:
            continue
        rel = str(f.relative_to(mirror))
        cat = _classify(f)
        meta = {"size_bytes": f.stat().st_size, "format": f.suffix.lstrip(".").lower()}
        if cat == "image":
            meta.update(_image_meta(f))
        elif cat in ("audio", "video"):
            meta.update(_probe_media(f))
        fb = _feasibility(cat, meta, f, refs.get(rel, 0))
        items.append({"path": rel, "category": cat, "meta": meta, "feasibility": fb})
        cat_counts[cat] = cat_counts.get(cat, 0) + 1

    overall = round(sum(i["feasibility"]["score"] for i in items) / max(1, len(items)))
    bundles = [i for i in items if i["category"] in ("bundle", "wasm")]
    bottleneck = min((i["feasibility"]["score"] for i in bundles), default=None)
    summary = {
        "assets": len(items), "by_category": cat_counts,
        "overall_feasibility": overall,
        "bottleneck": ("packed bundles present: game-wide reskin feasibility is capped by them"
                       if bottleneck is not None else None),
        "thresholds": ">=80 easy, 50-79 moderate, 25-49 difficult, <25 very difficult",
    }
    result = {"items": items, "summary": summary}
    reports = project_dir / "reports"
    (reports / "assets.json").write_text(json.dumps(result, indent=2))
    progress(f"assets: {len(items)} cataloged — feasibility {overall}/100")
    return result
