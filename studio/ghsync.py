"""GitHub backup/restore for the studio workspace (code + acquired games).

The studio directory is a nested git repository, deliberately isolated from
the outer my-project repo (which tracks secret files and must NEVER be
pushed). After every successful acquisition the workspace is pushed to a
private GitHub repo; if the games directory is ever lost (sandbox reset),
`restore` brings it back from GitHub.

The token lives in /home/z/my-project/.secrets/gh_token and is never printed
or embedded in remote URLs — pushes authenticate through a credential helper.
"""
import json
import os
import subprocess
import time
import urllib.request
from pathlib import Path

STUDIO_DIR = Path(__file__).resolve().parent.parent
TOKEN_FILE = Path("/home/z/my-project/.secrets/gh_token")
CRED_HELPER = Path("/home/z/my-project/.secrets/git-credential-studio.sh")
REPO_NAME = "universal-ai-game-studio"
MAX_FILE_BYTES = 90 * 1024 * 1024  # GitHub hard limit is 100 MB per file


def _token():
    try:
        return TOKEN_FILE.read_text().strip() or None
    except OSError:
        return None


def gh_api(method, path, payload=None):
    tok = _token()
    if not tok:
        raise RuntimeError("no GitHub token found at " + str(TOKEN_FILE))
    req = urllib.request.Request(
        "https://api.github.com" + path,
        data=json.dumps(payload).encode() if payload is not None else None,
        method=method,
        headers={"Authorization": "Bearer " + tok,
                 "Accept": "application/vnd.github+json",
                 "Content-Type": "application/json",
                 "User-Agent": "universal-ai-game-studio"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read().decode() or "{}")


def _git(args):
    env = {k: os.environ[k] for k in ("PATH", "HOME", "LANG") if k in os.environ}
    env["GIT_TERMINAL_PROMPT"] = "0"
    return subprocess.run(["git"] + args, cwd=str(STUDIO_DIR), env=env,
                          capture_output=True, text=True, timeout=580)


def init_repo(progress):
    """Ensure the nested repo exists, is configured and points at origin."""
    if not (STUDIO_DIR / ".git").exists():
        r = _git(["init"])
        if r.returncode:
            raise RuntimeError("git init: " + r.stderr[-300:])
        _git(["symbolic-ref", "HEAD", "refs/heads/main"])
        (STUDIO_DIR / ".gitignore").write_text("__pycache__/\n*.pyc\n")
        progress("github: studio repository initialized")
    # ensure config on BOTH fresh and pre-existing repos (a pre-existing repo
    # may lack the credential helper — without it push prompts and fails)
    if not _git(["config", "user.email"]).stdout.strip():
        _git(["config", "user.name", "UGS Sync"])
        _git(["config", "user.email", "ugs-sync@local"])
    _git(["config", "credential.helper", "!" + str(CRED_HELPER)])
    me = gh_api("GET", "/user")
    owner = me["login"]
    full = owner + "/" + REPO_NAME
    try:
        gh_api("GET", "/repos/" + full)
        progress("github: repo " + full + " ready")
    except Exception:
        try:
            gh_api("POST", "/user/repos", {"name": REPO_NAME, "private": True,
                                           "description": "Universal AI Game Studio — code + mirrored games"})
            progress("github: created private repo " + full)
        except Exception as e:
            raise RuntimeError("cannot create GitHub repo: " + str(e)[-200:])
    url = "https://github.com/" + full + ".git"
    r = _git(["remote", "get-url", "origin"])
    if r.returncode:
        _git(["remote", "add", "origin", url])
    elif r.stdout.strip() != url:
        _git(["remote", "set-url", "origin", url])
    return full


def _exclude_oversized(progress):
    """GitHub rejects files >100 MB: exclude them and say so clearly."""
    big = [p for p in STUDIO_DIR.rglob("*")
           if p.is_file() and ".git" not in p.parts and p.stat().st_size > MAX_FILE_BYTES]
    if not big:
        return
    exclude = STUDIO_DIR / ".git" / "info" / "exclude"
    lines = exclude.read_text().splitlines() if exclude.exists() else []
    for p in big:
        rel = "/" + p.relative_to(STUDIO_DIR).as_posix()
        if rel not in lines:
            lines.append(rel)
            progress("github: SKIP %s — %.0f MB exceeds GitHub's 100 MB file limit"
                     % (rel, p.stat().st_size / 1048576))
    exclude.write_text("\n".join(lines) + "\n")


def push(progress):
    """Commit + push the whole studio workspace (code, reports, games)."""
    full = init_repo(progress)
    _exclude_oversized(progress)
    r = _git(["add", "-A"])
    if r.returncode:
        raise RuntimeError("git add: " + r.stderr[-300:])
    r = _git(["commit", "-m", "sync: " + time.strftime("%Y-%m-%d %H:%M")])
    if r.returncode and "nothing to commit" not in r.stdout + r.stderr:
        raise RuntimeError("git commit: " + r.stderr[-300:])
    if "nothing to commit" in r.stdout + r.stderr:
        progress("github: nothing new to push")
        return full
    r = _git(["push", "-u", "origin", "main"])
    if r.returncode:
        raise RuntimeError("git push: " + (r.stderr or r.stdout)[-400:])
    progress("github: pushed studio + games to " + full)
    return full


def restore(progress):
    """Fetch origin and bring back games/ (and reports) from GitHub."""
    full = init_repo(progress)
    r = _git(["fetch", "origin", "main"])
    if r.returncode:
        raise RuntimeError("git fetch: " + r.stderr[-300:] +
                           " (nothing pushed yet?)")
    games = STUDIO_DIR / "games"
    has_projects = games.exists() and any((games / d / "reports" / "summary.json").exists()
                                          for d in (games.iterdir() if games.exists() else []))
    if has_projects:
        progress("github: local games present — nothing to restore")
        return full
    r = _git(["restore", "--source=origin/main", "--worktree", "--staged", "--", "games"])
    if r.returncode:
        raise RuntimeError("git restore: " + r.stderr[-300:])
    n = sum(1 for _ in games.rglob("*")) if games.exists() else 0
    progress("github: restored games/ from GitHub (" + str(n) + " files)")
    return full


def restore_if_needed(progress=print):
    """Best-effort startup restore; never raises."""
    try:
        restore(progress)
    except Exception as e:
        progress("github: restore skipped — " + str(e)[-200:])
