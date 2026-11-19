"""Game engine / framework detection from reconnaissance evidence.

Evidence-based only: a detection is backed by a global flag, a URL pattern or
a signature string found in the page. Confidence states which kind of proof.
"""
import re

# (engine, [url/content patterns])
SIGNATURES = [
    ("unity-webgl", [r"createUnityInstance", r"\.unityweb", r"UnityProgress", r"unityFramework", r"\.data\.unityweb"]),
    ("godot-web", [r"GodotEngine", r"godot_project", r"\.pck", r"GodotEM"]),
    ("melonjs", [r"melonjs", r"melonJS", r"me\.video", r"me\.game"]),
    ("phaser", [r"phaser", r"Phaser\.GAMES", r"new Phaser\.Game"]),
    ("pixijs", [r"pixi\.js", r"PIXI\.Application", r"pixi-legacy"]),
    ("threejs", [r"three\.min\.js", r"THREE\.WebGLRenderer", r"three\.module"]),
    ("babylonjs", [r"babylon\.js", r"BABYLON\.Engine"]),
    ("playcanvas", [r"playcanvas", r"pc\.Application", r"\.pc\.json"]),
    ("construct2", [r"c2runtime", r"cr_getC2Runtime"]),
    ("construct3", [r"c3runtime", r"C3\.Project"]),
    ("gdevelop", [r"gdjs\.", r"gdevelop"]),
    ("cocos", [r"cocos2d", r"cc\.game", r"cocos-js", r"CocosEngine"]),
    ("egret", [r"egret\.js", r"egret\.", r"egret_"]),
    ("defold", [r"defold", r"\.arcd"]),
    ("wasm-generic", [r"\.wasm"]),
]

# global JS flag -> engine
GLOBAL_CHECKS = {
    "unity": "unity-webgl",
    "godot": "godot-web",
    "melon": "melonjs",
    "phaser": "phaser",
    "pixi": "pixijs",
    "three": "threejs",
    "babylon": "babylonjs",
    "cocos": "cocos",
    "playcanvas": "playcanvas",
    "egret": "egret",
    "construct2": "construct2",
    "construct3": "construct3",
    "gdevelop": "gdevelop",
}


def detect_engine(globals_dict, resources, html_text=""):
    """Return {engine, confidence, evidence[]} — never claims more than the evidence shows."""
    evidence = []
    engines = []

    for flag, engine in GLOBAL_CHECKS.items():
        if globals_dict.get(flag):
            engines.append(engine)
            evidence.append(f"runtime global detected: {flag}")

    urls = " ".join(r.get("url", "") for r in resources)
    haystack = (urls + " " + html_text[:200_000]).lower()
    for engine, patterns in SIGNATURES:
        for pat in patterns:
            if re.search(pat.lower(), haystack):
                engines.append(engine)
                evidence.append(f"signature match: '{pat}'")
                break

    if not engines:
        if globals_dict.get("hasCanvas") or "canvas" in html_text.lower():
            return {"engine": "generic-html5", "confidence": "medium",
                    "evidence": ["<canvas> present, no known engine signature found"]}
        return {"engine": "unknown", "confidence": "none", "evidence": []}

    # most frequently evidenced engine wins
    best = max(set(engines), key=engines.count)
    n = engines.count(best)
    conf = "high" if n >= 2 or (globals_dict.get("hasCanvas") and n >= 1 and any("global" in e for e in evidence)) else "medium"
    return {"engine": best, "confidence": conf, "evidence": evidence[:12]}
