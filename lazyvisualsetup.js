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
var VisualJS={version:"1.0.5",show:!0,old:!1,fixed:null,width:500,bwidth:500,height:500,normal:500,scripts:[],map:{},container:{},pub:{},func:{},callback:null,getSize:function(e){var a=VisualJS.setup,t=a.html,i=t.heading,n="."+VisualJS.setup.footerclass,l="undefined"!=typeof jQuery?jQuery:"undefined"!=typeof d3?d3.select:document.querySelectorAll.bind(document),r=window,s=document,o=s.documentElement,u=s.getElementsByTagName("body")[0],d=s.getElementById(e),c=function(e,a){return"function"==typeof getComputedStyle?getComputedStyle(e)[a]:e.currentStyle[a]},p=function(e){var a=l(e);return a[0]instanceof Element?a[0]:a[0]&&a[0][0]?a[0][0]:void 0},y=function(e){if(e){{var a=e.offsetHeight;c(e)}return a+=Math.round(parseFloat(c(e,"marginTop"))+parseFloat(c(e,"marginBottom")))}return 0},f=y(p(i)),x=y(p(n)),g=r.innerHeight||o.clientHeight||u.clientHeight,h=Math.round(parseFloat(c(d,"marginTop"))+parseFloat(c(d,"marginBottom"))),b=10;return"undefined"!=typeof g&&"undefined"!=typeof f&&"undefined"!=typeof x&&(null===VisualJS.fixed?(VisualJS.bwidth=r.innerWidth||o.clientWidth||u.clientWidth,VisualJS.width=VisualJS.bwidth-a.padding.w,VisualJS.height=Math.floor(g-f-x-h-b)):(VisualJS.bwidth=o.clientWidth||u.clientWidth,VisualJS.width=VisualJS.fixed[0]-a.padding.w,VisualJS.height=Math.floor(VisualJS.fixed[1]-f-x-h-b))),VisualJS.visualsize=VisualJS.width<VisualJS.normal?a.mini:a.normal,VisualJS.width>10&&VisualJS.height>10},arr2html:function(e,a){var t="";return"undefined"==typeof e||(Array.isArray(e)?e.forEach(function(e){"string"==typeof e&&""!==e&&(t+="<"+a.footer+">"+e+"</"+a.footer+">")}):"string"==typeof e&&""!==e&&(t+="<"+a.footer+">"+e+"</"+a.footer+">")),t},iframe:function(e,a){var t=VisualJS.setup,i="string"==typeof e.clas?e.clas:t.clas,n='<!DOCTYPE html>\n<!--[if lt IE 7]><html class="lt-ie9 lt-ie8 lt-ie7"> <![endif]-->\n<!--[if IE 7]><html class="lt-ie9 lt-ie8"> <![endif]-->\n<!--[if IE 8]><html class="lt-ie9"> <![endif]-->\n<!--[if gt IE 8]><!--> <html> <!--<![endif]-->\n<head>',l=function(){var a=document,t=a.createElement("iframe"),i=a.getElementById(e.id);return t.frameBorder="0",t.scrolling="no",i.parentNode.insertBefore(t,i.nextSibling),t},r=function(e,a){if("undefined"!=typeof e){var t;e.contentDocument?t=e.contentDocument:e.contentWindow?t=e.contentWindow.document:window.frames[e.name]&&(t=window.frames[e.name].document),t&&(t.open(),t.write(a),t.close())}};"string"==typeof a&&(n+=-1===a.indexOf("{")?'<link href="'+a+'" rel="stylesheet" type="text/css"/>':'<style type="text/css">'+a+"</style>"),n+='<script type="text/javascript" src="'+VisualJS.setup.main.visual+'"></script>',n+='<script type="text/javascript" src="'+VisualJS.setup.main.setup+'"></script>',n+='<script type="text/javascript" src="'+VisualJS.setup.main.lazy+'"></script>',n+='</head><body><div id="'+e.id+'" class="'+i+'"></div><script>window.setTimeout(function(){visual('+JSON.stringify(e)+");},1);</script></body></html>",r(l(),n)},compare:function(e){var a,t=VisualJS.setup,i=VisualJS.setup.separator,n="string"==typeof e.id?e.id:t.id,l="[object Array]"===Object.prototype.toString.call(e.css)?0===e.css.length?["",""]:1===e.css.length?[e.css[0],e.css[0]]:e.css:[e.css,e.css],r=document,s=r.createElement(t.html.heading),o="string"==typeof e.title?e.title:"",u=r.createElement(t.html.footer),d=t.html,c="string"==typeof e.footer?VisualJS.arr2html(e.footer,d):"",p=r.getElementById(n),y=r.createElement("div"),f=r.createElement("style"),x=function(){if(VisualJS.getSize(n)){var a=VisualJS.height+("string"==typeof e.footer&&""!==e.footer?14:0),l=VisualJS.width+t.margin,r="iframe{ float: left; width: "+Math.floor((l-i)/2-t.margin)+"px; height:"+a+"px; }";f.styleSheet?f.styleSheet.cssText=r:f.innerHTML=r,y.style.height=a+"px"}};s.innerHTML=o,s.style.overflow="auto",u.innerHTML=c,u.style.overflow="auto",u.style.clear="both",p.appendChild(s),p.appendChild(u),r.getElementsByTagName("head")[0].appendChild(f),y.style.width=i+"px","styleFloat"in y.style?y.style.styleFloat="left":y.style.cssFloat="left";for(var g=0;2>g;g++)a=r.createElement("span"),"string"!=typeof e.load[g].id&&(e.load[g].id=t.compareids[g]),a.id=e.load[g].id,p.insertBefore(a,u),VisualJS.iframe(e.load[g],l[g]);p.insertBefore(y,a),x(),window.addEventListener?window.addEventListener("resize",x,!1):window.attachEvent?window.attachEvent("onresize",x):window.onresize=x},load:function(e){var a=function(e){var a,t=function(a){e.source.postMessage(JSON.stringify(a),"*")};if("string"==typeof e.data?a=JSON.parse(e.data):"object"==typeof e.data&&(a=e.data),a)if("undefined"==typeof a.action)t({type:"error",data:[{id:"400",label:'"action" is required.'}]});else if("send"===a.action){var i=a.id||VisualJS.id,n=VisualJS.container[i]||VisualJS.container[i];if(n){if("cmap"===n.type&&!n.data[0].hasOwnProperty("label")){for(var l=[],r=VisualJS.map[n.by],s=r.features.length;s--;)l[r.features[s].properties[r.id]]=r.features[s].properties[r.label];for(var o=n.data,u=o.length;u--;)o[u].label=l[o[u].id]}t(n)}else t({type:"error",data:[{id:"404",label:'A visualisation with the specified "id" was not found'}]})}else t({type:"error",data:[{id:"400",label:'"action" value is not correct.'}]})};if("undefined"==typeof VisualJS.setup&&window.alert("Visual: Setup not found (visual.setup.js)!"),"[object Array]"!==Object.prototype.toString.call(e))VisualJS.get(e);else for(var t=0,i=e.length;i>t;t++)VisualJS.get(e[t]);VisualJS.container[VisualJS.id].listen&&(window.addEventListener?window.addEventListener("message",a,!1):window.attachEvent("onmessage",a))},get:function(e){var a,t,i=VisualJS.setup,n=i.html,l=i.canvas,r=n.heading,s="."+VisualJS.setup.footerclass,o=VisualJS.old||i.func.old("ie9"),u=function(e){return"undefined"!=typeof e&&"[object Array]"===Object.prototype.toString.call(e)&&2===e.length&&"number"==typeof e[0]&&"number"==typeof e[1]&&e[0]<e[1]?!0:!1},d=function(a,t,i){"string"==typeof a?t.match(typeof e[a])||(e[a]=i[a]):t.match(typeof c(e,a))||p(e,a,c(i,a))},c=function(e,a){for(var t=e,i=0;i<a.length;i++){if("undefined"==typeof t[a[i]]){t=void 0;break}t=t[a[i]]}return t},p=function(e,a,t){for(var i,n=e,l=0;l<=a.length-2;l++)i=n[a[l]],"undefined"==typeof i&&(n[a[l]]={}),n=n[a[l]];n[a[a.length-1]]=t},y=function(){var a="invalid";return Array.isArray(e.data)&&(Array.isArray(e.data[0])?a="array":"object"==typeof e.data[0]&&(a="object"==typeof e.data[0].x&&"object"==typeof e.data[0].y&&"object"==typeof e.data[0].z?"xyz":"object"==typeof e.data[0].x&&"object"==typeof e.data[0].y?"xy":"undefined"!=typeof e.data[0].x||"undefined"!=typeof e.data[0].y||!Array.isArray(e.data[0].val)||2!=e.data[0].val[0].length&&3!=e.data[0].val[0].length?"object":"points")),a},f=function(a){{var t;y()}for(var i in a)a.hasOwnProperty(i)&&(t=a[i],"xy"===e.type||(a[i]="rank"===e.type||"pyram"===e.type?t&&"undefined"!=typeof t.x?t.x:"string"==typeof t?t:"":t&&"undefined"!=typeof t.y?t.y:"string"==typeof t?t:""));return a},x=function(a){var t,i,n=y(),l=[];return"object"!=typeof a||null===a||Array.isArray(a)||"array"!==n&&"object"!==n||"xy"===e.type||(a="rank"===e.type||"pyram"===e.type?a.x:a.y),Array.isArray(a)&&2===a.length&&null===a[0]&&null===a[1]?e.data&&"object"===n&&(e.data.forEach(function(e){l=l.concat(e.val)}),t=Math.min.apply(null,l),i=Math.max.apply(null,l),t>=0&&i>=0?a=[0,null]:0>=t&&0>=i&&(a=[null,0])):"object"==typeof a&&!Array.isArray(a)&&null!==a&&(Array.isArray(a.x)&&null===a.x[0]&&null===a.x[1]||Array.isArray(a.y)&&null===a.y[0]&&null===a.y[1])?(l={x:[],y:[]},t={x:[],y:[]},i={x:[],y:[]},"points"===n?e.data.forEach(function(e){e.val.forEach(function(e){l.x.push(e[0]),l.y.push(e[1])})}):("xy"===n||"xyz"===n)&&e.data.forEach(function(e){l.x=l.x.concat(e.x.val),l.y=l.y.concat(e.y.val)}),t.x=Math.min.apply(null,l.x),i.x=Math.max.apply(null,l.x),t.y=Math.min.apply(null,l.y),i.y=Math.max.apply(null,l.y),Array.isArray(a.x)&&null===a.x[0]&&null===a.x[1]&&(a.x=t.x>=0&&i.x>=0?[0,null]:t.x<=0&&i.x<=0?[null,0]:[null,null]),Array.isArray(a.y)&&null===a.y[0]&&null===a.y[1]&&(a.y=t.y>=0&&i.y>=0?[0,null]:t.y<=0&&i.y<=0?[null,0]:[null,null])):("xy"===n||"xyz"===n||"points"===n)&&("number"==typeof a||Array.isArray(a)?a={x:[null,null],y:Array.isArray(a)?a:[null,a]}:("object"!=typeof a||null===a)&&(a={x:[null,null],y:[null,null]})),a},g=[["show","boolean",VisualJS],["callback","function",VisualJS],["id","string",i],["listen","boolean",i],["dec","number|object",l],["autoheading","boolean",l],["legend","boolean",l],["grid","object",l],[["grid","border"],"number",l],[["grid","shadow"],"number",l],[["grid","line"],"number",l],[["grid","point"],"number",l],["axis","object",l],[["axis","x"],"boolean",l],[["axis","y"],"boolean",l],[["axis","labels","x"],"boolean",l],[["axis","labels","y"],"boolean",l],[["axis","ticks","x"],"boolean",l],[["axis","ticks","y"],"boolean",l]];"undefined"==typeof l.axis.labels&&(l.axis.labels={x:!0,y:!0}),"undefined"==typeof l.axis.ticks&&(l.axis.ticks={x:!0,y:!0});for(var h=0;h<g.length;h++)d(g[h][0],g[h][1],g[h][2]);VisualJS.id=e.id,VisualJS.pub[VisualJS.id]={heading:null,legend:null},"object"==typeof e.fixed&&(VisualJS.fixed=e.fixed),"object"==typeof e.unit&&null!==e.unit?(d(["unit","label"],"string|object",l),d(["unit","symbol"],"string|object",l),d(["unit","position"],"string|object",l)):e.unit=l.unit,e.range=x(e.range),e.lang=e.lang||i.i18n.lang,"number"==typeof e.range||u(e.range)||("object"!=typeof e.range||null===e.range||Array.isArray(e.range))&&(e.range="number"==typeof e.range||Array.isArray(e.range)&&2===e.range.length?e.range:l.range.hasOwnProperty(e.type)&&"number"==typeof l.range[e.type]?l.range[e.type]:null),e.unit=f(e.unit),VisualJS.container[VisualJS.id]=e;var b,m="#"+VisualJS.id,S=m+" ."+i.canvasclass,v=VisualJS.container[VisualJS.id],J=function(){if(v.autoheading===!1)return v.title||"";var e,a=[],t=function(e,t){"string"==typeof e&&""!==e&&(t===!0&&(e='<span class="'+VisualJS.setup.nowrapclass+'">'+e+"</span>"),a.push(e))};if(null!==v.time&&"object"==typeof v.time){var i=z(v.time[0],VisualJS.id),n=z(v.time[v.time.length-1],VisualJS.id);e=i+"&ndash;"+n}else e=z(v.time,VisualJS.id);return t(v.title,!1),t(v.geo,!0),t(e,!0),w(a.join(". "))},V=function(){var e=!1;"function"==typeof VisualJS.chart&&(F(),v.show&&VisualJS.chart(),window.addEventListener?window.addEventListener("resize",b,!1):window.attachEvent?window.attachEvent("onresize",b):window.onresize=b,e=!0),null!==v.callback&&v.callback.call({id:VisualJS.id,chart:e,heading:VisualJS.pub[VisualJS.id].heading,legend:VisualJS.pub[VisualJS.id].legend})},w=function(e){return String(e).replace(/&amp;/g,"&")},k=function(e,a){return a&&e.exists.call()?!1:(VisualJS.scripts.push(e.js),!0)},A=function(e,a,t){var i="number"==typeof t&&""!==VisualJS.container[e].unit.label?" "+VisualJS.container[e].unit.label:"",n="number"==typeof t?VisualJS.container[e].unit.symbol:"",l=M(t,e),r=l!==VisualJS.setup.i18n.text.na[VisualJS.container[e].lang]?"end"===VisualJS.container[e].unit.position?l+i+(""!==n?" "+n:n):n+l+i:l;return a?"<strong>"+r+"</strong> "+a:r},j=function(e,a,t){var i="",n="number"==typeof t?VisualJS.container[e].unit.symbol:"",l=M(t,e),r=l!==VisualJS.setup.i18n.text.na[VisualJS.container[e].lang]?"end"===VisualJS.container[e].unit.position?l+i+(""!==n?" "+n:n):n+l+i:l;return a?"<strong>"+r+"</strong> "+a:r},E=function(a,t,i,n){return e.axis.labels[i]?"function"==typeof n?n(a,t,i):M(a,t,i):""},L=function(e){for(var a=[],t=0;t<e.length;t++)a.push(Array.isArray(e[t])?[e[t][0],""]:[e[t],""]);return a},M=function(e,a,t){if("undefined"==typeof e||null===e)return VisualJS.setup.i18n.text.na[VisualJS.container[a].lang];if("number"==typeof e){for(var i="object"==typeof VisualJS.container[a].dec&&null!==VisualJS.container[a].dec&&"string"==typeof t&&"number"==typeof VisualJS.container[a].dec[t]?e.toFixed(VisualJS.container[a].dec[t]):"number"==typeof VisualJS.container[a].dec?e.toFixed(VisualJS.container[a].dec):String(e),n=/(\d+)(\d{3})/,l=i.split("."),r=l[0],s=l.length>1?VisualJS.setup.i18n.text.dec[VisualJS.container[a].lang]+l[1]:"";n.test(r);)r=r.replace(n,"$1"+VisualJS.setup.i18n.text.k[VisualJS.container[a].lang]+"$2");return r+s}return""},z=function(e,a){var t;if(!e)return null;if(isNaN(e))return e;switch(e.length){case 5:t="quarter";break;case 6:t="month";break;default:return e}var i=VisualJS.setup.i18n.text[t];if("undefined"==typeof i)return e;var n=i[VisualJS.container[a].lang];if("undefined"==typeof n)return e;var l=n[e.slice(4)-1];return"undefined"==typeof l?e:l+" <span>"+e.slice(0,4)+"</span>"},I=function(e,a,t){var i=document.getElementById(VisualJS.setup.tooltipid),n=VisualJS.bwidth-VisualJS.setup.margin,l={};i.innerHTML=e,i.style.display="block";var r=i.clientWidth/2;l.x=a-r,l.y=t-i.clientHeight-5,a+r>n?l.x-=a+r-n:l.x<VisualJS.setup.margin&&(l.x+=VisualJS.setup.margin-l.x),l.y<VisualJS.setup.margin&&(l.y+=1.75*i.clientHeight),i.style.left=l.x+"px",i.style.top=l.y+"px"},F=function(){var e=document;if(!e.getElementById(VisualJS.setup.tooltipid)){var a=e.createElement("div");a.id=VisualJS.setup.tooltipid,a.style.display="none",e.body.appendChild(a)}};if("cmap"===e.type)if(o)document.getElementById(VisualJS.id).innerHTML="<p>"+i.i18n.text.oldbrowser[v.lang]+"</p>";else{if("string"!=typeof e.by)return;k(i.lib.maps,!0),k(i.lib.d3,!0),k(i.map[e.by],!0),VisualJS.chart=function(){var a=J(),t=VisualJS.map[e.by],o=t.area[0],u=t.area[1],d="object"==typeof e.grouped&&"object"==typeof e.grouped.label&&e.grouped.label.length>0&&e.data[0].hasOwnProperty("group"),c=e.data[0].hasOwnProperty("val"),p=d?e.grouped.label.length:c?i.colors.map.max:1,y=i.colorclassprefix,f=VisualJS.func.colors(i.colors.map.base,p,"fill",y,d&&"object"==typeof e.grouped.color&&e.grouped.color.length===e.grouped.label.length?e.grouped.color:[],VisualJS.id),x=d3.select(m),g=d3.geo[t.projection](),h="object"==typeof t.center&&"function"==typeof g.center?g.center(t.center):g,S=h.scale(t.scale).translate([o/2,u/2]),V=d3.geo.path().projection(S),k=d3.select("#"+i.tooltipid);(b=function(){var g=w(VisualJS.arr2html(e.footer,n)||"");if(x.html("<"+r+' style="overflow:auto;"></'+r+'><div class="'+VisualJS.setup.footerclass+'" style="overflow:auto;"></div>'),d3.select(m+" "+r).html(a),d3.select(m+" "+s).html(g),VisualJS.getSize(VisualJS.id)){var h,b,S,J,E,L,z=VisualJS.id,F=d3.map(),O=d3.map(),T=e.data[0].hasOwnProperty("label"),B=[],$=function(){},W=function(){},q=VisualJS.height/u,P=VisualJS.width/o,C=Math.min(Math.round(o*q),VisualJS.width),H=Math.min(Math.round(u*P),VisualJS.height),N=Math.floor((VisualJS.width-C)/2),X=Math.floor((VisualJS.height-H)/2),Y=P>q?q:P,U=x.insert("svg:svg",s).attr("viewBox","0 0 "+C+" "+H).attr("width",C).attr("height",H);d&&c?(L=[],[1,e.grouped.label.length].forEach(function(a){for(var t=0;t<e.data.length;t++)if(e.data[t].group===a){L.push(e.data[t].val);break}}),L[0]>L[1]?"undefined"==typeof VisualJS.colorOrder&&(VisualJS.colorOrder=!1):"undefined"==typeof VisualJS.colorOrder&&(VisualJS.colorOrder=!0)):d&&e.grouped.color&&(f=e.grouped.color),d?(h=d3.map(),$=function(e,a){e.set(a.id,a.group)},S=function(e,a,i){return c&&!VisualJS.colorOrder?y+(d3.keys(e).length-e.get(i[t.id])):y+(e.get(i[t.id])-1)},b=function(a,i){var n=e.grouped.label[a.get(i[t.id])-1],l=T?O.get(i[t.id]):i[t.label];return"undefined"!=typeof n&&(l+=" <em>"+n+"</em>"),l},W=VisualJS.func.legend):(c?(S=function(e,a,i,n,l){var r=a.get(i[t.id]);if("undefined"==typeof r)return"";if(n===l)return y+(p/2).toFixed(0);var s=d3.scale.quantize().domain([n,l]).range(d3.range(p).map(function(e){return y+e}));return s(r)},W=VisualJS.func.legend):S=function(e,a,i){return""!==a.get(i[t.id])?"":y+(p-1)},b=function(e,a){return T?O.get(a[t.id]):a[t.label]});for(var D=0,Q=e.data,R=Q.length;R>D;D++){var G=Q[D];G.hasOwnProperty("val")?null!==G.val&&(F.set(G.id,G.val),B.push(G.val)):F.set(G.id,""),T&&O.set(G.id,G.label),$(h,G)}B.sort(function(e,a){return e-a});var K=B[0],Z=B[R-1];if("number"==typeof v.range?(J=d3.quantile(B,v.range),E=d3.quantile(B,1-v.range)):(J=v.range[0],E=v.range[1]),U.style("margin-left",N+"px"),U.style("margin-top",X+"px"),U.style("margin-bottom",X+"px"),U.append("g").attr("class",i.areaclass).attr("transform","scale("+Y+")").selectAll("path").data(t.features).enter().append("svg:path").attr("class",function(e){return""===e.properties[t.id]||""===e.properties[t.label]||!c&&"undefined"==typeof F.get(e.properties[t.id])?y+"nohover":S(h,F,e.properties,J,E)}).attr("d",V).on("mousemove",function(e){""!==e.properties[t.id]&&""!==e.properties[t.label]&&(c||d||"undefined"!=typeof F.get(e.properties[t.id]))&&I(A(z,b(h,e.properties),F.get(e.properties[t.id])),d3.event.pageX,d3.event.pageY)}).on("mouseout",function(){return k.style("display","none")}),c||d){var _=[A(z,null,J),A(z,null,E)],ea=[f[f.length-1],f[0]],aa=[K>J||M(J,z)===M(K,z),E>Z||M(E,z)===M(Z,z)];v.legend&&(d?(VisualJS.pub[VisualJS.id].legend={color:ea},"undefined"==typeof e.grouped.color&&(e.grouped.color=f),VisualJS.func.groupLegend(_,U,k,H,aa,e,l,VisualJS.colorOrder)):c&&(_=[j(z,null,J),j(z,null,E)],VisualJS.pub[VisualJS.id].legend={color:ea,text:_,symbol:[aa[0]?"==":"<=",aa[1]?"==":">="]},VisualJS.func.legend(_,f,U,k,H,aa,e.unit.label)))}VisualJS.pub[VisualJS.id].heading=a}})()}}else{var O;k(i.lib.jquery,!0)?(O=!1,k(i.lib.jquery.flot,!1)):O=k(i.lib.jquery.flot,!0)?!1:!0,o&&k(i.lib.excanvas,!0);var T,B,W,q,P,C,H,N=function(){},X=[],Y=[],U=[],D=e.stacked||!1,Q=function(){if(v.autoheading){var a,t,n,l,r,s,o=e.time.length,u=e.data.length;if(null===e.data[0].val[0]){for(t=0,l=!0,r=[];o>t;t++){for(a=0;u>a;a++)l=l&&null===e.data[a].val[t];if(!l)break;r.push(l)}for(s=r.length,n=0;s>n;n++)if(r[n])for(e.time.shift(),a=0;u>a;a++)e.data[a].val.shift();o=e.time.length}if(null===e.data[0].val[o-1]){for(t=o,l=!0,r=[];t--;){for(a=0,u=e.data.length;u>a;a++)l=l&&null===e.data[a].val[t];if(!l)break;r.push(l)}for(n=r.length;n--;)if(r[n])for(e.time.pop(),a=0;u>a;a++)e.data[a].val.pop()}}var d=function(){};return D?k(i.lib.jquery.flot.stack,O):"tsbar"===e.type&&(k(i.lib.jquery.flot.orderbars,O),d=function(e){return e.bars}),N=function(a,t){VisualJS.ticks=[];var i,n;for(i=0,n=t.length;n>i;i++)Y.push([i,t[i]]),VisualJS.ticks.push([i,t[i]]);for(i=0,n=a.length;n>i;i++){for(var l=[],r=a[i].val,s=r.length,o=0;s>o;o++)l.push([o,r[o]]);X.push("tsbar"!==e.type||D||1===n?{label:a[i].label,data:l}:{label:a[i].label,data:l,bars:{show:!0,barWidth:.2,order:i+1,lineWidth:2}})}var u=X.length;for(i=0;u>i;i++)U.push({data:X[i].data,label:X[i].label,bars:d(X[i]),shadowSize:v.grid.shadow});T=u>1},J()};switch(Array.max=function(e){return Math.max.apply(Math,e)},e.type){case"xy":k(i.lib.jquery.flot.axisLabels,O),q=!0,P=!1,W=!1,H=J(),N=function(e){var a=function(e){var a,t={label:e.label,data:[],by:Array.isArray(e.by)&&"string"==typeof e.by[0]?e.by:null};if("object"==typeof e.x&&"object"==typeof e.y)for(i.canvas.axis.labelsText={x:e.x.label,y:e.y.label},a=0;a<e.x.val.length;a++)t.data.push([e.x.val[a],e.y.val[a]]);else e.val&&e.val.length>=1&&2==e.val[0].length&&(i.canvas.axis.labelsText={x:e.x,y:e.y},t.data=e.val);return t};if(Array.isArray(e)&&Array.isArray(e[0]))X=[e];else if(Array.isArray(e)&&"object"==typeof e[0]&&!Array.isArray(e[0]))for(var t=0;t<e.length;t++)X.push(a(e[t]))},T=!0;break;case"pyram":k(i.lib.jquery.flot.pyramid,O),q=!1,P=!1,H=J(),N=function(e,t,i){a=Math.max(Array.max(e[0].val),Array.max(e[1].val)),X[0]={label:e[0].label,data:[],pyramid:{direction:"L"}},X[1]={label:e[1].label,data:[]};for(var n=0,l=i.length;l>n;n++)X[0].data[n]=[i[n],e[0].val[n]],X[1].data[n]=[i[n],e[1].val[n]]},T=!0,B=!1,D=!1,W=!1;break;case"rank":var R=[];W=!1,q=!1,P=!0,H=J(),N=function(e,t,i){for(var n=[],l=0,r=e.length;r>l;l++){Y[l]=[l,"undefined"!=typeof e[r-l-1][0]?e[r-l-1][0]:i[r-l-1]];var s="undefined"!=typeof e[r-l-1][1]?e[r-l-1][1]:e[r-l-1];n.push(s),R[l]=[s,l]}X={data:R},a=Array.max(n)},T=!1,B=!1;break;case"pie":k(i.lib.jquery.flot.pie,O),C=!0,W=!1,q=!1,P=!1,H=J(),N=function(e,a,t){var i,n;if("object"!=typeof t||null===t)for(n=e.length,i=0;n>i;i++)null!==e[i][1]&&X.push({label:e[i][0],data:e[i][1]});else if("number"==typeof e[0])for(n=t.length,i=0;n>i;i++)null!==e[i]&&X.push({label:t[i],data:e[i]})},T=!0;break;case"bar":k(i.lib.jquery.flot.categories,O),q=!1,P=!0,H=J(),W=!1,N=function(e,a,t){var i,n;if("object"!=typeof t||null===t)for(n=e.length,i=0;n>i;i++)null!==e[i][1]&&X.push(["<span>"+e[i][0]+"</span>",e[i][1]]);else if("number"==typeof e[0])for(n=t.length,i=0;n>i;i++)null!==e[i]&&X.push(['<span">'+t[i]+"</span>",e[i]])},T=!0,B=!0;break;case"tsline":H=Q(),B=null,q=!0,P=!1,W=!0;break;case"tsbar":H=Q(),B=!0,q=!1,P=!0,W=!1}VisualJS.chart=function(){N(e.data,e.time,e.by),$.fn.UseTooltip=function(a){var t=[];$(this).bind("plothover",function(n,l,r){var o,u,d,c,p,y,f,x,g,h,b={},m={};if(r){if(t!=[r.seriesIndex,r.dataIndex])if(t=[r.seriesIndex,r.dataIndex],"xy"===e.type){f={x:"undefined"!=typeof VisualJS.container[a].unit.position.x&&"start"===VisualJS.container[a].unit.position.x?!0:!1,y:"undefined"!=typeof VisualJS.container[a].unit.position.y&&"start"===VisualJS.container[a].unit.position.y?!0:!1,z:"undefined"!=typeof VisualJS.container[a].unit.position.z&&"start"===VisualJS.container[a].unit.position.z?!0:!1};for(var S in f)x=f[S],f.hasOwnProperty(S)&&(g=VisualJS.container[a].unit.symbol&&"string"==typeof VisualJS.container[a].unit.symbol[S]?VisualJS.container[a].unit.symbol[S]:"",h=VisualJS.container[a].unit.label&&"string"==typeof VisualJS.container[a].unit.label[S]?VisualJS.container[a].unit.label[S]:"",x?(b[S]=g,m[S]=h,m[S]=""!==m[S]?" "+m[S]:""):(b[S]="",m[S]=" "+h+" "+g,m[S]=""!==m[S]?" "+m[S]:""));y="<div><strong>"+b.x+M(r.datapoint[0],a,"x")+m.x+"</strong> "+("undefined"!=typeof s.xaxis.axisLabel?s.xaxis.axisLabel:"x")+"</div><div><strong>"+b.y+M(r.datapoint[1],a,"y")+m.y+"</strong> "+("undefined"!=typeof s.yaxis.axisLabel?s.yaxis.axisLabel:"y")+"</div>",y+=Array.isArray(X[r.seriesIndex].by)&&"string"==typeof X[r.seriesIndex].by[r.dataIndex]&&""!==X[r.seriesIndex].by[r.dataIndex]?X[r.seriesIndex].by[r.dataIndex]+("string"==typeof X[r.seriesIndex].label&&""!==X[r.seriesIndex].label?" ("+X[r.seriesIndex].label+")":""):"",I(y,l.pageX,l.pageY)}else o=r.datapoint[0],u=r.datapoint[1],d="bar"!==e.type||Boolean(e.data[0].val)?r.series.label:X.length>1?X[o][0]:X[0][o][0],c="rank"!==e.type?d:Y[u][1],p="rank"!==e.type&&"pie"!==e.type&&"bar"!==e.type||"bar"===e.type&&Boolean(e.data[0].val)?D||1===X.length?Array.isArray(Y)&&Y.length>0?Y[o][1]:!1:"pyram"===e.type?X[l.x<0?0:1].data[r.dataIndex][0]:Y[r.dataIndex][1]:!1,y="pyram"===e.type?Math.abs(o):"rank"!==e.type?"tsbar"!==e.type?"pie"===e.type?u[0][1]:u:D||1===X.length?X[r.seriesIndex].data[o][1]:u:o,"bar"===e.type&&e.by?I(A(a,p?p+" / "+c:c,y),l.pageX,l.pageY):I(A(a,p?c+" / "+p:c,y),l.pageX,l.pageY)}else $("#"+i.tooltipid).hide(),t=[]})};var s={colors:i.colors.series,series:{stack:B,bars:{show:P,barWidth:.7,align:"center",fill:.9},pie:{show:C,label:{show:!1}},lines:{show:W,lineWidth:v.grid.line},points:{show:q,radius:v.grid.point,fill:.85,fillColor:null}},legend:{show:v.legend&&T,position:l.position||"ne"},grid:{borderWidth:v.grid.border,hoverable:!0,clickable:!1,mouseActiveRadius:10},xaxis:{show:v.axis.x,axisLabel:"undefined"!=typeof c(i.canvas.axis,["labelsText","x"])?i.canvas.axis.labelsText.x:void 0,axisLabelUseCanvas:!0,axisLabelFontSizePixels:t=Number($("."+VisualJS.setup.clas).css("font-size").replace("px","")),axisLabelFontFamily:$("."+VisualJS.setup.clas).css("font-family"),axisLabelPadding:t,axisLabelColour:"#545454"},yaxis:{show:v.axis.y,axisLabel:"undefined"!=typeof c(i.canvas.axis,["labelsText","y"])?i.canvas.axis.labelsText.y:void 0,axisLabelUseCanvas:!0,axisLabelFontSizePixels:t,axisLabelFontFamily:$("."+VisualJS.setup.clas).css("font-family"),axisLabelPadding:t,axisLabelColour:"#545454"}};(b=function(){var l,o,u=VisualJS.id,d=Y.length,c=w(VisualJS.arr2html(e.footer,n)||"");if($(m).html("<"+r+' style="overflow:auto;">'+H+"</"+r+'><div class="'+VisualJS.setup.footerclass+'" style="overflow:auto;">'+c+"</div>"),VisualJS.getSize(u)){switch($(m+" "+r).after('<div class="'+i.canvasclass+" "+VisualJS.visualsize+'" style="width: '+VisualJS.width+"px; height: "+VisualJS.height+'px;"></div>'),s.xaxis.tickFormatter=function(e){return E(e,u,"x")},s.yaxis.tickFormatter=function(e){return E(e,u,"y")},s.xaxis.tickLength=e.axis.ticks.x?null:0,s.yaxis.tickLength=e.axis.ticks.y?null:0,e.type){case"xy":e.range?(e.range.x?Array.isArray(e.range.x)?(s.xaxis.min=e.range.x[0],s.xaxis.max=e.range.x[1]):(s.xaxis.min=0,s.xaxis.max=e.range.x):(s.xaxis.min=null,s.xaxis.max=null),e.range.y?Array.isArray(e.range.x)?(s.yaxis.min=e.range.y[0],s.yaxis.max=e.range.y[1]):(s.yaxis.min=0,s.yaxis.max=e.range.y):(s.yaxis.min=null,s.yaxis.max=null)):(s.xaxis.min=null,s.yaxis.min=null,s.xaxis.max=null,s.yaxis.max=null),s.hooks={drawBackground:function(e){var a=e.getXAxes()[0];"undefined"!=typeof a.ticks&&a.ticks.length>0&&(a.datamin=a.ticks[0].v,a.datamax=a.ticks[a.ticks.length-1].v)}},$.plot(S,X,s);break;case"pyram":s.series.pyramid={show:!0,barWidth:1},s.yaxis.show=VisualJS.height/X[0].data.length>11?v.axis.y:!1,s.xaxis.max="number"==typeof v.range?a*v.range:Array.isArray(v.range)?v.range[1]:null,s.xaxis.tickFormatter=function(e){return E(e,u,"x",M)},$.plot(S,X,s);break;case"rank":s.yaxis.tickLength=null,s.series.bars.horizontal=!0,s.yaxis.ticks=VisualJS.height/d>11?Y.slice(0):0,e.axis.labels.y===!1&&(s.yaxis.ticks=L(s.yaxis.ticks)),"number"==typeof v.range?s.xaxis.max=a*v.range:Array.isArray(v.range)&&(s.xaxis.min=v.range[0],s.xaxis.max=v.range[1]),s.xaxis.tickFormatter=function(e){return E(e,u,"x",M)},s.yaxis.autoscaleMargin=0,s.series.bars.barWidth=.5,$.plot(S,[X],s);break;case"pie":$.plot(S,X,s);break;case"bar":if(s.xaxis.tickLength=0,e.by&&e.by.length&&"object"==typeof e.data[0]){for(Y=[],X=[],l=0;l<e.by.length;l++)X.push({label:e.by[l],data:[]});for(o=0,l=0;l<e.data.length;l++){Y.push(e.data[l].val.length%2===0?[o+(e.data[l].val.length-1)/2,e.data[l].label]:[Math.floor(o+e.data[l].val.length/2),e.data[l].label]);for(var p=0;p<e.data[l].val.length;p++)X[p].data.push([o,e.data[l].val[p]]),o++;o+=2}s.xaxis.ticks=Y,e.axis.labels.x===!1&&(s.xaxis.ticks=L(s.xaxis.ticks)),s.bars={show:!0}}else s.xaxis.mode="categories",X=[X],s.yaxis.tickFormatter=function(e){return E(e,u,"y",M)};"number"!=typeof v.range&&null!==v.range?(s.yaxis.min=v.range[0],s.yaxis.max=v.range[1]):"number"==typeof v.range&&(s.yaxis.min=null,s.yaxis.max=v.range),$.plot(S,X,s),(e.axis.labels.x===!1||e.axis.labels.y===!1)&&(t="<style>",e.axis.labels.x===!1&&(t+=S+" .flot-x-axis .flot-tick-label{display:none;}"),e.axis.labels.y===!1&&(t+=S+" .flot-y-axis .flot-tick-label{display:none;}"),t+="</style>",$(S).append(t));break;case"tsline":s.grid.markings=[{color:"#999",lineWidth:.5,yaxis:{from:0,to:0}}];case"tsbar":"tsbar"===e.type&&(s.xaxis.tickLength=0),s.yaxis.tickFormatter=function(e){return E(e,u,"y",M)};var y,f=VisualJS.width/d,x=[],g="01";switch("number"!=typeof v.range&&null!==v.range?(s.yaxis.min=v.range[0],s.yaxis.max=v.range[1]):"number"==typeof v.range&&(s.yaxis.min=null,s.yaxis.max=v.range),VisualJS.ticks[0][1].length){case 4:if(30>f){for(y=f>15?2:f>8?3:4,l=0;d>l;l++)x[l]=l%y?[Y[l][0],""]:[Y[l][0],Y[l][1]];s.xaxis.ticks=x}else s.xaxis.ticks=Y;e.axis.labels.x===!1&&(s.xaxis.ticks=L(s.xaxis.ticks));break;case 5:g="1";case 6:if(35>f){for(l=0;d>l;l++)x[l]=VisualJS.ticks[l][1].slice(4)!==g?[VisualJS.ticks[l][0],""]:[VisualJS.ticks[l][0],VisualJS.ticks[l][1].slice(0,4)],Y[l][1]=z(VisualJS.ticks[l][1],VisualJS.id);s.xaxis.ticks=x}else{for(l=0;d>l;l++)Y[l][1]=z(VisualJS.ticks[l][1],VisualJS.id);s.xaxis.ticks=Y}e.axis.labels.x===!1&&(s.xaxis.ticks=L(s.xaxis.ticks));break;case 7:if(55>f){for(y=f>20?2:f>10?3:4,l=0;d>l;l++)x[l]=l%y?[Y[l][0],""]:[Y[l][0],Y[l][1]];s.xaxis.ticks=x}else s.xaxis.ticks=Y;e.axis.labels.x===!1&&(s.xaxis.ticks=L(s.xaxis.ticks));break;default:s.xaxis.ticks=Y,e.axis.labels.x===!1&&(s.xaxis.ticks=L(s.xaxis.ticks))}$.plot(S,U,s)}$(S).UseTooltip(VisualJS.id),VisualJS.pub[VisualJS.id].heading=H}})()}}VisualJS.scripts.length&&"object"==typeof LazyLoad?LazyLoad.js(VisualJS.scripts,V):V()}};if("function"!=typeof visual)var visual=VisualJS.load;
/*
Copyright (c) 2017 Institut d'Estadistica de Catalunya (Idescat)
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
				en:  "."
			},
			k: { //thousands separator
				ca: ".",
				es: ".",
				en:  ","
			},
			month: { //Month axis labels
				ca: ["Gen", "Feb", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Des"],
				es:  ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
				en:  ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
			},
			quarter: { //Quarter axis labels
				ca: ["I", "II", "III", "IV"],
				es:  ["I", "II", "III", "IV"],
				en:  ["Q1", "Q2", "Q3", "Q4"]
			},
			na: { //text in tooltip when value is not available
				ca: "Valor no disponible",
				es: "Valor no disponible",
				en:  "Value not available"
			},
			oldbrowser: { //Warning message when IE<9 (maps)
				ca: "Per visualitzar el mapa cal un navegador m&eacute;s modern.",
				es: "Para visualizar el mapa es preciso un navegador m&aacute;s moderno.",
				en:  "To view the map you must use a modern browser."
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
