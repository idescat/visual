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

var VisualJS={version:"0.8.3",show:!0,old:!1,fixed:null,width:500,bwidth:500,height:500,normal:500,scripts:[],ticks:[],map:{},container:{},func:{},callback:null,draw:function(){var t=!1
"function"==typeof VisualJS.chart&&(VisualJS.tooltip(),VisualJS.show&&VisualJS.chart(),"undefined"!=typeof window.onorientationchange?window.onorientationchange=VisualJS.canvas:window.onresize=VisualJS.canvas,t=!0),null!==VisualJS.callback&&VisualJS.callback.call({id:VisualJS.id,chart:t})},tooltip:function(){var t=document
if(!t.getElementById(VisualJS.setup.tooltipid)){var e=t.createElement("div")
e.id=VisualJS.setup.tooltipid,e.style.display="none",t.body.appendChild(e)}},getsize:function(t){var e=VisualJS.setup,a=e.html,i=a.heading,l=a.footer,s=window,n=document,r=n.documentElement,o=n.getElementsByTagName("body")[0],u=n.getElementById(t),d=u.getElementsByTagName(i)[0].clientHeight,c=u.getElementsByTagName(l)[0].clientHeight,p=s.innerHeight||r.clientHeight||o.clientHeight,f=0
d||(f+=11),c||(f+=11),"undefined"!=typeof p&&"undefined"!=typeof d&&"undefined"!=typeof c&&(null===VisualJS.fixed?(VisualJS.bwidth=s.innerWidth||r.clientWidth||o.clientWidth,VisualJS.width=VisualJS.bwidth-e.padding.w,VisualJS.height=p-e.padding.h-d-c+f):(VisualJS.bwidth=r.clientWidth||o.clientWidth,VisualJS.width=VisualJS.fixed[0]-e.padding.w,VisualJS.height=VisualJS.fixed[1]-e.padding.h-d-c+f)),VisualJS.visualsize=VisualJS.width<VisualJS.normal?e.mini:e.normal},atext:function(t){return String(t).replace(/&amp;/g,"&")},getHeading:function(t){if(VisualJS.autoheading===!1)return t.title
var e=[],a=function(t,a){"string"==typeof t&&""!==t&&(a===!0&&(t='<span class="'+VisualJS.setup.nowrapclass+'">'+t+"</span>"),e.push(t))}
if(null!==t.time&&"object"==typeof t.time)var i=VisualJS.tformat(t.time[0]),l=VisualJS.tformat(t.time[t.time.length-1]),s=i+"&ndash;"+l
else var s=VisualJS.tformat(t.time)
return a(t.title,!1),a(t.geo,!0),a(s,!0),VisualJS.atext(e.join(". "))},addJS:function(t,e){return e&&t.exists.call()?!1:(VisualJS.scripts.push(t.js),!0)},showTooltip:function(t,e,a){var i=document.getElementById(VisualJS.setup.tooltipid),l=VisualJS.bwidth-VisualJS.setup.margin,s={}
i.innerHTML=t,i.style.display="block"
var n=i.clientWidth/2
s.x=e-n,s.y=a-i.clientHeight-5,e+n>l?s.x-=e+n-l:s.x<VisualJS.setup.margin&&(s.x+=VisualJS.setup.margin-s.x),s.y<VisualJS.setup.margin&&(s.y+=1.75*i.clientHeight),i.style.left=s.x+"px",i.style.top=s.y+"px"},format:function(t){if("undefined"==typeof t||null===t)return VisualJS.setup.i18n.text.na[VisualJS.lang]
if("number"==typeof t){for(var e=t.toFixed(VisualJS.container[VisualJS.id].dec),a=/(\d+)(\d{3})/,i=e.split("."),l=i[0],s=i.length>1?VisualJS.setup.i18n.text.dec[VisualJS.lang]+i[1]:"";a.test(l);)l=l.replace(a,"$1"+VisualJS.setup.i18n.text.k[VisualJS.lang]+"$2")
return l+s}return""},tformat:function(t){if(!t)return null
if(isNaN(t))return t
switch(t.length){case 5:var e="quarter"
break
case 6:var e="month"
break
default:return t}var a=VisualJS.setup.i18n.text[e]
if("undefined"==typeof a)return t
var i=a[VisualJS.lang]
if("undefined"==typeof i)return t
var l=i[t.slice(4)-1]
return"undefined"==typeof l?t:l+" <span>"+t.slice(0,4)+"</span>"},tooltipText:function(t,e,a){var i="number"==typeof a?" "+VisualJS.container[t].unit.label:"",l="number"==typeof a?VisualJS.container[t].unit.symbol:"",s=VisualJS.format(a),n=s!==VisualJS.setup.i18n.text.na[VisualJS.lang]?"end"===VisualJS.container[t].unit.position?s+i+" "+l:l+s+i:s
return e?"<strong>"+n+"</strong> "+e:n},iframe:function(t,e){var a=VisualJS.setup,i="string"==typeof t.clas?t.clas:a.clas,l="<html><head>",s=a.func.old("ie9"),n=function(){var e=document,a=e.createElement("iframe"),i=e.getElementById(t.id)
return a.frameBorder="0",a.scrolling="no",i.parentNode.insertBefore(a,i.nextSibling),a},r=function(t,e){if("undefined"!=typeof t){var a
t.contentDocument?a=t.contentDocument:t.contentWindow?a=t.contentWindow.document:window.frames[t.name]&&(a=window.frames[t.name].document),a&&(a.open(),a.write(e),a.close())}}
"string"==typeof e&&(l+=-1===e.indexOf("{")?'<link href="'+e+'" rel="stylesheet" type="text/css"/>':'<style type="text/css">'+e+"</style>"),l+='<script type="text/javascript" src="'+VisualJS.setup.main.visual+'"></script>',l+='<script type="text/javascript" src="'+VisualJS.setup.main.setup+'"></script>',l+='<script type="text/javascript" src="'+VisualJS.setup.main.lazy+'"></script>',l+='</head><body><div id="'+t.id+'" class="'+i+'"></div><script>window.setTimeout(function(){VisualJS.old='+s+"; visual("+JSON.stringify(t)+");},1);</script></body></html>",r(n(),l)},compare:function(t){var e=VisualJS.setup,a=VisualJS.setup.separator,i="string"==typeof t.id?t.id:e.id,l="[object Array]"===Object.prototype.toString.call(t.css)?0===t.css.length?["",""]:1===t.css.length?[t.css[0],t.css[0]]:t.css:[t.css,t.css],s=document,n=s.createElement(e.html.heading),r=s.createElement(e.html.footer),o=s.getElementById(i),u=s.createElement("div"),d=s.createElement("style"),c=function(){VisualJS.getsize(i)
var l=VisualJS.height+("string"==typeof t.footer&&""!==t.footer?14:0),s=VisualJS.width+e.margin,n="iframe{ float: left; width: "+Math.floor((s-a)/2-e.margin)+"px; height:"+l+"px; }"
d.styleSheet?d.styleSheet.cssText=n:d.innerHTML=n,u.style.height=l+"px"}
n.innerHTML="string"==typeof t.title?t.title:"",r.innerHTML="string"==typeof t.footer?t.footer:"",r.style.clear="both",o.appendChild(n),o.appendChild(r),s.getElementsByTagName("head")[0].appendChild(d),u.style.width=a+"px","styleFloat"in u.style?u.style.styleFloat="left":u.style.cssFloat="left"
for(var p=0;2>p;p++){var f=s.createElement("span")
"string"!=typeof t.load[p].id&&(t.load[p].id=e.compareids[p]),f.id=t.load[p].id,o.insertBefore(f,r),VisualJS.iframe(t.load[p],l[p])}o.insertBefore(u,f),c(),"undefined"!=typeof window.onorientationchange?window.onorientationchange=c:window.onresize=c},load:function(t){if("undefined"==typeof VisualJS.setup&&window.alert("Visual: Setup not found (visual.setup.js)!"),"[object Array]"!==Object.prototype.toString.call(t))VisualJS.get(t)
else for(var e=0,a=t.length;a>e;e++)VisualJS.get(t[e])},get:function(t){var e=VisualJS.setup,a=e.html,i=e.canvas,l=a.heading,s=a.footer,n=VisualJS.old||e.func.old("ie9"),r=function(t){return"undefined"!=typeof t&&"[object Array]"===Object.prototype.toString.call(t)&&2===t.length&&"number"==typeof t[0]&&"number"==typeof t[1]&&t[0]<t[1]?!0:!1}
VisualJS.id="string"==typeof t.id?t.id:e.id,"object"==typeof t.fixed&&(VisualJS.fixed=t.fixed),VisualJS.container[VisualJS.id]="object"==typeof t.unit&&null!==t.unit?{unit:{label:"string"==typeof t.unit.label?t.unit.label:i.unit.label,symbol:"string"==typeof t.unit.symbol?t.unit.symbol:i.unit.symbol,position:"string"==typeof t.unit.position?t.unit.position:i.unit.position}}:{unit:i.unit},VisualJS.container[VisualJS.id].dec="number"==typeof t.dec?t.dec:i.dec,VisualJS.show="boolean"==typeof t.show?t.show:VisualJS.show,VisualJS.autoheading="boolean"==typeof t.autoheading?t.autoheading:i.autoheading,VisualJS.legend="boolean"==typeof t.legend?t.legend:i.legend,VisualJS.lang=t.lang||e.i18n.lang,VisualJS.callback="function"==typeof t.callback?t.callback:VisualJS.callback,VisualJS.grid="object"==typeof t.grid?{width:"number"==typeof t.grid.width?t.grid.width:i.grid.width}:i.grid,VisualJS.axis="object"==typeof t.axis?{x:"boolean"==typeof t.axis.x?t.axis.x:i.axis.x,y:"boolean"==typeof t.axis.y?t.axis.y:i.axis.y}:i.axis
var o="#"+VisualJS.id,u=o+" ."+e.canvasclass
if("cmap"===t.type)if(n)document.getElementById(VisualJS.id).innerHTML="<p>"+e.i18n.text.oldbrowser[VisualJS.lang]+"</p>"
else{if("string"!=typeof t.by)return
VisualJS.addJS(e.lib.maps,!0),VisualJS.addJS(e.lib.d3,!0),VisualJS.addJS(e.map[t.by],!0),VisualJS.chart=function(){var a=VisualJS.map[t.by],n=a.area[0],u=a.area[1],d="object"==typeof t.grouped&&"object"==typeof t.grouped.label&&t.grouped.label.length>0&&t.data[0].hasOwnProperty("group"),c=t.data[0].hasOwnProperty("val"),p=d?t.grouped.label.length:c?e.colors.map.max:1,f=e.colorclassprefix,g=VisualJS.func.colors(e.colors.map.base,p,"fill",f,d&&"object"==typeof t.grouped.color&&t.grouped.color.length===t.grouped.label.length?t.grouped.color:[],VisualJS.id),h=d3.select(o),S=d3.geo[a.projection](),J="object"==typeof a.center&&"function"==typeof S.center?S.center(a.center):S,y=J.scale(a.scale).translate([n/2,u/2]),V=d3.geo.path().projection(y),m=d3.select("#"+e.tooltipid)
VisualJS.canvas=function(){h.html("<"+l+"></"+l+"><"+s+"></"+s+">"),d3.select(o+" "+l).html(VisualJS.getHeading(t)),d3.select(o+" "+s).html(VisualJS.atext(t.footer||"")),VisualJS.getsize(VisualJS.id)
var S,J,y,b,x,v=VisualJS.id,w=d3.map(),k=[],j=function(){},T=function(){},E="number"==typeof t.filter?t.filter:i.filter,H=1-E,M=VisualJS.height/u,W=VisualJS.width/n,z=Math.min(Math.round(n*M),VisualJS.width),B=Math.min(Math.round(u*W),VisualJS.height),$=Math.floor((VisualJS.width-z)/2),I=Math.floor((VisualJS.height-B)/2),q=W>M?M:W,L=h.insert("svg:svg",s).attr("width",z).attr("height",B)
d?(S=d3.map(),j=function(t,e){t.set(e.id,e.group)},J=function(t,e,i){return f+(t.get(i[a.id])-1)},y=function(e,i){var l=t.grouped.label[e.get(i[a.id])-1],s=i[a.label]
return"undefined"!=typeof l&&(s+=" <em>"+l+"</em>"),s}):(c?(J=function(t,e,i,l,s){var n=e.get(i[a.id])
if(l===s)return"undefined"!=typeof n?f+(p/2).toFixed(0):null
var r=d3.scale.quantize().domain([l,s]).range(d3.range(p).map(function(t){return f+t}))
return r(n)},T=VisualJS.func.legend):J=function(t,e,i){return""!==e.get(i[a.id])?"":f+(p-1)},y=function(t,e){return e[a.label]})
for(var F=0,A=t.data,N=A.length;N>F;F++){var O=A[F]
O.hasOwnProperty("val")?null!==O.val&&(w.set(O.id,O.val),k.push(O.val)):w.set(O.id,""),j(S,O)}k.sort(function(t,e){return t-e})
var C=k[0],P=k[N-1]
r(t.filter)?(b=t.filter[0],x=t.filter[1]):(b=d3.quantile(k,E),x=d3.quantile(k,H)),L.style("margin-left",$+"px"),L.style("margin-top",I+"px"),L.style("margin-bottom",I+"px"),L.append("svg:g").attr("class",e.areaclass).attr("transform","scale("+q+")").selectAll("path").data(a.features).enter().append("svg:path").attr("class",function(t){return J(S,w,t.properties,b,x)}).attr("d",V).on("mousemove",function(t){(c||d||"undefined"!=typeof w.get(t.properties[a.id]))&&VisualJS.showTooltip(VisualJS.tooltipText(v,y(S,t.properties),w.get(t.properties[a.id])),d3.event.pageX,d3.event.pageY)}).on("mouseout",function(){return m.style("display","none")}),VisualJS.legend&&"object"==typeof a.legend&&T([VisualJS.tooltipText(v,null,b),VisualJS.tooltipText(v,null,x)],[g[g.length-1],g[0]],L,m,a.area,a.legend,[C>b||VisualJS.format(b)===VisualJS.format(C),x>P||VisualJS.format(x)===VisualJS.format(P)])},VisualJS.canvas()}}else{if(VisualJS.addJS(e.lib.jquery,!0)){var d=!1
VisualJS.addJS(e.lib.jquery.flot,!1)}else if(VisualJS.addJS(e.lib.jquery.flot,!0))var d=!1
else var d=!0
n&&VisualJS.addJS(e.lib.excanvas,!0)
var c=function(){},p=[],f=[],g=[],h=t.stacked||!1,S=function(){var a=function(){}
if(h)VisualJS.addJS(e.lib.jquery.flot.stack,d)
else if("tsbar"===t.type){VisualJS.addJS(e.lib.jquery.flot.orderbars,d)
var a=function(t){return t.bars}}return c=function(e,i){for(var l=0,s=i.length;s>l;l++)f.push([l,i[l]]),VisualJS.ticks.push([l,i[l]])
for(var l=0,s=e.length;s>l;l++){for(var n=[],r=e[l].val,o=r.length,u=0;o>u;u++)n.push([u,r[u]])
"tsbar"!==t.type||h||1===s?p.push({label:e[l].label,data:n}):p.push({label:e[l].label,data:n,bars:{show:!0,barWidth:.2,order:l+1,lineWidth:2}})}for(var l=0,d=p.length;d>l;l++)g.push({data:p[l].data,label:p[l].label,bars:a(p[l]),shadowSize:4})
y=d>1},VisualJS.getHeading(t)}
switch(t.type){case"pyram":VisualJS.addJS(e.lib.jquery.flot.pyramid,d),Array.max=function(t){return Math.max.apply(Math,t)}
var J,c=function(t,e,a){J=Math.max(Array.max(t[0].val),Array.max(t[1].val)),p[0]={label:t[0].label,data:[],pyramid:{direction:"L"}},p[1]={label:t[1].label,data:[]}
for(var i=0,l=a.length;l>i;i++)p[0].data[i]=[a[i],t[0].val[i]],p[1].data[i]=[a[i],t[1].val[i]]},y=!0,V=!1,h=!1,m=!1,b=!1,x=!1,v=VisualJS.getHeading(t)
break
case"rank":var w=[],c=function(t){for(var e=0,a=t.length;a>e;e++)f[e]=[e,t[a-e-1][0]],w[e]=[t[a-e-1][1],e]
p={data:w}},y=!1,V=!1,m=!1,b=!1,x=!0,v=VisualJS.getHeading(t)
break
case"bar":VisualJS.addJS(e.lib.jquery.flot.categories,d)
var c=function(t,e,a){if("object"!=typeof a||null===a)p=t
else if("number"==typeof t[0])for(var i=0,l=a.length;l>i;i++)p[i]=[a[i],t[i]]
y=p.length>1},V=!0,m=!1,b=!1,x=!0,v=VisualJS.getHeading(t)
break
case"tsline":var v=S(),V=null,m=!0,b=!0,x=!1
break
case"tsbar":var v=S(),V=!0,m=!1,b=!1,x=!0}VisualJS.chart=function(){c(t.data,t.time,t.by),$.fn.UseTooltip=function(a){var i=[]
$(this).bind("plothover",function(l,s,n){if(n){if(i!=[n.seriesIndex,n.dataIndex]){i=[n.seriesIndex,n.dataIndex]
var r=n.datapoint[0],o=n.datapoint[1],u="bar"!==t.type?n.series.label:p[r][0],d="rank"!==t.type?u:f[o][1],c="rank"!==t.type&&"bar"!==t.type?h||1===p.length?f[r][1]:"pyram"===t.type?p[s.x<0?0:1].data[n.dataIndex][0]:f[n.dataIndex][1]:!1,g="pyram"===t.type?Math.abs(r):"rank"!==t.type?"tsbar"!==t.type?o:h||1===p.length?p[n.seriesIndex].data[r][1]:o:r
VisualJS.showTooltip(VisualJS.tooltipText(a,c?d+" ("+c+")":d,g),s.pageX,s.pageY)}}else $("#"+e.tooltipid).hide(),i=[]})},y=VisualJS.legend&&y
var a={colors:e.colors.series,series:{stack:V,bars:{show:x,barWidth:.7,align:"center",fill:.9},lines:{show:m},points:{show:b,radius:1}},legend:{show:y},grid:{borderWidth:VisualJS.grid.width,hoverable:!0,clickable:!1,mouseActiveRadius:10},xaxis:{show:VisualJS.axis.x},yaxis:{show:VisualJS.axis.y}}
VisualJS.canvas=function(){$(o).html("<"+l+"></"+l+"><"+s+"></"+s+">"),$(o+" "+l).html(v),$(o+" "+s).html(VisualJS.atext(t.footer||"")),VisualJS.getsize(VisualJS.id),$(o+" "+l).after('<div class="'+e.canvasclass+" "+VisualJS.visualsize+'" style="width: '+VisualJS.width+"px; height: "+VisualJS.height+'px;"></div>')
var i=f.length
switch(t.type){case"pyram":a.series.pyramid={show:!0,barWidth:1},a.xaxis.max=1.02*J,a.xaxis.tickFormatter=function(t){return VisualJS.format(t)},$.plot(u,p,a)
break
case"rank":a.series.bars.horizontal=!0,a.yaxis.ticks=VisualJS.height/i>11?f.slice(0):0,a.xaxis.max=1.02*t.data[0][1],a.xaxis.tickFormatter=function(t){return VisualJS.format(t)},a.yaxis.autoscaleMargin=0,a.series.bars.barWidth=.5,$.plot(u,[p],a)
break
case"bar":a.xaxis.mode="categories",a.xaxis.tickLength=0,a.yaxis.tickFormatter=function(t){return VisualJS.format(t)},r(t.range)&&(a.yaxis.min=t.range[0],a.yaxis.max=t.range[1]),$.plot(u,[p],a)
break
case"tsline":a.grid.markings=[{color:"#999",lineWidth:1,yaxis:{from:0,to:0}}]
case"tsbar":a.yaxis.tickFormatter=function(t){return VisualJS.format(t)}
var n=VisualJS.width/i,d=[],c="01"
switch(r(t.range)&&(a.yaxis.min=t.range[0],a.yaxis.max=t.range[1]),VisualJS.ticks[0][1].length){case 4:if(30>n){for(var h=n>15?2:n>8?3:4,S=0;i>S;S++)d[S]=S%h?[f[S][0],""]:[f[S][0],f[S][1]]
a.xaxis.ticks=d}else a.xaxis.ticks=f
break
case 5:c="1"
case 6:if(35>n){for(var S=0;i>S;S++)d[S]=VisualJS.ticks[S][1].slice(4)!==c?[VisualJS.ticks[S][0],""]:[VisualJS.ticks[S][0],VisualJS.ticks[S][1].slice(0,4)],f[S][1]=VisualJS.tformat(VisualJS.ticks[S][1])
a.xaxis.ticks=d}else{for(var S=0;i>S;S++)f[S][1]=VisualJS.tformat(VisualJS.ticks[S][1])
a.xaxis.ticks=f}break
default:a.xaxis.ticks=f}$.plot(u,g,a)}$(u).UseTooltip(VisualJS.id)},VisualJS.canvas()}}VisualJS.scripts.length&&"object"==typeof LazyLoad?LazyLoad.js(VisualJS.scripts,VisualJS.draw):VisualJS.draw()}}
if("function"!=typeof visual)var visual=VisualJS.load