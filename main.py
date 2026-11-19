"""Universal AI Game Studio — web portal backend (FastAPI).

Runs the acquisition pipeline as background jobs and serves:
- the portal UI at /app/
- mirrored games at /games/<slug>/mirror/...
- JSON reports per project via /api/projects/<slug>/reports/<name>
"""
import mimetypes
import threading
import uuid
from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.responses import RedirectResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

from studio import config
from studio.pipeline import run_pipeline

# engine-relevant MIME types before any StaticFiles is created
for ext, mime in [(".wasm", "application/wasm"), (".unityweb", "application/octet-stream"),
                  (".data", "application/octet-stream"), (".pck", "application/octet-stream"),
                  (".glb", "model/gltf-binary"), (".mjs", "text/javascript")]:
    mimetypes.add_type(mime, ext)

WEB_DIR = Path(__file__).resolve().parent / "web"
app = FastAPI(title="Universal AI Game Studio", version="0.1.0")

JOBS = {}  # job_id -> {status, slug, log, summary, error}


class AcquireRequest(BaseModel):
    url: str
    slug: str | None = None


@app.get("/")
def root():
    return RedirectResponse("/app/")


@app.post("/api/acquire")
def api_acquire(req: AcquireRequest):
    url = (req.url or "").strip()
    if not url.startswith(("http://", "https://")):
        raise HTTPException(400, "URL must start with http:// or https://")
    job_id = uuid.uuid4().hex[:12]
    JOBS[job_id] = {"status": "running", "slug": None, "log": [], "summary": None, "error": None}

    def progress(line):
        entry = JOBS.get(job_id)
        if entry is not None:
            entry["log"].append(str(line)[:300])
            if line.startswith("project:"):
                entry["slug"] = str(line).split()[1]

    def worker():
        try:
            summary = run_pipeline(url, slug=req.slug, progress=progress)
            JOBS[job_id]["summary"] = summary
            JOBS[job_id]["status"] = "done" if summary.get("status") == "complete" else "failed"
        except Exception as e:
            JOBS[job_id]["status"] = "failed"
            JOBS[job_id]["error"] = f"{type(e).__name__}: {e}"
        except BaseException:
            JOBS[job_id]["status"] = "failed"

    threading.Thread(target=worker, daemon=True).start()
    return {"job_id": job_id}


@app.get("/api/jobs/{job_id}")
def api_job(job_id: str):
    if job_id not in JOBS:
        raise HTTPException(404, "unknown job")
    return JOBS[job_id]


@app.get("/api/projects")
def api_projects():
    items = []
    if config.GAMES_DIR.exists():
        for d in sorted(config.GAMES_DIR.iterdir()):
            s = d / "reports" / "summary.json"
            if s.exists():
                try:
                    items.append({"slug": d.name, **_load_json(s)})
                except Exception:
                    pass
    return {"projects": items}


@app.get("/api/projects/{slug}/reports/{name}")
def api_report(slug: str, name: str):
    if name not in config.REPORTS:
        raise HTTPException(400, f"report must be one of {config.REPORTS}")
    p = config.GAMES_DIR / slug / "reports" / f"{name}.json"
    if not p.exists():
        raise HTTPException(404, "report not found")
    return _load_json(p)


def _load_json(p):
    import json
    return json.loads(p.read_text())


if config.GAMES_DIR.exists():
    app.mount("/games", StaticFiles(directory=str(config.GAMES_DIR), html=True), name="games")
else:
    config.GAMES_DIR.mkdir(parents=True, exist_ok=True)
    app.mount("/games", StaticFiles(directory=str(config.GAMES_DIR), html=True), name="games")
app.mount("/app", StaticFiles(directory=str(WEB_DIR), html=True), name="web")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
