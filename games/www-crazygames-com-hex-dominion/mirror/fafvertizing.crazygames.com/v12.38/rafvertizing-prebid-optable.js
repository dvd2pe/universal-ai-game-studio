/* prebid.js v11.23.0
Updated: 2026-10-19
Modules: consentManagementTcf, tcfControl, consentManagementGpp, pairIdSystem, ixBidAdapter, pubmaticBidAdapter, rubiconBidAdapter, gamAdServerVideo, userId, criteoIdSystem, pubProvidedIdSystem, unifiedIdSystem, id5IdSystem, sharedIdSystem, identityLinkIdSystem, lotamePanoramaIdSystem, priceFloors, uid2IdSystem, liveIntentIdSystem, nexx360BidAdapter, hadronIdSystem, ozoneBidAdapter, ttdBidAdapter, atsAnalyticsAdapter, currency, medianetBidAdapter, 33acrossIdSystem, euidIdSystem, publinkIdSystem, equativBidAdapter, msftBidAdapter, apsBidAdapter, rtdModule, optableRtdProvider, kargoBidAdapter */
if (window.pbjs && window.pbjs.libLoaded)
  try {
    window.pbjs.getConfig('debug') &&
      console.warn("Attempted to load a copy of Prebid.js that clashes with the existing 'pbjs' instance. Load aborted.");
  } catch (e) {}
else
  ((function () {
    (() => {
      var r,
        e = {
          1490(r, e, t) {
            function n(r) {
              var e, t, o;
              if (Array.isArray(r)) {
                for (t = Array((e = r.length)); e--; ) t[e] = (o = r[e]) && 'object' == typeof o ? n(o) : o;
                return t;
              }
              if ('[object Object]' === Object.prototype.toString.call(r)) {
                for (e in ((t = {}), r))
                  '__proto__' === e
                    ? Object.defineProperty(t, e, { value: n(r[e]), configurable: !0, enumerable: !0, writable: !0 })
                    : (t[e] = (o = r[e]) && 'object' == typeof o ? n(o) : o);
                return t;
              }
              return r;
            }
            t.d(e, { Q: () => n });
          },
          3435(r, e, t) {
            function n(r, e, t) {
              e.split && (e = e.split('.'));
              for (
                var n, o, i = 0, a = e.length, f = r;
                i < a && '__proto__' != (o = '' + e[i++]) && 'constructor' !== o && 'prototype' !== o;

              )
                f = f[o] = i === a ? t : typeof (n = f[o]) == typeof e ? n : 0 * e[i] != 0 || ~('' + e[i]).indexOf('.') ? {} : [];
            }
            t.d(e, { J: () => n });
          },
          3715(r, e, t) {
            t.d(e, { A: () => n });
            const n = {
              pbGlobal: 'pbjs',
              defineGlobal: !0,
              features: { NATIVE: !0, VIDEO: !0, UID2_CSTG: !0, GREEDY: !1, AUDIO: !0, LOG_NON_ERROR: !0, LOG_ERROR: !0 },
              distUrlBase: 'https://cdn.jsdelivr.net/npm/prebid.js@11.23.0/dist/chunks/',
              skipCalls: {},
            };
          },
          5481(r) {
            /*
             * @license MIT
             * Fun Hooks v1.1.0
             * (c) @snapwich
             */
            ((i.SYNC = 1), (i.ASYNC = 2), (i.QUEUE = 4));
            var e = 'fun-hooks',
              t = Object.freeze({ ready: 0 }),
              n = new WeakMap();
            function o(r, e) {
              return Array.prototype.slice.call(r, e);
            }
            function i(r) {
              var a,
                f = {},
                c = [];
              function u(r, e) {
                return 'function' == typeof r
                  ? y.call(null, 'sync', r, e)
                  : 'string' == typeof r && 'function' == typeof e
                    ? y.apply(null, arguments)
                    : 'object' == typeof r
                      ? l.apply(null, arguments)
                      : void 0;
              }
              function l(r, e, t) {
                var n = !0;
                void 0 === e && ((e = Object.getOwnPropertyNames(r).filter((r) => !r.match(/^_/))), (n = !1));
                var o = {},
                  i = ['constructor'];
                do {
                  (e.forEach(function (e) {
                    var n = e.match(/(?:(sync|async):)?(.+)/),
                      a = n[1] || 'sync',
                      f = n[2];
                    if (!o[f] && 'function' == typeof r[f] && -1 === i.indexOf(f)) {
                      var c = r[f];
                      o[f] = r[f] = y(a, c, t ? [t, f] : void 0);
                    }
                  }),
                    (r = Object.getPrototypeOf(r)));
                } while (n && r);
                return o;
              }
              function p(r) {
                var t = Array.isArray(r) ? r : r.split('.');
                return t.reduce(function (n, o, i) {
                  var f = n[o],
                    u = !1;
                  return (
                    f ||
                    (i === t.length - 1
                      ? (a ||
                          c.push(function () {
                            u || console.warn(e + ": referenced '" + r + "' but it was never created");
                          }),
                        (n[o] = s(function (r) {
                          ((n[o] = r), (u = !0));
                        })))
                      : (n[o] = {}))
                  );
                }, f);
              }
              function s(r) {
                var e = [],
                  t = [],
                  o = function () {},
                  i = {
                    before: function (r, t) {
                      return f.call(this, e, 'before', r, t);
                    },
                    after: function (r, e) {
                      return f.call(this, t, 'after', r, e);
                    },
                    getHooks: function (r) {
                      var n = e.concat(t);
                      'object' == typeof r &&
                        (n = n.filter(function (e) {
                          return Object.keys(r).every(function (t) {
                            return e[t] === r[t];
                          });
                        }));
                      try {
                        Object.assign(n, {
                          remove: function () {
                            return (
                              n.forEach(function (r) {
                                r.remove();
                              }),
                              this
                            );
                          },
                        });
                      } catch (r) {
                        console.error('error adding `remove` to array, did you modify Array.prototype?');
                      }
                      return n;
                    },
                    removeAll: function () {
                      return this.getHooks().remove();
                    },
                  },
                  a = {
                    install: function (n, i, a) {
                      ((this.type = n), (o = a), a(e, t), r && r(i));
                    },
                  };
                return (n.set(i.after, a), i);
                function f(r, n, i, a) {
                  var f = {
                    hook: i,
                    type: n,
                    priority: a || 10,
                    remove: function () {
                      var n = r.indexOf(f);
                      -1 !== n && (r.splice(n, 1), o(e, t));
                    },
                  };
                  return (
                    r.push(f),
                    r.sort(function (r, e) {
                      return e.priority - r.priority;
                    }),
                    o(e, t),
                    this
                  );
                }
              }
              function y(t, f, u) {
                var l = f.after && n.get(f.after);
                if (l) {
                  if (l.type !== t) throw e + ': recreated hookable with different type';
                  return f;
                }
                var y,
                  v = u ? p(u) : s(),
                  d = {
                    get: function (r, e) {
                      return v[e] || Reflect.get.apply(Reflect, arguments);
                    },
                  };
                a || c.push(b);
                var h = new Proxy(f, d);
                return (
                  n.get(h.after).install(t, h, function (r, e) {
                    var n,
                      i = [];
                    r.length || e.length
                      ? (r.forEach(a),
                        (n = i.push(void 0) - 1),
                        e.forEach(a),
                        (y = function (r, e, a) {
                          var f,
                            c = i.slice(),
                            u = 0,
                            l = 'async' === t && 'function' == typeof a[a.length - 1] && a.pop();
                          function p(r) {
                            'sync' === t ? (f = r) : l && l.apply(null, arguments);
                          }
                          function s(r) {
                            if (c[u]) {
                              var n = o(arguments);
                              return ((s.bail = p), n.unshift(s), c[u++].apply(e, n));
                            }
                            'sync' === t ? (f = r) : l && l.apply(null, arguments);
                          }
                          return (
                            (c[n] = function () {
                              var n = o(arguments, 1);
                              'async' === t && l && (delete s.bail, n.push(s));
                              var i = r.apply(e, n);
                              'sync' === t && s(i);
                            }),
                            s.apply(null, a),
                            f
                          );
                        }))
                      : (y = void 0);
                    function a(r) {
                      i.push(r.hook);
                    }
                    b();
                  }),
                  h
                );
                function b() {
                  !a && ('sync' !== t || r.ready & i.SYNC) && ('async' !== t || r.ready & i.ASYNC)
                    ? 'sync' !== t && r.ready & i.QUEUE
                      ? (d.apply = function () {
                          var r = arguments;
                          c.push(function () {
                            h.apply(r[1], r[2]);
                          });
                        })
                      : (d.apply = function () {
                          throw e + ': hooked function not ready';
                        })
                    : (d.apply = y);
                }
              }
              return (
                (r = Object.assign({}, t, r)).ready
                  ? (u.ready = function () {
                      ((a = !0),
                        (function (r) {
                          for (var e; (e = r.shift()); ) e();
                        })(c));
                    })
                  : (a = !0),
                (u.get = p),
                u
              );
            }
            r.exports = i;
          },
          8928(r, e, t) {
            function n(r, e, t, n, o) {
              for (e = e.split ? e.split('.') : e, n = 0; n < e.length; n++) r = r ? r[e[n]] : o;
              return r === o ? t : r;
            }
            t.d(e, { A: () => n });
          },
        },
        t = {};
      function n(r) {
        var o = t[r];
        if (void 0 !== o) return o.exports;
        var i = (t[r] = { exports: {} });
        return (e[r](i, i.exports, n), i.exports);
      }
      ((n.m = e),
        (r = []),
        (n.O = (e, t, o, i) => {
          if (!t) {
            var a = 1 / 0;
            for (l = 0; l < r.length; l++) {
              for (var [t, o, i] = r[l], f = !0, c = 0; c < t.length; c++)
                (!1 & i || a >= i) && Object.keys(n.O).every((r) => n.O[r](t[c])) ? t.splice(c--, 1) : ((f = !1), i < a && (a = i));
              if (f) {
                r.splice(l--, 1);
                var u = o();
                void 0 !== u && (e = u);
              }
            }
            return e;
          }
          i = i || 0;
          for (var l = r.length; l > 0 && r[l - 1][2] > i; l--) r[l] = r[l - 1];
          r[l] = [t, o, i];
        }),
        (n.n = (r) => {
          var e = r && r.__esModule ? () => r.default : () => r;
          return (n.d(e, { a: e }), e);
        }),
        (n.d = (r, e) => {
          for (var t in e) n.o(e, t) && !n.o(r, t) && Object.defineProperty(r, t, { enumerable: !0, get: e[t] });
        }),
        (n.o = (r, e) => Object.prototype.hasOwnProperty.call(r, e)),
        (n.r = (r) => {
          ('undefined' != typeof Symbol && Symbol.toStringTag && Object.defineProperty(r, Symbol.toStringTag, { value: 'Module' }),
            Object.defineProperty(r, '__esModule', { value: !0 }));
        }),
        (() => {
          var r = { 9673: 0 };
          n.O.j = (e) => 0 === r[e];
          var e = (e, t) => {
              var o,
                i,
                [a, f, c] = t,
                u = 0;
              if (a.some((e) => 0 !== r[e])) {
                for (o in f) n.o(f, o) && (n.m[o] = f[o]);
                if (c) var l = c(n);
              }
              for (e && e(t); u < a.length; u++) ((i = a[u]), n.o(r, i) && r[i] && r[i][0](), (r[i] = 0));
              return n.O(l);
            },
            t = (self.pbjsChunk = self.pbjsChunk || []);
          (t.forEach(e.bind(null, 0)), (t.push = e.bind(null, t.push.bind(t))));
        })());
      var o = n.O(void 0, [802, 7769, 5590, 1085], () => n(8224));
      o = n.O(o);
    })();
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [802],
      {
        80(e, t, n) {
          n.d(t, { Cf: () => a, S3: () => i, Tb: () => o, WR: () => s, e4: () => c, pS: () => l, qN: () => d, yB: () => f, zt: () => r });
          const r = ['request', 'imp', 'bidResponse', 'response'],
            [i, o, s, a] = r,
            [d, c] = ['default', 'pbs'],
            u = new Set(r);
          const { registerOrtbProcessor: l, getProcessors: f } = (function () {
            const e = {};
            return {
              registerOrtbProcessor({ type: t, name: n, fn: i, priority: o = 0, dialects: s = [d] }) {
                if (!u.has(t)) throw new Error(`ORTB processor type must be one of: ${r.join(', ')}`);
                s.forEach((r) => {
                  (e.hasOwnProperty(r) || (e[r] = {}), e[r].hasOwnProperty(t) || (e[r][t] = {}), (e[r][t][n] = { priority: o, fn: i }));
                });
              },
              getProcessors: (t) => e[t] || {},
            };
          })();
        },
        84(e, t, n) {
          n.d(t, { Q: () => r });
          const r = (0, n(1785).A_)('sync', () => {});
        },
        217(e, t, n) {
          n.d(t, { d: () => i });
          var r = n(8384);
          function i() {
            return !!r.$W.getConfig('debug');
          }
        },
        323(e, t, n) {
          n.d(t, {
            DL: () => u,
            Ml: () => i,
            Ue: () => r,
            VJ: () => f,
            hE: () => l,
            hq: () => c,
            it: () => m,
            jP: () => g,
            mo: () => d,
            qX: () => o,
            uc: () => a,
            yg: () => p,
            yl: () => s,
          });
          const r = 'accessDevice',
            i = 'syncUser',
            o = 'enrichUfpd',
            s = 'enrichEids',
            a = 'fetchBids',
            d = 'reportAnalytics',
            c = 'transmitEids',
            u = 'transmitUfpd',
            l = 'transmitPreciseGeo',
            f = 'transmitTid',
            g = 'loadExternalScript',
            p = 'accessRequestCredentials',
            m = 'acceptBid';
        },
        537(e, t, n) {
          n.d(t, { Vx: () => d, l7: () => a, p4: () => h, $V: () => m, ZP: () => b, $p: () => y, uD: () => p });
          var r = n(8928),
            i = n(8384),
            o = n(4283),
            s = n(323);
          const a = ['data', 'ext.data', 'yob', 'gender', 'keywords', 'kwarray', 'id', 'buyeruid', 'customdata']
              .map((e) => `user.${e}`)
              .concat('device.ifa'),
            d = ['user.eids', 'user.ext.eids'],
            c = ['user.geo.lat', 'user.geo.lon', 'device.geo.lat', 'device.geo.lon'],
            u = ['device.ip'],
            l = ['device.ipv6'];
          function f(e) {
            return Object.assign(
              {
                get() {},
                run(e, t, n, r, i) {
                  const o = n && n[r];
                  if (m(o) && i()) {
                    const e = this.get(o);
                    void 0 === e ? delete n[r] : (n[r] = e);
                  }
                },
              },
              e,
            );
          }
          function g(e) {
            return (
              e.forEach((e) => {
                e.paths = e.paths.map((e) => {
                  const t = e.split('.'),
                    n = t.pop();
                  return [t.length > 0 ? t.join('.') : null, n];
                });
              }),
              function (t, n, ...i) {
                const o = [],
                  s = p(t, ...i);
                return (
                  e.forEach((e) => {
                    if (!1 !== t[e.name])
                      for (const [i, a] of e.paths) {
                        const d = null == i ? n : (0, r.A)(n, i);
                        if ((o.push(e.run(n, i, d, a, s.bind(null, e))), !1 === t[e.name])) return;
                      }
                  }),
                  o.filter((e) => null != e)
                );
              }
            );
          }
          function p(e, ...t) {
            return function (n) {
              return (e.hasOwnProperty(n.name) || (e[n.name] = !!n.applies(...t)), e[n.name]);
            };
          }
          function m(e) {
            return null != e && ('object' != typeof e || Object.keys(e).length > 0);
          }
          function h(e, t = o.io) {
            return function (n) {
              return !t(e, n);
            };
          }
          function b(e = o.io) {
            return [
              { name: s.DL, paths: a, applies: h(s.DL, e) },
              { name: s.hq, paths: d, applies: h(s.hq, e) },
              { name: s.hE, paths: c, applies: h(s.hE, e), get: (e) => Math.round(100 * (e + Number.EPSILON)) / 100 },
              {
                name: s.hE,
                paths: u,
                applies: h(s.hE, e),
                get: (e) =>
                  (function (e) {
                    if (!e) return null;
                    const t = e.split('.').map(Number);
                    if (4 !== t.length) return null;
                    const n = [];
                    for (let e = 0; e < 4; e++) {
                      const t = Math.max(0, Math.min(8, 24 - 8 * e));
                      n.push((255 << (8 - t)) & 255);
                    }
                    return t.map((e, t) => e & n[t]).join('.');
                  })(e),
              },
              {
                name: s.hE,
                paths: l,
                applies: h(s.hE, e),
                get: (e) =>
                  (function (e) {
                    if (!e) return null;
                    let t = e.split(':').map((e) => parseInt(e, 16));
                    for (t = t.map((e) => (isNaN(e) ? 0 : e)); t.length < 8; ) t.push(0);
                    if (8 !== t.length) return null;
                    const n = [];
                    for (let e = 0; e < 8; e++) {
                      const t = Math.max(0, Math.min(16, 64 - 16 * e));
                      n.push((65535 << (16 - t)) & 65535);
                    }
                    return t
                      .map((e, t) => e & n[t])
                      .map((e) => e.toString(16))
                      .join(':');
                  })(e),
              },
              { name: s.VJ, paths: ['source.tid', 'source.ext.tidSource'], applies: h(s.VJ, e) },
            ].map(f);
          }
          const y = (function (e = o.io) {
            const t = g(b(e)),
              n = g(
                (function (e = o.io) {
                  return [
                    { name: s.hq, paths: ['userId', 'userIdAsEids'], applies: h(s.hq, e) },
                    { name: s.VJ, paths: ['ortb2Imp.ext.tid', 'ortb2Imp.ext.tidSource'], applies: h(s.VJ, e) },
                  ].map(f);
                })(e),
              );
            return function (e) {
              const r = {};
              return { ortb2: (n) => (t(r, n, e), n), bidRequest: (t) => (n(r, t, e), t) };
            };
          })();
          (0, o.qB)(s.VJ, 'enableTIDs config', () => {
            if (!i.$W.getConfig('enableTIDs')) return { allow: !1, reason: 'TIDs are disabled' };
          });
        },
        724(e, t, n) {
          n.d(t, {
            Dk: () => s,
            Ez: () => u,
            Ii: () => o,
            OI: () => l,
            TQ: () => m,
            U3: () => b,
            XG: () => f,
            ZI: () => h,
            Zw: () => c,
            bt: () => g,
            e3: () => p,
            iK: () => a,
            q7: () => d,
          });
          var r = n(7449),
            i = n(1785);
          const o = 'component',
            s = o + 'Type',
            a = o + 'Name',
            d = 'adapterCode',
            c = 'storageType',
            u = 'storageKey',
            l = 'write',
            f = 'configName',
            g = 'syncType',
            p = 'syncUrl',
            m = '_config';
          function h(e) {
            return function (t, n, i) {
              const c = { [s]: t, [a]: n, [o]: `${t}.${n}` };
              return (t === r.tW && (c[d] = e(n)), b(Object.assign(c, i)));
            };
          }
          const b = (0, i.A_)('sync', (e) => e);
        },
        765(e, t, n) {
          n.d(t, { S: () => s });
          var r = n(7413),
            i = n(2354);
          const o = (0, i.CK)('fpdEnrichment'),
            s = (0, r.memoize)(function (e = window.location.host) {
              if (!o.cookiesAreEnabled()) return e;
              const t = e.split('.');
              if (2 === t.length) return e;
              let n,
                r,
                s = -2;
              do {
                ((n = t.slice(s).join('.')), (0, i.d_)(n, o) ? (r = !1) : ((s += -1), (r = Math.abs(s) <= t.length)));
              } while (r);
              return n;
            });
        },
        1068(e, t, n) {
          n.d(t, { B1: () => a, SL: () => E, W1: () => v, ad: () => m, et: () => h, mW: () => p, o2: () => b, t6: () => g });
          var r = n(7413),
            i = n(3350),
            o = n(8203),
            s = n(8384);
          const a = Object.freeze({}),
            d = 'gdpr',
            c = 'gpp',
            u = 'usp',
            l = 'coppa';
          function f({ getMeta: e = (e, t) => ({ generatedAt: t }), hashFields: t } = {}) {
            let n, i, s, a, d, c, u, l, f, g;
            function p() {
              ((s = (0, o.v6)()), (n = !1), (d = null), (c = !1), (a = null), (i = !0), (u = null), (l = null), (f = !1), (g = []));
            }
            function m(e) {
              return e && t ? t.map((t) => e[t]) : e;
            }
            function h(e) {
              return !(0, r.deepEqual)(m(d), m(e));
            }
            function b() {
              i && g.forEach((e) => e(d));
            }
            function y(e) {
              ((i = h(e)), (d = e), (f = !1), (l = null), (c = !0), s.resolve(e), b());
            }
            return (
              p(),
              {
                reset: p,
                get generatedTime() {
                  return a;
                },
                enable() {
                  n = !0;
                },
                get enabled() {
                  return n;
                },
                get ready() {
                  return c;
                },
                get promise() {
                  return c ? (f ? o.U9.reject(l) : o.U9.resolve(d)) : (n || y(null), s.promise);
                },
                setConsentData(e, t = (0, r.timestamp)()) {
                  ((a = t), y(e));
                },
                getConsentData: () => (n ? d : null),
                getConsentMeta() {
                  if (null != a && null != d) return e(d, a);
                },
                error: function (e) {
                  ((i = h(null)), (d = null), (c = !0), (l = e), (f = !0), s.reject(e), b());
                },
                get hash() {
                  return (i && ((u = (0, r.cyrb53Hash)(JSON.stringify(m(d)))), (i = !1)), u);
                },
                onChange(e) {
                  g.push(e);
                },
              }
            );
          }
          const g = f(),
            p = f({
              getMeta(e, t) {
                if (e.vendorData)
                  return {
                    gdprApplies: e.gdprApplies,
                    consentStringSize: (0, i.O8)(e.vendorData.tcString) ? e.vendorData.tcString.length : 0,
                    generatedAt: t,
                    apiVersion: e.apiVersion,
                  };
              },
              hashFields: ['gdprApplies', 'consentString'],
            }),
            m = f({ hashFields: ['applicableSections', 'gppString'] }),
            h = (() => {
              const e = ((e) => Object.assign(e, { getCoppa: () => e.getConsentData(), reset() {} }))(f({ getMeta: (e, t) => e }));
              return (
                e.enable(),
                e.setConsentData(!!s.$W.getConfig('coppa')),
                s.$W.getConfig('coppa', (t) => {
                  e.setConsentData(('object' != typeof t.coppa || !(0, r.isEmpty)(t.coppa)) && !!t.coppa);
                }),
                e
              );
            })();
          const b = (function () {
              const e = {},
                t = {},
                n = {};
              return {
                register(r, i, o) {
                  o && (((e[i] = e[i] || {})[r] = o), t.hasOwnProperty(i) ? t[i] !== o && (t[i] = n) : (t[i] = o));
                },
                get(r) {
                  const i = { modules: e[r] || {} };
                  return (t.hasOwnProperty(r) && t[r] !== n && (i.gvlid = t[r]), i);
                },
              };
            })(),
            y = { [d]: p, [u]: g, [c]: m, [l]: h };
          const E = (function (e = y) {
              const t = Object.entries(e);
              function n(e) {
                return function () {
                  return Object.fromEntries(t.map(([t, n]) => [t, n[e]()]));
                };
              }
              const i = n('getConsentData'),
                s = n('reset');
              let a;
              function d() {
                ((a = []),
                  Object.values(e).forEach((e) =>
                    e.onChange(() => {
                      a.forEach((e) => e(i()));
                    }),
                  ));
              }
              return (
                d(),
                {
                  getConsentData: i,
                  onChange(e) {
                    a.push(e);
                  },
                  get promise() {
                    return o.U9.all(t.map(([e, t]) => t.promise.then((t) => [e, t]))).then((e) => Object.fromEntries(e));
                  },
                  get hash() {
                    return (0, r.cyrb53Hash)(t.map(([e, t]) => t.hash).join(':'));
                  },
                  getConsentMeta: n('getConsentMeta'),
                  reset() {
                    (s(), d());
                  },
                }
              );
            })(),
            v = {};
        },
        1129(e, t, n) {
          n.d(t, { E: () => a, m: () => s });
          var r = n(4864);
          const i = (0, r.uP)() ? window : {},
            o = (i[(0, r.k)()] = i[(0, r.k)()] || {});
          function s() {
            return o;
          }
          function a(e) {
            o.installedModules.push(e);
          }
          ((o.cmd = o.cmd || []),
            (o.que = o.que || []),
            (o.installedModules = o.installedModules || []),
            i === window && ((i._pbjsGlobals = i._pbjsGlobals || []), i._pbjsGlobals.push((0, r.k)())));
        },
        1343(e, t, n) {
          n.d(t, { JE: () => f, OG: () => u, cD: () => d, fH: () => l, h0: () => p, vV: () => g });
          var r = n(8384),
            i = n(217),
            o = n(5521);
          const s = { log: 'MESSAGE', info: 'INFO', warn: 'WARNING', error: 'ERROR' };
          let a;
          function d(e) {
            a = e;
          }
          function c(e, t = !1) {
            const n = window.console?.[e],
              d = `${s[e]}:`;
            return function (...c) {
              ('function' == typeof n &&
                (0, i.d)() &&
                n.apply(
                  console,
                  (function (e, t) {
                    e = [].slice.call(e);
                    const n = r.$W.getCurrentBidder();
                    (t && e.unshift(t), n && e.unshift(i('#aaa')));
                    return (e.unshift(i('#3b88c3')), e.unshift('%cPrebid' + (n ? `%c${n}` : '')), e);
                    function i(e) {
                      return `display: inline-block; color: #fff; background: ${e}; padding: 1px 4px; border-radius: 3px;`;
                    }
                  })(c, d),
                ),
                t &&
                  ((e, ...t) => {
                    null != a && a(e, ...t);
                  })(o.qY.AUCTION_DEBUG, { type: s[e], arguments: c }));
            };
          }
          const u = c('log'),
            l = c('info'),
            f = c('warn', !0),
            g = c('error', !0);
          function p(e) {
            function t(t) {
              return function (...n) {
                t(e, ...n);
              };
            }
            return { logError: t(g), logWarn: t(f), logMessage: t(u), logInfo: t(l) };
          }
        },
        1662(e, t, n) {
          n.d(t, { Ai: () => u, kl: () => l });
          var r = n(7413),
            i = n(3350),
            o = n(8384),
            s = n(1785),
            a = n(4864);
          const d = 'outstream',
            c = [
              ['mimes', (e) => Array.isArray(e) && e.length > 0 && e.every((e) => 'string' == typeof e)],
              ['minduration', i.Fq],
              ['maxduration', i.Fq],
              ['startdelay', i.Fq],
              ['maxseq', i.Fq],
              ['poddur', i.Fq],
              ['protocols', i.Uu],
              ['battr', i.Uu],
              ['maxextended', i.Fq],
              ['minbitrate', i.Fq],
              ['maxbitrate', i.Fq],
              ['delivery', i.Uu],
              ['api', i.Uu],
              ['companiontype', i.Uu],
              ['feed', i.Fq],
              ['stitched', i.Fq],
              ['nvol', i.Fq],
            ],
            u = new Map(c);
          function l(e) {}
          (0, s.A_)(
            'sync',
            function (e, t, n, i, s) {
              if (n && (s || i !== d)) {
                const { url: t, useLocal: n } = o.$W.getConfig('cache') || {};
                return t || n || !e.vastXml || e.vastUrl
                  ? !(!e.vastUrl && !e.vastXml)
                  : ((0, r.logError)(
                      `\n        This bid contains only vastXml and will not work when a prebid cache url is not specified.\n        Try enabling either prebid cache with ${(0, a.k)()}.setConfig({ cache: {url: "..."} });\n        or local cache with ${(0, a.k)()}.setConfig({ cache: { useLocal: true }});\n      `,
                    ),
                    !1);
              }
              return !(i === d && !s) || !!(e.renderer || (t && t.renderer) || n.renderer);
            },
            'checkAudioBidSetup',
          );
        },
        1779(e, t, n) {
          n.d(t, { D4: () => o, FY: () => s, GE: () => a, G_: () => i, s6: () => r });
          const r = 'native',
            i = 'video',
            o = 'banner',
            s = 'audio',
            a = [r, i, o, s];
        },
        1785(e, t, n) {
          n.d(t, { A_: () => s, Gc: () => d, Y6: () => g, Yn: () => c, bz: () => f, u2: () => p, xG: () => l });
          var r = n(5481),
            i = n.n(r),
            o = n(8203);
          const s = i()({ ready: i().SYNC | i().ASYNC | i().QUEUE }),
            a = (0, o.v6)();
          s.ready = (() => {
            const e = s.ready;
            return function () {
              try {
                return e.apply(s);
              } finally {
                a.resolve();
              }
            };
          })();
          const d = a.promise,
            c = s.get;
          const u = {};
          function l(e, t, { postInstallAllowed: n = !1 } = {}) {
            s(
              'async',
              function (r) {
                (r.forEach((e) => t(...e)), n && (u[e] = t));
              },
              e,
            )([]);
          }
          function f(e, ...t) {
            const n = u[e];
            if (n) return n(...t);
            c(e).before((e, n) => {
              (n.push(t), e(n));
            });
          }
          function g(e, t) {
            return (
              Object.defineProperties(
                t,
                Object.fromEntries(['before', 'after', 'getHooks', 'removeAll'].map((t) => [t, { get: () => e[t] }])),
              ),
              t
            );
          }
          function p(e) {
            return g(e, function (...t) {
              return (t.push(function () {}), e.apply(this, t));
            });
          }
        },
        2247(e, t, n) {
          n.d(t, { Y: () => d, Z: () => a });
          var r = n(5423),
            i = n(5521),
            o = n(7413),
            s = n(3721);
          const a = {
            isBidNotExpired: (e) => e.responseTimestamp + 1e3 * (0, r.cT)(e) > (0, o.timestamp)(),
            isUnusedBid: (e) => e && ((e.status && ![i.tl.RENDERED].includes(e.status)) || !e.status),
            isBidNotLocked: (e) => !s.s.isLocked(e.adserverTargeting),
          };
          function d(e) {
            return !Object.values(a).some((t) => !t(e));
          }
        },
        2354(e, t, n) {
          n.d(t, { CK: () => y, X0: () => p, d_: () => E, le: () => h, p6: () => w, qk: () => g, s0: () => m, vM: () => b });
          var r = n(7413),
            i = n(5437),
            o = n(7449),
            s = n(4283),
            a = n(724),
            d = n(323),
            c = n(8384),
            u = n(1785),
            l = n(4794),
            f = n(5881);
          const g = 'html5',
            p = 'cookie';
          let m = [];
          function h({ moduleName: e, moduleType: t, advertiseKeys: n = !0 } = {}, { isAllowed: i = s.io } = {}) {
            function u(r, s, u, g) {
              let p = e;
              const m = c.$W.getCurrentBidder();
              m && t === o.tW && l.Ay.aliasRegistry[m] === e && (p = m);
              const h = { [a.Zw]: s, [a.OI]: g };
              n && null != u && (h[a.Ez] = u);
              return r({ valid: i(d.Ue, (0, f.s)(t, p, h)) });
            }
            function h(e, t, n, r, i) {
              if (!i || 'function' != typeof i) return u(e, t, n, r);
              m.push(function () {
                let o = u(e, t, n, r);
                i(o);
              });
            }
            function b(e) {
              const t = e.charAt(0).toUpperCase() + e.substring(1),
                n = () => window[e],
                i = function (t) {
                  return h(
                    function (t) {
                      if (t && t.valid)
                        try {
                          return !!n();
                        } catch (t) {
                          (0, r.logError)(`${e} api disabled`);
                        }
                      return !1;
                    },
                    g,
                    null,
                    !1,
                    t,
                  );
                };
              return {
                [`has${t}`]: i,
                [`${e}IsEnabled`]: (e) =>
                  h(
                    function (e) {
                      if (e && e.valid)
                        try {
                          return (n().setItem('prebid.cookieTest', '1'), '1' === n().getItem('prebid.cookieTest'));
                        } catch (e) {
                        } finally {
                          try {
                            n().removeItem('prebid.cookieTest');
                          } catch (e) {}
                        }
                      return !1;
                    },
                    g,
                    null,
                    !1,
                    e,
                  ),
                [`setDataIn${t}`]: (e, t, r) =>
                  h(
                    function (r) {
                      r && r.valid && i() && n().setItem(e, t);
                    },
                    g,
                    e,
                    !0,
                    r,
                  ),
                [`getDataFrom${t}`]: (e, t) =>
                  h(
                    function (t) {
                      return t && t.valid && i() ? n().getItem(e) : null;
                    },
                    g,
                    e,
                    !1,
                    t,
                  ),
                [`removeDataFrom${t}`]: (e, t) =>
                  h(
                    function (t) {
                      t && t.valid && i() && n().removeItem(e);
                    },
                    g,
                    e,
                    !0,
                    t,
                  ),
              };
            }
            return {
              setCookie: function (e, t, n, r, i, o) {
                return h(
                  function (o) {
                    if (o && o.valid) {
                      const o = i && '' !== i ? ` ;domain=${encodeURIComponent(i)}` : '',
                        s = n && '' !== n ? ` ;expires=${n}` : '',
                        a = 'none' === r?.toLowerCase() ? '; Secure' : '';
                      document.cookie = `${e}=${encodeURIComponent(t)}${s}; path=/${o}${r ? `; SameSite=${r}` : ''}${a}`;
                    }
                  },
                  p,
                  e,
                  !0,
                  o,
                );
              },
              getCookie: function (e, t) {
                return h(
                  function (t) {
                    if (t && t.valid) {
                      let t = window.document.cookie.match('(^|;)\\s*' + e + '\\s*=\\s*([^;]*)\\s*(;|$)');
                      return t ? decodeURIComponent(t[2]) : null;
                    }
                    return null;
                  },
                  p,
                  e,
                  !1,
                  t,
                );
              },
              cookiesAreEnabled: function (e) {
                return h(
                  function (e) {
                    return !(!e || !e.valid) && (0, r.checkCookieSupport)() && E();
                  },
                  p,
                  null,
                  !1,
                  e,
                );
              },
              ...b('localStorage'),
              ...b('sessionStorage'),
              findSimilarCookies: function (e, t) {
                return h(
                  function (t) {
                    if (t && t.valid) {
                      const t = [];
                      if ((0, r.hasDeviceAccess)()) {
                        const n = document.cookie.split(';');
                        for (; n.length; ) {
                          const r = n.pop();
                          let i = r.indexOf('=');
                          i = i < 0 ? r.length : i;
                          decodeURIComponent(r.slice(0, i).replace(/^\s+/, '')).indexOf(e) >= 0 &&
                            t.push(decodeURIComponent(r.slice(i + 1)));
                        }
                      }
                      return t;
                    }
                  },
                  p,
                  e,
                  !1,
                  t,
                );
              },
            };
          }
          function b({ moduleType: e, moduleName: t, bidderCode: n } = {}) {
            function r() {
              throw new Error('Invalid invocation for getStorageManager: must set either bidderCode, or moduleType + moduleName');
            }
            return (n ? (((e && e !== o.tW) || t) && r(), (e = o.tW), (t = n)) : (t && e) || r(), h({ moduleType: e, moduleName: t }));
          }
          function y(e) {
            return h({ moduleName: e, moduleType: o.tp });
          }
          const E = (() => {
            const e = y('storage');
            return (0, r.memoize)(function (t, n = e) {
              const i = new Date((0, r.timestamp)() + 1e4).toUTCString(),
                o = `_rdc${Date.now()}`,
                s = 'writeable';
              n.setCookie(o, s, i, 'Lax', t);
              return n.getCookie(o) === s && (n.setCookie(o, '', 'Thu, 01 Jan 1970 00:00:01 GMT', void 0, t), !0);
            });
          })();
          function v() {
            if (!(0, r.hasDeviceAccess)()) return { allow: !1 };
          }
          ((0, s.qB)(d.Ue, 'deviceAccess config', v),
            (0, s.qB)(d.yg, 'deviceAccess config', v),
            (0, s.qB)(d.Ue, 'bidderSettings.*.storageAllowed', function (e, t = i.u) {
              if (e[a.Dk] !== o.tW) return;
              let n = t.get(e[a.q7], 'storageAllowed');
              if (n && !0 !== n) {
                const t = e[a.Zw];
                n = Array.isArray(n) ? n.some((e) => e === t) : n === t;
              } else n = !!n;
              return n ? void 0 : { allow: n };
            }));
          const w = (0, u.A_)('sync', (e, t) => {});
        },
        2682(e, t, n) {
          n.d(t, { xb: () => C, a$: () => T });
          var r = n(4794),
            i = n(8384),
            o = n(7797),
            s = n(3838),
            a = n(5657),
            d = n(7791),
            c = n(5521),
            u = n(3399),
            l = n(3350),
            f = n(7413),
            g = n(1785),
            p = n(9015),
            m = n(5437),
            h = n(2822),
            b = n(4283),
            y = n(5881),
            E = n(7449),
            v = n(323);
          const w = ['cpm', 'ttl', 'creativeId', 'netRevenue', 'currency'],
            A = { auctionId: (e) => e.ortb2?.source?.tid, transactionId: (e) => e.ortb2Imp?.ext?.tid };
          function T(e) {
            const t = Array.isArray(e.supportedMediaTypes) ? { supportedMediaTypes: e.supportedMediaTypes } : void 0;
            function n(e) {
              const n = C(e);
              r.Ay.registerBidAdapter(n, e.code, t);
            }
            (n(e),
              Array.isArray(e.aliases) &&
                e.aliases.forEach((t) => {
                  let i,
                    o,
                    s = t;
                  ((0, l.Qd)(t) && ((s = t.code), (i = t.gvlid), (o = t.skipPbsAliasing)),
                    (r.Ay.aliasRegistry[s] = e.code),
                    n(Object.assign({}, e, { code: s, gvlid: i, skipPbsAliasing: o })));
                }));
          }
          const I = (0, f.memoize)(({ bidderCode: e }) => {
            const t = (0, b.io)(v.VJ, (0, y.s)(E.tW, e));
            function n(e, n, r) {
              return A.hasOwnProperty(n) ? (t ? A[n](e) : null) : Reflect.get(e, n, r);
            }
            function r(e, t) {
              const n = new Proxy(e, t);
              return (
                Object.entries(e)
                  .filter(([e, t]) => 'function' == typeof t)
                  .forEach(([t, r]) => {
                    n[t] = r.bind(e);
                  }),
                n
              );
            }
            const i = (0, f.memoize)(
              (e) => r(e, { get: n }),
              (e) => e.bidId,
            );
            return { bidRequest: i, bidderRequest: (e) => r(e, { get: (t, r, o) => ('bids' === r ? e.bids.map(i) : n(t, r, o)) }) };
          });
          function C(e) {
            return Object.assign(
              ((t = e.code),
              (n = t),
              {
                callBids: function () {},
                setBidderCode: function (e) {
                  n = e;
                },
                getBidderCode: function () {
                  return n;
                },
              }),
              {
                getSpec: function () {
                  return Object.freeze(Object.assign({}, e));
                },
                registerSyncs: s,
                callBids: function (t, n, g, b, y, E) {
                  if (!Array.isArray(t.bids)) return;
                  const v = I(t),
                    T = {};
                  function C(e, t, r = null) {
                    const o = (0, h.BO)(t.metrics);
                    (o.checkpoint('addBidResponse'),
                      (T[e] = !0),
                      o.measureTime('addBidResponse.validate', () =>
                        (function (e, t, { index: n = p.n.index, responseMediaType: r = t.mediaType } = {}) {
                          function o() {
                            const e = Object.keys(t);
                            return w.every((n) => e.includes(n) && ![void 0, null].includes(t[n]));
                          }
                          function s(e) {
                            return `Invalid bid from ${t.bidderCode}. Ignoring bid: ${e}`;
                          }
                          if (!e) return ((0, f.logWarn)('No adUnitCode was supplied to addBidResponse.'), !1);
                          if (!t) return ((0, f.logWarn)(`Some adapter tried to add an undefined bid for ${e}.`), !1);
                          if (!o())
                            return (
                              (0, f.logError)(
                                s(
                                  `Bidder ${t.bidderCode} is missing required params. Check http://prebid.org/dev-docs/bidder-adapter-1.html for list of params.`,
                                ),
                              ),
                              !1
                            );
                          const c = i.$W.getConfig('auctionOptions') || {},
                            u = !0 === c.rejectUnknownMediaTypes,
                            l = !1 !== c.rejectInvalidMediaTypes,
                            g = n.getMediaTypes(t);
                          if (g && Object.keys(g).length > 0) {
                            if (null == r && u)
                              return ((0, f.logError)(s(`Bid mediaType is required. Allowed: ${Object.keys(g).join(', ')}`)), !1);
                            if (null != r && l && !g.hasOwnProperty(r))
                              return (
                                (0, f.logError)(
                                  s(`Bid mediaType '${r}' is not supported by the ad unit. Allowed: ${Object.keys(g).join(', ')}`),
                                ),
                                !1
                              );
                          }
                          if ('native' === t.mediaType && !(0, a.Bm)(t, { index: n }))
                            return ((0, f.logError)(s('Native bid missing some required properties.')), !1);
                          if ('video' === t.mediaType && !(0, d.vk)(t, { index: n }))
                            return ((0, f.logError)(s('Video bid does not have required vastUrl or renderer property')), !1);
                          if (
                            'banner' === t.mediaType &&
                            !(function (e, t, { index: n = p.n.index } = {}) {
                              if ((t.width || 0 === parseInt(t.width, 10)) && (t.height || 0 === parseInt(t.height, 10)))
                                return ((t.width = parseInt(t.width, 10)), (t.height = parseInt(t.height, 10)), !0);
                              if (null != t.wratio && null != t.hratio)
                                return ((t.wratio = parseInt(t.wratio, 10)), (t.hratio = parseInt(t.hratio, 10)), !0);
                              const r = n.getBidRequest(t),
                                i = n.getMediaTypes(t),
                                o = (r && r.sizes) || (i && i.banner && i.banner.sizes),
                                s = (0, f.parseSizesInput)(o);
                              if (1 === s.length) {
                                const [e, n] = s[0].split('x');
                                return ((t.width = parseInt(e, 10)), (t.height = parseInt(n, 10)), !0);
                              }
                              return !1;
                            })(0, t, { index: n })
                          )
                            return ((0, f.logError)(s('Banner bids require a width and height')), !1);
                          return !0;
                        })(e, t, { responseMediaType: r }),
                      )
                        ? n(e, t)
                        : n.reject(e, t, c.Tf.INVALID));
                  }
                  const O = [];
                  function B() {
                    (g(),
                      i.$W.runWithBidder(e.code, () => {
                        (u.Ic(c.qY.BIDDER_DONE, t), s(O, t.gdprConsent, t.uspConsent, t.gppConsent));
                      }));
                  }
                  const k = R(t).measureTime('validate', () =>
                    t.bids.filter((t) =>
                      (function (t) {
                        if (!e.isBidRequestValid(t))
                          return ((0, f.logWarn)(`Invalid bid sent to bidder ${e.code}: ${JSON.stringify(t)}`), !1);
                        return !0;
                      })(v.bidRequest(t)),
                    ),
                  );
                  if (0 === k.length) return void B();
                  const U = {};
                  (k.forEach((e) => {
                    U[e.bidId] = e;
                  }),
                    S(e, k, t, b, E, {
                      onRequest: (e) => u.Ic(c.qY.BEFORE_BIDDER_HTTP, t, e),
                      onResponse: (t) => {
                        (y(e.code), O.push(t));
                      },
                      onError: (n, i) => {
                        (i.timedOut || y(e.code),
                          r.Ay.callBidderError(e.code, i, t),
                          u.Ic(c.qY.BIDDER_ERROR, { error: i, bidderRequest: t }),
                          (0, f.logError)(`Server call for ${e.code} failed: ${n} ${i.status}. Continuing without bids.`, {
                            bidRequests: k,
                          }));
                      },
                      onBid: (t) => {
                        const r = U[t.requestId],
                          i = t;
                        if (r) {
                          if (
                            ((i.adapterCode = r.bidder),
                            (function (e, t) {
                              const n = m.u.get(t, 'allowAlternateBidderCodes') || !1;
                              let r = m.u.get(t, 'allowedAlternateBidderCodes');
                              if (
                                e &&
                                t &&
                                t !== e &&
                                ((r = (0, l.cy)(r)
                                  ? r
                                      .map((e) => e.trim().toLowerCase())
                                      .filter((e) => !!e)
                                      .filter(f.uniques)
                                  : r),
                                !n || ((0, l.cy)(r) && '*' !== r[0] && !r.includes(e)))
                              )
                                return !0;
                              return !1;
                            })(t.bidderCode, r.bidder))
                          )
                            return (
                              (0, f.logWarn)(
                                `${t.bidderCode} is not a registered partner or known bidder of ${r.bidder}, hence continuing without bid. If you wish to support this bidder, please mark allowAlternateBidderCodes as true in bidderSettings.`,
                              ),
                              void n.reject(r.adUnitCode, t, c.Tf.BIDDER_DISALLOWED)
                            );
                          ((i.originalCpm = t.cpm),
                            (i.originalCurrency = t.currency),
                            (i.meta = t.meta || Object.assign({}, t[r.bidder])),
                            (i.deferBilling = r.deferBilling),
                            (i.deferRendering = i.deferBilling && (t.deferRendering ?? 'function' != typeof e.onBidBillable)));
                          const s = Object.assign((0, o.O)(r), i, (0, f.pick)(r, Object.keys(A))),
                            a = Object.prototype.hasOwnProperty.call(t, 'mediaType') ? t.mediaType : null;
                          C(r.adUnitCode, s, a);
                        } else
                          ((0, f.logWarn)(`Bidder ${e.code} made bid for unknown request ID: ${t.requestId}. Ignoring.`),
                            n.reject(null, t, c.Tf.INVALID_REQUEST_ID));
                      },
                      onCompletion: B,
                    }));
                },
              },
            );
            var t, n;
            function s(t, n, r, i) {
              B(e, t, n, r, i);
            }
          }
          const O = ['bids', 'paapi'],
            S = (0, g.A_)(
              'async',
              function (e, t, n, r, i, { onRequest: o, onResponse: s, onError: a, onBid: d, onCompletion: u }) {
                const g = R(n);
                u = g.startTiming('total').stopBefore(u);
                const p = I(n);
                let h = g.measureTime('buildRequests', () => e.buildRequests(t.map(p.bidRequest), p.bidderRequest(n)));
                if ((Array.isArray(h) || (h = [h]), !h || 0 === h.length)) return void u();
                const w = (0, f.delayExecution)(u, h.length);
                h.forEach((t) => {
                  const n = g.fork();
                  function u(e) {
                    (null != e && (e.metrics = n.fork().renameWith()), d(e));
                  }
                  const p = i(function (r, i) {
                      A();
                      try {
                        r = JSON.parse(r);
                      } catch (e) {}
                      ((r = { body: r, headers: { get: i.getResponseHeader.bind(i) } }), s(r));
                      try {
                        r = n.measureTime('interpretResponse', () => e.interpretResponse(r, t));
                      } catch (t) {
                        return (
                          (0, f.logError)(`Bidder ${e.code} failed to interpret the server's response. Continuing without bids`, null, t),
                          void w()
                        );
                      }
                      let o;
                      ((o = r && !Object.keys(r).some((e) => !O.includes(e)) ? r.bids : r), o && ((0, l.cy)(o) ? o.forEach(u) : u(o)), w());
                    }),
                    h = i(function (e, t) {
                      (A(), a(e, t), w());
                    });
                  o(t);
                  const A = n.startTiming('net'),
                    T = 'TRUE' === (0, f.getParameterByName)(c.M).toUpperCase() || (0, f.debugTurnedOn)();
                  function I(n) {
                    const r = t.options;
                    return Object.assign(n, r, {
                      browsingTopics:
                        !(r?.hasOwnProperty('browsingTopics') && !r.browsingTopics) &&
                        (m.u.get(e.code, 'topicsHeader') ?? !0) &&
                        (0, b.io)(v.DL, (0, y.s)(E.tW, e.code)),
                      suppressTopicsEnrollmentWarning: r?.hasOwnProperty('suppressTopicsEnrollmentWarning')
                        ? r.suppressTopicsEnrollmentWarning
                        : !T,
                    });
                  }
                  switch (t.method) {
                    case 'GET':
                      r(
                        `${t.url}${(function (e) {
                          if (e) return `?${'object' == typeof e ? (0, f.parseQueryStringParameters)(e) : e}`;
                          return '';
                        })(t.data)}`,
                        { success: p, error: h },
                        void 0,
                        I({ method: 'GET', withCredentials: !0 }),
                      );
                      break;
                    case 'POST':
                      const n = t.options?.endpointCompression,
                        i = ({ url: e, payload: t }) => {
                          r(e, { success: p, error: h }, t, I({ method: 'POST', contentType: 'text/plain', withCredentials: !0 }));
                        };
                      (n && T && (0, f.logWarn)(`Skipping GZIP compression for ${e.code} as debug mode is enabled`),
                        n && !T && (0, f.isGzipCompressionSupported)()
                          ? (0, f.compressDataWithGZip)(t.data).then((e) => {
                              const n = new URL(t.url);
                              (n.searchParams.has('gzip') || n.searchParams.set('gzip', '1'), i({ url: n.href, payload: e }));
                            })
                          : i({ url: t.url, payload: 'string' == typeof t.data ? t.data : JSON.stringify(t.data) }));
                      break;
                    default:
                      ((0, f.logWarn)(`Skipping invalid request from ${e.code}. Request type ${t.method} must be GET or POST`), w());
                  }
                });
              },
              'processBidderRequests',
            ),
            B = (0, g.A_)(
              'async',
              function (e, t, n, o, a) {
                const d = i.$W.getConfig('userSync.aliasSyncEnabled');
                if (e.getUserSyncs && (d || !r.Ay.aliasRegistry[e.code])) {
                  let r = e.getUserSyncs(
                    {
                      iframeEnabled: s.zt.canBidderRegisterSync('iframe', e.code),
                      pixelEnabled: s.zt.canBidderRegisterSync('image', e.code),
                    },
                    t,
                    n,
                    o,
                    a,
                  );
                  r &&
                    (Array.isArray(r) || (r = [r]),
                    r.forEach((t) => {
                      s.zt.registerSync(t.type, e.code, t.url);
                    }),
                    s.zt.bidderDone(e.code));
                }
              },
              'registerSyncs',
            );
          function R(e) {
            return (0, h.BO)(e.metrics).renameWith((t) => [`adapter.client.${t}`, `adapters.client.${e.bidderCode}.${t}`]);
          }
        },
        2822(e, t, n) {
          n.d(t, { Ak: () => h, BO: () => g, K7: () => p, NL: () => b });
          var r = n(8384);
          const i = 'performanceMetrics',
            o = window.performance && window.performance.now ? () => window.performance.now() : () => Date.now(),
            s = new WeakMap();
          function a(e, t, n) {
            return function (...r) {
              t && t();
              try {
                return e.apply(this, r);
              } finally {
                n && n();
              }
            };
          }
          function d({ now: e = o, mkNode: t = u, mkTimer: n = c, mkRenamer: r = (e) => e, nodes: i = s } = {}) {
            return function () {
              return (function o(
                s,
                a = (e) => ({
                  forEach(t) {
                    t(e);
                  },
                }),
              ) {
                a = r(a);
                const d =
                  ((c = 'timestamps'),
                  function (e) {
                    return s.dfWalk({
                      visit(t, n) {
                        const r = n[c];
                        if (r.hasOwnProperty(e)) return r[e];
                      },
                    });
                  });
                var c;
                function u(e, t) {
                  const n = a(e);
                  s.dfWalk({
                    follow: (e, t) => t.propagate && (!e || !e.stopPropagation),
                    visit(e, r) {
                      n.forEach((n) => {
                        null == e ? (r.metrics[n] = t) : (r.groups.hasOwnProperty(n) || (r.groups[n] = []), r.groups[n].push(t));
                      });
                    },
                  });
                }
                function l(t) {
                  return n(e, (e) => u(t, e));
                }
                function f() {
                  const e = {};
                  return (
                    s.dfWalk({
                      visit(t, n) {
                        const r = (t, n) => {
                          Object.prototype.hasOwnProperty.call(e, t) || (e[t] = n);
                        };
                        (Object.entries(n.metrics).forEach(([e, t]) => r(e, t)),
                          (t && !t.includeGroups) || Object.entries(n.groups).forEach(([e, t]) => r(e, t)));
                      },
                    }),
                    e
                  );
                }
                const g = {
                  startTiming: l,
                  measureTime: function (e, t) {
                    return l(e).stopAfter(t)();
                  },
                  measureHookTime: function (e, t, n) {
                    const r = l(e);
                    return n(
                      (function (e) {
                        const t = r.stopBefore(e);
                        return ((t.bail = e.bail && r.stopBefore(e.bail)), (t.stopTiming = r), (t.untimed = e), t);
                      })(t),
                    );
                  },
                  checkpoint: function (t) {
                    s.timestamps[t] = e();
                  },
                  timeSince: function (t, n) {
                    const r = d(t),
                      i = null != r ? e() - r : null;
                    return (null != n && u(n, i), i);
                  },
                  timeBetween: function (e, t, n) {
                    const r = d(e),
                      i = d(t),
                      o = null != r && null != i ? i - r : null;
                    return (null != n && u(n, o), o);
                  },
                  setMetric: u,
                  getMetrics: f,
                  fork: function ({ propagate: e = !0, stopPropagation: n = !1, includeGroups: r = !1 } = {}) {
                    return o(t([[s, { propagate: e, stopPropagation: n, includeGroups: r }]]), a);
                  },
                  join: function (e, { propagate: t = !0, stopPropagation: n = !1, includeGroups: r = !1 } = {}) {
                    const o = i.get(e);
                    null != o && o.addParent(s, { propagate: t, stopPropagation: n, includeGroups: r });
                  },
                  newMetrics: function () {
                    return o(s.newSibling(), a);
                  },
                  renameWith: function (e) {
                    return o(s, e);
                  },
                  toJSON: () => f(),
                };
                return (i.set(g, s), g);
              })(t([]));
            };
          }
          function c(e, t) {
            const n = e();
            let r = !1;
            function i() {
              r || (t(e() - n), (r = !0));
            }
            return ((i.stopBefore = (e) => a(e, i)), (i.stopAfter = (e) => a(e, null, i)), i);
          }
          function u(e) {
            return {
              metrics: {},
              timestamps: {},
              groups: {},
              addParent(t, n) {
                e.push([t, n]);
              },
              newSibling: () => u(e.slice()),
              dfWalk({ visit: t, follow: n = () => !0, visited: r = new Set(), inEdge: i } = {}) {
                let o;
                if (!r.has(this)) {
                  if ((r.add(this), (o = t(i, this)), null != o)) return o;
                  for (const [s, a] of e)
                    if (n(i, a) && ((o = s.dfWalk({ visit: t, follow: n, visited: r, inEdge: a })), null != o)) return o;
                }
              },
            };
          }
          const l = (() => {
            const e = function () {},
              t = () => ({}),
              n = { forEach: e },
              r = () => null;
            ((r.stopBefore = (e) => e), (r.stopAfter = (e) => e));
            const i = Object.defineProperties(
              { dfWalk: e, newSibling: () => i, addParent: e },
              Object.fromEntries(['metrics', 'timestamps', 'groups'].map((e) => [e, { get: t }])),
            );
            return d({ now: () => 0, mkNode: () => i, mkRenamer: () => () => n, mkTimer: () => r, nodes: { get: e, set: e } })();
          })();
          let f = !0;
          function g(e) {
            return (f && e) || l;
          }
          r.$W.getConfig(i, (e) => {
            f = !!e[i];
          });
          const p = (() => {
            const e = d();
            return function () {
              return f ? e() : l;
            };
          })();
          function m(e, t) {
            return function (n, r) {
              return (i, ...o) => g(t.apply(this, o)).measureHookTime(e + n, i, (e) => r.call(this, e, ...o));
            };
          }
          const h = m('requestBids.', (e) => e.metrics),
            b = m('addBidResponse.', (e, t) => t.metrics);
        },
        2859(e, t, n) {
          n.d(t, { JE: () => s, o1: () => o });
          var r = n(8203);
          function i(e, t) {
            e()
              ? (function () {
                  const e = window.scheduler;
                  return 'function' == typeof e?.yield ? e.yield() : r.U9.resolve();
                })().then(t)
              : t();
          }
          function o(e, t) {
            return function (...n) {
              i(e, () => {
                t.apply(this, n);
              });
            };
          }
          function s(e, t, n) {
            !(function (e, t) {
              let n = 0;
              function r() {
                e.length > n ? ((n += 1), e[n - 1](r)) : 'function' == typeof t && t();
              }
              r();
            })(
              t.map((t) => (n) => {
                i(e, () => {
                  (t(), n());
                });
              }),
              n,
            );
          }
        },
        3350(e, t, n) {
          n.d(t, {
            Et: () => u,
            Fq: () => g,
            Go: () => i,
            Lm: () => f,
            O8: () => d,
            Qd: () => l,
            SH: () => o,
            Uu: () => p,
            cy: () => c,
            fp: () => a,
          });
          var r = n(1490);
          function i(e) {
            return (0, r.Q)(e) || {};
          }
          function o(e, t) {
            return t.filter((t) => e[t]).reduce((t, n) => Object.assign(t, { [n]: e[n] }), {});
          }
          const s = Object.prototype.toString;
          function a(e) {
            return 'function' == typeof e;
          }
          function d(e) {
            return 'string' == typeof e;
          }
          const c = Array.isArray.bind(Array);
          function u(e) {
            return 'number' == typeof e;
          }
          function l(e) {
            return '[object Object]' === s.call(e);
          }
          function f(e) {
            return 'boolean' == typeof e;
          }
          const g = Number.isInteger.bind(Number);
          function p(e, t) {
            return c(e) && (!t || e.length === t) && e.every((e) => g(e));
          }
        },
        3399(e, t, n) {
          n.d(t, { AU: () => b, Ic: () => v, KT: () => T, kQ: () => E, on: () => h });
          var r = n(7413),
            i = n(5521),
            o = n(7834),
            s = n(8384),
            a = n(1343);
          const d = 'eventHistoryTTL';
          let c = null;
          const u = (0, o.H)({ monotonic: !0, ttl: () => c });
          s.$W.getConfig(d, (e) => {
            const t = c,
              n = e?.[d];
            ((c = 'number' == typeof n ? 1e3 * n : null), t !== c && u.refresh());
          });
          let l = Object.values(i.qY);
          const f = i.cA;
          let g = 0;
          const p = new WeakMap(),
            m = (function () {
              const e = {};
              function t(e) {
                return l.includes(e);
              }
              function n(n, i, o) {
                if (t(n)) {
                  const t = e[n] || { que: [] };
                  (o ? ((t[o] = t[o] || { que: [] }), t[o].que.push(i)) : t.que.push(i), (e[n] = t));
                } else r.logError('Wrong event name : ' + n + ' Valid event names :' + l);
              }
              return {
                has: t,
                listen: n,
                on: function (e, t, r) {
                  const i = p.has(t) ? p.get(t) : (e, ...n) => t(...n);
                  (p.set(t, i), n(e, i, r));
                },
                emit: function (t, ...n) {
                  !(function (t, n) {
                    r.logMessage('Emitting event for: ' + t);
                    const i = n[0] || {},
                      o = i[f[t]],
                      s = e[t] || { que: [] };
                    var a = Object.keys(s);
                    const d = [],
                      c = { eventType: t, args: i, id: o, elapsedTime: r.getPerformanceNow(), sequence: g++ };
                    (u.add(c),
                      o && a.includes(o) && d.push(...s[o].que),
                      d.push(...s.que),
                      (d || []).forEach(function (e) {
                        if (e)
                          try {
                            e(c, ...n);
                          } catch (e) {
                            r.logError('Error executing handler:', 'events.js', e, t);
                          }
                      }));
                  })(t, n);
                },
                off: function (t, n, i) {
                  null != n && p.has(n) && (n = p.get(n));
                  const o = e[t];
                  if (r.isEmpty(o) || (r.isEmpty(o.que) && r.isEmpty(o[i]))) return;
                  if (i && (r.isEmpty(o[i]) || r.isEmpty(o[i].que))) return;
                  const s = (e) => e.filter((e) => e !== n);
                  (i && o[i].que?.length > 0 ? (o[i].que = s(o[i].que)) : o.que?.length > 0 && (o.que = s(o.que)), (e[t] = o));
                },
                get: function () {
                  return e;
                },
                addEvents: function (e) {
                  l = l.concat(e);
                },
                getEvents: function () {
                  return u.toArray().map((e) => Object.assign({}, e));
                },
              };
            })();
          (0, a.cD)(m.emit.bind(m));
          const { on: h, off: b, get: y, getEvents: E, emit: v, addEvents: w, has: A, listen: T } = m;
        },
        3721(e, t, n) {
          n.d(t, { s: () => d });
          var r = n(8384),
            i = n(7834),
            o = n(7413),
            s = n(7936);
          const a = 3e3;
          const d = (function () {
            let e,
              t,
              n = (0, i.H)({ monotonic: !0, ttl: () => e, slack: 0 });
            r.$W.getConfig('targetingControls', (r) => {
              (({ lock: t, lockTimeout: e = a } = r.targetingControls ?? {}),
                null == t || Array.isArray(t) ? null == t && c() : (t = [t]),
                n.clear());
            });
            const [d, c] = (() => {
              let e = !1;
              function r({ slot: e }) {
                t?.forEach((t) => (0, s.A6)(e, t)?.forEach(n.delete));
              }
              return [
                () => {
                  null != t && !e && (0, o.isGptPubadsDefined)() && (googletag.pubads().addEventListener?.('slotRenderEnded', r), (e = !0));
                },
                () => {
                  e && (0, o.isGptPubadsDefined)() && (googletag.pubads().removeEventListener?.('slotRenderEnded', r), (e = !1));
                },
              ];
            })();
            return {
              isLocked: (e) => t?.some((t) => null != e[t] && n.has(e[t])) ?? !1,
              lock(e) {
                (d(), t?.forEach((t) => null != e[t] && n.add(e[t])));
              },
            };
          })();
        },
        3838(e, t, n) {
          n.d(t, { qh: () => f, zt: () => p });
          var r = n(7413),
            i = n(3350),
            o = n(8384),
            s = n(2354),
            a = n(4283),
            d = n(323),
            c = n(724),
            u = n(7449),
            l = n(5881);
          const f = {
            syncEnabled: !0,
            filterSettings: { image: { bidders: '*', filter: 'include' } },
            syncsPerBidder: 5,
            syncDelay: 3e3,
            auctionDelay: 500,
            usePoliteSync: !1,
          };
          o.$W.setDefaults({ userSync: (0, i.Go)(f) });
          const g = (0, s.CK)('usersync');
          const p = (function (e) {
            const t = {};
            let n = { image: [], iframe: [] };
            const s = new Set();
            let a = {};
            const f = { image: !0, iframe: !1 };
            let g = e.config;
            function p() {
              if (g.syncEnabled && e.browserSupportsCookies) {
                try {
                  (!(function () {
                    if (!f.iframe) return;
                    m(n.iframe, (e) => {
                      const [t, i] = e;
                      ((0, r.logMessage)(`Invoking iframe user sync for bidder: ${t}`),
                        g.usePoliteSync ? (0, r.politeInsertUserSyncIframe)(i) : (0, r.insertUserSyncIframe)(i),
                        (function (e, t) {
                          e.image = e.image.filter((e) => e[0] !== t);
                        })(n, t));
                    });
                  })(),
                    (function () {
                      if (!f.image) return;
                      m(n.image, (e) => {
                        const [t, n] = e;
                        ((0, r.logMessage)(`Invoking image pixel user sync for bidder: ${t}`),
                          g.usePoliteSync ? (0, r.politeTriggerPixel)(n) : (0, r.triggerPixel)(n));
                      });
                    })());
                } catch (e) {
                  return (0, r.logError)('Error firing user syncs', e);
                }
                n = { image: [], iframe: [] };
              }
            }
            function m(e, t) {
              (0, r.shuffle)(e).forEach(t);
            }
            function h(e, t) {
              const n = g.filterSettings;
              if (
                (function (e, t) {
                  if (e.all && e[t])
                    return (
                      (0, r.logWarn)(
                        `Detected presence of the "filterSettings.all" and "filterSettings.${t}" in userSync config.  You cannot mix "all" with "iframe/image" configs; they are mutually exclusive.`,
                      ),
                      !1
                    );
                  const n = e.all ? e.all : e[t],
                    o = e.all ? 'all' : t;
                  if (!n) return !1;
                  const s = n.filter,
                    a = n.bidders;
                  if (s && 'include' !== s && 'exclude' !== s)
                    return (
                      (0, r.logWarn)(
                        `UserSync "filterSettings.${o}.filter" setting '${s}' is not a valid option; use either 'include' or 'exclude'.`,
                      ),
                      !1
                    );
                  if ('*' !== a && !(Array.isArray(a) && a.length > 0 && a.every((e) => (0, i.O8)(e) && '*' !== e)))
                    return (
                      (0, r.logWarn)(
                        `Detected an invalid setup in userSync "filterSettings.${o}.bidders"; use either '*' (to represent all bidders) or an array of bidders.`,
                      ),
                      !1
                    );
                  return !0;
                })(n, e)
              ) {
                f[e] = !0;
                const r = n.all ? n.all : n[e],
                  i = '*' === r.bidders ? [t] : r.bidders,
                  o = { include: (e, t) => !e.includes(t), exclude: (e, t) => e.includes(t) };
                return o[r.filter || 'include'](i, t);
              }
              return !f[e];
            }
            return (
              o.$W.getConfig('userSync', (e) => {
                if (e.userSync) {
                  const t = e.userSync.filterSettings;
                  (0, i.Qd)(t) && (t.image || t.all || (e.userSync.filterSettings.image = { bidders: '*', filter: 'include' }));
                }
                g = Object.assign(g, e.userSync);
              }),
              e.regRule(d.Ml, 'userSync config', (e) => {
                if (!g.syncEnabled) return { allow: !1, reason: 'syncs are disabled' };
                if (e[c.Dk] === u.tW) {
                  const n = e[c.bt],
                    r = e[c.iK];
                  if (!t.canBidderRegisterSync(n, r)) return { allow: !1, reason: `${n} syncs are not enabled for ${r}` };
                }
              }),
              (t.registerSync = (t, o, f) =>
                s.has(o)
                  ? (0, r.logMessage)(`already fired syncs for "${o}", ignoring registerSync call`)
                  : g.syncEnabled && (0, i.cy)(n[t])
                    ? o
                      ? 0 !== g.syncsPerBidder && Number(a[o]) >= g.syncsPerBidder
                        ? (0, r.logWarn)(`Number of user syncs exceeded for "${o}"`)
                        : void (
                            e.isAllowed(d.Ml, (0, l.s)(u.tW, o, { [c.bt]: t, [c.e3]: f })) &&
                            (n[t].push([o, f]),
                            (a = (function (e, t) {
                              return (e[t] ? (e[t] += 1) : (e[t] = 1), e);
                            })(a, o)))
                          )
                      : (0, r.logWarn)('Bidder is required for registering sync')
                    : (0, r.logWarn)(`User sync type "${t}" not supported`)),
              (t.bidderDone = s.add.bind(s)),
              (t.syncUsers = (e = 0) => {
                if (e) return setTimeout(p, Number(e));
                p();
              }),
              (t.triggerUserSyncs = () => {
                g.enableOverride && t.syncUsers();
              }),
              (t.canBidderRegisterSync = (e, t) => !g.filterSettings || !h(e, t)),
              t
            );
          })(
            Object.defineProperties(
              { config: o.$W.getConfig('userSync'), isAllowed: a.io, regRule: a.qB },
              {
                browserSupportsCookies: {
                  get: function () {
                    return !(0, r.isSafariBrowser)() && !(0, r.isFirefoxBrowser)() && !(0, r.isChromeIOSBrowser)() && g.cookiesAreEnabled();
                  },
                },
              },
            ),
          );
        },
        3895(e, t, n) {
          n.d(t, { DX: () => u, HH: () => f, kj: () => l, xh: () => c });
          var r = n(8203),
            i = n(7413),
            o = n(1852),
            s = n(157),
            a = n(1785),
            d = n(5595);
          const c = 3,
            u = (0, a.A_)('sync', function (e) {
              return o.G;
            }),
            l = function (e) {
              return (0, d.Hd)(e) ? s.G : u(e);
            },
            f = (function () {
              const e = {};
              return function (t) {
                const n = l(t);
                return (
                  e.hasOwnProperty(n) ||
                    (e[n] = new r.U9((e) => {
                      const r = (0, i.createInvisibleIframe)();
                      r.srcdoc = `\n            <script>${n}<\/script>\n            <script>\n              window.parent.postMessage(\n                  { type: 'RENDERER_READY_${t.adId}' },\n                  '*'\n            );<\/script>`;
                      const o = (n) => {
                        n.source === r.contentWindow &&
                          n.data?.type === `RENDERER_READY_${t.adId}` &&
                          (window.removeEventListener('message', o), e(r.contentWindow.render));
                      };
                      (window.addEventListener('message', o), document.body.appendChild(r));
                    })),
                  e[n]
                );
              };
            })();
        },
        4283(e, t, n) {
          n.d(t, { io: () => s, qB: () => o });
          var r = n(7413),
            i = n(724);
          const [o, s] = (function (e = (0, r.prefixLog)('Activity control:')) {
            const t = {};
            function n(e) {
              return ((t[e] = t[e] || []), t[e]);
            }
            function o(t, n, r, o) {
              let s;
              try {
                s = r(o);
              } catch (r) {
                (e.logError(`Exception in rule ${n} for '${t}'`, r), (s = { allow: !1, reason: r }));
              }
              return s && Object.assign({ activity: t, name: n, component: o[i.Ii] }, s);
            }
            const s = {};
            function a({ activity: t, name: n, allow: r, reason: i, component: o }) {
              const a = `${n} ${r ? 'allowed' : 'denied'} '${t}' for '${o}'${i ? ':' : ''}`,
                d = s.hasOwnProperty(a);
              if ((d && clearTimeout(s[a]), (s[a] = setTimeout(() => delete s[a], 1e3)), !d)) {
                const t = [a];
                (i && t.push(i), (r ? e.logInfo : e.logWarn).apply(e, t));
              }
            }
            return [
              function (e, t, r, i = 10) {
                const o = n(e),
                  s = o.findIndex(([e]) => i < e),
                  a = [i, t, r];
                return (
                  o.splice(s < 0 ? o.length : s, 0, a),
                  function () {
                    const e = o.indexOf(a);
                    e >= 0 && o.splice(e, 1);
                  }
                );
              },
              function (e, t) {
                let r, i;
                for (const [s, d, c] of n(e)) {
                  if (r !== s && i) break;
                  r = s;
                  const n = o(e, d, c, t);
                  if (n) {
                    if (!n.allow) return (a(n), !1);
                    i = n;
                  }
                }
                return (i && a(i), !0);
              },
            ];
          })();
        },
        4794(e, t, n) {
          n.d(t, { sc: () => z, Ay: () => ie, pX: () => K });
          var r = n(3350),
            i = n(7413),
            o = n(5657),
            s = n(2682),
            a = n(8964),
            d = n(8384),
            c = n(1785);
          const u = 'requests',
            l = 'wins',
            f = 'auctions';
          let g = {};
          function p(e, t) {
            const n = (g[e] = g[e] || { bidders: {} });
            return t ? ((n.bidders[t] = n.bidders[t] || {}), n.bidders[t]) : n;
          }
          function m(e, t) {
            return function (n, r) {
              const i = p(n, t && r);
              return ((i[e] = (i[e] ?? 0) + 1), i[e]);
            };
          }
          function h(e, t) {
            return function (n, r) {
              return p(n, t && r)[e] ?? 0;
            };
          }
          const b = m(u, !1),
            y = m(u, !0),
            E = m(l, !0),
            v = m(f, !1),
            w = h(u, !1),
            A = h(u, !0),
            T = h(l, !0),
            I = h(f, !1);
          var C = n(7686),
            O = n(1068),
            S = n(3399),
            B = n(5521),
            R = n(2822),
            k = n(9015),
            U = n(7449),
            D = n(4283),
            $ = n(323),
            _ = n(724),
            q = n(537),
            x = n(8693),
            j = n(1129);
          const W = 'pbsBidAdapter',
            N = { CLIENT: 'client', SERVER: 'server' },
            P = { isAllowed: D.io, redact: q.$p },
            M = {},
            F = {},
            G = {};
          let L = [];
          d.$W.getConfig('s2sConfig', (e) => {
            e && e.s2sConfig && (L = (0, r.cy)(e.s2sConfig) ? e.s2sConfig : [e.s2sConfig]);
          });
          const z = (0, _.ZI)((e) => ee.resolveAlias(e));
          function V(e) {
            return e.configName ?? e.name;
          }
          const H = ['nativeParams', 'nativeOrtbRequest', 'renderer', 'element'];
          function Q({ bidderCode: e, auctionId: t, bidderRequestId: n, adUnits: o, src: s, metrics: a, getTid: d }) {
            return o
              .reduce((o, c) => {
                const u = c.bids.filter((t) => t.bidder === e);
                return (
                  null == e && 0 === u.length && null != c.s2sBid && u.push({ bidder: null }),
                  o.push(
                    u.reduce((o, u) => {
                      const [l, f] = d(u.bidder, c.transactionId, u.ortb2Imp?.ext?.tid ?? c.ortb2Imp?.ext?.tid),
                        g =
                          null ==
                          (u = Object.assign(
                            {},
                            u,
                            { ortb2Imp: (0, i.mergeDeep)({}, c.ortb2Imp, u.ortb2Imp, { ext: { tid: l, tidSource: f } }) },
                            (0, r.SH)(c, H),
                          )).mediaTypes
                            ? c.mediaTypes
                            : u.mediaTypes;
                      return (
                        (0, i.isValidMediaTypes)(g)
                          ? (u = Object.assign({}, u, { mediaTypes: g }))
                          : (0, i.logError)(`mediaTypes is not correctly configured for adunit ${c.code}`),
                        'client' === s && y(c.code, e),
                        o.push(
                          Object.assign({}, u, {
                            adUnitCode: c.code,
                            transactionId: c.transactionId,
                            adUnitId: c.adUnitId,
                            sizes: g?.banner?.sizes || g?.video?.playerSize || [],
                            bidId: u.bid_id || (0, i.generateUUID)(),
                            bidderRequestId: n,
                            auctionId: t,
                            src: s,
                            metrics: a,
                            auctionsCount: I(c.code),
                            bidRequestsCount: w(c.code),
                            bidderRequestsCount: A(c.code, u.bidder),
                            bidderWinsCount: T(c.code, u.bidder),
                            deferBilling: !!c.deferBilling,
                          }),
                        ),
                        o
                      );
                    }, []),
                  ),
                  o
                );
              }, [])
              .reduce(i.flatten, [])
              .filter((e) => '' !== e);
          }
          const J = (0, c.A_)(
            'sync',
            function (e, t, { getS2SBidders: n = K } = {}) {
              if (null == t) return e;
              {
                const r = n(t);
                return e.filter((e) => {
                  if (!r.has(e.bidder)) return !1;
                  if (null == e.s2sConfigName) return !0;
                  const n = V(t);
                  return (Array.isArray(e.s2sConfigName) ? e.s2sConfigName : [e.s2sConfigName]).includes(n);
                });
              }
            },
            'filterBidsForAdUnit',
          );
          const Y = (0, c.A_)('sync', (e, t) => e, 'setupAdUnitMediaTypes');
          function K(e) {
            (0, r.cy)(e) || (e = [e]);
            const t = new Set([null]);
            return (
              e
                .filter((e) => e && e.enabled)
                .flatMap((e) => e.bidders)
                .forEach((e) => t.add(e)),
              t
            );
          }
          const X = (0, c.A_)(
            'sync',
            function (e, t, { getS2SBidders: n = K } = {}) {
              const r = n(t);
              return (0, i.getBidderCodes)(e).reduce((e, t) => (e[r.has(t) ? N.SERVER : N.CLIENT].push(t), e), {
                [N.CLIENT]: [],
                [N.SERVER]: [],
              });
            },
            'partitionBidders',
          );
          function Z(e) {
            return P.isAllowed($.mo, z(U.Tn, e.provider, { [_.TQ]: e }));
          }
          const ee = {
            bidderRegistry: M,
            analyticsRegistry: G,
            aliasRegistry: F,
            makeBidRequests: (0, c.A_)(
              'sync',
              function (e, t, n, s, a, c = {}, u) {
                ((u = (0, R.BO)(u)),
                  S.Ic(B.qY.BEFORE_REQUEST_BIDS, e),
                  (0, o.nk)(e),
                  e
                    .map((e) => e.code)
                    .filter(i.uniques)
                    .forEach(v));
                const l = c.global || {},
                  f = c.bidder || {},
                  g = (function () {
                    let e, t;
                    return (
                      d.$W.getConfig('consistentTIDs')
                        ? ((e = 'pbjsStable'), (t = (e) => e))
                        : ((e = 'pbjs'),
                          (t = (() => {
                            const e = {};
                            return (t, n) => (
                              e.hasOwnProperty(n) || (e[n] = {}),
                              e[n].hasOwnProperty(t) || (e[n][t] = `u${(0, i.generateUUID)()}`),
                              e[n][t]
                            );
                          })())),
                      function (n, r, i) {
                        return [i ?? t(r, n), null != i ? 'pub' : e];
                      }
                    );
                  })(),
                  p = (() => {
                    const e = {};
                    return function (t, n, r) {
                      const o = ((e, t) => {
                          const n = null != t ? t[_.XG] : '';
                          return n ? `${e}:${n}` : `${e}:`;
                        })(n, r),
                        s = P.redact(null != r ? r : z(U.tW, n));
                      if (void 0 !== e[o]) return [e[o], s];
                      const [a, d] = g(n, t, f[n]?.source?.tid ?? l.source?.tid),
                        c = Object.freeze(s.ortb2((0, i.mergeDeep)({}, l, f[n], { source: { tid: a, ext: { tidSource: d } } })));
                      return ((e[o] = c), [c, s]);
                    };
                  })();
                let { [N.CLIENT]: m, [N.SERVER]: h } = X(e, L);
                const y = new Set();
                (e.forEach((e) => {
                  ((0, r.Qd)(e.mediaTypes) || (e.mediaTypes = {}),
                    (e.bids = e.bids.filter((t) => {
                      if (!t.bidder) return !0;
                      const [r] = p(n, t.bidder),
                        i = h.includes(t.bidder) && !m.includes(t.bidder);
                      return P.isAllowed($.uc, z(U.tW, t.bidder, { bid: t, ortb2: r, adUnit: e, auctionId: n, isS2S: i }));
                    })),
                    e.bids.forEach((e) => {
                      y.add(e.bidder);
                    }),
                    b(e.code));
                }),
                  (m = m.filter((e) => y.has(e))),
                  (h = h.filter((e) => y.has(e))),
                  (e = Y(e, a)),
                  d.$W.getConfig('bidderSequence') === d.Ov && (m = (0, i.shuffle)(m)));
                const E = (0, C.EN)(),
                  w = [];
                function A(e, t) {
                  const [n, r] = p(e.auctionId, e.bidderCode, t);
                  return ((e.ortb2 = n), (e.bids = e.bids.map((e) => ((e.ortb2 = n), r.bidRequest(e)))), e);
                }
                const T = (0, j.m)();
                function I(e) {
                  return (
                    T.pageViewIdPerBidder.has(e) || T.pageViewIdPerBidder.set(e, (0, i.generateUUID)()),
                    T.pageViewIdPerBidder.get(e)
                  );
                }
                L.forEach((o) => {
                  const s = (function (e) {
                    return z(U.tp, W, { [_.XG]: V(e) });
                  })(o);
                  if (o && o.enabled && P.isAllowed($.uc, s)) {
                    const { adUnits: a, hasModuleBids: d } = (function (e, t) {
                        let n = (0, r.Go)(e),
                          o = !1;
                        return (
                          n.forEach((e) => {
                            const n = e.bids.filter((e) => e.module === W && e.params?.configName === V(t));
                            (1 === n.length
                              ? ((e.s2sBid = n[0]), (o = !0), (e.ortb2Imp = (0, i.mergeDeep)({}, e.s2sBid.ortb2Imp, e.ortb2Imp)))
                              : n.length > 1 &&
                                (0, i.logWarn)('Multiple "module" bids for the same s2s configuration; all will be ignored', n),
                              (e.bids = J(e.bids, t).map((e) => ((e.bid_id = (0, i.getUniqueIdentifierStr)()), e))));
                          }),
                          (n = n.filter(
                            (e) =>
                              !(
                                (t.filterBidderlessCalls && 1 === e.bids.length && null == e.bids[0].bidder) ||
                                (0 === e.bids.length && null == e.s2sBid)
                              ),
                          )),
                          { adUnits: n, hasModuleBids: o }
                        );
                      })(e, o),
                      c = (0, i.generateUUID)();
                    ((0 === h.length && d ? [null] : h).forEach((e) => {
                      const d = (0, i.generateUUID)(),
                        l = I(e),
                        f = u.fork(),
                        p = A(
                          {
                            bidderCode: e,
                            auctionId: n,
                            bidderRequestId: d,
                            pageViewId: l,
                            uniquePbsTid: c,
                            bids: Q({
                              bidderCode: e,
                              auctionId: n,
                              bidderRequestId: d,
                              adUnits: (0, r.Go)(a),
                              src: B.RW.SRC,
                              metrics: f,
                              getTid: g,
                            }),
                            auctionStart: t,
                            timeout: o.timeout,
                            src: B.RW.SRC,
                            refererInfo: E,
                            metrics: f,
                            alwaysHasCapacity: o.alwaysHasCapacity,
                          },
                          s,
                        );
                      0 !== p.bids.length && w.push(p);
                    }),
                      a.forEach((e) => {
                        const t = e.bids.filter((e) => w.find((t) => t.bids.find((t) => t.bidId === e.bid_id)));
                        e.bids = t;
                      }),
                      w.forEach((e) => {
                        void 0 === e.adUnitsS2SCopy && (e.adUnitsS2SCopy = a.filter((e) => e.bids.length > 0 || null != e.s2sBid));
                      }));
                  }
                });
                const k = (function (e) {
                  let t = (0, r.Go)(e);
                  return (
                    t.forEach((e) => {
                      e.bids = J(e.bids, null);
                    }),
                    (t = t.filter((e) => 0 !== e.bids.length)),
                    t
                  );
                })(e);
                return (
                  m.forEach((e) => {
                    const o = (0, i.generateUUID)(),
                      a = I(e),
                      d = u.fork(),
                      c = M[e],
                      l = A({
                        bidderCode: e,
                        auctionId: n,
                        pageViewId: a,
                        bidderRequestId: o,
                        bids: Q({
                          bidderCode: e,
                          auctionId: n,
                          bidderRequestId: o,
                          adUnits: (0, r.Go)(k),
                          src: 'client',
                          metrics: d,
                          getTid: g,
                        }),
                        auctionStart: t,
                        timeout: s,
                        refererInfo: E,
                        metrics: d,
                        src: 'client',
                        alwaysHasCapacity: c?.getSpec?.().alwaysHasCapacity,
                      });
                    (c || (0, i.logError)(`Trying to make a request for bidder that does not exist: ${e}`),
                      c && l.bids && 0 !== l.bids.length && w.push(l));
                  }),
                  w.forEach((e) => {
                    (O.mW.getConsentData() && (e.gdprConsent = O.mW.getConsentData()),
                      O.t6.getConsentData() && (e.uspConsent = O.t6.getConsentData()),
                      O.ad.getConsentData() && (e.gppConsent = O.ad.getConsentData()));
                  }),
                  w
                );
              },
              'makeBidRequests',
            ),
            callBids(e, t, n, r, o, s, c, u = {}) {
              if (!t.length) return void (0, i.logWarn)('callBids executed with no bidRequests.  Were they filtered by labels or sizing?');
              const [l, f] = t.reduce((e, t) => (e[Number(void 0 !== t.src && t.src === B.RW.SRC)].push(t), e), [[], []]);
              var g = [];
              f.forEach((e) => {
                for (var t = -1, n = 0; n < g.length; ++n)
                  if (e.uniquePbsTid === g[n].uniquePbsTid) {
                    t = n;
                    break;
                  }
                t <= -1 && g.push(e);
              });
              let p = 0;
              (L.forEach((e) => {
                if (e && g[p] && K(e).has(g[p].bidderCode)) {
                  const t = (0, a.er)(U.tp, W, s, o ? { request: o.request.bind(null, 's2s'), done: o.done } : void 0),
                    d = e.bidders,
                    l = M[e.adapter],
                    m = g[p].uniquePbsTid,
                    h = g[p].adUnitsS2SCopy,
                    b = f.filter((e) => e.uniquePbsTid === m);
                  if (l) {
                    const o = { ad_units: h, s2sConfig: e, ortb2Fragments: u, requestBidsTimeout: s };
                    if (o.ad_units.length) {
                      const e = b.map(
                          (e) => (
                            (e.start = (0, i.timestamp)()),
                            function (t, ...n) {
                              (t || c(e.bidderRequestId), r.apply(e, [t, ...n]));
                            }
                          ),
                        ),
                        s = (0, i.getBidderCodes)(o.ad_units).filter((e) => d.includes(e));
                      ((0, i.logMessage)(
                        `CALLING S2S HEADER BIDDERS ==== ${s.length > 0 ? s.join(', ') : 'No bidder specified, using "ortb2Imp" definition(s) only'}`,
                      ),
                        b.forEach((e) => {
                          S.Ic(B.qY.BID_REQUESTED, { ...e, tid: e.auctionId });
                        }),
                        l.callBids(o, f, n, (t) => e.forEach((e) => e(t)), t));
                    }
                  } else (0, i.logError)('missing ' + e.adapter);
                  p++;
                }
              }),
                l.forEach((e) => {
                  e.start = (0, i.timestamp)();
                  const t = M[e.bidderCode];
                  d.$W.runWithBidder(e.bidderCode, () => {
                    ((0, i.logMessage)('CALLING BIDDER'), S.Ic(B.qY.BID_REQUESTED, e));
                  });
                  const u = (0, a.er)(U.tW, e.bidderCode, s, o ? { request: o.request.bind(null, e.bidderCode), done: o.done } : void 0),
                    l = r.bind(e);
                  try {
                    d.$W.runWithBidder(
                      e.bidderCode,
                      t.callBids.bind(t, e, n, l, u, () => c(e.bidderRequestId), d.$W.callbackWithBidder(e.bidderCode)),
                    );
                  } catch (t) {
                    ((0, i.logError)(`${e.bidderCode} Bid Adapter emitted an uncaught error when parsing their bidRequest`, {
                      e: t,
                      bidRequest: e,
                    }),
                      l());
                  }
                }));
            },
            videoAdapters: [],
            registerBidAdapter(e, t, { supportedMediaTypes: n = [] } = {}) {
              e && t
                ? 'function' == typeof e.callBids
                  ? ((M[t] = e),
                    O.o2.register(U.tW, t, e.getSpec?.().gvlid),
                    n.includes('video') && ee.videoAdapters.push(t),
                    n.includes('native') && o.mT.push(t))
                  : (0, i.logError)('Bidder adaptor error for bidder code: ' + t + 'bidder must implement a callBids() function')
                : (0, i.logError)('bidAdapter or bidderCode not specified');
            },
            aliasBidAdapter(e, t, n) {
              if (void 0 === M[t]) {
                const r = M[e];
                if (void 0 === r) {
                  const n = [];
                  (L.forEach((r) => {
                    if (r.bidders && r.bidders.length) {
                      const i = r && r.bidders;
                      r && i.includes(t) ? (F[t] = e) : n.push(e);
                    }
                  }),
                    n.forEach((e) => {
                      (0, i.logError)('bidderCode "' + e + '" is not an existing bidder.', 'adapterManager.aliasBidAdapter');
                    }));
                } else
                  try {
                    let a;
                    const d = (function (e) {
                      const t = [];
                      ee.videoAdapters.includes(e) && t.push('video');
                      o.mT.includes(e) && t.push('native');
                      return t;
                    })(e);
                    if (r.constructor.prototype !== Object.prototype) ((a = new r.constructor()), a.setBidderCode(t));
                    else {
                      const { useBaseGvlid: o = !1 } = n || {},
                        d = r.getSpec(),
                        c = o ? d.gvlid : n?.gvlid;
                      null == c &&
                        null != d.gvlid &&
                        (0, i.logWarn)(
                          `Alias '${t}' will NOT re-use the GVL ID of the original adapter ('${d.code}', gvlid: ${d.gvlid}). Functionality that requires TCF consent may not work as expected.`,
                        );
                      const u = n && n.skipPbsAliasing;
                      ((a = (0, s.xb)(Object.assign({}, d, { code: t, gvlid: c, skipPbsAliasing: u }))), (F[t] = e));
                    }
                    ee.registerBidAdapter(a, t, { supportedMediaTypes: d });
                  } catch (t) {
                    (0, i.logError)(e + ' bidder does not currently support aliasing.', 'adapterManager.aliasBidAdapter');
                  }
              } else (0, i.logMessage)('alias name "' + t + '" has been already specified.');
            },
            resolveAlias(e) {
              let t,
                n = e;
              for (; F[n] && (!t || !t.has(n)); ) ((n = F[n]), (t = t || new Set()).add(n));
              return n;
            },
            registerAnalyticsAdapter({ adapter: e, code: t, gvlid: n }) {
              e && t
                ? 'function' == typeof e.enableAnalytics
                  ? ((e.code = t), (G[t] = { adapter: e, gvlid: n }), O.o2.register(U.Tn, t, n))
                  : (0, i.logError)(
                      `Prebid Error: Analytics adaptor error for analytics "${t}"\n        analytics adapter must implement an enableAnalytics() function`,
                    )
                : (0, i.logError)('Prebid Error: analyticsAdapter or analyticsCode not specified');
            },
            enableAnalytics(e) {
              ((0, r.cy)(e) || (e = [e]),
                e.forEach((e) => {
                  const t = G[e.provider];
                  if (t && t.adapter) {
                    if (((t.config = e), Z(e)))
                      try {
                        (t.adapter.enableAnalytics(e), (t.enabled = !0));
                      } catch (t) {
                        (0, i.logError)(`Could not enable '${e.provider}' analytics`, t);
                      }
                  } else (0, i.logError)(`Prebid Error: no analytics adapter found in registry for '${e.provider}'.`);
                }));
            },
            disableAnalytics(e) {
              const t = G[e];
              if (t && t.enabled)
                if ('function' == typeof t.adapter.disableAnalytics)
                  try {
                    (t.adapter.disableAnalytics(), (t.enabled = !1));
                  } catch (t) {
                    (0, i.logError)(`Could not disable '${e}' analytics`, t);
                  }
                else (0, i.logWarn)(`Could not disable '${e}' analytics: adapter does not provide a 'disableAnalytics' method`);
            },
            refreshAnalytics() {
              Object.entries(G).forEach(([e, t]) => {
                const { enabled: n, config: r } = t;
                n && !Z(r) ? ee.disableAnalytics(e) : n || null == r || ee.enableAnalytics(r);
              });
            },
            getBidAdapter: (e) => M[e],
            getAnalyticsAdapter: (e) => G[e],
            callTimedOutBidders(e, t, n) {
              ((t = t.map((t) => ((t.params = (0, i.getUserConfiguredParams)(e, t.adUnitCode, t.bidder)), (t.timeout = n), t))),
                (t = (0, i.groupBy)(t, 'bidder')),
                Object.keys(t).forEach((e) => {
                  re(e, 'onTimeout', t[e]);
                }));
            },
            callBidWonBidder(e, t, n) {
              ((t.params = (0, i.getUserConfiguredParams)(n, t.adUnitCode, t.bidder)), E(t.adUnitCode, t.bidder), re(e, 'onBidWon', t));
            },
            triggerBilling: (() => {
              const e = new WeakSet();
              return (t) => {
                e.has(t) ||
                  (e.add(t),
                  ((0, x.$T)(t.eventtrackers)[x.OA]?.[x.Ni] || []).forEach((e) => i.internal.triggerPixel(e)),
                  re(t.bidder, 'onBidBillable', t));
              };
            })(),
            callSetTargetingBidder(e, t) {
              re(e, 'onSetTargeting', t);
            },
            callBidViewableBidder(e, t) {
              re(e, 'onBidViewable', t);
            },
            callBidderError(e, t, n) {
              re(e, 'onBidderError', { error: t, bidderRequest: n });
            },
            callAdRenderSucceededBidder(e, t) {
              re(e, 'onAdRenderSucceeded', t);
            },
            callOnInterventionBidder(e, t, n) {
              re(e, 'onIntervention', { bid: t, intervention: n });
            },
            callDataDeletionRequest: (0, c.A_)('sync', function (...e) {
              const t = 'onDataDeletionRequest';
              (Object.keys(M)
                .filter((e) => !F.hasOwnProperty(e))
                .forEach((n) => {
                  const r = te(n, t);
                  if (null != r) {
                    const i = k.n.getBidsRequested().filter(
                      (e) =>
                        (function (e) {
                          const t = new Set();
                          for (; F.hasOwnProperty(e) && !t.has(e); ) (t.add(e), (e = F[e]));
                          return e;
                        })(e.bidderCode) === n,
                    );
                    ne(n, t, ...r, i, ...e);
                  }
                }),
                Object.entries(G).forEach(([n, r]) => {
                  const o = r?.adapter?.[t];
                  if ('function' == typeof o)
                    try {
                      o.apply(r.adapter, e);
                    } catch (e) {
                      (0, i.logError)(`error calling ${t} of ${n}`, e);
                    }
                }));
            }),
          };
          function te(e, t) {
            const n = M[e],
              r = n?.getSpec && n.getSpec();
            if (r && r[t] && 'function' == typeof r[t]) return [r, r[t]];
          }
          function ne(e, t, n, r, ...o) {
            try {
              ((0, i.logInfo)(`Invoking ${e}.${t}`), d.$W.runWithBidder(e, r.bind(n, ...o)));
            } catch (n) {
              (0, i.logWarn)(`Error calling ${t} of ${e}`);
            }
          }
          function re(e, t, n) {
            if (n?.source !== B.RW.SRC) {
              const r = te(e, t);
              null != r && ne(e, t, ...r, n);
            }
          }
          O.SL.onChange(ee.refreshAnalytics);
          const ie = ee;
        },
        4864(e, t, n) {
          n.d(t, { k: () => i, rT: () => s, uP: () => o });
          var r = n(3715);
          function i() {
            return r.A.pbGlobal;
          }
          function o() {
            return r.A.defineGlobal;
          }
          function s() {
            return r.A.distUrlBase;
          }
        },
        4983(e, t, n) {
          n.d(t, { j: () => s, v: () => a });
          var r = n(5437),
            i = n(7413),
            o = n(9200);
          function s(e, t, n = {}) {
            const s = n.bs ?? r.u,
              a = Object.assign({}, e),
              d = e.cpm,
              c = (0, o.H)(e, s, 'bidDesirabilityAdjustment', t);
            if ('function' != typeof c) return d;
            try {
              return c(d, a, t);
            } catch (e) {
              return ((0, i.logError)('Error during bid desirability adjustment', e), d);
            }
          }
          function a(e, t) {
            return t.desirability && e.desirability ? t.desirability - e.desirability : t.cpm - e.cpm;
          }
        },
        5262(e, t, n) {
          function r(e) {
            if (null != e.element) return e.element;
            const t = e.adUnitCode ?? e.code;
            return t ? document.getElementById(t) : null;
          }
          n.d(t, { o: () => r });
        },
        5423(e, t, n) {
          n.d(t, { S9: () => g, X9: () => p, cT: () => f, lc: () => h });
          var r = n(8384),
            i = n(7413),
            o = n(5521);
          const s = 'minBidCacheTTL',
            a = 'minTargetedBidCacheTTL';
          let d = 1,
            c = null,
            u = null;
          const l = [];
          function f(e) {
            return e.ttl - (e.hasOwnProperty('ttlBuffer') ? e.ttlBuffer : d);
          }
          function g() {
            return c;
          }
          function p(e) {
            const t = c;
            return null == t && null == u ? null : e?.status === o.tl.BID_TARGETING_SET && 'number' == typeof u ? u : t;
          }
          function m() {
            l.forEach((e) => e(c));
          }
          function h(e) {
            l.push(e);
          }
          (r.$W.getConfig('ttlBuffer', (e) => {
            'number' == typeof e.ttlBuffer ? (d = e.ttlBuffer) : (0, i.logError)('Invalid value for ttlBuffer', e.ttlBuffer);
          }),
            r.$W.getConfig(s, (e) => {
              const t = c;
              ((c = e?.[s]), (c = 'number' == typeof c ? c : null), t !== c && m());
            }),
            r.$W.getConfig(a, (e) => {
              const t = u;
              ((u = e?.[a]), (u = 'number' == typeof u ? u : null), t !== u && m());
            }));
        },
        5437(e, t, n) {
          n.d(t, { u: () => a });
          var r = n(7413),
            i = n(8928),
            o = n(1129),
            s = n(5521);
          const a = new (class {
            constructor(e, t) {
              ((this.getSettings = e), (this.defaultScope = t));
            }
            get(e, t) {
              let n = this.getOwn(e, t);
              return (void 0 === n && (n = this.getOwn(null, t)), n);
            }
            getOwn(e, t) {
              return ((e = this.#e(e)), (0, i.A)(this.getSettings(), `${e}.${t}`));
            }
            getScopes() {
              return Object.keys(this.getSettings()).filter((e) => e !== this.defaultScope);
            }
            settingsFor(e) {
              return (0, r.mergeDeep)({}, this.ownSettingsFor(null), this.ownSettingsFor(e));
            }
            ownSettingsFor(e) {
              return ((e = this.#e(e)), this.getSettings()[e] || {});
            }
            #e(e) {
              return e ?? this.defaultScope;
            }
          })(() => (0, o.m)().bidderSettings || {}, s.iD.BD_SETTING_STANDARD);
        },
        5521(e, t, n) {
          n.d(t, {
            IY: () => v,
            M: () => i,
            RW: () => f,
            Tf: () => p,
            UE: () => d,
            Zh: () => u,
            _B: () => y,
            as: () => s,
            cA: () => a,
            h0: () => m,
            iD: () => r,
            jO: () => h,
            nl: () => E,
            oA: () => b,
            qY: () => o,
            tl: () => g,
            x5: () => l,
            xS: () => c,
          });
          const r = {
              PL_CODE: 'code',
              PL_SIZE: 'sizes',
              PL_BIDS: 'bids',
              BD_BIDDER: 'bidder',
              BD_ID: 'paramsd',
              BD_PL_ID: 'placementId',
              ADSERVER_TARGETING: 'adserverTargeting',
              BD_SETTING_STANDARD: 'standard',
            },
            i = 'waf_debug',
            o = {
              AUCTION_INIT: 'auctionInit',
              AUCTION_TIMEOUT: 'auctionTimeout',
              AUCTION_END: 'auctionEnd',
              BID_ADJUSTMENT: 'bidAdjustment',
              BID_TIMEOUT: 'bidTimeout',
              BID_REQUESTED: 'bidRequested',
              BID_RESPONSE: 'bidResponse',
              BID_ACCEPTED: 'bidAccepted',
              BID_REJECTED: 'bidRejected',
              NO_BID: 'noBid',
              BID_WON: 'bidWon',
              BIDDER_DONE: 'bidderDone',
              BIDDER_ERROR: 'bidderError',
              SET_TARGETING: 'setTargeting',
              BEFORE_REQUEST_BIDS: 'beforeRequestBids',
              BEFORE_BIDDER_HTTP: 'beforeBidderHttp',
              REQUEST_BIDS: 'requestBids',
              AD_RENDER_FAILED: 'adRenderFailed',
              AD_RENDER_SUCCEEDED: 'adRenderSucceeded',
              TCF2_ENFORCEMENT: 'tcf2Enforcement',
              AUCTION_DEBUG: 'auctionDebug',
              BID_VIEWABLE: 'bidViewable',
              STALE_RENDER: 'staleRender',
              EXPIRED_RENDER: 'expiredRender',
              BILLABLE_EVENT: 'billableEvent',
              PBS_ANALYTICS: 'pbsAnalytics',
              BEFORE_PBS_HTTP: 'beforePBSHttp',
              BROWSI_INIT: 'browsiInit',
              BROWSI_DATA: 'browsiData',
              BROWSER_INTERVENTION: 'browserIntervention',
            },
            s = {
              PREVENT_WRITING_ON_MAIN_DOCUMENT: 'preventWritingOnMainDocument',
              NO_AD: 'noAd',
              EXCEPTION: 'exception',
              CANNOT_FIND_AD: 'cannotFindAd',
              MISSING_DOC_OR_ADID: 'missingDocOrAdid',
            },
            a = { bidWon: 'adUnitCode' },
            d = { LOW: 'low', MEDIUM: 'medium', HIGH: 'high', AUTO: 'auto', DENSE: 'dense', CUSTOM: 'custom' },
            c = {
              BIDDER: 'hb_bidder',
              AD_ID: 'hb_adid',
              PRICE_BUCKET: 'hb_pb',
              SIZE: 'hb_size',
              DEAL: 'hb_deal',
              SOURCE: 'hb_source',
              FORMAT: 'hb_format',
              UUID: 'hb_uuid',
              CACHE_ID: 'hb_cache_id',
              CACHE_HOST: 'hb_cache_host',
              ADOMAIN: 'hb_adomain',
              ACAT: 'hb_acat',
              CRID: 'hb_crid',
              DSP: 'hb_dsp',
              VERSION: 'hb_ver',
            },
            u = {
              BIDDER: 'hb_bidder',
              AD_ID: 'hb_adid',
              PRICE_BUCKET: 'hb_pb',
              SIZE: 'hb_size',
              DEAL: 'hb_deal',
              FORMAT: 'hb_format',
              UUID: 'hb_uuid',
              CACHE_HOST: 'hb_cache_host',
              VERSION: 'hb_ver',
            },
            l = {
              title: 'hb_native_title',
              body: 'hb_native_body',
              body2: 'hb_native_body2',
              privacyLink: 'hb_native_privacy',
              privacyIcon: 'hb_native_privicon',
              sponsoredBy: 'hb_native_brand',
              image: 'hb_native_image',
              icon: 'hb_native_icon',
              clickUrl: 'hb_native_linkurl',
              displayUrl: 'hb_native_displayurl',
              cta: 'hb_native_cta',
              rating: 'hb_native_rating',
              address: 'hb_native_address',
              downloads: 'hb_native_downloads',
              likes: 'hb_native_likes',
              phone: 'hb_native_phone',
              price: 'hb_native_price',
              salePrice: 'hb_native_saleprice',
              rendererUrl: 'hb_renderer_url',
              adTemplate: 'hb_adTemplate',
            },
            f = { SRC: 's2s', DEFAULT_ENDPOINT: 'https://prebid.adnxs.com/pbs/v1/openrtb2/auction', SYNCED_BIDDERS_KEY: 'pbjsSyncs' },
            g = { BID_TARGETING_SET: 'targetingSet', RENDERED: 'rendered', BID_REJECTED: 'bidRejected' },
            p = {
              INVALID: 'Bid has missing or invalid properties',
              INVALID_REQUEST_ID: 'Invalid request ID',
              BIDDER_DISALLOWED: 'Bidder code is not allowed by allowedAlternateBidderCodes / allowUnknownBidderCodes',
              FLOOR_NOT_MET: 'Bid does not meet price floor',
              CANNOT_CONVERT_CURRENCY: 'Unable to convert currency',
              DSA_REQUIRED: 'Bid does not provide required DSA transparency info',
              DSA_MISMATCH: 'Bid indicates inappropriate DSA rendering method',
              PRICE_TOO_HIGH: 'Bid price exceeds maximum value',
            },
            m = {
              body: 'desc',
              body2: 'desc2',
              sponsoredBy: 'sponsored',
              cta: 'ctatext',
              rating: 'rating',
              address: 'address',
              downloads: 'downloads',
              likes: 'likes',
              phone: 'phone',
              price: 'price',
              salePrice: 'saleprice',
              displayUrl: 'displayurl',
            },
            h = {
              sponsored: 1,
              desc: 2,
              rating: 3,
              likes: 4,
              downloads: 5,
              price: 6,
              saleprice: 7,
              phone: 8,
              address: 9,
              desc2: 10,
              displayurl: 11,
              ctatext: 12,
            },
            b = { ICON: 1, MAIN: 3 },
            y = ['privacyIcon', 'clickUrl', 'adTemplate', 'rendererUrl', 'type'],
            E = {
              REQUEST: 'Prebid Request',
              RESPONSE: 'Prebid Response',
              NATIVE: 'Prebid Native',
              EVENT: 'Prebid Event',
              INTERVENTION: 'Prebid Intervention',
            },
            v = '__pb_locator__';
        },
        5595(e, t, n) {
          n.d(t, {
            BS: () => F,
            Hd: () => L,
            Hh: () => W,
            Pk: () => N,
            Uc: () => B,
            XO: () => G,
            bw: () => _,
            n6: () => C,
            qn: () => q,
            vB: () => P,
            vW: () => R,
            vd: () => U,
          });
          var r = n(7413),
            i = n(3399),
            o = n(5521),
            s = n(8384),
            a = n(6901),
            d = n(1779),
            c = n(9015),
            u = n(3895),
            l = n(1785),
            f = n(5657),
            g = n(4794),
            p = n(2822),
            m = n(2247),
            h = n(8693),
            b = n(2859),
            y = n(8203);
          const { AD_RENDER_FAILED: E, AD_RENDER_SUCCEEDED: v, STALE_RENDER: w, BID_WON: A, EXPIRED_RENDER: T } = o.qY,
            { EXCEPTION: I } = o.as,
            C = (0, l.A_)('sync', function (e) {
              (((0, h.$T)(e.eventtrackers)[h.RO]?.[h.Ni] || []).forEach((e) => (0, r.triggerPixel)(e)), i.Ic(A, e), c.n.addWinningBid(e));
            });
          function O({ reason: e, message: t, bid: n, id: o }) {
            const s = { reason: e, message: t };
            (n && ((s.bid = n), (s.adId = n.adId)), o && (s.adId = o), (0, r.logError)(`Error rendering ad (id: ${o}): ${t}`), i.Ic(E, s));
          }
          function S({ doc: e, bid: t, id: n }) {
            const r = { doc: e, bid: t, adId: n };
            (g.Ay.callAdRenderSucceededBidder(t.adapterCode || t.bidder, t), i.Ic(v, r));
          }
          function B(e, t) {
            switch (e.event) {
              case o.qY.AD_RENDER_FAILED:
                O({ bid: t, id: t.adId, reason: e.info.reason, message: e.info.message });
                break;
              case o.qY.AD_RENDER_SUCCEEDED:
                S({ doc: null, bid: t, id: t.adId });
                break;
              case o.qY.BROWSER_INTERVENTION:
                !(function (e) {
                  const { bid: t, intervention: n } = e;
                  (g.Ay.callOnInterventionBidder(t.adapterCode || t.bidder, t, n), i.Ic(o.qY.BROWSER_INTERVENTION, e));
                })({ bid: t, adId: t.adId, intervention: e.intervention });
                break;
              default:
                (0, r.logError)(`Received event request for unsupported event: '${e.event}' (adId: '${t.adId}')`);
            }
          }
          function R(e, t, { resizeFn: n, fireTrackers: r = f.vO }) {
            if ('resizeNativeHeight' === e.action) n(e.width, e.height);
            else r(e, t);
          }
          const k = { [o.nl.EVENT]: B };
          k[o.nl.NATIVE] = R;
          const U = (0, l.A_)('sync', function (e, t) {
            const { ad: n, adUrl: r, width: i, height: o, instl: s } = D(e, t);
            return { ad: n, adUrl: r, width: i, height: o, instl: s };
          });
          function D(e, t) {
            const { ad: n, adUrl: i, cpm: o, originalCpm: s, safeRenderer: a } = e,
              d = { AUCTION_PRICE: s || o, CLICKTHROUGH: t?.clickUrl || '' },
              c = { ...e, ad: (0, r.replaceMacros)(n, d), adUrl: (0, r.replaceMacros)(i, d) };
            return (a && (c.safeRenderer = { ...a, config: 'function' == typeof a?.getConfig ? a.getConfig(e) : a?.config }), c);
          }
          const $ = (0, l.A_)(
            'sync',
            function ({
              renderFn: e,
              resizeFn: t,
              bidResponse: n,
              options: i,
              doc: s,
              isMainDocument: a = s === document && !(0, r.inIframe)(),
            }) {
              const c = L(n),
                u = n.mediaType === d.G_;
              if ((a || u) && !c?.url)
                return void O({
                  reason: o.as.PREVENT_WRITING_ON_MAIN_DOCUMENT,
                  message: u ? 'Cannot render video ad without a renderer' : 'renderAd was prevented from writing to the main document.',
                  bid: n,
                  id: n.adId,
                });
              const l = (function (e, t, n) {
                if (n) {
                  const { ad: n, adUrl: r, width: i, height: o, instl: s, vastXml: a, vastUrl: d, mediaType: c, safeRenderer: u } = D(e, t);
                  return { ad: n, adUrl: r, width: i, height: o, instl: s, vastXml: a, vastUrl: d, mediaType: c, safeRenderer: u };
                }
                return U(e, t);
              })(n, i, c);
              e(Object.assign({ adId: n.adId }, l));
              const { width: f, height: g } = l;
              null != (f ?? g) && t(f, g);
            },
          );
          function _({ renderFn: e, resizeFn: t, adId: n, options: a, bidResponse: d, doc: c }) {
            W(d, () => {
              if (null != d) {
                if (
                  (d.status !== o.tl.RENDERED ||
                    ((0, r.logWarn)(`Ad id ${n} has been rendered before`),
                    i.Ic(w, d),
                    !s.$W.getConfig('auctionOptions')?.suppressStaleRender)) &&
                  (m.Z.isBidNotExpired(d) ||
                    ((0, r.logWarn)(`Ad id ${n} has been expired`), i.Ic(T, d), !s.$W.getConfig('auctionOptions')?.suppressExpiredRender))
                )
                  try {
                    $({ renderFn: e, resizeFn: t, bidResponse: d, options: a, doc: c });
                  } catch (e) {
                    O({ reason: o.as.EXCEPTION, message: e.message, id: n, bid: d });
                  }
              } else O({ reason: o.as.CANNOT_FIND_AD, message: `Cannot find ad '${n}'`, id: n });
            });
          }
          function q(e) {
            const t = (0, p.BO)(e.metrics);
            (t.checkpoint('bidRender'),
              t.timeBetween('bidWon', 'bidRender', 'render.deferred'),
              t.timeBetween('auctionEnd', 'bidRender', 'render.pending'),
              t.timeBetween('requestBids', 'bidRender', 'render.e2e'),
              (e.status = o.tl.RENDERED));
          }
          $.before(function (e, t) {
            const { bidResponse: n, doc: r } = t;
            (0, a.J7)(n.renderer) && !L(n) ? ((0, a.Pg)(n.renderer, n, r), S({ doc: r, bid: n, id: n.adId }), e.bail()) : e(t);
          }, 100);
          const x = new WeakMap(),
            j = new WeakSet();
          function W(e, t) {
            null != e ? (x.set(e, t), e.deferRendering || P(e), N(e)) : t();
          }
          function N(e) {
            j.has(e) || (j.add(e), C(e));
          }
          function P(e) {
            const t = x.get(e);
            t && (t(), q(e), x.delete(e));
          }
          let M = !1;
          s.$W.getConfig('auctionOptions', (e) => {
            M = e.auctionOptions?.legacyRender ?? !1;
          });
          const F = (0, b.o1)(
            () => !M,
            function (e, t, n) {
              let i;
              function s(e, n) {
                O(Object.assign({ id: t, bid: i }, { reason: e, message: n }));
              }
              function a(t, n) {
                const r = e.defaultView?.frameElement;
                r &&
                  (t && ((r.width = t), r.style.width && (r.style.width = `${t}px`)),
                  n && ((r.height = n), r.style.height && (r.style.height = `${n}px`)));
              }
              const d =
                ((l = { resizeFn: a }),
                function (e, t, n) {
                  k.hasOwnProperty(e) && k[e](t, n, l);
                });
              var l;
              function f(e) {
                return new y.U9((t) => {
                  'loading' === e.readyState ? e.addEventListener('DOMContentLoaded', t) : t();
                });
              }
              try {
                t && e
                  ? ((i = c.n.findBidByAdId(t)),
                    _({
                      renderFn: function (t) {
                        t.ad && M
                          ? (e.write(t.ad), e.close(), S({ doc: e, bid: i, id: i.adId }))
                          : y.U9.all([(0, u.HH)(i), f(e)])
                              .then(([n]) => n(t, { sendMessage: (e, t) => d(e, t, i), mkFrame: r.createIframe }, e.defaultView))
                              .then(
                                () => S({ doc: e, bid: i, id: i.adId }),
                                (e) => {
                                  (s(e?.reason || o.as.EXCEPTION, e?.message), e?.stack && (0, r.logError)(e));
                                },
                              );
                        const n = document.createComment(`Creative ${i.creativeId} served by ${i.bidder} Prebid.js Header Bidding`);
                        (0, r.insertElement)(n, e, 'html');
                      },
                      resizeFn: a,
                      adId: t,
                      options: { clickUrl: n?.clickThrough },
                      bidResponse: i,
                      doc: e,
                    }))
                  : s(o.as.MISSING_DOC_OR_ADID, 'missing ' + (t ? 'doc' : 'adId'));
              } catch (e) {
                s(I, e.message);
              }
            },
          );
          function G() {
            if (!window.frames[o.IY])
              if (document.body) {
                const e = (0, r.createInvisibleIframe)();
                ((e.name = o.IY), document.body.appendChild(e));
              } else window.requestAnimationFrame(G);
          }
          function L(e) {
            return e.safeRenderer;
          }
        },
        5657(e, t, n) {
          n.d(t, { Bm: () => E, IX: () => C, Xj: () => k, gs: () => w, l6: () => m, mT: () => l, nk: () => b, vO: () => v, yl: () => O });
          var r = n(7413),
            i = n(3350),
            o = n(9015),
            s = n(5521),
            a = n(1779),
            d = n(5595),
            c = n(3895),
            u = n(8693);
          const l = [],
            f = {
              image: {
                ortb: {
                  ver: '1.2',
                  assets: [
                    { required: 1, id: 1, img: { type: 3, wmin: 100, hmin: 100 } },
                    { required: 1, id: 2, title: { len: 140 } },
                    { required: 1, id: 3, data: { type: 1 } },
                    { required: 0, id: 4, data: { type: 2 } },
                    { required: 0, id: 5, img: { type: 1, wmin: 20, hmin: 20 } },
                  ],
                },
                image: { required: !0 },
                title: { required: !0 },
                sponsoredBy: { required: !0 },
                clickUrl: { required: !0 },
                body: { required: !1 },
                icon: { required: !1 },
              },
            },
            g = $(s.h0),
            p = $(s.jO);
          function m(e) {
            return null != e.native && 'object' == typeof e.native;
          }
          function h(e) {
            if (
              (e &&
                e.type &&
                (function (e) {
                  if (!e || !Object.keys(f).includes(e)) return ((0, r.logError)(`${e} nativeParam is not supported`), !1);
                  return !0;
                })(e.type) &&
                (e = f[e.type]),
              !e || !e.ortb || y(e.ortb))
            )
              return e;
          }
          function b(e) {
            e.forEach((e) => {
              const t = e.nativeParams || e?.mediaTypes?.native;
              (t && (e.nativeParams = h(t)),
                e.nativeParams &&
                  (e.nativeOrtbRequest =
                    e.nativeParams.ortb ||
                    (function (e) {
                      if (!e && !(0, i.Qd)(e)) return void (0, r.logError)('Native assets object is empty or not an object: ', e);
                      const t = { ver: '1.2', assets: [] };
                      for (const n in e) {
                        if (s._B.includes(n)) continue;
                        if (!s.x5.hasOwnProperty(n)) {
                          (0, r.logError)(`Unrecognized native asset code: ${n}. Asset will be ignored.`);
                          continue;
                        }
                        if ('privacyLink' === n) {
                          t.privacy = 1;
                          continue;
                        }
                        const o = e[n];
                        let a = 0;
                        o.required && (0, i.Lm)(o.required) && (a = Number(o.required));
                        const d = { id: t.assets.length, required: a };
                        if (n in s.h0) ((d.data = { type: s.jO[s.h0[n]] }), o.len && (d.data.len = o.len));
                        else if ('icon' === n || 'image' === n) {
                          if (((d.img = { type: 'icon' === n ? s.oA.ICON : s.oA.MAIN }), o.aspect_ratios))
                            if ((0, i.cy)(o.aspect_ratios))
                              if (o.aspect_ratios.length) {
                                const { min_width: e, min_height: t } = o.aspect_ratios[0];
                                (0, i.Fq)(e) && (0, i.Fq)(t)
                                  ? ((d.img.wmin = e), (d.img.hmin = t))
                                  : (0, r.logError)('image.aspect_ratios min_width or min_height are invalid: ', e, t);
                                const n = o.aspect_ratios
                                  .filter((e) => e.ratio_width && e.ratio_height)
                                  .map((e) => `${e.ratio_width}:${e.ratio_height}`);
                                n.length > 0 && (d.img.ext = { aspectratios: n });
                              } else (0, r.logError)("image.aspect_ratios was passed, but it's empty:", o.aspect_ratios);
                            else (0, r.logError)("image.aspect_ratios was passed, but it's not a an array:", o.aspect_ratios);
                          o.sizes &&
                            (2 === o.sizes.length && (0, i.Fq)(o.sizes[0]) && (0, i.Fq)(o.sizes[1])
                              ? ((d.img.w = o.sizes[0]), (d.img.h = o.sizes[1]), delete d.img.hmin, delete d.img.wmin)
                              : (0, r.logError)('image.sizes was passed, but its value is not an array of integers:', o.sizes));
                        } else 'title' === n ? (d.title = { len: o.len || 140 }) : 'ext' === n && ((d.ext = o), delete d.required);
                        t.assets.push(d);
                      }
                      return t;
                    })(e.nativeParams)));
            });
          }
          function y(e) {
            const t = e.assets;
            if (!Array.isArray(t) || 0 === t.length)
              return ((0, r.logError)("assets in mediaTypes.native.ortb is not an array, or it's empty. Assets: ", t), !1);
            const n = t.map((e) => e.id);
            return t.length !== new Set(n).size || n.some((e) => e !== parseInt(e, 10))
              ? ((0, r.logError)("each asset object must have 'id' property, it must be unique and it must be an integer"), !1)
              : e.hasOwnProperty('eventtrackers') && !Array.isArray(e.eventtrackers)
                ? ((0, r.logError)('ortb.eventtrackers is not an array. Eventtrackers: ', e.eventtrackers), !1)
                : t.every((e) =>
                    (function (e) {
                      if (!(0, i.Qd)(e)) return ((0, r.logError)('asset must be an object. Provided asset: ', e), !1);
                      if (e.img) {
                        if (!(0, i.Et)(e.img.w) && !(0, i.Et)(e.img.wmin))
                          return ((0, r.logError)("for img asset there must be 'w' or 'wmin' property"), !1);
                        if (!(0, i.Et)(e.img.h) && !(0, i.Et)(e.img.hmin))
                          return ((0, r.logError)("for img asset there must be 'h' or 'hmin' property"), !1);
                      } else if (e.title) {
                        if (!(0, i.Et)(e.title.len)) return ((0, r.logError)("for title asset there must be 'len' property defined"), !1);
                      } else if (e.data) {
                        if (!(0, i.Et)(e.data.type)) return ((0, r.logError)("for data asset 'type' property must be a number"), !1);
                      } else if (
                        e.video &&
                        !(
                          Array.isArray(e.video.mimes) &&
                          Array.isArray(e.video.protocols) &&
                          (0, i.Et)(e.video.minduration) &&
                          (0, i.Et)(e.video.maxduration)
                        )
                      )
                        return ((0, r.logError)('video asset is not properly configured'), !1);
                      return !0;
                    })(e),
                  );
          }
          function E(e, { index: t = o.n.index } = {}) {
            const n = t.getAdUnit(e);
            if (!n) return !1;
            const i = n.nativeOrtbRequest;
            return (function (e, t) {
              if (!e?.link?.url) return ((0, r.logError)("native response doesn't have 'link' property. Ortb response: ", e), !1);
              const n = t.assets.filter((e) => 1 === e.required).map((e) => e.id),
                i = e.assets.map((e) => e.id),
                o = n.every((e) => i.includes(e));
              o || (0, r.logError)(`didn't receive a bid with all required assets. Required ids: ${n}, but received ids in response: ${i}`);
              return o;
            })(e.native?.ortb || D(e.native, i), i);
          }
          function v(e, t) {
            const n = t.native.ortb || U(t.native);
            return (
              'click' === e.action
                ? (function (e, t = null, { fetchURL: n = r.triggerPixel } = {}) {
                    if (t) {
                      const r = (e.assets || []).filter((e) => e.link).reduce((e, t) => ((e[t.id] = t.link), e), {}),
                        i = e.link?.clicktrackers || [],
                        o = r[t];
                      let s = i;
                      (o && (s = o.clicktrackers || []), s.forEach((e) => n(e)));
                    } else (e.link?.clicktrackers || []).forEach((e) => n(e));
                  })(n, e?.assetId)
                : (function (e, t, { runMarkup: n = (e) => (0, r.insertHtmlIntoIframe)(e), fetchURL: i = r.triggerPixel } = {}) {
                    const s = (function (e, t) {
                      const n = [
                          { event: u.OA, methods: [u.Ni, u.fR] },
                          { event: u.w3, methods: [u.Ni, u.fR] },
                        ],
                        r = (o.n.index.getMediaTypes(t) || {}).native || {},
                        i = r.ortb?.eventtrackers || n,
                        { eventtrackers: s = [] } = e || {};
                      return s.filter((e) => i.some((t) => t.event === e.event && t.methods.includes(e.method)));
                    })(e, t);
                    let { [u.Ni]: a = [], [u.fR]: d = [] } = (0, u.$T)(s || [])[u.OA] || {};
                    e.imptrackers && (a = a.concat(e.imptrackers));
                    (a.forEach((e) => i(e)),
                      (d = d.map((e) => `<script async src="${e}"><\/script>`)),
                      e.jstracker && (d = d.concat([e.jstracker])));
                    d.length && n(d.join('\n'));
                  })(n, t),
              e.action
            );
          }
          function w(e, t) {
            const n = t?.nativeOrtbRequest,
              r = e.native?.ortb;
            if (n && r) {
              const t = (function (e, t) {
                const n = {},
                  r = t?.assets || [];
                ((n.clickUrl = e.link?.url), (n.privacyLink = e.privacy));
                for (const t of e?.assets || []) {
                  const e = r.find((e) => t.id === e.id);
                  t.title
                    ? (n.title = t.title.text)
                    : t.img
                      ? (n[e?.img?.type === s.oA.MAIN ? 'image' : 'icon'] = { url: t.img.url, width: t.img.w, height: t.img.h })
                      : t.data && (n[g[p[e?.data?.type]]] = t.data.value);
                }
                n.impressionTrackers = [];
                let i = [];
                e.imptrackers && n.impressionTrackers.push(...e.imptrackers);
                for (const t of e?.eventtrackers || [])
                  (t.event === u.OA && t.method === u.Ni && n.impressionTrackers.push(t.url),
                    t.event === u.OA && t.method === u.fR && i.push(t.url));
                ((i = i.map((e) => `<script async src="${e}"><\/script>`)), e?.jstracker && i.push(e.jstracker));
                i.length && (n.javascriptTrackers = i.join('\n'));
                return n;
              })(r, n);
              Object.assign(e.native, t);
            }
            ['rendererUrl', 'adTemplate'].forEach((n) => {
              const r = t?.nativeParams?.[n];
              r && (e.native[n] = S(r));
            });
          }
          function A(e, t, n = !1) {
            const r = [];
            return (
              Object.entries(e)
                .filter(([e, r]) => r && ((!1 === n && 'ext' === e) || null == t || t.includes(e)))
                .forEach(([e, i]) => {
                  !1 === n && 'ext' === e ? r.push(...A(i, t, !0)) : (n || s.x5.hasOwnProperty(e)) && r.push({ key: e, value: S(i) });
                }),
              r
            );
          }
          function T(e, t, n, { index: r = o.n.index } = {}) {
            const a = { message: 'assetResponse', adId: e.adId };
            let u = (0, d.vd)(t).native;
            return (
              u
                ? ((a.native = Object.assign({}, u)),
                  (a.renderer = (0, c.DX)(t)),
                  (a.rendererVersion = c.xh),
                  null != n && (u.assets = u.assets.filter(({ key: e }) => n.includes(e))))
                : (u = (function (e, t, n) {
                    const r = { ...(0, i.SH)(e.native, ['rendererUrl', 'adTemplate']), assets: A(e.native, n), nativeKeys: s.x5 };
                    return (
                      e.native.ortb ? (r.ortb = e.native.ortb) : t.mediaTypes?.native?.ortb && (r.ortb = D(e.native, t.nativeOrtbRequest)),
                      r
                    );
                  })(t, r.getAdUnit(t), n)),
              Object.assign(a, u)
            );
          }
          const I = Object.fromEntries(Object.entries(s.x5).map(([e, t]) => [t, e]));
          function C(e, t) {
            const n = e.assets.map((e) => I[e]);
            return T(e, t, n);
          }
          function O(e, t) {
            return T(e, t, null);
          }
          function S(e) {
            return e?.url || e;
          }
          function B(e, t) {
            for (; e && t && e !== t; ) e > t ? (e -= t) : (t -= e);
            return e || t;
          }
          function R(e) {
            if (!y(e)) return;
            const t = {};
            for (const n of e.assets) {
              if (n.title) {
                const e = { required: !!n.required && Boolean(n.required), len: n.title.len };
                t.title = e;
              } else if (n.img) {
                const e = { required: !!n.required && Boolean(n.required) };
                if (n.img.w && n.img.h) e.sizes = [n.img.w, n.img.h];
                else if (n.img.wmin && n.img.hmin) {
                  const t = B(n.img.wmin, n.img.hmin);
                  e.aspect_ratios = [
                    { min_width: n.img.wmin, min_height: n.img.hmin, ratio_width: n.img.wmin / t, ratio_height: n.img.hmin / t },
                  ];
                }
                n.img.type === s.oA.MAIN ? (t.image = e) : (t.icon = e);
              } else if (n.data) {
                const e = Object.keys(s.jO).find((e) => s.jO[e] === n.data.type),
                  r = Object.keys(s.h0).find((t) => s.h0[t] === e);
                ((t[r] = { required: !!n.required && Boolean(n.required) }), n.data.len && (t[r].len = n.data.len));
              }
              e.privacy && (t.privacyLink = { required: !1 });
            }
            return t;
          }
          function k(e) {
            {
              if (!e || !(0, i.cy)(e)) return e;
              if (!e.some((e) => (e?.mediaTypes || {})[a.s6]?.ortb)) return e;
              const t = (0, i.Go)(e);
              for (const e of t)
                e.mediaTypes &&
                  e.mediaTypes[a.s6] &&
                  e.mediaTypes[a.s6].ortb &&
                  ((e.mediaTypes[a.s6] = Object.assign((0, r.pick)(e.mediaTypes[a.s6], s._B), R(e.mediaTypes[a.s6].ortb))),
                  (e.nativeParams = h(e.mediaTypes[a.s6])));
              return t;
            }
          }
          function U(e) {
            const t = { link: {}, eventtrackers: [] };
            return (
              Object.entries(e).forEach(([e, n]) => {
                switch (e) {
                  case 'clickUrl':
                    t.link.url = n;
                    break;
                  case 'clickTrackers':
                    t.link.clicktrackers = Array.isArray(n) ? n : [n];
                    break;
                  case 'impressionTrackers':
                    (Array.isArray(n) ? n : [n]).forEach((e) => {
                      t.eventtrackers.push({ event: u.OA, method: u.Ni, url: e });
                    });
                    break;
                  case 'javascriptTrackers':
                    t.jstracker = Array.isArray(n) ? n.join('') : n;
                    break;
                  case 'privacyLink':
                    t.privacy = n;
                }
              }),
              t
            );
          }
          function D(e, t) {
            const n = { ...U(e), assets: [] };
            function r(e, r) {
              let o = t.assets.find(e);
              null != o && ((o = (0, i.Go)(o)), r(o), n.assets.push(o));
            }
            return (
              Object.keys(e)
                .filter((t) => !!e[t])
                .forEach((t) => {
                  const n = S(e[t]);
                  switch (t) {
                    case 'title':
                      r(
                        (e) => null != e.title,
                        (e) => {
                          e.title = { text: n };
                        },
                      );
                      break;
                    case 'image':
                    case 'icon':
                      const e = 'image' === t ? s.oA.MAIN : s.oA.ICON;
                      r(
                        (t) => null != t.img && t.img.type === e,
                        (e) => {
                          e.img = { url: n };
                        },
                      );
                      break;
                    default:
                      t in s.h0 &&
                        r(
                          (e) => null != e.data && e.data.type === s.jO[s.h0[t]],
                          (e) => {
                            e.data = { value: n };
                          },
                        );
                  }
                }),
              n
            );
          }
          function $(e) {
            var t = {};
            for (var n in e) t[e[n]] = n;
            return t;
          }
        },
        5725(e, t, n) {
          n.d(t, { Ei: () => f, kh: () => l });
          var r = n(8964),
            i = n(8384),
            o = n(9015),
            s = n(7413),
            a = n(8497),
            d = n(1785),
            c = n(7791),
            u = n(7449);
          const l = new Map();
          function f({ bidResponse: e, auctionInstance: t, afterBidAdded: n, videoMediaType: r }) {
            g(e);
            const o = r && r?.context,
              d = r && r?.useCacheKey,
              { useLocal: u, url: l, ignoreBidderCacheKey: f } = i.$W.getConfig('cache') || {},
              p = (u || l) && (d || o !== c.H6),
              m = !e.videoCacheKey || f;
            p && m
              ? w(t, e, n, r)
              : !p || m || e.vastUrl
                ? ((0, a.v8)(t, e), n())
                : (0, s.logError)('videoCacheKey specified but not required vastUrl for video bid');
          }
          const g = (0, d.A_)(
              'sync',
              function (e) {
                !e.vastXml &&
                  e.vastUrl &&
                  (e.vastXml = (function (e, t) {
                    const n = t?.impression?.length ? t.impression.map((e) => `<Impression><![CDATA[${e}]]></Impression>`).join('') : '',
                      r = t?.error?.length ? t.error.map((e) => `<Error><![CDATA[${e}]]></Error>`).join('') : '';
                    let i = '';
                    t?.trackingEvents?.length &&
                      (i = `<Creative><Linear><TrackingEvents>${t.trackingEvents.map(({ event: e, url: t }) => `<Tracking event="${e}"><![CDATA[${t}]]></Tracking>`).join('')}</TrackingEvents></Linear></Creative>`);
                    return (
                      '<VAST version="3.0"><Ad><Wrapper><AdSystem>prebid.org wrapper</AdSystem><VASTAdTagURI><![CDATA[' +
                      e +
                      ']]></VASTAdTagURI>' +
                      n +
                      r +
                      '<Creatives>' +
                      i +
                      '</Creatives></Wrapper></Ad></VAST>'
                    );
                  })(e.vastUrl, e.vastTrackers));
              },
              'updateVast',
            ),
            p = (e, t, n) => {
              ((e.videoCacheKey = n || (0, s.generateUUID)()), e.vastUrl || (e.vastUrl = t));
            },
            m = {
              store: function (e, t, n = (e) => (0, r.er)(u.tp, 'cache', e)) {
                const s = {
                  puts: e.map((e) =>
                    (function (e, { index: t = o.n.index } = {}) {
                      const n = e.vastXml,
                        r = t.getAuction(e),
                        s = { type: 'xml', value: n, ttlseconds: Number(e.ttl) + 15 };
                      return (
                        i.$W.getConfig('cache.vasttrack') && ((s.bidder = e.bidder), (s.bidid = e.requestId), (s.aid = e.auctionId)),
                        null != r && (s.timestamp = r.getAuctionStart()),
                        'string' == typeof e.customCacheKey && '' !== e.customCacheKey && (s.key = e.customCacheKey),
                        s
                      );
                    })(e),
                  ),
                };
                n(i.$W.getConfig('cache.timeout'))(
                  i.$W.getConfig('cache.url'),
                  (function (e) {
                    return {
                      success: function (t) {
                        let n;
                        try {
                          n = JSON.parse(t).responses;
                        } catch (t) {
                          return void e(t, []);
                        }
                        n ? e(null, n) : e(new Error("The cache server didn't respond with a responses property."), []);
                      },
                      error: function (t, n) {
                        e(new Error(`Error storing video ad in the cache: ${t}: ${JSON.stringify(n)}`), []);
                      },
                    };
                  })(t),
                  JSON.stringify(s),
                  { contentType: 'text/plain', withCredentials: !0 },
                );
              },
            };
          function h(e) {
            const t = e.map((e) => e.bidResponse);
            const n = i.$W.getConfig('cache.url');
            m.store(t, function (r, i) {
              var o;
              r
                ? ((o = r), (0, s.logError)(`Failed to save to the video cache: ${o}. Video bids will be discarded:`, t))
                : e.length !== i.length
                  ? (0, s.logError)(`expected ${e.length} cache IDs, got ${i.length} instead`)
                  : i.forEach((t, r) => {
                      const { auctionInstance: i, bidResponse: o, afterBidAdded: d } = e[r];
                      '' === t.uuid
                        ? (0, s.logWarn)(
                            'Supplied video cache key was already in use by Prebid Cache; caching attempt was rejected. Video bid must be discarded.',
                          )
                        : ((o.cacheUrl = n),
                          p(
                            o,
                            (function (e, t) {
                              return `${e}?uuid=${t}`;
                            })(n, t.uuid),
                            t.uuid,
                          ),
                          (0, a.v8)(i, o),
                          d());
                    });
            });
          }
          let b, y, E;
          i.$W.getConfig('cache', ({ cache: e }) => {
            ((b = 'number' == typeof e.batchSize && e.batchSize > 0 ? e.batchSize : 1),
              (y = 'number' == typeof e.batchTimeout && e.batchTimeout > 0 ? e.batchTimeout : 0),
              e.useLocal &&
                !E &&
                (E = o.n.onExpiry((e) => {
                  e.getBidsReceived().forEach((e) => {
                    const t = l.get(e.videoCacheKey);
                    (t && t.startsWith('blob') && URL.revokeObjectURL(t), l.delete(e.videoCacheKey));
                  });
                })));
          });
          const v = ((e = setTimeout, t = h) => {
              let n = [[]],
                r = !1;
              const i = (e) => e();
              return function (o, s, a) {
                const d = y > 0 ? e : i;
                (n[n.length - 1].length >= b && n.push([]),
                  n[n.length - 1].push({ auctionInstance: o, bidResponse: s, afterBidAdded: a }),
                  r ||
                    ((r = !0),
                    d(() => {
                      (n.forEach(t), (n = [[]]), (r = !1));
                    }, y)));
              };
            })(),
            w = (0, d.A_)(
              'async',
              function (e, t, n, r) {
                i.$W.getConfig('cache.useLocal')
                  ? (((e) => {
                      const t = e.vastXml,
                        n = URL.createObjectURL(new Blob([t], { type: 'text/xml' }));
                      (p(e, n), l.set(e.videoCacheKey, n));
                    })(t),
                    (0, a.v8)(e, t),
                    n())
                  : v(e, t, n);
              },
              'callPrebidCache',
            );
        },
        5877(e, t, n) {
          function r(e) {
            return !e?.gdprApplies || !0 === e?.vendorData?.purpose?.consents?.[1];
          }
          n.d(t, { C: () => r });
        },
        5881(e, t, n) {
          n.d(t, { s: () => i });
          var r = n(4794);
          const i = (0, n(724).ZI)((e) => r.Ay.resolveAlias(e));
        },
        6273(e, t, n) {
          function r(e, t) {
            return e === t ? 0 : e < t ? -1 : 1;
          }
          function i(e = (e) => e) {
            return (t, n) => r(e(t), e(n));
          }
          function o(e = r) {
            return (t, n) => -e(t, n) || 0;
          }
          function s(...e) {
            return function (t, n) {
              for (const r of e) {
                const e = r(t, n);
                if (0 !== e) return e;
              }
              return 0;
            };
          }
          function a(e = r) {
            return (function (e = r) {
              return (t, n) => (e(n, t) < 0 ? n : t);
            })(o(e));
          }
          n.d(t, { Bq: () => f, Vk: () => u, qL: () => l });
          const d = i((e) => e.cpm),
            c = i((e) => e.responseTimestamp),
            u = a(s(d, o(i((e) => e.timeToRespond)))),
            l = a(
              s(
                i((e) => e.desirability),
                o(i((e) => e.timeToRespond)),
              ),
            ),
            f = a(s(d, o(c)));
          a(s(d, c));
        },
        6344(e, t, n) {
          n.d(t, { wU: () => A });
          var r = n(1785),
            i = n(7686),
            o = n(765),
            s = n(7413),
            a = n(3435),
            d = n(8928),
            c = n(3350),
            u = n(8378),
            l = n(8384),
            f = n(8203);
          const g = ['architecture', 'bitness', 'model', 'platformVersion', 'fullVersionList'],
            p = ['brands', 'mobile', 'platform'],
            m = (function (e = window.navigator?.userAgentData) {
              const t = e && p.some((t) => void 0 !== e[t]) ? Object.freeze(b(1, e)) : null;
              return function () {
                return t;
              };
            })(),
            h = (function (e = window.navigator?.userAgentData) {
              const t = {},
                n = new WeakMap();
              return function (r = g) {
                if (!n.has(r)) {
                  const e = Array.from(r);
                  (e.sort(), n.set(r, e.join('|')));
                }
                const i = n.get(r);
                if (!t.hasOwnProperty(i))
                  try {
                    t[i] = e
                      .getHighEntropyValues(r)
                      .then((e) => ((0, s.isEmpty)(e) ? null : Object.freeze(b(2, e))))
                      .catch(() => null);
                  } catch (e) {
                    t[i] = f.U9.resolve(null);
                  }
                return t[i];
              };
            })();
          function b(e, t) {
            function n(e, t) {
              const n = { brand: e };
              return ((0, c.O8)(t) && !(0, s.isEmptyStr)(t) && (n.version = t.split('.')), n);
            }
            const r = { source: e };
            return (
              t.platform && (r.platform = n(t.platform, t.platformVersion)),
              (t.fullVersionList || t.brands) && (r.browsers = (t.fullVersionList || t.brands).map(({ brand: e, version: t }) => n(e, t))),
              void 0 !== t.mobile && (r.mobile = t.mobile ? 1 : 0),
              ['model', 'bitness', 'architecture'].forEach((e) => {
                const n = t[e];
                (0, c.O8)(n) && (r[e] = n);
              }),
              r
            );
          }
          var y = n(7850),
            E = n(5720);
          const v = {
              getRefererInfo: i.EN,
              findRootDomain: o.S,
              getWindowTop: s.getWindowTop,
              getWindowSelf: s.getWindowSelf,
              getHighEntropySUA: h,
              getLowEntropySUA: m,
              getDocument: s.getDocument,
            },
            w = (0, y.i8)('FPD'),
            A = (0, r.A_)('sync', (e) => {
              const t = [e, I().catch(() => null)];
              return f.U9.all(t).then(([e, t]) => {
                const n = v.getRefererInfo();
                (Object.entries(O).forEach(([t, r]) => {
                  const i = r(e, n);
                  i && Object.keys(i).length > 0 && (e[t] = (0, s.mergeDeep)({}, i, e[t]));
                }),
                  t && (0, a.J)(e, 'device.sua', Object.assign({}, t, e.device.sua)));
                const r = v.getDocument().documentElement.lang;
                if (r && ((0, a.J)(e, 'site.ext.data.documentLang', r), !(0, d.A)(e, 'site.content.language'))) {
                  const t = r.split('-')[0];
                  (0, a.J)(e, 'site.content.language', t);
                }
                e = w(e);
                for (const t of y.Dy)
                  if ((0, y.O$)(e, t)) {
                    e[t] = (0, s.mergeDeep)({}, R(e, n), e[t]);
                    break;
                  }
                return e;
              });
            });
          function T(e) {
            try {
              return e(v.getWindowTop());
            } catch (t) {
              return e(v.getWindowSelf());
            }
          }
          function I() {
            const e = l.$W.getConfig('firstPartyData.uaHints');
            return Array.isArray(e) && 0 !== e.length ? v.getHighEntropySUA(e) : f.U9.resolve(v.getLowEntropySUA());
          }
          function C(e) {
            return (0, c.SH)(e, Object.keys(e));
          }
          const O = {
              site(e, t) {
                if (!y.Dy.filter((e) => 'site' !== e).some(y.O$.bind(null, e))) return C({ page: t.page, ref: t.ref });
              },
              device: () =>
                T((e) => {
                  const t = (0, u.Ot)().screen.width,
                    n = (0, u.Ot)().screen.height,
                    { width: r, height: i } = (0, E.M)();
                  return {
                    w: t,
                    h: n,
                    ua: e.navigator.userAgent,
                    language: e.navigator.language.split('-').shift(),
                    ext: { vpw: r, vph: i },
                  };
                }),
              regs() {
                const e = {};
                T((e) => e.navigator.globalPrivacyControl) && (0, a.J)(e, 'ext.gpc', '1');
                const t = l.$W.getConfig('coppa');
                return ('boolean' == typeof t && (e.coppa = t ? 1 : 0), e);
              },
            },
            S = (0, s.memoize)(() =>
              T((e) => {
                const t = e.document,
                  n = Array.from(t.querySelectorAll('script[type="application/ld+json"]'));
                let r = [];
                for (const e of n)
                  try {
                    const t = JSON.parse(e.textContent),
                      n = Array.isArray(t) ? t : [t];
                    for (const e of n)
                      if ('string' == typeof e.keywords) {
                        const t = e.keywords
                          .split(',')
                          .map((e) => e.trim())
                          .filter((e) => e.length > 0);
                        r.push(...t);
                      }
                  } catch (e) {}
                return r;
              }),
            ),
            B = (0, s.memoize)(() =>
              T((e) =>
                e.document
                  .querySelector('meta[name="keywords"]')
                  ?.content?.split(',')
                  .map((e) => e.trim()),
              ),
            );
          function R(e, t) {
            const n = (0, i.gR)(t.page, { noLeadingWww: !0 }),
              r = new Set();
            return (
              (l.$W.getConfig('firstPartyData.keywords.meta') ?? 1) && (B() ?? []).forEach((e) => r.add(e)),
              (l.$W.getConfig('firstPartyData.keywords.json') ?? 1) && (S() ?? []).forEach((e) => r.add(e)),
              C({
                domain: n,
                keywords: r.size > 0 ? Array.from(r.keys()).join(',') : void 0,
                publisher: C({ domain: v.findRootDomain(n) }),
              })
            );
          }
        },
        6540(e, t, n) {
          function r(e) {
            const t = e.slice();
            return ((t.bids = t), t);
          }
          n.d(t, { O: () => r });
        },
        6901(e, t, n) {
          n.d(t, { A4: () => d, J7: () => c, Pg: () => u });
          var r = n(8468),
            i = n(7413),
            o = n(1129),
            s = n(7449);
          const a = (0, o.m)();
          function d(e) {
            const { url: t, config: n, id: o, callback: d, loaded: c, adUnitCode: u, renderNow: l } = e;
            ((this.url = t),
              (this.config = n),
              (this.handlers = {}),
              (this.id = o),
              (this.renderNow = l),
              (this.adUnitCode = u),
              (this.loaded = c),
              (this.cmd = []),
              (this.push = (e) => {
                'function' == typeof e
                  ? this.loaded
                    ? e.call()
                    : this.cmd.push(e)
                  : (0, i.logError)('Commands given to Renderer.push must be wrapped in a function');
              }),
              (this.callback =
                d ||
                (() => {
                  ((this.loaded = !0), this.process());
                })),
              (this.render = function () {
                const e = arguments,
                  n = () => {
                    this._render
                      ? this._render.apply(this, e)
                      : (0, i.logWarn)('No render function was provided, please use .setRender on the renderer');
                  };
                !(function (e) {
                  const t = a.adUnits.find((t) => t.code === e);
                  if (!t) return !1;
                  const n = t?.renderer,
                    r = !!(n && n.url && n.render),
                    i = t?.mediaTypes?.video?.renderer,
                    o = !!(i && i.url && i.render);
                  return !!((r && !0 !== n.backupOnly) || (o && !0 !== i.backupOnly));
                })(u)
                  ? l
                    ? n()
                    : (this.cmd.unshift(n), (0, r.R)(t, s.tp, 'outstream', this.callback, this.documentContext))
                  : ((0, i.logWarn)(`External Js not loaded by Renderer since renderer url and callback is already defined on adUnit ${u}`),
                    n());
              }.bind(this)));
          }
          function c(e) {
            return !(!e || (!e.url && !e.renderNow));
          }
          function u(e, t, n) {
            let r = null;
            (e.config && e.config.documentResolver && (r = e.config.documentResolver(t, document, n)),
              r || (r = document),
              (e.documentContext = r),
              e.render(t, e.documentContext));
          }
          ((d.install = function ({ url: e, config: t, id: n, callback: r, loaded: i, adUnitCode: o, renderNow: s }) {
            return new d({ url: e, config: t, id: n, callback: r, loaded: i, adUnitCode: o, renderNow: s });
          }),
            (d.prototype.getConfig = function () {
              return this.config;
            }),
            (d.prototype.setRender = function (e) {
              this._render = e;
            }),
            (d.prototype.setEventHandlers = function (e) {
              this.handlers = e;
            }),
            (d.prototype.handleVideoEvent = function ({ id: e, eventName: t }) {
              ('function' == typeof this.handlers[t] && this.handlers[t](),
                (0, i.logMessage)(`Prebid Renderer event for id ${e} type ${t}`));
            }),
            (d.prototype.process = function () {
              for (; this.cmd.length > 0; )
                try {
                  this.cmd.shift().call();
                } catch (e) {
                  (0, i.logError)(`Error processing Renderer command on ad unit '${this.adUnitCode}':`, e);
                }
            }));
        },
        6969(e, t, n) {
          n.d(t, { j: () => u, q: () => f });
          var r = n(7413),
            i = n(8384);
          const o = { buckets: [{ max: 5, increment: 0.5 }] },
            s = { buckets: [{ max: 20, increment: 0.1 }] },
            a = { buckets: [{ max: 20, increment: 0.01 }] },
            d = {
              buckets: [
                { max: 3, increment: 0.01 },
                { max: 8, increment: 0.05 },
                { max: 20, increment: 0.5 },
              ],
            },
            c = {
              buckets: [
                { max: 5, increment: 0.05 },
                { max: 10, increment: 0.1 },
                { max: 20, increment: 0.5 },
              ],
            };
          function u(e, t, n = 1) {
            let r = parseFloat(e);
            return (
              isNaN(r) && (r = ''),
              {
                low: '' === r ? '' : l(e, o, n),
                med: '' === r ? '' : l(e, s, n),
                high: '' === r ? '' : l(e, a, n),
                auto: '' === r ? '' : l(e, c, n),
                dense: '' === r ? '' : l(e, d, n),
                custom: '' === r ? '' : l(e, t, n),
              }
            );
          }
          function l(e, t, n) {
            let o = '';
            if (!f(t)) return o;
            const s = t.buckets.reduce((e, t) => (e.max > t.max ? e : t), { max: 0 });
            let a = 0;
            const d = t.buckets.find((t) => {
              if (e > s.max * n) {
                let e = t.precision;
                (void 0 === e && (e = 2), (o = (t.max * n).toFixed(e)));
              } else {
                if (e <= t.max * n && e >= a * n) return ((t.min = a), t);
                a = t.max;
              }
            });
            return (
              d &&
                (o = (function (e, t, n) {
                  const o = void 0 !== t.precision ? t.precision : 2,
                    s = t.increment * n,
                    a = t.min * n;
                  let d = Math.floor;
                  const c = i.$W.getConfig('cpmRoundingFunction');
                  'function' == typeof c && (d = c);
                  const u = Math.pow(10, o + 2),
                    l = (e * u - a * u) / (s * u);
                  let f, g;
                  try {
                    f = d(l) * s + a;
                  } catch (e) {
                    g = !0;
                  }
                  (g || 'number' != typeof f) &&
                    ((0, r.logWarn)('Invalid rounding function passed in config'), (f = Math.floor(l) * s + a));
                  return ((f = Number(f.toFixed(10))), f.toFixed(o));
                })(e, d, n)),
              o
            );
          }
          function f(e) {
            if ((0, r.isEmpty)(e) || !e.buckets || !Array.isArray(e.buckets)) return !1;
            let t = !0;
            return (
              e.buckets.forEach((e) => {
                (e.max && e.increment) || (t = !1);
              }),
              t
            );
          }
        },
        7413(e, t, n) {
          (n.r(t),
            n.d(t, {
              _each: () => z,
              _map: () => H,
              binarySearch: () => Ye,
              buildUrl: () => Ne,
              canAccessWindowTop: () => W,
              checkCookieSupport: () => Oe,
              cleanObj: () => _e,
              compareCodeAndSlot: () => Ue,
              compressDataWithGZip: () => nt,
              contains: () => V,
              convertObjectToArray: () => Qe,
              createIframe: () => P,
              createInvisibleIframe: () => M,
              createTrackPixelHtml: () => ne,
              cyrb53Hash: () => Ge,
              debugTurnedOn: () => h,
              deepAccess: () => o.A,
              deepClone: () => s.Go,
              deepEqual: () => Pe,
              deepSetValue: () => c.J,
              delayExecution: () => Se,
              encodeMacroURI: () => re,
              extractDomainFromHost: () => Ze,
              flatten: () => oe,
              formatQS: () => je,
              generateUUID: () => T,
              getBidIdParameter: () => I,
              getBidRequest: () => se,
              getBidderCodes: () => de,
              getDefinedParams: () => s.SH,
              getDocument: () => j,
              getDomLoadingDuration: () => Ie,
              getFallbackWindow: () => N,
              getParameterByName: () => F,
              getPerformanceNow: () => Te,
              getPrebidInternal: () => E,
              getSafeframeGeometry: () => me,
              getScreenOrientation: () => u.Vv,
              getUniqueIdentifierStr: () => A,
              getUnixTimestampFromNow: () => He,
              getUserConfiguredParams: () => ke,
              getValue: () => ae,
              getWinDimensions: () => u.Ot,
              getWindowLocation: () => x,
              getWindowSelf: () => q,
              getWindowTop: () => _,
              groupBy: () => Be,
              hasDeviceAccess: () => Ce,
              hasNonSerializableProperty: () => Ke,
              inIframe: () => ge,
              insertElement: () => Q,
              insertHtmlIntoIframe: () => ee,
              insertUserSyncIframe: () => te,
              internal: () => b,
              isAdUnitCodeMatchingSlot: () => De,
              isApnGetTagDefined: () => ue,
              isArray: () => s.cy,
              isArrayOfNums: () => s.Uu,
              isBoolean: () => s.Lm,
              isChromeIOSBrowser: () => ye,
              isEmpty: () => G,
              isEmptyStr: () => L,
              isFirefoxBrowser: () => be,
              isFn: () => s.fp,
              isGptPubadsDefined: () => ce,
              isGzipCompressionSupported: () => tt,
              isInteger: () => s.Fq,
              isNumber: () => s.Et,
              isPlainObject: () => s.Qd,
              isSafariBrowser: () => he,
              isSafeFrameWindow: () => pe,
              isStr: () => s.O8,
              isValidMediaTypes: () => Re,
              logError: () => g,
              logInfo: () => l,
              logMessage: () => p,
              logWarn: () => f,
              memoize: () => Ve,
              mergeDeep: () => Me,
              parseGPTSingleSizeArray: () => k,
              parseGPTSingleSizeArrayToRtbSize: () => D,
              parseQS: () => xe,
              parseQueryStringParameters: () => C,
              parseSizesInput: () => B,
              parseUrl: () => We,
              pick: () => qe,
              politeInsertUserSyncIframe: () => K,
              politeTriggerPixel: () => Y,
              prefixLog: () => m,
              replaceAuctionPrice: () => ve,
              replaceClickThrough: () => we,
              replaceMacros: () => Ee,
              resetWinDimensions: () => u.Bp,
              runBackgroundTask: () => Z,
              safeJSONEncode: () => ze,
              safeJSONParse: () => Le,
              setOnAny: () => Xe,
              setScriptAttributes: () => Je,
              shuffle: () => fe,
              sizeTupleToRtbSize: () => U,
              sizeTupleToSizeString: () => R,
              sizesToSizeTuples: () => S,
              sortByHighestCpm: () => le,
              timestamp: () => Ae,
              transformAdServerTargetingObj: () => O,
              triggerNurlWithCpm: () => et,
              triggerPixel: () => X,
              uniques: () => ie,
              unsupportedBidderMessage: () => $e,
              waitForElementToLoad: () => J,
            }));
          var r = n(8384),
            i = n(8203),
            o = n(8928),
            s = n(3350),
            a = n(1343),
            d = n(217),
            c = n(3435),
            u = n(8378);
          const l = a.fH,
            f = a.JE,
            g = a.vV,
            p = a.OG,
            m = a.h0,
            h = d.d,
            b = {
              checkCookieSupport: Oe,
              getWindowSelf: q,
              getWindowTop: _,
              canAccessWindowTop: W,
              getWindowLocation: x,
              insertUserSyncIframe: te,
              insertElement: Q,
              isFn: s.fp,
              triggerPixel: X,
              logError: g,
              logWarn: f,
              logMessage: p,
              logInfo: l,
              parseQS: xe,
              formatQS: je,
              deepEqual: Pe,
              runBackgroundTask: Z,
            },
            y = {};
          function E() {
            return y;
          }
          var v,
            w =
              ((v = 0),
              function () {
                return ++v;
              });
          function A() {
            return w() + Math.random().toString(16).substr(2);
          }
          function T(e) {
            return e
              ? (
                  e ^
                  ((window && window.crypto && window.crypto.getRandomValues
                    ? window.crypto.getRandomValues(new Uint8Array(1))[0] % 16
                    : 16 * Math.random()) >>
                    (e / 4))
                ).toString(16)
              : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, T);
          }
          function I(e, t) {
            return t?.[e] || '';
          }
          function C(e) {
            let t = '';
            for (var n in e) e.hasOwnProperty(n) && (t += n + '=' + encodeURIComponent(e[n]) + '&');
            return ((t = t.replace(/&$/, '')), t);
          }
          function O(e) {
            return e && Object.getOwnPropertyNames(e).length > 0
              ? Object.keys(e)
                  .map((t) => `${t}=${encodeURIComponent(e[t])}`)
                  .join('&')
              : '';
          }
          function S(e) {
            return 'string' == typeof e
              ? e
                  .split(/\s*,\s*/)
                  .map((e) => e.match(/^(\d+)x(\d+)$/i))
                  .filter((e) => e)
                  .map(([e, t, n]) => [parseInt(t, 10), parseInt(n, 10)])
              : Array.isArray(e)
                ? $(e)
                  ? [e]
                  : e.filter($)
                : [];
          }
          function B(e) {
            return S(e).map(R);
          }
          function R(e) {
            return e[0] + 'x' + e[1];
          }
          function k(e) {
            if ($(e)) return R(e);
          }
          function U(e) {
            return { w: e[0], h: e[1] };
          }
          function D(e) {
            if ($(e)) return U(e);
          }
          function $(e) {
            return (0, s.cy)(e) && 2 === e.length && !isNaN(e[0]) && !isNaN(e[1]);
          }
          function _() {
            return window.top;
          }
          function q() {
            return window.self;
          }
          function x() {
            return window.location;
          }
          function j() {
            return document;
          }
          function W() {
            try {
              if (b.getWindowTop().location.href) return !0;
            } catch (e) {
              return !1;
            }
          }
          function N(e) {
            return e || (W() ? b.getWindowTop() : b.getWindowSelf());
          }
          const P = (() => {
            const e = {
              border: '0px',
              hspace: '0',
              vspace: '0',
              marginWidth: '0',
              marginHeight: '0',
              scrolling: 'no',
              frameBorder: '0',
              allowtransparency: 'true',
            };
            return (t, n, r = {}) => {
              const i = t.createElement('iframe');
              return (Object.assign(i, Object.assign({}, e, n)), Object.assign(i.style, r), i);
            };
          })();
          function M() {
            return P(
              document,
              { id: A(), width: 0, height: 0, src: 'about:blank' },
              { display: 'none', height: '0px', width: '0px', border: '0px' },
            );
          }
          function F(e) {
            return xe(x().search)[e] || '';
          }
          function G(e) {
            return !e || ((0, s.cy)(e) || (0, s.O8)(e) ? !(e.length > 0) : Object.keys(e).length <= 0);
          }
          function L(e) {
            return (0, s.O8)(e) && (!e || 0 === e.length);
          }
          function z(e, t) {
            if ((0, s.fp)(e?.forEach)) return e.forEach(t, this);
            Object.entries(e || {}).forEach(([e, n]) => t.call(this, n, e));
          }
          function V(e, t) {
            return (0, s.fp)(e?.includes) && e.includes(t);
          }
          function H(e, t) {
            return (0, s.fp)(e?.map) ? e.map(t) : Object.entries(e || {}).map(([n, r]) => t(r, n, e));
          }
          function Q(e, t, n, r) {
            let i;
            ((t = t || document), (i = n ? t.getElementsByTagName(n) : t.getElementsByTagName('head')));
            try {
              if (((i = i.length ? i : t.getElementsByTagName('body')), i.length)) {
                i = i[0];
                const t = r ? null : i.firstChild;
                return i.insertBefore(e, t);
              }
            } catch (e) {}
          }
          function J(e, t) {
            let n = null;
            return new i.U9((r) => {
              const i = function () {
                (e.removeEventListener('load', i), e.removeEventListener('error', i), null != n && window.clearTimeout(n), r());
              };
              (e.addEventListener('load', i), e.addEventListener('error', i), null != t && (n = window.setTimeout(i, t)));
            });
          }
          function Y(e, t = 'include') {
            Z(() => {
              if (window.fetch && window.Request)
                try {
                  const n = new Request(e, { method: 'GET', mode: 'no-cors', credentials: t, keepalive: !0 });
                  return void window.fetch(n).catch(() => {
                    'omit' !== t && X(e);
                  });
                } catch (e) {}
              'omit' !== t && X(e);
            });
          }
          function K(e) {
            Z(() => te(e));
          }
          function X(e, t, n) {
            const r = new Image();
            (t && b.isFn(t) && J(r, n).then(t), (r.src = e));
          }
          function Z(e) {
            const t = window.scheduler;
            t?.postTask
              ? t.postTask(e, { priority: 'background' }).catch(() => e())
              : 'function' != typeof window.requestIdleCallback
                ? e()
                : window.requestIdleCallback(() => e(), { timeout: 2e3 });
          }
          function ee(e) {
            if (!e) return;
            const t = M();
            var n;
            (b.insertElement(t, document, 'body'), (n = t.contentWindow.document).open(), n.write(e), n.close());
          }
          function te(e, t, n) {
            if (!e) return;
            const r = P(document, {
              sandbox: 'allow-scripts allow-same-origin',
              src: e,
              style: { width: '0px', height: '0px', display: 'none' },
            });
            (t && b.isFn(t) && J(r, n).then(t), b.insertElement(r, document, 'html', !0));
          }
          function ne(e, t = encodeURI) {
            if (!e) return '';
            let n = '<div style="position:absolute;left:0px;top:0px;visibility:hidden;">';
            return ((n += '<img src="' + t(e) + '"></div>'), n);
          }
          function re(e) {
            return Array.from(e.matchAll(/\$({[^}]+})/g))
              .map((e) => e[1])
              .reduce((e, t) => e.replace('$' + encodeURIComponent(t), '$' + t), encodeURI(e));
          }
          function ie(e, t, n) {
            return n.indexOf(e) === t;
          }
          function oe(e, t) {
            return e.concat(t);
          }
          function se(e, t) {
            if (e) return t.flatMap((e) => e.bids).find((t) => ['bidId', 'adId', 'bid_id'].some((n) => t[n] === e));
          }
          function ae(e, t) {
            return e[t];
          }
          function de(e) {
            return e
              .map((e) => e.bids.map((e) => e.bidder).reduce(oe, []))
              .reduce(oe, [])
              .filter((e) => void 0 !== e)
              .filter(ie);
          }
          function ce() {
            if (window.googletag && (0, s.fp)(window.googletag.pubads) && (0, s.fp)(window.googletag.pubads().getSlots)) return !0;
          }
          function ue() {
            if (window.apntag && (0, s.fp)(window.apntag.getTag)) return !0;
          }
          const le = (e, t) => t.cpm - e.cpm;
          function fe(e) {
            let t = e.length;
            for (; t > 0; ) {
              const n = Math.floor(Math.random() * t);
              t--;
              const r = e[t];
              ((e[t] = e[n]), (e[n] = r));
            }
            return e;
          }
          function ge() {
            try {
              return b.getWindowSelf() !== b.getWindowTop();
            } catch (e) {
              return !0;
            }
          }
          function pe() {
            if (!ge()) return !1;
            const e = b.getWindowSelf();
            return !(!e.$sf || !e.$sf.ext);
          }
          function me() {
            try {
              const e = q();
              return 'function' == typeof e.$sf.ext.geom ? e.$sf.ext.geom() : void 0;
            } catch (e) {
              return void g('Error getting SafeFrame geometry', e);
            }
          }
          function he() {
            return /^((?!chrome|chromium|android|crios|fxios).)*safari/i.test(navigator.userAgent);
          }
          function be() {
            return /firefox|fxios/i.test(navigator.userAgent);
          }
          function ye() {
            return /crios|crmo/i.test(navigator.userAgent);
          }
          function Ee(e, t) {
            if (e) return Object.entries(t).reduce((e, [t, n]) => e.replace(new RegExp('\\$\\{' + t + '\\}', 'g'), n || ''), e);
          }
          function ve(e, t) {
            return Ee(e, { AUCTION_PRICE: t });
          }
          function we(e, t) {
            if (e && t && 'string' == typeof t) return e.replace(/\${CLICKTHROUGH}/g, t);
          }
          function Ae() {
            return new Date().getTime();
          }
          function Te() {
            return (window.performance && window.performance.now && window.performance.now()) || 0;
          }
          function Ie(e) {
            let t = -1;
            const n = (e = e || q()).performance;
            if (e.performance?.timing && e.performance.timing.navigationStart > 0) {
              const e = n.timing.domLoading - n.timing.navigationStart;
              e > 0 && (t = e);
            }
            return t;
          }
          function Ce() {
            return !1 !== r.$W.getConfig('deviceAccess');
          }
          function Oe() {
            if (window.navigator.cookieEnabled || document.cookie.length) return !0;
          }
          function Se(e, t) {
            if (t < 1) throw new Error(`numRequiredCalls must be a positive number. Got ${t}`);
            let n = 0;
            return function () {
              (n++, n === t && e.apply(this, arguments));
            };
          }
          function Be(e, t) {
            return e.reduce(function (e, n) {
              return ((e[n[t]] = e[n[t]] || []).push(n), e);
            }, {});
          }
          function Re(e) {
            const t = ['banner', 'native', 'video', 'audio'],
              n = ['instream', 'outstream'];
            return !!Object.keys(e).every((e) => t.includes(e)) && (!e.video || !e.video.context || n.includes(e.video.context));
          }
          function ke(e, t, n) {
            return e
              .filter((e) => e.code === t)
              .flatMap((e) => e.bids)
              .filter((e) => e.bidder === n)
              .map((e) => e.params || {});
          }
          const Ue = (e, t) => e.getAdUnitPath() === t || e.getSlotElementId() === t;
          function De(e) {
            const t = r.$W.getConfig('customGptSlotMatching'),
              n = (0, s.fp)(t) && t(e);
            return (0, s.fp)(n) ? n : (t) => Ue(e, t);
          }
          function $e(e, t) {
            const n = Object.keys(e.mediaTypes || { banner: 'banner' }).join(', ');
            return `\n    ${e.code} is a ${n} ad unit\n    containing bidders that don't support ${n}: ${t}.\n    This bidder won't fetch demand.\n  `;
          }
          function _e(e) {
            return Object.fromEntries(Object.entries(e).filter(([e, t]) => void 0 !== t));
          }
          function qe(e, t) {
            return 'object' != typeof e
              ? {}
              : t.reduce((n, r, i) => {
                  if ('function' == typeof r) return n;
                  let o = r;
                  const s = r.match(/^(.+?)\sas\s(.+?)$/i);
                  s && ((r = s[1]), (o = s[2]));
                  let a = e[r];
                  return ('function' == typeof t[i + 1] && (a = t[i + 1](a, n)), void 0 !== a && (n[o] = a), n);
                }, {});
          }
          function xe(e) {
            return e
              ? e
                  .replace(/^\?/, '')
                  .split('&')
                  .reduce((e, t) => {
                    let [n, r] = t.split('=');
                    return (/\[\]$/.test(n) ? ((n = n.replace('[]', '')), (e[n] = e[n] || []), e[n].push(r)) : (e[n] = r || ''), e);
                  }, {})
              : {};
          }
          function je(e) {
            return Object.keys(e)
              .map((t) => (Array.isArray(e[t]) ? e[t].map((e) => `${t}[]=${e}`).join('&') : `${t}=${e[t]}`))
              .join('&');
          }
          function We(e, t) {
            const n = document.createElement('a');
            t && 'noDecodeWholeURL' in t && t.noDecodeWholeURL ? (n.href = e) : (n.href = decodeURIComponent(e));
            const r = t && 'decodeSearchAsString' in t && t.decodeSearchAsString;
            return {
              href: n.href,
              protocol: (n.protocol || '').replace(/:$/, ''),
              hostname: n.hostname,
              port: +n.port,
              pathname: n.pathname.replace(/^(?!\/)/, '/'),
              search: r ? n.search : b.parseQS(n.search || ''),
              hash: (n.hash || '').replace(/^#/, ''),
              host: n.host || window.location.host,
            };
          }
          function Ne(e) {
            return (
              (e.protocol || 'http') +
              '://' +
              (e.host || e.hostname + (e.port ? `:${e.port}` : '')) +
              (e.pathname || '') +
              (e.search ? `?${b.formatQS(e.search || '')}` : '') +
              (e.hash ? `#${e.hash}` : '')
            );
          }
          function Pe(e, t, { checkTypes: n = !1 } = {}) {
            if (e === t) return !0;
            if ('object' != typeof e || null === e || 'object' != typeof t || null === t) return !1;
            const r = Array.isArray(e),
              i = Array.isArray(t);
            if (r && i) {
              if (e.length !== t.length) return !1;
              for (let r = 0; r < e.length; r++) if (!Pe(e[r], t[r], { checkTypes: n })) return !1;
              return !0;
            }
            if (r || i) return !1;
            if (n && e.constructor !== t.constructor) return !1;
            const o = Object.keys(e),
              s = Object.keys(t);
            if (o.length !== s.length) return !1;
            for (const r of o) {
              if (!Object.prototype.hasOwnProperty.call(t, r)) return !1;
              if (!Pe(e[r], t[r], { checkTypes: n })) return !1;
            }
            return !0;
          }
          function Me(e, ...t) {
            for (let n = 0; n < t.length; n++) {
              const r = t[n];
              (0, s.Qd)(r) && Fe(e, r);
            }
            return e;
          }
          function Fe(e, t) {
            if (!(0, s.Qd)(e) || !(0, s.Qd)(t)) return;
            const n = Object.keys(t);
            for (let r = 0; r < n.length; r++) {
              const i = n[r];
              if ('__proto__' === i || 'constructor' === i) continue;
              const o = t[i];
              (0, s.Qd)(o)
                ? ((0, s.Qd)(e[i]) || (e[i] = {}), Fe(e[i], o))
                : Array.isArray(o)
                  ? Array.isArray(e[i])
                    ? o.forEach((t) => {
                        e[i].some((e) => Pe(e, t)) || e[i].push(t);
                      })
                    : (e[i] = [...o])
                  : (e[i] = o);
            }
          }
          function Ge(e, t = 0) {
            const n = function (e, t) {
              if ((0, s.fp)(Math.imul)) return Math.imul(e, t);
              var n = (4194303 & e) * (t |= 0);
              return (4290772992 & e && (n += ((4290772992 & e) * t) | 0), 0 | n);
            };
            let r = 3735928559 ^ t,
              i = 1103547991 ^ t;
            for (let t, o = 0; o < e.length; o++) ((t = e.charCodeAt(o)), (r = n(r ^ t, 2654435761)), (i = n(i ^ t, 1597334677)));
            return (
              (r = n(r ^ (r >>> 16), 2246822507) ^ n(i ^ (i >>> 13), 3266489909)),
              (i = n(i ^ (i >>> 16), 2246822507) ^ n(r ^ (r >>> 13), 3266489909)),
              (4294967296 * (2097151 & i) + (r >>> 0)).toString()
            );
          }
          function Le(e) {
            try {
              return JSON.parse(e);
            } catch (e) {}
          }
          function ze(e) {
            try {
              return JSON.stringify(e);
            } catch (e) {
              return '';
            }
          }
          function Ve(
            e,
            t = function (e) {
              return e;
            },
          ) {
            const n = new Map(),
              r = function () {
                const r = t.apply(this, arguments);
                return (n.has(r) || n.set(r, e.apply(this, arguments)), n.get(r));
              };
            return ((r.clear = n.clear.bind(n)), r);
          }
          function He(e = 0, t = 'd') {
            if (['m', 'd'].indexOf(t) < 0) return Date.now();
            const n = e / ('m' === t ? 1440 : 1);
            return Date.now() + (e && e > 0 ? 864e5 * n : 0);
          }
          function Qe(e) {
            return Object.keys(e).map((t) => ({ [t]: e[t] }));
          }
          function Je(e, t) {
            Object.entries(t).forEach(([t, n]) => e.setAttribute(t, n));
          }
          function Ye(e, t, n = (e) => e) {
            let r = 0,
              i = e.length && e.length - 1;
            const o = n(t);
            for (; i - r > 1; ) {
              const t = r + Math.round((i - r) / 2);
              o > n(e[t]) ? (r = t) : (i = t);
            }
            for (; e.length > r && o > n(e[r]); ) r++;
            return r;
          }
          function Ke(e, t = new Set()) {
            for (const n in e) {
              const r = e[n],
                i = typeof r;
              if (
                void 0 === r ||
                'function' === i ||
                'symbol' === i ||
                r instanceof RegExp ||
                r instanceof Map ||
                r instanceof Set ||
                r instanceof Date ||
                (null !== r && 'object' === i && r.hasOwnProperty('toJSON'))
              )
                return !0;
              if (null !== r && 'object' === i && r.constructor === Object) {
                if (t.has(r)) return !0;
                if ((t.add(r), Ke(r, t))) return !0;
              }
            }
            return !1;
          }
          function Xe(e, t) {
            for (let n, r = 0; r < e.length; r++) if (((n = (0, o.A)(e[r], t)), n)) return n;
          }
          function Ze(e) {
            let t = null;
            try {
              const n = /[-\w]+\.([-\w]+|[-\w]{3,}|[-\w]{1,3}\.[-\w]{2})$/i.exec(e);
              if (null != n && n.length > 0) {
                t = n[0];
                for (let e = 1; e < n.length; e++) n[e].length > t.length && (t = n[e]);
              }
            } catch (e) {
              t = null;
            }
            return t;
          }
          function et(e, t) {
            (0, s.O8)(e.nurl) && '' !== e.nurl && ((e.nurl = e.nurl.replace(/\${AUCTION_PRICE}/, t)), X(e.nurl));
          }
          const tt = (function () {
            let e;
            return function () {
              if (void 0 !== e) return e;
              try {
                void 0 === window.CompressionStream ? (e = !1) : (new window.CompressionStream('gzip'), (e = !0));
              } catch (t) {
                e = !1;
              }
              return e;
            };
          })();
          async function nt(e) {
            'string' != typeof e && (e = JSON.stringify(e));
            const t = new TextEncoder().encode(e),
              n = new Blob([t]).stream().pipeThrough(new window.CompressionStream('gzip')),
              r = await new Response(n).blob(),
              i = await r.arrayBuffer();
            return new Uint8Array(i);
          }
        },
        7449(e, t, n) {
          n.d(t, { Tn: () => a, fW: () => o, tW: () => i, tp: () => r, zu: () => s });
          const r = 'prebid',
            i = 'bidder',
            o = 'userId',
            s = 'rtd',
            a = 'analytics';
        },
        7686(e, t, n) {
          n.d(t, { EN: () => d, gR: () => s });
          var r = n(8384),
            i = n(7413);
          function o(e, t = window) {
            if (!e) return e;
            if (/\w+:\/\//.exec(e)) return e;
            let n = t.location.protocol;
            try {
              n = t.top.location.protocol;
            } catch (e) {}
            return /^\/\//.exec(e) ? n + e : `${n}//${e}`;
          }
          function s(e, { noLeadingWww: t = !1, noPort: n = !1 } = {}) {
            let r;
            try {
              r = new URL(o(e));
            } catch (e) {
              return;
            }
            return ((r = n ? r.hostname : r.host), t && r.startsWith('www.') && (r = r.substring(4)), r);
          }
          function a(e) {
            try {
              const t = e.querySelector("link[rel='canonical']");
              if (null !== t) return t.href;
            } catch (e) {}
            return null;
          }
          const d = (function (e, t = window) {
            if (t.top !== t) return e;
            let n, r, i;
            return function () {
              const o = a(t.document),
                s = t.location.href;
              return ((n === o && s === r) || ((n = o), (r = s), (i = e())), i);
            };
          })(
            ((c = window),
            function () {
              const e = [],
                t = (function (e) {
                  try {
                    if (!e.location.ancestorOrigins) return;
                    return e.location.ancestorOrigins;
                  } catch (e) {}
                })(c),
                n = r.$W.getConfig('maxNestedIframes');
              let d,
                u,
                l,
                f,
                g = !1,
                p = 0,
                m = !1,
                h = !1,
                b = !1;
              do {
                const n = d,
                  r = h;
                let o,
                  s = !1,
                  f = null;
                ((h = !1), (d = d ? d.parent : c));
                try {
                  o = d.location.href || null;
                } catch (e) {
                  s = !0;
                }
                if (s)
                  if (r) {
                    const e = n.context;
                    try {
                      ((f = e.sourceUrl), (u = f), (b = !0), (m = !0), d === c.top && (g = !0), e.canonicalUrl && (l = e.canonicalUrl));
                    } catch (e) {}
                  } else {
                    (0, i.logWarn)('Trying to access cross domain iframe. Continuing without referrer and location');
                    try {
                      const e = n.document.referrer;
                      e && ((f = e), d === c.top && (g = !0));
                    } catch (e) {}
                    (!f && t && t[p - 1] && ((f = t[p - 1]), d === c.top && (b = !0)), f && !m && (u = f));
                  }
                else {
                  if (o && ((f = o), (u = f), (m = !1), d === c.top)) {
                    g = !0;
                    const e = a(d.document);
                    e && (l = e);
                  }
                  d.context && d.context.sourceUrl && (h = !0);
                }
                (e.push(f), p++);
              } while (d !== c.top && p < n);
              e.reverse();
              try {
                f = c.top.document.referrer;
              } catch (e) {}
              const y = g || b ? u : null,
                E = r.$W.getConfig('pageUrl') || l || null;
              let v = r.$W.getConfig('pageUrl') || y || o(E, c);
              return (
                y && y.indexOf('?') > -1 && -1 === v.indexOf('?') && (v = `${v}${y.substring(y.indexOf('?'))}`),
                {
                  reachedTop: g,
                  isAmp: m,
                  numIframes: p - 1,
                  stack: e,
                  topmostLocation: u || null,
                  location: y,
                  canonicalUrl: E,
                  page: v,
                  domain: s(v) || null,
                  ref: f || null,
                  legacy: { reachedTop: g, isAmp: m, numIframes: p - 1, stack: e, referer: u || null, canonicalUrl: E },
                }
              );
            }),
          );
          var c;
        },
        7791(e, t, n) {
          n.d(t, { H6: () => c, V0: () => p, Zy: () => f, mn: () => u, vk: () => m });
          var r = n(7413),
            i = n(3350),
            o = n(8384),
            s = n(1785),
            a = n(9015),
            d = n(4864);
          const c = 'outstream',
            u = 'instream',
            l = [
              ['mimes', (e) => Array.isArray(e) && e.length > 0 && e.every((e) => 'string' == typeof e)],
              ['minduration', i.Fq],
              ['maxduration', i.Fq],
              ['startdelay', i.Fq],
              ['maxseq', i.Fq],
              ['poddur', i.Fq],
              ['protocols', i.Uu],
              ['w', i.Fq],
              ['h', i.Fq],
              ['podid', i.O8],
              ['podseq', i.Fq],
              ['rqddurs', i.Uu],
              ['placement', i.Fq],
              ['plcmt', i.Fq],
              ['linearity', i.Fq],
              ['skip', (e) => [1, 0].includes(e)],
              ['skipmin', i.Fq],
              ['skipafter', i.Fq],
              ['sequence', i.Fq],
              ['slotinpod', i.Fq],
              ['mincpmpersec', i.Et],
              ['battr', i.Uu],
              ['maxextended', i.Fq],
              ['minbitrate', i.Fq],
              ['maxbitrate', i.Fq],
              ['boxingallowed', i.Fq],
              ['playbackmethod', i.Uu],
              ['playbackend', i.Fq],
              ['delivery', i.Uu],
              ['pos', i.Fq],
              ['api', i.Uu],
              ['companiontype', i.Uu],
              ['poddedupe', i.Uu],
            ],
            f = new Map(l);
          function g(e) {
            return !(!e?.renderer && !e?.safeRenderer);
          }
          function p(e) {
            const t = e?.mediaTypes?.video;
            if (null != t) {
              null == t.plcmt &&
                (t.context === c || [2, 3, 4].includes(t.placement)
                  ? (t.plcmt = 4)
                  : t.playbackmethod?.some?.((e) => [2, 6].includes(e)) && (t.plcmt = 2));
              const n = (0, i.Uu)(t.playerSize, 2)
                  ? t.playerSize
                  : Array.isArray(t.playerSize) && (0, i.Uu)(t.playerSize[0])
                    ? t.playerSize[0]
                    : null,
                o = (0, i.Et)(t.w) && (0, i.Et)(t.h) ? [t.w, t.h] : null;
              let s = !1;
              (null == n
                ? null != o && (null != t.playerSize ? (s = !0) : (t.playerSize = [o]))
                : ['w', 'h'].forEach((e, r) => {
                    null != t[e] && t[e] !== n[r] ? (s = !0) : (t[e] = n[r]);
                  }),
                s && (0, r.logWarn)(`Ad unit "${e.code} has conflicting playerSize and w/h`, e));
            }
          }
          function m(e, { index: t = a.n.index } = {}) {
            const n = t.getMediaTypes(e)?.video,
              r = n && n?.context,
              i = n && n?.useCacheKey,
              o = t.getAdUnit(e);
            return h(e, o, n, r, i);
          }
          const h = (0, s.A_)(
            'sync',
            function (e, t, n, i, s) {
              if (n && (s || i !== c)) {
                const { url: t, useLocal: n, allowVastXmlOnly: i } = o.$W.getConfig('cache') || {};
                return t || n || !e.vastXml || e.vastUrl
                  ? !(!e.vastUrl && !e.vastXml)
                  : !0 === i
                    ? ((0, r.logWarn)(
                        'This bid contains only vastXml, and caching is disabled. Proceeding because cache.allowVastXmlOnly is enabled.',
                      ),
                      !0)
                    : ((0, r.logError)(
                        `\n        This bid contains only vastXml and will not work when a prebid cache url is not specified.\n        Try enabling either prebid cache with ${(0, d.k)()}.setConfig({ cache: {url: "..."} });\n        or local cache with ${(0, d.k)()}.setConfig({ cache: { useLocal: true }});\n      `,
                      ),
                      !1);
              }
              return !(i === c && !s) || g(e) || g(t) || g(n);
            },
            'checkVideoBidSetup',
          );
        },
        7797(e, t, n) {
          n.d(t, { O: () => o });
          var r = n(7413);
          function i({ src: e = 'client', bidder: t = '', bidId: n, transactionId: i, adUnitId: o, auctionId: s } = {}) {
            var a = e;
            (Object.assign(this, {
              bidderCode: t,
              width: 0,
              height: 0,
              adId: (0, r.getUniqueIdentifierStr)(),
              requestId: n,
              transactionId: i,
              adUnitId: o,
              auctionId: s,
              mediaType: 'banner',
              source: a,
            }),
              (this.getSize = function () {
                return this.width + 'x' + this.height;
              }));
          }
          function o(e) {
            return new i(e);
          }
        },
        7834(e, t, n) {
          n.d(t, { H: () => u });
          var r = n(8203),
            i = n(7413);
          let o = null,
            s = 0,
            a = [];
          function d() {
            document.hidden
              ? (o = Date.now())
              : ((s += Date.now() - (o ?? 0)),
                (o = null),
                a.forEach(({ callback: e, startTime: t, setTimerId: n }) => n(c(e, s - t)())),
                (a = []));
          }
          function c(e, t) {
            const n = s;
            let r = setTimeout(() => {
              s === n && null == o
                ? e()
                : null != o
                  ? a.push({
                      callback: e,
                      startTime: n,
                      setTimerId(e) {
                        r = e;
                      },
                    })
                  : (r = c(e, s - n)());
            }, t);
            return () => r;
          }
          function u({ startTime: e = i.timestamp, ttl: t = () => null, monotonic: n = !1, slack: o = 5e3 } = {}) {
            const s = new Map(),
              a = [],
              d = [],
              u = n
                ? (e) => d.push(e)
                : (e) =>
                    d.splice(
                      (0, i.binarySearch)(d, e, (e) => e.expiry),
                      0,
                      e,
                    );
            let l, f;
            function g() {
              if ((f && clearTimeout(f()), d.length > 0)) {
                const e = (0, i.timestamp)();
                ((l = Math.max(e, d[0].expiry + o)),
                  (f = c(() => {
                    const e = (0, i.timestamp)();
                    let t = 0;
                    for (const n of d) {
                      if (n.expiry > e) break;
                      (a.forEach((e) => {
                        try {
                          e(n.item);
                        } catch (e) {
                          (0, i.logError)(e);
                        }
                      }),
                        s.delete(n.item),
                        t++);
                    }
                    (d.splice(0, t), (f = null), g());
                  }, l - e)));
              } else f = null;
            }
            function p(n) {
              const i = {},
                s = m;
              let a;
              const [d, c] = Object.entries({ start: e, delta: t }).map(([e, t]) => {
                  let d;
                  return function () {
                    const c = (d = {});
                    r.U9.resolve(t(n)).then((t) => {
                      c === d &&
                        ((i[e] = t),
                        s === m && null != i.start && null != i.delta && ((a = i.start + i.delta), u(p), (null == f || l > a + o) && g()));
                    });
                  };
                }),
                p = {
                  item: n,
                  refresh: c,
                  get expiry() {
                    return a;
                  },
                };
              return (d(), c(), p);
            }
            let m = {};
            return {
              [Symbol.iterator]: () => s.keys(),
              add(e) {
                !s.has(e) && s.set(e, p(e));
              },
              has: (e) => s.has(e),
              delete(e) {
                const t = s.get(e);
                if (t)
                  for (let e = 0; e < d.length && d[e].expiry <= t.expiry; e++)
                    if (d[e] === t) {
                      d.splice(e, 1);
                      break;
                    }
                return s.delete(e);
              },
              clear() {
                ((d.length = 0), g(), s.clear(), (m = {}));
              },
              toArray: () => Array.from(s.keys()),
              refresh() {
                ((d.length = 0), g());
                for (const e of s.values()) e.refresh();
              },
              onExpiry: (e) => (
                a.push(e),
                () => {
                  const t = a.indexOf(e);
                  t >= 0 && a.splice(t, 1);
                }
              ),
            };
          }
          document.addEventListener('visibilitychange', d);
        },
        7850(e, t, n) {
          n.d(t, { Dy: () => i, O$: () => s, i8: () => o });
          var r = n(7413);
          const i = ['dooh', 'app', 'site'];
          function o(e) {
            return function (t) {
              return (
                i.reduce(
                  (n, i) => (
                    s(t, i) &&
                      (null != n ? ((0, r.logWarn)(`${e} specifies both '${n}' and '${i}'; dropping the latter.`), delete t[i]) : (n = i)),
                    n
                  ),
                  null,
                ),
                t
              );
            };
          }
          function s(e, t) {
            return null != e[t] && Object.keys(e[t]).length > 0;
          }
        },
        7936(e, t, n) {
          function r(e) {
            return 'function' == typeof e.getConfig;
          }
          function i(e) {
            return e.getConfig('targeting').targeting ?? {};
          }
          function o(e, t) {
            r(e) ? e.setConfig({ targeting: t }) : e.updateTargetingFromMap(t);
          }
          function s(e, t) {
            return r(e) ? (i(e)[t] ?? []) : e.getTargeting(t);
          }
          function a(e) {
            return r(e) ? Object.keys(i(e)) : e.getTargetingKeys();
          }
          n.d(t, { A6: () => s, W$: () => a, ns: () => o });
        },
        8203(e, t, n) {
          n.d(t, { U9: () => o, cb: () => s, v6: () => a });
          var r = n(1129);
          const i = (0, r.m)().setTimeout ?? setTimeout,
            o = (0, r.m)().Promise ?? Promise;
          function s(e = 0) {
            return new o((t) => {
              i(t, e);
            });
          }
          function a({ promiseFactory: e = (e) => new o(e) } = {}) {
            function t(e) {
              return (t) => e(t);
            }
            let n, r;
            return {
              promise: e((e, t) => {
                ((n = e), (r = t));
              }),
              resolve: t(n),
              reject: t(r),
            };
          }
        },
        8224(e, t, n) {
          n.d(t, { xu: () => ve, gH: () => Ce });
          var r = n(1129),
            i = n(7413),
            o = n(3350),
            s = n(8928),
            a = n(3435),
            d = n(5657),
            c = n(5521),
            u = n(5595),
            l = n(3895),
            f = n(8203),
            g = n(5262),
            p = n(9015),
            m = n(7936);
          const { REQUEST: h, RESPONSE: b, NATIVE: y, EVENT: E } = c.nl,
            v = {
              [h]: function (e, t, n) {
                (0, u.bw)({
                  renderFn(t) {
                    e(Object.assign({ message: b, renderer: (0, l.kj)(n), rendererVersion: l.xh }, t));
                  },
                  resizeFn: A(t.adId, n),
                  options: t.options,
                  adId: t.adId,
                  bidResponse: n,
                });
              },
              [E]: function (e, t, n) {
                if (null == n) return void (0, i.logError)(`Cannot find ad '${t.adId}' for x-origin event request`);
                if (n.status !== c.tl.RENDERED)
                  return void (0, i.logWarn)(`Received x-origin event request without corresponding render request for ad '${n.adId}'`);
                return (0, u.Uc)(t, n);
              },
            };
          function w() {
            window.addEventListener(
              'message',
              function (e) {
                !(function (e, t) {
                  var n,
                    r = e.message ? 'message' : 'data';
                  try {
                    n = JSON.parse(e[r]);
                  } catch (e) {
                    return;
                  }
                  n &&
                    n.adId &&
                    n.message &&
                    v.hasOwnProperty(n.message) &&
                    (v[n.message](
                      ((o = n.adId),
                      (s = (function (e) {
                        return null == e.origin && 0 === e.ports.length
                          ? function () {
                              const e =
                                'Cannot post message to a frame with null origin. Please update creatives to use MessageChannel, see https://github.com/prebid/Prebid.js/issues/7870';
                              throw ((0, i.logError)(e), new Error(e));
                            }
                          : e.ports.length > 0
                            ? function (t) {
                                e.ports[0].postMessage(JSON.stringify(t));
                              }
                            : function (t) {
                                e.source.postMessage(JSON.stringify(t), e.origin);
                              };
                      })(e)),
                      function (e, ...t) {
                        return s(Object.assign({}, e, { adId: o }), ...t);
                      }),
                      n,
                      p.n.findBidByAdId(n.adId),
                    ),
                    t && t());
                  var o, s;
                })(e);
              },
              !1,
            );
          }
          function A(e, t) {
            return function (n, r) {
              !(function ({ instl: e, element: t, adId: n, adUnitCode: r, width: o, height: s }) {
                if (e) return;
                function a(e) {
                  if (e) {
                    const t = e.style;
                    ((t.width = T(o)), (t.height = T(s)));
                  } else
                    (0, i.logError)(
                      `Unable to locate matching page element for adUnitCode ${r}.  Can't resize it to ad's dimensions.  Please review setup.`,
                    );
                }
                const d = u('iframe:not([style*="display: none"])');
                a(d);
                const c = d?.closest('ins[data-anchor-status]');
                function u(e) {
                  const i = l(n, r),
                    o = null == i ? (0, g.o)({ element: t, adUnitCode: r }) : document.getElementById(i);
                  return o && o.querySelector(e);
                }
                function l(e, t) {
                  if ((0, i.isGptPubadsDefined)()) {
                    const t = p(e);
                    if (t) return t;
                  }
                  if ((0, i.isApnGetTagDefined)()) {
                    const e = h(t);
                    if (e) return e;
                  }
                }
                function p(e) {
                  const t = window.googletag
                    .pubads()
                    .getSlots()
                    .find((t) => (0, m.W$)(t).find((n) => (0, m.A6)(t, n).includes(e)));
                  return t ? t.getSlotElementId() : null;
                }
                function h(e) {
                  const t = window.apntag.getTag(e);
                  return t && t.targetId;
                }
                c
                  ? (function (e, t, n) {
                      new f.U9((r, i) => {
                        let o = 10;
                        const s = setInterval(() => {
                          let a = !1;
                          (Object.entries({ width: t, height: n }).forEach(([t, n]) => {
                            /\d+px/.test(e.style[t]) && ((e.style[t] = T(n)), (a = !0));
                          }),
                            (a || 0 === o--) && (clearInterval(s), a ? r() : i(new Error('Could not resize anchor'))));
                        }, 50);
                      });
                    })(c, o, s)
                  : a(d?.parentElement);
              })({ ...t, width: n, height: r, adId: e });
            };
          }
          function T(e) {
            return e ? e + 'px' : '100%';
          }
          Object.assign(v, {
            [y]: function (e, t, n) {
              if (null == n) return void (0, i.logError)(`Cannot find ad for x-origin event request: '${t.adId}'`);
              switch (t.action) {
                case 'assetRequest':
                  (0, u.Hh)(n, () => e((0, d.IX)(t, n)));
                  break;
                case 'allAssetRequest':
                  (0, u.Hh)(n, () => e((0, d.yl)(t, n)));
                  break;
                default:
                  ((0, u.vW)(t, n, { resizeFn: A(t.adId, n) }), (0, u.Pk)(n));
              }
            },
          });
          var I = n(3838),
            C = n(8384),
            O = n(2247),
            S = n(8347),
            B = n(1785),
            R = n(7797),
            k = n(8468),
            U = n(7449),
            D = n(1779),
            $ = n(6901),
            _ = n(4864);
          const q = `__${(0, _.k)()}_debugging__`;
          function x() {
            return (0, r.m)().installedModules.includes('debugging');
          }
          function j(e) {
            return new f.U9((t, n) => {
              (0, k.R)(e, U.tp, 'debugging', { success: t, error: n });
            });
          }
          function W({ alreadyInstalled: e = x, script: t = j } = {}) {
            let n = null;
            return function () {
              return (
                null == n &&
                  (n = new f.U9((n, o) => {
                    setTimeout(() => {
                      if (e()) n();
                      else {
                        const e = `${(0, _.rT)()}debugging-standalone.js`;
                        ((0, i.logMessage)(`Debugging module not installed, loading it from "${e}"...`),
                          ((0, r.m)()._installDebugging = !0),
                          t(e)
                            .then(() => {
                              (0, r.m)()._installDebugging({
                                DEBUG_KEY: q,
                                hook: B.A_,
                                config: C.$W,
                                createBid: R.O,
                                logger: (0, i.prefixLog)('DEBUG:'),
                                utils: i,
                                BANNER: D.D4,
                                NATIVE: D.s6,
                                VIDEO: D.G_,
                                Renderer: $.A4,
                              });
                            })
                            .then(n, o));
                      }
                    });
                  })),
                n
              );
            };
          }
          const N = (function ({ load: e = W(), hook: t = (0, B.Yn)('requestBids') } = {}) {
            let n = null,
              r = !1;
            function o(e, ...t) {
              return (n || f.U9.resolve())
                .catch((e) => {
                  (0, i.logError)('Could not load debugging module', e);
                })
                .then(() => e.apply(this, t));
            }
            function s() {
              (t.getHooks({ hook: o }).remove(), (r = !1));
            }
            return {
              enable: function () {
                r || ((n = e()), t.before(o, 99), (r = !0));
              },
              disable: s,
              reset: function () {
                ((n = null), s());
              },
            };
          })();
          N.reset;
          C.$W.getConfig('debugging', function ({ debugging: e }) {
            e?.enabled ? N.enable() : N.disable();
          });
          var P = n(2354),
            M = n(4794),
            F = n(3399),
            G = n(2822),
            L = n(6344),
            z = n(1068),
            V = n(6273),
            H = n(7791);
          const Q = [
              ['format', (e) => Array.isArray(e) && e.length > 0 && e.every((e) => 'object' == typeof e)],
              ['w', o.Fq],
              ['h', o.Fq],
              ['btype', o.Uu],
              ['battr', o.Uu],
              ['pos', o.Fq],
              ['mimes', (e) => Array.isArray(e) && e.length > 0 && e.every((e) => 'string' == typeof e)],
              ['topframe', (e) => [1, 0].includes(e)],
              ['expdir', o.Uu],
              ['api', o.Uu],
              ['id', o.O8],
              ['vcm', (e) => [1, 0].includes(e)],
            ],
            J = new Map(Q);
          function Y(e, t) {
            return (...n) =>
              document.prerendering && e()
                ? new Promise((e) => {
                    document.addEventListener(
                      'prerenderingchange',
                      () => {
                        ((0, i.logInfo)('Auctions were suspended while page was prerendering'), e(t.apply(this, n)));
                      },
                      { once: !0 },
                    );
                  })
                : Promise.resolve(t.apply(this, n));
          }
          var K = n(2682);
          const X = (0, B.A_)('sync', function (e) {
            return (
              [
                Z,
                ee('source.schain', 'source.ext.schain', 'source.ext.schain'),
                ee('device.sua', 'device.ext.sua', 'device.sua'),
                ee('regs.gdpr', 'regs.ext.gdpr', 'regs.ext.gdpr'),
                ee('user.consent', 'user.ext.consent', 'user.ext.consent'),
                ee('regs.us_privacy', 'regs.ext.us_privacy', 'regs.ext.us_privacy'),
                ee('regs.gpp', 'regs.ext.gpp', 'regs.gpp'),
                ee('regs.gpp_sid', 'regs.ext.gpp_sid', 'regs.gpp_sid'),
              ].forEach((t) =>
                (function (e, t) {
                  ((t.global = e(t.global, 'global FPD')),
                    Object.entries(t.bidder).forEach(([n, r]) => {
                      t.bidder[n] = e(r, `bidder '${n}' FPD`);
                    }));
                })(t, e),
              ),
              e
            );
          });
          function Z(e, t) {
            if (!e) return e;
            const n = [],
              r = [...(e?.user?.eids ?? []).map((e) => [0, e]), ...(e?.user?.ext?.eids ?? []).map((e) => [1, e])].filter(([e, r]) =>
                n.findIndex(([t, n]) => e !== t && (0, i.deepEqual)(n, r)) > -1
                  ? ((0, i.logWarn)(`Found duplicate EID in user.eids and user.ext.eids (${t})`, r), !1)
                  : (n.push([e, r]), !0),
              );
            return (
              r.length > 0 &&
                (0, a.J)(
                  e,
                  'user.ext.eids',
                  r.map(([e, t]) => t),
                ),
              delete e?.user?.eids,
              e
            );
          }
          function ee(e, t, n) {
            if (n !== e && n !== t) throw new Error('invalid argument');
            const r = (n === e ? t : e).split('.'),
              o = r.pop(),
              d = r.join('.');
            return function (r, c) {
              if (!r) return r;
              const u = (0, s.A)(r, e),
                l = (0, s.A)(r, t);
              (null == u ||
                null == l ||
                (0, i.deepEqual)(u, l) ||
                (0, i.logWarn)(`Conflicting ${e} and ${t} (${c}), preferring ${e}`, { [e]: u, [t]: l }),
                null != (u ?? l) && (0, a.J)(r, n, u ?? l));
              const f = (0, s.A)(r, d);
              return (null != f && 'object' == typeof f && delete f[o], r);
            };
          }
          var te = n(1662),
            ne = n(6540),
            re = n(2859);
          const ie = (0, r.m)(),
            { triggerUserSyncs: oe } = I.zt,
            { REQUEST_BIDS: se, SET_TARGETING: ae } = c.qY;
          function de(e, t) {
            let n = [];
            return (
              (0, o.cy)(e) &&
                (t ? e.length === t : e.length > 0) &&
                (e.every((e) => (0, o.Uu)(e, 2)) ? (n = e) : (0, o.Uu)(e, 2) && n.push(e)),
              n
            );
          }
          function ce(e, t) {
            const n = (0, s.A)(e, `ortb2Imp.${t}`),
              r = (0, s.A)(e, `mediaTypes.${t}`);
            if (!n && !r) return;
            const o = { [D.G_]: H.Zy, [D.D4]: J }[t];
            o &&
              [...o].forEach(([n, r]) => {
                const o = (0, s.A)(e, `mediaTypes.${t}.${n}`),
                  d = (0, s.A)(e, `ortb2Imp.${t}.${n}`);
                (void 0 === o && void 0 === d) ||
                  (void 0 === o
                    ? (0, a.J)(e, `mediaTypes.${t}.${n}`, d)
                    : void 0 === d
                      ? (0, a.J)(e, `ortb2Imp.${t}.${n}`, o)
                      : (0, i.deepEqual)(o, d) ||
                        ((0, i.logWarn)(
                          `adUnit ${e.code}: specifies conflicting ortb2Imp.${t}.${n} and mediaTypes.${t}.${n}, the latter will be ignored`,
                          e,
                        ),
                        (0, a.J)(e, `mediaTypes.${t}.${n}`, d)));
              });
          }
          function ue(e) {
            const t = (0, o.Go)(e),
              n = t.mediaTypes.banner,
              r = null == n.sizes ? null : de(n.sizes),
              s = e.ortb2Imp?.banner?.format ?? n?.format;
            let d;
            if (null != s) {
              ((0, a.J)(t, 'ortb2Imp.banner.format', s), (n.format = s));
              try {
                d = s
                  .filter(({ w: t, h: n, wratio: r, hratio: o }) =>
                    null != (t ?? n) && null != (r ?? o)
                      ? ((0, i.logWarn)('Ad unit banner.format specifies both w/h and wratio/hratio', e), !1)
                      : (null != t && null != n) || (null != r && null != o),
                  )
                  .map(({ w: e, h: t, wratio: n, hratio: r }) => [e ?? n, t ?? r]);
              } catch (t) {
                (0, i.logError)(`Invalid format definition on ad unit ${e.code}`, s);
              }
              null == d ||
                null == r ||
                (0, i.deepEqual)(r, d) ||
                (0, i.logWarn)(`Ad unit ${e.code} has conflicting sizes and format definitions`, e);
            }
            const c = d ?? r ?? [],
              u = e.ortb2Imp?.banner?.expdir ?? n.expdir;
            return (
              null != u && ((n.expdir = u), (0, a.J)(t, 'ortb2Imp.banner.expdir', u)),
              c.length > 0
                ? ((n.sizes = c), (t.sizes = c))
                : ((0, i.logError)(
                    'Detected a mediaTypes.banner object without a proper sizes field.  Please ensure the sizes are listed like: [[300, 250], ...].  Removing invalid mediaTypes.banner object from request.',
                  ),
                  delete t.mediaTypes.banner),
              ge(t, 'banner'),
              ce(t, 'banner'),
              t
            );
          }
          function le(e) {
            const t = (0, o.Go)(e);
            return (ge(t, 'audio'), ce(t, 'audio'), t);
          }
          function fe(e) {
            const t = (0, o.Go)(e),
              n = t.mediaTypes.video;
            if (n.playerSize) {
              const e = 'number' == typeof n.playerSize[0] ? 2 : 1,
                r = de(n.playerSize, e);
              r.length > 0
                ? (2 === e && (0, i.logInfo)("Transforming video.playerSize from [640,480] to [[640,480]] so it's in the proper format."),
                  (n.playerSize = r),
                  (t.sizes = r))
                : ((0, i.logError)(
                    'Detected incorrect configuration of mediaTypes.video.playerSize.  Please specify only one set of dimensions in a format like: [[640, 480]]. Removing invalid mediaTypes.video.playerSize property from request.',
                  ),
                  delete t.mediaTypes.video.playerSize);
            }
            return (ge(t, 'video'), ce(t, 'video'), t);
          }
          function ge(e, t, n) {
            const r = (e?.mediaTypes || {})[t],
              s = ((e) => (e === D.D4 ? J : e === D.FY ? te.Ai : e === D.G_ ? H.Zy : void 0))(t);
            (0, o.Qd)(r)
              ? null != s &&
                null != r &&
                Object.entries(r).forEach(([o, a]) => {
                  if (!s.has(o)) return;
                  s.get(o)(a) ||
                    ('function' == typeof n
                      ? n(o, a, e)
                      : (delete r[o],
                        (0, i.logWarn)(
                          `Invalid prop in adUnit "${e.code}": Invalid value for mediaTypes.${t}.${o} ORTB property. The property has been removed.`,
                        )));
                })
              : (0, i.logWarn)(`validateOrtb${t}Fields: ${t}Params must be an object.`);
          }
          function pe(e) {
            function t(t) {
              return (
                (0, i.logError)(`Error in adUnit "${e.code}": ${t}. Removing native request from ad unit`, e),
                delete r.mediaTypes.native,
                r
              );
            }
            function n(e) {
              for (const t of ['types'])
                if (s.hasOwnProperty(t)) {
                  const n = e(t);
                  if (n) return n;
                }
            }
            const r = (0, o.Go)(e),
              s = r.mediaTypes.native;
            if (s.ortb) {
              if (s.ortb.assets?.some((e) => !(0, o.Et)(e.id) || e.id < 0 || e.id % 1 != 0))
                return t('native asset ID must be a nonnegative integer');
              if (n((e) => t(`ORTB native requests cannot specify "${e}"`))) return r;
              const e = Object.keys(c.x5).filter((e) => c.x5[e].includes('hb_native_')),
                a = Object.keys(s).filter((t) => e.includes(t));
              a.length > 0 &&
                ((0, i.logError)(
                  `when using native OpenRTB format, you cannot use legacy native properties. Deleting ${a} keys from request.`,
                ),
                a.forEach((e) => delete r.mediaTypes.native[e]));
            } else n((t) => (0, i.logWarn)(`mediaTypes.native.${t} is deprecated, consider using native ORTB instead`, e));
            return (
              s.image &&
                s.image.sizes &&
                !Array.isArray(s.image.sizes) &&
                ((0, i.logError)(
                  'Please use an array of sizes for native.image.sizes field.  Removing invalid mediaTypes.native.image.sizes property from request.',
                ),
                delete r.mediaTypes.native.image.sizes),
              s.image &&
                s.image.aspect_ratios &&
                !Array.isArray(s.image.aspect_ratios) &&
                ((0, i.logError)(
                  'Please use an array of sizes for native.image.aspect_ratios field.  Removing invalid mediaTypes.native.image.aspect_ratios property from request.',
                ),
                delete r.mediaTypes.native.image.aspect_ratios),
              s.icon &&
                s.icon.sizes &&
                !Array.isArray(s.icon.sizes) &&
                ((0, i.logError)(
                  'Please use an array of sizes for native.icon.sizes field.  Removing invalid mediaTypes.native.icon.sizes property from request.',
                ),
                delete r.mediaTypes.native.icon.sizes),
              r
            );
          }
          function me(e, t) {
            const n = e?.mediaTypes?.[t]?.pos;
            if (!(0, o.Et)(n) || isNaN(n) || !isFinite(n)) {
              const n = `Value of property 'pos' on ad unit ${e.code} should be of type: Number`;
              ((0, i.logWarn)(n), delete e.mediaTypes[t].pos);
            }
            return e;
          }
          function he(e) {
            const t = (e) => `adUnit.code '${n.code}' ${e}`,
              n = e,
              r = n.mediaTypes,
              s = n.bids;
            return null == s || (0, o.cy)(s)
              ? null == s && null == n.ortb2Imp
                ? ((0, i.logError)(t("has no 'adUnit.bids' and no 'adUnit.ortb2Imp'. Removing adUnit from auction")), null)
                : r && 0 !== Object.keys(r).length
                  ? (null == n.ortb2Imp ||
                      (null != s && 0 !== s.length) ||
                      ((n.bids = [{ bidder: null }]),
                      (0, i.logMessage)(t("defines 'adUnit.ortb2Imp' with no 'adUnit.bids'; it will be seen only by S2S adapters"))),
                    n)
                  : ((0, i.logError)(
                      t(
                        "does not define a 'mediaTypes' object.  This is a required field for the auction, so this adUnit has been removed.",
                      ),
                    ),
                    null)
              : ((0, i.logError)(t("defines 'adUnit.bids' that is not an array. Removing adUnit from auction")), null);
          }
          (!(function () {
            let e = null;
            try {
              e = window.sessionStorage;
            } catch (e) {}
            if (null !== e) {
              const t = N;
              let n = null;
              try {
                n = e.getItem(q);
              } catch (e) {}
              null !== n && t.enable();
            }
          })(),
            (ie.bidderSettings = ie.bidderSettings || {}),
            (ie.libLoaded = !0),
            (ie.version = 'v11.23.0'),
            (0, i.logInfo)('Prebid.js v11.23.0 loaded'),
            (ie.adUnits = ie.adUnits || []),
            (ie.pageViewIdPerBidder = ie.pageViewIdPerBidder || new Map()));
          const be = { validateAdUnit: he, validateBannerMediaType: ue, validateSizes: de };
          (Object.assign(be, { validateNativeMediaType: pe }),
            Object.assign(be, { validateVideoMediaType: fe }),
            Object.assign(be, { validateAudioMediaType: le }));
          const ye = (0, B.A_)(
            'sync',
            function (e) {
              const t = [];
              return (
                e.forEach((e) => {
                  const n = he(e);
                  if (null == n) return;
                  const r = n.mediaTypes;
                  let i, o, s, a;
                  (r.banner && ((i = ue(n)), r.banner.hasOwnProperty('pos') && (i = me(i, 'banner'))),
                    r.video && ((o = fe(i || n)), r.video.hasOwnProperty('pos') && (o = me(o, 'video'))),
                    r.native && (s = pe(o || i || n)),
                    r.audio && (a = le(s || n)));
                  const d = Object.assign({}, i, o, s, a);
                  t.push(d);
                }),
                t
              );
            },
            'checkAdUnitSetup',
          );
          function Ee(e, t) {
            return function (...n) {
              return ((0, i.logInfo)(`Invoking ${(0, _.k)()}.${e}`, n), t.apply(this, n));
            };
          }
          function ve(e, t, n = !0) {
            (0, r.m)()[e] = n ? Ee(e, t) : t;
          }
          function we(e) {
            return Ae(e)[e];
          }
          function Ae(e) {
            return S.iS.getAllTargeting(e);
          }
          function Te(e) {
            const t = p.n[e]().filter((e) => p.n.getAdUnitCodes().includes(e.adUnitCode)),
              n = p.n.getLastAuctionId();
            return t
              .map((e) => e.adUnitCode)
              .filter(i.uniques)
              .map((e) => t.filter((t) => t.auctionId === n && t.adUnitCode === e))
              .filter((e) => e && e[0] && e[0].adUnitCode)
              .map((e) => ({ [e[0].adUnitCode]: (0, ne.O)(e) }))
              .reduce((e, t) => Object.assign(e, t), {});
          }
          (ve('triggerUserSyncs', oe),
            ve('getAdserverTargetingForAdUnitCodeStr', function (e) {
              if (e) {
                const t = we(e);
                return (0, i.transformAdServerTargetingObj)(t);
              }
              (0, i.logMessage)('Need to call getAdserverTargetingForAdUnitCodeStr with adunitCode');
            }),
            ve('getHighestUnusedBidResponseForAdUnitCode', function (e) {
              if (e) {
                const t = p.n.getAllBidsForAdUnitCode(e).filter(O.Y);
                return t.length ? t.reduce(V.Vk) : null;
              }
              (0, i.logMessage)('Need to call getHighestUnusedBidResponseForAdUnitCode with adunitCode');
            }),
            ve('getAdserverTargetingForAdUnitCode', we),
            ve('getAdserverTargeting', Ae),
            ve('getConsentMetadata', function () {
              return z.SL.getConsentMeta();
            }),
            ve('getNoBids', function () {
              return Te('getNoBids');
            }),
            ve('getNoBidsForAdUnitCode', function (e) {
              const t = p.n.getNoBids().filter((t) => t.adUnitCode === e);
              return (0, ne.O)(t);
            }),
            ve('getBidResponses', function () {
              return Te('getBidsReceived');
            }),
            ve('getBidResponsesForAdUnitCode', function (e) {
              const t = p.n.getBidsReceived().filter((t) => t.adUnitCode === e);
              return (0, ne.O)(t);
            }),
            ve('setTargetingForGPTAsync', function (e) {
              (0, i.isGptPubadsDefined)() ? S.iS.setTargetingForGPT(e) : (0, i.logError)('window.googletag is not defined on the page');
            }),
            ve('setTargetingForAst', function (e) {
              S.iS.isApntagDefined()
                ? (S.iS.setTargetingForAst(e), F.Ic(ae, S.iS.getAllTargeting()))
                : (0, i.logError)('window.apntag is not defined on the page');
            }),
            ve('renderAd', function (e, t, n) {
              (0, u.BS)(e, t, n);
            }),
            ve('removeAdUnit', function (e) {
              if (!e) return void (ie.adUnits = []);
              let t;
              ((t = (0, o.cy)(e) ? e : [e]),
                t.forEach((e) => {
                  for (let t = ie.adUnits.length - 1; t >= 0; t--) ie.adUnits[t].code === e && ie.adUnits.splice(t, 1);
                }));
            }));
          const Ie = (function () {
            function e(e, t) {
              return (
                null == t || Array.isArray(t) || (t = [t]),
                null == t || (Array.isArray(t) && 0 === t.length)
                  ? { included: e, excluded: [], adUnitCodes: e.map((e) => e.code).filter(i.uniques) }
                  : ((t = t.filter(i.uniques)),
                    Object.assign(
                      { adUnitCodes: t },
                      e.reduce(({ included: e, excluded: n }, r) => ((t.includes(r.code) ? e : n).push(r), { included: e, excluded: n }), {
                        included: [],
                        excluded: [],
                      }),
                    ))
              );
            }
            const t = (0, B.A_)(
              'async',
              function (t) {
                let {
                  bidsBackHandler: n,
                  timeout: r,
                  adUnits: s,
                  adUnitCodes: a,
                  labels: d,
                  auctionId: c,
                  ttlBuffer: u,
                  ortb2: l,
                  metrics: g,
                  defer: p,
                } = t ?? {};
                const m = r || C.$W.getConfig('bidderTimeout');
                ({ included: s, adUnitCodes: a } = e(s, a));
                let h = {
                  global: (0, i.mergeDeep)({}, C.$W.getAnyConfig('ortb2') || {}, l || {}),
                  bidder: Object.fromEntries(
                    Object.entries(C.$W.getBidderConfig())
                      .map(([e, t]) => [e, (0, o.Go)(t.ortb2)])
                      .filter(([e, t]) => null != t),
                  ),
                };
                ((h = X(h)),
                  (0, L.wU)(f.U9.resolve(h.global)).then(
                    (e) => (
                      (h.global = e),
                      Ce({
                        bidsBackHandler: n,
                        timeout: m,
                        adUnits: s,
                        adUnitCodes: a,
                        labels: d,
                        auctionId: c,
                        ttlBuffer: u,
                        ortb2Fragments: h,
                        metrics: g,
                        defer: p,
                      })
                    ),
                  ));
              },
              'requestBids',
            );
            return (0, B.Y6)(
              t,
              Ee(
                'requestBids',
                Y(
                  () => !C.$W.getConfig('allowPrerendering'),
                  function (n = {}) {
                    const r = n.adUnits || ie.adUnits;
                    n.adUnits = Array.isArray(r) ? r.slice() : [r];
                    const i = (0, G.K7)();
                    i.checkpoint('requestBids');
                    const { included: o, excluded: s, adUnitCodes: a } = e(r, n.adUnitCodes);
                    F.Ic(se, Object.assign(n, { adUnits: o, adUnitCodes: a }));
                    const d = Object.assign({}, n, {
                      adUnits: n.adUnits.slice().concat(s),
                      adUnitCodes: a,
                      metrics: i,
                      defer: (0, f.v6)({ promiseFactory: (e) => new Promise(e) }),
                    });
                    return (t.call(this, d), d.defer.promise);
                  },
                ),
              ),
            );
          })();
          ve('requestBids', Ie, !1);
          const Ce = (0, B.A_)(
            'async',
            function ({
              bidsBackHandler: e,
              timeout: t,
              adUnits: n,
              ttlBuffer: r,
              adUnitCodes: o,
              labels: s,
              auctionId: a,
              ortb2Fragments: d,
              metrics: c,
              defer: u,
            } = {}) {
              const l = (0, M.pX)(C.$W.getConfig('s2sConfig') || []);
              !(function (e) {
                (e.forEach((e) => (0, H.V0)(e)), e.forEach((e) => (0, te.kl)(e)));
              })(n);
              const f = (0, G.BO)(c).measureTime('requestBids.validate', () => ye(n));
              function g(t, n, r) {
                if ('function' == typeof e)
                  try {
                    e(t, n, r);
                  } catch (e) {
                    (0, i.logError)('Error executing bidsBackHandler', null, e);
                  }
                u.resolve({ bids: t, timedOut: n, auctionId: r });
              }
              const m = {};
              if (
                (f.forEach((e) => {
                  const t = Object.keys(e.mediaTypes || { banner: 'banner' }),
                    n = e.bids.map((e) => e.bidder).filter(Boolean),
                    o = M.Ay.bidderRegistry,
                    s = n.filter((e) => !l.has(e));
                  e.adUnitId = (0, i.generateUUID)();
                  const a = e.ortb2Imp?.ext?.tid;
                  (a &&
                    (m.hasOwnProperty(e.code)
                      ? (0, i.logWarn)(`Multiple distinct ortb2Imp.ext.tid were provided for twin ad units '${e.code}'`)
                      : (m[e.code] = a)),
                    null == r || e.hasOwnProperty('ttlBuffer') || (e.ttlBuffer = r),
                    s.forEach((n) => {
                      const r = o[n],
                        s = r && r.getSpec && r.getSpec(),
                        a = (s && s.supportedMediaTypes) || ['banner'];
                      t.some((e) => a.includes(e)) ||
                        ((0, i.logWarn)((0, i.unsupportedBidderMessage)(e, n)), (e.bids = e.bids.filter((e) => e.bidder !== n)));
                    }));
                }),
                f && 0 !== f.length)
              ) {
                f.forEach((e) => {
                  const t = e.ortb2Imp?.ext?.tid || m[e.code] || (0, i.generateUUID)();
                  (m.hasOwnProperty(e.code) || (m[e.code] = t), (e.transactionId = t));
                });
                const e = p.n.createAuction({
                    adUnits: f,
                    adUnitCodes: o,
                    callback: g,
                    cbTimeout: t,
                    labels: s,
                    auctionId: a,
                    ortb2Fragments: d,
                    metrics: c,
                  }),
                  n = f.length;
                (n > 15 && (0, i.logInfo)(`Current auction ${e.getAuctionId()} contains ${n} adUnits.`, f),
                  o.forEach((t) => S.iS.setLatestAuctionForAdUnit(t, e.getAuctionId())),
                  e.callBids());
              } else ((0, i.logMessage)('No adUnits configured. No bids requested.'), g());
            },
            'startAuction',
          );
          (Ie.before(function (e, t) {
            function n(e) {
              let t;
              for (; (t = e.shift()); ) t();
            }
            (n(P.s0), n(Be), e.call(this, t));
          }, 49),
            ve('addAdUnits', function (e) {
              ie.adUnits.push(...(Array.isArray(e) ? e : [e]));
            }));
          const Oe = {
            bidWon(e) {
              if (
                p.n
                  .getBidsRequested()
                  .map((e) => e.bids.map((e) => e.adUnitCode))
                  .reduce(i.flatten)
                  .filter(i.uniques)
                  .includes(e)
              )
                return !0;
              (0, i.logError)('The "' + e + '" placement is not defined.');
            },
          };
          function Se(e, t) {
            return Oe.hasOwnProperty(e) && Oe[e](t);
          }
          (ve('onEvent', function (e, t, n) {
            (0, o.fp)(t)
              ? !n || Se(e, n)
                ? F.on(e, t, n)
                : (0, i.logError)('The id provided is not valid for event "' + e + '" and no handler was set.')
              : (0, i.logError)('The event handler provided is not a function and was not set on event "' + e + '".');
          }),
            ve('offEvent', function (e, t, n) {
              (n && !Se(e, n)) || F.AU(e, t, n);
            }),
            ve('getEvents', function () {
              return F.kQ();
            }),
            ve('registerBidAdapter', function (e, t, n) {
              try {
                const r = n ? (0, K.xb)(n) : e();
                M.Ay.registerBidAdapter(r, t);
              } catch (e) {
                (0, i.logError)('Error registering bidder adapter : ' + e.message);
              }
            }),
            ve('registerAnalyticsAdapter', function (e) {
              try {
                M.Ay.registerAnalyticsAdapter(e);
              } catch (e) {
                (0, i.logError)('Error registering analytics adapter : ' + e.message);
              }
            }));
          const Be = [],
            Re = (0, B.A_)(
              'async',
              function (e) {
                e && !(0, i.isEmpty)(e)
                  ? M.Ay.enableAnalytics(e)
                  : (0, i.logError)(`${(0, _.k)()}.enableAnalytics should be called with option {}`);
              },
              'enableAnalyticsCb',
            );
          function ke(e) {
            if (e) {
              const t = p.n.getBidsReceived().filter((t) => t.adId === e);
              if (t.length) return t[0];
              (0, i.logWarn)(`Could not find ad matching adId '${e}'`);
            } else (0, i.logError)('adId is required');
            return null;
          }
          function Ue(e, t = !0) {
            (t ? (0, u.n6)(e) : p.n.addWinningBid(e), (0, u.qn)(e));
          }
          let De;
          function $e(e) {
            De.promise.then(() => {
              if ('function' == typeof e)
                try {
                  e.call();
                } catch (e) {
                  (0, i.logError)('Error processing command :', e.message, e.stack);
                }
              else (0, i.logError)(`Commands written into ${(0, _.k)()}.cmd.push must be wrapped in a function`);
            });
          }
          function _e(e, t) {
            (0, re.JE)(
              () => (0, r.m)().yield ?? !0,
              e.map(
                (e) => () =>
                  (function (e) {
                    if (void 0 === e.called)
                      try {
                        (e.call(), (e.called = !0));
                      } catch (e) {
                        (0, i.logError)('Error processing command :', 'prebid.js', e);
                      }
                  })(e),
              ),
              t,
            );
          }
          (ve('enableAnalytics', function (e) {
            Be.push(Re.bind(this, e));
          }),
            ve('aliasBidder', function (e, t, n) {
              e && t
                ? M.Ay.aliasBidAdapter(e, t, n)
                : (0, i.logError)('bidderCode and alias must be passed as arguments', `${(0, _.k)()}.aliasBidder`);
            }),
            (ie.aliasRegistry = M.Ay.aliasRegistry),
            C.$W.getConfig('aliasRegistry', (e) => {
              'private' === e.aliasRegistry && delete ie.aliasRegistry;
            }),
            ve('getAllWinningBids', function () {
              return p.n.getAllWinningBids();
            }),
            ve('getAllPrebidWinningBids', function () {
              return (
                (0, i.logWarn)(
                  'getAllPrebidWinningBids may be removed or renamed in a future version. This function returns bids that have won in prebid and have had targeting set but have not (yet?) won in the ad server. It excludes bids that have been rendered.',
                ),
                p.n.getBidsReceived().filter((e) => e.status === c.tl.BID_TARGETING_SET)
              );
            }),
            ve('getHighestCpmBids', function (e) {
              return S.iS.getWinningBids(e);
            }),
            ve('clearAllAuctions', function () {
              p.n.clearAllAuctions();
            }),
            ve('getBidResponseByAdId', function (e, t) {
              const n = ke(e);
              return (null != n && t?.markAsUsed && Ue(n, !0), n);
            }),
            ve('markWinningBidAsUsed', function ({ adId: e, adUnitCode: t, analytics: n = !1, events: r = !1 }) {
              let o;
              (t && null == e
                ? (o = S.iS.getWinningBids(t)[0])
                : e
                  ? (o = ke(e))
                  : (0, i.logWarn)('Improper use of markWinningBidAsUsed. It needs an adUnitCode or an adId to function.'),
                null != o && Ue(o, n || r));
            }),
            ve('getConfig', C.$W.getAnyConfig),
            ve('readConfig', C.$W.readAnyConfig),
            ve('mergeConfig', C.$W.mergeConfig),
            ve('mergeBidderConfig', C.$W.mergeBidderConfig),
            ve('setConfig', C.$W.setConfig),
            ve('setBidderConfig', C.$W.setBidderConfig),
            ie.que.push(() => w()),
            (De = (0, f.v6)()));
          (ve(
            'processQueue',
            Y(
              () => ie.delayPrerendering,
              async function () {
                ((ie.que.push = ie.cmd.push = $e),
                  (0, u.XO)(),
                  B.A_.ready(),
                  _e(ie.que, () => {
                    _e(ie.cmd, () => {
                      De.resolve();
                    });
                  }));
              },
            ),
            !1,
          ),
            ve('triggerBilling', function ({ adId: e, adUnitCode: t }) {
              p.n
                .getAllWinningBids()
                .filter((n) => n.adId === e || (null == e && n.adUnitCode === t))
                .forEach((e) => {
                  (M.Ay.triggerBilling(e), (0, u.vB)(e));
                });
            }),
            ve('refreshPageViewId', function () {
              for (const e of ie.pageViewIdPerBidder.keys()) ie.pageViewIdPerBidder.set(e, (0, i.generateUUID)());
            }));
        },
        8347(e, t, n) {
          n.d(t, { iS: () => O });
          var r = n(9015),
            i = n(5437),
            o = n(8384),
            s = n(5521),
            a = n(3399),
            d = n(1785),
            c = n(7413),
            u = n(8928),
            l = n(3350),
            f = n(6273),
            g = n(3721),
            p = n(2247),
            m = n(4983),
            h = n(7936),
            b = [];
          const y = 20,
            E = 'targetingControls.allowTargetingKeys',
            v = 'targetingControls.addTargetingKeys',
            w = `Only one of "${E}" or "${v}" can be set`,
            A = Object.keys(s.xS).map((e) => s.xS[e]),
            T = (0, d.A_)('sync', function (e, t, n = 0, r = !1, i = m.v) {
              if (!r) {
                const r = [],
                  s = o.$W.getConfig('sendBidsControl.dealPrioritization'),
                  a = (0, c.groupBy)(e, 'adUnitCode');
                return (
                  Object.keys(a).forEach((e) => {
                    let o = [];
                    const d = (0, c.groupBy)(a[e], 'bidderCode');
                    Object.keys(d).forEach((e) => {
                      o.push(d[e].reduce(t));
                    });
                    const u = 'object' == typeof n ? n[e] : n;
                    u ? ((o = s ? o.sort(I(!0)) : o.sort(i)), r.push(...o.slice(0, u))) : ((o = o.sort(i)), r.push(...o));
                  }),
                  r
                );
              }
              return e;
            });
          function I(e = !1) {
            return function (t, n) {
              return void 0 !== t.adserverTargeting.hb_deal && void 0 === n.adserverTargeting.hb_deal
                ? -1
                : void 0 === t.adserverTargeting.hb_deal && void 0 !== n.adserverTargeting.hb_deal
                  ? 1
                  : e
                    ? n.desirability && t.desirability
                      ? n.desirability - t.desirability
                      : n.cpm - t.cpm
                    : n.adserverTargeting.hb_pb - t.adserverTargeting.hb_pb;
            };
          }
          const C = '1.17.2';
          const O = (function (e) {
            const t = {},
              n = {
                setLatestAuctionForAdUnit(e, n) {
                  t[e] = n;
                },
                resetPresetTargetingAST(e) {
                  O(e).forEach(function (e) {
                    const t = window.apntag.getTag(e);
                    if (t && t.keywords) {
                      const n = Object.keys(t.keywords),
                        r = {};
                      (n.forEach((e) => {
                        b.includes(e.toLowerCase()) || (r[e] = t.keywords[e]);
                      }),
                        window.apntag.modifyTag(e, { keywords: r }));
                    }
                  });
                },
                getAllTargeting(t, n, a, d = f.qL, u = m.v) {
                  a ||= S(d, u);
                  const g = O(t),
                    p = (function (e, t) {
                      if (!o.$W.getConfig('enableSendAllBids')) return 0;
                      const n = o.$W.getConfig('sendBidsControl.bidLimit'),
                        i = new Set(e),
                        s = {};
                      for (const e of r.n.getAdUnits()) i.has(e.code) && (s[e.code] = e?.bidLimit || t || n);
                      return s;
                    })(g, n),
                    { customKeysByUnit: h, filteredBids: k } = (function (e, t) {
                      const n = [],
                        r = {},
                        s = o.$W.getConfig('targetingControls.alwaysIncludeDeals'),
                        a = o.$W.getConfig('bidTargetingExclusion'),
                        d = t.filter((t) => {
                          const n = e.includes(t.adUnitCode),
                            r = !0 === i.u.get(t.bidderCode, 'allowZeroCpmBids') ? t.cpm >= 0 : t.cpm > 0,
                            o = s && t.dealId;
                          return n && (o || r);
                        });
                      return (
                        d.forEach((e) => {
                          let t = !0;
                          if ('function' == typeof a)
                            try {
                              t = a(e, d);
                            } catch (n) {
                              ((0, c.logWarn)(`Error in bidTargetingExclusion function - excluding bid ${e.bidderCode} [${e.adUnitCode}]`),
                                (t = !1));
                            }
                          t &&
                            (n.push(e),
                            Object.keys(e.adserverTargeting)
                              .filter(
                                (function () {
                                  const e = R();
                                  return function (t) {
                                    return -1 === e.indexOf(t);
                                  };
                                })(),
                              )
                              .forEach((t) => {
                                const n = t.substring(0, 20),
                                  i = r[e.adUnitCode] || {},
                                  o = [e.adserverTargeting[t]];
                                (i[n] ? (i[n] = i[n].concat(o).filter(c.uniques)) : (i[n] = o), (r[e.adUnitCode] = i));
                              }));
                        }),
                        { filteredBids: n, customKeysByUnit: r }
                      );
                    })(g, a);
                  let U = (function (t, n, r) {
                    const i = !0 === o.$W.getConfig('targetingControls.allBidsCustomTargeting'),
                      a = B(t, r)
                        .concat(
                          (function (e) {
                            const t = o.$W.getConfig('targetingControls.alwaysIncludeDeals'),
                              n = o.$W.getConfig('enableSendAllBids');
                            return (function (e, t = !1, n = !1) {
                              const r = A.slice(),
                                i = o.$W.getConfig('targetingControls.allowSendAllBidsTargetingKeys'),
                                a = i ? i.map((e) => s.xS[e]) : r;
                              return e.reduce((e, i) => {
                                if (t || (n && i.dealId)) {
                                  const t = (function (e, t) {
                                    return t.reduce(
                                      (t, n) => (
                                        e.adserverTargeting[n] &&
                                          t.push({ [`${n}_${e.bidderCode}`.substring(0, y)]: [e.adserverTargeting[n]] }),
                                        t
                                      ),
                                      [],
                                    );
                                  })(
                                    i,
                                    r.filter((e) => void 0 !== i.adserverTargeting[e] && (n || -1 !== a.indexOf(e))),
                                  );
                                  t && e.push({ [i.adUnitCode]: t });
                                }
                                return e;
                              }, []);
                            })(e, n, t);
                          })(t),
                        )
                        .concat(
                          (function (t) {
                            function n(e) {
                              return e?.[s.iD.ADSERVER_TARGETING];
                            }
                            function r(e) {
                              const t = n(e);
                              return Object.keys(t).map(function (e) {
                                return (
                                  (0, l.O8)(t[e]) && (t[e] = t[e].split(',').map((e) => e.trim())),
                                  (0, l.cy)(t[e]) || (t[e] = [t[e]]),
                                  { [e]: t[e] }
                                );
                              });
                            }
                            return e
                              .getAdUnits()
                              .filter((e) => t.includes(e.code) && n(e))
                              .reduce((e, t) => {
                                const n = r(t);
                                return (n && e.push({ [t.code]: n }), e);
                              }, []);
                          })(r),
                        )
                        .concat(
                          (function (e) {
                            let t = o.$W.getConfig('targetingControls.version');
                            return !1 === t ? [] : e.map((e) => ({ [e]: [{ [s.xS.VERSION]: [t ?? C] }] }));
                          })(r),
                        );
                    i &&
                      a.push(
                        ...(function (e, t) {
                          return e.reduce((e, n) => {
                            const r = Object.assign({}, n),
                              i = t[r.adUnitCode],
                              o = [];
                            return (
                              i &&
                                Object.keys(i).forEach((e) => {
                                  e && i[e] && o.push({ [e]: i[e] });
                                }),
                              e.push({ [r.adUnitCode]: o }),
                              e
                            );
                          }, []);
                        })(t, n),
                      );
                    return (
                      a.forEach((e) => {
                        !(function (e) {
                          Object.keys(e).forEach((t) => {
                            e[t].forEach((e) => {
                              const t = Object.keys(e);
                              -1 === b.indexOf(t[0]) && (b = t.concat(b));
                            });
                          });
                        })(e);
                      }),
                      a
                    );
                  })(T(k, d, p, void 0, u), h, g);
                  const D = Object.keys(Object.assign({}, s.Zh));
                  let $ = o.$W.getConfig(E);
                  const _ = o.$W.getConfig(v);
                  if (null != _ && null != $) throw new Error(w);
                  (($ = null != _ ? D.concat(_) : $ || D),
                    Array.isArray($) &&
                      $.length > 0 &&
                      (U = (function (e, t) {
                        const n = Object.assign({}, s.xS),
                          r = Object.keys(s.xS),
                          i = {};
                        ((0, c.logInfo)(`allowTargetingKeys - allowed keys [ ${t.map((e) => n[e]).join(', ')} ]`),
                          e.forEach((e) => {
                            const o = Object.keys(e)[0],
                              s = e[o].filter((e) => {
                                const o = Object.keys(e)[0],
                                  s =
                                    0 === r.filter((e) => 0 === o.indexOf(n[e])).length ||
                                    t.find((e) => {
                                      const t = n[e];
                                      return 0 === o.indexOf(t);
                                    });
                                return ((i[o] = !s), s);
                              });
                            e[o] = s;
                          }));
                        const o = Object.keys(i).filter((e) => i[e]);
                        (0, c.logInfo)(`allowTargetingKeys - removed keys [ ${o.join(', ')} ]`);
                        const a = e.filter((e) => e[Object.keys(e)[0]].length > 0);
                        return a;
                      })(U, $)));
                  let q = (function (e) {
                    return e
                      .map((e) => ({
                        [Object.keys(e)[0]]: e[Object.keys(e)[0]]
                          .map((e) => ({ [Object.keys(e)[0]]: e[Object.keys(e)[0]].join(',') }))
                          .reduce((e, t) => Object.assign(t, e), {}),
                      }))
                      .reduce(function (e, t) {
                        var n = Object.keys(t)[0];
                        return ((e[n] = Object.assign({}, e[n], t[n])), e);
                      }, {});
                  })(U);
                  const x = o.$W.getConfig('targetingControls.auctionKeyMaxChars');
                  return (
                    x &&
                      ((0, c.logInfo)(
                        `Detected 'targetingControls.auctionKeyMaxChars' was active for this auction; set with a limit of ${x} characters.  Running checks on auction keys...`,
                      ),
                      (q = (function (e, t) {
                        const n = (0, l.Go)(e),
                          r = Object.keys(n)
                            .map((e) => ({ adUnitCode: e, adserverTargeting: n[e] }))
                            .sort(I());
                        return r.reduce(function (e, r, i, o) {
                          let s =
                            ((a = r.adserverTargeting),
                            Object.keys(a).reduce(function (e, t) {
                              return (e += `${t}%3d${encodeURIComponent(a[t])}%26`);
                            }, ''));
                          var a;
                          i + 1 === o.length && (s = s.slice(0, -3));
                          const d = r.adUnitCode,
                            u = s.length;
                          return (
                            u <= t
                              ? ((t -= u),
                                (0, c.logInfo)(
                                  `AdUnit '${d}' auction keys comprised of ${u} characters.  Deducted from running threshold; new limit is ${t}`,
                                  n[d],
                                ),
                                (e[d] = n[d]))
                              : (0, c.logWarn)(
                                  `The following keys for adUnitCode '${d}' exceeded the current limit of the 'auctionKeyMaxChars' setting.\nThe key-set size was ${u}, the current allotted amount was ${t}.\n`,
                                  n[d],
                                ),
                            i + 1 === o.length &&
                              0 === Object.keys(e).length &&
                              (0, c.logError)(
                                'No auction targeting keys were permitted due to the setting in setConfig(targetingControls.auctionKeyMaxChars).  Please review setup and consider adjusting.',
                              ),
                            e
                          );
                        }, {});
                      })(q, x))),
                    g.forEach((e) => {
                      (q[e] || (q[e] = {}), 1 === Object.keys(q[e]).length && null != q[e][s.xS.VERSION] && delete q[e][s.xS.VERSION]);
                    }),
                    q
                  );
                },
                updateGPTTargeting(e, t, n) {
                  const r = Object.fromEntries(b.map((e) => [e, null]));
                  Object.entries(
                    (function (e, t = () => window.googletag.pubads().getSlots()) {
                      return t().reduce(
                        (e, t) => (
                          Object.keys(e)
                            .filter((0, c.isAdUnitCodeMatchingSlot)(t))
                            .forEach((n) => e[n].push(t)),
                          e
                        ),
                        Object.fromEntries(e.map((e) => [e, []])),
                      );
                    })(Object.keys(e)),
                  ).forEach(([i, o]) => {
                    o.forEach((o) => {
                      (Object.keys(e[i]).forEach((t) => {
                        let n = e[i][t];
                        ('string' == typeof n && -1 !== n.indexOf(',') && (n = n.split(',')), (e[i][t] = n));
                      }),
                        (0, c.logMessage)(`Attempting to ${t} targeting-map for slot: ${o.getSlotElementId()} with targeting-map:`, e[i]),
                        (0, h.ns)(o, Object.assign({}, r, e[i])),
                        null != n && n(e[i]));
                    });
                  });
                },
                presetGPTTargeting(e) {
                  !1 !== o.$W.getConfig('targetingControls.presetGPTTargeting') &&
                    (0, c.isGptPubadsDefined)() &&
                    n.updateGPTTargeting(n.getAllTargeting(e, 0, []), 'pre-set');
                },
                setTargetingForGPT: (0, d.A_)(
                  'sync',
                  function (t) {
                    const r = n.getAllTargeting(t);
                    (n.updateGPTTargeting(r, 'set', (e) => g.s.lock(e)),
                      Object.keys(r).forEach((t) => {
                        Object.keys(r[t]).forEach((n) => {
                          n === s.xS.AD_ID && e.setStatusForBids(r[t][n], s.tl.BID_TARGETING_SET);
                        });
                      }),
                      n.targetingDone(r),
                      a.Ic(s.qY.SET_TARGETING, r));
                  },
                  'setTargetingForGPT',
                ),
                targetingDone: (0, d.A_)(
                  'sync',
                  function (e) {
                    return e;
                  },
                  'targetingDone',
                ),
                getWinningBids(e, t, n = f.Vk, r = m.v) {
                  const o = t || S(n, r),
                    s = O(e);
                  return o
                    .filter((e) => s.includes(e.adUnitCode))
                    .filter((e) => (!0 === i.u.get(e.bidderCode, 'allowZeroCpmBids') ? e.cpm >= 0 : e.cpm > 0))
                    .map((e) => e.adUnitCode)
                    .filter(c.uniques)
                    .map((e) => o.filter((t) => (t.adUnitCode === e ? t : null)).reduce(f.Vk));
                },
                setTargetingForAst(e) {
                  const t = n.getAllTargeting(e);
                  try {
                    n.resetPresetTargetingAST(e);
                  } catch (e) {
                    (0, c.logError)('unable to reset targeting for AST' + e);
                  }
                  Object.keys(t).forEach((e) => {
                    (g.s.lock(t[e]),
                      Object.keys(t[e]).forEach((n) => {
                        if (
                          ((0, c.logMessage)(`Attempting to set targeting for targetId: ${e} key: ${n} value: ${t[e][n]}`),
                          (0, l.O8)(t[e][n]) || (0, l.cy)(t[e][n]))
                        ) {
                          const r = {},
                            i = /pt[0-9]/;
                          (n.search(i) < 0 ? (r[n.toUpperCase()] = t[e][n]) : (r[n] = t[e][n]),
                            window.apntag.setKeywords(e, r, { overrideKeyValue: !0 }));
                        }
                      }));
                  });
                },
                isApntagDefined() {
                  if (window.apntag && (0, l.fp)(window.apntag.setKeywords)) return !0;
                },
              };
            function O(t) {
              return 'string' == typeof t ? [t] : (0, l.cy)(t) ? t : e.getAdUnitCodes() || [];
            }
            function S(n = f.Bq, r = void 0) {
              const i = e.getBidsReceived().reduce((e, n) => {
                const r = o.$W.getConfig('useBidCache'),
                  i = o.$W.getConfig('bidCacheFilterFunction'),
                  s = t[n.adUnitCode] === n.auctionId,
                  a = !(r && !s && 'function' == typeof i) || !!i(n);
                return ((r || s) && a && (0, p.Y)(n) && ((n.latestTargetedAuctionId = t[n.adUnitCode]), e.push(n)), e);
              }, []);
              return T(i, n, void 0, void 0, r);
            }
            function B(e, t) {
              const r = n.getWinningBids(t, e),
                i = R();
              return r.map((e) => ({
                [e.adUnitCode]: Object.keys(e.adserverTargeting)
                  .filter((t) => void 0 === e.sendStandardTargeting || e.sendStandardTargeting || -1 === i.indexOf(t))
                  .reduce((t, n) => {
                    const r = [e.adserverTargeting[n]],
                      i = { [n.substring(0, y)]: r };
                    if (n === s.xS.DEAL) {
                      const o = `${n}_${e.bidderCode}`.substring(0, y),
                        s = { [o]: r };
                      return [...t, i, s];
                    }
                    return [...t, i];
                  }, []),
              }));
            }
            function R() {
              return e
                .getStandardBidderAdServerTargeting()
                .map((e) => e.key)
                .concat(A)
                .filter(c.uniques);
            }
            return (
              a.on(s.qY.AUCTION_INIT, ({ adUnitCodes: e }) => {
                n.presetGPTTargeting(e);
              }),
              o.$W.getConfig('targetingControls', function (e) {
                null != (0, u.A)(e, E) && null != (0, u.A)(e, v) && (0, c.logError)(w);
              }),
              n
            );
          })(r.n);
        },
        8378(e, t, n) {
          n.d(t, { Vv: () => d, Ot: () => s, Bp: () => a });
          var r = n(7413);
          const i = new (function e(t, n) {
              const r = {};
              let i = {};
              const o = [];
              (Object.entries(n).forEach(([n, s]) => {
                if (null != s && 'object' == typeof s) {
                  const i = new e(() => t()?.[n], s);
                  ((r[n] = i.obj), o.push(i.reset));
                } else !0 === s && Object.defineProperty(r, n, { get: () => (i.hasOwnProperty(n) || (i[n] = t()?.[n]), i[n]) });
              }),
                (this.obj = r),
                (this.reset = function () {
                  (o.forEach((e) => e()), (i = {}));
                }));
            })(() => ((0, r.canAccessWindowTop)() ? r.internal.getWindowTop() : r.internal.getWindowSelf()), {
              innerHeight: !0,
              innerWidth: !0,
              screen: { width: !0, height: !0 },
              visualViewport: { width: !0, height: !0 },
              document: {
                documentElement: { clientWidth: !0, clientHeight: !0, scrollTop: !0, scrollLeft: !0 },
                body: { scrollTop: !0, scrollLeft: !0, clientWidth: !0, clientHeight: !0 },
              },
            }),
            o = { winDimensions: i },
            s = (() => {
              let e;
              return function () {
                return ((!e || Date.now() - e > 20) && (o.winDimensions.reset(), (e = Date.now())), o.winDimensions.obj);
              };
            })();
          function a() {
            o.winDimensions.reset();
          }
          function d(e) {
            const t = e ?? ((0, r.canAccessWindowTop)() ? r.internal.getWindowTop() : r.internal.getWindowSelf()),
              n = t?.screen ?? r.internal.getWindowSelf()?.screen ?? window?.screen,
              i = Number(n?.width),
              o = Number(n?.height);
            if (Number.isFinite(i) && Number.isFinite(o)) return o >= i ? 'portrait' : 'landscape';
          }
        },
        8384(e, t, n) {
          n.d(t, { $W: () => m, Ov: () => u });
          var r = n(6969),
            i = n(7413),
            o = n(8928),
            s = n(3350),
            a = n(5521);
          const d = 'TRUE' === (0, i.getParameterByName)(a.M).toUpperCase(),
            c = {},
            u = 'random',
            l = {};
          ((l[u] = !0), (l.fixed = !0));
          const f = u,
            g = { LOW: 'low', MEDIUM: 'medium', HIGH: 'high', AUTO: 'auto', DENSE: 'dense', CUSTOM: 'custom' };
          function p(e, t = !0) {
            const n = t
                ? {
                    priceGranularity: g.MEDIUM,
                    customPriceBucket: {},
                    mediaTypePriceGranularity: {},
                    bidderSequence: f,
                    auctionOptions: {},
                  }
                : {},
              o = (() => {
                const e = [
                    'suppressStaleRender',
                    'suppressExpiredRender',
                    'legacyRender',
                    'rejectUnknownMediaTypes',
                    'rejectInvalidMediaTypes',
                  ],
                  t = ['secondaryBidders'],
                  n = [].concat(e).concat(t);
                return function (r) {
                  if (!(0, s.Qd)(r)) return ((0, i.logWarn)('Auction Options must be an object'), !1);
                  for (const o of Object.keys(r)) {
                    if (!n.includes(o)) return ((0, i.logWarn)(`Auction Options given an incorrect param: ${o}`), !1);
                    if (t.includes(o)) {
                      if (!(0, s.cy)(r[o])) return ((0, i.logWarn)(`Auction Options ${o} must be of type Array`), !1);
                      if (!r[o].every(s.O8)) return ((0, i.logWarn)(`Auction Options ${o} must be only string`), !1);
                    } else if (e.includes(o) && !(0, s.Lm)(r[o]))
                      return ((0, i.logWarn)(`Auction Options ${o} must be of type boolean`), !1);
                  }
                  return !0;
                };
              })();
            function a(e) {
              return n[e];
            }
            function d(t, r) {
              (n.hasOwnProperty(t) || Object.defineProperty(e, t, { enumerable: !0 }), (n[t] = r));
            }
            const c = {
              publisherDomain: {
                set(e) {
                  (null != e && (0, i.logWarn)('publisherDomain is deprecated and has no effect since v7 - use pageUrl instead'),
                    d('publisherDomain', e));
                },
              },
              priceGranularity: {
                set(e) {
                  p(e) &&
                    ('string' == typeof e
                      ? d('priceGranularity', u(e) ? e : g.MEDIUM)
                      : (0, s.Qd)(e) &&
                        (d('customPriceBucket', e), d('priceGranularity', g.CUSTOM), (0, i.logMessage)('Using custom price granularity')));
                },
              },
              customPriceBucket: {},
              mediaTypePriceGranularity: {
                set(e) {
                  null != e &&
                    d(
                      'mediaTypePriceGranularity',
                      Object.keys(e).reduce(
                        (t, n) => (
                          p(e[n])
                            ? 'string' == typeof e[n]
                              ? (t[n] = u(e[n]) ? e[n] : a('priceGranularity'))
                              : (0, s.Qd)(e[n]) && ((t[n] = e[n]), (0, i.logMessage)(`Using custom price granularity for ${n}`))
                            : (0, i.logWarn)(`Invalid price granularity for media type: ${n}`),
                          t
                        ),
                        {},
                      ),
                    );
                },
              },
              bidderSequence: {
                set(e) {
                  l[e] ? d('bidderSequence', e) : (0, i.logWarn)(`Invalid order: ${e}. Bidder Sequence was not set.`);
                },
              },
              auctionOptions: {
                set(e) {
                  o(e) && d('auctionOptions', e);
                },
              },
            };
            return (
              Object.defineProperties(
                e,
                Object.fromEntries(
                  Object.entries(c).map(([e, t]) => [
                    e,
                    Object.assign(
                      { get: a.bind(null, e), set: d.bind(null, e), enumerable: n.hasOwnProperty(e), configurable: !n.hasOwnProperty(e) },
                      t,
                    ),
                  ]),
                ),
              ),
              e
            );
            function u(e) {
              return Object.keys(g).find((t) => e === g[t]);
            }
            function p(e) {
              if (!e) return ((0, i.logError)('Prebid Error: no value passed to `setPriceGranularity()`'), !1);
              if ('string' == typeof e)
                u(e) || (0, i.logWarn)('Prebid Warning: setPriceGranularity was called with invalid setting, using `medium` as default.');
              else if ((0, s.Qd)(e) && !(0, r.q)(e))
                return ((0, i.logError)('Invalid custom price value passed to `setPriceGranularity()`'), !1);
              return !0;
            }
          }
          const m = (function () {
            const e = [];
            let t,
              n,
              r,
              a = null;
            function u() {
              t = {};
              const e = p({
                debug: d,
                bidderTimeout: 3e3,
                enableSendAllBids: true,
                useBidCache: false,
                deviceAccess: true,
                disableAjaxTimeout: false,
                maxNestedIframes: 10,
                maxBid: 5e3,
                userSync: { topics: c },
              });
              (n && E(Object.keys(n).reduce((t, r) => (n[r] !== e[r] && (t[r] = e[r] || {}), t), {})), (n = e), (r = {}));
            }
            function l() {
              if (a && r && (0, s.Qd)(r[a])) {
                const e = r[a],
                  t = new Set([...Object.keys(n), ...Object.keys(e)]),
                  o = {};
                for (const r of t) {
                  const t = n[r],
                    a = e[r];
                  o[r] = void 0 === a ? t : void 0 === t ? a : (0, s.Qd)(a) ? (0, i.mergeDeep)({}, t, a) : a;
                }
                return o;
              }
              return { ...n };
            }
            const [f, g] = [
                l,
                function () {
                  const e = l();
                  return (
                    Object.defineProperty(e, 'ortb2', {
                      get: function () {
                        throw new Error("invalid access to 'orbt2' config - use request parameters instead");
                      },
                    }),
                    e
                  );
                },
              ].map(
                (e) =>
                  function (...t) {
                    if (t.length <= 1 && 'function' != typeof t[0]) {
                      const n = t[0];
                      return n ? (0, o.A)(e(), n) : l();
                    }
                    return y(...t);
                  },
              ),
              [m, h] = [g, f].map(
                (e) =>
                  function (...t) {
                    let n = e(...t);
                    return (n && 'object' == typeof n && (n = (0, s.Go)(n)), n);
                  },
              );
            function b(e) {
              if (!(0, s.Qd)(e)) return void (0, i.logError)('setConfig options must be an object');
              const r = Object.keys(e),
                o = {};
              (r.forEach((r) => {
                let a = e[r];
                (0, s.Qd)(t[r]) && (0, s.Qd)(a) && (a = Object.assign({}, t[r], a));
                try {
                  o[r] = n[r] = a;
                } catch (e) {
                  (0, i.logWarn)(`Cannot set config for property ${r} : `, e);
                }
              }),
                E(o));
            }
            function y(t, n, r = {}) {
              let o = n;
              if (('string' != typeof t && ((o = t), (t = '*'), (r = n || {})), 'function' != typeof o))
                return void (0, i.logError)('listener must be a function');
              const s = { topic: t, callback: o };
              return (
                e.push(s),
                r.init && o('*' === t ? g() : { [t]: g(t) }),
                function () {
                  e.splice(e.indexOf(s), 1);
                }
              );
            }
            function E(t) {
              const n = Object.keys(t);
              (e
                .filter((e) => n.includes(e.topic))
                .forEach((e) => {
                  e.callback({ [e.topic]: t[e.topic] });
                }),
                e.filter((e) => '*' === e.topic).forEach((e) => e.callback(t)));
            }
            function v(e, t = !1) {
              try {
                (!(function (e) {
                  if (!(0, s.Qd)(e)) throw new Error('setBidderConfig bidder options must be an object');
                  if (!Array.isArray(e.bidders) || !e.bidders.length)
                    throw new Error('setBidderConfig bidder options must contain a bidders list with at least 1 bidder');
                  if (!(0, s.Qd)(e.config)) throw new Error('setBidderConfig bidder options must contain a config object');
                })(e),
                  e.bidders.forEach((n) => {
                    (r[n] || (r[n] = p({}, !1)),
                      Object.keys(e.config).forEach((o) => {
                        const a = e.config[o],
                          d = r[n][o];
                        if ((0, s.Qd)(a) && (null == d || (0, s.Qd)(d))) {
                          const e = t ? i.mergeDeep : Object.assign;
                          r[n][o] = e({}, d || {}, a);
                        } else r[n][o] = a;
                      }));
                  }));
              } catch (e) {
                (0, i.logError)(e);
              }
            }
            function w(e, t) {
              a = e;
              try {
                return t();
              } finally {
                A();
              }
            }
            function A() {
              a = null;
            }
            return (
              u(),
              {
                getCurrentBidder: function () {
                  return a;
                },
                resetBidder: A,
                getConfig: g,
                getAnyConfig: f,
                readConfig: m,
                readAnyConfig: h,
                setConfig: b,
                mergeConfig: function (e) {
                  if (!(0, s.Qd)(e)) return void (0, i.logError)('mergeConfig input must be an object');
                  const t = (0, i.mergeDeep)(l(), e);
                  return (b(Object.keys(e).reduce((e, n) => (Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]), e), {})), t);
                },
                setDefaults: function (e) {
                  (0, s.Qd)(t) ? (Object.assign(t, e), Object.assign(n, e)) : (0, i.logError)('defaults must be an object');
                },
                resetConfig: u,
                runWithBidder: w,
                callbackWithBidder: function (e) {
                  return function (t) {
                    return function (...n) {
                      if ('function' == typeof t) return w(e, t.bind(this, ...n));
                      (0, i.logWarn)('config.callbackWithBidder callback is not a function');
                    };
                  };
                },
                setBidderConfig: v,
                getBidderConfig: function () {
                  return r;
                },
                mergeBidderConfig: function (e) {
                  return v(e, !0);
                },
              }
            );
          })();
        },
        8465(e, t, n) {
          n.d(t, { U: () => s });
          var r = n(1129),
            i = n(7413);
          const o = (0, r.m)();
          function s(e, t) {
            ((o.adServers = o.adServers || {}),
              (o.adServers[e] = o.adServers[e] || {}),
              Object.keys(t).forEach((n) => {
                o.adServers[e][n]
                  ? (0, i.logWarn)(`Attempting to add an already registered function property ${n} for AdServer ${e}.`)
                  : (o.adServers[e][n] = t[n]);
              }));
          }
        },
        8468(e, t, n) {
          n.d(t, { R: () => c });
          var r = n(323),
            i = n(5881),
            o = n(4283),
            s = n(7413);
          const a = new WeakMap();
          function d(e, t, n) {
            return t && n && e
              ? !!(0, o.io)(r.jP, (0, i.s)(t, n))
              : ((0, s.logError)('cannot load external script without url, moduleType, or moduleCode'), !1);
          }
          function c(e, t, n, r, i, o) {
            if (!d(e, t, n)) return;
            const c = 'function' == typeof r || 'function' == typeof r?.success || 'function' == typeof r?.error;
            function u(e, t) {
              null == t ? ('function' == typeof e ? e() : e.success?.()) : e.error?.(t);
            }
            i || (i = document);
            const l = p(i, e);
            if (l) return (c && (l.loaded ? u(r, l.error) : l.callbacks.push(r)), l.tag);
            const f = a.get(i) || {},
              g = { error: null, loaded: !1, tag: null, callbacks: [] };
            return (
              (f[e] = g),
              a.set(i, f),
              c && g.callbacks.push(r),
              (0, s.logWarn)(`module ${n} is loading external JavaScript`),
              (function (t, n, r, i) {
                r || (r = document);
                var o = r.createElement('script');
                ((o.type = 'text/javascript'), (o.async = !0));
                const a = p(r, e);
                a && (a.tag = o);
                function d(e) {
                  ((a.error = e), c());
                }
                function c() {
                  (o.removeEventListener('error', d), (o.onload = null), (o.onreadystatechange = null), n());
                }
                (o.addEventListener('error', d),
                  o.readyState
                    ? (o.onreadystatechange = function () {
                        ('loaded' !== o.readyState && 'complete' !== o.readyState) || ((o.onreadystatechange = null), c());
                      })
                    : (o.onload = function () {
                        c();
                      }));
                ((o.src = t), i && (0, s.setScriptAttributes)(o, i));
                return ((0, s.insertElement)(o, r), o);
              })(
                e,
                function () {
                  g.loaded = !0;
                  try {
                    for (let e = 0; e < g.callbacks.length; e++) u(g.callbacks[e], g.error);
                    g.callbacks.length = 0;
                  } catch (e) {
                    (0, s.logError)('Error executing callback', 'adloader.js:loadExternalScript', e);
                  }
                },
                i,
                o,
              )
            );
            function p(e, t) {
              const n = a.get(e);
              return n && n[t] ? n[t] : null;
            }
          }
          const u = (0, s.memoize)(function (e) {
            return new Promise((t, n) => {
              const r = document.createElement('link');
              ((r.rel = 'preload'), (r.as = 'script'), (r.href = e), (r.onload = () => t()), (r.onerror = n), (0, s.insertElement)(r));
            });
          });
          u.clear;
        },
        8497(e, t, n) {
          n.d(t, { HN: () => V, NE: () => q, UZ: () => k, mX: () => x, v8: () => M });
          var r = n(7413),
            i = n(3350),
            o = n(6969),
            s = n(5657),
            a = n(5725),
            d = n(6901),
            c = n(8384),
            u = n(3838),
            l = n(1785),
            f = n(1779),
            g = n(9015),
            p = n(5437),
            m = n(3399),
            h = n(4794),
            b = n(5521),
            y = n(8203),
            E = n(2822),
            v = n(9200),
            w = n(1129),
            A = n(7834),
            T = n(5423),
            I = n(4283),
            C = n(323),
            O = n(7449),
            S = n(6540),
            B = n(4983);
          const { syncUsers: R } = u.zt,
            k = 'completed';
          m.on(b.qY.BID_ADJUSTMENT, function (e) {
            !(function (e) {
              const t = g.n.index.getBidRequest(e),
                n = (0, v.y)(e.cpm, e, t);
              n >= 0 && (e.cpm = n);
              const r = (0, B.j)(e, t);
              e.desirability = r;
            })(e);
          });
          const U = {},
            D = {},
            $ = [],
            _ = (0, w.m)();
          const q = (0, l.A_)('sync', (e) => {});
          function x({ adUnits: e, adUnitCodes: t, callback: n, cbTimeout: i, labels: u, auctionId: l, ortb2Fragments: p, metrics: v }) {
            v = (0, E.BO)(v);
            const w = e,
              I = u,
              C = t,
              O = l || (0, r.generateUUID)(),
              S = i,
              B = new Set(),
              x = (0, y.v6)(),
              L = (0, y.v6)();
            let z = [],
              V = n,
              H = [];
            const J = (0, A.H)({
              startTime: (e) => e.responseTimestamp,
              ttl: (e) => {
                const t = (0, T.X9)(e);
                return null == t ? null : 1e3 * Math.max(t, e.ttl);
              },
            });
            let Y,
              K,
              X,
              Z,
              ee = [],
              te = [],
              ne = [];
            function re() {
              return {
                auctionId: O,
                timestamp: Y,
                auctionEnd: K,
                auctionStatus: Z,
                adUnits: w,
                adUnitCodes: C,
                labels: I,
                bidderRequests: H,
                noBids: ee,
                bidsReceived: J.toArray(),
                bidsRejected: z,
                winningBids: te,
                timeout: S,
                metrics: v,
                seatNonBids: ne,
              };
            }
            function ie(t) {
              if ((t ? m.Ic(b.qY.AUCTION_TIMEOUT, re()) : clearTimeout(X), void 0 === K)) {
                let n = [];
                (t &&
                  ((0, r.logMessage)(`Auction ${O} timedOut`),
                  (n = H.filter((e) => !B.has(e.bidderRequestId)).flatMap((e) => e.bids)),
                  n.length && m.Ic(b.qY.BID_TIMEOUT, n)),
                  (Z = k),
                  (K = Date.now()),
                  v.checkpoint('auctionEnd'),
                  v.timeBetween('requestBids', 'auctionEnd', 'requestBids.total'),
                  v.timeBetween('callBids', 'auctionEnd', 'requestBids.callBids'),
                  x.resolve(),
                  m.Ic(b.qY.AUCTION_END, re()),
                  P(w, l, function () {
                    try {
                      if (null != V) {
                        const e = J.toArray()
                          .filter((e) => C.includes(e.adUnitCode))
                          .reduce(Q, {});
                        (V.apply(_, [e, t, O]), (V = null));
                      }
                    } catch (e) {
                      (0, r.logError)('Error executing bidsBackHandler', null, e);
                    } finally {
                      n.length && h.Ay.callTimedOutBidders(e, n, S);
                      const t = c.$W.getConfig('userSync') ?? {};
                      t.enableOverride || R(t.syncDelay);
                    }
                  }));
              }
            }
            function oe() {
              (c.$W.resetBidder(), (0, r.logInfo)(`Bids Received for Auction with id: ${O}`, J.toArray()), (Z = k), ie(!1));
            }
            function se(e) {
              B.add(e);
            }
            function ae(e) {
              e.forEach((e) => {
                var t;
                ((t = e), (H = H.concat(t)));
              });
              const t = {},
                n = {
                  bidRequests: e,
                  run: () => {
                    (q(this), (X = setTimeout(() => ie(!0), S)), (Z = 'inProgress'), m.Ic(b.qY.AUCTION_INIT, re()));
                    const n = (function (e, t, { index: n = g.n.index } = {}) {
                      let i = 0,
                        u = !1;
                      const l = new Set(),
                        p = {};
                      function h() {
                        (i--, u && 0 === i && e());
                      }
                      function E(e, t, n) {
                        return (
                          (p[t.requestId] = !0),
                          (function (e, t, { index: n = g.n.index } = {}) {
                            const r = n.getAdUnit(e);
                            (F(e, { index: n }),
                              Object.assign(e, { cpm: parseFloat(e.cpm) || 0, bidder: e.bidder || e.bidderCode, adUnitCode: t }),
                              null != r?.ttlBuffer && (e.ttlBuffer = r.ttlBuffer));
                          })(t, e),
                          i++,
                          n(h)
                        );
                      }
                      function v(e, r) {
                        E(e, r, (e) => {
                          const i = (function (e, { index: t = g.n.index } = {}) {
                            m.Ic(b.qY.BID_ADJUSTMENT, e);
                            const n = t.getAdUnit(e);
                            ((e.instl = 1 === n?.ortb2Imp?.instl), (e.element = n?.element));
                            const r = t.getBidRequest(e),
                              i = r?.renderer || n?.renderer,
                              s = r?.safeRenderer || n?.safeRenderer,
                              a = e.mediaType,
                              u = t.getMediaTypes(e),
                              l = u && u[a],
                              f = l && l.renderer,
                              p = l && l.safeRenderer;
                            let h = null;
                            !f || !f.render || (!0 === f.backupOnly && e.renderer)
                              ? !i || !i.render || (!0 === i.backupOnly && e.renderer) || (h = i)
                              : (h = f);
                            let y = null;
                            !p || !p?.url || (!0 === f?.backupOnly && e.safeRenderer)
                              ? !s || !s?.url || (!0 === f?.backupOnly && e.safeRenderer) || (y = s)
                              : (y = p);
                            null != y && (e.safeRenderer = y);
                            (c.$W.getConfig('allowTopWindowRenderers') ?? 1)
                              ? h &&
                                ((e.renderer = d.A4.install({ url: h.url, config: h.options, renderNow: null == h.url })),
                                e.renderer.setRender(h.render))
                              : (e.renderer = null);
                            const E = G(e.mediaType, u, c.$W.getConfig('mediaTypePriceGranularity')),
                              v = (0, o.j)(
                                e.cpm,
                                'object' == typeof E ? E : c.$W.getConfig('customPriceBucket'),
                                c.$W.getConfig('currency.granularityMultiplier'),
                              );
                            return (
                              (e.pbLg = v.low),
                              (e.pbMg = v.med),
                              (e.pbHg = v.high),
                              (e.pbAg = v.auto),
                              (e.pbDg = v.dense),
                              (e.pbCg = v.custom),
                              e
                            );
                          })(r);
                          (m.Ic(b.qY.BID_ACCEPTED, i),
                            i.mediaType === f.G_ || i.mediaType === f.FY
                              ? (function (e, t, n, { index: r = g.n.index } = {}) {
                                  const i = r.getMediaTypes({ requestId: t.originalRequestId || t.requestId, adUnitId: t.adUnitId })?.video;
                                  (0, a.Ei)({ bidResponse: t, auctionInstance: e, afterBidAdded: n, videoMediaType: i });
                                })(t, i, e)
                              : ((0, s.l6)(i) && (0, s.gs)(i, n.getAdUnit(i)), M(t, i), e()));
                        });
                      }
                      function w(e, n, i) {
                        return E(e, n, (e) => {
                          ((n.rejectionReason = i),
                            (0, r.logWarn)(`Bid from ${n.bidder || 'unknown bidder'} was rejected: ${i}`, n),
                            m.Ic(b.qY.BID_REJECTED, n),
                            t.addBidRejected(n),
                            e());
                        });
                      }
                      function A() {
                        const n = this;
                        let o = t.getBidRequests();
                        const s = c.$W.getConfig('auctionOptions');
                        if ((l.add(n), s && !(0, r.isEmpty)(s))) {
                          const e = s.secondaryBidders;
                          e && !o.every((t) => e.includes(t.bidderCode)) && (o = o.filter((t) => !e.includes(t.bidderCode)));
                        }
                        ((u = o.every((e) => l.has(e))),
                          n.bids.forEach((e) => {
                            p[e.bidId] || (F(e), t.addNoBid(e), m.Ic(b.qY.NO_BID, e));
                          }),
                          u && 0 === i && e());
                      }
                      return {
                        addBidResponse: (function () {
                          function e(e, t) {
                            j.call(
                              { dispatch: v },
                              e,
                              t,
                              (() => {
                                let n = !1;
                                return (r) => {
                                  n || (w(e, t, r), (n = !0));
                                };
                              })(),
                            );
                          }
                          return ((e.reject = w), e);
                        })(),
                        adapterDone: function () {
                          W(y.U9.resolve()).finally(() => A.call(this));
                        },
                      };
                    })(oe, this);
                    (h.Ay.callBids(
                      w,
                      e,
                      n.addBidResponse,
                      n.adapterDone,
                      {
                        request(e, n) {
                          (u(U, n), u(t, e), D[e] || (D[e] = { SRA: !0, origin: n }), t[e] > 1 && (D[e].SRA = !1));
                        },
                        done(e) {
                          (U[e]--, $[0] && i($[0]) && $.shift());
                        },
                      },
                      S,
                      se,
                      p,
                    ),
                      L.resolve());
                  },
                };
              function i(e) {
                let t = !0;
                const n = c.$W.getConfig('maxRequestsPerOrigin') || 4;
                return (
                  e.bidRequests.some((e) => {
                    let r = 1;
                    const i = void 0 !== e.src && e.src === b.RW.SRC ? 's2s' : e.bidderCode;
                    return (
                      !(e.alwaysHasCapacity && !c.$W.getConfig('forceMaxRequestsPerOrigin')) &&
                      (D[i] && (!1 === D[i].SRA && (r = Math.min(e.bids.length, n)), U[D[i].origin] + r > n && (t = !1)), !t)
                    );
                  }),
                  t && e.run(),
                  t
                );
              }
              function u(e, t) {
                void 0 === e[t] ? (e[t] = 1) : e[t]++;
              }
              i(n) || ((0, r.logWarn)('queueing auction due to limited endpoint capacity'), $.push(n));
            }
            return (
              (0, T.lc)(() => J.refresh()),
              m.on(b.qY.PBS_ANALYTICS, (e) => {
                var t;
                e.auctionId === O && null != e.seatnonbid && ((t = e.seatnonbid), (ne = ne.concat(t)));
              }),
              {
                addBidReceived: function (e) {
                  J.add(e);
                },
                addBidRejected: function (e) {
                  z = z.concat(e);
                },
                addNoBid: function (e) {
                  ee = ee.concat(e);
                },
                callBids: function () {
                  ((Z = 'started'), (Y = Date.now()));
                  const e = v.measureTime('requestBids.makeRequests', () => h.Ay.makeBidRequests(w, Y, O, S, I, p, v));
                  ((0, r.logInfo)(`Bids Requested for Auction with id: ${O}`, e),
                    v.checkpoint('callBids'),
                    e.length < 1
                      ? ((0, r.logWarn)('No valid bid requests returned for auction'), oe())
                      : N.call({ dispatch: ae, context: this }, e));
                },
                addWinningBid: function (t) {
                  ((te = te.concat(t)), h.Ay.callBidWonBidder(t.adapterCode || t.bidder, t, e), t.deferBilling || h.Ay.triggerBilling(t));
                },
                setBidTargeting: function (e) {
                  (h.Ay.callSetTargetingBidder(e.adapterCode || e.bidder, e), J.refresh());
                },
                getWinningBids: () => te,
                getAuctionStart: () => Y,
                getAuctionEnd: () => K,
                getTimeout: () => S,
                getAuctionId: () => O,
                getAuctionStatus: () => Z,
                getAdUnits: () => w,
                getAdUnitCodes: () => C,
                getBidRequests: () => H,
                getBidsReceived: () => J.toArray(),
                getNoBids: () => ee,
                getNonBids: () => ne,
                getFPD: () => p,
                getMetrics: () => v,
                end: x.promise,
                requestsDone: L.promise,
                getProperties: re,
              }
            );
          }
          const j = (0, l.u2)(
              (0, l.A_)(
                'async',
                function (e, t, n) {
                  !(function (e) {
                    const t = c.$W.getConfig('maxBid');
                    return !t || !e.cpm || t >= Number(e.cpm);
                  })(t)
                    ? n(b.Tf.PRICE_TOO_HIGH)
                    : (0, I.io)(
                          C.it,
                          (0, h.sc)(O.tW, t.bidder || t.bidderCode, {
                            bid: t,
                            ortb2: g.n.index.getOrtb2(t),
                            adUnit: g.n.index.getAdUnit(t),
                          }),
                        )
                      ? this.dispatch.call(null, e, t)
                      : n(b.Tf.BIDDER_DISALLOWED);
                },
                'addBidResponse',
              ),
            ),
            W = (0, l.A_)('sync', (e) => e, 'responsesReady'),
            N = (0, l.A_)(
              'sync',
              function (e) {
                this.dispatch.call(this.context, e);
              },
              'addBidderRequests',
            ),
            P = (0, l.A_)(
              'async',
              function (e, t, n) {
                n && n();
              },
              'bidsBackCallback',
            );
          function M(e, t) {
            (!(function (e) {
              let t;
              const n = !0 === p.u.get(e.bidderCode, 'allowZeroCpmBids') ? e.cpm >= 0 : e.cpm > 0;
              e.bidderCode &&
                (n || e.dealId) &&
                (t = (function (e, t, { index: n = g.n.index } = {}) {
                  if (!t) return {};
                  const r = n.getBidRequest(t);
                  var i = {};
                  const o = V(t.mediaType, e);
                  (H(i, o, t, r),
                    e &&
                      p.u.getOwn(e, b.iD.ADSERVER_TARGETING) &&
                      (H(i, p.u.ownSettingsFor(e), t, r), (t.sendStandardTargeting = p.u.get(e, 'sendStandardTargeting'))));
                  return i;
                })(e.bidderCode, e));
              e.adserverTargeting = Object.assign(e.adserverTargeting || {}, t);
            })(t),
              (0, E.BO)(t.metrics).timeSince('addBidResponse', 'addBidResponse.total'),
              e.addBidReceived(t),
              m.Ic(b.qY.BID_RESPONSE, t));
          }
          function F(e, { index: t = g.n.index } = {}) {
            const n = t.getBidderRequest(e),
              i = (n && n.start) || e.requestTimestamp;
            (Object.assign(e, { responseTimestamp: e.responseTimestamp || (0, r.timestamp)(), requestTimestamp: e.requestTimestamp || i }),
              (e.timeToRespond = e.responseTimestamp - e.requestTimestamp));
          }
          function G(e, t, n) {
            if (e && n) {
              if (e === f.G_) {
                const e = t?.[f.G_]?.context ?? 'instream';
                if (n[`${f.G_}-${e}`]) return n[`${f.G_}-${e}`];
              }
              return n[e];
            }
          }
          const L = (e) => (t) => {
            const n =
              e ||
              ((e, { index: t = g.n.index } = {}) => {
                const n = G(e.mediaType, t.getMediaTypes(e), c.$W.getConfig('mediaTypePriceGranularity'));
                return 'string' == typeof e.mediaType && n ? ('string' == typeof n ? n : 'custom') : c.$W.getConfig('priceGranularity');
              })(t);
            return n === b.UE.AUTO
              ? t.pbAg
              : n === b.UE.DENSE
                ? t.pbDg
                : n === b.UE.LOW
                  ? t.pbLg
                  : n === b.UE.MEDIUM
                    ? t.pbMg
                    : n === b.UE.HIGH
                      ? t.pbHg
                      : n === b.UE.CUSTOM
                        ? t.pbCg
                        : void 0;
          };
          function z(e, t) {
            return {
              key: e,
              val:
                'function' == typeof t
                  ? function (e, n) {
                      return t(e, n);
                    }
                  : function (e) {
                      return e[t];
                    },
            };
          }
          function V(e, t) {
            const n = Object.assign({}, p.u.settingsFor(null));
            if (
              (n[b.iD.ADSERVER_TARGETING] ||
                (n[b.iD.ADSERVER_TARGETING] = [
                  z(b.xS.BIDDER, 'bidderCode'),
                  z(b.xS.AD_ID, 'adId'),
                  z(b.xS.PRICE_BUCKET, L()),
                  z(b.xS.SIZE, 'size'),
                  z(b.xS.DEAL, 'dealId'),
                  z(b.xS.SOURCE, 'source'),
                  z(b.xS.FORMAT, 'mediaType'),
                  z(b.xS.ADOMAIN, (e) =>
                    e.meta && e.meta.advertiserDomains && e.meta.advertiserDomains.length > 0 ? [e.meta.advertiserDomains].flat()[0] : '',
                  ),
                  z(b.xS.ACAT, (e) => {
                    const t = e?.meta?.primaryCatId;
                    return Array.isArray(t) ? t[0] || '' : t || '';
                  }),
                  z(b.xS.DSP, (e) =>
                    e.meta && (e.meta.networkId || e.meta.networkName) ? e?.meta?.networkName || e?.meta?.networkId : '',
                  ),
                  z(b.xS.CRID, (e) => (e.creativeId ? e.creativeId : '')),
                ]),
              'video' === e)
            ) {
              const e = n[b.iD.ADSERVER_TARGETING].slice();
              ((n[b.iD.ADSERVER_TARGETING] = e),
                [b.xS.UUID, b.xS.CACHE_ID].forEach((t) => {
                  void 0 === e.find((e) => e.key === t) && e.push(z(t, 'videoCacheKey'));
                }),
                !c.$W.getConfig('cache.url') ||
                  (t && !1 === p.u.get(t, 'sendStandardTargeting')) ||
                  (void 0 === e.find((e) => e.key === b.xS.CACHE_HOST) &&
                    e.push(
                      z(b.xS.CACHE_HOST, function (e) {
                        return e.cacheUrl ? (0, r.parseUrl)(e.cacheUrl).hostname : e.adserverTargeting?.[b.xS.CACHE_HOST];
                      }),
                    )));
            }
            return n;
          }
          function H(e, t, n, o) {
            var s = t[b.iD.ADSERVER_TARGETING];
            return (
              (n.size = n.getSize()),
              (s || []).forEach(function (s) {
                var a = s.key,
                  d = s.val;
                if ((e[a] && (0, r.logWarn)('The key: ' + a + ' is being overwritten'), (0, i.fp)(d)))
                  try {
                    d = d(n, o);
                  } catch (e) {
                    (0, r.logError)('bidmanager', 'ERROR', e);
                  }
                ((void 0 === t.suppressEmptyKeys || !0 !== t.suppressEmptyKeys) &&
                  a !== b.xS.DEAL &&
                  a !== b.xS.ACAT &&
                  a !== b.xS.DSP &&
                  a !== b.xS.CRID) ||
                (!(0, r.isEmptyStr)(d) && null != d)
                  ? (e[a] = d)
                  : (0, r.logInfo)("suppressing empty key '" + a + "' from adserver targeting");
              }),
              e
            );
          }
          function Q(e, t) {
            return (e[t.adUnitCode] || (e[t.adUnitCode] = (0, S.O)([])), e[t.adUnitCode].push(t), e);
          }
        },
        8693(e, t, n) {
          n.d(t, { $T: () => d, Ni: () => r, OA: () => o, RO: () => s, fR: () => i, w3: () => a });
          const r = 1,
            i = 2,
            o = 1,
            s = 500,
            a = 2;
          function d(e) {
            return (e ?? []).reduce((e, { event: t, method: n, url: r }) => {
              const i = (e[t] = e[t] ?? {});
              return ((i[n] = i[n] ?? []).push(r), e);
            }, {});
          }
        },
        8964(e, t, n) {
          n.d(t, { RD: () => E, b1: () => A, er: () => y, g4: () => m, hd: () => v, lc: () => w });
          var r = n(323),
            i = n(5881),
            o = n(4283),
            s = n(8384),
            a = n(7413);
          const d = {
              fetch: window.fetch.bind(window),
              makeRequest: (e, t) => new Request(e, t),
              timeout(e, t) {
                const n = new AbortController();
                let r = setTimeout(() => {
                  (n.abort(), (0, a.logError)(`Request timeout after ${e}ms`, t), (r = null));
                }, e);
                return {
                  signal: n.signal,
                  done() {
                    r && clearTimeout(r);
                  },
                };
              },
            },
            c = 'GET',
            u = 'Content-Type';
          function l(e = []) {
            const t = [e];
            return {
              attach: (e, n) =>
                function (...r) {
                  t.push(n);
                  try {
                    return e(...r);
                  } finally {
                    t.pop();
                  }
                },
              getCallers: () => t[t.length - 1],
            };
          }
          function f(e = 3e3, { request: t, done: n } = {}, r, i) {
            return g(l(), e, { request: t, done: n }, r, i);
          }
          function g(e, t = 3e3, { request: n, done: c } = {}, u, l) {
            l &&
              u &&
              (e = (function (e, t) {
                return { attach: (e) => e, getCallers: () => [[e, t]] };
              })(u, l));
            let f = (n, c) => {
              const u = n?._keepalive ?? c?.keepalive ?? n?.keepalive;
              let l;
              null == t ||
                null != c?.signal ||
                s.$W.getConfig('disableAjaxTimeout') ||
                ((l = d.timeout(t, n)), (c = Object.assign({ signal: l.signal }, c)));
              let f,
                g = d.makeRequest(n, { ...c, keepalive: !1 });
              return (
                'include' !== g.credentials ||
                  (0 !== e.getCallers().length && !e.getCallers().some(([e, t]) => !(0, o.io)(r.yg, (0, i.s)(e, t)))) ||
                  (g = d.makeRequest(g, { credentials: 'same-origin' })),
                (f = u
                  ? g
                      .clone()
                      .blob()
                      .then(
                        (e) => (
                          e.size > 65536
                            ? (0, a.logWarn)('Ignoring keepalive: request body exceeds 65536 bytes', g)
                            : (g = d.makeRequest(g, { keepalive: !0 })),
                          d.fetch(g)
                        ),
                      )
                  : d.fetch(g)),
                null != l?.done && (f = f.finally(l.done)),
                f
              );
            };
            return (
              (null == n && null == c) ||
                (f = ((e) =>
                  function (t, r) {
                    const i = new URL(null == t?.url ? t : t.url, document.location).origin;
                    let o = e(t, r);
                    return (n && n(i), c && (o = o.finally(() => c(i))), o);
                  })(f)),
              (f.withCallers = (t) => e.attach(f, t)),
              f
            );
          }
          function p({ status: e, statusText: t = '', headers: n, url: r }, i) {
            let o;
            function s(e) {
              if (void 0 === o)
                try {
                  o = new DOMParser().parseFromString(i, n?.get(u)?.split(';')?.[0]);
                } catch (t) {
                  ((o = null), e && e(t));
                }
              return o;
            }
            return {
              readyState: XMLHttpRequest.DONE,
              status: e,
              statusText: t,
              responseText: i,
              response: i,
              responseType: '',
              responseURL: r,
              get responseXML() {
                return s(a.logError);
              },
              getResponseHeader: (e) => (n?.has(e) ? n.get(e) : null),
              toJSON() {
                return Object.assign({ responseXML: s() }, this);
              },
              timedOut: !1,
            };
          }
          function m(e = 3e3, { request: t, done: n } = {}, r, i) {
            return h(l(), e, { request: t, done: n }, r, i);
          }
          function h(e, t = 3e3, { request: n, done: r } = {}, i, o) {
            const s = g(e, t, { request: n, done: r }, i, o);
            function l(e, t, n, r = {}) {
              !(function (e, t) {
                const { success: n, error: r } =
                  'object' == typeof t && null != t
                    ? t
                    : { success: 'function' == typeof t ? t : () => null, error: (e, t) => (0, a.logError)('Network error', e, t) };
                e.then((e) => e.text().then((t) => [e, t])).then(
                  ([e, t]) => {
                    const i = p(e, t);
                    e.ok || 304 === e.status ? n(t, i) : r(e.statusText, i);
                  },
                  (e) => r('', Object.assign(p({ status: 0 }, ''), { reason: e, timedOut: 'AbortError' === e?.name })),
                );
              })(
                s(
                  (function (e, t, n = {}) {
                    const r = n.method || (t ? 'POST' : c);
                    if (r === c && t) {
                      const r = (0, a.parseUrl)(e, n);
                      (Object.assign(r.search, t), (e = (0, a.buildUrl)(r)));
                    }
                    const i = new Headers(n.customHeaders);
                    i.set(u, n.contentType || 'text/plain');
                    const o = { method: r, headers: i };
                    (r !== c && t && (o.body = t),
                      n.withCredentials && (o.credentials = 'include'),
                      isSecureContext &&
                        (['browsingTopics'].forEach((e) => {
                          n[e] && (o[e] = !0);
                        }),
                        null != n.suppressTopicsEnrollmentWarning &&
                          (o.suppressTopicsEnrollmentWarning = n.suppressTopicsEnrollmentWarning)));
                    const s = d.makeRequest(e, o);
                    return (n.keepalive && (s._keepalive = !0), s);
                  })(e, n, r),
                ),
                t,
              );
            }
            return ((l.withCallers = (t) => e.attach(l, t)), l);
          }
          function b(e) {
            return function (t, n, r, i) {
              if (!t || !n) throw new Error('moduleType and moduleName are required');
              return e(r, i, t, n);
            };
          }
          ((f.withCallers =
            (e) =>
            (...t) =>
              g(l(e), ...t)),
            (m.withCallers =
              (e) =>
              (...t) =>
                h(l(e), ...t)));
          const y = b(m),
            E = (b(f), m()),
            v = f(),
            w = E,
            A = v;
        },
        9015(e, t, n) {
          n.d(t, { n: () => u });
          var r = n(7413),
            i = n(8497);
          function o(e) {
            Object.assign(this, {
              getAuction({ auctionId: t }) {
                if (null != t) return e().find((e) => e.getAuctionId() === t);
              },
              getAdUnit({ adUnitId: t }) {
                if (null != t)
                  return e()
                    .flatMap((e) => e.getAdUnits())
                    .find((e) => e.adUnitId === t);
              },
              getMediaTypes({ adUnitId: e, requestId: t }) {
                if (null != t) {
                  const n = this.getBidRequest({ requestId: t });
                  if (null != n && (null == e || n.adUnitId === e)) return n.mediaTypes;
                } else if (null != e) {
                  const t = this.getAdUnit({ adUnitId: e });
                  if (null != t) return t.mediaTypes;
                }
              },
              getBidderRequest({ requestId: t, bidderRequestId: n }) {
                if (null != t || null != n) {
                  let r = e().flatMap((e) => e.getBidRequests());
                  return (
                    null != n && (r = r.filter((e) => e.bidderRequestId === n)),
                    null == t ? r[0] : r.find((e) => e.bids && null != e.bids.find((e) => e.bidId === t))
                  );
                }
              },
              getBidRequest({ requestId: t }) {
                if (null != t)
                  return e()
                    .flatMap((e) => e.getBidRequests())
                    .flatMap((e) => e.bids)
                    .find((e) => e && e.bidId === t);
              },
              getOrtb2(e) {
                return this.getBidderRequest(e)?.ortb2 || this.getAuction(e)?.getFPD()?.global?.ortb2;
              },
            });
          }
          var s = n(5521),
            a = n(2822),
            d = n(7834),
            c = n(5423);
          const u = (function () {
            const e = (0, d.H)({
              startTime: (e) => e.end.then(() => e.getAuctionEnd()),
              ttl: (e) =>
                e.end.then(() => {
                  const t = e.getBidsReceived();
                  if (0 === t.length) {
                    const e = (0, c.S9)();
                    return null == e ? null : 1e3 * e;
                  }
                  const n = t.map((e) => {
                    const t = (0, c.X9)(e);
                    return null == t ? null : Math.max(t, e.ttl);
                  });
                  return n.some((e) => null == e) ? null : 1e3 * Math.max(...n);
                }),
            });
            (0, c.lc)(() => e.refresh());
            const t = { onExpiry: e.onExpiry };
            function n(t) {
              for (const n of e) if (n.getAuctionId() === t) return n;
            }
            function u() {
              return e.toArray().flatMap((e) => e.getBidsReceived());
            }
            return (
              (t.addWinningBid = function (e) {
                const t = (0, a.BO)(e.metrics);
                (t.checkpoint('bidWon'),
                  t.timeBetween('auctionEnd', 'bidWon', 'adserver.pending'),
                  t.timeBetween('requestBids', 'bidWon', 'adserver.e2e'));
                const i = n(e.auctionId);
                i ? i.addWinningBid(e) : (0, r.logWarn)('Auction not found when adding winning bid');
              }),
              Object.entries({
                getAllWinningBids: { name: 'getWinningBids' },
                getBidsRequested: { name: 'getBidRequests' },
                getNoBids: {},
                getAdUnits: {},
                getBidsReceived: { pre: (e) => e.getAuctionStatus() === i.UZ },
                getAdUnitCodes: { post: r.uniques },
              }).forEach(([n, { name: r = n, pre: i, post: o }]) => {
                const s = null == i ? (e) => e[r]() : (e) => (i(e) ? e[r]() : []),
                  a = null == o ? (e) => e : (e) => e.filter(o);
                t[n] = () => a(e.toArray().flatMap(s));
              }),
              (t.getAllBidsForAdUnitCode = function (e) {
                return u().filter((t) => t && t.adUnitCode === e);
              }),
              (t.createAuction = function (t) {
                const n = (0, i.mX)(t);
                return (
                  (function (t) {
                    e.add(t);
                  })(n),
                  n
                );
              }),
              (t.findBidByAdId = function (e) {
                return u().find((t) => t.adId === e);
              }),
              (t.getStandardBidderAdServerTargeting = function () {
                return (0, i.HN)()[s.iD.ADSERVER_TARGETING];
              }),
              (t.setStatusForBids = function (r, i) {
                const o = t.findBidByAdId(r);
                if ((o && (o.status = i), o && i === s.tl.BID_TARGETING_SET)) {
                  const t = n(o.auctionId);
                  t && (t.setBidTargeting(o), e.refresh());
                }
              }),
              (t.getLastAuctionId = function () {
                const t = e.toArray();
                return t.length && t[t.length - 1].getAuctionId();
              }),
              (t.clearAllAuctions = function () {
                e.clear();
              }),
              (t.index = new o(() => e.toArray())),
              t
            );
          })();
        },
        9200(e, t, n) {
          n.d(t, { H: () => s, y: () => a });
          var r = n(9015),
            i = n(5437),
            o = n(7413);
          function s(e, t, n, r) {
            const i = e?.adapterCode,
              o = e?.bidderCode || r?.bidder,
              s = t.get(e?.adapterCode, 'adjustAlternateBids');
            return t.getOwn(o, n) || t.get(s ? i : o, n);
          }
          function a(e, t, n, { index: a = r.n.index, bs: d = i.u } = {}) {
            const c = s(t, d, 'bidCpmAdjustment', (n = n || a.getBidRequest(t)));
            if (c && 'function' == typeof c)
              try {
                return c(e, Object.assign({}, t), n);
              } catch (e) {
                (0, o.logError)('Error during bid adjustment', e);
              }
            return e;
          }
        },
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [7769],
      {
        5720(t, n, e) {
          e.d(n, { M: () => h, g: () => o });
          var c = e(7413),
            i = e(8378);
          function o() {
            try {
              const t = (0, c.getWindowTop)(),
                { scrollY: n, scrollX: e } = t,
                { height: i, width: o } = h();
              return { top: n, right: e + o, bottom: n + i, left: e };
            } catch (t) {
              return {};
            }
          }
          function h() {
            const t = (0, i.Ot)();
            try {
              const n = t.innerHeight || t.document.documentElement.clientHeight || t.document.body.clientHeight || 0;
              return { width: t.innerWidth || t.document.documentElement.clientWidth || t.document.body.clientWidth || 0, height: n };
            } catch (t) {
              return {};
            }
          }
        },
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [5590],
      {
        157(e, r, n) {
          n.d(r, { G: () => t });
          const t =
            '(()=>{"use strict";window.render=function(e,{mkFrame:n},r){const{safeRenderer:t,...i}=e,o=e.width,d=e.height,c=e.instl;if(null==d){const e=r.document&&r.document.body,n=e&&e.parentElement;e&&e.style&&(e.style.height="100%"),n&&n.style&&(n.style.height="100%")}const a=r.document,l={width:null!=o?o:"100%",height:null!=d?d:"100%"};if(c&&r.frameElement){const e=r.frameElement.style;e.width=o?String(o)+"px":"100vw",e.height=d?String(d)+"px":"100vh"}return"string"!=typeof t.url||""===t.url?Promise.reject(new Error("Prebid SafeRenderer: missing data.safeRenderer.url")):new Promise(function(e,r){const o=n(a,{width:l.width,height:l.height});o.onload=function(){try{const n=o.contentWindow,d=n.document,c=d.createElement("script");c.src=t.url,c.onload=function(){try{const r=n.pbRenderInFrame;if("function"!=typeof r)throw new Error("Prebid SafeRenderer: safeRenderer.url script must define window.pbRenderInFrame as a function.");r.call(n,{config:t.config,...i}),e()}catch(e){r(e)}},c.onerror=function(){r(new Error("Prebid SafeRenderer: failed to load script from safeRenderer.url"))},(d.head||d.body).appendChild(c)}catch(e){r(e)}},o.onerror=function(){r(new Error("Prebid SafeRenderer: iframe failed to load"))},a.body.appendChild(o)})}})();';
        },
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [1085],
      {
        1852(e, n, t) {
          t.d(n, { G: () => r });
          const r =
            '(()=>{"use strict";const e="Prebid Event",n="browserIntervention";window.render=function({ad:t,adUrl:r,width:i,height:o,instl:s},{mkFrame:d,sendMessage:c},h){if(function(){const t=window;if("ReportingObserver"in t)try{new t.ReportingObserver(t=>{var r;r=t[0],c(e,{event:n,intervention:r})},{buffered:!0,types:["intervention"]}).observe()}catch(e){}}(),!t&&!r){const e=new Error("Missing ad markup or URL");throw e.reason="noAd",e}{if(null==o){const e=h.document?.body;[e,e?.parentElement].filter(e=>null!=e?.style).forEach(e=>{e.style.height="100%"})}const e=h.document,n={width:i??"100%",height:o??"100%"};if(r&&!t?n.src=r:n.srcdoc=t,e.body.appendChild(d(e,n)),s&&h.frameElement){const e=h.frameElement.style;e.width=i?`${i}px`:"100vw",e.height=o?`${o}px`:"100vh"}}}})();';
        },
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [2764],
      {
        651(o, n, e) {
          function t(o, n) {
            return function () {
              const e = document.domain.split('.'),
                t = `_gd${Date.now()}_${n}`;
              for (let n, i, s = 0; s < e.length; s++) {
                const u = e.slice(s).join('.');
                if (
                  (o.setCookie(t, '1', void 0, void 0, u),
                  (i = o.getCookie(t)),
                  o.setCookie(t, '', 'Thu, 01 Jan 1970 00:00:01 GMT', void 0, u),
                  '1' !== i)
                )
                  return n;
                n = u;
              }
            };
          }
          e.d(n, { w: () => t });
        },
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [8498],
      {
        4162(e, t, r) {
          r.d(t, { U: () => n });
          var i = r(80);
          function n(...e) {
            const t = e.shift(),
              r = e.length > 1 ? n(...e) : e[0];
            return Object.fromEntries(i.zt.map((e) => [e, Object.assign({}, t[e], r[e])]));
          }
        },
        6271(e, t, r) {
          r.d(t, { T: () => b, A: () => l });
          const i = new WeakMap();
          var n = r(7413),
            s = r(1779);
          var o = r(7791);
          var a = r(7169),
            d = r(3350);
          var p = r(80),
            c = r(7850),
            u = r(1662);
          const m = {
            [p.S3]: {
              fpd: {
                priority: 99,
                fn(e, t) {
                  (0, n.mergeDeep)(e, t.ortb2);
                },
              },
              onlyOneClient: { priority: -99, fn: (0, c.i8)('ORTB request') },
              props: {
                fn(e, t) {
                  Object.assign(e, { id: e.id || (0, n.generateUUID)(), test: e.test || 0 });
                  const r = parseInt(t.timeout, 10);
                  isNaN(r) || (e.tmax = r);
                },
              },
            },
            [p.Tb]: {
              fpd: {
                priority: 99,
                fn(e, t) {
                  (0, n.mergeDeep)(e, t.ortb2Imp);
                },
              },
              id: {
                fn(e, t) {
                  e.id = t.bidId;
                },
              },
              banner: {
                fn: function (e, t, r) {
                  if (r.mediaType && r.mediaType !== s.D4) return;
                  const i = t?.mediaTypes?.banner;
                  if (i) {
                    const r = { topframe: !0 === (0, n.inIframe)() ? 0 : 1 };
                    (i.sizes &&
                      null == t.ortb2Imp?.banner?.format &&
                      (r.format = (0, n.sizesToSizeTuples)(i.sizes).map(n.sizeTupleToRtbSize)),
                      i.hasOwnProperty('pos') && (r.pos = i.pos),
                      (e.banner = (0, n.mergeDeep)(r, e.banner)));
                  }
                },
              },
              secure: {
                fn(e, t) {
                  e.secure = e.secure ?? 1;
                },
              },
            },
            [p.WR]: {
              mediaType: { priority: 99, fn: a.K },
              banner: {
                fn: (function ({ createPixel: e = (e) => (0, n.createTrackPixelHtml)(decodeURIComponent(e), n.encodeMacroURI) } = {}) {
                  return function (t, r) {
                    t.mediaType === s.D4 &&
                      (r.adm && r.nurl ? (t.ad = e(r.nurl) + r.adm) : r.adm ? (t.ad = r.adm) : r.nurl && (t.adUrl = r.nurl));
                  };
                })(),
              },
              props: {
                fn(e, t, r) {
                  (Object.entries({
                    requestId: r.bidRequest?.bidId,
                    seatBidId: t.id,
                    cpm: t.price,
                    currency: r.ortbResponse.cur || r.currency,
                    width: t.w,
                    height: t.h,
                    wratio: t.wratio,
                    hratio: t.hratio,
                    dealId: t.dealid,
                    creative_id: t.crid,
                    creativeId: t.crid,
                    burl: t.burl,
                    ttl: t.exp || r.ttl,
                    netRevenue: r.netRevenue,
                    duration: t.dur,
                  })
                    .filter(([e, t]) => void 0 !== t)
                    .forEach(([t, r]) => {
                      e[t] = r;
                    }),
                    e.meta || (e.meta = {}),
                    t.adomain && (e.meta.advertiserDomains = t.adomain),
                    t.ext?.dsa && (e.meta.dsa = t.ext.dsa),
                    t.cat && ((e.meta.primaryCatId = t.cat[0]), (e.meta.secondaryCatIds = t.cat.slice(1))),
                    t.attr && (e.meta.attr = t.attr),
                    t.ext?.eventtrackers && (e.eventtrackers = (e.eventtrackers ?? []).concat(t.ext.eventtrackers)),
                    t.cattax && (e.meta.cattax = t.cattax));
                },
              },
            },
          };
          ((m[p.Tb].native = {
            fn: function (e, t, r) {
              if (r.mediaType && r.mediaType !== s.s6) return;
              let i = t.nativeOrtbRequest;
              i &&
                ((i = Object.assign({}, r.nativeRequest, i)),
                i.assets?.length
                  ? (e.native = (0, n.mergeDeep)({}, { request: JSON.stringify(i), ver: i.ver }, e.native))
                  : (0, n.logWarn)('mediaTypes.native is set, but no assets were specified. Native request skipped.', t));
            },
          }),
            (m[p.WR].native = {
              fn: function (e, t) {
                if (e.mediaType === s.s6) {
                  let r;
                  if (((r = 'string' == typeof t.adm ? JSON.parse(t.adm) : t.adm), !(0, d.Qd)(r) || !Array.isArray(r.assets)))
                    throw new Error('ORTB native response contained no assets');
                  e.native = { ortb: r };
                }
              },
            }),
            (m[p.Tb].video = {
              fn: function (e, t, r) {
                if (r.mediaType && r.mediaType !== s.G_) return;
                const i = t?.mediaTypes?.video;
                if (!(0, n.isEmpty)(i)) {
                  const t = Object.fromEntries(Object.entries(i).filter(([e]) => o.Zy.has(e)));
                  if (i.playerSize) {
                    const e = (0, n.sizesToSizeTuples)(i.playerSize).map(n.sizeTupleToRtbSize);
                    (e.length > 1 && (0, n.logWarn)('video request specifies more than one playerSize; all but the first will be ignored'),
                      Object.assign(t, e[0]));
                  }
                  e.video = (0, n.mergeDeep)(t, e.video);
                }
              },
            }),
            (m[p.WR].video = {
              fn: function (e, t, r) {
                e.mediaType === s.G_ &&
                  (r?.imp?.video?.w && r?.imp?.video?.h && ([e.playerWidth, e.playerHeight] = [r.imp.video.w, r.imp.video.h]),
                  t.adm && (e.vastXml = t.adm),
                  t.nurl && (e.vastUrl = t.nurl));
              },
            }),
            (m[p.Tb].audio = {
              fn: function (e, t, r) {
                if (r.mediaType && r.mediaType !== s.FY) return;
                const i = t?.mediaTypes?.audio;
                if (!(0, n.isEmpty)(i)) {
                  const t = Object.fromEntries(Object.entries(i).filter(([e]) => u.Ai.has(e)));
                  e.audio = (0, n.mergeDeep)(t, e.audio);
                }
              },
            }),
            (m[p.WR].audio = {
              fn: function (e, t) {
                e.mediaType === s.FY && (t.adm && (e.vastXml = t.adm), t.nurl && (e.vastUrl = t.nurl));
              },
            }));
          var f = r(4162);
          function l({ context: e = {}, processors: t = b, overrides: r = {}, imp: s, request: o, bidResponse: a, response: d } = {}) {
            const c = new WeakMap();
            function u(e, n, s, o) {
              let a;
              return function (...d) {
                return (
                  null == a &&
                    (a = (function () {
                      let a = s.bind(
                        this,
                        (function (e, t = {}) {
                          if (!i.has(e)) {
                            const t = Object.entries(e);
                            (t.sort((e, t) => ((e = e[1].priority || 0) === (t = t[1].priority || 0) ? 0 : e > t ? -1 : 1)),
                              i.set(
                                e,
                                t.map(([e, t]) => [e, t.fn]),
                              ));
                          }
                          const r = i
                            .get(e)
                            .filter(([e]) => !t.hasOwnProperty(e) || t[e])
                            .map(function ([e, r]) {
                              return t.hasOwnProperty(e) ? t[e].bind(this, r) : r;
                            });
                          return function () {
                            const e = Array.from(arguments);
                            r.forEach((t) => {
                              t.apply(this, e);
                            });
                          };
                        })(t()[e] || {}, r[e] || {}),
                      );
                      return (
                        n && (a = n.bind(this, a)),
                        function (...e) {
                          try {
                            return a.apply(this, e);
                          } catch (t) {
                            o.call(this, t, ...e);
                          }
                        }
                      );
                    })()),
                  a.apply(this, d)
                );
              };
            }
            const m = u(
                p.Tb,
                s,
                function (e, t, r) {
                  const i = {};
                  return (e(i, t, r), i);
                },
                function (e, t, r) {
                  (0, n.logError)('Error while converting bidRequest to ORTB imp; request skipped.', {
                    error: e,
                    bidRequest: t,
                    context: r,
                  });
                },
              ),
              f = u(
                p.S3,
                o,
                function (e, t, r, i) {
                  const n = { imp: t };
                  return (e(n, r, i), n);
                },
                function (e, t, r, i) {
                  throw ((0, n.logError)('Error while converting to ORTB request', { error: e, imps: t, bidderRequest: r, context: i }), e);
                },
              ),
              l = u(
                p.WR,
                a,
                function (e, t, r) {
                  const i = {};
                  return (e(i, t, r), i);
                },
                function (e, t, r) {
                  (0, n.logError)('Error while converting ORTB seatbid.bid to bidResponse; bid skipped.', { error: e, bid: t, context: r });
                },
              ),
              y = u(
                p.Cf,
                d,
                function (e, t, r, i) {
                  const n = { bids: t };
                  return (e(n, r, i), n);
                },
                function (e, t, r, i) {
                  throw (
                    (0, n.logError)('Error while converting from ORTB response', {
                      error: e,
                      bidResponses: t,
                      ortbResponse: r,
                      context: i,
                    }),
                    e
                  );
                },
              );
            return {
              toORTB({ bidderRequest: t, bidRequests: r, context: i = {} }) {
                r = r || t.bids;
                const s = { req: Object.assign({ bidRequests: r }, e, i), imp: {} };
                s.req.impContext = s.imp;
                const o = r
                    .map((r) => {
                      const o = Object.assign({ bidderRequest: t, reqContext: s.req }, e, i),
                        a = m(r, o);
                      if (null != a) {
                        if (a.hasOwnProperty('id')) return (Object.assign(o, { bidRequest: r, imp: a }), (s.imp[a.id] = o), a);
                        (0, n.logError)('Converted ORTB imp does not specify an id, ignoring bid request', r, a);
                      }
                    })
                    .filter(Boolean),
                  a = f(o, t, s.req);
                return ((s.req.bidderRequest = t), null != a && c.set(a, s), a);
              },
              fromORTB({ request: e, response: t }) {
                const r = c.get(e);
                if (null == r) throw new Error('ortbRequest passed to `fromORTB` must be the same object returned by `toORTB`');
                function i(t, r = {}) {
                  return Object.assign(t, { ortbRequest: e }, r);
                }
                const s = Object.fromEntries((e.imp || []).map((e) => [e.id, e])),
                  o = (t?.seatbid || [])
                    .flatMap((e) =>
                      (e.bid || []).map((o) => {
                        if (s.hasOwnProperty(o.impid) && r.imp.hasOwnProperty(o.impid))
                          return l(o, i(r.imp[o.impid], { imp: s[o.impid], seatbid: e, ortbResponse: t }));
                        (0, n.logError)('ORTB response seatbid[].bid[].impid does not match any imp in request; ignoring bid', o);
                      }),
                    )
                    .filter(Boolean);
                return y(o, t, i(r.req));
              },
            };
          }
          const b = (0, n.memoize)(() => (0, f.U)(m, (0, p.yB)(p.qN)));
        },
        7169(e, t, r) {
          r.d(t, { K: () => s, X: () => n });
          var i = r(1779);
          const n = { 1: i.D4, 2: i.G_, 4: i.s6 };
          function s(e, t, r) {
            if (e.mediaType) return;
            const i = r.mediaType;
            if (!i && !n.hasOwnProperty(t.mtype)) throw new Error('Cannot determine mediaType for response');
            e.mediaType = i || n[t.mtype];
          }
        },
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [2630],
      {
        1046(e, t, n) {
          n.d(t, { Ay: () => d });
          var l = n(5521),
            s = n(8964),
            a = n(7413),
            i = n(3399),
            r = n(8384);
          const c = { ajax: s.lc },
            o = 'analyticsLabels',
            u = { internal: {}, publisher: {} };
          let p = {};
          r.$W.getConfig(o, (e) => {
            ((u.publisher = e[o]), (p = g()));
          });
          const g = () => Object.values(u).reduce((e, t) => ({ ...e, ...t }), {}),
            y = Object.values(l.qY).filter((e) => e !== l.qY.AUCTION_DEBUG);
          let b = 100;
          function d(e) {
            if (!new.target) return new d(e);
            const { url: t, analyticsType: n, global: s, handler: r } = e,
              u = [];
            let g,
              f,
              h = !1,
              v = !0,
              T = null;
            const A = (() => {
              let e,
                t = !1;
              const n = () => {
                if (!t) {
                  t = !0;
                  try {
                    let e = 0,
                      t = 0;
                    for (; u.length > 0; ) {
                      e++;
                      const n = u.length;
                      if ((u.shift()(), u.length >= n ? t++ : (t = 0), t >= 10))
                        return ((0, a.logError)('Detected probable infinite loop, discarding events', u), void (u.length = 0));
                    }
                    (0, a.logMessage)(`${f} analytics: processed ${e} events`);
                  } finally {
                    t = !1;
                  }
                }
              };
              return function () {
                (null != e && (clearTimeout(e), (e = null)), 0 === b ? n() : (e = setTimeout(n, b)));
              };
            })();
            return Object.defineProperties(
              {
                track: function (e) {
                  const { eventType: n, args: l } = e;
                  'bundle' === this.getAdapterType() && window[s](r, n, l);
                  'endpoint' === this.getAdapterType() &&
                    (function ({ eventType: e, args: n, callback: l }) {
                      c.ajax(t, l, JSON.stringify({ eventType: e, args: n, labels: p }));
                    })(e);
                },
                enqueue: j,
                enableAnalytics: q,
                disableAnalytics: function () {
                  (Object.entries(g || {}).forEach(([e, t]) => {
                    i.AU(e, t);
                  }),
                    (this.enableAnalytics = this._oldEnable ? this._oldEnable : q),
                    (h = !1));
                },
                getAdapterType: () => n,
                getGlobal: () => s,
                getHandler: () => r,
                getUrl: () => t,
              },
              { enabled: { get: () => h } },
            );
            function j({ eventType: e, args: t, sequence: n }) {
              (u.push(() => {
                (Object.keys(p || []).length > 0 && (t = { [o]: p, ...t }),
                  (null == T || n > T) && (T = n),
                  this.track({ eventType: e, labels: p, args: t }));
              }),
                A());
            }
            function q(e) {
              if (
                ((f = e?.provider),
                (v =
                  'object' != typeof e ||
                  'object' != typeof e.options ||
                  void 0 === e.options.sampling ||
                  Math.random() < parseFloat(e.options.sampling)),
                v)
              ) {
                const t = (() => {
                  const { includeEvents: t = y, excludeEvents: n = [] } = e || {};
                  return new Set(
                    Object.values(l.qY)
                      .filter((e) => t.includes(e))
                      .filter((e) => !n.includes(e)),
                  );
                })();
                (i
                  .kQ()
                  .filter(({ sequence: e }) => null == T || e > T)
                  .forEach((e) => {
                    if (!e || !t.has(e.eventType)) return;
                    const { eventType: n, args: l, sequence: s } = e;
                    j.call(this, { eventType: n, args: l, sequence: s });
                  }),
                  (g = Object.fromEntries(
                    Array.from(t).map((e) => {
                      const t = ({ eventType: e, sequence: t, args: n }) => this.enqueue({ eventType: e, args: n, sequence: t });
                      return (i.KT(e, t), [e, t]);
                    }),
                  )));
              } else (0, a.logMessage)(`Analytics adapter for "${s}" disabled by sampling`);
              ((this._oldEnable = this.enableAnalytics),
                (this.enableAnalytics = function () {
                  return (0, a.logMessage)(`Analytics adapter for "${s}" already enabled, unnecessary call to \`enableAnalytics\`.`);
                }),
                (h = !0));
            }
          }
        },
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [10],
      {
        4056(e, n, t) {
          t.d(n, { I0: () => r, Yk: () => d, Z1: () => g, cB: () => i, e6: () => u, hr: () => b });
          var o = t(7413),
            a = t(8928),
            s = t(1068);
          const r = 2,
            i = { purposes: [1, 2, 4, 7], legIntPurposes: [], flexiblePurposes: [2], specialFeatures: [1] },
            u = { purposes: [], legIntPurposes: [], flexiblePurposes: [], specialFeatures: [] },
            l = [2, 7, 9, 10],
            c = { purpose: !1, feature: 'specialFeatureOptins' };
          let p = {},
            f = u;
          function g(e) {
            p = e;
          }
          function d(e) {
            f = e;
          }
          function m(e) {
            if (null == e) return f;
            let n = p?.[e] ?? s.W1[e];
            return (
              n ??
              ((0, o.logWarn)(
                `No purpose declarations found for GVL ID ${e}. You may set one using setConfig({gvlLegalBasisMapping}). Falling back to ${JSON.stringify(f)}`,
              ),
              f)
            );
          }
          function C(e, n, t, o, a = m) {
            let r, i;
            if (o === s.B1) ((r = !0), (i = 'feature' !== n && l.includes(t)));
            else {
              const { purposes: e, legIntPurposes: s, flexiblePurposes: u, specialFeatures: l } = a(o);
              ((i = 'feature' !== n && (s.includes(t) || u.includes(t))), (r = 'feature' === n ? l.includes(t) : i || e.includes(t)));
            }
            const u = 'feature' === n ? null : e.vendorData?.publisher?.restrictions?.[t]?.[o];
            return (0 === u ? (r = i = !1) : 1 === u ? (i = !1) : 2 === u && (r = !1), { acceptConsent: r, acceptLI: i });
          }
          function D(e, n, t, o, s) {
            const r = (0, a.A)(e, `vendorData.${n}`);
            return (o && !!r?.consents?.[t]) || (s && !!r?.legitimateInterests?.[t]);
          }
          function b(e, n, t, o) {
            const { acceptConsent: r, acceptLI: i } = C(e, n, t, o);
            let u;
            return (
              (u = !1 !== c[n] ? r && !!(0, a.A)(e, `vendorData.${c[n]}.${t}`) : D(e, o === s.B1 ? 'publisher' : 'purpose', t, r, i)),
              { purpose: u, vendor: D(e, 'vendor', o, r, i) }
            );
          }
        },
        4390(e, n, t) {
          t.d(n, { yq: () => l });
          var o = t(2822),
            a = t(7413),
            s = t(3350),
            r = t(8203),
            i = t(724),
            u = t(1785);
          function l({
            namespace: e,
            displayName: n,
            consentDataHandler: t,
            parseConsentData: l,
            getNullConsent: c,
            cmpHandlers: p,
            cmpEventCleanup: f,
            DEFAULT_CMP: g = 'iab',
            DEFAULT_CONSENT_TIMEOUT: d = 1e4,
          } = {}) {
            function m(n) {
              return `consentManagement.${e} ${n}`;
            }
            let C, D, b;
            function h(n, o) {
              return n(Object.assign({ [`${e}Consent`]: t.getConsentData() }, o));
            }
            function $() {
              return D().then(({ error: e }) => ({ error: e, consentData: t.getConsentData() }));
            }
            function T() {
              null == C &&
                ((C = (function (e, n) {
                  const t = new WeakSet();
                  return (0, o.Ak)(e, function (e, o) {
                    return n()
                      .then(({ consentData: n, error: s }) => {
                        (!s || (n && t.has(s)) || (t.add(s), (0, a.logWarn)(s.message, ...(s.args || []))), e.call(this, o));
                      })
                      .catch((n) => {
                        ((0, a.logError)(`${n?.message} Canceling auction as per consentManagement config.`, ...(n?.args || [])),
                          e.stopTiming(),
                          'function' == typeof o.bidsBackHandler
                            ? o.bidsBackHandler()
                            : (0, a.logError)('Error executing bidsBackHandler'));
                      });
                  });
                })(e, () => D())),
                (0, u.Yn)('requestBids').before(C, 50),
                i.U3.before(h),
                (0, a.logInfo)(`${n} consentManagement module has been activated...`));
            }
            function k() {
              null != C &&
                ((0, u.Yn)('requestBids').getHooks({ hook: C }).remove(),
                i.U3.getHooks({ hook: h }).remove(),
                (C = null),
                (0, a.logInfo)(`${n} consentManagement module has been deactivated...`));
            }
            return function (o) {
              const i = o?.[e];
              if (!i || 'object' != typeof i) return ((0, a.logInfo)(m('config not defined, exiting consent manager module')), k(), {});
              if (!1 === i?.enabled)
                return (
                  (0, a.logWarn)(m('config enabled is set to false, disabling consent manager module')),
                  (function () {
                    if ((k(), 'function' == typeof f))
                      try {
                        f();
                      } catch (e) {
                        (0, a.logError)(`Error during CMP event cleanup for ${n}:`, e);
                      }
                  })(),
                  {}
                );
              let u, h;
              ((0, s.O8)(i.cmpApi)
                ? (u = i.cmpApi)
                : ((u = g), (0, a.logInfo)(m(`config did not specify cmp.  Using system default setting (${g}).`))),
                (0, s.Et)(i.timeout)
                  ? (h = i.timeout)
                  : ((h = d), (0, a.logInfo)(m(`config did not specify timeout.  Using system default setting (${d}).`))));
              const v = (0, s.Et)(i.actionTimeout) ? i.actionTimeout : null;
              let y;
              'static' === u
                ? (0, s.Qd)(i.consentData)
                  ? ((b = i.consentData), (h = null), (y = () => new r.U9((e) => e(t.setConsentData(l(b))))))
                  : (0, a.logError)(
                      m("config with cmpApi: 'static' did not specify consentData. No consents will be available to adapters."),
                    )
                : p.hasOwnProperty(u)
                  ? (y = p[u])
                  : (t.setConsentData(null),
                    (0, a.logWarn)(
                      `${n} CMP framework (${u}) is not a supported framework.  Aborting consentManagement module and resuming auction.`,
                    ),
                    (y = () => r.U9.resolve()));
              const E = () =>
                (function ({ name: e, consentDataHandler: n, setupCmp: t, cmpTimeout: o, actionTimeout: a, getNullConsent: s }) {
                  let r;
                  return (
                    n.enable(),
                    new Promise((i, u) => {
                      let l,
                        c = !1;
                      function p(t) {
                        (null != r && clearTimeout(r),
                          (r =
                            null != t
                              ? setTimeout(() => {
                                  const t = n.getConsentData() ?? (c ? l : s()),
                                    o = 'timeout waiting for ' + (c ? 'user action on CMP' : 'CMP to load');
                                  (n.setConsentData(t), i({ consentData: t, error: new Error(`${e} ${o}`) }));
                                }, t)
                              : null));
                      }
                      (t(function (e) {
                        ((l = e), c || ((c = !0), null != a && p(a)));
                      }).then(() => i({ consentData: n.getConsentData() }), u),
                        null != o && p(o));
                    })
                      .finally(() => {
                        r && clearTimeout(r);
                      })
                      .catch((e) => {
                        throw (n.error(e), e);
                      })
                  );
                })({ name: n, consentDataHandler: t, setupCmp: y, cmpTimeout: h, actionTimeout: v, getNullConsent: c });
              return (
                (D = (() => {
                  let e;
                  return function () {
                    return (
                      null == e &&
                        (e = E().catch((n) => {
                          throw ((e = null), n);
                        })),
                      e
                    );
                  };
                })()),
                T(),
                { cmpHandler: u, cmpTimeout: h, actionTimeout: v, staticConsentData: b, loadConsentData: $, requestBidsHook: C }
              );
            };
          }
        },
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [7109],
      {
        4077(e, t, n) {
          n.d(t, { c5: () => i, q4: () => r });
          var s = n(8203);
          const r = 2;
          function i(
            {
              apiName: e,
              apiVersion: t,
              apiArgs: n = ['command', 'callback', 'parameter', 'version'],
              callbackArgs: i = ['returnValue', 'success'],
              mode: a = 0,
            },
            c = window,
          ) {
            const l = {},
              o = `${e}Call`,
              p = `${e}Return`;
            function u(e) {
              const t = 'string' == typeof e.data && e.data.includes(p) ? JSON.parse(e.data) : e.data;
              if (t?.[p]?.callId) {
                const e = t[p];
                l.hasOwnProperty(e.callId) && l[e.callId](...i.map((t) => e[t]));
              }
            }
            const [m, d] = (function () {
              let t,
                n = c,
                s = !1;
              for (; null != n; ) {
                try {
                  if ('function' == typeof n[e]) {
                    ((t = n), (s = !0));
                    break;
                  }
                } catch (e) {}
                try {
                  if (n.frames[`${e}Locator`]) {
                    t = n;
                    break;
                  }
                } catch (e) {}
                if (n === c.top) break;
                n = n.parent;
              }
              return [t, s];
            })();
            if (!m) return;
            function f(e) {
              return ((e = Object.assign({ version: t }, e)), n.map((t) => [t, e[t]]));
            }
            function g(e, t, n, s) {
              const r = 'function' == typeof e;
              return function (i, c) {
                if ((s && s(), 1 !== a)) {
                  (null == c || c ? t : n)(r ? void 0 : i);
                }
                r && e.apply(this, arguments);
              };
            }
            let h;
            return (
              d
                ? (h = function (t = {}) {
                    return new s.U9((n, s) => {
                      const i = m[e](...f({ ...t, callback: t.callback || a === r ? g(t.callback, n, s) : void 0 }).map(([e, t]) => t));
                      (1 === a || (null == t.callback && 0 === a)) && n(i);
                    });
                  })
                : (c.addEventListener('message', u, !1),
                  (h = function (e, t = !1) {
                    return new s.U9((n, s) => {
                      const r = Math.random().toString(),
                        i = { [o]: { ...Object.fromEntries(f(e).filter(([e]) => 'callback' !== e)), callId: r } };
                      ((l[r] = g(
                        e?.callback,
                        n,
                        s,
                        (t || null == e?.callback) &&
                          (() => {
                            delete l[r];
                          }),
                      )),
                        m.postMessage(i, '*'),
                        1 === a && n());
                    });
                  })),
              Object.assign(h, {
                isDirect: d,
                close() {
                  !d && c.removeEventListener('message', u);
                },
              })
            );
          }
        },
        9099(e, t, n) {
          n.d(t, { Al: () => c });
          var s = n(7413);
          class r {
            cmpApi = null;
            listenerId = void 0;
            setCmpApi(e) {
              this.cmpApi = e;
            }
            getCmpApi() {
              return this.cmpApi;
            }
            setCmpListenerId(e) {
              this.listenerId = e;
            }
            getCmpListenerId() {
              return this.listenerId;
            }
            resetCmpApis() {
              ((this.cmpApi = null), (this.listenerId = void 0));
            }
            getRemoveListenerParams() {
              const e = this.getCmpApi(),
                t = this.getCmpListenerId();
              return e && 'function' == typeof e && null != t
                ? { command: 'removeEventListener', callback: () => this.resetCmpApis(), parameter: t }
                : null;
            }
          }
          class i extends r {
            constructor(e) {
              (super(), (this.getConsentData = e || (() => null)));
            }
            removeCmpEventListener() {
              const e = this.getRemoveListenerParams();
              if (e) {
                const t = this.getConsentData();
                ((e.apiVersion = t?.apiVersion || 2), (0, s.logInfo)('Removing TCF CMP event listener'), this.getCmpApi()(e));
              }
            }
          }
          class a extends r {
            removeCmpEventListener() {
              const e = this.getRemoveListenerParams();
              e && ((0, s.logInfo)('Removing GPP CMP event listener'), this.getCmpApi()(e));
            }
          }
          function c(e, t) {
            switch (e) {
              case 'tcf':
                return new i(t);
              case 'gpp':
                return new a();
              default:
                return ((0, s.logError)(`Unknown CMP type: ${e}`), null);
            }
          }
        },
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [5957],
      {
        1464(e, t, s) {
          function n() {
            const e = new Set();
            return {
              submit(t, s, n) {
                const u = {
                  onResume: s,
                  timerId: setTimeout(() => {
                    (e.delete(u), n());
                  }, t),
                };
                e.add(u);
              },
              resume() {
                for (const t of e) (e.delete(t), clearTimeout(t.timerId), t.onResume());
              },
            };
          }
          s.d(t, { L: () => n });
        },
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [4577],
      {
        8848(n, e, s) {
          function u(n, e, s) {
            return s ? `${n}${e}=${encodeURIComponent(s)}&` : n;
          }
          s.d(e, { v: () => u });
        },
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [467],
      {
        2668(e, n, t) {
          t.d(n, { Fd: () => r, Wz: () => d, mN: () => i });
          var o = t(8848);
          function r(e, n, t, o, r) {
            const a = [];
            return (
              e.forEach((e) => {
                const s = {},
                  i = (o, r, a = 0, i = 0) => {
                    const d = (function (e, n, t, o, r) {
                      return e.getFloor?.({ currency: r, mediaType: n, size: [t, o] }).floor || e.params?.bidfloor || -1;
                    })(n, o, a, i, t);
                    (s[d] || (s[d] = { ...e, bidfloor: d }),
                      s[d][r] || (s[d][r] = 'banner' === o ? { format: [] } : e[o]),
                      'banner' === o && s[d][r].format.push({ w: a, h: i }));
                  };
                (e.banner?.format?.length && e.banner.format.forEach((e) => i('banner', 'bannerTemp', e?.w, e?.h)),
                  i('native', 'nativeTemp'),
                  i('video', 'videoTemp', e.video?.w, e.video?.h),
                  Object.values(s).forEach((n) => {
                    if (
                      ([
                        ['banner', 'bannerTemp'],
                        ['native', 'nativeTemp'],
                        ['video', 'videoTemp'],
                      ].forEach(([e, t]) => {
                        n = (function (e, n, t) {
                          const o = {};
                          for (const r in e)
                            r === n ? Object.prototype.hasOwnProperty.call(e, t) && (o[n] = e[t]) : r !== t && (o[r] = e[r]);
                          return (-1 === o.bidfloor && delete o.bidfloor, o);
                        })(n, e, t);
                      }),
                      n.banner || n.video || n.native)
                    ) {
                      const t = (function () {
                        const e = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                        let n = 0,
                          t = '';
                        for (; n++ < 14; ) t += e.charAt(Math.floor(62 * Math.random()));
                        return t;
                      })();
                      ((o[t] = n.id),
                        (n.id = t),
                        n.banner && 'stx' === r && ((n.banner.pos = e.banner.pos), (n.banner.topframe = e.banner.topframe)),
                        a.push(n));
                    }
                  }));
              }),
              a
            );
          }
          const a = 'https://apps.smartadserver.com',
            s = `${a}/diff/templates/asset/csync.html`,
            i = 'eqt_pid';
          function d(e, n, t, r, d) {
            if (e.iframeEnabled) {
              window.addEventListener('message', function e(n) {
                n.origin === a &&
                  'getConsent' === n.data.action &&
                  (n.source &&
                    n.source.postMessage &&
                    n.source.postMessage({ action: 'consentResponse', id: n.data.id, consents: t.vendorData.vendor.consents }, n.origin),
                  n.data.pid && d.setDataInLocalStorage(i, n.data.pid),
                  this.removeEventListener('message', e));
              });
              let e = (0, o.v)(s + '?', 'nwid', r);
              return ((e = (0, o.v)(e, 'gdpr', t?.gdprApplies ? '1' : '0')), [{ type: 'iframe', url: e }]);
            }
            return [];
          }
        },
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [1912],
      {
        1531(e, t, s) {
          s.d(t, { E0: () => g, kz: () => n, wq: () => p });
          var r = s(8964),
            i = s(7413);
          const n = '1.1';
          function o(e) {
            return !!(
              'object' == typeof e &&
              null !== e &&
              e.advertising_token &&
              e.identity_expires &&
              e.refresh_from &&
              e.refresh_token &&
              e.refresh_expires
            );
          }
          function a(e) {
            return `UID2 shared library - ${e}`;
          }
          function l(e, ...t) {
            e(a(t[0]), ...t.slice(1));
          }
          class c {
            constructor(e, t, s, r) {
              ((this._baseUrl = e.baseUrl), (this._clientVersion = t), (this._logInfo = (...e) => l(s, ...e)), (this._logWarn = r));
            }
            createArrayBuffer(e) {
              const t = new Uint8Array(e.length);
              for (let s = 0; s < e.length; s++) t[s] = e.charCodeAt(s);
              return t;
            }
            hasStatusResponse(e) {
              return 'object' == typeof e && e && e.status;
            }
            isValidRefreshResponse(e) {
              return (
                this.hasStatusResponse(e) &&
                ('optout' === e.status || 'expired_token' === e.status || ('success' === e.status && e.body && o(e.body)))
              );
            }
            ResponseToRefreshResult(e) {
              return this.isValidRefreshResponse(e)
                ? 'success' === e.status
                  ? { status: e.status, identity: e.body }
                  : 'optout' === e.status
                    ? { status: e.status, identity: 'optout' }
                    : e
                : a("Response didn't contain a valid status");
            }
            callRefreshApi(e) {
              const t = this._baseUrl + '/v2/token/refresh';
              let s, i;
              const n = new Promise((e, t) => {
                ((s = e), (i = t));
              });
              return (
                this._logInfo('Sending refresh request', e),
                (0, r.lc)(
                  t,
                  {
                    success: (t) => {
                      try {
                        if (e.refresh_response_key) {
                          this._logInfo('Decrypting refresh API response');
                          const r = this.createArrayBuffer(atob(t));
                          window.crypto.subtle
                            .importKey('raw', this.createArrayBuffer(atob(e.refresh_response_key)), { name: 'AES-GCM' }, !1, ['decrypt'])
                            .then(
                              (e) => {
                                (this._logInfo('Imported decryption key'),
                                  window.crypto.subtle
                                    .decrypt({ name: 'AES-GCM', iv: r.slice(0, 12), tagLength: 128 }, e, r.slice(12))
                                    .then(
                                      (e) => {
                                        const t = String.fromCharCode(...new Uint8Array(e));
                                        this._logInfo('Decrypted to:', t);
                                        const r = JSON.parse(t),
                                          n = this.ResponseToRefreshResult(r);
                                        'string' == typeof n ? i(a(n)) : s(n);
                                      },
                                      (e) => this._logWarn(a('Call to UID2 API failed'), e),
                                    ));
                              },
                              (e) => this._logWarn(a('Call to UID2 API failed'), e),
                            );
                        } else {
                          this._logInfo('No response decryption key available, assuming unencrypted JSON');
                          const e = JSON.parse(t),
                            r = this.ResponseToRefreshResult(e);
                          'string' == typeof r ? i(a(r)) : s(r);
                        }
                      } catch (e) {
                        i(a(t));
                      }
                    },
                    error: (e, t) => {
                      try {
                        this._logInfo('Error status, assuming unencrypted JSON');
                        const e = JSON.parse(t.responseText),
                          r = this.ResponseToRefreshResult(e);
                        'string' == typeof r ? i(a(r)) : s(r);
                      } catch (t) {
                        i(a(e));
                      }
                    },
                  },
                  e.refresh_token,
                  { method: 'POST', customHeaders: { 'X-UID2-Client-Version': this._clientVersion } },
                ),
                n
              );
            }
          }
          class d {
            constructor(e, t, s, r) {
              ((this._storage = e), (this._preferLocalStorage = t), (this._storageName = s), (this._logInfo = (...e) => l(r, ...e)));
            }
            readCookie(e) {
              return this._storage.cookiesAreEnabled() ? this._storage.getCookie(e) : null;
            }
            readLocalStorage(e) {
              return this._storage.localStorageIsEnabled() ? this._storage.getDataFromLocalStorage(e) : null;
            }
            readModuleCookie() {
              return this.parseIfContainsBraces(this.readCookie(this._storageName));
            }
            writeModuleCookie(e) {
              this._storage.setCookie(this._storageName, JSON.stringify(e), Date.now() + 864e5);
            }
            readModuleStorage() {
              return this.parseIfContainsBraces(this.readLocalStorage(this._storageName));
            }
            writeModuleStorage(e) {
              this._storage.setDataInLocalStorage(this._storageName, JSON.stringify(e));
            }
            readProvidedCookie(e) {
              return JSON.parse(this.readCookie(e));
            }
            parseIfContainsBraces(e) {
              return e?.includes('{') ? JSON.parse(e) : e;
            }
            storeValue(e) {
              this._preferLocalStorage ? this.writeModuleStorage(e) : this.writeModuleCookie(e);
            }
            getStoredValueWithFallback() {
              const e = this._preferLocalStorage ? 'local storage' : 'cookie',
                t = (this._preferLocalStorage ? this.readModuleStorage : this.readModuleCookie).bind(this),
                s = (this._preferLocalStorage ? this.writeModuleStorage : this.writeModuleCookie).bind(this),
                r = (this._preferLocalStorage ? this.readModuleCookie : this.readModuleStorage).bind(this),
                i = t();
              if (i) {
                if ('string' == typeof i) {
                  const t = r();
                  if (t && 'object' == typeof t)
                    return (
                      this._logInfo(
                        `${e} contained a basic token, but found a refreshable token fallback. Copying the fallback value to ${e}.`,
                      ),
                      s(t),
                      t
                    );
                }
              } else {
                const t = r();
                if (t)
                  return (
                    this._logInfo(`${e} was empty, but found a fallback value.`),
                    'object' == typeof t && (this._logInfo(`Copying the fallback value to ${e}.`), s(t)),
                    t
                  );
              }
              return i;
            }
          }
          function u(e, t, s, r, i, n) {
            i('UID2 base url provided: ', e);
            return new c({ baseUrl: e }, s, i, n).callRefreshApi(t).then((e) => {
              i('Refresh endpoint responded with:', e);
              const s = { originalToken: t, latestToken: e.identity },
                n = r.getStoredValueWithFallback();
              return (n?.originalIdentity && (s.originalIdentity = n.originalIdentity), r.storeValue(s), s);
            });
          }
          let h;
          {
            const e = 9;
            h = {
              isCSTGOptionsValid(e, t) {
                if ('object' != typeof e || null === e)
                  return (
                    t(
                      'CSTG is not being used, but is included in the Prebid.js bundle. You can reduce the bundle size by passing "--disable UID2_CSTG" to the Prebid.js build.',
                    ),
                    !1
                  );
                const s = e;
                if (!s.serverPublicKey && !s.subscriptionId) return (t('CSTG has been enabled but its parameters have not been set.'), !1);
                if ('string' != typeof s.serverPublicKey) return (t('CSTG opts.serverPublicKey must be a string'), !1);
                const r = /^(UID2|EUID)-X-[A-Z]-.+/;
                return r.test(s.serverPublicKey)
                  ? 'string' != typeof s.subscriptionId
                    ? (t('CSTG opts.subscriptionId must be a string'), !1)
                    : 0 !== s.subscriptionId.length || (t('CSTG opts.subscriptionId is empty'), !1)
                  : (t(`CSTG opts.serverPublicKey must match the regular expression ${r}`), !1);
              },
              getValidIdentity(e, s) {
                if (e.emailHash)
                  return t.isBase64Hash(e.emailHash) ? { email_hash: e.emailHash } : void s('CSTG opts.emailHash is invalid');
                if (e.phoneHash)
                  return t.isBase64Hash(e.phoneHash) ? { phone_hash: e.phoneHash } : void s('CSTG opts.phoneHash is invalid');
                if (e.email) {
                  const r = t.normalizeEmail(e.email);
                  return void 0 === r ? void s('CSTG opts.email is invalid') : { email: r };
                }
                return e.phone ? (t.isNormalizedPhone(e.phone) ? { phone: e.phone } : void s('CSTG opts.phone is invalid')) : void 0;
              },
              isStoredTokenInvalid(e, t, s, r) {
                if (t) {
                  if ('optout' === t.latestToken) return !0;
                  const r = Object.values(e)[0];
                  if (!this.isStoredTokenFromSameIdentity(t, r))
                    return (s('CSTG supplied new identity - ignoring stored value.', t.originalIdentity, e), !0);
                }
                return !1;
              },
              async generateTokenAndStore(e, t, r, i, n, o) {
                n('UID2 cstg opts provided: ', JSON.stringify(t));
                const a = new s({ baseUrl: e, cstg: t }, n, o),
                  l = await a.generateToken(r);
                n('CSTG endpoint responded with:', l);
                const c = { originalIdentity: this.encodeOriginalIdentity(r), latestToken: l.identity };
                return (i.storeValue(c), c);
              },
              isStoredTokenFromSameIdentity: (e, t) =>
                !!e.originalIdentity && (0, i.cyrb53Hash)(t, e.originalIdentity.salt) === e.originalIdentity.identity,
              encodeOriginalIdentity(e) {
                const t = Object.values(e)[0],
                  s = Math.floor(Math.random() * Math.pow(2, 32));
                return { identity: (0, i.cyrb53Hash)(t, s), salt: s };
              },
            };
            class t {
              static EMAIL_EXTENSION_SYMBOL = '+';
              static EMAIL_DOT = '.';
              static GMAIL_DOMAIN = 'gmail.com';
              static isBase64Hash(e) {
                if (!e || 44 !== e.length) return !1;
                try {
                  return btoa(atob(e)) === e;
                } catch (e) {
                  return !1;
                }
              }
              static isNormalizedPhone(e) {
                return /^\+[0-9]{10,15}$/.test(e);
              }
              static normalizeEmail(e) {
                if (!e || !e.length) return;
                const t = e.trim().toLowerCase();
                if (t.indexOf(' ') > 0) return;
                const s = this.splitEmailIntoAddressAndDomain(t);
                if (!s) return;
                const { address: r, domain: i } = s,
                  n = this.isGmail(i),
                  o = this.normalizeAddressPart(r, n, n);
                return o ? `${o}@${i}` : void 0;
              }
              static splitEmailIntoAddressAndDomain(e) {
                const t = e.split('@');
                if (2 === t.length && !t.some((e) => '' === e)) return { address: t[0], domain: t[1] };
              }
              static isGmail(e) {
                return e === this.GMAIL_DOMAIN;
              }
              static dropExtension(e, t = this.EMAIL_EXTENSION_SYMBOL) {
                return e.split(t)[0];
              }
              static normalizeAddressPart(e, t, s) {
                let r = e;
                return (t && (r = r.replaceAll(this.EMAIL_DOT, '')), s && (r = this.dropExtension(r)), r);
              }
            }
            class s {
              constructor(e, t, s) {
                ((this._baseUrl = e.baseUrl),
                  (this._serverPublicKey = e.cstg.serverPublicKey),
                  (this._subscriptionId = e.cstg.subscriptionId),
                  (this._logInfo = (...e) => l(t, ...e)),
                  (this._logWarn = s));
              }
              hasStatusResponse(e) {
                return 'object' == typeof e && e && e.status;
              }
              isCstgApiSuccessResponse(e) {
                return this.hasStatusResponse(e) && 'success' === e.status && o(e.body);
              }
              isCstgApiOptoutResponse(e) {
                return this.hasStatusResponse(e) && 'optout' === e.status;
              }
              isCstgApiClientErrorResponse(e) {
                return this.hasStatusResponse(e) && 'client_error' === e.status && 'string' == typeof e.message;
              }
              isCstgApiForbiddenResponse(e) {
                return this.hasStatusResponse(e) && 'invalid_http_origin' === e.status && 'string' == typeof e.message;
              }
              stripPublicKeyPrefix(t) {
                return t.substring(e);
              }
              async generateCstgRequest(e) {
                if ('email_hash' in e || 'phone_hash' in e) return e;
                if ('email' in e) {
                  return { email_hash: await c.hash(e.email) };
                }
                if ('phone' in e) {
                  return { phone_hash: await c.hash(e.phone) };
                }
              }
              async generateToken(e) {
                const t = await this.generateCstgRequest(e);
                this._logInfo('Building CSTG request for', t);
                const s = await n.build(this.stripPublicKeyPrefix(this._serverPublicKey)),
                  r = new TextEncoder(),
                  i = Date.now(),
                  { iv: o, ciphertext: a } = await s.encrypt(r.encode(JSON.stringify(t)), r.encode(JSON.stringify([i]))),
                  l = await c.exportPublicKey(s.clientPublicKey),
                  d = {
                    payload: c.bytesToBase64(new Uint8Array(a)),
                    iv: c.bytesToBase64(new Uint8Array(o)),
                    public_key: c.bytesToBase64(new Uint8Array(l)),
                    timestamp: i,
                    subscription_id: this._subscriptionId,
                  };
                return this.callCstgApi(d, s);
              }
              async callCstgApi(e, t) {
                const s = this._baseUrl + '/v2/token/client-generate';
                let i, n;
                const o = new Promise((e, t) => {
                  ((i = e), (n = t));
                });
                return (
                  this._logInfo('Sending CSTG request', e),
                  (0, r.lc)(
                    s,
                    {
                      success: async (e, s) => {
                        try {
                          const s = c.base64ToBytes(e),
                            r = await t.decrypt(s.slice(0, 12), s.slice(12)),
                            o = new TextDecoder().decode(r),
                            l = JSON.parse(o);
                          this.isCstgApiSuccessResponse(l)
                            ? i({ status: 'success', identity: l.body })
                            : this.isCstgApiOptoutResponse(l)
                              ? i({ status: 'optout', identity: 'optout' })
                              : n(a(`API error: Response body was invalid for HTTP status 200: ${o}`));
                        } catch (e) {
                          n(a(e));
                        }
                      },
                      error: (e, t) => {
                        try {
                          if (400 === t.status) {
                            const e = JSON.parse(t.responseText);
                            this.isCstgApiClientErrorResponse(e)
                              ? n(a(`Client error: ${e.message}`))
                              : n(a(`UID2 API error: Response body was invalid for HTTP status 400: ${t.responseText}`));
                          } else if (403 === t.status) {
                            const e = JSON.parse(t.responseText);
                            this.isCstgApiForbiddenResponse(t)
                              ? n(a(`Forbidden: ${e.message}`))
                              : n(a(`UID2 API error: Response body was invalid for HTTP status 403: ${t.responseText}`));
                          } else n(a(`UID2 API error: Unexpected HTTP status ${t.status}: ${e}`));
                        } catch (t) {
                          n(a(e));
                        }
                      },
                    },
                    JSON.stringify(e),
                    { method: 'POST' },
                  ),
                  o
                );
              }
            }
            class n {
              static _namedCurve = 'P-256';
              constructor(e, t) {
                ((this._clientPublicKey = e), (this._sharedKey = t));
              }
              static async build(e) {
                const t = await c.generateKeyPair(n._namedCurve),
                  s = await c.importPublicKey(e, this._namedCurve),
                  r = await c.deriveKey(s, t.privateKey);
                return new n(t.publicKey, r);
              }
              async encrypt(e, t) {
                const s = window.crypto.getRandomValues(new Uint8Array(12));
                return {
                  iv: s,
                  ciphertext: await window.crypto.subtle.encrypt({ name: 'AES-GCM', iv: s, additionalData: t }, this._sharedKey, e),
                };
              }
              async decrypt(e, t) {
                return window.crypto.subtle.decrypt({ name: 'AES-GCM', iv: e }, this._sharedKey, t);
              }
              get clientPublicKey() {
                return this._clientPublicKey;
              }
            }
            class c {
              static base64ToBytes(e) {
                const t = atob(e);
                return Uint8Array.from(t, (e) => e.codePointAt(0));
              }
              static bytesToBase64(e) {
                const t = Array.from(e, (e) => String.fromCodePoint(e)).join('');
                return btoa(t);
              }
              static async generateKeyPair(e) {
                const t = { name: 'ECDH', namedCurve: e };
                return window.crypto.subtle.generateKey(t, !1, ['deriveKey']);
              }
              static async importPublicKey(e, t) {
                const s = { name: 'ECDH', namedCurve: t };
                return window.crypto.subtle.importKey('spki', this.base64ToBytes(e), s, !1, []);
              }
              static exportPublicKey(e) {
                return window.crypto.subtle.exportKey('spki', e);
              }
              static async deriveKey(e, t) {
                return window.crypto.subtle.deriveKey({ name: 'ECDH', public: e }, t, { name: 'AES-GCM', length: 256 }, !1, [
                  'encrypt',
                  'decrypt',
                ]);
              }
              static async hash(e) {
                const t = await window.crypto.subtle.digest('SHA-256', new TextEncoder().encode(e));
                return this.bytesToBase64(new Uint8Array(t));
              }
            }
          }
          function p(e, t, s, r) {
            const n = (...e) => l(s, ...e);
            let o = null;
            const a = 'cookie' !== e.storage,
              c = new d(t, a, e.internalStorage, n);
            n(`Module is using ${a ? 'local storage' : 'cookies'} for internal storage.`);
            const p = h && h.isCSTGOptionsValid(e.cstg, r);
            p
              ? (n('Module is using client-side token generation.'), (o = null))
              : e.paramToken
                ? ((o = e.paramToken), n('Read token from params', o))
                : e.serverCookieName && ((o = c.readProvidedCookie(e.serverCookieName)), n('Read token from server-supplied cookie', o));
            let g = c.getStoredValueWithFallback();
            if ((n('Loaded module-stored tokens:', g), g && 'string' == typeof g)) {
              if (!o && !p) return (n('Returning legacy cookie value.'), { id: g });
              (n('Discarding superseded legacy cookie.'), (g = null));
            }
            if (
              (o &&
                g &&
                g.originalToken?.advertising_token !== o.advertising_token &&
                (n('Server supplied new token - ignoring stored value.', g.originalToken?.advertising_token, o.advertising_token),
                (g = null)),
              p)
            ) {
              const t = h.getValidIdentity(e.cstg, r);
              if (t && (g && h.isStoredTokenInvalid(t, g, n, r) && (g = null), !g || Date.now() > g.latestToken.refresh_expires)) {
                const s = h.generateTokenAndStore(e.apiBaseUrl, e.cstg, t, c, n, r);
                return (
                  n('Generate token using CSTG'),
                  {
                    callback: (e) => {
                      s.then((t) => {
                        (n('Token generation responded, passing the new token on.', t), e(t));
                      }).catch((e) => {
                        (0, i.logError)('error generating token: ', e);
                      });
                    },
                  }
                );
              }
            }
            const y = !g?.latestToken || (o && o.identity_expires > g.latestToken.identity_expires),
              f = y ? o : g.latestToken;
            if ((n('UID2 module selected latest token', y, f), !f || Date.now() > f.refresh_expires))
              return (n('Newest available token is expired and not refreshable.'), { id: null });
            if (Date.now() > f.identity_expires) {
              const t = u(e.apiBaseUrl, f, e.clientId, c, n, r);
              return (
                n('Token is expired but can be refreshed, attempting refresh.'),
                {
                  callback: (e) => {
                    t.then((t) => {
                      (n('Refresh reponded, passing the updated token on.', t), e(t));
                    }).catch((e) => {
                      (0, i.logError)('error refreshing token: ', e);
                    });
                  },
                }
              );
            }
            const b = { originalToken: o ?? g?.originalToken, latestToken: f };
            if ((p && (b.originalIdentity = g?.originalIdentity), c.storeValue(b), Date.now() > f.refresh_from)) {
              n('Refreshing token in background with low priority.');
              const t = u(e.apiBaseUrl, f, e.clientId, c, n, r);
              return {
                id: b,
                callback: (e) => {
                  t.then((t) => {
                    (n('Background token refresh completed, updating ID.', t), e(t));
                  }).catch((e) => {
                    (0, i.logError)('error refreshing token in background: ', e);
                  });
                },
              };
            }
            return { id: b };
          }
          function g(e) {
            const t = ['emailHash', 'phoneHash', 'email', 'phone'];
            for (const s of t) if (e.hasOwnProperty(s)) return { [s]: e[s] };
            return {};
          }
        },
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [3005],
      {
        828(t, e, n) {
          n.d(e, { eu: () => r, p: () => u });
          var a = n(7850),
            i = n(7413),
            s = n(8928);
          const l = new Map();
          function u(t) {
            if (l.has(t)) return l.get(t);
            const e = (function (t) {
              let e;
              return (
                (0, i.isGptPubadsDefined)() &&
                  (e = window.googletag
                    .pubads()
                    .getSlots()
                    .find((e) => (0, i.isAdUnitCodeMatchingSlot)(e)(t))),
                e
              );
            })(t);
            let n = {};
            return (e && (n = { gptSlot: e.getAdUnitPath(), divId: e.getSlotElementId() }), !(0, i.isEmpty)(n) && l.set(t, n), n);
          }
          const o = ['IAB_AUDIENCE_1_1', 'IAB_CONTENT_2_2'];
          function r(t) {
            return Object.entries({
              [o[0]]: d(t, ['user.data'], 4),
              [o[1]]: d(
                t,
                a.Dy.map((t) => `${t}.content.data`),
                6,
              ),
            })
              .map(([t, e]) => (e.length ? { taxonomy: t, values: e } : null))
              .filter((t) => t);
          }
          function d(t, e, n) {
            return e
              .flatMap((e) => (0, s.A)(t, e) || [])
              .filter((t) => t.ext?.segtax === n)
              .flatMap((t) => t.segment?.map((t) => t.id))
              .filter((t) => t)
              .filter(i.uniques);
          }
        },
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [41],
      {
        7916(e, r, n) {
          n.d(r, { A: () => i });
          function i() {
            let e, r;
            return {
              parse: function (r) {
                return (e || (e = new DOMParser()), e).parseFromString(r, 'application/xml');
              },
              serialize: function (e) {
                return (r || (r = new XMLSerializer()), r).serializeToString(e);
              },
            };
          }
        },
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [7650],
      {
        4374(t, n, e) {
          e.d(n, { Mu: () => o, P8: () => p, QS: () => d });
          var s = e(1068);
          const o = { env: 'vp', gdfp_req: 1, output: 'vast', unviewed_position_start: 1 },
            p = { protocol: 'https', host: 'securepubads.g.doubleclick.net', pathname: '/gampad/ads' };
          function d() {
            const t = s.mW.getConsentData(),
              n = {};
            return (
              t &&
                ('boolean' == typeof t.gdprApplies && (n.gdpr = Number(t.gdprApplies)),
                t.consentString && (n.gdpr_consent = t.consentString),
                t.addtlConsent && (n.addtl_consent = t.addtlConsent)),
              n
            );
          }
        },
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [7045],
      {
        7900(e, t, r) {
          r.d(t, { M: () => n });
          const n = {
            tdid: {
              source: 'adserver.org',
              atype: 1,
              getValue: function (e) {
                return e.id ? e.id : e;
              },
              getUidExt: function (e) {
                return { rtiPartner: 'TDID', ...e.ext };
              },
            },
          };
        },
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [4950],
      {
        9582(e, t, u) {
          u.d(t, { x: () => n });
          const n = {
            uid2: {
              source: 'uidapi.com',
              atype: 3,
              getValue: function (e) {
                return e.id;
              },
              getUidExt: function (e) {
                if (e.ext) return e.ext;
              },
            },
          };
        },
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [5024],
      {
        1515(e, t, i) {
          (i.r(t), i.d(t, { liveIntentIdSubmodule: () => S, reset: () => M, setEventFiredFlag: () => T, storage: () => w }));
          var n = i(7413),
            r = i(8964),
            o = i(1068),
            d = i(1785),
            u = i(4228),
            a = i(2354),
            s = i(7449),
            c = i(7900),
            l = i(9582),
            p = i(7686),
            f = i(3350);
          const x = 'liveIntentId',
            g = 'liveintent.com',
            v = { nonId: !0 };
          function m(e) {
            function t(e) {
              return Object.entries(e).flatMap(([e, t]) => ('boolean' == typeof t && t ? [e] : []));
            }
            return t('object' == typeof e ? { ...v, ...e } : v);
          }
          function b(e) {
            const t = {},
              i = e.nonId || e.unifiedId;
            return (
              (t.lipb = i ? { ...e, lipbid: i } : e),
              delete t.lipb?.unifiedId,
              e.uid2 && (t.uid2 = { id: e.uid2, ext: { provider: g } }),
              e.bidswitch && (t.bidswitch = { id: e.bidswitch, ext: { provider: g } }),
              e.triplelift && (t.triplelift = { id: e.triplelift, ext: { provider: g } }),
              e.zetassp && (t.zetassp = { id: e.zetassp, ext: { provider: g } }),
              e.medianet && (t.medianet = { id: e.medianet, ext: { provider: g } }),
              e.magnite && (t.magnite = { id: e.magnite, ext: { provider: g } }),
              e.index && (t.index = { id: e.index, ext: { provider: g } }),
              e.openx && (t.openx = { id: e.openx, ext: { provider: g } }),
              e.pubmatic && (t.pubmatic = { id: e.pubmatic, ext: { provider: g } }),
              e.sovrn && (t.sovrn = { id: e.sovrn, ext: { provider: g } }),
              e.thetradedesk &&
                ((t.lipb = { ...t.lipb, tdid: e.thetradedesk }),
                (t.tdid = { id: e.thetradedesk, ext: { rtiPartner: 'TDID', provider: (0, p.EN)().domain || g } }),
                delete t.lipb.thetradedesk),
              e.sharethrough && (t.sharethrough = { id: e.sharethrough, ext: { provider: g } }),
              e.sonobi && (t.sonobi = { id: e.sonobi, ext: { provider: g } }),
              e.vidazoo && (t.vidazoo = { id: e.vidazoo, ext: { provider: g } }),
              e.nexxen && (t.nexxen = { id: e.nexxen, ext: { provider: g } }),
              t
            );
          }
          function h(e) {
            if (void 0 === window.liModuleEnabled && e.activatePartialTreatment) {
              const e = (0, f.Et)(window.liTreatmentRate) ? window.liTreatmentRate : 0.95;
              ((window.liModuleEnabled = Math.random() < e), (window.liTreatmentRate = e));
            }
          }
          const y = {
              ...c.M,
              tdid: { ...c.M.tdid, matcher: g },
              ...l.x,
              lipb: {
                getValue: function (e) {
                  return e.lipbid;
                },
                source: 'liveintent.com',
                atype: 3,
                getEidExt: function (e) {
                  if (Array.isArray(e.segments) && e.segments.length) return { segments: e.segments };
                },
              },
              bidswitch: {
                source: 'bidswitch.net',
                atype: 3,
                getValue: function (e) {
                  return e.id;
                },
                getUidExt: function (e) {
                  if (e.ext) return e.ext;
                },
              },
              medianet: {
                source: 'media.net',
                atype: 3,
                getValue: function (e) {
                  return e.id;
                },
                getUidExt: function (e) {
                  if (e.ext) return e.ext;
                },
              },
              magnite: {
                source: 'rubiconproject.com',
                atype: 3,
                getValue: function (e) {
                  return e.id;
                },
                getUidExt: function (e) {
                  if (e.ext) return e.ext;
                },
              },
              index: {
                source: 'liveintent.indexexchange.com',
                atype: 3,
                getValue: function (e) {
                  return e.id;
                },
                getUidExt: function (e) {
                  if (e.ext) return e.ext;
                },
              },
              openx: {
                source: 'openx.net',
                atype: 3,
                getValue: function (e) {
                  return e.id;
                },
                getUidExt: function (e) {
                  if (e.ext) return e.ext;
                },
              },
              pubmatic: {
                source: 'pubmatic.com',
                atype: 3,
                getValue: function (e) {
                  return e.id;
                },
                getUidExt: function (e) {
                  if (e.ext) return e.ext;
                },
              },
              sovrn: {
                source: 'liveintent.sovrn.com',
                atype: 3,
                getValue: function (e) {
                  return e.id;
                },
                getUidExt: function (e) {
                  if (e.ext) return e.ext;
                },
              },
              fpid: {
                source: 'fpid.liveintent.com',
                atype: 1,
                getValue: function (e) {
                  return e.id;
                },
              },
              sharethrough: {
                source: 'sharethrough.com',
                atype: 3,
                getValue: function (e) {
                  return e.id;
                },
                getUidExt: function (e) {
                  if (e.ext) return e.ext;
                },
              },
              sonobi: {
                source: 'liveintent.sonobi.com',
                atype: 3,
                getValue: function (e) {
                  return e.id;
                },
                getUidExt: function (e) {
                  if (e.ext) return e.ext;
                },
              },
              triplelift: {
                source: 'liveintent.triplelift.com',
                atype: 3,
                getValue: function (e) {
                  return e.id;
                },
                getUidExt: function (e) {
                  if (e.ext) return e.ext;
                },
              },
              zetassp: {
                source: 'zeta-ssp.liveintent.com',
                atype: 3,
                getValue: function (e) {
                  return e.id;
                },
                getUidExt: function (e) {
                  if (e.ext) return e.ext;
                },
              },
              vidazoo: {
                source: 'liveintent.vidazoo.com',
                atype: 3,
                getValue: function (e) {
                  return e.id;
                },
                getUidExt: function (e) {
                  if (e.ext) return e.ext;
                },
              },
              nexxen: {
                source: 'liveintent.unrulymedia.com',
                atype: 3,
                getValue: function (e) {
                  return e.id;
                },
                getUidExt: function (e) {
                  if (e.ext) return e.ext;
                },
              },
            },
            E = 'pre_lips',
            w = (0, a.vM)({ moduleType: s.fW, moduleName: x }),
            I = {
              ajaxGet: (e, t, i, n, o) => {
                (0, r.er)(s.fW, x, n)(e, { success: t, error: i }, void 0, { method: 'GET', withCredentials: !0, customHeaders: o });
              },
              pixelGet: (e, t) => (0, n.triggerPixel)(e, t),
            };
          let U = !1,
            V = null;
          function M() {
            (window && window.liQ_instances && (window.liQ_instances.forEach((e) => e.eventBus.off(E, T)), (window.liQ_instances = [])),
              S.setModuleMode(null),
              (U = !1),
              (V = null));
          }
          function T() {
            U = !0;
          }
          function z(e) {
            if (V) return V;
            const t = {
              publisherId: (e = e || {}).publisherId || 'any',
              requestedAttributes: m(e.requestedAttributesOverrides),
              extraAttributes: { ipv4: e.ipv4, ipv6: e.ipv6 },
            };
            (e.url && (t.url = e.url), (t.ajaxTimeout = e.ajaxTimeout || 5e3));
            const i = (function (e) {
              const t = {};
              return (
                (e = e || {}).appId && (t.appId = e.appId),
                e.fpiStorageStrategy && (t.storageStrategy = e.fpiStorageStrategy),
                e.fpiExpirationDays && (t.expirationDays = e.fpiExpirationDays),
                e.collectorUrl && (t.collectorUrl = e.collectorUrl),
                (t.ajaxTimeout = e.ajaxTimeout || 5e3),
                t
              );
            })(e.liCollectConfig);
            (!i.appId && e.distributorId
              ? ((i.distributorId = e.distributorId), (t.source = e.distributorId))
              : (t.source = e.partner || 'prebid'),
              (i.wrapperName = 'prebid'),
              (i.trackerVersion = '11.23.0'),
              (i.identityResolutionConfig = t),
              (i.identifiersToResolve = e.identifiersToResolve || []),
              (i.fireEventDelay = e.fireEventDelay));
            const n = o.t6.getConsentData();
            n && (i.usPrivacyString = n);
            const r = o.mW.getConsentData();
            r && ((i.gdprApplies = r.gdprApplies), (i.gdprConsent = r.consentString));
            const d = o.ad.getConsentData();
            (d && ((i.gppString = d.gppString), (i.gppApplicableSections = d.applicableSections)), (V = S.getInitializer()(i, w, I)));
            const u = (function (e) {
              const t = {};
              let i = !1;
              if (
                ('string' == typeof e.emailHash && ((i = !0), (t.emailHash = e.emailHash)),
                'string' == typeof e.ipv4 && ((i = !0), (t.ipv4 = e.ipv4)),
                'string' == typeof e.ipv6 && ((i = !0), (t.ipv6 = e.ipv6)),
                'string' == typeof e.userAgent && ((i = !0), (t.userAgent = e.userAgent)),
                i)
              )
                return t;
            })(e);
            return (null != u && V.push(u), V);
          }
          function D() {
            if (!U && V) {
              const e = V.config.fireEventDelay || 500;
              setTimeout(() => {
                (window.liQ_instances.forEach((e) => e.eventBus.once(E, T)), !U && V && V.fire());
              }, e);
            }
          }
          const S = {
            moduleMode: 'standard',
            name: x,
            gvlid: 148,
            setModuleMode(e) {
              this.moduleMode = e;
            },
            getInitializer() {
              return (e, t, i) => (0, u.DQ)(e, t, i, this.moduleMode);
            },
            decode(e, t) {
              const i = (t && t.params) || {};
              return (
                h(i),
                V || z(i),
                D(),
                (function (e, t) {
                  return t.activatePartialTreatment ? (window.liModuleEnabled ? b(e) : {}) : b(e);
                })(e, i)
              );
            },
            getId(e) {
              const t = (e && e.params) || {};
              h(t);
              const i = z(t);
              if (!i) return;
              D();
              return {
                callback: function (e) {
                  i.resolve(
                    (t) => {
                      e(t);
                    },
                    (t) => {
                      ((0, n.logError)(`${x}: ID fetch encountered an error: `, t), e());
                    },
                  );
                },
              };
            },
            primaryIds: ['libp'],
            eids: y,
          };
          (0, d.bz)('userId', S);
        },
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [2316],
      {
        2542(e, n, t) {
          t.d(n, { G: () => l });
          var s = t(8224);
          const u = new Map();
          function l(e) {
            let n;
            return (u.has(e) ? (n = u.get(e)) : ((n = e.getBoundingClientRect()), u.set(e, n)), n);
          }
          s.gH.before((e, n) => {
            (u.clear(), e(n));
          });
        },
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [1961],
      {
        6471(e, n, t) {
          t.d(n, { B8: () => c, RW: () => a, Up: () => d, eP: () => u });
          var r = t(7413),
            i = t(8928),
            o = t(3350);
          function a(e = [], n) {
            return e.filter((e) => Object.entries(n).every(([n, t]) => e[n] === t));
          }
          function u(e) {
            return (0, r._map)(e, (e, n) =>
              void 0 === e ? n + '=' : ((0, o.Qd)(e) && (e = JSON.stringify(e)), n + '=' + encodeURIComponent(e)),
            ).join('&');
          }
          function d(e, n, t = !1) {
            if ('object' != typeof e || null === e) return {};
            const r = {};
            return (
              n.forEach((o, a) => {
                if ('function' == typeof o) return;
                let u,
                  d,
                  [c, l] = o.split(/\sas\s/i);
                ((c = c.trim()),
                  (d = l?.trim() || c.split('.').pop()),
                  (u = (0, i.A)(e, c)),
                  'function' == typeof n[a + 1] && (u = n[a + 1](u, r, e)),
                  (void 0 === u && t) || (r[d] = u));
              }),
              r
            );
          }
          function c(e) {
            try {
              return e || window.top.document.referrer;
            } catch (e) {
              return document.referrer;
            }
          }
        },
        7172(e, n, t) {
          t.d(n, { Fk: () => l });
          var r = t(6471),
            i = t(7413),
            o = t(3350),
            a = t(7559),
            u = t(8964),
            d = t(7686),
            c = t(1129);
          function l(e, n = void 0, t = !0) {
            const {
                name: u,
                cid: l,
                value: p,
                relatedData: f,
                logData: m,
                project: v,
              } = (0, o.Qd)(e) ? { ...e, logData: n } : { name: e, relatedData: n },
              b = a.dO.refererInfo || (0, d.EN)(),
              g = Object.assign(
                {},
                {
                  logid: 'kfk',
                  evtid: a.lp.PROJECT_EVENTS,
                  project: v || (t ? 'prebidanalytics' : 'prebid'),
                  dn: b.domain || '',
                  requrl: b.topmostLocation || '',
                  pbav: (0, c.m)().medianetGlobals.analyticsEnabled ? a.uI : '',
                  pbver: a.MQ,
                  cid: l || a.dO.configuration.cid || '',
                  event: u || '',
                  value: p || '',
                  rd: f || '',
                },
                m,
              ),
              j = t ? a.ki : a.nn,
              h = t ? (0, r.eP)(g) : (0, i.formatQS)(g);
            function y() {
              return j + '?' + h;
            }
            return {
              send: function () {
                if (!t) return void s(j, h, (0, r.Up)(g, ['cid', 'project', 'name as value']));
                const e = y();
                (a.dO.errorQueue.push(e), (0, i.triggerPixel)(e));
              },
              getUrl: y,
            };
          }
          function s(e, n, t = {}) {
            (0, u.lc)(
              e,
              { success: () => {}, error: (e, { reason: n }) => l(Object.assign(t, { name: 'ajax_log_failed', relatedData: n })).send() },
              n,
              { method: 'POST' },
            );
          }
        },
        7559(e, n, t) {
          t.d(n, { AS: () => d, MQ: () => u, P6: () => c, dO: () => r, ki: () => i, lp: () => p, nn: () => o, uI: () => a });
          const r = {
              auctions: {},
              infoByAdIdMap: {},
              bdpMap: {},
              configuration: {},
              logsQueue: [],
              errorQueue: [],
              eventQueue: null,
              refererInfo: null,
              initialized: !1,
            },
            i = 'https://qsearch-a.akamaihd.net/log',
            o = 'https://navvy.media.net/log',
            a = '2.0.0',
            u = '11.23.0',
            d = 'medianet',
            c = 142,
            l = 'APPR',
            s = 'RA',
            p = { [s]: 'pba_aw', [l]: 'prebid_analytics_events_client', PROJECT_EVENTS: 'projectevents' };
        },
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [8139],
      {
        4338(u, e, h) {
          function n(u) {
            return u.reduce((u, e) => (e.h * e.w < u.h * u.w ? e : u));
          }
          h.d(e, { M$: () => n });
        },
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [9147],
      {
        191(e, r, n) {
          function u(e) {
            return e?.ortb2?.ext?.prebid?.adServerCurrency;
          }
          n.d(r, { b: () => u });
        },
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [2068],
      {
        5931(e, t, r) {
          r.d(t, { FW: () => w, FY: () => f, M2: () => b, k6: () => v, kD: () => x, xO: () => I, yY: () => g });
          var d = r(7413),
            o = r(8928),
            n = r(3435),
            a = r(6901),
            i = r(8384),
            s = r(191),
            l = r(7791),
            u = r(1779);
          let c = null;
          let p = '',
            m = 0;
          const x = (e, t, r, o) => () => {
            if (!e.localStorageIsEnabled()) return ((0, d.logInfo)(`localstorage not enabled for ${t}`), null);
            const n = e.getDataFromLocalStorage(r);
            if (null === n) {
              const t = { [o]: (0, d.generateUUID)() };
              return (e.setDataInLocalStorage(r, JSON.stringify(t)), t);
            }
            try {
              return JSON.parse(n);
            } catch (e) {
              return ((0, d.logInfo)(`failed to parse localstorage for ${t}:`, e), null);
            }
          };
          function g(e, t, r, d) {
            return 'object' == typeof t &&
              null != t &&
              t.length > 0 &&
              t[0].hasOwnProperty('body') &&
              t[0].body.hasOwnProperty('ext') &&
              t[0].body.ext.hasOwnProperty('cookies') &&
              'object' == typeof t[0].body.ext.cookies
              ? t[0].body.ext.cookies.slice(0, 5)
              : [];
          }
          const h = ({ requestId: e, vastXml: t, divId: r, width: o, height: n }) => {
              if (!t) return void (0, d.logInfo)('No VAST in bidResponse');
              const i = {
                  id: e,
                  url: 'https://acdn.adnxs.com/video/outstream/ANOutstreamVideo.js',
                  loaded: !1,
                  adUnitCode: r,
                  targetId: r,
                },
                s = a.A4.install(i);
              return (
                s.setRender(
                  ((e, t, r) => (d) => {
                    d.renderer.push(() => {
                      window.ANOutstreamVideo.renderAd({
                        sizes: [t, r],
                        targetId: e,
                        adResponse: d.vastXml,
                        rendererOptions: {
                          showBigPlayButton: !1,
                          showProgressBar: 'bar',
                          showVolume: !1,
                          allowFullscreen: !0,
                          skippable: !1,
                          content: d.vastXml,
                        },
                      });
                    });
                  })(r, o, n),
                ),
                s
              );
            },
            b = (e, t) => {
              ((0, n.J)(e, 'tagid', t.adUnitCode), (0, n.J)(e, 'ext.adUnitCode', t.adUnitCode));
              const r = t.params.divId || t.adUnitCode;
              if (((0, n.J)(e, 'ext.divId', r), e.video)) {
                const r = (0, o.A)(t, 'mediaTypes.video.playerSize'),
                  d = (0, o.A)(t, 'mediaTypes.video.context');
                ((0, n.J)(e, 'video.ext.playerSize', r), (0, n.J)(e, 'video.ext.context', d));
              }
              return e;
            },
            f = (e, t, r, o) => (
              t &&
                ((0, n.J)(e, 'ext.localStorage.amxId', t),
                e.user || (e.user = {}),
                e.user.ext || (e.user.ext = {}),
                e.user.ext.eids || (e.user.ext.eids = []),
                e.user.ext.eids.push({ source: 'amxdt.net', uids: [{ id: `${t}`, atype: 1 }] })),
              (0, n.J)(e, 'ext.version', '11.23.0'),
              (0, n.J)(e, 'ext.source', 'prebid.js'),
              (0, n.J)(e, 'ext.pageViewId', r),
              (0, n.J)(e, 'ext.bidderVersion', o),
              (0, n.J)(
                e,
                'ext.sessionId',
                (() => {
                  if (c) return c;
                  const e = (0, d.generateUUID)();
                  return ((c = e), e);
                })(),
              ),
              (0, n.J)(e, 'ext.requestCounter', p === window.location.pathname ? ++m : ((p = window.location.pathname), 0)),
              (0, n.J)(e, 'cur', [(0, s.b)(e) || 'USD']),
              e.user || (e.user = {}),
              e
            );
          function y(e, t) {
            let r = u.D4;
            ([l.mn, l.H6].includes(e.ext.mediaType) && (r = u.G_), e.ext.mediaType === u.s6 && (r = u.s6));
            const o = {
              requestId: e.impid,
              cpm: e.price,
              width: e.w,
              height: e.h,
              creativeId: e.crid,
              currency: t.cur,
              netRevenue: !0,
              ttl: 120,
              mediaType: r,
              meta: { advertiserDomains: e.adomain, demandSource: e.ext.ssp },
            };
            if (
              (e.dealid && (o.dealid = e.dealid),
              e.ext.mediaType === u.D4 && (o.ad = e.adm),
              [l.mn, l.H6].includes(e.ext.mediaType) && (o.vastXml = e.adm),
              e.ext.mediaType === l.H6 && (e.ext.divId || e.ext.adUnitCode))
            ) {
              const t = h({
                requestId: o.requestId,
                vastXml: o.vastXml,
                divId: e.ext.divId || e.ext.adUnitCode,
                width: o.width,
                height: o.height,
              });
              t ? ((o.renderer = t), (o.divId = e.ext.divId)) : (0, d.logInfo)('Could not create renderer for outstream bid');
            }
            if (e.ext.mediaType === u.s6)
              try {
                o.native = { ortb: JSON.parse(e.adm) };
              } catch (e) {}
            return o;
          }
          const I = (e) => {
              if (!e.body) return [];
              const t = e.body;
              if (!t.seatbid || 0 === t.seatbid.length) return [];
              const r = [];
              for (let e = 0; e < t.seatbid.length; e++) {
                const d = t.seatbid[e];
                for (let e = 0; e < d.bid.length; e++) {
                  const o = y(d.bid[e], t);
                  r.push(o);
                }
              }
              return r;
            },
            v = (e, t) => {
              if (!e.localStorageIsEnabled()) return ((0, d.logInfo)(`localstorage not enabled for ${t}`), null);
              return e.getDataFromLocalStorage('__amuidpb') || null;
            },
            w = (e, t = !0) => {
              if ('1' === (0, d.getParameterByName)('nexx360_debug')) return !1;
              const r = i.$W.getBidderConfig(),
                o = r[e]?.gzipEnabled;
              return !0 === o || 'true' === o || (!1 !== o && 'false' !== o && t);
            };
        },
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [5889],
      {
        7886(r, n, e) {
          e.d(n, { GR: () => g });
          var t = e(7413),
            s = e(8928),
            o = e(3435);
          const u = [
            'device.sua',
            'source.schain',
            'regs.gdpr',
            'regs.us_privacy',
            'regs.gpp',
            'regs.gpp_sid',
            'user.consent',
            'user.eids',
          ];
          function c(r) {
            const n = r.split('.'),
              e = n.pop();
            return [n.join('.'), e];
          }
          function i(r, n) {
            return `${r}.ext.${n}`;
          }
          function a(r, n) {
            const [e, t] = c(r);
            if ('ext' !== t) throw new Error('invalid argument');
            return `${e}.${n}`;
          }
          function p(r, n) {
            const [e, t] = c(r);
            return (
              (n = n(e, t)),
              (r) => {
                const u = (0, s.A)(r, e);
                if (null != u?.[t]) return ((0, o.J)(r, n, u[t]), () => delete u[t]);
              }
            );
          }
          const f = Object.freeze([
              ...u.map((r) => p(r, i)),
              ...['app', 'content', 'site', 'user'].map(function (r) {
                return (n) => {
                  const e = n[r]?.kwarray;
                  if (null != e) {
                    const t = (n[r].keywords || '').split(',');
                    return (Array.isArray(e) && t.push(...e), (n[r].keywords = t.join(',')), () => delete n[r].kwarray);
                  }
                };
              }),
            ]),
            l = Object.freeze([...u.map((r) => p(i(...c(r)), a))]);
          function d(r = !0, n = f) {
            return function (e) {
              return (
                n.forEach((n) => {
                  try {
                    const t = n(e);
                    'function' == typeof t && r && t();
                  } catch (r) {
                    (0, t.logError)('Error translating request to ORTB 2.5', r);
                  }
                }),
                e
              );
            };
          }
          const g = d();
          d(!0, l);
        },
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [1225],
      {
        9343(r, n, t) {
          t.d(n, { hZ: () => u });
          var e = t(1129);
          function u(r, n, t, u = !0) {
            if (n === t) return r;
            let h = r;
            try {
              h = (0, e.m)().convertCurrency(r, n, t);
            } catch (r) {
              if (!u) throw r;
            }
            return h;
          }
        },
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [259],
      {
        3119(n, e, t) {
          function a() {
            const n =
              'undefined' != typeof window && window.navigator ? window.navigator : 'undefined' != typeof navigator ? navigator : null;
            return (n && (n.connection || n.mozConnection || n.webkitConnection)) || null;
          }
          function o() {
            const n = (function () {
              const n = a();
              return n
                ? {
                    type: n.type ?? null,
                    effectiveType: n.effectiveType ?? null,
                    downlink: 'number' == typeof n.downlink ? n.downlink : null,
                    downlinkMax: 'number' == typeof n.downlinkMax ? n.downlinkMax : null,
                    rtt: 'number' == typeof n.rtt ? n.rtt : null,
                    saveData: 'boolean' == typeof n.saveData ? n.saveData : null,
                    bandwidth: 'number' == typeof n.bandwidth ? n.bandwidth : null,
                  }
                : null;
            })();
            if (!n) return 0;
            switch (n.type) {
              case 'ethernet':
                return 1;
              case 'wifi':
                return 2;
              case 'wimax':
                return 6;
              default:
                switch (n.effectiveType) {
                  case 'slow-2g':
                  case '2g':
                    return 4;
                  case '3g':
                    return 5;
                  case '4g':
                    return 6;
                  case '5g':
                    return 7;
                  default:
                    return 'cellular' === n.type ? 3 : 0;
                }
            }
          }
          t.d(e, { Z: () => o });
        },
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [4472],
      {
        118(t, e, n) {
          n.d(e, { gl: () => a, tF: () => m });
          var o = n(7413),
            i = n(8378),
            r = n(2542),
            l = n(8203),
            h = n(8224),
            u = n(5262);
          function c(t, { w: e, h: n }) {
            let { width: o, height: i, left: r, top: l, right: h, bottom: u, x: c, y: f } = t;
            return (
              (0 === o || 0 === i) && e && n && ((o = e), (i = n), (h = r + e), (u = l + n)),
              { width: o, height: i, left: r, top: l, right: h, bottom: u, x: c, y: f }
            );
          }
          const f = (t, { w: e, h: n } = {}) => {
              const o = (function (t, { w: e, h: n } = {}) {
                  return c((0, r.G)(t), { w: e, h: n });
                })(t, { w: e, h: n }),
                l = (function (t = window) {
                  let e = 0,
                    n = 0;
                  try {
                    for (; null != t?.frameElement; ) {
                      const o = (0, r.G)(t.frameElement);
                      ((e += o.left), (n += o.top), (t = t.parent));
                    }
                  } catch (t) {
                    ((e = 0), (n = 0));
                  }
                  return { x: e, y: n };
                })(t?.ownerDocument?.defaultView);
              ((o.left += l.x), (o.right += l.x), (o.top += l.y), (o.bottom += l.y));
              const h = (0, i.Ot)(),
                u = (function (t) {
                  const e = { left: t[0].left, right: t[0].right, top: t[0].top, bottom: t[0].bottom };
                  for (let n = 1; n < t.length; ++n) {
                    if (((e.left = Math.max(e.left, t[n].left)), (e.right = Math.min(e.right, t[n].right)), e.left >= e.right)) return null;
                    if (((e.top = Math.max(e.top, t[n].top)), (e.bottom = Math.min(e.bottom, t[n].bottom)), e.top >= e.bottom)) return null;
                  }
                  return ((e.width = e.right - e.left), (e.height = e.bottom - e.top), e);
                })([
                  { left: 0, top: 0, right: h.document.documentElement.clientWidth, bottom: h.document.documentElement.clientHeight },
                  o,
                ]);
              let f, s;
              return null !== u ? ((f = u.width * u.height), (s = o.width * o.height), (f / s) * 100) : 0;
            },
            s = (t) => t;
          const g = (function (t) {
            const e = new WeakMap();
            let n = (0, l.v6)(),
              o = null;
            try {
              o = t(function (t) {
                t.forEach((t) => {
                  (e.get(t.target)?.time ?? -1) < t.time && (e.set(t.target, t), n.resolve(), (n = (0, l.v6)()));
                });
              });
            } catch (t) {}
            async function i(t) {
              const e = r(t);
              return null != e ? e : n.promise.then(() => i(t));
            }
            function r(t) {
              return e.get(t);
            }
            return {
              observe: async function (t) {
                return null == (t = s(t)) || null == o || e.has(t) ? l.U9.resolve(r(t)) : (o.observe(t), e.set(t, null), i(t));
              },
              getIntersection: r,
            };
          })((t) => new IntersectionObserver(t, { threshold: Array.from({ length: 101 }, (t, e) => e / 100) }));
          function m(t) {
            return !(0, o.inIframe)() && null !== t;
          }
          function a(t, e, n) {
            return 'visible' === e.document.visibilityState
              ? (function (t, { w: e, h: n } = {}) {
                  const o = g.getIntersection(t);
                  if (null == o) return (g.observe(t), f(t, { w: e, h: n }));
                  {
                    const i = c(o.boundingClientRect, { w: e, h: n });
                    return i.width !== o.boundingClientRect.width || i.height !== o.boundingClientRect.height
                      ? f(t, { w: e, h: n })
                      : o.isIntersecting
                        ? 100 * o.intersectionRatio
                        : 0;
                  }
                })(t, n)
              : 0;
          }
          h.gH.before(
            (function (t = g) {
              return function (e, n) {
                l.U9.race([l.U9.allSettled((n.adUnits ?? []).map((e) => t.observe((0, u.o)(e)))), (0, l.cb)(20)]).then(() =>
                  e.call(this, n),
                );
              };
            })(),
          );
        },
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [7464],
      {
        8870(r, a, e) {
          e.d(a, { k: () => l, z: () => t });
          var n = e(7413),
            s = e(3350);
          const t = (r, a, e = '') => {
              if ((0, s.O8)(a) && a.length > 0) {
                const e = a.split('|').filter((r) => r.trim().length > 0);
                ((a = e.map((r) => r.trim()).join('|')), (r.ext.key_val = a));
              } else
                (0, n.logWarn)(e + 'Ignoring param : dctr with value : ' + a + ', expects string-value, found empty or non-string value');
            },
            l = (r, a, e = '') => {
              (0, s.cy)(a)
                ? a.forEach((a) => {
                    'string' == typeof a && a.length > 3
                      ? (r.pmp || (r.pmp = { private_auction: 0, deals: [] }), r.pmp.deals.push({ id: a }))
                      : (0, n.logWarn)(
                          `${e}Error: deal-id present in array bid.params.deals should be a string with more than 3 characters length, deal-id ignored: ${a}`,
                        );
                  })
                : (0, n.logWarn)(`${e}Error: bid.params.deals should be an array of strings.`);
            };
        },
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [5881],
      {
        4704(e, t, r) {
          r.d(t, { Qo: () => f });
          var n = r(4283),
            c = r(323),
            l = r(537),
            o = r(7413);
          function u(e) {
            const t = {};
            function r() {
              return new Error('incompatible redaction rules');
            }
            function n(e) {
              return (null == e.wpRule && (e.wpRule = 0 !== e.wpRules.length && { check: (t) => e.wpRules.some(t) }), e.wpRule);
            }
            function c(e, t, r, u) {
              if (!e.hasWP || (!(0, l.$V)(t) && !(0, l.$V)(r)) || (0, o.deepEqual)(t, r)) return r;
              const i = n(e);
              if (i && i.check(u)) return t;
              if (e.children)
                for (const [n, i] of Object.entries(e.children)) {
                  const s = c(i, t?.[n], r?.[n], u);
                  if (null == r || 'object' != typeof r)
                    return ((0, o.logWarn)(`Invalid value set for '${e.path}', expected an object`, r), t);
                  (0, l.$V)(s) || t?.hasOwnProperty(n) ? (r[n] = s) : delete r[n];
                }
              return r;
            }
            function u(e, t, r) {
              if (!e.hasWP || !(0, l.$V)(t)) return !0;
              const c = n(e);
              if (c && c.check(r)) return !1;
              if (e.children) for (const [n, c] of Object.entries(e.children)) if (!u(c, t?.[n], r)) return !1;
              return !0;
            }
            e.forEach((e) => {
              e.paths.forEach((n) => {
                let c = t;
                n.split('.').forEach((e) => {
                  ((c.children = c.children ?? {}),
                    (c.children[e] = c.children[e] ?? { parent: c, path: c.path ? `${c.path}.${e}` : e }),
                    (c = c.children[e]),
                    (c.wpRules = c.wpRules ?? []),
                    (c.redactRules = c.redactRules ?? []));
                });
                const l = e.wp ? 'hasWP' : 'hasRedact',
                  o = e.wp ? 'wpRules' : 'redactRules';
                if (c[l] && !c[o]?.length) throw r();
                c[o].push(e);
                let u = c;
                for (; u; ) {
                  if (((u[l] = !0), u !== c && u[o]?.length)) throw r();
                  u = u.parent;
                }
              });
            });
            const i = Symbol('TARGET');
            function s(e, t, r, o, f = new WeakMap()) {
              if (f.has(e)) return f.get(e);
              function a(e, t = new Set()) {
                return f.has(e?.[i])
                  ? e[i]
                  : (null == e ||
                      'object' != typeof e ||
                      t.has(e) ||
                      (t.add(e),
                      Object.keys(e).forEach((r) => {
                        const n = a(e[r], t);
                        n !== e[r] && (e[r] = n);
                      })),
                    e);
              }
              const h = new Proxy(e, {
                get(e, n, c) {
                  if (n === i) return e;
                  const u = Reflect.get(e, n, c);
                  if (r && null != u && 'object' == typeof u) return s(u, t, r, o, f);
                  if (t.children?.hasOwnProperty(n)) {
                    const { children: e, hasWP: c } = t.children[n];
                    if ((0, l.$V)(u)) {
                      const e =
                        (null == (a = t.children[n]).redactRule &&
                          (a.redactRule = 0 !== a.redactRules.length && {
                            check: (e) => a.redactRules.some(e),
                            get(e) {
                              for (const t of a.redactRules) if (((e = t.get(e)), !(0, l.$V)(e))) break;
                              return e;
                            },
                          }),
                        a.redactRule);
                      if (e && e.check(o)) return e.get(u);
                    }
                    if ((e || c) && null != u && 'object' == typeof u) return s(u, t.children?.[n] || t, r || null == e, o, f);
                  }
                  var a;
                  return u;
                },
                set(e, l, u, i) {
                  if (r) {
                    const e = n(t);
                    if (e && e.check(o)) return !0;
                  }
                  if (((u = a(u)), t.children?.hasOwnProperty(l))) {
                    const r = Reflect.get(e, l, i);
                    if (void 0 === (u = c(t.children[l], r, u, o)) && !e.hasOwnProperty(l)) return !0;
                  }
                  return Reflect.set(e, l, u, i);
                },
                deleteProperty(e, c) {
                  if (r) {
                    const e = n(t);
                    if (e && e.check(o)) return !0;
                  }
                  return !(!t.children?.hasOwnProperty(c) || u(t.children[c], e[c], o)) || Reflect.deleteProperty(e, c);
                },
              });
              return (f.set(e, h), h);
            }
            return function (e, ...r) {
              return s(e, t, !1, (0, l.uD)({}, ...r));
            };
          }
          function i(e) {
            return Object.assign({ wp: !0 }, e);
          }
          const s = (function (e = n.io) {
            return u(
              (0, l.ZP)(e).concat(
                (function (e = n.io) {
                  return [
                    { name: c.yl, paths: l.Vx, applies: (0, l.p4)(c.yl, e) },
                    { name: c.qX, paths: l.l7, applies: (0, l.p4)(c.qX, e) },
                  ].map(i);
                })(e),
              ),
            );
          })();
          const f = (function (e = s) {
            return function (t, r) {
              ((t.global = t.global || {}), (t.bidder = t.bidder || {}));
              const n = {
                global: e(t.global, r),
                bidder: new Proxy(t.bidder, {
                  get(t, n, c) {
                    let l = Reflect.get(t, n, c);
                    return (null != l && (l = e(l, r)), l);
                  },
                  set(t, n, c, l) {
                    (null != c && 'object' == typeof c) || (0, o.logError)('ortb2Fragments.bidder[bidderCode] must be an object');
                    let u = Reflect.get(t, n, l);
                    return (
                      null == u && (u = t[n] = {}),
                      (u = e(u, r)),
                      Object.entries(c).forEach(([e, t]) => {
                        u[e] = t;
                      }),
                      !0
                    );
                  },
                }),
              };
              return Object.defineProperties({}, Object.fromEntries(Object.entries(n).map(([e, t]) => [e, { get: () => t }])));
            };
          })();
        },
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [7618],
      {
        9400(e, i, t) {
          t.d(i, { m: () => x });
          var r = t(4162),
            d = t(80),
            n = t(3350),
            s = t(7413),
            a = t(1779),
            b = t(7169);
          const o = { [a.D4]: 'banner', [a.s6]: 'native', [a.G_]: 'video' };
          var p = t(4794),
            c = t(8384),
            f = t(3435);
          var u = t(1129);
          var g = t(8693);
          const l = {
            [d.S3]: {
              extPrebid: {
                fn: function (e, i) {
                  ((0, f.J)(
                    e,
                    'ext.prebid',
                    (0, s.mergeDeep)(
                      { auctiontimestamp: i.auctionStart, targeting: { includewinners: !0, includebidderkeys: !1 } },
                      e.ext?.prebid,
                    ),
                  ),
                    c.$W.getConfig('debug') && (e.ext.prebid.debug = !0));
                },
              },
              extPrebidChannel: {
                fn: function (e) {
                  (0, f.J)(e, 'ext.prebid.channel', Object.assign({ name: 'pbjs', version: (0, u.m)().version }, e.ext?.prebid?.channel));
                },
              },
              extPrebidAliases: {
                fn: function (e, i, t, { am: r = p.Ay } = {}) {
                  if (r.aliasRegistry[i.bidderCode]) {
                    const t = r.bidderRegistry[i.bidderCode];
                    if (!t || !t.getSpec().skipPbsAliasing) {
                      (0, f.J)(e, `ext.prebid.aliases.${i.bidderCode}`, r.aliasRegistry[i.bidderCode]);
                      const d = c.$W.getConfig(`gvlMapping.${i.bidderCode}`) || t?.getSpec?.().gvlid;
                      d && (0, f.J)(e, `ext.prebid.aliasgvlids.${i.bidderCode}`, d);
                    }
                  }
                },
              },
              extPrebidPageViewIds: {
                fn: function (e, i) {
                  (0, f.J)(e, `ext.prebid.page_view_ids.${i.bidderCode}`, i.pageViewId);
                },
              },
              extPrebidSafeRenderer: {
                fn: function (e, i) {
                  (0, f.J)(e, 'ext.prebid.safeRenderer', !0);
                },
              },
            },
            [d.Tb]: {
              params: {
                fn: function (e, i) {
                  const t = i.params;
                  t && (0, f.J)(e, `ext.prebid.bidder.${i.bidder}`, t);
                },
              },
              adUnitCode: {
                fn: function (e, i) {
                  const t = i.adUnitCode;
                  t && (0, f.J)(e, 'ext.prebid.adunitcode', t);
                },
              },
            },
            [d.WR]: {
              mediaType: {
                fn: function (e, i, t) {
                  let r = t.mediaType;
                  (r || ((r = b.X.hasOwnProperty(i.mtype) ? b.X[i.mtype] : i.ext?.prebid?.type), o.hasOwnProperty(r) || (r = a.D4)),
                    (e.mediaType = r));
                },
                priority: 99,
              },
              bidderCode: {
                fn(e, i, t) {
                  ((e.bidderCode = t.seatbid.seat),
                    (e.adapterCode = i?.ext?.prebid?.meta?.adaptercode || t.bidRequest?.bidder || e.bidderCode));
                },
              },
              pbsBidId: {
                fn(e, i) {
                  const t = i?.ext?.prebid?.bidid;
                  (0, n.O8)(t) && (e.pbsBidId = t);
                },
              },
              adserverTargeting: {
                fn(e, i) {
                  const t = i?.ext?.prebid?.targeting;
                  (0, n.Qd)(t) && (e.adserverTargeting = t);
                },
              },
              extPrebidMeta: {
                fn(e, i) {
                  e.meta = (0, s.mergeDeep)({}, i?.ext?.prebid?.meta, e.meta);
                },
              },
              pbsWinTrackers: {
                fn: function (e, i) {
                  ((e.eventtrackers = e.eventtrackers || []),
                    [
                      [i.burl, g.OA],
                      [i?.ext?.prebid?.events?.win, g.RO],
                    ]
                      .filter(
                        ([i, t]) =>
                          i && null == e.eventtrackers.find(({ method: e, event: r, url: d }) => r === t && e === g.Ni && d === i),
                      )
                      .forEach(([i, t]) => {
                        e.eventtrackers.push({ method: g.Ni, event: t, url: i });
                      }));
                },
              },
              safeRenderer: {
                fn: function (e, i) {
                  const { rendererUrl: t } = i.ext?.prebid?.meta || {};
                  t && (e.safeRenderer = { url: t });
                },
              },
            },
            [d.Cf]: {
              serverSideStats: {
                fn(e, i, t) {
                  const r = t.bidderRequest?.bidderCode,
                    d = i?.ext;
                  if (!d) return;
                  const n = { errors: 'serverErrors', responsetimemillis: 'serverResponseTimeMs' };
                  Object.entries(d).forEach(([e, i]) => {
                    if (n[e]) {
                      if (!r) return;
                      const d = i?.[r];
                      if (void 0 !== d) {
                        const i = n[e];
                        ((t.bidderRequest[i] = d),
                          t.bidRequests?.forEach((e) => {
                            e[i] = d;
                          }));
                      }
                    } else void 0 !== i && ((t.bidderRequest.pbsExt = t.bidderRequest.pbsExt || {}), (t.bidderRequest.pbsExt[e] = i));
                  });
                },
              },
            },
          };
          l[d.WR].videoCache = {
            fn: function (e, i) {
              if (e.mediaType === a.G_) {
                let { cacheId: t, url: r } = i?.ext?.prebid?.cache?.vastXml ?? {};
                if (!t || !r) {
                  const { hb_uuid: e, hb_cache_host: d, hb_cache_path: n } = i?.ext?.prebid?.targeting ?? {};
                  e && d && n && ((t = e), (r = `https://${d}${n}?uuid=${e}`));
                }
                t && r && Object.assign(e, { videoCacheKey: t, vastUrl: r });
              }
            },
            priority: -10,
          };
          var v = t(6271);
          const x = (0, s.memoize)(() => (0, r.U)((0, v.T)(), l, (0, d.yB)(d.e4)));
        },
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [6550],
      {
        9446(p, n, e) {
          function t(p, n, e) {
            const t = {};
            return (
              p &&
                ('boolean' == typeof p.gdprApplies && (t.gdpr = Number(p.gdprApplies)),
                'string' == typeof p.consentString && (t.gdpr_consent = p.consentString)),
              n && (t.us_privacy = encodeURIComponent(n)),
              e?.gppString && ((t.gpp = e.gppString), (t.gpp_sid = e.applicableSections?.toString())),
              t
            );
          }
          e.d(n, { d: () => t });
        },
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [9965],
      {
        8960(e, t, n) {
          n.d(t, { S_: () => a });
          var r = n(6901),
            i = n(7413),
            o = n(5262);
          function l(e) {
            let t = (0, o.o)(e);
            if (!t) return void (0, i.logWarn)(`Magnite: unable to find ad unit element with id "${e.adUnitCode}" for rendering.`);
            const n = t.firstElementChild;
            ('DIV' === n?.tagName && (t = n),
              (function (e) {
                const t = e.querySelector("div[id^='google_ads']");
                t && t.style.setProperty('display', 'none');
              })(t),
              (function (e) {
                const t = e.querySelector("script[id^='sas_script']"),
                  n = t && t.nextSibling;
                n && 'iframe' === n.localName && n.style.setProperty('display', 'none');
              })(t));
            const r = e.renderer.getConfig();
            e.renderer.push(() => {
              globalThis.MagniteApex.renderAd({
                width: e.width,
                height: e.height,
                vastUrl: e.vastUrl,
                placement: { attachTo: t, align: r.align || 'center', position: r.position || 'prepend' },
                closeButton: r.closeButton || !1,
                label: r.label,
                replay: r.replay ?? !0,
              });
            });
          }
          function a(e, t, n) {
            const o = r.A4.install({
              id: e.adId,
              url: t || 'https://video-outstream.rubiconproject.com/apex-2.3.7.js',
              config: n || {},
              loaded: !1,
              adUnitCode: e.adUnitCode,
            });
            try {
              o.setRender(l);
            } catch (e) {
              (0, i.logWarn)('Prebid Error calling setRender on renderer', e);
            }
            return o;
          }
        },
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [7247],
      {
        9288(r, e, a) {
          a.d(e, { D: () => o });
          var s = a(7850),
            t = a(8928);
          const n = ['user.keywords'].concat(s.Dy.flatMap((r) => ['keywords', 'content.keywords'].map((e) => `${r}.${e}`)));
          function o(r, ...e) {
            return (function (...r) {
              const e = new Set();
              return (
                r
                  .filter((r) => r)
                  .flatMap((r) => (Array.isArray(r) ? r : r.split(',')))
                  .map((r) => r.replace(/^\s*/, '').replace(/\s*$/, ''))
                  .filter((r) => r)
                  .forEach((r) => e.add(r)),
                Array.from(e.keys())
              );
            })(...n.map((e) => (0, t.A)(r, e)), ...e);
          }
        },
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [2708],
      {
        5075(e, s, n) {
          function l({ purposes: e, legIntPurposes: s, flexiblePurposes: n }) {
            const l = e.concat(s).filter((n) => e.includes(n) && s.includes(n));
            if (l.length > 0) return `declares both consent and LI for purposes ${l.join(', ')}`;
            const o = n.filter((n) => !e.includes(n) && !s.includes(n));
            return o.length > 0 ? `declares purposes ${o.join(', ')} as flexible, but no legal basis for them` : void 0;
          }
          n.d(s, { I: () => l });
        },
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [315],
      {
        9260(n, s, u) {
          function e() {
            return !1;
          }
          u.d(s, { l: () => e });
        },
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [4262],
      {
        5272(e, o, r) {
          var s = r(1068),
            n = r(1129),
            t = r(7413),
            a = r(8964),
            p = r(1785),
            i = r(2354),
            d = r(7449),
            c = r(651);
          const l = a.g4.withCallers([['userId', '33acrossId']]),
            u = '33acrossId',
            g = 'https://lexicon.33across.com/v1/envelope',
            f = '33acrossIdFp',
            v = '33acrossIdTp',
            m = '33acrossIdHm',
            b = !0,
            h = !0,
            I = (0, i.vM)({ moduleType: d.fW, moduleName: u }),
            S = { domainOverride: (0, c.w)(I, u) };
          function C(e) {
            if (I.cookiesAreEnabled()) {
              const o = new Date(0).toUTCString();
              I.setCookie(e, '', o, 'Lax', S.domainOverride());
            }
            I.removeDataFromLocalStorage(e);
          }
          function T(e, o) {
            let r;
            return (o.find((o) => (o === i.X0 ? (r = I.getCookie(e)) : o === i.qk && (r = I.getDataFromLocalStorage(e)), !!r)), r);
          }
          function D(e, o) {
            const [r, s, n] = e;
            n
              ? C(r)
              : s &&
                (function (e, o, { enabledStorageTypes: r, expires: s }) {
                  r.forEach((r) => {
                    if (r === i.X0) {
                      const r = 864e5 * s,
                        n = new Date(Date.now() + r);
                      I.setCookie(e, o, n.toUTCString(), 'Lax', S.domainOverride());
                    } else r === i.qk && I.setDataInLocalStorage(e, o);
                  });
                })(r, s, o);
          }
          function y(e, { enabledStorageTypes: o, expires: r, ...s }) {
            (function ({ tp: e, fp: o, hem: r }, { storeFpid: s, storeTpid: n, envelopeAvailable: t }) {
              const a = [];
              return (s && a.push([f, o, !o], [m, r, !t]), n && a.push([v, e, !e]), a);
            })(e, s).forEach((e) => {
              D(e, { enabledStorageTypes: o, expires: r });
            });
          }
          const k = {
            name: u,
            gvlid: 58,
            decode: (e) => ({ [u]: { envelope: e } }),
            getId({ params: e = {}, enabledStorageTypes: o = [], storage: r = {} }, { gdpr: n } = {}) {
              if ('string' != typeof e.pid) return void (0, t.logError)(`${u}: Submodule requires a partner ID to be defined`);
              if (!0 === n?.gdprApplies) return void (0, t.logWarn)(`${u}: Submodule cannot be used where GDPR applies`);
              const { storeFpid: a = b, storeTpid: p = h, apiUrl: i = g, pid: d, hem: c } = e,
                I = c || window._33across?.hem?.sha256;
              return {
                callback(e) {
                  l(1e4)(
                    i,
                    {
                      success(s) {
                        let n = {};
                        try {
                          n = (function (e) {
                            return e.succeeded
                              ? e.data.envelope
                                ? { envelope: e.data.envelope, fp: e.data.fp, tp: e.data.tp }
                                : ((0, t.logMessage)(`${u}: No envelope was received`), {})
                              : ('Cookied User' === e.error
                                  ? (0, t.logMessage)(`${u}: Unsuccessful response`.concat(' ', e.error))
                                  : (0, t.logError)(`${u}: Unsuccessful response`.concat(' ', e.error)),
                                {});
                          })(JSON.parse(s));
                        } catch (e) {
                          (0, t.logError)(`${u}: ID reading error:`, e);
                        }
                        (n.envelope ||
                          ['', '_last', '_exp', '_cst'].forEach((e) => {
                            C(`${u}${e}`);
                          }),
                          y(
                            { fp: n.fp, tp: n.tp, hem: I },
                            { storeFpid: a, storeTpid: p, envelopeAvailable: !!n.envelope, enabledStorageTypes: o, expires: r.expires },
                          ),
                          e(n.envelope));
                      },
                      error(o) {
                        ((0, t.logError)(`${u}: ID error response`, o), e());
                      },
                    },
                    (function ({ pid: e, pubProvidedHem: o }, r, n) {
                      const t = s.t6.getConsentData(),
                        a = s.et.getCoppa(),
                        p = s.ad.getConsentData(),
                        i = { pid: e, gdpr: 0, src: 'pbjs', ver: '11.23.0', coppa: Number(a) };
                      if ((t && (i.us_privacy = t), p)) {
                        const { gppString: e = '', applicableSections: o = [] } = p;
                        ((i.gpp = e), (i.gpp_sid = encodeURIComponent(o.join(','))));
                      }
                      r?.consentString && (i.gdpr_consent = r.consentString);
                      const d = T(f, n);
                      d && (i.fp = encodeURIComponent(d));
                      const c = T(v, n);
                      c && (i.tp = encodeURIComponent(c));
                      const l = o || T(m, n);
                      return (l && (i.sha256 = encodeURIComponent(l)), i);
                    })({ pid: d, pubProvidedHem: I }, n, o),
                    { method: 'GET', withCredentials: !0 },
                  );
                },
              };
            },
            domainOverride: S.domainOverride,
            eids: {
              '33acrossId': {
                source: '33across.com',
                atype: 1,
                getValue: function (e) {
                  return e.envelope;
                },
              },
            },
          };
          ((0, p.bz)('userId', k),
            (0, n.E)('33acrossIdSystem'),
            Object.assign(s.W1, { 58: { purposes: [1, 2, 3, 4, 7, 10], legIntPurposes: [], flexiblePurposes: [], specialFeatures: [2] } }));
        },
      },
      (e) => {
        e.O(0, [802, 7769, 5590, 1085, 2764], () => {
          return ((o = 5272), e((e.s = o)));
          var o;
        });
        e.O();
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [7333],
      {
        3811(e, r, t) {
          var n = t(1068),
            s = t(1129),
            a = t(7413),
            i = t(3350),
            d = t(2682),
            o = t(8384),
            u = t(1779),
            p = t(5877),
            c = t(6271);
          const g = '2.2.0';
          function l(e, r) {
            if (!1 === o.$W.readConfig('aps.telemetry')) return;
            const t = e.startsWith('prebidAdapter/') ? e : `prebidAdapter/${e}`,
              n = t.split('/').length < 3 ? `${t}/didTrigger` : t,
              s = o.$W.readConfig('aps.accountID');
            if (!s) return;
            ((window._aps = window._aps || new Map()), window._aps.has(s) || window._aps.set(s, { queue: [], store: new Map() }));
            const a = { ...r };
            (a.error || (a.analytics = a.analytics || {}),
              window._aps.get(s).queue.push(new CustomEvent(n, { detail: { ...a, source: 'prebid-adapter', libraryVersion: g } })));
          }
          function b(e, r, t) {
            (l(e, { ...t, error: r }), (0, a.logError)(r.message));
          }
          const m = (0, c.A)({
              context: { netRevenue: !0 },
              request(e, r, t, n) {
                const s = e(r, t, n);
                (s?.device?.geo && (delete s.device.geo.lat, delete s.device.geo.lon),
                  s.user && (delete s.user.gender, delete s.user.yob, delete s.user.kwarry, delete s.user.customdata, delete s.user.geo),
                  (s.ext = s.ext ?? {}),
                  (s.ext.account = o.$W.readConfig('aps.accountID')),
                  (s.ext.sdk = { version: g, source: 'prebid' }),
                  (s.cur = s.cur ?? ['USD']));
                const a = t?.ortb2?.regs?.ext?.agerange;
                return (
                  'number' == typeof a && ((s.regs = s.regs ?? {}), (s.regs.ext = s.regs?.ext ?? {}), (s.regs.ext.agerange = a)),
                  s.imp && Array.isArray(s.imp)
                    ? (s.imp.forEach((e, r) => {
                        if (!e) return;
                        if (!e.banner) return;
                        const t = e.banner.w >= 0 && e.banner.h >= 0,
                          n = Array.isArray(e.banner.format) && e.banner.format.length > 0;
                        if (t || !n) return;
                        const { w: s, h: a } = e.banner.format[0];
                        'number' == typeof s && 'number' == typeof a && ((e.banner.w = s), (e.banner.h = a));
                      }),
                      s)
                    : s
                );
              },
              bidResponse(e, r, t) {
                let n;
                2 === r.mtype && ((n = r.adm), delete r.adm);
                const s = e(r, t);
                return (
                  (s.meta = s.meta || {}),
                  r.ext?.bidder && (s.meta.networkId = r.ext.bidder),
                  t.seatbid?.seat && (s.meta.seat = t.seatbid.seat),
                  s.mediaType === u.G_ && (s.vastUrl = n),
                  s
                );
              },
            }),
            f = {
              code: 'aps',
              gvlid: 793,
              supportedMediaTypes: [u.D4, u.G_],
              isBidRequestValid: (e) => {
                l('isBidRequestValid');
                try {
                  const e = o.$W.readConfig('aps.accountID');
                  return (
                    !!(function (e) {
                      return null != e && (!!(0, i.Et)(e) || (!!(0, i.O8)(e) && e.trim().length > 0));
                    })(e) || ((0, a.logWarn)(`Invalid accountID: ${e}`), !1)
                  );
                } catch (e) {
                  ((e.message = `Error while validating bid request: ${e?.message}`), b('isBidRequestValid/didError', e));
                }
              },
              buildRequests: (e, r) => {
                l('buildRequests');
                try {
                  let t = o.$W.readConfig('aps.debugURL') ?? '../../web.ads.aps.amazon-adsystem.com/e/pb/bid';
                  if (o.$W.readConfig('aps.debug')) {
                    const e = t.includes('?') ? '&' : '?';
                    t +=
                      'fif' === o.$W.readConfig('aps.renderMethod') ? e + 'amzn_debug_mode=fif&amzn_debug_mode=1' : e + 'amzn_debug_mode=1';
                  }
                  return { method: 'POST', url: t, data: m.toORTB({ bidRequests: e, bidderRequest: r }) };
                } catch (e) {
                  ((e.message = `Error while building bid request: ${e?.message}`), b('buildRequests/didError', e));
                }
              },
              interpretResponse: (e, r) => {
                l('interpretResponse');
                try {
                  const t = m.fromORTB({ response: e.body, request: r.data }),
                    n = o.$W.readConfig('aps.accountID'),
                    s = o.$W.readConfig('aps.creativeURL') || 'https://client.aps.amazon-adsystem.com/prebid-creative.js';
                  return (
                    t.bids.forEach((r) => {
                      r.mediaType !== u.G_ &&
                        (delete r.ad,
                        (r.ad =
                          `<script src="${s}"><\/script>\n<script>\n  const accountID = '${n}';\n  window._aps = window._aps || new Map();\n  if (!window._aps.has(accountID)) {\n    window._aps.set(accountID, { queue: [], store: new Map([['listeners', new Map()]]) });\n  }\n  window._aps.get(accountID).queue.push(\n    new CustomEvent('prebid/creative/render', {\n      detail: {\n        aaxResponse: '${btoa(JSON.stringify(e.body))}',\n        seatBidId: ${JSON.stringify(r.seatBidId)}\n      }\n    })\n  );\n<\/script>`.trim()));
                    }),
                    t.bids
                  );
                } catch (e) {
                  ((e.message = `Error while interpreting bid response: ${e?.message}`), b('interpretResponse/didError', e));
                }
              },
              getUserSyncs: function (e, r, t, n) {
                l('getUserSyncs');
                try {
                  if ((0, p.C)(t))
                    return r
                      .flatMap((e) => e?.body?.ext?.userSyncs ?? [])
                      .filter((r) => ('iframe' === r.type && e.iframeEnabled) || ('image' === r.type && e.pixelEnabled));
                } catch (e) {
                  ((e.message = `Error while getting user syncs: ${e?.message}`), b('getUserSyncs/didError', e));
                }
              },
              onTimeout: (e) => {
                l('onTimeout', { error: e });
              },
              onSetTargeting: (e) => {
                l('onSetTargeting');
              },
              onAdRenderSucceeded: (e) => {
                l('onAdRenderSucceeded');
              },
              onBidderError: (e) => {
                l('onBidderError', { error: e });
              },
              onBidWon: (e) => {
                l('onBidWon');
              },
              onBidAttribute: (e) => {
                l('onBidAttribute');
              },
              onBidBillable: (e) => {
                l('onBidBillable');
              },
            };
          ((0, d.a$)(f),
            (0, s.E)('apsBidAdapter'),
            Object.assign(n.W1, {
              793: { purposes: [1, 2, 3, 4, 7, 9, 10], legIntPurposes: [], flexiblePurposes: [2, 7, 9, 10], specialFeatures: [] },
            }));
        },
      },
      (e) => {
        e.O(0, [802, 7769, 5590, 1085, 8498], () => {
          return ((r = 3811), e((e.s = r)));
          var r;
        });
        e.O();
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [234],
      {
        7518(e, t, n) {
          var i = n(1129),
            s = n(7413),
            o = n(1046),
            r = n(5521),
            a = n(4794),
            c = n(8964),
            l = n(2354),
            d = n(7449);
          const m = c.RD.withCallers([['analytics', 'atsAnalytics']]),
            u = 'atsAnalytics',
            p = (0, l.vM)({ moduleType: d.Tn, moduleName: u });
          let g = [];
          const f = [],
            A = [
              { test: /googlebot/i, name: 'Googlebot' },
              { test: /opera/i, name: 'Opera' },
              { test: /opr\/|opios/i, name: 'Opera' },
              { test: /SamsungBrowser/i, name: 'Samsung Internet for Android' },
              { test: /Whale/i, name: 'NAVER Whale Browser' },
              { test: /MZBrowser/i, name: 'MZ Browser' },
              { test: /focus/i, name: 'Focus' },
              { test: /swing/i, name: 'Swing' },
              { test: /coast/i, name: 'Opera Coast' },
              { test: /opt\/\d+(?:.?_?\d+)+/i, name: 'Opera Touch' },
              { test: /yabrowser/i, name: 'Yandex Browser' },
              { test: /ucbrowser/i, name: 'UC Browser' },
              { test: /Maxthon|mxios/i, name: 'Maxthon' },
              { test: /epiphany/i, name: 'Epiphany' },
              { test: /puffin/i, name: 'Puffin' },
              { test: /sleipnir/i, name: 'Sleipnir' },
              { test: /k-meleon/i, name: 'K-Meleon' },
              { test: /micromessenger/i, name: 'WeChat' },
              { test: /qqbrowser/i, name: /qqbrowserlite/i.test(window.navigator.userAgent) ? 'QQ Browser Lite' : 'QQ Browser' },
              { test: /msie|trident/i, name: 'Internet Explorer' },
              { test: /\sedg\//i, name: 'Microsoft Edge' },
              { test: /edg([ea]|ios)/i, name: 'Microsoft Edge' },
              { test: /vivaldi/i, name: 'Vivaldi' },
              { test: /seamonkey/i, name: 'SeaMonkey' },
              { test: /sailfish/i, name: 'Sailfish' },
              { test: /silk/i, name: 'Amazon Silk' },
              { test: /phantom/i, name: 'PhantomJS' },
              { test: /slimerjs/i, name: 'SlimerJS' },
              { test: /blackberry|\bbb\d+/i, name: 'BlackBerry' },
              { test: /(web|hpw)[o0]s/i, name: 'WebOS Browser' },
              { test: /bada/i, name: 'Bada' },
              { test: /tizen/i, name: 'Tizen' },
              { test: /qupzilla/i, name: 'QupZilla' },
              { test: /firefox|iceweasel|fxios/i, name: 'Firefox' },
              { test: /electron/i, name: 'Electron' },
              { test: /MiuiBrowser/i, name: 'Miui' },
              { test: /chromium/i, name: 'Chromium' },
              { test: /chrome|crios|crmo/i, name: 'Chrome' },
              { test: /GSA/i, name: 'Google Search' },
              { test: /android/i, name: 'Android Browser' },
              { test: /playstation 4/i, name: 'PlayStation 4' },
              { test: /safari|applewebkit/i, name: 'Safari' },
            ],
            h = ['Safari', 'Chrome', 'Firefox', 'Microsoft Edge'];
          function y() {
            const e = b.getUserAgent();
            try {
              const t = A.filter(function (t) {
                  return t.test.test(e);
                }),
                n = t && t.length ? t[0].name : '';
              return h.indexOf(n) >= 0 ? n : 'Unknown';
            } catch (e) {
              (0, s.logError)('ATS Analytics - Error while checking user browser!', e);
            }
          }
          function S(e) {
            try {
              const t = { Data: e },
                n = JSON.stringify(t);
              ((0, s.logInfo)('ATS Analytics - tried to send analytics data!'),
                m(
                  'https://analytics.rlcdn.com',
                  function () {
                    (0, s.logInfo)('ATS Analytics - events sent successfully!');
                  },
                  n,
                  { method: 'POST', contentType: 'application/json' },
                ));
            } catch (e) {
              (0, s.logError)('ATS Analytics - request encounter an error: ', e);
            }
          }
          const b = Object.assign((0, o.Ay)({ analyticsType: 'endpoint' }), {
            track({ eventType: e, args: t }) {
              void 0 !== t && b.callHandler(e, t);
            },
          });
          ((b.originEnableAnalytics = b.enableAnalytics),
            (b.shouldFireRequest = function (e) {
              if (0 !== e) {
                const e = 100 === Math.floor(100 * Math.random() + 1);
                return ((0, s.logInfo)('ATS Analytics - Should Fire Request: ', e), e);
              }
              return ((0, s.logInfo)('ATS Analytics - Should Fire Request: ', !1), !1);
            }),
            (b.getUserAgent = function () {
              return window.navigator.userAgent;
            }),
            (b.setSamplingCookie = function (e) {
              const t = new Date();
              (t.setTime(t.getTime() + 6048e5), p.setCookie('_lr_sampling_rate', e, t.toUTCString()));
            }),
            (b.enableAnalytics = function (e) {
              e.options.pid
                ? ((b.context = { events: [], pid: e.options.pid, bidWonTimeout: e.options.bidWonTimeout }),
                  (0, s.logInfo)('ATS Analytics - adapter enabled! '),
                  b.originEnableAnalytics(e))
                : (0, s.logError)("ATS Analytics - Publisher ID (pid) option is not defined. Analytics won't work");
            }),
            (b.callHandler = function (e, t) {
              if (
                (e === r.qY.BID_REQUESTED
                  ? (g = g.concat(
                      (function (e) {
                        const t = 'true' === p.getCookie('_lr_env_src_ats');
                        let n;
                        return (
                          (n = e.bids.map(function (n) {
                            return {
                              envelope_source: t,
                              has_envelope: (function () {
                                if (n.userIdAsEids && Array.isArray(n.userIdAsEids)) {
                                  const e = n.userIdAsEids.find((e) => 'liveramp.com' === e.source);
                                  if (e && e.uids && e.uids.length > 0) return !0;
                                }
                                return !(!n.userId || !n.userId.idl_env);
                              })(),
                              bidder: n.bidder,
                              bid_id: n.bidId,
                              auction_id: e.auctionId,
                              user_browser: y(),
                              user_platform: navigator.platform,
                              auction_start: new Date(e.auctionStart).toJSON(),
                              domain: window.location.hostname,
                              pid: b.context.pid,
                              adapter_version: 3,
                              bid_won: !1,
                            };
                          })),
                          n
                        );
                      })(t),
                    ))
                  : e === r.qY.BID_RESPONSE &&
                    f.push(
                      (function (e) {
                        return {
                          bid_id: e.requestId,
                          response_time_stamp: new Date(e.responseTimestamp).toJSON(),
                          currency: e.currency,
                          cpm: e.cpm,
                          net_revenue: e.netRevenue,
                        };
                      })(t),
                    ),
                e === r.qY.AUCTION_END)
              ) {
                const e = b.context.bidWonTimeout ? b.context.bidWonTimeout : 2e3;
                let t = [];
                setTimeout(() => {
                  const e = (0, i.m)().getAllWinningBids();
                  if (((0, s.logInfo)('ATS Analytics - winning bids: ', e), g.length)) {
                    const n = {};
                    f.length
                      ? ((t = []),
                        g.forEach((e) => {
                          (f.forEach(function (t) {
                            e.bid_id === t.bid_id && Object.assign(e, t);
                          }),
                            t.push(e));
                        }),
                        e.length &&
                          (t = t.map(
                            (t) => (
                              e.forEach(function (e) {
                                ((n.bid_id = e.requestId), (n.bid_won = !0), t.bid_id === n.bid_id && Object.assign(t, n));
                              }),
                              t
                            ),
                          )))
                      : (t = g);
                    try {
                      const e = p.getCookie('_lr_sampling_rate');
                      (e
                        ? b.shouldFireRequest(parseInt(e)) && ((0, s.logInfo)('ATS Analytics - events to send: ', t), S(t))
                        : (function (e) {
                            ((0, s.logInfo)('ATS Analytics - preflight request!'),
                              m(
                                'https://check.analytics.rlcdn.com/check/' + b.context.pid,
                                {
                                  success: function (t) {
                                    const n = JSON.parse(t);
                                    (0, s.logInfo)('ATS Analytics - Sampling Rate: ', n);
                                    const i = n.samplingRate;
                                    b.setSamplingCookie(i);
                                    const o = Number(i);
                                    t && i && b.shouldFireRequest(o) && ((0, s.logInfo)('ATS Analytics - events to send: ', e), S(e));
                                  },
                                  error: function () {
                                    (b.setSamplingCookie(0), (0, s.logInfo)('ATS Analytics - Sampling Rate Request Error!'));
                                  },
                                },
                                void 0,
                                { method: 'GET', crossOrigin: !0 },
                              ));
                          })(t),
                        (t = []));
                    } catch (e) {
                      (0, s.logError)('ATS Analytics - preflight request encounter an error: ', e);
                    }
                  }
                }, e);
              }
            }),
            a.Ay.registerAnalyticsAdapter({ adapter: b, code: u, gvlid: 97 }));
          (0, i.E)('atsAnalyticsAdapter');
        },
      },
      (e) => {
        e.O(0, [802, 7769, 5590, 1085, 2630], () => {
          return ((t = 7518), e((e.s = t)));
          var t;
        });
        e.O();
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [8793],
      {
        9489(e, n, t) {
          var s = t(1129),
            i = t(7413),
            a = t(3435),
            r = t(3350),
            p = t(8384),
            o = t(1068),
            l = t(6344),
            c = t(4077),
            u = t(8203),
            d = t(4390),
            g = t(9099);
          let h = {},
            m = null;
          class C {
            constructor(e, n) {
              ((this.message = e), (this.args = null == n ? [] : [n]));
            }
          }
          class f {
            apiVersion = '1.1';
            static get(e = c.c5) {
              if (null == this.INST) {
                const n = e({ apiName: '__gpp', apiArgs: ['command', 'callback', 'parameter'], mode: c.q4 });
                if (null == n) throw new C('GPP CMP not found');
                this.INST = new this(n);
              }
              return this.INST;
            }
            #e;
            #n;
            #t = [];
            initialized = !1;
            constructor(e) {
              ((this.cmp = e),
                ([this.#e, this.#n] = ['resolve', 'reject'].map((e) => (n) => {
                  for (; this.#t.length; ) this.#t.pop()[e](n);
                })));
            }
            init(e) {
              const n = this.updateWhenReady(e);
              return (
                this.initialized ||
                  (e.gppVersion !== this.apiVersion &&
                    (0, i.logWarn)(`Unrecognized GPP CMP version: ${e.apiVersion}. Continuing using GPP API version ${this.apiVersion}...`),
                  (this.initialized = !0),
                  m || (m = (0, g.Al)('gpp')),
                  m.setCmpApi(this.cmp),
                  this.cmp({
                    command: 'addEventListener',
                    callback: (e, n) => {
                      (null == n || n
                        ? 'error' === e?.pingData?.cmpStatus
                          ? this.#n(new C('CMP status is "error"; please check CMP setup', e))
                          : this.isCMPReady(e?.pingData || {}) &&
                            ['sectionChange', 'signalStatus'].includes(e?.eventName) &&
                            this.#e(this.updateConsent(e.pingData))
                        : this.#n(new C('Received error response from CMP', e)),
                        null == o.ad.getConsentData() || null == e?.pingData || this.isCMPReady(e.pingData) || o.ad.setConsentData(null),
                        null != e?.listenerId && m?.setCmpListenerId(e?.listenerId));
                    },
                  })),
                n
              );
            }
            refresh() {
              return this.cmp({ command: 'ping' }).then(this.init.bind(this));
            }
            updateConsent(e) {
              return new u.U9((n) => {
                if (null == e || (0, i.isEmpty)(e)) throw new C('Received empty response from CMP', e);
                const t = P(e);
                ((0, i.logInfo)('Retrieved GPP consent from CMP:', t), o.ad.setConsentData(t), n(t));
              });
            }
            nextUpdate() {
              const e = (0, u.v6)();
              return (this.#t.push(e), e.promise);
            }
            updateWhenReady(e) {
              return this.isCMPReady(e) ? this.updateConsent(e) : this.nextUpdate();
            }
            isCMPReady(e) {
              return 'ready' === e.signalStatus;
            }
          }
          const S = {
            iab: function () {
              return new u.U9((e) => e(f.get().refresh()));
            },
          };
          function P(e) {
            if (
              (null != e?.applicableSections && !Array.isArray(e.applicableSections)) ||
              (null != e?.gppString && !(0, r.O8)(e.gppString)) ||
              (null != e?.parsedSections && !(0, r.Qd)(e.parsedSections))
            )
              throw new C('CMP returned unexpected value during lookup process.', e);
            return (
              ['usnatv1', 'uscav1'].forEach((n) => {
                e?.parsedSections?.[n] &&
                  (0, i.logWarn)(`Received invalid section from cmp: '${n}'. Some functionality may not work as expected`, e);
              }),
              v(e)
            );
          }
          function v(e = {}) {
            return {
              gppString: e?.gppString,
              applicableSections: e?.applicableSections || [],
              parsedSections: e?.parsedSections || {},
              gppData: e,
            };
          }
          const y = (0, d.yq)({
            namespace: 'gpp',
            displayName: 'GPP',
            consentDataHandler: o.ad,
            parseConsentData: P,
            getNullConsent: () => v(null),
            cmpHandlers: S,
            cmpEventCleanup: function () {
              (m && (m.removeCmpEventListener(), (m = null)), (h = {}), o.ad.reset(), (f.INST = null));
            },
          });
          (p.$W.getConfig('consentManagement', (e) =>
            (function (e) {
              return ((h = y(e)), h.loadConsentData?.()?.catch?.(() => null));
            })(e.consentManagement),
          ),
            l.wU.before(function (e, n) {
              return e(
                n.then((e) => {
                  const n = o.ad.getConsentData();
                  return (
                    n &&
                      (Array.isArray(n.applicableSections) && (0, a.J)(e, 'regs.gpp_sid', n.applicableSections),
                      (0, a.J)(e, 'regs.gpp', n.gppString)),
                    e
                  );
                }),
              );
            }),
            (0, s.E)('consentManagementGpp'));
        },
      },
      (e) => {
        e.O(0, [802, 7769, 5590, 1085, 10, 7109], () => {
          return ((n = 9489), e((e.s = n)));
          var n;
        });
        e.O();
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [5081],
      {
        2397(e, n, t) {
          var s = t(1129),
            o = t(7413),
            r = t(3435),
            a = t(3350),
            c = t(8384),
            i = t(1068),
            l = t(80),
            p = t(6344),
            d = t(4077),
            u = t(4390),
            g = t(9099),
            f = t(4056);
          let C,
            m,
            v = {};
          const b = f.I0,
            D = {
              iab: function (e) {
                return new Promise((n, t) => {
                  const s = (0, d.c5)({ apiName: '__tcfapi', apiVersion: b, apiArgs: ['command', 'version', 'callback', 'parameter'] });
                  (s || t(new Error('TCF2 CMP not found.')),
                    s.isDirect
                      ? (0, o.logInfo)('Detected CMP API is directly accessible, calling it now...')
                      : (0, o.logInfo)('Detected CMP is outside the current iframe where Prebid.js is located, calling it now...'),
                    A || (A = (0, g.Al)('tcf', () => i.mW.getConsentData())),
                    A.setCmpApi(s),
                    s({
                      command: 'addEventListener',
                      callback: function (s, r) {
                        if (((0, o.logInfo)('Received a response from CMP', s), r)) {
                          try {
                            e(P(s));
                          } catch (e) {}
                          if (!1 === s.gdprApplies || 'tcloaded' === s.eventStatus || 'useractioncomplete' === s.eventStatus)
                            try {
                              (null !== s.listenerId && void 0 !== s.listenerId && A?.setCmpListenerId(s.listenerId),
                                i.mW.setConsentData(P(s)),
                                n());
                            } catch (e) {
                              t(e);
                            }
                        } else t(Error('CMP unable to register callback function.  Please check CMP setup.'));
                      },
                    }));
                });
              },
            };
          let A = null;
          function P(e) {
            if (
              (function () {
                const n = e && 'boolean' == typeof e.gdprApplies ? e.gdprApplies : C,
                  t = e && e.tcString;
                return !('boolean' == typeof n && (!0 !== n || (t && (0, a.O8)(t))));
              })()
            )
              throw Object.assign(new Error('CMP returned unexpected value during lookup process.'), { args: [e] });
            return h(e);
          }
          function h(e) {
            const n = {
              consentString: e ? e.tcString : void 0,
              vendorData: e || void 0,
              gdprApplies: e && 'boolean' == typeof e.gdprApplies ? e.gdprApplies : C,
              apiVersion: b,
            };
            return (e && e.addtlConsent && (0, a.O8)(e.addtlConsent) && (n.addtlConsent = e.addtlConsent), n);
          }
          const y = (0, u.yq)({
            namespace: 'gdpr',
            displayName: 'TCF',
            consentDataHandler: i.mW,
            cmpHandlers: D,
            parseConsentData: P,
            getNullConsent: () => h(null),
            cmpEventCleanup: function () {
              (A && (A.removeCmpEventListener(), (A = null)), (v = {}), i.mW.reset());
            },
          });
          (c.$W.getConfig('consentManagement', (e) =>
            (function (e) {
              const n = e && (e.gdpr || e.usp || e.gpp ? e.gdpr : e);
              return (
                null != n?.consentData?.getTCData && (n.consentData = n.consentData.getTCData),
                (C = !0 === n?.defaultGdprScope),
                (m = !!n?.dsaPlatform),
                (v = y({ gdpr: n })),
                v.loadConsentData?.()?.catch?.(() => null)
              );
            })(e.consentManagement),
          ),
            p.wU.before(function (e, n) {
              return e(
                n.then((e) => {
                  const n = i.mW.getConsentData();
                  return (
                    n &&
                      ('boolean' == typeof n.gdprApplies && (0, r.J)(e, 'regs.ext.gdpr', n.gdprApplies ? 1 : 0),
                      (0, r.J)(e, 'user.ext.consent', n.consentString)),
                    m && (0, r.J)(e, 'regs.ext.dsa.dsarequired', 3),
                    e
                  );
                }),
              );
            }),
            (0, l.pS)({
              type: l.S3,
              name: 'gdprAddtlConsent',
              fn: function (e, n) {
                const t = n.gdprConsent?.addtlConsent;
                t && 'string' == typeof t && (0, r.J)(e, 'user.ext.ConsentedProvidersSettings.consented_providers', t);
              },
            }),
            (0, s.E)('consentManagementTcf'));
        },
      },
      (e) => {
        e.O(0, [802, 7769, 5590, 1085, 10, 7109], () => {
          return ((n = 2397), e((e.s = n)));
          var n;
        });
        e.O();
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [931],
      {
        4275(e, t, o) {
          var n = o(1068),
            r = o(1129),
            i = o(7413),
            s = o(8964),
            a = o(7686),
            c = o(1785),
            d = o(2354),
            l = o(7449);
          const p = s.RD.withCallers([['userId', 'criteo']]),
            g = 'criteo',
            u = (0, d.vM)({ moduleType: l.fW, moduleName: g }),
            m = 'cto_bidid',
            b = 'cto_bundle',
            f = 'html5',
            y = 'cookie',
            I = new Date(0).toString(),
            h = new Date((0, i.timestamp)() + 33696e6).toString();
          function S(e) {
            let t,
              o = e;
            do {
              if (((t = o), o && 'object' == typeof o && 'string' == typeof o.criteoId)) o = o.criteoId;
              else {
                if ('string' != typeof o || '{' !== o.trim().charAt(0)) break;
                try {
                  const e = JSON.parse(o);
                  if (!e || 'string' != typeof e.criteoId) return o;
                  o = e.criteoId;
                } catch (e) {
                  break;
                }
              }
            } while (o !== t);
            return 'string' == typeof o && o ? o : void 0;
          }
          function C(e, t = !1) {
            const o = (0, i.parseUrl)(e, { noDecodeWholeURL: !0 });
            return t ? `${o.hostname}` : `${o.protocol}://${o.hostname}${o.port ? ':' + o.port : ''}/`;
          }
          function U(e, t) {
            return e?.storage?.type === f
              ? u.getDataFromLocalStorage(t)
              : e?.storage?.type === y
                ? u.getCookie(t)
                : u.getCookie(t) || u.getDataFromLocalStorage(t);
          }
          function v(e, t, o, n) {
            t &&
              o &&
              (e?.storage?.type === f
                ? u.setDataInLocalStorage(t, o)
                : (e?.storage?.type === y || u.setDataInLocalStorage(t, o), w(t, o, h, n, !0)));
          }
          function w(e, t, o, n, r) {
            const i = n.split('.');
            for (let n = 0; n < i.length; ++n) {
              const s = i.slice(i.length - n - 1, i.length).join('.');
              try {
                if ((u.setCookie(e, t, o, null, '.' + s), r)) {
                  const o = u.getCookie(e);
                  if (o && o === t) break;
                }
              } catch (e) {}
            }
          }
          function k(e, t, o) {
            const r = (void 0 === e?.storage?.type || e?.storage?.type === y) && u.cookiesAreEnabled(),
              s = (void 0 === e?.storage?.type || e?.storage?.type === f) && u.localStorageIsEnabled(),
              c = C((0, a.EN)().page),
              d = C(document.location.href, !0),
              l = 'undefined' != typeof criteo_pubtag,
              g = (function (e, t, o, r, i, s, a) {
                let c =
                  '../../gum.criteo.com/sid/json__qorigin_prebi' +
                  (e ? '&topUrl=' + encodeURIComponent(e) : '') +
                  (t ? '&domain=' + encodeURIComponent(t) : '') +
                  (o ? '&bundle=' + encodeURIComponent(o) : '') +
                  (r ? '&info=' + encodeURIComponent(r) : '') +
                  (i ? '&cw=1' : '') +
                  (a ? '&pbt=1' : '') +
                  (s ? '&lsw=1' : '');
                const d = n.t6.getConsentData();
                d && (c += `&us_privacy=${encodeURIComponent(d)}`);
                const l = n.mW.getConsentData();
                l &&
                  ((c = c + '' + (l.consentString ? '&gdprString=' + encodeURIComponent(l.consentString) : '')),
                  (c = c + '&gdpr=' + (!0 === l.gdprApplies ? 1 : 0)));
                const p = n.ad.getConsentData();
                return (
                  p &&
                    ((c = c + '' + (p.gppString ? '&gpp=' + encodeURIComponent(p.gppString) : '')),
                    (c = c + '' + (p.applicableSections ? '&gpp_sid=' + encodeURIComponent(p.applicableSections) : ''))),
                  c
                );
              })(c, d, t.bundle, t.dnaBundle, r, s, l),
              h = {
                success: (t) => {
                  const n = JSON.parse(t);
                  if (
                    (n.pixels &&
                      n.pixels.forEach((t) =>
                        (function (e, t, o) {
                          o.writeBundleInStorage && o.bundlePropertyName && o.storageKeyName
                            ? p(
                                o.pixelUrl,
                                {
                                  success: (n) => {
                                    if (n) {
                                      const r = JSON.parse(n);
                                      r && r[o.bundlePropertyName] && v(e, o.storageKeyName, r[o.bundlePropertyName], t);
                                    }
                                  },
                                  error: (e) => {
                                    (0, i.logError)('criteoIdSystem: unable to sync user id', e);
                                  },
                                },
                                void 0,
                                { method: 'GET', withCredentials: !0 },
                              )
                            : (0, i.triggerPixel)(o.pixelUrl);
                        })(e, d, t),
                      ),
                    n.acwsUrl)
                  ) {
                    ('string' == typeof n.acwsUrl ? [n.acwsUrl] : n.acwsUrl).forEach((e) => (0, i.triggerPixel)(e));
                  } else n.bundle && v(e, b, n.bundle, d);
                  var r;
                  n.bidId ? (v(e, m, n.bidId, d), o(n.bidId)) : (w((r = m), '', I, d, !0), u.removeDataFromLocalStorage(r), o());
                },
                error: (e) => {
                  ((0, i.logError)('criteoIdSystem: unable to sync user id', e), o());
                },
              };
            p(g, h, void 0, { method: 'GET', contentType: 'application/json', withCredentials: !0 });
          }
          const D = {
            name: g,
            gvlid: 91,
            decode(e) {
              const t = S(e);
              return t ? { criteoId: t } : void 0;
            },
            getId(e) {
              const t = (function (e) {
                return { bundle: U(e, b), dnaBundle: U(e, 'cto_dna_bundle'), bidId: S(U(e, m)) };
              })(e);
              return { id: t.bidId, callback: (o) => k(e, t, o) };
            },
            eids: { criteoId: { source: 'criteo.com', atype: 1 } },
          };
          ((0, c.bz)('userId', D),
            (0, r.E)('criteoIdSystem'),
            Object.assign(n.W1, {
              91: { purposes: [1, 2, 3, 4, 7, 9, 10], legIntPurposes: [], flexiblePurposes: [10], specialFeatures: [] },
            }));
        },
      },
      (e) => {
        e.O(0, [802, 7769, 5590, 1085], () => {
          return ((t = 4275), e((e.s = t)));
          var t;
        });
        e.O();
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [6466],
      {
        6588(e, r, n) {
          var o = n(1129),
            t = n(7413),
            c = n(3435),
            i = n(5521),
            s = n(8964),
            u = n(8384),
            a = n(1785),
            f = n(8203),
            l = n(80),
            d = n(2822),
            y = n(3399),
            g = n(6344),
            v = n(1464),
            p = n(8224);
          let C,
            h = [],
            b = {},
            $ = !1,
            R = !0,
            m = 'USD';
          var I = !1,
            S = {};
          let U,
            N = {},
            O = !0,
            T = (0, f.v6)();
          const w = (0, v.L)();
          let Y = 0;
          function D(e) {
            if (
              ((C = 'https://cdn.jsdelivr.net/gh/prebid/currency-file@1/latest.json?date=$$TODAY$$'),
              null !== e.rates && 'object' == typeof e.rates && ((S.conversions = e.rates), (O = !1), ($ = !0), (R = !1)),
              O && null !== e.defaultRates && 'object' == typeof e.defaultRates && ((U = e.defaultRates), (S.conversions = U), ($ = !0)),
              'string' == typeof e.adServerCurrency)
            ) {
              ((Y = e.auctionDelay),
                (0, t.logInfo)('enabling currency support', e),
                (m = e.adServerCurrency),
                e.conversionRateFile &&
                  ((0, t.logInfo)('currency using override conversionRateFile:', e.conversionRateFile), (C = e.conversionRateFile)));
              const r = C.indexOf('$$TODAY$$');
              if (-1 !== r) {
                const e = new Date();
                let n = `${e.getMonth() + 1}`,
                  o = `${e.getDate()}`;
                (n.length < 2 && (n = `0${n}`), o.length < 2 && (o = `0${o}`));
                const t = `${e.getFullYear()}${n}${o}`;
                C = `${C.substring(0, r)}${t}${C.substring(r + 9, C.length)}`;
              }
              ((b = {}),
                I ||
                  ((I = !0),
                  (0, p.xu)('convertCurrency', A, !1),
                  (0, a.Yn)('addBidResponse').before(j, 100),
                  (0, a.Yn)('responsesReady').before(F),
                  g.wU.before(x),
                  (0, a.Yn)('requestBids').before(B, 50),
                  (0, y.on)(i.qY.AUCTION_TIMEOUT, _),
                  (0, y.on)(i.qY.AUCTION_INIT, E),
                  E()));
            } else
              ((Y = 0),
                (0, t.logInfo)('disabling currency support'),
                I &&
                  ((0, a.Yn)('addBidResponse').getHooks({ hook: j }).remove(),
                  (0, a.Yn)('responsesReady').getHooks({ hook: F }).remove(),
                  g.wU.getHooks({ hook: x }).remove(),
                  (0, a.Yn)('requestBids').getHooks({ hook: B }).remove(),
                  (0, y.AU)(i.qY.AUCTION_TIMEOUT, _),
                  (0, y.AU)(i.qY.AUCTION_INIT, E),
                  delete (0, o.m)().convertCurrency,
                  (m = 'USD'),
                  (b = {}),
                  (I = !1),
                  ($ = !1),
                  (R = !0),
                  (O = !0),
                  (S = {}),
                  (N = {}),
                  (T = (0, f.v6)())));
            'object' == typeof e.bidderCurrencyDefault && (N = e.bidderCurrencyDefault);
          }
          function k(e) {
            U
              ? ((0, t.logWarn)(e), (0, t.logWarn)('Currency failed loading rates, falling back to currency.defaultRates'))
              : (0, t.logError)(e);
          }
          function E() {
            R
              ? ((R = !1),
                ($ = !1),
                (0, s.lc)(C, {
                  success: function (e) {
                    try {
                      ((S = JSON.parse(e)),
                        (0, t.logInfo)('currencyRates set to ' + JSON.stringify(S)),
                        (b = {}),
                        ($ = !0),
                        (O = !1),
                        W(),
                        w.resume());
                    } catch (r) {
                      k('Failed to parse currencyRates response: ' + e);
                    }
                  },
                  error: function (e) {
                    (k(e), ($ = !0), W(), w.resume(), (R = !0));
                  },
                }))
              : W();
          }
          function A(e, r, n) {
            return parseFloat(e) * q(r, n);
          }
          function F(e, r) {
            e(r.then(() => T.promise));
          }
          u.$W.getConfig('currency', (e) => D(e.currency));
          const j = (0, d.NL)('currency', function (e, r, n, o) {
            if (!n) return e.call(this, r, n, o);
            const c = n.bidderCode || n.bidder;
            if (N[c]) {
              const e = N[c];
              n.currency && e !== n.currency
                ? (0, t.logWarn)(`Currency default '${c}: ${e}' ignored. adapter specified '${n.currency}'`)
                : (n.currency = e);
            }
            if (
              (n.currency || ((0, t.logWarn)('Currency not specified on bid.  Defaulted to "USD"'), (n.currency = 'USD')),
              (n.getCpmInNewCurrency = function (e) {
                return (parseFloat(this.cpm) * q(this.currency, e)).toFixed(3);
              }),
              n.currency === m)
            )
              return e.call(this, r, n, o);
            (h.push([e, this, r, n, o]), (I && !$) || W());
          });
          function _({ auctionId: e }) {
            h = h.filter(([r, n, o, t, c]) => t.auctionId !== e || (c(i.Tf.CANNOT_CONVERT_CURRENCY), !1));
          }
          function W() {
            for (; h.length > 0; ) {
              const [e, r, n, o, c] = h.shift();
              if (void 0 !== o && 'currency' in o && 'cpm' in o) {
                const e = o.currency;
                try {
                  const r = q(e);
                  1 !== r && ((o.cpm = (parseFloat(o.cpm) * r).toFixed(4)), (o.currency = m));
                } catch (e) {
                  ((0, t.logWarn)('getCurrencyConversion threw error: ', e), c(i.Tf.CANNOT_CONVERT_CURRENCY));
                  continue;
                }
              }
              e.call(r, n, o, c);
            }
            T.resolve();
          }
          function q(e, r = m) {
            var n, o;
            const c = `${e}->${r}`;
            if (c in b) ((n = b[c]), (0, t.logMessage)('Using conversionCache value ' + n + ' for ' + c));
            else if (!1 === I) {
              if ('USD' !== e) throw new Error('Prebid currency support has not been enabled and fromCurrency is not USD');
              n = 1;
            } else if (e === r) n = 1;
            else if (e in S.conversions) {
              if (!(r in (o = S.conversions[e])))
                throw new Error("Specified adServerCurrency in config '" + r + "' not found in the currency rates file");
              ((n = o[r]), (0, t.logInfo)('getCurrencyConversion using direct ' + e + ' to ' + r + ' conversionRate ' + n));
            } else if (r in S.conversions) {
              if (!(e in (o = S.conversions[r])))
                throw new Error("Specified fromCurrency '" + e + "' not found in the currency rates file");
              ((n = M(1 / o[e], 4)), (0, t.logInfo)('getCurrencyConversion using reciprocal ' + e + ' to ' + r + ' conversionRate ' + n));
            } else {
              var i = Object.keys(S.conversions)[0];
              if (!(e in S.conversions[i])) throw new Error("Specified fromCurrency '" + e + "' not found in the currency rates file");
              var s = 1 / S.conversions[i][e];
              if (!(r in S.conversions[i]))
                throw new Error("Specified adServerCurrency in config '" + r + "' not found in the currency rates file");
              ((n = M(s * S.conversions[i][r], 4)),
                (0, t.logInfo)('getCurrencyConversion using intermediate ' + e + ' thru ' + i + ' to ' + r + ' conversionRate ' + n));
            }
            return (c in b || ((0, t.logMessage)('Adding conversionCache value ' + n + ' for ' + c), (b[c] = n)), n);
          }
          function M(e, r) {
            var n = 1;
            for (let e = 0; e < r; e++) n += '0';
            return Math.round(e * n) / n;
          }
          function x(e, r) {
            return e(r.then((e) => ((0, c.J)(e, 'ext.prebid.adServerCurrency', m), e)));
          }
          (0, l.pS)({
            type: l.S3,
            name: 'currency',
            fn: function (e, r, n) {
              I && (e.cur = e.cur || [n.currency || m]);
            },
          });
          const B = (0, d.Ak)('currency', function (e, r) {
            const n = ((o = this), () => e.call(o, r));
            var o;
            !$ && Y > 0
              ? w.submit(Y, n, () => {
                  ((0, t.logWarn)(`currency: Fetch attempt did not return in time for auction ${r.auctionId}`), n());
                })
              : n();
          });
          (0, o.E)('currency');
        },
      },
      (e) => {
        e.O(0, [802, 7769, 5590, 1085, 5957], () => {
          return ((r = 6588), e((e.s = r)));
          var r;
        });
        e.O();
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [5538],
      {
        7606(e, t, i) {
          var r = i(1068),
            d = i(1129),
            s = i(6271),
            o = i(2668),
            a = i(2682),
            p = i(8384),
            n = i(1779),
            u = i(6901),
            b = i(2354),
            l = i(7413),
            m = i(8928),
            c = i(3435);
          const g = 'equativ',
            h = 'Equativ:';
          let f = [],
            v = {},
            y = 0,
            I = {};
          function q(e) {
            return !(
              (e.mediaTypes.video && '{}' === JSON.stringify(e.mediaTypes.video)) ||
              (e.mediaTypes.native && '{}' === JSON.stringify(e.mediaTypes.native))
            );
          }
          const k = (0, b.vM)({ bidderCode: g }),
            x = {
              code: g,
              gvlid: 45,
              supportedMediaTypes: [n.D4, n.G_, n.s6],
              buildRequests: (e, t) => {
                if (0 === e.filter(q).length)
                  return void (0, l.logError)(`${h} No useful bid requests to process. No requests will be sent.`, e);
                const i = [];
                return (
                  e.forEach((e) => {
                    if (!q(e)) return void (0, l.logWarn)(`${h} Skipping bid: invalid media types.`, e.bidId);
                    const r = A.toORTB({ bidRequests: [e], bidderRequest: t });
                    r
                      ? r.id
                        ? r.imp?.length
                          ? i.push({ data: r, method: 'POST', url: 'https://ssb-global.smartadserver.com/api/bid?callerId=169' })
                          : (0, l.logWarn)(`${h} Skipping bid: no valid impressions after processing.`, e.bidId)
                        : (0, l.logWarn)(`${h} Skipping bid: request is missing required id field.`, e.bidId)
                      : (0, l.logWarn)(`${h} Skipping bid: converter returned empty data.`, e.bidId);
                  }),
                  i
                );
              },
              interpretResponse: (e, t) => (
                t.data?.imp?.length &&
                  t.data.imp.forEach((e) => {
                    e.id = v[e.id];
                  }),
                e.body?.seatbid?.length &&
                  e.body.seatbid
                    .filter((e) => e?.bid?.length)
                    .forEach((e) =>
                      e.bid.forEach((e) => {
                        ((e.impid = v[e.impid]),
                          (0, m.A)(e, 'ext.feedback_token') && (I[e.impid] = e.ext.feedback_token),
                          (e.ttl = 'number' == typeof e.exp && e.exp > 0 ? e.exp : 300));
                      }),
                    ),
                A.fromORTB({ request: t.data, response: e.body })
              ),
              isBidRequestValid: (e) =>
                !!(
                  (0, m.A)(e, 'params.networkId') ||
                  (0, m.A)(e, 'ortb2.site.publisher.id') ||
                  (0, m.A)(e, 'ortb2.app.publisher.id') ||
                  (0, m.A)(e, 'ortb2.dooh.publisher.id')
                ),
              getUserSyncs: (e, t, i) => (0, o.Wz)(e, t, i, y, k),
            },
            A = (0, s.A)({
              context: { netRevenue: !0, ttl: 300 },
              bidResponse(e, t, i) {
                const { bidRequest: r } = i,
                  d = e(t, i);
                if (d.mediaType === n.G_ && 'outstream' === r.mediaTypes.video.context) {
                  const e = u.A4.install({
                    adUnitCode: r.adUnitCode,
                    id: r.bidId,
                    url: 'https://apps.sascdn.com/diff/video-outstream/equativ-video-outstream.js',
                  });
                  (e.setRender((e) => {
                    e.renderer.push(() => {
                      window.EquativVideoOutstream.renderAd({ slotId: e.adUnitCode, vast: e.vastUrl || e.vastXml });
                    });
                  }),
                    (d.renderer = e));
                }
                return d;
              },
              imp(e, t, i) {
                const r = e(t, i),
                  { siteId: d, pageId: s, formatId: o } = t.params || {};
                (delete r.dt,
                  (r.secure = 1),
                  (r.tagid = t.adUnitCode),
                  (r.displaymanager ||= 'Prebid.js'),
                  (r.displaymanagerver ||= '11.23.0'),
                  !(0, m.A)(t, 'ortb2Imp.rwdd') &&
                    (0, m.A)(t, 'mediaTypes.video.ext.rewarded') &&
                    (0, l.mergeDeep)(r, { rwdd: t.mediaTypes.video.ext.rewarded }));
                const a = { ...(d && { siteId: d }), ...(s && { pageId: s }), ...(o && { formatId: o }) };
                return (Object.keys(a).length && (0, l.mergeDeep)(r.ext, { bidder: a }), r);
              },
              request(e, t, i, r) {
                const d = r.bidRequests[0],
                  s = p.$W.getConfig('currency.adServerCurrency') || 'USD',
                  a = (0, o.Fd)(t, d, s, v, 'eqtv');
                let n = e(a, i, r);
                if (!a?.length) return n;
                let u =
                  ['ortb2.site.publisher', 'ortb2.app.publisher', 'ortb2.dooh.publisher'].find((e) => (0, m.A)(d, e)) ||
                  'ortb2.site.publisher';
                ((y = (0, m.A)(d, u + '.id') || (0, m.A)(d, 'params.networkId')),
                  (0, c.J)(n, u.replace('ortb2.', '') + '.id', y),
                  [
                    { path: 'mediaTypes.video', props: ['mimes', 'placement'] },
                    { path: 'ortb2Imp.audio', props: ['mimes'] },
                    { path: 'mediaTypes.native.ortb', props: ['privacy', 'plcmttype', 'eventtrackers'] },
                  ].forEach(({ path: e, props: t }) => {
                    (0, m.A)(d, e) &&
                      t.forEach((t) => {
                        (0, m.A)(d, `${e}.${t}`) ||
                          (0, l.logWarn)(
                            `${h} Property "${e}.${t}" is missing from request. Request will proceed, but the use of "${t}" is strongly encouraged.`,
                            d.bidId,
                          );
                      });
                  }));
                const b = k.getDataFromLocalStorage(o.mN);
                return (
                  b && (0, c.J)(n, 'user.buyeruid', b),
                  (0, c.J)(n, 'ext.equativprebidjsversion', '11.23.0'),
                  (n = (function (e) {
                    return (
                      e?.ext?.prebid?.previousauctioninfo &&
                        (e.ext.prebid.previousauctioninfo.forEach((e) => {
                          I[e?.bidId] &&
                            (f.push({
                              feedback_token: I[e.bidId],
                              loss: e.bidderCpm === e.highestBidCpm ? 0 : 102,
                              price: e.highestBidCpm,
                            }),
                            delete I[e.bidId]);
                        }),
                        delete e.ext.prebid),
                      f.length && ((0, c.J)(e, 'ext.bid_feedback', f[0]), f.shift()),
                      e
                    );
                  })(n)),
                  n
                );
              },
            });
          ((0, a.a$)(x),
            (0, d.E)('equativBidAdapter'),
            Object.assign(r.W1, { 45: { purposes: [1, 2, 3, 4, 7, 10], legIntPurposes: [], flexiblePurposes: [], specialFeatures: [1] } }));
        },
      },
      (e) => {
        e.O(0, [802, 7769, 5590, 1085, 8498, 4577, 467], () => {
          return ((t = 7606), e((e.s = t)));
          var t;
        });
        e.O();
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [5594],
      {
        3528(e, n, t) {
          var r = t(1068),
            o = t(1129),
            s = t(7413),
            i = t(8928),
            u = t(1785),
            a = t(2354),
            d = t(7449),
            p = t(1531);
          const l = 'euid',
            c = `PrebidJS-11.23.0-EUIDModule-${p.kz}`,
            f = 'EUID: ';
          function g(e, n) {
            return function (...t) {
              e(n + ' ', ...t);
            };
          }
          const m = g(s.logInfo, f),
            v = g(s.logWarn, f),
            I = (0, a.vM)({ moduleType: d.fW, moduleName: l });
          const k = {
            name: l,
            gvlid: 21,
            decode(e) {
              const n = (function (e) {
                if ('string' == typeof e) {
                  m('Found server-only token. Refresh is unavailable for this token.');
                  return { euid: { id: e } };
                }
                if ('optout' === e.latestToken)
                  return (m('Found optout token.  Refresh is unavailable for this token.'), { euid: { optout: !0 } });
                if (Date.now() < e.latestToken.identity_expires) return { euid: { id: e.latestToken.advertising_token } };
                return null;
              })(e);
              return (m('EUID decode returned', n), n);
            },
            getId(e, n) {
              if (!0 !== n?.gdpr?.gdprApplies)
                return void (0, s.logWarn)('EUID is intended for use within the EU. The module will not run when GDPR does not apply.');
              if (
                !(function (e) {
                  const n = !0 === e?.gdprApplies,
                    t = (0, i.A)(e, 'vendorData.purpose.consents.1'),
                    r = (0, i.A)(e, `vendorData.vendor.consents.${(21).toString()}`);
                  return !!(!n || (t && r));
                })(n?.gdpr)
              )
                return void v('Unable to use EUID module due to insufficient consent. The EUID module requires storage permission.');
              const t = {
                apiBaseUrl: e?.params?.euidApiBase ?? 'https://prod.euid.eu',
                paramToken: e?.params?.euidToken,
                serverCookieName: e?.params?.euidCookie,
                storage: e?.params?.storage ?? 'localStorage',
                clientId: c,
                internalStorage: '__euid_advertising_token',
              };
              ((t.cstg = {
                serverPublicKey: e?.params?.serverPublicKey,
                subscriptionId: e?.params?.subscriptionId,
                ...(0, p.E0)(e?.params ?? {}),
              }),
                m('EUID configuration loaded and mapped.', t));
              const r = (0, p.wq)(t, I, m, v);
              return (m('EUID getId returned', r), r);
            },
            eids: {
              euid: {
                source: 'euid.eu',
                atype: 3,
                getValue: function (e) {
                  return e.id;
                },
              },
            },
          };
          ((0, u.bz)('userId', k),
            (0, o.E)('euidIdSystem'),
            Object.assign(r.W1, {
              21: { purposes: [1, 3, 4], legIntPurposes: [2, 7, 10], flexiblePurposes: [2, 7, 10], specialFeatures: [1] },
            }));
        },
      },
      (e) => {
        e.O(0, [802, 7769, 5590, 1085, 1912], () => {
          return ((n = 3528), e((e.s = n)));
          var n;
        });
        e.O();
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [2355],
      {
        8187(e, t, a) {
          var r = a(1129),
            n = a(828),
            o = a(8465),
            i = a(84),
            s = a(9015),
            c = a(8384),
            l = a(5521),
            u = a(3399),
            d = a(7686),
            p = a(8347),
            m = a(7413),
            f = a(3350),
            g = a(4374),
            h = a(5725),
            b = a(8964),
            y = a(7916),
            v = a(4864),
            A = a(1068);
          const w = { ri: d.EN },
            S = 'VASTAdTagURI';
          function U(e) {
            if (!e.params && !e.url)
              return void (0, m.logError)(`A params object or a url is required to use ${(0, v.k)()}.adServers.gam.buildVideoUrl`);
            const t = e.adUnit,
              a = e.bid || p.iS.getWinningBids(t.code)[0];
            let r = {};
            if (e.url && ((r = (0, m.parseUrl)(e.url, { noDecodeWholeURL: !0 })), (0, m.isEmpty)(e.params)))
              return (function (e, t, a) {
                const r = _(t, e, 'search');
                r && (e.search.description_url = r);
                return ((e.search.cust_params = C(t, a, e.search.cust_params)), (0, m.buildUrl)(e));
              })(r, a, e);
            const o = {
                correlator: Date.now(),
                sz: (0, m.parseSizesInput)(t?.mediaTypes?.video?.playerSize).join('|'),
                url: encodeURIComponent(location.href),
              },
              c = r.search,
              l = c && c.sz;
            l && (o.sz = l + '|' + o.sz);
            const u = C(a, e, c && c.cust_params),
              d = Object.assign({}, g.Mu, r.search, o, e.params, { cust_params: u }, (0, g.QS)());
            if (window.google?.ima) {
              const e = A.t6.getConsentData?.(),
                t = A.ad.getConsentData?.();
              if (!e && t) {
                const e = (function (e) {
                  if (!e) return;
                  const t = e.gppData?.parsedSections;
                  if (t) {
                    if (t.uspv1) {
                      const e = t.uspv1;
                      return `${e.Version}${e.Notice}${e.OptOutSale}${e.LspaCovered}`;
                    }
                    {
                      let e, a;
                      if (
                        (Object.values(t).forEach((t) => {
                          (Array.isArray(t) ? t : [t]).forEach((t) => {
                            const r = t.SaleOptOut,
                              n = t.SaleOptOutNotice;
                            void 0 === e && void 0 === a && null != r && null != n && ((e = r), (a = n));
                          });
                        }),
                        void 0 !== e && void 0 !== a)
                      ) {
                        const t = 0 === e ? '-' : 1 === e ? 'Y' : 'N',
                          r = 0 === a ? '-' : 1 === a ? 'Y' : 'N';
                        return `1${r}${t}${'-' === t && '-' === r ? '-' : 'Y'}`;
                      }
                    }
                  }
                  return;
                })(t);
                e && (d.us_privacy = e);
              }
            }
            const h = _(a, e, 'params');
            if ((h && (d.description_url = h), !d.ppid)) {
              const e = (0, i.Q)();
              null != e && (d.ppid = e);
            }
            const b = e.adUnit?.mediaTypes?.video;
            Object.entries({
              plcmt: () => b?.plcmt,
              min_ad_duration: () => ((0, f.Et)(b?.minduration) ? 1e3 * b.minduration : null),
              max_ad_duration: () => ((0, f.Et)(b?.maxduration) ? 1e3 * b.maxduration : null),
              vpos() {
                const e = b?.startdelay;
                if ((0, f.Et)(e)) return -2 === e ? 'postroll' : -1 === e || e > 0 ? 'midroll' : 'preroll';
              },
              vconp: () => (Array.isArray(b?.playbackmethod) && b.playbackmethod.some((e) => 7 === e) ? '2' : void 0),
              vpa() {
                if (Array.isArray(b?.playbackmethod)) {
                  const e = b.playbackmethod.some((e) => 3 === e),
                    t = b.playbackmethod.some((e) => [1, 2, 4, 5, 6].includes(e));
                  if (e && !t) return 'click';
                  if (t && !e) return 'auto';
                }
              },
              vpmute() {
                if (Array.isArray(b?.playbackmethod)) {
                  const e = b.playbackmethod.some((e) => [2, 6].includes(e)),
                    t = b.playbackmethod.some((e) => [1, 3, 4, 5].includes(e));
                  if (e && !t) return '1';
                  if (t && !e) return '0';
                }
              },
            }).forEach(([e, t]) => {
              if (!d.hasOwnProperty(e)) {
                const a = t();
                null != a && (d[e] = a);
              }
            });
            const y = s.n.index.getBidRequest(e.bid || {})?.ortb2 ?? s.n.index.getAuction(e.bid || {})?.getFPD()?.global,
              w = (0, n.eu)(y);
            return (
              w.length && (d.ppsj = btoa(JSON.stringify({ PublisherProvidedTaxonomySignals: w }))),
              (0, m.buildUrl)(Object.assign({}, g.P8, r, { search: d }))
            );
          }
          function _(e, t, a) {
            return t?.[a]?.description_url || encodeURIComponent(w.ri().page);
          }
          function C(e, t, a) {
            const r = (e && e.adserverTargeting) || {};
            let n = {};
            const o = t && t.adUnit;
            if (o) {
              const e = p.iS.getAllTargeting(o.code);
              n = e ? e[o.code] : {};
            }
            const i = Object.assign({}, { hb_uuid: e && e.videoCacheKey }, { hb_cache_id: e && e.videoCacheKey }, n, r);
            u.Ic(l.qY.SET_TARGETING, { [o.code]: i });
            const s = t?.params?.cust_params,
              c = Object.assign({}, i, s);
            let d = encodeURIComponent((0, m.formatQS)(c));
            return (a && (d = a + '%26' + d), d);
          }
          async function k(e, t) {
            try {
              const a = (0, y.A)(),
                r = a.parse(e),
                n = r.querySelectorAll(S)[0];
              if (!n || !n.textContent) return e;
              const o = new RegExp('[A-Fa-f0-9]{8}-(?:[A-Fa-f0-9]{4}-){3}[A-Fa-f0-9]{12}', 'gi'),
                i = Array.from(n.textContent.matchAll(o))
                  .map(([e]) => e)
                  .filter((e) => t.has(e));
              if (1 !== i.length) return ((0, m.logWarn)(`Unable to determine unique uuid in ${S}`), e);
              const s = i[0],
                c = t.get(s),
                l = await (async function (e) {
                  const t = await (0, b.b1)(e);
                  if (!t.ok) throw ((0, m.logError)('Unable to fetch blob'), new Error('Blob not found'));
                  const a = await t.text();
                  return `data://text/xml;base64,${btoa(a)}`;
                })(c),
                u = r.createCDATASection(l);
              return ((n.textContent = ''), n.appendChild(u), a.serialize(r));
            } catch (t) {
              return ((0, m.logWarn)('Unable to process xml', t), e);
            }
          }
          ((0, o.U)('gam', {
            buildVideoUrl: U,
            getVastXml: async function (e, t = h.kh) {
              let a = U(e);
              const r = e.adUnit,
                n = r?.mediaTypes?.video,
                o = (n?.api || []).join(','),
                i = A.t6.getConsentData?.();
              if (c.$W.getConfig('cache.useLocal') && window.google?.ima) {
                a = new URL(a);
                const e = `h.${window.google.ima.VERSION}`;
                (a.searchParams.set('omid_p', `Google1/${e}`),
                  a.searchParams.set('sdkv', e),
                  o && a.searchParams.set('sdk_apis', o),
                  i && a.searchParams.set('us_privacy', i),
                  (a = a.toString()));
              }
              const s = await (0, b.b1)(a);
              if (!s.ok) throw new Error('Unable to fetch GAM VAST wrapper');
              const l = await s.text();
              if (c.$W.getConfig('cache.useLocal')) {
                return await k(l, t);
              }
              return l;
            },
          }),
            (0, r.E)('gamAdServerVideo'));
        },
      },
      (e) => {
        e.O(0, [802, 7769, 5590, 1085, 3005, 41, 7650], () => {
          return ((t = 8187), e((e.s = t)));
          var t;
        });
        e.O();
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [6047],
      {
        9167(e, n, o) {
          var t = o(1068),
            r = o(1129),
            a = o(8964),
            s = o(2354),
            d = o(1785),
            p = o(7413),
            i = o(3350),
            c = o(8384),
            g = o(7449);
          const l = a.RD.withCallers([['userId', 'hadronId']]),
            u = 'hadronId',
            m = `[${u}System]`,
            I = 'auHadronId',
            h = (0, s.vM)({ moduleType: g.fW, moduleName: u });
          const f = c.$W.getConfig('debug') || !1,
            b = {
              name: u,
              gvlid: 561,
              decode: (e) => ({ hadronId: (0, i.O8)(e) ? e : e.hasOwnProperty('id') ? e.id[u] : e[u] }),
              getId(e) {
                ((0, p.logInfo)(m, 'getId is called', e), (0, i.Qd)(e.params) || (e.params = {}));
                let n = '';
                if (((n = h.getDataFromLocalStorage(I)), (0, i.O8)(n) && n.length > 0))
                  return ((0, p.logInfo)(m, `${I} found in localStorage = ${n}`), { id: n });
                const o = 0 | e.params.partnerId;
                return {
                  callback: function (r) {
                    let a = {};
                    const s = {
                      success: (e) => {
                        if (e) {
                          try {
                            a = JSON.parse(e);
                          } catch (e) {
                            ((0, p.logError)(e), r());
                          }
                          ((0, p.logInfo)(m, `Response from backend is ${e}`, a),
                            (0, i.Qd)(a) && a.hasOwnProperty(u) && (n = a[u]),
                            (a = n));
                        }
                        r(a);
                      },
                      error: (e) => {
                        ((0, p.logError)(`${u}: ID fetch encountered an error`, e), r());
                      },
                    };
                    let d = ((e, n) => e + (e.indexOf('?') > -1 ? '&' : '?') + n)(
                      ((c = e.params.url),
                      (g = 'https://id.hadron.ad.gt/api/v1/pbhid'),
                      (I = e.params.urlArg),
                      (0, i.fp)(c) ? c(I) : (0, i.O8)(c) ? c : g),
                      `partner_id=${o}&_it=prebid&t=1&src=id&domain=${document.location.hostname}`,
                    );
                    var c, g, I;
                    f && (d += '&debug=1');
                    const h = t.mW.getConsentData();
                    h &&
                      ((d += '' + (h.consentString ? '&gdprString=' + encodeURIComponent(h.consentString) : '')),
                      (d += '&gdpr=' + (!0 === h.gdprApplies ? 1 : 0)));
                    const b = t.t6.getConsentData();
                    b && (d += `&us_privacy=${encodeURIComponent(b)}`);
                    const S = t.ad.getConsentData();
                    (S &&
                      ((d += '' + (S.gppString ? '&gpp=' + encodeURIComponent(S.gppString) : '')),
                      (d += '' + (S.applicableSections ? '&gpp_sid=' + encodeURIComponent(S.applicableSections) : ''))),
                      (0, p.logInfo)(m, `${u} not found, calling home (${d})`),
                      l(d, s, void 0, { method: 'GET' }));
                  },
                };
              },
              eids: { hadronId: { source: 'audigent.com', atype: 1 } },
            };
          ((0, d.bz)('userId', b),
            (0, r.E)('hadronIdSystem'),
            Object.assign(t.W1, {
              561: { purposes: [1, 2, 3, 4, 5, 9, 10], legIntPurposes: [], flexiblePurposes: [], specialFeatures: [] },
            }));
        },
      },
      (e) => {
        e.O(0, [802, 7769, 5590, 1085], () => {
          return ((n = 9167), e((e.s = n)));
          var n;
        });
        e.O();
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [6497],
      {
        8319(e, t, r) {
          var n = r(1068),
            i = r(1129),
            o = r(7413),
            s = r(8928),
            a = r(3435),
            d = r(3350),
            c = r(8964),
            u = r(1785),
            g = r(7686),
            p = r(2354),
            l = r(7449),
            f = r(8203),
            h = r(8468);
          const w = c.hd.withCallers([['userId', 'id5Id']]),
            m = 'id5id',
            b = 'User ID - ID5 submodule: ',
            y = 'id5-sync.com',
            v = (0, p.vM)({ moduleType: l.fW, moduleName: 'id5Id' }),
            I = {
              id5id: {
                getValue: function (e) {
                  return e.uid;
                },
                source: y,
                atype: 1,
                getUidExt: function (e) {
                  if (e.ext) return e.ext;
                },
              },
              euid: {
                getValue: function (e) {
                  return e.uid;
                },
                getSource: function (e) {
                  return e.source;
                },
                atype: 3,
                getUidExt: function (e) {
                  if (e.ext) return e.ext;
                },
              },
              trueLinkId: {
                getValue: function (e) {
                  return e.uid;
                },
                getSource: function () {
                  return 'true-link-id5-sync.com';
                },
                atype: 1,
                getUidExt: function (e) {
                  if (e.ext) return e.ext;
                },
              },
            },
            E = {
              name: 'id5Id',
              gvlid: 131,
              decode(e, t) {
                const r = j(e, t.params);
                return this._decodeResponse(r || e, t);
              },
              _decodeResponse(e, t) {
                if (e && void 0 !== e.ids) {
                  const r = {},
                    n = {};
                  return (
                    Object.entries(e.ids).forEach(([e, t]) => {
                      const i = t.eid,
                        o = i?.uids?.[0];
                      ((r[e] = { uid: o?.id, ext: o?.ext }),
                        (n[e] = function () {
                          return i;
                        }));
                    }),
                    (this.eids = n),
                    C(e, t),
                    r
                  );
                }
                let r,
                  n,
                  i = {};
                if (!e || 'string' != typeof e.universal_uid) return;
                ((r = e.universal_uid), (i = e.ext || i), (n = e.publisherTrueLinkId), (this.eids = I));
                const c = { id5id: { uid: r, ext: i } };
                ((0, d.Qd)(i.euid) && (c.euid = { uid: i.euid.uids[0].id, source: i.euid.source, ext: { provider: y } }),
                  n && (c.trueLinkId = { uid: n }));
                switch ((0, s.A)(e, 'ab_testing.result')) {
                  case 'control':
                    ((0, o.logInfo)(b + 'A/B Testing - user is in the Control Group: ID5 ID is NOT exposed'),
                      (0, a.J)(c, 'id5id.ext.abTestingControlGroup', !0));
                    break;
                  case 'error':
                    (0, o.logError)(b + 'A/B Testing ERROR! controlGroupPct must be a number >= 0 and <= 1');
                    break;
                  case 'normal':
                    ((0, o.logInfo)(b + 'A/B Testing - user is NOT in the Control Group'),
                      (0, a.J)(c, 'id5id.ext.abTestingControlGroup', !1));
                }
                return ((0, o.logInfo)(b + 'Decoded ID', c), C(e, t), c);
              },
              getId(e, t, r) {
                if (
                  !(function (e) {
                    if (!e || !e.params || !e.params.partner) return ((0, o.logError)(b + 'partner required to be defined'), !1);
                    const t = e.params.partner;
                    if ('string' == typeof t || t instanceof String) {
                      const r = parseInt(t);
                      if (isNaN(r) || r < 0)
                        return ((0, o.logError)(b + 'partner required to be a number or a String parsable to a positive integer'), !1);
                      e.params.partner = r;
                    } else if ('number' != typeof t)
                      return ((0, o.logError)(b + 'partner required to be a number or a String parsable to a positive integer'), !1);
                    if (!e.storage || !e.storage.type || !e.storage.name) return ((0, o.logError)(b + 'storage required to be set'), !1);
                    e.storage.name !== m && (0, o.logWarn)(b + `storage name recommended to be '${m}'.`);
                    return !0;
                  })(e)
                )
                  return;
                if (!S(t?.gdpr)) return void (0, o.logInfo)(b + 'Skipping ID5 local storage write because no consent given.');
                return {
                  callback: function (n) {
                    new x(e, t?.gdpr, r, t?.usp, t?.gpp)
                      .execute()
                      .then((t) => {
                        n(
                          (function (e, t, r) {
                            let n = {};
                            (0, d.Qd)(r) && (void 0 !== r.universal_uid || (0, d.Qd)(r.pbjs)) && Object.assign(n, (0, d.Go)(r));
                            (Object.assign(n, (0, d.Go)(e)), (n.signature = e.signature), (0, d.Qd)(n.pbjs) || (n.pbjs = {}));
                            return ((n.pbjs[t.partner] = (0, d.Go)(e)), n);
                          })(t, e.params, r),
                        );
                      })
                      .catch((e) => {
                        ((0, o.logError)(b + 'getId fetch encountered an error', e), n());
                      });
                  },
                };
              },
              extendId(e, t, r) {
                if (!S(t?.gdpr))
                  return ((0, o.logInfo)(b + 'No consent given for ID5 local storage writing, skipping nb increment.'), { id: r });
                if (j(r, e.params)) {
                  (0, o.logInfo)(b + 'using cached ID', r);
                  const t = (0, d.Go)(r),
                    n = j(t, e.params);
                  return ((n.nbPage = D(n)), { id: t });
                }
                return ((0, o.logInfo)(b + ' refreshing ID.  Cached object does not have ID for partner', r), this.getId(e, t, r));
              },
              primaryIds: ['id5id', 'trueLinkId'],
              eids: I,
              _reset() {
                this.eids = I;
              },
            };
          class x {
            constructor(e, t, r, n, i) {
              ((this.submoduleConfig = e),
                (this.gdprConsentData = t),
                (this.cacheIdObj = (0, d.Qd)(r?.pbjs) ? r.pbjs[e.params.partner] : r),
                (this.usPrivacyData = n),
                (this.gppData = i));
            }
            async execute() {
              const e = this.#e();
              if (!this.#t()) return this.#r(e);
              try {
                return await this.#n(e);
              } catch (t) {
                return (
                  (0, o.logError)(b + 'Error while performing ID5 external module flow. Continuing with regular flow.', t),
                  this.#r(e)
                );
              }
            }
            #t() {
              return 'string' == typeof this.submoduleConfig.params.externalModuleUrl;
            }
            async #n(e) {
              await (async function (e) {
                return new f.U9((t, r) => {
                  if (window.id5Prebid) t();
                  else
                    try {
                      (0, h.R)(e, l.fW, 'id5', t);
                    } catch (e) {
                      r(e);
                    }
                });
              })(this.submoduleConfig.params.externalModuleUrl);
              const t = await e;
              return this.#i().fetchId5Id(
                t,
                this.submoduleConfig.params,
                (0, g.EN)(),
                this.gdprConsentData,
                this.usPrivacyData,
                this.gppData,
              );
            }
            #i() {
              return window.id5Prebid && window.id5Prebid.integration;
            }
            async #r(e) {
              const t = await e,
                r = await this.#o(t.extensionsCall),
                n = await this.#s(t.fetchCall, r);
              return this.#a(n);
            }
            async #e() {
              const e = this.submoduleConfig.params.configUrl || 'https://id5-sync.com/api/config/prebid',
                t = await w(e, { method: 'POST', body: JSON.stringify({ ...this.submoduleConfig, bounce: !0 }), credentials: 'include' });
              if (!t.ok) throw new Error('Error while calling config endpoint: ', t);
              const r = await t.json();
              return ((0, o.logInfo)(b + 'config response received from the server', r), r);
            }
            async #o(e) {
              if (void 0 === e) return;
              const t = e.url,
                r = e.method || 'GET',
                n = 'GET' === r ? void 0 : JSON.stringify(e.body || {}),
                i = await w(t, { method: r, body: n });
              if (!i.ok) throw new Error('Error while calling extensions endpoint: ', i);
              const s = await i.json();
              return ((0, o.logInfo)(b + 'extensions response received from the server', s), s);
            }
            async #s(e, t) {
              const r = e.url,
                n = e.overrides || {},
                i = JSON.stringify({ ...this.#d(), ...n, extensions: t }),
                s = await w(r, { method: 'POST', body: i, credentials: 'include' });
              if (!s.ok) throw new Error('Error while calling fetch endpoint: ', s);
              const a = await s.json();
              return ((0, o.logInfo)(b + 'fetch response received from the server', a), a);
            }
            #d() {
              const e = this.submoduleConfig.params,
                t =
                  this.gdprConsentData && 'boolean' == typeof this.gdprConsentData.gdprApplies && this.gdprConsentData.gdprApplies ? 1 : 0,
                r = (0, g.EN)(),
                n = this.cacheIdObj ? this.cacheIdObj.signature : void 0,
                i = D(this.cacheIdObj),
                s = window.id5Bootstrap ? window.id5Bootstrap.getTrueLinkInfo() : { booted: !1 },
                a = {
                  partner: e.partner,
                  gdpr: t,
                  nbPage: i,
                  o: 'pbjs',
                  tml: r.topmostLocation,
                  ref: r.ref,
                  cu: r.canonicalUrl,
                  top: r.reachedTop ? 1 : 0,
                  u: r.stack[0] || window.location.href,
                  v: '11.23.0',
                  storage: this.submoduleConfig.storage,
                  localStorage: v.localStorageIsEnabled() ? 1 : 0,
                  true_link: s,
                };
              (!t ||
                void 0 === this.gdprConsentData.consentString ||
                (0, o.isEmpty)(this.gdprConsentData.consentString) ||
                (0, o.isEmptyStr)(this.gdprConsentData.consentString) ||
                (a.gdpr_consent = this.gdprConsentData.consentString),
                void 0 === this.usPrivacyData ||
                  (0, o.isEmpty)(this.usPrivacyData) ||
                  (0, o.isEmptyStr)(this.usPrivacyData) ||
                  (a.us_privacy = this.usPrivacyData),
                this.gppData && ((a.gpp_string = this.gppData.gppString), (a.gpp_sid = this.gppData.applicableSections)),
                void 0 === n || (0, o.isEmptyStr)(n) || (a.s = n),
                void 0 === e.pd || (0, o.isEmptyStr)(e.pd) || (a.pd = e.pd),
                void 0 === e.provider || (0, o.isEmptyStr)(e.provider) || (a.provider = e.provider));
              const d = e.abTesting || { enabled: !1 };
              return (d.enabled && (a.ab_testing = { enabled: !0, control_group_pct: d.controlGroupPct }), a);
            }
            #a(e) {
              try {
                e.privacy && window.id5Bootstrap && window.id5Bootstrap.setPrivacy && window.id5Bootstrap.setPrivacy(e.privacy);
              } catch (e) {
                (0, o.logError)(b + 'Error while writing privacy info into local storage.', e);
              }
              return e;
            }
          }
          function D(e) {
            return e && void 0 !== e.nbPage ? e.nbPage + 1 : 1;
          }
          function C(e, t) {
            const r = e.tags;
            r &&
              (t.params.gamTargetingPrefix &&
                ((window.googletag = window.googletag || { cmd: [] }),
                (window.googletag.cmd = window.googletag.cmd || []),
                window.googletag.cmd.push(() => {
                  for (const e in r) window.googletag.setConfig({ targeting: { [t.params.gamTargetingPrefix + '_' + e]: r[e] } });
                })),
              t.params.exposeTargeting &&
                !(0, o.deepEqual)(window.id5tags?.tags, r) &&
                ((window.id5tags = window.id5tags || { cmd: [] }),
                (window.id5tags.cmd = window.id5tags.cmd || []),
                window.id5tags.cmd.forEach((e) => {
                  setTimeout(() => e(r), 0);
                }),
                (window.id5tags.cmd.push = function (e) {
                  (e(r), Array.prototype.push.call(window.id5tags.cmd, e));
                }),
                (window.id5tags.tags = r)));
          }
          function S(e) {
            const t = e && 'boolean' == typeof e.gdprApplies && e.gdprApplies,
              r = (0, s.A)(e, 'vendorData.purpose.consents.1'),
              n = (0, s.A)(e, `vendorData.vendor.consents.${(131).toString()}`);
            return !(t && (!r || !n));
          }
          function j(e, t) {
            if (e?.pbjs && (0, d.Qd)(e.pbjs)) return e.pbjs[t.partner];
          }
          ((0, u.bz)('userId', E),
            (0, i.E)('id5IdSystem'),
            Object.assign(n.W1, { 131: { purposes: [1, 3, 5, 10], legIntPurposes: [], flexiblePurposes: [], specialFeatures: [] } }));
        },
      },
      (e) => {
        e.O(0, [802, 7769, 5590, 1085], () => {
          return ((t = 8319), e((e.s = t)));
          var t;
        });
        e.O();
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [5153],
      {
        7933(e, t, n) {
          var i = n(1068),
            o = n(1129),
            r = n(7413),
            s = n(8964),
            l = n(1785),
            p = n(2354),
            a = n(7449);
          const d = s.RD.withCallers([['userId', 'identityLink']]),
            c = 'identityLink',
            g = (0, p.vM)({ moduleType: a.fW, moduleName: c }),
            u = '_lr_env',
            v = {
              name: c,
              gvlid: 97,
              decode: (e) => ({ idl_env: e }),
              getId(e, t) {
                const n = (e && e.params) || {};
                if (!n || 'string' != typeof n.pid) return void r.logError('identityLink: requires partner id to be defined');
                const { gdpr: i, gpp: o } = t ?? {},
                  s = i && 'boolean' == typeof i.gdprApplies && i.gdprApplies ? 1 : 0,
                  l = s ? i.consentString : '';
                if (s && (!l || '' === l)) return void r.logInfo('identityLink: Consent string is required to call envelope API.');
                const p = !(!o || !o.gppString) && o.gppString,
                  a = !!(o && o.gppString && o.applicableSections.length > 0 && -1 !== o.applicableSections[0]) && o.applicableSections[0],
                  d = p && a,
                  c = `https://api.rlcdn.com/api/identity/envelope?pid=${n.pid}${s ? '&ct=4&cv=' + l : ''}${d ? '&gpp=' + p + '&gpp_sid=' + a : ''}`;
                let v;
                return (
                  (v = function (e) {
                    if (window.ats && window.ats.retrieveEnvelope)
                      (r.logInfo('identityLink: ATS exists!'),
                        window.ats.retrieveEnvelope(function (t) {
                          t
                            ? (r.logInfo('identityLink: An envelope can be retrieved from ATS!'), y(!0), e(JSON.parse(t).envelope))
                            : f(c, e, n);
                        }));
                    else {
                      const t = (function () {
                        const e = g.getCookie(u) || g.getDataFromLocalStorage(u);
                        if (!e) return;
                        try {
                          return window.atob(e);
                        } catch (t) {
                          try {
                            return window.atob(e.replace(/-/g, '+').replace(/_/g, '/'));
                          } catch (e) {
                            return void r.logError('identityLink: invalid envelope format');
                          }
                        }
                      })();
                      t
                        ? (r.logInfo('identityLink: LiveRamp envelope successfully retrieved from storage!'), e(JSON.parse(t).envelope))
                        : f(c, e, n);
                    }
                  }),
                  { callback: v }
                );
              },
              eids: { idl_env: { source: 'liveramp.com', atype: 3 } },
            };
          function f(e, t, n) {
            const i = {
              success: (e) => {
                let n;
                if (e)
                  try {
                    n = JSON.parse(e);
                  } catch (e) {
                    r.logInfo(e);
                  }
                t(n && n.envelope ? n.envelope : '');
              },
              error: (e) => {
                (r.logInfo('identityLink: identityLink: ID fetch encountered an error', e), t());
              },
            };
            n.notUse3P || g.getCookie('_lr_retry_request')
              ? t()
              : (!(function () {
                  const e = new Date();
                  (e.setTime(e.getTime() + 36e5), g.setCookie('_lr_retry_request', 'true', e.toUTCString()));
                })(),
                r.logInfo('identityLink: A 3P retrieval is attempted!'),
                y(!1),
                d(e, i, void 0, { method: 'GET', withCredentials: !0 }));
          }
          function y(e) {
            const t = new Date();
            (t.setTime(t.getTime() + 2592e6), g.setCookie('_lr_env_src_ats', e, t.toUTCString()));
          }
          ((0, l.bz)('userId', v),
            (0, o.E)('identityLinkIdSystem'),
            Object.assign(i.W1, {
              97: { purposes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], legIntPurposes: [], flexiblePurposes: [], specialFeatures: [] },
            }));
        },
      },
      (e) => {
        e.O(0, [802, 7769, 5590, 1085], () => {
          return ((t = 7933), e((e.s = t)));
          var t;
        });
        e.O();
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [3170],
      {
        8700(e, t, i) {
          var r = i(1068),
            n = i(1129),
            o = i(7413),
            a = i(8928),
            s = i(3435),
            d = i(3350),
            p = i(1779),
            c = i(8384),
            l = i(2354),
            u = i(2682),
            f = i(7791),
            m = i(6901),
            g = i(828),
            x = i(5262);
          const b = {};
          function h(e, t) {
            if (b[e]) return b[e];
            const i = (0, x.o)(t),
              r = i?.id ? i.id : (0, g.p)(e).divId;
            return ((b[e] = r), r);
          }
          const y = 'ix',
            v = [p.D4, p.G_, p.s6],
            I = [144, 144],
            A = { JPY: 1 },
            w = 'p',
            C = 'x',
            O = {
              SITE: [
                'id',
                'name',
                'domain',
                'cat',
                'sectioncat',
                'pagecat',
                'page',
                'ref',
                'search',
                'mobile',
                'privacypolicy',
                'publisher',
                'content',
                'keywords',
                'ext',
              ],
              USER: ['id', 'buyeruid', 'yob', 'gender', 'keywords', 'customdata', 'geo', 'data', 'ext'],
            },
            U = {
              'liveramp.com': 'idl',
              'netid.de': 'NETID',
              'neustar.biz': 'fabrickId',
              'zeotap.com': 'zeotapIdPlus',
              'uidapi.com': 'UID2',
              'adserver.org': 'TDID',
            },
            S = ['mimes', 'minduration', 'maxduration'],
            T = [
              'mimes',
              'minduration',
              'maxduration',
              'protocols',
              'protocol',
              'startdelay',
              'placement',
              'linearity',
              'skip',
              'skipmin',
              'skipafter',
              'sequence',
              'battr',
              'maxextended',
              'minbitrate',
              'maxbitrate',
              'boxingallowed',
              'playbackmethod',
              'playbackend',
              'delivery',
              'pos',
              'companionad',
              'api',
              'companiontype',
              'ext',
              'playerSize',
              'w',
              'h',
              'plcmt',
            ],
            D = `${y}_features`,
            P = (0, l.vM)({ bidderCode: y }),
            E = {
              REQUESTED_FEATURE_TOGGLES: [],
              featureToggles: {},
              isFeatureEnabled: function (e) {
                return (0, a.A)(this.featureToggles, `features.${e}.activated`, !1);
              },
              getFeatureToggles: function () {
                if (P.localStorageIsEnabled()) {
                  const e = (0, o.safeJSONParse)(P.getDataFromLocalStorage(D));
                  (0, a.A)(e, 'expiry') && e.expiry >= new Date().getTime() ? (this.featureToggles = e) : this.clearFeatureToggles();
                }
              },
              setFeatureToggles: function (e) {
                const t = e.body,
                  i = new Date(),
                  r = (0, a.A)(t, 'ext.features');
                r &&
                  ((this.featureToggles = { expiry: i.setHours(i.getHours() + 1), features: r }),
                  P.localStorageIsEnabled() && P.setDataInLocalStorage(D, JSON.stringify(this.featureToggles)));
              },
              clearFeatureToggles: function () {
                ((this.featureToggles = {}), P.localStorageIsEnabled() && P.removeDataFromLocalStorage(D));
              },
            };
          let _ = 0,
            J = '',
            k = '',
            F = !1;
          const j = 2;
          function z(e) {
            const t = B(e, p.G_),
              i = (0, a.A)(e, 'mediaTypes.video'),
              r = (0, a.A)(e, 'params.video');
            if (G(i, r).length) return {};
            t.video = r ? (0, d.Go)(e.params.video) : {};
            const n = (0, a.A)(e, 'ortb2Imp.ext.tid');
            (n && (0, s.J)(t, 'ext.tid', n),
              (function (e, t) {
                if ((0, a.A)(t, 'mediaTypes.video.context') === f.H6) {
                  let i = (0, a.A)(t, 'mediaTypes.video.renderer');
                  if ((i || (i = (0, a.A)(t, 'renderer')), (0, a.A)(t, 'ortb2.source.ext.schain', !1))) e.displaymanager = 'pbjs_wrapper';
                  else if (i && 'object' == typeof i) {
                    if (void 0 !== i.url) {
                      let t;
                      try {
                        t = new URL(i.url).hostname;
                      } catch {
                        return;
                      }
                      t.includes('js-sec.indexww') ? (e.displaymanager = 'ix') : (e.displaymanager = i.url);
                    }
                  } else e.displaymanager = 'ix';
                }
              })(t, e),
              M(t, e));
            for (const e in i) -1 === T.indexOf(e) || t.video.hasOwnProperty(e) || (t.video[e] = i[e]);
            if (t.video.minduration > t.video.maxduration)
              return (
                (0, o.logError)(
                  `IX Bid Adapter: video minduration [${t.video.minduration}] cannot be greater than video maxduration [${t.video.maxduration}]`,
                ),
                {}
              );
            const c = (r && r.context) || (i && i.context);
            if (
              ((function (e) {
                e.video.hasOwnProperty('plcmt') &&
                  (!(0, d.Fq)(e.video.plcmt) || e.video.plcmt < 1 || e.video.plcmt > 4) &&
                  ((0, o.logWarn)(`IX Bid Adapter: video.plcmt [${e.video.plcmt}] must be an integer between 1-4 inclusive`),
                  delete e.video.plcmt);
              })(t),
              c &&
                !t.video.hasOwnProperty('placement') &&
                (c === f.mn
                  ? (t.video.placement = 1)
                  : c === f.H6
                    ? (0, a.A)(r, 'playerConfig.floatOnScroll')
                      ? (t.video.placement = 5)
                      : ((t.video.placement = 3), (F = !0))
                    : (0, o.logWarn)(`IX Bid Adapter: Video context '${c}' is not supported`)),
              !t.video.w || !t.video.h)
            ) {
              const i = q((0, a.A)(t, 'video.playerSize')) || q((0, a.A)(e, 'params.size'));
              if (!i) return ((0, o.logWarn)('IX Bid Adapter: Video size is missing in [mediaTypes.video]'), {});
              ((t.video.w = i[0]), (t.video.h = i[1]));
            }
            return (R(e, t, p.G_), t);
          }
          function B(e, t) {
            const i = {};
            if (
              ((i.id = e.bidId),
              ae() && (0, a.A)(e, 'params.externalId') && (0, s.J)(i, 'ext.externalID', e.params.externalId),
              (0, a.A)(e, `params.${t}.siteId`) && !isNaN(Number(e.params[t].siteId)))
            )
              switch (t) {
                case p.D4:
                  (0, s.J)(i, 'ext.siteID', e.params.banner.siteId.toString());
                  break;
                case p.G_:
                  (0, s.J)(i, 'ext.siteID', e.params.video.siteId.toString());
                  break;
                case p.s6:
                  (0, s.J)(i, 'ext.siteID', e.params.native.siteId.toString());
              }
            else e.params.siteId && (0, s.J)(i, 'ext.siteID', e.params.siteId.toString());
            return (
              !e.params.hasOwnProperty('id') ||
                ('string' != typeof e.params.id && 'number' != typeof e.params.id) ||
                (0, s.J)(i, 'ext.sid', String(e.params.id)),
              i
            );
          }
          function R(e, t, i) {
            let r = null,
              n = null;
            if (
              (e.params.bidFloor && e.params.bidFloorCur && (r = { floor: e.params.bidFloor, currency: e.params.bidFloorCur }),
              (0, d.fp)(e.getFloor))
            ) {
              let r = '*',
                a = '*';
              if (i && (0, o.contains)(v, i)) {
                const { w: e, h: n } = t[i];
                ((r = i), (a = [e, n]));
              }
              try {
                n = e.getFloor({ mediaType: r, size: a });
              } catch (e) {
                (0, o.logWarn)('priceFloors module call getFloor failed, error : ', e);
              }
            }
            let a = !1;
            (n
              ? ((t.bidfloor = n.floor), (t.bidfloorcur = n.currency), (0, s.J)(t, 'ext.fl', w), (a = !0))
              : r && ((t.bidfloor = r.floor), (t.bidfloorcur = r.currency), (0, s.J)(t, 'ext.fl', C), (a = !0)),
              a &&
                (i === p.D4
                  ? ((0, s.J)(t, 'banner.ext.bidfloor', t.bidfloor), (0, s.J)(t, 'banner.ext.fl', t.ext.fl))
                  : i === p.G_
                    ? ((0, s.J)(t, 'video.ext.bidfloor', t.bidfloor), (0, s.J)(t, 'video.ext.fl', t.ext.fl))
                    : ((0, s.J)(t, 'native.ext.bidfloor', t.bidfloor), (0, s.J)(t, 'native.ext.fl', t.ext.fl))));
          }
          function $(e, t, i) {
            const r = {},
              n = !(!(0, a.A)(e, 'exp') || !(0, d.Fq)(e.exp)),
              s = (0, a.A)(e, 'dealid') || (0, a.A)(e, 'ext.dealid');
            (A.hasOwnProperty(t) ? (r.cpm = e.price / A[t]) : (r.cpm = e.price / 100),
              (r.requestId = e.impid),
              s && (r.dealId = s),
              (r.netRevenue = true),
              (r.currency = t),
              (r.creativeId = e.hasOwnProperty('crid') ? e.crid : '-'),
              Number(e.mtype) !== j || ((!e.ext || e.ext.vasturl) && e.ext)
                ? e.ext && e.ext.vasturl && (r.vastUrl = e.ext.vasturl)
                : (r.vastXml = e.adm));
            let c = null;
            if ('string' == typeof e.adm && '{' === e.adm[0] && '}' === e.adm[e.adm.length - 1])
              try {
                c = JSON.parse(e.adm);
              } catch (e) {
                (0, o.logWarn)('adm looks like JSON but failed to parse: ', e);
              }
            return (
              (e.ext && e.ext.vasturl) || Number(e.mtype) === j
                ? ((r.width = i.video.w),
                  (r.height = i.video.h),
                  (r.mediaType = p.G_),
                  (r.mediaTypes = i.mediaTypes),
                  (r.ttl = n ? e.exp : 3600))
                : c && c.native
                  ? ((r.native = { ortb: c.native }),
                    (r.width = e.w ? e.w : 1),
                    (r.height = e.h ? e.h : 1),
                    (r.mediaType = p.s6),
                    (r.ttl = n ? e.exp : 3600))
                  : ((r.ad = e.adm), (r.width = e.w), (r.height = e.h), (r.mediaType = p.D4), (r.ttl = n ? e.exp : 300)),
              (r.meta = {}),
              (r.meta.networkId = (0, a.A)(e, 'ext.dspid')),
              (r.meta.brandId = (0, a.A)(e, 'ext.advbrandid')),
              (r.meta.brandName = (0, a.A)(e, 'ext.advbrand')),
              e.adomain && e.adomain.length > 0 && (r.meta.advertiserDomains = e.adomain),
              e.ext?.dsa && (r.meta.dsa = e.ext.dsa),
              e.ext?.ibv && ((r.ext = r.ext || {}), (r.ext.ibv = e.ext.ibv)),
              r
            );
          }
          function W(e) {
            return Array.isArray(e) && 2 === e.length && (0, d.Fq)(e[0]) && (0, d.Fq)(e[1]);
          }
          function X(e = [], t = []) {
            if (W(e)) return e[0] === t[0] && e[1] === t[1];
            for (let i = 0; i < e.length; i++) if (e[i][0] === t[0] && e[i][1] === t[1]) return !0;
            return !1;
          }
          function G(e, t) {
            const i = [];
            e || (0, o.logWarn)('IX Bid Adapter: mediaTypes.video is the preferred location for video params in ad unit');
            for (const r of S) {
              const n = e && e.hasOwnProperty(r),
                o = t && t.hasOwnProperty(r);
              n || o || i.push(`IX Bid Adapter: ${r} is not included in either the adunit or params level`);
            }
            const r = e && e.hasOwnProperty('protocol'),
              n = e && e.hasOwnProperty('protocols'),
              a = t && t.hasOwnProperty('protocol'),
              s = t && t.hasOwnProperty('protocols');
            return (
              r || n || a || s || i.push('IX Bid Adapter: protocol/protcols is not included in either the adunit or params level'),
              i
            );
          }
          function q(e = []) {
            return W(e) ? e : !!W(e[0]) && e[0];
          }
          function N(e, t, i) {
            if (!e) return;
            return { ...i.find((t) => t.bidId === e), ...t.find((t) => t.id === e) };
          }
          function L(e, t, i, r) {
            const n = '../../htlb.casalemedia.com/openrtb/pbjs__qs_512809',
              p = (function (e) {
                const t = [],
                  i = {};
                if ((0, d.cy)(e))
                  for (const r of e) {
                    const e = U.hasOwnProperty(r.source);
                    if (
                      (0, a.A)(r, 'uids.0') &&
                      ((i[r.source] = !0),
                      e && '' !== U[r.source] && (r.uids[0].ext = { rtiPartner: U[r.source] }),
                      t.push(r),
                      t.length >= 50)
                    )
                      break;
                  }
                return { toSend: t, seenSources: i };
              })((0, a.A)(e, '0.userIdAsEids')),
              l = p.toSend;
            (function (e) {
              const t = e?.gdprConsent;
              if (!0 === t?.gdprApplies && !t.consentString) return !1;
              return !0;
            })(t) &&
              window.headertag &&
              'function' == typeof window.headertag.getIdentityInfo &&
              (function (e, t) {
                const i = window.headertag.getIdentityInfo();
                if (i && 'object' == typeof i)
                  for (const r in i) {
                    if (e.length >= 50) return;
                    if (i.hasOwnProperty(r)) {
                      const n = i[r];
                      !n.responsePending &&
                        n.data &&
                        'object' == typeof n.data &&
                        Object.keys(n.data).length &&
                        !t.seenSources[n.data.source] &&
                        e.push(n.data);
                    }
                  }
              })(l, p);
            const u = [];
            let f = (function (e) {
              const t = {};
              return (
                (t.id = e[0].bidderRequestId.toString()),
                (t.site = {}),
                (t.ext = {}),
                (t.ext.source = 'prebid'),
                (t.ext.ixdiag = {}),
                (t.ext.ixdiag.ls = P.localStorageIsEnabled()),
                (t.imp = []),
                (t.at = 1),
                t
              );
            })(e);
            f = (function (e, t) {
              t.length > 0 &&
                ((e.ext.features = {}),
                t.forEach((t) => {
                  e.ext.features[t] = { activated: E.isFeatureEnabled(t) };
                }));
              return e;
            })(f, E.REQUESTED_FEATURE_TOGGLES);
            const m = (function (e) {
              var t = e.map((e) => e.adUnitCode).filter((e, t, i) => i.indexOf(e) === t);
              const i = (0, a.A)(e, '0.userIdAsEids', []),
                r = {
                  mfu: 0,
                  bu: 0,
                  iu: 0,
                  nu: 0,
                  ou: 0,
                  allu: 0,
                  ren: !1,
                  version: '11.23.0',
                  url: window.location.href.split('?')[0],
                  vpd: F,
                  eidLength: i.length,
                };
              for (const i of t) {
                const t = e.filter((e) => e.adUnitCode === i)[0];
                (0, a.A)(t, 'mediaTypes') &&
                  (Object.keys(t.mediaTypes).length > 1 && r.mfu++,
                  (0, a.A)(t, 'mediaTypes.native') && r.nu++,
                  (0, a.A)(t, 'mediaTypes.banner') && r.bu++,
                  'outstream' === (0, a.A)(t, 'mediaTypes.video.context') && (r.ou++, oe(t) && (r.ren = !0)),
                  'instream' === (0, a.A)(t, 'mediaTypes.video.context') && r.iu++,
                  r.allu++);
              }
              return r;
            })(e);
            for (const e in m) f.ext.ixdiag[e] = m[e];
            ((f = (function (e, t, i, r, n) {
              const o = (0, a.A)(t, 'timeout');
              o && (e.ext.ixdiag.tmax = o);
              c.$W.getConfig('userSync') && (e.ext.ixdiag.syncsPerBidder = c.$W.getConfig('userSync').syncsPerBidder);
              ((e.ext.ixdiag.imps = Object.keys(i).length), (e.source = { tid: t?.ortb2?.source?.tid }));
              const s = r[0]?.ortb2?.source?.ext?.schain;
              s && ((e.source = e.source || {}), (e.source.ext = e.source.ext || {}), (e.source.ext.schain = s));
              n.length > 0 && ((e.user = {}), (e.user.eids = n));
              document.referrer && '' !== document.referrer && (e.site.ref = document.referrer);
              return e;
            })(f, t, i, e, l)),
              (f = (function (e, t) {
                if (t) {
                  (t.gdprConsent &&
                    ((J = t.gdprConsent),
                    J.hasOwnProperty('gdprApplies') && (e.regs = { ext: { gdpr: J.gdprApplies ? 1 : 0 } }),
                    J.hasOwnProperty('consentString') &&
                      ((e.user = e.user || {}),
                      (e.user.ext = { consent: J.consentString || '' }),
                      J.hasOwnProperty('addtlConsent') &&
                        J.addtlConsent &&
                        (e.user.ext.consented_providers_settings = { addtl_consent: J.addtlConsent }))),
                    t.uspConsent && ((0, s.J)(e, 'regs.ext.us_privacy', t.uspConsent), (k = t.uspConsent)));
                  const i = (0, a.A)(t, 'refererInfo.page');
                  (i && (e.site.page = i),
                    t.gppConsent &&
                      ((0, s.J)(e, 'regs.gpp', t.gppConsent.gppString), (0, s.J)(e, 'regs.gpp_sid', t.gppConsent.applicableSections)));
                }
                c.$W.getConfig('coppa') && (0, s.J)(e, 'regs.coppa', 1);
                return e;
              })(f, t)));
            const g = {};
            e[0].params.siteId && ((_ = e[0].params.siteId), (g.s = _));
            const x = Object.keys(i);
            let b = !1;
            for (let r = 0; r < x.length && !(u.length >= 4); r++) {
              f = H(i, x, f, r);
              const s = (0, a.A)(t, 'ortb2') || {},
                p = { ...(s.site || s.context) };
              p.page = Q(t);
              const l = { ...s.user };
              ((0, o.isEmpty)(s) ||
                b ||
                ((f = V(t, f, s, p, l)), (f.site = (0, o.mergeDeep)({}, f.site, p)), (f.user = (0, o.mergeDeep)({}, f.user, l)), (b = !0)),
                (f = Y(i, f, x, r, g, n)));
              const m = r === x.length - 1;
              if (((f = ue(f)), (f = pe(f)), (f = ce(f)), m)) {
                let t = `${n}?`;
                (0 !== _ && (t += `s=${_}`),
                  ae() && ((t += 0 !== _ ? '&' : ''), (t += `p=${c.$W.getConfig('exchangeId')}`)),
                  u.push({
                    method: 'POST',
                    url: t,
                    data: (0, d.Go)(f),
                    options: { contentType: 'text/plain', withCredentials: !0 },
                    validBidRequests: e,
                  }),
                  (f.imp = []),
                  (b = !1));
              }
            }
            return u;
          }
          function H(e, t, i, r) {
            const n = e[t[r]],
              { missingImps: o = [], ixImps: c = [] } = n,
              l = { ixImps: c, missingBannerImpressions: o },
              u = Object.keys(l)
                .map((e) => l[e])
                .filter((e) => Array.isArray(e))
                .reduce((e, t) => e.concat(...t), []),
              f = e[t[r]].gpid,
              m = e[t[r]].dfp_ad_unit_code,
              g = e[t[r]].tid,
              x = e[t[r]].sid,
              b = u.filter((e) => p.D4 in e),
              h = u.filter((e) => !(p.D4 in e));
            if (b.length > 0) {
              const n = b.reduce((e, t) => (e[t.adunitCode] || (e[t.adunitCode] = []), e[t.adunitCode].push(t), e), {});
              for (const o in n) {
                const p = n[o],
                  {
                    id: c,
                    banner: { topframe: l },
                  } = p[0],
                  u = (0, a.A)(p[0], 'ext.externalID'),
                  b = { id: c, banner: { topframe: l, format: p.map(({ banner: { w: e, h: t }, ext: i }) => ({ w: e, h: t, ext: i })) } };
                for (let e = 0; e < b.banner.format.length; e++) {
                  (null != b.banner.format[e].ext &&
                    (null != b.banner.format[e].ext.sid && delete b.banner.format[e].ext.sid,
                    null != b.banner.format[e].ext.externalID && delete b.banner.format[e].ext.externalID),
                    'bidfloor' in p[e] && (b.banner.format[e].ext.bidfloor = p[e].bidfloor));
                  const t = b.banner.format[e].ext;
                  t && 0 === Object.keys(t).length && delete b.banner.format[e].ext;
                }
                const h = e[t[r]].pos;
                ((0, d.Fq)(h) && (b.banner.pos = h),
                  (m || f || g || x || u) &&
                    ((b.ext = {}),
                    (b.ext.dfp_ad_unit_code = m),
                    (b.ext.gpid = f),
                    (b.ext.tid = g),
                    (b.ext.sid = x),
                    (b.ext.externalID = u)),
                  'bidfloor' in p[0] && (b.bidfloor = p[0].bidfloor),
                  'bidfloorcur' in p[0] && (b.bidfloorcur = p[0].bidfloorcur));
                const y = e[t[r]].adUnitFPD;
                (y && (0, s.J)(b, 'ext.data', y), i.imp.push(b));
              }
            }
            return (
              h.length > 0 &&
                h.forEach((e) => {
                  if ((f && (0, s.J)(e, 'ext.gpid', f), i.imp.length > 0)) {
                    let t = !1;
                    (i.imp.forEach((r, n) => {
                      e.id === r.id && p.G_ in e
                        ? ((r.video = e.video),
                          (r.video.ext = Object.assign({}, e.video.ext, e.ext)),
                          (0, a.A)(r, 'video.ext.bidfloor', !1) &&
                            (0, a.A)(r, 'bidfloor', !1) &&
                            r.video.ext.bidfloor < r.bidfloor &&
                            (r.bidfloor = r.video.ext.bidfloor),
                          !(0, a.A)(r, 'ext.siteID', !1) &&
                            (0, a.A)(e, 'video.ext.siteID') &&
                            ((0, s.J)(r, 'ext.siteID', e.video.ext.siteID), (0, s.J)(i, 'ext.ixdiag.usid', !0)),
                          (t = !0))
                        : e.id === r.id &&
                          p.s6 in e &&
                          ((r.native = e.native),
                          (r.native.ext = Object.assign({}, e.native.ext, e.ext)),
                          (0, a.A)(r, 'native.ext.bidfloor', !1) &&
                            (0, a.A)(r, 'bidfloor', !1) &&
                            r.native.ext.bidfloor < r.bidfloor &&
                            (r.bidfloor = r.native.ext.bidfloor),
                          !(0, a.A)(r, 'ext.siteID', !1) &&
                            (0, a.A)(e, 'native.ext.siteID', !1) &&
                            ((0, s.J)(r, 'ext.siteID', e.native.ext.siteID), (0, s.J)(i, 'ext.ixdiag.usid', !0)),
                          (t = !0));
                    }),
                      t || i.imp.push(e));
                  } else i.imp.push(e);
                }),
              i
            );
          }
          function Q(e) {
            const t = (e && e.bidderCode) || 'ix',
              i = c.$W.getConfig(t);
            let r;
            if (
              ((r = (0, a.A)(e, 'ortb2.site.page') ? e.ortb2.site.page : (0, a.A)(e, 'refererInfo.page')),
              i && 'object' == typeof i.firstPartyData)
            ) {
              return (function (e, t, i) {
                let r;
                try {
                  r = new URL(t);
                } catch (i) {
                  ((0, o.logWarn)(`IX Bid Adapter: Invalid URL set in ortb2.site.page: ${t}. Using referer URL instead.`),
                    (r = new URL((0, a.A)(e, 'refererInfo.page'))));
                }
                const n = new URLSearchParams(r.search);
                for (const [e, t] of Object.entries(i)) n.has(e) || n.append(e, t);
                return ((r.search = n.toString()), r.toString());
              })(e, r, i.firstPartyData);
            }
            return r;
          }
          function V(e, t, i, r, n) {
            if (
              ((t.ext.ixdiag.fpd = !0),
              Object.keys(r).forEach((e) => {
                -1 === O.SITE.indexOf(e) && delete r[e];
              }),
              Object.keys(n).forEach((e) => {
                -1 === O.USER.indexOf(e) && delete n[e];
              }),
              i.device)
            ) {
              const e = { ...i.device.sua };
              (0, o.isEmpty)(e) || (0, s.J)(t, 'device.sua', e);
              const r = i.device.ip;
              r && (0, s.J)(t, 'device.ip', r);
              const n = i.device.ipv6;
              n && (0, s.J)(t, 'device.ipv6', n);
              const a = i.device.geo;
              a && (0, s.J)(t, 'device.geo', a);
            }
            if (
              i.hasOwnProperty('regs') &&
              !e.gppConsent &&
              (i.regs.hasOwnProperty('gpp') && 'string' == typeof i.regs.gpp && (0, s.J)(t, 'regs.gpp', i.regs.gpp),
              i.regs.hasOwnProperty('gpp_sid') && Array.isArray(i.regs.gpp_sid) && (0, s.J)(t, 'regs.gpp_sid', i.regs.gpp_sid),
              i.regs.ext?.dsa)
            ) {
              const e = i.regs.ext.dsa,
                r = {};
              if (
                (['dsarequired', 'pubrender', 'datatopub'].forEach((t) => {
                  (0, d.Et)(e[t]) && (r[t] = e[t]);
                }),
                (0, d.cy)(e.transparency))
              ) {
                const t = [];
                (e.transparency.forEach((e) => {
                  (0, d.Qd)(e) &&
                    (0, d.O8)(e.domain) &&
                    '' !== e.domain &&
                    (0, d.cy)(e.dsaparams) &&
                    e.dsaparams.every((e) => (0, d.Et)(e)) &&
                    t.push(e);
                }),
                  t.length > 0 && (r.transparency = t));
              }
              (0, o.isEmpty)(r) || (0, s.J)(t, 'regs.ext.dsa', r);
            }
            return t;
          }
          function M(e, t) {
            const i = (0, a.A)(t, 'ortb2Imp.ext.data');
            i && (0, s.J)(e, 'ext.data', i);
          }
          function Y(e, t, i, r, n, o) {
            const a = e[i[r]].tagId,
              s = e[i[r]].adUnitCode,
              d = e[i[r]].divId;
            return ((a || s || d) && ((t.ext.ixdiag.tagid = a), (t.ext.ixdiag.adunitcode = s), (t.ext.ixdiag.divId = d)), t);
          }
          function Z(e, t) {
            if (t)
              for (let i = 0; i < e.length; i++) {
                const r = e[i];
                if (t[0] === r[0] && t[1] === r[1]) {
                  e.splice(i, 1);
                  break;
                }
              }
          }
          function K(e, t) {
            const i = (function (e) {
              const t = B(e, p.s6),
                i = e.nativeOrtbRequest;
              ((i.eventtrackers = [{ event: 1, methods: [1, 2] }]),
                (i.privacy = 1),
                (t.native = { request: JSON.stringify(i), ver: '1.2' }));
              const r = (0, a.A)(e, 'ortb2Imp.ext.tid');
              return (r && (0, s.J)(t, 'ext.tid', r), M(t, e), R(e, t, p.s6), t);
            })(e);
            if (0 !== Object.keys(i).length) {
              ((t[e.adUnitCode] = {}),
                (t[e.adUnitCode].ixImps = []),
                t[e.adUnitCode].ixImps.push(i),
                (t[e.adUnitCode].gpid = (0, a.A)(e, 'ortb2Imp.ext.gpid')),
                (t[e.adUnitCode].dfp_ad_unit_code = (0, a.A)(e, 'ortb2Imp.ext.data.adserver.adslot')),
                (t[e.adUnitCode].tagId = (0, a.A)(e, 'params.tagId')));
              const r = e.adUnitCode,
                n = h(r, e);
              ((t[e.adUnitCode].adUnitCode = r), (t[e.adUnitCode].divId = n));
            }
          }
          function ee(e, t) {
            const i = z(e);
            if (0 !== Object.keys(i).length) {
              ((t[e.adUnitCode] = {}),
                (t[e.adUnitCode].ixImps = []),
                t[e.adUnitCode].ixImps.push(i),
                (t[e.adUnitCode].gpid = (0, a.A)(e, 'ortb2Imp.ext.gpid')),
                (t[e.adUnitCode].dfp_ad_unit_code = (0, a.A)(e, 'ortb2Imp.ext.data.adserver.adslot')),
                (t[e.adUnitCode].tagId = (0, a.A)(e, 'params.tagId')));
              const r = e.adUnitCode,
                n = h(r, e);
              ((t[e.adUnitCode].adUnitCode = r), (t[e.adUnitCode].divId = n));
            }
          }
          function te(e, t, i, r) {
            const n = (function (e) {
                const t = B(e, p.D4);
                ((t.banner = {}), (t.adunitCode = e.adUnitCode));
                const i = (0, a.A)(e, 'params.size');
                return (i && ((t.banner.w = i[0]), (t.banner.h = i[1])), (t.banner.topframe = (0, o.inIframe)() ? 0 : 1), R(e, t, p.D4), t);
              })(e),
              s = X((0, a.A)(e, 'mediaTypes.banner.sizes'), (0, a.A)(e, 'params.size'));
            (i.hasOwnProperty(e.adUnitCode) || (i[e.adUnitCode] = {}),
              (i[e.adUnitCode].gpid = (0, a.A)(e, 'ortb2Imp.ext.gpid')),
              (i[e.adUnitCode].dfp_ad_unit_code = (0, a.A)(e, 'ortb2Imp.ext.data.adserver.adslot')),
              (i[e.adUnitCode].tid = (0, a.A)(e, 'ortb2Imp.ext.tid')),
              (i[e.adUnitCode].tagId = (0, a.A)(e, 'params.tagId')),
              (i[e.adUnitCode].pos = (0, a.A)(e, 'mediaTypes.banner.pos')));
            const c = (0, a.A)(e, 'ortb2Imp.ext.data');
            c && (i[e.adUnitCode].adUnitFPD = c);
            const l = (0, a.A)(e, 'params.id');
            !l || ('string' != typeof l && 'number' != typeof l) || (i[e.adUnitCode].sid = String(l));
            const u = e.adUnitCode,
              f = h(u, e);
            ((i[e.adUnitCode].adUnitCode = u),
              (i[e.adUnitCode].divId = f),
              s && (i[e.adUnitCode].hasOwnProperty('ixImps') || (i[e.adUnitCode].ixImps = []), i[e.adUnitCode].ixImps.push(n)),
              (function (e, t, i) {
                if (t.hasOwnProperty(e.adUnitCode)) {
                  let i = [];
                  (t[e.adUnitCode].hasOwnProperty('missingSizes') && (i = t[e.adUnitCode].missingSizes),
                    Z(i, e.params.size),
                    (t[e.adUnitCode].missingSizes = i));
                } else if ((0, a.A)(e, 'mediaTypes.banner.sizes')) {
                  const r = (0, d.Go)(e.mediaTypes.banner.sizes);
                  Z(r, e.params.size);
                  const n = { missingSizes: r, impression: i };
                  t[e.adUnitCode] = n;
                }
              })(e, t, n));
          }
          function ie(e, t, i) {
            const r = (0, d.Go)(t);
            return ((r.banner.w = i[0]), (r.banner.h = i[1]), R(e, r, p.D4), r);
          }
          function re(e) {
            e.renderer.push(function () {
              const t = h(e.adUnitCode, e);
              t ? window.createIXPlayer(t, e) : (0, o.logWarn)(`IX Bid Adapter: adUnitCode: ${t} not found on page.`);
            });
          }
          function ne(e, t) {
            const i = m.A4.install({ id: e, url: t, loaded: !1 });
            try {
              i.setRender(re);
            } catch (e) {
              return ((0, o.logWarn)('Prebid Error calling setRender on renderer', e), null);
            }
            return t ? i : ((0, o.logWarn)('Outstream renderer URL not found'), null);
          }
          function oe(e) {
            if ('outstream' !== (0, a.A)(e, 'mediaTypes.video.context')) return !1;
            let t = (0, a.A)(e, 'mediaTypes.video.renderer');
            t || (t = (0, a.A)(e, 'renderer'));
            return !!('object' != typeof t || !t.url || !t.render) || t.backupOnly;
          }
          function ae() {
            const e = c.$W.getConfig('exchangeId');
            return !('number' != typeof e || !isFinite(e)) || !('string' != typeof e || '' === e.trim() || !isFinite(Number(e)));
          }
          const se = {
            code: y,
            gvlid: 10,
            supportedMediaTypes: v,
            isBidRequestValid: function (e) {
              const t = (0, a.A)(e, 'params.video'),
                i = (0, a.A)(e, 'params.size'),
                r = (0, a.A)(e, 'mediaTypes.banner.sizes'),
                n = (0, a.A)(e, 'mediaTypes.video'),
                s = (0, a.A)(e, 'mediaTypes.video.playerSize'),
                d = e.params.hasOwnProperty('bidFloor'),
                p = e.params.hasOwnProperty('bidFloorCur');
              if (e.hasOwnProperty('mediaType') && !(0, o.contains)(v, e.mediaType))
                return ((0, o.logWarn)('IX Bid Adapter: media type is not supported.'), !1);
              if ((0, a.A)(e, 'mediaTypes.banner') && !r) return !1;
              if (i) {
                const t = q(i);
                if (!t) return ((0, o.logError)('IX Bid Adapter: size has invalid format.'), !1);
                if (!X(e.sizes, t) && !X(s, t) && !X(r, t))
                  return ((0, o.logError)('IX Bid Adapter: bid size is not included in ad unit sizes or player size.'), !1);
              }
              if (!ae() && (void 0 === e.params.siteId || null === e.params.siteId))
                return ((0, o.logError)('IX Bid Adapter: Invalid configuration - either siteId or exchangeId must be configured.'), !1);
              if (void 0 !== e.params.siteId) {
                if ('string' != typeof e.params.siteId && 'number' != typeof e.params.siteId)
                  return ((0, o.logError)('IX Bid Adapter: siteId must be string or number type.'), !1);
                if ('string' != typeof e.params.siteId && isNaN(Number(e.params.siteId)))
                  return ((0, o.logError)('IX Bid Adapter: siteId must valid value'), !1);
              }
              if (
                (d || p) &&
                !(
                  d &&
                  p &&
                  ((c = e.params.bidFloor),
                  (l = e.params.bidFloorCur),
                  Boolean('number' == typeof c && 'string' == typeof l && l.match(/^[A-Z]{3}$/)))
                )
              )
                return ((0, o.logError)('IX Bid Adapter: bidFloor / bidFloorCur parameter has invalid format.'), !1);
              var c, l;
              if (n && t) {
                const i = z(e).video,
                  r = G(n, t);
                if ((0, a.A)(e, 'mediaTypes.video.context') === f.H6 && oe(e) && i) {
                  const e = [(0, a.A)(i, 'w'), (0, a.A)(i, 'h')];
                  if (!(e[0] >= I[0] && e[1] >= I[1]))
                    return ((0, o.logError)(`IX Bid Adapter: ${e} is an invalid size for IX outstream renderer`), !1);
                }
                if (r.length)
                  return (
                    r.forEach((e) => {
                      (0, o.logError)(e);
                    }),
                    !1
                  );
              }
              return (function (e) {
                return (
                  void 0 === (0, a.A)(e, 'mediaTypes.native') ||
                  (e.nativeOrtbRequest && Array.isArray(e.nativeOrtbRequest.assets) && e.nativeOrtbRequest.assets.length > 0)
                );
              })(e);
            },
            resetSiteID: function () {
              _ = 0;
            },
            buildRequests: function (e, t) {
              const i = [],
                r = {},
                n = {},
                s = {},
                d = {};
              (E.getFeatureToggles(),
                e.forEach((e) => {
                  const t = Object.keys((0, a.A)(e, 'mediaTypes', {}));
                  for (const i of t)
                    switch (i) {
                      case p.D4:
                        te(e, d, r);
                        break;
                      case p.G_:
                        ee(e, n);
                        break;
                      case p.s6:
                        K(e, s);
                        break;
                      default:
                        (0, o.logWarn)(`IX Bid Adapter: ad unit mediaTypes ${i} is not supported`);
                    }
                }));
              for (const t in d)
                if (d.hasOwnProperty(t)) {
                  const i = d[t].missingSizes;
                  (r.hasOwnProperty(t) || (r[t] = {}),
                    r[t].hasOwnProperty('missingImps') || ((r[t].missingImps = []), (r[t].missingCount = 0)));
                  const n = d[t].impression;
                  for (let o = 0; o < i.length; o++) {
                    const a = ie(e[0], n, i[o]);
                    (r[t].missingImps.push(a), r[t].missingCount++);
                  }
                }
              const c = [];
              return (
                Object.keys(r).length > 0 && c.push(r),
                Object.keys(n).length > 0 && c.push(n),
                Object.keys(s).length > 0 && c.push(s),
                i.push(
                  ...L(
                    e,
                    t,
                    (function (e) {
                      const t = {};
                      return (
                        e.forEach((e) => {
                          Object.keys(e).forEach((i) => {
                            t.hasOwnProperty(i)
                              ? t[i].hasOwnProperty('ixImps') && e[i].hasOwnProperty('ixImps')
                                ? (t[i].ixImps = [...t[i].ixImps, ...e[i].ixImps])
                                : t[i].hasOwnProperty('missingImps') && e[i].hasOwnProperty('missingImps')
                                  ? (t[i].missingImps = [...t[i].missingImps, ...e[i].missingImps])
                                  : e[i].hasOwnProperty('ixImps')
                                    ? (t[i].ixImps = e[i].ixImps)
                                    : e[i].hasOwnProperty('missingImps') && (t[i].missingImps = e[i].missingImps)
                              : (t[i] = e[i]);
                          });
                        }),
                        t
                      );
                    })(c),
                  ),
                ),
                i
              );
            },
            interpretResponse: function (e, t) {
              const i = [];
              let r;
              if ((E.setFeatureToggles(e), !e.hasOwnProperty('body'))) return i;
              const n = e.body,
                s = n.seatbid || [];
              for (let e = 0; e < s.length; e++) {
                if (!s[e].hasOwnProperty('bid')) continue;
                const d = s[e].bid,
                  c = t.data;
                for (let e = 0; e < d.length; e++) {
                  const o = N(d[e].impid, c.imp, t.validBidRequests);
                  if (((r = $(d[e], n.cur, o)), r.mediaType === p.G_ && oe(o))) {
                    const t = (0, a.A)(n, 'ext.videoplayerurl');
                    if (((r.renderer = ne(d[e].bidId, t)), !r.renderer)) continue;
                  }
                  i.push(r);
                }
                if ((0, a.A)(c, 'ext.ixdiag.err') && P.localStorageIsEnabled())
                  try {
                    P.removeDataFromLocalStorage('ixdiag');
                  } catch (e) {
                    (0, o.logError)('ix can not clear ixdiag from localStorage.');
                  }
              }
              return i;
            },
            getUserSyncs: function (e, t) {
              const i = [];
              let r = null;
              if ((t.length > 0 && (r = (0, a.A)(t[0], 'body.ext.publishersyncsperbidderoverride')), 0 === r)) return [];
              if (e.iframeEnabled) i.push({ type: 'iframe', url: 'https://js-sec.indexww.com/um/ixmatch.html' });
              else {
                let e = null;
                (c.$W.getConfig('userSync') && (e = c.$W.getConfig('userSync').syncsPerBidder),
                  0 === e && (e = r),
                  (e = r && (0 === e || e) ? (r > e ? e : r) : 1));
                for (let t = 0; t < e; t++) i.push({ type: 'image', url: de(e, t) });
              }
              return i;
            },
          };
          function de(e, t) {
            let i = '',
              r = '0';
            (J && J.hasOwnProperty('gdprApplies') && (r = J.gdprApplies ? '1' : '0'),
              J && J.hasOwnProperty('consentString') && (i = J.consentString || ''));
            return (
              '../../dsum-sec.casalemedia.com/rum__qcm_dsp_id_4_' +
              (0 !== _ ? '&site_id=' + _.toString() : '') +
              '&p=' +
              e.toString() +
              '&i=' +
              t.toString() +
              '&gdpr=' +
              r +
              '&gdpr_consent=' +
              i +
              '&us_privacy=' +
              (k || '')
            );
          }
          function pe(e) {
            return (
              e.imp.forEach((t, i) => {
                const r = t.ext;
                if (null == r) return e;
                le(t) < 2 ||
                  Object.keys(r).forEach((n) => {
                    if (p.D4 in t) {
                      const o = t.banner.ext;
                      if ((void 0 !== o && void 0 !== o[n] && o[n] === r[n] && delete e.imp[i].banner.ext[n], void 0 !== t.banner.format))
                        for (let o = 0; o < t.banner.format.length; o++)
                          t.banner.format[o]?.ext?.[n] === r[n] && delete e.imp[i].banner.format[o].ext[n];
                    }
                    if (p.G_ in t) {
                      const o = t.video.ext;
                      void 0 !== o && void 0 !== o[n] && o[n] === r[n] && delete e.imp[i].video.ext[n];
                    }
                    if (p.s6 in t) {
                      const o = t.native.ext;
                      void 0 !== o && void 0 !== o[n] && o[n] === r[n] && delete e.imp[i].native.ext[n];
                    }
                  });
              }),
              e
            );
          }
          function ce(e) {
            return (
              e.imp.forEach((t, i) => {
                const r = t.ext;
                if (null == r) return e;
                if (!(le(t) < 2)) {
                  if (p.D4 in t) {
                    const r = t.banner.ext;
                    if ((void 0 !== r && void 0 !== r.siteID && delete e.imp[i].banner.ext.siteID, void 0 !== t.banner.format))
                      for (let r = 0; r < t.banner.format.length; r++)
                        void 0 !== t.banner.format[r].ext &&
                          void 0 !== t.banner.format[r].ext.siteID &&
                          ((0, s.J)(e.imp[i], 'ext.siteID', t.banner.format[r].ext.siteID),
                          (0, s.J)(e, 'ext.ixdiag.usid', !0),
                          delete e.imp[i].banner.format[r].ext.siteID);
                  }
                  if (p.G_ in t) {
                    const r = t.video.ext;
                    void 0 !== r && void 0 !== r.siteID && delete e.imp[i].video.ext.siteID;
                  }
                  if (p.s6 in t) {
                    const r = t.native.ext;
                    void 0 !== r && void 0 !== r.siteID && delete e.imp[i].native.ext.siteID;
                  }
                }
              }),
              e
            );
          }
          function le(e) {
            let t = 0;
            return (void 0 !== e.banner && (t += 1), void 0 !== e.video && (t += 1), void 0 !== e.native && (t += 1), t);
          }
          function ue(e) {
            return (void 0 === e.device && (e.device = {}), (e.device.h = window.screen.height), (e.device.w = window.screen.width), e);
          }
          ((0, u.a$)(se),
            (0, n.E)('ixBidAdapter'),
            Object.assign(r.W1, {
              10: { purposes: [1, 2, 4, 7, 10], legIntPurposes: [], flexiblePurposes: [2, 7, 10], specialFeatures: [1] },
            }));
        },
      },
      (e) => {
        e.O(0, [802, 7769, 5590, 1085, 3005], () => {
          return ((t = 8700), e((e.s = t)));
          var t;
        });
        e.O();
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [9595],
      {
        893(e, t, r) {
          var n = r(1068),
            o = r(1129),
            a = r(7413),
            i = r(8928),
            s = r(3350),
            c = r(8384),
            d = r(2682),
            p = r(2354),
            u = r(1779);
          const l = Object.freeze({
              CODE: 'kargo',
              HOST: 'krk2.kargo.com',
              REQUEST_METHOD: 'POST',
              REQUEST_ENDPOINT: '/api/v1/prebid',
              TIMEOUT_ENDPOINT: '/api/v1/event/timeout',
              GVLID: 972,
              SUPPORTED_MEDIA_TYPES: [u.D4, u.G_],
            }),
            E = (0, p.vM)({ bidderCode: l.CODE }),
            I = Object.freeze({ KEY: 'currency', US_DOLLAR: 'USD' }),
            g = Object.freeze({
              USER_DATA: 'ortb2.user.data',
              SOCIAL_CANVAS: 'params.socialCanvas',
              SUA: 'ortb2.device.sua',
              TDID_ADAPTER: 'userId.tdid',
            }),
            S = Object.freeze({ BROWSERS: 'browsers', MOBILE: 'mobile', MODEL: 'model', PLATFORM: 'platform', SOURCE: 'source' }),
            b = [S.BROWSERS, S.MOBILE, S.MODEL, S.SOURCE, S.PLATFORM],
            m = Object.freeze({
              KEY: 'krg_crb',
              SYNC_URL:
                'https://crb.kargo.com/api/v1/initsyncrnd/{UUID}?seed={SEED}&gdpr={GDPR}&gdpr_consent={GDPR_CONSENT}&us_privacy={US_PRIVACY}&gpp={GPP_STRING}&gpp_sid={GPP_SID}',
              SYNC_COUNT: 5,
              PAGE_VIEW_ID: 'pageViewId',
              PAGE_VIEW_TIMESTAMP: 'pageViewTimestamp',
              PAGE_VIEW_URL: 'pageViewUrl',
            });
          let D, _, T;
          function f(e, t) {
            const r = {};
            return (
              e && ((r.ortb2 = (0, s.Go)(e)), r.ortb2.user && r.ortb2.user.ext && delete r.ortb2.user.ext.eids),
              t && (r.refererInfo = t),
              r
            );
          }
          function R() {
            return (D || (D = (0, a.generateUUID)()), D);
          }
          function O(e) {
            try {
              return E.getDataFromLocalStorage(e);
            } catch (e) {
              return null;
            }
          }
          function C(e, t, r, n, o) {
            const i = P._getCrb(),
              s = { crbIDs: i.syncIds || {} };
            if (
              (!e && i.tdID ? (s.tdID = i.tdID) : e && (s.tdID = e),
              t && (s.usp = t),
              r && (s.gdpr = { consent: r.consentString || '', applies: !!r.gdprApplies }),
              null !== i.lexId && void 0 !== i.lexId && (s.kargoID = i.lexId),
              null !== i.clientId && void 0 !== i.clientId && (s.clientID = i.clientId),
              null !== i.optOut && void 0 !== i.optOut && (s.optOut = i.optOut),
              null != n && (s.sharedIDEids = n),
              o)
            ) {
              const e = {};
              (o.gppString && (e.gppString = o.gppString),
                o.applicableSections && (e.applicableSections = o.applicableSections),
                (0, a.isEmpty)(e) || (s.gpp = e));
            }
            return s;
          }
          const P = {
            gvlid: l.GVLID,
            code: l.CODE,
            isBidRequestValid: function (e) {
              return !(!e || !e.params) && !!e.params.placementId;
            },
            buildRequests: function (e, t) {
              const r = c.$W.getConfig(I.KEY),
                n = r && r.adServerCurrency ? r.adServerCurrency : null,
                o = [];
              (0, a._each)(e, (e) => {
                o.push(
                  (function (e) {
                    const t = { id: e.bidId, tid: e.ortb2Imp?.ext?.tid, pid: e.params.placementId, code: e.adUnitCode };
                    e.bidRequestsCount > 0 && (t.bidRequestCount = e.bidRequestsCount);
                    e.bidderRequestsCount > 0 && (t.bidderRequestCount = e.bidderRequestsCount);
                    e.bidderWinsCount > 0 && (t.bidderWinCount = e.bidderWinsCount);
                    const r = (0, i.A)(e, 'ortb2Imp.ext.gpid');
                    r && (t.fpd = { gpid: r });
                    e.ortb2Imp && (t.ext = { ortb2Imp: e.ortb2Imp });
                    if (e.mediaTypes) {
                      const { banner: r, video: n, native: o } = e.mediaTypes;
                      if ((r && (t.banner = r), n && (t.video = n), o && (t.native = o), 'function' == typeof e.getFloor)) {
                        let r;
                        try {
                          r = e.getFloor({ currency: 'USD', mediaType: '*', size: '*' });
                        } catch (e) {
                          (0, a.logError)('Kargo: getFloor threw an error: ', e);
                        }
                        t.floor = (0, s.Qd)(r) && 'USD' === r.currency && !isNaN(parseInt(r.floor)) ? r.floor : void 0;
                      }
                    }
                    return t;
                  })(e),
                );
              });
              const d = e[0],
                p = (0, i.A)(d, g.TDID_ADAPTER),
                u = (function (e) {
                  return { pageURL: e?.refererInfo?.page, rawCRB: E.getCookie(m.KEY), rawCRBLocalStorage: O(m.KEY) };
                })(t),
                D = Object.assign(
                  {},
                  {
                    pbv: '11.23.0',
                    aid: d.auctionId,
                    sid: R(),
                    url: u.pageURL,
                    timeout: t.timeout,
                    ts: new Date().getTime(),
                    device: { size: [window.screen.width, window.screen.height] },
                    imp: o,
                    user: C(p, t.uspConsent, t.gdprConsent, d.userIdAsEids, t.gppConsent),
                    ext: f(d.ortb2, t?.refererInfo),
                  },
                );
              null !== d.ortb2?.site?.cat && void 0 !== d.ortb2?.site?.cat && (D.site = { cat: d.ortb2.site.cat });
              const P = d?.ortb2?.source?.ext?.schain;
              (P && P.nodes && (D.schain = P),
                (D.user.data = (0, i.A)(d, g.USER_DATA) || []),
                (D.requestCount = (function () {
                  if (_ === window.location.pathname) return ++T;
                  return ((_ = window.location.pathname), (T = 0), T);
                })()),
                null != n && n !== I.US_DOLLAR && (D.cur = n),
                null !== u.rawCRB && void 0 !== u.rawCRB && (D.rawCRB = u.rawCRB),
                null !== u.rawCRBLocalStorage && void 0 !== u.rawCRBLocalStorage && (D.rawCRBLocalStorage = u.rawCRBLocalStorage));
              const A = (0, i.A)(d, g.SOCIAL_CANVAS);
              null != A && (D.socan = A);
              const U = (0, i.A)(d, g.SUA);
              if (U) {
                const e = [];
                (b.forEach((t) => {
                  const r = U[t];
                  if (r && ('string' != typeof r || '' !== r.trim()))
                    switch (t) {
                      case S.MOBILE && r < 1:
                      case S.SOURCE && r < 1:
                        break;
                      default:
                        e.push(t);
                    }
                }),
                  (D.device.sua = (0, a.pick)(U, e)));
              }
              const h = null !== O(m.PAGE_VIEW_ID) && void 0 !== O(m.PAGE_VIEW_ID),
                y = null !== O(m.PAGE_VIEW_TIMESTAMP) && void 0 !== O(m.PAGE_VIEW_TIMESTAMP),
                v = null !== O(m.PAGE_VIEW_URL) && void 0 !== O(m.PAGE_VIEW_URL),
                w = {};
              return (
                h && (w.id = O(m.PAGE_VIEW_ID)),
                y && (w.timestamp = Number(O(m.PAGE_VIEW_TIMESTAMP))),
                v && (w.url = O(m.PAGE_VIEW_URL)),
                (0, a.isEmpty)(w) || (D.page = w),
                D.ext && 0 === Object.keys(D.ext).length && delete D.ext,
                Object.assign({}, t, { method: l.REQUEST_METHOD, url: `https://${l.HOST}${l.REQUEST_ENDPOINT}`, data: D, currency: n })
              );
            },
            interpretResponse: function (e, t) {
              const r = e.body,
                n = [];
              if ((0, a.isEmpty)(r) || 'object' != typeof r) return n;
              for (const [e, o] of Object.entries(r)) {
                const r = { mediaType: o.mediaType && l.SUPPORTED_MEDIA_TYPES.includes(o.mediaType) ? o.mediaType : u.D4 };
                o.metadata?.landingPageDomain &&
                  ((r.clickUrl = o.metadata.landingPageDomain[0]), (r.advertiserDomains = o.metadata.landingPageDomain));
                const a = {
                  requestId: e,
                  cpm: Number(o.cpm),
                  width: o.width,
                  height: o.height,
                  ttl: 300,
                  creativeId: o.creativeID,
                  dealId: o.targetingCustom,
                  netRevenue: !0,
                  currency: o.currency || t.currency,
                  mediaType: r.mediaType,
                  meta: r,
                };
                (r.mediaType === u.G_ ? (o.admUrl ? (a.vastUrl = o.admUrl) : (a.vastXml = o.adm)) : (a.ad = o.adm), n.push(a));
              }
              return n;
            },
            getUserSyncs: function (e, t, r, n, o) {
              const i = [],
                s = (0, a.generateUUID)(),
                c = P._getCrb().clientId;
              var d = r && r.gdprApplies ? 1 : 0,
                p = r && r.consentString ? r.consentString : '',
                u = o && o.gppString ? o.gppString : '',
                l = o && o.applicableSections && Array.isArray(o.applicableSections) ? o.applicableSections.join(',') : '';
              return (
                ('string' == typeof n && 4 === n.length && '1' === n[0] && 'Y' === n[2]) ||
                  (e.iframeEnabled &&
                    s &&
                    c &&
                    i.push({
                      type: 'iframe',
                      url: m.SYNC_URL.replace('{UUID}', c)
                        .replace('{SEED}', s)
                        .replace('{GDPR}', d)
                        .replace('{GDPR_CONSENT}', p)
                        .replace('{US_PRIVACY}', n || '')
                        .replace('{GPP_STRING}', u)
                        .replace('{GPP_SID}', l),
                    })),
                i
              );
            },
            supportedMediaTypes: l.SUPPORTED_MEDIA_TYPES,
            onTimeout: function (e) {
              null != e &&
                e.forEach((e) => {
                  !(function (e, t) {
                    const r = { aid: e, ato: t },
                      n = (0, a.buildUrl)({ protocol: 'https', hostname: l.HOST, pathname: l.TIMEOUT_ENDPOINT, search: r });
                    fetch(n, { method: 'GET', keepalive: !0 }).catch((e) => {
                      (0, a.logError)('Kargo: sendTimeoutData/fetch threw an error: ', e);
                    });
                  })(e.auctionId, e.timeout);
                });
            },
            _getCrb: function () {
              const e = (function () {
                try {
                  return JSON.parse(atob(O(m.KEY)));
                } catch (e) {
                  return {};
                }
              })();
              return Object.keys(e).length
                ? e
                : (function () {
                    try {
                      const e = JSON.parse(E.getCookie(m.KEY));
                      if (e && e.v) {
                        const t = JSON.parse(atob(e.v));
                        if (t) return t;
                      }
                      return {};
                    } catch (e) {
                      return {};
                    }
                  })();
            },
            _getSessionId: R,
          };
          ((0, d.a$)(P),
            (0, o.E)('kargoBidAdapter'),
            Object.assign(n.W1, {
              972: { purposes: [1, 2, 3, 4, 7, 9, 10], legIntPurposes: [], flexiblePurposes: [], specialFeatures: [] },
            }));
        },
      },
      (e) => {
        e.O(0, [802, 7769, 5590, 1085], () => {
          return ((t = 893), e((e.s = t)));
          var t;
        });
        e.O();
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [2259],
      {
        4228(e, t, r) {
          r.d(t, { DQ: () => St });
          const n = new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$', 'i'),
            o = !!String.prototype.trim;
          function i(e, t) {
            return null != e ? t(e) : e;
          }
          function s(e) {
            return 'object' == typeof e ? JSON.stringify(e) : '' + e;
          }
          function a(e) {
            return null != e;
          }
          function c(e) {
            return !!e && n.test(d(e));
          }
          function l(e) {
            return '[object Array]' === Object.prototype.toString.call(e);
          }
          function d(e) {
            return o ? ('' + e).trim() : ('' + e).replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
          }
          function u(e) {
            return 'string' == typeof e;
          }
          function h(e, t) {
            return u(e) && u(t) && d(e.toLowerCase()) === d(t.toLowerCase());
          }
          function f(e) {
            return !!e && 'object' == typeof e && !l(e);
          }
          function p(e) {
            return f(e);
          }
          function g(e) {
            return !!e && 'function' == typeof e;
          }
          function m(e, t) {
            return new Date(new Date().getTime() + e * t);
          }
          function w(e) {
            return m(e, 864e5);
          }
          function v(e, t, r) {
            if (f(t)) {
              let n;
              return (
                (n = 'message' in t && 'string' == typeof t.message ? new Error(r || t.message) : new Error(r)),
                (n.name = e),
                'stack' in t && 'string' == typeof t.stack && (n.stack = t.stack),
                'lineNumber' in t && 'number' == typeof t.lineNumber && (n.lineNumber = t.lineNumber),
                'columnNumber' in t && 'number' == typeof t.columnNumber && (n.columnNumber = t.columnNumber),
                n
              );
            }
            {
              const t = Error(r);
              return ((t.name = e), t);
            }
          }
          const C = 'li_errors';
          class y {
            data;
            constructor(e) {
              const t = parseInt(e.toString()) || 5;
              this.data = { h: {}, q: {}, size: t };
            }
            on(e, t, r) {
              const n = { callback: t.bind(r), unbound: t };
              return (
                (this.data = { ...this.data, h: { ...this.data.h, [e]: [...(this.data.h[e] || []), n] } }),
                (this.data.q[e] || []).forEach((e) => t.call(r, e)),
                this
              );
            }
            once(e, t, r) {
              const n = this.data.q[e] || [];
              if (n.length > 0) return (t.call(r, n[0]), this);
              {
                const n = (o) => {
                  (this.off(e, n), t.call(r, o));
                };
                return ((n._ = t), this.on(e, n, r));
              }
            }
            emit(e, t) {
              (this.data.h[e] || []).forEach((e) => e.callback(t));
              const r = this.data.q[e] || [];
              return (
                (this.data = { ...this.data, q: { ...this.data.q, [e]: [...(r.length < this.data.size ? r : r.slice(1)), t] } }),
                this
              );
            }
            off(e, t) {
              const r = this.data.h[e],
                n = (r && t && r.filter((e) => e.unbound !== t)) || [];
              if (n.length) this.data = { ...this.data, h: { ...this.data.h, [e]: n } };
              else {
                const { [e]: t, ...r } = this.data.h;
                this.data = { ...this.data, h: r };
              }
              return this;
            }
            emitErrorWithMessage(e, t, r) {
              const n = v(e, r, t);
              return this.emit(C, n);
            }
            emitError(e, t) {
              const r = v(e, t);
              return this.emit(C, r);
            }
          }
          for (var b = [], E = 0; E < 64; ) b[E] = 0 | (4294967296 * Math.sin(++E % Math.PI));
          function S(e) {
            var t,
              r,
              n,
              o = [(t = 1732584193), (r = 4023233417), ~t, ~r],
              i = [],
              s = unescape(encodeURI(e)) + '',
              a = s.length;
            for (e = (--a / 4 + 2) | 15, i[--e] = 8 * a; ~a; ) i[a >> 2] |= s.charCodeAt(a) << (8 * a--);
            for (E = s = 0; E < e; E += 16) {
              for (
                a = o;
                s < 64;
                a = [
                  (n = a[3]),
                  t +
                    (((n =
                      a[0] +
                      [(t & r) | (~t & n), (n & t) | (~n & r), t ^ r ^ n, r ^ (t | ~n)][(a = s >> 4)] +
                      b[s] +
                      ~~i[E | (15 & [s, 5 * s + 1, 3 * s + 5, 7 * s][a])]) <<
                      (a = [7, 12, 17, 22, 5, 9, 14, 20, 4, 11, 16, 23, 6, 10, 15, 21][4 * a + (s++ % 4)])) |
                      (n >>> -a)),
                  t,
                  r,
                ]
              )
                ((t = 0 | a[1]), (r = a[2]));
              for (s = 4; s; ) o[--s] += a[s];
            }
            for (e = ''; s < 32; ) e += ((o[s >> 3] >> (4 * (1 ^ s++))) & 15).toString(16);
            return e;
          }
          function I(e) {
            var t,
              r,
              n,
              o,
              i,
              s = [],
              a = [(r = 1732584193), (n = 4023233417), ~r, ~n, 3285377520],
              c = [],
              l = unescape(encodeURI(e)) + '',
              d = l.length;
            for (c[(e = (--d / 4 + 2) | 15)] = 8 * d; ~d; ) c[d >> 2] |= l.charCodeAt(d) << (8 * ~d--);
            for (t = d = 0; t < e; t += 16) {
              for (
                r = a;
                d < 80;
                r = [
                  r[4] +
                    (s[d] = d < 16 ? ~~c[t + d] : (2 * l) | (l < 0)) +
                    1518500249 +
                    [(n & o) | (~n & i), (l = 341275144 + (n ^ o ^ i)), 882459459 + ((n & o) | (n & i) | (o & i)), l + 1535694389][
                      (d++ / 5) >> 2
                    ] +
                    (((l = r[0]) << 5) | (l >>> 27)),
                  l,
                  (n << 30) | (n >>> 2),
                  o,
                  i,
                ]
              )
                ((l = s[d - 3] ^ s[d - 8] ^ s[d - 14] ^ s[d - 16]), (n = r[1]), (o = r[2]), (i = r[3]));
              for (d = 5; d; ) a[--d] += r[d];
            }
            for (l = ''; d < 40; ) l += ((a[d >> 3] >> (4 * (7 - d++))) & 15).toString(16);
            return l;
          }
          for (var k, x = 18, A = [], O = []; x > 1; x--) for (k = x; k < 320; ) A[(k += x)] = 1;
          function L(e, t) {
            return (4294967296 * Math.pow(e, 1 / t)) | 0;
          }
          for (k = 0; k < 64; ) A[++x] || ((O[k] = L(x, 2)), (A[k++] = L(x, 3)));
          function D(e, t) {
            return (e >>> t) | (e << -t);
          }
          function N(e) {
            var t = O.slice((x = k = 0), 8),
              r = [],
              n = unescape(encodeURI(e)) + '',
              o = n.length;
            for (r[(e = (--o / 4 + 2) | 15)] = 8 * o; ~o; ) r[o >> 2] |= n.charCodeAt(o) << (8 * ~o--);
            for (o = []; x < e; x += 16) {
              for (
                L = t.slice();
                k < 64;
                L.unshift(n + (D((n = L[0]), 2) ^ D(n, 13) ^ D(n, 22)) + ((n & L[1]) ^ (L[1] & L[2]) ^ (L[2] & n)))
              )
                L[3] += n =
                  0 |
                  ((o[k] =
                    k < 16
                      ? ~~r[k + x]
                      : (D((n = o[k - 2]), 17) ^ D(n, 19) ^ (n >>> 10)) +
                        o[k - 7] +
                        (D((n = o[k - 15]), 7) ^ D(n, 18) ^ (n >>> 3)) +
                        o[k - 16]) +
                    L.pop() +
                    (D((n = L[4]), 6) ^ D(n, 11) ^ D(n, 25)) +
                    ((n & L[5]) ^ (~n & L[6])) +
                    A[k++]);
              for (k = 8; k; ) t[--k] += L[k];
            }
            for (n = ''; k < 64; ) n += ((t[k >> 3] >> (4 * (7 - k++))) & 15).toString(16);
            return n;
          }
          class M {
            url;
            timeout;
            calls;
            eventBus;
            retries;
            constructor(e) {
              ((this.url = e.collectorUrl ?? 'https://rp.liadm.com'),
                (this.timeout = e.ajaxTimeout ?? 0),
                (this.calls = e.callHandler),
                (this.eventBus = e.eventBus),
                (this.retries = e.ajaxRetries ?? 3));
            }
            callBakers(e) {
              try {
                const t = JSON.parse(e).bakers;
                if (l(t)) for (let e = 0; e < t.length; e++) this.calls.pixelGet(`${t[e]}?dtstmp=${Date.now()}`);
              } catch (t) {
                this.eventBus.emitErrorWithMessage('CallBakers', `Error while calling bakers with ${e}`, t);
              }
            }
            sendState(e, t, r, n) {
              if (e.sendsPixel()) {
                n && g(n) && n();
                const o = e.asQuery().add('dtstmp', Date.now(), { prepend: !0 }).toQueryString();
                r(`${this.url}/${t}${o}`);
              }
            }
            sendAjax(e, t = {}) {
              this.sendState(
                e,
                'j',
                (r) => {
                  const n = (o) => {
                    const i = e.asHeaders();
                    this.calls.ajaxGet(
                      r,
                      (e) => {
                        (t.onLoad && g(t.onLoad) && t.onLoad(), this.callBakers(e));
                      },
                      (r) => {
                        o <= 0 ? (this.sendPixel(e, t), this.eventBus.emitError('AjaxFailed', r)) : n(o - 1);
                      },
                      this.timeout,
                      i,
                    );
                  };
                  n(this.retries);
                },
                t.onPreSend,
              );
            }
            sendPixel(e, t = {}) {
              this.sendState(e, 'p', (e) => this.calls.pixelGet(e, t.onLoad), t.onPreSend);
            }
          }
          const F = '__li__evt_bus',
            R = 'lips',
            j = 'pre_lips',
            U = '_li_duid',
            $ = 'https://idx.liadm.com/idex',
            _ = [];
          function V(e) {
            return e >= 0 && e < 64 ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'[e] : void 0;
          }
          function P(e) {
            const t = (function (e) {
              e = `${e}`;
              for (let t = 0; t < e.length; t++) if (e.charCodeAt(t) > 255) return null;
              let t = '';
              for (let r = 0; r < e.length; r += 3) {
                const n = [void 0, void 0, void 0, void 0];
                ((n[0] = e.charCodeAt(r) >> 2),
                  (n[1] = (3 & e.charCodeAt(r)) << 4),
                  e.length > r + 2
                    ? ((n[1] |= e.charCodeAt(r + 1) >> 4),
                      (n[2] = (15 & e.charCodeAt(r + 1)) << 2),
                      (n[2] |= e.charCodeAt(r + 2) >> 6),
                      (n[3] = 63 & e.charCodeAt(r + 2)))
                    : e.length > r + 1 && ((n[1] |= e.charCodeAt(r + 1) >> 4), (n[2] = (15 & e.charCodeAt(r + 1)) << 2)));
                for (let e = 0; e < n.length; e++) {
                  const r = n[e];
                  t += void 0 === r ? '=' : V(r);
                }
              }
              return t;
            })(e);
            return t || '';
          }
          const B = /[+/]|=+$/g,
            T = { '+': '-', '/': '_' };
          function W(e) {
            return T[e] || '';
          }
          function q(e) {
            let t = null;
            const r = encodeURIComponent(e).replace(/%([0-9A-F]{2})/g, (e, t) => String.fromCharCode(parseInt('0x' + t, 16)));
            try {
              t = window && g(window.btoa) ? window.btoa : P;
            } catch (e) {
              t = P;
            }
            return t(r).replace(B, W);
          }
          const H = new Map([
            [32, 'md5'],
            [40, 'sha1'],
            [64, 'sha256'],
          ]);
          function Q(e) {
            const t = G(e);
            return !!t && H.has(t.length);
          }
          function G(e) {
            const t = e.match(/(\s+)?[a-f0-9]{32,64}(\s+)?/gi);
            return t && t.map(d)[0];
          }
          function J(e) {
            const t = e.toLowerCase();
            return { md5: S(t), sha1: I(t), sha256: N(t) };
          }
          function z(e) {
            return /\S+(@|%40)\S+\.\S+/.test(e);
          }
          function X(e) {
            return /\S+(@|%40)\S+\.\S+/.test(e);
          }
          function K(e) {
            const t = e.match(/\S+(@|%40)\S+\.\S+/);
            return t && t.map(d)[0];
          }
          function Y(e) {
            const t = (function (e) {
                const t = [],
                  r = new RegExp('([\\w\\d.+-]+(@|%40)[\\w\\d-]+.[\\w\\d.-]+)', 'g');
                let n = r.exec(e);
                for (; n; ) (t.push(d(n[1])), (n = r.exec(e)));
                return t;
              })(e),
              r = [];
            let n = e;
            for (let e = 0; e < t.length; e++) {
              const o = t[e],
                i = J(o);
              ((n = n.replace(o, i.md5)), r.push(i));
            }
            return { stringWithoutRawEmails: n, hashesFromOriginalString: r };
          }
          function Z(e, t) {
            return 'string' == typeof t && z(d(t)) ? '*********' : t;
          }
          function ee(e) {
            return (function (e) {
              return 'false' !== e && ('true' === e || e);
            })(
              (function (e) {
                return 'null' === e || 'undefined' === e ? null : e;
              })(
                (function (e) {
                  return isNaN(+e) ? e : +e;
                })(e),
              ),
            );
          }
          function te(e, t) {
            if (t in e) {
              const r = e[t];
              return l(r) ? r.map((e) => ee(ne(e))) : ee(ne(r));
            }
          }
          function re(e) {
            let t, r, n;
            const o = {};
            return e && -1 !== (t = e.indexOf('?')) && (r = e.slice(t + 1)) && (-1 === (n = r.indexOf('#')) || (r = r.slice(0, n)))
              ? (r.split('&').forEach(function (e) {
                  if (e) {
                    let t;
                    const r = e.split('=');
                    t = r[0];
                    const n = 2 === r.length ? r[1] : 'true';
                    if (('[]' === t.slice(-2) && (t = t.slice(0, -2)), t in o)) {
                      const e = o[t];
                      l(e) ? e.push(n) : (o[t] = [e, n]);
                    } else o[t] = n;
                  }
                }),
                o)
              : o;
          }
          function ne(e) {
            return e.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
          }
          class oe {
            hash;
            host;
            hostname;
            pathname;
            port;
            protocol;
            search;
            constructor(e) {
              const t = e.match(/^(https?\:\/\/)?(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/);
              if (null === t) throw new TypeError(`Failed to parse URL: ${e}`);
              ((this.protocol = t[1] || ''),
                (this.host = t[2] || ''),
                (this.hostname = t[3] || ''),
                (this.port = t[4] || ''),
                (this.pathname = t[5] || ''),
                (this.search = t[6] || ''),
                (this.hash = t[7] || ''));
            }
            toString() {
              return `${this.protocol}${this.host}${this.pathname}${this.search}${this.hash}`;
            }
          }
          const ie = ['items', 'itemids'],
            se = ['email', 'emailhash', 'hash', 'hashedemail'];
          function ae(e) {
            const t = {};
            return (
              Object.keys(e).forEach((r) => {
                const n = r.toLowerCase(),
                  o = e[r];
                ie.indexOf(n) > -1 && l(o) && o.length > 10 ? (t[r] = o.slice(0, 10)) : (t[r] = o);
              }),
              t
            );
          }
          function ce(e) {
            if (p(e)) {
              return {
                ...(function (e) {
                  const t = { eventSource: e };
                  for (const r of Object.keys(e)) {
                    const n = r.toLowerCase();
                    if (se.indexOf(n) > -1) {
                      const n = d(s(e[r])),
                        o = K(n),
                        i = G(n);
                      if (o) {
                        const e = J(ne(o));
                        t.hashedEmail = [e.md5, e.sha1, e.sha256];
                        break;
                      }
                      if (i && Q(i)) {
                        t.hashedEmail = [i.toLowerCase()];
                        break;
                      }
                    }
                  }
                  return (
                    'string' == typeof e.userAgent && (t.providedUserAgent = e.userAgent),
                    'string' == typeof e.ipv4 && (t.providedIPV4 = e.ipv4),
                    'string' == typeof e.ipv6 && (t.providedIPV6 = e.ipv6),
                    t
                  );
                })(e),
                eventSource: ae(e),
              };
            }
            return {};
          }
          class le {
            tuples;
            constructor(e = []) {
              this.tuples = e;
            }
            add(e, t, r = {}) {
              const { stripEmpty: n = !0, prepend: o = !1 } = r;
              return '' === e || (n && '' === t) ? this : o ? (this.tuples.unshift([e, t]), this) : (this.tuples.push([e, t]), this);
            }
            addOptional(e, t, r = {}) {
              return a(t) ? this.add(e, t, r) : this;
            }
            addParamsMap(e) {
              return (
                Object.keys(e).forEach((t) => {
                  const r = e[t];
                  a(r) && (l(r) ? r.forEach((e) => this.add(t, e)) : this.add(t, r));
                }),
                this
              );
            }
            copy() {
              return new le(this.tuples.slice());
            }
            filteredCopy(e) {
              return new le(this.tuples.filter(([t, r]) => e(t, r)));
            }
            toQueryString() {
              let e = '';
              return (
                this.tuples.forEach(([t, r]) => {
                  const n = 0 === e.length ? '?' : '&';
                  e = `${e}${n}${encodeURIComponent(t)}=${encodeURIComponent(r)}`;
                }),
                e
              );
            }
          }
          function de(e) {
            return null === e ? '' : e;
          }
          const ue = 'full',
            he = 'no_path';
          function fe(e) {
            if (void 0 === e.pageUrl || 0 === e.pageUrl.length) return ['', !1, []];
            if (
              (function (e) {
                return !(
                  (void 0 !== e.urlCollectionMode && e.urlCollectionMode !== ue) ||
                  (void 0 !== e.queryParametersFilter && '' !== e.queryParametersFilter)
                );
              })(e)
            )
              return [e.pageUrl, !1, []];
            const t = new oe(e.pageUrl),
              r = (function (e) {
                const t = re(e),
                  r = [];
                return (
                  Object.keys(t).forEach((e) => {
                    r.push([e, te(t, e)]);
                  }),
                  r
                );
              })(t.search),
              n = (function (e, t) {
                return t.urlCollectionMode === he && e.pathname.length > 1;
              })(t, e),
              o = (function (e, t) {
                if (void 0 === t.queryParametersFilter || '' === t.queryParametersFilter) return [];
                const r = new RegExp(t.queryParametersFilter);
                return e.map((e) => e[0]).filter((e) => r.test(e));
              })(r, e);
            return (
              n && (t.pathname = '/'),
              o.length > 0 &&
                (t.search = (function (e, t) {
                  const r = e.filter((e) => -1 === t.indexOf(e[0])).map((e) => `${e[0]}=${e[1]}`);
                  return r.length > 0 ? `?${r.join('&')}` : '';
                })(r, o)),
              [t.toString(), n, o]
            );
          }
          function pe(e) {
            if (0 !== e.length) {
              const t = new oe(e);
              return ((t.pathname = ''), (t.search = ''), t.toString());
            }
          }
          const ge = ['setemail', 'setemailhash', 'sethashedemail'];
          class me {
            data;
            constructor(e, t, r, n) {
              const o = me.safeFiddle(e, t, n);
              (r && (o.errorDetails = r), (this.data = o));
            }
            static safeFiddle(e, t, r) {
              try {
                return (function (e, t) {
                  const r = {};
                  function n(e) {
                    return f(e) ? e : {};
                  }
                  function o(e) {
                    return Object.keys(e);
                  }
                  const i = n(e),
                    s = n(t);
                  return (
                    o(i).forEach((e) => {
                      r[e] = i[e];
                    }),
                    o(s).forEach((e) => {
                      r[e] = s[e];
                    }),
                    r
                  );
                })(e, ce(JSON.parse(JSON.stringify(t))));
              } catch (e) {
                return (
                  console.error(e),
                  null != r && r.emitErrorWithMessage('StateCombineWith', 'Error while extracting event data', e),
                  {}
                );
              }
            }
            static fromEvent(e, t, r) {
              return new me(e, t, void 0, r);
            }
            static fromError(e, t, r) {
              return new me(e, {}, t, r);
            }
            setHashedEmail(e) {
              this.data.hashedEmail = e;
            }
            getHashedEmail() {
              return this.data.hashedEmail || [];
            }
            sendsPixel() {
              const e = f(this.data.eventSource) ? this.data.eventSource : {},
                t = Object.keys(e).filter((e) => 'eventname' === e.toLowerCase() || 'event' === e.toLowerCase()),
                r = t && t.length >= 1 && t[0],
                n = r && d(e[r]);
              return !n || -1 === ge.indexOf(n.toLowerCase());
            }
            asHeaders() {
              return this.data.providedUserAgent ? { 'X-LI-Provided-User-Agent': this.data.providedUserAgent } : {};
            }
            asQuery() {
              const e = this.data,
                t = new le()
                  .addOptional('aid', e.appId)
                  .addOptional('did', e.distributorId)
                  .addOptional(
                    'se',
                    i(e.eventSource, (e) => q(JSON.stringify(e, Z))),
                  )
                  .addOptional('duid', e.liveConnectId)
                  .addOptional('tv', e.trackerVersion);
              if (a(e.pageUrl)) {
                const [r, n, o] = fe(e);
                t.add('pu', r)
                  .addOptional('pu_rp', n ? '1' : void 0)
                  .add('pu_rqp', o.join(','));
              }
              return (
                t.addOptional(
                  'ae',
                  i(e.errorDetails, (e) => q(JSON.stringify(e))),
                ),
                l(e.retrievedIdentifiers) && e.retrievedIdentifiers.forEach((e) => t.add(`ext_${e.name}`, e.value)),
                l(e.hashesFromIdentifiers) && e.hashesFromIdentifiers.forEach((e) => t.add('scre', `${e.md5},${e.sha1},${e.sha256}`)),
                t
                  .addOptional('li_did', e.decisionIds?.join(','))
                  .addOptional('e', e.hashedEmail?.join(','))
                  .addOptional('us_privacy', e.usPrivacyString)
                  .addOptional('wpn', e.wrapperName)
                  .addOptional(
                    'gdpr',
                    i(e.gdprApplies, (e) => (e ? '1' : '0')),
                  )
                  .addOptional('gdpr_consent', e.gdprConsent)
                  .addOptional('refr', e.referrer)
                  .addOptional('gpp_s', e.gppString)
                  .addOptional('gpp_as', e.gppApplicableSections?.join(','))
                  .addOptional('cd', e.cookieDomain)
                  .addOptional('ic', de(e.resolvedIdCookie), { stripEmpty: !1 })
                  .addOptional('c', e.contextElements)
                  .addOptional(
                    'pip',
                    i(e.providedIPV4, (e) => q(e)),
                  )
                  .addOptional(
                    'pip6',
                    i(e.providedIPV6, (e) => q(e)),
                  ),
                t
              );
            }
          }
          function we(e = window) {
            return be(() => e.top.document.referrer);
          }
          function ve(e = window) {
            const t = be(() => e.location.ancestorOrigins) || [],
              r = [];
            let n,
              o = e;
            for (; o !== top; ) (r.push(o), (o = o.parent));
            r.push(o);
            for (let e = r.length - 1; e >= 0 && !n; e--)
              ((n = be(() => r[e].location.href)), 0 !== e && (n || (n = be(() => r[e - 1].document.referrer)), n || (n = t[e - 1])));
            return n;
          }
          function Ce(e, t, r) {
            if (!e && t && '' !== t && r) {
              const e = (function (e, t) {
                const r = window.document.querySelectorAll(e);
                let n = '';
                for (let e = 0; e < r.length; e++) {
                  const o = n + Y(r[e].outerHTML).stringWithoutRawEmails;
                  if (!(ye(o) <= t)) return n;
                  n = o;
                }
                return n;
              })(t, r);
              return q(e);
            }
            return '';
          }
          function ye(e) {
            return Math.ceil((4 * new Blob([e]).size) / 3);
          }
          function be(e) {
            try {
              return e();
            } catch (e) {
              return;
            }
          }
          function Ee(e) {
            let t = [];
            e && (l(e) ? (t = e) : u(e) && (t = e.split(',')));
            for (let e = 0; e < t.length; e++) t[e] = t[e].trim();
            return t;
          }
          function Se(e, t) {
            const r = [];
            let n = [];
            for (let o = 0; o < e.length; o++) {
              const i = e[o],
                a = t.getCookie(i) || t.getDataFromLocalStorage(i);
              if (a) {
                const e = Y(s(a));
                (r.push({ name: i, value: e.stringWithoutRawEmails }), (n = n.concat(e.hashesFromOriginalString)));
              }
            }
            return { retrievedIdentifiers: r, hashesFromIdentifiers: Ie(n) };
          }
          function Ie(e) {
            const t = new Set(),
              r = [];
            for (let n = 0; n < e.length; n++) t.has(e[n].md5) || (r.push(e[n]), t.add(e[n].md5));
            return r;
          }
          const ke = (e) => ({ ...e, privacyMode: !!e.gdprApplies || (e.gppApplicableSections ?? []).indexOf(2) > -1 });
          function xe(e, t) {
            if (e && e.appId && e.distributorId) {
              const r = e.distributorId;
              (delete e.distributorId,
                t.emitError(
                  'AppIdAndDistributorIdPresent',
                  new Error(`Event contains both appId: ${e.appId} and distributorId: ${r}. Ignoring distributorId`),
                ));
            }
            return e;
          }
          const Ae = 'idCookie';
          class Oe {
            eventBus;
            calls;
            idexConfig;
            externalIds;
            source;
            publisherId;
            url;
            timeout;
            extraAttributes;
            requestedAttributes;
            query;
            privacyMode;
            resolvedIdCookie;
            generateIdCookie;
            peopleVerifiedId;
            pageUrl;
            constructor(e, t, r) {
              const n = e || { identityResolutionConfig: {} };
              ((this.eventBus = r),
                (this.calls = t),
                (this.idexConfig = n.identityResolutionConfig || {}),
                (this.extraAttributes = this.idexConfig.extraAttributes || {}),
                (this.externalIds = n.retrievedIdentifiers || []),
                (this.source = this.idexConfig.source || 'unknown'),
                (this.publisherId = this.idexConfig.publisherId || 'any'),
                (this.url = this.idexConfig.url || $),
                (this.timeout = this.idexConfig.ajaxTimeout || n.ajaxTimeout || 5e3),
                (this.requestedAttributes = this.idexConfig.requestedAttributes || _),
                (this.privacyMode = n.privacyMode ?? !1),
                (this.resolvedIdCookie = n.resolvedIdCookie),
                (this.generateIdCookie = 'generated' === this.idexConfig.idCookieMode),
                (this.peopleVerifiedId = n.peopleVerifiedId),
                (this.pageUrl = n.pageUrl),
                (this.query = new le()
                  .addOptional('duid', n.peopleVerifiedId)
                  .addOptional('us_privacy', n.usPrivacyString)
                  .addOptional(
                    'gdpr',
                    i(n.gdprApplies, (e) => (e ? 1 : 0)),
                  )
                  .addOptional('gdpr_consent', n.gdprConsent)
                  .addOptional('did', n.distributorId)
                  .addOptional('gpp_s', n.gppString)
                  .addOptional('gpp_as', n.gppApplicableSections?.join(','))
                  .addOptional('cd', n.cookieDomain)
                  .addOptional('ic', de(n.resolvedIdCookie), { stripEmpty: !1 })
                  .addOptional('pu', i(n.pageUrl, pe))
                  .addOptional(
                    'pip',
                    i(this.extraAttributes.ipv4, (e) => q(e)),
                  )
                  .addOptional(
                    'pip6',
                    i(this.extraAttributes.ipv6, (e) => q(e)),
                  )),
                this.externalIds.forEach((e) => {
                  this.query.add(e.name, e.value);
                }),
                this.requestedAttributes.forEach((e) => {
                  this.query.add('resolve', e);
                }));
            }
            attributeResolutionAllowed(e) {
              return 'uid2' === e ? !this.privacyMode : e !== Ae;
            }
            filterParams(e) {
              return e.filteredCopy((e, t) => 'resolve' !== e || (!!u(t) && this.attributeResolutionAllowed(t)));
            }
            enrichExtraIdentifiers(e, t) {
              const r = t.tuples.filter(([e]) => 'resolve' === e).map(([, e]) => e);
              const n = { ...e };
              var o;
              return (
                (o = Ae),
                r.indexOf(o) > -1 &&
                  (this.generateIdCookie && this.peopleVerifiedId
                    ? (n[Ae] = this.peopleVerifiedId)
                    : this.resolvedIdCookie && (n[Ae] = this.resolvedIdCookie)),
                n
              );
            }
            responseReceived(e, t) {
              return (r, n) => {
                let o = {};
                if (r)
                  try {
                    const e = JSON.parse(r);
                    f(e) && (o = e);
                  } catch (e) {
                    (console.error('Error parsing response', e), this.eventBus.emitError('IdentityResolverParser', e));
                  }
                const i = (function (e) {
                  if (f(e) && 'getResponseHeader' in e && g(e.getResponseHeader)) {
                    const t = e.getResponseHeader('expires');
                    if (t) return new Date(t);
                  }
                })(n);
                e(this.enrichExtraIdentifiers(o, t), { expiresAt: i });
              };
            }
            buildUrl(e) {
              return `${this.url}/${this.source}/${this.publisherId}${this.filterParams(e).toQueryString()}`;
            }
            getUrl(e) {
              const t = this.query.copy().addParamsMap(e ?? {});
              return this.buildUrl(t);
            }
            resolve(e, t, r) {
              try {
                const n = this.query.copy().addParamsMap(r ?? {});
                this.calls.ajaxGet(this.buildUrl(n), this.responseReceived(e, n), t, this.timeout);
              } catch (e) {
                (console.error('IdentityResolve', e), t && g(t) && t(e), this.eventBus && this.eventBus.emitError('IdentityResolve', e));
              }
            }
          }
          function Le(e) {
            return new y('number' == typeof e && e >= 0 ? e : 5);
          }
          function De(e) {
            (g(e.emitErrorWithMessage) && g(e.emitError)) ||
              ((e.emitErrorWithMessage = function (t, r, n = {}) {
                const o = v(t, r, n);
                return e.emit(C, o);
              }),
              (e.emitError = function (t, r) {
                return e.emitErrorWithMessage(t, r.message, r);
              }));
          }
          function Ne(e = 5) {
            return Le(e);
          }
          function Me(e) {
            const t = window[e].eventBus || window[F];
            return (De(t), t);
          }
          const Fe = '_li_dcdm_c';
          function Re(e) {
            const t = e.getCookie(Fe);
            if (t) return t;
            const r =
                document.domain ||
                (document.location && document.location.host) ||
                (window && window.location && window.location.host) ||
                'localhost',
              n = r.split('.');
            for (let t = n.length; t > 0; t--) {
              const r = `.${n.slice(t - 1, n.length).join('.')}`;
              if ((e.setCookie(Fe, r, void 0, 'Lax', r), e.getCookie(Fe))) return r;
            }
            return `.${r}`;
          }
          const je = 'cookie',
            Ue = 'none',
            $e = 'disabled',
            _e = (e) => {
              const t = e.privacyMode ? $e : e.storageStrategy || je;
              return { ...e, storageStrategy: t };
            },
            Ve = w(30),
            Pe = 'lidids.',
            Be = (e, t, r) => r.indexOf(e) === t,
            Te = (e) => e && d(e).length > 0;
          function We(e, t) {
            return (r) => {
              function n(e, r) {
                try {
                  return r();
                } catch (r) {
                  return (t.emitErrorWithMessage('DecisionsResolve', e, r), []);
                }
              }
              const o = n('Error while extracting new decision ids', () => {
                  var e, t;
                  return []
                    .concat((r.pageUrl && ((e = r.pageUrl), (t = 'li_did'), te(re(e), t))) || [])
                    .map(d)
                    .filter(Te)
                    .filter(c)
                    .filter(Be);
                }),
                i = n('Error while retrieving stored decision ids', () => e.findSimilarCookies(Pe).map(d).filter(Te).filter(c));
              return (
                o.forEach((n) => {
                  try {
                    (o = n) && e.setCookie(`${Pe}${o}`, o, Ve, 'Lax', r.cookieDomain);
                  } catch (e) {
                    t.emitErrorWithMessage('DecisionsResolve', 'Error while storing new decision id', e);
                  }
                  var o;
                }),
                { ...r, decisionIds: o.concat(i).filter(Be) }
              );
            };
          }
          const qe = '0123456789ABCDEFGHJKMNPQRSTVWXYZ',
            He = Math.pow(2, 48) - 1,
            Qe = (function () {
              const e = 'undefined' != typeof window ? window : null,
                t = e && (e.crypto || e.msCrypto);
              if (t)
                return () => {
                  const e = new Uint8Array(1);
                  return (t.getRandomValues(e), e[0] / 255);
                };
              return () => Math.random();
            })();
          function Ge(e, t) {
            if (e > He)
              throw (function (e) {
                const t = new Error(e);
                return ((t.source = 'Ulid'), t);
              })('cannot encode time greater than ' + He);
            let r,
              n = '';
            for (; t > 0; t--) ((r = e % 32), (n = qe.charAt(r) + n), (e = (e - r) / 32));
            return n;
          }
          function Je() {
            let e = Math.floor(32 * Qe());
            return (32 === e && (e = 31), qe.charAt(e));
          }
          function ze() {
            return (
              Ge(Date.now(), 10) +
              (function (e) {
                let t = '';
                for (; e > 0; e--) t = Je() + t;
                return t;
              })(16)
            );
          }
          const Xe = '_lc2_fpi';
          function Ke(e, t) {
            return (r) => {
              let n;
              const o = e.get(Xe);
              if (o) n = o.data;
              else {
                const o = t.getCookie(Xe);
                if (o) (e.set(Xe, o), (n = o));
                else {
                  const t = `${(function (e, t = 12) {
                    return I(e.replace(/^\./, '')).substring(0, t);
                  })(r.cookieDomain)}--${ze()}`.toLocaleLowerCase();
                  (e.set(Xe, t), (n = e.get(Xe)?.data));
                }
              }
              return (n && t.setDataInLocalStorage(U, n), { ...r, liveConnectId: n, peopleVerifiedId: n });
            };
          }
          function Ye(e) {
            try {
              const t = 1 * e;
              return isNaN(t) ? void 0 : t;
            } catch {}
          }
          function Ze(e) {
            try {
              return u(e) && e.length && e.length > 120 ? `${e.substr(0, 120)}...` : `${e}`;
            } catch {}
          }
          function et(e, t, r) {
            try {
              r.on(C, (n) => {
                const o = me.fromError(
                  e,
                  (function (e) {
                    return p(e)
                      ? {
                          message: Ze(e.message) || '',
                          name: Ze(e.name) || '',
                          stackTrace: Ze(e.stack),
                          lineNumber: Ye(e.lineNumber),
                          columnNumber: Ye(e.columnNumber),
                          fileName: Ze(e.fileName),
                        }
                      : { message: 'Unknown message', name: 'Unknown name' };
                  })(n),
                  r,
                );
                t.sendPixel(o);
              });
            } catch (e) {
              console.error('handlers.error.register', e);
            }
          }
          const tt = () => {};
          class rt {
            obj;
            name;
            errors;
            eventBus;
            constructor(e, t, r) {
              ((this.obj = e), (this.name = t), (this.errors = []), (this.eventBus = r));
            }
            wrap(e) {
              if (f(this.obj)) {
                const t = this.obj[e];
                if (g(t))
                  return (...r) => {
                    try {
                      return t.call(this.obj, ...r);
                    } catch (t) {
                      this.eventBus.emitErrorWithMessage(this.name, `Failed calling ${e}`, t);
                    }
                  };
              }
              return (this.errors.push(e), tt);
            }
            reportErrors() {
              this.errors.length > 0 &&
                this.eventBus.emitErrorWithMessage(this.name, `The functions '${JSON.stringify(this.errors)}' were not provided`);
            }
          }
          const nt = () => {};
          function ot(e, t, r) {
            return h(t, $e) ? nt : e.wrap(r);
          }
          function it(e, t, r) {
            return h(t, Ue) ? nt : ot(e, t, r);
          }
          class st {
            minimalFunctions;
            constructor(e, t) {
              this.minimalFunctions = {
                getCookie: ot(t, e, 'getCookie'),
                getDataFromLocalStorage: ot(t, e, 'getDataFromLocalStorage'),
                localStorageIsEnabled: it(t, e, 'localStorageIsEnabled'),
              };
            }
            static make(e, t, r) {
              const n = new rt(t, 'ReadOnlyStorageHandler', r),
                o = new st(e, n);
              return (n.reportErrors(), o);
            }
            localStorageIsEnabled() {
              return !!this.minimalFunctions.localStorageIsEnabled();
            }
            getCookie(e) {
              return this.minimalFunctions.getCookie(e) || null;
            }
            getDataFromLocalStorage(e) {
              return this.minimalFunctions.getDataFromLocalStorage(e) || null;
            }
          }
          class at extends st {
            storageStrategy;
            functions;
            constructor(e, t) {
              (super(e, t),
                (this.storageStrategy = e),
                (this.functions = {
                  setCookie: it(t, e, 'setCookie'),
                  removeDataFromLocalStorage: it(t, e, 'removeDataFromLocalStorage'),
                  setDataInLocalStorage: it(t, e, 'setDataInLocalStorage'),
                  findSimilarCookies: ot(t, e, 'findSimilarCookies'),
                }));
            }
            static make(e, t, r) {
              const n = new rt(t, 'StorageHandler', r),
                o = new at(e, n);
              return (n.reportErrors(), o);
            }
            setCookie(e, t, r, n, o) {
              this.functions.setCookie(e, t, r, n, o);
            }
            setDataInLocalStorage(e, t) {
              this.functions.setDataInLocalStorage(e, t);
            }
            removeDataFromLocalStorage(e) {
              this.functions.removeDataFromLocalStorage(e);
            }
            findSimilarCookies(e) {
              return this.functions.findSimilarCookies(e) || [];
            }
          }
          class ct extends Error {
            constructor(e) {
              (super(e), (this.name = 'ParseError'));
            }
          }
          class lt {
            handler;
            cookieDomain;
            eventBus;
            constructor(e) {
              ((this.handler = e.storageHandler), (this.cookieDomain = e.cookieDomain), (this.eventBus = e.eventBus));
            }
            deleteCookie(e) {
              this.handler.setCookie(e, '', new Date(0), 'Lax', this.cookieDomain);
            }
            parseMetaRecord(e) {
              const t = JSON.parse(e);
              if (!f(t)) throw new ct('Meta record is not an object');
              let r;
              if ('e' in t && ((r = new Date(t.e)), isNaN(r.getTime()))) throw new ct('Invalid expiresAt');
              if (!('w' in t)) throw new ct('Missing writtenAt');
              const n = new Date(t.w);
              if (isNaN(n.getTime())) throw new ct('Invalid writtenAt');
              return { expiresAt: r, writtenAt: n };
            }
            serializeMetaRecord(e) {
              let t;
              return (e.expiresAt && (t = e.expiresAt.getTime()), JSON.stringify({ w: e.writtenAt.getTime(), e: t }));
            }
            getCookieRecord(e, t) {
              const r = this.handler.getCookie(t);
              if (!r || 0 === r.length) return null;
              let n;
              try {
                n = this.parseMetaRecord(r);
              } catch (r) {
                return (
                  this.eventBus.emitErrorWithMessage('Cache', 'Failed reading meta from cookies', r),
                  this.deleteCookie(e),
                  this.deleteCookie(t),
                  null
                );
              }
              const o = n.expiresAt;
              if (o && o.getTime() <= Date.now()) return null;
              const i = this.handler.getCookie(e);
              return i ? { data: i, meta: n } : null;
            }
            getLSRecord(e, t) {
              const r = this.handler.getDataFromLocalStorage(t);
              if (!r || 0 === r.length) return null;
              let n;
              try {
                n = this.parseMetaRecord(r);
              } catch (r) {
                return (
                  this.eventBus.emitErrorWithMessage('Cache', 'Failed reading meta from ls', r),
                  this.handler.removeDataFromLocalStorage(e),
                  this.handler.removeDataFromLocalStorage(t),
                  null
                );
              }
              const o = n.expiresAt;
              if (o && o.getTime() <= Date.now())
                return (this.handler.removeDataFromLocalStorage(e), this.handler.removeDataFromLocalStorage(t), null);
              const i = this.handler.getDataFromLocalStorage(e);
              return i ? { data: i, meta: n } : null;
            }
            get(e) {
              const t = dt(e),
                r = this.getCookieRecord(e, t),
                n = this.getLSRecord(e, t);
              return r && n
                ? r.meta.writtenAt.getTime() === n.meta.writtenAt.getTime()
                  ? r
                  : r.meta.writtenAt > n.meta.writtenAt
                    ? (this.handler.setDataInLocalStorage(e, r.data),
                      this.handler.setDataInLocalStorage(t, this.serializeMetaRecord(r.meta)),
                      r)
                    : (this.handler.setCookie(e, n.data, n.meta.expiresAt, 'Lax', this.cookieDomain),
                      this.handler.setCookie(t, this.serializeMetaRecord(n.meta), n.meta.expiresAt, 'Lax', this.cookieDomain),
                      n)
                : r
                  ? (this.handler.setDataInLocalStorage(e, r.data),
                    this.handler.setDataInLocalStorage(t, this.serializeMetaRecord(r.meta)),
                    r)
                  : n
                    ? (this.handler.setCookie(e, n.data, n.meta.expiresAt, 'Lax', this.cookieDomain),
                      this.handler.setCookie(t, this.serializeMetaRecord(n.meta), n.meta.expiresAt, 'Lax', this.cookieDomain),
                      n)
                    : null;
            }
            set(e, t, r) {
              const n = dt(e),
                o = this.serializeMetaRecord({ writtenAt: new Date(), expiresAt: r });
              (this.handler.setDataInLocalStorage(e, t), this.handler.setDataInLocalStorage(n, o));
              const i = r || w(730);
              (this.handler.setCookie(e, t, i, 'Lax', this.cookieDomain), this.handler.setCookie(n, o, i, 'Lax', this.cookieDomain));
            }
          }
          function dt(e) {
            return `${e}_meta`;
          }
          const ut = () => {};
          function ht(e, t, r) {
            return t ? ut : e.wrap(r);
          }
          class ft {
            functions;
            constructor(e, t, r) {
              const n = new rt(e, 'CallHandler', t);
              ((this.functions = { ajaxGet: ht(n, r, 'ajaxGet'), pixelGet: ht(n, r, 'pixelGet') }), n.reportErrors());
            }
            ajaxGet(e, t, r, n, o) {
              this.functions.ajaxGet(e, t, r, n, o);
            }
            pixelGet(e, t) {
              this.functions.pixelGet(e, t);
            }
          }
          function pt(e) {
            return (t) =>
              'cookie' === t.idCookie?.strategy && 'string' == typeof t.idCookie?.name
                ? { ...t, resolvedIdCookie: e.getCookie(t.idCookie.name) }
                : 'localStorage' === t.idCookie?.strategy && 'string' == typeof t.idCookie?.name
                  ? { ...t, resolvedIdCookie: e.getDataFromLocalStorage(t.idCookie.name) }
                  : t;
          }
          const gt = {};
          function mt(e, t, r, n) {
            if (e && f(e))
              if ('config' in e)
                n.emitErrorWithMessage(
                  'StrayConfig',
                  'Received a config after LC has already been initialised',
                  new Error(JSON.stringify(e)),
                );
              else {
                const o = me.fromEvent(r, e, n);
                o.getHashedEmail().length > 0 ? (gt.hashedEmail = o.getHashedEmail()) : gt.hashedEmail && o.setHashedEmail(gt.hashedEmail);
                const i = () => n.emit(j, '0'),
                  s = () => n.emit(R, r);
                t.sendAjax(o, { onPreSend: i, onLoad: s });
              }
            else n.emitErrorWithMessage('EventNotAnObject', 'Received event was not an object', new Error(e));
          }
          function wt(e, t, r, n) {
            try {
              const i = {
                  ...xe(e, n),
                  identifiersToResolve: e.identifiersToResolve || [],
                  contextSelectors: e.contextSelectors || '',
                  contextElementsLength: e.contextElementsLength || 0,
                },
                s =
                  ((o = _e(ke(i))),
                  { ...o, pageUrl: ve(), referrer: we(), contextElements: Ce(o.privacyMode, o.contextSelectors, o.contextElementsLength) }),
                a = new ft(r, n, s.privacyMode),
                c = at.make(s.storageStrategy, t, n),
                d = (function (e) {
                  return (t) => ({ ...t, cookieDomain: Re(e) });
                })(c)(s),
                u = new lt({ storageHandler: c, eventBus: n, cookieDomain: d.cookieDomain }),
                h = pt(c)(
                  Ke(
                    u,
                    c,
                  )(
                    We(
                      c,
                      n,
                    )(
                      (function (e, t) {
                        return (r) => {
                          try {
                            return { ...r, ...Se(Ee(r.identifiersToResolve), e) };
                          } catch (e) {
                            return (t.emitError('IdentifiersEnricher', e), { ...r, retrievedIdentifiers: [], hashesFromIdentifiers: [] });
                          }
                        };
                      })(
                        c,
                        n,
                      )(d),
                    ),
                  ),
                ),
                f = new M({ collectorUrl: i.collectorUrl, ajaxTimeout: i.ajaxTimeout, eventBus: n, callHandler: a });
              et(h, f, n);
              const p = new Oe(h, a, n),
                g = (...e) =>
                  (function (e, t, r, n) {
                    try {
                      e.forEach((e) => {
                        const o = e;
                        l(o) ? o.forEach((e) => mt(e, t, r, n)) : mt(o, t, r, n);
                      });
                    } catch (e) {
                      (console.error('Error sending events', e), n.emitErrorWithMessage('LCPush', 'Failed sending an event', e));
                    }
                  })(e, f, h, n);
              return {
                push: g,
                fire: () => g({}),
                peopleVerifiedId: h.peopleVerifiedId,
                ready: !0,
                resolve: p.resolve.bind(p),
                resolutionCallUrl: p.getUrl.bind(p),
                config: i,
                eventBus: n,
                storageHandler: c,
                cache: u,
              };
            } catch (e) {
              (console.error(e), n.emitErrorWithMessage('LCConstruction', 'Failed to build LC', e));
            }
            var o;
          }
          function vt(e, t, r, n) {
            const o = window[e.globalVarName] || [],
              i =
                (function (e) {
                  try {
                    if (window && window[e.globalVarName] && window[e.globalVarName].ready) {
                      const t =
                        window[e.globalVarName].config &&
                        (function (e, t) {
                          if (e.appId !== t.appId || e.wrapperName !== t.wrapperName || e.collectorUrl !== t.collectorUrl)
                            return {
                              appId: [e.appId, t.appId],
                              wrapperName: [e.wrapperName, t.wrapperName],
                              collectorUrl: [e.collectorUrl, t.collectorUrl],
                            };
                        })(window[e.globalVarName].config, e);
                      if (t) {
                        const r = new Error();
                        ((r.name = 'ConfigSent'), (r.message = 'Additional configuration received'));
                        const n = Me(e.globalVarName);
                        ((window[e.globalVarName].eventBus = n), n.emitErrorWithMessage('LCDuplication', JSON.stringify(t), r));
                      }
                      return window[e.globalVarName];
                    }
                  } catch (e) {
                    console.error('Could not initialize error bus');
                  }
                })(e) ||
                wt(e, t, r, n) ||
                o;
            if (l(o)) for (let e = 0; e < o.length; e++) i.push(o[e]);
            return (
              (window[i.config.globalVarName] = i),
              (window.liQ_instances = window.liQ_instances || []),
              0 === window.liQ_instances.filter((e) => e.config.globalVarName === i.config.globalVarName).length &&
                window.liQ_instances.push(i),
              i
            );
          }
          function Ct(e, t, r, n) {
            const o = (f(e) && e) || {},
              i = n || Ne();
            let s;
            try {
              s = o.globalVarName
                ? vt(o, t, r, i)
                : (function (e, t, r, n) {
                    const o = wt(e, t, r, n);
                    return ((window.liQ_instances = window.liQ_instances || []), window.liQ_instances.push(o), o);
                  })(o, t, r, i);
            } catch (e) {
              (console.error(e), i.emitErrorWithMessage('LCConstruction', 'Failed to build LC', e));
            }
            return s;
          }
          function yt(e, t) {
            const r = l(e) ? e : s(e).split(','),
              n = [];
            for (let e = 0; e < r.length; e++) {
              const o = d(r[e]),
                i = t.getCookie(o) || t.getDataFromLocalStorage(o);
              !i || X(s(i)) || z(s(i)) || n.push({ name: o, value: s(i) });
            }
            return n;
          }
          function bt(e, t, r, n, o) {
            try {
              const i = { ...xe(e, n), identifiersToResolve: e.identifiersToResolve || [] },
                s = _e(ke(i)),
                a = st.make(s.storageStrategy, t, n),
                c = new ft(r, n, s.privacyMode),
                l = (function (e, t) {
                  return (r) => {
                    try {
                      return { ...r, retrievedIdentifiers: yt(r.identifiersToResolve, e) };
                    } catch (e) {
                      return (t.emitError('IdentifiersEnrich', e), { ...r, retrievedIdentifiers: [] });
                    }
                  };
                })(
                  a,
                  n,
                )(
                  pt(a)(
                    (function (e, t) {
                      return (r) => {
                        try {
                          return { ...r, peopleVerifiedId: r.peopleVerifiedId || e.getDataFromLocalStorage(U) || void 0 };
                        } catch (e) {
                          return (t.emitError('PeopleVerifiedEnrich', e), r);
                        }
                      };
                    })(
                      a,
                      n,
                    )(s),
                  ),
                ),
                d = new Oe(l, c, n);
              return {
                push: (e) => o(e),
                fire: () => o({}),
                peopleVerifiedId: l.peopleVerifiedId,
                ready: !0,
                resolve: d.resolve.bind(d),
                resolutionCallUrl: d.getUrl.bind(d),
                config: i,
                eventBus: n,
                storageHandler: a,
              };
            } catch (e) {
              console.error(e);
            }
          }
          function Et(e, t, r, n) {
            const o = (f(e) && e) || {},
              i = n || Ne();
            try {
              return o.globalVarName
                ? (function (e, t, r, n) {
                    const o = (window[e.globalVarName] = window[e.globalVarName] || []),
                      i = bt(e, t, r, n, o.push.bind(o));
                    return (
                      (window.liQ_instances = window.liQ_instances || []),
                      0 === window.liQ_instances.filter((e) => e.config.globalVarName === i.config.globalVarName).length &&
                        window.liQ_instances.push(i),
                      i
                    );
                  })(o, t, r, i)
                : (function (e, t, r, n) {
                    const o = bt(e, t, r, n, () => {});
                    return ((window.liQ_instances = window.liQ_instances || []), window.liQ_instances.push(o), o);
                  })(o, t, r, i);
            } catch (e) {
              console.error(e);
            }
            return {};
          }
          const St = function (e, t, r, n, o) {
            const i = 'minimal' === n,
              s = o || Ne();
            return (i ? Et : Ct)((f(e) && e) || {}, t, r, s);
          };
        },
        4463(e, t, r) {
          var n = r(1068),
            o = r(1129);
          r(1515);
          ((0, o.E)('liveIntentIdSystem'),
            Object.assign(n.W1, { 148: { purposes: [1, 2, 7], legIntPurposes: [], flexiblePurposes: [], specialFeatures: [] } }));
        },
      },
      (e) => {
        e.O(0, [802, 7769, 5590, 1085, 7045, 4950, 5024], () => {
          return ((t = 4463), e((e.s = t)));
          var t;
        });
        e.O();
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [4426],
      {
        1048(e, t, o) {
          var r = o(1068),
            i = o(1129),
            a = o(7413),
            n = o(3350),
            s = o(8964),
            c = o(1785),
            d = o(2354),
            l = o(7449);
          const p = s.RD.withCallers([['userId', 'lotamePanoramaId']]),
            m = 'panoramaId',
            u = `${m}_expiry`,
            g = '_cc_id',
            f = 'lotamePanoramaId',
            y = !1,
            v = (0, d.vM)({ moduleType: l.fW, moduleName: f });
          let _;
          const x = { type: 'cookie&html5', name: 'panoramaId' };
          function h(e, t) {
            let o = null;
            return (E(t, y) && (o = v.getCookie(e, void 0)), null === o && O(t, y) && (o = v.getDataFromLocalStorage(e, void 0)), o);
          }
          function I(e, t, o, r = (0, a.timestamp)() + 6048e5) {
            if (e && t) {
              const i = new Date(r).toUTCString();
              (E(o) && v.setCookie(e, t, i, 'Lax', _, void 0), O(o) && v.setDataInLocalStorage(e, t, void 0));
            }
          }
          function C(e, t) {
            if (e) {
              if (E(t, y)) {
                const t = new Date(0).toUTCString();
                v.setCookie(e, '', t, 'Lax', _, void 0);
              }
              O(t, y) && v.removeDataFromLocalStorage(e, void 0);
            }
          }
          function E(e, t = !0) {
            return t ? v.cookiesAreEnabled() && e.type.includes('cookie') : v.cookiesAreEnabled();
          }
          function O(e, t = !0) {
            return t ? v.hasLocalStorage() && e.type.includes('html5') : v.hasLocalStorage();
          }
          const S = {
            name: f,
            gvlid: 95,
            decode: (e, t) => ((0, n.O8)(e) ? { lotamePanoramaId: e } : void 0),
            getId(e, t, o) {
              if (
                (function (e) {
                  let t = null;
                  if (void 0 !== e?.storage) {
                    const o = 'Lotame ID module',
                      r = ['cookie', 'html5', 'cookie&html5'];
                    void 0 !== e.storage.name && e.storage.name !== m
                      ? ((0, a.logError)(`Misconfigured ${o}, "storage.name" is expected to be "${m}", actual is "${e.storage.name}"`),
                        (t = !0))
                      : 'undefined' === e.storage.type ||
                        r.includes(e.storage.type) ||
                        (0, a.logError)(
                          `Misconfigured ${o}, "storage.type" is expected to be one of "${r.join(', ')}", actual is "${e.storage.type}"`,
                        );
                  }
                  return t;
                })((e = e || {}))
              )
                return;
              _ = S.findRootDomain();
              const r = ((e && e.params) || {}).clientId,
                i = !(0, a.isEmpty)(r),
                s = { ...x, ...e.storage },
                c = (function (e, t) {
                  const o = { data: h(m, t), expiryTimestampMs: 0, clientExpiryTimestampMs: 0 };
                  try {
                    if (e) {
                      const r = h(`${u}_${e}`, t);
                      (0, n.O8)(r) && (o.clientExpiryTimestampMs = parseInt(r, 10));
                    }
                    const r = h(u, t);
                    (0, n.O8)(r) && (o.expiryTimestampMs = parseInt(r, 10));
                  } catch (e) {
                    (0, a.logError)(e);
                  }
                  return o;
                })(r, s),
                d = Date.now() > c.expiryTimestampMs;
              if (i) {
                if (Date.now() < c.clientExpiryTimestampMs) return { id: void 0, reason: 'NO_CLIENT_CONSENT' };
              }
              if (!d) return { id: c.data };
              const l = (function (e) {
                let t;
                return (E(e, y) && (t = v.getCookie(g, void 0)), !t && O(e, y) && (t = v.getDataFromLocalStorage(g, void 0)), t);
              })(s);
              return {
                callback: function (e) {
                  const o = {};
                  let c;
                  (l && (o.fp = l),
                    t && ((0, n.Lm)(t.gdpr?.gdprApplies) && (o.gdpr_applies = t.gdpr.gdprApplies), (c = t.gdpr?.consentString)),
                    c && (o.gdpr_consent = c),
                    i && (o.c = r));
                  const d = (0, a.buildUrl)({
                    protocol: 'https',
                    host:
                      navigator.userAgent && -1 !== navigator.userAgent.indexOf('Safari') && -1 === navigator.userAgent.indexOf('Chrome')
                        ? 'c.ltmsphrcl.net'
                        : 'id.crwdcntrl.net',
                    pathname: '/id',
                    search: (0, a.isEmpty)(o) ? void 0 : o,
                  });
                  p(
                    d,
                    (t) => {
                      let o;
                      if (t)
                        try {
                          const c = JSON.parse(t),
                            d = !((0, n.cy)(c.errors) && -1 !== c.errors.indexOf(111));
                          if (i)
                            if (d) C(`${u}_${r}`, s);
                            else if ((0, n.O8)(c.no_consent) && 'CLIENT' === c.no_consent)
                              return (I(`${u}_${r}`, c.expiry_ts, s, c.expiry_ts), void e());
                          (I(u, c.expiry_ts, s, c.expiry_ts),
                            (0, n.O8)(c.profile_id)
                              ? (d &&
                                  (function (e, t) {
                                    if (E(t)) {
                                      const t = new Date((0, a.timestamp)() + 23328e6).toUTCString();
                                      v.setCookie(g, e, t, 'Lax', _, void 0);
                                    }
                                    O(t) && v.setDataInLocalStorage(g, e, void 0);
                                  })(c.profile_id, s),
                                (0, n.O8)(c.core_id) ? (I(m, c.core_id, s, c.expiry_ts), (o = c.core_id)) : C(m, s))
                              : (d && C(g, s), C(m, s)));
                        } catch (e) {
                          (0, a.logError)(e);
                        }
                      e(o);
                    },
                    void 0,
                    { method: 'GET', withCredentials: !0 },
                  );
                },
              };
            },
            eids: { lotamePanoramaId: { source: 'crwdcntrl.net', atype: 1 } },
          };
          ((0, c.bz)('userId', S),
            (0, i.E)('lotamePanoramaIdSystem'),
            Object.assign(r.W1, {
              95: { purposes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], legIntPurposes: [], flexiblePurposes: [], specialFeatures: [] },
            }));
        },
      },
      (e) => {
        e.O(0, [802, 7769, 5590, 1085], () => {
          return ((t = 1048), e((e.s = t)));
          var t;
        });
        e.O();
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [9600],
      {
        1806(t, e, n) {
          var o = n(1068),
            i = n(1129),
            r = n(7413),
            s = n(8928),
            a = n(3435),
            d = n(3350),
            c = n(2682),
            u = n(8384),
            p = n(1779),
            l = n(6901),
            m = n(5657),
            f = n(828),
            b = n(5720),
            g = n(6471),
            y = n(7172),
            h = n(7559),
            x = n(2542),
            w = n(4338),
            v = n(5262);
          const _ = h.AS,
            I = 'trustedstack',
            E = 'https://prebid.media.net/video/bundle.js',
            A = 0,
            O = 1,
            S = 2,
            C = 'client_timeout',
            T = 'client_bid_won',
            P = 'client_set_targeting',
            U = 'client_bidder_error';
          let $, W;
          ((window.mnet = window.mnet || {}), (window.mnet.queue = window.mnet.queue || []));
          const j = [{ code: I, gvlid: 1288 }];
          function R(t, e) {
            const n = e.refererInfo,
              o = {
                domain: (t = t || {}).domain || n.domain,
                page: t.page || n.page,
                ref: (0, g.B8)(t.ref),
                topMostLocation: n.topmostLocation,
                isTop: t.isTop || n.reachedTop,
              };
            return (
              $ ||
                ($ = (function () {
                  if ($) return $;
                  const t = (function (t, e) {
                    const n = (function (t, e) {
                      try {
                        const n = (0, r.getWindowTop)().document.querySelector(t);
                        if (null !== n && n[e]) return n[e];
                      } catch (t) {}
                    })(t, e);
                    return (
                      n &&
                      (function (t) {
                        const e = (0, r.getWindowTop)().document.createElement('a');
                        return ((e.href = t), e.href);
                      })(n)
                    );
                  })('link[rel="canonical"]', 'href');
                  return (($ = Object.assign({}, t && { canonical_url: t })), $);
                })()),
              Object.assign(o, $)
            );
          }
          function M(t) {
            return { w: parseInt(t[0], 10), h: parseInt(t[1], 10) };
          }
          function k(t, e) {
            const n = (0, s.A)(t, 'params'),
              o = (0, s.A)(e, 'gdprConsent'),
              a = (0, s.A)(e, 'uspConsent'),
              d = (0, s.A)(t, 'userId'),
              c = (0, s.A)(t, 'ortb2.source.ext.schain') || {},
              p = N.getWindowSize(),
              l = !(!o || !o.gdprApplies),
              m = !!a,
              f = !!u.$W.getConfig('coppa'),
              { top: g = -1, right: y = -1, bottom: h = -1, left: x = -1 } = (0, b.g)();
            return Object.assign(
              {},
              { customer_id: n.cid },
              { prebid_version: 'v11.23.0' },
              { gdpr_applies: l },
              l && { gdpr_consent_string: o.consentString || '' },
              { usp_applies: m },
              m && { usp_consent_string: a || '' },
              { coppa_applies: f },
              -1 !== p.w && -1 !== p.h && { screen: p },
              d && { user_id: d },
              (0, i.m)().medianetGlobals.analyticsEnabled && { analytics: !0 },
              !(0, r.isEmpty)(c) && { schain: c },
              { vcoords: { top_left: { x, y: g }, bottom_right: { x: y, y: h } } },
            );
          }
          function q(t, e) {
            const n = (0, f.p)(t.adUnitCode),
              o = {
                id: t.bidId,
                transactionId: t.ortb2Imp?.ext?.tid,
                ext: {
                  dfp_id: t.adUnitCode,
                  display_count: t.auctionsCount,
                  adUnitCode: t.adUnitCode,
                  divId: n.divId,
                  adUnitPath: n.gptSlot,
                },
                all: t.params,
              };
            t.ortb2Imp && (o.ortb2Imp = t.ortb2Imp);
            const i = (0, s.A)(t, 'mediaTypes.banner.sizes') || [],
              a = (0, s.A)(t, 'mediaTypes.video') || {},
              c = (0, s.A)(t, 'params.video') || {},
              u = Object.assign({}, c, a);
            var l;
            if (
              ((0, r.isEmpty)(u) || (o.video = u),
              i.length > 0 && (o.banner = ((l = i), (0, d.cy)(l) && 2 === l.length && !(0, d.cy)(l[0]) ? [M(l)] : l.map((t) => M(t)))),
              t.nativeParams)
            )
              try {
                o.native = JSON.stringify(t.nativeParams);
              } catch (t) {
                (0, r.logError)(`${_} : Incorrect JSON : bidRequest.nativeParams`);
              }
            t.params.crid && (o.tagid = t.params.crid.toString());
            const m = parseFloat(t.params.bidfloor || t.params.bidFloor);
            m && (o.bidfloor = m);
            const b = (function (t) {
              let e = (0, v.o)(t);
              if (!e && -1 !== t.adUnitCode.indexOf('/')) {
                const { divId: n } = (0, f.p)(t.adUnitCode);
                (0, d.O8)(n) && (e = document.getElementById(n));
              }
              if (e) {
                const t = (0, x.G)(e),
                  n = {};
                return ((n.top_left = { y: t.top, x: t.left }), (n.bottom_right = { y: t.bottom, x: t.right }), n);
              }
              return null;
            })(t);
            if (b && o.banner && 0 !== o.banner.length) {
              const t = (function (t) {
                const { scrollX: e, scrollY: n } = window;
                return {
                  top_left: { x: t.top_left.x + e, y: t.top_left.y + n },
                  bottom_right: { x: t.bottom_right.x + e, y: t.bottom_right.y + n },
                };
              })(b);
              ((o.ext.coordinates = t),
                (o.ext.viewability = G(b.top_left, (0, w.M$)(o.banner))),
                G(t.top_left, (0, w.M$)(o.banner)) > 0.5 ? (o.ext.visibility = O) : (o.ext.visibility = S));
            } else o.ext.visibility = A;
            const g = (function (t) {
              const e = [];
              'function' == typeof t.getFloor &&
                [p.D4, p.G_, p.s6].forEach((n) => {
                  t.mediaTypes.hasOwnProperty(n) &&
                    (n === p.D4
                      ? t.mediaTypes.banner.sizes.forEach((o) => {
                          F(t, n, o, e);
                        })
                      : F(t, n, '*', e));
                });
              return e;
            })(t);
            return (g && g.length > 0 && (o.bidfloors = g), o);
          }
          function F(t, e, n, o) {
            const i = t.getFloor({ currency: 'USD', mediaType: e, size: n }) || {};
            (n.length > 1 && (i.size = n), (i.mediaType = e), o.push(i));
          }
          function G(t, e) {
            const n = e.w * e.h,
              o = N.getWindowSize(),
              i = { x: t.x + e.w, y: t.y + e.h };
            return 0 === n || -1 === o.w || -1 === o.h
              ? 0
              : (function (t, e, n, o) {
                  if (t.x > o.x || e.x < n.x || t.y > o.y || e.y < n.y) return 0;
                  return (Math.min(e.x, o.x) - Math.max(t.x, n.x)) * (Math.min(e.y, o.y) - Math.max(t.y, n.y));
                })(t, i, { x: 0, y: 0 }, { x: o.w, y: o.h }) / n;
          }
          function z(t, e) {
            const n = (0, d.Go)(t),
              o = (0, s.A)(e, '0.userIdAsEids');
            return (o && (0, a.J)(n, 'user.ext.eids', o), n);
          }
          function B(t) {
            const e = {};
            return (
              (0, d.cy)(t) || (t = []),
              t.forEach((t) => {
                const n = (function (t) {
                  const e = {};
                  ((e.acid = t.auctionId || ''),
                    (e.crid = (0, s.A)(t, 'params.crid') || (0, s.A)(t, 'params.0.crid') || t.adUnitCode || ''),
                    (e.ext = (0, r.safeJSONEncode)(t.ext) || ''));
                  const n = (0, d.Go)(t);
                  return (delete n.ad, delete n.vastXml, (e.rawobj = (0, r.safeJSONEncode)(n)), e);
                })(t);
                Object.keys(n).forEach((t) => {
                  ((e[t] = e[t] || []), e[t].push(encodeURIComponent(n[t])));
                });
              }),
              e
            );
          }
          function D(t, e) {
            const n = B(e);
            ((t.cid = W), (0, y.Fk)(t, n, !1).send());
          }
          function J(t) {
            const e = (0, s.A)(t, 'context') || '',
              n = (0, s.A)(t, 'vto');
            'outstream' === e &&
              n &&
              (t.renderer = (function () {
                const t = l.A4.install({ url: E });
                return (
                  t.setRender(function (t) {
                    window.mnet.queue.push(function () {
                      const e = {
                          width: t.width,
                          height: t.height,
                          vastTimeout: t.vto,
                          maxAllowedVastTagRedirects: t.mavtr,
                          allowVpaid: t.avp,
                          autoPlay: t.ap,
                          preload: t.pl,
                          mute: t.mt,
                        },
                        n = t.dfp_id,
                        o = (0, f.p)(n).divId || n;
                      window.mnet.mediaNetoutstreamPlayer(t, o, e);
                    });
                  }),
                  t
                );
              })());
          }
          (0, i.m)().medianetGlobals = (0, i.m)().medianetGlobals || {};
          const N = {
            code: _,
            gvlid: h.P6,
            aliases: j,
            supportedMediaTypes: [p.D4, p.s6, p.G_],
            isBidRequestValid: function (t) {
              return t.params
                ? t.params.cid && (0, d.O8)(t.params.cid) && !(0, r.isEmptyStr)(t.params.cid)
                  ? ((W = t.params.cid), !0)
                  : ((0, r.logError)(`${_} : cid should be a string`), !1)
                : ((0, r.logError)(`${_} : Missing bid parameters`), !1);
            },
            buildRequests: function (t, e) {
              const n = (function (t, e) {
                return {
                  site: R(t[0].params.site, e),
                  ext: k(t[0], e),
                  id: t[0].auctionId,
                  imp: t.map((t) => q(t)),
                  ortb2: z(e.ortb2, t),
                  tmax: e.timeout,
                };
              })((t = (0, m.Xj)(t)), e);
              return {
                method: 'POST',
                url:
                  ((o = e.bidderCode),
                  (i = n.ext.customer_id),
                  (o === I ? 'https://prebid.trustedstack.com/rtb/trustedstack' : '../../prebid.media.net/rtb/prebid__qcid_8CUYL2RS') +
                    '?cid=' +
                    encodeURIComponent(i)),
                data: JSON.stringify(n),
              };
              var o, i;
            },
            interpretResponse: function (t, e) {
              let n = [];
              if (!t || !t.body) return ((0, r.logInfo)(`${_} : response is empty`), n);
              const o = t.body.bidList;
              return (
                (0, d.cy)(o) && 0 !== o.length
                  ? ((n = o.filter((t) =>
                      (function (t) {
                        return !1 === t.no_bid && parseFloat(t.cpm) > 0;
                      })(t),
                    )),
                    n.forEach(J))
                  : (0, r.logInfo)(`${_} : no bids`),
                n
              );
            },
            getUserSyncs: function (t, e) {
              const n =
                ((o = e), !(0, r.isEmpty)(o) && o[0].body && o[0].body.ext && (0, d.cy)(o[0].body.ext.csUrl) ? o[0].body.ext.csUrl : []);
              var o;
              return t.iframeEnabled ? (0, g.RW)(n, { type: 'iframe' }) : t.pixelEnabled ? (0, g.RW)(n, { type: 'image' }) : void 0;
            },
            onTimeout: (t) => {
              try {
                D({ name: C, value: t.length, relatedData: t[0].timeout || u.$W.getConfig('bidderTimeout') }, t);
              } catch (t) {}
            },
            onBidWon: (t) => {
              try {
                D({ name: T, value: t.cpm }, [t]);
              } catch (t) {}
            },
            onSetTargeting: (t) => {
              try {
                const e = { name: P, value: t.cpm };
                u.$W.getConfig('enableSendAllBids') || D(e, [t]);
              } catch (t) {}
            },
            onBidderError: ({ error: t, bidderRequest: e }) => {
              try {
                D({ name: U, relatedData: `timedOut:${t.timedOut}|status:${t.status}|message:${t.reason.message}` }, e.bids);
              } catch (t) {}
            },
            clearPageMeta: function () {
              $ = void 0;
            },
            getWindowSize: function () {
              return { w: window.screen.width || -1, h: window.screen.height || -1 };
            },
          };
          ((0, c.a$)(N),
            (0, i.E)('medianetBidAdapter'),
            Object.assign(o.W1, {
              142: { purposes: [1, 3, 4], legIntPurposes: [2, 7, 9, 10], flexiblePurposes: [2, 7, 9, 10], specialFeatures: [] },
              1288: { purposes: [1, 4], legIntPurposes: [2, 7], flexiblePurposes: [2, 7], specialFeatures: [] },
            }));
        },
      },
      (t) => {
        t.O(0, [802, 7769, 5590, 1085, 3005, 2316, 1961, 8139], () => {
          return ((e = 1806), t((t.s = e)));
          var e;
        });
        t.O();
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [6775],
      {
        4739(e, r, t) {
          var n = t(1068),
            s = t(1129),
            d = t(6271),
            i = t(2682),
            o = t(1779),
            a = t(6901),
            p = t(2354),
            c = t(5877),
            l = t(7413),
            u = t(8928),
            m = t(3435),
            _ = t(3350),
            f = t(5262);
          const b = 'msft',
            g = ['enabled', 'dongle', 'member_id', 'debug_timeout'],
            v = {
              apn_debug_enabled: 'enabled',
              apn_debug_dongle: 'dongle',
              apn_debug_member_id: 'member_id',
              apn_debug_timeout: 'debug_timeout',
            },
            y = '../../ib.adnxs.com/openrtb2/prebidjs',
            h = 'https://ib.adnxs-simple.com/openrtb2/prebidjs',
            x = { 0: o.D4, 1: o.G_, 3: o.s6 },
            R = (0, p.vM)({ bidderCode: b }),
            C = (0, d.A)({
              context: { netRevenue: !0, ttl: 300 },
              imp(e, r, t) {
                const n = {},
                  s = r.params,
                  d = e(r, t);
                if (d.banner && !d.banner.w && !d.banner.h) {
                  const e = (0, u.A)(d, 'banner.format.0');
                  e && (0, _.Et)(e.w) && (0, _.Et)(e.h) && ((d.banner.w = e.w), (d.banner.h = e.h));
                }
                if (d?.banner && !d.banner.api) {
                  const e = s.banner_frameworks;
                  (0, _.Uu)(e) && (d.banner.api = e);
                }
                if ((d?.video && 'instream' === (0, u.A)(r, 'mediaTypes.video.context') && (n.require_asset_url = !0), s)) {
                  s.placement_id ? (n.placement_id = s.placement_id) : s.inv_code && (0, m.J)(d, 'tagid', s.inv_code);
                  const e = {
                    allow_smaller_sizes: 'boolean',
                    use_pmt_rule: 'boolean',
                    keywords: 'string',
                    traffic_source_code: 'string',
                    pubclick: 'string',
                    ext_inv_code: 'string',
                    ext_imp_id: 'string',
                  };
                  Object.entries(e).forEach(([e, t]) => {
                    if (
                      (function (e, r, t) {
                        const n = e?.params?.[r];
                        if (null != n && '' !== n) {
                          return (
                            typeof n === t ||
                            ((0, l.logWarn)(`Removing invalid bid.param ${r} for adUnitCode ${e.adUnitCode}, expected ${t}`), !1)
                          );
                        }
                        return !1;
                      })(r, e, t)
                    ) {
                      if ('ext_imp_id' === e) return void (d.id = s.ext_imp_id);
                      n[e] = s[e];
                    }
                  });
                }
                const i = (0, l.getParameterByName)('ast_override_div');
                if (O(i)) {
                  const e = decodeURIComponent(i)
                    .split(',')
                    .find((e) => e.startsWith(`${r.adUnitCode}:`));
                  if (e) {
                    const r = e.split(':')[1];
                    r && (n.force_creative_id = parseInt(r, 10));
                  }
                }
                return (Object.keys(n).length > 0 && (0, m.J)(d, 'ext.appnexus', n), d);
              },
              request(e, r, t, n) {
                const s = e(r, t, n);
                s?.user?.ext?.eids?.length > 0 &&
                  s.user.ext.eids.forEach((e) => {
                    'adserver.org' === e.source ? (e.rti_partner = 'TDID') : 'uidapi.com' === e.source && (e.rti_partner = 'UID2');
                  });
                const d = { prebid: !0, hb_source: 1, sdk: { version: '11.23.0', source: 'pbjs' } };
                if (t?.refererInfo) {
                  const e = {
                      rd_ref: encodeURIComponent(t.refererInfo.topmostLocation),
                      rd_top: t.refererInfo.reachedTop,
                      rd_ifs: t.refererInfo.numIframes,
                      rd_stk: t.refererInfo.stack?.map((e) => encodeURIComponent(e)).join(','),
                    },
                    r = t.refererInfo.canonicalUrl;
                  (O(r) && (e.rd_can = r), (d.referrer_detection = e));
                }
                return ((0, m.J)(s, 'ext.appnexus', d), s);
              },
              bidResponse(e, r, t) {
                const { bidRequest: n } = t;
                let s;
                const d = r?.ext?.appnexus?.bid_ad_type,
                  i = (0, u.A)(r, 'ext.appnexus');
                (0, _.Et)(d) && x.hasOwnProperty(d) && (t.mediaType = s = x[d]);
                const p = e(r, t);
                if ((i.advertiser_id && (p.meta = Object.assign({}, p.meta, { advertiser_id: i.advertiser_id })), s === o.s6))
                  try {
                    const e = r.adm ? JSON.parse(r.adm) : {};
                    e?.eventtrackers &&
                      (0, _.cy)(e.eventtrackers) &&
                      e.eventtrackers.forEach((e) => {
                        if (e.url.includes('dom_id=%native_dom_id%')) {
                          const r = 'pbjs_adid=' + p.adId + ';pbjs_auc=' + n.adUnitCode;
                          e.url = e.url.replace('dom_id=%native_dom_id%', r);
                        }
                      });
                  } catch (e) {
                    (0, l.logError)('MSFT Native adm parse error', e);
                  }
                if (s === o.G_)
                  if (i?.renderer_url && i?.renderer_id) {
                    const e = n?.adUnitCode;
                    if (O(e)) {
                      let t = (0, u.A)(n, 'mediaTypes.video.renderer.options');
                      (t || (t = (0, u.A)(n, 'renderer.options')),
                        p.adResponse ||
                          (p.adResponse = {
                            ad: { notify_url: r.nurl || '', renderer_config: i.renderer_config || '' },
                            auction_id: i.auction_id,
                            content: p.vastXml,
                            tag_id: i.tag_id,
                          }),
                        (p.renderer = (function (e, r, t = {}) {
                          const n = a.A4.install({ id: r.renderer_id, url: r.renderer_url, config: t, loaded: !1, adUnitCode: e });
                          try {
                            n.setRender(E);
                          } catch (e) {
                            (0, l.logWarn)('Prebid Error calling setRender on renderer', e);
                          }
                          return (
                            n.setEventHandlers({
                              impression: () => (0, l.logMessage)('AppNexus outstream video impression event'),
                              loaded: () => (0, l.logMessage)('AppNexus outstream video loaded event'),
                              ended: () => {
                                ((0, l.logMessage)('AppNexus outstream renderer video event'),
                                  (document.querySelector(`#${e}`).style.display = 'none'));
                              },
                            }),
                            n
                          );
                        })(e, { renderer_url: i.renderer_url, renderer_id: i.renderer_id }, t)));
                    }
                  } else r.nurl && i?.asset_url && (p.vastUrl = r.nurl + '&redir=' + encodeURIComponent(i.asset_url));
                return p;
              },
            }),
            k = {
              code: b,
              gvlid: 32,
              aliases: [
                { code: 'oftmedia', gvlid: 32 },
                { code: 'msftstaila', gvlid: 32 },
              ],
              supportedMediaTypes: [o.D4, o.s6, o.G_],
              isBidRequestValid: (e) => {
                const r = e.params;
                return !!('number' == typeof r.placement_id || ('number' == typeof r.member && O(r?.inv_code)));
              },
              buildRequests(e, r) {
                const t = C.toORTB({ bidRequests: e, bidderRequest: r });
                return (
                  (e || []).find(U) && (0, l.mergeDeep)(t, { source: { ext: { omidpn: 'AppNexus', omidpv: '11.23.0' } } }, t),
                  (0, l.logMessage)('MSFT openRTB request', t),
                  (function (e, r) {
                    let t = [];
                    const n = { withCredentials: !0 };
                    let s = y;
                    (0, c.C)(r.gdprConsent) || (s = h);
                    let d = {};
                    const i = 'apn_prebid_debug',
                      o = R.getCookie(i) || null;
                    if (o)
                      try {
                        d = JSON.parse(o);
                      } catch (e) {
                        (0, l.logError)('MSFT Debug Auction Cookie Error:\n\n' + e);
                      }
                    else
                      (Object.keys(v).forEach((e) => {
                        const r = (0, l.getParameterByName)(e);
                        (0, _.O8)(r) && '' !== r && (d[v[e]] = r);
                      }),
                        Object.keys(d).length > 0 && !d.hasOwnProperty('enabled') && (d.enabled = !0));
                    d?.enabled &&
                      (s +=
                        '?' +
                        Object.keys(d)
                          .filter((e) => g.includes(e))
                          .map((e) => ('enabled' === e ? `debug=${d[e]}` : `${e}=${d[e]}`))
                          .join('&'));
                    const a = (r?.bids || []).find((e) => e.params && e.params.member && (0, _.Et)(e.params.member));
                    a && (s += (-1 === s.indexOf('?') ? '?' : '&') + 'member_id=' + a.params.member);
                    'TRUE' === (0, l.getParameterByName)('apn_test').toUpperCase() && (n.customHeaders = { 'X-Is-Test': 1 });
                    return (t.push({ method: 'POST', url: s, data: e, bidderRequest: r, options: n }), t);
                  })(t, r)
                );
              },
              interpretResponse: (e, r) => C.fromORTB({ response: e.body, request: r.data }).bids,
              getUserSyncs: function (e, r, t, n, s) {
                if (e.iframeEnabled && (0, c.C)(t)) return [{ type: 'iframe', url: 'https://acdn.adnxs.com/dmp/async_usersync.html' }];
                if (e.pixelEnabled) {
                  return ['../../ib.adnxs.com/bounce__q_2Fsetuid_3F'].map((e) => ({ type: 'image', url: e }));
                }
              },
            };
          function O(e) {
            return (0, _.O8)(e) && '' !== e;
          }
          function I(e, r, t) {
            e.renderer.handleVideoEvent({ id: r, eventName: t });
          }
          function E(e, r) {
            const t = (0, f.o)(e);
            (!(function (e) {
              try {
                const r = e.querySelectorAll("div[id^='google_ads']");
                r[0] && r[0].style.setProperty('display', 'none');
              } catch (e) {}
            })(t),
              (function (e) {
                try {
                  const r = e.querySelectorAll("script[id^='sas_script']");
                  'iframe' === r[0]?.nextSibling?.localName && r[0].nextSibling.style.setProperty('display', 'none');
                } catch (e) {}
              })(t),
              e.renderer.push(() => {
                (r?.defaultView || window).ANOutstreamVideo.renderAd(
                  {
                    tagId: e.adResponse.tag_id,
                    sizes: [e.getSize().split('x')],
                    targetId: e.adUnitCode,
                    uuid: e.requestId,
                    adResponse: e.adResponse,
                    rendererOptions: e.renderer.getConfig(),
                  },
                  I.bind(null, e),
                );
              }));
          }
          function U(e) {
            let r = !1;
            const t = e?.params,
              n = e?.mediaTypes?.video?.api;
            return (
              t?.frameworks && (0, _.cy)(t.frameworks) && (r = e.params.frameworks.includes(6)),
              !r && (0, _.cy)(n) && n.length > 0 && (r = n.includes(7)),
              r
            );
          }
          ((0, i.a$)(k),
            (0, s.E)('msftBidAdapter'),
            Object.assign(n.W1, {
              32: { purposes: [1, 3, 4], legIntPurposes: [2, 7, 10], flexiblePurposes: [2, 7, 10], specialFeatures: [1] },
            }));
        },
      },
      (e) => {
        e.O(0, [802, 7769, 5590, 1085, 8498], () => {
          return ((r = 4739), e((e.s = r)));
          var r;
        });
        e.O();
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [5767],
      {
        9757(e, s, a) {
          var d = a(1068),
            t = a(1129),
            i = a(7413),
            r = a(3435),
            o = a(2354),
            p = a(2682),
            n = a(1779),
            l = a(6271),
            m = a(5931),
            g = a(2542);
          const u = 'nexx360',
            c = (0, i.generateUUID)(),
            b = (0, o.vM)({ bidderCode: u }),
            x = ((0, m.kD)(b, u, 'nexx360_storage', 'nexx360Id'), (e = u) => (0, m.FW)(e, !1)),
            v = (0, l.A)({
              context: { netRevenue: !0, ttl: 90 },
              imp(e, s, a) {
                let d = e(s, a);
                d = (0, m.M2)(d, s);
                const t = s.params.divId || s.adUnitCode,
                  i = 'string' == typeof t ? document.getElementById(t) : null;
                if (i) {
                  const { width: e, height: s } = (0, g.G)(i);
                  ((0, r.J)(d, 'ext.dimensions.slotW', e),
                    (0, r.J)(d, 'ext.dimensions.slotH', s),
                    (0, r.J)(d, 'ext.dimensions.cssMaxW', i.style?.maxWidth),
                    (0, r.J)(d, 'ext.dimensions.cssMaxH', i.style?.maxHeight));
                }
                return (
                  (0, r.J)(d, 'ext.nexx360', s.params),
                  (0, r.J)(d, 'ext.nexx360.divId', t),
                  s.params.adUnitPath && (0, r.J)(d, 'ext.adUnitPath', s.params.adUnitPath),
                  s.params.adUnitName && (0, r.J)(d, 'ext.adUnitName', s.params.adUnitName),
                  d
                );
              },
              request(e, s, a, d) {
                let t = e(s, a, d);
                const i = (0, m.k6)(b, u);
                return ((t = (0, m.FY)(t, i, c, '8.0')), t);
              },
            }),
            I = {
              code: u,
              gvlid: 965,
              aliases: [
                { code: 'revenuemaker' },
                { code: 'first-id', gvlid: 1178 },
                { code: 'adwebone' },
                { code: 'league-m', gvlid: 965 },
                { code: 'prjads' },
                { code: 'pubtech' },
                { code: '1accord', gvlid: 965 },
                { code: 'easybid', gvlid: 1068 },
                { code: 'prismassp', gvlid: 965 },
                { code: 'spm', gvlid: 965 },
                { code: 'bidstailamedia', gvlid: 965 },
                { code: 'scoremedia', gvlid: 965 },
                { code: 'glomexbidder', gvlid: 967 },
                { code: 'pubxai', gvlid: 1485 },
                { code: 'ybidder', gvlid: 1253 },
                { code: 'netads', gvlid: 965 },
              ],
              supportedMediaTypes: [n.D4, n.G_, n.s6],
              isBidRequestValid: (e) =>
                !e.params.adUnitName || ('string' == typeof e.params.adUnitName && '' !== e.params.adUnitName)
                  ? !e.params.adUnitPath || ('string' == typeof e.params.adUnitPath && '' !== e.params.adUnitPath)
                    ? !e.params.divId || ('string' == typeof e.params.divId && '' !== e.params.divId)
                      ? e.params.allBids && 'boolean' != typeof e.params.allBids
                        ? ((0, i.logError)('bid.params.allBids needs to be a boolean'), !1)
                        : !!(e.params.tagId || e.params.videoTagId || e.params.nativeTagId || e.params.placement) ||
                          ((0, i.logError)(
                            'bid.params.tagId or bid.params.videoTagId or bid.params.nativeTagId or bid.params.placement must be defined',
                          ),
                          !1)
                      : ((0, i.logError)('bid.params.divId needs to be a string'), !1)
                    : ((0, i.logError)('bid.params.adUnitPath needs to be a string'), !1)
                  : ((0, i.logError)('bid.params.adUnitName needs to be a string'), !1),
              buildRequests: (e, s) => ({
                method: 'POST',
                url: '../../fast.nexx360.io/booster',
                data: v.toORTB({ bidRequests: e, bidderRequest: s }),
                options: { endpointCompression: x(s.bidderCode) },
              }),
              interpretResponse: m.xO,
              getUserSyncs: m.yY,
            };
          ((0, p.a$)(I),
            (0, t.E)('nexx360BidAdapter'),
            Object.assign(d.W1, {
              965: { purposes: [1, 2], legIntPurposes: [10], flexiblePurposes: [10], specialFeatures: [] },
              967: {
                purposes: [1, 3, 4, 6, 9],
                legIntPurposes: [2, 7, 8, 10, 11],
                flexiblePurposes: [2, 7, 8, 10, 11],
                specialFeatures: [],
              },
              1068: { purposes: [1, 2, 3, 4, 7, 9, 10], legIntPurposes: [], flexiblePurposes: [], specialFeatures: [1] },
              1178: { purposes: [1, 2, 3, 4], legIntPurposes: [], flexiblePurposes: [], specialFeatures: [2] },
              1253: { purposes: [1, 2], legIntPurposes: [7, 8, 9, 10], flexiblePurposes: [], specialFeatures: [] },
              1485: { purposes: [1, 2, 3, 4, 5, 7, 9, 10], legIntPurposes: [], flexiblePurposes: [], specialFeatures: [] },
            }));
        },
      },
      (e) => {
        e.O(0, [802, 7769, 5590, 1085, 8498, 2316, 9147, 2068], () => {
          return ((s = 9757), e((e.s = s)));
          var s;
        });
        e.O();
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [539],
      {
        9235(e, t, n) {
          var a = n(1129),
            r = n(7449),
            l = n(8468),
            o = n(8384),
            d = n(1785),
            i = n(7413),
            s = n(8928);
          const g = 'optable',
            u = `[${g} RTD]:`,
            c = (0, i.prefixLog)(u),
            { logMessage: b, logWarn: p, logError: f } = c,
            h = (e) => {
              let t = (0, s.A)(e, 'params.bundleUrl', null);
              const n = (0, s.A)(e, 'params.adserverTargeting', !0),
                a = (0, s.A)(e, 'params.handleRtd', null),
                r = (0, s.A)(e, 'params.instance', null);
              if (('string' == typeof t && (t = t.trim()), 'string' == typeof t && t.length && !t.startsWith('https://')))
                return (
                  f('Invalid URL format for bundleUrl in moduleConfig. Only HTTPS URLs are allowed.'),
                  { bundleUrl: null, adserverTargeting: n, handleRtd: null }
                );
              if (a && 'function' != typeof a)
                return (f('handleRtd must be a function'), { bundleUrl: t, adserverTargeting: n, handleRtd: null });
              const l = { bundleUrl: t, adserverTargeting: n, handleRtd: a };
              return (null !== r && (l.instance = r), l);
            },
            m = async (e, t, n) => {
              let a = await ((r = 'optable-targeting:change'),
              new Promise((e) => {
                const t = window.optable,
                  n = t?.instance?.targetingFromCache();
                if (n && n.ortb2) return (b('Optable SDK already has cached data'), void e(n));
                const a = (t) => {
                  b(`Received ${r} event`);
                  const n = t.detail;
                  (window.removeEventListener(r, a), e(n));
                };
                (window.addEventListener(r, a), b(`Waiting for ${r} event`));
              }));
              var r;
              a && a.ortb2
                ? (n(e.ortb2Fragments.global, a.ortb2), b("Prebid's global ORTB2 object after merge: ", e.ortb2Fragments.global))
                : p('No targeting data found');
            },
            v = async (e, t, n, a) => {
              'AsyncFunction' === e.constructor.name ? await e(t, n, a) : e(t, n, a);
            },
            w = {
              name: g,
              init: (e, t) => !0,
              getBidRequestData: (e, t, n, a) => {
                try {
                  const { bundleUrl: a, handleRtd: d } = h(n),
                    s = d || m,
                    u = o.$W.getConfig('optableRtdConfig') || {};
                  a
                    ? (b('Custom bundle URL found in config: ', a),
                      (0, l.R)(
                        a,
                        r.zu,
                        g,
                        () => {
                          (b('Successfully loaded Optable JS bundle'), v(s, e, u, i.mergeDeep).then(t, t));
                        },
                        document,
                      ))
                    : (b('Custom bundle URL not found in config. Assuming Optable JS bundle is already present on the page'),
                      (window.optable = window.optable || { cmd: [] }),
                      window.optable.cmd.push(() => {
                        (b('Optable JS bundle found on the page'), v(s, e, u, i.mergeDeep).then(t, t));
                      }));
                } catch (e) {
                  (f(e), t());
                }
              },
              getTargetingData: (e, t, n, a) => {
                const { adserverTargeting: r, instance: l } = h(t);
                if ((b('Ad Server targeting: ', r), !r)) return (b('Ad server targeting is disabled'), {});
                const o = {},
                  d = l || 'instance',
                  s = window?.optable?.[d];
                if (!s) return (p(`No Optable SDK instance found for: ${d}`), o);
                const g = s?.targetingKeyValuesFromCache?.() || o;
                return Object.keys(g).length
                  ? (e.forEach((e) => {
                      ((o[e] = o[e] || {}), (0, i.mergeDeep)(o[e], g));
                    }),
                    Object.keys(o).forEach((e) => {
                      (Object.keys(o[e]).forEach((t) => {
                        (o[e][t] && o[e][t].length) || delete o[e][t];
                      }),
                        Object.keys(o[e]).length || delete o[e]);
                    }),
                    b('Optable targeting data: ', o),
                    o)
                  : (p('No Optable targeting data found'), o);
              },
            };
          ((0, d.bz)('realTimeData', w), (0, a.E)('optableRtdProvider'));
        },
      },
      (e) => {
        e.O(0, [802, 7769, 5590, 1085], () => {
          return ((t = 9235), e((e.s = t)));
          var t;
        });
        e.O();
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [3206],
      {
        7566(e, t, o) {
          var r = o(1068),
            i = o(1129),
            n = o(7413),
            s = o(8928),
            a = o(3435),
            d = o(3350),
            l = o(2682),
            g = o(1779),
            u = o(8384),
            p = o(6969),
            c = o(6901),
            m = o(7686),
            f = o(7886);
          const b = 'ozone',
            h = 'https://elb.the-ozone-project.com',
            y = 'oz',
            I = '4.0.2',
            v = {
              gvlid: 524,
              version: I,
              code: b,
              supportedMediaTypes: [g.G_, g.D4],
              cookieSyncBag: { publisherId: null, siteId: null, userIdObject: {} },
              propertyBag: { pageId: null, buildRequestsStart: 0, buildRequestsEnd: 0 },
              getAuctionUrl() {
                const e = u.$W.getConfig('ozone.endpointOverride') || {};
                if (e.auctionUrl) return e.auctionUrl;
                return (e.origin || h) + '/openrtb2/auction';
              },
              getCookieSyncUrl() {
                const e = u.$W.getConfig('ozone.endpointOverride') || {};
                if (e.cookieSyncUrl) return e.cookieSyncUrl;
                return (e.origin || h) + '/static/load-cookie.html';
              },
              getRendererUrl: () =>
                (u.$W.getConfig('ozone.endpointOverride') || {}).rendererUrl || 'https://prebid.the-ozone-project.com/ozone-renderer.js',
              getVideoPlacementValue: (e) =>
                ['instream', 'outstream'].indexOf(e) < 0 ? null : (0, s.A)(u.$W.getConfig('ozone.videoParams'), e),
              getBatchRequests() {
                const e = this.getGetParametersAsObject();
                if (e.batchRequests && e.batchRequests.toString().match(/^[0-9]+$/)) return parseInt(e.batchRequests);
                const t = u.$W.getConfig('ozone.batchRequests');
                return !0 === t ? 10 : 'number' == typeof t && t > 0 && t;
              },
              isBidRequestValid(e) {
                const t = 'VALIDATION FAILED';
                (0, n.logInfo)('isBidRequestValid : ', u.$W.getConfig(), e);
                const o = e.adUnitCode,
                  r = `${t} : missing {param} : siteId, placementId and publisherId are REQUIRED`;
                if (!(0, n.getBidIdParameter)('placementId', e.params))
                  return ((0, n.logError)(r.replace('{param}', 'placementId'), o), !1);
                if (!this.isValidPlacementId(e.params.placementId))
                  return ((0, n.logError)(`${t} : placementId must be exactly 10 numbers`, o), !1);
                if (!(0, n.getBidIdParameter)('publisherId', e.params))
                  return ((0, n.logError)(r.replace('{param}', 'publisherId'), o), !1);
                if (!e.params.publisherId.toString().match(/^[a-zA-Z0-9-]{12}$/))
                  return ((0, n.logError)(`${t} : publisherId must be /^[a-zA-Z0-9\\-]{12}$/`, o), !1);
                if (!(0, n.getBidIdParameter)('siteId', e.params)) return ((0, n.logError)(r.replace('{param}', 'siteId'), o), !1);
                if (!e.params.siteId.toString().match(/^[0-9]{10}$/))
                  return ((0, n.logError)(`${t} : siteId must be /^[0-9]{10}$/`, o), !1);
                if (e.params.hasOwnProperty('customParams'))
                  return ((0, n.logError)(`${t} : customParams should be renamed: customData`, o), !1);
                if (e.params.hasOwnProperty('customData')) {
                  if (!(0, d.cy)(e.params.customData)) return ((0, n.logError)(`${t} : customData is not an Array`, o), !1);
                  if (e.params.customData.length < 1) return ((0, n.logError)(`${t} : empty customData`, o), !1);
                  if (!e.params.customData[0].hasOwnProperty('targeting'))
                    return ((0, n.logError)(`${t} :no customData[0].targeting`, o), !1);
                  if ('object' != typeof e.params.customData[0].targeting)
                    return ((0, n.logError)(`${t} : customData[0].targeting is not an Object`, o), !1);
                }
                if (e.hasOwnProperty('mediaTypes') && e.mediaTypes.hasOwnProperty(g.G_)) {
                  if (!e.mediaTypes?.[g.G_]?.context) return ((0, n.logError)(`${t} No video context key/value`), !1);
                  if (['instream', 'outstream'].indexOf(e.mediaTypes?.[g.G_]?.context) < 0)
                    return ((0, n.logError)(`${t} video.context is invalid.`), !1);
                }
                return !0;
              },
              isValidPlacementId: (e) => e.toString().match(/^[0-9]{10}$/),
              buildRequests(e, t) {
                ((0, n.logInfo)('**TESTING CONFIG', u.$W.getConfig()), (this.propertyBag.buildRequestsStart = new Date().getTime()));
                const o = b,
                  r = y;
                if (
                  ((0, n.logInfo)(
                    `buildRequests time: ${this.propertyBag.buildRequestsStart} v ${I} validBidRequests`,
                    (0, d.Go)(e),
                    'bidderRequest',
                    (0, d.Go)(t),
                  ),
                  this.blockTheRequest())
                )
                  return [];
                let i = { publisherId: '', siteId: '' };
                (e.length > 0 &&
                  (Object.assign(this.cookieSyncBag.userIdObject, this.findAllUserIdsFromEids(e[0])),
                  (this.cookieSyncBag.siteId = (0, s.A)(e[0], 'params.siteId')),
                  (this.cookieSyncBag.publisherId = (0, s.A)(e[0], 'params.publisherId')),
                  (i = e[0].params)),
                  (0, n.logInfo)('cookie sync bag', this.cookieSyncBag));
                let l = u.$W.getConfig('ozone.singleRequest');
                l = !1 !== l;
                const p = { site: {}, regs: {}, user: {} },
                  c = (0, s.A)(t, 'ortb2', {}),
                  h = this.pruneToExtPaths(c, { maxTestDepth: 2 });
                ((0, n.logInfo)('got ortb2 fpd: ', c),
                  (0, n.logInfo)('got ortb2 fpdPruned: ', h),
                  (0, n.logInfo)('going to assign the pruned (ext only) FPD ortb2 object to ozoneRequest, wholesale'),
                  (0, n.mergeDeep)(p, h),
                  (0, f.GR)(p));
                const v = this.getGetParametersAsObject(),
                  A = 'oztestmode',
                  _ = v[A] || null;
                (0, n.mergeDeep)(p, { device: t?.ortb2?.device || {} });
                const x = this.getPlacementIdOverrideFromGetParam();
                let $ = null;
                var z = (0, s.A)(e, '0.ortb2.source.tid');
                '0' === z && (z = null);
                const T = e.map((e) => {
                    var t = {};
                    let r = this.pruneToExtPaths(e.ortb2Imp, { maxTestDepth: 2 });
                    ((0, n.logInfo)(
                      'merging into bid[] from pruned ozoneBidRequest.ortb2Imp (this includes adunits ortb2imp and gpid & tid from gptPreAuction if included',
                      r,
                    ),
                      (0, n.mergeDeep)(t, r));
                    const i = x || this.getPlacementId(e);
                    ((t.id = e.bidId), (t.tagid = i), (t.secure = 'https' === (0, n.parseUrl)((0, m.EN)().page).protocol ? 1 : 0));
                    let d = [];
                    if (e.hasOwnProperty('mediaTypes')) {
                      if (
                        (e.mediaTypes.hasOwnProperty(g.D4) &&
                          ((d = e.mediaTypes[g.D4].sizes),
                          (0, n.logInfo)('setting banner size from mediaTypes.banner for bidId ' + t.id + ': ', d)),
                        e.mediaTypes.hasOwnProperty(g.G_))
                      ) {
                        if (((0, n.logInfo)('openrtb 2.5 compliant video'), 'object' == typeof e.mediaTypes[g.G_])) {
                          const o = (0, s.A)(e, 'params.video', {});
                          ((t.video = this.unpackVideoConfigIntoIABformat(e.mediaTypes[g.G_], o)),
                            (t.video = this.addVideoDefaults(t.video, e.mediaTypes[g.G_], o)));
                        }
                        const o = (function (e) {
                          let t = O(e);
                          if (!t) return null;
                          if (
                            t[0] &&
                            'object' == typeof t[0] &&
                            ((0, n.logInfo)('getWidthAndHeightFromVideoObject found nested array inside playerSize.', t[0]),
                            (t = t[0]),
                            'number' != typeof t[0] && 'string' != typeof t[0])
                          )
                            return (
                              (0, n.logError)(
                                'getWidthAndHeightFromVideoObject found non-number/string type inside the INNER array in playerSize. This is totally wrong - cannot continue.',
                                t[0],
                              ),
                              null
                            );
                          if (2 !== t.length)
                            return (
                              (0, n.logError)(
                                'getWidthAndHeightFromVideoObject found playerSize with length of ' +
                                  t.length +
                                  '. This is totally wrong - cannot continue.',
                              ),
                              null
                            );
                          return { w: t[0], h: t[1] };
                        })(t.video);
                        (0, n.logInfo)(`setting video object ${t.id} from mediaTypes.video: `, t.video, 'wh=', o);
                        const r = 'setting obj.video.format to be ';
                        if (o && 'object' == typeof o) {
                          ((t.video.w = o.w), (t.video.h = o.h));
                          const e = O(t.video);
                          e && Array.isArray(e[0])
                            ? ((0, n.logInfo)(`${r} an array of objects`), (t.video.ext.format = [o]))
                            : ((0, n.logInfo)(`${r} an object`), (t.video.ext.format = o));
                        } else (0, n.logWarn)(`Failed ${r} anything - bad config`);
                      }
                      (e.mediaTypes.hasOwnProperty(g.s6) &&
                        ((t.native = e.mediaTypes[g.s6]),
                        (0, n.logInfo)(`setting native object ${t.id} from mediaTypes.native element:`, t.native)),
                        e.hasOwnProperty('getFloor')
                          ? ((t.floor = this.getFloorObjectForAuction(e)), (0, n.logInfo)('obj.floor is : ', t.floor))
                          : (0, n.logInfo)('no getFloor property'));
                    } else
                      e.hasOwnProperty('sizes')
                        ? (d = e.sizes)
                        : (0, n.logInfo)('no mediaTypes or sizes array. Cannot set sizes for banner type');
                    if (
                      (d.length > 0 &&
                        (t.banner = { topframe: 1, w: d[0][0] || 0, h: d[0][1] || 0, format: d.map((e) => ({ w: e[0], h: e[1] })) }),
                      (t.placementId = i),
                      (0, n.mergeDeep)(t, { ext: { prebid: { storedrequest: { id: i } } } }),
                      (t.ext[o] = t.ext[o] || {}),
                      (t.ext[o].adUnitCode = e.adUnitCode),
                      e.params.hasOwnProperty('customData') && (t.ext[o].customData = e.params.customData),
                      e.params.hasOwnProperty('ozFloor'))
                    ) {
                      const r = parseFloat(e.params.ozFloor);
                      isNaN(r)
                        ? (0, n.logError)(`Ignoring invalid ozFloor value for adunit code: ${e.adUnitCode}`)
                        : (t.ext[o].ozFloor = r);
                    }
                    if (((0, n.logInfo)(`obj.ext.${o} is `, t.ext[o]), null != _))
                      if (((0, n.logInfo)(`setting isTestMode: ${_}`), t.ext[o].hasOwnProperty('customData')))
                        for (let e = 0; e < t.ext[o].customData.length; e++) t.ext[o].customData[e].targeting[A] = _;
                      else ((t.ext[o].customData = [{ settings: {}, targeting: {} }]), (t.ext[o].customData[0].targeting[A] = _));
                    return (
                      c &&
                        (0, s.A)(c, 'site') &&
                        ((0, n.logInfo)('adding fpd.site'),
                        (0, s.A)(t, `ext.${o}.customData.0.targeting`, !1)
                          ? Object.assign(t.ext[o].customData[0].targeting, c.site)
                          : (0, a.J)(t, `ext.${o}.customData.0.targeting`, c.site)),
                      !$ && (0, s.A)(e, 'ortb2.source.ext.schain') && ($ = e.ortb2.source.ext.schain),
                      z && (t.ext.auctionId = z),
                      t
                    );
                  }),
                  D = {};
                if (((D[o] = {}), (D[o][`${r}_pb_v`] = I), (D[o][`${r}_rw`] = x ? 1 : 0), e.length > 0)) {
                  const e = this.cookieSyncBag.userIdObject;
                  e.hasOwnProperty('pubcid.org') && (D[o].pubcid = e['pubcid.org']);
                }
                D[o].pv = this.getPageId();
                const R = u.$W.getConfig('ozone.oz_omp_floor');
                ((0, n.logInfo)(`${r}_omp_floor dollar value = `, R),
                  'number' == typeof R
                    ? (D[o][`${r}_omp_floor`] = R)
                    : void 0 !== R && (0, n.logError)(`IF set, ${r}_omp_floor must be a number eg. 1.55. Found:` + typeof R));
                const w = u.$W.getConfig('ozone.oz_whitelist_adserver_keys'),
                  S = (0, d.cy)(w) && w.length > 0;
                D[o].oz_kvp_rw = S ? 1 : 0;
                const B = u.$W.getConfig('ozone.endpointOverride');
                (B?.origin || B?.auctionUrl) && (D[o].origin = B.auctionUrl || B.origin);
                const P = (0, s.A)(e, '0.userIdAsEids', []);
                if (
                  ((0, n.mergeDeep)(p.site, { publisher: { id: i.publisherId }, page: (0, m.EN)().page, id: i.siteId }),
                  (p.test = u.$W.getConfig('debug') ? 1 : 0),
                  t && t.gdprConsent)
                ) {
                  (0, n.logInfo)('ADDING GDPR');
                  const e = (0, s.A)(t, 'gdprConsent.apiVersion', 1);
                  ((0, n.mergeDeep)(p.regs, { ext: { gdpr: t.gdprConsent.gdprApplies ? 1 : 0, apiVersion: e } }),
                    t.gdprConsent.gdprApplies
                      ? (0, a.J)(p, 'user.ext.consent', t.gdprConsent.consentString)
                      : (0, n.logWarn)(
                          '**** Strange CMP info: bidderRequest.gdprConsent exists BUT bidderRequest.gdprConsent.gdprApplies is false. See bidderRequest logged above. ****',
                        ));
                } else (0, n.logInfo)('WILL NOT ADD GDPR info; no bidderRequest.gdprConsent object');
                (t && t.uspConsent
                  ? ((0, n.logInfo)('ADDING USP consent info'), (0, a.J)(p, 'regs.ext.us_privacy', t.uspConsent))
                  : (0, n.logInfo)('WILL NOT ADD USP consent info; no bidderRequest.uspConsent.'),
                  t?.ortb2?.regs?.gpp &&
                    ((0, a.J)(p, 'regs.ext.gpp', t.ortb2.regs.gpp), (0, a.J)(p, 'regs.ext.gpp_sid', t.ortb2.regs.gpp_sid)),
                  $ && ((0, n.logInfo)('schain found'), (0, a.J)(p, 'source.ext.schain', $)),
                  !0 === u.$W.getConfig('coppa') && (0, a.J)(p, 'regs.coppa', 1));
                const j = this.getBatchRequests();
                if ('number' == typeof j) {
                  (0, n.logInfo)(`Batching = ${j}`);
                  const e = [];
                  for (let o = 0; o < T.length; o += j)
                    ((p.id = (0, n.generateUUID)()),
                      (0, n.mergeDeep)(p, { user: { ext: { eids: P } } }),
                      z && (0, a.J)(p, 'source.tid', z),
                      (p.imp = T.slice(o, o + j)),
                      (0, n.mergeDeep)(p, { ext: D }),
                      (0, f.GR)(p),
                      p.imp.length > 0 && e.push({ method: 'POST', url: this.getAuctionUrl(), data: JSON.stringify(p), bidderRequest: t }));
                  return (
                    (this.propertyBag.buildRequestsEnd = new Date().getTime()),
                    (0, n.logInfo)(
                      `buildRequests batch request going to return at time ${this.propertyBag.buildRequestsEnd} (took ${this.propertyBag.buildRequestsEnd - this.propertyBag.buildRequestsStart}ms):`,
                      e,
                    ),
                    e
                  );
                }
                if (l) {
                  ((0, n.logInfo)('single request starting'),
                    (p.id = (0, n.generateUUID)()),
                    (p.imp = T),
                    (0, n.mergeDeep)(p, { ext: D }),
                    (0, f.GR)(p),
                    (0, n.mergeDeep)(p, { user: { ext: { eids: P } } }),
                    z && (0, a.J)(p, 'source.tid', z));
                  var q = { method: 'POST', url: this.getAuctionUrl(), data: JSON.stringify(p), bidderRequest: t };
                  return (
                    (this.propertyBag.buildRequestsEnd = new Date().getTime()),
                    (0, n.logInfo)(
                      `buildRequests going to return for single at time ${this.propertyBag.buildRequestsEnd} (took ${this.propertyBag.buildRequestsEnd - this.propertyBag.buildRequestsStart}ms): `,
                      (0, d.Go)(q),
                    ),
                    q
                  );
                }
                const E = T.map((e) => {
                  (0, n.logInfo)('non-single response, working on imp : ', e);
                  const o = Object.assign({}, p);
                  return (
                    (o.id = (0, n.generateUUID)()),
                    (o.imp = [e]),
                    (0, n.mergeDeep)(o, { ext: D }),
                    (0, n.mergeDeep)(o, { user: { ext: { eids: P } } }),
                    z && (0, a.J)(o, 'source.tid', z),
                    (0, f.GR)(o),
                    { method: 'POST', url: this.getAuctionUrl(), data: JSON.stringify(o), bidderRequest: t }
                  );
                });
                return (
                  (this.propertyBag.buildRequestsEnd = new Date().getTime()),
                  (0, n.logInfo)(
                    `buildRequests going to return for non-single at time ${this.propertyBag.buildRequestsEnd} (took ${this.propertyBag.buildRequestsEnd - this.propertyBag.buildRequestsStart}ms): `,
                    E,
                  ),
                  E
                );
              },
              getFloorObjectForAuction(e) {
                const t = {
                  banner: (0, s.A)(e, 'mediaTypes.banner.sizes', null),
                  video: (0, s.A)(e, 'mediaTypes.video.playerSize', null),
                  native: (0, s.A)(e, 'mediaTypes.native.image.sizes', null),
                };
                (0, n.logInfo)('getFloorObjectForAuction mediaTypesSizes : ', t);
                const o = {};
                return (
                  t.banner && (o.banner = e.getFloor({ mediaType: 'banner', currency: 'USD', size: t.banner[0] })),
                  t.video && (o.video = e.getFloor({ mediaType: 'video', currency: 'USD', size: t.video[0] })),
                  t.native && (o.native = e.getFloor({ mediaType: 'native', currency: 'USD', size: t.native[0] })),
                  (0, n.logInfo)('getFloorObjectForAuction returning : ', (0, d.Go)(o)),
                  o
                );
              },
              interpretResponse(e, t) {
                const o = new Date().getTime(),
                  r = b;
                ((0, n.logInfo)(
                  `interpretResponse time: ${o} . Time between buildRequests done and interpretResponse start was ${o - this.propertyBag.buildRequestsEnd}ms`,
                ),
                  (0, n.logInfo)('serverResponse, request', (0, d.Go)(e), (0, d.Go)(t)));
                const i = (e = e.body || {}).id;
                if (!e.hasOwnProperty('seatbid')) return [];
                if ('object' != typeof e.seatbid) return [];
                const a = [];
                let l,
                  p = u.$W.getConfig('ozone.enhancedAdserverTargeting');
                ((0, n.logInfo)('enhancedAdserverTargeting', p),
                  void 0 === p && (p = !0),
                  (0, n.logInfo)('enhancedAdserverTargeting', p),
                  (e.seatbid = (function (e) {
                    (0, n.logInfo)('injectAdIdsIntoAllBidResponses', (0, d.Go)(e));
                    for (let t = 0; t < e.length; t++) {
                      const o = e[t];
                      for (let e = 0; e < o.bid.length; e++) o.bid[e].adId = `${o.bid[e].impid}-${t}-${y}-${e}`;
                    }
                    return e;
                  })(e.seatbid)),
                  (e.seatbid = this.removeSingleBidderMultipleBids(e.seatbid)));
                const c = u.$W.getConfig('ozone.oz_omp_floor'),
                  m = 'number' == typeof c,
                  f = u.$W.getConfig('ozone.oz_whitelist_adserver_keys'),
                  h = (0, d.cy)(f) && f.length > 0;
                for (let o = 0; o < e.seatbid.length; o++) {
                  const u = e.seatbid[o];
                  for (let b = 0; b < u.bid.length; b++) {
                    const y = this.getBidRequestForBidId(u.bid[b].impid, t.bidderRequest.bids);
                    (0, n.logInfo)(`seatbid:${o}, bid:${b} Going to set default w h for seatbid/bidRequest`, u.bid[b], y);
                    const { defaultWidth: v, defaultHeight: O } = A(y),
                      T = z(u.bid[b], v, O);
                    T.meta = { advertiserDomains: T.adomain || [] };
                    let R = null,
                      w = !1;
                    const S = (0, s.A)(T, 'ext.prebid.type');
                    (0, n.logInfo)(`this bid type is : ${S}`);
                    let B = {};
                    if (S === g.G_)
                      if (
                        ((w = !0),
                        this.setBidMediaTypeIfNotExist(T, g.G_),
                        (R = this.getVideoContextForBidId(T.bidId, t.bidderRequest.bids)),
                        'outstream' === R)
                      )
                        ((0, n.logInfo)('setting thisBid.mediaType = VIDEO & attach a renderer to OUTSTREAM video'),
                          (T.renderer = D(T.bidId)),
                          (T.vastUrl = `https://${(0, s.A)(T, 'ext.prebid.targeting.hb_cache_host', 'missing_host')}${(0, s.A)(T, 'ext.prebid.targeting.hb_cache_path', 'missing_path')}?uuid=${(0, s.A)(T, 'ext.prebid.targeting.hb_uuid', 'missing_uuid')}`),
                          (T.vastXml = T.adm));
                      else if (
                        ((0, n.logInfo)(
                          'not an outstream video (presumably instream), will set thisBid.mediaType = VIDEO and thisBid.vastUrl and not attach a renderer',
                        ),
                        (T.vastUrl = `https://${(0, s.A)(T, 'ext.prebid.targeting.hb_cache_host', 'missing_host')}${(0, s.A)(T, 'ext.prebid.targeting.hb_cache_path', 'missing_path')}?uuid=${(0, s.A)(T, 'ext.prebid.targeting.hb_uuid', 'missing_uuid')}`),
                        T.hasOwnProperty('videoCacheKey'))
                      )
                        (0, n.logInfo)('videoCacheKey already exists on the bid object, will not add it');
                      else {
                        const e = (0, s.A)(T, 'ext.prebid.targeting.hb_uuid', 'no_hb_uuid');
                        ((0, n.logInfo)(`Adding videoCacheKey: ${e}`), (T.videoCacheKey = e));
                      }
                    else this.setBidMediaTypeIfNotExist(T, g.D4);
                    if (((B = Object.assign(B, (0, s.A)(T, 'ext.prebid.targeting', {}))), p)) {
                      const t = x(T.bidId, e.seatbid, v, O);
                      ((0, n.logInfo)('Going to iterate allBidsForThisBidId', (0, d.Go)(t)),
                        Object.keys(t).forEach((e, o, i) => {
                          ((0, n.logInfo)(`adding adserverTargeting for ${e} for bidId ${T.bidId}`),
                            (B['oz_' + e] = e),
                            (B['oz_' + e + '_crid'] = String(t[e].crid)),
                            (B['oz_' + e + '_adv'] = String(t[e].adomain)),
                            (B['oz_' + e + '_adId'] = String(t[e].adId)),
                            (B['oz_' + e + '_pb_r'] = $(t[e].price, t[e].ext.prebid.type)),
                            (B['oz_' + e + '_size'] = String(t[e].width) + 'x' + String(t[e].height)),
                            t[e].hasOwnProperty('dealid') && (B['oz_' + e + '_dealid'] = String(t[e].dealid)),
                            m && (B['oz_' + e + '_omp'] = t[e].price >= c ? '1' : '0'),
                            w && (B['oz_' + e + '_vid'] = R));
                          const a = (0, s.A)(t[e], `ext.bidder.${r}.floor`, null);
                          null != a && (B['oz_' + e + '_flr'] = a);
                          const d = (0, s.A)(t[e], `ext.bidder.${r}.ruleId`, null);
                          (null != d && (B['oz_' + e + '_rid'] = d),
                            e.match(/^ozappnexus/) && (B['oz_' + e + '_sid'] = String(t[e].cid)),
                            (l = (0, s.A)(t[e], 'ext.prebid.labels', null) || (0, s.A)(t[e], 'ext.bidder.prebid.label', null)),
                            l && (B['oz_' + e + '_labels'] = l.join(',')));
                        }));
                    } else {
                      const e = `${r}.enhancedAdserverTargeting is set to false. No per-bid keys will be sent to adserver.`;
                      h ? (0, n.logWarn)(`Your adserver keys whitelist will be ignored - ${e}`) : (0, n.logInfo)(e);
                    }
                    let { seat: P, bid: j } = _(T.bidId, e.seatbid);
                    ((j = z(j, v, O)),
                      (B.oz_auc_id = String(i)),
                      (B.oz_winner = String(P)),
                      (B.oz_bid = 'true'),
                      (B.oz_cache_id = (0, s.A)(T, 'ext.prebid.targeting.hb_cache_id', 'no-id')),
                      (B.oz_uuid = (0, s.A)(T, 'ext.prebid.targeting.hb_uuid', 'no-id')),
                      p &&
                        ((l = (0, s.A)(j, 'ext.prebid.labels', null) || (0, s.A)(j, 'ext.bidder.prebid.label', null)),
                        l && (B.oz_labels = l.join(',')),
                        (B.oz_imp_id = String(j.impid)),
                        (B.oz_pb_v = I),
                        (B.oz_pb = j.price),
                        (B.oz_pb_r = $(j.price, S)),
                        (B.oz_adId = String(j.adId)),
                        (B.oz_size = `${j.width}x${j.height}`)),
                      h &&
                        ((0, n.logInfo)('Filtering out adserver targeting keys not in the whitelist: ', f),
                        Object.keys(B).forEach(function (e) {
                          -1 === f.indexOf(e) && delete B[e];
                        })),
                      (T.adserverTargeting = B),
                      a.push(T));
                  }
                }
                let v = a;
                const O = new Date().getTime();
                return (
                  (0, n.logInfo)(
                    `interpretResponse going to return at time ${O} (took ${O - o}ms) Time from buildRequests Start -> interpretRequests End = ${O - this.propertyBag.buildRequestsStart}ms`,
                  ),
                  (0, n.logInfo)('will return: ', (0, d.Go)(v)),
                  v
                );
              },
              setBidMediaTypeIfNotExist(e, t) {
                e.hasOwnProperty('mediaType')
                  ? (0, n.logInfo)(`found value for thisBid.mediaType: ${e.mediaType}`)
                  : ((0, n.logInfo)(`setting thisBid.mediaType = ${t}`), (e.mediaType = t));
              },
              removeSingleBidderMultipleBids(e) {
                var t = [];
                for (let n = 0; n < e.length; n++) {
                  const s = e[n];
                  var o = { seat: s.seat, bid: [] },
                    r = [];
                  for (let e = 0; e < s.bid.length; e++) {
                    var i = s.bid[e];
                    if (!r.includes(i.impid)) {
                      r.push(i.impid);
                      for (let t = e + 1; t < s.bid.length; t++) s.bid[t].impid === i.impid && s.bid[t].price > i.price && (i = s.bid[t]);
                      o.bid.push(i);
                    }
                  }
                  t.push(o);
                }
                return t;
              },
              getUserSyncs(e, t, o, r, i = {}) {
                if (
                  ((0, n.logInfo)(
                    'getUserSyncs optionsType',
                    e,
                    'serverResponse',
                    t,
                    'gdprConsent',
                    o,
                    'usPrivacy',
                    r,
                    'cookieSyncBag',
                    this.cookieSyncBag,
                  ),
                  !t || 0 === t.length)
                )
                  return [];
                const { gppString: a = '', applicableSections: d = [] } = i;
                if (e.iframeEnabled) {
                  const e = [];
                  (u.$W.getConfig('debug') && e.push('pbjs_debug=true'),
                    e.push('gdpr=' + ((0, s.A)(o, 'gdprApplies', !1) ? '1' : '0')),
                    e.push('gdpr_consent=' + (0, s.A)(o, 'consentString', '')),
                    e.push('usp_consent=' + (r || '')),
                    e.push('gpp=' + a),
                    Array.isArray(d) && e.push(`gpp_sid=${d.join()}`));
                  for (const t in this.cookieSyncBag.userIdObject) e.push(t + '=' + this.cookieSyncBag.userIdObject[t]);
                  (e.push('publisherId=' + this.cookieSyncBag.publisherId),
                    e.push('siteId=' + this.cookieSyncBag.siteId),
                    e.push('cb=' + Date.now()),
                    e.push('bidder=' + b));
                  let t = e.join('&');
                  return (
                    t.length > 0 && (t = '?' + t),
                    (0, n.logInfo)('getUserSyncs going to return cookie sync url : ' + this.getCookieSyncUrl() + t),
                    [{ type: 'iframe', url: this.getCookieSyncUrl() + t }]
                  );
                }
              },
              getBidRequestForBidId(e, t) {
                for (let o = 0; o < t.length; o++) if (t[o].bidId === e) return t[o];
                return null;
              },
              getVideoContextForBidId(e, t) {
                const o = this.getBidRequestForBidId(e, t);
                return null != o ? (0, s.A)(o, 'mediaTypes.video.context', 'unknown') : null;
              },
              findAllUserIdsFromEids(e) {
                const t = {};
                let o = e.userIdAsEids || [];
                for (const e of o) t[e.source] = (0, s.A)(e, 'uids.0.id');
                return (this.tryGetPubCidFromOldLocation(t, e), t);
              },
              tryGetPubCidFromOldLocation(e, t) {
                if (!e.hasOwnProperty('pubcid')) {
                  const o = (0, s.A)(t, 'crumbs.pubcid');
                  o && (e['pubcid.org'] = o);
                }
              },
              getPlacementId: (e) => e.params.placementId.toString(),
              getPlacementIdOverrideFromGetParam() {
                const e = this.getGetParametersAsObject();
                if (e.hasOwnProperty('ozstoredrequest')) {
                  if (this.isValidPlacementId(e.ozstoredrequest))
                    return (
                      (0, n.logInfo)(`using GET ${y}storedrequest=` + e.ozstoredrequest + ' to replace placementId'),
                      e.ozstoredrequest
                    );
                  (0, n.logError)(`GET ${y}storedrequest FAILED VALIDATION - will not use it`);
                }
                return null;
              },
              getGetParametersAsObject() {
                const e = (0, n.parseUrl)((0, m.EN)().location);
                return ((0, n.logInfo)('getGetParametersAsObject found:', e.search), e.search);
              },
              blockTheRequest: () =>
                !1 === u.$W.getConfig('ozone.oz_request') &&
                ((0, n.logWarn)('Will not allow the auction : oz_request is set to false'), !0),
              getPageId: function () {
                if (null == this.propertyBag.pageId) {
                  let e = '';
                  const t = '0123456789abcdefghijklmnopqrstuvwxyz';
                  for (let o = 20; o > 0; o--) e += t[Math.floor(36 * Math.random())];
                  this.propertyBag.pageId = new Date().getTime() + '_' + e;
                }
                return this.propertyBag.pageId;
              },
              unpackVideoConfigIntoIABformat(e, t) {
                let o = { ext: {} };
                return ((o = this._unpackVideoConfigIntoIABformat(o, e)), (o = this._unpackVideoConfigIntoIABformat(o, t)), o);
              },
              _unpackVideoConfigIntoIABformat(e, t) {
                const o = [
                  'mimes',
                  'minduration',
                  'maxduration',
                  'protocols',
                  'w',
                  'h',
                  'startdelay',
                  'placement',
                  'plcmt',
                  'linearity',
                  'skip',
                  'skipmin',
                  'skipafter',
                  'sequence',
                  'battr',
                  'maxextended',
                  'minbitrate',
                  'maxbitrate',
                  'boxingallowed',
                  'playbackmethod',
                  'playbackend',
                  'delivery',
                  'pos',
                  'companionad',
                  'api',
                  'companiontype',
                ];
                for (const i in t) {
                  var r = !1;
                  (o.forEach(function (o) {
                    o === i && ((e[i] = t[i]), (r = !0));
                  }),
                    r || (e.ext[i] = t[i]));
                }
                return (
                  t.hasOwnProperty('ext') &&
                    'object' == typeof t.ext &&
                    (e.hasOwnProperty('ext') ? (e.ext = (0, n.mergeDeep)(e.ext, t.ext)) : (e.ext = t.ext)),
                  e
                );
              },
              addVideoDefaults(e, t, o) {
                const r = (t, o) => {
                  if (!t) return;
                  const r = this.getVideoPlacementValue((0, s.A)(t, 'context'));
                  r && (e.placement = r);
                  const i = (0, s.A)(t, 'skippable', null);
                  null == i ? o && !e.hasOwnProperty('skip') && (e.skip = 0) : (e.skip = i ? 1 : 0);
                };
                return (r(t, !1), r(o, !0), e);
              },
              getLoggableBidObject(e) {
                const t = {
                  ad: e.ad,
                  adId: e.adId,
                  adUnitCode: e.adUnitCode,
                  adm: e.adm,
                  adomain: e.adomain,
                  adserverTargeting: e.adserverTargeting,
                  auctionId: e.auctionId,
                  bidId: e.bidId,
                  bidder: e.bidder,
                  bidderCode: e.bidderCode,
                  cpm: e.cpm,
                  creativeId: e.creativeId,
                  crid: e.crid,
                  currency: e.currency,
                  h: e.h,
                  w: e.w,
                  impid: e.impid,
                  mediaType: e.mediaType,
                  params: e.params,
                  price: e.price,
                  transactionId: e.transactionId,
                  ttl: e.ttl,
                  ortb2: (0, s.A)(e, 'ortb2'),
                  ortb2Imp: (0, s.A)(e, 'ortb2Imp'),
                };
                return (e.hasOwnProperty('floorData') && (t.floorData = e.floorData), t);
              },
              pruneToExtPaths: function (e, { testKey: t = 'ext', maxTestDepth: o = 1 / 0 } = {}) {
                const r = (e) => e && 'object' == typeof e && !Array.isArray(e),
                  i = (e) => {
                    if (Array.isArray(e)) return e.map(i);
                    if (r(e)) {
                      const t = {};
                      for (const [o, r] of Object.entries(e)) t[o] = i(r);
                      return t;
                    }
                    return e;
                  },
                  n = (e) => null == e || (Array.isArray(e) ? 0 === e.length : !!r(e) && 0 === Object.keys(e).length);
                const s = (function e(r, s, a) {
                  if (null == r) return;
                  if ('object' != typeof r) return s ? r : void 0;
                  if (s) return i(r);
                  if (Array.isArray(r)) {
                    const t = r.map((t) => e(t, !1, a)).filter((e) => void 0 !== e && !n(e));
                    return t.length ? t : void 0;
                  }
                  const d = {};
                  for (const [i, s] of Object.entries(r)) {
                    const r = a + 1,
                      l = e(s, i === t && r <= o, r);
                    void 0 === l || n(l) || (d[i] = l);
                  }
                  return Object.keys(d).length ? d : void 0;
                })(e, !1, 0);
                return s ?? (Array.isArray(e) ? [] : {});
              },
            };
          function A(e) {
            if (!e)
              return (
                (0, n.logInfo)('defaultSize received empty bid obj! going to return fixed default size'),
                { defaultHeight: 250, defaultWidth: 300 }
              );
            const t = e.sizes || [],
              o = Array.isArray(t[0]) ? t[0] : t;
            return { defaultWidth: o[0], defaultHeight: o[1] };
          }
          function _(e, t) {
            let o = null,
              r = null;
            for (let i = 0; i < t.length; i++) {
              const n = t[i].bid,
                s = t[i].seat;
              for (let t = 0; t < n.length; t++)
                if (n[t].impid === e && (null == o || o.price < n[t].price)) {
                  ((o = n[t]), (r = s));
                  break;
                }
            }
            return { seat: r, bid: o };
          }
          function x(e, t, o, r) {
            const i = {};
            for (let n = 0; n < t.length; n++) {
              const s = t[n].bid,
                a = t[n].seat;
              for (let t = 0; t < s.length; t++)
                s[t].impid === e &&
                  (i.hasOwnProperty(a) ? i[a].price < s[t].price && (i[a] = z(s[t], o, r)) : ((i[a] = s[t]), (i[a] = z(s[t], o, r))));
            }
            return i;
          }
          function $(e, t) {
            const o = u.$W.getConfig(`mediaTypePriceGranularity.${t}`);
            let r = 'auto',
              i = u.$W.getConfig('customPriceBucket');
            if ('string' == typeof o) r = o;
            else if ('object' == typeof o) ((r = 'custom'), (i = o));
            else {
              const e = u.$W.getConfig('priceGranularity');
              ('string' == typeof e && (r = e), 'custom' === e && (r = 'custom'));
            }
            const s = (0, p.j)(e, i, u.$W.getConfig('currency.granularityMultiplier'));
            return (
              (0, n.logInfo)('getRoundedBid price:', e, 'mediaType:', t, 'bucketKey:', r),
              s[{ medium: 'med', custom: 'custom', high: 'high', low: 'low', dense: 'dense' }[r] || 'auto']
            );
          }
          function z(e, t, o) {
            return (
              (e.cpm = e.price),
              (e.bidId = e.impid),
              (e.requestId = e.impid),
              (e.width = e.w || t),
              (e.height = e.h || o),
              (e.ad = e.adm),
              (e.netRevenue = !0),
              (e.creativeId = e.crid),
              (e.currency = 'USD'),
              (e.ttl = 300),
              e
            );
          }
          function O(e) {
            (0, n.logInfo)('getPlayerSizeFromObject received object', e);
            let t = (0, s.A)(e, 'playerSize');
            return (
              t || (t = (0, s.A)(e, 'ext.playerSize')),
              t
                ? 'object' != typeof t
                  ? ((0, n.logError)('getPlayerSizeFromObject FAILED: playerSize is not an object/array', e), null)
                  : t
                : ((0, n.logError)('getPlayerSizeFromObject FAILED: no playerSize in video object or ext', e), null)
            );
          }
          let T;
          function D(e, t = {}) {
            if (!T) {
              T = c.A4.install({ url: v.getRendererUrl(), config: t, loaded: !1, adUnitCode: e });
              try {
                T.setRender(R);
              } catch (e) {
                (0, n.logError)('Prebid Error calling renderer.setRender', T, e);
              }
              (0, n.logInfo)('created renderer object');
            }
            return T;
          }
          function R(e) {
            ((0, n.logInfo)('outstreamRender got', (0, d.Go)(e)),
              e.renderer.push(() => {
                ((0, n.logInfo)('outstreamRender: Going to execute window.ozoneVideo.outstreamRender'),
                  window.ozoneVideo.outstreamRender(e));
              }));
          }
          ((0, l.a$)(v),
            (0, n.logInfo)(`*BidAdapter ${I} was loaded`),
            (0, i.E)('ozoneBidAdapter'),
            Object.assign(r.W1, {
              524: { purposes: [1, 2, 3, 4, 5, 6, 7, 9, 10], legIntPurposes: [], flexiblePurposes: [], specialFeatures: [1] },
            }));
        },
      },
      (e) => {
        e.O(0, [802, 7769, 5590, 1085, 5889], () => {
          return ((t = 7566), e((e.s = t)));
          var t;
        });
        e.O();
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [9831],
      {
        6051(e, o, r) {
          var a = r(1068),
            t = r(1129),
            n = r(1785),
            s = r(2354),
            i = r(7413),
            l = r(7449);
          const p = 'pairId',
            d = 'pairId',
            c = (0, s.vM)({ moduleType: l.fW, moduleName: p });
          function u(e) {
            return c.localStorageIsEnabled() ? c.getDataFromLocalStorage(e) : null;
          }
          function f(e) {
            return c.cookiesAreEnabled() ? c.getCookie(e) : null;
          }
          const g = {
            name: p,
            gvlid: 755,
            decode: (e) => (e && Array.isArray(e) ? { pairId: e } : void 0),
            getId(e) {
              const o = u(d) || f(d);
              let r = [];
              if (o && 'string' == typeof o)
                try {
                  r = r.concat(JSON.parse(atob(o)));
                } catch (e) {
                  (0, i.logInfo)(e);
                }
              const a = (e && e.params) || {};
              if (a && a.liveramp) {
                const e = a.liveramp.storageKey || '_lr_pairId',
                  o = u(e) || f(e);
                if (o)
                  try {
                    const e = atob(o);
                    if (e) {
                      const o = JSON.parse(e);
                      o && 'object' == typeof o && o.envelope
                        ? (r = r.concat(o.envelope))
                        : (0, i.logInfo)('Pairid: Parsed object is not valid or does not contain envelope');
                    } else (0, i.logInfo)('Pairid: Decoded value is empty');
                  } catch (e) {
                    (0, i.logInfo)('Pairid: Error parsing JSON: ', e);
                  }
                else (0, i.logInfo)('Pairid: liverampValue for pairId from storage is empty or null');
              }
              if (0 !== r.length) return { id: r };
              (0, i.logInfo)('PairId not found.');
            },
            eids: { pairId: { source: 'google.com', atype: 571187 } },
          };
          ((0, n.bz)('userId', g),
            (0, t.E)('pairIdSystem'),
            Object.assign(a.W1, {
              755: { purposes: [1, 3, 4], legIntPurposes: [2, 7, 9, 10], flexiblePurposes: [2, 7, 9, 10], specialFeatures: [] },
            }));
        },
      },
      (e) => {
        e.O(0, [802, 7769, 5590, 1085], () => {
          return ((o = 6051), e((e.s = o)));
          var o;
        });
        e.O();
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [3775],
      {
        2897(e, o, r) {
          var t = r(1129),
            n = r(7413),
            i = r(8928),
            a = r(3435),
            l = r(3350),
            s = r(8384),
            c = r(8964),
            d = r(3399),
            u = r(5521),
            f = r(1785),
            m = r(7686),
            p = r(5437),
            h = r(9015),
            g = r(80),
            y = r(2822),
            b = r(9200),
            v = r(828),
            F = r(9343),
            A = r(1464),
            S = r(1779),
            k = r(7449);
          const C = 'not_found',
            j = 'random',
            T = 'Price Floors',
            O = (0, c.er)(k.tp, 'priceFloors', 1e4),
            R = Symbol(),
            x = [R, 'gptSlot', 'adUnitCode', 'size', 'domain', 'mediaType'],
            $ = new Set();
          function E(e) {
            return 'string' == typeof e && $.has(e);
          }
          let M = !1,
            U = !1,
            I = {};
          const B = (0, A.L)();
          let D = {};
          const w = (() => {
            let e;
            return function () {
              return (null == e && (e = (0, n.parseUrl)((0, m.EN)().topmostLocation, { noDecodeWholeURL: !0 }).hostname), e);
            };
          })();
          function z(e, o, { index: r = h.n.index } = {}) {
            return e?.adUnitCode || r.getAdUnit(o).code;
          }
          const W = {
            [R]: () => '*',
            size: (e, o) => (0, n.parseGPTSingleSizeArray)(o.size) || '*',
            mediaType: (e, o) => o.mediaType || 'banner',
            gptSlot: (e, o) =>
              (function (e, { index: o = h.n.index } = {}) {
                const r = o.getAdUnit({ adUnitId: e });
                return 'gam' === (0, i.A)(r, 'ortb2Imp.ext.data.adserver.name') && r.ortb2Imp.ext.data.adserver.adslot;
              })((e || o).adUnitId) || (0, v.p)(z(e, o)).gptSlot,
            domain: w,
            adUnitCode: (e, o) => z(e, o),
          };
          function q(e, o, r) {
            if (!e.length) return [];
            let t = {};
            return (
              e.filter(E).length > 0 &&
                I.userIds &&
                (t = (function (e, o) {
                  if (!e || !o?.userIdAsEid?.length) return {};
                  const r = o.userIdAsEid.reduce((e, o) => (o?.source && e.add(o.source), e), new Set());
                  return Object.entries(e).reduce((e, [o, t]) => {
                    const n = Array.isArray(t) && t.some((e) => r.has(e));
                    return ((e[`userId.${o}`] = n ? 1 : 0), e);
                  }, {});
                })(I.userIds, o)),
              e.reduce((e, n) => {
                let i;
                return ((i = E(n) ? String(t[n] ?? '*') : W[n](o, r) || '*'), e.push('*' === i ? ['*'] : [i.toLowerCase(), '*']), e);
              }, [])
            );
          }
          function P(e, o, r = {}) {
            const t = q((0, i.A)(e, 'schema.fields') || [], o, r);
            if (!t.length) return { matchingFloor: void 0 };
            const n = t.map((e) => e[0]).join('-'),
              l = (0, i.A)(e, `matchingInputs.${n}`);
            if (l) return { ...l };
            const s =
              ((c = t),
              (d = (0, i.A)(e, 'schema.delimiter') || '|'),
              c
                .reduce((e, o) => {
                  const r = [];
                  return (
                    e.forEach((e) => {
                      o.forEach((o) => {
                        r.push(e + d + o);
                      });
                    }),
                    r
                  );
                })
                .sort((e, o) => e.split('*').length - o.split('*').length));
            var c, d;
            const u = (s || []).find((o) => e.values.hasOwnProperty(o)),
              f = {
                floorMin: e.floorMin || 0,
                floorRuleValue: e.values[u],
                matchingData: s[0],
                matchingRule: u === e.meta?.defaultRule ? void 0 : u,
              },
              m = (0, i.A)(o, 'ortb2Imp.ext.prebid.floors.floorMin');
            return (
              'number' == typeof m && (f.floorMin = m),
              (f.matchingFloor = Math.max(f.floorMin, f.floorRuleValue)),
              (0, a.J)(e, `matchingInputs.${n}`, { ...f }),
              f
            );
          }
          function V(e, o, r) {
            return parseFloat((0, b.y)(e, { ...o, cpm: e }, r));
          }
          const G = {
            banner: (e) => (0, i.A)(e, 'mediaTypes.banner.sizes') || [],
            video: (e) => (0, i.A)(e, 'mediaTypes.video.playerSize') || [],
            native: (e) => ((0, i.A)(e, 'mediaTypes.native.image.sizes') ? [(0, i.A)(e, 'mediaTypes.native.image.sizes')] : []),
          };
          function N(e = { currency: 'USD', mediaType: '*', size: '*' }) {
            const o = this,
              r = D[o.auctionId];
            if (!r || r.skipped) return {};
            e = (function (e, o) {
              const r = Object.keys(e.mediaTypes || {});
              return (
                '*' === o.mediaType && 1 === r.length && (o.mediaType = r[0]),
                '*' === o.size &&
                  -1 !== r.indexOf(o.mediaType) &&
                  G[o.mediaType] &&
                  1 === G[o.mediaType](e).length &&
                  (o.size = G[o.mediaType](e)[0]),
                o
              );
            })(o, e);
            const i = P(r.data, { ...o }, { mediaType: e.mediaType, size: e.size });
            let a = e.currency || r.data.currency;
            if (i.matchingFloor && a !== r.data.currency)
              try {
                i.matchingFloor = (0, t.m)().convertCurrency(i.matchingFloor, r.data.currency, a);
              } catch (e) {
                ((0, n.logWarn)(
                  `${T}: Unable to get currency conversion for getFloor for bidder ${o.bidder}. You must have currency module enabled with defaultRates in your currency config`,
                ),
                  (a = r.data.currency));
              }
            if (r.enforcement.bidAdjustment && i.matchingFloor) {
              const r = p.u.get(o.bidder, 'inverseBidAdjustment');
              if (r) {
                const t = Object.fromEntries(Object.entries(e).filter(([e, o]) => '*' !== o && ['mediaType', 'size'].includes(e)));
                i.matchingFloor = r(i.matchingFloor, o, t);
              } else {
                const e = V(i.matchingFloor, null, o);
                i.matchingFloor = e
                  ? (function (e, o) {
                      const r = Math.pow(10, 10);
                      return (((e * r) / (o * r)) * (e * r)) / r;
                    })(i.matchingFloor, e)
                  : i.matchingFloor;
              }
            }
            return null === i.floorRuleValue
              ? null
              : i.matchingFloor
                ? {
                    floor: ((l = i.matchingFloor), (s = 4), Math.ceil((parseFloat(l) * Math.pow(10, s)).toFixed(1)) / Math.pow(10, s)),
                    currency: a,
                  }
                : {};
            var l, s;
          }
          function J(e, o) {
            const r = (0, l.Go)(e);
            return (
              (r.schema.delimiter = e.schema.delimiter || '|'),
              (r.values = (function (e, o) {
                const r = e.schema.fields,
                  t = e.schema.delimiter,
                  n = o && -1 === r.indexOf('adUnitCode') && r.unshift('adUnitCode');
                return Object.keys(e.values).reduce((r, i) => ((r[(n ? `${o}${t}${i}` : i).toLowerCase()] = e.values[i]), r), {});
              })(r, o)),
              (r.currency = r.currency || 'USD'),
              r
            );
          }
          function L(e, o) {
            const r = (0, l.Go)(I);
            if (2 === (0, i.A)(r, 'data.floorsSchemaVersion')) {
              const { modelGroups: e, ...o } = r.data;
              r.data = Object.assign(
                o,
                (function (e, o) {
                  let r = Math.floor(Math.random() * o + 1);
                  for (let o = 0; o < e.length; o++) if (((r -= e[o].modelWeight), r <= 0)) return e[o];
                })(e, o.modelWeightSum),
              );
            }
            const t = 0 === Object.keys((0, i.A)(r, 'data.values') || {}).length;
            if (
              ((r.data = t
                ? (function (e) {
                    const o = e.find((e) => null != e.floors?.schema);
                    return e.reduce((e, r) => {
                      if (null != r.floors?.schema && !(0, n.deepEqual)(r.floors.schema, o?.floors?.schema))
                        return (
                          (0, n.logError)(
                            `${T}: adUnit '${r.code}' declares a different schema from one previously declared by adUnit '${o.code}'. Floor config for '${r.code}' will be ignored.`,
                          ),
                          e
                        );
                      const t = Object.assign({}, o?.floors, { values: void 0 }, r.floors);
                      if (Z(t))
                        if (e.values) {
                          const o = J(t, r.code).values;
                          Object.assign(e.values, o);
                        } else (e = J(t, r.code)).location = 'adUnit';
                      else
                        null != r.floors &&
                          (0, n.logWarn)(
                            `adUnit '${r.code}' provides an invalid \`floor\` definition, it will be ignored for floor calculations`,
                            r,
                          );
                      return e;
                    }, {});
                  })(e)
                : J(r.data)),
              0 === Object.keys((0, i.A)(r, 'data.values') || {}).length)
            )
              ((r.skipped = !0), (r.skippedReason = C));
            else {
              const e = (0, n.getParameterByName)('pbjs_skipRate') || ((0, i.A)(r, 'data.skipRate') ?? r.skipRate),
                o = 100 * Math.random() < parseFloat(e);
              ((r.skipped = o), o && (r.skippedReason = j));
            }
            return (
              r.hasOwnProperty('floorMin') && (r.data.floorMin = r.floorMin),
              (function (e, o, r) {
                const t = (function (e) {
                  const { data: o, enforcement: r } = e;
                  return o?.noFloorSignalBidders?.length > 0
                    ? o.noFloorSignalBidders
                    : r?.noFloorSignalBidders?.length > 0
                      ? r.noFloorSignalBidders
                      : [];
                })(o);
                e.forEach((e) => {
                  e.bids?.forEach((e) => {
                    const a = t.some((o) => o === e.bidder);
                    (o.skipped || a ? (a && (0, n.logInfo)(`noFloorSignal to ${e.bidder}`), delete e.getFloor) : (e.getFloor = N),
                      (e.auctionId = r),
                      (e.floorData = {
                        noFloorSignaled: a,
                        skipped: o.skipped,
                        skipRate: (0, i.A)(o, 'data.skipRate') ?? o.skipRate,
                        skippedReason: o.skippedReason,
                        floorMin: o.floorMin,
                        modelVersion: (0, i.A)(o, 'data.modelVersion'),
                        modelWeight: (0, i.A)(o, 'data.modelWeight'),
                        modelTimestamp: (0, i.A)(o, 'data.modelTimestamp'),
                        location: (0, i.A)(o, 'data.location', 'noData'),
                        floorProvider: o.floorProvider,
                        fetchStatus: I.fetchStatus,
                      }));
                  });
                });
              })(e, r, o),
              r
            );
          }
          function Y(e) {
            e.hasExited ||
              ((e.reqBidsConfigObj.auctionId = e.reqBidsConfigObj.auctionId || (0, n.generateUUID)()),
              (D[e.reqBidsConfigObj.auctionId] = L(e.reqBidsConfigObj.adUnits || (0, t.m)().adUnits, e.reqBidsConfigObj.auctionId)),
              e.nextFn.apply(e.context, [e.reqBidsConfigObj]),
              (e.hasExited = !0));
          }
          function _(e) {
            return (
              (e = (function (e) {
                if ((0, l.Et)(e.default)) {
                  let o = '*';
                  const r = (e.schema?.fields || []).length;
                  (r
                    ? (o = Array(r)
                        .fill('*')
                        .join(e.schema?.delimiter || '|'))
                    : (0, a.J)(e, 'schema.fields', [R]),
                    (e.values = e.values || {}),
                    null == e.values[o] && ((e.values[o] = e.default), (e.meta = { defaultRule: o })));
                }
                return e;
              })(e)),
              !!(function (e) {
                if (Array.isArray(e) && e.length > 0) {
                  if (e.every((e) => x.includes(e) || E(e))) return !0;
                  (0, n.logError)(`${T}: Fields received do not match allowed fields`);
                }
                return !1;
              })((0, i.A)(e, 'schema.fields')) &&
                ((o = e),
                (r = e.schema.fields.length),
                (t = e.schema.delimiter || '|'),
                'object' == typeof o.values &&
                  ((o.values = Object.keys(o.values).reduce(
                    (e, n) => (
                      (function (e, o, r, t) {
                        return 'string' == typeof e && e.split(t).length === r && ('number' == typeof o || null === o);
                      })(n, o.values[n], r, t) && (e[n] = o.values[n]),
                      e
                    ),
                    {},
                  )),
                  Object.keys(o.values).length > 0))
            );
            var o, r, t;
          }
          const H = {
            1: (e) => _(e),
            2: (e) =>
              !(!Array.isArray(e.modelGroups) || 0 === e.modelGroups.length) &&
              ((e.modelWeightSum = 0),
              e.modelGroups.every((o) => !('number' != typeof o.modelWeight || !_(o)) && ((e.modelWeightSum += o.modelWeight), !0))),
          };
          function Z(e) {
            return (
              'object' == typeof e &&
              ((e.floorsSchemaVersion = e.floorsSchemaVersion || 1),
              'function' != typeof H[e.floorsSchemaVersion]
                ? ((0, n.logError)(`${T}: Unknown floorsSchemaVersion: `, e.floorsSchemaVersion), !1)
                : H[e.floorsSchemaVersion](e))
            );
          }
          function K(e, o) {
            if (e && 'object' == typeof e && Z(e))
              return ((0, n.logInfo)(`${T}: A ${o} set the auction floor data set to `, e), { ...e, location: o });
            (0, n.logError)(`${T}: The floors data did not contain correct values`, e);
          }
          const Q = (0, y.Ak)('priceFloors', function (e, o) {
            const r = { reqBidsConfigObj: o, context: this, nextFn: e, hasExited: !1, timer: null };
            I.auctionDelay > 0 && M
              ? B.submit(
                  I.auctionDelay,
                  () => Y(r),
                  () => {
                    ((0, n.logWarn)(`${T}: Fetch attempt did not return in time for auction`), (I.fetchStatus = 'timeout'), Y(r));
                  },
                )
              : Y(r);
          });
          function X(e) {
            let o;
            ((M = !1), (I.fetchStatus = 'success'));
            try {
              o = JSON.parse(e);
            } catch (r) {
              o = e;
            }
            const r = K(o, 'fetch');
            (r &&
              ((I.data = r),
              (I.skipRate = (0, l.Et)(r.skipRate) ? r.skipRate : I.skipRate),
              (I.floorProvider = r.floorProvider || I.floorProvider)),
              B.resume());
          }
          function ee(e) {
            ((M = !1), (I.fetchStatus = 'error'), (0, n.logError)(`${T}: Fetch errored with: `, e), B.resume());
          }
          function oe(e) {
            var o;
            ((I = (0, n.pick)(e, [
              'floorMin',
              'enabled',
              (e) => !1 !== e,
              'auctionDelay',
              (e) => e || 0,
              'floorProvider',
              (o) => (0, i.A)(e, 'data.floorProvider', o),
              'endpoint',
              (e) => e || {},
              'skipRate',
              () => (isNaN((0, i.A)(e, 'data.skipRate')) ? e.skipRate || 0 : e.data.skipRate),
              'userIds',
              ne,
              'enforcement',
              (e) =>
                (0, n.pick)(e || {}, [
                  'enforceJS',
                  (e) => !1 !== e,
                  'enforceBidders',
                  (e) => (Array.isArray(e) && e.length > 0 ? e : ['*']),
                  'enforcePBS',
                  (e) => !0 === e,
                  'floorDeals',
                  (e) => !0 === e,
                  'bidAdjustment',
                  (e) => !1 !== e,
                  'noFloorSignalBidders',
                  (e) => e || [],
                ]),
              'additionalSchemaFields',
              (e) => {
                return 'object' == typeof e && Object.keys(e).length > 0
                  ? ((o = e),
                    void Object.keys(o).forEach((e) => {
                      -1 === x.indexOf(e) && 'function' == typeof o[e] && (x.push(e), (W[e] = o[e]));
                    }))
                  : void 0;
                var o;
              },
              'data',
              (e) => (e && K(e, 'setConfig')) || void 0,
            ])),
              I.enabled
                ? ((o = I.endpoint).url && !M
                    ? 'GET' !== (o.method || 'GET')
                      ? (0, n.logError)(`${T}: 'GET' is the only request method supported at this time!`)
                      : (O(o.url, { success: X, error: ee }, null, { method: 'GET' }), (M = !0))
                    : M && (0, n.logWarn)(`${T}: A fetch is already occurring. Skipping.`),
                  U ||
                    (d.on(u.qY.AUCTION_END, (e) => {
                      setTimeout(() => delete D[e.auctionId], 3e3);
                    }),
                    (0, f.Yn)('requestBids').before(Q, 50),
                    (0, f.Yn)('addBidResponse').before(re, (0, n.debugTurnedOn)() ? 4 : 50),
                    (U = !0)))
                : ((0, n.logInfo)(`${T}: Turning off module`),
                  (I = {}),
                  (D = {}),
                  (0, f.Yn)('addBidResponse').getHooks({ hook: re }).remove(),
                  (0, f.Yn)('requestBids').getHooks({ hook: Q }).remove(),
                  (U = !1)));
          }
          const re = (0, y.NL)('priceFloors', function (e, o, r, a) {
            const l = D[r.auctionId];
            if (!l || !r || l.skipped) return e.call(this, o, r, a);
            const s = h.n.index.getBidRequest(r),
              c = P(l.data, s, { ...r, size: [r.width, r.height] });
            if (!c.matchingFloor)
              return (
                0 !== c.matchingFloor && (0, n.logWarn)(`${T}: unable to determine a matching price floor for bidResponse`, r),
                e.call(this, o, r, a)
              );
            let d;
            const f = l.data.currency.toUpperCase(),
              m = r.currency || 'USD';
            if (f === m.toUpperCase()) d = r.cpm;
            else if (r.originalCurrency && f === r.originalCurrency.toUpperCase()) d = r.originalCpm;
            else
              try {
                d = (0, t.m)().convertCurrency(r.cpm, m.toUpperCase(), f);
              } catch (t) {
                return (
                  (0, n.logError)(
                    `${T}: Unable do get currency conversion for bidResponse to Floor Currency. Do you have Currency module enabled? ${r}`,
                  ),
                  e.call(this, o, r, a)
                );
              }
            return (
              (d = V(d, r, s)),
              (function (e, o, r, t) {
                ((r.floorData = {
                  floorValue: o.matchingFloor,
                  floorRule: o.matchingRule,
                  floorRuleValue: o.floorRuleValue,
                  floorCurrency: e.data.currency,
                  cpmAfterAdjustments: t,
                  enforcements: { ...e.enforcement },
                  matchedFields: {},
                }),
                  e.data.schema.fields.forEach((t, n) => {
                    const i = o.matchingData.split(e.data.schema.delimiter)[n];
                    r.floorData.matchedFields[t] = i;
                  }));
              })(l, c, r, d),
              (function (e, o, r) {
                const t = !1 !== (0, i.A)(e, 'enforcement.enforceJS'),
                  n = (0, i.A)(e, 'enforcement.enforceBidders') || ['*'],
                  a = r?.adapterCode || r?.bidderCode || r?.bidder,
                  l = n.includes('*') || (null != a && n.includes(a)),
                  s = !0 === (0, i.A)(e, 'enforcement.floorDeals') || !r.dealId,
                  c = r.floorData.cpmAfterAdjustments < o.matchingFloor;
                return t && l && c && s;
              })(l, c, r)
                ? (a(u.Tf.FLOOR_NOT_MET),
                  void (0, n.logWarn)(
                    `${T}: ${r.bidderCode}'s Bid Response for ${o} was rejected due to floor not met (adjusted cpm: ${r?.floorData?.cpmAfterAdjustments}, floor: ${c?.matchingFloor})`,
                    r,
                  ))
                : e.call(this, o, r, a)
            );
          });
          function te(e, { currency: o = s.$W.getConfig('currency.adServerCurrency') || 'USD', mediaType: r = '*', size: t = '*' }, i) {
            if ('function' == typeof e.getFloor) {
              let a;
              try {
                a = e.getFloor({ currency: o, mediaType: r, size: t }) || {};
              } catch (o) {
                return void (0, n.logWarn)('Cannot compute floor for bid', e);
              }
              ((a.floor = parseFloat(a.floor)), null != a.currency && a.floor && !isNaN(a.floor) && i(a.floor, a.currency));
            }
          }
          function ne(e) {
            if (!e || 'object' != typeof e) return {};
            $.clear();
            return Object.entries(e).some(([e, o]) => !Array.isArray(o) || ($.add(`userId.${e}`), !1)) ? ($.clear(), {}) : e;
          }
          (s.$W.getConfig('floors', (e) => oe(e.floors)),
            (0, g.pS)({
              type: g.Tb,
              name: 'bidfloor',
              fn: function (e, o, r) {
                te(o, { currency: r.currency, mediaType: r.mediaType || '*', size: '*' }, (o, r) => {
                  Object.assign(e, { bidfloor: o, bidfloorcur: r });
                });
              },
            }),
            (0, g.pS)({
              type: g.Tb,
              name: 'extBidfloor',
              fn: function (e, o, r) {
                function t(o, r) {
                  (o === e.bidfloor && r === e.bidfloorcur) || ((0, a.J)(this, 'ext.bidfloor', o), (0, a.J)(this, 'ext.bidfloorcur', r));
                }
                (Object.values(S.GE)
                  .filter((o) => null != e[o])
                  .forEach((n) => {
                    te(o, { currency: e.bidfloorcur || r?.currency, mediaType: n }, t.bind(e[n]));
                  }),
                  (e[S.D4]?.format || [])
                    .filter(({ w: e, h: o }) => null != e && null != o)
                    .forEach((n) => {
                      te(o, { currency: e.bidfloorcur || r?.currency, mediaType: S.D4, size: [n.w, n.h] }, t.bind(n));
                    }));
              },
              priority: -10,
            }),
            (0, g.pS)({
              type: g.Tb,
              name: 'extPrebidFloors',
              fn: function (e, o, r) {
                if (null != e.bidfloor) {
                  let { floorMinCur: o, floorMin: t } = r.reqContext.floorMin || {};
                  null == o && (o = e.bidfloorcur);
                  const n = e.ext?.prebid?.floors?.floorMinCur || e.ext?.prebid?.floorMinCur || o,
                    i = e.ext?.prebid?.floors?.floorMin || e.ext?.prebid?.floorMin,
                    l = (0, F.hZ)(e.bidfloor, e.bidfloorcur, o),
                    s = !(!i || !n) && (0, F.hZ)(i, n, o),
                    c = s && s < l ? s : l;
                  ((0, a.J)(e, 'ext.prebid.floors.floorMin', c),
                    (null == t || t > c) && (t = c),
                    (r.reqContext.floorMin = { floorMin: t, floorMinCur: o }));
                }
              },
              dialects: [g.e4],
              priority: -1,
            }),
            (0, g.pS)({
              type: g.S3,
              name: 'extPrebidFloors',
              fn: function (e, o, r) {
                (U && (0, a.J)(e, 'ext.prebid.floors.enabled', e.ext?.prebid?.floors?.enabled || !1),
                  r?.floorMin && (0, n.mergeDeep)(e, { ext: { prebid: { floors: r.floorMin } } }));
              },
              dialects: [g.e4],
            }),
            (0, t.E)('priceFloors'));
        },
      },
      (e) => {
        e.O(0, [802, 7769, 5590, 1085, 3005, 5957, 1225], () => {
          return ((o = 2897), e((e.s = o)));
          var o;
        });
        e.O();
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [6041],
      {
        6939(d, e, n) {
          var o = n(1129),
            s = n(1785),
            i = n(7413),
            t = n(3350);
          const r = {
            name: 'pubProvidedId',
            gvlid: n(1068).B1,
            decode(d) {
              const e = d ? { pubProvidedId: d } : void 0;
              return ((0, i.logInfo)('PubProvidedId: Decoded value ' + JSON.stringify(e)), e);
            },
            getId(d) {
              const e = (d && d.params) || {};
              let n = [];
              return (
                (0, t.cy)(e.eids) && (n = n.concat(e.eids)),
                'function' == typeof e.eidsFunction && (n = n.concat(e.eidsFunction())),
                { id: n }
              );
            },
          };
          ((0, s.bz)('userId', r), (0, o.E)('pubProvidedIdSystem'));
        },
      },
      (d) => {
        d.O(0, [802, 7769, 5590, 1085], () => {
          return ((e = 6939), d((d.s = e)));
          var e;
        });
        d.O();
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [6776],
      {
        1744(e, r, s) {
          var t = s(1068),
            n = s(1129),
            i = s(1785),
            a = s(2354),
            p = s(8964),
            c = s(7413),
            o = s(7449);
          const u = p.RD.withCallers([['userId', 'publinkId']]),
            l = 'publinkId',
            d = (0, a.vM)({ moduleType: o.fW, moduleName: l });
          function h(e = {}, r, s) {
            return function (t) {
              const n = { method: 'GET', withCredentials: !0 },
                i = function (e, r) {
                  if (200 === r.status) {
                    const r = JSON.parse(e);
                    r && t(r.publink);
                  }
                };
              var a;
              (e.params && e.params.e && ((a = e.params.e), /^[A-F0-9]+$/i.test(a))) || s
                ? u(
                    (function (e, r, s) {
                      const t = (0, c.parseUrl)('https://proc.ad.cpe.dotomi.com/cvx/client/sync/publink/refresh');
                      ((t.search = { mpn: 'Prebid.js', mpv: '11.23.0' }),
                        r?.gdpr && ((t.search.gdpr = r.gdpr.gdprApplies ? 1 : 0), (t.search.gdpr_consent = r.gdpr.consentString)),
                        e &&
                          (e.e && ((t.search.deh = e.e), (t.pathname = '/cvx/client/sync/publink')),
                          e.site_id && (t.search.sid = e.site_id),
                          e.api_key && (t.search.apikey = e.api_key)),
                        s && (t.search.publink = s));
                      const n = r?.usp;
                      return (n && 'string' == typeof n && (t.search.us_privacy = n), (0, c.buildUrl)(t));
                    })(e.params, r, s),
                    i,
                    void 0,
                    n,
                  )
                : e.params.e && (0, c.logError)('params.e must be a hex string');
            };
          }
          const b = {
            name: l,
            gvlid: 24,
            decode: (e) => ({ publinkId: e }),
            getId: function (e, r, s) {
              const t = (function () {
                let e;
                function r(e) {
                  let r;
                  if ((d.hasLocalStorage() && (r = d.getDataFromLocalStorage(e)), r || (r = d.getCookie(e)), 'string' == typeof r)) {
                    if ('{' !== r.charAt(0)) return r;
                    try {
                      const e = JSON.parse(r);
                      if (e) return e.publink;
                    } catch (e) {
                      (0, c.logError)(e);
                    }
                  }
                }
                return ((e = r('_publink_srv')), e || (e = r('_publink')), e);
              })();
              return t ? { id: t } : { callback: h(e, r, s) };
            },
            eids: { publinkId: { source: 'epsilon.com', atype: 3 } },
          };
          ((0, i.bz)('userId', b),
            (0, n.E)('publinkIdSystem'),
            Object.assign(t.W1, {
              24: { purposes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], legIntPurposes: [], flexiblePurposes: [], specialFeatures: [] },
            }));
        },
      },
      (e) => {
        e.O(0, [802, 7769, 5590, 1085], () => {
          return ((r = 1744), e((e.s = r)));
          var r;
        });
        e.O();
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [1252],
      {
        670(e, t, r) {
          var i = r(1068),
            o = r(1129),
            n = r(7413),
            a = r(8928),
            s = r(3435),
            d = r(3350),
            l = r(2682),
            c = r(1779),
            p = r(8384),
            u = r(6901),
            m = r(118),
            g = r(5437),
            f = r(6271),
            b = r(5521),
            h = r(8870),
            y = r(3119),
            v = r(5262);
          const w = 'PubMatic: ',
            x = void 0,
            I = 'https://pubmatic.bbvms.com/r/'.concat('$RENDERER', '.js'),
            O = Object.values(b.h0),
            j = !0,
            $ = { kadpageurl: '', gender: '', yob: '', lat: '', lon: '', wiid: '' },
            _ = { 1: 'PMP', 5: 'PREF', 6: 'PMPG' },
            C = { banner: 360, video: 1800, native: 1800 };
          let R,
            k = {},
            E = [],
            P = [],
            U = 0;
          const A = (0, f.A)({
              context: { netRevenue: !0, ttl: 360 },
              imp(e, t, r) {
                const { kadfloor: i, currency: o, adSlot: n = '', deals: a, dctr: s, pmzoneid: d, hashedKey: l } = t.params,
                  { adUnitCode: c, mediaTypes: p, rtd: u, ortb2: m } = t,
                  g = e(t, r);
                if (!g.hasOwnProperty('banner') && !g.hasOwnProperty('video') && !g.hasOwnProperty('native')) return null;
                ((g.ext = g.ext || {}), (g.ext.pbcode = c), a && (0, h.k)(g, a, w), s && (0, h.z)(g, s, w));
                const f = T(m);
                if (f) {
                  const e = Object.values(f).filter(Boolean);
                  e.length && (g.ext.key_val = g.ext.key_val ? `${g.ext.key_val}|${e.join('|')}` : e.join('|'));
                }
                return (
                  u?.jwplayer && B(g, u.jwplayer),
                  (g.bidfloor = K('kadfloor', i)),
                  (g.bidfloorcur = o ? K('currency', o) : 'USD'),
                  W(g, t),
                  g.hasOwnProperty('banner') && N(g.banner, n),
                  g.hasOwnProperty('video') && F(p?.video, c, g),
                  g.hasOwnProperty('native') && z(g, p?.native),
                  (g.hasOwnProperty('banner') || g.hasOwnProperty('video')) && ee(g, t, t?.sizes),
                  d && (g.ext.pmZoneId = d),
                  M(g, n.trim(), l),
                  S(g),
                  null != g.ext?.ae && delete g.ext.ae,
                  null != g.ext?.igs && delete g.ext.igs,
                  null != g.ext?.paapi && delete g.ext.paapi,
                  ['banner', 'video', 'native'].forEach((e) => {
                    g[e]?.battr && !Array.isArray(g[e].battr) && delete g[e].battr;
                  }),
                  g
                );
              },
              request(e, t, r, i) {
                const o = (function (e, t) {
                    return e;
                    const r = {};
                    return (
                      t.bids.forEach((t) => {
                        const i = e.find((e) => e.id === t.bidId);
                        if (!i) return;
                        const o = t.adUnitId;
                        if (!r[o]) return void (r[o] = (0, d.Go)(i));
                        const n = r[o];
                        (0, d.O8)(i.tagid) && (n.tagid = i.tagid);
                        const a = (e, t, r) => {
                          i[e] &&
                            i[e][t] &&
                            (n[e] || (n[e] = {}),
                            r ? (n[e][t] || (n[e][t] = []), (n[e][t] = [...n[e][t], ...i[e][t]])) : (n[e][t] = i[e][t]));
                        };
                        (a('ext', 'key_val', !1), a('ext', 'pmZoneId', !1), a('pmp', 'deals', !0));
                      }),
                      Object.values(r)
                    );
                  })(t, r),
                  n = e(o, r, i);
                if (E.length || n.bcat) {
                  const e = Z([...(E || []), ...(n.bcat || [])]);
                  e.length && (n.bcat = e);
                }
                if (P.length || n.acat) {
                  const e = V([...(P || []), ...(n.acat || [])]);
                  e.length && (n.acat = e);
                }
                (G(n), J(n, i?.bidRequests), X(n, r));
                return (
                  (r?.bidderCode ? g.u.get(r.bidderCode, 'allowAlternateBidderCodes') : void 0) && D(n, r),
                  r?.ortb2?.ext?.prebid?.previousauctioninfo &&
                    (0, s.J)(n, 'ext.previousAuctionInfo', r.ortb2.ext.prebid.previousauctioninfo),
                  n
                );
              },
              bidResponse(e, t, r) {
                const i = e(t, r);
                (i.meta && (i.meta.mediaType = i.mediaType), L(i, t, r));
                const { mediaType: o, playerWidth: a, playerHeight: s } = i,
                  { params: d, adUnitCode: l, mediaTypes: p } = r?.bidRequest;
                if (o === c.G_) {
                  (i.width || (i.width = a), i.height || (i.height = s));
                  const { context: e } = p[o];
                  'outstream' === e &&
                    d.outstreamAU &&
                    l &&
                    ((i.rendererCode = d.outstreamAU), (i.renderer = H.newRenderer(i.rendererCode, l)));
                }
                if (o === c.s6 && t.adm) {
                  try {
                    const e = JSON.parse(t.adm.replace(/\\/g, ''));
                    i.native = { ortb: { ...e.native } };
                  } catch (e) {
                    return void (0, n.logWarn)(`${w}Error: Cannot parse native response for ad response: ${t.adm}`);
                  }
                  ((i.width = t.w || 0), (i.height = t.h || 0));
                }
                return i;
              },
              response: (e, t, r, i) => e(t, r, i),
              overrides: { imp: { bidfloor: !1, extBidfloor: !1 }, bidResponse: { native: !1 } },
            }),
            T = (e) => {
              const t = e?.user?.ext?.data?.im_segments,
                r = e?.site?.ext?.data?.['ias-brand-safety'],
                i = t && (0, d.cy)(t) && t.length,
                o = 'object' == typeof r && Object.keys(r).length,
                n = {};
              return (
                i && (n.im_segments = `im_segments=${t.join(',')}`),
                o &&
                  (n['ias-brand-safety'] = Object.entries(r)
                    .map(([e, t]) => `${e}=${t}`)
                    .join('|')),
                Object.keys(n).length ? n : void 0
              );
            };
          const q = (e) => {
              const t = {};
              if (e.aspect_ratios && (0, d.cy)(e.aspect_ratios) && e.aspect_ratios.length) {
                const { min_width: r, min_height: i } = e.aspect_ratios[0];
                ((0, d.Fq)(r) && (0, d.Fq)(i) && ((t.wmin = r), (t.hmin = i)),
                  (t.ext = {
                    aspectratios: e.aspect_ratios
                      .filter(({ ratio_width: e, ratio_height: t }) => e && t)
                      .map(({ ratio_width: e, ratio_height: t }) => `${e}:${t}`),
                  }));
              }
              return (
                (t.w = e.w || e.width),
                (t.h = e.h || e.height),
                e.sizes &&
                  2 === e.sizes.length &&
                  (0, d.Fq)(e.sizes[0]) &&
                  (0, d.Fq)(e.sizes[1]) &&
                  ((t.w = e.sizes[0]), (t.h = e.sizes[1]), delete t.wmin, delete t.hmin),
                e.ext && (t.ext = e.ext),
                e.mimes && (t.mimes = e.mimes),
                t
              );
            },
            S = (e) => {
              ((e.displaymanager ||= 'Prebid.js'), (e.displaymanagerver ||= '11.23.0'));
              const t = e.ext?.data?.adserver?.adslot;
              (t && (e.ext.dfp_ad_unit_code = t), e.ext?.data && 0 === Object.keys(e.ext.data).length && delete e.ext.data);
            };
          const W = (e, t) => {
              let r = -1;
              const i = Object.keys(t.mediaTypes),
                o = i.length > 1;
              ('function' != typeof t.getFloor ||
                p.$W.getConfig('pubmatic.disableFloors') ||
                [c.D4, c.G_, c.s6].forEach((i) => {
                  if (!e.hasOwnProperty(i)) return;
                  ((('banner' === i ? e[i]?.format?.map(({ w: e, h: t }) => [e, t]) : ['*']) || ['*']).forEach((a) => {
                    const s = t.getFloor({ currency: e.bidfloorcur, mediaType: i, size: a });
                    if (
                      ((0, n.logInfo)(
                        w,
                        'floor from floor module returned for mediatype:',
                        i,
                        ' and size:',
                        a,
                        ' is: currency',
                        s.currency,
                        'floor',
                        s.floor,
                      ),
                      (0, d.Qd)(s) && s?.currency === e.bidfloorcur && !isNaN(parseInt(s.floor)))
                    ) {
                      const t = parseFloat(s.floor);
                      (o &&
                        i !== c.D4 &&
                        ((0, n.logInfo)(
                          w,
                          'floor from floor module returned for mediatype:',
                          i,
                          'is : ',
                          t,
                          'with currency :',
                          e.bidfloorcur,
                        ),
                        (e[i].ext = { bidfloor: t, bidfloorcur: e.bidfloorcur })),
                        (0, n.logInfo)(w, 'floor from floor module:', t, 'previous floor value', r, 'Min:', Math.min(t, r)),
                        (r = -1 === r ? t : Math.min(t, r)),
                        (0, n.logInfo)(w, 'new floor value:', r));
                    }
                  }),
                    o && i === c.D4 && (e[i].ext = { bidfloor: r, bidfloorcur: e.bidfloorcur }));
                }),
                e.bidfloor &&
                  ((0, n.logInfo)(
                    w,
                    'Comparing floors:',
                    'from floor module:',
                    r,
                    'impObj.bidfloor:',
                    e.bidfloor,
                    'Max:',
                    Math.max(r, e.bidfloor),
                  ),
                  (r = Math.max(r, e.bidfloor))),
                (e.bidfloor = r > 0 ? r : x),
                (0, n.logInfo)(w, 'Updated imp.bidfloor:', e.bidfloor),
                o &&
                  (function (e, t) {
                    t.forEach((t) => {
                      e[t]?.ext && e[t].ext.bidfloor === e.bidfloor && e[t].ext.bidfloorcur === e.bidfloorcur && delete e[t].ext;
                    });
                  })(e, i));
            },
            N = (e, t) => {
              const r = t.split(':');
              let i = r[0]?.split('@');
              i = 2 === i?.length ? i[1].split('x') : 3 === i.length ? i[2].split('x') : [];
              const o = e.format[0];
              (2 !== i.length || (0 === parseInt(i[0]) && 0 === parseInt(i[1]))
                ? ((e.w = o.w), (e.h = o.h))
                : ((e.w = parseInt(i[0])), (e.h = parseInt(i[1]))),
                (e.format = e.format.filter((t) => !(t.w === e.w && t.h === e.h))),
                e.format?.length || delete e.format,
                (e.pos ??= 0));
            },
            M = (e, t, r) => {
              const i = t.split(':')[0].split('@');
              e.tagid = r || i[0];
            },
            z = (e, t) => {
              if (
                (t?.ortb ||
                  (e.native.request = JSON.stringify(
                    ((e) => {
                      const t = { ver: '1.2', assets: [] };
                      for (const r in e) {
                        if (b._B.includes(r)) continue;
                        if (!b.x5.hasOwnProperty(r) && !O.includes(r)) {
                          (0, n.logWarn)(`${w}: Unrecognized asset: ${r}. Ignored.`);
                          continue;
                        }
                        if ('privacyLink' === r) {
                          t.privacy = 1;
                          continue;
                        }
                        const i = e[r],
                          o = i.required && (0, d.Lm)(i.required) ? 1 : 0,
                          a = { id: t.assets.length, required: o };
                        (r in b.h0
                          ? (a.data = { type: b.jO[b.h0[r]], ...(i.len && { len: i.len }), ...(i.ext && { ext: i.ext }) })
                          : 'icon' === r || 'image' === r
                            ? (a.img = { type: 'icon' === r ? b.oA.ICON : b.oA.MAIN, ...q(i) })
                            : 'title' === r
                              ? (a.title = { len: i.len || 140, ...(i.ext && { ext: i.ext }) })
                              : 'ext' === r && ((a.ext = i), delete a.required),
                          t.assets.push(a));
                      }
                      return t;
                    })(t),
                  )),
                t?.ortb)
              ) {
                const t = JSON.parse(e.native.request),
                  { assets: r } = t;
                r?.some((e) => e.title || e.img || e.data || e.video)
                  ? (e.native.request = JSON.stringify({ ver: '1.2', ...t }))
                  : ((0, n.logWarn)(`${w}: Native assets object is empty or contains invalid objects`), delete e.native);
              }
            },
            F = (e, t, r) => {
              const i = r.video;
              ((0, a.A)(e, 'plcmt') || (0, n.logWarn)('Video.plcmt param missing for ' + t),
                (e && (i.w || i.h)) ||
                  (delete r.video,
                  (0, n.logWarn)(
                    `${w}Error: Missing ${e ? 'video size params (playersize or w&h)' : 'video config params'} for adunit: ${t} with mediaType set as video. Ignoring video impression in the adunit.`,
                  )));
            },
            B = (e, t) => {
              const r = t?.targeting;
              if (!r || !r.segments?.length) return;
              const i = `${`jw-id=${r.content.id}`}|${r.segments.map((e) => `jw-${e}=1`).join('|')}`;
              ((e.ext = e.ext || {}), (e.ext.key_val = e.ext.key_val ? `${e.ext.key_val}|${i}` : i));
            },
            D = (e, t) => {
              const r = ['all'],
                i = g.u.get(t.bidderCode, 'allowedAlternateBidderCodes'),
                o = (0, d.cy)(i) ? i.map((e) => e.trim().toLowerCase()).filter(n.uniques) : r;
              e.ext.marketplace = {
                allowedbidders: o.includes('*') || o.includes('all') ? r : [...new Set(['pubmatic', ...o.filter((e) => e && e.trim())])],
              };
            },
            G = (e) => {
              ((0, s.J)(e, 'at', 1),
                (0, s.J)(e, 'cur', ['USD']),
                (e.test = window.location.href.includes('pubmaticTest=true') ? 1 : void 0),
                e.source && !Object.keys(e.source).length && delete e.source,
                e.app?.publisher && (e.app.publisher.id = U));
            },
            J = (e, t) => {
              const { gender: r, yob: i, pubId: o, refURL: n, kadpageurl: s } = k,
                { user: d } = e;
              (e.device && Object.assign(e.device, { js: 1, connectiontype: (0, y.Z)() }),
                (e.user = { ...e.user, gender: d?.gender || r?.trim() || x, yob: d?.yob || K('yob', i) }));
              const l = (0, a.A)(t, '0.userIdAsEids');
              (t.length && l?.length && !e.user.ext?.eids && ((e.user.ext = e.user.ext || {}), (e.user.ext.eids = l)),
                e.site?.publisher && ((e.site.ref = e.site.ref || n), (e.site.publisher.id = o?.trim())),
                e.site?.page && s && (e.site.page = s.trim()),
                e.device.geo && !e.user.geo ? (e.user.geo = e.device.geo) : e.user.geo && !e.device.geo && (e.device.geo = e.user.geo));
            },
            L = (e, t, r) => {
              const { ortbRequest: i, seatbid: o } = r;
              if (
                ((e.referrer = i.site?.ref || ''),
                (e.sspID = e.partnerImpId = t.id || ''),
                (e.ad = t.adm),
                (e.pm_dspid = t.ext?.dspid ? t.ext.dspid : null),
                (e.pm_seat = o.seat),
                e.creativeId || (e.creativeId = t.id),
                360 === Number(e.ttl) && (e.ttl = C[e.mediaType]),
                t.dealid && (e.dealChannel = t.ext?.deal_channel ? _[t.ext.deal_channel] || null : 'PMP'),
                o.ext?.buyid && (e.adserverTargeting = { hb_buyid_pubmatic: o.ext.buyid }),
                t.ext?.marketplace && (e.bidderCode = t.ext.marketplace),
                t.ext)
              ) {
                const { dspid: r, dchain: i, dsa: o, ibv: n } = t.ext;
                (r && (e.meta.networkId = e.meta.demandSource = r),
                  i && (e.meta.dchain = i),
                  o && Object.keys(o).length && (e.meta.dsa = o),
                  n && ((e.ext = e.ext || {}), (e.ext.ibv = n), (e.meta.mediaType = c.G_)));
              }
              const n = o.seat || t.ext?.advid;
              (n && (e.meta.advertiserId = e.meta.agencyId = e.meta.buyerId = n),
                Q(t.adomain) && (e.meta.clickUrl = e.meta.brandId = t.adomain[0]),
                t.cat && Q(t.cat) && ((e.meta.secondaryCatIds = t.cat), (e.meta.primaryCatId = t.cat[0])));
            },
            X = (e, t) => {
              const { profId: r, verId: i, wiid: o } = k;
              e.ext = {
                epoch: new Date().getTime(),
                wrapper: {
                  profile: r ? parseInt(r) : void 0,
                  version: i ? parseInt(i) : void 0,
                  wiid: o,
                  wv: 'prebid_prebid_11.23.0',
                  wp: 'pbjs',
                  biddercode: t?.bidderCode,
                },
                cpmAdjustment: R,
              };
            },
            V = (e) => [
              ...new Set(
                e
                  .filter(
                    (e) =>
                      'string' == typeof e || ((0, n.logWarn)(w + 'acat: Each category should be a string, ignoring category: ' + e), !1),
                  )
                  .map((e) => e.trim()),
              ),
            ],
            Z = (e) => {
              const t = (e = e.map((e) => ('string' == typeof e ? e.trim() : e))).filter((e) => 'string' != typeof e || e.length < 3);
              return (
                (0, n.logWarn)(w + 'bcat: Each category must be a string with a length greater than 3, ignoring ' + t),
                [...new Set(e.filter((e) => 'string' == typeof e && e.length >= 3))]
              );
            };
          const H = {
            bootstrapPlayer: function (e) {
              const t = { code: e.adUnitCode, vastXml: e.vastXml || null, vastUrl: e.vastUrl || null };
              if (!t.vastXml && !t.vastUrl) return void (0, n.logWarn)(`${w}: No vastXml or vastUrl on bid, bailing...`);
              const r = H.getRendererId('pubmatic', e.rendererCode),
                i = (0, v.o)(e),
                o = window.bluebillywig.renderers.find((e) => e._id === r);
              o ? o.bootstrap(t, i) : (0, n.logWarn)(`${w}: Couldn't find a renderer with ${r}`);
            },
            newRenderer: function (e, t) {
              const r = I.replace('$RENDERER', e),
                i = u.A4.install({ url: r, loaded: !1, adUnitCode: t });
              try {
                i.setRender(H.outstreamRender);
              } catch (e) {
                (0, n.logWarn)(`${w}: Error tying to setRender on renderer`, e);
              }
              return i;
            },
            outstreamRender: function (e) {
              e.renderer.push(() => H.bootstrapPlayer(e));
            },
            getRendererId: function (e, t) {
              return `${e}-${t}`;
            },
          };
          function K(e, t) {
            if (!(0, d.O8)(t))
              return (t && (0, n.logWarn)(w + 'Ignoring param key: ' + e + ', expects string-value, found ' + typeof t), x);
            const r = {
              pmzoneid: () =>
                t
                  .split(',')
                  .slice(0, 50)
                  .map((e) => e.trim())
                  .join(),
              kadfloor: () => parseFloat(t),
              lat: () => parseFloat(t),
              lon: () => parseFloat(t),
              yob: () => parseInt(t),
            };
            return r[e]?.() || t;
          }
          function Q(e) {
            return !0 === (0, d.cy)(e) && e.length > 0;
          }
          function Y() {
            try {
              const e = (0, a.A)(p.$W.getBidderConfig(), 'pubmatic.gzipEnabled');
              if (void 0 !== e) {
                const t = String(e).toLowerCase().trim();
                if ('true' === t || 'false' === t) {
                  const e = 'true' === t;
                  return ((0, n.logInfo)('PubMatic: Using bidder-specific gzipEnabled setting:', e), e);
                }
                (0, n.logWarn)('PubMatic: Invalid gzipEnabled value in bidder config:', e);
              }
            } catch (e) {
              (0, n.logWarn)('PubMatic: Error accessing bidder config:', e);
            }
            return ((0, n.logInfo)('PubMatic: Using default gzipEnabled setting:', j), j);
          }
          const ee = (e, t, r) => {
              let i = { w: 0, h: 0 };
              e.video?.w > 0 && e.video?.h > 0
                ? ((i.w = e.video.w), (i.h = e.video.h))
                : (i = (function (e) {
                    return e && e.length ? e.reduce((e, t) => (t.h * t.w < e.h * e.w ? t : e), e[0]) : { w: 0, h: 0 };
                  })(r));
              const o = (0, v.o)(t);
              if (!o) return;
              const a = (0, m.tF)(o) ? (0, m.gl)(o, (0, n.getWindowTop)(), i) : 'na';
              (e.ext || (e.ext = {}), (e.ext.viewability = { amount: isNaN(a) ? a : Math.round(a) }));
            },
            te = {
              code: 'pubmatic',
              gvlid: 76,
              supportedMediaTypes: [c.D4, c.G_, c.s6],
              alwaysHasCapacity: !0,
              isBidRequestValid: (e) => {
                if (!e || !e.params) return !1;
                const { publisherId: t } = e.params,
                  r = e.mediaTypes || {},
                  i = r[c.G_] || {};
                if (!(0, d.O8)(t))
                  return (
                    (0, n.logWarn)(
                      w +
                        'Error: publisherId is mandatory and cannot be numeric (wrap it in quotes in your config). Call to OpenBid will not be sent for ad unit: ' +
                        JSON.stringify(e),
                    ),
                    !1
                  );
                if (r.hasOwnProperty(c.G_)) {
                  const t = (0, a.A)(e, 'mediaTypes.video.mimes'),
                    o = (0, a.A)(e, 'params.video.mimes');
                  if (!Q(t) && !Q(o))
                    return (
                      (0, n.logWarn)(
                        w +
                          'Error: For video ads, bid.mediaTypes.video.mimes OR bid.params.video.mimes should be present and must be a non-empty array. Call to OpenBid will not be sent for ad unit:' +
                          JSON.stringify(e),
                      ),
                      !1
                    );
                  if (!i.context) return ((0, n.logError)(`${w}: No context specified in bid. Rejecting bid: `, e), !1);
                  if ('outstream' === i.context && !(0, d.O8)(e.params.outstreamAU) && !e.renderer && !i.renderer)
                    return r.hasOwnProperty(c.D4) || r.hasOwnProperty(c.s6)
                      ? (delete r[c.G_],
                        (0, n.logWarn)(
                          `${w}: for "outstream" bids either outstreamAU parameter must be provided or ad unit supplied renderer is required. Rejecting mediatype Video of bid: `,
                          e,
                        ),
                        !0)
                      : ((0, n.logError)(
                          `${w}: for "outstream" bids either outstreamAU parameter must be provided or ad unit supplied renderer is required. Rejecting bid: `,
                          e,
                        ),
                        !1);
                }
                return !0;
              },
              buildRequests: (e, t) => {
                const { page: r, ref: i } = t?.refererInfo || {},
                  { publisherId: o, profId: a, verId: s } = t?.bids?.[0]?.params || {};
                var l;
                U =
                  o?.trim() ||
                  ((l = t?.bids),
                  (Array.isArray(l) && l.length > 0 && l.find((e) => e.params?.publisherId?.trim())?.params.publisherId) || null)?.trim();
                const c = (0, n.generateUUID)();
                let p;
                ((E = []),
                  (P = []),
                  (k = {
                    pageURL: r || window.location.href,
                    refURL: i || window.document.referrer,
                    pubId: U,
                    kadpageurl: r || window.location.href,
                    profId: a,
                    verId: s,
                  }),
                  e.forEach((e) => {
                    ((e.params.wiid = e.params.wiid || t.auctionId || c),
                      (p = (0, d.Go)(e)),
                      ((e, t) => {
                        Object.keys($).forEach((r) => {
                          const i = e[r];
                          i &&
                            ((0, d.O8)(i)
                              ? (t[r] = i)
                              : (0, n.logWarn)(`${w}Ignoring param: ${r} with value: ${$[r]}, expects string value, found ${typeof i}`));
                        });
                      })(p.params, k));
                    const { bcat: r, acat: i } = p.params;
                    (r && (E = E.concat(r)), i && (P = P.concat(i)));
                  }));
                const u = A.toORTB({ validBidRequests: e, bidderRequest: t }),
                  m = {
                    method: 'POST',
                    url: 'https://hbopenbid.pubmatic.com/translator?source=prebid-client',
                    data: u,
                    bidderRequest: t,
                    options: { endpointCompression: Y() },
                  };
                return u?.imp?.length ? m : null;
              },
              interpretResponse: (e, t) => {
                const { bids: r } = A.fromORTB({ response: e.body, request: t.data });
                return r;
              },
              getUserSyncs: (e, t, r, i, o) => {
                let n = U;
                (r && (n += `&gdpr=${r.gdprApplies ? 1 : 0}&gdpr_consent=${encodeURIComponent(r.consentString || '')}`),
                  i && (n += `&us_privacy=${encodeURIComponent(i)}`),
                  o?.gppString &&
                    o?.applicableSections?.length &&
                    (n += `&gpp=${encodeURIComponent(o.gppString)}&gpp_sid=${encodeURIComponent(o.applicableSections.join(','))}`),
                  !0 === p.$W.getConfig('coppa') && (n += '&coppa=1'));
                const a = e.iframeEnabled ? 'iframe' : 'image';
                return [
                  {
                    type: a,
                    url:
                      ('iframe' === a
                        ? '../../ads.pubmatic.com/AdServer/js/user_sync__qgdpr_0_gdpr_.html'
                        : 'https://image8.pubmatic.com/AdServer/ImgSync?p=') + n,
                  },
                ];
              },
              onBidWon: (e) => {
                !(function (e) {
                  if (!e) return;
                  const { originalCurrency: t, currency: r, cpm: i, originalCpm: o, meta: n } = e,
                    a = t !== r && (0, d.fp)(e.getCpmInNewCurrency) ? e.getCpmInNewCurrency(t) : i,
                    s = e.mediaType,
                    l = n?.mediaType;
                  R = R || { currency: r, originalCurrency: t, adjustment: [] };
                  const c = { cpmAdjustment: Number(((o - a) / o).toFixed(2)), mediaType: s, metaMediaType: l, cpm: a, originalCpm: o },
                    p = R?.adjustment?.findIndex((e) => e?.mediaType === s && e?.metaMediaType === l);
                  -1 !== p ? R.adjustment.splice(p, 1, c) : R.adjustment.push(c);
                })(e);
              },
            };
          ((0, l.a$)(te),
            (0, o.E)('pubmaticBidAdapter'),
            Object.assign(i.W1, {
              76: { purposes: [1, 3, 4], legIntPurposes: [2, 7, 9, 10], flexiblePurposes: [2, 7, 9, 10], specialFeatures: [1] },
            }));
        },
      },
      (e) => {
        e.O(0, [802, 7769, 5590, 1085, 8498, 2316, 259, 4472, 7464], () => {
          return ((t = 670), e((e.s = t)));
          var t;
        });
        e.O();
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [1079],
      {
        1402(t, e, n) {
          var o = n(1129),
            i = n(8384),
            a = n(1785),
            r = n(7413),
            s = n(3399),
            c = n(5521),
            u = n(4794),
            f = n(1068),
            g = n(2822),
            l = n(7449),
            d = n(4704);
          const D = (0, n(724).ZI)((t) => u.Ay.resolveAlias(t)),
            p = [];
          let E,
            m,
            h = [],
            R = [];
          const T = (function () {
            let t = !1;
            return function () {
              t ||
                (Object.entries({
                  [c.qY.AUCTION_INIT]: ['onAuctionInitEvent'],
                  [c.qY.AUCTION_END]: ['onAuctionEndEvent', b],
                  [c.qY.BID_RESPONSE]: ['onBidResponseEvent'],
                  [c.qY.BID_REQUESTED]: ['onBidRequestEvent'],
                  [c.qY.BID_ACCEPTED]: ['onBidAcceptedEvent'],
                }).forEach(([t, [e, n]]) => {
                  s.on(t, (t) => {
                    (n && n(t),
                      h.forEach((n) => {
                        try {
                          n[e] && n[e](t, n.config, m);
                        } catch (t) {
                          (0, r.logError)(`RTD provider '${n.name}': error in '${e}':`, t);
                        }
                      }));
                  });
                }),
                (t = !0));
            };
          })();
          function A() {
            return {
              gdpr: f.mW.getConsentData(),
              usp: f.t6.getConsentData(),
              gpp: f.ad.getConsentData(),
              coppa: !!i.$W.getConfig('coppa'),
            };
          }
          function I() {
            m = A();
            const t = [];
            (R.forEach((e) => {
              const n = (p || []).find((t) => t.name === e.name);
              n && n.init && n.init(e, m) && t.push(Object.assign(n, { config: e }));
            }),
              (h = t),
              (0, r.logInfo)(`Real time data module enabled, using submodules: ${h.map((t) => t.name).join(', ')}`));
          }
          const y = (0, g.Ak)('rtd', function (t, e) {
            m = A();
            const n = [],
              o = [];
            h.forEach((t) => {
              if ('function' != typeof t.getBidRequestData) return;
              n.push(t);
              const e = t.config;
              e && e.waitForIt && o.push(t);
            });
            const i = o.length && E?.auctionDelay > 0;
            let a,
              s = o.length,
              c = !1;
            if (!n.length) return p();
            const u = i ? E.auctionDelay : 0;
            a = setTimeout(p, u);
            const f = 'ortb2Fragments';
            function g() {
              c || (this.config && this.config.waitForIt && s--, 0 === s && setTimeout(p, 0));
            }
            function p() {
              c || ((c = !0), clearTimeout(a), t.call(this, e));
            }
            n.forEach((t) => {
              const n = (0, d.Qo)(e[f] ?? {}, D(l.zu, t.name)),
                o = new Proxy(e, {
                  get: (t, e, o) => (e === f ? n : Reflect.get(t, e, o)),
                  set: (t, e, o, i) => (e === f ? ((0, r.mergeDeep)(n, o), !0) : Reflect.set(t, e, o, i)),
                  deleteProperty: (t, e) => e === f || Reflect.deleteProperty(t, e),
                });
              t.getBidRequestData(o, g.bind(t), t.config, m, u);
            });
          });
          function b(t) {
            const e = h.filter((t) => 'function' == typeof t.getTargetingData);
            if (!e.length) return;
            const n = t.adUnitCodes;
            if (!n) return;
            const o = [];
            for (let i = e.length - 1; i >= 0; i--) {
              const a = e[i].getTargetingData(n, e[i].config, m, t);
              a && 'object' == typeof a ? o.push(a) : (0, r.logWarn)('invalid getTargetingData response for sub module', e[i].name);
            }
            const i = (0, r.mergeDeep)({}, ...o);
            return (
              t.adUnits.forEach((t) => {
                const e = t.code && i[t.code];
                e &&
                  ((0, r.logInfo)('RTD set ad unit targeting of', e, 'for', t),
                  (t[c.iD.ADSERVER_TARGETING] = Object.assign(t[c.iD.ADSERVER_TARGETING] || {}, e)));
              }),
              t.adUnits
            );
          }
          function v(t, ...e) {
            (h.forEach((t) => {
              if ('function' == typeof t.onDataDeletionRequest)
                try {
                  t.onDataDeletionRequest(t.config);
                } catch (e) {
                  (0, r.logError)(`Error executing ${t.name}.onDataDeletionRequest`, e);
                }
            }),
              t.apply(this, e));
          }
          ((0, a.xG)('realTimeData', function (t) {
            return (
              p.push(t),
              f.o2.register(l.zu, t.name, t.gvlid),
              function () {
                const e = p.indexOf(t);
                e >= 0 && (p.splice(e, 1), I());
              }
            );
          }),
            (function (t) {
              const e = t.getConfig('realTimeData', ({ realTimeData: t }) => {
                t.dataProviders
                  ? (e(),
                    (E = t),
                    (R = t.dataProviders),
                    T(),
                    (0, a.Yn)('startAuction').before(y, 20),
                    u.Ay.callDataDeletionRequest.before(v),
                    I())
                  : (0, r.logError)('missing parameters for real time module');
              });
            })(i.$W),
            (0, o.E)('rtdModule'));
        },
      },
      (t) => {
        t.O(0, [802, 7769, 5590, 1085, 5881], () => {
          return ((e = 1402), t((t.s = e)));
          var e;
        });
        t.O();
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [2711],
      {
        2069(e, t, r) {
          var i = r(1068),
            n = r(1129),
            o = r(6271),
            s = r(9400),
            a = r(2682),
            d = r(8384),
            c = r(1779),
            p = r(7413),
            u = r(8928),
            l = r(3435),
            m = r(3350),
            x = r(9288),
            b = r(9446),
            g = r(8960);
          let f = d.$W.getConfig('rubicon') || {};
          d.$W.getConfig('rubicon', (e) => {
            (0, p.mergeDeep)(f, e.rubicon);
          });
          let y = {};
          var _ = {
            1: '468x60',
            2: '728x90',
            5: '120x90',
            7: '125x125',
            8: '120x600',
            9: '160x600',
            10: '300x600',
            13: '200x200',
            14: '250x250',
            15: '300x250',
            16: '336x280',
            17: '240x400',
            19: '300x100',
            31: '980x120',
            32: '250x360',
            33: '180x500',
            35: '980x150',
            37: '468x400',
            38: '930x180',
            39: '750x100',
            40: '750x200',
            41: '750x300',
            42: '2x4',
            43: '320x50',
            44: '300x50',
            48: '300x300',
            53: '1024x768',
            54: '300x1050',
            55: '970x90',
            57: '970x250',
            58: '1000x90',
            59: '320x80',
            60: '320x150',
            61: '1000x1000',
            64: '580x500',
            65: '640x480',
            66: '930x600',
            67: '320x480',
            68: '1800x1000',
            72: '320x320',
            73: '320x160',
            78: '980x240',
            79: '980x300',
            80: '980x400',
            83: '480x300',
            85: '300x120',
            90: '548x150',
            94: '970x310',
            95: '970x100',
            96: '970x210',
            101: '480x320',
            102: '768x1024',
            103: '480x280',
            105: '250x800',
            108: '320x240',
            113: '1000x300',
            117: '320x100',
            125: '800x250',
            126: '200x600',
            144: '980x600',
            145: '980x150',
            152: '1000x250',
            156: '640x320',
            159: '320x250',
            179: '250x600',
            195: '600x300',
            198: '640x360',
            199: '640x200',
            210: '1080x1920',
            213: '1030x590',
            214: '980x360',
            219: '1920x1080',
            221: '1x1',
            229: '320x180',
            230: '2000x1400',
            232: '580x400',
            234: '6x6',
            251: '2x2',
            256: '480x820',
            257: '400x600',
            258: '500x200',
            259: '998x200',
            261: '480x480',
            264: '970x1000',
            274: '1800x200',
            278: '320x500',
            282: '320x400',
            288: '640x380',
            484: '720x1280',
            524: '1x2',
            548: '500x1000',
            550: '980x480',
            552: '300x200',
            558: '640x640',
            562: '300x431',
            564: '320x431',
            566: '320x300',
            568: '300x150',
            570: '300x125',
            572: '250x350',
            574: '620x891',
            576: '610x877',
            578: '980x552',
            580: '505x656',
            622: '192x160',
            632: '1200x450',
            634: '340x450',
            680: '970x570',
            682: '300x240',
            684: '970x550',
            686: '300x210',
            688: '300x220',
            690: '970x170',
            710: '600x250',
            712: '340x430',
          };
          (0, p._each)(_, (e, t) => {
            _[e] = t;
          });
          const h = (0, o.A)({
              request(e, t, r, i) {
                const { bidRequests: o } = i,
                  s = e(t, r, i);
                var a;
                ((s.cur = ['USD']),
                  (s.test = d.$W.getConfig('debug') ? 1 : 0),
                  (0, l.J)(s, 'ext.prebid.cache', { vastxml: { returnCreative: !0 === f.returnVast } }),
                  (0, l.J)(s, 'ext.prebid.bidders', { rubicon: { integration: f.int_type || 'pbjs' } }),
                  (0, l.J)(s, 'ext.prebid.targeting.pricegranularity', {
                    ranges: {
                      low: [{ max: 5, increment: 0.5 }],
                      medium: [{ max: 20, increment: 0.1 }],
                      high: [{ max: 20, increment: 0.01 }],
                      auto: [
                        { max: 5, increment: 0.05 },
                        { min: 5, max: 10, increment: 0.1 },
                        { min: 10, max: 20, increment: 0.5 },
                      ],
                      dense: [
                        { max: 3, increment: 0.01 },
                        { min: 3, max: 8, increment: 0.05 },
                        { min: 8, max: 20, increment: 0.5 },
                      ],
                      custom: (a = d.$W).getConfig('customPriceBucket') && a.getConfig('customPriceBucket').buckets,
                    }[a.getConfig('priceGranularity')],
                  }));
                const c = (0, n.m)().installedModules;
                (!c ||
                  (c.length && -1 === c.indexOf('rubiconAnalyticsAdapter')) ||
                  (0, l.J)(s, 'ext.prebid.analytics', { rubicon: { 'client-analytics': !0 } }),
                  (function (e, t, r) {
                    let i = {};
                    const n = (0, x.D)(r, ...t.map((e) => e.params.keywords));
                    (t.forEach((t) => {
                      const r = { user: { ext: { data: { ...t.params.visitor } } }, site: { ext: { data: { ...t.params.inventory } } } },
                        n = e.imp.find((e) => e.ext?.prebid?.bidder?.rubicon?.video?.language);
                      (n && (r.site.content = { language: n.ext?.prebid?.bidder?.rubicon?.video?.language }),
                        (i = (0, p.mergeDeep)(i, t.ortb2 || {}, r)));
                      const o = d.$W.getConfig('user.id');
                      i.user.id = i.user.id || o;
                    }),
                      (0, p.mergeDeep)(e, i),
                      n && n.length && (0, l.J)(e, 'site.keywords', n.join(',')));
                    delete e?.ext?.prebid?.storedrequest;
                  })(s, o, r.ortb2),
                  delete s?.ext?.prebid?.storedrequest,
                  !0 === f.disableFloors && delete s.ext.prebid.floors);
                return (o.filter((e) => 'object' == typeof e.floorData).length > 0 && (s.ext.prebid.floors = { enabled: !1 }), s);
              },
              imp(e, t, r) {
                const i = $(t);
                if (i.includes(c.D4) && 1 === i.length) return;
                const n = e(t, r);
                return (
                  (n.id = t.adUnitCode),
                  delete n.banner,
                  'atf' === t.params.position && n.video && (n.video.pos = 1),
                  'btf' === t.params.position && n.video && (n.video.pos = 3),
                  delete n.ext?.prebid?.storedrequest,
                  !0 === t.params.bidonmultiformat && i.length > 1 && (0, l.J)(n, 'ext.prebid.bidder.rubicon.formats', i),
                  (function (e, t) {
                    'USD' !== t.bidfloorcur && (delete t.bidfloor, delete t.bidfloorcur);
                    if (!t.bidfloor) {
                      const r = parseFloat((0, u.A)(e, 'params.floor'));
                      isNaN(r) || ((t.bidfloor = r), (t.bidfloorcur = 'USD'));
                    }
                  })(t, n),
                  (n.id = y[n.id] ? n.id + y[n.id]++ : ((y[n.id] = 2), n.id)),
                  n
                );
              },
              bidResponse(e, t, r) {
                const i = e(t, r);
                i.meta.mediaType = (0, u.A)(t, 'ext.prebid.type');
                const { bidRequest: n } = r,
                  [o, s] = 'outstream' === n.mediaTypes.video?.context ? j(n, c.G_) : [void 0, void 0];
                return (
                  (i.width = t.w || o || i.playerWidth || 0),
                  (i.height = t.h || s || i.playerHeight || 0),
                  i.mediaType === c.G_ &&
                    'outstream' === n.mediaTypes.video.context &&
                    (i.renderer = (0, g.S_)(i, f.rendererUrl, f.rendererConfig)),
                  (0, u.A)(t, 'ext.bidder.rp.advid') && (0, l.J)(i, 'meta.advertiserId', t.ext.bidder.rp.advid),
                  i
                );
              },
              context: { netRevenue: !1 !== f.netRevenue, ttl: 360 },
              processors: s.m,
            }),
            v = {
              code: 'rubicon',
              gvlid: 52,
              supportedMediaTypes: [c.D4, c.G_, c.s6],
              isBidRequestValid: function (e) {
                let t = !0;
                if ('object' != typeof e.params) return !1;
                for (let t = 0, r = ['accountId', 'siteId', 'zoneId']; t < r.length; t++)
                  if (((e.params[r[t]] = parseInt(e.params[r[t]])), isNaN(e.params[r[t]])))
                    return ((0, p.logError)('Rubicon: wrong format of accountId or siteId or zoneId.'), !1);
                const r = $(e, !0);
                if (!r.length) return !1;
                r.includes(c.G_) &&
                  (t = (function (e) {
                    let t = !0;
                    const r = Object.prototype.toString.call([]),
                      i = Object.prototype.toString.call(0);
                    var n = { mimes: r, protocols: r, linearity: i };
                    return (
                      Object.keys(n).forEach(function (r) {
                        Object.prototype.toString.call((0, u.A)(e, 'mediaTypes.video.' + r)) !== n[r] &&
                          ((t = !1), (0, p.logError)('Rubicon: mediaTypes.video.' + r + ' is required and must be of type: ' + n[r]));
                      }),
                      t
                    );
                  })(e));
                const i = [c.D4, c.s6].filter((e) => r.includes(e)).length > 0;
                return i ? t && i : t;
              },
              buildRequests: function (e, t) {
                let r;
                const i = [];
                let n;
                if (
                  ((n = e.filter((e) => {
                    const t = $(e),
                      { length: r } = t,
                      { bidonmultiformat: i, video: n } = e.params || {};
                    return (
                      (1 === r && (t.includes(c.G_) || t.includes(c.s6))) ||
                      (2 === r && !t.includes(c.D4)) ||
                      (n && t.includes(c.G_)) ||
                      (i && (t.includes(c.G_) || t.includes(c.s6)))
                    );
                  })),
                  n && n.length)
                ) {
                  const e = h.toORTB({ bidRequests: n, bidderRequest: t });
                  (O(),
                    i.push({
                      method: 'POST',
                      url: `https://${f.videoHost || 'prebid-server'}.rubiconproject.com/openrtb2/auction`,
                      data: e,
                      bidRequest: n,
                    }));
                }
                const o = e.filter((e) => {
                  const t = $(e),
                    { bidonmultiformat: r, video: i } = e.params || {};
                  return t.includes(c.D4) && (1 === t.length || r || !i || !t.includes(c.G_));
                });
                if (!0 !== f.singleRequest)
                  r = i.concat(
                    o.map((e) => {
                      const r = v.createSlotParams(e, t);
                      return {
                        method: 'GET',
                        url: `https://${f.bannerHost || 'fastlane'}.rubiconproject.com/a/api/fastlane.json`,
                        data:
                          v.getOrderedParams(r).reduce((e, t) => {
                            const i = r[t];
                            return ((0, m.O8)(i) && '' !== i) || (0, m.Et)(i) ? `${e}${I(t, i)}&` : e;
                          }, '') + `slots=1&rand=${Math.random()}`,
                        bidRequest: e,
                      };
                    }),
                  );
                else {
                  const e = o.reduce((e, t) => ((e[t.params.siteId] = e[t.params.siteId] || []).push(t), e), {}),
                    n = 10;
                  r = i.concat(
                    Object.keys(e).reduce(
                      (r, i) => (
                        (function (e, t) {
                          const r = [];
                          for (let i = 0; i < e.length; i += t) r.push(e.slice(i, i + t));
                          return r;
                        })(e[i], n).forEach((e) => {
                          const i = v.combineSlotUrlParams(e.map((e) => v.createSlotParams(e, t)));
                          r.push({
                            method: 'GET',
                            url: `https://${f.bannerHost || 'fastlane'}.rubiconproject.com/a/api/fastlane.json`,
                            data:
                              v.getOrderedParams(i).reduce((e, t) => {
                                const r = i[t];
                                return ((0, m.O8)(r) && '' !== r) || (0, m.Et)(r) ? `${e}${I(t, r)}&` : e;
                              }, '') + `slots=${e.length}&rand=${Math.random()}`,
                            bidRequest: e,
                          });
                        }),
                        r
                      ),
                      [],
                    ),
                  );
                }
                return r;
              },
              getOrderedParams: function (e) {
                const t = /^tg_v/,
                  r = /^tg_i/,
                  i = /^eid_|^tpid_/,
                  n = [
                    'account_id',
                    'site_id',
                    'zone_id',
                    'size_id',
                    'alt_size_ids',
                    'p_pos',
                    'gdpr',
                    'gdpr_consent',
                    'us_privacy',
                    'gpp',
                    'gpp_sid',
                    'rp_schain',
                  ]
                    .concat(Object.keys(e).filter((e) => i.test(e)))
                    .concat(['x_liverampidl', 'ppuid', 'rf', 'p_geo.latitude', 'p_geo.longitude', 'kw'])
                    .concat(Object.keys(e).filter((e) => t.test(e)))
                    .concat(Object.keys(e).filter((e) => r.test(e)))
                    .concat(['tk_flint', 'x_source.tid', 'l_pb_bid_id', 'p_screen_res', 'rp_floor', 'rp_secure', 'tk_user_key']);
                return n.concat(Object.keys(e).filter((e) => -1 === n.indexOf(e)));
              },
              combineSlotUrlParams: function (e) {
                if (1 === e.length) return e[0];
                const t = e.reduce(function (t, r, i) {
                    return (
                      Object.keys(r).forEach(function (n) {
                        (t.hasOwnProperty(n) || (t[n] = new Array(e.length)), t[n].splice(i, 1, r[n]));
                      }),
                      t
                    );
                  }, {}),
                  r = new RegExp('^([^;]*)(;\\1)+$');
                return (
                  Object.keys(t).forEach(function (e) {
                    const i = t[e].join(';'),
                      n = i.match(r);
                    t[e] = n ? n[1] : i;
                  }),
                  t
                );
              },
              createSlotParams: function (e, t) {
                e.startTime = new Date().getTime();
                const r = e.params,
                  i = j(e, 'banner'),
                  [n, o] = r.latLong || [],
                  s = {
                    account_id: r.accountId,
                    site_id: r.siteId,
                    zone_id: r.zoneId,
                    size_id: i[0],
                    alt_size_ids: i.slice(1).join(',') || void 0,
                    rp_floor: (r.floor = parseFloat(r.floor)) >= 0.01 ? r.floor : void 0,
                    rp_secure: '1',
                    tk_flint: `${f.int_type || 'pbjs_lite'}_v11.23.0`,
                    'x_source.tid': t.ortb2?.source?.tid,
                    'x_imp.ext.tid': e.ortb2Imp?.ext?.tid,
                    l_pb_bid_id: e.bidId,
                    ip: e.ortb2?.device?.ip,
                    ipv6: e.ortb2?.device?.ipv6,
                    p_screen_res: [window.screen.width, window.screen.height].join('x'),
                    tk_user_key: r.userId,
                    'p_geo.latitude': isNaN(parseFloat(n)) ? void 0 : parseFloat(n).toFixed(4),
                    'p_geo.longitude': isNaN(parseFloat(o)) ? void 0 : parseFloat(o).toFixed(4),
                    'tg_fl.eid': e.code,
                    rf: A(e, t),
                  };
                if ('function' == typeof e.getFloor && !f.disableFloors) {
                  let t;
                  try {
                    t = e.getFloor({ currency: 'USD', mediaType: 'banner', size: '*' });
                  } catch (e) {
                    (0, p.logError)('Rubicon: getFloor threw an error: ', e);
                  }
                  s.rp_hard_floor = (0, m.Qd)(t) && 'USD' === t.currency && !isNaN(parseInt(t.floor)) ? t.floor : void 0;
                }
                !0 === r.bidonmultiformat &&
                  (0, u.A)(e, 'mediaTypes') &&
                  Object.keys(e.mediaTypes).length > 1 &&
                  (s.p_formats = Object.keys(e.mediaTypes).join(','));
                const a = { 1: 'atf', 3: 'btf' }[(0, u.A)(e, 'mediaTypes.banner.pos')] || '';
                s.p_pos = 'atf' === r.position || 'btf' === r.position ? r.position : a;
                const l = d.$W.getConfig('user.id');
                (l && (s.ppuid = l),
                  'number' == typeof e?.ortb2?.site?.mobile && (s['p_site.mobile'] = e.ortb2.site.mobile),
                  e?.ortb2?.user?.ext?.eids &&
                    e.ortb2.user.ext.eids.forEach(({ source: e, uids: t = [], inserter: r, matcher: i, mm: n, ext: o = {} }) => {
                      try {
                        const o = t[0];
                        if (!o) return;
                        const a = (e) =>
                            [e.id, e.atype || '', '', r || '', i || '', n || '', e?.ext?.rtiPartner || e?.ext?.rtipartner || ''].join('^'),
                          d = a(o);
                        if (((s[`eid_${e}`] = d), !s.ppuid)) {
                          const e = t.find((e) => 'ppuid' === e.ext?.stype);
                          e?.id && (s.ppuid = e.id);
                        }
                      } catch (r) {
                        (0, p.logWarn)('Rubicon: error reading eid:', { source: e, uids: t }, r);
                      }
                    }),
                  t.gdprConsent &&
                    ('boolean' == typeof t.gdprConsent.gdprApplies && (s.gdpr = Number(t.gdprConsent.gdprApplies)),
                    (s.gdpr_consent = t.gdprConsent.consentString)),
                  t.uspConsent && (s.us_privacy = encodeURIComponent(t.uspConsent)),
                  t.gppConsent?.gppString && ((s.gpp = t.gppConsent.gppString), (s.gpp_sid = t.gppConsent?.applicableSections?.toString())),
                  (s.rp_maxbids = t.bidLimit),
                  (function (e, t, r) {
                    const i = { user: { ext: { data: { ...e.params.visitor } } }, site: { ext: { data: { ...e.params.inventory } } } };
                    e.params.keywords && (i.site.keywords = (0, m.cy)(e.params.keywords) ? e.params.keywords.join(',') : e.params.keywords);
                    const n = (0, p.mergeDeep)({}, e.ortb2 || {}, i),
                      o = (0, u.A)(e.ortb2Imp, 'ext') || {},
                      s = (0, u.A)(e.ortb2Imp, 'ext.data') || {},
                      a = (0, u.A)(e, 'ortb2Imp.ext.gpid'),
                      d = (0, u.A)(n, 'regs.ext.dsa'),
                      l = { user: [4], site: [1, 2, 5, 6, 7] },
                      x = { user: 'tg_v.', site: 'tg_i.', adserver: 'tg_i.dfp_ad_unit_code', pbadslot: 'tg_i.pbadslot', keywords: 'kw' },
                      b = function (e, t, r) {
                        return 'data' === t && Array.isArray(e)
                          ? e
                              .filter(
                                (e) => e.segment && (0, u.A)(e, 'ext.segtax') && l[r] && -1 !== l[r].indexOf((0, u.A)(e, 'ext.segtax')),
                              )
                              .map((e) => {
                                const t = e.segment.filter((e) => e.id).reduce((e, t) => (e.push(t.id), e), []);
                                return t.length > 0 ? t.toString() : '';
                              })
                              .toString()
                          : ('object' != typeof e || Array.isArray(e)) && void 0 !== e
                            ? Array.isArray(e)
                              ? e
                                  .filter(
                                    (e) =>
                                      ('object' != typeof e && void 0 !== e) ||
                                      ((0, p.logWarn)(
                                        'Rubicon: Filtered value: ',
                                        e,
                                        'for key',
                                        t,
                                        ': Expected value to be string, integer, or an array of strings/ints',
                                      ),
                                      !1),
                                  )
                                  .map((e) => e.toString())
                                  .toString()
                              : e.toString()
                            : void 0;
                      },
                      g = function (e, t, i, n = !0) {
                        const o = b(e, i, t),
                          s = x[i] && n ? `${x[i]}` : 'data' === i ? `${x[t]}iab` : `${x[t]}${i}`;
                        r[s] = r[s] ? r[s].concat(',', o) : o;
                      };
                    if (t === c.D4) {
                      (['site', 'user'].forEach((e) => {
                        Object.keys(n[e]).forEach((t) => {
                          'site' === e && 'content' === t && n[e][t].data
                            ? g(n[e][t].data, e, 'data')
                            : 'ext' !== t
                              ? g(n[e][t], e, t)
                              : n[e][t].data &&
                                Object.keys(n[e].ext.data).forEach((t) => {
                                  g(n[e].ext.data[t], e, t, !1);
                                });
                        });
                      }),
                        Object.keys(s).forEach((e) => {
                          'adserver' !== e ? g(s[e], 'site', e) : 'gam' === s[e].name && g(s[e].adslot, name, e);
                        }),
                        a && (r.p_gpid = a),
                        d &&
                          Object.keys(d).length &&
                          (0, p.pick)(d, [
                            'dsainfo',
                            (e) => {
                              r.dsainfo = e;
                            },
                            'dsarequired',
                            (e) => {
                              r.dsarequired = e;
                            },
                            'pubrender',
                            (e) => {
                              r.dsapubrender = e;
                            },
                            'datatopub',
                            (e) => {
                              r.dsadatatopubs = e;
                            },
                            'transparency',
                            (e) => {
                              Array.isArray(e) &&
                                e.length &&
                                (r.dsatransparency = e.reduce((e, t) => {
                                  const r = t.domain || '';
                                  if (!r) return e;
                                  const i = t.dsaparams || t.params;
                                  return Array.isArray(i) && 0 !== i.length ? (e && (e += '~~'), (e += `${r}~${i.join('_')}`)) : e;
                                }, ''));
                            },
                          ]),
                        r['tg_i.pbadslot'] && delete r['tg_i.dfp_ad_unit_code']);
                      const e = (0, u.A)(n, 'device.sua');
                      e &&
                        !1 !== f.chEnabled &&
                        (0, p.pick)(e, [
                          'architecture',
                          (e) => {
                            r.m_ch_arch = e;
                          },
                          'bitness',
                          (e) => {
                            r.m_ch_bitness = e;
                          },
                          'browsers',
                          (e) => {
                            if (!Array.isArray(e)) return;
                            const [t, i] = e.reduce(
                              (e, t) => (
                                e[0].push(`"${t?.brand}"|v="${t?.version?.[0]}"`),
                                t?.version?.length > 1 && e[1].push(`"${t?.brand}"|v="${t?.version?.join?.('.')}"`),
                                e
                              ),
                              [[], []],
                            );
                            ((r.m_ch_ua = t?.join?.(',')), (r.m_ch_full_ver = i?.join?.(',')));
                          },
                          'mobile',
                          (e) => {
                            r.m_ch_mobile = `?${e}`;
                          },
                          'model',
                          (e) => {
                            r.m_ch_model = e;
                          },
                          'platform',
                          (e) => {
                            ((r.m_ch_platform = e?.brand), (r.m_ch_platform_ver = e?.version?.join?.('.')));
                          },
                        ]);
                    } else
                      (Object.keys(o).length && (0, p.mergeDeep)(r.imp[0].ext, o), a && (r.imp[0].ext.gpid = a), (0, p.mergeDeep)(r, n));
                  })(e, c.D4, s),
                  !0 === d.$W.getConfig('coppa') && (s.coppa = 1));
                const x = e?.ortb2?.source?.ext?.schain;
                return (x && R(x) && (s.rp_schain = v.serializeSupplyChain(x)), s);
              },
              serializeSupplyChain: function (e) {
                if (!R(e)) return '';
                const { ver: t, complete: r, nodes: i } = e;
                return `${t},${r}!${v.serializeSupplyChainNodes(i)}`;
              },
              serializeSupplyChainNodes: function (e) {
                const t = ['asi', 'sid', 'hp', 'rid', 'name', 'domain'];
                return e.map((e) => t.map((t) => encodeURIComponent(e[t] || '')).join(',')).join('!');
              },
              interpretResponse: function (e, t) {
                e = e.body;
                const { data: r } = t;
                if (!e || 'object' != typeof e) return [];
                if (e.seatbid) {
                  const t = (0, u.A)(e, 'ext.errors.rubicon');
                  Array.isArray(t) && t.length > 0 && (0, p.logWarn)('Rubicon: Error in video response');
                  return h.fromORTB({ request: r, response: e }).bids;
                }
                let i,
                  n = e.ads,
                  o = 0;
                const { bidRequest: s } = t;
                if (
                  ('object' == typeof s && !Array.isArray(s) && $(s).includes(c.G_) && 'object' == typeof n && (n = n[s.adUnitCode]),
                  !Array.isArray(n) || n.length < 1)
                )
                  return [];
                return n
                  .reduce((t, r, n) => {
                    if ((r.impression_id && i === r.impression_id ? o++ : (i = r.impression_id), 'ok' !== r.status)) return t;
                    const a = Array.isArray(s) ? s[n - o] : s;
                    if (a && 'object' == typeof a) {
                      const e = {
                        requestId: a.bidId,
                        currency: 'USD',
                        creativeId: r.creative_id || `${r.network || ''}-${r.advertiser || ''}`,
                        cpm: r.cpm || 0,
                        dealId: r.deal,
                        ttl: 360,
                        netRevenue: !1 !== f.netRevenue,
                        rubicon: { advertiserId: r.advertiser, networkId: r.network },
                        meta: { advertiserId: r.advertiser, networkId: r.network, mediaType: c.D4 },
                      };
                      (r.creative_type && (e.mediaType = r.creative_type),
                        r.dsa && Object.keys(r.dsa).length && (e.meta.dsa = r.dsa),
                        r.adomain && (e.meta.advertiserDomains = Array.isArray(r.adomain) ? r.adomain : [r.adomain]),
                        r.emulated_format && (e.meta.mediaType = r.emulated_format),
                        r.creative_type === c.G_
                          ? ((e.width = a.params.video.playerWidth),
                            (e.height = a.params.video.playerHeight),
                            (e.vastUrl = r.creative_depot_url),
                            (e.impression_id = r.impression_id),
                            (e.videoCacheKey = r.impression_id))
                          : ((e.ad =
                              ((d = r.script),
                              `<html>\n<head><script type='text/javascript'>inDapIF=true;<\/script></head>\n<body style='margin : 0; padding: 0;'>\n\x3c!-- Rubicon Project Ad Tag --\x3e\n<div data-rp-impression-id='${r.impression_id}'>\n<script type='text/javascript'>${d}<\/script>\n</div>\n</body>\n</html>`)),
                            ([e.width, e.height] = _[r.size_id].split('x').map((e) => Number(e)))),
                        r.bid_cat &&
                          r.bid_cat.length &&
                          ((e.meta.primaryCatId = r.bid_cat[0]), r.bid_cat.length > 1 && (e.meta.secondaryCatIds = r.bid_cat.slice(1))),
                        (e.rubiconTargeting = (Array.isArray(r.targeting) ? r.targeting : []).reduce(
                          (e, t) => ((e[t.key] = t.values[0]), e),
                          { rpfl_elemid: a.adUnitCode },
                        )),
                        t.push(e));
                    } else (0, p.logError)(`Rubicon: bidRequest undefined at index position:${n}`, s, e);
                    var d;
                    return t;
                  }, [])
                  .sort((e, t) => (t.cpm || 0) - (e.cpm || 0));
              },
              getUserSyncs: function (e, t, r, i, n) {
                if (e.iframeEnabled) {
                  let e = (0, b.d)(r, i, n);
                  return (
                    (e = Object.keys(e).length ? `?${(0, p.formatQS)(e)}` : ''),
                    { type: 'iframe', url: `https://${f.syncHost || 'eus'}.rubiconproject.com/usync.html` + e }
                  );
                }
              },
            };
          function A(e, t) {
            let r;
            return ((r = e.params.referrer ? e.params.referrer : t.refererInfo.page), e.params.secure ? r.replace(/^http:/i, 'https:') : r);
          }
          function j(e, t) {
            const r = e.params;
            if (t === c.G_) {
              let t = [];
              return (
                r.video && r.video.playerWidth && r.video.playerHeight
                  ? (t = [r.video.playerWidth, r.video.playerHeight])
                  : Array.isArray((0, u.A)(e, 'mediaTypes.video.playerSize')) && 1 === e.mediaTypes.video.playerSize.length
                    ? (t = e.mediaTypes.video.playerSize[0])
                    : Array.isArray(e.sizes) &&
                      e.sizes.length > 0 &&
                      Array.isArray(e.sizes[0]) &&
                      e.sizes[0].length > 1 &&
                      (t = e.sizes[0]),
                t
              );
            }
            let i = [];
            return (
              Array.isArray(r.sizes)
                ? (i = r.sizes)
                : void 0 !== (0, u.A)(e, 'mediaTypes.banner.sizes')
                  ? (i = k(e.mediaTypes.banner.sizes))
                  : Array.isArray(e.sizes) && e.sizes.length > 0
                    ? (i = k(e.sizes))
                    : (0, p.logWarn)('Rubicon: no sizes are setup or found'),
              (function (e) {
                const t = [15, 2, 9];
                return e.sort((e, r) => {
                  const i = t.indexOf(e),
                    n = t.indexOf(r);
                  return i > -1 || n > -1 ? (-1 === i ? 1 : -1 === n ? -1 : i - n) : e - r;
                });
              })(i)
            );
          }
          function k(e) {
            return (0, p.parseSizesInput)(e).reduce((e, t) => {
              const r = parseInt(_[t], 10);
              return (r && e.push(r), e);
            }, []);
          }
          function $(e, t = !1) {
            const r = [];
            if (
              (function (e) {
                let t = void 0 !== (0, u.A)(e, `mediaTypes.${c.G_}`);
                const r = void 0 !== (0, u.A)(e, `mediaTypes.${c.D4}`),
                  i = void 0 !== (0, u.A)(e, 'params.bidonmultiformat'),
                  n = 'object' != typeof (0, u.A)(e, 'params.video');
                return !(!t || !i) || (r && n && (t = !1), t && n && (0, l.J)(e, 'params.video', {}), t);
              })(e)
            ) {
              if (-1 === ['outstream', 'instream'].indexOf((0, u.A)(e, `mediaTypes.${c.G_}.context`)))
                return (t && (0, p.logError)('Rubicon: mediaTypes.video.context must be outstream or instream'), r);
              if (j(e, c.G_).length < 2) return (t && (0, p.logError)('Rubicon: could not determine the playerSize of the video'), r);
              (t && (0, p.logMessage)('Rubicon: making video request for adUnit', e.adUnitCode), r.push(c.G_));
            }
            if ((void 0 !== (0, u.A)(e, `mediaTypes.${c.s6}`) && r.push(c.s6), void 0 !== (0, u.A)(e, `mediaTypes.${c.D4}`))) {
              if (0 === j(e, c.D4).length) return (t && (0, p.logError)('Rubicon: could not determine the sizes for banner request'), r);
              (t && (0, p.logMessage)('Rubicon: making banner request for adUnit', e.adUnitCode), r.push(c.D4));
            }
            return r;
          }
          const O = () => {
            y = {};
          };
          function R(e) {
            let t = !1;
            const r = ['asi', 'sid', 'hp'];
            return e.nodes
              ? ((t = e.nodes.reduce((e, t) => (e ? r.every((e) => t.hasOwnProperty(e)) : e), !0)),
                t || (0, p.logError)('Rubicon: required schain params missing'),
                t)
              : t;
          }
          function I(e, t) {
            return 'rp_schain' === e ? `rp_schain=${t}` : `${e}=${encodeURIComponent(t)}`;
          }
          ((0, a.a$)(v),
            (0, n.E)('rubiconBidAdapter'),
            Object.assign(i.W1, {
              52: { purposes: [1, 3, 4], legIntPurposes: [2, 7, 10], flexiblePurposes: [2, 7, 10], specialFeatures: [1, 2] },
            }));
        },
      },
      (e) => {
        e.O(0, [802, 7769, 5590, 1085, 8498, 7618, 6550, 9965, 7247], () => {
          return ((t = 2069), e((e.s = t)));
          var t;
        });
        e.O();
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [5496],
      {
        4414(o, e, r) {
          var t = r(1129),
            n = r(7413),
            d = r(1785),
            i = r(2354),
            a = r(1068),
            u = r(7449),
            s = r(651);
          const c = (0, i.vM)({ moduleType: u.fW, moduleName: 'sharedId' }),
            l = 'cookie',
            m = 'html5',
            p = '_pubcid_optout',
            f = 'PublisherCommonId';
          function I(o, e) {
            if (e === l) return c.getCookie(o);
            if (e === m && c.hasLocalStorage()) {
              const e = c.getDataFromLocalStorage(`${o}_exp`);
              if (!e) return c.getDataFromLocalStorage(o);
              if (new Date(e).getTime() - Date.now() > 0) return c.getDataFromLocalStorage(o);
            }
          }
          function g(o, e) {
            return function (r, t) {
              e
                ? b(e, o, () => {
                    r(t() || o);
                  })()
                : r(o);
            };
          }
          function b(o, e = '', r) {
            if (!o) return;
            const t = (0, n.parseUrl)(o);
            t.search.id = encodeURIComponent('pubcid:' + e);
            const d = (0, n.buildUrl)(t);
            return function () {
              (0, n.triggerPixel)(d, r);
            };
          }
          function h() {
            return !!((c.cookiesAreEnabled() && I(p, l)) || (c.hasLocalStorage() && I(p, m)));
          }
          const v = {
            name: 'sharedId',
            aliasName: 'pubCommonId',
            gvlid: a.B1,
            disclosureURL: 'local://prebid/sharedId-optout.json',
            decode(o, e) {
              if (h()) return void (0, n.logInfo)('PubCommonId decode: Has opted-out');
              (0, n.logInfo)(' Decoded value PubCommonId ' + o);
              return { pubcid: o };
            },
            getId: function (o = {}, e, r) {
              if (h()) return void (0, n.logInfo)('PubCommonId: Has opted-out');
              if (e?.coppa) return void (0, n.logInfo)('PubCommonId: IDs not provided for coppa requests, exiting PubCommonId');
              const { params: { create: t = !0, pixelUrl: d } = {} } = o;
              let i = r;
              if (!i) {
                try {
                  'object' == typeof window[f] && (i = window[f].getId());
                } catch (o) {}
                i || (i = t && (0, n.hasDeviceAccess)() ? (0, n.generateUUID)() : void 0);
              }
              return { id: i, callback: g(i, d) };
            },
            extendId: function (o = {}, e, r) {
              if (h()) return ((0, n.logInfo)('PubCommonId: Has opted-out'), { id: void 0 });
              if (e?.coppa) return void (0, n.logInfo)('PubCommonId: IDs not provided for coppa requests, exiting PubCommonId');
              const { params: { extend: t = !1, pixelUrl: d } = {} } = o;
              if (t) {
                if (d) {
                  return { callback: b(d, r) };
                }
                return { id: r };
              }
            },
            domainOverride: (0, s.w)(c, 'sharedId'),
            eids: {
              pubcid(o, e) {
                const r = { source: 'pubcid.org', uids: o.map((o) => ({ id: o, atype: 1 })) };
                return (null != e?.params?.inserter && (r.inserter = e.params.inserter), r);
              },
            },
          };
          ((0, d.bz)('userId', v), (0, t.E)('sharedIdSystem'));
        },
      },
      (o) => {
        o.O(0, [802, 7769, 5590, 1085, 2764], () => {
          return ((e = 4414), o((o.s = e)));
          var e;
        });
        o.O();
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [4085],
      {
        6937(e, n, r) {
          var o = r(1129),
            t = r(7413),
            s = r(8928),
            u = r(8384),
            p = r(4794),
            i = r(1068),
            l = r(3399),
            c = r(5521),
            a = r(7449),
            d = r(724),
            f = r(4283),
            g = r(323),
            h = r(5075),
            v = r(4056);
          const B = { purpose: {}, feature: {} },
            m = {
              storage: {
                type: 'purpose',
                default: { purpose: 'storage', enforcePurpose: !0, enforceVendor: !0, vendorExceptions: [] },
                id: 1,
              },
              basicAds: {
                type: 'purpose',
                id: 2,
                default: { purpose: 'basicAds', enforcePurpose: !0, enforceVendor: !0, vendorExceptions: [], deferS2Sbidders: !1 },
              },
              personalizedAds: {
                type: 'purpose',
                id: 4,
                default: {
                  purpose: 'personalizedAds',
                  enforcePurpose: !0,
                  enforceVendor: !0,
                  vendorExceptions: [],
                  eidsRequireP4Consent: !1,
                },
              },
              measurement: {
                type: 'purpose',
                id: 7,
                default: { purpose: 'measurement', enforcePurpose: !0, enforceVendor: !0, vendorExceptions: [] },
              },
              transmitPreciseGeo: {
                type: 'feature',
                id: 1,
                default: { purpose: 'transmitPreciseGeo', enforcePurpose: !0, enforceVendor: !0, vendorExceptions: [] },
              },
            },
            E = new Set(),
            y = new Set(),
            b = new Set(),
            q = new Set(),
            k = new Set(),
            P = new Set();
          let A = !1,
            S = !1;
          const C = [a.tW, a.fW, a.Tn, a.zu],
            $ = 'TCF2',
            O = [];
          function W(e, n, r, o, t = {}) {
            const s = m[e.purpose];
            if ((e.vendorExceptions || []).includes(r)) return !0;
            const u =
                !(t.isS2S && 'basicAds' === e.purpose && e.deferS2Sbidders && !o) &&
                e.enforceVendor &&
                !(e.softVendorExceptions || []).includes(r),
              { purpose: p, vendor: l } = (0, v.hr)(n, s.type, s.id, u ? o : null);
            return (!e.enforcePurpose || p) && (!u || o === i.B1 || l);
          }
          function w(e, n, r = null, o = () => null) {
            return function (s) {
              const p = i.mW.getConsentData(),
                l = s[d.iK];
              if (
                (function (e, n, r) {
                  return null == e && i.mW.enabled
                    ? ((0, t.logWarn)(
                        `Attempting operation that requires purpose ${n} consent while consent data is not available${r ? ` (module: ${r})` : ''}. Assuming no consent was given.`,
                      ),
                      !0)
                    : e && e.gdprApplies;
                })(p, e, l)
              ) {
                const e = (function (e, n, r) {
                    if (n) {
                      const o = u.$W.getConfig('gvlMapping');
                      if (o && o[n]) return o[n];
                      if (e === a.tp) return i.B1;
                      {
                        let { gvlid: o, modules: s } = i.o2.get(n);
                        if (null == o && Object.keys(s).length > 0)
                          for (const r of C)
                            if (s.hasOwnProperty(r)) {
                              ((o = s[r]),
                                r !== e &&
                                  (0, t.logWarn)(
                                    `Multiple GVL IDs found for module '${n}'; using the ${r} module's ID (${o}) instead of the ${e}'s ID (${s[e]})`,
                                  ));
                              break;
                            }
                        return (null == o && r && (o = r()), o || null);
                      }
                    }
                    return null;
                  })(s[d.Dk], l, o(s)),
                  c = !!n(p, l, e, s);
                if (!c) return (r && r.add(l), { allow: c });
              }
            };
          }
          function D(e, n = null, r = () => null) {
            return w(e, (n, r, o, t) => !!W(B.purpose[e], n, r, o, t), n, r);
          }
          function V(e) {
            return function (n) {
              if (n[d.Dk] !== a.tp) return e(n);
            };
          }
          u.$W.getConfig('gvlLegalBasisMapping', (e) => {
            const n = e.gvlLegalBasisMapping ?? {};
            (Object.entries(n).forEach(([e, r]) => {
              r = Object.assign({}, v.e6, r);
              const o = (0, h.I)(r);
              (null != o &&
                ((0, t.logWarn)(`gvlLegalBasisMapping for GVL ID ${e} is invalid: ${o}; assuming no legal basis for any purpose`, r),
                (r = v.e6)),
                (n[e] = r));
            }),
              (0, v.Z1)(n));
          });
          const x =
            ((M = D(1, E)),
            function (e) {
              if (e[d.Dk] !== a.tp || S) return M(e);
            });
          var M;
          const j = D(1, E),
            I = D(1, E),
            L = V(D(2, y)),
            T = D(7, b, (e) =>
              (function (e, n) {
                const r = p.Ay.getAnalyticsAdapter(e);
                return ((o) => {
                  if ('function' != typeof o) return o;
                  try {
                    return o.call(r.adapter, n);
                  } catch (n) {
                    (0, t.logError)(`Error invoking ${e} adapter.gvlid()`, n);
                  }
                })(r?.adapter?.gvlid);
              })(e[d.iK], e[d.TQ]),
            ),
            F = D(4, q),
            G = D(1, E),
            N = V(
              (() => {
                const e = w(
                    '2-10',
                    function (e, n, r) {
                      for (let o = 2; o <= 10; o++) {
                        if (B.purpose[o]?.vendorExceptions?.includes(n)) return !0;
                        const { purpose: t, vendor: s } = (0, v.hr)(e, 'purpose', o, r);
                        if (t && (s || B.purpose[o]?.softVendorExceptions?.includes(n))) return !0;
                      }
                      return !1;
                    },
                    k,
                  ),
                  n = D(4, k);
                return function (...r) {
                  return (B.purpose[4]?.eidsRequireP4Consent ? n : e).apply(this, r);
                };
              })(),
            ),
            z = w('Special Feature 1', (e, n, r) => W(B.feature[1], e, n, r), P);
          (l.on(c.qY.AUCTION_END, function () {
            const e = function (e) {
                return Array.from(e.keys()).filter((e) => null != e);
              },
              n = {
                storageBlocked: e(E),
                biddersBlocked: e(y),
                analyticsBlocked: e(b),
                ufpdBlocked: e(q),
                eidsBlocked: e(k),
                geoBlocked: e(P),
              };
            (l.Ic(c.qY.TCF2_ENFORCEMENT, n), [E, y, b, q, k, P].forEach((e) => e.clear()));
          }),
            u.$W.getConfig('consentManagement', (e) =>
              (function (e) {
                let n = (0, s.A)(e, 'gdpr.rules');
                (n || (0, t.logWarn)('TCF2: enforcing P1, P2, P4, P7 and SP1 by default'),
                  (n = Object.fromEntries((n || []).map((e) => [e.purpose, e]))),
                  (S = !!(0, s.A)(e, 'strictStorageEnforcement')),
                  (0, v.Yk)(Object.assign({}, v.e6, e?.gdpr?.defaultLegalBasis ?? v.cB)),
                  Object.entries(m).forEach(([e, r]) => {
                    B[r.type][r.id] = n[e] ?? r.default;
                  }),
                  A ||
                    (null != B.purpose[1] &&
                      ((A = !0),
                      O.push((0, f.qB)(g.Ue, $, x)),
                      O.push((0, f.qB)(g.Ml, $, j)),
                      O.push((0, f.qB)(g.yl, $, I)),
                      O.push((0, f.qB)(g.yg, $, G))),
                    null != B.purpose[2] && O.push((0, f.qB)(g.uc, $, L)),
                    null != B.purpose[4] && O.push((0, f.qB)(g.DL, $, F), (0, f.qB)(g.qX, $, F)),
                    null != B.purpose[7] && O.push((0, f.qB)(g.mo, $, T)),
                    null != B.feature[1] && O.push((0, f.qB)(g.hE, $, z)),
                    O.push((0, f.qB)(g.hq, $, N))));
              })(e.consentManagement),
            ),
            (0, o.E)('tcfControl'));
        },
      },
      (e) => {
        e.O(0, [802, 7769, 5590, 1085, 10, 2708], () => {
          return ((n = 6937), e((e.s = n)));
          var n;
        });
        e.O();
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [4183],
      {
        6477(e, r, t) {
          var a = t(1068),
            i = t(1129),
            s = t(7413),
            n = t(8928),
            o = t(3435),
            p = t(3350),
            d = t(8384),
            u = t(2682),
            m = t(1779),
            c = t(3119),
            l = t(9260);
          const b = 'ttd',
            g = 1,
            f = 2;
          function h(e) {
            return {
              ttdprebid: {
                ver: 'TTD-PREBID-2025.07.15',
                pbjs: '11.23.0',
                keywords: e.site?.keywords ? e.site.keywords.split(',').map((e) => e.trim()) : [],
              },
            };
          }
          function v(e) {
            const r = {};
            return (
              e.gdprConsent && 'boolean' == typeof e.gdprConsent.gdprApplies && o.J(r, 'ext.gdpr', e.gdprConsent.gdprApplies ? 1 : 0),
              e.uspConsent && o.J(r, 'ext.us_privacy', e.uspConsent),
              !0 === d.$W.getConfig('coppa') && (r.coppa = 1),
              e.ortb2?.regs && s.mergeDeep(r, e.ortb2.regs),
              r
            );
          }
          function y(e, r) {
            const t = { tid: r?.ortb2?.source?.tid },
              a = e[0]?.ortb2?.source?.ext?.schain;
            return (a && o.J(t, 'ext.schain', a), t);
          }
          function I(e) {
            const r = navigator.language || navigator.browserLanguage || navigator.userLanguage || navigator.systemLanguage,
              t = { ua: navigator.userAgent, dnt: (0, l.l)() ? 1 : 0, language: r, connectiontype: (0, c.Z)() };
            return (s.mergeDeep(t, e.device), t);
          }
          function A(e, r) {
            const t = {};
            e.gdprConsent && o.J(t, 'ext.consent', e.gdprConsent.consentString);
            var a = n.A(e, 'bids.0.userIdAsEids');
            return (a && a.length && o.J(t, 'ext.eids', a), s.mergeDeep(t, r.user), t);
          }
          function x(e, r) {
            var t = s.mergeDeep(
                {
                  page: n.A(e, 'refererInfo.page'),
                  ref: n.A(e, 'refererInfo.ref'),
                  publisher: { id: n.A(e, 'bids.0.params.publisherId') },
                },
                r.site,
              ),
              a = e.refererInfo.domain;
            return (a && o.J(t, 'publisher.domain', a), t);
          }
          function T(e) {
            const r = { id: e.bidId },
              t = n.A(e, 'ortb2Imp.ext.gpid');
            r.exp = 360;
            const a = t || e.params.placementId;
            a && (r.tagid = a);
            const i = n.A(e, 'mediaTypes.video'),
              o = {};
            (n.A(e, 'mediaTypes.banner') &&
              (o[m.D4] = (function (e) {
                const r = (function (e) {
                    const r = s
                      .parseSizesInput(e)
                      .filter((e) => e)
                      .map((e) => e.split('x'))
                      .map((e) => ({ width: parseInt(e[0]), height: parseInt(e[1]) }));
                    return r;
                  })(e.mediaTypes.banner.sizes).map((e) => ({ w: e.width, h: e.height })),
                  t = parseInt(n.A(e, 'mediaTypes.banner.pos')),
                  a = n.A(e, 'params.banner.expdir'),
                  i = {};
                t && (i.pos = t);
                a && Array.isArray(a) && (i.expdir = a);
                const o = Object.assign({ w: r[0].w, h: r[0].h, format: r }, i),
                  p = n.A(e, 'ortb2Imp.banner.battr');
                p && (o.battr = p);
                return o;
              })(e)),
              i &&
                (o[m.G_] = (function (e) {
                  {
                    const r = e?.mediaTypes?.video;
                    if (!r) return;
                    const {
                        minduration: t = 0,
                        maxduration: a,
                        playerSize: i,
                        api: s,
                        mimes: n,
                        placement: o,
                        plcmt: p,
                        protocols: d,
                        playbackmethod: u,
                        pos: m,
                        startdelay: c,
                        skip: l,
                        skipmin: b,
                        skipafter: g,
                        minbitrate: f,
                        maxbitrate: h,
                      } = r,
                      v = {
                        minduration: t,
                        ...(void 0 !== a && { maxduration: a }),
                        ...(s && { api: s }),
                        ...(n && { mimes: n }),
                        ...(void 0 !== o && { placement: o }),
                        ...(void 0 !== p && { plcmt: p }),
                        ...(d && { protocols: d }),
                        ...(void 0 !== u && { playbackmethod: u }),
                        ...(void 0 !== m && { pos: m }),
                        ...(void 0 !== c && { startdelay: c }),
                        ...(void 0 !== l && { skip: l }),
                        ...(void 0 !== b && { skipmin: b }),
                        ...(void 0 !== g && { skipafter: g }),
                        ...(void 0 !== f && { minbitrate: f }),
                        ...(void 0 !== h && { maxbitrate: h }),
                      };
                    if (i) {
                      const [e, r] = Array.isArray(i[0]) ? i[0] : i;
                      ((v.w = Number(e)), (v.h = Number(r)));
                    }
                    const y = e?.ortb2Imp?.video?.battr;
                    return (y && (v.battr = y), v);
                  }
                })(e)),
              Object.assign(r, o));
            const d = (function (e) {
              if (e.params.bidfloor) return e.params.bidfloor;
              if (!p.fp(e.getFloor)) return null;
              const r = e.getFloor({ currency: 'USD', mediaType: '*', size: '*' });
              return p.Qd(r) && !isNaN(r.floor) && 'USD' === r.currency ? r.floor : null;
            })(e);
            d && ((r.bidfloor = parseFloat(d)), (r.bidfloorcur = 'USD'));
            const u = n.A(e, 'ortb2Imp.secure');
            r.secure = (0, p.Et)(u) ? u : 1;
            const { video: c, ...l } = e.ortb2Imp;
            return (s.mergeDeep(r, l), r);
          }
          const w = {
            code: b,
            gvlid: 21,
            alwaysHasCapacity: !0,
            aliases: ['thetradedesk'],
            supportedMediaTypes: [m.D4, m.G_],
            isBidRequestValid: function (e) {
              if (!e || !e.params) return (s.logWarn(b + ': Missing bid parameters'), !1);
              if (!e.params.supplySourceId) return (s.logWarn(b + ': Missing required parameter params.supplySourceId'), !1);
              if (!/^[\w+]+$/.test(e.params.supplySourceId))
                return (s.logWarn(b + ': supplySourceId must only contain alphabetic characters'), !1);
              if (!e.params.publisherId) return (s.logWarn(b + ': Missing required parameter params.publisherId'), !1);
              if (e.params.publisherId.length > 64) return (s.logWarn(b + ': params.publisherId must be 64 characters or less'), !1);
              if (e.params.bidfloor && isNaN(parseFloat(e.params.bidfloor))) return !1;
              const r = n.A(e, 'ortb2Imp.ext.gpid');
              if (!e.params.placementId && !r)
                return (
                  s.logWarn(
                    b +
                      ': one of params.placementId or gpid (via the GPT module https://docs.prebid.org/dev-docs/modules/gpt-pre-auction.html) must be passed',
                  ),
                  !1
                );
              if (
                e.params.customBidderEndpoint &&
                (!e.params.customBidderEndpoint.startsWith('https://') || !e.params.customBidderEndpoint.endsWith('/bid/bidder/'))
              )
                return (
                  s.logWarn(b + ': if params.customBidderEndpoint is provided, it must start with https:// and end with /bid/bidder/'),
                  !1
                );
              const t = n.A(e, 'mediaTypes.banner'),
                a = n.A(e, 'mediaTypes.video');
              if (!t && !a) return (s.logWarn(b + ': one of mediaTypes.banner or mediaTypes.video must be passed'), !1);
              if (a) {
                if (!a.maxduration || !p.Fq(a.maxduration))
                  return (s.logWarn(b + ': mediaTypes.video.maxduration must be set to the maximum video ad duration in seconds'), !1);
                if (!a.api || 0 === a.api.length)
                  return (
                    s.logWarn(
                      b +
                        ': mediaTypes.video.api should be an array of supported api frameworks. See the Open RTB v2.5 spec for valid values',
                    ),
                    !1
                  );
                if (!a.mimes || 0 === a.mimes.length)
                  return (s.logWarn(b + ': mediaTypes.video.mimes should be an array of supported mime types'), !1);
                if (!a.protocols)
                  return (
                    s.logWarn(
                      b +
                        ': mediaTypes.video.protocols should be an array of supported protocols. See the Open RTB v2.5 spec for valid values',
                    ),
                    !1
                  );
              }
              return !0;
            },
            buildRequests: function (e, r) {
              const t = r.ortb2 || {},
                a = r.ortb2Imp || {},
                i = {
                  id: r.bidderRequestId,
                  imp: e.map((e) => T(e)),
                  site: x(r, t),
                  device: I(t),
                  user: A(r, t),
                  at: 1,
                  tmax: Math.max(r.timeout || 400, 400),
                  cur: ['USD'],
                  regs: v(r),
                  source: y(e, r),
                  ext: h(t),
                };
              (t && t.bcat && (i.bcat = t.bcat),
                t && t.badv && (i.badv = t.badv),
                t && t.app && (i.app = t.app),
                ((t && t.pmp) || (a && a.pmp)) &&
                  i.imp.forEach((e) => {
                    e.pmp = s.mergeDeep({}, e.pmp || {}, t?.pmp || {}, a?.pmp || {});
                  }));
              var n;
              return {
                method: 'POST',
                url:
                  ((n = r.bids[0].params).customBidderEndpoint ? n.customBidderEndpoint : 'https://direct.adsrvr.org/bid/bidder/') +
                  r.bids[0].params.supplySourceId,
                data: i,
                options: { withCredentials: !0 },
              };
            },
            interpretResponse: function (e, r) {
              const t = n.A(e, 'body.seatbid'),
                a = n.A(e, 'body.cur');
              if (!t || 0 === t.length) return [];
              const i = [],
                o = n.A(r, 'data.imp');
              return (
                t.forEach((e) => {
                  e.bid.forEach((e) => {
                    const r = o.find((r) => r.id === e.impid),
                      t = e.price || 0,
                      n = {
                        requestId: e.impid,
                        cpm: t,
                        creativeId: e.crid,
                        dealId: e.dealid || null,
                        currency: a || 'USD',
                        netRevenue: !0,
                        ttl: e.ttl || 360,
                        meta: {},
                      };
                    (e.adomain && e.adomain.length > 0 && (n.meta.advertiserDomains = e.adomain),
                      e.ext.mediatype === g
                        ? Object.assign(n, { width: e.w, height: e.h, ad: s.replaceAuctionPrice(e.adm, t), mediaType: m.D4 })
                        : e.ext.mediatype === f &&
                          (Object.assign(n, { width: r.video.w, height: r.video.h, mediaType: m.G_ }),
                          e.nurl ? (n.vastUrl = s.replaceAuctionPrice(e.nurl, t)) : (n.vastXml = s.replaceAuctionPrice(e.adm, t))),
                      i.push(n));
                  });
                }),
                i
              );
            },
            getUserSyncs: function (e, r, t = {}, a = '') {
              const i = [],
                s = `&gdpr=${t.gdprApplies ? 1 : 0}&gdpr_consent=${encodeURIComponent(t.consentString)}`,
                n = `https://match.adsrvr.org/track/usersync?us_privacy=${encodeURIComponent(a)}${s}`;
              return (
                e.pixelEnabled
                  ? i.push({ type: 'image', url: n + '&ust=image' })
                  : e.iframeEnabled && i.push({ type: 'iframe', url: n + '&ust=iframe' }),
                i
              );
            },
          };
          ((0, u.a$)(w),
            (0, i.E)('ttdBidAdapter'),
            Object.assign(a.W1, {
              21: { purposes: [1, 3, 4], legIntPurposes: [2, 7, 10], flexiblePurposes: [2, 7, 10], specialFeatures: [1] },
            }));
        },
      },
      (e) => {
        e.O(0, [802, 7769, 5590, 1085, 259, 315], () => {
          return ((r = 6477), e((e.s = r)));
          var r;
        });
        e.O();
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [8907],
      {
        9847(e, r, t) {
          var o = t(1129),
            n = t(7413),
            i = t(1785),
            s = t(2354),
            a = t(7449),
            u = t(1531),
            d = t(9582);
          const p = 'uid2',
            l = `PrebidJS-11.23.0-UID2Module-${u.kz}`,
            c = 'UID2: ';
          function f(e, r) {
            return function (...t) {
              e(r + ' ', ...t);
            };
          }
          const m = f(n.logInfo, c),
            k = f(n.logWarn, c),
            g = (0, s.vM)({ moduleType: a.fW, moduleName: p }),
            I = {
              name: p,
              decode(e) {
                const r = (function (e) {
                  if ('string' == typeof e) {
                    m('Found server-only token. Refresh is unavailable for this token.');
                    return { uid2: { id: e } };
                  }
                  if ('optout' === e.latestToken)
                    return (m('Found optout token.  Refresh is unavailable for this token.'), { uid2: { optout: !0 } });
                  if (Date.now() < e.latestToken.identity_expires) return { uid2: { id: e.latestToken.advertising_token } };
                  return null;
                })(e);
                return (m('UID2 decode returned', r), r);
              },
              getId(e, r) {
                if (!0 === r?.gdpr?.gdprApplies)
                  return void k('UID2 is not intended for use where GDPR applies. The UID2 module will not run.');
                const t = {
                  apiBaseUrl: e?.params?.uid2ApiBase ?? 'https://prod.uidapi.com',
                  paramToken: e?.params?.uid2Token,
                  serverCookieName: e?.params?.uid2Cookie ?? e?.params?.uid2ServerCookie,
                  storage: e?.params?.storage ?? 'localStorage',
                  clientId: l,
                  internalStorage: '__uid2_advertising_token',
                };
                ((t.cstg = {
                  serverPublicKey: e?.params?.serverPublicKey,
                  subscriptionId: e?.params?.subscriptionId,
                  ...(0, u.E0)(e?.params ?? {}),
                }),
                  m('UID2 configuration loaded and mapped.', t));
                const o = (0, u.wq)(t, g, m, k);
                return (m('UID2 getId returned', o), o);
              },
              eids: d.x,
            };
          ((0, i.bz)('userId', I), (0, o.E)('uid2IdSystem'));
        },
      },
      (e) => {
        e.O(0, [802, 7769, 5590, 1085, 1912, 4950], () => {
          return ((r = 9847), e((e.s = r)));
          var r;
        });
        e.O();
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [891],
      {
        3525(r, e, t) {
          var s = t(1068),
            d = t(1129),
            i = t(7413),
            o = t(8964),
            n = t(1785),
            u = t(7900);
          const a = o.RD.withCallers([['userId', 'unifiedId']]),
            l = 'unifiedId',
            c = {
              name: l,
              gvlid: 21,
              decode: (r) => (r && 'string' == typeof r.TDID ? { tdid: r.TDID } : void 0),
              getId(r) {
                const e = (r && r.params) || {};
                if (!e || ('string' != typeof e.partner && 'string' != typeof e.url))
                  return void (0, i.logError)('User ID - unifiedId submodule requires either partner or url to be defined');
                const t = e.url || `https://match.adsrvr.org/track/rid?ttd_pid=${e.partner}&fmt=json`;
                return {
                  callback: function (r) {
                    a(
                      t,
                      {
                        success: (e) => {
                          let t;
                          if (e)
                            try {
                              t = JSON.parse(e);
                            } catch (r) {
                              (0, i.logError)(r);
                            }
                          r(t);
                        },
                        error: (e) => {
                          ((0, i.logError)(`${l}: ID fetch encountered an error`, e), r());
                        },
                      },
                      void 0,
                      { method: 'GET', withCredentials: !0 },
                    );
                  },
                };
              },
              eids: { tdid: { ...u.M.tdid, mm: 4, inserter: 'adserver.org', matcher: 'adserver.org' } },
            };
          ((0, n.bz)('userId', c),
            (0, d.E)('unifiedIdSystem'),
            Object.assign(s.W1, {
              21: { purposes: [1, 3, 4], legIntPurposes: [2, 7, 10], flexiblePurposes: [2, 7, 10], specialFeatures: [1] },
            }));
        },
      },
      (r) => {
        r.O(0, [802, 7769, 5590, 1085, 7045], () => {
          return ((e = 3525), r((r.s = e)));
          var e;
        });
        r.O();
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [3469],
      {
        1424(e, t, n) {
          var o = n(1129),
            r = n(8384),
            s = n(3399),
            i = n(8224),
            a = n(4794),
            c = n(5521),
            u = n(1785),
            l = n(3350),
            d = n(7413);
          const f = new Map();
          function g(e, t = f) {
            const n = {};
            function o(e) {
              const t = JSON.stringify([
                e.source?.toLowerCase(),
                ...Object.keys(e)
                  .filter((e) => !['uids', 'source'].includes(e))
                  .sort()
                  .map((t) => e[t]),
              ]);
              n.hasOwnProperty(t) ? n[t].uids.push(...e.uids) : (n[t] = e);
            }
            return (
              Object.entries(e).forEach(([e, n]) => {
                n = Array.isArray(n) ? n : [n];
                const r = t.get(e);
                let s;
                if ('pubProvidedId' === e) s = (0, l.Go)(n);
                else if ('function' == typeof r)
                  try {
                    ((s = (0, l.Go)(r(n))),
                      Array.isArray(s) || (s = [s]),
                      s.forEach((e) => {
                        e.uids = e.uids.filter(({ id: e }) => (0, l.O8)(e));
                      }),
                      (s = s.filter(({ uids: e }) => e?.length > 0)));
                  } catch (t) {
                    (0, d.logError)(`Could not generate EID for "${e}"`, t);
                  }
                else
                  s = n.map((e) =>
                    (function (e, t, n) {
                      if (n && e) {
                        const t = {};
                        t.source = (0, l.fp)(n.getSource) ? n.getSource(e) : n.source;
                        const o = (0, l.fp)(n.getValue) ? n.getValue(e) : e;
                        if ((0, l.O8)(o)) {
                          const r = { id: o, atype: n.atype };
                          if ((0, l.fp)(n.getUidExt)) {
                            const t = n.getUidExt(e);
                            t && (r.ext = t);
                          }
                          if (((t.uids = [r]), n.inserter || (0, l.fp)(n.getInserter))) {
                            const o = (0, l.fp)(n.getInserter) ? n.getInserter(e) : n.inserter;
                            null != o && (t.inserter = o);
                          }
                          if (n.matcher || (0, l.fp)(n.getMatcher)) {
                            const o = (0, l.fp)(n.getMatcher) ? n.getMatcher(e) : n.matcher;
                            null != o && (t.matcher = o);
                          }
                          if ((null != n.mm && (t.mm = n.mm), (0, l.fp)(n.getEidExt))) {
                            const o = n.getEidExt(e);
                            o && (t.ext = o);
                          }
                          return t;
                        }
                      }
                      return null;
                    })(e, 0, r),
                  );
                Array.isArray(s) && s.filter((e) => null != e).forEach(o);
              }),
              Object.values(n)
            );
          }
          function m(e) {
            const t = new Map(),
              n = {};
            return (
              Object.entries(e).forEach(([e, o]) => {
                const r = o();
                if (r) {
                  n[e] = r.idObj[e];
                  let o = r.submodule.eids?.[e];
                  ('function' == typeof o && ((s = o), (o = (...e) => s(...e, r.config))), t.set(e, o));
                }
                var s;
              }),
              g(n, t)
            );
          }
          var b = n(2354),
            p = n(3435),
            h = n(84),
            y = n(8203),
            I = n(2822),
            w = n(765),
            E = n(1068),
            D = n(7449),
            S = n(4283),
            O = n(323),
            k = n(5881),
            $ = n(3838),
            v = n(724),
            j = n(8497);
          const x = 'User ID',
            A = b.X0,
            C = b.qk,
            T = '_pbjs_id_optout',
            U = (0, b.CK)('userId'),
            N = { isAllowed: S.io };
          let L,
            P,
            _,
            W,
            q,
            M = [],
            R = [],
            F = {},
            G = [];
          const J = (() => {
            let e;
            return () => (null == e && (e = (0, I.K7)()), e);
          })();
          function B(e) {
            return J()
              .fork()
              .renameWith((t) => [`userId.mod.${t}`, `userId.mods.${e}.${t}`]);
          }
          function K(e, t) {
            t = t || e.storageMgr;
            const n = 'function' == typeof e.submodule.domainOverride ? e.submodule.domainOverride() : null,
              o = e.config.storage.name;
            return function (e, r, s) {
              t.setCookie(o + (e || ''), r, s, 'Lax', n);
            };
          }
          function Q(e, t) {
            const n = e.config.storage;
            try {
              const o = new Date(Date.now() + 864e5 * n.expires).toUTCString(),
                r = (0, l.Qd)(t) ? JSON.stringify(t) : t;
              e.enabledStorageTypes.forEach((t) => {
                switch (t) {
                  case A:
                    !(function (e, t, n) {
                      const o = e.config.storage,
                        r = K(e);
                      (r(null, t, n), r('_cst', pe(), n), 'number' == typeof o.refreshInSeconds && r('_last', new Date().toUTCString(), n));
                    })(e, r, o);
                    break;
                  case C:
                    !(function (e, t, n) {
                      const o = e.config.storage,
                        r = e.storageMgr;
                      (r.setDataInLocalStorage(`${o.name}_exp`, n),
                        r.setDataInLocalStorage(`${o.name}_cst`, pe()),
                        r.setDataInLocalStorage(o.name, encodeURIComponent(t)),
                        'number' == typeof o.refreshInSeconds && r.setDataInLocalStorage(`${o.name}_last`, new Date().toUTCString()));
                    })(e, r, o);
                }
              });
            } catch (e) {
              (0, d.logError)(e);
            }
          }
          const H = ['', '_last', '_cst'];
          const V = ['', '_last', '_exp', '_cst'];
          function Y(e) {
            (Oe(e),
              e.enabledStorageTypes.forEach((t) => {
                switch (t) {
                  case A:
                    !(function (e) {
                      const t = K(e, U),
                        n = new Date(Date.now() - 864e5).toUTCString();
                      H.forEach((e) => {
                        try {
                          t(e, '', n);
                        } catch (e) {
                          (0, d.logError)(e);
                        }
                      });
                    })(e);
                    break;
                  case C:
                    !(function (e) {
                      V.forEach((t) => {
                        try {
                          U.removeDataFromLocalStorage(e.config.storage.name + t);
                        } catch (e) {
                          (0, d.logError)(e);
                        }
                      });
                    })(e);
                }
              }));
          }
          function Z(e, t = void 0) {
            const n = e.config.storage,
              o = t ? `${n.name}_${t}` : n.name;
            let r;
            try {
              (e.enabledStorageTypes.find((t) => {
                switch (t) {
                  case A:
                    r = (function (e, t) {
                      return e.storageMgr.getCookie(t);
                    })(e, o);
                    break;
                  case C:
                    r = (function (e, t) {
                      const n = e.storageMgr,
                        o = e.config.storage,
                        r = n.getDataFromLocalStorage(`${o.name}_exp`);
                      return '' === r
                        ? n.getDataFromLocalStorage(t)
                        : r && new Date(r).getTime() - Date.now() > 0
                          ? decodeURIComponent(n.getDataFromLocalStorage(t))
                          : void 0;
                    })(e, o);
                }
                return !!r;
              }),
                'string' == typeof r && '{' === r.trim().charAt(0) && (r = JSON.parse(r)));
            } catch (e) {
              (0, d.logError)(e);
            }
            return r;
          }
          function z(e, t, n) {
            t = J().fork().startTiming('userId.callbacks.total').stopBefore(t);
            const o = (0, d.delayExecution)(() => {
              (clearTimeout(void 0), t());
            }, e.length);
            e.forEach(function (e) {
              const t = B(e.submodule.name).startTiming('callback').stopBefore(o);
              try {
                e.callback(
                  function (o) {
                    (o
                      ? (e.config.storage && Q(e, o), (e.idObj = e.submodule.decode(o, e.config)), n.refresh(), ye(n))
                      : (0, d.logInfo)(`${x}: ${e.submodule.name} - request id responded with an empty value`),
                      t());
                  },
                  Z.bind(null, e),
                );
              } catch (n) {
                ((0, d.logError)(`Error in userID module '${e.submodule.name}':`, n), t());
              }
              e.callback = void 0;
            });
          }
          function X(e, t, n) {
            const o = {};
            return (
              e.forEach((e) => {
                const r = n(e),
                  s = (function (e) {
                    if (e.primaryIds) return e.primaryIds;
                    const t = Object.keys(e.eids ?? {});
                    if (t.length > 1) throw new Error(`ID submodule ${e.name} can provide multiple IDs, but does not specify 'primaryIds'`);
                    return t;
                  })(r);
                t(e).forEach((t) => {
                  const n = (o[t] = o[t] ?? []),
                    i = F[t]?.indexOf(r.name) ?? (s.includes(t) ? 0 : -1),
                    a = n.findIndex(([e]) => e < i);
                  n.splice(-1 === a ? n.length : a, 0, [i, e]);
                });
              }),
              Object.fromEntries(Object.entries(o).map(([e, t]) => [e, t.map(([e, t]) => t)]))
            );
          }
          function ee({ ortb2Fragments: e }) {
            !(function (e) {
              const { global: t, bidder: n } = e,
                { global: o, bidder: r } = L,
                s = m(o);
              (s.length > 0 && (0, p.J)(t, 'user.ext.eids', (t.user?.ext?.eids ?? []).concat(s)),
                Object.entries(r).forEach(([e, t]) => {
                  const o = m(t);
                  o.length > 0 && (0, p.J)(n, `${e}.user.ext.eids`, (n[e]?.user?.ext?.eids ?? []).concat(o));
                }));
            })((e = e ?? { global: {}, bidder: {} }));
          }
          const te = {};
          let ne;
          function oe(e = ce() || []) {
            const t = W && e.find((e) => e.source === W);
            if (t && 'string' == typeof t?.uids?.[0]?.id) {
              const e = t.uids[0].id.replace(/[\W_]/g, '');
              if (e.length >= 32 && e.length <= 150) return e;
              (0, d.logWarn)(`User ID - Googletag Publisher Provided ID for ${W} is not between 32 and 150 characters - ${e}`);
            }
          }
          const re = (0, I.Ak)('userId', function (e, t, { mkDelay: n = y.cb, getIds: o = be } = {}) {
            y.U9.race([o().catch(() => null), n(_)]).then(() => {
              (ee(t), J().join((0, I.BO)(t.metrics), { propagate: !1, includeGroups: !0 }), e.call(this, t));
            });
          });
          function se(e, t) {
            (t.forEach((e) => {
              e.bids.forEach((t) =>
                Object.defineProperty(t, 'userIdAsEids', { configurable: !0, get: () => e.ortb2.user?.ext?.eids ?? [] }),
              );
            }),
              e(t));
          }
          function ie(e, t) {
            const n = {},
              o = t.getFPD()?.global?.user?.ext?.eids ?? [];
            (t
              .getAdUnits()
              .flatMap((e) => e.bids)
              .forEach((e) => {
                const r =
                  null == (s = e.bidder)
                    ? o
                    : (n.hasOwnProperty(s) ||
                        (n[s] = (0, d.mergeDeep)({ eids: [] }, { eids: o }, { eids: t.getFPD()?.bidder?.[s]?.user?.ext?.eids ?? [] }).eids),
                      n[s]);
                var s;
                r.length > 0 && (e.userIdAsEids = r);
              }),
              e(t));
          }
          function ae() {
            return (
              (e = L.combined),
              Object.fromEntries(
                Object.entries(e)
                  .map(([e, t]) => [e, t()?.idObj?.[e]])
                  .filter(([e, t]) => null != t),
              )
            );
            var e;
          }
          function ce() {
            return m(L.combined);
          }
          function ue(e) {
            return ce().filter((t) => t.source === e)[0];
          }
          function le(e, t, n) {
            return ge().then(() => {
              const o = {};
              if ((0, l.fp)(n)) {
                (0, d.logInfo)(`${x} - Getting encrypted signal from custom function : ${n.name} & source : ${e} `);
                const t = n(e);
                o[e] = t ? de(t) : null;
              } else {
                const n = ue(e);
                ((0, d.logInfo)(`${x} - Getting encrypted signal for eids :${JSON.stringify(n)}`),
                  (0, d.isEmpty)(n) || (o[n.source] = !0 === t ? de(n) : n.uids[0].id));
              }
              return ((0, d.logInfo)(`${x} - Fetching encrypted eids: ${o[e]}`), o[e]);
            });
          }
          function de(e, t = 1) {
            let n = '';
            if (1 === t) n = 'object' == typeof e ? window.btoa(JSON.stringify(e)) : window.btoa(e);
            return `${t}||${n}`;
          }
          function fe() {
            if (!(0, d.isGptPubadsDefined)()) return;
            const e = r.$W.getConfig('userSync.encryptedSignalSources');
            if (e) {
              const t = e.registerDelay || 0;
              setTimeout(() => {
                e.sources &&
                  e.sources.forEach(({ source: e, encrypt: t, customFunc: n }) => {
                    e.forEach((e) => {
                      window.googletag.secureSignalProviders.push({ id: e, collectorFunction: () => le(e, t, n) });
                    });
                  });
              }, t);
            } else (0, d.logWarn)(`${x} - ESP : encryptedSignalSources config not defined under userSync Object`);
          }
          function ge(e) {
            const t = ne(e);
            return t.then(
              () => (ne() === t ? ae() : ge()),
              (e) => (e === te ? Promise.resolve().then(be) : ((0, d.logError)('Error initializing userId', e), y.U9.reject(e))),
            );
          }
          function me({ submoduleNames: e } = {}, t) {
            return ge({ refresh: !0, submoduleNames: e }).then((e) => (t && (0, l.fp)(t) && t(), e));
          }
          function be() {
            return ge();
          }
          function pe() {
            let e = Number(E.SL.hash);
            const t = [];
            for (; e > 0; ) (t.push(String.fromCharCode(255 & e)), (e >>>= 8));
            return btoa(t.join(''));
          }
          function he(e, t) {
            const n = E.SL.getConsentData();
            if (e.config.storage) {
              let o,
                r = Z(e),
                s = !1;
              if ('number' == typeof e.config.storage.refreshInSeconds) {
                const t = new Date(Z(e, 'last'));
                s = t && Date.now() - t.getTime() > 1e3 * e.config.storage.refreshInSeconds;
              }
              if (
                !r ||
                s ||
                t ||
                (function (e) {
                  const t = Z(e, 'cst');
                  return !t || t !== pe();
                })(e)
              ) {
                const t = Object.assign({ enabledStorageTypes: e.enabledStorageTypes }, e.config);
                o = e.submodule.getId(t, n, r);
              } else 'function' == typeof e.submodule.extendId && (o = e.submodule.extendId(e.config, n, r));
              ((0, l.Qd)(o) && (o.id && (Q(e, o.id), (r = o.id)), 'function' == typeof o.callback && (e.callback = o.callback)),
                r && (e.idObj = e.submodule.decode(r, e.config)));
            } else if (e.config.value) e.idObj = e.config.value;
            else {
              const t = e.submodule.getId(e.config, n);
              (0, l.Qd)(t) &&
                ('function' == typeof t.callback && (e.callback = t.callback), t.id && (e.idObj = e.submodule.decode(t.id, e.config)));
            }
          }
          function ye(e) {
            const t = m(e.combined);
            if (t.length && W) {
              const e = oe(t);
              e &&
                ((0, d.isGptPubadsDefined)()
                  ? window.googletag.pubads().setPublisherProvidedId(e)
                  : ((window.googletag = window.googletag || {}),
                    (window.googletag.cmd = window.googletag.cmd || []),
                    window.googletag.cmd.push(function () {
                      window.googletag.pubads().setPublisherProvidedId(e);
                    })));
            }
          }
          function Ie(e, t, n = !1) {
            return J()
              .fork()
              .measureTime('userId.init.modules', function () {
                if (
                  U.getDataFromLocalStorage(T)
                    ? ((0, d.logInfo)(`${x} - opt-out localStorage found, userId disabled`), 1)
                    : U.getCookie(T) && ((0, d.logInfo)(`${x} - opt-out cookie found, userId disabled`), 1)
                )
                  return (e.reset(), []);
                if (!t.length) return [];
                if (
                  (t.forEach((e) => Oe(e)),
                  !(t = t.filter(
                    (e) => (!e.config.storage || !!e.enabledStorageTypes.length) && N.isAllowed(O.yl, (0, k.s)(D.fW, e.config.name)),
                  )).length)
                )
                  return ((0, d.logWarn)(`${x} - no ID module configured`), []);
                const o = t.reduce(
                  (e, t) =>
                    B(t.submodule.name).measureTime('init', () => {
                      try {
                        (he(t, n), e.push(t));
                      } catch (e) {
                        (0, d.logError)(`Error in userID module '${t.submodule.name}':`, e);
                      }
                      return e;
                    }),
                  [],
                );
                return (e.refresh(o), ye(e), o);
              });
          }
          function we(e) {
            return e?.storage?.type?.trim().split(/\s*&\s*/) || [];
          }
          function Ee(e) {
            function t(e, ...t) {
              (0, d.logWarn)(`Invalid userSync.userId config: ${e}`, ...t);
            }
            return Array.isArray(e)
              ? e.filter((e) => {
                  if (!e?.name) return t('must specify "name"', e);
                  if (e.storage) {
                    if (!e.storage.name || !e.storage.type) return t('must specify "storage.name" and "storage.type"', e);
                    if (
                      !(function (e) {
                        return we(e).every((e) => De.has(e));
                      })(e)
                    )
                      return t('invalid "storage.type"', e);
                    ['expires', 'refreshInSeconds'].forEach((n) => {
                      let o = e.storage[n];
                      null != o &&
                        'number' != typeof o &&
                        ((o = Number(o)),
                        isNaN(o) ? (t(`storage.${n} must be a number and will be ignored`, e), delete e.storage[n]) : (e.storage[n] = o));
                    });
                  }
                  return !0;
                })
              : (null != e && t('must be an array', e), []);
          }
          const De = new Set([C, A]);
          const Se = [1, 2, 3, 4, 7];
          function Oe(e) {
            if (e.enabledStorageTypes) return;
            const t = we(e.config);
            e.enabledStorageTypes = t.filter((t) => {
              switch (t) {
                case C:
                  return (
                    V.forEach((t) => {
                      (0, b.p6)('userId', { type: 'web', identifier: e.config.storage.name + t, purposes: Se });
                    }),
                    (function (e) {
                      return !!e.storageMgr.localStorageIsEnabled();
                    })(e)
                  );
                case A:
                  return (
                    H.forEach((t) => {
                      (0, b.p6)('userId', {
                        type: 'cookie',
                        identifier: e.config.storage.name + t,
                        purposes: Se,
                        maxAgeSeconds: 24 * (e.config.storage.expires ?? 0) * 60 * 60,
                        cookieRefresh: !0,
                      });
                    }),
                    (function (e) {
                      return !!e.storageMgr.cookiesAreEnabled();
                    })(e)
                  );
              }
              return !1;
            });
          }
          function ke(e) {
            (f.clear(),
              Object.entries(
                X(
                  e,
                  (e) => Object.keys(e.eids || {}),
                  (e) => e,
                ),
              ).forEach(([e, t]) => f.set(e, t[0].eids[e])));
          }
          function $e(e = {}) {
            ke(G);
            const t = Ee(R);
            if (!t.length) return;
            const n = (function (e, t, n = M, o = G) {
              const { autoRefresh: r, retainConfig: s } = e;
              return o.reduce((e, o) => {
                const { name: i, aliasName: a } = o,
                  c = (e) => [i, a].some((t) => t?.toLowerCase() === e.toLowerCase()),
                  u = t.find((e) => c(e.name));
                if (!u) {
                  if (!s) return e;
                  const t = n.find((e) => c(e.config.name));
                  return t ? [...e, t] : e;
                }
                const l = {
                  submodule: o,
                  config: { ...u, name: o.name },
                  callback: void 0,
                  idObj: void 0,
                  storageMgr: (0, b.le)({ moduleType: D.fW, moduleName: u.name, advertiseKeys: !1 }),
                };
                if (r) {
                  const e = n.find((e) => c(e.config.name));
                  l.refreshIds = !e || !(0, d.deepEqual)(l.config, e.config);
                }
                return [...e, l];
              }, []);
            })(e, t);
            (M.splice(0, M.length),
              M.push(...n),
              M.length &&
                (i.gH.getHooks({ hook: re }).length ||
                  (i.gH.before(re, 100), a.Ay.callDataDeletionRequest.before(ve), h.Q.after((e) => e(oe()))),
                (0, d.logInfo)(
                  `${x} - usersync config updated for ${M.length} submodules: `,
                  M.map((e) => e.submodule.name),
                )));
          }
          function ve(e, ...t) {
            ((0, d.logInfo)('UserID: received data deletion request; deleting all stored IDs...'),
              M.forEach((e) => {
                if ('function' == typeof e.submodule.onDataDeletionRequest)
                  try {
                    e.submodule.onDataDeletionRequest(e.config, e.idObj, ...t);
                  } catch (t) {
                    (0, d.logError)(`Error calling onDataDeletionRequest for ID submodule ${e.submodule.name}`, t);
                  }
                Y(e);
              }),
              e.apply(this, t));
          }
          function je(e) {
            return function (...t) {
              return Promise.resolve(e.apply(this, t));
            };
          }
          const xe = (e, t) => (n) => {
            if (n[v.Dk] !== D.fW || !n[v.OI]) return;
            const o = e.find((e) => {
              return ((t = e.name), n[v.iK]?.toLowerCase() === t?.toLowerCase());
              var t;
            });
            if (o && o.storage && n[v.Zw] !== o.storage.type) {
              const e = `${o.name} attempts to store data in ${n[v.Zw]} while configuration allows ${o.storage.type}.`;
              if (t) return { allow: !1, reason: e };
              (0, d.logWarn)(e);
            }
          };
          function Ae(e, { mkDelay: t = y.cb } = {}) {
            let n;
            ((W = void 0),
              (M = []),
              (R = []),
              (L = (function () {
                const e = {
                  submodules: [],
                  global: {},
                  bidder: {},
                  combined: {},
                  refresh(n = []) {
                    const o = new Set(n.map((e) => e.submodule));
                    ((e.submodules = e.submodules.filter((e) => !o.has(e.submodule)).concat(n)), t());
                  },
                  reset() {
                    ((e.submodules = []), t());
                  },
                };
                function t() {
                  const t = X(
                      e.submodules,
                      (e) => Object.keys(e.idObj ?? {}),
                      (e) => e.submodule,
                    ),
                    n = {},
                    o = {};
                  function r(e, t, n) {
                    return function () {
                      for (const { allowed: o, bidders: r, module: s } of n) {
                        if (!N.isAllowed(O.yl, (0, k.s)(D.fW, s?.config?.name, { init: !1 }))) continue;
                        const i = s.idObj?.[e];
                        if (null != i) {
                          if (o) return s;
                          if (t) {
                            const t = (e) => e.map((e) => e.module.submodule.name).join(', ');
                            return (
                              (0, d.logWarn)(
                                `userID modules ${t(n)} provide the same ID ('${e}'); ${s.submodule.name} is the preferred source, but it's configured only for some bidders, unlike ${t(n.filter((e) => null == e.bidders))}. Other bidders will not see the "${e}" ID.`,
                              ),
                              null
                            );
                          }
                          if (null == r) return null;
                        }
                      }
                      return null;
                    };
                  }
                  Object.entries(t).forEach(([e, t]) => {
                    let s = !0;
                    const i = new Set();
                    ((t = t.map((e) => {
                      let t = null;
                      return (
                        Array.isArray(e.config.bidders) && e.config.bidders.length > 0
                          ? ((t = e.config.bidders), t.forEach((e) => i.add(e)))
                          : (s = !1),
                        { module: e, bidders: t }
                      );
                    })),
                      s ||
                        (n[e] = r(
                          e,
                          !0,
                          t.map(({ bidders: e, module: t }) => ({ allowed: null == e, bidders: e, module: t })),
                        )),
                      i.forEach((n) => {
                        ((o[n] = o[n] ?? {}),
                          (o[n][e] = r(
                            e,
                            !1,
                            t.map(({ bidders: e, module: t }) => ({ allowed: e?.includes(n), bidders: e, module: t })),
                          )));
                      }));
                  });
                  const s = Object.values(o)
                    .concat([n])
                    .reduce((e, t) => Object.assign(e, t), {});
                  Object.assign(e, { global: n, bidder: o, combined: s });
                }
                return e;
              })()),
              (ne = (function ({ mkDelay: e = y.cb } = {}) {
                const t = (0, y.v6)(),
                  n = (0, y.v6)();
                let o,
                  r,
                  i = !1,
                  a = !1;
                function d(e) {
                  return (
                    (r = J().fork()),
                    null != o && o.reject(te),
                    (o = (0, y.v6)()),
                    y.U9.race([e, o.promise]).finally(r.startTiming('userId.total'))
                  );
                }
                const f = L,
                  g = M;
                function m(e) {
                  return function (...t) {
                    if (f === L && g === M) return e(...t);
                  };
                }
                function b() {
                  return E.SL.promise.finally(r.startTiming('userId.init.consent'));
                }
                let p = d(
                  y.U9.all([u.Gc, t.promise])
                    .then(b)
                    .then(
                      m(() => {
                        ((a = !0), Ie(f, g));
                      }),
                    )
                    .then(() => n.promise.finally(r.startTiming('userId.callbacks.pending')))
                    .then(
                      m(() => {
                        const e = f.submodules.filter((e) => (0, l.fp)(e.callback));
                        if (e.length) return new y.U9((t) => z(e, t, f));
                      }),
                    ),
                );
                return function ({ refresh: o = !1, submoduleNames: r = null, ready: u = !1 } = {}) {
                  return (
                    u &&
                      !i &&
                      ((i = !0),
                      t.resolve(),
                      _ > 0
                        ? n.resolve()
                        : s.on(c.qY.AUCTION_END, function t() {
                            (s.AU(c.qY.AUCTION_END, t), e(P).then(n.resolve));
                          })),
                    o &&
                      a &&
                      (p = d(
                        p
                          .catch(() => null)
                          .then(b)
                          .then(
                            m(() => {
                              const e = Ie(
                                f,
                                g.filter((e) => null == r || r.includes(e.submodule.name)),
                                !0,
                              ).filter((e) => null != e.callback);
                              if (e.length) return new y.U9((t) => z(e, t, f));
                            }),
                          ),
                      )),
                    p
                  );
                };
              })({ mkDelay: t })),
              E.SL.onChange(() => {
                ne({ refresh: !0 });
              }),
              null != q && q(),
              (G = []),
              (q = e.getConfig('userSync', (e) => {
                const t = e.userSync;
                if (t && ((W = t.ppid), t.userIds)) {
                  const { autoRefresh: e = !1, retainConfig: o = !0, enforceStorageType: r } = t;
                  ((R = t.userIds),
                    (P = (0, l.Et)(t.syncDelay) ? t.syncDelay : $.qh.syncDelay),
                    (_ = (0, l.Et)(t.auctionDelay) ? t.auctionDelay : $.qh.auctionDelay),
                    $e({ retainConfig: o, autoRefresh: e }),
                    n?.(),
                    (n = (0, S.qB)(
                      O.Ue,
                      'enforceStorageTypeRule',
                      xe(
                        M.map(({ config: e }) => e),
                        r,
                      ),
                    )),
                    (function (e, t) {
                      if (e) {
                        const n = {},
                          o = new Map(t.map((e) => (e.aliasName ? [e.aliasName, e.name] : [])));
                        (Object.keys(e).forEach((t) => {
                          const r = (0, l.cy)(e[t]) ? [...e[t]].reverse() : [];
                          n[t] = r.map((e) => (o.has(e) ? o.get(e) : e));
                        }),
                          (F = n));
                      } else F = {};
                      (L.refresh(), ke(t));
                    })(t.idPriority, G),
                    ne({ ready: !0 }));
                  const s = M.filter((e) => e.refreshIds);
                  s.length && me({ submoduleNames: s.map((e) => e.submodule.name) });
                }
              })),
              a.Ay.makeBidRequests.after(se),
              j.NE.before(ie),
              (0, i.xu)('getUserIds', ae),
              (0, i.xu)('getUserIdsAsEids', ce),
              (0, i.xu)('getEncryptedEidsForSource', je(le)),
              (0, i.xu)('registerSignalSources', fe),
              (0, i.xu)('refreshUserIds', je(me)),
              (0, i.xu)('getUserIdsAsync', je(be)),
              (0, i.xu)('getUserIdsAsEidBySource', ue));
          }
          (Ae(r.$W),
            (0, u.xG)(
              'userId',
              function (e) {
                ((e.findRootDomain = w.S),
                  (G || []).find((t) => t.name === e.name) ||
                    (G.push(e), E.o2.register(D.fW, e.name, e.gvlid), $e(), ne({ refresh: !0, submoduleNames: [e.name] })));
              },
              { postInstallAllowed: !0 },
            ),
            (0, o.E)('userId'));
        },
      },
      (e) => {
        e.O(0, [802, 7769, 5590, 1085], () => {
          return ((t = 1424), e((e.s = t)));
          var t;
        });
        e.O();
      },
    ]);
  })(),
    pbjs.processQueue());
