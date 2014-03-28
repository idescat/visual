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
var VisualJS={version:"0.9.6",show:!0,old:!1,fixed:null,width:500,bwidth:500,height:500,normal:500,scripts:[],map:{},container:{},func:{},callback:null,draw:function(){var e=!1
"function"==typeof VisualJS.chart&&(VisualJS.tooltip(),VisualJS.show&&VisualJS.chart(),"undefined"!=typeof window.onorientationchange?window.onorientationchange=VisualJS.canvas:window.onresize=VisualJS.canvas,e=!0),null!==VisualJS.callback&&VisualJS.callback.call({id:VisualJS.id,chart:e})},tooltip:function(){var e=document
if(!e.getElementById(VisualJS.setup.tooltipid)){var t=e.createElement("div")
t.id=VisualJS.setup.tooltipid,t.style.display="none",e.body.appendChild(t)}},getsize:function(e){var t=VisualJS.setup,a=t.html,i=a.heading,n=a.footer,l=window,s=document,r=s.documentElement,o=s.getElementsByTagName("body")[0],u=s.getElementById(e),d=u.getElementsByTagName(i)[0].clientHeight,c=u.getElementsByTagName(n)[0].clientHeight,p=l.innerHeight||r.clientHeight||o.clientHeight,f=0
d||(f+=11),c||(f+=11),"undefined"!=typeof p&&"undefined"!=typeof d&&"undefined"!=typeof c&&(null===VisualJS.fixed?(VisualJS.bwidth=l.innerWidth||r.clientWidth||o.clientWidth,VisualJS.width=VisualJS.bwidth-t.padding.w,VisualJS.height=p-t.padding.h-d-c+f):(VisualJS.bwidth=r.clientWidth||o.clientWidth,VisualJS.width=VisualJS.fixed[0]-t.padding.w,VisualJS.height=VisualJS.fixed[1]-t.padding.h-d-c+f)),VisualJS.visualsize=VisualJS.width<VisualJS.normal?t.mini:t.normal},atext:function(e){return String(e).replace(/&amp;/g,"&")},getHeading:function(e){if(VisualJS.autoheading===!1)return e.title
var t=[],a=function(e,a){"string"==typeof e&&""!==e&&(a===!0&&(e='<span class="'+VisualJS.setup.nowrapclass+'">'+e+"</span>"),t.push(e))}
if(null!==e.time&&"object"==typeof e.time)var i=VisualJS.tformat(e.time[0],VisualJS.id),n=VisualJS.tformat(e.time[e.time.length-1],VisualJS.id),l=i+"&ndash;"+n
else var l=VisualJS.tformat(e.time,VisualJS.id)
return a(e.title,!1),a(e.geo,!0),a(l,!0),VisualJS.atext(t.join(". "))},addJS:function(e,t){return t&&e.exists.call()?!1:(VisualJS.scripts.push(e.js),!0)},showTooltip:function(e,t,a){var i=document.getElementById(VisualJS.setup.tooltipid),n=VisualJS.bwidth-VisualJS.setup.margin,l={}
i.innerHTML=e,i.style.display="block"
var s=i.clientWidth/2
l.x=t-s,l.y=a-i.clientHeight-5,t+s>n?l.x-=t+s-n:l.x<VisualJS.setup.margin&&(l.x+=VisualJS.setup.margin-l.x),l.y<VisualJS.setup.margin&&(l.y+=1.75*i.clientHeight),i.style.left=l.x+"px",i.style.top=l.y+"px"},format:function(e,t){if("undefined"==typeof e||null===e)return VisualJS.setup.i18n.text.na[VisualJS.container[t].lang]
if("number"==typeof e){for(var a=e.toFixed(VisualJS.container[t].dec),i=/(\d+)(\d{3})/,n=a.split("."),l=n[0],s=n.length>1?VisualJS.setup.i18n.text.dec[VisualJS.container[t].lang]+n[1]:"";i.test(l);)l=l.replace(i,"$1"+VisualJS.setup.i18n.text.k[VisualJS.container[t].lang]+"$2")
return l+s}return""},tformat:function(e,t){if(!e)return null
if(isNaN(e))return e
switch(e.length){case 5:var a="quarter"
break
case 6:var a="month"
break
default:return e}var i=VisualJS.setup.i18n.text[a]
if("undefined"==typeof i)return e
var n=i[VisualJS.container[t].lang]
if("undefined"==typeof n)return e
var l=n[e.slice(4)-1]
return"undefined"==typeof l?e:l+" <span>"+e.slice(0,4)+"</span>"},tooltipText:function(e,t,a){var i="number"==typeof a?" "+VisualJS.container[e].unit.label:"",n="number"==typeof a?VisualJS.container[e].unit.symbol:"",l=VisualJS.format(a,e),s=l!==VisualJS.setup.i18n.text.na[VisualJS.container[e].lang]?"end"===VisualJS.container[e].unit.position?l+i+" "+n:n+l+i:l
return t?"<strong>"+s+"</strong> "+t:s},iframe:function(e,t){var a=VisualJS.setup,i="string"==typeof e.clas?e.clas:a.clas,n='<!DOCTYPE html>\n<!--[if lt IE 7]><html class="lt-ie9 lt-ie8 lt-ie7"> <![endif]-->\n<!--[if IE 7]><html class="lt-ie9 lt-ie8"> <![endif]-->\n<!--[if IE 8]><html class="lt-ie9"> <![endif]-->\n<!--[if gt IE 8]><!--> <html> <!--<![endif]-->\n<head>',l=function(){var t=document,a=t.createElement("iframe"),i=t.getElementById(e.id)
return a.frameBorder="0",a.scrolling="no",i.parentNode.insertBefore(a,i.nextSibling),a},s=function(e,t){if("undefined"!=typeof e){var a
e.contentDocument?a=e.contentDocument:e.contentWindow?a=e.contentWindow.document:window.frames[e.name]&&(a=window.frames[e.name].document),a&&(a.open(),a.write(t),a.close())}}
"string"==typeof t&&(n+=-1===t.indexOf("{")?'<link href="'+t+'" rel="stylesheet" type="text/css"/>':'<style type="text/css">'+t+"</style>"),n+='<script type="text/javascript" src="'+VisualJS.setup.main.visual+'"></script>',n+='<script type="text/javascript" src="'+VisualJS.setup.main.setup+'"></script>',n+='<script type="text/javascript" src="'+VisualJS.setup.main.lazy+'"></script>',n+='</head><body><div id="'+e.id+'" class="'+i+'"></div><script>window.setTimeout(function(){visual('+JSON.stringify(e)+");},1);</script></body></html>",s(l(),n)},compare:function(e){var t=VisualJS.setup,a=VisualJS.setup.separator,i="string"==typeof e.id?e.id:t.id,n="[object Array]"===Object.prototype.toString.call(e.css)?0===e.css.length?["",""]:1===e.css.length?[e.css[0],e.css[0]]:e.css:[e.css,e.css],l=document,s=l.createElement(t.html.heading),r=l.createElement(t.html.footer),o=l.getElementById(i),u=l.createElement("div"),d=l.createElement("style"),c=function(){VisualJS.getsize(i)
var n=VisualJS.height+("string"==typeof e.footer&&""!==e.footer?14:0),l=VisualJS.width+t.margin,s="iframe{ float: left; width: "+Math.floor((l-a)/2-t.margin)+"px; height:"+n+"px; }"
d.styleSheet?d.styleSheet.cssText=s:d.innerHTML=s,u.style.height=n+"px"}
s.innerHTML="string"==typeof e.title?e.title:"",r.innerHTML="string"==typeof e.footer?e.footer:"",r.style.clear="both",o.appendChild(s),o.appendChild(r),l.getElementsByTagName("head")[0].appendChild(d),u.style.width=a+"px","styleFloat"in u.style?u.style.styleFloat="left":u.style.cssFloat="left"
for(var p=0;2>p;p++){var f=l.createElement("span")
"string"!=typeof e.load[p].id&&(e.load[p].id=t.compareids[p]),f.id=e.load[p].id,o.insertBefore(f,r),VisualJS.iframe(e.load[p],n[p])}o.insertBefore(u,f),c(),"undefined"!=typeof window.onorientationchange?window.onorientationchange=c:window.onresize=c},load:function(e){if("undefined"==typeof VisualJS.setup&&window.alert("Visual: Setup not found (visual.setup.js)!"),"[object Array]"!==Object.prototype.toString.call(e))VisualJS.get(e)
else for(var t=0,a=e.length;a>t;t++)VisualJS.get(e[t])},get:function(e){var t=VisualJS.setup,a=t.html,i=t.canvas,n=a.heading,l=a.footer,s=VisualJS.old||t.func.old("ie9"),r=function(e){return"undefined"!=typeof e&&"[object Array]"===Object.prototype.toString.call(e)&&2===e.length&&"number"==typeof e[0]&&"number"==typeof e[1]&&e[0]<e[1]?!0:!1}
VisualJS.id="string"==typeof e.id?e.id:t.id,"object"==typeof e.fixed&&(VisualJS.fixed=e.fixed),VisualJS.container[VisualJS.id]="object"==typeof e.unit&&null!==e.unit?{unit:{label:"string"==typeof e.unit.label?e.unit.label:i.unit.label,symbol:"string"==typeof e.unit.symbol?e.unit.symbol:i.unit.symbol,position:"string"==typeof e.unit.position?e.unit.position:i.unit.position}}:{unit:i.unit},VisualJS.container[VisualJS.id].dec="number"==typeof e.dec?e.dec:i.dec,VisualJS.show="boolean"==typeof e.show?e.show:VisualJS.show,VisualJS.autoheading="boolean"==typeof e.autoheading?e.autoheading:i.autoheading,VisualJS.legend="boolean"==typeof e.legend?e.legend:i.legend,VisualJS.lang=e.lang||t.i18n.lang,VisualJS.container[VisualJS.id].lang=e.lang||t.i18n.lang,VisualJS.callback="function"==typeof e.callback?e.callback:VisualJS.callback,VisualJS.range="number"==typeof e.range||r(e.range)?e.range:i.range.hasOwnProperty(e.type)&&"number"==typeof i.range[e.type]?i.range[e.type]:null,VisualJS.grid="object"==typeof e.grid?{border:"number"==typeof e.grid.border?e.grid.border:i.grid.border,shadow:"number"==typeof e.grid.shadow?e.grid.shadow:i.grid.shadow,line:"number"==typeof e.grid.line?e.grid.line:i.grid.line,point:"number"==typeof e.grid.point?e.grid.point:i.grid.point}:i.grid,VisualJS.axis="object"==typeof e.axis?{x:"boolean"==typeof e.axis.x?e.axis.x:i.axis.x,y:"boolean"==typeof e.axis.y?e.axis.y:i.axis.y}:i.axis
var o="#"+VisualJS.id,u=o+" ."+t.canvasclass
if("cmap"===e.type)if(s)document.getElementById(VisualJS.id).innerHTML="<p>"+t.i18n.text.oldbrowser[VisualJS.container[VisualJS.id].lang]+"</p>"
else{if("string"!=typeof e.by)return
VisualJS.addJS(t.lib.maps,!0),VisualJS.addJS(t.lib.d3,!0),VisualJS.addJS(t.map[e.by],!0),VisualJS.chart=function(){var a=VisualJS.map[e.by],i=a.area[0],s=a.area[1],r="object"==typeof e.grouped&&"object"==typeof e.grouped.label&&e.grouped.label.length>0&&e.data[0].hasOwnProperty("group"),u=e.data[0].hasOwnProperty("val"),d=r?e.grouped.label.length:u?t.colors.map.max:1,c=t.colorclassprefix,p=VisualJS.func.colors(t.colors.map.base,d,"fill",c,r&&"object"==typeof e.grouped.color&&e.grouped.color.length===e.grouped.label.length?e.grouped.color:[],VisualJS.id),f=d3.select(o),g=d3.geo[a.projection](),S="object"==typeof a.center&&"function"==typeof g.center?g.center(a.center):g,J=S.scale(a.scale).translate([i/2,s/2]),h=d3.geo.path().projection(J),V=d3.select("#"+t.tooltipid)
VisualJS.canvas=function(){f.html("<"+n+"></"+n+"><"+l+"></"+l+">"),d3.select(o+" "+n).html(VisualJS.getHeading(e)),d3.select(o+" "+l).html(VisualJS.atext(e.footer||"")),VisualJS.getsize(VisualJS.id)
var g,S,J,y,m,b=VisualJS.id,x=d3.map(),v=[],w=function(){},k=function(){},j=VisualJS.height/s,E=VisualJS.width/i,T=Math.min(Math.round(i*j),VisualJS.width),H=Math.min(Math.round(s*E),VisualJS.height),I=Math.floor((VisualJS.width-T)/2),M=Math.floor((VisualJS.height-H)/2),W=E>j?j:E,z=f.insert("svg:svg",l).attr("width",T).attr("height",H)
r?(g=d3.map(),w=function(e,t){e.set(t.id,t.group)},S=function(e,t,i){return c+(e.get(i[a.id])-1)},J=function(t,i){var n=e.grouped.label[t.get(i[a.id])-1],l=i[a.label]
return"undefined"!=typeof n&&(l+=" <em>"+n+"</em>"),l}):(u?(S=function(e,t,i,n,l){var s=t.get(i[a.id])
if(n===l)return"undefined"!=typeof s?c+(d/2).toFixed(0):null
var r=d3.scale.quantize().domain([n,l]).range(d3.range(d).map(function(e){return c+e}))
return r(s)},k=VisualJS.func.legend):S=function(e,t,i){return""!==t.get(i[a.id])?"":c+(d-1)},J=function(e,t){return t[a.label]})
for(var B=0,$=e.data,q=$.length;q>B;B++){var L=$[B]
L.hasOwnProperty("val")?null!==L.val&&(x.set(L.id,L.val),v.push(L.val)):x.set(L.id,""),w(g,L)}v.sort(function(e,t){return e-t})
var O=v[0],F=v[q-1]
"number"==typeof VisualJS.range?(y=d3.quantile(v,VisualJS.range),m=d3.quantile(v,1-VisualJS.range)):(y=VisualJS.range[0],m=VisualJS.range[1]),z.style("margin-left",I+"px"),z.style("margin-top",M+"px"),z.style("margin-bottom",M+"px"),z.append("svg:g").attr("class",t.areaclass).attr("transform","scale("+W+")").selectAll("path").data(a.features).enter().append("svg:path").attr("class",function(e){return S(g,x,e.properties,y,m)}).attr("d",h).on("mousemove",function(e){(u||r||"undefined"!=typeof x.get(e.properties[a.id]))&&VisualJS.showTooltip(VisualJS.tooltipText(b,J(g,e.properties),x.get(e.properties[a.id])),d3.event.pageX,d3.event.pageY)}).on("mouseout",function(){return V.style("display","none")}),VisualJS.legend&&"object"==typeof a.legend&&k([VisualJS.tooltipText(b,null,y),VisualJS.tooltipText(b,null,m)],[p[p.length-1],p[0]],z,V,a.area,a.legend,[O>y||VisualJS.format(y,b)===VisualJS.format(O,b),m>F||VisualJS.format(m,b)===VisualJS.format(F,b)])},VisualJS.canvas()}}else{if(VisualJS.addJS(t.lib.jquery,!0)){var d=!1
VisualJS.addJS(t.lib.jquery.flot,!1)}else if(VisualJS.addJS(t.lib.jquery.flot,!0))var d=!1
else var d=!0
s&&VisualJS.addJS(t.lib.excanvas,!0)
var c=function(){},p=[],f=[],g=[],S=e.stacked||!1,J=function(){var a=function(){}
if(S)VisualJS.addJS(t.lib.jquery.flot.stack,d)
else if("tsbar"===e.type){VisualJS.addJS(t.lib.jquery.flot.orderbars,d)
var a=function(e){return e.bars}}return c=function(t,i){VisualJS.ticks=[]
for(var n=0,l=i.length;l>n;n++)f.push([n,i[n]]),VisualJS.ticks.push([n,i[n]])
for(var n=0,l=t.length;l>n;n++){for(var s=[],r=t[n].val,o=r.length,u=0;o>u;u++)s.push([u,r[u]])
"tsbar"!==e.type||S||1===l?p.push({label:t[n].label,data:s}):p.push({label:t[n].label,data:s,bars:{show:!0,barWidth:.2,order:n+1,lineWidth:2}})}for(var n=0,d=p.length;d>n;n++)g.push({data:p[n].data,label:p[n].label,bars:a(p[n]),shadowSize:VisualJS.grid.shadow})
V=d>1},VisualJS.getHeading(e)}
switch(e.type){case"pyram":VisualJS.addJS(t.lib.jquery.flot.pyramid,d),Array.max=function(e){return Math.max.apply(Math,e)}
var h,c=function(e,t,a){h=Math.max(Array.max(e[0].val),Array.max(e[1].val)),p[0]={label:e[0].label,data:[],pyramid:{direction:"L"}},p[1]={label:e[1].label,data:[]}
for(var i=0,n=a.length;n>i;i++)p[0].data[i]=[a[i],e[0].val[i]],p[1].data[i]=[a[i],e[1].val[i]]},V=!0,y=!1,S=!1,m=!1,b=!1,x=!1,v=VisualJS.getHeading(e)
break
case"rank":var w=[],c=function(e){for(var t=0,a=e.length;a>t;t++)f[t]=[t,e[a-t-1][0]],w[t]=[e[a-t-1][1],t]
p={data:w}},V=!1,y=!1,m=!1,b=!1,x=!0,v=VisualJS.getHeading(e)
break
case"bar":VisualJS.addJS(t.lib.jquery.flot.categories,d)
var c=function(e,t,a){if("object"!=typeof a||null===a)for(var i=0,n=e.length;n>i;i++)p[i]=["<span>"+e[i][0]+"</span>",e[i][1]]
else if("number"==typeof e[0])for(var i=0,n=a.length;n>i;i++)p[i]=['<span">'+a[i]+"</span>",e[i]]
V=p.length>1},y=!0,m=!1,b=!1,x=!0,v=VisualJS.getHeading(e)
break
case"tsline":var v=J(),y=null,m=!0,b=!0,x=!1
break
case"tsbar":var v=J(),y=!0,m=!1,b=!1,x=!0}VisualJS.chart=function(){c(e.data,e.time,e.by),$.fn.UseTooltip=function(a){var i=[]
$(this).bind("plothover",function(n,l,s){if(s){if(i!=[s.seriesIndex,s.dataIndex]){i=[s.seriesIndex,s.dataIndex]
var r=s.datapoint[0],o=s.datapoint[1],u="bar"!==e.type?s.series.label:p[r][0],d="rank"!==e.type?u:f[o][1],c="rank"!==e.type&&"bar"!==e.type?S||1===p.length?f[r][1]:"pyram"===e.type?p[l.x<0?0:1].data[s.dataIndex][0]:f[s.dataIndex][1]:!1,g="pyram"===e.type?Math.abs(r):"rank"!==e.type?"tsbar"!==e.type?o:S||1===p.length?p[s.seriesIndex].data[r][1]:o:r
VisualJS.showTooltip(VisualJS.tooltipText(a,c?d+" ("+c+")":d,g),l.pageX,l.pageY)}}else $("#"+t.tooltipid).hide(),i=[]})},V=VisualJS.legend&&V
var a={colors:t.colors.series,series:{stack:y,bars:{show:x,barWidth:.7,align:"center",fill:.9},lines:{show:m,lineWidth:VisualJS.grid.line},points:{show:b,radius:VisualJS.grid.point}},legend:{show:V},grid:{borderWidth:VisualJS.grid.border,hoverable:!0,clickable:!1,mouseActiveRadius:10},xaxis:{show:VisualJS.axis.x},yaxis:{show:VisualJS.axis.y}}
VisualJS.canvas=function(){var i=VisualJS.id,s=f.length
switch($(o).html("<"+n+"></"+n+"><"+l+"></"+l+">"),$(o+" "+n).html(v),$(o+" "+l).html(VisualJS.atext(e.footer||"")),VisualJS.getsize(i),$(o+" "+n).after('<div class="'+t.canvasclass+" "+VisualJS.visualsize+'" style="width: '+VisualJS.width+"px; height: "+VisualJS.height+'px;"></div>'),e.type){case"pyram":a.series.pyramid={show:!0,barWidth:1},a.yaxis.show=VisualJS.height/p[0].data.length>11?VisualJS.axis.y:!1,a.xaxis.max="number"==typeof VisualJS.range?h*VisualJS.range:VisualJS.range[1],a.xaxis.tickFormatter=function(e){return VisualJS.format(e,i)},$.plot(u,p,a)
break
case"rank":a.series.bars.horizontal=!0,a.yaxis.ticks=VisualJS.height/s>11?f.slice(0):0,"number"==typeof VisualJS.range?a.xaxis.max=e.data[0][1]*VisualJS.range:(a.xaxis.min=VisualJS.range[0],a.xaxis.max=VisualJS.range[1]),a.xaxis.tickFormatter=function(e){return VisualJS.format(e,i)},a.yaxis.autoscaleMargin=0,a.series.bars.barWidth=.5,$.plot(u,[p],a)
break
case"bar":a.xaxis.mode="categories",a.xaxis.tickLength=0,a.yaxis.tickFormatter=function(e){return VisualJS.format(e,i)},"number"!=typeof VisualJS.range&&null!==VisualJS.range&&(a.yaxis.min=VisualJS.range[0],a.yaxis.max=VisualJS.range[1]),$.plot(u,[p],a)
break
case"tsline":a.grid.markings=[{color:"#999",lineWidth:.5,yaxis:{from:0,to:0}}]
case"tsbar":a.yaxis.tickFormatter=function(e){return VisualJS.format(e,i)}
var r=VisualJS.width/s,d=[],c="01"
switch("number"!=typeof VisualJS.range&&null!==VisualJS.range&&(a.yaxis.min=VisualJS.range[0],a.yaxis.max=VisualJS.range[1]),VisualJS.ticks[0][1].length){case 4:if(30>r){for(var S=r>15?2:r>8?3:4,J=0;s>J;J++)d[J]=J%S?[f[J][0],""]:[f[J][0],f[J][1]]
a.xaxis.ticks=d}else a.xaxis.ticks=f
break
case 5:c="1"
case 6:if(35>r){for(var J=0;s>J;J++)d[J]=VisualJS.ticks[J][1].slice(4)!==c?[VisualJS.ticks[J][0],""]:[VisualJS.ticks[J][0],VisualJS.ticks[J][1].slice(0,4)],f[J][1]=VisualJS.tformat(VisualJS.ticks[J][1],VisualJS.id)
a.xaxis.ticks=d}else{for(var J=0;s>J;J++)f[J][1]=VisualJS.tformat(VisualJS.ticks[J][1],VisualJS.id)
a.xaxis.ticks=f}break
default:a.xaxis.ticks=f}$.plot(u,g,a)}$(u).UseTooltip(VisualJS.id)},VisualJS.canvas()}}VisualJS.scripts.length&&"object"==typeof LazyLoad?LazyLoad.js(VisualJS.scripts,VisualJS.draw):VisualJS.draw()}}
if("function"!=typeof visual)var visual=VisualJS.load