/*!
 * 
 * 	elfsight.com
 * 	
 * 	Copyright (c) 2019 Elfsight, LLC. ALL RIGHTS RESERVED
 * 
 */
! function(t) {
    function e(i) {
        if (n[i]) return n[i].exports;
        var r = n[i] = {
            exports: {},
            id: i,
            loaded: !1
        };
        return t[i].call(r.exports, r, r.exports, e), r.loaded = !0, r.exports
    }
    var n = {};
    return e.m = t, e.c = n, e.p = "/dev/", e(0)
}([function(t, e, n) {
    n(1), n(2)(window)
}, function(t, e, n) {
    t.exports = n.p + "index.html"
}, function(t, e, n) {
    function i(t) {
        if (t.esapps) return void t.esapps.platform.reboot();
        var e = !!t.__ELFSIGHT_SAPPS_DEBUG,
            n = {},
            i = new o(t),
            a = new r(t, t.document.body, i, e);
        n.platform = a.facade(), n.apps = i.facade(), t.esapps = n
    }
    var r = n(3),
        o = n(10);
    t.exports = i
}, function(t, e, n) {
    var i = n(4),
        r = n(5),
        o = n(8),
        a = n(9),
        s = "esapps.Platform",
        c = function(t, e, n, c) {
            var u, d = this,
                f = [],
                l = [],
                p = {},
                g = [],
                h = [],
                m = !1,
                v = !1;
            d.initialize = function(t) {
                p = {}, h = [], v = !1, m = !1, d.logError = o.withModule(s), i(function() {
                    d.collectWidgets(t), d.boot(t), setTimeout(function() {
                        d.observe(t)
                    }, 1e3)
                })
            }, d.facade = function() {
                return new a(d)
            }, d.requireWidget = function(t) {
                "string" != typeof t && d.logError("Widget Public ID required and should be a string", {
                    pid: t
                }), ~l.indexOf(t) || (l.push(t), v = !1), p[t] || (p[t] = !1)
            }, d.addPlaceholder = function(t) {
                ~h.indexOf(t) || h.push(t)
            }, d.getWidgetIdByElement = function(t) {
                if ("div" === t.tagName.toLowerCase() || "span" === t.tagName.toLowerCase()) {
                    if (t.className.indexOf("elfsight-sapp") > -1) return t.className.split(" ")[0].replace(/elfsight-sapp-(.*?)\s?/, "$1");
                    if (t.className.indexOf("shopify-app") > -1) return t.className.split(" ")[0].replace(/shopify-app-(.*?)\s?/, "$1")
                }
            }, d.getWidgetsElements = function(t) {
                t = t || e;
                var n = Array.prototype.slice.call(t.querySelectorAll('*[class^="shopify-app"]')),
                    i = Array.prototype.slice.call(t.querySelectorAll('*[class^="elfsight-sapp"]')),
                    r = i.concat(n);
                t.querySelectorAll("[data-is]").length && !~g.indexOf("is") && g.push("is"), t.querySelectorAll("[data-yt]").length && !~g.indexOf("yt") && g.push("yt");
                var o = document.querySelectorAll("[data-yt]");
                o.length && o.forEach(function(t) {
                    t.setAttribute("data-yt-api-url", "https://storage.elfsight.com/api/youtube")
                });
                var a = document.querySelectorAll("[data-is]");
                return a.length && a.forEach(function(t) {
                    t.setAttribute("data-is-access-token", ""), t.setAttribute("data-is-api-url", "https://api.instacloud.io"), t.setAttribute("data-is-hide-elfsight-logo", "true");
                    var e = t.getAttribute("data-is-responsive");
                    e && t.setAttribute("data-is-responsive", decodeURIComponent(e))
                }), r
            }, d.collectWidgets = function(t) {
                d.getWidgetsElements(t).forEach(function(t) {
                    var e = d.getWidgetIdByElement(t);
                    e && (d.requireWidget(e), d.addPlaceholder(t))
                })
            }, d.initWidget = function(t) {
                var i = d.getWidgetIdByElement(t),
                    r = f[i],
                    o = !!p[i];
                if (!r && !o) return d.requireWidget(i), void d.boot(e, d.initWidget.bind(d, t));
                if (r) {
                    if (!r.status) return void d.logError('Widget "' + i + '" can`t be initialized because ' + r.reason, t);
                    r.data && (r.data.id = i), p[i] = !0, n.initWidget(t, r.data)
                }
            }, d.boot = function(n, i) {
                n = n || e;
                var o = (c ? "https://shopify.elfhome.ru" : "https://shy.elfsight.com") + "/p/boot/",
                    a = "__esappsPlatformBoot" + (new Date).getTime();
                if (t[a] = function(e) {
                        t[a] = void 0, n.removeChild(s), e.status || d.logError("Boot failed because " + e.reason, e.data), f = e.data.widgets, d.loadAssets(n, e.data.assets, h && h.length), i && i()
                    }, l && l.length && !v || g && g.length) {
                    var s = t.document.createElement("script"),
                        u = d.getShopDomain(),
                        p = r.stringify({
                            callback: a,
                            w: l.join(","),
                            a: g.join(","),
                            shop: u
                        });
                    s.src = o + "?" + p, n.appendChild(s), v = !0
                }
            }, d.loadAssets = function(n, i, r) {
                if (n = n || e, i && i.length) {
                    var o = 0,
                        a = 0;
                    i.forEach(function(e) {
                        var i = t.document.createElement("script");
                        ++o, i.src = e, i.onload = function() {
                            ++a === o && (r && setTimeout(function() {
                                h.forEach(d.initWidget.bind(d))
                            }), m = !0)
                        }, n.appendChild(i)
                    })
                }
            }, d.observe = function(t) {
                t = t || e, window.MutationObserver && (u = new MutationObserver(function(t) {
                    t.forEach(function(t) {
                        t.addedNodes && t.addedNodes.length && Array.prototype.slice.call(t.addedNodes).forEach(function(t) {
                            t.tagName && ("div" === t.tagName.toLowerCase() && t.className.indexOf("elfsight-sapp") > -1 ? d.initWidget(t) : "div" === t.tagName.toLowerCase() && t.className.indexOf("shopify-app") > -1 ? d.initWidget(t) : d.getWidgetsElements(t).forEach(d.initWidget.bind(d)))
                        })
                    })
                }), u.observe(t, {
                    childList: !0,
                    subtree: !0
                }))
            }, d.getShopDomain = function() {
                return t.Shopify && t.Shopify.shop ? t.Shopify.shop : null
            }, d.initialize()
        };
    t.exports = c
}, function(t, e, n) {
    /*!
     * domready (c) Dustin Diaz 2014 - License MIT
     */
    ! function(e, n) {
        t.exports = n()
    }("domready", function() {
        var t, e = [],
            n = document,
            i = n.documentElement.doScroll,
            r = "DOMContentLoaded",
            o = (i ? /^loaded|^c/ : /^loaded|^i|^c/).test(n.readyState);
        return o || n.addEventListener(r, t = function() {
                for (n.removeEventListener(r, t), o = 1; t = e.shift();) t()
            }),
            function(t) {
                o ? setTimeout(t, 0) : e.push(t)
            }
    })
}, function(t, e, n) {
    "use strict";

    function i(t) {
        switch (t.arrayFormat) {
            case "index":
                return function(e, n, i) {
                    return null === n ? [o(e, t), "[", i, "]"].join("") : [o(e, t), "[", o(i, t), "]=", o(n, t)].join("")
                };
            case "bracket":
                return function(e, n) {
                    return null === n ? o(e, t) : [o(e, t), "[]=", o(n, t)].join("")
                };
            default:
                return function(e, n) {
                    return null === n ? o(e, t) : [o(e, t), "=", o(n, t)].join("")
                }
        }
    }

    function r(t) {
        var e;
        switch (t.arrayFormat) {
            case "index":
                return function(t, n, i) {
                    return e = /\[(\d*)\]$/.exec(t), t = t.replace(/\[\d*\]$/, ""), e ? (void 0 === i[t] && (i[t] = {}), void(i[t][e[1]] = n)) : void(i[t] = n)
                };
            case "bracket":
                return function(t, n, i) {
                    return e = /(\[\])$/.exec(t), t = t.replace(/\[\]$/, ""), e ? void 0 === i[t] ? void(i[t] = [n]) : void(i[t] = [].concat(i[t], n)) : void(i[t] = n)
                };
            default:
                return function(t, e, n) {
                    return void 0 === n[t] ? void(n[t] = e) : void(n[t] = [].concat(n[t], e))
                }
        }
    }

    function o(t, e) {
        return e.encode ? e.strict ? s(t) : encodeURIComponent(t) : t
    }

    function a(t) {
        return Array.isArray(t) ? t.sort() : "object" == typeof t ? a(Object.keys(t)).sort(function(t, e) {
            return Number(t) - Number(e)
        }).map(function(e) {
            return t[e]
        }) : t
    }
    var s = n(6),
        c = n(7);
    e.extract = function(t) {
        return t.split("?")[1] || ""
    }, e.parse = function(t, e) {
        e = c({
            arrayFormat: "none"
        }, e);
        var n = r(e),
            i = Object.create(null);
        return "string" != typeof t ? i : (t = t.trim().replace(/^(\?|#|&)/, "")) ? (t.split("&").forEach(function(t) {
            var e = t.replace(/\+/g, " ").split("="),
                r = e.shift(),
                o = e.length > 0 ? e.join("=") : void 0;
            o = void 0 === o ? null : decodeURIComponent(o), n(decodeURIComponent(r), o, i)
        }), Object.keys(i).sort().reduce(function(t, e) {
            var n = i[e];
            return Boolean(n) && "object" == typeof n && !Array.isArray(n) ? t[e] = a(n) : t[e] = n, t
        }, Object.create(null))) : i
    }, e.stringify = function(t, e) {
        var n = {
            encode: !0,
            strict: !0,
            arrayFormat: "none"
        };
        e = c(n, e);
        var r = i(e);
        return t ? Object.keys(t).sort().map(function(n) {
            var i = t[n];
            if (void 0 === i) return "";
            if (null === i) return o(n, e);
            if (Array.isArray(i)) {
                var a = [];
                return i.slice().forEach(function(t) {
                    void 0 !== t && a.push(r(n, t, a.length))
                }), a.join("&")
            }
            return o(n, e) + "=" + o(i, e)
        }).filter(function(t) {
            return t.length > 0
        }).join("&") : ""
    }
}, function(t, e) {
    "use strict";
    t.exports = function(t) {
        return encodeURIComponent(t).replace(/[!'()*]/g, function(t) {
            return "%" + t.charCodeAt(0).toString(16).toUpperCase()
        })
    }
}, function(t, e) {
    /*
    	object-assign
    	(c) Sindre Sorhus
    	@license MIT
    	*/
    "use strict";

    function n(t) {
        if (null === t || void 0 === t) throw new TypeError("Object.assign cannot be called with null or undefined");
        return Object(t)
    }

    function i() {
        try {
            if (!Object.assign) return !1;
            var t = new String("abc");
            if (t[5] = "de", "5" === Object.getOwnPropertyNames(t)[0]) return !1;
            for (var e = {}, n = 0; n < 10; n++) e["_" + String.fromCharCode(n)] = n;
            var i = Object.getOwnPropertyNames(e).map(function(t) {
                return e[t]
            });
            if ("0123456789" !== i.join("")) return !1;
            var r = {};
            return "abcdefghijklmnopqrst".split("").forEach(function(t) {
                r[t] = t
            }), "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, r)).join("")
        } catch (t) {
            return !1
        }
    }
    var r = Object.getOwnPropertySymbols,
        o = Object.prototype.hasOwnProperty,
        a = Object.prototype.propertyIsEnumerable;
    t.exports = i() ? Object.assign : function(t, e) {
        for (var i, s, c = n(t), u = 1; u < arguments.length; u++) {
            i = Object(arguments[u]);
            for (var d in i) o.call(i, d) && (c[d] = i[d]);
            if (r) {
                s = r(i);
                for (var f = 0; f < s.length; f++) a.call(i, s[f]) && (c[s[f]] = i[s[f]])
            }
        }
        return c
    }
}, function(t, e) {
    function n(t, e, n) {
        var i = [n + ' throws: "' + t + '"'];
        e && (i.push("with \n\t ->"), i.push(e))
    }
    n.withModule = function(t) {
        return function(e, i) {
            return n(e, i, t)
        }
    }, t.exports = n
}, function(t, e) {
    var n = function(t) {
        var e = this;
        e.initialize = function() {}, e.requireWidget = function(e) {
            return t.requireWidget(e)
        }, e.reboot = function() {
            t.initialize(document.body)
        }, e.initialize()
    };
    t.exports = n
}, function(t, e, n) {
    var i = n(8),
        r = n(11),
        o = n(12),
        a = "esapps.AppsManager",
        s = function(t) {
            var e = this,
                n = {},
                s = [],
                c = [];
            e.initialize = function() {
                e.logError = i.withModule(a)
            }, e.facade = function() {
                return new r(e)
            }, e.register = function(i, r) {
                if (n.name) return void e.logError('Application "' + i + '" is already registered');
                var a = new r;
                n[i] = new o(a, t), e.initWidgetsFromBuffer(i)
            }, e.app = function(t) {
                return n[t]
            }, e.initWidget = function(t, n, i) {
                var r = e.app(n.app);
                if (r) {
                    if (c.indexOf(t) !== -1) return;
                    c.push(t), r.initWidget(t, n), e.sendExtensionPostMessage(t, n, i)
                } else s.push({
                    element: t,
                    config: n,
                    initialized: !1
                })
            }, e.sendExtensionPostMessage = function(t, e) {
                window.postMessage({
                    method: "postMessagePlatformWidget",
                    data: {
                        settings: e.settings,
                        app_slug: e.app,
                        public_id: e.id,
                        platform: "esapps"
                    }
                }, "*")
            }, e.initWidgetsFromBuffer = function(t) {
                s && s.length && s.forEach(function(n) {
                    t !== n.config.app || n.initialized || (n.initialized = !0, e.initWidget(n.element, n.config))
                })
            }, e.initialize()
        };
    t.exports = s
}, function(t, e) {
    var n = function(t) {
        var e = this;
        e.initialize = function() {}, e.register = function(e, n) {
            return t.register(e, n)
        }, e.initialize()
    };
    t.exports = n
}, function(t, e) {
    var n = function(t, e) {
        var n = this,
            i = !1,
            r = [];
        n.initialize = function() {
            t.whenReady(n.ready.bind(n))
        }, n.ready = function() {
            i = !0, n.initWidgetsFromBuffer()
        }, n.initWidget = function(e, n) {
            if (i) {
                var o = {
                    widgetId: n.id || null,
                    widgetOrigin: "shy.elfsight.com"
                };
                n.settings = [n.settings, o].reduce(function(t, e) {
                    return Object.keys(e).forEach(function(n) {
                        t[n] = e[n]
                    }), t
                }, {}), t.initWidget(e, n.settings)
            } else r.push({
                element: e,
                config: n,
                initialized: !1
            })
        }, n.initWidgetsFromBuffer = function() {
            r && r.length && r.forEach(function(t) {
                t.initialized || (t.initialized = !0, n.initWidget(t.element, t.config))
            })
        }, n.initialize()
    };
    t.exports = n
}]);
