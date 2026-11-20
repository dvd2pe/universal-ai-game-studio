# Universal AI Game Studio

[![CI](https://github.com/dvd2pe/universal-ai-game-studio/actions/workflows/ci.yml/badge.svg)](https://github.com/dvd2pe/universal-ai-game-studio/actions/workflows/ci.yml)
[![Acquire & Build APK](https://github.com/dvd2pe/universal-ai-game-studio/actions/workflows/acquire-build.yml/badge.svg)](https://github.com/dvd2pe/universal-ai-game-studio/actions/workflows/acquire-build.yml)

Acquire a web game from a URL, deep-mirror it byte-identically, reconstruct a locally
playable copy, audit external services/branding, inventory assets with feasibility
scores, and verify the reconstruction by actually playing it in headless Chromium —
then build a standalone signed Android APK on GitHub Actions.

> ⚠️ **Content ownership** — this toolkit ships no game content and holds no license
> to games it processes. Use it only on games **you own**, that are **open source**, or
> for which you hold **explicit permission** to acquire, modify and redistribute.

## What is implemented (honest scope)

| Capability | Status |
|---|---|
| Browser reconnaissance (redirects, iframes, console, runtime globals) | ✅ real |
| Engine detection (Unity WebGL, Godot, Phaser, PixiJS, Three.js, MelonJS, Construct 2/3, GDevelop, Cocos, PlayCanvas, Egret…) | ✅ signature + runtime-globals based |
| Dynamic resource discovery (initial load → game start interaction → scroll/lazy states) | ✅ network capture across phases |
| Resource acquisition (byte-identical, SHA-256 dedupe, retries, size validation) | ✅ real |
| Dependency graph + unresolved refs report | ✅ real |
| URL→local mapping (canonical algorithm shared Python ↔ JS) | ✅ real |
| Reconstruction: HTML/CSS/JS rewriting + runtime interceptor (fetch/XHR/Image/Media) | ✅ real |
| Local serving with engine MIME types (wasm, unityweb, pck…) | ✅ real |
| Runtime verification (play test, console/404/external request audit, animation detection) | ✅ real |
| Explainable acquisition score 0–100 | ✅ weighted, evidence-backed |
| Asset inventory (Pillow/ffprobe metadata) + feasibility scoring | ✅ heuristic, explained |
| Cleanup audit (ads/analytics/tracking/branding) | ✅ **proposals only** — nothing removed |
| Web portal (dashboard, acquisition wizard, reports, live preview) | ✅ FastAPI + static UI |
| APK build | ✅ via GitHub Actions (signed debug APK bundling the mirror) |
| 3D reskin, animation studio, audio AI | ❌ not implemented — not claimed |

## Quickstart (local portal)

```bash
pip install -r requirements.txt
python -m playwright install chromium
python main.py            # → http://127.0.0.1:8000
```

1. Open **Acquire Game**, paste a game URL.
2. Watch the pipeline log: recon → mirror → reconstruct → audit → assets → verify.
3. Open the project: tabs for Recon, Resources, Dependencies, Verification, Audit,
   Assets and a live **Preview** of the local reconstruction served at
   `/games/<slug>/mirror/`.

### CLI

```bash
python scripts/cli.py acquire https://example.com/game --out games
python scripts/cli.py serve --port 8000
```

Project layout after an acquisition:

```text
games/<slug>/
├── acquisition/
│   ├── original/     # byte-identical originals, never modified
│   └── raw/          # raw capture buffers
├── mirror/           # the reconstructed, locally playable copy (served)
│   └── __studio__/   # per-project interceptor + URL mapping
└── reports/          # summary, recon, manifest, depgraph, rewrite, audit, assets, verify
```

## API

| Endpoint | Purpose |
|---|---|
| `POST /api/acquire {url, slug?}` | start acquisition job |
| `GET /api/jobs/{id}` | job status + log |
| `GET /api/projects` | list projects |
| `GET /api/projects/{slug}/reports/{name}` | report JSON (`recon`, `manifest`, `depgraph`, `rewrite`, `audit`, `assets`, `verify`, `score`, `summary`) |
| `GET /games/{slug}/mirror/…` | the local reconstruction |

## Standalone APK via GitHub Actions

Run the **Acquire & Build APK** workflow (Actions tab → workflow_dispatch) with a
`game_url`. It will:

1. run the full acquisition pipeline headlessly,
2. commit the mirror to `games/<slug>/` in this repo,
3. compile, align and **sign a debug APK** (`aapt2 → javac → d8 → zipalign → apksigner`)
   bundling the mirror as `assets/mirror/`,
4. upload `apk-<slug>` as a downloadable artifact.

The wrapper (`android/`) is a fullscreen WebView with JS, DOM storage, file access
and cleartext allowed. Games needing a real server (some Unity WebGL setups) or
backend services will load but may not fully work from `file:///android_asset` —
the verification report tells you in advance whether the mirror is offline-safe.

**Note:** a successful APK build proves compilation + packaging only. Gameplay
verification comes from the pipeline's runtime report, not from the build.

## Honesty policy

- Originals are never modified; every transformation writes to `mirror/`.
- The score explains each component (acquisition, integrity, dependencies, launch,
  runtime paint, coverage, external isolation). Uncertainty is visible, never hidden.
- Audit findings are classified GREEN/YELLOW/RED/UNKNOWN and require explicit human
  approval — nothing is auto-removed.
- Engines/formats without implemented support are reported as such.

## Roadmap (from the original master prompt)

- Phase 3: reference studio (image/video/audio analysis via AI)
- Phase 4: reskin engine + green/yellow/red review + versioning
- Phase 5: sprite-sheet/atlas region replacement, audio studio
- Phase 6: approved cleanup execution
- Phase 7: full QA + export targets
