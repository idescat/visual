/* lazyload + visual + setup */

/*
LazyLoad makes it easy and painless to lazily load one or more external
JavaScript or CSS files on demand either during or after the rendering of a web
page.

Supported browsers include Firefox 2+, IE6+, Safari 3+ (including Mobile
Safari), Google Chrome, and Opera 9+. Other browsers may or may not work and
are not officially supported.

Visit https://github.com/rgrove/lazyload/ for more info.

Copyright (c) 2011 Ryan Grove <ryan@wonko.com>
All rights reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the 'Software'), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

@module lazyload
@class LazyLoad
@static
*/
LazyLoad=function(a){function h(b,c){var e,d=a.createElement(b);for(e in c)c.hasOwnProperty(e)&&d.setAttribute(e,c[e]);return d}function i(a){var c,g,b=d[a];b&&(c=b.callback,g=b.urls,g.shift(),e=0,g.length||(c&&c.call(b.context,b.obj),d[a]=null,f[a].length&&k(a)))}function j(){var c=navigator.userAgent;b={async:a.createElement("script").async===!0},(b.webkit=/AppleWebKit\//.test(c))||(b.ie=/MSIE|Trident/.test(c))||(b.opera=/Opera/.test(c))||(b.gecko=/Gecko\//.test(c))||(b.unknown=!0)}function k(e,g,k,n,o){var s,t,u,v,w,x,p=function(){i(e)},q="css"===e,r=[];if(b||j(),g)if(g="string"==typeof g?[g]:g.concat(),q||b.async||b.gecko||b.opera)f[e].push({urls:g,callback:k,obj:n,context:o});else for(s=0,t=g.length;t>s;++s)f[e].push({urls:[g[s]],callback:s===t-1?k:null,obj:n,context:o});if(!d[e]&&(v=d[e]=f[e].shift())){for(c||(c=a.head||a.getElementsByTagName("head")[0]),w=v.urls,s=0,t=w.length;t>s;++s)x=w[s],q?u=b.gecko?h("style"):h("link",{href:x,rel:"stylesheet"}):(u=h("script",{src:x}),u.async=!1),u.className="lazyload",u.setAttribute("charset","utf-8"),b.ie&&!q&&"onreadystatechange"in u&&!("draggable"in u)?u.onreadystatechange=function(){/loaded|complete/.test(u.readyState)&&(u.onreadystatechange=null,p())}:q&&(b.gecko||b.webkit)?b.webkit?(v.urls[s]=u.href,m()):(u.innerHTML='@import "'+x+'";',l(u)):u.onload=u.onerror=p,r.push(u);for(s=0,t=r.length;t>s;++s)c.appendChild(r[s])}}function l(a){var b;try{b=!!a.sheet.cssRules}catch(c){return e+=1,200>e?setTimeout(function(){l(a)},50):b&&i("css"),void 0}i("css")}function m(){var b,a=d.css;if(a){for(b=g.length;--b>=0;)if(g[b].href===a.urls[0]){i("css");break}e+=1,a&&(200>e?setTimeout(m,50):i("css"))}}var b,c,d={},e=0,f={css:[],js:[]},g=a.styleSheets;return{css:function(a,b,c,d){k("css",a,b,c,d)},js:function(a,b,c,d){k("js",a,b,c,d)}}}(this.document);
/*
Visual
Copyright (c) 2020 Institut d'Estadistica de Catalunya (Idescat)
http://www.idescat.cat (https://github.com/idescat/visual)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
var VisualJS = { version: "1.2.7", show: !0, old: !1, fixed: null, width: 500, bwidth: 500, height: 500, normal: 500, scripts: [], map: {}, container: {}, pub: {}, func: {}, callback: null, getSize: function (e) { var a = VisualJS.setup, t = a.html.heading, i = "." + VisualJS.setup.footerclass, l = "undefined" != typeof jQuery ? jQuery : "undefined" != typeof d3 ? d3.select : document.querySelectorAll.bind(document), n = window, r = document, s = r.documentElement, o = r.getElementsByTagName("body")[0], u = r.getElementById(e), d = function (e, a) { return "function" == typeof getComputedStyle ? getComputedStyle(e)[a] : e.currentStyle[a] }, p = function (e) { var a = l(e); return a[0] instanceof Element ? a[0] : a[0] && a[0][0] ? a[0][0] : void 0 }, c = function (e) { if (e) { var a = e.offsetHeight; d(e); return a += Math.round(parseFloat(d(e, "marginTop")) + parseFloat(d(e, "marginBottom"))) } return 0 }, y = c(p(t)), f = c(p(i)), g = n.innerHeight || s.clientHeight || o.clientHeight, x = Math.round(parseFloat(d(u, "marginTop")) + parseFloat(d(u, "marginBottom"))); return void 0 !== g && void 0 !== y && void 0 !== f && (null === VisualJS.fixed ? (VisualJS.bwidth = n.innerWidth || s.clientWidth || o.clientWidth, VisualJS.width = VisualJS.bwidth - a.padding.w, VisualJS.height = Math.floor(g - y - f - x - 10)) : (VisualJS.bwidth = s.clientWidth || o.clientWidth, VisualJS.width = VisualJS.fixed[0] - a.padding.w, VisualJS.height = Math.floor(VisualJS.fixed[1] - y - f - x - 10))), VisualJS.visualsize = VisualJS.width < VisualJS.normal ? a.mini : a.normal, 10 < VisualJS.width && 10 < VisualJS.height }, arr2html: function (e, a) { var t = ""; return void 0 === e || (Array.isArray(e) ? e.forEach(function (e) { "string" == typeof e && "" !== e && (t += "<p>" + e + "</p>") }) : "string" == typeof e && "" !== e && (t += "<p>" + e + "</p>")), t }, iframe: function (e, a) { var t, i, l, n, r, s, o = VisualJS.setup, u = "string" == typeof e.clas ? e.clas : o.clas, d = '<!DOCTYPE html>\n\x3c!--[if lt IE 7]><html class="lt-ie9 lt-ie8 lt-ie7"> <![endif]--\x3e\n\x3c!--[if IE 7]><html class="lt-ie9 lt-ie8"> <![endif]--\x3e\n\x3c!--[if IE 8]><html class="lt-ie9"> <![endif]--\x3e\n\x3c!--[if gt IE 8]>\x3c!--\x3e <html> \x3c!--<![endif]--\x3e\n<head>'; "string" == typeof a && (-1 === a.indexOf("{") ? d += '<link href="' + a + '" rel="stylesheet" type="text/css"/>' : d += '<style type="text/css">' + a + "</style>"), d += '<script type="text/javascript" src="' + VisualJS.setup.main.visual + '"><\/script>', d += '<script type="text/javascript" src="' + VisualJS.setup.main.setup + '"><\/script>', d += '<script type="text/javascript" src="' + VisualJS.setup.main.lazy + '"><\/script>', d += '</head><body><div id="' + e.id + '" class="' + u + '"></div><script>window.setTimeout(function(){visual(' + JSON.stringify(e) + ");},1);<\/script></body></html>", n = document, r = n.createElement("iframe"), s = n.getElementById(e.id), r.setAttribute("title", e.title ? VisualJS.setup.i18n.text.iframetitle[e.lang] + ": " + e.title : VisualJS.setup.i18n.text.iframetitle[e.lang]), r.setAttribute("aria-hidden", "true"), r.setAttribute("role", "widget"), r.frameBorder = "0", r.scrolling = "no", s.parentNode.insertBefore(r, s.nextSibling), i = d, void 0 !== (t = r) && (t.contentDocument ? l = t.contentDocument : t.contentWindow ? l = t.contentWindow.document : window.frames[t.name] && (l = window.frames[t.name].document), l && (l.open(), l.write(i), l.close())) }, compare: function (i) { var e, l = VisualJS.setup, n = VisualJS.setup.separator, r = "string" == typeof i.id ? i.id : l.id, a = "[object Array]" === Object.prototype.toString.call(i.css) ? 0 === i.css.length ? ["", ""] : 1 === i.css.length ? [i.css[0], i.css[0]] : i.css : [i.css, i.css], t = document, s = t.createElement(l.html.heading), o = "string" == typeof i.title ? i.title : "", u = t.createElement("p"), d = l.html, p = "string" == typeof i.footer ? VisualJS.arr2html(i.footer, d) : "", c = t.getElementById(r), y = t.createElement("div"), f = t.createElement("style"), g = function () { if (VisualJS.getSize(r)) { var e = VisualJS.height + ("string" == typeof i.footer && "" !== i.footer ? 14 : 0), a = VisualJS.width + l.margin, t = "iframe{ float: left; width: " + Math.floor((a - n) / 2 - l.margin) + "px; height:" + e + "px; }"; f.styleSheet ? f.styleSheet.cssText = t : f.innerHTML = t, y.style.height = e + "px" } }; s.innerHTML = o, s.style.overflow = "auto", u.innerHTML = p, u.style.overflow = "auto", u.style.clear = "both", c.appendChild(s), c.appendChild(u), t.getElementsByTagName("head")[0].appendChild(f), y.style.width = n + "px", "styleFloat" in y.style ? y.style.styleFloat = "left" : y.style.cssFloat = "left"; for (var x = 0; x < 2; x++)e = t.createElement("span"), "string" != typeof i.load[x].id && (i.load[x].id = l.compareids[x]), e.id = i.load[x].id, c.insertBefore(e, u), VisualJS.iframe(i.load[x], a[x]); c.insertBefore(y, e), g(), VisualJS.fixed || (window.addEventListener ? window.addEventListener("resize", g, !1) : window.attachEvent ? window.attachEvent("onresize", g) : window.onresize = g) }, load: function (e) { var a = function (a) { var e, t = function (e) { a.source.postMessage(JSON.stringify(e), "*") }; if ("string" == typeof a.data ? e = JSON.parse(a.data) : "object" == typeof a.data && (e = a.data), e) if (void 0 === e.action) t({ type: "error", data: [{ id: "400", label: '"action" is required.' }] }); else if ("send" === e.action) { var i = e.id || VisualJS.id, l = VisualJS.container[i] || VisualJS.container[i]; if (l) { if ("cmap" === l.type && !l.data[0].hasOwnProperty("label")) { for (var n = [], r = VisualJS.map[l.by], s = r.features.length; s--;)n[r.features[s].properties[r.id]] = r.features[s].properties[r.label]; for (var o = l.data, u = o.length; u--;)o[u].label = n[o[u].id] } t(l) } else t({ type: "error", data: [{ id: "404", label: 'A visualisation with the specified "id" was not found' }] }) } else t({ type: "error", data: [{ id: "400", label: '"action" value is not correct.' }] }) }; if (void 0 === VisualJS.setup && window.alert("Visual: Setup not found (visual.setup.js)!"), "[object Array]" !== Object.prototype.toString.call(e)) VisualJS.get(e); else for (var t = 0, i = e.length; t < i; t++)VisualJS.get(e[t]); VisualJS.container[VisualJS.id].listen && (window.addEventListener ? window.addEventListener("message", a, !1) : window.attachEvent("onmessage", a)) }, get: function (U) { var u, d, e, a, t, i, l, n, r, Q = VisualJS.setup, G = Q.html, K = Q.canvas, Z = G.heading, _ = "." + VisualJS.setup.footerclass, s = VisualJS.old || Q.func.old("ie9"), o = function (e, a, t) { "string" == typeof e ? a.match(typeof U[e]) || (U[e] = t[e]) : a.match(typeof p(U, e)) || c(U, e, p(t, e)) }, p = function (e, a) { for (var t = e, i = 0; i < a.length; i++) { if (void 0 === t[a[i]]) { t = void 0; break } t = t[a[i]] } return t }, c = function (e, a, t) { for (var i = e, l = 0; l <= a.length - 2; l++)void 0 === i[a[l]] && (i[a[l]] = {}), i = i[a[l]]; i[a[a.length - 1]] = t }, y = function (e) { return "object" == typeof e && null !== e }, f = function () { var e = "invalid"; return Array.isArray(U.data) && (Array.isArray(U.data[0]) ? e = "array" : y(U.data[0]) && (e = y(U.data[0].z) ? "xyz" : y(U.data[0].y) ? "xy" : void 0 !== U.data[0].x || void 0 !== U.data[0].y || !Array.isArray(U.data[0].val) || null === U.data[0].val[0] || 2 != U.data[0].val[0].length && 3 != U.data[0].val[0].length ? "object" : "points")), e }, g = [["show", "boolean", VisualJS], ["callback", "function", VisualJS], ["id", "string", Q], ["listen", "boolean", Q], ["dec", "number|object", K], ["autoheading", "boolean", K], ["legend", "boolean", K], ["grid", "object", K], [["grid", "border"], "number", K], [["grid", "shadow"], "number", K], [["grid", "line"], "number", K], [["grid", "point"], "number", K], [["grid", "markings"], "object", K], ["axis", "object", K], [["axis", "x"], "boolean", K], [["axis", "y"], "boolean", K], [["axis", "labels", "x"], "boolean", K], [["axis", "labels", "y"], "boolean", K], [["axis", "ticks", "x"], "boolean", K], [["axis", "ticks", "y"], "boolean", K]]; void 0 === K.axis.labels && (K.axis.labels = { x: !0, y: !0 }), void 0 === K.axis.ticks && (K.axis.ticks = { x: !0, y: !0 }); for (var x = 0; x < g.length; x++)o(g[x][0], g[x][1], g[x][2]); VisualJS.scripts = [], VisualJS.id = U.id, VisualJS.pub[VisualJS.id] = { heading: null, legend: null }, "object" == typeof U.fixed && (VisualJS.fixed = U.fixed), "object" == typeof U.unit && null !== U.unit ? (o(["unit", "label"], "string|object", K), o(["unit", "symbol"], "string|object", K), o(["unit", "position"], "string|object", K)) : U.unit = K.unit, U.range = (e = U.range, n = f(), "object" != typeof e || null === e || Array.isArray(e) || "array" !== n && "object" !== n || "xy" === U.type || (e = "rank" === U.type || "pyram" === U.type ? e.x : e.y), Array.isArray(e) && 2 === e.length && null === e[0] && null === e[1] ? U.data && "object" === n && (l = [], U.data.forEach(function (e) { l = l.concat(e.val) }), 0 <= (a = [Math.min.apply(null, l), Math.max.apply(null, l)])[0] && 0 <= a[1] ? e = [0, null] : a[0] <= 0 && a[1] <= 0 && (e = [null, 0])) : "object" == typeof e && !Array.isArray(e) && null !== e && (Array.isArray(e.x) && null === e.x[0] && null === e.x[1] || Array.isArray(e.y) && null === e.y[0] && null === e.y[1]) ? (d = { x: [], y: [] }, t = { x: [], y: [] }, i = { x: [], y: [] }, "points" === n ? U.data.forEach(function (e) { e.val.forEach(function (e) { d.x.push(e[0]), d.y.push(e[1]) }) }) : "xy" !== n && "xyz" !== n || U.data.forEach(function (e) { d.x = d.x.concat(e.x.val), d.y = d.y.concat(e.y.val) }), t.x = Math.min.apply(null, d.x), i.x = Math.max.apply(null, d.x), t.y = Math.min.apply(null, d.y), i.y = Math.max.apply(null, d.y), Array.isArray(e.x) && null === e.x[0] && null === e.x[1] && (0 <= t.x && 0 <= i.x ? e.x = [0, null] : t.x <= 0 && i.x <= 0 ? e.x = [null, 0] : e.x = [null, null]), Array.isArray(e.y) && null === e.y[0] && null === e.y[1] && (0 <= t.y && 0 <= i.y ? e.y = [0, null] : t.y <= 0 && i.y <= 0 ? e.y = [null, 0] : e.y = [null, null])) : "xy" !== n && "xyz" !== n && "points" !== n || ("number" == typeof e || Array.isArray(e) ? e = { x: [null, null], y: Array.isArray(e) ? e : [null, e] } : "object" == typeof e && null !== e || (e = { x: [null, null], y: [null, null] })), e), U.lang = U.lang || Q.i18n.lang, "number" == typeof U.range || void 0 !== (r = U.range) && "[object Array]" === Object.prototype.toString.call(r) && 2 === r.length && "number" == typeof r[0] && "number" == typeof r[1] && r[0] < r[1] || ("object" != typeof U.range || null === U.range || Array.isArray(U.range)) && (U.range = "number" == typeof U.range || Array.isArray(U.range) && 2 === U.range.length ? U.range : K.range.hasOwnProperty(U.type) && "number" == typeof K.range[U.type] ? K.range[U.type] : null), U.unit = function (e) { var a; f(); for (var t in e) e.hasOwnProperty(t) && (a = e[t], "xy" === U.type || ("rank" === U.type || "pyram" === U.type ? a && void 0 !== a.x ? e[t] = a.x : e[t] = "string" == typeof a ? a : "" : a && void 0 !== a.y ? e[t] = a.y : e[t] = "string" == typeof a ? a : "")); return e }(U.unit), U.tooltipseparator = Q.tooltipseparator && "string" == typeof Q.tooltipseparator ? Q.tooltipseparator : " / ", VisualJS.container[VisualJS.id] = U; var b, ee = "#" + VisualJS.id, h = ee + " ." + Q.canvasclass, ae = VisualJS.container[VisualJS.id], m = null, v = function () { return !1 !== ae.tooltip }, S = function () { if (!1 === ae.autoheading) return ae.title || ""; var e, t = [], a = function (e, a) { "string" == typeof e && "" !== e && (!0 === a && (e = '<span class="' + VisualJS.setup.nowrapclass + '">' + e + "</span>"), t.push(e)) }; null !== ae.time && "object" == typeof ae.time ? e = A(ae.time[0], VisualJS.id) + "&ndash;" + A(ae.time[ae.time.length - 1], VisualJS.id) : e = A(ae.time, VisualJS.id); return a(ae.title, !1), a(ae.geo, !0), a(e, !0), te(t.join(". ")) }, J = function () { var e = !1; "function" == typeof VisualJS.chart && (v() && L(), ae.show && VisualJS.chart(), VisualJS.fixed || (window.addEventListener ? window.addEventListener("resize", b, !1) : window.attachEvent ? window.attachEvent("onresize", b) : window.onresize = b), e = !0), null !== ae.callback && ae.callback.call({ id: VisualJS.id, chart: e, heading: VisualJS.pub[VisualJS.id].heading, legend: VisualJS.pub[VisualJS.id].legend }) }, te = function (e) { return String(e).replace(/&amp;/g, "&") }, V = function (e, a) { return (!a || !e.exists.call()) && (VisualJS.scripts.push(e.js), !0) }, ie = function (e, a, t) { var i = "number" == typeof t && "" !== VisualJS.container[e].unit.label ? " " + VisualJS.container[e].unit.label : "", l = "number" == typeof t ? VisualJS.container[e].unit.symbol : "", n = ne(t, e), r = n !== VisualJS.setup.i18n.text.na[VisualJS.container[e].lang] ? "end" === VisualJS.container[e].unit.position ? n + i + ("" !== l ? " " + l : l) : l + n + i : n; return a ? "<strong>" + r + "</strong> " + a : r }, le = function (e, a, t) { var i = "number" == typeof t ? VisualJS.container[e].unit.symbol : "", l = ne(t, e), n = l !== VisualJS.setup.i18n.text.na[VisualJS.container[e].lang] ? "end" === VisualJS.container[e].unit.position ? l + "" + ("" !== i ? " " + i : i) : i + l + "" : l; return a ? "<strong>" + n + "</strong> " + a : n }, k = function (e, a, t, i) { return U.axis.labels[t] ? "function" == typeof i ? i(e, a, t) : ne(e, a, t) : "" }, w = function (e) { for (var a = [], t = 0; t < e.length; t++)Array.isArray(e[t]) ? a.push([e[t][0], ""]) : a.push([e[t], ""]); return a }, ne = function (e, a, t) { if (null == e) return VisualJS.setup.i18n.text.na[VisualJS.container[a].lang]; if ("number" == typeof e) { for (var i = /(\d+)(\d{3})/, l = ("object" == typeof VisualJS.container[a].dec && null !== VisualJS.container[a].dec && "string" == typeof t && "number" == typeof VisualJS.container[a].dec[t] ? e.toFixed(VisualJS.container[a].dec[t]) : "number" == typeof VisualJS.container[a].dec ? e.toFixed(VisualJS.container[a].dec) : String(e)).split("."), n = l[0], r = 1 < l.length ? VisualJS.setup.i18n.text.dec[VisualJS.container[a].lang] + l[1] : ""; i.test(n);)n = n.replace(i, "$1" + VisualJS.setup.i18n.text.k[VisualJS.container[a].lang] + "$2"); return n + r } return "" }, A = function (e, a) { var t, i, l, n; if (!m) { if (!e) return null; if (isNaN(e)) return e; switch (e.length) { case 5: t = VisualJS.setup.i18n.text.quarter, n = j("aaaaq", U.lang); break; case 6: t = VisualJS.setup.i18n.text.month, n = j("aaaamm", U.lang); break; default: return e }m = { label: t, text: t[VisualJS.container[a].lang], template: n } } return void 0 === m.label ? e : void 0 === m.text ? e : void 0 === (i = m.text[e.slice(4) - 1]) ? e : (l = e.slice(0, 4), m.template.replace("{{period}}", i).replace("{{year}}", l)) }, j = function (e, a) { var t = Q.i18n.template; if (t) { if ("string" == typeof t) return t; if ("object" == typeof t && t[e] && "string" == typeof t[e][a]) return t[e][a] } return "{{period}} {{year}}" }, re = function (e, a, t) { var i = document.getElementById(VisualJS.setup.tooltipid), l = VisualJS.bwidth - VisualJS.setup.margin, n = {}; i.innerHTML = e, i.style.display = "block"; var r = i.clientWidth / 2; n.x = a - r, n.y = t - i.clientHeight - 5, l < a + r ? n.x -= a + r - l : n.x < VisualJS.setup.margin && (n.x += VisualJS.setup.margin - n.x), n.y < VisualJS.setup.margin && (n.y += 1.75 * i.clientHeight), i.style.left = n.x + "px", i.style.top = n.y + "px" }, L = function () { var e = document; if (!e.getElementById(VisualJS.setup.tooltipid)) { var a = e.createElement("div"); a.setAttribute("role", "tooltip"), a.id = VisualJS.setup.tooltipid, a.style.display = "none", e.body.appendChild(a) } }; if ("cmap" === U.type) if (s) document.getElementById(VisualJS.id).innerHTML = "<p>" + Q.i18n.text.oldbrowser[ae.lang] + "</p>"; else { if ("string" != typeof U.by) return; V(Q.lib.maps, !0), V(Q.lib.d3, !0), V(Q.map[U.by], !0), VisualJS.chart = function () { var $ = S(), O = VisualJS.map[U.by], W = O.area[0], q = O.area[1], C = null !== U.grouped && "object" == typeof U.grouped && Array.isArray(U.grouped.label) && 0 < U.grouped.label.length && U.data[0].hasOwnProperty("group"), P = U.data[0].hasOwnProperty("val"), H = C ? U.grouped.label.length : P ? Q.colors.map.max : 1, N = Q.colorclassprefix, R = VisualJS.func.colors(Q.colors.map.base, H, "fill", N, C && !P && "object" == typeof U.grouped.color && U.grouped.color.length === U.grouped.label.length ? U.grouped.color : [], VisualJS.id), X = d3.select(ee), e = d3.geo[O.projection](), a = ("object" == typeof O.center && "function" == typeof e.center ? e.center(O.center) : e).scale(O.scale).translate([W / 2, q / 2]), Y = d3.geo.path().projection(a), D = d3.select("#" + Q.tooltipid); (b = function () { var e = te(VisualJS.arr2html(U.footer, G) || ""); if (X.html("<header><" + Z + ' id="ARIAtitle" style="overflow:auto;" ></' + Z + '></header><footer class="' + VisualJS.setup.footerclass + '" style="overflow:auto;"></footer>'), d3.select(ee + " " + Z).html($), d3.select(ee + " " + _).html(e), VisualJS.getSize(VisualJS.id)) { var l, i, a, t, n, r, s, o = VisualJS.id, u = d3.map(), d = d3.map(), p = U.data[0].hasOwnProperty("label"), c = [], y = function () { }, f = VisualJS.height / q, g = VisualJS.width / W, x = Math.min(Math.round(W * f), VisualJS.width), b = Math.min(Math.round(q * g), VisualJS.height), h = Math.floor((VisualJS.width - x) / 2), m = Math.floor((VisualJS.height - b) / 2), v = f < g ? f : g, S = X.insert("svg:svg", _).attr("viewBox", "0 0 " + x + " " + b).attr("width", x).attr("height", b).attr("role", "img").attr("aria-labelledby", "ARIAtitle"), J = !0; C && P ? (r = [], [1, U.grouped.label.length].forEach(function (e) { for (var a = 0; a < U.data.length; a++)if (U.data[a].group === e) { r.push(U.data[a].val); break } }), r[0] > r[1] && (J = !1)) : C && U.grouped.color && (R = U.grouped.color), C ? (l = d3.map(), y = function (e, a) { e.set(a.id, a.group) }, VisualJS.groupedLabelSize = null, a = function (e, a, t) { if (P && !J) { if (!VisualJS.groupedLabelSize) { for (var i = {}, l = 0; l < d3.values(e).length; l++)i[d3.values(e)[l]] = 1 + (i[d3.values(e)[l]] || 0); VisualJS.groupedLabelSize = Object.keys(i).length } return N + (VisualJS.groupedLabelSize - e.get(t[O.id])) } return N + (e.get(t[O.id]) - 1) }, i = function (e, a) { var t = U.grouped.label[e.get(a[O.id]) - 1], i = p ? d.get(a[O.id]) : a[O.label]; return void 0 !== t && (i += " <em>" + t + "</em>"), i }, VisualJS.func.legend) : (P ? (a = function (e, a, t, i, l) { var n = a.get(t[O.id]); return void 0 === n ? "" : i === l ? N + (H / 2).toFixed(0) : d3.scale.quantize().domain([i, l]).range(d3.range(H).map(function (e) { return N + e }))(n) }, VisualJS.func.legend) : a = function (e, a, t) { return "" !== a.get(t[O.id]) ? "" : N + (H - 1) }, i = function (e, a) { return p ? d.get(a[O.id]) : a[O.label] }); for (var V = 0, k = U.data, w = k.length; V < w; V++)(s = k[V]).hasOwnProperty("val") ? null !== s.val && (u.set(s.id, s.val), c.push(s.val)) : u.set(s.id, ""), p && d.set(s.id, s.label), y(l, s); c.sort(function (e, a) { return e - a }); var A = c[0], j = c[c.length - 1], L = !1, E = null, z = null, I = null, M = function (e, a, t) { "" !== e.properties[O.id] && "" !== e.properties[O.label] && (P || C || void 0 !== u.get(e.properties[O.id])) && re(ie(o, i(l, e.properties), u.get(e.properties[O.id])), a, t) }; if ("number" == typeof ae.range ? (t = d3.quantile(c, ae.range), n = d3.quantile(c, 1 - ae.range)) : (t = ae.range[0], n = ae.range[1]), "function" != typeof ae.click && (ae.click = function () { }), S.style("margin-left", h + "px"), S.style("margin-top", m + "px"), S.style("margin-bottom", m + "px"), S.append("g").attr("class", Q.areaclass).attr("transform", "scale(" + v + ")").selectAll("path").data(O.features).enter().append("svg:path").attr("class", function (e) { return "" === e.properties[O.id] || "" === e.properties[O.label] || !P && void 0 === u.get(e.properties[O.id]) ? N + "nohover" : a(l, u, e.properties, t, n) }).attr("tabindex", function () { return d3.select(this).classed(N + "nohover") ? "-1" : "0" }).attr("role", "presentation").attr("d", Y).on("mousemove", function (e) { M(e, event.pageX, event.pageY) }).on("mouseout", function () { return D.style("display", "none") }).on("mousedown", function () { L = !0 }).on("mouseup", function () { L = !1 }).on("focusout", function () { return D.style("display", "none") }).on("focusin", function (e, a) { var t = (new Date).getTime(), i = !0; L ? (ae.priv && ae.priv.click ? 500 < t - ae.priv.click ? (i = !0, ae.priv.click = t) : i = !1 : ae.priv = { click: t }, i && ae.click.apply(null, [{ id: e.properties[O.id], label: p ? void 0 !== d.get(e.properties[O.id]) ? d.get(e.properties[O.id]) : null : e.properties[O.label], position: { x: event.pageX, y: event.pageY }, group: C && void 0 !== l.get(e.properties[O.id]) ? { num: l.get(e.properties[O.id]), label: ae.grouped.label[l.get(e.properties[O.id]) - 1] } : null, value: P && void 0 !== u.get(e.properties[O.id]) ? u.get(e.properties[O.id]) : null }]), z = event.pageX, I = event.pageY) : (E = d3.select(this).node().getBoundingClientRect(), z = (E.left + E.right) / 2, I = (E.top + E.bottom) / 2), M(e, z, I) }).on("keyup", function (e) { if ("Enter" === event.key) { var a = d3.select(this).node().getBoundingClientRect(); ae.click.apply(null, [{ id: e.properties[O.id], label: p ? void 0 !== d.get(e.properties[O.id]) ? d.get(e.properties[O.id]) : null : e.properties[O.label], position: { x: a.left, y: a.top }, group: C && void 0 !== l.get(e.properties[O.id]) ? { num: l.get(e.properties[O.id]), label: ae.grouped.label[l.get(e.properties[O.id]) - 1] } : null, value: P && void 0 !== u.get(e.properties[O.id]) ? u.get(e.properties[O.id]) : null }]) } }), P || C) { var F = [ie(o, null, t), ie(o, null, n)], B = [R[R.length - 1], R[0]], T = [t < A || ne(t, o) === ne(A, o), j < n || ne(n, o) === ne(j, o)]; C ? ((P || void 0 === U.grouped.color) && (U.grouped.color = R), VisualJS.pub[VisualJS.id].legend = { color: U.grouped.color, text: U.grouped.label }, ae.legend && VisualJS.func.groupLegend(F, S, D, b, T, U, K, J)) : P && (F = [le(o, null, t), le(o, null, n)], VisualJS.pub[VisualJS.id].legend = { color: B, text: F, symbol: [T[0] ? "==" : "<=", T[1] ? "==" : ">="] }, ae.legend && VisualJS.func.legend(F, R, S, D, b, T, U.unit.label)) } VisualJS.pub[VisualJS.id].heading = $ } })() } } else { var E; V(Q.lib.jquery, !0) ? (E = !1, V(Q.lib.jquery.flot, !1)) : E = !V(Q.lib.jquery.flot, !0), s && V(Q.lib.excanvas, !0); var z, I, M, F, B, T, O, W = function () { }, q = [], C = [], P = [], H = U.stacked || !1, N = function () { if (ae.autoheading) { var e, a, t, i, l, n, r = U.time.length, s = U.data.length; if (null === U.data[0].val[0]) { for (i = !(a = 0), l = []; a < r; a++) { for (e = 0; e < s; e++)i = i && null === U.data[e].val[a]; if (!i) break; l.push(i) } for (n = l.length, t = 0; t < n; t++)if (l[t]) for (U.time.shift(), e = 0; e < s; e++)U.data[e].val.shift(); r = U.time.length } if (null === U.data[0].val[r - 1]) { for (a = r, i = !0, l = []; a--;) { for (e = 0, s = U.data.length; e < s; e++)i = i && null === U.data[e].val[a]; if (!i) break; l.push(i) } for (t = l.length; t--;)if (l[t]) for (U.time.pop(), e = 0; e < s; e++)U.data[e].val.pop() } } var c = function () { }; return H ? V(Q.lib.jquery.flot.stack, E) : "tsbar" === U.type && (V(Q.lib.jquery.flot.orderbars, E), c = function (e) { return e.bars }), W = function (e, a) { VisualJS.ticks = []; var t, i, l = a.length, n = e.length, r = ae.grid && ae.grid.bar && "number" == typeof ae.grid.bar ? ae.grid.bar : 2 <= l && 4 < n ? .18 : .2; for (t = 0, i = a.length; t < i; t++)C.push([t, a[t]]), VisualJS.ticks.push([t, a[t]]); for (t = 0, i = e.length; t < i; t++) { for (var s = [], o = e[t].val, u = o.length, d = 0; d < u; d++)s.push([d, o[d]]); "tsbar" !== U.type || H || 1 === i ? q.push({ label: e[t].label, data: s }) : q.push({ label: e[t].label, data: s, bars: { show: !0, barWidth: r, order: t + 1, lineWidth: 2 } }) } var p = q.length; for (t = 0; t < p; t++)P.push({ data: q[t].data, label: q[t].label, bars: c(q[t]), shadowSize: ae.grid.shadow }); z = 1 < p }, S() }; switch (Array.max = function (e) { return Math.max.apply(Math, e) }, U.type) { case "xy": V(Q.lib.jquery.flot.axisLabels, E), M = B = !(F = !0), O = S(), W = function (e, a, t) { var i = function (e) { var a, t = { label: e.label, data: [], by: Array.isArray(e.by) && "string" == typeof e.by[0] ? e.by : null }; if ("object" == typeof e.x && "object" == typeof e.y) for (Q.canvas.axis.labelsText = { x: e.x.label, y: e.y.label }, a = 0; a < e.x.val.length; a++)t.data.push([e.x.val[a], e.y.val[a]]); else e.val && 1 <= e.val.length && 2 == e.val[0].length && (Q.canvas.axis.labelsText = { x: e.x, y: e.y }, t.data = e.val); return t }; if (Array.isArray(e) && Array.isArray(e[0])) q = [e]; else if (Array.isArray(e) && "object" == typeof e[0] && !Array.isArray(e[0])) for (var l = 0; l < e.length; l++)q.push(i(e[l])) }, z = !0; break; case "pyram": V(Q.lib.jquery.flot.pyramid, E), B = F = !1, O = S(), W = function (e, a, t) { u = Math.max(Array.max(e[0].val), Array.max(e[1].val)), q[0] = { label: e[0].label, data: [], pyramid: { direction: "L" } }, q[1] = { label: e[1].label, data: [] }; for (var i = 0, l = t.length; i < l; i++)q[0].data[i] = [t[i], e[0].val[i]], q[1].data[i] = [t[i], e[1].val[i]] }, M = H = I = !(z = !0); break; case "rank": var R = []; B = !(F = M = !1), O = S(), I = z = !(W = function (e, a, t) { for (var i = [], l = 0, n = e.length; l < n; l++) { C[l] = [l, void 0 !== e[n - l - 1][0] ? e[n - l - 1][0] : t[n - l - 1]]; var r = void 0 !== e[n - l - 1][1] ? e[n - l - 1][1] : e[n - l - 1]; i.push(r), R[l] = [r, l] } q = { data: R }, u = Array.max(i) }); break; case "pie": V(Q.lib.jquery.flot.pie, E), B = F = M = !(T = !0), O = S(), W = function (e, a, t) { var i, l; if ("object" != typeof t || null === t) for (l = e.length, i = 0; i < l; i++)null !== e[i][1] && q.push({ label: e[i][0], data: e[i][1] }); else if ("number" == typeof e[0]) for (l = t.length, i = 0; i < l; i++)null !== e[i] && q.push({ label: t[i], data: e[i] }) }, z = !0; break; case "bar": V(Q.lib.jquery.flot.categories, E), B = !(F = !1), O = S(), I = z = !(M = !(W = function (e, a, t) { var i, l; if ("object" != typeof t || null === t) { for (l = e.length, i = 0; i < l; i++)null !== e[i][1] && q.push(["<span>" + e[i][0] + "</span>", e[i][1]]); q = [q] } else if (U.by && U.by.length && "object" == typeof U.data[0]) { for (C = [], q = [], i = 0; i < U.by.length; i++)q.push({ label: U.by[i], data: [] }); for (i = offset = 0; i < U.data.length; i++) { U.data[i].val.length % 2 == 0 ? C.push([offset + (U.data[i].val.length - 1) / 2, U.data[i].label]) : C.push([Math.floor(offset + U.data[i].val.length / 2), U.data[i].label]); for (var n = 0; n < U.data[i].val.length; n++)q[n].data.push([offset, U.data[i].val[n]]), offset++; offset += 2 } } else { if ("number" == typeof e[0]) for (l = t.length, i = 0; i < l; i++)null !== e[i] && q.push(["<span>" + t[i] + "</span>", e[i]]); q = [q] } })); break; case "tsline": O = N(), M = !(B = !(F = !(I = null))); break; case "tsbar": O = N(), M = !(B = !(F = !(I = !0))) }VisualJS.chart = function () { W(U.data, U.time, U.by), $.fn.UseTooltip = function (b) { var h = []; $(this).bind("plothover", function (e, a, t) { var i, l, n, r, s, o, u, d, p, c, y, f = {}, g = {}; if (t) { if (h != [t.seriesIndex, t.dataIndex]) if (h = [t.seriesIndex, t.dataIndex], "xy" === U.type) { for (var x in u = { x: void 0 !== VisualJS.container[b].unit.position.x && "start" === VisualJS.container[b].unit.position.x, y: void 0 !== VisualJS.container[b].unit.position.y && "start" === VisualJS.container[b].unit.position.y, z: void 0 !== VisualJS.container[b].unit.position.z && "start" === VisualJS.container[b].unit.position.z }) d = u[x], u.hasOwnProperty(x) && (p = VisualJS.container[b].unit.symbol && "string" == typeof VisualJS.container[b].unit.symbol[x] ? VisualJS.container[b].unit.symbol[x] : "", c = VisualJS.container[b].unit.label && "string" == typeof VisualJS.container[b].unit.label[x] ? VisualJS.container[b].unit.label[x] : "", d ? (f[x] = p, g[x] = c) : (f[x] = "", g[x] = " " + c + " " + p), g[x] = "" !== g[x] ? " " + g[x] : ""); o = "<div><strong>" + f.x + ne(t.datapoint[0], b, "x") + g.x + "</strong> " + (void 0 !== m.xaxis.axisLabel ? m.xaxis.axisLabel : "x") + "</div><div><strong>" + f.y + ne(t.datapoint[1], b, "y") + g.y + "</strong> " + (void 0 !== m.yaxis.axisLabel ? m.yaxis.axisLabel : "y") + "</div>", o += Array.isArray(q[t.seriesIndex].by) && "string" == typeof q[t.seriesIndex].by[t.dataIndex] && "" !== q[t.seriesIndex].by[t.dataIndex] ? q[t.seriesIndex].by[t.dataIndex] + ("string" == typeof q[t.seriesIndex].label && "" !== q[t.seriesIndex].label ? " (" + q[t.seriesIndex].label + ")" : "") : "", re(o, a.pageX, a.pageY) } else i = t.datapoint[0], l = t.datapoint[1], n = "bar" !== U.type || Boolean(U.data[0].val) ? t.series.label : 1 < q.length ? q[i][0] : q[0][i][0], r = "rank" !== U.type ? n : C[l][1], s = !!("rank" !== U.type && "pie" !== U.type && "bar" !== U.type || "bar" === U.type && Boolean(U.data[0].val)) && (H || 1 === q.length ? !!(Array.isArray(C) && 0 < C.length) && C[i][1] : "pyram" === U.type ? q[a.x < 0 ? 0 : 1].data[t.dataIndex][0] : C[t.dataIndex][1]), o = "pyram" === U.type ? Math.abs(i) : "rank" !== U.type ? "tsbar" !== U.type ? "pie" === U.type ? l[0][1] : l : H || 1 === q.length ? q[t.seriesIndex].data[i][1] : l : i, y = "bar" === U.type && U.by ? s ? s + (r ? VisualJS.container[b].tooltipseparator + r : "") : r || "" : s ? r ? r + VisualJS.container[b].tooltipseparator + s : s : r || "", re(ie(b, y, o), a.pageX, a.pageY) } else $("#" + Q.tooltipid).hide(), h = [] }) }; var m = { colors: Q.colors.series, series: { stack: I, bars: { show: B, barWidth: .7, align: "center", fill: .9 }, pie: { show: T, label: { show: !1 } }, lines: { show: M, lineWidth: ae.grid.line }, points: { show: F, radius: ae.grid.point, fill: .85, fillColor: null } }, legend: { show: ae.legend && z, position: K.position || "ne" }, grid: { borderWidth: ae.grid.border, hoverable: !0, clickable: !1, mouseActiveRadius: 10 }, xaxis: { show: ae.axis.x, axisLabel: void 0 !== p(Q.canvas.axis, ["labelsText", "x"]) ? Q.canvas.axis.labelsText.x : void 0, axisLabelUseCanvas: !0, axisLabelFontSizePixels: d = Number($("." + VisualJS.setup.clas).css("font-size").replace("px", "")), axisLabelFontFamily: $("." + VisualJS.setup.clas).css("font-family"), axisLabelPadding: d, axisLabelColour: "#545454", labelWidth: 28 }, yaxis: { show: ae.axis.y, axisLabel: void 0 !== p(Q.canvas.axis, ["labelsText", "y"]) ? Q.canvas.axis.labelsText.y : void 0, axisLabelUseCanvas: !0, axisLabelFontSizePixels: d, axisLabelFontFamily: $("." + VisualJS.setup.clas).css("font-family"), axisLabelPadding: d, axisLabelColour: "#545454" } }; (b = function () { var e, a, t = VisualJS.id, i = C.length, l = te(VisualJS.arr2html(U.footer, G) || ""); if ($(ee).html("<header><" + Z + ' id="ARIAtitle" style="overflow:auto;">' + O + "</" + Z + '></header><footer class="' + VisualJS.setup.footerclass + '" style="overflow:auto;">' + l + "</footer>"), VisualJS.getSize(t)) { switch (a = Q.typeclassprefix + U.type, $(ee + " header").after('<main class="' + Q.canvasclass + " " + a + " " + VisualJS.visualsize + '" style="width: ' + VisualJS.width + "px; height: " + VisualJS.height + 'px; display: block;"></main>'), m.xaxis.tickFormatter = function (e) { return k(e, t, "x") }, m.yaxis.tickFormatter = function (e) { return k(e, t, "y") }, m.xaxis.tickLength = U.axis.ticks.x ? null : 0, m.yaxis.tickLength = U.axis.ticks.y ? null : 0, m.grid.markings = U.grid.markings || null, U.type) { case "xy": U.range ? (U.range.x ? Array.isArray(U.range.x) ? (m.xaxis.min = U.range.x[0], m.xaxis.max = U.range.x[1]) : (m.xaxis.min = 0, m.xaxis.max = U.range.x) : (m.xaxis.min = null, m.xaxis.max = null), U.range.y ? Array.isArray(U.range.x) ? (m.yaxis.min = U.range.y[0], m.yaxis.max = U.range.y[1]) : (m.yaxis.min = 0, m.yaxis.max = U.range.y) : (m.yaxis.min = null, m.yaxis.max = null)) : (m.xaxis.min = null, m.yaxis.min = null, m.xaxis.max = null, m.yaxis.max = null), m.hooks = { drawBackground: function (e, a) { var t = e.getXAxes()[0]; void 0 !== t.ticks && 0 < t.ticks.length && (t.datamin = t.ticks[0].v, t.datamax = t.ticks[t.ticks.length - 1].v) } }, $.plot(h, q, m); break; case "pyram": m.series.pyramid = { show: !0, barWidth: 1 }, m.yaxis.show = 11 < VisualJS.height / q[0].data.length && ae.axis.y, m.xaxis.max = "number" == typeof ae.range ? u * ae.range : Array.isArray(ae.range) ? ae.range[1] : null, m.xaxis.tickFormatter = function (e) { return k(e, t, "x", ne) }, $.plot(h, q, m); break; case "rank": m.yaxis.tickLength = null, m.series.bars.horizontal = !0, m.yaxis.ticks = 11 < VisualJS.height / i ? C.slice(0) : 0, !1 === U.axis.labels.y && (m.yaxis.ticks = w(m.yaxis.ticks)), "number" == typeof ae.range ? m.xaxis.max = u * ae.range : Array.isArray(ae.range) && (m.xaxis.min = ae.range[0], m.xaxis.max = ae.range[1]), m.xaxis.tickFormatter = function (e) { return k(e, t, "x", ne) }, m.yaxis.autoscaleMargin = 0, m.series.bars.barWidth = .5, $.plot(h, [q], m); break; case "pie": $.plot(h, q, m); break; case "bar": m.xaxis.tickLength = 0, U.by && U.by.length && "object" == typeof U.data[0] ? (m.xaxis.ticks = C, !1 === U.axis.labels.x && (m.xaxis.ticks = w(m.xaxis.ticks)), m.bars = { show: !0 }) : (m.xaxis.mode = "categories", m.yaxis.tickFormatter = function (e) { return k(e, t, "y", ne) }), "number" != typeof ae.range && null !== ae.range ? (m.yaxis.min = ae.range[0], m.yaxis.max = ae.range[1]) : "number" == typeof ae.range && (m.yaxis.min = null, m.yaxis.max = ae.range), $.plot(h, q, m), !1 !== U.axis.labels.x && !1 !== U.axis.labels.y || (!(d = "<style>") === U.axis.labels.x && (d += h + " .flot-x-axis .flot-tick-label{display:none;}"), !1 === U.axis.labels.y && (d += h + " .flot-y-axis .flot-tick-label{display:none;}"), d += "</style>", $(h).append(d)); break; case "tsline": null === m.grid.markings && (m.grid.markings = [{ color: "#333333", lineWidth: 1, yaxis: { from: 0, to: 0 } }]); case "tsbar": "tsbar" === U.type && (m.xaxis.tickLength = 0), m.yaxis.tickFormatter = function (e) { return k(e, t, "y", ne) }; var n, r = VisualJS.width / i, s = [], o = "string" == typeof U.first && U.first ? U.first : 6 === VisualJS.ticks[0][1].length ? "01" : "1"; switch ("number" != typeof ae.range && null !== ae.range ? (m.yaxis.min = ae.range[0], m.yaxis.max = ae.range[1]) : "number" == typeof ae.range && (m.yaxis.min = null, m.yaxis.max = ae.range), VisualJS.ticks[0][1].length) { case 4: if (r < 33) { for (n = 16.5 < r ? 2 : 10.5 < r ? 3 : 9 < r ? 4 : 10, e = 0; e < i; e++)s[e] = e % n ? [C[e][0], ""] : [C[e][0], C[e][1]]; m.xaxis.ticks = s } else m.xaxis.ticks = C; !1 === U.axis.labels.x && (m.xaxis.ticks = w(m.xaxis.ticks)); break; case 5: case 6: if (r < 56) { for (r < 8.5 && 56 < i && $("main").addClass(Q.mini), e = 0; e < i; e++)s[e] = VisualJS.ticks[e][1].slice(4) !== o ? [VisualJS.ticks[e][0], ""] : [VisualJS.ticks[e][0], VisualJS.ticks[e][1].slice(0, 4)], C[e][1] = A(VisualJS.ticks[e][1], VisualJS.id); m.xaxis.ticks = s } else { for (e = 0; e < i; e++)C[e][1] = A(VisualJS.ticks[e][1], VisualJS.id); m.xaxis.ticks = C } !1 === U.axis.labels.x && (m.xaxis.ticks = w(m.xaxis.ticks)); break; case 7: if (r < 55) { for (n = 20 < r ? 2 : 10 < r ? 3 : 4, e = 0; e < i; e++)s[e] = e % n ? [C[e][0], ""] : [C[e][0], C[e][1]]; m.xaxis.ticks = s } else m.xaxis.ticks = C; !1 === U.axis.labels.x && (m.xaxis.ticks = w(m.xaxis.ticks)); break; default: m.xaxis.ticks = C, !1 === U.axis.labels.x && (m.xaxis.ticks = w(m.xaxis.ticks)) }$.plot(h, P, m) }v() && $(h).UseTooltip(VisualJS.id), VisualJS.pub[VisualJS.id].heading = O, $(h).find("canvas").attr("role", "img").attr("aria-labelledBy", "ARIAtitle") } })() } } VisualJS.scripts.length && "object" == typeof LazyLoad ? LazyLoad.js(VisualJS.scripts, J) : J() } }; if (Array.isArray || (Array.isArray = function (e) { return "[object Array]" === Object.prototype.toString.call(e) }), "function" != typeof visual) var visual = VisualJS.load;

/*
Copyright (c) 2023 Institut d'Estadistica de Catalunya (Idescat)
https://www.idescat.cat (https://github.com/idescat/visual)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
/*global VisualJS */
VisualJS.setup={ //v.1.2.0
	//Colors for maps and series
	colors: {
		map: {
			max: 100, //If not enough colors, legend is deceiving and it's better to remove it
			base: "#09111a"
		},
		series: ["#2b527b", "#a52a2a", "#008000", "#ffbf00", "#5959ff", "#ff5959", "#9acd32", "#af8d26"]
	},
	//Default options (They can be dynamically modified thru visual().)
	canvas: {
		unit : {
			label: "",
			symbol: "",
			position: "end"
		},
		legend: true,
		position: "ne", //legend position: "ne", "nw", "se" or "sw"
		grid: {
			border: 0, //grid border width
			shadow: 4, //line shadow width
			line: 2, //line width
			point: 1 //point radius
		},
		axis: { //show axes?
			x: true,
			y: true,
			ticks: {
				x: true,
				y: true
			},
			labels: {
				x: true,
				y: true
			}
		},
		dec: null, //Show only needed decimals (remove ending zeros) unless (recommended) valid dec has been specified by user
		autoheading: true,

		//Arrays are not accepted here. "bar", "tsline" and "tsbar" currently don't accept a number.
		range: {
			//Quantile. No filtering: 0
			cmap: 0.05, //Used in color assignation in maps

			//Multiplier. No filtering: 1
			rank: 1.02, //Increase area horizontally by 2% of the longest bar
			pyram: 1.02 //Increase area horizontally by 2% of the longest bar
		}
	},

	//Internationalization options
	i18n: {
		lang: "ca", //default lang when no lang is specified
		text: {
			dec: { //decimal separator
				ca: ",",
				es: ",",
				en: ".",
				fr: ","
			},
			k: { //thousands separator
				ca: ".",
				es: ".",
				en: ",",
				fr: " "
			},
			month: { //Month axis labels
				ca: ["Gen", "Feb", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Des"],
				es: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
				en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
				fr: ["Jan", "Fev", "Mar", "Avr", "Mai", "Jun", "Jul", "Aou", "Sep", "Oct", "Nov", "Dec"]
			},
			quarter: { //Quarter axis labels
				ca: ["I", "II", "III", "IV"],
				es: ["I", "II", "III", "IV"],
				en: ["Q1", "Q2", "Q3", "Q4"],
				fr: ["Q1", "Q2", "Q3", "Q4"]
			},
			na: { //text in tooltip when value is not available
				ca: "Valor no disponible",
				es: "Valor no disponible",
				en: "Value not available",
				fr: "Valeur non disponible"
			},
			oldbrowser: { //Warning message when IE<9 (maps)
				ca: "Per visualitzar el mapa cal un navegador m&eacute;s modern.",
				es: "Para visualizar el mapa es preciso un navegador m&aacute;s moderno.",
				en: "To view the map you must use a modern browser.",
				fr: "Veuillez utiliser un navigateur moderne pour visualiser la carte."
			},
			// v.1.1.0
			iframetitle: {
				ca: "Visualització de dades",
				es: "Visualización de datos",
				en: "Data visualization",
				fr: "Visualisation de données"
			}
		},
		// v.1.1.0
		template: "{{period}} {{year}}" //Template for time literals (object or string)
		 /* same as
			{
				aaaamm: {
					ca: "{{period}} {{year}}",
					es: "{{period}} {{year}}",
					en: "{{period}} {{year}}",
					fr: "{{period}} {{year}}"
				},
				aaaaq: {
					ca: "{{period}} {{year}}",
					es: "{{period}} {{year}}",
					en: "{{period}} {{year}}",
					fr: "{{period}} {{year}}"
				}
			}
		*/
	},

	//String used in the tooltip between the elements in the second line v.1.1
	tooltipseparator: " / ",

	//Classes and ids of elements created by visual
	id: "visual", //id to style the container
	clas: "visual", //class to style the container
	compareids: ["VisualJSleft", "VisualJSright"], //ids to style each VisualJS.compare containers
	tooltipid: "VisualJSTooltip", //id to style the tooltip
	nowrapclass: "VisualJSnw", //class to define blocks of wrappable content in the title
	canvasclass: "VisualJScanvas", //canvas container (Flot)
	areaclass: "VisualJSarea", //svg:g class (D3 maps)
	legendclass: "VisualJSlegend", //svg:g class (D3 maps)
	footerclass: "VisualJSfooter", //Footer class of the container
	normal: "VisualJSnormal", //Normal size class
	mini: "VisualJSmini", //Small size class
	colorclassprefix: "c", //Prefix for color class in maps: cnohover, c0, c1, c2...
	typeclassprefix : "VisualJS", //Meaning a chart of type "tsbar" will have class VisualJStsbar v.1.1.0

	//Markup created by visual
	html: {
		heading: "h1"
	},

	//Libraries: path and existence function
	main: { //Do not use relative paths for main files in production: they'll be relative to the path where VisualJS.iframe is executed.
		visual: "https://visual.js.org/visual.js",
		setup: "https://visual.js.org/visual.setup.js",
		lazy: "https://visual.js.org/lib/lazyload.js"
	},
	lib: {
		d3: {
			js: "https://visual.js.org/lib/d3.v3.js",
			exists: function(){ return typeof d3==="object"; }
		},
		jquery: {
			js: "https://visual.js.org/lib/jquery.1.8.3.js",
			exists: function(){ return typeof jQuery==="function"; },

			flot: {
				js: "https://visual.js.org/lib/jquery.flot.js",
				exists: function(){ return typeof jQuery.plot==="function"; },

				stack: {
					js: "https://visual.js.org/lib/jquery.flot.stack.js",
					exists: function(){ return typeof jQuery.plot.plugins==="object" && jQuery.plot.plugins.some(function(plugin){ return typeof plugin==="object" && plugin.name==="stack";}); }
				},
				orderbars: {
					js: "https://visual.js.org/lib/jquery.flot.orderbars.js",
					exists: function(){ return typeof jQuery.plot.plugins==="object" && jQuery.plot.plugins.some(function(plugin){ return typeof plugin==="object" && plugin.name==="orderBars";}); }
				},
				pyramid: {
					js: "https://visual.js.org/lib/jquery.flot.pyramid.js",
					exists: function(){ return typeof FlotPyramid==="object"; }
				},
				categories: {
					js: "https://visual.js.org/lib/jquery.flot.categories.js",
					exists: function(){ return typeof jQuery.plot.plugins==="object" && jQuery.plot.plugins.some(function(plugin){ return typeof plugin==="object" && plugin.name==="categories";}); }
				},
				pie: {
					js: "https://visual.js.org/lib/jquery.flot.pie.js",
					exists: function(){ return typeof jQuery.plot.plugins==="object" && jQuery.plot.plugins.some(function(plugin){ return typeof plugin==="object" && plugin.name==="pie";}); }
				},
				axisLabels: {
					js: "https://visual.js.org/lib/jquery.flot.axislabels.js",
					exists: function(){ return typeof jQuery.plot.plugins==="object" && typeof jQuery.plot.plugins[0]==="object" && jQuery.plot.plugins.map(function(e){return e.name}).indexOf("axisLabels") !== -1 ; }
				},
			}
		},
		maps: {
			js: "https://visual.js.org/maps/visual.maps.js",
			exists: function(){ return typeof VisualJS.func.colors==="function" && typeof VisualJS.func.legend==="function";}
		},
		excanvas: {
			js: "https://visual.js.org/lib/excanvas.js",
			exists: function(){ return typeof G_vmlCanvasManager!=="undefined"; }
		}
	},

	//Maps: path and existence function
	map: {
		eu28: {
			label: "European Union: 28 countries (2013-2020)",
			js: "https://visual.js.org/maps/eu28.js",
			exists: function(){ return typeof VisualJS.map.eu28!=="undefined"; }
		},
		eu27: {
			label: "European Union: 27 countries (from 2021)",
			js: "https://visual.js.org/maps/eu272021.js",
			exists: function () {
				return typeof VisualJS.map.eu27 !== "undefined";
			}
		},
		usastates: {
			label: "USA: states",
			js: "https://visual.js.org/maps/usa2013states.js",
			exists: function(){ return typeof VisualJS.map.usastates!=="undefined"; }
		},
		norwaymun: {
			label: "Norway: municipalities",
			js: "https://visual.js.org/maps/norway2013mun.js",
			exists: function(){ return typeof VisualJS.map.norwaymun!=="undefined"; }
		},
		spainnuts2: {
			label: "Spain: NUTS 2",
			js: "https://visual.js.org/maps/spain2014nuts2.js",
			exists: function(){ return typeof VisualJS.map.spainnuts2!=="undefined"; }
		},
		spainnuts3: {
			label: "Spain: NUTS 3",
			js: "https://visual.js.org/maps/spain2014nuts3.js",
			exists: function(){ return typeof VisualJS.map.spainnuts3!=="undefined"; }
		},
		prov: {
			label: "Catalonia: NUTS 3",
			js: "https://visual.js.org/maps/cat2013prov.js",
			exists: function(){ return typeof VisualJS.map.prov!=="undefined"; }
		},
		com2023: {
			label: "Catalonia: counties",
			js: "https://visual.js.org/maps/cat2023com.js",
			exists: function () { return typeof VisualJS.map.com2023 !== "undefined"; }
		},
		com2015: {
			label: "Catalonia: counties (between 2015 and 2023)",
			js: "https://visual.js.org/maps/cat2015com.js",
			exists: function(){ return typeof VisualJS.map.com2015!=="undefined"; }
		},
		com: {
			label: "Catalonia: counties (before 2015)",
			js: "https://visual.js.org/maps/cat2013com.js",
			exists: function(){ return typeof VisualJS.map.com!=="undefined"; }
		},
		mun: {
			label: "Catalonia: municipalities",
			js: "https://visual.js.org/maps/cat2013mun.js",
			exists: function(){ return typeof VisualJS.map.mun!=="undefined"; }
		},
		prov08: {
			label: "Catalonia. Province of Barcelona: municipalities",
			js: "https://visual.js.org/maps/prov082013mun.js",
			exists: function(){ return typeof VisualJS.map.prov08!=="undefined"; }
		},
		prov17: {
			label: "Catalonia. Province of Girona: municipalities",
			js: "https://visual.js.org/maps/prov172013mun.js",
			exists: function(){ return typeof VisualJS.map.prov17!=="undefined"; }
		},
		prov25: {
			label: "Catalonia. Province of Lleida: municipalities",
			js: "https://visual.js.org/maps/prov252013mun.js",
			exists: function(){ return typeof VisualJS.map.prov25!=="undefined"; }
		},
		prov43: {
			label: "Catalonia. Province of Tarragona: municipalities",
			js: "https://visual.js.org/maps/prov432013mun.js",
			exists: function(){ return typeof VisualJS.map.prov43!=="undefined"; }
		},
		com01: {
			label: "Catalonia. L'Alt Camp: municipalities",
			js: "https://visual.js.org/maps/com012013mun.js",
			exists: function(){ return typeof VisualJS.map.com01!=="undefined"; }
		},
		com02: {
			label: "Catalonia. L'Alt Empordà: municipalities",
			js: "https://visual.js.org/maps/com022013mun.js",
			exists: function(){ return typeof VisualJS.map.com02!=="undefined"; }
		},
		com03: {
			label: "Catalonia. L'Alt Penedès: municipalities",
			js: "https://visual.js.org/maps/com032013mun.js",
			exists: function(){ return typeof VisualJS.map.com03!=="undefined"; }
		},
		com04: {
			label: "Catalonia. L'Alt Urgell: municipalities",
			js: "https://visual.js.org/maps/com042013mun.js",
			exists: function(){ return typeof VisualJS.map.com04!=="undefined"; }
		},
		com05: {
			label: "Catalonia. L'Alta Ribagorça: municipalities",
			js: "https://visual.js.org/maps/com052013mun.js",
			exists: function(){ return typeof VisualJS.map.com05!=="undefined"; }
		},
		com06: {
			label: "Catalonia. L'Anoia: municipalities",
			js: "https://visual.js.org/maps/com062013mun.js",
			exists: function(){ return typeof VisualJS.map.com06!=="undefined"; }
		},
		com072015: {
			label: "Catalonia. El Bages: municipalities",
			js: "https://visual.js.org/maps/com072015mun.js",
			exists: function(){ return typeof VisualJS.map.com072015!=="undefined"; }
		},
		com07: {
			label: "Catalonia. El Bages: municipalities (before 2015)",
			js: "https://visual.js.org/maps/com072013mun.js",
			exists: function(){ return typeof VisualJS.map.com07!=="undefined"; }
		},
		com08: {
			label: "Catalonia. El Baix Camp: municipalities",
			js: "https://visual.js.org/maps/com082013mun.js",
			exists: function(){ return typeof VisualJS.map.com08!=="undefined"; }
		},
		com09: {
			label: "Catalonia. El Baix Ebre: municipalities",
			js: "https://visual.js.org/maps/com092013mun.js",
			exists: function(){ return typeof VisualJS.map.com09!=="undefined"; }
		},
		com10: {
			label: "Catalonia. El Baix Empordà: municipalities",
			js: "https://visual.js.org/maps/com102013mun.js",
			exists: function(){ return typeof VisualJS.map.com10!=="undefined"; }
		},
		com11: {
			label: "Catalonia. El Baix Llobregat: municipalities",
			js: "https://visual.js.org/maps/com112013mun.js",
			exists: function(){ return typeof VisualJS.map.com11!=="undefined"; }
		},
		com12: {
			label: "Catalonia. El Baix Penedès: municipalities",
			js: "https://visual.js.org/maps/com122013mun.js",
			exists: function(){ return typeof VisualJS.map.com12!=="undefined"; }
		},
		com13: {
			label: "Catalonia. El Barcelonès: municipalities",
			js: "https://visual.js.org/maps/com132013mun.js",
			exists: function(){ return typeof VisualJS.map.com13!=="undefined"; }
		},
		com14: {
			label: "Catalonia. El Berguedà: municipalities",
			js: "https://visual.js.org/maps/com142013mun.js",
			exists: function(){ return typeof VisualJS.map.com14!=="undefined"; }
		},
		com15: {
			label: "Catalonia. La Cerdanya: municipalities",
			js: "https://visual.js.org/maps/com152013mun.js",
			exists: function(){ return typeof VisualJS.map.com15!=="undefined"; }
		},
		com16: {
			label: "Catalonia. La Conca de Barberà: municipalities",
			js: "https://visual.js.org/maps/com162013mun.js",
			exists: function(){ return typeof VisualJS.map.com16!=="undefined"; }
		},
		com17: {
			label: "Catalonia. El Garraf: municipalities",
			js: "https://visual.js.org/maps/com172013mun.js",
			exists: function(){ return typeof VisualJS.map.com17!=="undefined"; }
		},
		com18: {
			label: "Catalonia. Les Garrigues: municipalities",
			js: "https://visual.js.org/maps/com182013mun.js",
			exists: function(){ return typeof VisualJS.map.com18!=="undefined"; }
		},
		com19: {
			label: "Catalonia. La Garrotxa: municipalities",
			js: "https://visual.js.org/maps/com192013mun.js",
			exists: function(){ return typeof VisualJS.map.com19!=="undefined"; }
		},
		com20: {
			label: "Catalonia. El Gironès: municipalities",
			js: "https://visual.js.org/maps/com202013mun.js",
			exists: function(){ return typeof VisualJS.map.com20!=="undefined"; }
		},
		com21: {
			label: "Catalonia. El Maresme: municipalities",
			js: "https://visual.js.org/maps/com212013mun.js",
			exists: function(){ return typeof VisualJS.map.com21!=="undefined"; }
		},
		com22: {
			label: "Catalonia. El Montsià: municipalities",
			js: "https://visual.js.org/maps/com222013mun.js",
			exists: function(){ return typeof VisualJS.map.com22!=="undefined"; }
		},
		com23: {
			label: "Catalonia. La Noguera: municipalities",
			js: "https://visual.js.org/maps/com232013mun.js",
			exists: function(){ return typeof VisualJS.map.com23!=="undefined"; }
		},
		com242023: {
			label: "Catalonia. Osona: municipalities",
			js: "https://visual.js.org/maps/com242023mun.js",
			exists: function () { return typeof VisualJS.map.com242023 !== "undefined"; }
		},
		com242015: {
			label: "Catalonia. Osona: municipalities (between 2015 and 2023)",
			js: "https://visual.js.org/maps/com242015mun.js",
			exists: function(){ return typeof VisualJS.map.com242015!=="undefined"; }
		},
		com24: {
			label: "Catalonia. Osona: municipalities (before 2015)",
			js: "https://visual.js.org/maps/com242013mun.js",
			exists: function(){ return typeof VisualJS.map.com24!=="undefined"; }
		},
		com25: {
			label: "Catalonia. El Pallars Jussà: municipalities",
			js: "https://visual.js.org/maps/com252013mun.js",
			exists: function(){ return typeof VisualJS.map.com25!=="undefined"; }
		},
		com26: {
			label: "Catalonia. El Pallars Sobirà: municipalities",
			js: "https://visual.js.org/maps/com262013mun.js",
			exists: function(){ return typeof VisualJS.map.com26!=="undefined"; }
		},
		com27: {
			label: "Catalonia. El Pla d'Urgell: municipalities",
			js: "https://visual.js.org/maps/com272013mun.js",
			exists: function(){ return typeof VisualJS.map.com27!=="undefined"; }
		},
		com28: {
			label: "Catalonia. El Pla de l'Estany: municipalities",
			js: "https://visual.js.org/maps/com282013mun.js",
			exists: function(){ return typeof VisualJS.map.com28!=="undefined"; }
		},
		com29: {
			label: "Catalonia. El Priorat: municipalities",
			js: "https://visual.js.org/maps/com292013mun.js",
			exists: function(){ return typeof VisualJS.map.com29!=="undefined"; }
		},
		com30: {
			label: "Catalonia. La Ribera d'Ebre: municipalities",
			js: "https://visual.js.org/maps/com302013mun.js",
			exists: function(){ return typeof VisualJS.map.com30!=="undefined"; }
		},
		com31: {
			label: "Catalonia. El Ripollès: municipalities",
			js: "https://visual.js.org/maps/com312013mun.js",
			exists: function(){ return typeof VisualJS.map.com31!=="undefined"; }
		},
		com322023: {
			label: "Catalonia. La Segarra: municipalities",
			js: "https://visual.js.org/maps/com322023mun.js",
			exists: function(){ return typeof VisualJS.map.com322023!=="undefined"; }
		},
		com32: {
			label: "Catalonia. La Segarra: municipalities (before 2023)",
			js: "https://visual.js.org/maps/com322013mun.js",
			exists: function(){ return typeof VisualJS.map.com32!=="undefined"; }
		},
		com33: {
			label: "Catalonia. El Segrià: municipalities",
			js: "https://visual.js.org/maps/com332013mun.js",
			exists: function(){ return typeof VisualJS.map.com33!=="undefined"; }
		},
		com34: {
			label: "Catalonia. La Selva: municipalities",
			js: "https://visual.js.org/maps/com342013mun.js",
			exists: function(){ return typeof VisualJS.map.com34!=="undefined"; }
		},
		com352023: {
			label: "Catalonia. El Solsonès: municipalities",
			js: "https://visual.js.org/maps/com352023mun.js",
			exists: function(){ return typeof VisualJS.map.com352023!=="undefined"; }
		},
		com35: {
			label: "Catalonia. El Solsonès: municipalities (before 2023)",
			js: "https://visual.js.org/maps/com352013mun.js",
			exists: function(){ return typeof VisualJS.map.com35!=="undefined"; }
		},
		com36: {
			label: "Catalonia. El Tarragonès: municipalities",
			js: "https://visual.js.org/maps/com362013mun.js",
			exists: function(){ return typeof VisualJS.map.com36!=="undefined"; }
		},
		com37: {
			label: "Catalonia. La Terra Alta: municipalities",
			js: "https://visual.js.org/maps/com372013mun.js",
			exists: function(){ return typeof VisualJS.map.com37!=="undefined"; }
		},
		com38: {
			label: "Catalonia. L'Urgell: municipalities",
			js: "https://visual.js.org/maps/com382013mun.js",
			exists: function(){ return typeof VisualJS.map.com38!=="undefined"; }
		},
		com39: {
			label: "Catalonia. La Val d'Aran: municipalities",
			js: "https://visual.js.org/maps/com392013mun.js",
			exists: function(){ return typeof VisualJS.map.com39!=="undefined"; }
		},
		com40: {
			label: "Catalonia. El Vallès Occidental: municipalities",
			js: "https://visual.js.org/maps/com402013mun.js",
			exists: function(){ return typeof VisualJS.map.com40!=="undefined"; }
		},
		com412015: {
			label: "Catalonia. El Vallès Oriental: municipalities",
			js: "https://visual.js.org/maps/com412015mun.js",
			exists: function(){ return typeof VisualJS.map.com412015!=="undefined"; }
		},
		com41: {
			label: "Catalonia. El Vallès Oriental: municipalities (before 2015)",
			js: "https://visual.js.org/maps/com412013mun.js",
			exists: function(){ return typeof VisualJS.map.com41!=="undefined"; }
		},
		com422015: {
			label: "Catalonia. El Moianès: municipalities",
			js: "https://visual.js.org/maps/com422015mun.js",
			exists: function(){ return typeof VisualJS.map.com422015!=="undefined"; }
		},
		com432023: {
			label: "Catalonia. El Lluçanès: municipalities",
			js: "https://visual.js.org/maps/com432023mun.js",
			exists: function () { return typeof VisualJS.map.com432023 !== "undefined"; }
		},
		at: {
			label: "Catalonia. Regions of the Territorial Plan (before 2023)",
			js: "https://visual.js.org/maps/cat2014at.js",
			exists: function(){ return typeof VisualJS.map.at!=="undefined"; }
		},
		at2023: {
			label: "Catalonia. Regions of the Territorial Plan",
			js: "https://visual.js.org/maps/cat2023at.js",
			exists: function(){ return typeof VisualJS.map.at!=="undefined"; }
		}
	},

	//IE check
	func: {
		old: function(ie) { return RegExp("(^|\\s)lt-"+ie+"(\\s|$)").test(document.documentElement.className); }
	},

	//Attach event listener? 0.10.*
	listen: false,

	//Margins and paddings used in container
	margin: 10,
	padding: {
		w: 30,
		h: 45
	},
	//VisualJS.compare separator width
	separator: 0
};