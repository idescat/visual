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
Copyright (c) 2025 Institut d'Estadistica de Catalunya (Idescat)
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
let VisualJS={version:"1.4",show:!0,old:!1,fixed:null,width:500,bwidth:500,height:500,normal:500,scripts:[],map:{},container:{},pub:{},func:{},callback:null,getSize:function(e){function t(e,t){return("function"==typeof getComputedStyle?getComputedStyle(e):e.currentStyle)[t]}function a(e){return(e=o(e))[0]instanceof Element?e[0]:e[0]&&e[0][0]?e[0][0]:void 0}function i(e){return e?e.offsetHeight+Math.round(parseFloat(t(e,"marginTop"))+parseFloat(t(e,"marginBottom"))):0}let l=VisualJS.setup,r=l.html,s=r.heading,n="."+VisualJS.setup.footerclass,o="undefined"!=typeof jQuery?jQuery:"undefined"!=typeof d3?d3.select:document.querySelectorAll.bind(document),u=window,d=document,p=d.documentElement,c=d.getElementsByTagName("body")[0],y=d.getElementById(e),f=VisualJS.container[VisualJS.id].hasOwnProperty("header")&&!VisualJS.container[VisualJS.id].header?0:i(a(s)),g=i(a(n)),x=u.innerHeight||p.clientHeight||c.clientHeight,h=Math.round(parseFloat(t(y,"marginTop"))+parseFloat(t(y,"marginBottom")));return void 0!==x&&void 0!==f&&void 0!==g&&(null===VisualJS.fixed?(VisualJS.bwidth=u.innerWidth||p.clientWidth||c.clientWidth,VisualJS.width=VisualJS.bwidth-l.padding.w,VisualJS.height=Math.floor(x-f-g-h-10)):(VisualJS.bwidth=p.clientWidth||c.clientWidth,VisualJS.width=VisualJS.fixed[0]-l.padding.w,VisualJS.height=Math.floor(VisualJS.fixed[1]-f-g-h-10))),VisualJS.visualsize=VisualJS.width<VisualJS.normal?l.mini:l.normal,10<VisualJS.width&&10<VisualJS.height},arr2html:function(e){let t="";return void 0!==e&&(Array.isArray(e)?e.forEach(function(e){"string"==typeof e&&""!==e&&(t+=`<p>${e}</p>`)}):"string"==typeof e&&""!==e&&(t+=`<p>${e}</p>`)),t},iframe:function(t,a){let e=VisualJS.setup,i=("string"==typeof t.clas?t:e).clas,l='<!DOCTYPE html>\n\x3c!--[if lt IE 7]><html class="lt-ie9 lt-ie8 lt-ie7"> <![endif]--\x3e\n\x3c!--[if IE 7]><html class="lt-ie9 lt-ie8"> <![endif]--\x3e\n\x3c!--[if IE 8]><html class="lt-ie9"> <![endif]--\x3e\n\x3c!--[if gt IE 8]>\x3c!--\x3e <html> \x3c!--<![endif]--\x3e\n<head>';"string"==typeof a&&(-1===a.indexOf("{")?l+=`<link href="${a}" rel="stylesheet" type="text/css"/>`:l+=`<style type="text/css">'${a}'</style>`),l=(l=(l=(l+=`<script type="text/javascript" src="${VisualJS.setup.main.visual}"></script>`)+`<script type="text/javascript" src="${VisualJS.setup.main.setup}"></script>`)+`<script type="text/javascript" src="${VisualJS.setup.main.lazy}"></script>`)+`</head><body><div id="${t.id}" class="${i}"></div><script>window.setTimeout(function(){visual(${JSON.stringify(t)});},1);</script></body></html>`,a=document,r=a.createElement("iframe"),a=a.getElementById(t.id),r.setAttribute("title",t.title?VisualJS.setup.i18n.text.iframetitle[t.lang]+": "+t.title:VisualJS.setup.i18n.text.iframetitle[t.lang]),r.setAttribute("aria-hidden","true"),r.setAttribute("role","widget"),r.border="none",r.overflow="hidden",a.parentNode.insertBefore(r,a.nextSibling);var r,t=r,a=l;if(void 0!==t){let e;t.contentDocument?e=t.contentDocument:t.contentWindow?e=t.contentWindow.document:window.frames[t.name]&&(e=window.frames[t.name].document),e&&(e.open(),e.write(a),e.close())}},compare:function(a){function e(){var e,t;VisualJS.getSize(r)&&(e=VisualJS.height+("string"==typeof a.footer&&""!==a.footer?14:0),t=VisualJS.width+i.margin,t=`iframe{ float: left; width: ${Math.floor((t-l)/2-i.margin)}px; height:${e}px; }`,y.innerHTML=t,c.style.height=e+"px")}let i=VisualJS.setup,l=VisualJS.setup.separator,r=("string"==typeof a.id?a:i).id,t=Array.isArray(a.css)?0===a.css.length?["",""]:1===a.css.length?[a.css[0],a.css[0]]:a.css:[a.css,a.css],s=document,n=s.createElement(i.html.heading),o="string"==typeof a.title?a.title:"",u=s.createElement("p"),d="string"==typeof a.footer?VisualJS.arr2html(a.footer):"",p=s.getElementById(r),c=s.createElement("div"),y=s.createElement("style"),f;n.innerHTML=o,n.style.overflow="auto",u.innerHTML=d,u.style.overflow="auto",u.style.clear="both",p.appendChild(n),p.appendChild(u),s.getElementsByTagName("head")[0].appendChild(y),c.style.width=l+"px",c.style.cssFloat="left";for(let e=0;e<2;e++)f=s.createElement("span"),"string"!=typeof a.load[e].id&&(a.load[e].id=i.compareids[e]),f.id=a.load[e].id,p.insertBefore(f,u),VisualJS.iframe(a.load[e],t[e]);p.insertBefore(c,f),e(),VisualJS.fixed||(window.addEventListener?window.addEventListener("resize",e,!1):window.onresize=e)},load:function(a){function e(t){let e;function a(e){t.source.postMessage(JSON.stringify(e),"*")}if("string"==typeof t.data?e=JSON.parse(t.data):"object"==typeof t.data&&(e=t.data),e)if(void 0===e.action)a({type:"error",data:[{id:"400",label:'"action" is required.'}]});else if("send"===e.action){var i=e.id||VisualJS.id,i=VisualJS.container[i];if(i){if("cmap"===i.type&&!i.data[0].hasOwnProperty("label")){var l=[];for(let e=VisualJS.map[i.by],t=e.features.length;t--;)l[e.features[t].properties[e.id]]=e.features[t].properties[e.label];for(let e=i.data,t=e.length;t--;)e[t].label=l[e[t].id]}a(i)}else a({type:"error",data:[{id:"404",label:'A visualisation with the specified "id" was not found'}]})}else a({type:"error",data:[{id:"400",label:'"action" value is not correct.'}]})}if(void 0===VisualJS.setup&&window.alert("Visual: Setup not found (visual.setup.js)!"),"[object Array]"!==Object.prototype.toString.call(a))VisualJS.get(a);else for(let e=0,t=a.length;e<t;e++)VisualJS.get(a[e]);VisualJS.container[VisualJS.id].listen&&window.addEventListener&&window.addEventListener("message",e,{once:!0})},get:function(R){function t(e,a,i){if("string"==typeof e)a.match(typeof R[e])||(R[e]=i[e]);else if(!a.match(typeof s(R,e))){a=R;var l=e;i=s(i,e);let t=a;for(let e=0;e<=l.length-2;e++)void 0===t[l[e]]&&(t[l[e]]={}),t=t[l[e]];t[l[l.length-1]]=i}}function s(e,t){let a=e;for(let e=0;e<t.length;e++){if(void 0===a[t[e]]){a=void 0;break}a=a[t[e]]}return a}let X=VisualJS.setup,e=X.html,Y=X.canvas,n=e.heading,U="."+VisualJS.setup.footerclass,o=function(e){return"object"==typeof e&&null!==e},a=[["show","boolean",VisualJS],["callback","function",VisualJS],["id","string",X],["listen","boolean",X],["dec","number|object",Y],["autoheading","boolean",Y],["header","boolean",Y],["legend","boolean",Y],["grid","object",Y],[["grid","border"],"number",Y],[["grid","shadow"],"number",Y],[["grid","line"],"number",Y],[["grid","point"],"number",Y],[["grid","markings"],"object",Y],["axis","object",Y],[["axis","x"],"boolean",Y],[["axis","y"],"boolean",Y],[["axis","labels","x"],"boolean",Y],[["axis","labels","y"],"boolean",Y],[["axis","labels","in"],"boolean",Y],[["axis","ticks","x"],"boolean",Y],[["axis","ticks","y"],"boolean",Y]];void 0===Y.axis.labels&&(Y.axis.labels={x:!0,y:!0}),void 0===Y.axis.ticks&&(Y.axis.ticks={x:!0,y:!0});for(let e=0;e<a.length;e++)t(a[e][0],a[e][1],a[e][2]);var i;VisualJS.scripts=[],VisualJS.id=R.id,VisualJS.pub[VisualJS.id]={heading:null,legend:null},"object"==typeof R.fixed&&(VisualJS.fixed=R.fixed),"object"==typeof R.unit&&null!==R.unit?(t(["unit","label"],"string|object",Y),t(["unit","symbol"],"string|object",Y),t(["unit","position"],"string|object",Y)):R.unit=Y.unit,R.range=(e=>{var a=(()=>{let e="invalid";return Array.isArray(R.data)&&(Array.isArray(R.data[0])?e="array":o(R.data[0])&&(e=o(R.data[0].z)?"xyz":o(R.data[0].y)?"xy":void 0!==R.data[0].x||void 0!==R.data[0].y||!Array.isArray(R.data[0].val)||null===R.data[0].val[0]||2!=R.data[0].val[0].length&&3!=R.data[0].val[0].length?"object":"points")),e})();if("object"!=typeof e||null===e||Array.isArray(e)||"array"!==a&&"object"!==a||("rank"===R.type||"pyram"===R.type?e=e.x:"xy"!==R.type&&(e=e.y)),Array.isArray(e)&&2===e.length&&null===e[0]&&null===e[1])R.data&&"object"===a&&(0<=(i=(()=>{if(!R.data||0===R.data.length)return[void 0,void 0];let t=R.data[0].val[0],a=R.data[0].val[0];return R.data.forEach(e=>{e.val.forEach(e=>{t=e<t?e:t,a=e>a?e:a})}),[t,a]})())[0]&&0<=i[1]?e=[0,null]:i[0]<=0&&i[1]<=0&&(e=[null,0]));else if("object"==typeof e&&!Array.isArray(e)&&null!==e&&(Array.isArray(e.x)&&null===e.x[0]&&null===e.x[1]||Array.isArray(e.y)&&null===e.y[0]&&null===e.y[1])){let t={x:[],y:[]};"points"===a?R.data.forEach(function(e){e.val.forEach(function(e){t.x.push(e[0]),t.y.push(e[1])})}):"xy"!==a&&"xyz"!==a||R.data.forEach(function(e){t.x=t.x.concat(e.x.val),t.y=t.y.concat(e.y.val)});var i=function(e,t,a,i){Array.isArray(e[t])&&null===e[t][0]&&null===e[t][1]&&(0<=a[t]&&0<=i[t]?e[t]=[0,null]:a[t]<=0&&i[t]<=0?e[t]=[null,0]:e[t]=[null,null])},l={x:Math.min(...t.x),y:Math.min(...t.y)},r={x:Math.max(...t.x),y:Math.max(...t.y)};i(e,"x",l,r),i(e,"y",l,r)}else"xy"!==a&&"xyz"!==a&&"points"!==a||("number"==typeof e||Array.isArray(e)?e={x:[null,null],y:Array.isArray(e)?e:[null,e]}:"object"==typeof e&&null!==e||(e={x:[null,null],y:[null,null]}));return e})(R.range),R.lang=R.lang||X.i18n.lang,"number"==typeof R.range||void 0!==(i=R.range)&&Array.isArray(i)&&2===i.length&&"number"==typeof i[0]&&"number"==typeof i[1]&&i[0]<i[1]||"object"==typeof R.range&&null!==R.range&&!Array.isArray(R.range)||(R.range="number"==typeof R.range||Array.isArray(R.range)&&2===R.range.length?R.range:Y.range.hasOwnProperty(R.type)&&"number"==typeof Y.range[R.type]?Y.range[R.type]:null),R.unit=(e=>{var t,a;if("xy"!==R.type)for(var i in e)e.hasOwnProperty(i)&&(i=i,t="rank"===R.type||"pyram"===R.type?"x":"y",a=void 0,(a=e[i])&&void 0!==a[t]?e[i]=a[t]:e[i]="string"==typeof a?a:"");return e})(R.unit),R.tooltipseparator=X.tooltipseparator&&"string"==typeof X.tooltipseparator?X.tooltipseparator:" / ",VisualJS.container[VisualJS.id]=R;function y(){return!1!==K.tooltip}function f(){if(!1===K.autoheading)return K.title||"";let a=[],e;function t(e,t){"string"==typeof e&&""!==e&&(!0===t&&(e='<span class="'+VisualJS.setup.nowrapclass+'">'+e+"</span>"),a.push(e))}return e=null!==K.time&&"object"==typeof K.time?V(K.time[0],VisualJS.id)+"&ndash;"+V(K.time[K.time.length-1],VisualJS.id):V(K.time,VisualJS.id),t(K.title,!1),t(K.geo,!0),t(e,!0),g(a.join(". "))}function l(){let e=!1;var t,a;"function"==typeof VisualJS.chart&&(y()&&!(a=document).getElementById(VisualJS.setup.tooltipid)&&((t=a.createElement("div")).setAttribute("role","tooltip"),t.id=VisualJS.setup.tooltipid,t.style.display="none",a.body.appendChild(t)),K.show&&VisualJS.chart(),VisualJS.fixed||(window.addEventListener?window.addEventListener("resize",A,!1):window.onresize=A),e=!0),null!==K.callback&&K.callback.call({id:VisualJS.id,chart:e,heading:VisualJS.pub[VisualJS.id].heading,legend:VisualJS.pub[VisualJS.id].legend})}function g(e){return String(e).replace(/&amp;/g,"&")}function x(e,t){return!(t&&e.exists.call()||(VisualJS.scripts.push(e.js),0))}function D(e,t,a){var i="number"==typeof a&&""!==VisualJS.container[e].unit.label?" "+VisualJS.container[e].unit.label:"",l="number"==typeof a?VisualJS.container[e].unit.symbol:"",e=(a=Z(a,e))!==VisualJS.setup.i18n.text.na[VisualJS.container[e].lang]?"end"===VisualJS.container[e].unit.position?a+i+(""!==l?" "+l:l):l+a+i:a;return t?`<strong>${e}</strong> `+t:e}function G(e,t,a){var i="number"==typeof a?VisualJS.container[e].unit.symbol:"",e=(a=Z(a,e))!==VisualJS.setup.i18n.text.na[VisualJS.container[e].lang]?"end"===VisualJS.container[e].unit.position?a+""+(""!==i?" "+i:i):i+a+"":a;return t?`<strong>${e}</strong> `+t:e}function h(e,t,a,i){return R.axis.labels[a]?("function"==typeof i?i:Z)(e,t,a):""}function b(e){return e.map(e=>Array.isArray(e)?[e[0],""]:[e,""])}function V(e,t){let a,i;if(!r){if(!e)return null;if(isNaN(e))return e;switch(e.length){case 5:a=VisualJS.setup.i18n.text.quarter,i=u("aaaaq",R.lang);break;case 6:a=VisualJS.setup.i18n.text.month,i=u("aaaamm",R.lang);break;default:return e}r={label:a,text:a[VisualJS.container[t].lang],template:i}}var l;return void 0===r.label||void 0===r.text||void 0===(t=r.text[e.slice(4)-1])?e:(l=e.slice(0,4),r.template.replace("{{period}}",t).replace("{{year}}",l))}function Q(e,t,a){var i=document.getElementById(VisualJS.setup.tooltipid),l=VisualJS.setup.margin,r=VisualJS.bwidth-l;i.style.whiteSpace="nowrap",i.style.visibility="hidden",i.style.display="block",i.innerHTML=e;let s=t-(e=i.offsetWidth)/2,n=a-i.offsetHeight-15;(s=s+e>r?r-e:s)<l&&(s=l),n<l&&(n=a+20),i.style.whiteSpace="normal",i.style.left=s+"px",i.style.top=n+"px",i.style.visibility="visible"}let w,k,A,r=null,j="#"+VisualJS.id,L=j+" ."+X.canvasclass,K=VisualJS.container[VisualJS.id],Z=function(t,a,i){if(null==t)return VisualJS.setup.i18n.text.na[VisualJS.container[a].lang];if("number"!=typeof t)return"";{var l=/(\d+)(\d{3})/,i=("object"==typeof VisualJS.container[a].dec&&null!==VisualJS.container[a].dec&&"string"==typeof i&&"number"==typeof VisualJS.container[a].dec[i]?t.toFixed(VisualJS.container[a].dec[i]):"number"==typeof VisualJS.container[a].dec?t.toFixed(VisualJS.container[a].dec):String(t)).split(".");let e=i[0];for(t=1<i.length?VisualJS.setup.i18n.text.dec[VisualJS.container[a].lang]+i[1]:"";l.test(e);)e=e.replace(l,"$1"+VisualJS.setup.i18n.text.k[VisualJS.container[a].lang]+"$2");return e+t}},u=function(e,t){var a=X.i18n.template;if(a){if("string"==typeof a)return a;if("object"==typeof a&&a[e]&&"string"==typeof a[e][t])return a[e][t]}return"{{period}} {{year}}"};if("cmap"===R.type){if("string"!=typeof R.by)return;x(X.lib.maps,!0),x(X.lib.d3,!0),x(X.map[R.by],!0),VisualJS.chart=function(){let z=f(),M=VisualJS.map[R.by],W=M.area[0],B=M.area[1],O=null!==R.grouped&&"object"==typeof R.grouped&&Array.isArray(R.grouped.label)&&0<R.grouped.label.length&&R.data[0].hasOwnProperty("group"),T=R.data[0].hasOwnProperty("val"),F=O?R.grouped.label.length:T?X.colors.map.max:1,q=X.colorclassprefix,C=d3.select(j),e=d3.geo[M.projection](),t="object"==typeof M.center&&"function"==typeof e.center?e.center(M.center):e,a=t.scale(M.scale).translate([W/2,B/2]),P=d3.geo.path().projection(a),N=d3.select("#"+X.tooltipid),H=VisualJS.func.colors(X.colors.map.base,F,"fill",q,O&&!T&&"object"==typeof R.grouped.color&&R.grouped.color.length===R.grouped.label.length?R.grouped.color:[],VisualJS.id);(A=function(){var $,E,I=g(VisualJS.arr2html(R.footer)||"");if(C.html("<header"+(R.hasOwnProperty("header")&&!1===R.header?' class="visually-hidden"':"")+"><"+n+' id="ARIAtitle" style="overflow:auto;" ></'+n+'></header><footer class="'+VisualJS.setup.footerclass+'" style="overflow:auto;"></footer>'),d3.select(j+" "+n).html(z),d3.select(j+" "+U).html(I),VisualJS.getSize(VisualJS.id)){let i=VisualJS.id,l=d3.map(),r=d3.map(),s=R.data[0].hasOwnProperty("label"),t=[],e=VisualJS.height/B,a=VisualJS.width/W,n=Math.min(Math.round(W*e),VisualJS.width),o=Math.min(Math.round(B*a),VisualJS.height),u=Math.floor((VisualJS.width-n)/2),d=Math.floor((VisualJS.height-o)/2),p=e<a?e:a,c=C.insert("svg:svg",U).attr("viewBox","0 0 "+n+" "+o).attr("width",n).attr("height",o).attr("role","img").attr("aria-labelledby","ARIAtitle"),y=function(){},f=function(){},g=!0,x,h,b,m,v,S,J=(O&&T?(S=[],[1,R.grouped.label.length].forEach(function(t){for(let e=0;e<R.data.length;e++)if(R.data[e].group===t){S.push(R.data[e].val);break}}),S[0]>S[1]&&(g=!1)):O&&R.grouped.color&&(H=R.grouped.color),O?(x=d3.map(),f=function(e,t){e.set(t.id,t.group)},VisualJS.groupedLabelSize=null,b=function(e,t,a){var i;return T&&!g?(VisualJS.groupedLabelSize||(i=d3.values(e).reduce((e,t)=>(e[t]=1+(e[t]||0),e),{}),VisualJS.groupedLabelSize=Object.keys(i).length),q+(VisualJS.groupedLabelSize-e.get(a[M.id]))):q+(e.get(a[M.id])-1)},h=function(e,t){e=R.grouped.label[e.get(t[M.id])-1];let a=s?r.get(t[M.id]):t[M.label];return void 0!==e&&(a+=` <em>${e}</em>`),a},y=VisualJS.func.legend):T?(b=function(e,t,a,i,l){t=t.get(a[M.id]);return void 0===t?"":i===l?q+(F/2).toFixed(0):d3.scale.quantize().domain([i,l]).range(d3.range(F).map(function(e){return q+e}))(t)},y=VisualJS.func.legend):b=function(e,t,a){return""!==t.get(a[M.id])?"":q+(F-1)},h=function(e,t){return s?r.get(t[M.id]):t[M.label]},R.data.forEach(e=>{e.hasOwnProperty("val")?null!==e.val&&(l.set(e.id,e.val),t.push(e.val)):l.set(e.id,""),s&&r.set(e.id,e.label),f(x,e)}),t.sort(function(e,t){return e-t}),t[0]),V=t[t.length-1],w=function(e,t,a){""!==e.properties[M.id]&&""!==e.properties[M.label]&&(T||O||void 0!==l.get(e.properties[M.id]))&&Q(D(i,h(x,e.properties),l.get(e.properties[M.id])),t,a)},k=!1,A=null,j=null,L;v="number"==typeof K.range?(m=d3.quantile(t,K.range),d3.quantile(t,1-K.range)):(m=K.range[0],K.range[1]),"function"!=typeof K.click&&(K.click=function(){}),c.style("margin-left",u+"px"),c.style("margin-top",d+"px"),c.style("margin-bottom",d+"px"),c.append("g").attr("class",X.areaclass).attr("transform","scale("+p+")").selectAll("path").data(M.features).enter().append("svg:path").attr("class",function(e){return""===e.properties[M.id]||""===e.properties[M.label]||!T&&void 0===l.get(e.properties[M.id])?q+"nohover":b(x,l,e.properties,m,v)}).attr("tabindex",function(){return d3.select(this).classed(q+"nohover")?"-1":"0"}).attr("role","presentation").attr("d",P).on("mousemove",function(e,t){w(e,d3.event.pageX,d3.event.pageY)}).on("mouseout",function(){return N.style("display","none")}).on("mousedown",function(){k=!0}).on("mouseup",function(){k=!1}).on("focusout",function(){return N.style("display","none")}).on("focusin",function(t){if(k){let e=!0;var a=(new Date).getTime();K.priv&&K.priv.click?500<a-K.priv.click?K.priv.click=a:e=!1:K.priv={click:a},e&&K.click.apply(null,[{id:t.properties[M.id],label:s?void 0!==r.get(t.properties[M.id])?r.get(t.properties[M.id]):null:t.properties[M.label],position:{x:d3.event.pageX,y:d3.event.pageY},group:O&&void 0!==x.get(t.properties[M.id])?{num:x.get(t.properties[M.id]),label:K.grouped.label[x.get(t.properties[M.id])-1]}:null,value:T&&void 0!==l.get(t.properties[M.id])?l.get(t.properties[M.id]):null}]),A=d3.event.pageX,j=d3.event.pageY}else L=d3.select(this).node().getBoundingClientRect(),A=(L.left+L.right)/2,j=(L.top+L.bottom)/2;w(t,A,j)}).on("keyup",function(e){var t;"Enter"===d3.event.key&&(t=d3.select(this).node().getBoundingClientRect(),K.click.apply(null,[{id:e.properties[M.id],label:s?void 0!==r.get(e.properties[M.id])?r.get(e.properties[M.id]):null:e.properties[M.label],position:{x:t.left,y:t.top},group:O&&void 0!==x.get(e.properties[M.id])?{num:x.get(e.properties[M.id]),label:K.grouped.label[x.get(e.properties[M.id])-1]}:null,value:T&&void 0!==l.get(e.properties[M.id])?l.get(e.properties[M.id]):null}]))}),(T||O)&&(I=[D(i,null,m),D(i,null,v)],$=[H[H.length-1],H[0]],E=[m<J||Z(m,i)===Z(J,i),v>V||Z(v,i)===Z(V,i)],O?(!T&&void 0!==R.grouped.color||(R.grouped.color=H),VisualJS.pub[VisualJS.id].legend={color:R.grouped.color,text:R.grouped.label},K.legend&&VisualJS.func.groupLegend(I,c,N,o,E,R,Y,g)):T&&(I=[G(i,null,m),G(i,null,v)],VisualJS.pub[VisualJS.id].legend={color:$,text:I,symbol:[E[0]?"==":"<=",E[1]?"==":">="]},K.legend)&&VisualJS.func.legend(I,H,c,N,o,E,R.unit.label)),VisualJS.pub[VisualJS.id].heading=z}})(),document.querySelectorAll(".visual .VisualJSarea path").forEach(function(e){e.addEventListener("mouseenter",function(){var e=this.parentNode;this!==e.lastElementChild&&e.appendChild(this)})})}}else if("rank"===R.type)x(X.lib.jquery,!0),x(X.lib.echarts,!0),VisualJS.chart=function(){let i={color:X.colors.series,legend:{show:K.legend,bottom:"0"},grid:{show:!1,borderWidth:K.grid.border,containLabel:!0,outerBoundsContain:"axisLabel",left:"20px",right:"20px",bottom:"0px",top:"0px"},tooltip:{showContent:!1,trigger:"item",axisPointer:{type:"none"}},xAxis:{type:"value",scale:!1,boundaryGap:!1,axisLabel:{show:!R.axis||!R.axis.labels||R.axis.labels.x,margin:15,fontSize:10,formatter:function(e){return e.toLocaleString(R.lang&&"en"===R.lang?"en-US":"ca-ES")}},splitLine:{show:!R.axis||!R.axis.ticks||R.axis.ticks.x},axisTick:{show:!1},axisLine:{show:!1}},yAxis:{type:"category",show:R.axis.labels.y,boundaryGap:!0,inverse:!0,axisLabel:{show:!R.axis||!R.axis.labels||R.axis.labels.y&&!R.axis.labels.in,rotate:0,hideOverlap:!1,fontSize:10,interval:0,overflow:"truncate",ellipsis:"...",width:300,color:"#000"},splitLine:{show:!1},axisTick:{show:!1},axisLine:{show:!1}},animation:!1,series:[]};(A=function(){var e=VisualJS.id,t=g(VisualJS.arr2html(R.footer)||""),a=f();$(j).html(`<header${R.hasOwnProperty("header")&&!1===R.header?' class="visually-hidden"':""}><${n} id="ARIAtitle">${a}</${n}></header><footer class=${VisualJS.setup.footerclass} style="overflow:auto;">${t}</footer>`),VisualJS.getSize(e)&&(t=X.typeclassprefix+R.type,$(j+" header").after('<main id="mainchart" class="'+X.canvasclass+" "+t+" "+VisualJS.visualsize+'" style="width: '+VisualJS.width+"px; height: "+VisualJS.height+'px; display: block;"></main>'),e=document.getElementById("mainchart"),t=echarts.init(e),i.yAxis.data=R.data.map(e=>e[0]),i.series=[{type:"bar",barWidth:"90%",data:R.data.map(e=>{var t=X.colors.series[0];return{value:e[1],itemStyle:{color:t+"80"},emphasis:{itemStyle:{color:t+"30"}}}}),label:{show:R.axis&&R.axis.labels&&R.axis.labels.in&&R.axis.labels.y,position:"insideLeft",silent:!0,color:"#000",padding:[6,6,6,6],fontSize:10,overflow:"truncate",ellipsis:"...",width:t.getWidth()-40,distance:4,formatter:e=>e.name},cursor:"default"}],i.series.map(e=>e.data.push("")),t.setOption(i),t.on("mousemove",function(e){var t=VisualJS.id,a=e.name,i=e.value,t=D(t,a,i);Q(t,e.event.event.pageX,e.event.event.pageY)}),t.on("mouseout",function(){$("#"+VisualJS.setup.tooltipid).hide()}),VisualJS.pub[VisualJS.id].heading=a,$(L).find("canvas").attr("role","img").attr("aria-labelledBy","ARIAtitle"))})()};else{let e=!0,d=(x(X.lib.jquery,!0)?(e=!1,x(X.lib.jquery.flot,!1)):x(X.lib.jquery.flot,!0)&&(e=!1),[]),t=function(){if(K.autoheading){let e=R.time.length,t,a;var i=(e,t)=>e.every(e=>null===e.val[t]);if(null===R.data[0].val[0]){for(t=0,a=[];t<e;t++){if(!i(R.data,t))break;a.push(!0)}0<a.length&&(R.time.splice(0,a.length),R.data.forEach(e=>e.val.splice(0,a.length))),e=R.time.length}if(null===R.data[0].val[e-1]){for(t=e,a=[];t--;){if(!i(R.data,t))break;a.push(!0)}0<a.length&&(R.time.splice(-a.length),R.data.forEach(e=>e.val.splice(-a.length)))}}let u=function(){};return J?x(X.lib.jquery.flot.stack,e):"tsbar"===R.type&&(x(X.lib.jquery.flot.orderbars,e),u=function(e){return e.bars}),c=function(i,e){VisualJS.ticks=[];let l,t=e.length,a=i.length,r=K.grid&&K.grid.bar&&"number"==typeof K.grid.bar?K.grid.bar:2<=t&&4<a?.18:.2;for(l=0;l<t;l++){var s;"tsbar"===R.type?(s=l-(1<a?r/2:0),S.push([s,e[l]]),VisualJS.ticks.push([s,e[l]])):(S.push([l,e[l]]),VisualJS.ticks.push([l,e[l]]))}for(l=0;l<a;l++){var n=[];for(let e=i[l].val,t=e.length,a=0;a<t;a++)n.push([a,e[a]]);"tsbar"!==R.type||J||1===a?v.push({label:i[l].label,data:n}):v.push({label:i[l].label,data:n,bars:{show:!0,barWidth:r,order:l+1,lineWidth:2,align:"center"}})}var o=v.length;for(l=0;l<o;l++)d.push({data:v[l].data,label:v[l].label,bars:u(v[l]),shadowSize:K.grid.shadow});p=1<o},f()},p,a,i,l,r,o,u,v=[],S=[],c=function(){},J=R.stacked||!1;switch(Array.max=function(e){return Math.max.apply(Math,e)},R.type){case"xy":x(X.lib.jquery.flot.axisLabels,e),l=!0,r=!1,i=!1,u=f(),c=function(e,t,a){Array.isArray(e)&&Array.isArray(e[0])?v=[e]:Array.isArray(e)&&"object"==typeof e[0]&&!Array.isArray(e[0])&&(v=e.map(e=>{return e={label:(a=e).label,data:[],by:Array.isArray(a.by)&&"string"==typeof a.by[0]?a.by:null},"object"==typeof a.x&&"object"==typeof a.y?(X.canvas.axis.labelsText={x:a.x.label,y:a.y.label},e.data=a.x.val.map((e,t)=>[e,a.y.val[t]])):a.val&&1<=a.val.length&&2==a.val[0].length&&(X.canvas.axis.labelsText={x:a.x,y:a.y},e.data=a.val),e;var a}))},p=!0;break;case"pyram":x(X.lib.jquery.flot.pyramid,e),l=!1,r=!1,u=f(),c=function(a,e,t){w=Math.max(Array.max(a[0].val),Array.max(a[1].val)),v[0]={label:a[0].label,data:[],pyramid:{direction:"L"}},v[1]={label:a[1].label,data:[]},t.forEach((e,t)=>{v[0].data[t]=[e,a[0].val[t]],v[1].data[t]=[e,a[1].val[t]]})},p=!0,a=!1,J=!1,i=!1;break;case"rank":let s=[];i=!1,l=!1,r=!0,u=f(),c=function(a,e,i){var l=[];for(let e=0,t=a.length;e<t;e++){var r=t-e-1,r=(S[e]=[e,void 0!==a[r][0]?a[r][0]:i[r]],void 0!==a[r][1]?a[r][1]:a[r]);l.push(r),s[e]=[r,e]}v={data:s},w=Array.max(l)},p=!1,a=!1;break;case"pie":x(X.lib.jquery.flot.pie,e),o=!0,i=!1,l=!1,r=!1,u=f(),c=function(a,e,t){"object"!=typeof t||null===t?v=a.filter(e=>null!==e[1]).map(e=>({label:e[0],data:e[1]})):"number"==typeof a[0]&&(v=t.filter((e,t)=>null!==a[t]).map((e,t)=>({label:e,data:a[t]})))},p=!0;break;case"bar":let n=function(){};J?(x(X.lib.jquery.flot.stack,e),n=function(e){return e.bars}):x(X.lib.jquery.flot.categories,e),l=!1,r=!0,u=f(),i=!1,c=function(a,e,i){if("object"!=typeof i||null===i)v=[v=a.filter(e=>null!==e[1]).map(e=>[`<span>${e[0]}</span>`,e[1]])];else if(J){VisualJS.ticks=[];let t,e;for(t=0,e=a.length;t<e;t++)S.push([t,a[t].label]),VisualJS.ticks.push([t,a[t].label]);for(t=0,e=i.length;t<e;t++){var l=[];for(let e=0;e<a.length;e++){var r=a[e].val;l.push([e,r[t]])}v.push({label:i[t],data:l})}var s=v.length;for(t=0;t<s;t++)d.push({data:v[t].data,label:v[t].label,bars:n(v[t]),shadowSize:K.grid.shadow})}else if(R.by&&R.by.length&&"object"==typeof R.data[0]){v=R.by.map(e=>({label:e,data:[]}));let a=0;R.data.forEach(e=>{var t=e.val;S.push([t.length%2==0?a+(t.length-1)/2:Math.floor(a+t.length/2),e.label]),t.forEach((e,t)=>{v[t].data.push([a,e]),a++}),a++})}else v=[v="number"==typeof a[0]?i.filter((e,t)=>null!==a[t]).map((e,t)=>[`<span>${e}</span>`,a[t]]):v]},p=!0,a=!0;break;case"tsline":u=t(),a=null,l=!0,r=!1,i=!0;break;case"tsbar":u=t(),a=!0,l=!1,r=!0,i=!1}VisualJS.chart=function(){c(R.data,R.time,R.by),$.fn.UseTooltip=function(h){let b=[];$(this).bind("plothover",function(e,t,a){let i;if(a){if(b!=[a.seriesIndex,a.dataIndex])if(b=[a.seriesIndex,a.dataIndex],"xy"===R.type){var l,r={},s={},n=VisualJS.container[h].unit,o={x:"start"===n.position.x,y:"start"===n.position.y,z:"start"===n.position.z};for(l in o){var u=o[l],d=n.symbol&&"string"==typeof n.symbol[l]?n.symbol[l]:"",p=n.label&&"string"==typeof n.label[l]?n.label[l]:"";u?(r[l]=d,s[l]=p,s[l]=""!==s[l]?" "+s[l]:""):(r[l]="",s[l]="  "+p+" "+d)}i="<div><strong>"+r.x+Z(a.datapoint[0],h,"x")+s.x+"</strong> "+(void 0!==m.xaxis.axisLabel?m.xaxis.axisLabel:"x")+"</div><div><strong>"+r.y+Z(a.datapoint[1],h,"y")+s.y+"</strong> "+(void 0!==m.yaxis.axisLabel?m.yaxis.axisLabel:"y")+"</div>",i+=Array.isArray(v[a.seriesIndex].by)&&"string"==typeof v[a.seriesIndex].by[a.dataIndex]&&""!==v[a.seriesIndex].by[a.dataIndex]?v[a.seriesIndex].by[a.dataIndex]+("string"==typeof v[a.seriesIndex].label&&""!==v[a.seriesIndex].label?" ("+v[a.seriesIndex].label+")":""):"",Q(i,t.pageX,t.pageY)}else{var c=a.datapoint[0],y=a.datapoint[1],f="bar"!==R.type||Boolean(R.data[0].val)?a.series.label:(1<v.length?v:v[0])[c][0],f="rank"!==R.type?f:S[y][1],g=!!("rank"!==R.type&&"pie"!==R.type&&"bar"!==R.type||"bar"===R.type&&Boolean(R.data[0].val))&&(J||1===v.length?!!(Array.isArray(S)&&0<S.length)&&S[c][1]:"pyram"===R.type?v[t.x<0?0:1].data[a.dataIndex][0]:S[a.dataIndex][1]),x=(g=g,f=f,x=VisualJS.container[h].tooltipseparator,"bar"===R.type&&R.by?g?""+g+(f?x+f:""):f||"":g?""+(f?f+x+g:g):f||"");i="pyram"===R.type?Math.abs(c):"rank"===R.type?c:"tsbar"===R.type||"bar"===R.type&&J?J||1===v.length?v[a.seriesIndex].data[c][1]:y:"pie"===R.type?y[0][1]:y,Q(D(h,x,i),t.pageX,t.pageY)}}else $("#"+X.tooltipid).hide(),b=[];var x})};let m={colors:X.colors.series,series:{stack:a,bars:{show:r,barWidth:.7,align:"center",fill:.9},pie:{show:o,label:{show:!1}},lines:{show:i,lineWidth:K.grid.line},points:{show:l,radius:K.grid.point,fill:.85,fillColor:null}},legend:{show:K.legend&&p,position:Y.position||"ne"},grid:{borderWidth:K.grid.border,hoverable:!0,clickable:!1,mouseActiveRadius:10},xaxis:{show:K.axis.x,axisLabel:void 0!==s(X.canvas.axis,["labelsText","x"])?X.canvas.axis.labelsText.x:void 0,axisLabelUseCanvas:!0,axisLabelFontSizePixels:k=Number($("."+VisualJS.setup.clas).css("font-size").replace("px","")),axisLabelFontFamily:$("."+VisualJS.setup.clas).css("font-family"),axisLabelPadding:k,axisLabelColour:"#545454",labelWidth:28},yaxis:{show:K.axis.y,axisLabel:void 0!==s(X.canvas.axis,["labelsText","y"])?X.canvas.axis.labelsText.y:void 0,axisLabelUseCanvas:!0,axisLabelFontSizePixels:k,axisLabelFontFamily:$("."+VisualJS.setup.clas).css("font-family"),axisLabelPadding:k,axisLabelColour:"#545454"}};(A=function(){let a=VisualJS.id,i=S.length,e=g(VisualJS.arr2html(R.footer)||"");if($(j).html(`<header${R.hasOwnProperty("header")&&!1===R.header?' class="visually-hidden"':""}><${n} id="ARIAtitle" style="overflow:auto;">${u}</${n}></header><footer class=${VisualJS.setup.footerclass} style="overflow:auto;">${e}</footer>`),VisualJS.getSize(a)){var t=X.typeclassprefix+R.type;switch($(j+" header").after('<main class="'+X.canvasclass+" "+t+" "+VisualJS.visualsize+'" style="width: '+VisualJS.width+"px; height: "+VisualJS.height+'px; display: block;"></main>'),m.xaxis.tickFormatter=function(e){return h(e,a,"x")},m.yaxis.tickFormatter=function(e){return h(e,a,"y")},m.xaxis.tickLength=R.axis.ticks.x?null:0,m.yaxis.tickLength=R.axis.ticks.y?null:0,m.grid.markings=R.grid.markings||null,R.type){case"xy":R.range?(R.range.x?Array.isArray(R.range.x)?(m.xaxis.min=R.range.x[0],m.xaxis.max=R.range.x[1]):(m.xaxis.min=0,m.xaxis.max=R.range.x):(m.xaxis.min=null,m.xaxis.max=null),R.range.y?Array.isArray(R.range.x)?(m.yaxis.min=R.range.y[0],m.yaxis.max=R.range.y[1]):(m.yaxis.min=0,m.yaxis.max=R.range.y):(m.yaxis.min=null,m.yaxis.max=null)):(m.xaxis.min=null,m.yaxis.min=null,m.xaxis.max=null,m.yaxis.max=null),m.hooks={drawBackground:function(e,t){e=e.getXAxes()[0];void 0!==e.ticks&&0<e.ticks.length&&(e.datamin=e.ticks[0].v,e.datamax=e.ticks[e.ticks.length-1].v)}},$.plot(L,v,m);break;case"pyram":m.series.pyramid={show:!0,barWidth:1},m.yaxis.show=!!(11<VisualJS.height/v[0].data.length&&R.axis.labels.y)&&K.axis.y,m.xaxis.max="number"==typeof K.range?w*K.range:Array.isArray(K.range)?K.range[1]:null,m.xaxis.tickFormatter=function(e){return h(e,a,"x",Z)},$.plot(L,v,m);break;case"rank":m.series.bars.horizontal=!0,m.yaxis.ticks=11<VisualJS.height/i?S.slice(0):0,!1===R.axis.labels.y&&(m.yaxis.ticks=b(m.yaxis.ticks)),"number"==typeof K.range?m.xaxis.max=w*K.range:Array.isArray(K.range)&&(m.xaxis.min=K.range[0],m.xaxis.max=K.range[1]),m.xaxis.tickFormatter=function(e){return h(e,a,"x",Z)},m.yaxis.autoscaleMargin=0,m.series.bars.barWidth=.5,$.plot(L,[v],m);break;case"pie":$.plot(L,v,m);break;case"bar":m.xaxis.tickLength=0,!1===R.axis.labels.x&&(m.xaxis.ticks=b(S),m.xaxis.show=!1),R.by&&R.by.length&&"object"==typeof R.data[0]?(m.xaxis.ticks=S,m.bars={show:!0}):(m.xaxis.mode="categories",m.yaxis.tickFormatter=function(e){return h(e,a,"y",Z)}),"number"!=typeof K.range&&null!==K.range?(m.yaxis.min=K.range[0],m.yaxis.max=K.range[1]):"number"==typeof K.range&&(m.yaxis.min=null,m.yaxis.max=K.range),$.plot(L,v,m);break;case"tsline":case"tsbar":"tsbar"===R.type?m.xaxis.tickLength=0:null===m.grid.markings&&(m.grid.markings=[{color:"#333333",lineWidth:1,yaxis:{from:0,to:0}}]),m.yaxis.tickFormatter=function(e){return h(e,a,"y",Z)};var l=VisualJS.width/i,r=[],s="string"==typeof R.first&&R.first?R.first:6===VisualJS.ticks[0][1].length?"01":"1";let e;"number"!=typeof K.range&&null!==K.range?(m.yaxis.min=K.range[0],m.yaxis.max=K.range[1]):"number"==typeof K.range&&(m.yaxis.min=null,m.yaxis.max=K.range);let t;switch(VisualJS.ticks[0][1].length){case 4:if(l<33){for(e=16.5<l?2:10.5<l?3:9<l?4:10,t=0;t<i;t++)r[t]=t%e?[S[t][0],""]:[S[t][0],S[t][1]];m.xaxis.ticks=r}else m.xaxis.ticks=S;!1===R.axis.labels.x&&(m.xaxis.ticks=b(m.xaxis.ticks));break;case 5:case 6:if(l<56){for(l<8.5&&56<i&&$("main").addClass(X.mini),t=0;t<i;t++)r[t]=VisualJS.ticks[t][1].slice(4)!==s?[VisualJS.ticks[t][0],""]:[VisualJS.ticks[t][0],VisualJS.ticks[t][1].slice(0,4)],S[t][1]=V(VisualJS.ticks[t][1],VisualJS.id);m.xaxis.ticks=r}else{for(t=0;t<i;t++)S[t][1]=V(VisualJS.ticks[t][1],VisualJS.id);m.xaxis.ticks=S}!1===R.axis.labels.x&&(m.xaxis.ticks=b(m.xaxis.ticks));break;case 7:if(l<55){for(e=20<l?2:10<l?3:4,t=0;t<i;t++)r[t]=t%e?[S[t][0],""]:[S[t][0],S[t][1]];m.xaxis.ticks=r}else m.xaxis.ticks=S;!1===R.axis.labels.x&&(m.xaxis.ticks=b(m.xaxis.ticks));break;default:m.xaxis.ticks=S,!1===R.axis.labels.x&&(m.xaxis.ticks=b(m.xaxis.ticks))}$.plot(L,d,m)}y()&&$(L).UseTooltip(VisualJS.id),VisualJS.pub[VisualJS.id].heading=u,$(L).find("canvas").attr("role","img").attr("aria-labelledBy","ARIAtitle")}})()}}VisualJS.scripts.length&&"object"==typeof LazyLoad?LazyLoad.js(VisualJS.scripts,l):l()}};var visual;Array.isArray||(Array.isArray=function(e){return"[object Array]"===Object.prototype.toString.call(e)}),"function"!=typeof visual&&(visual=VisualJS.load);
/*
Copyright (c) 2025 Institut d'Estadistica de Catalunya (Idescat)
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
VisualJS.setup = { //1.4
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
		unit: {
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
				y: true,
				in: true
			}
		},
		dec: null, //Show only needed decimals (remove ending zeros) unless (recommended) valid dec has been specified by user
		autoheading: true,
		header: true,
		range: { //Arrays are not accepted here. "bar", "tsline" and "tsbar" currently don't accept a number.
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
					exists: function(){ return typeof jQuery.plot.plugins==="object" && jQuery.plot.plugins.some(function(plugin){ return typeof plugin==="object" && plugin.name==="stack";});  }
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
		echarts: {
			js: "https://visual.js.org/lib/echarts.js",
			exists: function(){ return typeof echarts==="function"; },
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
		com2025: { 
			label: "Catalonia: counties",
			js: "https://visual.js.org/maps/cat2025com.js",
			exists: function () { return typeof VisualJS.map.com2025 !== "undefined"; }
		},
		com2023: {
			label: "Catalonia: counties (between 2023 and 2025)",
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
		com242025: {
			label: "Catalonia. Osona: municipalities",
			js: "https://visual.js.org/maps/com242025mun.js",
			exists: function(){return typeof VisualJS.map.com242025!=="undefined";}
		},
		com242023: {
			label: "Catalonia. Osona: municipalities (between 2023 and 2025)",
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
		com412025: {
			label: "Catalonia. El Vallès Oriental: municipalities",
			js: "https://visual.js.org/maps/com412025mun.js",
			exists: function () {return typeof VisualJS.map.com412025!=="undefined";}
		},
		com412015: {
			label: "Catalonia. El Vallès Oriental: municipalities (between 2023 and 2025)",
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
			label: "Catalonia. Regions of the Territorial Plan (between 2023 and 2025)",
			js: "https://visual.js.org/maps/cat2023at.js",
			exists: function(){ return typeof VisualJS.map.at!=="undefined"; }
		},
		at2025: {
			label: "Catalonia. Regions of the Territorial Plan",
			js: "https://visual.js.org/maps/cat2025at.js",
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