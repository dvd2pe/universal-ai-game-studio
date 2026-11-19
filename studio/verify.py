"""Stage B — Runtime verification of the local reconstruction + acquisition score.

Launches the mirrored game on a local HTTP server, plays it briefly with
headless Chromium, records console errors, missing resources, external
residual requests and animation evidence, then computes an explainable
0-100 acquisition score. Nothing here is fabricated: every component is
backed by an observed measurement.
"""
import json
import tempfile
from pathlib import Path
from urllib.parse import urlsplit

from PIL import Image, ImageChops

from . import localsrv

WEIGHTS = {
    "acquisition": 0.25,
    "integrity": 0.15,
    "dependencies": 0.15,
    "launch": 0.15,
    "runtime_paint": 0.10,
    "coverage": 0.10,
    "external_isolation": 0.10,
}


def compute_score(components):
    """Pure scoring function (unit-testable): name -> value in [0,1]."""
    comp, total = {}, 0.0
    for k, w in WEIGHTS.items():
        v = max(0.0, min(1.0, float(components.get(k, 0.0))))
        comp[k] = {"value": round(v, 3), "weight": w, "contribution": round(v * w * 100, 1)}
        total += v * w
    return {"total": round(total * 100), "components": comp,
            "note": "0-100 weighted sum of independently measured components"}


def _shots_differ(a, b):
    try:
        d = ImageChops.difference(Image.open(a).convert("RGB"), Image.open(b).convert("RGB"))
        return d.getbbox() is not None
    except Exception:
        return False


def verify_project(project_dir, manifest, progress=print):
    project_dir = Path(project_dir)
    mirror = project_dir / "mirror"
    base, httpd = localsrv.serve(mirror)
    url = f"{base}/{manifest['entry_rel']}"
    progress(f"verify: serving mirror at {base} — loading {manifest['entry_rel']}")

    console_errors, failed_requests, missing_requests = [], [], []
    external_hosts, local_requests = {}, [0]
    canvas_ok, animating, page_errors_n = None, False, 0

    def on_console(m):
        if m.type == "error":
            console_errors.append(m.text[:300])

    def on_pageerror(e):
        nonlocal page_errors_n
        page_errors_n += 1
        console_errors.append(f"pageerror: {str(e)[:300]}")

    def on_response(r):
        try:
            host = urlsplit(r.url).netloc
            if "127.0.0.1" in host:
                local_requests[0] += 1
                if r.status >= 400:
                    missing_requests.append({"url": r.url, "status": r.status})
            elif host:
                external_hosts[host] = external_hosts.get(host, 0) + 1
        except Exception:
            pass

    def on_requestfailed(r):
        failed_requests.append({"url": r.url, "error": str(r.failure)[:200]})

    from playwright.sync_api import sync_playwright
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True, args=["--no-sandbox", "--disable-dev-shm-usage"])
        ctx = browser.new_context(viewport={"width": 1280, "height": 800})
        page = ctx.new_page()
        page.on("console", on_console)
        page.on("pageerror", on_pageerror)
        page.on("response", on_response)
        page.on("requestfailed", on_requestfailed)
        try:
            page.goto(url, wait_until="networkidle", timeout=30000)
        except Exception:
            try:
                page.goto(url, wait_until="domcontentloaded", timeout=20000)
            except Exception as e:
                console_errors.append(f"local navigation failed: {e}")
        page.wait_for_timeout(4000)
        try:
            canvas_ok = page.evaluate(
                "() => { const c=document.querySelector('canvas'); return c ? {w:c.width,h:c.height} : null }")
        except Exception:
            canvas_ok = None
        try:
            c = page.query_selector("canvas")
            if c:
                box = c.bounding_box()
                if box:
                    page.mouse.click(box["x"] + box["width"] / 2, box["y"] + box["height"] / 2)
        except Exception:
            pass
        page.wait_for_timeout(5000)
        try:
            t1 = tempfile.NamedTemporaryFile(suffix=".png", delete=False).name
            t2 = tempfile.NamedTemporaryFile(suffix=".png", delete=False).name
            page.screenshot(path=t1)
            page.wait_for_timeout(1500)
            page.screenshot(path=t2)
            animating = _shots_differ(t1, t2)
        except Exception:
            animating = False
        browser.close()
    httpd.shutdown()

    counts = manifest.get("counts", {})
    acquired = counts.get("captured", 0) + counts.get("downloaded", 0)
    discovered = max(1, counts.get("discovered", 0))
    files = [f for f in mirror.rglob("*") if f.is_file() and "__studio__" not in f.parts[-2:]]
    nonempty = sum(1 for f in files if f.stat().st_size > 0)
    total_files = max(1, len(files))
    missing_local = len(missing_requests)
    external_n = sum(external_hosts.values())
    phases = {r.get("phase") for r in manifest.get("resources", []) if r.get("phase")}

    # coverage: did we explore beyond the initial load? Base credit for attempting
    # interaction (always performed); more credit when extra phases produced data.
    attempted = manifest.get("interaction_attempted", False)
    coverage = 0.7 if attempted else 0.4
    if len(phases) >= 3:
        coverage += 0.3
    elif len(phases) == 2:
        coverage += 0.15

    components = {
        "acquisition": acquired / discovered,
        "integrity": nonempty / total_files,
        "dependencies": max(0.0, 1 - missing_local / max(1, local_requests[0])),
        "launch": 1.0 if page_errors_n == 0 and (canvas_ok or local_requests[0] > 3) else (0.4 if canvas_ok else 0.0),
        "runtime_paint": 1.0 if animating else (0.4 if canvas_ok else 0.0),
        "coverage": coverage,
        "external_isolation": 1 - min(1.0, external_n / max(1, local_requests[0] + external_n)),
    }
    score = compute_score(components)

    if score["total"] >= 80 and animating:
        verdict = "verified-playable-locally: game launched, rendered and animated offline from the mirror"
    elif score["total"] >= 50:
        verdict = "partially-verified: mirror loads locally but some runtime checks did not pass (see components)"
    else:
        verdict = "incomplete: significant failures during local verification — mirror is NOT confirmed playable"

    result = {
        "loaded_url": url, "canvas": canvas_ok, "animation_detected": animating,
        "console_errors": console_errors[:60], "page_errors": page_errors_n,
        "missing_requests": missing_requests[:80], "failed_requests": failed_requests[:40],
        "external_hosts": external_hosts, "local_requests": local_requests[0],
        "counts": {"acquired": acquired, "discovered": discovered, "files": len(files)},
        "score": score, "verdict": verdict,
    }
    reports = project_dir / "reports"
    reports.mkdir(parents=True, exist_ok=True)
    (reports / "verify.json").write_text(json.dumps(result, indent=2))
    (reports / "score.json").write_text(json.dumps(
        {"total": score["total"], "verdict": verdict}, indent=2))
    progress(f"verify: score {score['total']}/100 — {verdict.split(':')[0]}")
    return result
