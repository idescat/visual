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
var VisualJS={version:"1.2.4",show:!0,old:!1,fixed:null,width:500,bwidth:500,height:500,normal:500,scripts:[],map:{},container:{},pub:{},func:{},callback:null,getSize:function(e){var a=VisualJS.setup,t=a.html.heading,i="."+VisualJS.setup.footerclass,l="undefined"!=typeof jQuery?jQuery:"undefined"!=typeof d3?d3.select:document.querySelectorAll.bind(document),n=window,r=document,s=r.documentElement,o=r.getElementsByTagName("body")[0],u=r.getElementById(e),d=function(e,a){return"function"==typeof getComputedStyle?getComputedStyle(e)[a]:e.currentStyle[a]},p=function(e){var a=l(e);return a[0]instanceof Element?a[0]:a[0]&&a[0][0]?a[0][0]:void 0},c=function(e){if(e){var a=e.offsetHeight;d(e);return a+=Math.round(parseFloat(d(e,"marginTop"))+parseFloat(d(e,"marginBottom")))}return 0},y=c(p(t)),f=c(p(i)),g=n.innerHeight||s.clientHeight||o.clientHeight,x=Math.round(parseFloat(d(u,"marginTop"))+parseFloat(d(u,"marginBottom")));return void 0!==g&&void 0!==y&&void 0!==f&&(null===VisualJS.fixed?(VisualJS.bwidth=n.innerWidth||s.clientWidth||o.clientWidth,VisualJS.width=VisualJS.bwidth-a.padding.w,VisualJS.height=Math.floor(g-y-f-x-10)):(VisualJS.bwidth=s.clientWidth||o.clientWidth,VisualJS.width=VisualJS.fixed[0]-a.padding.w,VisualJS.height=Math.floor(VisualJS.fixed[1]-y-f-x-10))),VisualJS.visualsize=VisualJS.width<VisualJS.normal?a.mini:a.normal,10<VisualJS.width&&10<VisualJS.height},arr2html:function(e,a){var t="";return void 0===e||(Array.isArray(e)?e.forEach(function(e){"string"==typeof e&&""!==e&&(t+="<p>"+e+"</p>")}):"string"==typeof e&&""!==e&&(t+="<p>"+e+"</p>")),t},iframe:function(e,a){var t,i,l,n,r,s,o=VisualJS.setup,u="string"==typeof e.clas?e.clas:o.clas,d='<!DOCTYPE html>\n\x3c!--[if lt IE 7]><html class="lt-ie9 lt-ie8 lt-ie7"> <![endif]--\x3e\n\x3c!--[if IE 7]><html class="lt-ie9 lt-ie8"> <![endif]--\x3e\n\x3c!--[if IE 8]><html class="lt-ie9"> <![endif]--\x3e\n\x3c!--[if gt IE 8]>\x3c!--\x3e <html> \x3c!--<![endif]--\x3e\n<head>';"string"==typeof a&&(-1===a.indexOf("{")?d+='<link href="'+a+'" rel="stylesheet" type="text/css"/>':d+='<style type="text/css">'+a+"</style>"),d+='<script type="text/javascript" src="'+VisualJS.setup.main.visual+'"><\/script>',d+='<script type="text/javascript" src="'+VisualJS.setup.main.setup+'"><\/script>',d+='<script type="text/javascript" src="'+VisualJS.setup.main.lazy+'"><\/script>',d+='</head><body><div id="'+e.id+'" class="'+u+'"></div><script>window.setTimeout(function(){visual('+JSON.stringify(e)+");},1);<\/script></body></html>",n=document,r=n.createElement("iframe"),s=n.getElementById(e.id),r.setAttribute("title",e.title?VisualJS.setup.i18n.text.iframetitle[e.lang]+": "+e.title:VisualJS.setup.i18n.text.iframetitle[e.lang]),r.setAttribute("aria-hidden","true"),r.setAttribute("role","widget"),r.frameBorder="0",r.scrolling="no",s.parentNode.insertBefore(r,s.nextSibling),i=d,void 0!==(t=r)&&(t.contentDocument?l=t.contentDocument:t.contentWindow?l=t.contentWindow.document:window.frames[t.name]&&(l=window.frames[t.name].document),l&&(l.open(),l.write(i),l.close()))},compare:function(i){var e,l=VisualJS.setup,n=VisualJS.setup.separator,r="string"==typeof i.id?i.id:l.id,a="[object Array]"===Object.prototype.toString.call(i.css)?0===i.css.length?["",""]:1===i.css.length?[i.css[0],i.css[0]]:i.css:[i.css,i.css],t=document,s=t.createElement(l.html.heading),o="string"==typeof i.title?i.title:"",u=t.createElement("p"),d=l.html,p="string"==typeof i.footer?VisualJS.arr2html(i.footer,d):"",c=t.getElementById(r),y=t.createElement("div"),f=t.createElement("style"),g=function(){if(VisualJS.getSize(r)){var e=VisualJS.height+("string"==typeof i.footer&&""!==i.footer?14:0),a=VisualJS.width+l.margin,t="iframe{ float: left; width: "+Math.floor((a-n)/2-l.margin)+"px; height:"+e+"px; }";f.styleSheet?f.styleSheet.cssText=t:f.innerHTML=t,y.style.height=e+"px"}};s.innerHTML=o,s.style.overflow="auto",u.innerHTML=p,u.style.overflow="auto",u.style.clear="both",c.appendChild(s),c.appendChild(u),t.getElementsByTagName("head")[0].appendChild(f),y.style.width=n+"px","styleFloat"in y.style?y.style.styleFloat="left":y.style.cssFloat="left";for(var x=0;x<2;x++)e=t.createElement("span"),"string"!=typeof i.load[x].id&&(i.load[x].id=l.compareids[x]),e.id=i.load[x].id,c.insertBefore(e,u),VisualJS.iframe(i.load[x],a[x]);c.insertBefore(y,e),g(),VisualJS.fixed||(window.addEventListener?window.addEventListener("resize",g,!1):window.attachEvent?window.attachEvent("onresize",g):window.onresize=g)},load:function(e){var a=function(a){var e,t=function(e){a.source.postMessage(JSON.stringify(e),"*")};if("string"==typeof a.data?e=JSON.parse(a.data):"object"==typeof a.data&&(e=a.data),e)if(void 0===e.action)t({type:"error",data:[{id:"400",label:'"action" is required.'}]});else if("send"===e.action){var i=e.id||VisualJS.id,l=VisualJS.container[i]||VisualJS.container[i];if(l){if("cmap"===l.type&&!l.data[0].hasOwnProperty("label")){for(var n=[],r=VisualJS.map[l.by],s=r.features.length;s--;)n[r.features[s].properties[r.id]]=r.features[s].properties[r.label];for(var o=l.data,u=o.length;u--;)o[u].label=n[o[u].id]}t(l)}else t({type:"error",data:[{id:"404",label:'A visualisation with the specified "id" was not found'}]})}else t({type:"error",data:[{id:"400",label:'"action" value is not correct.'}]})};if(void 0===VisualJS.setup&&window.alert("Visual: Setup not found (visual.setup.js)!"),"[object Array]"!==Object.prototype.toString.call(e))VisualJS.get(e);else for(var t=0,i=e.length;t<i;t++)VisualJS.get(e[t]);VisualJS.container[VisualJS.id].listen&&(window.addEventListener?window.addEventListener("message",a,!1):window.attachEvent("onmessage",a))},get:function(Q){var p,c,e,a,t,i,l,n,r,G=VisualJS.setup,K=G.html,Z=G.canvas,_=K.heading,ee="."+VisualJS.setup.footerclass,s=VisualJS.old||G.func.old("ie9"),o=function(e,a,t){"string"==typeof e?a.match(typeof Q[e])||(Q[e]=t[e]):a.match(typeof u(Q,e))||d(Q,e,u(t,e))},u=function(e,a){for(var t=e,i=0;i<a.length;i++){if(void 0===t[a[i]]){t=void 0;break}t=t[a[i]]}return t},d=function(e,a,t){for(var i=e,l=0;l<=a.length-2;l++)void 0===i[a[l]]&&(i[a[l]]={}),i=i[a[l]];i[a[a.length-1]]=t},y=function(e){return"object"==typeof e&&null!==e},f=function(){var e="invalid";return Array.isArray(Q.data)&&(Array.isArray(Q.data[0])?e="array":y(Q.data[0])&&(e=y(Q.data[0].z)?"xyz":y(Q.data[0].y)?"xy":void 0!==Q.data[0].x||void 0!==Q.data[0].y||!Array.isArray(Q.data[0].val)||null===Q.data[0].val[0]||2!=Q.data[0].val[0].length&&3!=Q.data[0].val[0].length?"object":"points")),e},g=[["show","boolean",VisualJS],["callback","function",VisualJS],["id","string",G],["listen","boolean",G],["dec","number|object",Z],["autoheading","boolean",Z],["legend","boolean",Z],["grid","object",Z],[["grid","border"],"number",Z],[["grid","shadow"],"number",Z],[["grid","line"],"number",Z],[["grid","point"],"number",Z],[["grid","markings"],"object",Z],["axis","object",Z],[["axis","x"],"boolean",Z],[["axis","y"],"boolean",Z],[["axis","labels","x"],"boolean",Z],[["axis","labels","y"],"boolean",Z],[["axis","ticks","x"],"boolean",Z],[["axis","ticks","y"],"boolean",Z]];void 0===Z.axis.labels&&(Z.axis.labels={x:!0,y:!0}),void 0===Z.axis.ticks&&(Z.axis.ticks={x:!0,y:!0});for(var x=0;x<g.length;x++)o(g[x][0],g[x][1],g[x][2]);VisualJS.scripts=[],VisualJS.id=Q.id,VisualJS.pub[VisualJS.id]={heading:null,legend:null},"object"==typeof Q.fixed&&(VisualJS.fixed=Q.fixed),"object"==typeof Q.unit&&null!==Q.unit?(o(["unit","label"],"string|object",Z),o(["unit","symbol"],"string|object",Z),o(["unit","position"],"string|object",Z)):Q.unit=Z.unit,Q.range=(e=Q.range,n=f(),"object"!=typeof e||null===e||Array.isArray(e)||"array"!==n&&"object"!==n||"xy"===Q.type||(e="rank"===Q.type||"pyram"===Q.type?e.x:e.y),Array.isArray(e)&&2===e.length&&null===e[0]&&null===e[1]?Q.data&&"object"===n&&(l=[],Q.data.forEach(function(e){l=l.concat(e.val)}),0<=(a=[Math.min.apply(null,l),Math.max.apply(null,l)])[0]&&0<=a[1]?e=[0,null]:a[0]<=0&&a[1]<=0&&(e=[null,0])):"object"==typeof e&&!Array.isArray(e)&&null!==e&&(Array.isArray(e.x)&&null===e.x[0]&&null===e.x[1]||Array.isArray(e.y)&&null===e.y[0]&&null===e.y[1])?(c={x:[],y:[]},t={x:[],y:[]},i={x:[],y:[]},"points"===n?Q.data.forEach(function(e){e.val.forEach(function(e){c.x.push(e[0]),c.y.push(e[1])})}):"xy"!==n&&"xyz"!==n||Q.data.forEach(function(e){c.x=c.x.concat(e.x.val),c.y=c.y.concat(e.y.val)}),t.x=Math.min.apply(null,c.x),i.x=Math.max.apply(null,c.x),t.y=Math.min.apply(null,c.y),i.y=Math.max.apply(null,c.y),Array.isArray(e.x)&&null===e.x[0]&&null===e.x[1]&&(0<=t.x&&0<=i.x?e.x=[0,null]:t.x<=0&&i.x<=0?e.x=[null,0]:e.x=[null,null]),Array.isArray(e.y)&&null===e.y[0]&&null===e.y[1]&&(0<=t.y&&0<=i.y?e.y=[0,null]:t.y<=0&&i.y<=0?e.y=[null,0]:e.y=[null,null])):"xy"!==n&&"xyz"!==n&&"points"!==n||("number"==typeof e||Array.isArray(e)?e={x:[null,null],y:Array.isArray(e)?e:[null,e]}:"object"==typeof e&&null!==e||(e={x:[null,null],y:[null,null]})),e),Q.lang=Q.lang||G.i18n.lang,"number"==typeof Q.range||void 0!==(r=Q.range)&&"[object Array]"===Object.prototype.toString.call(r)&&2===r.length&&"number"==typeof r[0]&&"number"==typeof r[1]&&r[0]<r[1]||("object"!=typeof Q.range||null===Q.range||Array.isArray(Q.range))&&(Q.range="number"==typeof Q.range||Array.isArray(Q.range)&&2===Q.range.length?Q.range:Z.range.hasOwnProperty(Q.type)&&"number"==typeof Z.range[Q.type]?Z.range[Q.type]:null),Q.unit=function(e){var a;f();for(var t in e)e.hasOwnProperty(t)&&(a=e[t],"xy"===Q.type||("rank"===Q.type||"pyram"===Q.type?a&&void 0!==a.x?e[t]=a.x:e[t]="string"==typeof a?a:"":a&&void 0!==a.y?e[t]=a.y:e[t]="string"==typeof a?a:""));return e}(Q.unit),Q.tooltipseparator=G.tooltipseparator&&"string"==typeof G.tooltipseparator?G.tooltipseparator:" / ",VisualJS.container[VisualJS.id]=Q;var b,ae="#"+VisualJS.id,h=ae+" ."+G.canvasclass,te=VisualJS.container[VisualJS.id],m=null,v=function(){if(!1===te.autoheading)return te.title||"";var e,t=[],a=function(e,a){"string"==typeof e&&""!==e&&(!0===a&&(e='<span class="'+VisualJS.setup.nowrapclass+'">'+e+"</span>"),t.push(e))};null!==te.time&&"object"==typeof te.time?e=w(te.time[0],VisualJS.id)+"&ndash;"+w(te.time[te.time.length-1],VisualJS.id):e=w(te.time,VisualJS.id);return a(te.title,!1),a(te.geo,!0),a(e,!0),ie(t.join(". "))},S=function(){var e=!1;"function"==typeof VisualJS.chart&&(j(),te.show&&VisualJS.chart(),VisualJS.fixed||(window.addEventListener?window.addEventListener("resize",b,!1):window.attachEvent?window.attachEvent("onresize",b):window.onresize=b),e=!0),null!==te.callback&&te.callback.call({id:VisualJS.id,chart:e,heading:VisualJS.pub[VisualJS.id].heading,legend:VisualJS.pub[VisualJS.id].legend})},ie=function(e){return String(e).replace(/&amp;/g,"&")},J=function(e,a){return(!a||!e.exists.call())&&(VisualJS.scripts.push(e.js),!0)},le=function(e,a,t){var i="number"==typeof t&&""!==VisualJS.container[e].unit.label?" "+VisualJS.container[e].unit.label:"",l="number"==typeof t?VisualJS.container[e].unit.symbol:"",n=re(t,e),r=n!==VisualJS.setup.i18n.text.na[VisualJS.container[e].lang]?"end"===VisualJS.container[e].unit.position?n+i+(""!==l?" "+l:l):l+n+i:n;return a?"<strong>"+r+"</strong> "+a:r},ne=function(e,a,t){var i="number"==typeof t?VisualJS.container[e].unit.symbol:"",l=re(t,e),n=l!==VisualJS.setup.i18n.text.na[VisualJS.container[e].lang]?"end"===VisualJS.container[e].unit.position?l+""+(""!==i?" "+i:i):i+l+"":l;return a?"<strong>"+n+"</strong> "+a:n},V=function(e,a,t,i){return Q.axis.labels[t]?"function"==typeof i?i(e,a,t):re(e,a,t):""},k=function(e){for(var a=[],t=0;t<e.length;t++)Array.isArray(e[t])?a.push([e[t][0],""]):a.push([e[t],""]);return a},re=function(e,a,t){if(null==e)return VisualJS.setup.i18n.text.na[VisualJS.container[a].lang];if("number"==typeof e){for(var i=/(\d+)(\d{3})/,l=("object"==typeof VisualJS.container[a].dec&&null!==VisualJS.container[a].dec&&"string"==typeof t&&"number"==typeof VisualJS.container[a].dec[t]?e.toFixed(VisualJS.container[a].dec[t]):"number"==typeof VisualJS.container[a].dec?e.toFixed(VisualJS.container[a].dec):String(e)).split("."),n=l[0],r=1<l.length?VisualJS.setup.i18n.text.dec[VisualJS.container[a].lang]+l[1]:"";i.test(n);)n=n.replace(i,"$1"+VisualJS.setup.i18n.text.k[VisualJS.container[a].lang]+"$2");return n+r}return""},w=function(e,a){var t,i,l,n;if(!m){if(!e)return null;if(isNaN(e))return e;switch(e.length){case 5:t=VisualJS.setup.i18n.text.quarter,n=A("aaaaq",Q.lang);break;case 6:t=VisualJS.setup.i18n.text.month,n=A("aaaamm",Q.lang);break;default:return e}m={label:t,text:t[VisualJS.container[a].lang],template:n}}return void 0===m.label?e:void 0===m.text?e:void 0===(i=m.text[e.slice(4)-1])?e:(l=e.slice(0,4),m.template.replace("{{period}}",i).replace("{{year}}",l))},A=function(e,a){var t=G.i18n.template;if(t){if("string"==typeof t)return t;if("object"==typeof t&&t[e]&&"string"==typeof t[e][a])return t[e][a]}return"{{period}} {{year}}"},se=function(e,a,t){var i=document.getElementById(VisualJS.setup.tooltipid),l=VisualJS.bwidth-VisualJS.setup.margin,n={};i.innerHTML=e,i.style.display="block";var r=i.clientWidth/2;n.x=a-r,n.y=t-i.clientHeight-5,l<a+r?n.x-=a+r-l:n.x<VisualJS.setup.margin&&(n.x+=VisualJS.setup.margin-n.x),n.y<VisualJS.setup.margin&&(n.y+=1.75*i.clientHeight),i.style.left=n.x+"px",i.style.top=n.y+"px"},j=function(){var e=document;if(!e.getElementById(VisualJS.setup.tooltipid)){var a=e.createElement("div");a.setAttribute("role","tooltip"),a.id=VisualJS.setup.tooltipid,a.style.display="none",e.body.appendChild(a)}};if("cmap"===Q.type)if(s)document.getElementById(VisualJS.id).innerHTML="<p>"+G.i18n.text.oldbrowser[te.lang]+"</p>";else{if("string"!=typeof Q.by)return;J(G.lib.maps,!0),J(G.lib.d3,!0),J(G.map[Q.by],!0),VisualJS.chart=function(){var O=v(),W=VisualJS.map[Q.by],q=W.area[0],C=W.area[1],P=null!==Q.grouped&&"object"==typeof Q.grouped&&Array.isArray(Q.grouped.label)&&0<Q.grouped.label.length&&Q.data[0].hasOwnProperty("group"),H=Q.data[0].hasOwnProperty("val"),N=P?Q.grouped.label.length:H?G.colors.map.max:1,R=G.colorclassprefix,X=VisualJS.func.colors(G.colors.map.base,N,"fill",R,P&&!H&&"object"==typeof Q.grouped.color&&Q.grouped.color.length===Q.grouped.label.length?Q.grouped.color:[],VisualJS.id),Y=d3.select(ae),e=d3.geo[W.projection](),a=("object"==typeof W.center&&"function"==typeof e.center?e.center(W.center):e).scale(W.scale).translate([q/2,C/2]),D=d3.geo.path().projection(a),U=d3.select("#"+G.tooltipid);(b=function(){var e=ie(VisualJS.arr2html(Q.footer,K)||"");if(Y.html("<header><"+_+' id="ARIAtitle" style="overflow:auto;" ></'+_+'></header><footer class="'+VisualJS.setup.footerclass+'" style="overflow:auto;"></footer>'),d3.select(ae+" "+_).html(O),d3.select(ae+" "+ee).html(e),VisualJS.getSize(VisualJS.id)){var l,i,a,t,n,r,s,o=VisualJS.id,u=d3.map(),d=d3.map(),p=Q.data[0].hasOwnProperty("label"),c=[],y=function(){},f=VisualJS.height/C,g=VisualJS.width/q,x=Math.min(Math.round(q*f),VisualJS.width),b=Math.min(Math.round(C*g),VisualJS.height),h=Math.floor((VisualJS.width-x)/2),m=Math.floor((VisualJS.height-b)/2),v=f<g?f:g,S=Y.insert("svg:svg",ee).attr("viewBox","0 0 "+x+" "+b).attr("width",x).attr("height",b).attr("role","img").attr("aria-labelledby","ARIAtitle"),J=!0;P&&H?(r=[],[1,Q.grouped.label.length].forEach(function(e){for(var a=0;a<Q.data.length;a++)if(Q.data[a].group===e){r.push(Q.data[a].val);break}}),r[0]>r[1]&&(J=!1)):P&&Q.grouped.color&&(X=Q.grouped.color),P?(l=d3.map(),y=function(e,a){e.set(a.id,a.group)},VisualJS.groupedLabelSize=null,a=function(e,a,t){if(H&&!J){if(!VisualJS.groupedLabelSize){for(var i={},l=0;l<d3.values(e).length;l++)i[d3.values(e)[l]]=1+(i[d3.values(e)[l]]||0);VisualJS.groupedLabelSize=Object.keys(i).length}return R+(VisualJS.groupedLabelSize-e.get(t[W.id]))}return R+(e.get(t[W.id])-1)},i=function(e,a){var t=Q.grouped.label[e.get(a[W.id])-1],i=p?d.get(a[W.id]):a[W.label];return void 0!==t&&(i+=" <em>"+t+"</em>"),i},VisualJS.func.legend):(H?(a=function(e,a,t,i,l){var n=a.get(t[W.id]);return void 0===n?"":i===l?R+(N/2).toFixed(0):d3.scale.quantize().domain([i,l]).range(d3.range(N).map(function(e){return R+e}))(n)},VisualJS.func.legend):a=function(e,a,t){return""!==a.get(t[W.id])?"":R+(N-1)},i=function(e,a){return p?d.get(a[W.id]):a[W.label]});for(var V=0,k=Q.data,w=k.length;V<w;V++)(s=k[V]).hasOwnProperty("val")?null!==s.val&&(u.set(s.id,s.val),c.push(s.val)):u.set(s.id,""),p&&d.set(s.id,s.label),y(l,s);c.sort(function(e,a){return e-a});var A=c[0],j=c[c.length-1],L=!1===te.tooltip,E=!1,z=null,I=null,M=null,F=function(e,a,t){L||""!==e.properties[W.id]&&""!==e.properties[W.label]&&(H||P||void 0!==u.get(e.properties[W.id]))&&se(le(o,i(l,e.properties),u.get(e.properties[W.id])),a,t)};if("number"==typeof te.range?(t=d3.quantile(c,te.range),n=d3.quantile(c,1-te.range)):(t=te.range[0],n=te.range[1]),"function"!=typeof te.click&&(te.click=function(){}),S.style("margin-left",h+"px"),S.style("margin-top",m+"px"),S.style("margin-bottom",m+"px"),S.append("g").attr("class",G.areaclass).attr("transform","scale("+v+")").selectAll("path").data(W.features).enter().append("svg:path").attr("class",function(e){return""===e.properties[W.id]||""===e.properties[W.label]||!H&&void 0===u.get(e.properties[W.id])?R+"nohover":a(l,u,e.properties,t,n)}).attr("tabindex",function(){return d3.select(this).classed(R+"nohover")?"-1":"0"}).attr("role","presentation").attr("d",D).on("mousemove",function(e){F(e,event.pageX,event.pageY)}).on("mouseout",function(){return U.style("display","none")}).on("mousedown",function(){E=!0}).on("mouseup",function(){E=!1}).on("focusout",function(){return U.style("display","none")}).on("focusin",function(e,a){var t=(new Date).getTime(),i=!0;E?(te.priv&&te.priv.click?500<t-te.priv.click?(i=!0,te.priv.click=t):i=!1:te.priv={click:t},i&&te.click.apply(null,[{id:e.properties[W.id],label:p?void 0!==d.get(e.properties[W.id])?d.get(e.properties[W.id]):null:e.properties[W.label],position:{x:event.pageX,y:event.pageY},group:P&&void 0!==l.get(e.properties[W.id])?{num:l.get(e.properties[W.id]),label:te.grouped.label[l.get(e.properties[W.id])-1]}:null,value:H&&void 0!==u.get(e.properties[W.id])?u.get(e.properties[W.id]):null}]),I=event.pageX,M=event.pageY):(z=d3.select(this).node().getBoundingClientRect(),I=(z.left+z.right)/2,M=(z.top+z.bottom)/2),F(e,I,M)}).on("keyup",function(e){if("Enter"===event.key){var a=d3.select(this).node().getBoundingClientRect();te.click.apply(null,[{id:e.properties[W.id],label:p?void 0!==d.get(e.properties[W.id])?d.get(e.properties[W.id]):null:e.properties[W.label],position:{x:a.left,y:a.top},group:P&&void 0!==l.get(e.properties[W.id])?{num:l.get(e.properties[W.id]),label:te.grouped.label[l.get(e.properties[W.id])-1]}:null,value:H&&void 0!==u.get(e.properties[W.id])?u.get(e.properties[W.id]):null}])}}),H||P){var B=[le(o,null,t),le(o,null,n)],T=[X[X.length-1],X[0]],$=[t<A||re(t,o)===re(A,o),j<n||re(n,o)===re(j,o)];P?((H||void 0===Q.grouped.color)&&(Q.grouped.color=X),VisualJS.pub[VisualJS.id].legend={color:Q.grouped.color,text:Q.grouped.label},te.legend&&VisualJS.func.groupLegend(B,S,U,b,$,Q,Z,J)):H&&(B=[ne(o,null,t),ne(o,null,n)],VisualJS.pub[VisualJS.id].legend={color:T,text:B,symbol:[$[0]?"==":"<=",$[1]?"==":">="]},te.legend&&VisualJS.func.legend(B,X,S,U,b,$,Q.unit.label))}VisualJS.pub[VisualJS.id].heading=O}})()}}else{var L;J(G.lib.jquery,!0)?(L=!1,J(G.lib.jquery.flot,!1)):L=!J(G.lib.jquery.flot,!0),s&&J(G.lib.excanvas,!0);var E,z,I,M,F,B,T,O=function(){},W=[],q=[],C=[],P=Q.stacked||!1,H=function(){if(te.autoheading){var e,a,t,i,l,n,r=Q.time.length,s=Q.data.length;if(null===Q.data[0].val[0]){for(i=!(a=0),l=[];a<r;a++){for(e=0;e<s;e++)i=i&&null===Q.data[e].val[a];if(!i)break;l.push(i)}for(n=l.length,t=0;t<n;t++)if(l[t])for(Q.time.shift(),e=0;e<s;e++)Q.data[e].val.shift();r=Q.time.length}if(null===Q.data[0].val[r-1]){for(a=r,i=!0,l=[];a--;){for(e=0,s=Q.data.length;e<s;e++)i=i&&null===Q.data[e].val[a];if(!i)break;l.push(i)}for(t=l.length;t--;)if(l[t])for(Q.time.pop(),e=0;e<s;e++)Q.data[e].val.pop()}}var c=function(){};return P?J(G.lib.jquery.flot.stack,L):"tsbar"===Q.type&&(J(G.lib.jquery.flot.orderbars,L),c=function(e){return e.bars}),O=function(e,a){VisualJS.ticks=[];var t,i,l=a.length,n=e.length,r=te.grid&&te.grid.bar&&"number"==typeof te.grid.bar?te.grid.bar:2<=l&&4<n?.18:.2;for(t=0,i=a.length;t<i;t++)q.push([t,a[t]]),VisualJS.ticks.push([t,a[t]]);for(t=0,i=e.length;t<i;t++){for(var s=[],o=e[t].val,u=o.length,d=0;d<u;d++)s.push([d,o[d]]);"tsbar"!==Q.type||P||1===i?W.push({label:e[t].label,data:s}):W.push({label:e[t].label,data:s,bars:{show:!0,barWidth:r,order:t+1,lineWidth:2}})}var p=W.length;for(t=0;t<p;t++)C.push({data:W[t].data,label:W[t].label,bars:c(W[t]),shadowSize:te.grid.shadow});E=1<p},v()};switch(Array.max=function(e){return Math.max.apply(Math,e)},Q.type){case"xy":J(G.lib.jquery.flot.axisLabels,L),I=F=!(M=!0),T=v(),O=function(e,a,t){var i=function(e){var a,t={label:e.label,data:[],by:Array.isArray(e.by)&&"string"==typeof e.by[0]?e.by:null};if("object"==typeof e.x&&"object"==typeof e.y)for(G.canvas.axis.labelsText={x:e.x.label,y:e.y.label},a=0;a<e.x.val.length;a++)t.data.push([e.x.val[a],e.y.val[a]]);else e.val&&1<=e.val.length&&2==e.val[0].length&&(G.canvas.axis.labelsText={x:e.x,y:e.y},t.data=e.val);return t};if(Array.isArray(e)&&Array.isArray(e[0]))W=[e];else if(Array.isArray(e)&&"object"==typeof e[0]&&!Array.isArray(e[0]))for(var l=0;l<e.length;l++)W.push(i(e[l]))},E=!0;break;case"pyram":J(G.lib.jquery.flot.pyramid,L),F=M=!1,T=v(),O=function(e,a,t){p=Math.max(Array.max(e[0].val),Array.max(e[1].val)),W[0]={label:e[0].label,data:[],pyramid:{direction:"L"}},W[1]={label:e[1].label,data:[]};for(var i=0,l=t.length;i<l;i++)W[0].data[i]=[t[i],e[0].val[i]],W[1].data[i]=[t[i],e[1].val[i]]},I=P=z=!(E=!0);break;case"rank":var N=[];F=!(M=I=!1),T=v(),z=E=!(O=function(e,a,t){for(var i=[],l=0,n=e.length;l<n;l++){q[l]=[l,void 0!==e[n-l-1][0]?e[n-l-1][0]:t[n-l-1]];var r=void 0!==e[n-l-1][1]?e[n-l-1][1]:e[n-l-1];i.push(r),N[l]=[r,l]}W={data:N},p=Array.max(i)});break;case"pie":J(G.lib.jquery.flot.pie,L),F=M=I=!(B=!0),T=v(),O=function(e,a,t){var i,l;if("object"!=typeof t||null===t)for(l=e.length,i=0;i<l;i++)null!==e[i][1]&&W.push({label:e[i][0],data:e[i][1]});else if("number"==typeof e[0])for(l=t.length,i=0;i<l;i++)null!==e[i]&&W.push({label:t[i],data:e[i]})},E=!0;break;case"bar":J(G.lib.jquery.flot.categories,L),F=!(M=!1),T=v(),z=E=!(I=!(O=function(e,a,t){var i,l;if("object"!=typeof t||null===t)for(l=e.length,i=0;i<l;i++)null!==e[i][1]&&W.push(["<span>"+e[i][0]+"</span>",e[i][1]]);else if("number"==typeof e[0])for(l=t.length,i=0;i<l;i++)null!==e[i]&&W.push(["<span>"+t[i]+"</span>",e[i]])}));break;case"tsline":T=H(),I=!(F=!(M=!(z=null)));break;case"tsbar":T=H(),I=!(F=!(M=!(z=!0)))}VisualJS.chart=function(){O(Q.data,Q.time,Q.by),$.fn.UseTooltip=function(b){var h=[];$(this).bind("plothover",function(e,a,t){var i,l,n,r,s,o,u,d,p,c,y,f={},g={};if(t){if(h!=[t.seriesIndex,t.dataIndex])if(h=[t.seriesIndex,t.dataIndex],"xy"===Q.type){for(var x in u={x:void 0!==VisualJS.container[b].unit.position.x&&"start"===VisualJS.container[b].unit.position.x,y:void 0!==VisualJS.container[b].unit.position.y&&"start"===VisualJS.container[b].unit.position.y,z:void 0!==VisualJS.container[b].unit.position.z&&"start"===VisualJS.container[b].unit.position.z})d=u[x],u.hasOwnProperty(x)&&(p=VisualJS.container[b].unit.symbol&&"string"==typeof VisualJS.container[b].unit.symbol[x]?VisualJS.container[b].unit.symbol[x]:"",c=VisualJS.container[b].unit.label&&"string"==typeof VisualJS.container[b].unit.label[x]?VisualJS.container[b].unit.label[x]:"",d?(f[x]=p,g[x]=c):(f[x]="",g[x]=" "+c+" "+p),g[x]=""!==g[x]?" "+g[x]:"");o="<div><strong>"+f.x+re(t.datapoint[0],b,"x")+g.x+"</strong> "+(void 0!==m.xaxis.axisLabel?m.xaxis.axisLabel:"x")+"</div><div><strong>"+f.y+re(t.datapoint[1],b,"y")+g.y+"</strong> "+(void 0!==m.yaxis.axisLabel?m.yaxis.axisLabel:"y")+"</div>",o+=Array.isArray(W[t.seriesIndex].by)&&"string"==typeof W[t.seriesIndex].by[t.dataIndex]&&""!==W[t.seriesIndex].by[t.dataIndex]?W[t.seriesIndex].by[t.dataIndex]+("string"==typeof W[t.seriesIndex].label&&""!==W[t.seriesIndex].label?" ("+W[t.seriesIndex].label+")":""):"",se(o,a.pageX,a.pageY)}else i=t.datapoint[0],l=t.datapoint[1],n="bar"!==Q.type||Boolean(Q.data[0].val)?t.series.label:1<W.length?W[i][0]:W[0][i][0],r="rank"!==Q.type?n:q[l][1],s=!!("rank"!==Q.type&&"pie"!==Q.type&&"bar"!==Q.type||"bar"===Q.type&&Boolean(Q.data[0].val))&&(P||1===W.length?!!(Array.isArray(q)&&0<q.length)&&q[i][1]:"pyram"===Q.type?W[a.x<0?0:1].data[t.dataIndex][0]:q[t.dataIndex][1]),o="pyram"===Q.type?Math.abs(i):"rank"!==Q.type?"tsbar"!==Q.type?"pie"===Q.type?l[0][1]:l:P||1===W.length?W[t.seriesIndex].data[i][1]:l:i,y="bar"===Q.type&&Q.by?s?s+(r?VisualJS.container[b].tooltipseparator+r:""):r||"":s?r?r+VisualJS.container[b].tooltipseparator+s:s:r||"",se(le(b,y,o),a.pageX,a.pageY)}else $("#"+G.tooltipid).hide(),h=[]})};var m={colors:G.colors.series,series:{stack:z,bars:{show:F,barWidth:.7,align:"center",fill:.9},pie:{show:B,label:{show:!1}},lines:{show:I,lineWidth:te.grid.line},points:{show:M,radius:te.grid.point,fill:.85,fillColor:null}},legend:{show:te.legend&&E,position:Z.position||"ne"},grid:{borderWidth:te.grid.border,hoverable:!0,clickable:!1,mouseActiveRadius:10},xaxis:{show:te.axis.x,axisLabel:void 0!==u(G.canvas.axis,["labelsText","x"])?G.canvas.axis.labelsText.x:void 0,axisLabelUseCanvas:!0,axisLabelFontSizePixels:c=Number($("."+VisualJS.setup.clas).css("font-size").replace("px","")),axisLabelFontFamily:$("."+VisualJS.setup.clas).css("font-family"),axisLabelPadding:c,axisLabelColour:"#545454",labelWidth:28},yaxis:{show:te.axis.y,axisLabel:void 0!==u(G.canvas.axis,["labelsText","y"])?G.canvas.axis.labelsText.y:void 0,axisLabelUseCanvas:!0,axisLabelFontSizePixels:c,axisLabelFontFamily:$("."+VisualJS.setup.clas).css("font-family"),axisLabelPadding:c,axisLabelColour:"#545454"}};(b=function(){var e,a,t,i=VisualJS.id,l=q.length,n=ie(VisualJS.arr2html(Q.footer,K)||"");if($(ae).html("<header><"+_+' id="ARIAtitle" style="overflow:auto;">'+T+"</"+_+'></header><footer class="'+VisualJS.setup.footerclass+'" style="overflow:auto;">'+n+"</footer>"),VisualJS.getSize(i)){switch(t=G.typeclassprefix+Q.type,$(ae+" header").after('<main class="'+G.canvasclass+" "+t+" "+VisualJS.visualsize+'" style="width: '+VisualJS.width+"px; height: "+VisualJS.height+'px; display: block;"></main>'),m.xaxis.tickFormatter=function(e){return V(e,i,"x")},m.yaxis.tickFormatter=function(e){return V(e,i,"y")},m.xaxis.tickLength=Q.axis.ticks.x?null:0,m.yaxis.tickLength=Q.axis.ticks.y?null:0,m.grid.markings=Q.grid.markings||null,Q.type){case"xy":Q.range?(Q.range.x?Array.isArray(Q.range.x)?(m.xaxis.min=Q.range.x[0],m.xaxis.max=Q.range.x[1]):(m.xaxis.min=0,m.xaxis.max=Q.range.x):(m.xaxis.min=null,m.xaxis.max=null),Q.range.y?Array.isArray(Q.range.x)?(m.yaxis.min=Q.range.y[0],m.yaxis.max=Q.range.y[1]):(m.yaxis.min=0,m.yaxis.max=Q.range.y):(m.yaxis.min=null,m.yaxis.max=null)):(m.xaxis.min=null,m.yaxis.min=null,m.xaxis.max=null,m.yaxis.max=null),m.hooks={drawBackground:function(e,a){var t=e.getXAxes()[0];void 0!==t.ticks&&0<t.ticks.length&&(t.datamin=t.ticks[0].v,t.datamax=t.ticks[t.ticks.length-1].v)}},$.plot(h,W,m);break;case"pyram":m.series.pyramid={show:!0,barWidth:1},m.yaxis.show=11<VisualJS.height/W[0].data.length&&te.axis.y,m.xaxis.max="number"==typeof te.range?p*te.range:Array.isArray(te.range)?te.range[1]:null,m.xaxis.tickFormatter=function(e){return V(e,i,"x",re)},$.plot(h,W,m);break;case"rank":m.yaxis.tickLength=null,m.series.bars.horizontal=!0,m.yaxis.ticks=11<VisualJS.height/l?q.slice(0):0,!1===Q.axis.labels.y&&(m.yaxis.ticks=k(m.yaxis.ticks)),"number"==typeof te.range?m.xaxis.max=p*te.range:Array.isArray(te.range)&&(m.xaxis.min=te.range[0],m.xaxis.max=te.range[1]),m.xaxis.tickFormatter=function(e){return V(e,i,"x",re)},m.yaxis.autoscaleMargin=0,m.series.bars.barWidth=.5,$.plot(h,[W],m);break;case"pie":$.plot(h,W,m);break;case"bar":if(m.xaxis.tickLength=0,Q.by&&Q.by.length&&"object"==typeof Q.data[0]){for(q=[],W=[],e=0;e<Q.by.length;e++)W.push({label:Q.by[e],data:[]});for(e=a=0;e<Q.data.length;e++){Q.data[e].val.length%2==0?q.push([a+(Q.data[e].val.length-1)/2,Q.data[e].label]):q.push([Math.floor(a+Q.data[e].val.length/2),Q.data[e].label]);for(var r=0;r<Q.data[e].val.length;r++)W[r].data.push([a,Q.data[e].val[r]]),a++;a+=2}m.xaxis.ticks=q,!1===Q.axis.labels.x&&(m.xaxis.ticks=k(m.xaxis.ticks)),m.bars={show:!0}}else m.xaxis.mode="categories",W=[W],m.yaxis.tickFormatter=function(e){return V(e,i,"y",re)};"number"!=typeof te.range&&null!==te.range?(m.yaxis.min=te.range[0],m.yaxis.max=te.range[1]):"number"==typeof te.range&&(m.yaxis.min=null,m.yaxis.max=te.range),$.plot(h,W,m),!1!==Q.axis.labels.x&&!1!==Q.axis.labels.y||(!(c="<style>")===Q.axis.labels.x&&(c+=h+" .flot-x-axis .flot-tick-label{display:none;}"),!1===Q.axis.labels.y&&(c+=h+" .flot-y-axis .flot-tick-label{display:none;}"),c+="</style>",$(h).append(c));break;case"tsline":null===m.grid.markings&&(m.grid.markings=[{color:"#333333",lineWidth:1,yaxis:{from:0,to:0}}]);case"tsbar":"tsbar"===Q.type&&(m.xaxis.tickLength=0),m.yaxis.tickFormatter=function(e){return V(e,i,"y",re)};var s,o=VisualJS.width/l,u=[],d="string"==typeof Q.first&&Q.first?Q.first:6===VisualJS.ticks[0][1].length?"01":"1";switch("number"!=typeof te.range&&null!==te.range?(m.yaxis.min=te.range[0],m.yaxis.max=te.range[1]):"number"==typeof te.range&&(m.yaxis.min=null,m.yaxis.max=te.range),VisualJS.ticks[0][1].length){case 4:if(o<33){for(s=16.5<o?2:10.5<o?3:9<o?4:10,e=0;e<l;e++)u[e]=e%s?[q[e][0],""]:[q[e][0],q[e][1]];m.xaxis.ticks=u}else m.xaxis.ticks=q;!1===Q.axis.labels.x&&(m.xaxis.ticks=k(m.xaxis.ticks));break;case 5:case 6:if(o<56){for(o<8.5&&56<l&&$("main").addClass(G.mini),e=0;e<l;e++)u[e]=VisualJS.ticks[e][1].slice(4)!==d?[VisualJS.ticks[e][0],""]:[VisualJS.ticks[e][0],VisualJS.ticks[e][1].slice(0,4)],q[e][1]=w(VisualJS.ticks[e][1],VisualJS.id);m.xaxis.ticks=u}else{for(e=0;e<l;e++)q[e][1]=w(VisualJS.ticks[e][1],VisualJS.id);m.xaxis.ticks=q}!1===Q.axis.labels.x&&(m.xaxis.ticks=k(m.xaxis.ticks));break;case 7:if(o<55){for(s=20<o?2:10<o?3:4,e=0;e<l;e++)u[e]=e%s?[q[e][0],""]:[q[e][0],q[e][1]];m.xaxis.ticks=u}else m.xaxis.ticks=q;!1===Q.axis.labels.x&&(m.xaxis.ticks=k(m.xaxis.ticks));break;default:m.xaxis.ticks=q,!1===Q.axis.labels.x&&(m.xaxis.ticks=k(m.xaxis.ticks))}$.plot(h,C,m)}$(h).UseTooltip(VisualJS.id),VisualJS.pub[VisualJS.id].heading=T,$(h).find("canvas").attr("role","img").attr("aria-labelledBy","ARIAtitle")}})()}}VisualJS.scripts.length&&"object"==typeof LazyLoad?LazyLoad.js(VisualJS.scripts,S):S()}};if(Array.isArray||(Array.isArray=function(e){return"[object Array]"===Object.prototype.toString.call(e)}),"function"!=typeof visual)var visual=VisualJS.load;
/*
Copyright (c) 2020 Institut d'Estadistica de Catalunya (Idescat)
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
VisualJS.setup={//v.1.2.0
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
					exists: function(){ return typeof jQuery.plot.plugins==="object" && typeof jQuery.plot.plugins[0]==="object" && jQuery.plot.plugins[0].name==="stack";  }
				},
				orderbars: {
					js: "https://visual.js.org/lib/jquery.flot.orderbars.js",
					exists: function(){ return typeof jQuery.plot.plugins==="object" && typeof jQuery.plot.plugins[0]==="object" && jQuery.plot.plugins[0].name==="orderBars"; }
				},
				pyramid: {
					js: "https://visual.js.org/lib/jquery.flot.pyramid.js",
					exists: function(){ return typeof FlotPyramid==="object"; }
				},
				categories: {
					js: "https://visual.js.org/lib/jquery.flot.categories.js",
					exists: function(){ return typeof jQuery.plot.plugins==="object" && typeof jQuery.plot.plugins[0]==="object" && jQuery.plot.plugins[0].name==="categories"; }
				},
				pie: {
					js: "https://visual.js.org/lib/jquery.flot.pie.js",
					exists: function(){ return typeof jQuery.plot.plugins==="object" && typeof jQuery.plot.plugins[0]==="object" && jQuery.plot.plugins[0].name==="pie"; }
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
			label: "European Union: 27 countries (from 2020)",
			js: "https://visual.js.org/maps/eu272020.js",
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
		com: {
			label: "Catalonia: counties (before 2015)",
			js: "https://visual.js.org/maps/cat2013com.js",
			exists: function(){ return typeof VisualJS.map.com!=="undefined"; }
		},
		com2015: {
			label: "Catalonia: counties",
			js: "https://visual.js.org/maps/cat2015com.js",
			exists: function(){ return typeof VisualJS.map.com2015!=="undefined"; }
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
		com242015: {
			label: "Catalonia. Osona: municipalities",
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
		com32: {
			label: "Catalonia. La Segarra: municipalities",
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
		com35: {
			label: "Catalonia. El Solsonès: municipalities",
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
		at: {
			label: "Catalonia. Regions of the Territorial Plan",
			js: "https://visual.js.org/maps/cat2014at.js",
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
