"""Stage A2 — Deep mirroring: organized acquisition + manifest.

Reads reconnaissance resources, moves captured bodies into
acquisition/original/<rel>, downloads anything missing directly (with
retries), validates sizes/integrity, deduplicates by SHA-256 and emits the
acquisition manifest.
"""
import hashlib
import shutil
import time
from pathlib import Path
from urllib.parse import urlsplit, unquote

import requests

from . import config
from .rewrite import url_to_rel  # canonical URL→local path function (shared with interceptor)


def _sanitize_segment(seg):
    seg = unquote(seg)
    return "".join(c if c.isalnum() or c in "._-" else "_" for c in seg) or "_"


def _local_rel(url):
    """Path inside the project, identical algorithm to interceptor.js u2r()."""
    return url_to_rel(url)


def _download(url, referer, dest):
    headers = {"User-Agent": config.BROWSER_UA, "Referer": referer, "Accept": "*/*"}
    for attempt in range(1, config.DOWNLOAD_RETRIES + 1):
        try:
            r = requests.get(url, headers=headers, timeout=config.DOWNLOAD_TIMEOUT_S, stream=True)
            if r.status_code != 200:
                return {"status": r.status_code, "error": f"HTTP {r.status_code}"}
            dest.parent.mkdir(parents=True, exist_ok=True)
            n = 0
            with open(dest, "wb") as f:
                for chunk in r.iter_content(65536):
                    f.write(chunk)
                    n += len(chunk)
            cl = r.headers.get("content-length")
            if cl and cl.isdigit() and int(cl) != n:
                return {"status": r.status_code, "error": f"incomplete download ({n}/{cl} bytes)"}
            return {"status": 200, "size": n}
        except Exception as e:
            if attempt == config.DOWNLOAD_RETRIES:
                return {"status": 0, "error": f"download failed after {attempt} attempts: {e}"}
            time.sleep(1.5 * attempt)


def build_mirror(project_dir, recon, progress=print):
    project_dir = Path(project_dir)
    acq = project_dir / "acquisition" / "original"
    raw_dir = project_dir / "acquisition" / "raw"
    acq.mkdir(parents=True, exist_ok=True)

    index_url = recon.get("entry_url") or recon["final_url"]
    resources, seen_hashes, used_rels = [], {}, set()
    counts = {"discovered": len(recon["resources"]), "captured": 0, "downloaded": 0,
              "failed": 0, "duplicates": 0}

    progress(f"mirror: organizing {counts['discovered']} discovered resources")

    # file/dir clash pre-pass: the same game URL with and without a trailing
    # slash maps to …/game (saved as a FILE) and …/game/… (needs a DIRECTORY)
    # — renaming the file rels up-front keeps later mkdir() calls legal
    rel_for = {}
    for res in recon["resources"]:
        rel_for.setdefault(res["url"], _local_rel(res["url"]))
    all_rels = set(rel_for.values())
    for rel in sorted(all_rels):
        if any(s != rel and s.startswith(rel + "/") for s in all_rels):
            p = Path(rel)
            n = 0
            while True:
                cand = str(p.parent / f"{p.name}__file{n if n else ''}")
                if cand not in all_rels and not (acq / cand).exists():
                    break
                n += 1
            for u, r in rel_for.items():
                if r == rel:
                    rel_for[u] = cand
            all_rels.discard(rel)
            all_rels.add(cand)
            progress(f"mirror: rel '{rel}' is both file and dir prefix → '{cand}'")

    for res in recon["resources"]:
        url = res["url"]
        rel = rel_for[url]
        entry = {
            "url": url, "rel": rel, "method": res.get("method", "GET"),
            "status": res.get("status", 0), "mime": res.get("mime", ""),
            "resource_type": res.get("resource_type", ""), "phase": res.get("phase", "initial"),
            "external": res.get("external", False), "initiator_frame": res.get("initiator_frame", ""),
        }
        raw = raw_dir / res["raw"] if res.get("raw") else None
        dest = acq / rel
        ok = False
        if raw and raw.exists():
            data = raw.read_bytes()
            if data:
                h = hashlib.sha256(data).hexdigest()
                entry["sha256"], entry["size"], entry["source"] = h, len(data), "captured"
                if h in seen_hashes:
                    entry["rel"] = seen_hashes[h]          # duplicate content → same local file
                    counts["duplicates"] += 1
                else:
                    dest.parent.mkdir(parents=True, exist_ok=True)
                    dest.write_bytes(data)
                    seen_hashes[h] = rel
                    used_rels.add(rel)
                    counts["captured"] += 1
                ok = True
        if not ok:
            r = _download(url, index_url, dest)
            entry["status"] = r["status"]
            if r["status"] == 200:
                data = dest.read_bytes()
                h = hashlib.sha256(data).hexdigest()
                entry["sha256"], entry["size"], entry["source"] = h, len(data), "downloaded"
                if h in seen_hashes:
                    dest.unlink()
                    entry["rel"] = seen_hashes[h]
                    counts["duplicates"] += 1
                else:
                    seen_hashes[h] = rel
                    used_rels.add(rel)
                    counts["downloaded"] += 1
                ok = True
            else:
                entry["error"] = r.get("error", "acquisition failed")
                counts["failed"] += 1
        resources.append(entry)

    # collision repair: two distinct files mapped onto one rel (query-hash corner cases)
    fixed = {}
    for e in resources:
        rel = e["rel"]
        if rel in fixed and e.get("sha256") and e["sha256"] != fixed[rel]:
            p = Path(rel)
            stem, ext = (p.stem, p.suffix) if p.suffix else (p.name, "")
            # find a genuinely unused name: fixed/used_rels hold rels claimed by
            # other entries, so reuse would corrupt the manifest (all collisions
            # used to collapse onto _dup0 because the counter counted sha values)
            n = 0
            while True:
                cand = str(p.parent / f"{stem}_dup{n}{ext}")
                if cand not in used_rels and cand not in fixed and not (acq / cand).exists():
                    break
                n += 1
            e["rel"] = cand
            src = acq / rel
            if src.exists():
                nd = acq / e["rel"]
                nd.parent.mkdir(parents=True, exist_ok=True)
                shutil.copy2(src, nd)
                src.unlink()
                used_rels.discard(rel)
                used_rels.add(e["rel"])
        fixed[e["rel"]] = e.get("sha256", "")

    missing = [e["url"] for e in resources if "error" in e]
    manifest = {
        "source_url": recon["url"], "entry_url": index_url,
        "entry_rel": rel_for.get(index_url) or _local_rel(index_url), "created": recon.get("finished"),
        "engine": recon.get("engine", {}), "resources": resources,
        "counts": counts, "missing": missing, "known_rels": sorted(used_rels),
        "interaction_attempted": recon.get("interaction_attempted", False),
        "warnings": recon.get("warnings", []),
    }
    reports = project_dir / "reports"
    reports.mkdir(parents=True, exist_ok=True)
    import json
    (reports / "manifest.json").write_text(json.dumps(manifest, indent=2))
    progress(f"mirror: {counts['captured']}+{counts['downloaded']} acquired, "
             f"{counts['duplicates']} duplicates merged, {counts['failed']} failed")
    return manifest
