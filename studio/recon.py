"""Stage A1 — Browser reconnaissance + raw acquisition.

Opens the game in headless Chromium, captures:
- redirects, iframes, console errors, runtime globals, engine hints
- every network response (initial load, game start, interaction, scrolling)
and saves response bodies byte-identical to acquisition/raw/<sha1(url)>.bin.
Bodies that could not be captured are recorded for direct download later.
"""
import hashlib
import json
import time
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlsplit

from . import config, detect


def _now():
    return datetime.now(timezone.utc).isoformat()


def run_recon(url, project_dir, progress=print):
    from playwright.sync_api import sync_playwright

    raw_dir = Path(project_dir) / "acquisition" / "raw"
    raw_dir.mkdir(parents=True, exist_ok=True)

    rec = {
        "url": url, "started": _now(), "final_url": None, "redirects": [],
        "iframes": [], "console": [], "page_errors": [], "resources": [],
        "globals": {}, "entry_url": None, "entry_in_iframe": False,
        "warnings": [], "fatal": None,
    }
    pending = []          # (Response, phase) — bodies saved before browser close
    markers = {"nav_done": None, "interact_done": None}

    def phase_now():
        if markers["nav_done"] is None:
            return "initial"
        if markers["interact_done"] is None:
            return "interaction"
        return "post"

    progress("browser: launching headless Chromium")
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True, args=["--no-sandbox", "--disable-dev-shm-usage"])
        ctx = browser.new_context(user_agent=config.BROWSER_UA, viewport={"width": 1280, "height": 800})
        page = ctx.new_page()

        page.on("response", lambda r: pending.append((r, phase_now())))
        page.on("console", lambda m: rec["console"].append({"type": m.type, "text": m.text[:500]})
                if m.type in ("error", "warning") else None)
        page.on("pageerror", lambda e: rec["page_errors"].append(str(e)[:500]))

        # ---- navigate ----
        resp = None
        try:
            resp = page.goto(url, wait_until="networkidle", timeout=config.RECON_NAV_TIMEOUT_MS)
        except Exception as e:
            rec["warnings"].append(f"networkidle not reached ({type(e).__name__}), retrying domcontentloaded")
            try:
                resp = page.goto(url, wait_until="domcontentloaded", timeout=30000)
            except Exception as e2:
                rec["fatal"] = f"navigation failed: {e2}"
                browser.close()
                rec["finished"] = _now()
                _write(project_dir, rec)
                return rec
        rec["final_url"] = page.url

        # redirect chain of the main document
        try:
            cur = resp.request if resp else None
            chain = []
            while cur and cur.redirected_from():
                cur = cur.redirected_from()
                chain.append(cur.url)
            rec["redirects"] = list(reversed(chain))
        except Exception:
            pass

        page.wait_for_timeout(config.RECON_SETTLE_SECONDS * 1000)
        markers["nav_done"] = time.time()

        # ---- runtime globals + frames + entry point ----
        GLOBALS_JS = ("() => ({ phaser:!!window.Phaser, pixi:!!(window.PIXI||window.pixi), "
                      "three:!!window.THREE, melon:!!window.me, babylon:!!window.BABYLON, "
                      "unity:typeof window.createUnityInstance==='function', cocos:!!window.cc, "
                      "playcanvas:!!window.pc, godot:!!window.Godot, egret:!!window.egret, "
                      "construct2:!!window.cr_getC2Runtime, construct3:!!window.C3, "
                      "gdevelop:!!window.gdjs, hasCanvas:!!document.querySelector('canvas') })")
        try:
            rec["globals"] = page.evaluate(GLOBALS_JS)
        except Exception as e:
            rec["warnings"].append(f"globals probe failed: {e}")

        try:
            rec["iframes"] = [f.url for f in page.frames
                              if f is not page.main_frame and f.url not in ("about:blank",)]
        except Exception:
            pass

        game_frame = page.main_frame
        try:
            if not game_frame.query_selector("canvas"):
                for f in page.frames:
                    try:
                        if f.query_selector("canvas"):
                            game_frame = f
                            break
                    except Exception:
                        continue
        except Exception:
            pass
        rec["entry_url"] = game_frame.url if game_frame.url.startswith("http") else page.url
        rec["entry_in_iframe"] = bool(game_frame is not page.main_frame)

        # ---- controlled interaction: click canvas to reach more game states ----
        attempted = False
        try:
            canvas = game_frame.query_selector("canvas")
            if canvas:
                box = canvas.bounding_box()
                if box:
                    page.mouse.click(box["x"] + box["width"] / 2, box["y"] + box["height"] / 2)
                    attempted = True
                    progress("browser: clicked canvas (game start attempt)")
            page.wait_for_timeout(config.RECON_INTERACT_SECONDS * 1000)
        except Exception as e:
            rec["warnings"].append(f"interaction failed: {e}")
        markers["interact_done"] = time.time()
        rec["interaction_attempted"] = attempted

        # ---- lazy-load probe: scroll ----
        try:
            page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
            page.wait_for_timeout(2500)
            page.evaluate("window.scrollTo(0, 0)")
            page.wait_for_timeout(2000)
        except Exception:
            pass
        page.wait_for_timeout(2000)

        # ---- save captured bodies byte-identical ----
        index_host = urlsplit(rec["entry_url"]).netloc.lower().removeprefix("www.")
        progress(f"network: {len(pending)} responses captured, saving bodies")
        for r, ph in pending:
            try:
                entry = {
                    "url": r.url, "method": r.request.method, "status": r.status,
                    "mime": (r.headers or {}).get("content-type", ""), "resource_type": r.request.resource_type,
                    "phase": ph, "initiator_frame": (r.request.frame.url if r.request.frame else "")[:200],
                }
                cl = (r.headers or {}).get("content-length")
                if cl and cl.isdigit() and int(cl) > config.MAX_BODY_MB * 1024 * 1024:
                    entry["error"] = f"body too large ({int(cl)//1048576}MB) — flagged for direct download"
                else:
                    body = r.body()
                    entry["size"] = len(body)
                    h = hashlib.sha1(r.url.encode("utf-8")).hexdigest()
                    (raw_dir / f"{h}.bin").write_bytes(body)
                    entry["raw"] = f"{h}.bin"
                    entry["sha256"] = hashlib.sha256(body).hexdigest()
            except Exception as e:
                entry = {"url": r.url, "method": getattr(r.request, "method", "GET"),
                         "status": getattr(r, "status", 0), "mime": "", "resource_type": "",
                         "phase": ph, "error": f"body unavailable ({type(e).__name__})"}
            host = urlsplit(entry["url"]).netloc.lower().removeprefix("www.")
            entry["external"] = bool(host) and host != index_host
            rec["resources"].append(entry)

        html = ""
        try:
            html = page.content()
        except Exception:
            pass
        browser.close()

    rec["finished"] = _now()
    rec["request_count"] = len(rec["resources"])
    rec["external_count"] = sum(1 for r in rec["resources"] if r.get("external"))
    rec["engine"] = detect.detect_engine(rec["globals"], rec["resources"], html)
    progress(f"engine detection: {rec['engine']['engine']} ({rec['engine']['confidence']})")
    _write(project_dir, rec)
    return rec


def _write(project_dir, rec):
    reports = Path(project_dir) / "reports"
    reports.mkdir(parents=True, exist_ok=True)
    (reports / "recon.json").write_text(json.dumps(rec, indent=2))
