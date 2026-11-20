"""Universal AI Game Studio — web portal backend (FastAPI).

Runs the acquisition pipeline as background jobs and serves:
- the portal UI at /app/
- mirrored games at /games/<slug>/mirror/...
- JSON reports per project via /api/projects/<slug>/reports/<name>
"""
import mimetypes
import re
import threading
import uuid
import zipfile
from pathlib import Path

from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

from studio import config, ghsync
from studio.pipeline import run_pipeline, run_pipeline_zip

# engine-relevant MIME types before any StaticFiles is created
for ext, mime in [(".wasm", "application/wasm"), (".unityweb", "application/octet-stream"),
                  (".data", "application/octet-stream"), (".pck", "application/octet-stream"),
                  (".glb", "model/gltf-binary"), (".mjs", "text/javascript")]:
    mimetypes.add_type(mime, ext)

WEB_DIR = Path(__file__).resolve().parent / "web"
app = FastAPI(title="Universal AI Game Studio", version="0.1.0")


@app.middleware("http")
async def compressed_static_headers(request, call_next):
    """Mirror files are stored with DECODED bodies (Playwright gives decoded
    bytes, and requests decodes gzip/brotli), so almost everything must be
    served raw with NO Content-Encoding — even under a .br/.gz name. Legacy
    acquisitions may still hold real compressed bytes: decide by actually
    attempting decompression, and cache the verdict per file. Wrong headers
    make the browser fail to decode (ERR_CONTENT_DECODING_FAILED) — the Unity
    loader then hangs at ~90% right before wasm/data instantiate."""
    response = await call_next(request)
    p = request.url.path
    if p.endswith((".br", ".gz")) and p.startswith("/games/"):
        inner = mimetypes.guess_type(p[:-3])[0] or "application/octet-stream"
        if p[:-3].endswith(".wasm"):
            inner = "application/wasm"
        enc = _static_encoding(config.GAMES_DIR / p[len("/games/"):])
        response.headers["Content-Type"] = inner
        # a stale cache entry with a wrong encoding wedges the game loader
        response.headers["Cache-Control"] = "no-store"
        if enc:
            response.headers["Content-Encoding"] = enc
    return response


_encoding_cache = {}  # (path, size, mtime) -> "gzip" | "br" | None


def _static_encoding(path):
    """Cached Content-Encoding verdict for a stored mirror file."""
    try:
        f = Path(path).resolve()
        if not str(f).startswith(str(config.GAMES_DIR.resolve())) or not f.is_file():
            return None
        st = f.stat()
    except OSError:
        return None
    key = (str(f), st.st_size, st.st_mtime)
    if key in _encoding_cache:
        return _encoding_cache[key]
    enc = None
    try:
        with f.open("rb") as fh:
            head = fh.read(16)
        if head[:2] == b"\x1f\x8b":
            enc = "gzip"  # gzip has a magic number — trust it
        elif head.startswith(b"UnityWeb"):
            enc = None    # Unity's own container: the game loader decompresses it
        elif head[:4] == b"\x00asm" or all(
                b < 128 and (32 <= b < 127 or b in (9, 10, 13)) for b in head):
            enc = None    # decoded wasm / decoded text
        elif st.st_size <= 64 * 1024 * 1024:
            # ambiguous binary: a genuinely compressed stream decompresses cleanly
            data = f.read_bytes()
            try:
                import brotli
                brotli.decompress(data)
                enc = "br"
            except Exception:
                try:
                    import gzip
                    gzip.decompress(data)
                    enc = "gzip"
                except Exception:
                    enc = None  # decoded binary we don't recognize — serve raw
    except OSError:
        enc = None
    _encoding_cache[key] = enc
    return enc


JOBS = {}  # job_id -> {status, slug, log, summary, error}
PIPELINE_LOCK = threading.Lock()  # acquisitions are heavy: run one at a time
_URL_RE = re.compile(r"https?://[^\s<>\"')\]}]+")


def _extract_urls(text):
    """Pull every http(s) URL out of arbitrary pasted text (deduped, order
    kept, trailing slash normalized so the same link pasted twice counts once)."""
    urls, seen = [], set()
    for m in _URL_RE.finditer(text or ""):
        u = m.group(0).rstrip(".,;:!?\"'")
        if u.endswith("/"):
            u = u[:-1]
        if u not in seen:
            seen.add(u)
            urls.append(u)
    return urls


class AcquireRequest(BaseModel):
    url: str
    slug: str | None = None


class BatchRequest(BaseModel):
    text: str


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
            with PIPELINE_LOCK:
                summary = run_pipeline(url, slug=req.slug, progress=progress)
            JOBS[job_id]["summary"] = summary
            JOBS[job_id]["status"] = "done" if summary.get("status") == "complete" else "failed"
            if summary.get("status") == "complete":
                try:
                    ghsync.push(progress)
                except Exception as e:
                    progress(f"github push failed (game saved locally anyway): {str(e)[-160:]}")
        except Exception as e:
            JOBS[job_id]["status"] = "failed"
            JOBS[job_id]["error"] = f"{type(e).__name__}: {e}"
        except BaseException:
            JOBS[job_id]["status"] = "failed"

    threading.Thread(target=worker, daemon=True).start()
    return {"job_id": job_id}


@app.post("/api/acquire_batch")
def api_acquire_batch(req: BatchRequest):
    """Accept arbitrary pasted text: only the URLs inside are extracted and
    acquired one by one (sequential queue), each followed by a GitHub push."""
    urls = _extract_urls(req.text)
    if not urls:
        raise HTTPException(400, "no http(s) URLs found in the pasted text")
    job_id = uuid.uuid4().hex[:12]
    JOBS[job_id] = {"status": "running", "slug": None, "log": [],
                    "summary": None, "error": None, "results": []}
    results = JOBS[job_id]["results"]

    def progress(line):
        entry = JOBS.get(job_id)
        if entry is not None:
            entry["log"].append(str(line)[:300])

    def worker():
        total = len(urls)
        for i, u in enumerate(urls):
            progress(f"=== [{i + 1}/{total}] {u} ===")
            try:
                with PIPELINE_LOCK:
                    summary = run_pipeline(u, progress=progress)
                results.append({"url": u, "slug": summary.get("slug"),
                                "score": summary.get("score"),
                                "status": summary.get("status")})
                if summary.get("status") == "complete":
                    try:
                        ghsync.push(progress)
                    except Exception as e:
                        progress(f"github push failed (game saved locally anyway): {str(e)[-160:]}")
            except Exception as e:
                results.append({"url": u, "error": f"{type(e).__name__}: {e}"})
                progress(f"FAILED: {type(e).__name__}: {str(e)[:200]}")
        ok = sum(1 for r in results if r.get("status") == "complete")
        JOBS[job_id]["summary"] = {"batch": True, "found": total, "ok": ok, "results": results}
        JOBS[job_id]["status"] = "done" if ok else "failed"
        JOBS[job_id]["log"].append(f"batch finished: {ok}/{total} acquired")

    threading.Thread(target=worker, daemon=True).start()
    return {"job_id": job_id, "urls": urls}


@app.post("/api/sync/push")
def api_sync_push():
    """Push the whole studio workspace (code + games) to the GitHub repo."""
    job_id = uuid.uuid4().hex[:12]
    JOBS[job_id] = {"status": "running", "slug": None, "log": [], "summary": None, "error": None}

    def worker():
        try:
            ghsync.push(lambda l: JOBS[job_id]["log"].append(str(l)[:300]))
            JOBS[job_id]["status"] = "done"
        except Exception as e:
            JOBS[job_id]["status"] = "failed"
            JOBS[job_id]["error"] = f"{type(e).__name__}: {str(e)[-200:]}"

    threading.Thread(target=worker, daemon=True).start()
    return {"job_id": job_id}


@app.post("/api/sync/restore")
def api_sync_restore():
    """Restore games/ from the GitHub repo (after a sandbox reset)."""
    job_id = uuid.uuid4().hex[:12]
    JOBS[job_id] = {"status": "running", "slug": None, "log": [], "summary": None, "error": None}

    def worker():
        try:
            ghsync.restore(lambda l: JOBS[job_id]["log"].append(str(l)[:300]))
            JOBS[job_id]["status"] = "done"
        except Exception as e:
            JOBS[job_id]["status"] = "failed"
            JOBS[job_id]["error"] = f"{type(e).__name__}: {str(e)[-200:]}"

    threading.Thread(target=worker, daemon=True).start()
    return {"job_id": job_id}


@app.get("/play/{slug}")
def play(slug: str):
    """Full-viewport wrapper around the mirrored entry page: keeps the game in
    an iframe context (like the original portal page) and enables cross-origin
    isolation for Unity builds that use wasm threads."""
    p = config.GAMES_DIR / slug / "reports" / "manifest.json"
    if not p.exists():
        raise HTTPException(404, "project not found")
    entry = _load_json(p).get("entry_rel") or ""
    html = f"""<!doctype html><html><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{slug}</title>
<style>html,body{{margin:0;height:100%;background:#000;overflow:hidden}}
iframe{{border:0;width:100%;height:100%;display:block}}</style></head>
<body><iframe src="/games/{slug}/mirror/{entry}"
allow="autoplay; fullscreen; gamepad; clipboard-write"></iframe></body></html>"""
    return HTMLResponse(html, headers={
        "Cross-Origin-Opener-Policy": "same-origin",
        "Cross-Origin-Embedder-Policy": "credentialless",
    })


@app.post("/api/upload_zip")
async def api_upload_zip(request: Request, name: str = ""):
    """Stream an uploaded game ZIP to disk (raw body — no size limit), then run
    the zip pipeline as a background job."""
    job_id = uuid.uuid4().hex[:12]
    uploads = config.GAMES_DIR.parent / "uploads"
    uploads.mkdir(parents=True, exist_ok=True)
    zpath = uploads / f"{job_id}.zip"
    size = 0
    with zpath.open("wb") as f:
        async for chunk in request.stream():
            f.write(chunk)
            size += len(chunk)
    if size == 0 or not zipfile.is_zipfile(zpath):
        try:
            zpath.unlink()
        except OSError:
            pass
        raise HTTPException(400, f"no valid zip received ({size} bytes)")
    JOBS[job_id] = {"status": "running", "slug": None, "log": [], "summary": None, "error": None}

    def progress(line):
        entry = JOBS.get(job_id)
        if entry is not None:
            entry["log"].append(str(line)[:300])
            if line.startswith("project:"):
                entry["slug"] = str(line).split()[1]

    def worker():
        try:
            with PIPELINE_LOCK:
                summary = run_pipeline_zip(zpath, name=name, progress=progress)
            JOBS[job_id]["summary"] = summary
            JOBS[job_id]["slug"] = summary.get("slug")
            JOBS[job_id]["status"] = "done" if summary.get("status") == "complete" else "failed"
            if summary.get("status") == "complete":
                try:
                    ghsync.push(progress)
                except Exception as e:
                    progress(f"github push failed (game saved locally anyway): {str(e)[-160:]}")
        except Exception as e:
            JOBS[job_id]["status"] = "failed"
            JOBS[job_id]["error"] = f"{type(e).__name__}: {e}"
        finally:
            try:
                zpath.unlink()
            except OSError:
                pass

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

# best-effort: after a sandbox reset, bring games back from GitHub
threading.Thread(target=ghsync.restore_if_needed, daemon=True).start()


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
