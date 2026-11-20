#!/usr/bin/env python3
"""CLI entry point.

  python scripts/cli.py acquire <URL> [--slug S] [--out DIR]
  python scripts/cli.py serve [--port 8000]
"""
import argparse
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from studio import config          # noqa: E402
from studio.pipeline import run_pipeline, slugify  # noqa: E402


def main():
    ap = argparse.ArgumentParser(description="Universal AI Game Studio CLI")
    sub = ap.add_subparsers(dest="cmd", required=True)

    a = sub.add_parser("acquire", help="acquire, mirror, reconstruct and verify a game URL")
    a.add_argument("url")
    a.add_argument("--slug", default=None)
    a.add_argument("--out", default=None)

    s = sub.add_parser("serve", help="start the web portal")
    s.add_argument("--port", type=int, default=8000)

    args = ap.parse_args()
    if args.cmd == "acquire":
        if args.out:
            config.GAMES_DIR = Path(args.out).resolve()
        slug = slugify(args.slug) if args.slug else None
        summary = run_pipeline(args.url, slug=slug)
        print(json.dumps(summary, indent=2))
        print(summary["slug"])  # last line = slug (used by CI)
    elif args.cmd == "serve":
        import uvicorn
        uvicorn.run("main:app", host="127.0.0.1", port=args.port)


if __name__ == "__main__":
    main()
