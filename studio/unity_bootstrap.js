/* Standalone bootstrap for "iframed Unity" wrapper pages (CrazyGames-style).
   These pages wait for a parent gameframe to postMessage the Unity config and
   a loadGame command; served standalone from the mirror there is no parent,
   so the game never starts and the canvas stays black. This bootstrap:
   - shows a visible progress/error overlay (the wrapper only posts progress
     and errors to its parent, which does not exist standalone);
   - after a grace period, if no config arrived, injects the embedded config
     (extracted from the acquired game data at reconstruction time) and starts
     the load, exactly as the gameframe would. */
(function () {
  "use strict";
  var CONFIG = __UNITY_CONFIG_JSON__;
  var GRACE_MS = 1200;

  var box = null, errBox = null;
  function ensureOverlay() {
    if (box) return;
    box = document.createElement("div");
    box.style.cssText = "position:fixed;left:12px;bottom:12px;z-index:2147483647;" +
      "background:rgba(16,18,32,.85);color:#dfe6ff;padding:8px 14px;border-radius:8px;" +
      "font:13px/1.4 system-ui,sans-serif;pointer-events:none";
    errBox = document.createElement("div");
    errBox.style.cssText = "position:fixed;top:12px;left:50%;transform:translateX(-50%);" +
      "z-index:2147483647;background:#b3261e;color:#fff;padding:10px 16px;border-radius:8px;" +
      "font:13px/1.5 system-ui,sans-serif;max-width:80%;display:none;white-space:pre-wrap";
    var mount = document.body || document.documentElement;
    mount.appendChild(errBox);
    mount.appendChild(box);
  }
  function hideOverlay() { if (box) { box.remove(); box = null; } }
  function showError(msg) {
    ensureOverlay();
    errBox.textContent = "Errore caricamento gioco: " + msg;
    errBox.style.display = "block";
    hideOverlay();
  }
  window.addEventListener("message", function (ev) {
    var d = ev && ev.data;
    if (!d || typeof d !== "object") return;
    if (d.type === "loadProgress" && typeof d.progress === "number") {
      ensureOverlay();
      box.textContent = "Caricamento gioco… " + Math.round(d.progress * 100) + "%";
      if (d.progress >= 1) hideOverlay();
    } else if (d.type === "unityError") {
      showError((d.phase ? "[" + d.phase + "] " : "") + (d.errorMessage || "unknown"));
    } else if (d.type === "unityCrashError") {
      showError(d.errorMessage || d.error || "crash");
    }
  });

  function start() {
    if (window.config && window.config.loaderOptions) return; // real parent configured us
    if (typeof window.loadGame !== "function") return;        // not the expected wrapper
    try {
      var unityConfig = Object.assign({
        companyName: CONFIG.companyName || "Studio",
        productName: CONFIG.productName || "Game",
        productVersion: "1.0"
      }, CONFIG.unityConfigOptions || {});
      window.postMessage({
        type: "unity2020config",
        loaderOptions: { showProgress: true, unityLoaderUrl: CONFIG.unityLoaderUrl },
        unityConfig: unityConfig,
        unitySaveFileNames: CONFIG.unitySaveFileNames || {},
        oldSdkInitObject: { gameLink: CONFIG.gameLink || "", userInfo: {} },
        isIos: false,
        isOfflineGaming: false
      }, "*");
      setTimeout(function () { window.postMessage({ type: "loadGame" }, "*"); }, 250);
    } catch (e) {
      showError(String(e && e.message || e));
    }
  }
  if (document.readyState === "complete") setTimeout(start, GRACE_MS);
  else window.addEventListener("load", function () { setTimeout(start, GRACE_MS); });
})();
