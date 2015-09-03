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
Copyright (c) 2014 Institut d'Estadistica de Catalunya (Idescat)
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
var VisualJS={version:"0.10.8",show:!0,old:!1,fixed:null,width:500,bwidth:500,height:500,normal:500,scripts:[],map:{},container:{},pub:{},func:{},callback:null,getSize:function(e){var t=VisualJS.setup,i=t.html,a=i.heading,n=i.footer,l=window,s=document,r=s.documentElement,o=s.getElementsByTagName("body")[0],u=s.getElementById(e),d=u.getElementsByTagName(a)[0].clientHeight,c=u.getElementsByTagName(n)[0].clientHeight,p=l.innerHeight||r.clientHeight||o.clientHeight,f=0;return d||(f+=11),c||(f+=11),"undefined"!=typeof p&&"undefined"!=typeof d&&"undefined"!=typeof c&&(null===VisualJS.fixed?(VisualJS.bwidth=l.innerWidth||r.clientWidth||o.clientWidth,VisualJS.width=VisualJS.bwidth-t.padding.w,VisualJS.height=p-t.padding.h-d-c+f):(VisualJS.bwidth=r.clientWidth||o.clientWidth,VisualJS.width=VisualJS.fixed[0]-t.padding.w,VisualJS.height=VisualJS.fixed[1]-t.padding.h-d-c+f)),VisualJS.visualsize=VisualJS.width<VisualJS.normal?t.mini:t.normal,VisualJS.width>10&&VisualJS.height>10},iframe:function(e,t){var i=VisualJS.setup,a="string"==typeof e.clas?e.clas:i.clas,n='<!DOCTYPE html>\n<!--[if lt IE 7]><html class="lt-ie9 lt-ie8 lt-ie7"> <![endif]-->\n<!--[if IE 7]><html class="lt-ie9 lt-ie8"> <![endif]-->\n<!--[if IE 8]><html class="lt-ie9"> <![endif]-->\n<!--[if gt IE 8]><!--> <html> <!--<![endif]-->\n<head>',l=function(){var t=document,i=t.createElement("iframe"),a=t.getElementById(e.id);return i.frameBorder="0",i.scrolling="no",a.parentNode.insertBefore(i,a.nextSibling),i},s=function(e,t){if("undefined"!=typeof e){var i;e.contentDocument?i=e.contentDocument:e.contentWindow?i=e.contentWindow.document:window.frames[e.name]&&(i=window.frames[e.name].document),i&&(i.open(),i.write(t),i.close())}};"string"==typeof t&&(n+=-1===t.indexOf("{")?'<link href="'+t+'" rel="stylesheet" type="text/css"/>':'<style type="text/css">'+t+"</style>"),n+='<script type="text/javascript" src="'+VisualJS.setup.main.visual+'"></script>',n+='<script type="text/javascript" src="'+VisualJS.setup.main.setup+'"></script>',n+='<script type="text/javascript" src="'+VisualJS.setup.main.lazy+'"></script>',n+='</head><body><div id="'+e.id+'" class="'+a+'"></div><script>window.setTimeout(function(){visual('+JSON.stringify(e)+");},1);</script></body></html>",s(l(),n)},compare:function(e){var t,i=VisualJS.setup,a=VisualJS.setup.separator,n="string"==typeof e.id?e.id:i.id,l="[object Array]"===Object.prototype.toString.call(e.css)?0===e.css.length?["",""]:1===e.css.length?[e.css[0],e.css[0]]:e.css:[e.css,e.css],s=document,r=s.createElement(i.html.heading),o=s.createElement(i.html.footer),u=s.getElementById(n),d=s.createElement("div"),c=s.createElement("style"),p=function(){if(VisualJS.getSize(n)){var t=VisualJS.height+("string"==typeof e.footer&&""!==e.footer?14:0),l=VisualJS.width+i.margin,s="iframe{ float: left; width: "+Math.floor((l-a)/2-i.margin)+"px; height:"+t+"px; }";c.styleSheet?c.styleSheet.cssText=s:c.innerHTML=s,d.style.height=t+"px"}};r.innerHTML="string"==typeof e.title?e.title:"",o.innerHTML="string"==typeof e.footer?e.footer:"",o.style.clear="both",u.appendChild(r),u.appendChild(o),s.getElementsByTagName("head")[0].appendChild(c),d.style.width=a+"px","styleFloat"in d.style?d.style.styleFloat="left":d.style.cssFloat="left";for(var f=0;2>f;f++)t=s.createElement("span"),"string"!=typeof e.load[f].id&&(e.load[f].id=i.compareids[f]),t.id=e.load[f].id,u.insertBefore(t,o),VisualJS.iframe(e.load[f],l[f]);u.insertBefore(d,t),p(),"undefined"!=typeof window.onorientationchange?window.onorientationchange=p:window.onresize=p},load:function(e){var t=function(e){var t=JSON.parse(e.data),i=function(t){e.source.postMessage(JSON.stringify(t),"*")};if("undefined"==typeof t.action)i({type:"error",data:[{id:"400",label:'"action" is required.'}]});else if("send"===t.action){var a=t.id||VisualJS.id,n=VisualJS.container[a]||VisualJS.container[a];if(n){if("cmap"===n.type&&!n.data[0].hasOwnProperty("label")){for(var l=[],s=VisualJS.map[n.by],r=s.features.length;r--;)l[s.features[r].properties[s.id]]=s.features[r].properties[s.label];for(var o=n.data,u=o.length;u--;)o[u].label=l[o[u].id]}i(n)}else i({type:"error",data:[{id:"404",label:'A visualisation with the specified "id" was not found'}]})}else i({type:"error",data:[{id:"400",label:'"action" value is not correct.'}]})};if("undefined"==typeof VisualJS.setup&&window.alert("Visual: Setup not found (visual.setup.js)!"),"[object Array]"!==Object.prototype.toString.call(e))VisualJS.get(e);else for(var i=0,a=e.length;a>i;i++)VisualJS.get(e[i]);VisualJS.container[VisualJS.id].listen&&(window.addEventListener?addEventListener("message",t,!1):document.attachEvent("onmessage",t))},get:function(e){for(var t=VisualJS.setup,i=t.html,a=t.canvas,n=i.heading,l=i.footer,s=VisualJS.old||t.func.old("ie9"),r=function(e){return"undefined"!=typeof e&&"[object Array]"===Object.prototype.toString.call(e)&&2===e.length&&"number"==typeof e[0]&&"number"==typeof e[1]&&e[0]<e[1]?!0:!1},o=function(t,i,a){"string"==typeof t?typeof e[t]!==i&&(e[t]=a[t]):typeof e[t[0]][t[1]]!==i&&(e[t[0]][t[1]]=a[t[0]][t[1]])},u=[["show","boolean",VisualJS],["callback","function",VisualJS],["id","string",t],["listen","boolean",t],["dec","number",a],["autoheading","boolean",a],["legend","boolean",a],["grid","object",a],[["grid","border"],"number",a],[["grid","shadow"],"number",a],[["grid","line"],"number",a],[["grid","point"],"number",a],["axis","object",a],[["axis","x"],"boolean",a],[["axis","y"],"boolean",a]],d=0;d<u.length;d++)o(u[d][0],u[d][1],u[d][2]);VisualJS.id=e.id,VisualJS.pub[VisualJS.id]={heading:null,legend:null},"object"==typeof e.fixed&&(VisualJS.fixed=e.fixed),"object"==typeof e.unit&&null!==e.unit?(o(["unit","label"],"string",a),o(["unit","symbol"],"string",a),o(["unit","position"],"string",a)):e.unit=a.unit,e.lang=e.lang||t.i18n.lang,"number"==typeof e.range||r(e.range)||(e.range=a.range.hasOwnProperty(e.type)&&"number"==typeof a.range[e.type]?a.range[e.type]:null),VisualJS.container[VisualJS.id]=e;var c,p="#"+VisualJS.id,f=p+" ."+t.canvasclass,g=VisualJS.container[VisualJS.id],h=function(){if(g.autoheading===!1)return g.title;var e,t=[],i=function(e,i){"string"==typeof e&&""!==e&&(i===!0&&(e='<span class="'+VisualJS.setup.nowrapclass+'">'+e+"</span>"),t.push(e))};if(null!==g.time&&"object"==typeof g.time){var a=V(g.time[0],VisualJS.id),n=V(g.time[g.time.length-1],VisualJS.id);e=a+"&ndash;"+n}else e=V(g.time,VisualJS.id);return i(g.title,!1),i(g.geo,!0),i(e,!0),m(t.join(". "))},y=function(){var e=!1;"function"==typeof VisualJS.chart&&(v(),g.show&&VisualJS.chart(),"undefined"!=typeof window.onorientationchange?window.onorientationchange=c:window.onresize=c,e=!0),null!==g.callback&&g.callback.call({id:VisualJS.id,chart:e,heading:VisualJS.pub[VisualJS.id].heading,legend:VisualJS.pub[VisualJS.id].legend})},m=function(e){return String(e).replace(/&amp;/g,"&")},b=function(e,t){return t&&e.exists.call()?!1:(VisualJS.scripts.push(e.js),!0)},S=function(e,t,i){var a="number"==typeof i&&""!==VisualJS.container[e].unit.label?" "+VisualJS.container[e].unit.label:"",n="number"==typeof i?VisualJS.container[e].unit.symbol:"",l=J(i,e),s=l!==VisualJS.setup.i18n.text.na[VisualJS.container[e].lang]?"end"===VisualJS.container[e].unit.position?l+a+(""!==n?" "+n:n):n+l+a:l;return t?"<strong>"+s+"</strong> "+t:s},J=function(e,t){if("undefined"==typeof e||null===e)return VisualJS.setup.i18n.text.na[VisualJS.container[t].lang];if("number"==typeof e){for(var i=e.toFixed(VisualJS.container[t].dec),a=/(\d+)(\d{3})/,n=i.split("."),l=n[0],s=n.length>1?VisualJS.setup.i18n.text.dec[VisualJS.container[t].lang]+n[1]:"";a.test(l);)l=l.replace(a,"$1"+VisualJS.setup.i18n.text.k[VisualJS.container[t].lang]+"$2");return l+s}return""},V=function(e,t){var i;if(!e)return null;if(isNaN(e))return e;switch(e.length){case 5:i="quarter";break;case 6:i="month";break;default:return e}var a=VisualJS.setup.i18n.text[i];if("undefined"==typeof a)return e;var n=a[VisualJS.container[t].lang];if("undefined"==typeof n)return e;var l=n[e.slice(4)-1];return"undefined"==typeof l?e:l+" <span>"+e.slice(0,4)+"</span>"},x=function(e,t,i){var a=document.getElementById(VisualJS.setup.tooltipid),n=VisualJS.bwidth-VisualJS.setup.margin,l={};a.innerHTML=e,a.style.display="block";var s=a.clientWidth/2;l.x=t-s,l.y=i-a.clientHeight-5,t+s>n?l.x-=t+s-n:l.x<VisualJS.setup.margin&&(l.x+=VisualJS.setup.margin-l.x),l.y<VisualJS.setup.margin&&(l.y+=1.75*a.clientHeight),a.style.left=l.x+"px",a.style.top=l.y+"px"},v=function(){var e=document;if(!e.getElementById(VisualJS.setup.tooltipid)){var t=e.createElement("div");t.id=VisualJS.setup.tooltipid,t.style.display="none",e.body.appendChild(t)}};if("cmap"===e.type)if(s)document.getElementById(VisualJS.id).innerHTML="<p>"+t.i18n.text.oldbrowser[g.lang]+"</p>";else{if("string"!=typeof e.by)return;b(t.lib.maps,!0),b(t.lib.d3,!0),b(t.map[e.by],!0),VisualJS.chart=function(){var i=h(),a=VisualJS.map[e.by],s=a.area[0],r=a.area[1],o="object"==typeof e.grouped&&"object"==typeof e.grouped.label&&e.grouped.label.length>0&&e.data[0].hasOwnProperty("group"),u=e.data[0].hasOwnProperty("val"),d=o?e.grouped.label.length:u?t.colors.map.max:1,f=t.colorclassprefix,y=VisualJS.func.colors(t.colors.map.base,d,"fill",f,o&&"object"==typeof e.grouped.color&&e.grouped.color.length===e.grouped.label.length?e.grouped.color:[],VisualJS.id),b=d3.select(p),V=d3.geo[a.projection](),v="object"==typeof a.center&&"function"==typeof V.center?V.center(a.center):V,w=v.scale(a.scale).translate([s/2,r/2]),k=d3.geo.path().projection(w),j=d3.select("#"+t.tooltipid);(c=function(){if(b.html("<"+n+"></"+n+"><"+l+"></"+l+">"),d3.select(p+" "+n).html(i),d3.select(p+" "+l).html(m(e.footer||"")),VisualJS.getSize(VisualJS.id)){var c,h,V,v,w,E=VisualJS.id,M=d3.map(),I=d3.map(),W=e.data[0].hasOwnProperty("label"),z=[],B=function(){},O=function(){},T=VisualJS.height/r,$=VisualJS.width/s,L=Math.min(Math.round(s*T),VisualJS.width),q=Math.min(Math.round(r*$),VisualJS.height),H=Math.floor((VisualJS.width-L)/2),A=Math.floor((VisualJS.height-q)/2),N=$>T?T:$,F=b.insert("svg:svg",l).attr("width",L).attr("height",q);o?(c=d3.map(),B=function(e,t){e.set(t.id,t.group)},V=function(e,t,i){return f+(e.get(i[a.id])-1)},h=function(t,i){var n=e.grouped.label[t.get(i[a.id])-1],l=W?I.get(i[a.id]):i[a.label];return"undefined"!=typeof n&&(l+=" <em>"+n+"</em>"),l}):(u?(V=function(e,t,i,n,l){var s=t.get(i[a.id]);if("undefined"==typeof s)return"";if(n===l)return f+(d/2).toFixed(0);var r=d3.scale.quantize().domain([n,l]).range(d3.range(d).map(function(e){return f+e}));return r(s)},O=VisualJS.func.legend):V=function(e,t,i){return""!==t.get(i[a.id])?"":f+(d-1)},h=function(e,t){return W?I.get(t[a.id]):t[a.label]});for(var P=0,C=e.data,D=C.length;D>P;P++){var Y=C[P];Y.hasOwnProperty("val")?null!==Y.val&&(M.set(Y.id,Y.val),z.push(Y.val)):M.set(Y.id,""),W&&I.set(Y.id,Y.label),B(c,Y)}z.sort(function(e,t){return e-t});var U=z[0],X=z[D-1];if("number"==typeof g.range?(v=d3.quantile(z,g.range),w=d3.quantile(z,1-g.range)):(v=g.range[0],w=g.range[1]),F.style("margin-left",H+"px"),F.style("margin-top",A+"px"),F.style("margin-bottom",A+"px"),F.append("svg:g").attr("class",t.areaclass).attr("transform","scale("+N+")").selectAll("path").data(a.features).enter().append("svg:path").attr("class",function(e){return""===e.properties[a.id]||""===e.properties[a.label]||!u&&"undefined"==typeof M.get(e.properties[a.id])?f+"nohover":V(c,M,e.properties,v,w)}).attr("d",k).on("mousemove",function(e){""!==e.properties[a.id]&&""!==e.properties[a.label]&&(u||o||"undefined"!=typeof M.get(e.properties[a.id]))&&x(S(E,h(c,e.properties),M.get(e.properties[a.id])),d3.event.pageX,d3.event.pageY)}).on("mouseout",function(){return j.style("display","none")}),"undefined"!=typeof U){var R=[S(E,null,v),S(E,null,w)],G=[y[y.length-1],y[0]],K=[U>v||J(v,E)===J(U,E),w>X||J(w,E)===J(X,E)];VisualJS.pub[VisualJS.id].legend={color:G,text:R,symbol:[K[0]?"==":"<=",K[1]?"==":">="]},g.legend&&"object"==typeof a.legend&&O(R,G,F,j,a.area,a.legend,K)}VisualJS.pub[VisualJS.id].heading=i}})()}}else{var w;b(t.lib.jquery,!0)?(w=!1,b(t.lib.jquery.flot,!1)):w=b(t.lib.jquery.flot,!0)?!1:!0,s&&b(t.lib.excanvas,!0);var k,j,E,M,I,W,z,B=function(){},O=[],T=[],L=[],q=e.stacked||!1,H=function(){if(g.autoheading){var i,a,n,l,s,r,o=e.time.length,u=e.data.length;if(null===e.data[0].val[0]){for(a=0,l=!0,s=[];o>a;a++){for(i=0;u>i;i++)l=l&&null===e.data[i].val[a];if(!l)break;s.push(l)}for(r=s.length,n=0;r>n;n++)if(s[n])for(e.time.shift(),i=0;u>i;i++)e.data[i].val.shift();o=e.time.length}if(null===e.data[0].val[o-1]){for(a=o,l=!0,s=[];a--;){for(i=0,u=e.data.length;u>i;i++)l=l&&null===e.data[i].val[a];if(!l)break;s.push(l)}for(n=s.length;n--;)if(s[n])for(e.time.pop(),i=0;u>i;i++)e.data[i].val.pop()}}var d=function(){};return q?b(t.lib.jquery.flot.stack,w):"tsbar"===e.type&&(b(t.lib.jquery.flot.orderbars,w),d=function(e){return e.bars}),B=function(t,i){VisualJS.ticks=[];var a,n;for(a=0,n=i.length;n>a;a++)T.push([a,i[a]]),VisualJS.ticks.push([a,i[a]]);for(a=0,n=t.length;n>a;a++){for(var l=[],s=t[a].val,r=s.length,o=0;r>o;o++)l.push([o,s[o]]);O.push("tsbar"!==e.type||q||1===n?{label:t[a].label,data:l}:{label:t[a].label,data:l,bars:{show:!0,barWidth:.2,order:a+1,lineWidth:2}})}var u=O.length;for(a=0;u>a;a++)L.push({data:O[a].data,label:O[a].label,bars:d(O[a]),shadowSize:g.grid.shadow});j=u>1},h()};switch(Array.max=function(e){return Math.max.apply(Math,e)},e.type){case"pyram":b(t.lib.jquery.flot.pyramid,w),I=!1,W=!1,z=h(),B=function(e,t,i){k=Math.max(Array.max(e[0].val),Array.max(e[1].val)),O[0]={label:e[0].label,data:[],pyramid:{direction:"L"}},O[1]={label:e[1].label,data:[]};for(var a=0,n=i.length;n>a;a++)O[0].data[a]=[i[a],e[0].val[a]],O[1].data[a]=[i[a],e[1].val[a]]},j=!0,E=!1,q=!1,M=!1;break;case"rank":var A=[];M=!1,I=!1,W=!0,z=h(),B=function(e){for(var t=[],i=0,a=e.length;a>i;i++){T[i]=[i,e[a-i-1][0]];var n=e[a-i-1][1];t.push(n),A[i]=[n,i]}O={data:A},k=Array.max(t)},j=!1,E=!1;break;case"bar":b(t.lib.jquery.flot.categories,w),I=!1,W=!0,z=h(),M=!1,B=function(e,t,i){var a,n;if("object"!=typeof i||null===i)for(n=e.length,a=0;n>a;a++)null!==e[a][1]&&O.push(["<span>"+e[a][0]+"</span>",e[a][1]]);else if("number"==typeof e[0])for(n=i.length,a=0;n>a;a++)null!==e[a]&&O.push(['<span">'+i[a]+"</span>",e[a]]);j=O.length>1},E=!0;break;case"tsline":z=H(),E=null,I=!0,W=!1,M=!0;break;case"tsbar":z=H(),E=!0,I=!1,W=!0,M=!1}VisualJS.chart=function(){B(e.data,e.time,e.by),$.fn.UseTooltip=function(i){var a=[];$(this).bind("plothover",function(n,l,s){if(s){if(a!=[s.seriesIndex,s.dataIndex]){a=[s.seriesIndex,s.dataIndex];var r=s.datapoint[0],o=s.datapoint[1],u="bar"!==e.type?s.series.label:O[r][0],d="rank"!==e.type?u:T[o][1],c="rank"!==e.type&&"bar"!==e.type?q||1===O.length?T[r][1]:"pyram"===e.type?O[l.x<0?0:1].data[s.dataIndex][0]:T[s.dataIndex][1]:!1,p="pyram"===e.type?Math.abs(r):"rank"!==e.type?"tsbar"!==e.type?o:q||1===O.length?O[s.seriesIndex].data[r][1]:o:r;x(S(i,c?d+" ("+c+")":d,p),l.pageX,l.pageY)}}else $("#"+t.tooltipid).hide(),a=[]})},j=g.legend&&j;var i={colors:t.colors.series,series:{stack:E,bars:{show:W,barWidth:.7,align:"center",fill:.9},lines:{show:M,lineWidth:g.grid.line},points:{show:I,radius:g.grid.point}},legend:{show:j},grid:{borderWidth:g.grid.border,hoverable:!0,clickable:!1,mouseActiveRadius:10},xaxis:{show:g.axis.x},yaxis:{show:g.axis.y}};(c=function(){var a,s=VisualJS.id,r=T.length;if($(p).html("<"+n+"></"+n+"><"+l+"></"+l+">"),$(p+" "+n).html(z),$(p+" "+l).html(m(e.footer||"")),VisualJS.getSize(s)){switch($(p+" "+n).after('<div class="'+t.canvasclass+" "+VisualJS.visualsize+'" style="width: '+VisualJS.width+"px; height: "+VisualJS.height+'px;"></div>'),e.type){case"pyram":i.series.pyramid={show:!0,barWidth:1},i.yaxis.show=VisualJS.height/O[0].data.length>11?g.axis.y:!1,i.xaxis.max="number"==typeof g.range?k*g.range:g.range[1],i.xaxis.tickFormatter=function(e){return J(e,s)},$.plot(f,O,i);break;case"rank":i.series.bars.horizontal=!0,i.yaxis.ticks=VisualJS.height/r>11?T.slice(0):0,"number"==typeof g.range?i.xaxis.max=k*g.range:(i.xaxis.min=g.range[0],i.xaxis.max=g.range[1]),i.xaxis.tickFormatter=function(e){return J(e,s)},i.yaxis.autoscaleMargin=0,i.series.bars.barWidth=.5,$.plot(f,[O],i);break;case"bar":i.xaxis.mode="categories",i.xaxis.tickLength=0,i.yaxis.tickFormatter=function(e){return J(e,s)},"number"!=typeof g.range&&null!==g.range&&(i.yaxis.min=g.range[0],i.yaxis.max=g.range[1]),$.plot(f,[O],i);break;case"tsline":i.grid.markings=[{color:"#999",lineWidth:.5,yaxis:{from:0,to:0}}];case"tsbar":i.yaxis.tickFormatter=function(e){return J(e,s)};var o,u=VisualJS.width/r,d=[],c="01";switch("number"!=typeof g.range&&null!==g.range&&(i.yaxis.min=g.range[0],i.yaxis.max=g.range[1]),VisualJS.ticks[0][1].length){case 4:if(30>u){for(o=u>15?2:u>8?3:4,a=0;r>a;a++)d[a]=a%o?[T[a][0],""]:[T[a][0],T[a][1]];i.xaxis.ticks=d}else i.xaxis.ticks=T;break;case 5:c="1";case 6:if(35>u){for(a=0;r>a;a++)d[a]=VisualJS.ticks[a][1].slice(4)!==c?[VisualJS.ticks[a][0],""]:[VisualJS.ticks[a][0],VisualJS.ticks[a][1].slice(0,4)],T[a][1]=V(VisualJS.ticks[a][1],VisualJS.id);i.xaxis.ticks=d}else{for(a=0;r>a;a++)T[a][1]=V(VisualJS.ticks[a][1],VisualJS.id);i.xaxis.ticks=T}break;case 7:if(55>u){for(o=u>20?2:u>10?3:4,a=0;r>a;a++)d[a]=a%o?[T[a][0],""]:[T[a][0],T[a][1]];i.xaxis.ticks=d}else i.xaxis.ticks=T;break;default:i.xaxis.ticks=T}$.plot(f,L,i)}$(f).UseTooltip(VisualJS.id),VisualJS.pub[VisualJS.id].heading=z}})()}}VisualJS.scripts.length&&"object"==typeof LazyLoad?LazyLoad.js(VisualJS.scripts,y):y()}};if("function"!=typeof visual)var visual=VisualJS.load;

/*
Copyright (c) 2014 Institut d'Estadistica de Catalunya (Idescat)
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

VisualJS.setup={ //v.0.10.0
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
		grid: {
			border: 0, //grid border width
			shadow: 4, //line shadow width
			line: 2, //line width
			point: 1 //point radius
		},
		axis: { //show axes?
			x: true,
			y: true
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
		visual: "http://idescat.github.io/visual/visual.js",
		setup: "http://idescat.github.io/visual/visual.setup.js",
		lazy: "http://idescat.github.io/visual/lib/lazyload.js"
	},
	lib: {
		d3: {
			js: "http://idescat.github.io/visual/lib/d3.v3.js",
			exists: function(){ return typeof d3==="object"; }
		},
		jquery: {
			js: "http://idescat.github.io/visual/lib/jquery.1.8.3.js",
			exists: function(){ return typeof jQuery==="function"; },

			flot: {
				js: "http://idescat.github.io/visual/lib/jquery.flot.js",
				exists: function(){ return typeof jQuery.plot==="function"; },

				stack: {
					js: "http://idescat.github.io/visual/lib/jquery.flot.stack.js",
					exists: function(){ return typeof jQuery.plot.plugins==="object" && typeof jQuery.plot.plugins[0]==="object" && jQuery.plot.plugins[0].name==="stack";  }
				},
				orderbars: {
					js: "http://idescat.github.io/visual/lib/jquery.flot.orderbars.js",
					exists: function(){ return typeof jQuery.plot.plugins==="object" && typeof jQuery.plot.plugins[0]==="object" && jQuery.plot.plugins[0].name==="orderBars"; }
				},
				pyramid: {
					js: "http://idescat.github.io/visual/lib/jquery.flot.pyramid.js",
					exists: function(){ return typeof FlotPyramid==="object"; }
				},
				categories: {
					js: "http://idescat.github.io/visual/lib/jquery.flot.categories.js",
					exists: function(){ return typeof jQuery.plot.plugins==="object" && typeof jQuery.plot.plugins[0]==="object" && jQuery.plot.plugins[0].name==="categories"; }
				}
			}
		},
		maps: {
			js: "http://idescat.github.io/visual/maps/visual.maps.js",
			exists: function(){ return typeof VisualJS.func.colors==="function" && typeof VisualJS.func.legend==="function";}
		},
		excanvas: {
			js: "http://idescat.github.io/visual/lib/excanvas.js",
			exists: function(){ return typeof G_vmlCanvasManager!=="undefined"; }
		}
	},

	//Maps: path and existence function
	map: {
		usastates: {
			label: "USA: states",
			js: "http://idescat.github.io/visual/maps/usa2013states.js",
			exists: function(){ return typeof VisualJS.map.usastates!=="undefined"; }
		},
		norwaymun: {
			label: "Norway: municipalities",
			js: "http://idescat.github.io/visual/maps/norway2013mun.js",
			exists: function(){ return typeof VisualJS.map.norwaymun!=="undefined"; }
		},
		spainnuts2: {
			label: "Spain: NUTS 2",
			js: "http://idescat.github.io/visual/maps/spain2014nuts2.js",
			exists: function(){ return typeof VisualJS.map.spainnuts2!=="undefined"; }
		},
		spainnuts3: {
			label: "Spain: NUTS 3",
			js: "http://idescat.github.io/visual/maps/spain2014nuts3.js",
			exists: function(){ return typeof VisualJS.map.spainnuts3!=="undefined"; }
		},
		prov: {
			label: "Catalonia: NUTS 3",
			js: "http://idescat.github.io/visual/maps/cat2013prov.js",
			exists: function(){ return typeof VisualJS.map.prov!=="undefined"; }
		},
		com: {
			label: "Catalonia: counties (before 2015)",
			js: "http://idescat.github.io/visual/maps/cat2013com.js",
			exists: function(){ return typeof VisualJS.map.com!=="undefined"; }
		},
		com2015: {
			label: "Catalonia: counties",
			js: "http://idescat.github.io/visual/maps/cat2015com.js",
			exists: function(){ return typeof VisualJS.map.com2015!=="undefined"; }
		},
		mun: {
			label: "Catalonia: municipalities",
			js: "http://idescat.github.io/visual/maps/cat2013mun.js",
			exists: function(){ return typeof VisualJS.map.mun!=="undefined"; }
		},
		prov08: {
			label: "Catalonia. Province of Barcelona: municipalities",
			js: "http://idescat.github.io/visual/maps/prov082013mun.js",
			exists: function(){ return typeof VisualJS.map.prov08!=="undefined"; }
		},
		prov17: {
			label: "Catalonia. Province of Girona: municipalities",
			js: "http://idescat.github.io/visual/maps/prov172013mun.js",
			exists: function(){ return typeof VisualJS.map.prov17!=="undefined"; }
		},
		prov25: {
			label: "Catalonia. Province of Lleida: municipalities",
			js: "http://idescat.github.io/visual/maps/prov252013mun.js",
			exists: function(){ return typeof VisualJS.map.prov25!=="undefined"; }
		},
		prov43: {
			label: "Catalonia. Province of Tarragona: municipalities",
			js: "http://idescat.github.io/visual/maps/prov432013mun.js",
			exists: function(){ return typeof VisualJS.map.prov43!=="undefined"; }
		},
		com01: {
			label: "Catalonia. L'Alt Camp: municipalities",
			js: "http://idescat.github.io/visual/maps/com012013mun.js",
			exists: function(){ return typeof VisualJS.map.com01!=="undefined"; }
		},
		com02: {
			label: "Catalonia. L'Alt Empordà: municipalities",
			js: "http://idescat.github.io/visual/maps/com022013mun.js",
			exists: function(){ return typeof VisualJS.map.com02!=="undefined"; }
		},
		com03: {
			label: "Catalonia. L'Alt Penedès: municipalities",
			js: "http://idescat.github.io/visual/maps/com032013mun.js",
			exists: function(){ return typeof VisualJS.map.com03!=="undefined"; }
		},
		com04: {
			label: "Catalonia. L'Alt Urgell: municipalities",
			js: "http://idescat.github.io/visual/maps/com042013mun.js",
			exists: function(){ return typeof VisualJS.map.com04!=="undefined"; }
		},
		com05: {
			label: "Catalonia. L'Alta Ribagorça: municipalities",
			js: "http://idescat.github.io/visual/maps/com052013mun.js",
			exists: function(){ return typeof VisualJS.map.com05!=="undefined"; }
		},
		com06: {
			label: "Catalonia. L'Anoia: municipalities",
			js: "http://idescat.github.io/visual/maps/com062013mun.js",
			exists: function(){ return typeof VisualJS.map.com06!=="undefined"; }
		},
		com072015: {
			label: "Catalonia. El Bages: municipalities",
			js: "http://idescat.github.io/visual/maps/com072015mun.js",
			exists: function(){ return typeof VisualJS.map.com072015!=="undefined"; }
		},
		com07: {
			label: "Catalonia. El Bages: municipalities (before 2015)",
			js: "http://idescat.github.io/visual/maps/com072013mun.js",
			exists: function(){ return typeof VisualJS.map.com07!=="undefined"; }
		},
		com08: {
			label: "Catalonia. El Baix Camp: municipalities",
			js: "http://idescat.github.io/visual/maps/com082013mun.js",
			exists: function(){ return typeof VisualJS.map.com08!=="undefined"; }
		},
		com09: {
			label: "Catalonia. El Baix Ebre: municipalities",
			js: "http://idescat.github.io/visual/maps/com092013mun.js",
			exists: function(){ return typeof VisualJS.map.com09!=="undefined"; }
		},
		com10: {
			label: "Catalonia. El Baix Empordà: municipalities",
			js: "http://idescat.github.io/visual/maps/com102013mun.js",
			exists: function(){ return typeof VisualJS.map.com10!=="undefined"; }
		},
		com11: {
			label: "Catalonia. El Baix Llobregat: municipalities",
			js: "http://idescat.github.io/visual/maps/com112013mun.js",
			exists: function(){ return typeof VisualJS.map.com11!=="undefined"; }
		},
		com12: {
			label: "Catalonia. El Baix Penedès: municipalities",
			js: "http://idescat.github.io/visual/maps/com122013mun.js",
			exists: function(){ return typeof VisualJS.map.com12!=="undefined"; }
		},
		com13: {
			label: "Catalonia. El Barcelonès: municipalities",
			js: "http://idescat.github.io/visual/maps/com132013mun.js",
			exists: function(){ return typeof VisualJS.map.com13!=="undefined"; }
		},
		com14: {
			label: "Catalonia. El Berguedà: municipalities",
			js: "http://idescat.github.io/visual/maps/com142013mun.js",
			exists: function(){ return typeof VisualJS.map.com14!=="undefined"; }
		},
		com15: {
			label: "Catalonia. La Cerdanya: municipalities",
			js: "http://idescat.github.io/visual/maps/com152013mun.js",
			exists: function(){ return typeof VisualJS.map.com15!=="undefined"; }
		},
		com16: {
			label: "Catalonia. La Conca de Barberà: municipalities",
			js: "http://idescat.github.io/visual/maps/com162013mun.js",
			exists: function(){ return typeof VisualJS.map.com16!=="undefined"; }
		},
		com17: {
			label: "Catalonia. El Garraf: municipalities",
			js: "http://idescat.github.io/visual/maps/com172013mun.js",
			exists: function(){ return typeof VisualJS.map.com17!=="undefined"; }
		},
		com18: {
			label: "Catalonia. Les Garrigues: municipalities",
			js: "http://idescat.github.io/visual/maps/com182013mun.js",
			exists: function(){ return typeof VisualJS.map.com18!=="undefined"; }
		},
		com19: {
			label: "Catalonia. La Garrotxa: municipalities",
			js: "http://idescat.github.io/visual/maps/com192013mun.js",
			exists: function(){ return typeof VisualJS.map.com19!=="undefined"; }
		},		
		com20: {
			label: "Catalonia. El Gironès: municipalities",
			js: "http://idescat.github.io/visual/maps/com202013mun.js",
			exists: function(){ return typeof VisualJS.map.com20!=="undefined"; }
		},
		com21: {
			label: "Catalonia. El Maresme: municipalities",
			js: "http://idescat.github.io/visual/maps/com212013mun.js",
			exists: function(){ return typeof VisualJS.map.com21!=="undefined"; }
		},
		com22: {
			label: "Catalonia. El Montsià: municipalities",
			js: "http://idescat.github.io/visual/maps/com222013mun.js",
			exists: function(){ return typeof VisualJS.map.com22!=="undefined"; }
		},
		com23: {
			label: "Catalonia. La Noguera: municipalities",
			js: "http://idescat.github.io/visual/maps/com232013mun.js",
			exists: function(){ return typeof VisualJS.map.com23!=="undefined"; }
		},
		com242015: {
			label: "Catalonia. Osona: municipalities",
			js: "http://idescat.github.io/visual/maps/com242015mun.js",
			exists: function(){ return typeof VisualJS.map.com242015!=="undefined"; }
		},
		com24: {
			label: "Catalonia. Osona: municipalities (before 2015)",
			js: "http://idescat.github.io/visual/maps/com242013mun.js",
			exists: function(){ return typeof VisualJS.map.com24!=="undefined"; }
		},
		com25: {
			label: "Catalonia. El Pallars Jussà: municipalities",
			js: "http://idescat.github.io/visual/maps/com252013mun.js",
			exists: function(){ return typeof VisualJS.map.com25!=="undefined"; }
		},
		com26: {
			label: "Catalonia. El Pallars Sobirà: municipalities",
			js: "http://idescat.github.io/visual/maps/com262013mun.js",
			exists: function(){ return typeof VisualJS.map.com26!=="undefined"; }
		},
		com27: {
			label: "Catalonia. El Pla d'Urgell: municipalities",
			js: "http://idescat.github.io/visual/maps/com272013mun.js",
			exists: function(){ return typeof VisualJS.map.com27!=="undefined"; }
		},
		com28: {
			label: "Catalonia. El Pla de l'Estany: municipalities",
			js: "http://idescat.github.io/visual/maps/com282013mun.js",
			exists: function(){ return typeof VisualJS.map.com28!=="undefined"; }
		},
		com29: {
			label: "Catalonia. El Priorat: municipalities",
			js: "http://idescat.github.io/visual/maps/com292013mun.js",
			exists: function(){ return typeof VisualJS.map.com29!=="undefined"; }
		},
		com30: {
			label: "Catalonia. La Ribera d'Ebre: municipalities",
			js: "http://idescat.github.io/visual/maps/com302013mun.js",
			exists: function(){ return typeof VisualJS.map.com30!=="undefined"; }
		},
		com31: {
			label: "Catalonia. El Ripollès: municipalities",
			js: "http://idescat.github.io/visual/maps/com312013mun.js",
			exists: function(){ return typeof VisualJS.map.com31!=="undefined"; }
		},
		com32: {
			label: "Catalonia. La Segarra: municipalities",
			js: "http://idescat.github.io/visual/maps/com322013mun.js",
			exists: function(){ return typeof VisualJS.map.com32!=="undefined"; }
		},
		com33: {
			label: "Catalonia. El Segrià: municipalities",
			js: "http://idescat.github.io/visual/maps/com332013mun.js",
			exists: function(){ return typeof VisualJS.map.com33!=="undefined"; }
		},
		com34: {
			label: "Catalonia. La Selva: municipalities",
			js: "http://idescat.github.io/visual/maps/com342013mun.js",
			exists: function(){ return typeof VisualJS.map.com34!=="undefined"; }
		},
		com35: {
			label: "Catalonia. El Solsonès: municipalities",
			js: "http://idescat.github.io/visual/maps/com352013mun.js",
			exists: function(){ return typeof VisualJS.map.com35!=="undefined"; }
		},
		com36: {
			label: "Catalonia. El Tarragonès: municipalities",
			js: "http://idescat.github.io/visual/maps/com362013mun.js",
			exists: function(){ return typeof VisualJS.map.com36!=="undefined"; }
		},
		com37: {
			label: "Catalonia. La Terra Alta: municipalities",
			js: "http://idescat.github.io/visual/maps/com372013mun.js",
			exists: function(){ return typeof VisualJS.map.com37!=="undefined"; }
		},
		com38: {
			label: "Catalonia. L'Urgell: municipalities",
			js: "http://idescat.github.io/visual/maps/com382013mun.js",
			exists: function(){ return typeof VisualJS.map.com38!=="undefined"; }
		},
		com39: {
			label: "Catalonia. La Val d'Aran: municipalities",
			js: "http://idescat.github.io/visual/maps/com392013mun.js",
			exists: function(){ return typeof VisualJS.map.com39!=="undefined"; }
		},
		com40: {
			label: "Catalonia. El Vallès Occidental: municipalities",
			js: "http://idescat.github.io/visual/maps/com402013mun.js",
			exists: function(){ return typeof VisualJS.map.com40!=="undefined"; }
		},
		com412015: {
			label: "Catalonia. El Vallès Oriental: municipalities",
			js: "http://idescat.github.io/visual/maps/com412015mun.js",
			exists: function(){ return typeof VisualJS.map.com412015!=="undefined"; }
		},
		com41: {
			label: "Catalonia. El Vallès Oriental: municipalities (before 2015)",
			js: "http://idescat.github.io/visual/maps/com412013mun.js",
			exists: function(){ return typeof VisualJS.map.com41!=="undefined"; }
		},
		com422015: {
			label: "Catalonia. El Moianès: municipalities",
			js: "http://idescat.github.io/visual/maps/com422015mun.js",
			exists: function(){ return typeof VisualJS.map.com422015!=="undefined"; }
		},
		at: {
			label: "Catalonia. Regions of the Territorial Plan",
			js: "http://idescat.github.io/visual/maps/cat2014at.js",
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