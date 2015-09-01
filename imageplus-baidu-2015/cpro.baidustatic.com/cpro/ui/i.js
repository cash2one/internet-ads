(function (AD_CONFIG, LINKS, RT_CONFIG) {
  /*! Copyright 2015 Baidu Inc. All Rights Reserved. */
  var baidu = {version: "1.5.0"};
  baidu.guid = "$BAIDU$";
  window[baidu.guid] = window[baidu.guid] || {};
  baidu.array = baidu.array || {};
  baidu.array.removeAt = function (b, a) {
    return b.splice(a, 1)[0]
  };
  baidu.dom = baidu.dom || {};
  baidu.dom.g = function (a) {
    if ("string" == typeof a || a instanceof String) {
      return document.getElementById(a)
    } else {
      if (a && a.nodeName && (a.nodeType == 1 || a.nodeType == 9)) {
        return a
      }
    }
    return null
  };
  baidu.g = baidu.G = baidu.dom.g;
  baidu.dom._matchNode = function (a, c, d) {
    a = baidu.dom.g(a);
    for (var b = a[d]; b; b = b[c]) {
      if (b.nodeType == 1) {
        return b
      }
    }
    return null
  };
  baidu.dom.first = function (a) {
    return baidu.dom._matchNode(a, "nextSibling", "firstChild")
  };
  baidu.dom.next = function (a) {
    return baidu.dom._matchNode(a, "nextSibling", "nextSibling")
  };
  baidu.cookie = baidu.cookie || {};
  baidu.cookie._isValidKey = function (a) {
    return (new RegExp('^[^\\x00-\\x20\\x7f\\(\\)<>@,;:\\\\\\"\\[\\]\\?=\\{\\}\\/\\u0080-\\uffff]+\x24')).test(a)
  };
  baidu.cookie.getRaw = function (b) {
    if (baidu.cookie._isValidKey(b)) {
      var c = new RegExp("(^| )" + b + "=([^;]*)(;|\x24)"), a = c.exec(document.cookie);
      if (a) {
        return a[2] || null
      }
    }
    return null
  };
  baidu.cookie.get = function (a) {
    var b = baidu.cookie.getRaw(a);
    if ("string" == typeof b) {
      b = decodeURIComponent(b);
      return b
    }
    return null
  };
  baidu.lang = baidu.lang || {};
  baidu.lang.isArray = function (a) {
    return "[object Array]" == Object.prototype.toString.call(a)
  };
  baidu.page = baidu.page || {};
  baidu.page.getViewWidth = function () {
    var b = document, a = b.compatMode == "BackCompat" ? b.body : b.documentElement;
    return a.clientWidth
  };
  baidu.page.getScrollTop = function () {
    var a = document;
    return window.pageYOffset || a.documentElement.scrollTop || a.body.scrollTop
  };
  baidu.dom.prev = function (a) {
    return baidu.dom._matchNode(a, "previousSibling", "previousSibling")
  };
  baidu.cookie.setRaw = function (c, d, b) {
    if (!baidu.cookie._isValidKey(c)) {
      return
    }
    b = b || {};
    var a = b.expires;
    if ("number" == typeof b.expires) {
      a = new Date();
      a.setTime(a.getTime() + b.expires)
    }
    document.cookie = c + "=" + d + (b.path ? "; path=" + b.path : "") + (a ? "; expires=" + a.toGMTString() : "") + (b.domain ? "; domain=" + b.domain : "") + (b.secure ? "; secure" : "")
  };
  baidu.cookie.remove = function (b, a) {
    a = a || {};
    a.expires = new Date(0);
    baidu.cookie.setRaw(b, "", a)
  };
  baidu.string = baidu.string || {};
  (function () {
    var a = new RegExp("(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+\x24)", "g");
    baidu.string.trim = function (b) {
      return String(b).replace(a, "")
    }
  })();
  baidu.trim = baidu.string.trim;
  baidu.string.escapeReg = function (a) {
    return String(a).replace(new RegExp("([.*+?^=!:\x24{}()|[\\]/\\\\])", "g"), "\\\x241")
  };
  baidu.dom.q = function (h, e, b) {
    var j = [], d = baidu.string.trim, g, f, a, c;
    if (!(h = d(h))) {
      return j
    }
    if ("undefined" == typeof e) {
      e = document
    } else {
      e = baidu.dom.g(e);
      if (!e) {
        return j
      }
    }
    b && (b = d(b).toUpperCase());
    if (e.getElementsByClassName) {
      a = e.getElementsByClassName(h);
      g = a.length;
      for (f = 0; f < g; f++) {
        c = a[f];
        if (b && c.tagName != b) {
          continue
        }
        j[j.length] = c
      }
    } else {
      h = new RegExp("(^|\\s)" + baidu.string.escapeReg(h) + "(\\s|\x24)");
      a = b ? e.getElementsByTagName(b) : (e.all || e.getElementsByTagName("*"));
      g = a.length;
      for (f = 0; f < g; f++) {
        c = a[f];
        h.test(c.className) && (j[j.length] = c)
      }
    }
    return j
  };
  baidu.q = baidu.Q = baidu.dom.q;
  baidu.sio = baidu.sio || {};
  baidu.lang.isFunction = function (a) {
    return "[object Function]" == Object.prototype.toString.call(a)
  };
  baidu.lang.isString = function (a) {
    return "[object String]" == Object.prototype.toString.call(a)
  };
  baidu.isString = baidu.lang.isString;
  baidu.sio._createScriptTag = function (b, a, c) {
    b.setAttribute("type", "text/javascript");
    c && b.setAttribute("charset", c);
    b.setAttribute("src", a);
    document.getElementsByTagName("head")[0].appendChild(b)
  };
  baidu.sio._removeScriptTag = function (b) {
    if (b.clearAttributes) {
      b.clearAttributes()
    } else {
      for (var a in b) {
        if (b.hasOwnProperty(a)) {
          delete b[a]
        }
      }
    }
    if (b && b.parentNode) {
      b.parentNode.removeChild(b)
    }
    b = null
  };
  baidu.sio.callByServer = function (a, m, n) {
    var i = document.createElement("SCRIPT"),
      h = "bd__cbs__",
      k, e, o = n || {},
      d = o.charset,
      f = o.queryField || "callback",
      l = o.timeOut || 0,
      b,
      c = new RegExp("(\\?|&)" + f + "=([^&]*)"),
      g;
    if (baidu.lang.isFunction(m)) {
      k = h + Math.floor(Math.random() * 2147483648).toString(36);
      window[k] = j(0)
    } else {
      if (baidu.lang.isString(m)) {
        k = m
      } else {
        if (g = c.exec(a)) {
          k = g[2]
        }
      }
    }
    if (l) {
      b = setTimeout(j(1), l)
    }
    a = a.replace(c, "\x241" + f + "=" + k);
    if (a.search(c) < 0) {
      a += (a.indexOf("?") < 0 ? "?" : "&") + f + "=" + k
    }
    baidu.sio._createScriptTag(i, a, d);
    function j(p) {
      return function () {
        try {
          if (p) {
            o.onfailure && o.onfailure()
          } else {
            m.apply(window, arguments);
            clearTimeout(b)
          }
          window[k] = null;
          delete window[k]
        } catch (q) {
        } finally {
          baidu.sio._removeScriptTag(i)
        }
      }
    }
  };
  baidu.sio.log = function (b) {
    var a = new Image(), c = "tangram_sio_log_" + Math.floor(Math.random() * 2147483648).toString(36);
    window[c] = a;
    a.onload = a.onerror = a.onabort = function () {
      a.onload = a.onerror = a.onabort = null;
      window[c] = null;
      a = null
    };
    a.src = b
  };
  baidu.page.getViewHeight = function () {
    var b = document, a = b.compatMode == "BackCompat" ? b.body : b.documentElement;
    return a.clientHeight
  };
  baidu.dom.getDocument = function (a) {
    a = baidu.dom.g(a);
    return a.nodeType == 9 ? a : a.ownerDocument || a.document
  };
  baidu.dom._g = function (a) {
    if (baidu.lang.isString(a)) {
      return document.getElementById(a)
    }
    return a
  };
  baidu._g = baidu.dom._g;
  baidu.browser = baidu.browser || {};
  baidu.browser.ie = baidu.ie = /msie (\d+\.\d+)/i.test(navigator.userAgent) ? (document.documentMode || +RegExp["\x241"]) : undefined;
  baidu.dom.getComputedStyle = function (b, a) {
    b = baidu.dom._g(b);
    var d = baidu.dom.getDocument(b), c;
    if (d.defaultView && d.defaultView.getComputedStyle) {
      c = d.defaultView.getComputedStyle(b, null);
      if (c) {
        return c[a] || c.getPropertyValue(a)
      }
    }
    return ""
  };
  baidu.dom._styleFixer = baidu.dom._styleFixer || {};
  baidu.dom._styleFilter = baidu.dom._styleFilter || [];
  baidu.dom._styleFilter.filter = function (b, e, f) {
    for (var a = 0, d = baidu.dom._styleFilter, c; c = d[a]; a++) {
      if (c = c[f]) {
        e = c(b, e)
      }
    }
    return e
  };
  baidu.string.toCamelCase = function (a) {
    if (a.indexOf("-") < 0 && a.indexOf("_") < 0) {
      return a
    }
    return a.replace(/[-_][^-_]/g, function (b) {
      return b.charAt(1).toUpperCase()
    })
  };
  baidu.dom.getStyle = function (c, b) {
    var e = baidu.dom;
    c = e.g(c);
    b = baidu.string.toCamelCase(b);
    var d = c.style[b] || (c.currentStyle ? c.currentStyle[b] : "") || e.getComputedStyle(c, b);
    if (!d) {
      var a = e._styleFixer[b];
      if (a) {
        d = a.get ? a.get(c) : baidu.dom.getStyle(c, a)
      }
    }
    if (a = e._styleFilter) {
      d = a.filter(b, d, "get")
    }
    return d
  };
  baidu.getStyle = baidu.dom.getStyle;
  baidu.browser.opera = /opera(\/| )(\d+(\.\d+)?)(.+?(version\/(\d+(\.\d+)?)))?/i.test(navigator.userAgent) ? +(RegExp["\x246"] || RegExp["\x242"]) : undefined;
  baidu.browser.isWebkit = /webkit/i.test(navigator.userAgent);
  baidu.browser.isGecko = /gecko/i.test(navigator.userAgent) && !/like gecko/i.test(navigator.userAgent);
  baidu.browser.isStrict = document.compatMode == "CSS1Compat";
  baidu.dom.getPosition = function (a) {
    a = baidu.dom.g(a);
    var j = baidu.dom.getDocument(a), d = baidu.browser, g = baidu.dom.getStyle, c = d.isGecko > 0 && j.getBoxObjectFor && g(a, "position") == "absolute" && (a.style.top === "" || a.style.left === ""), h = {
      left: 0,
      top: 0
    }, f = (d.ie && !d.isStrict) ? j.body : j.documentElement, k, b;
    if (a == f) {
      return h
    }
    if (a.getBoundingClientRect) {
      b = a.getBoundingClientRect();
      h.left = Math.floor(b.left) + Math.max(j.documentElement.scrollLeft, j.body.scrollLeft);
      h.top = Math.floor(b.top) + Math.max(j.documentElement.scrollTop, j.body.scrollTop);
      h.left -= j.documentElement.clientLeft;
      h.top -= j.documentElement.clientTop;
      var i = j.body, l = parseInt(g(i, "borderLeftWidth")), e = parseInt(g(i, "borderTopWidth"));
      if (d.ie && !d.isStrict) {
        h.left -= isNaN(l) ? 2 : l;
        h.top -= isNaN(e) ? 2 : e
      }
    } else {
      k = a;
      do {
        h.left += k.offsetLeft;
        h.top += k.offsetTop;
        if (d.isWebkit > 0 && g(k, "position") == "fixed") {
          h.left += j.body.scrollLeft;
          h.top += j.body.scrollTop;
          break
        }
        k = k.offsetParent
      } while (k && k != a);
      if (d.opera > 0 || (d.isWebkit > 0 && g(a, "position") == "absolute")) {
        h.top -= j.body.offsetTop
      }
      k = a.offsetParent;
      while (k && k != j.body) {
        h.left -= k.scrollLeft;
        if (!d.opera || k.tagName != "TR") {
          h.top -= k.scrollTop
        }
        k = k.offsetParent
      }
    }
    return h
  };
  baidu.dom.getAncestorBy = function (a, b) {
    a = baidu.dom.g(a);
    while ((a = a.parentNode) && a.nodeType == 1) {
      if (b(a)) {
        return a
      }
    }
    return null
  };
  baidu.lang.toArray = function (b) {
    if (b === null || b === undefined) {
      return []
    }
    if (baidu.lang.isArray(b)) {
      return b
    }
    if (typeof b.length !== "number" || typeof b === "string" || baidu.lang.isFunction(b)) {
      return [b]
    }
    if (b.item) {
      var a = b.length, c = new Array(a);
      while (a--) {
        c[a] = b[a]
      }
      return c
    }
    return [].slice.call(b)
  };
  baidu.page.getScrollLeft = function () {
    var a = document;
    return window.pageXOffset || a.documentElement.scrollLeft || a.body.scrollLeft
  };
  baidu.array.indexOf = function (e, b, d) {
    var a = e.length, c = b;
    d = d | 0;
    if (d < 0) {
      d = Math.max(0, a + d)
    }
    for (; d < a; d++) {
      if (d in e && e[d] === b) {
        return d
      }
    }
    return -1
  };
  baidu.lang.inherits = function (g, e, d) {
    var c, f, a = g.prototype, b = new Function();
    b.prototype = e.prototype;
    f = g.prototype = new b();
    for (c in a) {
      f[c] = a[c]
    }
    g.prototype.constructor = g;
    g.superClass = e.prototype;
    if ("string" == typeof d) {
      f._className = d
    }
  };
  baidu.inherits = baidu.lang.inherits;
  ;
  var m, q = q || {};
  q.global = this;
  q.Ra = !0;
  q.Ta = "en";
  q.Sa = !0;
  q.La = function (a) {
    return void 0 !== a
  };
  q.Ja = function (a, b, c) {
    a = a.split(".");
    c = c || q.global;
    a[0]in c || !c.execScript || c.execScript("var " + a[0]);
    for (var d; a.length && (d = a.shift());)!a.length && q.La(b) ? c[d] = b : c = c[d] ? c[d] : c[d] = {}
  };
  q.Xa = function (a, b, c) {
    q.Ja(a, b, c)
  };
  q.Wa = function (a, b, c) {
    a[b] = c
  };
  q.Za = function () {
    return !1
  };
  q.cb = function () {
  };
  q.Ya = function () {
  };
  var aa, s;
  if (s = /msie (\d+\.\d)/i.exec(navigator.userAgent))var t = document.documentMode || +s[1];
  if (s = /firefox\/(\d+\.\d)/i.exec(navigator.userAgent))var ba = +s[1];
  if (s = /opera\/(\d+\.\d)/i.exec(navigator.userAgent))var ca = +s[1];
  var da = navigator.userAgent, ea = da.match(/(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i);
  ea && !/chrome/i.test(da) && (aa = +(ea[1] || ea[2]));
  var fa = "CSS1Compat" === document.compatMode, ga = /webkit/i.test(navigator.userAgent);
  s = /UCBrowser\/(\d+\.\d)/i.exec(navigator.userAgent);
  window.$ECMA$ = window.$ECMA$ || {};
  function w(a) {
    return "[object Array]" === Object.prototype.toString.call(a)
  }

  function ha(a) {
    return "[object Number]" === Object.prototype.toString.call(a) && isFinite(a)
  }

  function ia(a) {
    if (null === a || void 0 === a)return [];
    if (w(a))return a;
    if ("number" !== typeof a.length || "string" === typeof a || "[object Function]" === Object.prototype.toString.call(a))return [a];
    if (a.item) {
      for (var b = a.length, c = Array(b); b--;)c[b] = a[b];
      return c
    }
    return [].slice.call(a)
  }

  function ja(a, b) {
    function c() {
    }

    var d = a.prototype;
    c.prototype = b.prototype;
    var e = a.prototype = new c, f;
    for (f in d)d.hasOwnProperty(f) && (e[f] = d[f]);
    a.prototype.constructor = a;
    a.superClass = b.prototype
  }

  window.$ECMA$._instances = window.$ECMA$._instances || {};
  (function () {
    var a = window.$ECMA$;
    a.ma = a.ma || 1;
    return function () {
      return "ECMA__" + (a.ma++).toString(36)
    }
  })();
  function ka(a, b) {
    if ("function" === typeof b)for (var c in a)if (a.hasOwnProperty(c) && !1 === b.call(a, a[c], c))break
  }

  function x(a, b) {
    for (var c in b)b.hasOwnProperty(c) && (a[c] = b[c]);
    return a
  }

  function la(a) {
    var b = Object.prototype.hasOwnProperty, c;
    if (!(a && "[object Object]" === Object.prototype.toString.call(a) && "isPrototypeOf"in a) || a.constructor && !b.call(a, "constructor") && !b.call(a.constructor.prototype, "isPrototypeOf"))return !1;
    for (c in a);
    return void 0 === c || b.call(a, c)
  };
  var z = [];

  function A(a, b, c) {
    function d(b) {
      c.call(a, b)
    }

    b = b.replace(/^on/i, "");
    "string" === typeof a && (a = document.getElementById(a));
    var e = b;
    b = b.toLowerCase();
    a.addEventListener ? a.addEventListener(e, d, !1) : a.attachEvent && a.attachEvent("on" + e, d);
    z[z.length] = [a, b, c, d, e]
  }

  function B(a, b, c) {
    "string" === typeof a && (a = document.getElementById(a));
    b = b.replace(/^on/i, "").toLowerCase();
    for (var d = z.length, e = !c, f, g; d--;)f = z[d], f[1] !== b || f[0] !== a || !e && f[2] !== c || (g = f[4], f = f[3], a.removeEventListener ? a.removeEventListener(g, f, !1) : a.detachEvent && a.detachEvent("on" + g, f), z.splice(d, 1))
  }

  function ma(a) {
    a.preventDefault ? a.preventDefault() : a.returnValue = !1
  }

  (function () {
    function a(a, b) {
      for (var c = 0, d = a.length, e = {}; c < d; c++)e[a[c]] = b[a[c]], delete b[a[c]];
      return e
    }

    function b(b, c, d) {
      d = x({}, d);
      var e = a(k[c], d), f = [], g;
      for (g in e)e.hasOwnProperty(g) && f.push(e[g]);
      e = document.createEvent(c);
      f.unshift(b);
      "KeyEvents" === c ? e.initKeyEvent.apply(e, f) : "MouseEvents" === c ? e.initMouseEvent.apply(e, f) : "UIEvents" === c ? e.initUIEvent.apply(e, f) : e.initEvent.apply(e, f);
      x(e, d);
      return e
    }

    function c(a) {
      var b;
      document.createEventObject && (b = document.createEventObject(), x(b, a));
      return b
    }

    var d = {$a: 1, bb: 1, ab: 1}, e = {click: 1, Va: 1, eb: 1, fb: 1, ib: 1, hb: 1, gb: 1}, f = {
      abort: 1,
      blur: 1,
      Ia: 1,
      error: 1,
      focus: 1,
      load: t ? 0 : 1,
      reset: 1,
      resize: 1,
      scroll: 1,
      select: 1,
      submit: 1,
      kb: t ? 0 : 1
    }, g = {scroll: 1, resize: 1, reset: 1, submit: 1, Ia: 1, select: 1, error: 1, abort: 1}, k = {
      KeyEvents: "bubbles cancelable view ctrlKey altKey shiftKey metaKey keyCode charCode".split(" "),
      MouseEvents: "bubbles cancelable view detail screenX screenY clientX clientY ctrlKey altKey shiftKey metaKey button relatedTarget".split(" "),
      HTMLEvents: ["bubbles", "cancelable"],
      UIEvents: ["bubbles", "cancelable", "view", "detail"],
      Events: ["bubbles", "cancelable"]
    };
    x(g, d);
    x(g, e);
    return function (p, n, h) {
      n = n.replace(/^on/i, "");
      p = C.g(p);
      h = x({
        bubbles: !0,
        cancelable: !0,
        view: window,
        detail: 1,
        screenX: 0,
        screenY: 0,
        clientX: 0,
        clientY: 0,
        ctrlKey: !1,
        altKey: !1,
        shiftKey: !1,
        metaKey: !1,
        keyCode: 0,
        charCode: 0,
        button: 0,
        relatedTarget: null
      }, h);
      if (d[n]) {
        var r = n;
        h = a(k.KeyEvents, h);
        var l;
        if (document.createEvent)try {
          l = b(r, "KeyEvents", h)
        } catch (u) {
          try {
            l = b(r, "Events", h)
          } catch (v) {
            l = b(r, "UIEvents", h)
          }
        } else h.keyCode =
          0 < h.charCode ? h.charCode : h.keyCode, l = c(h);
        h = l
      } else if (e[n])l = n, h = a(k.MouseEvents, h), document.createEvent ? (r = b(l, "MouseEvents", h), h.relatedTarget && !r.relatedTarget && ("mouseout" === l.toLowerCase() ? r.toElement = h.relatedTarget : "mouseover" === l.toLowerCase() && (r.fromElement = h.relatedTarget))) : (h.button = 0 === h.button ? 1 : 1 === h.button ? 4 : ha(h.button) ? h.button : 0, r = c(h)), h = r; else if (f[n]) {
        l = n;
        h.bubbles = g.hasOwnProperty(l);
        h = a(k.HTMLEvents, h);
        if (document.createEvent)try {
          r = b(l, "HTMLEvents", h)
        } catch (y) {
          try {
            r = b(l, "UIEvents",
              h)
          } catch (E) {
            r = b(l, "Events", h)
          }
        } else r = c(h);
        h = r
      } else throw Error(n + " is not support!");
      h && (p.dispatchEvent ? p.dispatchEvent(h) : p.fireEvent && p.fireEvent("on" + n, h))
    }
  })();
  var D;
  D = function (a, b, c) {
    var d, e, f = a.length;
    if ("function" === typeof b)for (e = 0; e < f && (d = a[e], d = b.call(c || a, d, e), !1 !== d); e++);
  };
  var F = "function" === typeof"".trim ? function (a) {
    return String(a).trim()
  } : function (a) {
    return String(a).replace(/(^[\s\t\xa0\u3000\ufeff]+)|([\ufeff\u3000\xa0\s\t]+$)/g, "")
  };

  function na(a, b) {
    a = String(a);
    var c = arguments[1];
    if ("undefined" !== typeof c) {
      if (la(c))return a.replace(/\$\{(.+?)\}/g, function (a, b) {
        var d = c[b];
        "function" === typeof d && (d = d(b));
        return "undefined" === typeof d ? "" : d
      });
      var d = Array.prototype.slice.call(arguments, 1), e = d.length;
      return a.replace(/\{(\d+)\}/g, function (a, b) {
        b = parseInt(b, 10);
        return b >= e ? a : d[b]
      })
    }
    return a
  }

  function oa(a) {
    return 0 > a.indexOf("-") && 0 > a.indexOf("_") ? a : a.replace(/[-_][^-_]/g, function (a) {
      return a.charAt(1).toUpperCase()
    })
  };
  function pa(a) {
    return String(a).replace(/%/g, "%25").replace(/&/g, "%26").replace(/\+/g, "%2B").replace(/ /g, "%20").replace(/\//g, "%2F").replace(/#/g, "%23").replace(/=/g, "%3D")
  }

  function qa(a) {
    var b = [], c;
    ka(a, function (a, e) {
      if (w(a))for (c = a.length; c--;)b.push(e + "=" + pa(a[c])); else b.push(e + "=" + pa(a))
    });
    return b.join("&")
  };
  function ra(a) {
    a = a.split(".");
    for (var b = window, c; c = a.shift();)if (null != b[c])b = b[c]; else return null;
    return b
  }

  function G() {
    return Math.floor(2147483648 * Math.random()).toString(36)
  }

  var ta = RT_CONFIG.HOSTMAP;
  ta || (ta = RT_CONFIG.HOSTMAP = {});
  "object" !== typeof RT_CONFIG || RT_CONFIG.HOST || (RT_CONFIG.HOST = function (a) {
    return RT_CONFIG.HOSTMAP[a] || "http://" + a
  });
  function va(a) {
    var b = ra("bds.ready");
    "function" === typeof b && b(function () {
      a()
    })
  }

  var wa = {
    "[object Boolean]": "boolean",
    "[object Number]": "number",
    "[object String]": "string",
    "[object Function]": "function",
    "[object Array]": "array",
    "[object Date]": "date",
    "[object RegExp]": "regexp",
    "[object Object]": "object",
    "[object Error]": "error"
  }, xa = Object.prototype.toString;

  function ya(a) {
    return null == a ? String(a) : "object" === typeof a || "function" === typeof a ? wa[xa.call(a)] || "object" : typeof a
  }

  function H(a, b, c) {
    for (var d in b)if (b.hasOwnProperty(d) && (c || !a.hasOwnProperty(d))) {
      var e = ya(b[d]);
      if ("object" === e || "array" === e) {
        var f = ya(a[d]);
        "object" !== f && "array" !== f && (a[d] = "object" === e ? {} : []);
        H(a[d], b[d], c)
      } else a[d] = b[d]
    }
  }

  var I = {}, za = {};

  function J(a, b) {
    Aa();
    var c = setTimeout(a, b);
    I[c] = !0;
    return c
  }

  function Ba(a) {
    a && (delete I[a], clearTimeout(a))
  }

  var Ca = !1;

  function Aa() {
    Ca || (K(function () {
      for (var a in I)I.hasOwnProperty(a) && Ba(parseInt(a, 10));
      for (a in za)if (za.hasOwnProperty(a)) {
        var b = parseInt(a, 10);
        b && (delete za[b], clearInterval(b))
      }
    }), Ca = !0)
  }

  function K(a) {
    var b = ra("bds.comm.registerUnloadHandler");
    "function" === typeof b ? b(a) : va(function () {
      K(a)
    })
  };
  function Da(a) {
    this.r = a || document;
    Ea(this)
  }

  m = Da.prototype;
  m.g = function (a) {
    return "[object String]" === Object.prototype.toString.call(a) ? this.r.getElementById(a) : a && a.nodeName && (1 === a.nodeType || 9 === a.nodeType) ? a : null
  };
  m.N = null;
  m.T = null;
  function Fa(a) {
    var b = C;
    b.N = a;
    var c = b.r.head || b.r.getElementsByTagName("head")[0] || b.r.body;
    c.insertBefore(a, c.firstChild);
    b.N = null
  }

  function Ga() {
    var a = C;
    if (a.N)return a.N;
    if (a.T && "interactive" === a.T.readyState)return a.T;
    for (var b = a.r.getElementsByTagName("script"), c = b.length; c--;) {
      var d = b[c];
      if ("interactive" === d.readyState)return a.T = d
    }
    return null
  }

  m.remove = function (a) {
    (a = this.g(a)) && a.parentNode && a.parentNode.removeChild(a)
  };
  m.getPosition = function (a) {
    a = this.g(a);
    var b = a.ownerDocument || a.document, c = {left: 0, top: 0}, d = t && !fa;
    if (a === (d ? b.body : b.documentElement))return c;
    if (a.getBoundingClientRect)a = a.getBoundingClientRect(), c.left = Math.floor(a.left) + Math.max(b.documentElement.scrollLeft, b.body.scrollLeft), c.top = Math.floor(a.top) + Math.max(b.documentElement.scrollTop, b.body.scrollTop), c.left -= b.documentElement.clientLeft, c.top -= b.documentElement.clientTop, a = b.body, b = parseInt(this.getStyle(a, "borderLeftWidth"), 10), a = parseInt(this.getStyle(a,
      "borderTopWidth"), 10), d && (c.left -= isNaN(b) ? 2 : b, c.top -= isNaN(a) ? 2 : a); else {
      d = a;
      do {
        c.left += d.offsetLeft;
        c.top += d.offsetTop;
        if (0 < ga && "fixed" === this.getStyle(d, "position")) {
          c.left += b.body.scrollLeft;
          c.top += b.body.scrollTop;
          break
        }
        d = d.offsetParent
      } while (d && d !== a);
      if (0 < ca || 0 < ga && "absolute" === this.getStyle(a, "position"))c.top -= b.body.offsetTop;
      for (d = a.offsetParent; d && d !== b.body;)c.left -= d.scrollLeft, ca && "TR" === d.tagName || (c.top -= d.scrollTop), d = d.offsetParent
    }
    return c
  };
  function M(a) {
    var b = C;
    a = b.g(a);
    b = b.getPosition(a);
    b.width = a.offsetWidth;
    b.height = a.offsetHeight;
    return b
  }

  m.opacity = function (a, b) {
    a = this.g(a);
    var c = t && 9 > t;
    return null != b || 0 === b ? (c ? (c = a.style, c.filter = "" + (c.filter || "").replace(/alpha\([^\)]*\)/gi, "") + (1 === b ? "" : "alpha(opacity=" + 100 * b + ")"), c.zoom = 1) : a.style.opacity = b, "") : c ? (c = a.style.filter) && 0 <= c.indexOf("opacity=") ? parseFloat(c.match(/opacity=([^)]*)/)[1]) / 100 + "" : "1" : this.getStyle(a, "opacity")
  };
  m.contains = function (a, b) {
    a = this.g(a);
    b = this.g(b);
    return a.contains ? a !== b && a.contains(b) : !!(a.compareDocumentPosition(b) & 16)
  };
  m.hasClass = function (a, b) {
    a = this.g(a);
    var c = F(b).split(/\s+/), d = c.length;
    for (b = a.className.split(/\s+/).join(" "); d--;)if (!RegExp("(^| )" + c[d] + "( |$)").test(b))return !1;
    return !0
  };
  m.getComputedStyle = function (a, b) {
    a = this.g(a);
    var c = a.ownerDocument;
    return c.defaultView && c.defaultView.getComputedStyle && (c = c.defaultView.getComputedStyle(a, null)) ? c[b] || c.getPropertyValue(b) : ""
  };
  m.getStyle = function (a, b) {
    a = this.g(a);
    b = oa(b);
    var c = (a.currentStyle ? a.currentStyle[b] : "") || this.getComputedStyle(a, b);
    if (!c || "auto" === c) {
      var d = N[b];
      d && (c = d.get ? d.get(a, b, c) : this.getStyle(a, d))
    }
    if (O)for (var d = b, e = 0, f; f = O[e]; e++)(f = f.get) && (c = f(d, c));
    return c
  };
  var N = N || {};
  N.display = t && 8 > t ? {
    set: function (a, b) {
      var c = a.style;
      "inline-block" === b ? (c.display = "inline", c.zoom = 1) : c.display = b
    }
  } : ba && 3 > ba ? {
    set: function (a, b) {
      a.style.display = "inline-block" === b ? "-moz-inline-box" : b
    }
  } : null;
  N["float"] = t ? "styleFloat" : "cssFloat";
  N.opacity = t && 9 > t ? {
    get: function (a) {
      return (a = a.style.filter) && 0 <= a.indexOf("opacity=") ? parseFloat(a.match(/opacity=([^)]*)/)[1]) / 100 + "" : "1"
    }, set: function (a, b) {
      var c = a.style;
      c.filter = (c.filter || "").replace(/alpha\([^\)]*\)/gi, "") + (1 == b ? "" : "alpha(opacity=" + 100 * b + ")");
      c.zoom = 1
    }
  } : null;
  var O = O || [];
  O[O.length] = {
    get: function (a, b) {
      if (/color/i.test(a) && -1 !== b.indexOf("rgb(")) {
        var c = b.split(",");
        b = "#";
        for (var d = 0, e; e = c[d]; d++)e = parseInt(e.replace(/[^\d]/gi, ""), 10).toString(16), b += 1 === e.length ? "0" + e : e;
        b = b.toUpperCase()
      }
      return b
    }
  };
  O[O.length] = {
    set: function (a, b) {
      b.constructor !== Number || /zIndex|fontWeight|opacity|zoom|lineHeight/i.test(a) || (b += "px");
      return b
    }
  };
  m = Da.prototype;
  m.children = function (a) {
    a = this.g(a);
    var b = [];
    for (a = a.firstChild; a; a = a.nextSibling)1 === a.nodeType && b.push(a);
    return b
  };
  function Ha(a, b, c, d) {
    b = a.g(b);
    for (a = b[d]; a; a = a[c])if (1 === a.nodeType)return a;
    return null
  }

  m.first = function (a) {
    return Ha(this, a, "nextSibling", "firstChild")
  };
  m.next = function (a) {
    return Ha(this, a, "nextSibling", "nextSibling")
  };
  m.prev = function (a) {
    return Ha(this, a, "previousSibling", "previousSibling")
  };
  m.getAncestorBy = function (a, b) {
    for (a = this.g(a); (a = a.parentNode) && 1 === a.nodeType;)if (b(a))return a;
    return null
  };
  m.insertBefore = function (a, b) {
    var c;
    a = this.g(a);
    b = this.g(b);
    (c = b.parentNode) && c.insertBefore(a, b);
    return a
  };
  m.q = function (a, b, c) {
    var d = [], e, f, g;
    if (!(a = F(a)))return d;
    if ("undefined" === typeof b)b = this.r; else if (b = this.g(b), !b)return d;
    c && (c = F(c).toUpperCase());
    if (b.getElementsByClassName)for (f = b.getElementsByClassName(a), b = f.length, e = 0; e < b; e++)g = f[e], c && g.tagName !== c || (d[d.length] = g); else for (a = RegExp("(^|\\s)" + String(a).replace(RegExp("([.*+?^=!:${}()|[\\]/\\\\-])", "g"), "\\$1") + "(\\s|$)"), f = c ? b.getElementsByTagName(c) : b.all || b.getElementsByTagName("*"), b = f.length, e = 0; e < b; e++)g = f[e], a.test(g.className) && (d[d.length] =
      g);
    return d
  };
  function Ea(a) {
    a.za || (a.za = function () {
      function b() {
        if (!b.isReady) {
          b.isReady = !0;
          for (var a = 0, c = d.length; a < c; a++)d[a]()
        }
      }

      var c = !1, d = [];
      (function () {
        if (!c) {
          c = !0;
          var d = a.r, f = window;
          if (t && f === top)(function () {
            if (!b.isReady) {
              try {
                d.documentElement.doScroll("left")
              } catch (a) {
                setTimeout(arguments.callee, 0);
                return
              }
              b()
            }
          })(); else if (d.addEventListener) {
            var g = ca ? function () {
              if (!b.isReady) {
                for (var a = 0; a < d.styleSheets.length; a++)if (d.styleSheets[a].disabled) {
                  setTimeout(arguments.callee, 0);
                  return
                }
                b()
              }
            } : b;
            d.addEventListener("DOMContentLoaded",
              g, !1);
            K(function () {
              d.removeEventListener("DOMContentLoaded", g, !1)
            })
          } else if (aa) {
            var k;
            (function () {
              if (!b.isReady)if ("loaded" !== d.readyState && "complete" !== d.readyState)setTimeout(arguments.callee, 0); else {
                if (void 0 === k) {
                  k = 0;
                  var a = d.getElementsByTagName("style"), c = d.getElementsByTagName("link");
                  a && (k += a.length);
                  if (c)for (var a = 0, f = c.length; a < f; a++)"stylesheet" === c[a].getAttribute("rel") && k++
                }
                d.styleSheets.length !== k ? setTimeout(arguments.callee, 0) : b()
              }
            })()
          }
          f.attachEvent ? (f.attachEvent("onload", b), K(function () {
            f.detachEvent("onload",
              b)
          })) : f.addEventListener && (f.addEventListener("load", b, !1), K(function () {
            f.removeEventListener("load", b, !1)
          }))
        }
      })();
      return function (a) {
        b.isReady ? a() : d[d.length] = a
      }
    }())
  }

  m.ready = function (a) {
    this.za.apply(this, arguments)
  };
  var C = new Da;
  var P = {}, Ia = [];

  function Ja(a, b) {
    function c() {
      d++;
      d >= e && b.apply(null, Ka(a))
    }

    "string" === typeof a && (a = [a]);
    for (var d = 0, e = a.length, f = 0; f < e; f++)La(a[f], c)
  }

  function Ka(a) {
    for (var b = [], c = 0; c < a.length; c++)b.push(P[a[c]] || null);
    return b
  }

  function La(a, b) {
    function c() {
      var a = d.readyState;
      if ("undefined" === typeof a || /^(?:loaded|complete)$/.test(a))if (a = d.src, d = d.onload = d.onreadystatechange = null, P[a])b(P[a]); else {
        var c = Ia.pop();
        c && (P[a] = c, b(c))
      }
    }

    if (P[a])b(P[a]); else {
      var d = Ma();
      d.src = a;
      document.addEventListener ? d.onload = c : d.readyState && (d.onreadystatechange = c);
      Fa(d)
    }
  }

  function Ma() {
    var a = document.createElement("script");
    a.type = "text/javascript";
    a.charset = "utf-8";
    a.async = !0;
    return a
  }

  window.ECMA_define = window.ECMA_define || function (a) {
      var b = Ga();
      b ? (a = a(), (b = b.src) ? P[b] = a : Ia.push(a)) : (b = a(), Ia.push(b))
    };
  window.ECMA_require = window.ECMA_require || function (a, b) {
      Ja(a, b)
    };
  function Na(a) {
    this.O = x({closeBoardRenderUrl: "http://ecma.bdimg.com/public03/imageplus/v2/dailog/close_board.app.js"}, this.O || {});
    this.s = x(this.O, a)
  }

  Na.prototype.get = function (a, b) {
    return a in this.s ? this.s[a] : b
  };
  function Oa(a, b, c) {
    this.B = "f21ac82b21eeb7322631b6aa94e17f45" + G();
    this.V = c;
    this.Ga = this.render();
    a.insertBefore(this.Ga, a.firstChild);
    Pa(this, b)
  }

  function Pa(a, b) {
    var c = C.g(a.B + "-icon");
    A(c, "mouseover", function (a) {
      ma(a);
      if (a = c.nextSibling)a.style.display = "block";
      b("tipmouseover")
    });
    A(c, "mouseout", function (a) {
      ma(a);
      if (a = c.nextSibling)a.style.display = "none";
      b("tipmouseout")
    });
    A(c, "click", function (a) {
      ma(a);
      b("tipclick")
    })
  }

  Oa.prototype.render = function () {
    var a = "#${domId} {position:absolute;top:0;left:0;right:auto;bottom:auto;margin:0;padding:0;border:0;width:200px;background:transparent;-webkit-box-sizing:content-box;box-sizing:content-box;}#${domId} div{float:left;width:144px;height:17px;line-height:17px;margin:3px 0 0 -2px;background:url(${TIP_BACK_URL}) 0 0 no-repeat;_background:0;_filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled='true',sizingMethod='corp',src='${TIP_BACK_URL}');font-family:sans-serif;text-align:center;font-size:12px;color:#666;padding:8px 10px;display:none;-webkit-box-sizing:content-box;box-sizing:content-box;}#${domId}-icon {float:left;height:38px;width:38px;cursor:default;background:url(${ICON_URL}) 0 0 no-repeat;_background:0;_filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled='true',sizingMethod='corp',src='${ICON_URL}');-webkit-box-sizing:content-box;box-sizing:content-box;}#${domId}-icon:hover {float:left;height:38px;width:38px;}#${domId} #${domId}-icon:hover {background:url(${ICON_HOVER_URL}) 0 0 no-repeat;_background:0;_filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled='true',sizingMethod='corp',src='${ICON_HOVER_URL}');}";
    this.V &&
    (a += "#${domId}-icon {width:34px;height:34px;margin:2px 0 0 2px;cursor:pointer;}#${domId}-icon:hover {width:34px;height:34px;}");
    var b = document.createElement("div");
    b.id = this.B;
    b.innerHTML = '<a href="javascript:void(0);" id="' + this.B + '-icon"></a>' + (this.V ? "" : '<div id="' + this.B + '-msg">\u67e5\u770b\u6807\u8bc6\u83b7\u53d6\u66f4\u591a\u4fe1\u606f</div>');
    var c = b.childNodes[0], a = na(a, {
      domId: this.B,
      TIP_BACK_URL: "http://ecma.bdimg.com/public03/imageplus/tip-back.png",
      ICON_URL: this.V ? "http://ecma.bdimg.com/public03/imageplus/i_2.png" :
        "http://ecma.bdimg.com/public03/imageplus/tip.png",
      ICON_HOVER_URL: this.V ? "http://ecma.bdimg.com/public03/imageplus/i_2.png" : "http://ecma.bdimg.com/public03/imageplus/tip-hover.png"
    }), d = C.r, e = c.parentNode;
    if (e) {
      var f = d.createElement("style");
      f.type = "text/css";
      f.media = "screen";
      e.insertBefore(f, c);
      f.styleSheet ? f.styleSheet.cssText = a : f.appendChild(d.createTextNode(a))
    }
    return b
  };
  function Q(a) {
    this.f = this.n = 0;
    this.a = [];
    this.P = [];
    this.config = a;
    this.va = Math.ceil(new Date / 36E5);
    this.u = {};
    this.t = null;
    this.ga = !1
  }

  m = Q.prototype;
  m.I = function () {
  };
  m.X = function () {
  };
  m.Aa = function () {
  };
  function Qa(a, b) {
    var c = a.getImgIndex(b);
    if (!c) {
      var c = ++a.f, d = a.X(b), e = function (b) {
        Ra(a, b.relatedTarget || b.fromElement, c) || a.c(c, "mouseover")
      }, f = function (b) {
        Ra(a, b.relatedTarget || b.toElement, c) || a.c(c, "mouseout")
      }, g = function () {
        a.c(c, "mousemove")
      };
      A(d, "mouseover", e);
      A(d, "mouseout", f);
      A(d, "mousemove", g);
      A(b, "mouseover", e);
      A(b, "mouseout", f);
      A(b, "mousemove", g);
      A(b, "click", function () {
        a.c(c, "clickimg")
      });
      a.a[c] = {h: b, j: d, w: {}, xa: {}, A: {}, p: {}, ha: 0, J: {}, aa: "", Pa: null, Oa: !1};
      a.n++
    }
    return c
  }

  function Ra(a, b, c) {
    a = a.a[c];
    if (!a || null == b)return !1;
    if (a.h === b || C.contains(a.j, b))return !0;
    var d = !1;
    a.links && D(a.links, function (a) {
      if (a === b || C.contains(a, b))return d = !0, !1
    });
    return d
  }

  m.W = function (a, b, c) {
    var d = this, e = "string" === typeof b ? b : b.url, f = "string" === typeof b ? "" : b.id, g = new R(this, a), k = g.getImgWrapper();
    k && (b = e, b = -1 !== b.indexOf("?") ? b + "&" : b + "?", b += "cacheTime=" + d.va, ECMA_require(b, function (b) {
      var n = d.a[a];
      if (null != n && C.contains(document.documentElement, k)) {
        d.u[e] || (d.u[e] = b.get("AD_CONFIG"));
        var h = {};
        H(h, d.u[e]);
        var r = c.id || h.id || "f21ac82b21eeb7322631b6aa94e17f45" + a + G();
        c.id = r;
        d.c(a, "renderloaded", e, r);
        var l = d.config.get("adConfig");
        l && H(h, l, !0);
        H(h, c, !0);
        h.api = g;
        b.set("AD_CONFIG",
          h);
        h = document.createElement("div");
        h.id = r;
        h.style.margin = "0px";
        h.style.padding = "0px";
        h.style.border = "none";
        h.style.overflow = "visible";
        h.style.textAlign = "left";
        k.appendChild(h);
        n.w[r] = h;
        n.A[r] = "canvasopen";
        n.p[r] = {id: f, url: e};
        n.ha++;
        g.m = r;
        b = b.start(!0, !0);
        n.xa[r] = b
      }
    }))
  };
  m.ia = function (a) {
    var b = this, c = b.a[a];
    if (c && !c.aa) {
      var d = new Oa(c.j, function () {
        var c = [].slice.call(arguments, 0);
        c.unshift(a);
        b.c.apply(b, c)
      }, b.ga);
      c.aa = d.B;
      c.Pa = d
    }
  };
  function Ta(a, b, c) {
    function d(a) {
      var b = {}, c;
      for (c in a)if (a.hasOwnProperty(c)) {
        var e = ya(a[c]);
        if ("object" === e || "array" === e) {
          if ("object" !== e || a[c].constructor === Object)b[c] = d(a[c])
        } else b[c] = a[c]
      }
      return b
    }

    var e = a.a[b];
    a = e.xa;
    var e = e.p, f = c || "ALL";
    c = [];
    if (w(f))c = f; else if ("ALL" === f)for (var g in a)a.hasOwnProperty(g) && c.push(g); else c = [f];
    f = [];
    b = "f21ac82b21eeb7322631b6aa94e17f45closeBoardCavnasId" + b;
    for (var k = 0; k < c.length; k++)if (g = c[k], g !== b) {
      var p = e[g];
      f.push({renderId: p.id, renderUrl: p.url, data: d(a[g].adConfig)})
    }
    return f
  }

  Q.prototype.closeAd = function (a, b, c) {
    var d = this.a[a], e = d.w, d = d.A;
    if ("ALL" === b) {
      for (var f in e)e.hasOwnProperty(f) && (e[f].style.display = "none", d[f] = "canvasclose");
      this.c(a, "hide");
      this.c(a, "onclose", c)
    } else e[b].style.display = "none", d[b] = "canvasclose", this.fire(a, b, "hide"), this.fire(a, b, "onclose", c)
  };
  Q.prototype.c = function (a, b, c) {
    if (3 < arguments.length) {
      var d = Array.prototype.slice.call(arguments);
      d.shift();
      d.unshift("ALL");
      d.unshift(a);
      this.fire.apply(this, d)
    } else this.fire(a, "ALL", b, c)
  };
  Q.prototype.fire = function (a, b, c, d) {
    var e = this.P[a];
    if (e) {
      var f;
      "string" !== typeof c && (f = c, c = c.type);
      if ((e = e[c]) && 0 !== e.length) {
        var g = Array.prototype.slice.call(arguments, 3);
        f ? f.imgIndex = a : f = {imgIndex: a, id: G(), type: c};
        g.unshift(f);
        for (var k = "ALL" === b, p, n = 0, h = e.length; n < h; n++)f = e[n], p = f.canvas, (k || "ALL" === p || p === b) && f.func.apply(null, g)
      }
    }
  };
  Q.prototype.getImgIndex = function (a) {
    if ("number" === typeof a)return a;
    for (var b = this.a, c = 1, d = b.length; c < d; c++)if (b[c] && b[c].h === a)return c;
    return 0
  };
  Q.prototype.l = function (a) {
    for (var b = this.a, c = 1, d = b.length; c < d; c++)if (b[c] && b[c].h === a)return b[c];
    return null
  };
  function S(a, b) {
    for (var c = a.a, d = 1, e = c.length; d < e; d++)c[d] && b(c[d], d)
  }

  Q.prototype.recordKey = function (a, b, c, d) {
    if (a = this.a[a])a.J[b] = a.J[b] || [], a.J[b].push("string" === typeof c ? {type: c, time: d} : c)
  };
  Q.prototype.addListener = function (a, b, c, d) {
    var e = this.P[a];
    e || (e = this.P[a] = {});
    e[c] || (e[c] = []);
    e[c].push({canvas: b, func: d})
  };
  Q.prototype.getImgs = function () {
    for (var a = [], b = 1; b <= this.n; b++)null != this.a[b] && a.push(this.a[b].h);
    return a
  };
  function R(a, b) {
    this.d = a;
    this.f = b;
    this.m = "";
    this.version = "1.0.7"
  }

  R.prototype.getImgs = function () {
    return this.d.getImgs()
  };
  R.prototype.l = function () {
    return this.d.a[this.f]
  };
  R.prototype.rendDone = function (a) {
    var b = this.d, c;
    "object" === typeof a ? (c = a.showTip, this.d.ga = null != a.useV2Tip ? a.useV2Tip : this.d.ga) : c = a;
    c && b.ia(this.f);
    b.a[this.f].Oa = !0
  };
  R.prototype.addListener = function (a, b) {
    this.d.addListener(this.f, this.m, a, b)
  };
  R.prototype.getImg = function () {
    var a = this.l();
    return a ? a.h : null
  };
  R.prototype.getImgWrapper = function () {
    var a = this.l();
    return a ? a.j : null
  };
  R.prototype.getCanvas = function () {
    var a = this.l();
    return a && a.w ? a.w[this.m] : null
  };
  R.prototype.getImgIndex = function () {
    return this.f
  };
  R.prototype.getImgRect = R.prototype.getAdRect = function () {
    var a = this.l();
    return a.rect || M(a.h)
  };
  R.prototype.setShareData = function (a, b, c) {
    var d = this.d;
    if (c)d.t = d.t || {}, d.t[a] = b; else if (c = d.a[this.f])c.$ = c.$ || {}, c.$[a] = b
  };
  R.prototype.getShareData = function (a, b) {
    if (b) {
      var c = this.d.t;
      return c ? c[a] || null : null
    }
    return (c = this.l()) && c.$ ? c.$[a] : null
  };
  R.prototype.recordKey = function (a, b) {
    this.d.recordKey(this.f, this.m, a, b)
  };
  R.prototype.recordTime = R.prototype.recordKey;
  R.prototype.getRecordedKey = function () {
    var a = this.l();
    return a && a.J ? a.J[this.m] : null
  };
  R.prototype.getRecordedTime = R.prototype.getRecordedKey;
  R.prototype.getRenderUrl = function () {
    var a = this.l();
    return a && a.p ? a.p[this.m].url || "" : ""
  };
  R.prototype.getRenderId = function () {
    var a = this.l();
    return a && a.p ? a.p[this.m].id || "" : ""
  };
  R.prototype.getLoaderConfig = function (a, b) {
    var c = this.d.config;
    return c.get.apply(c, arguments)
  };
  R.prototype.closeAd = function (a) {
    var b = {usePrompt: !0, reasons: "", availableReasons: null, canvas: "ALL", closeBy: "AD"};
    H(b, a || {}, !0);
    a = b.canvas;
    if ("string" === typeof a)"ME" === a.toUpperCase() && (a = this.m, b.canvas = this.m); else for (var c = 0; c < a.length; c++)"ME" === a[c].toUpperCase() && (a[c] = this.m);
    if (b.usePrompt) {
      b.materials = Ta(this.d, this.f, b.canvas);
      a = this.d;
      var c = this.f, d = a.a[c], e = "f21ac82b21eeb7322631b6aa94e17f45closeBoardCavnasId" + c, f = d.A[e];
      if ("canvasloading" !== f && "canvasopen" !== f)if ("canvasclose" === f)if (d =
          a.a[c], b = d.w, d = d.A, "ALL" === e) {
        for (var g in b)b.hasOwnProperty(g) && (b[g].style.display = "block", d[g] = "canvasopen");
        a.c(c, "show");
        a.c(c, "reopen")
      } else b[e].style.display = "block", d[e] = "canvasopen", a.fire(c, e, "show"), a.fire(c, e, "reopen"); else if (g = a.config.get("closeBoardRenderUrl"))d.A[e] = "canvasloading", b = b || {}, b.id = e, a.W(c, {
        url: g,
        id: "closeBoardRenderId"
      }, b)
    } else for (g = [], g = "string" === typeof a ? [a] : a, c = 0; c < g.length; c++)this.d.closeAd(this.f, g[c], b.reasons)
  };
  R.prototype.triggerAll = function (a, b) {
    if (2 < arguments.length) {
      var c = Array.prototype.slice.call(arguments);
      c.unshift(this.f);
      this.d.c.apply(this.d, c)
    } else this.d.c(this.f, a, b)
  };
  R.prototype.getRenderInfos = function () {
    var a = this.l(), b = [];
    if (!a || !a.p)return b;
    var a = a.p, c = {}, d, e;
    for (e in a)a.hasOwnProperty(e) && (d = a[e], c[d.id] || (c[d.id] = !0, b.push({id: d.id, url: d.url})));
    return b
  };
  R.prototype.getEnv = function () {
    return {from: "desktop"}
  };
  R.prototype.inView = function () {
    var a = this.l();
    return a ? a.inView : !0
  };
  function U(a) {
    var b = {top: 0, left: 0, width: 0, height: 0};
    if (Ua(a))return b;
    var c = a.baiduImageplusOverflowParent;
    if (c && Va(c))return Wa(a, c);
    if ((c = a.baiduImageplusHiddenParent) && Ua(c))return b;
    var d = !1, e = !1, f = null, c = baidu.dom.getAncestorBy(a, function (b) {
      var c = C.getStyle(b, "position");
      if ("absolute" === c || "fixed" === c)e = !0;
      if (Ua(b))return d = !0;
      if (e && "static" === c || !Va(b))return !1;
      f = Wa(a, b);
      return f.clipped
    });
    if (!c)return M(a);
    if (d)return a.baiduImageplusHiddenParent = c, b;
    a.baiduImageplusOverflowParent = c;
    return f
  }

  function Ua(a) {
    return "none" === C.getStyle(a, "display") || "0" === C.getStyle(a, "opacity") || "hidden" === C.getStyle(a, "visibility")
  }

  function Va(a) {
    if ("HTML" === a.nodeName || "BODY" === a.nodeName)return !1;
    var b = C.getStyle(a, "display"), c = C.getStyle(a, "float");
    return "inline" !== b || "none" !== c && "" !== c ? "visible" !== C.getStyle(a, "overflow") ? !0 : !1 : !1
  }

  function Wa(a, b) {
    var c = M(a), d = M(b), e = c.top, f = c.left, g = c.width, k = c.height, p = d.top, n = d.left, h = d.width, d = d.height;
    if (e >= p && f >= n && f + g <= n + h && e + k <= p + d)return c.clipped = !1, c;
    c = {clipped: !0};
    f > n ? (c.left = f, c.width = h - (f - n)) : (c.left = n, c.width = g - (n - f));
    c.width = Math.min(c.width, g, h);
    e > p ? (c.top = e, c.height = d - (e - p)) : (c.top = p, c.height = k - (p - e));
    c.height = Math.min(c.height, k, d);
    return c
  };
  function W(a) {
    this.S = a.get("imgRectKey", "baiduImageplusRect");
    Q.call(this, a);
    (a = baidu.cookie.get("baiduImageplusQid")) && baidu.cookie.remove("baiduImageplusQid", {path: "/"});
    this.ta = a || G() + (new Date).getTime();
    this.t = this.t || {};
    this.t.qid = "";
    this.sa = this.config.get("maxAdCount");
    this.qa = this.config.get("maxMiniAdCount");
    this.H = this.sa + this.qa;
    this.L = this.M = 0;
    this.o = {};
    this.Ea = {};
    this.Da = document.getElementsByTagName("img").length;
    this.pa = !1;
    this.ua = [];
    this.ea = this.fa = 0;
    this.ba = null;
    this.da = this.U = 0;
    this.Fa = this.config.get("noLogo");
    this.ra = this.config.get("maxMultiFormImgCount");
    this.D = (this.R = this.config.get("formList")) ? this.R.length : 0
  }

  baidu.inherits(W, Q);
  function Xa(a) {
    a = (a = a.config.get("imgContainerId")) && C.g(a) || document;
    return baidu.lang.toArray("img" === a.nodeName.toLowerCase() ? [a] : a.getElementsByTagName("img"))
  }

  m = W.prototype;
  m.I = function () {
    function a() {
      Ya(b);
      b.la();
      b.pa = !0;
      D(b.ua, function (a) {
        a()
      })
    }

    var b = this;
    b.config.get("autoStart") && ("complete" === document.readyState ? a() : A(window, "load", a))
  };
  m.ready = function (a) {
    this.pa ? a() : this.ua.push(a)
  };
  function Ya(a) {
    var b = a.n;
    0 < b && S(a, function (b, c) {
      Za(a, c)
    });
    if (b < a.H) {
      var c = Xa(a), d = function () {
        if (c.length && !(a.n >= a.H)) {
          var b = c.shift();
          $a(a.config, b) ? a.ja(b, function (c) {
            c ? (ab(a, b), J(d, 500)) : d()
          }) : d()
        }
      };
      d()
    }
  }

  function bb(a) {
    var b;
    try {
      b = decodeURIComponent(a.src)
    } catch (c) {
      b = pa(a.src)
    }
    return b
  }

  function cb(a, b) {
    if (!b)return !1;
    switch (b) {
      case 1:
        return a.da < a.qa;
      case 2:
        return a.U < a.sa;
      default:
        return !1
    }
  }

  m.ja = function (a, b) {
    var c = this, d = c.getImgIndex(a);
    if (d)Za(c, d), b && b(d); else if (c.n >= c.H)b && b(0); else if (db(c, a))b && b(0); else {
      var e = (new Date).getTime();
      eb(a, function (d) {
        if (!d || c.n >= c.H)b && b(0); else {
          d = a[c.S] = U(a);
          var g = X(c.config, d);
          if (cb(c, g)) {
            var k = (new Date).getTime();
            c.getData(a, function (d) {
              if (d && cb(c, g)) {
                var f = (new Date).getTime(), h;
                try {
                  h = decodeURIComponent(a.src)
                } catch (r) {
                  h = a.src
                }
                for (var l, u, v, y, E = !1, V = !1, Bb = function (a, b, d) {
                  if (a.imgIndex === l) {
                    for (var h in c.o)c.o.hasOwnProperty(h) && c.recordKey(l,
                      d, h, c.o[h]);
                    c.recordKey(l, d, "found", e);
                    c.recordKey(l, d, "loading", k);
                    c.recordKey(l, d, "loaded", f);
                    c.recordKey(l, d, "render_loaded", (new Date).getTime());
                    c.recordKey(l, d, "ad_count", c.fa);
                    c.recordKey(l, d, "pg_rect", fb());
                    a = L.rect;
                    c.recordKey(l, d, "img_rect", [a.top, a.left, a.width, a.height].join("_"))
                  }
                }, sa = 0, Cb = d.length; sa < Cb; sa++)if (u = d[sa], v = u.ads, "product" === u.name && gb(c.config.get("unionId"), "c_" + (v || []).length), v.length) {
                  for (var ua = 0, Db = v.length; ua < Db; ua++)if (y = v[ua], h === y.image) {
                    var Sa = hb(c, u.render);
                    if (Sa) {
                      y.position_type = u.position_type;
                      y.exp_list = u.exp_list;
                      u.box && (y.box = y.box || {}, H(y.box, u.box, !0));
                      if (!V) {
                        E = a[c.S];
                        l = Qa(c, a);
                        c.fa++;
                        1 === g ? c.da++ : c.U++;
                        var L = c.a[l], V = U(a);
                        L.rect = E || V;
                        L.Ka = g;
                        X(c.config, V) ? L.inView = ib(c, a) : (L.inView = !1, L.j.style.display = "none");
                        V = !0;
                        c.addListener(l, "ALL", "renderloaded", Bb)
                      }
                      c.W(l, {url: Sa, id: u.render_id}, y);
                      E = !0
                    }
                  }
                  E && jb(c, l)
                }
                b && b(l || 0)
              } else b && b(0)
            }, {imgType: g})
          } else b && b(0)
        }
      })
    }
  };
  function hb(a, b) {
    var c = a.config.get("renderReplaceRules");
    if (!c)return b;
    for (var d in c)if (c.hasOwnProperty(d)) {
      var e = RegExp(d);
      if (b.match(e))return (c = c[d]) ? b.replace(e, c) : ""
    }
    return b
  }

  m.Z = function (a) {
    if (a = this.getImgIndex(a)) {
      this.Ba(a);
      var b = this.a[a];
      if (b) {
        var c = b.w, d = b.A, e = b.p;
        this.c(a, "release");
        for (var f in c)c.hasOwnProperty(f) && (C.remove(f), c[f] = null, d[f] = null, e.ALL = null, b.ha--);
        0 < b.ha || (b.aa && C.remove(b.aa), f = b.h, B(f, "mouseover"), B(f, "mousemove"), B(f, "mouseout"), B(f, "click"), b = b.j, B(b, "mouseover"), B(b, "mousemove"), B(b, "mouseout"), this.Aa(a), this.a[a] = null, this.P[a] = null, this.n--)
      }
      this.fa--
    }
  };
  m.X = function (a) {
    var b = document.createElement("div");
    b.style.cssText = "position:absolute;border:0;margin:0;padding:0;height:0;overflow:visible;text-align:left;";
    kb(b, a);
    document.body.appendChild(b);
    var c = a[this.S];
    a[this.S] = null;
    lb(this, c, b);
    return b
  };
  function lb(a, b, c) {
    b = b.nodeName ? U(b) : b;
    var d = a.ba;
    d || ("static" === C.getStyle(document.body, "position") ? a.ba = d = {
      top: 0,
      left: 0
    } : a.ba = d = baidu.dom.getPosition(document.body));
    c.style.top = b.top - d.top + "px";
    c.style.left = b.left - d.left + "px";
    c.style.width = b.width + "px"
  }

  m.Aa = function (a) {
    (a = this.a[a]) && C.remove(a.j)
  };
  m.getData = function (a, b, c) {
    if (location.href.match(/(\?|&)baiduImageplus=/))b(window.baiduImagePlusFakeData); else {
      c = 1 === (c || {}).imgType;
      var d = this, e, f, g;
      if (a.nodeName && "img" === a.nodeName.toLowerCase()) {
        e = bb(a);
        if (f = d.Ea[e]) {
          b(f);
          return
        }
        f = d.config.get("apiWd");
        "function" === typeof f && (f = f(a));
        f = encodeURIComponent(f);
        g = a.offsetWidth;
        a = a.offsetHeight
      } else e = a.image, f = a.wd || "", g = a.width, a = a.height;
      var k = d.config.get("api"), p = d.config.get("unionId"), n = {
        src: d.config.get("apiSrc"),
        k: f,
        "iurl[]": e,
        qid: d.ta,
        tu: p,
        width: g,
        height: a,
        opt: d.o.opt || "",
        v: d.o.v || "",
        cached: 0,
        pic: d.Da,
        explist: d.config.get("expList", ""),
        vn: mb
      }, k = k + (-1 === k.indexOf("?") ? "?" : "&"), h = function (a, b) {
        H(a, n);
        baidu.sio.callByServer(k + qa(a), b, {charset: "gbk", timeOut: 1E4, onfailure: b})
      }, r = 0;
      e = function (a, b) {
        var c = {dri: ++d.ea};
        b && d.D && (H(c, d.R[r % d.D]), r++);
        h(c, a)
      };
      if (c)e(b, !1); else if (0 <= d.ra && d.U >= d.ra)e(b, !0); else {
        var l = parseInt(d.config.get("yuetuFormId", 0) || 0, 10), u = !1;
        0 < l && D(d.R || [], function (a) {
          if (l === parseInt(a.formId || 0, 10))return u = !0, !1
        });
        var v =
          [], y = 0, E = d.D;
        1 > E && (E = 1);
        c = function (a) {
          a && v.push(a);
          y++;
          y >= E && b(Array.prototype.concat.apply([], v))
        };
        0 < l && !u && (E += 1, a = {dri: ++d.ea, formId: l}, h(a, c));
        if (1 > d.D)e(c, !1); else for (a = 0; a < d.D; a++)e(c, !0)
      }
    }
  };
  function eb(a, b) {
    if (a.complete)b(!0); else {
      var c = function () {
        b(!0);
        B(a, "load", c)
      };
      A(a, "load", c);
      var d = function () {
        b(!1);
        B(a, "abort", d);
        B(a, "error", d)
      };
      A(a, "abort", d);
      A(a, "error", d)
    }
  }

  function nb(a, b, c) {
    var d = [];
    c ? (d[0] = c, d[1] = b) : (d[0] = a.getImgIndex(b), d[1] = a.a[d[0]]);
    return d[0] && d[1] ? d : null
  }

  m.ka = function (a, b) {
    var c = nb(this, a, b);
    if (c) {
      var d = c[0], c = c[1];
      if (C.contains(document.documentElement, c.h)) {
        var e = U(c.h), f = c.rect;
        if (e.top !== f.top || e.left !== f.left || e.width !== f.width || e.height !== f.height)if (c.rect = e, X(this.config, e))lb(this, e, c.j), Za(this, d), kb(c.j, c.h), this.c(d, "resize", e); else if (d = this.getImgIndex(d))c = this.a[d], c.inView = !1, c.j.style.display = "none", this.c(d, "hide")
      } else this.Z(d), 1 === c.Ka ? this.da-- : this.U--
    }
  };
  function Za(a, b) {
    var c = a.a[b];
    c.j.style.display = "block";
    c.inView = ib(a, c.h);
    a.c(b, "show")
  }

  m.Ca = function () {
    var a = this;
    S(a, function (b, c) {
      a.ka(b, c)
    })
  };
  m.la = function () {
    var a = this;
    ob(function () {
      a.n && (pb(a), S(a, function (b, c) {
        a.ka(b, c);
        qb(a, b, c)
      }))
    });
    rb(function () {
      a.n && S(a, function (b, c) {
        qb(a, b, c)
      })
    })
  };
  function ob(a) {
    var b;
    A(window, "resize", function () {
      b && Ba(b);
      var c = arguments, d = this;
      b = J(function () {
        a.apply(d, c);
        b = null
      }, 500)
    })
  }

  function rb(a) {
    function b() {
      d = g;
      c = null;
      a.apply(e, f);
      e = f = null
    }

    var c, d, e, f, g;
    A(window, "scroll", function () {
      e = this;
      f = arguments;
      g = (new Date).getTime();
      d = d || g;
      var a = 1E3 - (g - d);
      0 >= a ? (Ba(c), b()) : c || (c = J(b, a))
    })
  }

  function qb(a, b, c) {
    var d = ib(a, b.h);
    b.inView !== d && (b.inView = d, a.c(c, d ? "intoview" : "outview"));
    d && a.c(c, "inview")
  }

  function ib(a, b) {
    a.M = a.M || baidu.page.getViewWidth();
    a.L = a.L || baidu.page.getViewHeight();
    var c = b.getBoundingClientRect();
    return 0 < c.bottom && c.top < a.L && 0 < c.right && c.left < a.M
  }

  function pb(a) {
    a.M = baidu.page.getViewWidth();
    a.L = baidu.page.getViewHeight()
  }

  function ab(a, b) {
    function c(a) {
      (a = "." === a.charAt(0) ? baidu.q(a.replace(/^\./, "")) : C.g(a.replace(/^#/, ""))) && (baidu.lang.isArray(a) ? a.length && D(a, function (a) {
        d.Y(a, f, e)
      }) : d.Y(a, f, e))
    }

    var d = a, e = b ? d.getImgIndex(b) : 1, f = d.a[e];
    if (f) {
      var g = d.config.get("imgCoverId");
      g && c(g);
      (g = d.config.get("imgCovers")) && D(g.split(","), c)
    }
  }

  m.Y = function (a, b, c) {
    var d = this;
    if (b = nb(d, b, c)) {
      var e = b[0];
      b = b[1];
      b.links = b.links || [];
      b.C = b.C || [];
      c = function (a) {
        Ra(d, a.relatedTarget || a.fromElement, e) || d.c(e, "mouseover")
      };
      var f = function (a) {
        Ra(d, a.relatedTarget || a.toElement, e) || d.c(e, "mouseout")
      }, g = function () {
        d.c(e, "mousemove")
      }, k = function () {
        d.c(e, "clickimg")
      };
      b.links.push(a);
      b.C.push({mouseover: c, mouseout: f, mousemove: g, click: k});
      A(a, "mouseover", c);
      A(a, "mouseout", f);
      A(a, "mousemove", g);
      A(a, "click", k);
      kb(b.j, a)
    }
  };
  function kb(a, b) {
    var c;
    var d = b, e = d;
    for (c = [d]; (e = e.offsetParent) && "body" !== e.nodeName.toLowerCase();)"static" !== C.getStyle(e, "position") && (d = e, c.push(d));
    if (6 === t)c = parseInt(C.getStyle(d, "z-index"), 10) || 0; else {
      for (e = 0; c.length;)d = c.pop(), d = parseInt(C.getStyle(d, "z-index"), 10), isNaN(d) || (e = Math.max(d, e));
      c = e
    }
    d = parseInt(C.getStyle(a, "z-index"), 10) || 0;
    c > d && (a.style.zIndex = c + 10)
  }

  m.Qa = function (a, b) {
    var c = this.getImgIndex(b);
    if (c && (c = this.a[c], c.links)) {
      var d = baidu.array.indexOf(c.links, a);
      if (-1 !== d) {
        var e = c.C[d], f;
        for (f in e)e.hasOwnProperty(f) && B(a, f, e[f]);
        baidu.array.removeAt(c.links, d);
        baidu.array.removeAt(c.C, d)
      }
    }
  };
  m.Ba = function (a) {
    if (a = this.getImgIndex(a)) {
      var b = this.a[a];
      b.links && (D(b.links, function (a, d) {
        var e = b.C[d], f;
        for (f in e)e.hasOwnProperty(f) && B(a, f, e[f])
      }), b.links.length = 0, b.C.length = 0)
    }
  };
  function jb(a, b) {
    if (a.config.get("autoDetectCover")) {
      var c = a.config.get("findCoverLevel");
      if (!(0 >= c)) {
        var d = a.a[b];
        if (d) {
          var e = d.h, f = -1, g = {
            BODY: !0,
            HEAD: !0,
            SCRIPT: !0,
            STYLE: !0,
            META: !0,
            HTML: !0
          }, k = function (p, n) {
            if (!(f >= c || g[p.nodeName])) {
              f++;
              var h;
              if (h = 0 !== n)if ("a" === p.nodeName.toLowerCase() ? h = !0 : (h = C.getStyle(p, "cursor"), h = "pointer" === h || 0 === h.indexOf("url(")), h && (h = !C.contains(p, e))) {
                h = M(p);
                var r = d.rect, l = h.top, u = h.left, v = r.top, y = r.left, u = Math.abs(u - y) < (u > y ? r.width : h.width);
                h = Math.abs(l - v) < (l > v ? r.height :
                    h.height) && u
              }
              h && a.Y(p, d, b);
              4 !== n && (h = baidu.dom.first(p)) && k(h, 1);
              3 !== n && (h = baidu.dom.next(p)) && k(h, 2);
              2 !== n && (h = baidu.dom.prev(p)) && k(h, 3);
              (0 === n || 4 === n) && (h = p.parentNode) && k(h, 4);
              f--
            }
          };
          k(e, 0)
        }
      }
    }
  }

  function db(a, b) {
    var c = !1;
    S(a, function (a) {
      c || a.j && (c = C.contains(a.j, b))
    });
    return c
  }

  function fb() {
    var a = baidu.page.getViewHeight(), b = baidu.page.getViewWidth(), c = baidu.page.getScrollTop(), d = baidu.page.getScrollLeft();
    return [c, d, b, a].join("_")
  }

  m.ia = function () {
    this.Fa || W.superClass.ia.apply(this, arguments)
  };
  function sb(a) {
    var b = new Image, c = "baidu_ecom_lego_log_" + Math.floor(2147483648 * Math.random()).toString(36);
    window[c] = b;
    b.onload = b.onerror = b.onabort = function () {
      b.onload = b.onerror = b.onabort = null;
      b = window[c] = null
    };
    b.src = a
  };
  function Y(a) {
    this.oa = a.get("imgStatusKey", "baiduImageplusStatus");
    this.na = a.get("imgSnapshotKey", "baiduImageplusSnapshot");
    this.ca = !1;
    this.wa = 0;
    W.call(this, a)
  }

  baidu.inherits(Y, W);
  Y.prototype.I = function () {
    var a = this;
    if (a.config.get("autoStart")) {
      a.o.opt = 1;
      a.o.v = 8;
      var b = a.config.get("startOnLoad"), c, d = function () {
        function d() {
          a.n < a.H && tb(a);
          a.Ca();
          a.wa++;
          J(d, a.config.get("tickInterval"))
        }

        b && (a.o.onload = (new Date).getTime());
        c && clearTimeout(c);
        d();
        a.la()
      };
      b && "complete" !== document.readyState ? (A(window, "load", d), c = setTimeout(d, a.config.get("onloadTimeout"))) : d()
    }
  };
  function ub(a, b) {
    if (a.wa === parseInt(a.config.get("checkNoBigPicAtTickNum", 8), 10)) {
      b = b || [];
      var c = 0, d = !0;
      D(b, function (b) {
        if ($a(a.config, b)) {
          b = X(a.config, b);
          if (1 < b)return d = !1;
          1 === b && c++
        }
      });
      if (d) {
        var e = a.config.get("noBigPicLogUrl", "http://bzclk.baidu.com/nopic.jpg") + "?tu=" + a.config.get("unionId", "") + "&url=" + encodeURIComponent(window.location.href) + "&simg=" + c + "&cache=" + (new Date).getTime();
        sb(e)
      }
    }
  }

  function tb(a) {
    var b = Xa(a);
    ub(a, b);
    var c = a.oa;
    D(b, function (b) {
      if (b && $a(a.config, b))switch (b[c] || 0) {
        case 0:
          vb(a, b);
          break;
        case 1:
          var e = wb(b), f = b[a.na], g = !1, k;
          for (k in e)if (e.hasOwnProperty(k) && e[k] !== f[k]) {
            g = !0;
            break
          }
          g && (b[c] = 1, vb(a, b))
      }
    })
  }

  function vb(a, b) {
    var c = {};
    if (c.immediate || !a.ca)a.ca = !0, a.ja(b, function (d) {
      a.ca = !1;
      var e = a.oa;
      d ? (b[e] = 2, ab(a, b)) : (b[e] = 1, b[a.na] = wb(b));
      c.callback && c.callback(d)
    })
  }

  function wb(a) {
    var b = U(a);
    return {
      src: a.src,
      opacity: C.getStyle(a, "opacity"),
      visibility: C.getStyle(a, "visibility"),
      width: a.offsetWidth,
      height: a.offsetHeight,
      Ua: b.clipped
    }
  }

  Y.prototype.Z = function (a) {
    var b = a;
    if ("number" === typeof b)if (b = this.a[b])b = b.h; else return;
    b.baiduImageplusStatus = 0;
    Y.superClass.Z.call(this, a)
  };
  function Z(a) {
    this.O = x({
      autoStart: !0,
      imgContainerId: "",
      ignoredContainers: "",
      imgCoverId: "",
      imgCovers: "",
      apiSrc: 1E3,
      apiWd: function (a) {
        return a.alt || document.title
      },
      //api: "http://imageplus.baidu.com/ui",
      api: "./imageplus.baidu.com/ui.js",
      minImgWidth: 300,
      minImgHeight: 200,
      maxAdCount: 4,
      minMiniImgWidth: 200,
      minMiniImgHeight: 180,
      maxMiniAdCount: 2,
      autoDetectCover: !0,
      findCoverLevel: 4,
      supportGIF: !1,
      noLogo: !1,
      maxMultiFormImgCount: -1
    }, this.O || {});
    Na.call(this, a);
    this.Ha = this.get("supportGIF") ? /.(?:html|htm)(?:$|#|\?)/ : /.(?:gif|html|htm)(?:$|#|\?)/;
    this.minWidth = parseInt(this.get("minImgWidth"), 10);
    this.minHeight = parseInt(this.get("minImgHeight"), 10);
    this.Na = parseInt(this.get("minMiniImgWidth"), 10);
    this.Ma = parseInt(this.get("minMiniImgHeight"), 10);
    (a = F(this.get("unionId"))) && 0 === a.indexOf("u") && (a = a.slice(1));
    this.s.unionId = a;
    this.F = null
  }

  baidu.inherits(Z, Na);
  function xb(a, b) {
    var c = a.get("ignoredContainers");
    if (!c)return !1;
    a.F || (a.F = [], D(c.split(","), function (b) {
      b = "." === b.charAt(0) ? baidu.q(b.slice(1)) : [C.g(b.slice(1))];
      a.F = a.F.concat(b)
    }));
    var d = !1;
    D(a.F, function (a) {
      if (a && (C.contains(a, b) || a === b))return d = !0, !1
    });
    return d
  }

  function $a(a, b) {
    var c = b.getAttributeNode("data-baiduimageplus-ignore");
    return c && c.specified || a.Ha.test(b.src) || xb(a, b) ? !1 : !!X(a, {
      width: b.offsetWidth,
      height: b.offsetHeight
    })
  }

  function X(a, b) {
    var c = b.width, d = b.height;
    return d >= a.minHeight && c >= a.minWidth ? 2 : d >= a.Ma && c >= a.Na ? 1 : 0
  };
  function yb(a) {
    Z.call(this, a);
    this.s = x({
      tickInterval: 1E3,
      onloadTimeout: 5E3,
      startOnLoad: !1,
      noBigPicLogUrl: "http://bzclk.baidu.com/nopic.jpg",
      checkNoBigPicAtTickNum: 8
    }, this.s)
  }

  baidu.inherits(yb, Z);
  function zb(a) {
    Z.call(this, a);
    this.s = x({
      nopicLoaderLogUrl: "http://bzclk.baidu.com/nopic_loader.jpg",
      yuetuNopicFormId: 11,
      tagDomId: "imageplus-nopic-icon",
      nopicTickInterval: 1E3
    }, this.s)
  }

  ja(zb, Z);
  function Ab() {
    return RegExp("^[^\\x00-\\x20\\x7f\\(\\)<>@,;:\\\\\\'\\[\\]\\?=\\{\\}\\/\\u0080-\\uffff]+$").test("BDTUJIAID")
  }

  function Eb() {
    if (Ab()) {
      var a = /(^| )BDTUJIAID=([^;]*)(;|$)/.exec(document.cookie);
      if (a)return a[2] || null
    }
    return null
  };
  function Fb(a) {
    W.call(this, a);
    this.K = this.config.get("tagDomId", "imageplus-nopic-icon");
    this.b = ""
  }

  ja(Fb, W);
  function Gb(a, b) {
    var c = a.config.get("nopicLoaderLogUrl", "http://bzclk.baidu.com/nopic_loader.jpg");
    c && (c = c + (0 > c.indexOf("?") ? "?" : "&") + "actionId=0&url=" + encodeURIComponent(window.location.href) + "&msg=" + b, sb(c))
  }

  m = Fb.prototype;
  m.I = function () {
    function a() {
      (d = C.g(c.K)) ? (c.b += ",useTagId:1", b()) : e = setTimeout(function () {
        a()
      }, c.config.get("nopicTickInterval", 1E3))
    }

    function b() {
      c.b += ",tag_is_found:1";
      c.b += ",tag_found:" + (new Date).getTime();
      c.go(d)
    }

    var c = this;
    c.b += ",loader_start:" + (new Date).getTime();
    var d = null, e = 0;
    a();
    C.ready(function () {
      clearTimeout(e);
      if (!0 !== !!d) {
        if (d = C.g(c.K))c.b += ",useTagId:1"; else {
          c.b += ",useTagId:0";
          var a = (new Date).getTime(), g;
          g = [];
          for (var k = [document.body], p = [], n = 10, h = {script: !0, style: !0, input: !0, img: !0},
                 r = window.document.title, r = r.split("-")[0]; 0 < n--;) {
            for (; 0 < k.length;) {
              var l = k.shift();
              if (!h[l.tagName.toLowerCase()] && !C.hasClass(l, "yuetu-float-layer") && l.innerHTML) {
                for (var u = parseInt(2 * r.length / 3, 10), v = 0; v < u && l.innerHTML.charAt(v) === r.charAt(v); v++);
                v === u && g.push(l);
                p = p.concat(C.children(l))
              }
            }
            k = p;
            p = [];
            if (1 > k.length)break
          }
          c.b += ",algorithm_time:" + ((new Date).getTime() - a);
          c.b += ",algorithm_result_length:" + g.length;
          1 === g.length && (g = g[0], g.innerHTML += '<span id="' + c.K + '"></span>', d = C.g(c.K))
        }
        !0 === !!d ? b() :
          (c.b += ",tag_is_found:0", Gb(c, c.b))
      }
    })
  };
  m.getData = function (a) {
    if (location.href.match(/(\?|&)baiduImageplus=/))a(window.baiduImagePlusFakeData); else {
      var b = this.config.get("apiWd");
      "function" === typeof b && (b = b({}));
      var c = this.config.get("api"), d = this.config.get("unionId"), b = {
        src: this.config.get("apiSrc"),
        k: b,
        "iurl[]": "http://imageplus.baidu.com/imgs/showcase-1.jpg",
        qid: this.ta,
        tu: d,
        width: 660,
        height: 370,
        opt: 1,
        v: 8,
        cached: 0,
        pic: 1,
        explist: this.config.get("expList", ""),
        vn: mb
      }, c = c + (-1 === c.indexOf("?") ? "?" : "&"), d = {
        dri: ++this.ea, formId: this.config.get("yuetuNopicFormId",
          11)
      };
      H(d, b);
      baidu.sio.callByServer(c + qa(d), a, {charset: "gbk", timeOut: 1E4, onfailure: a})
    }
  };
  m.X = function () {
    var a = document.createElement("div");
    a.style.cssText = "position:absolute;border:0;margin:0;padding:0;height:0;overflow:visible;text-align:left;";
    document.body.appendChild(a);
    return a
  };
  m.W = function (a, b) {
    var c = this, d = "string" === typeof a ? a : a.url, e = "string" === typeof a ? "" : a.id, f = this.X();
    if (f) {
      var g = d, g = -1 !== g.indexOf("?") ? g + "&" : g + "?", g = g + ("cacheTime=" + c.va);
      ECMA_require(g, function (a) {
        if (C.contains(document.documentElement, f)) {
          c.u[d] || (c.u[d] = a.get("AD_CONFIG"));
          var g = {
            renderWrapper: f,
            unionId: c.config.get("unionId"),
            tagDom: C.g(c.K),
            renderId: e,
            api: {
              getImgWrapper: function () {
                return f
              }
            }
          };
          H(g, c.u[d]);
          var n = b.id || g.id || "f21ac82b21eeb7322631b6aa94e17f450" + G();
          b.id = n;
          var h = c.config.get("adConfig");
          h && H(g, h, !0);
          H(g, b, !0);
          a.set("AD_CONFIG", g);
          g = document.createElement("div");
          g.id = n;
          g.style.margin = "0px";
          g.style.padding = "0px";
          g.style.border = "none";
          g.style.overflow = "visible";
          g.style.textAlign = "left";
          f.appendChild(g);
          a.start(!0, !0)
        }
      })
    }
  };
  m.go = function () {
    var a = this, b, c, d;
    a.getData(function (e) {
      a.b += ",renderjs_got:" + (new Date).getTime();
      Gb(a, a.b);
      e = e || [];
      for (var f = 0, g = e.length; f < g; f++)if (b = e[f], c = b.ads, "product" === b.name && gb(a.config.get("unionId"), "c_" + (c || []).length), c.length)for (var k = 0, p = c.length; k < p; k++) {
        d = c[k];
        var n = hb(a, b.render);
        n && (d.position_type = b.position_type, d.exp_list = b.exp_list, b.box && (d.box = d.box || {}, H(d.box, b.box, !0)), a.W({
          url: n,
          id: b.render_id
        }, d))
      }
    })
  };
  var Hb = window.cpro_id || "", $ = window.baiduImagePlus || {}, Ib = {};
  Hb && (window.cpro_id = null);
  !$.unionId && Hb && ($.unionId = Hb);
  var mb = "150825";

  function gb(a, b) {
    baidu.sio.log("http://bzclk.baidu.com/eye.php?actionid=100&attach=" + a + "_" + b + "&timestamp=" + (new Date).getTime() + "_" + Math.floor(2147483648 * Math.random()).toString(36) + "&vn=" + mb)
  }

  function Jb(a) {
    function b(a) {
      var b = (window.location.hostname || "").split(".");
      if (!(2 > b.length))for (var c = "." + b[b.length - 1], d = b.length - 2; 0 <= d; d--) {
        var c = "." + b[d] + c, e = a, f = {path: "/", domain: c, ya: 31536E6};
        if (Ab()) {
          var f = f || {}, g = f.ya;
          ha(g) && (g = new Date, g.setTime(g.getTime() + f.ya));
          document.cookie = "BDTUJIAID=" + e + (f.path ? "; path=" + f.path : "") + (g ? "; expires=" + g.toGMTString() : "") + (f.domain ? "; domain=" + f.domain : "") + (f.jb ? "; secure" : "")
        }
        if (!0 === !!Eb())break
      }
    }

    function c() {
      for (var a = "", b = 10; 32 > a.length && 0 < b;)a +=
        Math.random().toString(16).slice(2), b -= 1;
      for (b = 32 - a.length; 0 < b;)a = "0" + a, b -= 1;
      return a.substr(0, 32)
    }

    function d(a) {
      var b;
      a = a || "";
      b = b || 4;
      for (var c = 0, d = Math.pow(10, b), e = a.length, f = 0; f < e; f += b) {
        var g = parseInt(a.substr(f, b), 16);
        ha(g) && (c = (c + g) % d)
      }
      return c
    }

    function e(a) {
      return !0 === !w(a) || 1 > a.length ? !1 : !0
    }

    var f = null, g = a.exp, k = Eb();
    k || b(c());
    k = Eb();
    if (!0 === !!g && !0 === e(g) && !0 === !!k) {
      f = x({}, a);
      f.expList = "";
      var p = d(k);
      D(g, function (a) {
        var b = ia(a.flow), c = parseInt(b[1] || 0, 10), d = p % parseInt(a.mode || 1E3, 10);
        if (d < parseInt(b[0] ||
            0, 10) || d >= c)return !0;
        f = x(f, a.config || {});
        f.expList = f.expList ? f.expList + ("_" + a.name) : "" + a.name
      });
      g = "exp&explist=" + f.expList + "&cookieid=" + k + "&url=" + encodeURIComponent(window.location.href) + "&referurl=" + encodeURIComponent(window.document.referrer);
      gb(F(f.unionId || "").replace(/^u/, ""), g)
    }
    return f || a
  }

  function Kb(a) {
    if (a.unionId) {
      a = Jb(a);
      var b = new Y(new yb(a || $));
      b.o = Ib;
      b.I();
      a = a || $;
      0 < parseInt(a.yuetuNopicFormId || 0, 10) && (new Fb(new zb(a))).I();
      window.baiduImagePlus = {
        _status: "loaded", _loader: b, showAd: function () {
          return b.ja.apply(b, arguments)
        }, removeAd: function () {
          return b.Z.apply(b, arguments)
        }, updateAd: function () {
          return b.ka.apply(b, arguments)
        }, updateAds: function () {
          return b.Ca.apply(b, arguments)
        }, watchAds: function () {
          return b.la.apply(b, arguments)
        }, linkAd: function () {
          return b.Y.apply(b, arguments)
        },
        unlinkAd: function () {
          return b.Qa.apply(b, arguments)
        }, unlinkAds: function () {
          return b.Ba.apply(b, arguments)
        }
      }
    }
  }

  if ("loading" !== $._status && "loaded" !== $._status) {
    $._status = "loading";
    window.baiduImagePlus = $;
    Ib.start = (new Date).getTime();
    var Lb = $.api || "http://imageplus.baidu.com/ui",
      Lb = Lb + (-1 === Lb.indexOf("?") ? "?" : "&") + "api=config&tu=" + F($.unionId || "").replace(/^u/, "") + "&pic=" + document.getElementsByTagName("img").length + "&vn=" + mb;
    baidu.sio.callByServer(Lb, function (a) {
      Ib.site_api_loaded = (new Date).getTime();
      a = a || {};
      if (1 === parseInt(a.confPriority || 0, 10)) {
        var b = {}, b = x(b, $);
        Kb(x(b, a))
      } else Kb(x(a, $))
    }, {
      charset: "gbk",
      timeOut: 1E4, onfailure: Kb
    })
  };

})(/** AD_CONFIG */{}, /** LINKS */[], /** RT_CONFIG */{});
//Tue Aug 25 2015 16:02:45 GMT+0800 (CST)