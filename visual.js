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
var VisualJS={version:"0.8.7",show:!0,old:!1,fixed:null,width:500,bwidth:500,height:500,normal:500,scripts:[],ticks:[],map:{},container:{},func:{},callback:null,draw:function(){var e=!1
"function"==typeof VisualJS.chart&&(VisualJS.tooltip(),VisualJS.show&&VisualJS.chart(),"undefined"!=typeof window.onorientationchange?window.onorientationchange=VisualJS.canvas:window.onresize=VisualJS.canvas,e=!0),null!==VisualJS.callback&&VisualJS.callback.call({id:VisualJS.id,chart:e})},tooltip:function(){var e=document
if(!e.getElementById(VisualJS.setup.tooltipid)){var t=e.createElement("div")
t.id=VisualJS.setup.tooltipid,t.style.display="none",e.body.appendChild(t)}},getsize:function(e){var t=VisualJS.setup,a=t.html,i=a.heading,l=a.footer,s=window,n=document,r=n.documentElement,o=n.getElementsByTagName("body")[0],u=n.getElementById(e),d=u.getElementsByTagName(i)[0].clientHeight,c=u.getElementsByTagName(l)[0].clientHeight,p=s.innerHeight||r.clientHeight||o.clientHeight,f=0
d||(f+=11),c||(f+=11),"undefined"!=typeof p&&"undefined"!=typeof d&&"undefined"!=typeof c&&(null===VisualJS.fixed?(VisualJS.bwidth=s.innerWidth||r.clientWidth||o.clientWidth,VisualJS.width=VisualJS.bwidth-t.padding.w,VisualJS.height=p-t.padding.h-d-c+f):(VisualJS.bwidth=r.clientWidth||o.clientWidth,VisualJS.width=VisualJS.fixed[0]-t.padding.w,VisualJS.height=VisualJS.fixed[1]-t.padding.h-d-c+f)),VisualJS.visualsize=VisualJS.width<VisualJS.normal?t.mini:t.normal},atext:function(e){return String(e).replace(/&amp;/g,"&")},getHeading:function(e){if(VisualJS.autoheading===!1)return e.title
var t=[],a=function(e,a){"string"==typeof e&&""!==e&&(a===!0&&(e='<span class="'+VisualJS.setup.nowrapclass+'">'+e+"</span>"),t.push(e))}
if(null!==e.time&&"object"==typeof e.time)var i=VisualJS.tformat(e.time[0]),l=VisualJS.tformat(e.time[e.time.length-1]),s=i+"&ndash;"+l
else var s=VisualJS.tformat(e.time)
return a(e.title,!1),a(e.geo,!0),a(s,!0),VisualJS.atext(t.join(". "))},addJS:function(e,t){return t&&e.exists.call()?!1:(VisualJS.scripts.push(e.js),!0)},showTooltip:function(e,t,a){var i=document.getElementById(VisualJS.setup.tooltipid),l=VisualJS.bwidth-VisualJS.setup.margin,s={}
i.innerHTML=e,i.style.display="block"
var n=i.clientWidth/2
s.x=t-n,s.y=a-i.clientHeight-5,t+n>l?s.x-=t+n-l:s.x<VisualJS.setup.margin&&(s.x+=VisualJS.setup.margin-s.x),s.y<VisualJS.setup.margin&&(s.y+=1.75*i.clientHeight),i.style.left=s.x+"px",i.style.top=s.y+"px"},format:function(e){if("undefined"==typeof e||null===e)return VisualJS.setup.i18n.text.na[VisualJS.lang]
if("number"==typeof e){for(var t=e.toFixed(VisualJS.container[VisualJS.id].dec),a=/(\d+)(\d{3})/,i=t.split("."),l=i[0],s=i.length>1?VisualJS.setup.i18n.text.dec[VisualJS.lang]+i[1]:"";a.test(l);)l=l.replace(a,"$1"+VisualJS.setup.i18n.text.k[VisualJS.lang]+"$2")
return l+s}return""},tformat:function(e){if(!e)return null
if(isNaN(e))return e
switch(e.length){case 5:var t="quarter"
break
case 6:var t="month"
break
default:return e}var a=VisualJS.setup.i18n.text[t]
if("undefined"==typeof a)return e
var i=a[VisualJS.lang]
if("undefined"==typeof i)return e
var l=i[e.slice(4)-1]
return"undefined"==typeof l?e:l+" <span>"+e.slice(0,4)+"</span>"},tooltipText:function(e,t,a){var i="number"==typeof a?" "+VisualJS.container[e].unit.label:"",l="number"==typeof a?VisualJS.container[e].unit.symbol:"",s=VisualJS.format(a),n=s!==VisualJS.setup.i18n.text.na[VisualJS.lang]?"end"===VisualJS.container[e].unit.position?s+i+" "+l:l+s+i:s
return t?"<strong>"+n+"</strong> "+t:n},iframe:function(e,t){var a=VisualJS.setup,i="string"==typeof e.clas?e.clas:a.clas,l='<!DOCTYPE html>\n<!--[if lt IE 7]><html class="lt-ie9 lt-ie8 lt-ie7"> <![endif]-->\n<!--[if IE 7]><html class="lt-ie9 lt-ie8"> <![endif]-->\n<!--[if IE 8]><html class="lt-ie9"> <![endif]-->\n<!--[if gt IE 8]><!--> <html> <!--<![endif]-->\n<head>',s=function(){var t=document,a=t.createElement("iframe"),i=t.getElementById(e.id)
return a.frameBorder="0",a.scrolling="no",i.parentNode.insertBefore(a,i.nextSibling),a},n=function(e,t){if("undefined"!=typeof e){var a
e.contentDocument?a=e.contentDocument:e.contentWindow?a=e.contentWindow.document:window.frames[e.name]&&(a=window.frames[e.name].document),a&&(a.open(),a.write(t),a.close())}}
"string"==typeof t&&(l+=-1===t.indexOf("{")?'<link href="'+t+'" rel="stylesheet" type="text/css"/>':'<style type="text/css">'+t+"</style>"),l+='<script type="text/javascript" src="'+VisualJS.setup.main.visual+'"></script>',l+='<script type="text/javascript" src="'+VisualJS.setup.main.setup+'"></script>',l+='<script type="text/javascript" src="'+VisualJS.setup.main.lazy+'"></script>',l+='</head><body><div id="'+e.id+'" class="'+i+'"></div><script>window.setTimeout(function(){visual('+JSON.stringify(e)+");},1);</script></body></html>",n(s(),l)},compare:function(e){var t=VisualJS.setup,a=VisualJS.setup.separator,i="string"==typeof e.id?e.id:t.id,l="[object Array]"===Object.prototype.toString.call(e.css)?0===e.css.length?["",""]:1===e.css.length?[e.css[0],e.css[0]]:e.css:[e.css,e.css],s=document,n=s.createElement(t.html.heading),r=s.createElement(t.html.footer),o=s.getElementById(i),u=s.createElement("div"),d=s.createElement("style"),c=function(){VisualJS.getsize(i)
var l=VisualJS.height+("string"==typeof e.footer&&""!==e.footer?14:0),s=VisualJS.width+t.margin,n="iframe{ float: left; width: "+Math.floor((s-a)/2-t.margin)+"px; height:"+l+"px; }"
d.styleSheet?d.styleSheet.cssText=n:d.innerHTML=n,u.style.height=l+"px"}
n.innerHTML="string"==typeof e.title?e.title:"",r.innerHTML="string"==typeof e.footer?e.footer:"",r.style.clear="both",o.appendChild(n),o.appendChild(r),s.getElementsByTagName("head")[0].appendChild(d),u.style.width=a+"px","styleFloat"in u.style?u.style.styleFloat="left":u.style.cssFloat="left"
for(var p=0;2>p;p++){var f=s.createElement("span")
"string"!=typeof e.load[p].id&&(e.load[p].id=t.compareids[p]),f.id=e.load[p].id,o.insertBefore(f,r),VisualJS.iframe(e.load[p],l[p])}o.insertBefore(u,f),c(),"undefined"!=typeof window.onorientationchange?window.onorientationchange=c:window.onresize=c},load:function(e){if("undefined"==typeof VisualJS.setup&&window.alert("Visual: Setup not found (visual.setup.js)!"),"[object Array]"!==Object.prototype.toString.call(e))VisualJS.get(e)
else for(var t=0,a=e.length;a>t;t++)VisualJS.get(e[t])},get:function(e){var t=VisualJS.setup,a=t.html,i=t.canvas,l=a.heading,s=a.footer,n=VisualJS.old||t.func.old("ie9"),r=function(e){return"undefined"!=typeof e&&"[object Array]"===Object.prototype.toString.call(e)&&2===e.length&&"number"==typeof e[0]&&"number"==typeof e[1]&&e[0]<e[1]?!0:!1}
VisualJS.id="string"==typeof e.id?e.id:t.id,"object"==typeof e.fixed&&(VisualJS.fixed=e.fixed),VisualJS.container[VisualJS.id]="object"==typeof e.unit&&null!==e.unit?{unit:{label:"string"==typeof e.unit.label?e.unit.label:i.unit.label,symbol:"string"==typeof e.unit.symbol?e.unit.symbol:i.unit.symbol,position:"string"==typeof e.unit.position?e.unit.position:i.unit.position}}:{unit:i.unit},VisualJS.container[VisualJS.id].dec="number"==typeof e.dec?e.dec:i.dec,VisualJS.show="boolean"==typeof e.show?e.show:VisualJS.show,VisualJS.autoheading="boolean"==typeof e.autoheading?e.autoheading:i.autoheading,VisualJS.legend="boolean"==typeof e.legend?e.legend:i.legend,VisualJS.lang=e.lang||t.i18n.lang,VisualJS.callback="function"==typeof e.callback?e.callback:VisualJS.callback,VisualJS.grid="object"==typeof e.grid?{width:"number"==typeof e.grid.width?e.grid.width:i.grid.width}:i.grid,VisualJS.axis="object"==typeof e.axis?{x:"boolean"==typeof e.axis.x?e.axis.x:i.axis.x,y:"boolean"==typeof e.axis.y?e.axis.y:i.axis.y}:i.axis
var o="#"+VisualJS.id,u=o+" ."+t.canvasclass
if("cmap"===e.type)if(n)document.getElementById(VisualJS.id).innerHTML="<p>"+t.i18n.text.oldbrowser[VisualJS.lang]+"</p>"
else{if("string"!=typeof e.by)return
VisualJS.addJS(t.lib.maps,!0),VisualJS.addJS(t.lib.d3,!0),VisualJS.addJS(t.map[e.by],!0),VisualJS.chart=function(){var a=VisualJS.map[e.by],n=a.area[0],u=a.area[1],d="object"==typeof e.grouped&&"object"==typeof e.grouped.label&&e.grouped.label.length>0&&e.data[0].hasOwnProperty("group"),c=e.data[0].hasOwnProperty("val"),p=d?e.grouped.label.length:c?t.colors.map.max:1,f=t.colorclassprefix,g=VisualJS.func.colors(t.colors.map.base,p,"fill",f,d&&"object"==typeof e.grouped.color&&e.grouped.color.length===e.grouped.label.length?e.grouped.color:[],VisualJS.id),h=d3.select(o),S=d3.geo[a.projection](),J="object"==typeof a.center&&"function"==typeof S.center?S.center(a.center):S,y=J.scale(a.scale).translate([n/2,u/2]),V=d3.geo.path().projection(y),m=d3.select("#"+t.tooltipid)
VisualJS.canvas=function(){h.html("<"+l+"></"+l+"><"+s+"></"+s+">"),d3.select(o+" "+l).html(VisualJS.getHeading(e)),d3.select(o+" "+s).html(VisualJS.atext(e.footer||"")),VisualJS.getsize(VisualJS.id)
var S,J,y,b,x,v=VisualJS.id,w=d3.map(),k=[],j=function(){},E=function(){},T="number"==typeof e.filter?e.filter:i.filter,H=1-T,I=VisualJS.height/u,M=VisualJS.width/n,W=Math.min(Math.round(n*I),VisualJS.width),z=Math.min(Math.round(u*M),VisualJS.height),B=Math.floor((VisualJS.width-W)/2),$=Math.floor((VisualJS.height-z)/2),q=M>I?I:M,L=h.insert("svg:svg",s).attr("width",W).attr("height",z)
d?(S=d3.map(),j=function(e,t){e.set(t.id,t.group)},J=function(e,t,i){return f+(e.get(i[a.id])-1)},y=function(t,i){var l=e.grouped.label[t.get(i[a.id])-1],s=i[a.label]
return"undefined"!=typeof l&&(s+=" <em>"+l+"</em>"),s}):(c?(J=function(e,t,i,l,s){var n=t.get(i[a.id])
if(l===s)return"undefined"!=typeof n?f+(p/2).toFixed(0):null
var r=d3.scale.quantize().domain([l,s]).range(d3.range(p).map(function(e){return f+e}))
return r(n)},E=VisualJS.func.legend):J=function(e,t,i){return""!==t.get(i[a.id])?"":f+(p-1)},y=function(e,t){return t[a.label]})
for(var F=0,O=e.data,A=O.length;A>F;F++){var N=O[F]
N.hasOwnProperty("val")?null!==N.val&&(w.set(N.id,N.val),k.push(N.val)):w.set(N.id,""),j(S,N)}k.sort(function(e,t){return e-t})
var C=k[0],P=k[A-1]
r(e.filter)?(b=e.filter[0],x=e.filter[1]):(b=d3.quantile(k,T),x=d3.quantile(k,H)),L.style("margin-left",B+"px"),L.style("margin-top",$+"px"),L.style("margin-bottom",$+"px"),L.append("svg:g").attr("class",t.areaclass).attr("transform","scale("+q+")").selectAll("path").data(a.features).enter().append("svg:path").attr("class",function(e){return J(S,w,e.properties,b,x)}).attr("d",V).on("mousemove",function(e){(c||d||"undefined"!=typeof w.get(e.properties[a.id]))&&VisualJS.showTooltip(VisualJS.tooltipText(v,y(S,e.properties),w.get(e.properties[a.id])),d3.event.pageX,d3.event.pageY)}).on("mouseout",function(){return m.style("display","none")}),VisualJS.legend&&"object"==typeof a.legend&&E([VisualJS.tooltipText(v,null,b),VisualJS.tooltipText(v,null,x)],[g[g.length-1],g[0]],L,m,a.area,a.legend,[C>b||VisualJS.format(b)===VisualJS.format(C),x>P||VisualJS.format(x)===VisualJS.format(P)])},VisualJS.canvas()}}else{if(VisualJS.addJS(t.lib.jquery,!0)){var d=!1
VisualJS.addJS(t.lib.jquery.flot,!1)}else if(VisualJS.addJS(t.lib.jquery.flot,!0))var d=!1
else var d=!0
n&&VisualJS.addJS(t.lib.excanvas,!0)
var c=function(){},p=[],f=[],g=[],h=e.stacked||!1,S=function(){var a=function(){}
if(h)VisualJS.addJS(t.lib.jquery.flot.stack,d)
else if("tsbar"===e.type){VisualJS.addJS(t.lib.jquery.flot.orderbars,d)
var a=function(e){return e.bars}}return c=function(t,i){for(var l=0,s=i.length;s>l;l++)f.push([l,i[l]]),VisualJS.ticks.push([l,i[l]])
for(var l=0,s=t.length;s>l;l++){for(var n=[],r=t[l].val,o=r.length,u=0;o>u;u++)n.push([u,r[u]])
"tsbar"!==e.type||h||1===s?p.push({label:t[l].label,data:n}):p.push({label:t[l].label,data:n,bars:{show:!0,barWidth:.2,order:l+1,lineWidth:2}})}for(var l=0,d=p.length;d>l;l++)g.push({data:p[l].data,label:p[l].label,bars:a(p[l]),shadowSize:4})
y=d>1},VisualJS.getHeading(e)}
switch(e.type){case"pyram":VisualJS.addJS(t.lib.jquery.flot.pyramid,d),Array.max=function(e){return Math.max.apply(Math,e)}
var J,c=function(e,t,a){J=Math.max(Array.max(e[0].val),Array.max(e[1].val)),p[0]={label:e[0].label,data:[],pyramid:{direction:"L"}},p[1]={label:e[1].label,data:[]}
for(var i=0,l=a.length;l>i;i++)p[0].data[i]=[a[i],e[0].val[i]],p[1].data[i]=[a[i],e[1].val[i]]},y=!0,V=!1,h=!1,m=!1,b=!1,x=!1,v=VisualJS.getHeading(e)
break
case"rank":var w=[],c=function(e){for(var t=0,a=e.length;a>t;t++)f[t]=[t,e[a-t-1][0]],w[t]=[e[a-t-1][1],t]
p={data:w}},y=!1,V=!1,m=!1,b=!1,x=!0,v=VisualJS.getHeading(e)
break
case"bar":VisualJS.addJS(t.lib.jquery.flot.categories,d)
var c=function(e,t,a){if("object"!=typeof a||null===a)p=e
else if("number"==typeof e[0])for(var i=0,l=a.length;l>i;i++)p[i]=[a[i],e[i]]
y=p.length>1},V=!0,m=!1,b=!1,x=!0,v=VisualJS.getHeading(e)
break
case"tsline":var v=S(),V=null,m=!0,b=!0,x=!1
break
case"tsbar":var v=S(),V=!0,m=!1,b=!1,x=!0}VisualJS.chart=function(){c(e.data,e.time,e.by),$.fn.UseTooltip=function(a){var i=[]
$(this).bind("plothover",function(l,s,n){if(n){if(i!=[n.seriesIndex,n.dataIndex]){i=[n.seriesIndex,n.dataIndex]
var r=n.datapoint[0],o=n.datapoint[1],u="bar"!==e.type?n.series.label:p[r][0],d="rank"!==e.type?u:f[o][1],c="rank"!==e.type&&"bar"!==e.type?h||1===p.length?f[r][1]:"pyram"===e.type?p[s.x<0?0:1].data[n.dataIndex][0]:f[n.dataIndex][1]:!1,g="pyram"===e.type?Math.abs(r):"rank"!==e.type?"tsbar"!==e.type?o:h||1===p.length?p[n.seriesIndex].data[r][1]:o:r
VisualJS.showTooltip(VisualJS.tooltipText(a,c?d+" ("+c+")":d,g),s.pageX,s.pageY)}}else $("#"+t.tooltipid).hide(),i=[]})},y=VisualJS.legend&&y
var a={colors:t.colors.series,series:{stack:V,bars:{show:x,barWidth:.7,align:"center",fill:.9},lines:{show:m},points:{show:b,radius:1}},legend:{show:y},grid:{borderWidth:VisualJS.grid.width,hoverable:!0,clickable:!1,mouseActiveRadius:10},xaxis:{show:VisualJS.axis.x},yaxis:{show:VisualJS.axis.y}}
VisualJS.canvas=function(){$(o).html("<"+l+"></"+l+"><"+s+"></"+s+">"),$(o+" "+l).html(v),$(o+" "+s).html(VisualJS.atext(e.footer||"")),VisualJS.getsize(VisualJS.id),$(o+" "+l).after('<div class="'+t.canvasclass+" "+VisualJS.visualsize+'" style="width: '+VisualJS.width+"px; height: "+VisualJS.height+'px;"></div>')
var i=f.length
switch(e.type){case"pyram":a.series.pyramid={show:!0,barWidth:1},a.yaxis.show=VisualJS.height/p[0].data.length>11?VisualJS.axis.y:!1,a.xaxis.max=r(e.range)?e.range[1]:1.02*J,a.xaxis.tickFormatter=function(e){return VisualJS.format(e)},$.plot(u,p,a)
break
case"rank":a.series.bars.horizontal=!0,a.yaxis.ticks=VisualJS.height/i>11?f.slice(0):0,r(e.range)?(a.xaxis.min=e.range[0],a.xaxis.max=e.range[1]):a.xaxis.max=1.02*e.data[0][1],a.xaxis.tickFormatter=function(e){return VisualJS.format(e)},a.yaxis.autoscaleMargin=0,a.series.bars.barWidth=.5,$.plot(u,[p],a)
break
case"bar":a.xaxis.mode="categories",a.xaxis.tickLength=0,a.yaxis.tickFormatter=function(e){return VisualJS.format(e)},r(e.range)&&(a.yaxis.min=e.range[0],a.yaxis.max=e.range[1]),$.plot(u,[p],a)
break
case"tsline":a.grid.markings=[{color:"#999",lineWidth:1,yaxis:{from:0,to:0}}]
case"tsbar":a.yaxis.tickFormatter=function(e){return VisualJS.format(e)}
var n=VisualJS.width/i,d=[],c="01"
switch(r(e.range)&&(a.yaxis.min=e.range[0],a.yaxis.max=e.range[1]),VisualJS.ticks[0][1].length){case 4:if(30>n){for(var h=n>15?2:n>8?3:4,S=0;i>S;S++)d[S]=S%h?[f[S][0],""]:[f[S][0],f[S][1]]
a.xaxis.ticks=d}else a.xaxis.ticks=f
break
case 5:c="1"
case 6:if(35>n){for(var S=0;i>S;S++)d[S]=VisualJS.ticks[S][1].slice(4)!==c?[VisualJS.ticks[S][0],""]:[VisualJS.ticks[S][0],VisualJS.ticks[S][1].slice(0,4)],f[S][1]=VisualJS.tformat(VisualJS.ticks[S][1])
a.xaxis.ticks=d}else{for(var S=0;i>S;S++)f[S][1]=VisualJS.tformat(VisualJS.ticks[S][1])
a.xaxis.ticks=f}break
default:a.xaxis.ticks=f}$.plot(u,g,a)}$(u).UseTooltip(VisualJS.id)},VisualJS.canvas()}}VisualJS.scripts.length&&"object"==typeof LazyLoad?LazyLoad.js(VisualJS.scripts,VisualJS.draw):VisualJS.draw()}}
if("function"!=typeof visual)var visual=VisualJS.load