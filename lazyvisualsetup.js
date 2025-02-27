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
var visual,VisualJS={version:"1.2.9",show:!0,old:!1,fixed:null,width:500,bwidth:500,height:500,normal:500,scripts:[],map:{},container:{},pub:{},func:{},callback:null,getSize:function(e){function t(e,a){return("function"==typeof getComputedStyle?getComputedStyle(e):e.currentStyle)[a]}function a(e){return(e=s(e))[0]instanceof Element?e[0]:e[0]&&e[0][0]?e[0][0]:void 0}function i(e){var a;return e?(a=e.offsetHeight,t(e),a+Math.round(parseFloat(t(e,"marginTop"))+parseFloat(t(e,"marginBottom")))):0}var l=VisualJS.setup,n=l.html.heading,r="."+VisualJS.setup.footerclass,s="undefined"!=typeof jQuery?jQuery:"undefined"!=typeof d3?d3.select:document.querySelectorAll.bind(document),o=window,u=document,d=u.documentElement,p=u.getElementsByTagName("body")[0],u=u.getElementById(e),e=i(a(n)),n=i(a(r)),r=o.innerHeight||d.clientHeight||p.clientHeight,u=Math.round(parseFloat(t(u,"marginTop"))+parseFloat(t(u,"marginBottom")));return void 0!==r&&void 0!==e&&void 0!==n&&(null===VisualJS.fixed?(VisualJS.bwidth=o.innerWidth||d.clientWidth||p.clientWidth,VisualJS.width=VisualJS.bwidth-l.padding.w,VisualJS.height=Math.floor(r-e-n-u-10)):(VisualJS.bwidth=d.clientWidth||p.clientWidth,VisualJS.width=VisualJS.fixed[0]-l.padding.w,VisualJS.height=Math.floor(VisualJS.fixed[1]-e-n-u-10))),VisualJS.visualsize=VisualJS.width<VisualJS.normal?l.mini:l.normal,10<VisualJS.width&&10<VisualJS.height},arr2html:function(e,a){var t="";return void 0!==e&&(Array.isArray(e)?e.forEach(function(e){"string"==typeof e&&""!==e&&(t+="<p>"+e+"</p>")}):"string"==typeof e&&""!==e&&(t+="<p>"+e+"</p>")),t},iframe:function(e,a){var t,i=VisualJS.setup,i=("string"==typeof e.clas?e:i).clas,l='<!DOCTYPE html>\n\x3c!--[if lt IE 7]><html class="lt-ie9 lt-ie8 lt-ie7"> <![endif]--\x3e\n\x3c!--[if IE 7]><html class="lt-ie9 lt-ie8"> <![endif]--\x3e\n\x3c!--[if IE 8]><html class="lt-ie9"> <![endif]--\x3e\n\x3c!--[if gt IE 8]>\x3c!--\x3e <html> \x3c!--<![endif]--\x3e\n<head>';"string"==typeof a&&(-1===a.indexOf("{")?l+='<link href="'+a+'" rel="stylesheet" type="text/css"/>':l+='<style type="text/css">'+a+"</style>"),l=(l=(l=(l+='<script type="text/javascript" src="'+VisualJS.setup.main.visual+'"><\/script>')+'<script type="text/javascript" src="'+VisualJS.setup.main.setup+'"><\/script>')+'<script type="text/javascript" src="'+VisualJS.setup.main.lazy+'"><\/script>')+'</head><body><div id="'+e.id+'" class="'+i+'"></div><script>window.setTimeout(function(){visual('+JSON.stringify(e)+");},1);<\/script></body></html>",a=document,i=a.createElement("iframe"),a=a.getElementById(e.id),i.setAttribute("title",e.title?VisualJS.setup.i18n.text.iframetitle[e.lang]+": "+e.title:VisualJS.setup.i18n.text.iframetitle[e.lang]),i.setAttribute("aria-hidden","true"),i.setAttribute("role","widget"),i.frameBorder="0",i.scrolling="no",a.parentNode.insertBefore(i,a.nextSibling),e=l,void 0!==(a=i)&&(a.contentDocument?t=a.contentDocument:a.contentWindow?t=a.contentWindow.document:window.frames[a.name]&&(t=window.frames[a.name].document),t)&&(t.open(),t.write(e),t.close())},compare:function(t){function e(){var e,a;VisualJS.getSize(n)&&(e=VisualJS.height+("string"==typeof t.footer&&""!==t.footer?14:0),a=VisualJS.width+i.margin,a="iframe{ float: left; width: "+Math.floor((a-l)/2-i.margin)+"px; height:"+e+"px; }",f.styleSheet?f.styleSheet.cssText=a:f.innerHTML=a,y.style.height=e+"px")}var a,i=VisualJS.setup,l=VisualJS.setup.separator,n=("string"==typeof t.id?t:i).id,r="[object Array]"===Object.prototype.toString.call(t.css)?0===t.css.length?["",""]:1===t.css.length?[t.css[0],t.css[0]]:t.css:[t.css,t.css],s=document,o=s.createElement(i.html.heading),u="string"==typeof t.title?t.title:"",d=s.createElement("p"),p=i.html,p="string"==typeof t.footer?VisualJS.arr2html(t.footer,p):"",c=s.getElementById(n),y=s.createElement("div"),f=s.createElement("style");o.innerHTML=u,o.style.overflow="auto",d.innerHTML=p,d.style.overflow="auto",d.style.clear="both",c.appendChild(o),c.appendChild(d),s.getElementsByTagName("head")[0].appendChild(f),y.style.width=l+"px","styleFloat"in y.style?y.style.styleFloat="left":y.style.cssFloat="left";for(var g=0;g<2;g++)a=s.createElement("span"),"string"!=typeof t.load[g].id&&(t.load[g].id=i.compareids[g]),a.id=t.load[g].id,c.insertBefore(a,d),VisualJS.iframe(t.load[g],r[g]);c.insertBefore(y,a),e(),VisualJS.fixed||(window.addEventListener?window.addEventListener("resize",e,!1):window.attachEvent?window.attachEvent("onresize",e):window.onresize=e)},load:function(e){function a(a){function e(e){a.source.postMessage(JSON.stringify(e),"*")}if("string"==typeof a.data?t=JSON.parse(a.data):"object"==typeof a.data&&(t=a.data),t)if(void 0===t.action)e({type:"error",data:[{id:"400",label:'"action" is required.'}]});else if("send"===t.action){var t=t.id||VisualJS.id,t=VisualJS.container[t];if(t){if("cmap"===t.type&&!t.data[0].hasOwnProperty("label")){for(var i=[],l=VisualJS.map[t.by],n=l.features.length;n--;)i[l.features[n].properties[l.id]]=l.features[n].properties[l.label];for(var r=t.data,s=r.length;s--;)r[s].label=i[r[s].id]}e(t)}else e({type:"error",data:[{id:"404",label:'A visualisation with the specified "id" was not found'}]})}else e({type:"error",data:[{id:"400",label:'"action" value is not correct.'}]})}if(void 0===VisualJS.setup&&window.alert("Visual: Setup not found (visual.setup.js)!"),"[object Array]"!==Object.prototype.toString.call(e))VisualJS.get(e);else for(var t=0,i=e.length;t<i;t++)VisualJS.get(e[t]);VisualJS.container[VisualJS.id].listen&&(window.addEventListener?window.addEventListener("message",a,!1):window.attachEvent("onmessage",a))},get:function(P){function e(e,a,t){if("string"==typeof e)a.match(typeof P[e])||(P[e]=t[e]);else if(!a.match(typeof r(P,e))){for(var a=P,i=e,t=r(t,e),l=a,n=0;n<=i.length-2;n++)void 0===l[i[n]]&&(l[i[n]]={}),l=l[i[n]];l[i[i.length-1]]=t}}function r(e,a){for(var t=e,i=0;i<a.length;i++){if(void 0===t[a[i]]){t=void 0;break}t=t[a[i]]}return t}function E(){var e="invalid";return Array.isArray(P.data)&&(Array.isArray(P.data[0])?e="array":I(P.data[0])&&(e=I(P.data[0].z)?"xyz":I(P.data[0].y)?"xy":void 0!==P.data[0].x||void 0!==P.data[0].y||!Array.isArray(P.data[0].val)||null===P.data[0].val[0]||2!=P.data[0].val[0].length&&3!=P.data[0].val[0].length?"object":"points")),e}var o,u,H=VisualJS.setup,U=H.html,N=H.canvas,R=U.heading,Q="."+VisualJS.setup.footerclass,z=VisualJS.old||H.func.old("ie9"),I=function(e){return"object"==typeof e&&null!==e},M=[["show","boolean",VisualJS],["callback","function",VisualJS],["id","string",H],["listen","boolean",H],["dec","number|object",N],["autoheading","boolean",N],["legend","boolean",N],["grid","object",N],[["grid","border"],"number",N],[["grid","shadow"],"number",N],[["grid","line"],"number",N],[["grid","point"],"number",N],[["grid","markings"],"object",N],["axis","object",N],[["axis","x"],"boolean",N],[["axis","y"],"boolean",N],[["axis","labels","x"],"boolean",N],[["axis","labels","y"],"boolean",N],[["axis","ticks","x"],"boolean",N],[["axis","ticks","y"],"boolean",N]];void 0===N.axis.labels&&(N.axis.labels={x:!0,y:!0}),void 0===N.axis.ticks&&(N.axis.ticks={x:!0,y:!0});for(var a,t,i,l,n,s=0;s<M.length;s++)e(M[s][0],M[s][1],M[s][2]);VisualJS.scripts=[],VisualJS.id=P.id,VisualJS.pub[VisualJS.id]={heading:null,legend:null},"object"==typeof P.fixed&&(VisualJS.fixed=P.fixed),"object"==typeof P.unit&&null!==P.unit?(e(["unit","label"],"string|object",N),e(["unit","symbol"],"string|object",N),e(["unit","position"],"string|object",N)):P.unit=N.unit,P.range=(a=P.range,l=E(),"object"!=typeof a||null===a||Array.isArray(a)||"array"!==l&&"object"!==l||"xy"!==P.type&&(a="rank"===P.type||"pyram"===P.type?a.x:a.y),Array.isArray(a)&&2===a.length&&null===a[0]&&null===a[1]?P.data&&"object"===l&&(i=[],P.data.forEach(function(e){i=i.concat(e.val)}),0<=(n=[Math.min.apply(null,i),Math.max.apply(null,i)])[0]&&0<=n[1]?a=[0,null]:n[0]<=0&&n[1]<=0&&(a=[null,0])):"object"==typeof a&&!Array.isArray(a)&&null!==a&&(Array.isArray(a.x)&&null===a.x[0]&&null===a.x[1]||Array.isArray(a.y)&&null===a.y[0]&&null===a.y[1])?(u={x:[],y:[]},n={x:[],y:[]},t={x:[],y:[]},"points"===l?P.data.forEach(function(e){e.val.forEach(function(e){u.x.push(e[0]),u.y.push(e[1])})}):"xy"!==l&&"xyz"!==l||P.data.forEach(function(e){u.x=u.x.concat(e.x.val),u.y=u.y.concat(e.y.val)}),n.x=Math.min.apply(null,u.x),t.x=Math.max.apply(null,u.x),n.y=Math.min.apply(null,u.y),t.y=Math.max.apply(null,u.y),Array.isArray(a.x)&&null===a.x[0]&&null===a.x[1]&&(a.x=0<=n.x&&0<=t.x?[0,null]:n.x<=0&&t.x<=0?[null,0]:[null,null]),Array.isArray(a.y)&&null===a.y[0]&&null===a.y[1]&&(a.y=0<=n.y&&0<=t.y?[0,null]:n.y<=0&&t.y<=0?[null,0]:[null,null])):"xy"!==l&&"xyz"!==l&&"points"!==l||("number"==typeof a||Array.isArray(a)?a={x:[null,null],y:Array.isArray(a)?a:[null,a]}:"object"==typeof a&&null!==a||(a={x:[null,null],y:[null,null]})),a),P.lang=P.lang||H.i18n.lang,"number"==typeof P.range||void 0!==(n=P.range)&&"[object Array]"===Object.prototype.toString.call(n)&&2===n.length&&"number"==typeof n[0]&&"number"==typeof n[1]&&n[0]<n[1]||("object"==typeof P.range&&null!==P.range&&!Array.isArray(P.range)||(P.range="number"==typeof P.range||Array.isArray(P.range)&&2===P.range.length?P.range:N.range.hasOwnProperty(P.type)&&"number"==typeof N.range[P.type]?N.range[P.type]:null)),P.unit=(e=>{var a,t;for(t in E(),e)e.hasOwnProperty(t)&&(a=e[t],"xy"!==P.type)&&("rank"===P.type||"pyram"===P.type?a&&void 0!==a.x?e[t]=a.x:e[t]="string"==typeof a?a:"":a&&void 0!==a.y?e[t]=a.y:e[t]="string"==typeof a?a:"");return e})(P.unit),P.tooltipseparator=H.tooltipseparator&&"string"==typeof H.tooltipseparator?H.tooltipseparator:" / ",VisualJS.container[VisualJS.id]=P;function F(){return!1!==Y.tooltip}function d(){var t,e,a;return!1===Y.autoheading?Y.title||"":(t=[],e=function(e,a){"string"==typeof e&&""!==e&&(!0===a&&(e='<span class="'+VisualJS.setup.nowrapclass+'">'+e+"</span>"),t.push(e))},a=null!==Y.time&&"object"==typeof Y.time?f(Y.time[0],VisualJS.id)+"&ndash;"+f(Y.time[Y.time.length-1],VisualJS.id):f(Y.time,VisualJS.id),e(Y.title,!1),e(Y.geo,!0),e(a,!0),G(t.join(". ")))}function B(){var e,a,t=!1;"function"==typeof VisualJS.chart&&(F()&&!(a=document).getElementById(VisualJS.setup.tooltipid)&&((e=a.createElement("div")).setAttribute("role","tooltip"),e.id=VisualJS.setup.tooltipid,e.style.display="none",a.body.appendChild(e)),Y.show&&VisualJS.chart(),VisualJS.fixed||(window.addEventListener?window.addEventListener("resize",g,!1):window.attachEvent?window.attachEvent("onresize",g):window.onresize=g),t=!0),null!==Y.callback&&Y.callback.call({id:VisualJS.id,chart:t,heading:VisualJS.pub[VisualJS.id].heading,legend:VisualJS.pub[VisualJS.id].legend})}function G(e){return String(e).replace(/&amp;/g,"&")}function p(e,a){return!(a&&e.exists.call()||(VisualJS.scripts.push(e.js),0))}function K(e,a,t){var i="number"==typeof t&&""!==VisualJS.container[e].unit.label?" "+VisualJS.container[e].unit.label:"",l="number"==typeof t?VisualJS.container[e].unit.symbol:"",e=(t=D(t,e))!==VisualJS.setup.i18n.text.na[VisualJS.container[e].lang]?"end"===VisualJS.container[e].unit.position?t+i+(""!==l?" "+l:l):l+t+i:t;return a?"<strong>"+e+"</strong> "+a:e}function Z(e,a,t){var i="number"==typeof t?VisualJS.container[e].unit.symbol:"",e=(t=D(t,e))!==VisualJS.setup.i18n.text.na[VisualJS.container[e].lang]?"end"===VisualJS.container[e].unit.position?t+""+(""!==i?" "+i:i):i+t+"":t;return a?"<strong>"+e+"</strong> "+a:e}function c(e,a,t,i){return P.axis.labels[t]?("function"==typeof i?i:D)(e,a,t):""}function y(e){for(var a=[],t=0;t<e.length;t++)Array.isArray(e[t])?a.push([e[t][0],""]):a.push([e[t],""]);return a}function f(e,a){var t,i,l;if(!h){if(!e)return null;if(isNaN(e))return e;switch(e.length){case 5:t=VisualJS.setup.i18n.text.quarter,l=T("aaaaq",P.lang);break;case 6:t=VisualJS.setup.i18n.text.month,l=T("aaaamm",P.lang);break;default:return e}h={label:t,text:t[VisualJS.container[a].lang],template:l}}return void 0===h.label||void 0===h.text||void 0===(a=h.text[e.slice(4)-1])?e:(i=e.slice(0,4),h.template.replace("{{period}}",a).replace("{{year}}",i))}function _(e,a,t){var i=document.getElementById(VisualJS.setup.tooltipid),l=VisualJS.bwidth-VisualJS.setup.margin,n={},e=(i.innerHTML=e,i.style.display="block",i.clientWidth/2);n.x=a-e,n.y=t-i.clientHeight-5,l<a+e?n.x-=a+e-l:n.x<VisualJS.setup.margin&&(n.x+=VisualJS.setup.margin-n.x),n.y<VisualJS.setup.margin&&(n.y+=1.75*i.clientHeight),i.style.left=n.x+"px",i.style.top=n.y+"px"}var g,X="#"+VisualJS.id,x=X+" ."+H.canvasclass,Y=VisualJS.container[VisualJS.id],h=null,D=function(e,a,t){if(null==e)return VisualJS.setup.i18n.text.na[VisualJS.container[a].lang];if("number"!=typeof e)return"";for(var i=/(\d+)(\d{3})/,t=("object"==typeof VisualJS.container[a].dec&&null!==VisualJS.container[a].dec&&"string"==typeof t&&"number"==typeof VisualJS.container[a].dec[t]?e.toFixed(VisualJS.container[a].dec[t]):"number"==typeof VisualJS.container[a].dec?e.toFixed(VisualJS.container[a].dec):String(e)).split("."),l=t[0],e=1<t.length?VisualJS.setup.i18n.text.dec[VisualJS.container[a].lang]+t[1]:"";i.test(l);)l=l.replace(i,"$1"+VisualJS.setup.i18n.text.k[VisualJS.container[a].lang]+"$2");return l+e},T=function(e,a){var t=H.i18n.template;if(t){if("string"==typeof t)return t;if("object"==typeof t&&t[e]&&"string"==typeof t[e][a])return t[e][a]}return"{{period}} {{year}}"};if("cmap"===P.type)if(z)document.getElementById(VisualJS.id).innerHTML="<p>"+H.i18n.text.oldbrowser[Y.lang]+"</p>";else{if("string"!=typeof P.by)return;p(H.lib.maps,!0),p(H.lib.d3,!0),p(H.map[P.by],!0),VisualJS.chart=function(){var E=d(),z=VisualJS.map[P.by],I=z.area[0],M=z.area[1],F=null!==P.grouped&&"object"==typeof P.grouped&&Array.isArray(P.grouped.label)&&0<P.grouped.label.length&&P.data[0].hasOwnProperty("group"),B=P.data[0].hasOwnProperty("val"),T=F?P.grouped.label.length:B?H.colors.map.max:1,$=H.colorclassprefix,O=VisualJS.func.colors(H.colors.map.base,T,"fill",$,F&&!B&&"object"==typeof P.grouped.color&&P.grouped.color.length===P.grouped.label.length?P.grouped.color:[],VisualJS.id),q=d3.select(X),e=d3.geo[z.projection](),e=("object"==typeof z.center&&"function"==typeof e.center?e.center(z.center):e).scale(z.scale).translate([I/2,M/2]),W=d3.geo.path().projection(e),C=d3.select("#"+H.tooltipid);(g=function(){var e=G(VisualJS.arr2html(P.footer,U)||"");if(q.html("<header><"+R+' id="ARIAtitle" style="overflow:auto;" ></'+R+'></header><footer class="'+VisualJS.setup.footerclass+'" style="overflow:auto;"></footer>'),d3.select(X+" "+R).html(E),d3.select(X+" "+Q).html(e),VisualJS.getSize(VisualJS.id)){var l,i,a,t,n,r,s=VisualJS.id,o=d3.map(),u=d3.map(),d=P.data[0].hasOwnProperty("label"),p=[],c=function(){},e=VisualJS.height/M,y=VisualJS.width/I,f=Math.min(Math.round(I*e),VisualJS.width),g=Math.min(Math.round(M*y),VisualJS.height),x=Math.floor((VisualJS.width-f)/2),h=Math.floor((VisualJS.height-g)/2),e=e<y?e:y,y=q.insert("svg:svg",Q).attr("viewBox","0 0 "+f+" "+g).attr("width",f).attr("height",g).attr("role","img").attr("aria-labelledby","ARIAtitle"),b=!0;F&&B?(n=[],[1,P.grouped.label.length].forEach(function(e){for(var a=0;a<P.data.length;a++)if(P.data[a].group===e){n.push(P.data[a].val);break}}),n[1]<n[0]&&(b=!1)):F&&P.grouped.color&&(O=P.grouped.color),F?(l=d3.map(),c=function(e,a){e.set(a.id,a.group)},VisualJS.groupedLabelSize=null,a=function(e,a,t){if(!B||b)return $+(e.get(t[z.id])-1);if(!VisualJS.groupedLabelSize){for(var i={},l=0;l<d3.values(e).length;l++)i[d3.values(e)[l]]=1+(i[d3.values(e)[l]]||0);VisualJS.groupedLabelSize=Object.keys(i).length}return $+(VisualJS.groupedLabelSize-e.get(t[z.id]))},i=function(e,a){e=P.grouped.label[e.get(a[z.id])-1],a=d?u.get(a[z.id]):a[z.label];return void 0!==e&&(a+=" <em>"+e+"</em>"),a},VisualJS.func.legend):(B?(a=function(e,a,t,i,l){a=a.get(t[z.id]);return void 0===a?"":i===l?$+(T/2).toFixed(0):d3.scale.quantize().domain([i,l]).range(d3.range(T).map(function(e){return $+e}))(a)},VisualJS.func.legend):a=function(e,a,t){return""!==a.get(t[z.id])?"":$+(T-1)},i=function(e,a){return d?u.get(a[z.id]):a[z.label]});for(var m=0,v=P.data,S=v.length;m<S;m++)(r=v[m]).hasOwnProperty("val")?null!==r.val&&(o.set(r.id,r.val),p.push(r.val)):o.set(r.id,""),d&&u.set(r.id,r.label),c(l,r);p.sort(function(e,a){return e-a});var J,f=p[0],V=p[p.length-1],k=!1,w=null,A=null,j=function(e,a,t){""!==e.properties[z.id]&&""!==e.properties[z.label]&&(B||F||void 0!==o.get(e.properties[z.id]))&&_(K(s,i(l,e.properties),o.get(e.properties[z.id])),a,t)},L="number"==typeof Y.range?(t=d3.quantile(p,Y.range),d3.quantile(p,1-Y.range)):(t=Y.range[0],Y.range[1]);"function"!=typeof Y.click&&(Y.click=function(){}),y.style("margin-left",x+"px"),y.style("margin-top",h+"px"),y.style("margin-bottom",h+"px"),y.append("g").attr("class",H.areaclass).attr("transform","scale("+e+")").selectAll("path").data(z.features).enter().append("svg:path").attr("class",function(e){return""===e.properties[z.id]||""===e.properties[z.label]||!B&&void 0===o.get(e.properties[z.id])?$+"nohover":a(l,o,e.properties,t,L)}).attr("tabindex",function(){return d3.select(this).classed($+"nohover")?"-1":"0"}).attr("role","presentation").attr("d",W).on("mousemove",function(e){j(e,event.pageX,event.pageY)}).on("mouseout",function(){return C.style("display","none")}).on("mousedown",function(){k=!0}).on("mouseup",function(){k=!1}).on("focusout",function(){return C.style("display","none")}).on("focusin",function(e,a){var t=(new Date).getTime(),i=!0;A=k?(Y.priv&&Y.priv.click?500<t-Y.priv.click?(i=!0,Y.priv.click=t):i=!1:Y.priv={click:t},i&&Y.click.apply(null,[{id:e.properties[z.id],label:d?void 0!==u.get(e.properties[z.id])?u.get(e.properties[z.id]):null:e.properties[z.label],position:{x:event.pageX,y:event.pageY},group:F&&void 0!==l.get(e.properties[z.id])?{num:l.get(e.properties[z.id]),label:Y.grouped.label[l.get(e.properties[z.id])-1]}:null,value:B&&void 0!==o.get(e.properties[z.id])?o.get(e.properties[z.id]):null}]),w=event.pageX,event.pageY):(J=d3.select(this).node().getBoundingClientRect(),w=(J.left+J.right)/2,(J.top+J.bottom)/2),j(e,w,A)}).on("keyup",function(e){var a;"Enter"===event.key&&(a=d3.select(this).node().getBoundingClientRect(),Y.click.apply(null,[{id:e.properties[z.id],label:d?void 0!==u.get(e.properties[z.id])?u.get(e.properties[z.id]):null:e.properties[z.label],position:{x:a.left,y:a.top},group:F&&void 0!==l.get(e.properties[z.id])?{num:l.get(e.properties[z.id]),label:Y.grouped.label[l.get(e.properties[z.id])-1]}:null,value:B&&void 0!==o.get(e.properties[z.id])?o.get(e.properties[z.id]):null}]))}),(B||F)&&(x=[K(s,null,t),K(s,null,L)],h=[O[O.length-1],O[0]],e=[t<f||D(t,s)===D(f,s),V<L||D(L,s)===D(V,s)],F?(!B&&void 0!==P.grouped.color||(P.grouped.color=O),VisualJS.pub[VisualJS.id].legend={color:P.grouped.color,text:P.grouped.label},Y.legend&&VisualJS.func.groupLegend(x,y,C,g,e,P,N,b)):B&&(x=[Z(s,null,t),Z(s,null,L)],VisualJS.pub[VisualJS.id].legend={color:h,text:x,symbol:[e[0]?"==":"<=",e[1]?"==":">="]},Y.legend)&&VisualJS.func.legend(x,O,y,C,g,e,P.unit.label)),VisualJS.pub[VisualJS.id].heading=E}})(),document.querySelectorAll(".visual .VisualJSarea path").forEach(function(e){e.addEventListener("mouseenter",function(){this.parentNode.appendChild(this)})})}}else{p(H.lib.jquery,!0)?(b=!1,p(H.lib.jquery.flot,!1)):b=!p(H.lib.jquery.flot,!0),z&&p(H.lib.excanvas,!0);var b,O,m=function(){},v=[],S=[],q=[],J=P.stacked||!1,W=function(){if(Y.autoheading){var e,a,t,i,l,n,r=P.time.length,s=P.data.length;if(null===P.data[0].val[0]){for(i=!(a=0),l=[];a<r;a++){for(e=0;e<s;e++)i=i&&null===P.data[e].val[a];if(!i)break;l.push(i)}for(n=l.length,t=0;t<n;t++)if(l[t])for(P.time.shift(),e=0;e<s;e++)P.data[e].val.shift();r=P.time.length}if(null===P.data[0].val[r-1]){for(a=r,i=!0,l=[];a--;){for(e=0,s=P.data.length;e<s;e++)i=i&&null===P.data[e].val[a];if(!i)break;l.push(i)}for(t=l.length;t--;)if(l[t])for(P.time.pop(),e=0;e<s;e++)P.data[e].val.pop()}}var c=function(){};return J?p(H.lib.jquery.flot.stack,b):"tsbar"===P.type&&(p(H.lib.jquery.flot.orderbars,b),c=function(e){return e.bars}),m=function(e,a){VisualJS.ticks=[];for(var t=a.length,i=e.length,l=Y.grid&&Y.grid.bar&&"number"==typeof Y.grid.bar?Y.grid.bar:2<=t&&4<i?.18:.2,n=0,r=a.length;n<r;n++)S.push([n,a[n]]),VisualJS.ticks.push([n,a[n]]);for(n=0,r=e.length;n<r;n++){for(var s=[],o=e[n].val,u=o.length,d=0;d<u;d++)s.push([d,o[d]]);"tsbar"!==P.type||J||1===r?v.push({label:e[n].label,data:s}):v.push({label:e[n].label,data:s,bars:{show:!0,barWidth:l,order:n+1,lineWidth:2}})}var p=v.length;for(n=0;n<p;n++)q.push({data:v[n].data,label:v[n].label,bars:c(v[n]),shadowSize:Y.grid.shadow});j=1<p},d()};switch(Array.max=function(e){return Math.max.apply(Math,e)},P.type){case"xy":p(H.lib.jquery.flot.axisLabels,b),V=w=!(k=!0),A=d(),m=function(e,a,t){if(Array.isArray(e)&&Array.isArray(e[0]))v=[e];else if(Array.isArray(e)&&"object"==typeof e[0]&&!Array.isArray(e[0]))for(var i=0;i<e.length;i++)v.push((e=>{var a,t={label:e.label,data:[],by:Array.isArray(e.by)&&"string"==typeof e.by[0]?e.by:null};if("object"==typeof e.x&&"object"==typeof e.y)for(H.canvas.axis.labelsText={x:e.x.label,y:e.y.label},a=0;a<e.x.val.length;a++)t.data.push([e.x.val[a],e.y.val[a]]);else e.val&&1<=e.val.length&&2==e.val[0].length&&(H.canvas.axis.labelsText={x:e.x,y:e.y},t.data=e.val);return t})(e[i]))},j=!0;break;case"pyram":p(H.lib.jquery.flot.pyramid,b),w=k=!1,A=d(),m=function(e,a,t){o=Math.max(Array.max(e[0].val),Array.max(e[1].val)),v[0]={label:e[0].label,data:[],pyramid:{direction:"L"}},v[1]={label:e[1].label,data:[]};for(var i=0,l=t.length;i<l;i++)v[0].data[i]=[t[i],e[0].val[i]],v[1].data[i]=[t[i],e[1].val[i]]},V=J=L=!(j=!0);break;case"rank":var C=[],V=!1,k=!1,w=!0,A=d(),m=function(e,a,t){for(var i=[],l=0,n=e.length;l<n;l++){S[l]=[l,void 0!==e[n-l-1][0]?e[n-l-1][0]:t[n-l-1]];var r=void 0!==e[n-l-1][1]?e[n-l-1][1]:e[n-l-1];i.push(r),C[l]=[r,l]}v={data:C},o=Array.max(i)},j=!1,L=!1;break;case"pie":p(H.lib.jquery.flot.pie,b),w=k=V=!(O=!0),A=d(),m=function(e,a,t){var i,l;if("object"!=typeof t||null===t)for(l=e.length,i=0;i<l;i++)null!==e[i][1]&&v.push({label:e[i][0],data:e[i][1]});else if("number"==typeof e[0])for(l=t.length,i=0;i<l;i++)null!==e[i]&&v.push({label:t[i],data:e[i]})},j=!0;break;case"bar":p(H.lib.jquery.flot.categories,b),w=!(k=!1),A=d(),L=j=!(V=!(m=function(e,a,t){var i;if("object"!=typeof t||null===t){for(i=e.length,n=0;n<i;n++)null!==e[n][1]&&v.push(["<span>"+e[n][0]+"</span>",e[n][1]]);v=[v]}else if(P.by&&P.by.length&&"object"==typeof P.data[0]){for(S=[],v=[],n=0;n<P.by.length;n++)v.push({label:P.by[n],data:[]});for(var l=0,n=0;n<P.data.length;n++){P.data[n].val.length%2==0?S.push([l+(P.data[n].val.length-1)/2,P.data[n].label]):S.push([Math.floor(l+P.data[n].val.length/2),P.data[n].label]);for(var r=0;r<P.data[n].val.length;r++)v[r].data.push([l,P.data[n].val[r]]),l++;l+=2}}else{if("number"==typeof e[0])for(i=t.length,n=0;n<i;n++)null!==e[n]&&v.push(["<span>"+t[n]+"</span>",e[n]]);v=[v]}}));break;case"tsline":A=W(),V=!(w=!(k=!(L=null)));break;case"tsbar":A=W(),V=!(w=!(k=!(L=!0)))}VisualJS.chart=function(){m(P.data,P.time,P.by),$.fn.UseTooltip=function(g){var x=[];$(this).bind("plothover",function(e,a,t){var i,l,n,r,s,o,u,d,p,c={},y={};if(t){if(x!=[t.seriesIndex,t.dataIndex])if(x=[t.seriesIndex,t.dataIndex],"xy"===P.type){for(var f in o={x:void 0!==VisualJS.container[g].unit.position.x&&"start"===VisualJS.container[g].unit.position.x,y:void 0!==VisualJS.container[g].unit.position.y&&"start"===VisualJS.container[g].unit.position.y,z:void 0!==VisualJS.container[g].unit.position.z&&"start"===VisualJS.container[g].unit.position.z})u=o[f],o.hasOwnProperty(f)&&(d=VisualJS.container[g].unit.symbol&&"string"==typeof VisualJS.container[g].unit.symbol[f]?VisualJS.container[g].unit.symbol[f]:"",p=VisualJS.container[g].unit.label&&"string"==typeof VisualJS.container[g].unit.label[f]?VisualJS.container[g].unit.label[f]:"",u?(c[f]=d,y[f]=p):(c[f]="",y[f]=" "+p+" "+d),y[f]=""!==y[f]?" "+y[f]:"");s="<div><strong>"+c.x+D(t.datapoint[0],g,"x")+y.x+"</strong> "+(void 0!==h.xaxis.axisLabel?h.xaxis.axisLabel:"x")+"</div><div><strong>"+c.y+D(t.datapoint[1],g,"y")+y.y+"</strong> "+(void 0!==h.yaxis.axisLabel?h.yaxis.axisLabel:"y")+"</div>",s+=Array.isArray(v[t.seriesIndex].by)&&"string"==typeof v[t.seriesIndex].by[t.dataIndex]&&""!==v[t.seriesIndex].by[t.dataIndex]?v[t.seriesIndex].by[t.dataIndex]+("string"==typeof v[t.seriesIndex].label&&""!==v[t.seriesIndex].label?" ("+v[t.seriesIndex].label+")":""):"",_(s,a.pageX,a.pageY)}else i=t.datapoint[0],l=t.datapoint[1],n="bar"!==P.type||Boolean(P.data[0].val)?t.series.label:(1<v.length?v:v[0])[i][0],n="rank"!==P.type?n:S[l][1],r=!!("rank"!==P.type&&"pie"!==P.type&&"bar"!==P.type||"bar"===P.type&&Boolean(P.data[0].val))&&(J||1===v.length?!!(Array.isArray(S)&&0<S.length)&&S[i][1]:"pyram"===P.type?v[a.x<0?0:1].data[t.dataIndex][0]:S[t.dataIndex][1]),s="pyram"===P.type?Math.abs(i):"rank"!==P.type?"tsbar"!==P.type?"pie"===P.type?l[0][1]:l:J||1===v.length?v[t.seriesIndex].data[i][1]:l:i,t="bar"===P.type&&P.by?r?r+(n?VisualJS.container[g].tooltipseparator+n:""):n||"":r?n?n+VisualJS.container[g].tooltipseparator+r:r:n||"",_(K(g,t,s),a.pageX,a.pageY)}else $("#"+H.tooltipid).hide(),x=[]})};var h={colors:H.colors.series,series:{stack:L,bars:{show:w,barWidth:.7,align:"center",fill:.9},pie:{show:O,label:{show:!1}},lines:{show:V,lineWidth:Y.grid.line},points:{show:k,radius:Y.grid.point,fill:.85,fillColor:null}},legend:{show:Y.legend&&j,position:N.position||"ne"},grid:{borderWidth:Y.grid.border,hoverable:!0,clickable:!1,mouseActiveRadius:10},xaxis:{show:Y.axis.x,axisLabel:void 0!==r(H.canvas.axis,["labelsText","x"])?H.canvas.axis.labelsText.x:void 0,axisLabelUseCanvas:!0,axisLabelFontSizePixels:u=Number($("."+VisualJS.setup.clas).css("font-size").replace("px","")),axisLabelFontFamily:$("."+VisualJS.setup.clas).css("font-family"),axisLabelPadding:u,axisLabelColour:"#545454",labelWidth:28},yaxis:{show:Y.axis.y,axisLabel:void 0!==r(H.canvas.axis,["labelsText","y"])?H.canvas.axis.labelsText.y:void 0,axisLabelUseCanvas:!0,axisLabelFontSizePixels:u,axisLabelFontFamily:$("."+VisualJS.setup.clas).css("font-family"),axisLabelPadding:u,axisLabelColour:"#545454"}};(g=function(){var e,a=VisualJS.id,t=S.length,i=G(VisualJS.arr2html(P.footer,U)||"");if($(X).html("<header><"+R+' id="ARIAtitle" style="overflow:auto;">'+A+"</"+R+'></header><footer class="'+VisualJS.setup.footerclass+'" style="overflow:auto;">'+i+"</footer>"),VisualJS.getSize(a)){switch(i=H.typeclassprefix+P.type,$(X+" header").after('<main class="'+H.canvasclass+" "+i+" "+VisualJS.visualsize+'" style="width: '+VisualJS.width+"px; height: "+VisualJS.height+'px; display: block;"></main>'),h.xaxis.tickFormatter=function(e){return c(e,a,"x")},h.yaxis.tickFormatter=function(e){return c(e,a,"y")},h.xaxis.tickLength=P.axis.ticks.x?null:0,h.yaxis.tickLength=P.axis.ticks.y?null:0,h.grid.markings=P.grid.markings||null,P.type){case"xy":P.range?(P.range.x?Array.isArray(P.range.x)?(h.xaxis.min=P.range.x[0],h.xaxis.max=P.range.x[1]):(h.xaxis.min=0,h.xaxis.max=P.range.x):(h.xaxis.min=null,h.xaxis.max=null),P.range.y?Array.isArray(P.range.x)?(h.yaxis.min=P.range.y[0],h.yaxis.max=P.range.y[1]):(h.yaxis.min=0,h.yaxis.max=P.range.y):(h.yaxis.min=null,h.yaxis.max=null)):(h.xaxis.min=null,h.yaxis.min=null,h.xaxis.max=null,h.yaxis.max=null),h.hooks={drawBackground:function(e,a){e=e.getXAxes()[0];void 0!==e.ticks&&0<e.ticks.length&&(e.datamin=e.ticks[0].v,e.datamax=e.ticks[e.ticks.length-1].v)}},$.plot(x,v,h);break;case"pyram":h.series.pyramid={show:!0,barWidth:1},h.yaxis.show=11<VisualJS.height/v[0].data.length&&Y.axis.y,h.xaxis.max="number"==typeof Y.range?o*Y.range:Array.isArray(Y.range)?Y.range[1]:null,h.xaxis.tickFormatter=function(e){return c(e,a,"x",D)},$.plot(x,v,h);break;case"rank":h.yaxis.tickLength=null,h.series.bars.horizontal=!0,h.yaxis.ticks=11<VisualJS.height/t?S.slice(0):0,!1===P.axis.labels.y&&(h.yaxis.ticks=y(h.yaxis.ticks)),"number"==typeof Y.range?h.xaxis.max=o*Y.range:Array.isArray(Y.range)&&(h.xaxis.min=Y.range[0],h.xaxis.max=Y.range[1]),h.xaxis.tickFormatter=function(e){return c(e,a,"x",D)},h.yaxis.autoscaleMargin=0,h.series.bars.barWidth=.5,$.plot(x,[v],h);break;case"pie":$.plot(x,v,h);break;case"bar":h.xaxis.tickLength=0,P.by&&P.by.length&&"object"==typeof P.data[0]?(h.xaxis.ticks=S,!1===P.axis.labels.x&&(h.xaxis.ticks=y(h.xaxis.ticks)),h.bars={show:!0}):(h.xaxis.mode="categories",h.yaxis.tickFormatter=function(e){return c(e,a,"y",D)}),"number"!=typeof Y.range&&null!==Y.range?(h.yaxis.min=Y.range[0],h.yaxis.max=Y.range[1]):"number"==typeof Y.range&&(h.yaxis.min=null,h.yaxis.max=Y.range),$.plot(x,v,h),!1!==P.axis.labels.x&&!1!==P.axis.labels.y||(!(u="<style>")===P.axis.labels.x&&(u+=x+" .flot-x-axis .flot-tick-label{display:none;}"),!1===P.axis.labels.y&&(u+=x+" .flot-y-axis .flot-tick-label{display:none;}"),u+="</style>",$(x).append(u));break;case"tsline":null===h.grid.markings&&(h.grid.markings=[{color:"#333333",lineWidth:1,yaxis:{from:0,to:0}}]);case"tsbar":"tsbar"===P.type&&(h.xaxis.tickLength=0),h.yaxis.tickFormatter=function(e){return c(e,a,"y",D)};var l,n=VisualJS.width/t,r=[],s="string"==typeof P.first&&P.first?P.first:6===VisualJS.ticks[0][1].length?"01":"1";switch("number"!=typeof Y.range&&null!==Y.range?(h.yaxis.min=Y.range[0],h.yaxis.max=Y.range[1]):"number"==typeof Y.range&&(h.yaxis.min=null,h.yaxis.max=Y.range),VisualJS.ticks[0][1].length){case 4:if(n<33){for(l=16.5<n?2:10.5<n?3:9<n?4:10,e=0;e<t;e++)r[e]=e%l?[S[e][0],""]:[S[e][0],S[e][1]];h.xaxis.ticks=r}else h.xaxis.ticks=S;!1===P.axis.labels.x&&(h.xaxis.ticks=y(h.xaxis.ticks));break;case 5:case 6:if(n<56){for(n<8.5&&56<t&&$("main").addClass(H.mini),e=0;e<t;e++)r[e]=VisualJS.ticks[e][1].slice(4)!==s?[VisualJS.ticks[e][0],""]:[VisualJS.ticks[e][0],VisualJS.ticks[e][1].slice(0,4)],S[e][1]=f(VisualJS.ticks[e][1],VisualJS.id);h.xaxis.ticks=r}else{for(e=0;e<t;e++)S[e][1]=f(VisualJS.ticks[e][1],VisualJS.id);h.xaxis.ticks=S}!1===P.axis.labels.x&&(h.xaxis.ticks=y(h.xaxis.ticks));break;case 7:if(n<55){for(l=20<n?2:10<n?3:4,e=0;e<t;e++)r[e]=e%l?[S[e][0],""]:[S[e][0],S[e][1]];h.xaxis.ticks=r}else h.xaxis.ticks=S;!1===P.axis.labels.x&&(h.xaxis.ticks=y(h.xaxis.ticks));break;default:h.xaxis.ticks=S,!1===P.axis.labels.x&&(h.xaxis.ticks=y(h.xaxis.ticks))}$.plot(x,q,h)}F()&&$(x).UseTooltip(VisualJS.id),VisualJS.pub[VisualJS.id].heading=A,$(x).find("canvas").attr("role","img").attr("aria-labelledBy","ARIAtitle")}})()}}VisualJS.scripts.length&&"object"==typeof LazyLoad?LazyLoad.js(VisualJS.scripts,B):B()}};Array.isArray||(Array.isArray=function(e){return"[object Array]"===Object.prototype.toString.call(e)}),"function"!=typeof visual&&(visual=VisualJS.load);

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
VisualJS.setup={ //v.1.2.8
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