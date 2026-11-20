"""Central configuration."""
import os
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]

# Where mirrored game projects live (overridable via CLI --out or env)
GAMES_DIR = Path(os.environ.get("UGS_GAMES_DIR", REPO_ROOT / "games"))
DIST_DIR = REPO_ROOT / "dist"

MAX_BODY_MB = int(os.environ.get("UGS_MAX_BODY_MB", "250"))
DOWNLOAD_RETRIES = int(os.environ.get("UGS_DOWNLOAD_RETRIES", "3"))
DOWNLOAD_TIMEOUT_S = 30
DOWNLOAD_BUDGET_S = int(os.environ.get("UGS_DOWNLOAD_BUDGET_S", "420"))
DOWNLOAD_CONCURRENCY = int(os.environ.get("UGS_DOWNLOAD_CONCURRENCY", "8"))

RECON_NAV_TIMEOUT_MS = 45000
RECON_SETTLE_SECONDS = 6
RECON_INTERACT_SECONDS = 8

REPORTS = ("summary", "recon", "manifest", "depgraph", "rewrite", "audit", "assets", "verify", "score")

BROWSER_UA = (
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"
)
