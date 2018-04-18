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
var VisualJS={version:"1.0.6",show:!0,old:!1,fixed:null,width:500,bwidth:500,height:500,normal:500,scripts:[],map:{},container:{},pub:{},func:{},callback:null,getSize:function(a){var e=VisualJS.setup,t=e.html.heading,i="."+VisualJS.setup.footerclass,l="undefined"!=typeof jQuery?jQuery:"undefined"!=typeof d3?d3.select:document.querySelectorAll.bind(document),n=window,r=document,s=r.documentElement,o=r.getElementsByTagName("body")[0],u=r.getElementById(a),d=function(a,e){return"function"==typeof getComputedStyle?getComputedStyle(a)[e]:a.currentStyle[e]},c=function(a){var e=l(a);return e[0]instanceof Element?e[0]:e[0]&&e[0][0]?e[0][0]:void 0},p=function(a){if(a){var e=a.offsetHeight;d(a);return e+=Math.round(parseFloat(d(a,"marginTop"))+parseFloat(d(a,"marginBottom")))}return 0},y=p(c(t)),f=p(c(i)),x=n.innerHeight||s.clientHeight||o.clientHeight,g=Math.round(parseFloat(d(u,"marginTop"))+parseFloat(d(u,"marginBottom")));return void 0!==x&&void 0!==y&&void 0!==f&&(null===VisualJS.fixed?(VisualJS.bwidth=n.innerWidth||s.clientWidth||o.clientWidth,VisualJS.width=VisualJS.bwidth-e.padding.w,VisualJS.height=Math.floor(x-y-f-g-10)):(VisualJS.bwidth=s.clientWidth||o.clientWidth,VisualJS.width=VisualJS.fixed[0]-e.padding.w,VisualJS.height=Math.floor(VisualJS.fixed[1]-y-f-g-10))),VisualJS.visualsize=VisualJS.width<VisualJS.normal?e.mini:e.normal,10<VisualJS.width&&10<VisualJS.height},arr2html:function(a,e){var t="";return void 0===a||(Array.isArray(a)?a.forEach(function(a){"string"==typeof a&&""!==a&&(t+="<"+e.footer+">"+a+"</"+e.footer+">")}):"string"==typeof a&&""!==a&&(t+="<"+e.footer+">"+a+"</"+e.footer+">")),t},iframe:function(a,e){var t,i,l,n,r,s,o=VisualJS.setup,u="string"==typeof a.clas?a.clas:o.clas,d='<!DOCTYPE html>\n\x3c!--[if lt IE 7]><html class="lt-ie9 lt-ie8 lt-ie7"> <![endif]--\x3e\n\x3c!--[if IE 7]><html class="lt-ie9 lt-ie8"> <![endif]--\x3e\n\x3c!--[if IE 8]><html class="lt-ie9"> <![endif]--\x3e\n\x3c!--[if gt IE 8]>\x3c!--\x3e <html> \x3c!--<![endif]--\x3e\n<head>';"string"==typeof e&&(-1===e.indexOf("{")?d+='<link href="'+e+'" rel="stylesheet" type="text/css"/>':d+='<style type="text/css">'+e+"</style>"),d+='<script type="text/javascript" src="'+VisualJS.setup.main.visual+'"><\/script>',d+='<script type="text/javascript" src="'+VisualJS.setup.main.setup+'"><\/script>',d+='<script type="text/javascript" src="'+VisualJS.setup.main.lazy+'"><\/script>',d+='</head><body><div id="'+a.id+'" class="'+u+'"></div><script>window.setTimeout(function(){visual('+JSON.stringify(a)+");},1);<\/script></body></html>",n=document,r=n.createElement("iframe"),s=n.getElementById(a.id),r.frameBorder="0",r.scrolling="no",s.parentNode.insertBefore(r,s.nextSibling),i=d,void 0!==(t=r)&&(t.contentDocument?l=t.contentDocument:t.contentWindow?l=t.contentWindow.document:window.frames[t.name]&&(l=window.frames[t.name].document),l&&(l.open(),l.write(i),l.close()))},compare:function(i){var a,l=VisualJS.setup,n=VisualJS.setup.separator,r="string"==typeof i.id?i.id:l.id,e="[object Array]"===Object.prototype.toString.call(i.css)?0===i.css.length?["",""]:1===i.css.length?[i.css[0],i.css[0]]:i.css:[i.css,i.css],t=document,s=t.createElement(l.html.heading),o="string"==typeof i.title?i.title:"",u=t.createElement(l.html.footer),d=l.html,c="string"==typeof i.footer?VisualJS.arr2html(i.footer,d):"",p=t.getElementById(r),y=t.createElement("div"),f=t.createElement("style"),x=function(){if(VisualJS.getSize(r)){var a=VisualJS.height+("string"==typeof i.footer&&""!==i.footer?14:0),e=VisualJS.width+l.margin,t="iframe{ float: left; width: "+Math.floor((e-n)/2-l.margin)+"px; height:"+a+"px; }";f.styleSheet?f.styleSheet.cssText=t:f.innerHTML=t,y.style.height=a+"px"}};s.innerHTML=o,s.style.overflow="auto",u.innerHTML=c,u.style.overflow="auto",u.style.clear="both",p.appendChild(s),p.appendChild(u),t.getElementsByTagName("head")[0].appendChild(f),y.style.width=n+"px","styleFloat"in y.style?y.style.styleFloat="left":y.style.cssFloat="left";for(var g=0;g<2;g++)a=t.createElement("span"),"string"!=typeof i.load[g].id&&(i.load[g].id=l.compareids[g]),a.id=i.load[g].id,p.insertBefore(a,u),VisualJS.iframe(i.load[g],e[g]);p.insertBefore(y,a),x(),window.addEventListener?window.addEventListener("resize",x,!1):window.attachEvent?window.attachEvent("onresize",x):window.onresize=x},load:function(a){var e=function(e){var a,t=function(a){e.source.postMessage(JSON.stringify(a),"*")};if("string"==typeof e.data?a=JSON.parse(e.data):"object"==typeof e.data&&(a=e.data),a)if(void 0===a.action)t({type:"error",data:[{id:"400",label:'"action" is required.'}]});else if("send"===a.action){var i=a.id||VisualJS.id,l=VisualJS.container[i]||VisualJS.container[i];if(l){if("cmap"===l.type&&!l.data[0].hasOwnProperty("label")){for(var n=[],r=VisualJS.map[l.by],s=r.features.length;s--;)n[r.features[s].properties[r.id]]=r.features[s].properties[r.label];for(var o=l.data,u=o.length;u--;)o[u].label=n[o[u].id]}t(l)}else t({type:"error",data:[{id:"404",label:'A visualisation with the specified "id" was not found'}]})}else t({type:"error",data:[{id:"400",label:'"action" value is not correct.'}]})};if(void 0===VisualJS.setup&&window.alert("Visual: Setup not found (visual.setup.js)!"),"[object Array]"!==Object.prototype.toString.call(a))VisualJS.get(a);else for(var t=0,i=a.length;t<i;t++)VisualJS.get(a[t]);VisualJS.container[VisualJS.id].listen&&(window.addEventListener?window.addEventListener("message",e,!1):window.attachEvent("onmessage",e))},get:function(H){var d,c,a,e,t,i,l,n,N=VisualJS.setup,X=N.html,Y=N.canvas,U=X.heading,D="."+VisualJS.setup.footerclass,r=VisualJS.old||N.func.old("ie9"),s=function(a,e,t){"string"==typeof a?e.match(typeof H[a])||(H[a]=t[a]):e.match(typeof o(H,a))||u(H,a,o(t,a))},o=function(a,e){for(var t=a,i=0;i<e.length;i++){if(void 0===t[e[i]]){t=void 0;break}t=t[e[i]]}return t},u=function(a,e,t){for(var i=a,l=0;l<=e.length-2;l++)void 0===i[e[l]]&&(i[e[l]]={}),i=i[e[l]];i[e[e.length-1]]=t},p=function(a){return"object"==typeof a&&null!==a},y=function(){var a="invalid";return Array.isArray(H.data)&&(Array.isArray(H.data[0])?a="array":p(H.data[0])&&(a=p(H.data[0].z)?"xyz":p(H.data[0].y)?"xy":void 0!==H.data[0].x||void 0!==H.data[0].y||!Array.isArray(H.data[0].val)||null===H.data[0].val[0]||2!=H.data[0].val[0].length&&3!=H.data[0].val[0].length?"object":"points")),a},f=[["show","boolean",VisualJS],["callback","function",VisualJS],["id","string",N],["listen","boolean",N],["dec","number|object",Y],["autoheading","boolean",Y],["legend","boolean",Y],["grid","object",Y],[["grid","border"],"number",Y],[["grid","shadow"],"number",Y],[["grid","line"],"number",Y],[["grid","point"],"number",Y],["axis","object",Y],[["axis","x"],"boolean",Y],[["axis","y"],"boolean",Y],[["axis","labels","x"],"boolean",Y],[["axis","labels","y"],"boolean",Y],[["axis","ticks","x"],"boolean",Y],[["axis","ticks","y"],"boolean",Y]];void 0===Y.axis.labels&&(Y.axis.labels={x:!0,y:!0}),void 0===Y.axis.ticks&&(Y.axis.ticks={x:!0,y:!0});for(var x=0;x<f.length;x++)s(f[x][0],f[x][1],f[x][2]);VisualJS.id=H.id,VisualJS.pub[VisualJS.id]={heading:null,legend:null},"object"==typeof H.fixed&&(VisualJS.fixed=H.fixed),"object"==typeof H.unit&&null!==H.unit?(s(["unit","label"],"string|object",Y),s(["unit","symbol"],"string|object",Y),s(["unit","position"],"string|object",Y)):H.unit=Y.unit,H.range=(a=H.range,i=y(),l=[],"object"!=typeof a||null===a||Array.isArray(a)||"array"!==i&&"object"!==i||"xy"===H.type||(a="rank"===H.type||"pyram"===H.type?a.x:a.y),Array.isArray(a)&&2===a.length&&null===a[0]&&null===a[1]?H.data&&"object"===i&&(H.data.forEach(function(a){l=l.concat(a.val)}),e=Math.min.apply(null,l),t=Math.max.apply(null,l),0<=e&&0<=t?a=[0,null]:e<=0&&t<=0&&(a=[null,0])):"object"==typeof a&&!Array.isArray(a)&&null!==a&&(Array.isArray(a.x)&&null===a.x[0]&&null===a.x[1]||Array.isArray(a.y)&&null===a.y[0]&&null===a.y[1])?(l={x:[],y:[]},e={x:[],y:[]},t={x:[],y:[]},"points"===i?H.data.forEach(function(a){a.val.forEach(function(a){l.x.push(a[0]),l.y.push(a[1])})}):"xy"!==i&&"xyz"!==i||H.data.forEach(function(a){l.x=l.x.concat(a.x.val),l.y=l.y.concat(a.y.val)}),e.x=Math.min.apply(null,l.x),t.x=Math.max.apply(null,l.x),e.y=Math.min.apply(null,l.y),t.y=Math.max.apply(null,l.y),Array.isArray(a.x)&&null===a.x[0]&&null===a.x[1]&&(0<=e.x&&0<=t.x?a.x=[0,null]:e.x<=0&&t.x<=0?a.x=[null,0]:a.x=[null,null]),Array.isArray(a.y)&&null===a.y[0]&&null===a.y[1]&&(0<=e.y&&0<=t.y?a.y=[0,null]:e.y<=0&&t.y<=0?a.y=[null,0]:a.y=[null,null])):"xy"!==i&&"xyz"!==i&&"points"!==i||("number"==typeof a||Array.isArray(a)?a={x:[null,null],y:Array.isArray(a)?a:[null,a]}:"object"==typeof a&&null!==a||(a={x:[null,null],y:[null,null]})),a),H.lang=H.lang||N.i18n.lang,"number"==typeof H.range||void 0!==(n=H.range)&&"[object Array]"===Object.prototype.toString.call(n)&&2===n.length&&"number"==typeof n[0]&&"number"==typeof n[1]&&n[0]<n[1]||("object"!=typeof H.range||null===H.range||Array.isArray(H.range))&&(H.range="number"==typeof H.range||Array.isArray(H.range)&&2===H.range.length?H.range:Y.range.hasOwnProperty(H.type)&&"number"==typeof Y.range[H.type]?Y.range[H.type]:null),H.unit=function(a){var e;y();for(var t in a)a.hasOwnProperty(t)&&(e=a[t],"xy"===H.type||("rank"===H.type||"pyram"===H.type?e&&void 0!==e.x?a[t]=e.x:a[t]="string"==typeof e?e:"":e&&void 0!==e.y?a[t]=e.y:a[t]="string"==typeof e?e:""));return a}(H.unit),VisualJS.container[VisualJS.id]=H;var g,Q="#"+VisualJS.id,h=Q+" ."+N.canvasclass,R=VisualJS.container[VisualJS.id],b=function(){if(!1===R.autoheading)return R.title||"";var a,t=[],e=function(a,e){"string"==typeof a&&""!==a&&(!0===e&&(a='<span class="'+VisualJS.setup.nowrapclass+'">'+a+"</span>"),t.push(a))};null!==R.time&&"object"==typeof R.time?a=V(R.time[0],VisualJS.id)+"&ndash;"+V(R.time[R.time.length-1],VisualJS.id):a=V(R.time,VisualJS.id);return e(R.title,!1),e(R.geo,!0),e(a,!0),G(t.join(". "))},m=function(){var a=!1;"function"==typeof VisualJS.chart&&(w(),R.show&&VisualJS.chart(),window.addEventListener?window.addEventListener("resize",g,!1):window.attachEvent?window.attachEvent("onresize",g):window.onresize=g,a=!0),null!==R.callback&&R.callback.call({id:VisualJS.id,chart:a,heading:VisualJS.pub[VisualJS.id].heading,legend:VisualJS.pub[VisualJS.id].legend})},G=function(a){return String(a).replace(/&amp;/g,"&")},v=function(a,e){return(!e||!a.exists.call())&&(VisualJS.scripts.push(a.js),!0)},K=function(a,e,t){var i="number"==typeof t&&""!==VisualJS.container[a].unit.label?" "+VisualJS.container[a].unit.label:"",l="number"==typeof t?VisualJS.container[a].unit.symbol:"",n=_(t,a),r=n!==VisualJS.setup.i18n.text.na[VisualJS.container[a].lang]?"end"===VisualJS.container[a].unit.position?n+i+(""!==l?" "+l:l):l+n+i:n;return e?"<strong>"+r+"</strong> "+e:r},Z=function(a,e,t){var i="number"==typeof t?VisualJS.container[a].unit.symbol:"",l=_(t,a),n=l!==VisualJS.setup.i18n.text.na[VisualJS.container[a].lang]?"end"===VisualJS.container[a].unit.position?l+""+(""!==i?" "+i:i):i+l+"":l;return e?"<strong>"+n+"</strong> "+e:n},S=function(a,e,t,i){return H.axis.labels[t]?"function"==typeof i?i(a,e,t):_(a,e,t):""},J=function(a){for(var e=[],t=0;t<a.length;t++)Array.isArray(a[t])?e.push([a[t][0],""]):e.push([a[t],""]);return e},_=function(a,e,t){if(null==a)return VisualJS.setup.i18n.text.na[VisualJS.container[e].lang];if("number"==typeof a){for(var i=/(\d+)(\d{3})/,l=("object"==typeof VisualJS.container[e].dec&&null!==VisualJS.container[e].dec&&"string"==typeof t&&"number"==typeof VisualJS.container[e].dec[t]?a.toFixed(VisualJS.container[e].dec[t]):"number"==typeof VisualJS.container[e].dec?a.toFixed(VisualJS.container[e].dec):String(a)).split("."),n=l[0],r=1<l.length?VisualJS.setup.i18n.text.dec[VisualJS.container[e].lang]+l[1]:"";i.test(n);)n=n.replace(i,"$1"+VisualJS.setup.i18n.text.k[VisualJS.container[e].lang]+"$2");return n+r}return""},V=function(a,e){var t;if(!a)return null;if(isNaN(a))return a;switch(a.length){case 5:t="quarter";break;case 6:t="month";break;default:return a}var i=VisualJS.setup.i18n.text[t];if(void 0===i)return a;var l=i[VisualJS.container[e].lang];if(void 0===l)return a;var n=l[a.slice(4)-1];return void 0===n?a:n+" <span>"+a.slice(0,4)+"</span>"},aa=function(a,e,t){var i=document.getElementById(VisualJS.setup.tooltipid),l=VisualJS.bwidth-VisualJS.setup.margin,n={};i.innerHTML=a,i.style.display="block";var r=i.clientWidth/2;n.x=e-r,n.y=t-i.clientHeight-5,l<e+r?n.x-=e+r-l:n.x<VisualJS.setup.margin&&(n.x+=VisualJS.setup.margin-n.x),n.y<VisualJS.setup.margin&&(n.y+=1.75*i.clientHeight),i.style.left=n.x+"px",i.style.top=n.y+"px"},w=function(){var a=document;if(!a.getElementById(VisualJS.setup.tooltipid)){var e=a.createElement("div");e.id=VisualJS.setup.tooltipid,e.style.display="none",a.body.appendChild(e)}};if("cmap"===H.type)if(r)document.getElementById(VisualJS.id).innerHTML="<p>"+N.i18n.text.oldbrowser[R.lang]+"</p>";else{if("string"!=typeof H.by)return;v(N.lib.maps,!0),v(N.lib.d3,!0),v(N.map[H.by],!0),VisualJS.chart=function(){var M=b(),z=VisualJS.map[H.by],I=z.area[0],F=z.area[1],O="object"==typeof H.grouped&&"object"==typeof H.grouped.label&&0<H.grouped.label.length&&H.data[0].hasOwnProperty("group"),T=H.data[0].hasOwnProperty("val"),B=O?H.grouped.label.length:T?N.colors.map.max:1,$=N.colorclassprefix,W=VisualJS.func.colors(N.colors.map.base,B,"fill",$,O&&"object"==typeof H.grouped.color&&H.grouped.color.length===H.grouped.label.length?H.grouped.color:[],VisualJS.id),q=d3.select(Q),a=d3.geo[z.projection](),e=("object"==typeof z.center&&"function"==typeof a.center?a.center(z.center):a).scale(z.scale).translate([I/2,F/2]),P=d3.geo.path().projection(e),C=d3.select("#"+N.tooltipid);(g=function(){var a=G(VisualJS.arr2html(H.footer,X)||"");if(q.html("<"+U+' style="overflow:auto;"></'+U+'><div class="'+VisualJS.setup.footerclass+'" style="overflow:auto;"></div>'),d3.select(Q+" "+U).html(M),d3.select(Q+" "+D).html(a),VisualJS.getSize(VisualJS.id)){var e,t,i,l,n,r,s=VisualJS.id,o=d3.map(),u=d3.map(),d=H.data[0].hasOwnProperty("label"),c=[],p=function(){},y=VisualJS.height/F,f=VisualJS.width/I,x=Math.min(Math.round(I*y),VisualJS.width),g=Math.min(Math.round(F*f),VisualJS.height),h=Math.floor((VisualJS.width-x)/2),b=Math.floor((VisualJS.height-g)/2),m=y<f?y:f,v=q.insert("svg:svg",D).attr("viewBox","0 0 "+x+" "+g).attr("width",x).attr("height",g);O&&T?(r=[],[1,H.grouped.label.length].forEach(function(a){for(var e=0;e<H.data.length;e++)if(H.data[e].group===a){r.push(H.data[e].val);break}}),r[0]>r[1]?void 0===VisualJS.colorOrder&&(VisualJS.colorOrder=!1):void 0===VisualJS.colorOrder&&(VisualJS.colorOrder=!0)):O&&H.grouped.color&&(W=H.grouped.color),O?(e=d3.map(),p=function(a,e){a.set(e.id,e.group)},i=function(a,e,t){return T&&!VisualJS.colorOrder?$+(d3.keys(a).length-a.get(t[z.id])):$+(a.get(t[z.id])-1)},t=function(a,e){var t=H.grouped.label[a.get(e[z.id])-1],i=d?u.get(e[z.id]):e[z.label];return void 0!==t&&(i+=" <em>"+t+"</em>"),i},VisualJS.func.legend):(T?(i=function(a,e,t,i,l){var n=e.get(t[z.id]);return void 0===n?"":i===l?$+(B/2).toFixed(0):d3.scale.quantize().domain([i,l]).range(d3.range(B).map(function(a){return $+a}))(n)},VisualJS.func.legend):i=function(a,e,t){return""!==e.get(t[z.id])?"":$+(B-1)},t=function(a,e){return d?u.get(e[z.id]):e[z.label]});for(var S=0,J=H.data,V=J.length;S<V;S++){var w=J[S];w.hasOwnProperty("val")?null!==w.val&&(o.set(w.id,w.val),c.push(w.val)):o.set(w.id,""),d&&u.set(w.id,w.label),p(e,w)}c.sort(function(a,e){return a-e});var k=c[0],A=c[V-1];if("number"==typeof R.range?(l=d3.quantile(c,R.range),n=d3.quantile(c,1-R.range)):(l=R.range[0],n=R.range[1]),v.style("margin-left",h+"px"),v.style("margin-top",b+"px"),v.style("margin-bottom",b+"px"),v.append("g").attr("class",N.areaclass).attr("transform","scale("+m+")").selectAll("path").data(z.features).enter().append("svg:path").attr("class",function(a){return""===a.properties[z.id]||""===a.properties[z.label]||!T&&void 0===o.get(a.properties[z.id])?$+"nohover":i(e,o,a.properties,l,n)}).attr("d",P).on("mousemove",function(a){""!==a.properties[z.id]&&""!==a.properties[z.label]&&(T||O||void 0!==o.get(a.properties[z.id]))&&aa(K(s,t(e,a.properties),o.get(a.properties[z.id])),d3.event.pageX,d3.event.pageY)}).on("mouseout",function(){return C.style("display","none")}),T||O){var j=[K(s,null,l),K(s,null,n)],E=[W[W.length-1],W[0]],L=[l<k||_(l,s)===_(k,s),A<n||_(n,s)===_(A,s)];R.legend&&(O?(VisualJS.pub[VisualJS.id].legend={color:E},void 0===H.grouped.color&&(H.grouped.color=W),VisualJS.func.groupLegend(j,v,C,g,L,H,Y,VisualJS.colorOrder)):T&&(j=[Z(s,null,l),Z(s,null,n)],VisualJS.pub[VisualJS.id].legend={color:E,text:j,symbol:[L[0]?"==":"<=",L[1]?"==":">="]},VisualJS.func.legend(j,W,v,C,g,L,H.unit.label)))}VisualJS.pub[VisualJS.id].heading=M}})()}}else{var k;v(N.lib.jquery,!0)?(k=!1,v(N.lib.jquery.flot,!1)):k=!v(N.lib.jquery.flot,!0),r&&v(N.lib.excanvas,!0);var A,j,E,L,M,z,I,F=function(){},O=[],T=[],B=[],W=H.stacked||!1,q=function(){if(R.autoheading){var a,e,t,i,l,n,r=H.time.length,s=H.data.length;if(null===H.data[0].val[0]){for(i=!(e=0),l=[];e<r;e++){for(a=0;a<s;a++)i=i&&null===H.data[a].val[e];if(!i)break;l.push(i)}for(n=l.length,t=0;t<n;t++)if(l[t])for(H.time.shift(),a=0;a<s;a++)H.data[a].val.shift();r=H.time.length}if(null===H.data[0].val[r-1]){for(e=r,i=!0,l=[];e--;){for(a=0,s=H.data.length;a<s;a++)i=i&&null===H.data[a].val[e];if(!i)break;l.push(i)}for(t=l.length;t--;)if(l[t])for(H.time.pop(),a=0;a<s;a++)H.data[a].val.pop()}}var u=function(){};return W?v(N.lib.jquery.flot.stack,k):"tsbar"===H.type&&(v(N.lib.jquery.flot.orderbars,k),u=function(a){return a.bars}),F=function(a,e){var t,i;for(VisualJS.ticks=[],t=0,i=e.length;t<i;t++)T.push([t,e[t]]),VisualJS.ticks.push([t,e[t]]);for(t=0,i=a.length;t<i;t++){for(var l=[],n=a[t].val,r=n.length,s=0;s<r;s++)l.push([s,n[s]]);"tsbar"!==H.type||W||1===i?O.push({label:a[t].label,data:l}):O.push({label:a[t].label,data:l,bars:{show:!0,barWidth:.2,order:t+1,lineWidth:2}})}var o=O.length;for(t=0;t<o;t++)B.push({data:O[t].data,label:O[t].label,bars:u(O[t]),shadowSize:R.grid.shadow});A=1<o},b()};switch(Array.max=function(a){return Math.max.apply(Math,a)},H.type){case"xy":v(N.lib.jquery.flot.axisLabels,k),E=M=!(L=!0),I=b(),F=function(a,e,t){var i=function(a){var e,t={label:a.label,data:[],by:Array.isArray(a.by)&&"string"==typeof a.by[0]?a.by:null};if("object"==typeof a.x&&"object"==typeof a.y)for(N.canvas.axis.labelsText={x:a.x.label,y:a.y.label},e=0;e<a.x.val.length;e++)t.data.push([a.x.val[e],a.y.val[e]]);else a.val&&1<=a.val.length&&2==a.val[0].length&&(N.canvas.axis.labelsText={x:a.x,y:a.y},t.data=a.val);return t};if(Array.isArray(a)&&Array.isArray(a[0]))O=[a];else if(Array.isArray(a)&&"object"==typeof a[0]&&!Array.isArray(a[0]))for(var l=0;l<a.length;l++)O.push(i(a[l]))},A=!0;break;case"pyram":v(N.lib.jquery.flot.pyramid,k),M=L=!1,I=b(),F=function(a,e,t){d=Math.max(Array.max(a[0].val),Array.max(a[1].val)),O[0]={label:a[0].label,data:[],pyramid:{direction:"L"}},O[1]={label:a[1].label,data:[]};for(var i=0,l=t.length;i<l;i++)O[0].data[i]=[t[i],a[0].val[i]],O[1].data[i]=[t[i],a[1].val[i]]},E=W=j=!(A=!0);break;case"rank":var P=[];M=!(L=E=!1),I=b(),j=A=!(F=function(a,e,t){for(var i=[],l=0,n=a.length;l<n;l++){T[l]=[l,void 0!==a[n-l-1][0]?a[n-l-1][0]:t[n-l-1]];var r=void 0!==a[n-l-1][1]?a[n-l-1][1]:a[n-l-1];i.push(r),P[l]=[r,l]}O={data:P},d=Array.max(i)});break;case"pie":v(N.lib.jquery.flot.pie,k),M=L=E=!(z=!0),I=b(),F=function(a,e,t){var i,l;if("object"!=typeof t||null===t)for(l=a.length,i=0;i<l;i++)null!==a[i][1]&&O.push({label:a[i][0],data:a[i][1]});else if("number"==typeof a[0])for(l=t.length,i=0;i<l;i++)null!==a[i]&&O.push({label:t[i],data:a[i]})},A=!0;break;case"bar":v(N.lib.jquery.flot.categories,k),M=!(L=!1),I=b(),j=A=!(E=!(F=function(a,e,t){var i,l;if("object"!=typeof t||null===t)for(l=a.length,i=0;i<l;i++)null!==a[i][1]&&O.push(["<span>"+a[i][0]+"</span>",a[i][1]]);else if("number"==typeof a[0])for(l=t.length,i=0;i<l;i++)null!==a[i]&&O.push(['<span">'+t[i]+"</span>",a[i]])}));break;case"tsline":I=q(),E=!(M=!(L=!(j=null)));break;case"tsbar":I=q(),E=!(M=!(L=!(j=!0)))}VisualJS.chart=function(){F(H.data,H.time,H.by),$.fn.UseTooltip=function(g){var h=[];$(this).bind("plothover",function(a,e,t){var i,l,n,r,s,o,u,d,c,p,y={},f={};if(t){if(h!=[t.seriesIndex,t.dataIndex])if(h=[t.seriesIndex,t.dataIndex],"xy"===H.type){for(var x in u={x:void 0!==VisualJS.container[g].unit.position.x&&"start"===VisualJS.container[g].unit.position.x,y:void 0!==VisualJS.container[g].unit.position.y&&"start"===VisualJS.container[g].unit.position.y,z:void 0!==VisualJS.container[g].unit.position.z&&"start"===VisualJS.container[g].unit.position.z})d=u[x],u.hasOwnProperty(x)&&(c=VisualJS.container[g].unit.symbol&&"string"==typeof VisualJS.container[g].unit.symbol[x]?VisualJS.container[g].unit.symbol[x]:"",p=VisualJS.container[g].unit.label&&"string"==typeof VisualJS.container[g].unit.label[x]?VisualJS.container[g].unit.label[x]:"",d?(y[x]=c,f[x]=p):(y[x]="",f[x]=" "+p+" "+c),f[x]=""!==f[x]?" "+f[x]:"");o="<div><strong>"+y.x+_(t.datapoint[0],g,"x")+f.x+"</strong> "+(void 0!==b.xaxis.axisLabel?b.xaxis.axisLabel:"x")+"</div><div><strong>"+y.y+_(t.datapoint[1],g,"y")+f.y+"</strong> "+(void 0!==b.yaxis.axisLabel?b.yaxis.axisLabel:"y")+"</div>",o+=Array.isArray(O[t.seriesIndex].by)&&"string"==typeof O[t.seriesIndex].by[t.dataIndex]&&""!==O[t.seriesIndex].by[t.dataIndex]?O[t.seriesIndex].by[t.dataIndex]+("string"==typeof O[t.seriesIndex].label&&""!==O[t.seriesIndex].label?" ("+O[t.seriesIndex].label+")":""):"",aa(o,e.pageX,e.pageY)}else i=t.datapoint[0],l=t.datapoint[1],n="bar"!==H.type||Boolean(H.data[0].val)?t.series.label:1<O.length?O[i][0]:O[0][i][0],r="rank"!==H.type?n:T[l][1],s=!!("rank"!==H.type&&"pie"!==H.type&&"bar"!==H.type||"bar"===H.type&&Boolean(H.data[0].val))&&(W||1===O.length?!!(Array.isArray(T)&&0<T.length)&&T[i][1]:"pyram"===H.type?O[e.x<0?0:1].data[t.dataIndex][0]:T[t.dataIndex][1]),o="pyram"===H.type?Math.abs(i):"rank"!==H.type?"tsbar"!==H.type?"pie"===H.type?l[0][1]:l:W||1===O.length?O[t.seriesIndex].data[i][1]:l:i,"bar"===H.type&&H.by?aa(K(g,s?s+" / "+r:r,o),e.pageX,e.pageY):aa(K(g,s?r+" / "+s:r,o),e.pageX,e.pageY)}else $("#"+N.tooltipid).hide(),h=[]})};var b={colors:N.colors.series,series:{stack:j,bars:{show:M,barWidth:.7,align:"center",fill:.9},pie:{show:z,label:{show:!1}},lines:{show:E,lineWidth:R.grid.line},points:{show:L,radius:R.grid.point,fill:.85,fillColor:null}},legend:{show:R.legend&&A,position:Y.position||"ne"},grid:{borderWidth:R.grid.border,hoverable:!0,clickable:!1,mouseActiveRadius:10},xaxis:{show:R.axis.x,axisLabel:void 0!==o(N.canvas.axis,["labelsText","x"])?N.canvas.axis.labelsText.x:void 0,axisLabelUseCanvas:!0,axisLabelFontSizePixels:c=Number($("."+VisualJS.setup.clas).css("font-size").replace("px","")),axisLabelFontFamily:$("."+VisualJS.setup.clas).css("font-family"),axisLabelPadding:c,axisLabelColour:"#545454"},yaxis:{show:R.axis.y,axisLabel:void 0!==o(N.canvas.axis,["labelsText","y"])?N.canvas.axis.labelsText.y:void 0,axisLabelUseCanvas:!0,axisLabelFontSizePixels:c,axisLabelFontFamily:$("."+VisualJS.setup.clas).css("font-family"),axisLabelPadding:c,axisLabelColour:"#545454"}};(g=function(){var a,e,t=VisualJS.id,i=T.length,l=G(VisualJS.arr2html(H.footer,X)||"");if($(Q).html("<"+U+' style="overflow:auto;">'+I+"</"+U+'><div class="'+VisualJS.setup.footerclass+'" style="overflow:auto;">'+l+"</div>"),VisualJS.getSize(t)){switch($(Q+" "+U).after('<div class="'+N.canvasclass+" "+VisualJS.visualsize+'" style="width: '+VisualJS.width+"px; height: "+VisualJS.height+'px;"></div>'),b.xaxis.tickFormatter=function(a){return S(a,t,"x")},b.yaxis.tickFormatter=function(a){return S(a,t,"y")},b.xaxis.tickLength=H.axis.ticks.x?null:0,b.yaxis.tickLength=H.axis.ticks.y?null:0,H.type){case"xy":H.range?(H.range.x?Array.isArray(H.range.x)?(b.xaxis.min=H.range.x[0],b.xaxis.max=H.range.x[1]):(b.xaxis.min=0,b.xaxis.max=H.range.x):(b.xaxis.min=null,b.xaxis.max=null),H.range.y?Array.isArray(H.range.x)?(b.yaxis.min=H.range.y[0],b.yaxis.max=H.range.y[1]):(b.yaxis.min=0,b.yaxis.max=H.range.y):(b.yaxis.min=null,b.yaxis.max=null)):(b.xaxis.min=null,b.yaxis.min=null,b.xaxis.max=null,b.yaxis.max=null),b.hooks={drawBackground:function(a,e){var t=a.getXAxes()[0];void 0!==t.ticks&&0<t.ticks.length&&(t.datamin=t.ticks[0].v,t.datamax=t.ticks[t.ticks.length-1].v)}},$.plot(h,O,b);break;case"pyram":b.series.pyramid={show:!0,barWidth:1},b.yaxis.show=11<VisualJS.height/O[0].data.length&&R.axis.y,b.xaxis.max="number"==typeof R.range?d*R.range:Array.isArray(R.range)?R.range[1]:null,b.xaxis.tickFormatter=function(a){return S(a,t,"x",_)},$.plot(h,O,b);break;case"rank":b.yaxis.tickLength=null,b.series.bars.horizontal=!0,b.yaxis.ticks=11<VisualJS.height/i?T.slice(0):0,!1===H.axis.labels.y&&(b.yaxis.ticks=J(b.yaxis.ticks)),"number"==typeof R.range?b.xaxis.max=d*R.range:Array.isArray(R.range)&&(b.xaxis.min=R.range[0],b.xaxis.max=R.range[1]),b.xaxis.tickFormatter=function(a){return S(a,t,"x",_)},b.yaxis.autoscaleMargin=0,b.series.bars.barWidth=.5,$.plot(h,[O],b);break;case"pie":$.plot(h,O,b);break;case"bar":if(b.xaxis.tickLength=0,H.by&&H.by.length&&"object"==typeof H.data[0]){for(T=[],O=[],a=0;a<H.by.length;a++)O.push({label:H.by[a],data:[]});for(a=e=0;a<H.data.length;a++){H.data[a].val.length%2==0?T.push([e+(H.data[a].val.length-1)/2,H.data[a].label]):T.push([Math.floor(e+H.data[a].val.length/2),H.data[a].label]);for(var n=0;n<H.data[a].val.length;n++)O[n].data.push([e,H.data[a].val[n]]),e++;e+=2}b.xaxis.ticks=T,!1===H.axis.labels.x&&(b.xaxis.ticks=J(b.xaxis.ticks)),b.bars={show:!0}}else b.xaxis.mode="categories",O=[O],b.yaxis.tickFormatter=function(a){return S(a,t,"y",_)};"number"!=typeof R.range&&null!==R.range?(b.yaxis.min=R.range[0],b.yaxis.max=R.range[1]):"number"==typeof R.range&&(b.yaxis.min=null,b.yaxis.max=R.range),$.plot(h,O,b),!1!==H.axis.labels.x&&!1!==H.axis.labels.y||(!(c="<style>")===H.axis.labels.x&&(c+=h+" .flot-x-axis .flot-tick-label{display:none;}"),!1===H.axis.labels.y&&(c+=h+" .flot-y-axis .flot-tick-label{display:none;}"),c+="</style>",$(h).append(c));break;case"tsline":b.grid.markings=[{color:"#999",lineWidth:.5,yaxis:{from:0,to:0}}];case"tsbar":"tsbar"===H.type&&(b.xaxis.tickLength=0),b.yaxis.tickFormatter=function(a){return S(a,t,"y",_)};var r,s=VisualJS.width/i,o=[],u="01";switch("number"!=typeof R.range&&null!==R.range?(b.yaxis.min=R.range[0],b.yaxis.max=R.range[1]):"number"==typeof R.range&&(b.yaxis.min=null,b.yaxis.max=R.range),VisualJS.ticks[0][1].length){case 4:if(s<30){for(r=15<s?2:8<s?3:4,a=0;a<i;a++)o[a]=a%r?[T[a][0],""]:[T[a][0],T[a][1]];b.xaxis.ticks=o}else b.xaxis.ticks=T;!1===H.axis.labels.x&&(b.xaxis.ticks=J(b.xaxis.ticks));break;case 5:u="1";case 6:if(s<35){for(a=0;a<i;a++)o[a]=VisualJS.ticks[a][1].slice(4)!==u?[VisualJS.ticks[a][0],""]:[VisualJS.ticks[a][0],VisualJS.ticks[a][1].slice(0,4)],T[a][1]=V(VisualJS.ticks[a][1],VisualJS.id);b.xaxis.ticks=o}else{for(a=0;a<i;a++)T[a][1]=V(VisualJS.ticks[a][1],VisualJS.id);b.xaxis.ticks=T}!1===H.axis.labels.x&&(b.xaxis.ticks=J(b.xaxis.ticks));break;case 7:if(s<55){for(r=20<s?2:10<s?3:4,a=0;a<i;a++)o[a]=a%r?[T[a][0],""]:[T[a][0],T[a][1]];b.xaxis.ticks=o}else b.xaxis.ticks=T;!1===H.axis.labels.x&&(b.xaxis.ticks=J(b.xaxis.ticks));break;default:b.xaxis.ticks=T,!1===H.axis.labels.x&&(b.xaxis.ticks=J(b.xaxis.ticks))}$.plot(h,B,b)}$(h).UseTooltip(VisualJS.id),VisualJS.pub[VisualJS.id].heading=I}})()}}VisualJS.scripts.length&&"object"==typeof LazyLoad?LazyLoad.js(VisualJS.scripts,m):m()}};if("function"!=typeof visual)var visual=VisualJS.load;
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
VisualJS.setup={//v.1.0.0
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
			}
		}
	},

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
	normal: "VisualJSnormal", //visualitzation's normal size class
	mini: "VisualJSmini", //visualitzation's small size class
	colorclassprefix: "c", //prefix for color class in maps: cnohover, c0, c1, c2...

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
