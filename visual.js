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
var VisualJS={version:"0.7.9",show:!0,old:!1,fixed:null,width:500,bwidth:500,height:500,normal:500,scripts:[],ticks:[],map:{},container:{},func:{},callback:null,draw:function(){var t=!1
"function"==typeof VisualJS.chart&&(VisualJS.tooltip(),VisualJS.show&&VisualJS.chart(),"undefined"!=typeof window.onorientationchange?window.onorientationchange=VisualJS.canvas:window.onresize=VisualJS.canvas,t=!0),null!==VisualJS.callback&&VisualJS.callback.call({id:VisualJS.id,chart:t})},tooltip:function(){var t=document
if(!t.getElementById(VisualJS.setup.tooltipid)){var e=t.createElement("div")
e.id=VisualJS.setup.tooltipid,e.style.display="none",t.body.appendChild(e)}},getsize:function(t){var e=VisualJS.setup,i=e.html,a=i.heading,l=i.footer,s=window,n=document,r=n.documentElement,o=n.getElementsByTagName("body")[0],u=n.getElementById(t),d=u.getElementsByTagName(a)[0].clientHeight,c=u.getElementsByTagName(l)[0].clientHeight,p=s.innerHeight||r.clientHeight||o.clientHeight,f=0
d||(f+=11),c||(f+=11),"undefined"!=typeof p&&"undefined"!=typeof d&&"undefined"!=typeof c&&(null===VisualJS.fixed?(VisualJS.bwidth=s.innerWidth||r.clientWidth||o.clientWidth,VisualJS.width=VisualJS.bwidth-e.padding.w,VisualJS.height=p-e.padding.h-d-c+f):(VisualJS.bwidth=r.clientWidth||o.clientWidth,VisualJS.width=VisualJS.fixed[0]-e.padding.w,VisualJS.height=VisualJS.fixed[1]-e.padding.h-d-c+f)),VisualJS.visualsize=VisualJS.width<VisualJS.normal?e.mini:e.normal},atext:function(t){return String(t).replace(/&amp;/g,"&")},getHeading:function(t){if(VisualJS.autoheading===!1)return t.title
var e=[],i=function(t,i){"string"==typeof t&&""!==t&&(i===!0&&(t='<span class="'+VisualJS.setup.nowrapclass+'">'+t+"</span>"),e.push(t))}
if(null!==t.time&&"object"==typeof t.time)var a=VisualJS.tformat(t.time[0]),l=VisualJS.tformat(t.time[t.time.length-1]),s=a+"&ndash;"+l
else var s=VisualJS.tformat(t.time)
return i(t.title,!1),i(t.geo,!0),i(s,!0),VisualJS.atext(e.join(". "))},addJS:function(t,e){return e&&t.exists.call()?!1:(VisualJS.scripts.push(t.js),!0)},showTooltip:function(t,e,i){var a=document.getElementById(VisualJS.setup.tooltipid),l=VisualJS.bwidth-VisualJS.setup.margin,s={}
a.innerHTML=t,a.style.display="block"
var n=a.clientWidth/2
s.x=e-n,s.y=i-a.clientHeight-5,e+n>l?s.x-=e+n-l:s.x<VisualJS.setup.margin&&(s.x+=VisualJS.setup.margin-s.x),s.y<VisualJS.setup.margin&&(s.y+=1.75*a.clientHeight),a.style.left=s.x+"px",a.style.top=s.y+"px"},format:function(t){if("undefined"==typeof t||null===t)return VisualJS.setup.i18n.text.na[VisualJS.lang]
if("number"==typeof t){for(var e=t.toFixed(VisualJS.container[VisualJS.id].dec),i=/(\d+)(\d{3})/,a=e.split("."),l=a[0],s=a.length>1?VisualJS.setup.i18n.text.dec[VisualJS.lang]+a[1]:"";i.test(l);)l=l.replace(i,"$1"+VisualJS.setup.i18n.text.k[VisualJS.lang]+"$2")
return l+s}return""},tformat:function(t){if(!t)return null
if(isNaN(t))return t
switch(t.length){case 5:var e="quarter"
break
case 6:var e="month"
break
default:return t}var i=VisualJS.setup.i18n.text[e]
if("undefined"==typeof i)return t
var a=i[VisualJS.lang]
if("undefined"==typeof a)return t
var l=a[t.slice(4)-1]
return"undefined"==typeof l?t:l+" <span>"+t.slice(0,4)+"</span>"},tooltipText:function(t,e,i){var a=" "+VisualJS.container[t].unit.label,l="number"==typeof i?VisualJS.container[t].unit.symbol:"",s=VisualJS.format(i),n=s!==VisualJS.setup.i18n.text.na[VisualJS.lang]?"end"===VisualJS.container[t].unit.position?s+a+" "+l:l+s+a:s
return e?"<strong>"+n+"</strong> "+e:n},iframe:function(t,e){var i=VisualJS.setup,a="string"==typeof t.clas?t.clas:i.clas,l="<html><head>",s=i.func.old("ie9"),n=function(){var e=document,i=e.createElement("iframe"),a=e.getElementById(t.id)
return i.frameBorder="0",i.scrolling="no",a.parentNode.insertBefore(i,a.nextSibling),i},r=function(t,e){if("undefined"!=typeof t){var i
t.contentDocument?i=t.contentDocument:t.contentWindow?i=t.contentWindow.document:window.frames[t.name]&&(i=window.frames[t.name].document),i&&(i.open(),i.write(e),i.close())}}
"string"==typeof e&&(l+=-1===e.indexOf("{")?'<link href="'+e+'" rel="stylesheet" type="text/css"/>':'<style type="text/css">'+e+"</style>"),l+='<script type="text/javascript" src="'+VisualJS.setup.main.visual+'"></script>',l+='<script type="text/javascript" src="'+VisualJS.setup.main.setup+'"></script>',l+='<script type="text/javascript" src="'+VisualJS.setup.main.lazy+'"></script>',l+='</head><body><div id="'+t.id+'" class="'+a+'"></div><script>window.setTimeout(function(){VisualJS.old='+s+"; visual("+JSON.stringify(t)+");},1);</script></body></html>",r(n(),l)},compare:function(t){var e=VisualJS.setup,i=VisualJS.setup.separator,a="string"==typeof t.id?t.id:e.id,l="[object Array]"===Object.prototype.toString.call(t.css)?0===t.css.length?["",""]:1===t.css.length?[t.css[0],t.css[0]]:t.css:[t.css,t.css],s=document,n=s.createElement(e.html.heading),r=s.createElement(e.html.footer),o=s.getElementById(a),u=s.createElement("div"),d=s.createElement("style"),c=function(){VisualJS.getsize(a)
var t=VisualJS.height+2*e.margin,l=VisualJS.width+e.margin,s="iframe{ float: left; width: "+Math.floor((l-i)/2)+"px; height:"+t+"px; }"
o.style.height=t+"px",o.style.width=l+"px",d.styleSheet?d.styleSheet.cssText=s:d.innerHTML=s,u.style.height=t+"px"}
n.innerHTML="string"==typeof t.title?t.title:"",r.innerHTML="string"==typeof t.footer?t.footer:"",r.style.clear="both",o.appendChild(n),o.appendChild(r),s.getElementsByTagName("head")[0].appendChild(d),u.style.width=i+"px","styleFloat"in u.style?u.style.styleFloat="left":u.style.cssFloat="left"
for(var p=0;2>p;p++){var f=s.createElement("span")
"string"!=typeof t.load[p].id&&(t.load[p].id=e.compareids[p]),f.id=t.load[p].id,o.insertBefore(f,r),VisualJS.iframe(t.load[p],l[p])}o.insertBefore(u,f),c(),"undefined"!=typeof window.onorientationchange?window.onorientationchange=c:window.onresize=c},load:function(t){if("undefined"==typeof VisualJS.setup&&window.alert("Visual: Setup not found (visual.setup.js)!"),"[object Array]"!==Object.prototype.toString.call(t))VisualJS.get(t)
else for(var e=0,i=t.length;i>e;e++)VisualJS.get(t[e])},get:function(t){var e=VisualJS.setup,i=e.html,a=e.canvas,l=i.heading,s=i.footer,n=VisualJS.old||e.func.old("ie9")
VisualJS.id="string"==typeof t.id?t.id:e.id,"object"==typeof t.fixed&&(VisualJS.fixed=t.fixed),VisualJS.container[VisualJS.id]="object"==typeof t.unit?{unit:{label:"string"==typeof t.unit.label?t.unit.label:a.unit.label,symbol:"string"==typeof t.unit.symbol?t.unit.symbol:a.unit.symbol,position:"string"==typeof t.unit.position?t.unit.position:a.unit.position}}:{unit:a.unit},VisualJS.container[VisualJS.id].dec="number"==typeof t.dec?t.dec:a.dec,VisualJS.show="boolean"==typeof t.show?t.show:VisualJS.show,VisualJS.autoheading="boolean"==typeof t.autoheading?t.autoheading:a.autoheading,VisualJS.legend="boolean"==typeof t.legend?t.legend:a.legend,VisualJS.lang=t.lang||e.i18n.lang,VisualJS.callback="function"==typeof t.callback?t.callback:VisualJS.callback,VisualJS.grid="object"==typeof t.grid?{width:"number"==typeof t.grid.width?t.grid.width:a.grid.width}:a.grid,VisualJS.axis="object"==typeof t.axis?{x:"boolean"==typeof t.axis.x?t.axis.x:a.axis.x,y:"boolean"==typeof t.axis.y?t.axis.y:a.axis.y}:a.axis
var r="#"+VisualJS.id,o=r+" ."+e.canvasclass
if("cmap"===t.type)if(n)document.getElementById(VisualJS.id).innerHTML="<p>"+e.i18n.text.oldbrowser[VisualJS.lang]+"</p>"
else{if("string"!=typeof t.by)return
VisualJS.addJS(e.lib.maps,!0),VisualJS.addJS(e.lib.d3,!0),VisualJS.addJS(e.map[t.by],!0),VisualJS.chart=function(){var i=VisualJS.map[t.by],n=i.area[0],o=i.area[1],u="object"==typeof t.grouped&&"object"==typeof t.grouped.label&&t.grouped.label.length>0&&t.data[0].hasOwnProperty("group"),d=t.data[0].hasOwnProperty("val"),c=u?t.grouped.label.length:d?e.colors.map.max:1,p=e.colorclassprefix,f=VisualJS.func.colors(e.colors.map.base,c,"fill",p,u&&"object"==typeof t.grouped.color&&t.grouped.color.length===t.grouped.label.length?t.grouped.color:[],VisualJS.id),h=d3.select(r),g=d3.geo[i.projection](),S="object"==typeof i.center&&"function"==typeof g.center?g.center(i.center):g,J=S.scale(i.scale).translate([n/2,o/2]),y=d3.geo.path().projection(J),V=d3.select("#"+e.tooltipid)
VisualJS.canvas=function(){h.html("<"+l+"></"+l+"><"+s+"></"+s+">"),d3.select(r+" "+l).html(VisualJS.getHeading(t)),d3.select(r+" "+s).html(VisualJS.atext(t.footer||"")),VisualJS.getsize(VisualJS.id)
var g,S,J,m,b,x=VisualJS.id,v=d3.map(),w=[],k=function(){},j=function(){},T="number"==typeof t.filter?t.filter:a.filter,E=1-T,H=VisualJS.height/o,M=VisualJS.width/n,W=Math.min(Math.round(n*H),VisualJS.width),z=Math.min(Math.round(o*M),VisualJS.height),B=Math.floor((VisualJS.width-W)/2),$=Math.floor((VisualJS.height-z)/2),I=M>H?H:M,q=h.insert("svg:svg",s).attr("width",W).attr("height",z)
u?(g=d3.map(),k=function(t,e){t.set(e.id,e.group)},S=function(t,e,a){return p+(t.get(a[i.id])-1)},J=function(e,a){var l=t.grouped.label[e.get(a[i.id])-1],s=a[i.label]
return"undefined"!=typeof l&&(s+=" <em>"+l+"</em>"),s}):(d?(S=function(t,e,a,l,s){var n=e.get(a[i.id])
if(l===s)return"undefined"!=typeof n?p+(c/2).toFixed(0):null
var r=d3.scale.quantize().domain([l,s]).range(d3.range(c).map(function(t){return p+t}))
return r(n)},j=VisualJS.func.legend):S=function(t,e,a){return""!==e.get(a[i.id])?"":p+(c-1)},J=function(t,e){return e[i.label]})
for(var L=0,F=t.data,A=F.length;A>L;L++){var N=F[L]
N.hasOwnProperty("val")?null!==N.val&&(v.set(N.id,N.val),w.push(N.val)):v.set(N.id,""),k(g,N)}w.sort(function(t,e){return t-e}),"[object Array]"===Object.prototype.toString.call(t.filter)&&2===t.filter.length&&"number"==typeof t.filter[0]&&"number"==typeof t.filter[1]&&t.filter[0]<t.filter[1]?(m=t.filter[0],b=t.filter[1]):(m=d3.quantile(w,T),b=d3.quantile(w,E)),q.style("margin-left",B+"px"),q.style("margin-top",$+"px"),q.style("margin-bottom",$+"px"),q.append("svg:g").attr("class",e.areaclass).attr("transform","scale("+I+")").selectAll("path").data(i.features).enter().append("svg:path").attr("class",function(t){return S(g,v,t.properties,m,b)}).attr("d",y).on("mousemove",function(t){(d||u||"undefined"!=typeof v.get(t.properties[i.id]))&&VisualJS.showTooltip(VisualJS.tooltipText(x,J(g,t.properties),v.get(t.properties[i.id])),d3.event.pageX,d3.event.pageY)}).on("mouseout",function(){return V.style("display","none")}),VisualJS.legend&&"object"==typeof i.legend&&j(x,VisualJS.tooltipText(x,null,b),VisualJS.tooltipText(x,null,m),f[f.length-1],f[0],q,V,i.area,i.legend)},VisualJS.canvas()}}else{if(VisualJS.addJS(e.lib.jquery,!0)){var u=!1
VisualJS.addJS(e.lib.jquery.flot,!1)}else if(VisualJS.addJS(e.lib.jquery.flot,!0))var u=!1
else var u=!0
n&&VisualJS.addJS(e.lib.excanvas,!0)
var d=function(){},c=[],p=[],f=[],h=t.stacked||!1,g=function(){var i=function(){}
if(h)VisualJS.addJS(e.lib.jquery.flot.stack,u)
else if("tsbar"===t.type){VisualJS.addJS(e.lib.jquery.flot.orderbars,u)
var i=function(t){return t.bars}}return d=function(e,a){for(var l=0,s=a.length;s>l;l++)p.push([l,a[l]]),VisualJS.ticks.push([l,a[l]])
for(var l=0,s=e.length;s>l;l++){for(var n=[],r=e[l].val,o=r.length,u=0;o>u;u++)n.push([u,r[u]])
"tsbar"!==t.type||h||1===s?c.push({label:e[l].label,data:n}):c.push({label:e[l].label,data:n,bars:{show:!0,barWidth:.2,order:l+1,lineWidth:2}})}for(var l=0,d=c.length;d>l;l++)f.push({data:c[l].data,label:c[l].label,bars:i(c[l]),shadowSize:4})
J=d>1},VisualJS.getHeading(t)}
switch(t.type){case"pyram":VisualJS.addJS(e.lib.jquery.flot.pyramid,u),Array.max=function(t){return Math.max.apply(Math,t)}
var S,d=function(t,e,i){S=Math.max(Array.max(t[0].val),Array.max(t[1].val)),c[0]={label:t[0].label,data:[],pyramid:{direction:"L"}},c[1]={label:t[1].label,data:[]}
for(var a=0,l=i.length;l>a;a++)c[0].data[a]=[i[a],t[0].val[a]],c[1].data[a]=[i[a],t[1].val[a]]},J=!0,y=!1,h=!1,V=!1,m=!1,b=!1,x=VisualJS.getHeading(t)
break
case"rank":var v=[],d=function(t){for(var e=0,i=t.length;i>e;e++)p[e]=[e,t[i-e-1][0]],v[e]=[t[i-e-1][1],e]
c={data:v}},J=!1,y=!1,V=!1,m=!1,b=!0,x=VisualJS.getHeading(t)
break
case"bar":VisualJS.addJS(e.lib.jquery.flot.categories,u)
var d=function(t,e,i){if("object"!=typeof i||null===i)c=t
else if("number"==typeof t[0])for(var a=0,l=i.length;l>a;a++)c[a]=[i[a],t[a]]
J=c.length>1},y=!0,V=!1,m=!1,b=!0,x=VisualJS.getHeading(t)
break
case"tsline":var x=g(),y=null,V=!0,m=!0,b=!1
break
case"tsbar":var x=g(),y=!0,V=!1,m=!1,b=!0}VisualJS.chart=function(){d(t.data,t.time,t.by),$.fn.UseTooltip=function(i){var a=[]
$(this).bind("plothover",function(l,s,n){if(n){if(a!=[n.seriesIndex,n.dataIndex]){a=[n.seriesIndex,n.dataIndex]
var r=n.datapoint[0],o=n.datapoint[1],u="bar"!==t.type?n.series.label:c[r][0],d="rank"!==t.type?u:p[o][1],f="rank"!==t.type&&"bar"!==t.type?h||1===c.length?p[r][1]:"pyram"===t.type?c[s.x<0?0:1].data[n.dataIndex][0]:p[n.dataIndex][1]:!1,g="pyram"===t.type?Math.abs(r):"rank"!==t.type?"tsbar"!==t.type?o:h||1===c.length?c[n.seriesIndex].data[r][1]:o:r
VisualJS.showTooltip(VisualJS.tooltipText(i,f?d+" ("+f+")":d,g),s.pageX,s.pageY)}}else $("#"+e.tooltipid).hide(),a=[]})},J=VisualJS.legend&&J
var i={colors:e.colors.series,series:{stack:y,bars:{show:b,barWidth:.7,align:"center",fill:.9},lines:{show:V},points:{show:m,radius:1}},legend:{show:J},grid:{borderWidth:VisualJS.grid.width,hoverable:!0,clickable:!1,mouseActiveRadius:10},xaxis:{show:VisualJS.axis.x},yaxis:{show:VisualJS.axis.y}}
VisualJS.canvas=function(){$(r).html("<"+l+"></"+l+"><"+s+"></"+s+">"),$(r+" "+l).html(x),$(r+" "+s).html(VisualJS.atext(t.footer||"")),VisualJS.getsize(VisualJS.id),$(r+" "+l).after('<div class="'+e.canvasclass+" "+VisualJS.visualsize+'" style="width: '+VisualJS.width+"px; height: "+VisualJS.height+'px;"></div>')
var a=p.length
switch(t.type){case"pyram":i.series.pyramid={show:!0,barWidth:1},i.xaxis.max=1.02*S,i.xaxis.tickFormatter=function(t){return VisualJS.format(t)},$.plot(o,c,i)
break
case"rank":i.series.bars.horizontal=!0,i.yaxis.ticks=VisualJS.height/a>11?p.slice(0):0,i.xaxis.max=1.02*t.data[0][1],i.xaxis.tickFormatter=function(t){return VisualJS.format(t)},i.yaxis.autoscaleMargin=0,i.series.bars.barWidth=.5,$.plot(o,[c],i)
break
case"bar":i.xaxis.mode="categories",i.xaxis.tickLength=0,i.yaxis.tickFormatter=function(t){return VisualJS.format(t)},$.plot(o,[c],i)
break
case"tsline":i.grid.markings=[{color:"#999",lineWidth:1,yaxis:{from:0,to:0}}]
case"tsbar":i.yaxis.tickFormatter=function(t){return VisualJS.format(t)}
var n=VisualJS.width/a,u=[],d="01"
switch(VisualJS.ticks[0][1].length){case 4:if(30>n){for(var h=n>15?2:n>8?3:4,g=0;a>g;g++)u[g]=g%h?[p[g][0],""]:[p[g][0],p[g][1]]
i.xaxis.ticks=u}else i.xaxis.ticks=p
break
case 5:d="1"
case 6:if(35>n){for(var g=0;a>g;g++)u[g]=VisualJS.ticks[g][1].slice(4)!==d?[VisualJS.ticks[g][0],""]:[VisualJS.ticks[g][0],VisualJS.ticks[g][1].slice(0,4)],p[g][1]=VisualJS.tformat(VisualJS.ticks[g][1])
i.xaxis.ticks=u}else{for(var g=0;a>g;g++)p[g][1]=VisualJS.tformat(VisualJS.ticks[g][1])
i.xaxis.ticks=p}break
default:i.xaxis.ticks=p}$.plot(o,f,i)}$(o).UseTooltip(VisualJS.id)},VisualJS.canvas()}}VisualJS.scripts.length&&"object"==typeof LazyLoad?LazyLoad.js(VisualJS.scripts,VisualJS.draw):VisualJS.draw()}}
if("function"!=typeof visual)var visual=VisualJS.load