"""Stage D — Cleanup & ownership audit.

Scans the reconstruction for advertising/analytics/tracking domains, branding
artifacts and unknown external services. Classifications are evidence-based
and conservative: GREEN = safe removal candidate (ad/analytics-only),
YELLOW = review required, RED = likely functional, UNKNOWN = not in the
signature list. Nothing is removed automatically.
"""
import json
import re
from pathlib import Path
from urllib.parse import urlsplit

SIGNATURES = {
    # ads networks
    "doubleclick.net": ("ads", "GREEN"), "googlesyndication.com": ("ads", "GREEN"),
    "admob.com": ("ads", "GREEN"), "googleadservices.com": ("ads", "GREEN"),
    "chartboost.com": ("ads", "GREEN"), "applovin.com": ("ads", "GREEN"),
    "unityads.unity3d.com": ("ads", "GREEN"), "adcolony.com": ("ads", "GREEN"),
    "vungle.com": ("ads", "GREEN"), "ironsrc.com": ("ads", "GREEN"), "tapjoy.com": ("ads", "GREEN"),
    # analytics / telemetry
    "google-analytics.com": ("analytics", "GREEN"), "analytics.google.com": ("analytics", "GREEN"),
    "googletagmanager.com": ("analytics", "GREEN"), "mixpanel.com": ("analytics", "GREEN"),
    "segment.io": ("analytics", "GREEN"), "segment.com": ("analytics", "GREEN"),
    "amplitude.com": ("analytics", "GREEN"), "hotjar.com": ("analytics", "GREEN"),
    "scorecardresearch.com": ("analytics", "GREEN"), "quantserve.com": ("analytics", "GREEN"),
    "gameanalytics.com": ("analytics", "GREEN"), "statcounter.com": ("analytics", "GREEN"),
    # attribution
    "appsflyer.com": ("attribution", "YELLOW"), "adjust.com": ("attribution", "YELLOW"),
    "branch.io": ("attribution", "YELLOW"),
    # error monitoring
    "sentry.io": ("error-monitoring", "GREEN"), "bugsnag.com": ("error-monitoring", "GREEN"),
    "newrelic.com": ("error-monitoring", "GREEN"), "logrocket.com": ("error-monitoring", "GREEN"),
    "fullstory.com": ("error-monitoring", "GREEN"),
    # social / platform
    "connect.facebook.net": ("social", "YELLOW"), "facebook.com": ("social", "YELLOW"),
    "twitter.com": ("social", "YELLOW"), "x.com": ("social", "YELLOW"),
    "discord.com": ("social", "YELLOW"), "youtube.com": ("social", "YELLOW"),
    "itch.io": ("store", "YELLOW"), "play.google.com": ("store", "YELLOW"),
    "apps.apple.com": ("store", "YELLOW"),
}

BRANDING_PATTERNS = [
    (r"powered\s+by", "footer credit"),
    (r"©\s*\d{4}", "copyright line"),
    (r"all\s+rights\s+reserved", "copyright line"),
]
BRANDING_FILE_RE = re.compile(r"(logo|brand|watermark|splash|banner|publisher)", re.I)


def run_audit(project_dir, manifest, progress=print):
    project_dir = Path(project_dir)
    mirror = project_dir / "mirror"
    findings = []

    # 1) external domains seen in the acquisition manifest (runtime evidence)
    domains = {}
    for r in manifest["resources"]:
        if r.get("external"):
            host = urlsplit(r["url"]).netloc.removeprefix("www.")
            domains.setdefault(host, []).append(r["rel"])

    for host, rels in sorted(domains.items()):
        cat, cls = ("unknown-external", "UNKNOWN")
        for sig, (c, k) in SIGNATURES.items():
            if host == sig or host.endswith("." + sig.split(".")[-2] + "." + sig.split(".")[-1]):
                cat, cls = c, k
                break
        findings.append({
            "type": "external-service", "target": host, "category": cat, "classification": cls,
            "evidence": f"{len(rels)} acquired resources from this host (e.g. {rels[0]})",
            "depends_on_gameplay": "unknown", "risk": "removal may break loading if the game fetches from it at runtime",
            "confidence": "directly observed", "recommended_action":
                "remove" if cls == "GREEN" else "investigate before touching",
            "rollback": "restore originals from acquisition/original/",
        })

    # 2) branding artifacts in text files
    for f in list(mirror.rglob("*.html")) + list(mirror.rglob("*.js")) + list(mirror.rglob("*.css")):
        rel = str(f.relative_to(mirror))
        try:
            text = f.read_text(encoding="utf-8", errors="replace")[:400_000]
        except Exception:
            continue
        for pat, label in BRANDING_PATTERNS:
            for m in re.finditer(pat, text, re.I):
                snippet = text[max(0, m.start() - 40):m.end() + 60].replace("\n", " ")
                findings.append({
                    "type": "branding", "target": rel, "category": "branding", "classification": "YELLOW",
                    "evidence": f"{label}: …{snippet[:120]}…", "risk": "cosmetic",
                    "confidence": "directly observed", "recommended_action": "review and edit manually",
                    "rollback": "restore originals from acquisition/original/",
                })
                break  # one hit per pattern per file
        if BRANDING_FILE_RE.search(f.name):
            findings.append({
                "type": "branding", "target": rel, "category": "branding-asset", "classification": "YELLOW",
                "evidence": "filename suggests logo/brand/splash asset", "risk": "cosmetic",
                "confidence": "inferred from filename", "recommended_action": "inspect visually",
                "rollback": "restore originals from acquisition/original/",
            })

    summary = {}
    for f in findings:
        summary[f["classification"]] = summary.get(f["classification"], 0) + 1
    result = {"findings": findings[:400], "summary": summary,
              "note": "Nothing was removed. Every change requires explicit human approval."}
    reports = project_dir / "reports"
    (reports / "audit.json").write_text(json.dumps(result, indent=2))
    progress(f"audit: {len(findings)} findings — {summary}")
    return result
