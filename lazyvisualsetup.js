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
Copyright (c) 2018 Institut d'Estadistica de Catalunya (Idescat)
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
var VisualJS={version:"1.1.0",show:!0,old:!1,fixed:null,width:500,bwidth:500,height:500,normal:500,scripts:[],map:{},container:{},pub:{},func:{},callback:null,getSize:function(a){var e=VisualJS.setup,t=e.html.heading,i="."+VisualJS.setup.footerclass,l="undefined"!=typeof jQuery?jQuery:"undefined"!=typeof d3?d3.select:document.querySelectorAll.bind(document),n=window,r=document,s=r.documentElement,o=r.getElementsByTagName("body")[0],u=r.getElementById(a),d=function(a,e){return"function"==typeof getComputedStyle?getComputedStyle(a)[e]:a.currentStyle[e]},c=function(a){var e=l(a);return e[0]instanceof Element?e[0]:e[0]&&e[0][0]?e[0][0]:void 0},p=function(a){if(a){var e=a.offsetHeight;d(a);return e+=Math.round(parseFloat(d(a,"marginTop"))+parseFloat(d(a,"marginBottom")))}return 0},y=p(c(t)),f=p(c(i)),x=n.innerHeight||s.clientHeight||o.clientHeight,g=Math.round(parseFloat(d(u,"marginTop"))+parseFloat(d(u,"marginBottom")));return void 0!==x&&void 0!==y&&void 0!==f&&(null===VisualJS.fixed?(VisualJS.bwidth=n.innerWidth||s.clientWidth||o.clientWidth,VisualJS.width=VisualJS.bwidth-e.padding.w,VisualJS.height=Math.floor(x-y-f-g-10)):(VisualJS.bwidth=s.clientWidth||o.clientWidth,VisualJS.width=VisualJS.fixed[0]-e.padding.w,VisualJS.height=Math.floor(VisualJS.fixed[1]-y-f-g-10))),VisualJS.visualsize=VisualJS.width<VisualJS.normal?e.mini:e.normal,10<VisualJS.width&&10<VisualJS.height},arr2html:function(a,e){var t="";return void 0===a||(Array.isArray(a)?a.forEach(function(a){"string"==typeof a&&""!==a&&(t+="<"+e.footer+">"+a+"</"+e.footer+">")}):"string"==typeof a&&""!==a&&(t+="<"+e.footer+">"+a+"</"+e.footer+">")),t},iframe:function(a,e){var t,i,l,n,r,s,o=VisualJS.setup,u="string"==typeof a.clas?a.clas:o.clas,d='<!DOCTYPE html>\n\x3c!--[if lt IE 7]><html class="lt-ie9 lt-ie8 lt-ie7"> <![endif]--\x3e\n\x3c!--[if IE 7]><html class="lt-ie9 lt-ie8"> <![endif]--\x3e\n\x3c!--[if IE 8]><html class="lt-ie9"> <![endif]--\x3e\n\x3c!--[if gt IE 8]>\x3c!--\x3e <html> \x3c!--<![endif]--\x3e\n<head>';"string"==typeof e&&(-1===e.indexOf("{")?d+='<link href="'+e+'" rel="stylesheet" type="text/css"/>':d+='<style type="text/css">'+e+"</style>"),d+='<script type="text/javascript" src="'+VisualJS.setup.main.visual+'"><\/script>',d+='<script type="text/javascript" src="'+VisualJS.setup.main.setup+'"><\/script>',d+='<script type="text/javascript" src="'+VisualJS.setup.main.lazy+'"><\/script>',d+='</head><body><div id="'+a.id+'" class="'+u+'"></div><script>window.setTimeout(function(){visual('+JSON.stringify(a)+");},1);<\/script></body></html>",n=document,r=n.createElement("iframe"),s=n.getElementById(a.id),r.setAttribute("title",a.title?VisualJS.setup.i18n.text.iframetitle[a.lang]+": "+a.title:VisualJS.setup.i18n.text.iframetitle[a.lang]),r.setAttribute("aria-hidden","true"),r.setAttribute("role","widget"),r.frameBorder="0",r.scrolling="no",s.parentNode.insertBefore(r,s.nextSibling),i=d,void 0!==(t=r)&&(t.contentDocument?l=t.contentDocument:t.contentWindow?l=t.contentWindow.document:window.frames[t.name]&&(l=window.frames[t.name].document),l&&(l.open(),l.write(i),l.close()))},compare:function(i){var a,l=VisualJS.setup,n=VisualJS.setup.separator,r="string"==typeof i.id?i.id:l.id,e="[object Array]"===Object.prototype.toString.call(i.css)?0===i.css.length?["",""]:1===i.css.length?[i.css[0],i.css[0]]:i.css:[i.css,i.css],t=document,s=t.createElement(l.html.heading),o="string"==typeof i.title?i.title:"",u=t.createElement(l.html.footer),d=l.html,c="string"==typeof i.footer?VisualJS.arr2html(i.footer,d):"",p=t.getElementById(r),y=t.createElement("div"),f=t.createElement("style"),x=function(){if(VisualJS.getSize(r)){var a=VisualJS.height+("string"==typeof i.footer&&""!==i.footer?14:0),e=VisualJS.width+l.margin,t="iframe{ float: left; width: "+Math.floor((e-n)/2-l.margin)+"px; height:"+a+"px; }";f.styleSheet?f.styleSheet.cssText=t:f.innerHTML=t,y.style.height=a+"px"}};s.innerHTML=o,s.style.overflow="auto",u.innerHTML=c,u.style.overflow="auto",u.style.clear="both",p.appendChild(s),p.appendChild(u),t.getElementsByTagName("head")[0].appendChild(f),y.style.width=n+"px","styleFloat"in y.style?y.style.styleFloat="left":y.style.cssFloat="left";for(var g=0;g<2;g++)a=t.createElement("span"),"string"!=typeof i.load[g].id&&(i.load[g].id=l.compareids[g]),a.id=i.load[g].id,p.insertBefore(a,u),VisualJS.iframe(i.load[g],e[g]);p.insertBefore(y,a),x(),window.addEventListener?window.addEventListener("resize",x,!1):window.attachEvent?window.attachEvent("onresize",x):window.onresize=x},load:function(a){var e=function(e){var a,t=function(a){e.source.postMessage(JSON.stringify(a),"*")};if("string"==typeof e.data?a=JSON.parse(e.data):"object"==typeof e.data&&(a=e.data),a)if(void 0===a.action)t({type:"error",data:[{id:"400",label:'"action" is required.'}]});else if("send"===a.action){var i=a.id||VisualJS.id,l=VisualJS.container[i]||VisualJS.container[i];if(l){if("cmap"===l.type&&!l.data[0].hasOwnProperty("label")){for(var n=[],r=VisualJS.map[l.by],s=r.features.length;s--;)n[r.features[s].properties[r.id]]=r.features[s].properties[r.label];for(var o=l.data,u=o.length;u--;)o[u].label=n[o[u].id]}t(l)}else t({type:"error",data:[{id:"404",label:'A visualisation with the specified "id" was not found'}]})}else t({type:"error",data:[{id:"400",label:'"action" value is not correct.'}]})};if(void 0===VisualJS.setup&&window.alert("Visual: Setup not found (visual.setup.js)!"),"[object Array]"!==Object.prototype.toString.call(a))VisualJS.get(a);else for(var t=0,i=a.length;t<i;t++)VisualJS.get(a[t]);VisualJS.container[VisualJS.id].listen&&(window.addEventListener?window.addEventListener("message",e,!1):window.attachEvent("onmessage",e))},get:function(N){var c,p,a,e,t,i,l,n,r,U=VisualJS.setup,X=U.html,Y=U.canvas,D=X.heading,Q="."+VisualJS.setup.footerclass,s=VisualJS.old||U.func.old("ie9"),o=function(a,e,t){"string"==typeof a?e.match(typeof N[a])||(N[a]=t[a]):e.match(typeof u(N,a))||d(N,a,u(t,a))},u=function(a,e){for(var t=a,i=0;i<e.length;i++){if(void 0===t[e[i]]){t=void 0;break}t=t[e[i]]}return t},d=function(a,e,t){for(var i=a,l=0;l<=e.length-2;l++)void 0===i[e[l]]&&(i[e[l]]={}),i=i[e[l]];i[e[e.length-1]]=t},y=function(a){return"object"==typeof a&&null!==a},f=function(){var a="invalid";return Array.isArray(N.data)&&(Array.isArray(N.data[0])?a="array":y(N.data[0])&&(a=y(N.data[0].z)?"xyz":y(N.data[0].y)?"xy":void 0!==N.data[0].x||void 0!==N.data[0].y||!Array.isArray(N.data[0].val)||null===N.data[0].val[0]||2!=N.data[0].val[0].length&&3!=N.data[0].val[0].length?"object":"points")),a},x=[["show","boolean",VisualJS],["callback","function",VisualJS],["id","string",U],["listen","boolean",U],["dec","number|object",Y],["autoheading","boolean",Y],["legend","boolean",Y],["grid","object",Y],[["grid","border"],"number",Y],[["grid","shadow"],"number",Y],[["grid","line"],"number",Y],[["grid","point"],"number",Y],[["grid","markings"],"object",Y],["axis","object",Y],[["axis","x"],"boolean",Y],[["axis","y"],"boolean",Y],[["axis","labels","x"],"boolean",Y],[["axis","labels","y"],"boolean",Y],[["axis","ticks","x"],"boolean",Y],[["axis","ticks","y"],"boolean",Y]];void 0===Y.axis.labels&&(Y.axis.labels={x:!0,y:!0}),void 0===Y.axis.ticks&&(Y.axis.ticks={x:!0,y:!0});for(var g=0;g<x.length;g++)o(x[g][0],x[g][1],x[g][2]);VisualJS.id=N.id,VisualJS.pub[VisualJS.id]={heading:null,legend:null},"object"==typeof N.fixed&&(VisualJS.fixed=N.fixed),"object"==typeof N.unit&&null!==N.unit?(o(["unit","label"],"string|object",Y),o(["unit","symbol"],"string|object",Y),o(["unit","position"],"string|object",Y)):N.unit=Y.unit,N.range=(a=N.range,n=f(),"object"!=typeof a||null===a||Array.isArray(a)||"array"!==n&&"object"!==n||"xy"===N.type||(a="rank"===N.type||"pyram"===N.type?a.x:a.y),Array.isArray(a)&&2===a.length&&null===a[0]&&null===a[1]?N.data&&"object"===n&&(l=[],N.data.forEach(function(a){l=l.concat(a.val)}),0<=(e=[Math.min.apply(null,l),Math.max.apply(null,l)])[0]&&0<=e[1]?a=[0,null]:e[0]<=0&&e[1]<=0&&(a=[null,0])):"object"==typeof a&&!Array.isArray(a)&&null!==a&&(Array.isArray(a.x)&&null===a.x[0]&&null===a.x[1]||Array.isArray(a.y)&&null===a.y[0]&&null===a.y[1])?(p={x:[],y:[]},t={x:[],y:[]},i={x:[],y:[]},"points"===n?N.data.forEach(function(a){a.val.forEach(function(a){p.x.push(a[0]),p.y.push(a[1])})}):"xy"!==n&&"xyz"!==n||N.data.forEach(function(a){p.x=p.x.concat(a.x.val),p.y=p.y.concat(a.y.val)}),t.x=Math.min.apply(null,p.x),i.x=Math.max.apply(null,p.x),t.y=Math.min.apply(null,p.y),i.y=Math.max.apply(null,p.y),Array.isArray(a.x)&&null===a.x[0]&&null===a.x[1]&&(0<=t.x&&0<=i.x?a.x=[0,null]:t.x<=0&&i.x<=0?a.x=[null,0]:a.x=[null,null]),Array.isArray(a.y)&&null===a.y[0]&&null===a.y[1]&&(0<=t.y&&0<=i.y?a.y=[0,null]:t.y<=0&&i.y<=0?a.y=[null,0]:a.y=[null,null])):"xy"!==n&&"xyz"!==n&&"points"!==n||("number"==typeof a||Array.isArray(a)?a={x:[null,null],y:Array.isArray(a)?a:[null,a]}:"object"==typeof a&&null!==a||(a={x:[null,null],y:[null,null]})),a),N.lang=N.lang||U.i18n.lang,"number"==typeof N.range||void 0!==(r=N.range)&&"[object Array]"===Object.prototype.toString.call(r)&&2===r.length&&"number"==typeof r[0]&&"number"==typeof r[1]&&r[0]<r[1]||("object"!=typeof N.range||null===N.range||Array.isArray(N.range))&&(N.range="number"==typeof N.range||Array.isArray(N.range)&&2===N.range.length?N.range:Y.range.hasOwnProperty(N.type)&&"number"==typeof Y.range[N.type]?Y.range[N.type]:null),N.unit=function(a){var e;f();for(var t in a)a.hasOwnProperty(t)&&(e=a[t],"xy"===N.type||("rank"===N.type||"pyram"===N.type?e&&void 0!==e.x?a[t]=e.x:a[t]="string"==typeof e?e:"":e&&void 0!==e.y?a[t]=e.y:a[t]="string"==typeof e?e:""));return a}(N.unit),N.tooltipseparator=U.tooltipseparator&&"string"==typeof U.tooltipseparator?U.tooltipseparator:" / ",VisualJS.container[VisualJS.id]=N;var h,R="#"+VisualJS.id,b=R+" ."+U.canvasclass,G=VisualJS.container[VisualJS.id],m=null,v=function(){if(!1===G.autoheading)return G.title||"";var a,t=[],e=function(a,e){"string"==typeof a&&""!==a&&(!0===e&&(a='<span class="'+VisualJS.setup.nowrapclass+'">'+a+"</span>"),t.push(a))};null!==G.time&&"object"==typeof G.time?a=k(G.time[0],VisualJS.id)+"&ndash;"+k(G.time[G.time.length-1],VisualJS.id):a=k(G.time,VisualJS.id);return e(G.title,!1),e(G.geo,!0),e(a,!0),K(t.join(". "))},S=function(){var a=!1;"function"==typeof VisualJS.chart&&(j(),G.show&&VisualJS.chart(),window.addEventListener?window.addEventListener("resize",h,!1):window.attachEvent?window.attachEvent("onresize",h):window.onresize=h,a=!0),null!==G.callback&&G.callback.call({id:VisualJS.id,chart:a,heading:VisualJS.pub[VisualJS.id].heading,legend:VisualJS.pub[VisualJS.id].legend})},K=function(a){return String(a).replace(/&amp;/g,"&")},J=function(a,e){return(!e||!a.exists.call())&&(VisualJS.scripts.push(a.js),!0)},Z=function(a,e,t){var i="number"==typeof t&&""!==VisualJS.container[a].unit.label?" "+VisualJS.container[a].unit.label:"",l="number"==typeof t?VisualJS.container[a].unit.symbol:"",n=aa(t,a),r=n!==VisualJS.setup.i18n.text.na[VisualJS.container[a].lang]?"end"===VisualJS.container[a].unit.position?n+i+(""!==l?" "+l:l):l+n+i:n;return e?"<strong>"+r+"</strong> "+e:r},_=function(a,e,t){var i="number"==typeof t?VisualJS.container[a].unit.symbol:"",l=aa(t,a),n=l!==VisualJS.setup.i18n.text.na[VisualJS.container[a].lang]?"end"===VisualJS.container[a].unit.position?l+""+(""!==i?" "+i:i):i+l+"":l;return e?"<strong>"+n+"</strong> "+e:n},V=function(a,e,t,i){return N.axis.labels[t]?"function"==typeof i?i(a,e,t):aa(a,e,t):""},w=function(a){for(var e=[],t=0;t<a.length;t++)Array.isArray(a[t])?e.push([a[t][0],""]):e.push([a[t],""]);return e},aa=function(a,e,t){if(null==a)return VisualJS.setup.i18n.text.na[VisualJS.container[e].lang];if("number"==typeof a){for(var i=/(\d+)(\d{3})/,l=("object"==typeof VisualJS.container[e].dec&&null!==VisualJS.container[e].dec&&"string"==typeof t&&"number"==typeof VisualJS.container[e].dec[t]?a.toFixed(VisualJS.container[e].dec[t]):"number"==typeof VisualJS.container[e].dec?a.toFixed(VisualJS.container[e].dec):String(a)).split("."),n=l[0],r=1<l.length?VisualJS.setup.i18n.text.dec[VisualJS.container[e].lang]+l[1]:"";i.test(n);)n=n.replace(i,"$1"+VisualJS.setup.i18n.text.k[VisualJS.container[e].lang]+"$2");return n+r}return""},k=function(a,e){var t,i,l,n;if(!m){if(!a)return null;if(isNaN(a))return a;switch(a.length){case 5:t=VisualJS.setup.i18n.text.quarter,n=A("aaaaq",N.lang);break;case 6:t=VisualJS.setup.i18n.text.month,n=A("aaaamm",N.lang);break;default:return a}m={label:t,text:t[VisualJS.container[e].lang],template:n}}return void 0===m.label?a:void 0===m.text?a:void 0===(i=m.text[a.slice(4)-1])?a:(l=a.slice(0,4),m.template.replace("{{period}}",i).replace("{{year}}",l))},A=function(a,e){var t=U.i18n.template;if(t){if("string"==typeof t)return t;if("object"==typeof t&&t[a]&&"string"==typeof t[a][e])return t[a][e]}return"{{period}} {{year}}"},ea=function(a,e,t){var i=document.getElementById(VisualJS.setup.tooltipid),l=VisualJS.bwidth-VisualJS.setup.margin,n={};i.innerHTML=a,i.style.display="block";var r=i.clientWidth/2;n.x=e-r,n.y=t-i.clientHeight-5,l<e+r?n.x-=e+r-l:n.x<VisualJS.setup.margin&&(n.x+=VisualJS.setup.margin-n.x),n.y<VisualJS.setup.margin&&(n.y+=1.75*i.clientHeight),i.style.left=n.x+"px",i.style.top=n.y+"px"},j=function(){var a=document;if(!a.getElementById(VisualJS.setup.tooltipid)){var e=a.createElement("div");e.setAttribute("role","tooltip"),e.id=VisualJS.setup.tooltipid,e.style.display="none",a.body.appendChild(e)}};if("cmap"===N.type)if(s)document.getElementById(VisualJS.id).innerHTML="<p>"+U.i18n.text.oldbrowser[G.lang]+"</p>";else{if("string"!=typeof N.by)return;J(U.lib.maps,!0),J(U.lib.d3,!0),J(U.map[N.by],!0),VisualJS.chart=function(){var M=v(),I=VisualJS.map[N.by],F=I.area[0],T=I.area[1],B=null!==N.grouped&&"object"==typeof N.grouped&&Array.isArray(N.grouped.label)&&0<N.grouped.label.length&&N.data[0].hasOwnProperty("group"),O=N.data[0].hasOwnProperty("val"),$=B?N.grouped.label.length:O?U.colors.map.max:1,q=U.colorclassprefix,W=VisualJS.func.colors(U.colors.map.base,$,"fill",q,B&&!O&&"object"==typeof N.grouped.color&&N.grouped.color.length===N.grouped.label.length?N.grouped.color:[],VisualJS.id),P=d3.select(R),a=d3.geo[I.projection](),e=("object"==typeof I.center&&"function"==typeof a.center?a.center(I.center):a).scale(I.scale).translate([F/2,T/2]),C=d3.geo.path().projection(e),H=d3.select("#"+U.tooltipid);(h=function(){var a=K(VisualJS.arr2html(N.footer,X)||"");if(P.html("<"+D+' style="overflow:auto;"></'+D+'><div class="'+VisualJS.setup.footerclass+'" style="overflow:auto;"></div>'),d3.select(R+" "+D).html(M),d3.select(R+" "+Q).html(a),VisualJS.getSize(VisualJS.id)){var e,t,i,l,n,r,s=VisualJS.id,o=d3.map(),u=d3.map(),d=N.data[0].hasOwnProperty("label"),c=[],p=function(){},y=VisualJS.height/T,f=VisualJS.width/F,x=Math.min(Math.round(F*y),VisualJS.width),g=Math.min(Math.round(T*f),VisualJS.height),h=Math.floor((VisualJS.width-x)/2),b=Math.floor((VisualJS.height-g)/2),m=y<f?y:f,v=P.insert("svg:svg",Q).attr("viewBox","0 0 "+x+" "+g).attr("width",x).attr("height",g),S=!0;B&&O?(r=[],[1,N.grouped.label.length].forEach(function(a){for(var e=0;e<N.data.length;e++)if(N.data[e].group===a){r.push(N.data[e].val);break}}),r[0]>r[1]&&(S=!1)):B&&N.grouped.color&&(W=N.grouped.color),B?(e=d3.map(),p=function(a,e){a.set(e.id,e.group)},VisualJS.groupedLabelSize=null,i=function(a,e,t){if(O&&!S){if(!VisualJS.groupedLabelSize){for(var i={},l=0;l<d3.values(a).length;l++)i[d3.values(a)[l]]=1+(i[d3.values(a)[l]]||0);VisualJS.groupedLabelSize=Object.keys(i).length}return q+(VisualJS.groupedLabelSize-a.get(t[I.id]))}return q+(a.get(t[I.id])-1)},t=function(a,e){var t=N.grouped.label[a.get(e[I.id])-1],i=d?u.get(e[I.id]):e[I.label];return void 0!==t&&(i+=" <em>"+t+"</em>"),i},VisualJS.func.legend):(O?(i=function(a,e,t,i,l){var n=e.get(t[I.id]);return void 0===n?"":i===l?q+($/2).toFixed(0):d3.scale.quantize().domain([i,l]).range(d3.range($).map(function(a){return q+a}))(n)},VisualJS.func.legend):i=function(a,e,t){return""!==e.get(t[I.id])?"":q+($-1)},t=function(a,e){return d?u.get(e[I.id]):e[I.label]});for(var J=0,V=N.data,w=V.length;J<w;J++){var k=V[J];k.hasOwnProperty("val")?null!==k.val&&(o.set(k.id,k.val),c.push(k.val)):o.set(k.id,""),d&&u.set(k.id,k.label),p(e,k)}c.sort(function(a,e){return a-e});var A=c[0],j=c[w-1];if("number"==typeof G.range?(l=d3.quantile(c,G.range),n=d3.quantile(c,1-G.range)):(l=G.range[0],n=G.range[1]),v.style("margin-left",h+"px"),v.style("margin-top",b+"px"),v.style("margin-bottom",b+"px"),v.append("g").attr("class",U.areaclass).attr("transform","scale("+m+")").selectAll("path").data(I.features).enter().append("svg:path").attr("class",function(a){return""===a.properties[I.id]||""===a.properties[I.label]||!O&&void 0===o.get(a.properties[I.id])?q+"nohover":i(e,o,a.properties,l,n)}).attr("d",C).on("mousemove",function(a){""!==a.properties[I.id]&&""!==a.properties[I.label]&&(O||B||void 0!==o.get(a.properties[I.id]))&&ea(Z(s,t(e,a.properties),o.get(a.properties[I.id])),d3.event.pageX,d3.event.pageY)}).on("mouseout",function(){return H.style("display","none")}),O||B){var L=[Z(s,null,l),Z(s,null,n)],E=[W[W.length-1],W[0]],z=[l<A||aa(l,s)===aa(A,s),j<n||aa(n,s)===aa(j,s)];G.legend&&(B?(VisualJS.pub[VisualJS.id].legend={color:E},(O||void 0===N.grouped.color)&&(N.grouped.color=W),VisualJS.func.groupLegend(L,v,H,g,z,N,Y,S)):O&&(L=[_(s,null,l),_(s,null,n)],VisualJS.pub[VisualJS.id].legend={color:E,text:L,symbol:[z[0]?"==":"<=",z[1]?"==":">="]},VisualJS.func.legend(L,W,v,H,g,z,N.unit.label)))}VisualJS.pub[VisualJS.id].heading=M}})()}}else{var L;J(U.lib.jquery,!0)?(L=!1,J(U.lib.jquery.flot,!1)):L=!J(U.lib.jquery.flot,!0),s&&J(U.lib.excanvas,!0);var E,z,M,I,F,T,B,O=function(){},q=[],W=[],P=[],C=N.stacked||!1,H=function(){if(G.autoheading){var a,e,t,i,l,n,r=N.time.length,s=N.data.length;if(null===N.data[0].val[0]){for(i=!(e=0),l=[];e<r;e++){for(a=0;a<s;a++)i=i&&null===N.data[a].val[e];if(!i)break;l.push(i)}for(n=l.length,t=0;t<n;t++)if(l[t])for(N.time.shift(),a=0;a<s;a++)N.data[a].val.shift();r=N.time.length}if(null===N.data[0].val[r-1]){for(e=r,i=!0,l=[];e--;){for(a=0,s=N.data.length;a<s;a++)i=i&&null===N.data[a].val[e];if(!i)break;l.push(i)}for(t=l.length;t--;)if(l[t])for(N.time.pop(),a=0;a<s;a++)N.data[a].val.pop()}}var u=function(){};return C?J(U.lib.jquery.flot.stack,L):"tsbar"===N.type&&(J(U.lib.jquery.flot.orderbars,L),u=function(a){return a.bars}),O=function(a,e){var t,i;for(VisualJS.ticks=[],t=0,i=e.length;t<i;t++)W.push([t,e[t]]),VisualJS.ticks.push([t,e[t]]);for(t=0,i=a.length;t<i;t++){for(var l=[],n=a[t].val,r=n.length,s=0;s<r;s++)l.push([s,n[s]]);"tsbar"!==N.type||C||1===i?q.push({label:a[t].label,data:l}):q.push({label:a[t].label,data:l,bars:{show:!0,barWidth:.2,order:t+1,lineWidth:2}})}var o=q.length;for(t=0;t<o;t++)P.push({data:q[t].data,label:q[t].label,bars:u(q[t]),shadowSize:G.grid.shadow});E=1<o},v()};switch(Array.max=function(a){return Math.max.apply(Math,a)},N.type){case"xy":J(U.lib.jquery.flot.axisLabels,L),M=F=!(I=!0),B=v(),O=function(a,e,t){var i=function(a){var e,t={label:a.label,data:[],by:Array.isArray(a.by)&&"string"==typeof a.by[0]?a.by:null};if("object"==typeof a.x&&"object"==typeof a.y)for(U.canvas.axis.labelsText={x:a.x.label,y:a.y.label},e=0;e<a.x.val.length;e++)t.data.push([a.x.val[e],a.y.val[e]]);else a.val&&1<=a.val.length&&2==a.val[0].length&&(U.canvas.axis.labelsText={x:a.x,y:a.y},t.data=a.val);return t};if(Array.isArray(a)&&Array.isArray(a[0]))q=[a];else if(Array.isArray(a)&&"object"==typeof a[0]&&!Array.isArray(a[0]))for(var l=0;l<a.length;l++)q.push(i(a[l]))},E=!0;break;case"pyram":J(U.lib.jquery.flot.pyramid,L),F=I=!1,B=v(),O=function(a,e,t){c=Math.max(Array.max(a[0].val),Array.max(a[1].val)),q[0]={label:a[0].label,data:[],pyramid:{direction:"L"}},q[1]={label:a[1].label,data:[]};for(var i=0,l=t.length;i<l;i++)q[0].data[i]=[t[i],a[0].val[i]],q[1].data[i]=[t[i],a[1].val[i]]},M=C=z=!(E=!0);break;case"rank":var ta=[];F=!(I=M=!1),B=v(),z=E=!(O=function(a,e,t){for(var i=[],l=0,n=a.length;l<n;l++){W[l]=[l,void 0!==a[n-l-1][0]?a[n-l-1][0]:t[n-l-1]];var r=void 0!==a[n-l-1][1]?a[n-l-1][1]:a[n-l-1];i.push(r),ta[l]=[r,l]}q={data:ta},c=Array.max(i)});break;case"pie":J(U.lib.jquery.flot.pie,L),F=I=M=!(T=!0),B=v(),O=function(a,e,t){var i,l;if("object"!=typeof t||null===t)for(l=a.length,i=0;i<l;i++)null!==a[i][1]&&q.push({label:a[i][0],data:a[i][1]});else if("number"==typeof a[0])for(l=t.length,i=0;i<l;i++)null!==a[i]&&q.push({label:t[i],data:a[i]})},E=!0;break;case"bar":J(U.lib.jquery.flot.categories,L),F=!(I=!1),B=v(),z=E=!(M=!(O=function(a,e,t){var i,l;if("object"!=typeof t||null===t)for(l=a.length,i=0;i<l;i++)null!==a[i][1]&&q.push(["<span>"+a[i][0]+"</span>",a[i][1]]);else if("number"==typeof a[0])for(l=t.length,i=0;i<l;i++)null!==a[i]&&q.push(["<span>"+t[i]+"</span>",a[i]])}));break;case"tsline":B=H(),M=!(F=!(I=!(z=null)));break;case"tsbar":B=H(),M=!(F=!(I=!(z=!0)))}VisualJS.chart=function(){O(N.data,N.time,N.by),$.fn.UseTooltip=function(h){var b=[];$(this).bind("plothover",function(a,e,t){var i,l,n,r,s,o,u,d,c,p,y,f={},x={};if(t){if(b!=[t.seriesIndex,t.dataIndex])if(b=[t.seriesIndex,t.dataIndex],"xy"===N.type){for(var g in u={x:void 0!==VisualJS.container[h].unit.position.x&&"start"===VisualJS.container[h].unit.position.x,y:void 0!==VisualJS.container[h].unit.position.y&&"start"===VisualJS.container[h].unit.position.y,z:void 0!==VisualJS.container[h].unit.position.z&&"start"===VisualJS.container[h].unit.position.z})d=u[g],u.hasOwnProperty(g)&&(c=VisualJS.container[h].unit.symbol&&"string"==typeof VisualJS.container[h].unit.symbol[g]?VisualJS.container[h].unit.symbol[g]:"",p=VisualJS.container[h].unit.label&&"string"==typeof VisualJS.container[h].unit.label[g]?VisualJS.container[h].unit.label[g]:"",d?(f[g]=c,x[g]=p):(f[g]="",x[g]=" "+p+" "+c),x[g]=""!==x[g]?" "+x[g]:"");o="<div><strong>"+f.x+aa(t.datapoint[0],h,"x")+x.x+"</strong> "+(void 0!==m.xaxis.axisLabel?m.xaxis.axisLabel:"x")+"</div><div><strong>"+f.y+aa(t.datapoint[1],h,"y")+x.y+"</strong> "+(void 0!==m.yaxis.axisLabel?m.yaxis.axisLabel:"y")+"</div>",o+=Array.isArray(q[t.seriesIndex].by)&&"string"==typeof q[t.seriesIndex].by[t.dataIndex]&&""!==q[t.seriesIndex].by[t.dataIndex]?q[t.seriesIndex].by[t.dataIndex]+("string"==typeof q[t.seriesIndex].label&&""!==q[t.seriesIndex].label?" ("+q[t.seriesIndex].label+")":""):"",ea(o,e.pageX,e.pageY)}else i=t.datapoint[0],l=t.datapoint[1],n="bar"!==N.type||Boolean(N.data[0].val)?t.series.label:1<q.length?q[i][0]:q[0][i][0],r="rank"!==N.type?n:W[l][1],s=!!("rank"!==N.type&&"pie"!==N.type&&"bar"!==N.type||"bar"===N.type&&Boolean(N.data[0].val))&&(C||1===q.length?!!(Array.isArray(W)&&0<W.length)&&W[i][1]:"pyram"===N.type?q[e.x<0?0:1].data[t.dataIndex][0]:W[t.dataIndex][1]),o="pyram"===N.type?Math.abs(i):"rank"!==N.type?"tsbar"!==N.type?"pie"===N.type?l[0][1]:l:C||1===q.length?q[t.seriesIndex].data[i][1]:l:i,y="bar"===N.type&&N.by?s?s+(r?VisualJS.container[h].tooltipseparator+r:""):r||"":s?r?r+VisualJS.container[h].tooltipseparator+s:s:r||"",ea(Z(h,y,o),e.pageX,e.pageY)}else $("#"+U.tooltipid).hide(),b=[]})};var m={colors:U.colors.series,series:{stack:z,bars:{show:F,barWidth:.7,align:"center",fill:.9},pie:{show:T,label:{show:!1}},lines:{show:M,lineWidth:G.grid.line},points:{show:I,radius:G.grid.point,fill:.85,fillColor:null}},legend:{show:G.legend&&E,position:Y.position||"ne"},grid:{borderWidth:G.grid.border,hoverable:!0,clickable:!1,mouseActiveRadius:10},xaxis:{show:G.axis.x,axisLabel:void 0!==u(U.canvas.axis,["labelsText","x"])?U.canvas.axis.labelsText.x:void 0,axisLabelUseCanvas:!0,axisLabelFontSizePixels:p=Number($("."+VisualJS.setup.clas).css("font-size").replace("px","")),axisLabelFontFamily:$("."+VisualJS.setup.clas).css("font-family"),axisLabelPadding:p,axisLabelColour:"#545454"},yaxis:{show:G.axis.y,axisLabel:void 0!==u(U.canvas.axis,["labelsText","y"])?U.canvas.axis.labelsText.y:void 0,axisLabelUseCanvas:!0,axisLabelFontSizePixels:p,axisLabelFontFamily:$("."+VisualJS.setup.clas).css("font-family"),axisLabelPadding:p,axisLabelColour:"#545454"}};!function(){var a,e,t,i=VisualJS.id,l=W.length,n=K(VisualJS.arr2html(N.footer,X)||"");if($(R).html("<"+D+' style="overflow:auto;">'+B+"</"+D+'><div class="'+VisualJS.setup.footerclass+'" style="overflow:auto;">'+n+"</div>"),VisualJS.getSize(i)){switch(t=U.typeclassprefix+N.type,$(R+" "+D).after('<div class="'+U.canvasclass+" "+t+" "+VisualJS.visualsize+'" style="width: '+VisualJS.width+"px; height: "+VisualJS.height+'px;"></div>'),m.xaxis.tickFormatter=function(a){return V(a,i,"x")},m.yaxis.tickFormatter=function(a){return V(a,i,"y")},m.xaxis.tickLength=N.axis.ticks.x?null:0,m.yaxis.tickLength=N.axis.ticks.y?null:0,m.grid.markings=N.grid.markings||null,N.type){case"xy":N.range?(N.range.x?Array.isArray(N.range.x)?(m.xaxis.min=N.range.x[0],m.xaxis.max=N.range.x[1]):(m.xaxis.min=0,m.xaxis.max=N.range.x):(m.xaxis.min=null,m.xaxis.max=null),N.range.y?Array.isArray(N.range.x)?(m.yaxis.min=N.range.y[0],m.yaxis.max=N.range.y[1]):(m.yaxis.min=0,m.yaxis.max=N.range.y):(m.yaxis.min=null,m.yaxis.max=null)):(m.xaxis.min=null,m.yaxis.min=null,m.xaxis.max=null,m.yaxis.max=null),m.hooks={drawBackground:function(a,e){var t=a.getXAxes()[0];void 0!==t.ticks&&0<t.ticks.length&&(t.datamin=t.ticks[0].v,t.datamax=t.ticks[t.ticks.length-1].v)}},$.plot(b,q,m);break;case"pyram":m.series.pyramid={show:!0,barWidth:1},m.yaxis.show=11<VisualJS.height/q[0].data.length&&G.axis.y,m.xaxis.max="number"==typeof G.range?c*G.range:Array.isArray(G.range)?G.range[1]:null,m.xaxis.tickFormatter=function(a){return V(a,i,"x",aa)},$.plot(b,q,m);break;case"rank":m.yaxis.tickLength=null,m.series.bars.horizontal=!0,m.yaxis.ticks=11<VisualJS.height/l?W.slice(0):0,!1===N.axis.labels.y&&(m.yaxis.ticks=w(m.yaxis.ticks)),"number"==typeof G.range?m.xaxis.max=c*G.range:Array.isArray(G.range)&&(m.xaxis.min=G.range[0],m.xaxis.max=G.range[1]),m.xaxis.tickFormatter=function(a){return V(a,i,"x",aa)},m.yaxis.autoscaleMargin=0,m.series.bars.barWidth=.5,$.plot(b,[q],m);break;case"pie":$.plot(b,q,m);break;case"bar":if(m.xaxis.tickLength=0,N.by&&N.by.length&&"object"==typeof N.data[0]){for(W=[],q=[],a=0;a<N.by.length;a++)q.push({label:N.by[a],data:[]});for(a=e=0;a<N.data.length;a++){N.data[a].val.length%2==0?W.push([e+(N.data[a].val.length-1)/2,N.data[a].label]):W.push([Math.floor(e+N.data[a].val.length/2),N.data[a].label]);for(var r=0;r<N.data[a].val.length;r++)q[r].data.push([e,N.data[a].val[r]]),e++;e+=2}m.xaxis.ticks=W,!1===N.axis.labels.x&&(m.xaxis.ticks=w(m.xaxis.ticks)),m.bars={show:!0}}else m.xaxis.mode="categories",q=[q],m.yaxis.tickFormatter=function(a){return V(a,i,"y",aa)};"number"!=typeof G.range&&null!==G.range?(m.yaxis.min=G.range[0],m.yaxis.max=G.range[1]):"number"==typeof G.range&&(m.yaxis.min=null,m.yaxis.max=G.range),$.plot(b,q,m),!1!==N.axis.labels.x&&!1!==N.axis.labels.y||(!(p="<style>")===N.axis.labels.x&&(p+=b+" .flot-x-axis .flot-tick-label{display:none;}"),!1===N.axis.labels.y&&(p+=b+" .flot-y-axis .flot-tick-label{display:none;}"),p+="</style>",$(b).append(p));break;case"tsline":null===m.grid.markings&&(m.grid.markings=[{color:"#333333",lineWidth:1,yaxis:{from:0,to:0}}]);case"tsbar":"tsbar"===N.type&&(m.xaxis.tickLength=0),m.yaxis.tickFormatter=function(a){return V(a,i,"y",aa)};var s,o=VisualJS.width/l,u=[],d="01";switch("number"!=typeof G.range&&null!==G.range?(m.yaxis.min=G.range[0],m.yaxis.max=G.range[1]):"number"==typeof G.range&&(m.yaxis.min=null,m.yaxis.max=G.range),VisualJS.ticks[0][1].length){case 4:if(o<33){for(s=16.5<o?2:10.5<o?3:9<o?4:10,a=0;a<l;a++)u[a]=a%s?[W[a][0],""]:[W[a][0],W[a][1]];m.xaxis.ticks=u}else m.xaxis.ticks=W;!1===N.axis.labels.x&&(m.xaxis.ticks=w(m.xaxis.ticks));break;case 5:d="1";case 6:if(o<56){for(a=0;a<l;a++)u[a]=VisualJS.ticks[a][1].slice(4)!==d?[VisualJS.ticks[a][0],""]:[VisualJS.ticks[a][0],VisualJS.ticks[a][1].slice(0,4)],W[a][1]=k(VisualJS.ticks[a][1],VisualJS.id);m.xaxis.ticks=u}else{for(a=0;a<l;a++)W[a][1]=k(VisualJS.ticks[a][1],VisualJS.id);m.xaxis.ticks=W}!1===N.axis.labels.x&&(m.xaxis.ticks=w(m.xaxis.ticks));break;case 7:if(o<55){for(s=20<o?2:10<o?3:4,a=0;a<l;a++)u[a]=a%s?[W[a][0],""]:[W[a][0],W[a][1]];m.xaxis.ticks=u}else m.xaxis.ticks=W;!1===N.axis.labels.x&&(m.xaxis.ticks=w(m.xaxis.ticks));break;default:m.xaxis.ticks=W,!1===N.axis.labels.x&&(m.xaxis.ticks=w(m.xaxis.ticks))}$.plot(b,P,m)}$(b).UseTooltip(VisualJS.id),VisualJS.pub[VisualJS.id].heading=B}}()}}VisualJS.scripts.length&&"object"==typeof LazyLoad?LazyLoad.js(VisualJS.scripts,S):S()}};if(Array.isArray||(Array.isArray=function(a){return"[object Array]"===Object.prototype.toString.call(a)}),"function"!=typeof visual)var visual=VisualJS.load;

/*
Copyright (c) 2018 Institut d'Estadistica de Catalunya (Idescat)
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
VisualJS.setup={//v.1.1.0
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
		heading: "h1",
		footer: "p" //"footer" element not supported by IE8
	},

	//Libraries: path and existence function
	main: { //Do not use relative paths for main files in production: they'll be relative to the path where VisualJS.iframe is executed.
		visual: "https://idescat.github.io/visual/visual.js",
		setup: "https://idescat.github.io/visual/visual.setup.js",
		lazy: "https://idescat.github.io/visual/lib/lazyload.js"
	},
	lib: {
		d3: {
			js: "https://idescat.github.io/visual/lib/d3.v3.js",
			exists: function(){ return typeof d3==="object"; }
		},
		jquery: {
			js: "https://idescat.github.io/visual/lib/jquery.1.8.3.js",
			exists: function(){ return typeof jQuery==="function"; },

			flot: {
				js: "https://idescat.github.io/visual/lib/jquery.flot.js",
				exists: function(){ return typeof jQuery.plot==="function"; },

				stack: {
					js: "https://idescat.github.io/visual/lib/jquery.flot.stack.js",
					exists: function(){ return typeof jQuery.plot.plugins==="object" && typeof jQuery.plot.plugins[0]==="object" && jQuery.plot.plugins[0].name==="stack";  }
				},
				orderbars: {
					js: "https://idescat.github.io/visual/lib/jquery.flot.orderbars.js",
					exists: function(){ return typeof jQuery.plot.plugins==="object" && typeof jQuery.plot.plugins[0]==="object" && jQuery.plot.plugins[0].name==="orderBars"; }
				},
				pyramid: {
					js: "https://idescat.github.io/visual/lib/jquery.flot.pyramid.js",
					exists: function(){ return typeof FlotPyramid==="object"; }
				},
				categories: {
					js: "https://idescat.github.io/visual/lib/jquery.flot.categories.js",
					exists: function(){ return typeof jQuery.plot.plugins==="object" && typeof jQuery.plot.plugins[0]==="object" && jQuery.plot.plugins[0].name==="categories"; }
				},
				pie: {
					js: "https://idescat.github.io/visual/lib/jquery.flot.pie.js",
					exists: function(){ return typeof jQuery.plot.plugins==="object" && typeof jQuery.plot.plugins[0]==="object" && jQuery.plot.plugins[0].name==="pie"; }
				},
				axisLabels: {
					js: "https://idescat.github.io/visual/lib/jquery.flot.axislabels.js",
					exists: function(){ return typeof jQuery.plot.plugins==="object" && typeof jQuery.plot.plugins[0]==="object" && jQuery.plot.plugins.map(function(e){return e.name}).indexOf("axisLabels") !== -1 ; }
				},
			}
		},
		maps: {
			js: "https://idescat.github.io/visual/maps/visual.maps.js",
			exists: function(){ return typeof VisualJS.func.colors==="function" && typeof VisualJS.func.legend==="function";}
		},
		excanvas: {
			js: "https://idescat.github.io/visual/lib/excanvas.js",
			exists: function(){ return typeof G_vmlCanvasManager!=="undefined"; }
		}
	},

	//Maps: path and existence function
	map: {
		eu28: {
			label: "European Union: 28 member countries",
			js: "https://idescat.github.io/visual/maps/eu28.js",
			exists: function(){ return typeof VisualJS.map.eu28!=="undefined"; }
		},
		usastates: {
			label: "USA: states",
			js: "https://idescat.github.io/visual/maps/usa2013states.js",
			exists: function(){ return typeof VisualJS.map.usastates!=="undefined"; }
		},
		norwaymun: {
			label: "Norway: municipalities",
			js: "https://idescat.github.io/visual/maps/norway2013mun.js",
			exists: function(){ return typeof VisualJS.map.norwaymun!=="undefined"; }
		},
		spainnuts2: {
			label: "Spain: NUTS 2",
			js: "https://idescat.github.io/visual/maps/spain2014nuts2.js",
			exists: function(){ return typeof VisualJS.map.spainnuts2!=="undefined"; }
		},
		spainnuts3: {
			label: "Spain: NUTS 3",
			js: "https://idescat.github.io/visual/maps/spain2014nuts3.js",
			exists: function(){ return typeof VisualJS.map.spainnuts3!=="undefined"; }
		},
		prov: {
			label: "Catalonia: NUTS 3",
			js: "https://idescat.github.io/visual/maps/cat2013prov.js",
			exists: function(){ return typeof VisualJS.map.prov!=="undefined"; }
		},
		com: {
			label: "Catalonia: counties (before 2015)",
			js: "https://idescat.github.io/visual/maps/cat2013com.js",
			exists: function(){ return typeof VisualJS.map.com!=="undefined"; }
		},
		com2015: {
			label: "Catalonia: counties",
			js: "https://idescat.github.io/visual/maps/cat2015com.js",
			exists: function(){ return typeof VisualJS.map.com2015!=="undefined"; }
		},
		mun: {
			label: "Catalonia: municipalities",
			js: "https://idescat.github.io/visual/maps/cat2013mun.js",
			exists: function(){ return typeof VisualJS.map.mun!=="undefined"; }
		},
		prov08: {
			label: "Catalonia. Province of Barcelona: municipalities",
			js: "https://idescat.github.io/visual/maps/prov082013mun.js",
			exists: function(){ return typeof VisualJS.map.prov08!=="undefined"; }
		},
		prov17: {
			label: "Catalonia. Province of Girona: municipalities",
			js: "https://idescat.github.io/visual/maps/prov172013mun.js",
			exists: function(){ return typeof VisualJS.map.prov17!=="undefined"; }
		},
		prov25: {
			label: "Catalonia. Province of Lleida: municipalities",
			js: "https://idescat.github.io/visual/maps/prov252013mun.js",
			exists: function(){ return typeof VisualJS.map.prov25!=="undefined"; }
		},
		prov43: {
			label: "Catalonia. Province of Tarragona: municipalities",
			js: "https://idescat.github.io/visual/maps/prov432013mun.js",
			exists: function(){ return typeof VisualJS.map.prov43!=="undefined"; }
		},
		com01: {
			label: "Catalonia. L'Alt Camp: municipalities",
			js: "https://idescat.github.io/visual/maps/com012013mun.js",
			exists: function(){ return typeof VisualJS.map.com01!=="undefined"; }
		},
		com02: {
			label: "Catalonia. L'Alt Empordà: municipalities",
			js: "https://idescat.github.io/visual/maps/com022013mun.js",
			exists: function(){ return typeof VisualJS.map.com02!=="undefined"; }
		},
		com03: {
			label: "Catalonia. L'Alt Penedès: municipalities",
			js: "https://idescat.github.io/visual/maps/com032013mun.js",
			exists: function(){ return typeof VisualJS.map.com03!=="undefined"; }
		},
		com04: {
			label: "Catalonia. L'Alt Urgell: municipalities",
			js: "https://idescat.github.io/visual/maps/com042013mun.js",
			exists: function(){ return typeof VisualJS.map.com04!=="undefined"; }
		},
		com05: {
			label: "Catalonia. L'Alta Ribagorça: municipalities",
			js: "https://idescat.github.io/visual/maps/com052013mun.js",
			exists: function(){ return typeof VisualJS.map.com05!=="undefined"; }
		},
		com06: {
			label: "Catalonia. L'Anoia: municipalities",
			js: "https://idescat.github.io/visual/maps/com062013mun.js",
			exists: function(){ return typeof VisualJS.map.com06!=="undefined"; }
		},
		com072015: {
			label: "Catalonia. El Bages: municipalities",
			js: "https://idescat.github.io/visual/maps/com072015mun.js",
			exists: function(){ return typeof VisualJS.map.com072015!=="undefined"; }
		},
		com07: {
			label: "Catalonia. El Bages: municipalities (before 2015)",
			js: "https://idescat.github.io/visual/maps/com072013mun.js",
			exists: function(){ return typeof VisualJS.map.com07!=="undefined"; }
		},
		com08: {
			label: "Catalonia. El Baix Camp: municipalities",
			js: "https://idescat.github.io/visual/maps/com082013mun.js",
			exists: function(){ return typeof VisualJS.map.com08!=="undefined"; }
		},
		com09: {
			label: "Catalonia. El Baix Ebre: municipalities",
			js: "https://idescat.github.io/visual/maps/com092013mun.js",
			exists: function(){ return typeof VisualJS.map.com09!=="undefined"; }
		},
		com10: {
			label: "Catalonia. El Baix Empordà: municipalities",
			js: "https://idescat.github.io/visual/maps/com102013mun.js",
			exists: function(){ return typeof VisualJS.map.com10!=="undefined"; }
		},
		com11: {
			label: "Catalonia. El Baix Llobregat: municipalities",
			js: "https://idescat.github.io/visual/maps/com112013mun.js",
			exists: function(){ return typeof VisualJS.map.com11!=="undefined"; }
		},
		com12: {
			label: "Catalonia. El Baix Penedès: municipalities",
			js: "https://idescat.github.io/visual/maps/com122013mun.js",
			exists: function(){ return typeof VisualJS.map.com12!=="undefined"; }
		},
		com13: {
			label: "Catalonia. El Barcelonès: municipalities",
			js: "https://idescat.github.io/visual/maps/com132013mun.js",
			exists: function(){ return typeof VisualJS.map.com13!=="undefined"; }
		},
		com14: {
			label: "Catalonia. El Berguedà: municipalities",
			js: "https://idescat.github.io/visual/maps/com142013mun.js",
			exists: function(){ return typeof VisualJS.map.com14!=="undefined"; }
		},
		com15: {
			label: "Catalonia. La Cerdanya: municipalities",
			js: "https://idescat.github.io/visual/maps/com152013mun.js",
			exists: function(){ return typeof VisualJS.map.com15!=="undefined"; }
		},
		com16: {
			label: "Catalonia. La Conca de Barberà: municipalities",
			js: "https://idescat.github.io/visual/maps/com162013mun.js",
			exists: function(){ return typeof VisualJS.map.com16!=="undefined"; }
		},
		com17: {
			label: "Catalonia. El Garraf: municipalities",
			js: "https://idescat.github.io/visual/maps/com172013mun.js",
			exists: function(){ return typeof VisualJS.map.com17!=="undefined"; }
		},
		com18: {
			label: "Catalonia. Les Garrigues: municipalities",
			js: "https://idescat.github.io/visual/maps/com182013mun.js",
			exists: function(){ return typeof VisualJS.map.com18!=="undefined"; }
		},
		com19: {
			label: "Catalonia. La Garrotxa: municipalities",
			js: "https://idescat.github.io/visual/maps/com192013mun.js",
			exists: function(){ return typeof VisualJS.map.com19!=="undefined"; }
		},
		com20: {
			label: "Catalonia. El Gironès: municipalities",
			js: "https://idescat.github.io/visual/maps/com202013mun.js",
			exists: function(){ return typeof VisualJS.map.com20!=="undefined"; }
		},
		com21: {
			label: "Catalonia. El Maresme: municipalities",
			js: "https://idescat.github.io/visual/maps/com212013mun.js",
			exists: function(){ return typeof VisualJS.map.com21!=="undefined"; }
		},
		com22: {
			label: "Catalonia. El Montsià: municipalities",
			js: "https://idescat.github.io/visual/maps/com222013mun.js",
			exists: function(){ return typeof VisualJS.map.com22!=="undefined"; }
		},
		com23: {
			label: "Catalonia. La Noguera: municipalities",
			js: "https://idescat.github.io/visual/maps/com232013mun.js",
			exists: function(){ return typeof VisualJS.map.com23!=="undefined"; }
		},
		com242015: {
			label: "Catalonia. Osona: municipalities",
			js: "https://idescat.github.io/visual/maps/com242015mun.js",
			exists: function(){ return typeof VisualJS.map.com242015!=="undefined"; }
		},
		com24: {
			label: "Catalonia. Osona: municipalities (before 2015)",
			js: "https://idescat.github.io/visual/maps/com242013mun.js",
			exists: function(){ return typeof VisualJS.map.com24!=="undefined"; }
		},
		com25: {
			label: "Catalonia. El Pallars Jussà: municipalities",
			js: "https://idescat.github.io/visual/maps/com252013mun.js",
			exists: function(){ return typeof VisualJS.map.com25!=="undefined"; }
		},
		com26: {
			label: "Catalonia. El Pallars Sobirà: municipalities",
			js: "https://idescat.github.io/visual/maps/com262013mun.js",
			exists: function(){ return typeof VisualJS.map.com26!=="undefined"; }
		},
		com27: {
			label: "Catalonia. El Pla d'Urgell: municipalities",
			js: "https://idescat.github.io/visual/maps/com272013mun.js",
			exists: function(){ return typeof VisualJS.map.com27!=="undefined"; }
		},
		com28: {
			label: "Catalonia. El Pla de l'Estany: municipalities",
			js: "https://idescat.github.io/visual/maps/com282013mun.js",
			exists: function(){ return typeof VisualJS.map.com28!=="undefined"; }
		},
		com29: {
			label: "Catalonia. El Priorat: municipalities",
			js: "https://idescat.github.io/visual/maps/com292013mun.js",
			exists: function(){ return typeof VisualJS.map.com29!=="undefined"; }
		},
		com30: {
			label: "Catalonia. La Ribera d'Ebre: municipalities",
			js: "https://idescat.github.io/visual/maps/com302013mun.js",
			exists: function(){ return typeof VisualJS.map.com30!=="undefined"; }
		},
		com31: {
			label: "Catalonia. El Ripollès: municipalities",
			js: "https://idescat.github.io/visual/maps/com312013mun.js",
			exists: function(){ return typeof VisualJS.map.com31!=="undefined"; }
		},
		com32: {
			label: "Catalonia. La Segarra: municipalities",
			js: "https://idescat.github.io/visual/maps/com322013mun.js",
			exists: function(){ return typeof VisualJS.map.com32!=="undefined"; }
		},
		com33: {
			label: "Catalonia. El Segrià: municipalities",
			js: "https://idescat.github.io/visual/maps/com332013mun.js",
			exists: function(){ return typeof VisualJS.map.com33!=="undefined"; }
		},
		com34: {
			label: "Catalonia. La Selva: municipalities",
			js: "https://idescat.github.io/visual/maps/com342013mun.js",
			exists: function(){ return typeof VisualJS.map.com34!=="undefined"; }
		},
		com35: {
			label: "Catalonia. El Solsonès: municipalities",
			js: "https://idescat.github.io/visual/maps/com352013mun.js",
			exists: function(){ return typeof VisualJS.map.com35!=="undefined"; }
		},
		com36: {
			label: "Catalonia. El Tarragonès: municipalities",
			js: "https://idescat.github.io/visual/maps/com362013mun.js",
			exists: function(){ return typeof VisualJS.map.com36!=="undefined"; }
		},
		com37: {
			label: "Catalonia. La Terra Alta: municipalities",
			js: "https://idescat.github.io/visual/maps/com372013mun.js",
			exists: function(){ return typeof VisualJS.map.com37!=="undefined"; }
		},
		com38: {
			label: "Catalonia. L'Urgell: municipalities",
			js: "https://idescat.github.io/visual/maps/com382013mun.js",
			exists: function(){ return typeof VisualJS.map.com38!=="undefined"; }
		},
		com39: {
			label: "Catalonia. La Val d'Aran: municipalities",
			js: "https://idescat.github.io/visual/maps/com392013mun.js",
			exists: function(){ return typeof VisualJS.map.com39!=="undefined"; }
		},
		com40: {
			label: "Catalonia. El Vallès Occidental: municipalities",
			js: "https://idescat.github.io/visual/maps/com402013mun.js",
			exists: function(){ return typeof VisualJS.map.com40!=="undefined"; }
		},
		com412015: {
			label: "Catalonia. El Vallès Oriental: municipalities",
			js: "https://idescat.github.io/visual/maps/com412015mun.js",
			exists: function(){ return typeof VisualJS.map.com412015!=="undefined"; }
		},
		com41: {
			label: "Catalonia. El Vallès Oriental: municipalities (before 2015)",
			js: "https://idescat.github.io/visual/maps/com412013mun.js",
			exists: function(){ return typeof VisualJS.map.com41!=="undefined"; }
		},
		com422015: {
			label: "Catalonia. El Moianès: municipalities",
			js: "https://idescat.github.io/visual/maps/com422015mun.js",
			exists: function(){ return typeof VisualJS.map.com422015!=="undefined"; }
		},
		at: {
			label: "Catalonia. Regions of the Territorial Plan",
			js: "https://idescat.github.io/visual/maps/cat2014at.js",
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
