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
var VisualJS={version:"0.9.7",show:!0,old:!1,fixed:null,width:500,bwidth:500,height:500,normal:500,scripts:[],map:{},container:{},"public":{},func:{},callback:null,draw:function(){var e=!1
"function"==typeof VisualJS.chart&&(VisualJS.tooltip(),VisualJS.show&&VisualJS.chart(),"undefined"!=typeof window.onorientationchange?window.onorientationchange=VisualJS.canvas:window.onresize=VisualJS.canvas,e=!0),null!==VisualJS.callback&&VisualJS.callback.call({id:VisualJS.id,chart:e}),VisualJS.public[VisualJS.id].chart=e},tooltip:function(){var e=document
if(!e.getElementById(VisualJS.setup.tooltipid)){var a=e.createElement("div")
a.id=VisualJS.setup.tooltipid,a.style.display="none",e.body.appendChild(a)}},getsize:function(e){var a=VisualJS.setup,t=a.html,i=t.heading,l=t.footer,n=window,s=document,r=s.documentElement,o=s.getElementsByTagName("body")[0],u=s.getElementById(e),d=u.getElementsByTagName(i)[0].clientHeight,c=u.getElementsByTagName(l)[0].clientHeight,p=n.innerHeight||r.clientHeight||o.clientHeight,f=0
d||(f+=11),c||(f+=11),"undefined"!=typeof p&&"undefined"!=typeof d&&"undefined"!=typeof c&&(null===VisualJS.fixed?(VisualJS.bwidth=n.innerWidth||r.clientWidth||o.clientWidth,VisualJS.width=VisualJS.bwidth-a.padding.w,VisualJS.height=p-a.padding.h-d-c+f):(VisualJS.bwidth=r.clientWidth||o.clientWidth,VisualJS.width=VisualJS.fixed[0]-a.padding.w,VisualJS.height=VisualJS.fixed[1]-a.padding.h-d-c+f)),VisualJS.visualsize=VisualJS.width<VisualJS.normal?a.mini:a.normal},atext:function(e){return String(e).replace(/&amp;/g,"&")},getHeading:function(e){if(VisualJS.autoheading===!1)return e.title
var a=[],t=function(e,t){"string"==typeof e&&""!==e&&(t===!0&&(e='<span class="'+VisualJS.setup.nowrapclass+'">'+e+"</span>"),a.push(e))}
if(null!==e.time&&"object"==typeof e.time)var i=VisualJS.tformat(e.time[0],VisualJS.id),l=VisualJS.tformat(e.time[e.time.length-1],VisualJS.id),n=i+"&ndash;"+l
else var n=VisualJS.tformat(e.time,VisualJS.id)
return t(e.title,!1),t(e.geo,!0),t(n,!0),VisualJS.atext(a.join(". "))},addJS:function(e,a){return a&&e.exists.call()?!1:(VisualJS.scripts.push(e.js),!0)},showTooltip:function(e,a,t){var i=document.getElementById(VisualJS.setup.tooltipid),l=VisualJS.bwidth-VisualJS.setup.margin,n={}
i.innerHTML=e,i.style.display="block"
var s=i.clientWidth/2
n.x=a-s,n.y=t-i.clientHeight-5,a+s>l?n.x-=a+s-l:n.x<VisualJS.setup.margin&&(n.x+=VisualJS.setup.margin-n.x),n.y<VisualJS.setup.margin&&(n.y+=1.75*i.clientHeight),i.style.left=n.x+"px",i.style.top=n.y+"px"},format:function(e,a){if("undefined"==typeof e||null===e)return VisualJS.setup.i18n.text.na[VisualJS.container[a].lang]
if("number"==typeof e){for(var t=e.toFixed(VisualJS.container[a].dec),i=/(\d+)(\d{3})/,l=t.split("."),n=l[0],s=l.length>1?VisualJS.setup.i18n.text.dec[VisualJS.container[a].lang]+l[1]:"";i.test(n);)n=n.replace(i,"$1"+VisualJS.setup.i18n.text.k[VisualJS.container[a].lang]+"$2")
return n+s}return""},tformat:function(e,a){if(!e)return null
if(isNaN(e))return e
switch(e.length){case 5:var t="quarter"
break
case 6:var t="month"
break
default:return e}var i=VisualJS.setup.i18n.text[t]
if("undefined"==typeof i)return e
var l=i[VisualJS.container[a].lang]
if("undefined"==typeof l)return e
var n=l[e.slice(4)-1]
return"undefined"==typeof n?e:n+" <span>"+e.slice(0,4)+"</span>"},tooltipText:function(e,a,t){var i="number"==typeof t?" "+VisualJS.container[e].unit.label:"",l="number"==typeof t?VisualJS.container[e].unit.symbol:"",n=VisualJS.format(t,e),s=n!==VisualJS.setup.i18n.text.na[VisualJS.container[e].lang]?"end"===VisualJS.container[e].unit.position?n+i+" "+l:l+n+i:n
return a?"<strong>"+s+"</strong> "+a:s},iframe:function(e,a){var t=VisualJS.setup,i="string"==typeof e.clas?e.clas:t.clas,l='<!DOCTYPE html>\n<!--[if lt IE 7]><html class="lt-ie9 lt-ie8 lt-ie7"> <![endif]-->\n<!--[if IE 7]><html class="lt-ie9 lt-ie8"> <![endif]-->\n<!--[if IE 8]><html class="lt-ie9"> <![endif]-->\n<!--[if gt IE 8]><!--> <html> <!--<![endif]-->\n<head>',n=function(){var a=document,t=a.createElement("iframe"),i=a.getElementById(e.id)
return t.frameBorder="0",t.scrolling="no",i.parentNode.insertBefore(t,i.nextSibling),t},s=function(e,a){if("undefined"!=typeof e){var t
e.contentDocument?t=e.contentDocument:e.contentWindow?t=e.contentWindow.document:window.frames[e.name]&&(t=window.frames[e.name].document),t&&(t.open(),t.write(a),t.close())}}
"string"==typeof a&&(l+=-1===a.indexOf("{")?'<link href="'+a+'" rel="stylesheet" type="text/css"/>':'<style type="text/css">'+a+"</style>"),l+='<script type="text/javascript" src="'+VisualJS.setup.main.visual+'"></script>',l+='<script type="text/javascript" src="'+VisualJS.setup.main.setup+'"></script>',l+='<script type="text/javascript" src="'+VisualJS.setup.main.lazy+'"></script>',l+='</head><body><div id="'+e.id+'" class="'+i+'"></div><script>window.setTimeout(function(){visual('+JSON.stringify(e)+");},1);</script></body></html>",s(n(),l)},compare:function(e){var a=VisualJS.setup,t=VisualJS.setup.separator,i="string"==typeof e.id?e.id:a.id,l="[object Array]"===Object.prototype.toString.call(e.css)?0===e.css.length?["",""]:1===e.css.length?[e.css[0],e.css[0]]:e.css:[e.css,e.css],n=document,s=n.createElement(a.html.heading),r=n.createElement(a.html.footer),o=n.getElementById(i),u=n.createElement("div"),d=n.createElement("style"),c=function(){VisualJS.getsize(i)
var l=VisualJS.height+("string"==typeof e.footer&&""!==e.footer?14:0),n=VisualJS.width+a.margin,s="iframe{ float: left; width: "+Math.floor((n-t)/2-a.margin)+"px; height:"+l+"px; }"
d.styleSheet?d.styleSheet.cssText=s:d.innerHTML=s,u.style.height=l+"px"}
s.innerHTML="string"==typeof e.title?e.title:"",r.innerHTML="string"==typeof e.footer?e.footer:"",r.style.clear="both",o.appendChild(s),o.appendChild(r),n.getElementsByTagName("head")[0].appendChild(d),u.style.width=t+"px","styleFloat"in u.style?u.style.styleFloat="left":u.style.cssFloat="left"
for(var p=0;2>p;p++){var f=n.createElement("span")
"string"!=typeof e.load[p].id&&(e.load[p].id=a.compareids[p]),f.id=e.load[p].id,o.insertBefore(f,r),VisualJS.iframe(e.load[p],l[p])}o.insertBefore(u,f),c(),"undefined"!=typeof window.onorientationchange?window.onorientationchange=c:window.onresize=c},load:function(e){if("undefined"==typeof VisualJS.setup&&window.alert("Visual: Setup not found (visual.setup.js)!"),"[object Array]"!==Object.prototype.toString.call(e))VisualJS.get(e)
else for(var a=0,t=e.length;t>a;a++)VisualJS.get(e[a])},get:function(e){var a=VisualJS.setup,t=a.html,i=a.canvas,l=t.heading,n=t.footer,s=VisualJS.old||a.func.old("ie9"),r=function(e){return"undefined"!=typeof e&&"[object Array]"===Object.prototype.toString.call(e)&&2===e.length&&"number"==typeof e[0]&&"number"==typeof e[1]&&e[0]<e[1]?!0:!1}
VisualJS.id="string"==typeof e.id?e.id:a.id,"object"==typeof e.fixed&&(VisualJS.fixed=e.fixed),VisualJS.container[VisualJS.id]="object"==typeof e.unit&&null!==e.unit?{unit:{label:"string"==typeof e.unit.label?e.unit.label:i.unit.label,symbol:"string"==typeof e.unit.symbol?e.unit.symbol:i.unit.symbol,position:"string"==typeof e.unit.position?e.unit.position:i.unit.position}}:{unit:i.unit},VisualJS.container[VisualJS.id].dec="number"==typeof e.dec?e.dec:i.dec,VisualJS.show="boolean"==typeof e.show?e.show:VisualJS.show,VisualJS.autoheading="boolean"==typeof e.autoheading?e.autoheading:i.autoheading,VisualJS.legend="boolean"==typeof e.legend?e.legend:i.legend,VisualJS.lang=e.lang||a.i18n.lang,VisualJS.container[VisualJS.id].lang=e.lang||a.i18n.lang,VisualJS.callback="function"==typeof e.callback?e.callback:VisualJS.callback,VisualJS.range="number"==typeof e.range||r(e.range)?e.range:i.range.hasOwnProperty(e.type)&&"number"==typeof i.range[e.type]?i.range[e.type]:null,VisualJS.grid="object"==typeof e.grid?{border:"number"==typeof e.grid.border?e.grid.border:i.grid.border,shadow:"number"==typeof e.grid.shadow?e.grid.shadow:i.grid.shadow,line:"number"==typeof e.grid.line?e.grid.line:i.grid.line,point:"number"==typeof e.grid.point?e.grid.point:i.grid.point}:i.grid,VisualJS.axis="object"==typeof e.axis?{x:"boolean"==typeof e.axis.x?e.axis.x:i.axis.x,y:"boolean"==typeof e.axis.y?e.axis.y:i.axis.y}:i.axis
var o="#"+VisualJS.id,u=o+" ."+a.canvasclass
if("cmap"===e.type)if(s)document.getElementById(VisualJS.id).innerHTML="<p>"+a.i18n.text.oldbrowser[VisualJS.container[VisualJS.id].lang]+"</p>"
else{if("string"!=typeof e.by)return
VisualJS.addJS(a.lib.maps,!0),VisualJS.addJS(a.lib.d3,!0),VisualJS.addJS(a.map[e.by],!0),VisualJS.chart=function(){var t=VisualJS.getHeading(e),i=VisualJS.map[e.by],s=i.area[0],r=i.area[1],u="object"==typeof e.grouped&&"object"==typeof e.grouped.label&&e.grouped.label.length>0&&e.data[0].hasOwnProperty("group"),d=e.data[0].hasOwnProperty("val"),c=u?e.grouped.label.length:d?a.colors.map.max:1,p=a.colorclassprefix,f=VisualJS.func.colors(a.colors.map.base,c,"fill",p,u&&"object"==typeof e.grouped.color&&e.grouped.color.length===e.grouped.label.length?e.grouped.color:[],VisualJS.id),g=d3.select(o),S=d3.geo[i.projection](),J="object"==typeof i.center&&"function"==typeof S.center?S.center(i.center):S,h=J.scale(i.scale).translate([s/2,r/2]),V=d3.geo.path().projection(h),y=d3.select("#"+a.tooltipid)
VisualJS.canvas=function(){g.html("<"+l+"></"+l+"><"+n+"></"+n+">"),d3.select(o+" "+l).html(t),d3.select(o+" "+n).html(VisualJS.atext(e.footer||"")),VisualJS.getsize(VisualJS.id)
var S,J,h,m,b,x=VisualJS.id,v=d3.map(),w=[],k=function(){},j=function(){},E=VisualJS.height/r,T=VisualJS.width/s,H=Math.min(Math.round(s*E),VisualJS.width),I=Math.min(Math.round(r*T),VisualJS.height),M=Math.floor((VisualJS.width-H)/2),W=Math.floor((VisualJS.height-I)/2),z=T>E?E:T,B=g.insert("svg:svg",n).attr("width",H).attr("height",I)
u?(S=d3.map(),k=function(e,a){e.set(a.id,a.group)},J=function(e,a,t){return p+(e.get(t[i.id])-1)},h=function(a,t){var l=e.grouped.label[a.get(t[i.id])-1],n=t[i.label]
return"undefined"!=typeof l&&(n+=" <em>"+l+"</em>"),n}):(d?(J=function(e,a,t,l,n){var s=a.get(t[i.id])
if(l===n)return"undefined"!=typeof s?p+(c/2).toFixed(0):null
var r=d3.scale.quantize().domain([l,n]).range(d3.range(c).map(function(e){return p+e}))
return r(s)},j=VisualJS.func.legend):J=function(e,a,t){return""!==a.get(t[i.id])?"":p+(c-1)},h=function(e,a){return a[i.label]})
for(var $=0,q=e.data,L=q.length;L>$;$++){var O=q[$]
O.hasOwnProperty("val")?null!==O.val&&(v.set(O.id,O.val),w.push(O.val)):v.set(O.id,""),k(S,O)}w.sort(function(e,a){return e-a})
var F=w[0],A=w[L-1]
if("number"==typeof VisualJS.range?(m=d3.quantile(w,VisualJS.range),b=d3.quantile(w,1-VisualJS.range)):(m=VisualJS.range[0],b=VisualJS.range[1]),B.style("margin-left",M+"px"),B.style("margin-top",W+"px"),B.style("margin-bottom",W+"px"),B.append("svg:g").attr("class",a.areaclass).attr("transform","scale("+z+")").selectAll("path").data(i.features).enter().append("svg:path").attr("class",function(e){return J(S,v,e.properties,m,b)}).attr("d",V).on("mousemove",function(e){(d||u||"undefined"!=typeof v.get(e.properties[i.id]))&&VisualJS.showTooltip(VisualJS.tooltipText(x,h(S,e.properties),v.get(e.properties[i.id])),d3.event.pageX,d3.event.pageY)}).on("mouseout",function(){return y.style("display","none")}),VisualJS.legend&&"object"==typeof i.legend)var N=j([VisualJS.tooltipText(x,null,m),VisualJS.tooltipText(x,null,b)],[f[f.length-1],f[0]],B,y,i.area,i.legend,[F>m||VisualJS.format(m,x)===VisualJS.format(F,x),b>A||VisualJS.format(b,x)===VisualJS.format(A,x)])
VisualJS.public[VisualJS.id]={heading:t,legend:N}},VisualJS.canvas()}}else{if(VisualJS.addJS(a.lib.jquery,!0)){var d=!1
VisualJS.addJS(a.lib.jquery.flot,!1)}else if(VisualJS.addJS(a.lib.jquery.flot,!0))var d=!1
else var d=!0
s&&VisualJS.addJS(a.lib.excanvas,!0)
var c=function(){},p=[],f=[],g=[],S=e.stacked||!1,J=function(){var t=function(){}
if(S)VisualJS.addJS(a.lib.jquery.flot.stack,d)
else if("tsbar"===e.type){VisualJS.addJS(a.lib.jquery.flot.orderbars,d)
var t=function(e){return e.bars}}return c=function(a,i){VisualJS.ticks=[]
for(var l=0,n=i.length;n>l;l++)f.push([l,i[l]]),VisualJS.ticks.push([l,i[l]])
for(var l=0,n=a.length;n>l;l++){for(var s=[],r=a[l].val,o=r.length,u=0;o>u;u++)s.push([u,r[u]])
"tsbar"!==e.type||S||1===n?p.push({label:a[l].label,data:s}):p.push({label:a[l].label,data:s,bars:{show:!0,barWidth:.2,order:l+1,lineWidth:2}})}for(var l=0,d=p.length;d>l;l++)g.push({data:p[l].data,label:p[l].label,bars:t(p[l]),shadowSize:VisualJS.grid.shadow})
V=d>1},VisualJS.getHeading(e)}
switch(e.type){case"pyram":VisualJS.addJS(a.lib.jquery.flot.pyramid,d),Array.max=function(e){return Math.max.apply(Math,e)}
var h,c=function(e,a,t){h=Math.max(Array.max(e[0].val),Array.max(e[1].val)),p[0]={label:e[0].label,data:[],pyramid:{direction:"L"}},p[1]={label:e[1].label,data:[]}
for(var i=0,l=t.length;l>i;i++)p[0].data[i]=[t[i],e[0].val[i]],p[1].data[i]=[t[i],e[1].val[i]]},V=!0,y=!1,S=!1,m=!1,b=!1,x=!1,v=VisualJS.getHeading(e)
break
case"rank":var w=[],c=function(e){for(var a=0,t=e.length;t>a;a++)f[a]=[a,e[t-a-1][0]],w[a]=[e[t-a-1][1],a]
p={data:w}},V=!1,y=!1,m=!1,b=!1,x=!0,v=VisualJS.getHeading(e)
break
case"bar":VisualJS.addJS(a.lib.jquery.flot.categories,d)
var c=function(e,a,t){if("object"!=typeof t||null===t)for(var i=0,l=e.length;l>i;i++)null!==e[i][1]&&p.push(["<span>"+e[i][0]+"</span>",e[i][1]])
else if("number"==typeof e[0])for(var i=0,l=t.length;l>i;i++)null!==e[i]&&p.push(['<span">'+t[i]+"</span>",e[i]])
V=p.length>1},y=!0,m=!1,b=!1,x=!0,v=VisualJS.getHeading(e)
break
case"tsline":var v=J(),y=null,m=!0,b=!0,x=!1
break
case"tsbar":var v=J(),y=!0,m=!1,b=!1,x=!0}VisualJS.chart=function(){c(e.data,e.time,e.by),$.fn.UseTooltip=function(t){var i=[]
$(this).bind("plothover",function(l,n,s){if(s){if(i!=[s.seriesIndex,s.dataIndex]){i=[s.seriesIndex,s.dataIndex]
var r=s.datapoint[0],o=s.datapoint[1],u="bar"!==e.type?s.series.label:p[r][0],d="rank"!==e.type?u:f[o][1],c="rank"!==e.type&&"bar"!==e.type?S||1===p.length?f[r][1]:"pyram"===e.type?p[n.x<0?0:1].data[s.dataIndex][0]:f[s.dataIndex][1]:!1,g="pyram"===e.type?Math.abs(r):"rank"!==e.type?"tsbar"!==e.type?o:S||1===p.length?p[s.seriesIndex].data[r][1]:o:r
VisualJS.showTooltip(VisualJS.tooltipText(t,c?d+" ("+c+")":d,g),n.pageX,n.pageY)}}else $("#"+a.tooltipid).hide(),i=[]})},V=VisualJS.legend&&V
var t={colors:a.colors.series,series:{stack:y,bars:{show:x,barWidth:.7,align:"center",fill:.9},lines:{show:m,lineWidth:VisualJS.grid.line},points:{show:b,radius:VisualJS.grid.point}},legend:{show:V},grid:{borderWidth:VisualJS.grid.border,hoverable:!0,clickable:!1,mouseActiveRadius:10},xaxis:{show:VisualJS.axis.x},yaxis:{show:VisualJS.axis.y}}
VisualJS.canvas=function(){var i=VisualJS.id,s=f.length
switch($(o).html("<"+l+"></"+l+"><"+n+"></"+n+">"),$(o+" "+l).html(v),$(o+" "+n).html(VisualJS.atext(e.footer||"")),VisualJS.getsize(i),$(o+" "+l).after('<div class="'+a.canvasclass+" "+VisualJS.visualsize+'" style="width: '+VisualJS.width+"px; height: "+VisualJS.height+'px;"></div>'),e.type){case"pyram":t.series.pyramid={show:!0,barWidth:1},t.yaxis.show=VisualJS.height/p[0].data.length>11?VisualJS.axis.y:!1,t.xaxis.max="number"==typeof VisualJS.range?h*VisualJS.range:VisualJS.range[1],t.xaxis.tickFormatter=function(e){return VisualJS.format(e,i)},$.plot(u,p,t)
break
case"rank":t.series.bars.horizontal=!0,t.yaxis.ticks=VisualJS.height/s>11?f.slice(0):0,"number"==typeof VisualJS.range?t.xaxis.max=e.data[0][1]*VisualJS.range:(t.xaxis.min=VisualJS.range[0],t.xaxis.max=VisualJS.range[1]),t.xaxis.tickFormatter=function(e){return VisualJS.format(e,i)},t.yaxis.autoscaleMargin=0,t.series.bars.barWidth=.5,$.plot(u,[p],t)
break
case"bar":t.xaxis.mode="categories",t.xaxis.tickLength=0,t.yaxis.tickFormatter=function(e){return VisualJS.format(e,i)},"number"!=typeof VisualJS.range&&null!==VisualJS.range&&(t.yaxis.min=VisualJS.range[0],t.yaxis.max=VisualJS.range[1]),$.plot(u,[p],t)
break
case"tsline":t.grid.markings=[{color:"#999",lineWidth:.5,yaxis:{from:0,to:0}}]
case"tsbar":t.yaxis.tickFormatter=function(e){return VisualJS.format(e,i)}
var r=VisualJS.width/s,d=[],c="01"
switch("number"!=typeof VisualJS.range&&null!==VisualJS.range&&(t.yaxis.min=VisualJS.range[0],t.yaxis.max=VisualJS.range[1]),VisualJS.ticks[0][1].length){case 4:if(30>r){for(var S=r>15?2:r>8?3:4,J=0;s>J;J++)d[J]=J%S?[f[J][0],""]:[f[J][0],f[J][1]]
t.xaxis.ticks=d}else t.xaxis.ticks=f
break
case 5:c="1"
case 6:if(35>r){for(var J=0;s>J;J++)d[J]=VisualJS.ticks[J][1].slice(4)!==c?[VisualJS.ticks[J][0],""]:[VisualJS.ticks[J][0],VisualJS.ticks[J][1].slice(0,4)],f[J][1]=VisualJS.tformat(VisualJS.ticks[J][1],VisualJS.id)
t.xaxis.ticks=d}else{for(var J=0;s>J;J++)f[J][1]=VisualJS.tformat(VisualJS.ticks[J][1],VisualJS.id)
t.xaxis.ticks=f}break
default:t.xaxis.ticks=f}$.plot(u,g,t)}$(u).UseTooltip(VisualJS.id),VisualJS.public[VisualJS.id]={heading:v}},VisualJS.canvas()}}VisualJS.scripts.length&&"object"==typeof LazyLoad?LazyLoad.js(VisualJS.scripts,VisualJS.draw):VisualJS.draw()}}
if("function"!=typeof visual)var visual=VisualJS.load