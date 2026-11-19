/* Universal AI Game Studio — runtime URL interceptor.
 * Injected as the first script of every reconstructed page.
 * Maps dynamically constructed resource URLs (fetch/XHR/Image/Media) to
 * their local mirrored paths. Mapping is generated per-project by rewrite.py.
 * The u2r() algorithm MUST stay in sync with studio/rewrite.py:url_to_rel().
 */
(function () {
  "use strict";
  var MAP = __MAPPING_JSON__;
  var ORIGINS = MAP.origins || [];
  var EXACT = MAP.exact || {};

  // absolute URL of the mirror root, derived from this script's own src
  var ROOT = "";
  try {
    var s = document.currentScript && document.currentScript.src;
    var i = s && s.indexOf("/__studio__/interceptor.js");
    if (i >= 0) ROOT = s.slice(0, i);
  } catch (e) {}

  function u2r(u) {
    try {
      var o = new URL(u);
      var host = o.host.replace(/[^A-Za-z0-9._-]/g, "_") || "_";
      var p = decodeURIComponent(o.pathname || "");
      if (!p || p.slice(-1) === "/") p += "index.html";
      var segs = p.split("/").filter(function (x) { return x !== ""; })
        .map(function (x) { return x.replace(/[^A-Za-z0-9._-]/g, "_"); });
      var name = segs.pop() || "index.html";
      var q = (o.search || "").replace(/^\?/, "").replace(/[^A-Za-z0-9._-]/g, "_").slice(0, 12);
      var idx = name.lastIndexOf(".");
      var stem = idx > 0 ? name.slice(0, idx) : name;
      var ext = idx > 0 ? name.slice(idx) : "";
      if (q) name = stem + "__q" + q + ext;
      segs.push(name);
      return host + "/" + segs.join("/");
    } catch (e) { return null; }
  }

  function map(u) {
    try {
      if (u == null) return u;
      u = String(u);
      if (/^(data|blob|javascript|about|chrome):/i.test(u)) return u;
      if (u.indexOf("//") < 0) return u;            // already relative/local
      var o = new URL(u, location.href);
      if (o.protocol !== "http:" && o.protocol !== "https:") return u;
      var clean = o.href.split("#")[0];
      if (EXACT[clean]) return ROOT + "/" + EXACT[clean];
      var origin = o.protocol + "//" + o.host;
      if (ORIGINS.indexOf(origin) >= 0) {
        var rel = u2r(clean);
        if (rel) { console.info("STUDIO-MAP " + clean + " -> " + rel); return ROOT + "/" + rel; }
      }
      console.warn("STUDIO-MISS " + clean);
      return u;
    } catch (e) { return u; }
  }

  // fetch
  var of = window.fetch;
  window.fetch = function (input, init) {
    try {
      if (typeof input === "string") input = map(input);
      else if (input && input.url) input = new Request(map(input.url), input);
    } catch (e) {}
    return of.call(window, input, init);
  };

  // XMLHttpRequest
  var oo = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function (method, url) {
    var args = Array.prototype.slice.call(arguments);
    args[1] = map(url);
    return oo.apply(this, args);
  };

  // Image / audio / video / source .src property
  ["HTMLImageElement", "HTMLMediaElement", "HTMLSourceElement"].forEach(function (n) {
    var p = window[n] && window[n].prototype;
    if (!p) return;
    var d = Object.getOwnPropertyDescriptor(p, "src");
    if (d && d.set) {
      Object.defineProperty(p, "src", {
        get: d.get,
        set: function (v) { try { v = map(v); } catch (e) {} d.set.call(this, v); },
        configurable: true
      });
    }
  });

  // setAttribute('src'|'href') for resource tags
  var sa = Element.prototype.setAttribute;
  Element.prototype.setAttribute = function (name, value) {
    if ((name === "src" || name === "href") && typeof value === "string") {
      try {
        if (this.tagName && /^(IMG|AUDIO|VIDEO|SOURCE|EMBED|OBJECT|IFRAME|SCRIPT|LINK)$/i.test(this.tagName)
            && value.indexOf("//") >= 0) value = map(value);
      } catch (e) {}
    }
    return sa.call(this, name, value);
  };
})();
