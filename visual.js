/*
Visual
Copyright (c) 2013 Institut d'Estadistica de Catalunya (Idescat)
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

var VisualJS={version:"0.6.1",show:!0,old:!1,fixed:null,width:500,bwidth:500,height:500,normal:500,scripts:[],ticks:[],map:{},container:{},func:{},callback:null,draw:function(){var t=!1
"function"==typeof VisualJS.chart&&(VisualJS.tooltip(),VisualJS.show&&VisualJS.chart(),window.onresize=function(){VisualJS.canvas()},t=!0),null!==VisualJS.callback&&VisualJS.callback.call({id:VisualJS.id,chart:t})},tooltip:function(){var t=document
if(!t.getElementById(VisualJS.setup.tooltipid)){var e=t.createElement("div")
e.id=VisualJS.setup.tooltipid,e.style.display="none",t.body.appendChild(e)}},getsize:function(t){var e=VisualJS.setup,a=e.html,i=a.heading,s=a.footer,l=window,n=document,r=n.documentElement,o=n.getElementsByTagName("body")[0],u=n.getElementById(t),d=u.getElementsByTagName(i)[0].clientHeight,c=u.getElementsByTagName(s)[0].clientHeight,p=l.innerHeight||r.clientHeight||o.clientHeight
"undefined"!=typeof p&&"undefined"!=typeof d&&"undefined"!=typeof c&&(null===VisualJS.fixed?(VisualJS.bwidth=l.innerWidth||r.clientWidth||o.clientWidth,VisualJS.width=VisualJS.bwidth-e.padding.w,VisualJS.height=p-e.padding.h-d-c):(VisualJS.bwidth=r.clientWidth||o.clientWidth,VisualJS.width=VisualJS.fixed[0]-e.padding.w,VisualJS.height=VisualJS.fixed[1]-e.padding.h-d-c)),VisualJS.visualsize=VisualJS.width<VisualJS.normal?e.mini:e.normal},atext:function(t){return String(t).replace(/&amp;/g,"&")},getHeading:function(t){if(VisualJS.autoheading===!1)return t.title
var e=[],a=function(t,a){"string"==typeof t&&(a===!0&&(t='<span class="'+VisualJS.setup.nowrapclass+'">'+t+"</span>"),e.push(t))}
if(null!==t.time&&"object"==typeof t.time)var i=VisualJS.tformat(t.time[0]),s=VisualJS.tformat(t.time[t.time.length-1]),l=i+"&ndash;"+s
else var l=VisualJS.tformat(t.time)
return a(t.title,!1),a(t.geo,!0),null!==l&&a(l,!0),VisualJS.atext(e.join(". "))},addJS:function(t,e){return e&&t.exists.call()?!1:(VisualJS.scripts.push(t.js),!0)},showTooltip:function(t,e,a){var i=document.getElementById(VisualJS.setup.tooltipid),s=VisualJS.bwidth-VisualJS.setup.margin,l={}
i.innerHTML=t,i.style.display="block"
var n=i.clientWidth/2
l.x=e-n,l.y=a-i.clientHeight-5,e+n>s?l.x-=e+n-s:l.x<VisualJS.setup.margin&&(l.x+=VisualJS.setup.margin-l.x),l.y<VisualJS.setup.margin&&(l.y+=1.75*i.clientHeight),i.style.left=l.x+"px",i.style.top=l.y+"px"},format:function(t){if("undefined"==typeof t||null===t)return VisualJS.setup.i18n.text.na[VisualJS.lang]
if("number"==typeof t){for(var e=t.toFixed(VisualJS.container[VisualJS.id].dec),a=/(\d+)(\d{3})/,i=e.split("."),s=i[0],l=i.length>1?VisualJS.setup.i18n.text.dec[VisualJS.lang]+i[1]:"";a.test(s);)s=s.replace(a,"$1"+VisualJS.setup.i18n.text.k[VisualJS.lang]+"$2")
return s+l}return""},tformat:function(t){if(!t)return null
if(isNaN(t))return t
switch(t.length){case 5:var e="quarter"
break
case 6:var e="month"
break
default:return t}var a=VisualJS.setup.i18n.text[e]
if("undefined"==typeof a)return t
var i=a[VisualJS.lang]
return"undefined"==typeof i?t:i[t.slice(4)-1]+" <span>"+t.slice(0,4)+"</span>"},tooltipText:function(t,e,a){var i=" "+VisualJS.container[t].unit.label,s="number"==typeof a?VisualJS.container[t].unit.symbol:"",l=VisualJS.format(a),n=l!==VisualJS.setup.i18n.text.na[VisualJS.lang]?"end"===VisualJS.container[t].unit.position?l+i+" "+s:s+l+i:l
return e?"<strong>"+n+"</strong> "+e:n},iframe:function(t,e){var a=VisualJS.setup,i="string"==typeof t.clas?t.clas:a.clas,s="<html><head>",l=a.func.old("ie9"),n=function(){var e=document,a=e.createElement("iframe"),i=e.getElementById(t.id)
return a.frameBorder="0",a.scrolling="no",i.parentNode.insertBefore(a,i.nextSibling),a},r=function(t,e){if("undefined"!=typeof t){var a
t.contentDocument?a=t.contentDocument:t.contentWindow?a=t.contentWindow.document:window.frames[t.name]&&(a=window.frames[t.name].document),a&&(a.open(),a.write(e),a.close())}}
"string"==typeof e&&(s+=-1===e.indexOf("{")?'<link href="'+e+'" rel="stylesheet" type="text/css"/>':'<style type="text/css">'+e+"</style>"),s+='<script type="text/javascript" src="'+VisualJS.setup.main.visual+'"></script>',s+='<script type="text/javascript" src="'+VisualJS.setup.main.setup+'"></script>',s+='<script type="text/javascript" src="'+VisualJS.setup.main.lazy+'"></script>',s+='</head><body><div id="'+t.id+'" class="'+i+'"></div><script>window.setTimeout(function(){VisualJS.old='+l+"; visual("+JSON.stringify(t)+");},1);</script></body></html>",r(n(),s)},compare:function(t){var e=VisualJS.setup,a=VisualJS.setup.separator,i="string"==typeof t.id?t.id:e.id,s="[object Array]"===Object.prototype.toString.call(t.css)?0===t.css.length?["",""]:1===t.css.length?[t.css[0],t.css[0]]:t.css:[t.css,t.css],l=document,n=l.createElement(e.html.heading),r=l.createElement(e.html.footer),o=l.getElementById(i),u=l.createElement("div"),d=l.createElement("style"),c=function(){VisualJS.getsize(i)
var t=VisualJS.height+2*e.margin,s=VisualJS.width+e.margin,l="iframe{ float: left; width: "+Math.floor((s-a)/2)+"px; height:"+t+"px; }"
o.style.height=t+"px",o.style.width=s+"px",d.styleSheet?d.styleSheet.cssText=l:d.innerHTML=l,u.style.height=t+"px"}
n.innerHTML="string"==typeof t.title?t.title:"",r.innerHTML="string"==typeof t.footer?t.footer:"",r.style.clear="both",o.appendChild(n),o.appendChild(r),l.getElementsByTagName("head")[0].appendChild(d),u.style.width=a+"px","styleFloat"in u.style?u.style.styleFloat="left":u.style.cssFloat="left"
for(var p=0;2>p;p++){var f=l.createElement("span")
"string"!=typeof t.load[p].id&&(t.load[p].id=e.compareids[p]),f.id=t.load[p].id,o.insertBefore(f,r),VisualJS.iframe(t.load[p],s[p])}o.insertBefore(u,f),c(),window.onresize=c},load:function(t){if("undefined"==typeof VisualJS.setup&&window.alert("Visual: Setup not found (visual.setup.js)!"),"[object Array]"!==Object.prototype.toString.call(t))VisualJS.get(t)
else for(var e=0,a=t.length;a>e;e++)VisualJS.get(t[e])},get:function(t){var e=VisualJS.setup,a=e.html,i=e.canvas,s=a.heading,l=a.footer,n=VisualJS.old||e.func.old("ie9")
VisualJS.id="string"==typeof t.id?t.id:e.id,"object"==typeof t.fixed&&(VisualJS.fixed=t.fixed),VisualJS.container[VisualJS.id]="object"==typeof t.unit?{unit:{label:"string"==typeof t.unit.label?t.unit.label:i.unit.label,symbol:"string"==typeof t.unit.symbol?t.unit.symbol:i.unit.symbol,position:"string"==typeof t.unit.position?t.unit.position:i.unit.position}}:{unit:i.unit},VisualJS.container[VisualJS.id].dec="number"==typeof t.dec?t.dec:i.dec,VisualJS.show="boolean"==typeof t.show?t.show:VisualJS.show,VisualJS.autoheading="boolean"==typeof t.autoheading?t.autoheading:i.autoheading,VisualJS.legend="boolean"==typeof t.legend?t.legend:i.legend,VisualJS.lang=t.lang||e.i18n.lang,VisualJS.callback="function"==typeof t.callback?t.callback:VisualJS.callback,VisualJS.grid="object"==typeof t.grid?{width:"number"==typeof t.grid.width?t.grid.width:i.grid.width}:i.grid,VisualJS.axis="object"==typeof t.axis?{x:"boolean"==typeof t.axis.x?t.axis.x:i.axis.x,y:"boolean"==typeof t.axis.y?t.axis.y:i.axis.y}:i.axis
var r="#"+VisualJS.id,o=r+" ."+e.canvasclass
if("cmap"===t.type)if(n)document.getElementById(VisualJS.id).innerHTML="<p>"+e.i18n.text.oldbrowser[VisualJS.lang]+"</p>"
else{if("string"!=typeof t.by)return
VisualJS.addJS(e.lib.maps,!0),VisualJS.addJS(e.lib.d3,!0),VisualJS.addJS(e.map[t.by],!0),VisualJS.chart=function(){var a=VisualJS.map[t.by],n=a.area[0],o=a.area[1],u="object"==typeof t.grouped&&t.grouped.length>0&&t.data[0].hasOwnProperty("group"),d=!u&&t.data[0].hasOwnProperty("val"),c=u?t.grouped.length:d?e.colors.map.max:1,p=VisualJS.func.colors(e.colors.map.base,c,"fill","q"),f=d3.select(r),h=d3.geo[a.projection](),S="object"==typeof a.center&&"function"==typeof h.center?h.center(a.center):h,g=S.scale(a.scale).translate([n/2,o/2]),J=d3.geo.path().projection(g),V=d3.select("#"+e.tooltipid)
VisualJS.canvas=function(){f.html("<"+s+"></"+s+"><"+l+"></"+l+">"),d3.select(r+" "+s).html(VisualJS.getHeading(t)),d3.select(r+" "+l).html(VisualJS.atext(t.footer||"")),VisualJS.getsize(VisualJS.id)
var h,S,g,y,m,b=VisualJS.id,x=d3.map(),v=[],w=function(){},k=function(){},j="number"==typeof t.filter?t.filter:i.filter,T=1-j,E=VisualJS.height/o,H=VisualJS.width/n,M=Math.min(Math.round(n*E),VisualJS.width),q=Math.min(Math.round(o*H),VisualJS.height),z=Math.floor((VisualJS.width-M)/2),B=Math.floor((VisualJS.height-q)/2),W=H>E?E:H,$=f.insert("svg:svg",l).attr("width",M).attr("height",q)
u?(h=d3.map(),w=function(t,e){t.set(e.id,e.group)},S=function(t,e,i){return"q"+(t.get(i[a.id])-1)},g=function(e,i){var s=t.grouped[e.get(i[a.id])-1],l=i[a.label]
return"undefined"!=typeof s&&(l+=" <em>"+s+"</em>"),l}):(d?(S=function(t,e,i,s,l){var n=d3.scale.quantize().domain([s,l]).range(d3.range(c).map(function(t){return"q"+t}))
return n(e.get(i[a.id]))},k=VisualJS.func.legend):S=function(t,e,i){return""!==e.get(i[a.id])?"":"q"+(c-1)},g=function(t,e){return e[a.label]})
for(var I=0,L=t.data,A=L.length;A>I;I++){var F=L[I]
F.hasOwnProperty("val")?x.set(F.id,F.val):x.set(F.id,""),v.push(F.val),w(h,F)}v.sort(function(t,e){return t-e}),"[object Array]"===Object.prototype.toString.call(t.filter)&&2===t.filter.length&&"number"==typeof t.filter[0]&&"number"==typeof t.filter[1]&&t.filter[0]<t.filter[1]?(y=t.filter[0],m=t.filter[1]):(y=d3.quantile(v,j),m=d3.quantile(v,T)),$.style("margin-left",z+"px"),$.style("margin-top",B+"px"),$.style("margin-bottom",B+"px"),$.append("svg:g").attr("class",e.areaclass).attr("transform","scale("+W+")").selectAll("path").data(a.features).enter().append("svg:path").attr("class",function(t){return S(h,x,t.properties,y,m)}).attr("d",J).on("mousemove",function(t){(d||"undefined"!=typeof x.get(t.properties[a.id]))&&VisualJS.showTooltip(VisualJS.tooltipText(b,g(h,t.properties),x.get(t.properties[a.id])),d3.event.pageX,d3.event.pageY)}).on("mouseout",function(){return V.style("display","none")}),VisualJS.legend&&"object"==typeof a.legend&&k(b,VisualJS.tooltipText(b,null,m),VisualJS.tooltipText(b,null,y),p[p.length-1],p[0],$,V,a.area,a.legend)},VisualJS.canvas()}}else{if(VisualJS.addJS(e.lib.jquery,!0)){var u=!1
VisualJS.addJS(e.lib.jquery.flot,!1)}else if(VisualJS.addJS(e.lib.jquery.flot,!0))var u=!1
else var u=!0
n&&VisualJS.addJS(e.lib.excanvas,!0)
var d=function(){},c=[],p=[],f=[],h=t.stacked||!1,S=function(){var a=function(){}
if(h)VisualJS.addJS(e.lib.jquery.flot.stack,u)
else if("tsbar"===t.type){VisualJS.addJS(e.lib.jquery.flot.orderbars,u)
var a=function(t){return t.bars}}return d=function(e,i){for(var s=0,l=i.length;l>s;s++)p.push([s,i[s]]),VisualJS.ticks.push([s,i[s]])
for(var s=0,l=e.length;l>s;s++){for(var n=[],r=e[s].val,o=r.length,u=0;o>u;u++)n.push([u,r[u]])
"tsbar"!==t.type||h||1===l?c.push({label:e[s].label,data:n}):c.push({label:e[s].label,data:n,bars:{show:!0,barWidth:.2,order:s+1,lineWidth:2}})}for(var s=0,d=c.length;d>s;s++)f.push({data:c[s].data,label:c[s].label,bars:a(c[s]),shadowSize:4})
J=d>1},VisualJS.getHeading(t)}
switch(t.type){case"pyram":VisualJS.addJS(e.lib.jquery.flot.pyramid,u),Array.max=function(t){return Math.max.apply(Math,t)}
var g,d=function(t,e,a){g=Math.max(Array.max(t[0].val),Array.max(t[1].val)),c[0]={label:t[0].label,data:[],pyramid:{direction:"L"}},c[1]={label:t[1].label,data:[]}
for(var i=0,s=a.length;s>i;i++)c[0].data[i]=[a[i],t[0].val[i]],c[1].data[i]=[a[i],t[1].val[i]]},J=!0,V=!1,y=!1,m=!1,b=!1,x=VisualJS.getHeading(t)
break
case"rank":var v=[],d=function(t){for(var e=0,a=t.length;a>e;e++)p[e]=[e,t[a-e-1][0]],v[e]=[t[a-e-1][1],e]
c={data:v}},J=!1,V=!1,y=!1,m=!1,b=!0,x=VisualJS.getHeading(t)
break
case"bar":VisualJS.addJS(e.lib.jquery.flot.categories,u)
var d=function(t){c=t,J=c.length>1},V=!0,y=!1,m=!1,b=!0,x=VisualJS.getHeading(t)
break
case"tsline":var x=S(),V=null,y=!0,m=!0,b=!1
break
case"tsbar":var x=S(),V=!0,y=!1,m=!1,b=!0}VisualJS.chart=function(){d(t.data,t.time,t.by),$.fn.UseTooltip=function(a){var i=[]
$(this).bind("plothover",function(s,l,n){if(n){if(i!=[n.seriesIndex,n.dataIndex]){i=[n.seriesIndex,n.dataIndex]
var r=n.datapoint[0],o=n.datapoint[1],u="bar"!==t.type?n.series.label:c[r][0],d="rank"!==t.type?u:p[o][1],f="rank"!==t.type&&"bar"!==t.type?h||1===c.length?p[r][1]:"pyram"===t.type?c[l.x<0?0:1].data[n.dataIndex][0]:p[n.dataIndex][1]:!1,S="pyram"===t.type?Math.abs(r):"rank"!==t.type?"tsbar"!==t.type?o:h||1===c.length?c[n.seriesIndex].data[r][1]:o:r
VisualJS.showTooltip(VisualJS.tooltipText(a,f?d+" ("+f+")":d,S),l.pageX,l.pageY)}}else $("#"+e.tooltipid).hide(),i=[]})},J=VisualJS.legend&&J
var a={colors:e.colors.series,series:{stack:V,bars:{show:b,barWidth:.7,align:"center",fill:.9},lines:{show:y},points:{show:m,radius:1}},legend:{show:J},grid:{borderWidth:VisualJS.grid.width,hoverable:!0,clickable:!1,mouseActiveRadius:10},xaxis:{show:VisualJS.axis.x},yaxis:{show:VisualJS.axis.y}}
VisualJS.canvas=function(){$(r).html("<"+s+"></"+s+"><"+l+"></"+l+">"),$(r+" "+s).html(x),$(r+" "+l).html(VisualJS.atext(t.footer||"")),VisualJS.getsize(VisualJS.id),$(r+" "+s).after('<div class="'+e.canvasclass+" "+VisualJS.visualsize+'" style="width: '+VisualJS.width+"px; height: "+VisualJS.height+'px;"></div>')
var i=p.length
switch(t.type){case"pyram":a.series.pyramid={show:!0,barWidth:1},a.xaxis.max=1.02*g,a.xaxis.tickFormatter=function(t){return VisualJS.format(t)},$.plot(o,c,a)
break
case"rank":a.series.bars.horizontal=!0,a.yaxis.ticks=VisualJS.height/i>11?p.slice(0):0,a.xaxis.max=1.02*t.data[0][1],a.xaxis.tickFormatter=function(t){return VisualJS.format(t)},a.yaxis.autoscaleMargin=0,a.series.bars.barWidth=.5,$.plot(o,[c],a)
break
case"bar":a.xaxis.mode="categories",a.xaxis.tickLength=0,a.yaxis.tickFormatter=function(t){return VisualJS.format(t)},$.plot(o,[c],a)
break
case"tsline":case"tsbar":a.yaxis.tickFormatter=function(t){return VisualJS.format(t)}
var n=VisualJS.width/i,u=[],d="01"
switch(VisualJS.ticks[0][1].length){case 4:if(30>n){for(var h=n>15?2:n>8?3:4,S=0;i>S;S++)u[S]=S%h?[p[S][0],""]:[p[S][0],p[S][1]]
a.xaxis.ticks=u}else a.xaxis.ticks=p
break
case 5:d="1"
case 6:if(35>n){for(var S=0;i>S;S++)u[S]=VisualJS.ticks[S][1].slice(4)!==d?[VisualJS.ticks[S][0],""]:[VisualJS.ticks[S][0],VisualJS.ticks[S][1].slice(0,4)],p[S][1]=VisualJS.tformat(VisualJS.ticks[S][1])
a.xaxis.ticks=u}else{for(var S=0;i>S;S++)p[S][1]=VisualJS.tformat(VisualJS.ticks[S][1])
a.xaxis.ticks=p}break
default:a.xaxis.ticks=p}$.plot(o,f,a)}$(o).UseTooltip(VisualJS.id)},VisualJS.canvas()}}VisualJS.scripts.length&&"object"==typeof LazyLoad?LazyLoad.js(VisualJS.scripts,VisualJS.draw):VisualJS.draw()}}
if("function"!=typeof visual)var visual=VisualJS.load