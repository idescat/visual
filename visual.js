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
var VisualJS={version:"0.9.4",show:!0,old:!1,fixed:null,width:500,bwidth:500,height:500,normal:500,scripts:[],map:{},container:{},func:{},callback:null,draw:function(){var e=!1
"function"==typeof VisualJS.chart&&(VisualJS.tooltip(),VisualJS.show&&VisualJS.chart(),void 0!==window.onorientationchange?window.onorientationchange=VisualJS.canvas:window.onresize=VisualJS.canvas,e=!0),null!==VisualJS.callback&&VisualJS.callback.call({id:VisualJS.id,chart:e})},tooltip:function(){var e=document
if(!e.getElementById(VisualJS.setup.tooltipid)){var a=e.createElement("div")
a.id=VisualJS.setup.tooltipid,a.style.display="none",e.body.appendChild(a)}},getsize:function(e){var a=VisualJS.setup,t=a.html,i=t.heading,l=t.footer,s=window,n=document,r=n.documentElement,o=n.getElementsByTagName("body")[0],u=n.getElementById(e),d=u.getElementsByTagName(i)[0].clientHeight,c=u.getElementsByTagName(l)[0].clientHeight,p=s.innerHeight||r.clientHeight||o.clientHeight,g=0
d||(g+=11),c||(g+=11),void 0!==p&&void 0!==d&&void 0!==c&&(null===VisualJS.fixed?(VisualJS.bwidth=s.innerWidth||r.clientWidth||o.clientWidth,VisualJS.width=VisualJS.bwidth-a.padding.w,VisualJS.height=p-a.padding.h-d-c+g):(VisualJS.bwidth=r.clientWidth||o.clientWidth,VisualJS.width=VisualJS.fixed[0]-a.padding.w,VisualJS.height=VisualJS.fixed[1]-a.padding.h-d-c+g)),VisualJS.visualsize=VisualJS.width<VisualJS.normal?a.mini:a.normal},atext:function(e){return(e+"").replace(/&amp;/g,"&")},getHeading:function(e){if(VisualJS.autoheading===!1)return e.title
var a=[],t=function(e,t){"string"==typeof e&&""!==e&&(t===!0&&(e='<span class="'+VisualJS.setup.nowrapclass+'">'+e+"</span>"),a.push(e))}
if(null!==e.time&&"object"==typeof e.time)var i=VisualJS.tformat(e.time[0]),l=VisualJS.tformat(e.time[e.time.length-1]),s=i+"&ndash;"+l
else var s=VisualJS.tformat(e.time)
return t(e.title,!1),t(e.geo,!0),t(s,!0),VisualJS.atext(a.join(". "))},addJS:function(e,a){return a&&e.exists.call()?!1:(VisualJS.scripts.push(e.js),!0)},showTooltip:function(e,a,t){var i=document.getElementById(VisualJS.setup.tooltipid),l=VisualJS.bwidth-VisualJS.setup.margin,s={}
i.innerHTML=e,i.style.display="block"
var n=i.clientWidth/2
s.x=a-n,s.y=t-i.clientHeight-5,a+n>l?s.x-=a+n-l:s.x<VisualJS.setup.margin&&(s.x+=VisualJS.setup.margin-s.x),s.y<VisualJS.setup.margin&&(s.y+=1.75*i.clientHeight),i.style.left=s.x+"px",i.style.top=s.y+"px"},format:function(e){if(void 0===e||null===e)return VisualJS.setup.i18n.text.na[VisualJS.lang]
if("number"==typeof e){for(var a=e.toFixed(VisualJS.container[VisualJS.id].dec),t=/(\d+)(\d{3})/,i=a.split("."),l=i[0],s=i.length>1?VisualJS.setup.i18n.text.dec[VisualJS.lang]+i[1]:"";t.test(l);)l=l.replace(t,"$1"+VisualJS.setup.i18n.text.k[VisualJS.lang]+"$2")
return l+s}return""},tformat:function(e){if(!e)return null
if(isNaN(e))return e
switch(e.length){case 5:var a="quarter"
break
case 6:var a="month"
break
default:return e}var t=VisualJS.setup.i18n.text[a]
if(void 0===t)return e
var i=t[VisualJS.lang]
if(void 0===i)return e
var l=i[e.slice(4)-1]
return void 0===l?e:l+" <span>"+e.slice(0,4)+"</span>"},tooltipText:function(e,a,t){var i="number"==typeof t?" "+VisualJS.container[e].unit.label:"",l="number"==typeof t?VisualJS.container[e].unit.symbol:"",s=VisualJS.format(t),n=s!==VisualJS.setup.i18n.text.na[VisualJS.lang]?"end"===VisualJS.container[e].unit.position?s+i+" "+l:l+s+i:s
return a?"<strong>"+n+"</strong> "+a:n},iframe:function(e,a){var t=VisualJS.setup,i="string"==typeof e.clas?e.clas:t.clas,l='<!DOCTYPE html>\n<!--[if lt IE 7]><html class="lt-ie9 lt-ie8 lt-ie7"> <![endif]-->\n<!--[if IE 7]><html class="lt-ie9 lt-ie8"> <![endif]-->\n<!--[if IE 8]><html class="lt-ie9"> <![endif]-->\n<!--[if gt IE 8]><!--> <html> <!--<![endif]-->\n<head>',s=function(){var a=document,t=a.createElement("iframe"),i=a.getElementById(e.id)
return t.frameBorder="0",t.scrolling="no",i.parentNode.insertBefore(t,i.nextSibling),t},n=function(e,a){if(void 0!==e){var t
e.contentDocument?t=e.contentDocument:e.contentWindow?t=e.contentWindow.document:window.frames[e.name]&&(t=window.frames[e.name].document),t&&(t.open(),t.write(a),t.close())}}
"string"==typeof a&&(l+=-1===a.indexOf("{")?'<link href="'+a+'" rel="stylesheet" type="text/css"/>':'<style type="text/css">'+a+"</style>"),l+='<script type="text/javascript" src="'+VisualJS.setup.main.visual+'"></script>',l+='<script type="text/javascript" src="'+VisualJS.setup.main.setup+'"></script>',l+='<script type="text/javascript" src="'+VisualJS.setup.main.lazy+'"></script>',l+='</head><body><div id="'+e.id+'" class="'+i+'"></div><script>window.setTimeout(function(){visual('+JSON.stringify(e)+");},1);</script></body></html>",n(s(),l)},compare:function(e){var a=VisualJS.setup,t=VisualJS.setup.separator,i="string"==typeof e.id?e.id:a.id,l="[object Array]"===Object.prototype.toString.call(e.css)?0===e.css.length?["",""]:1===e.css.length?[e.css[0],e.css[0]]:e.css:[e.css,e.css],s=document,n=s.createElement(a.html.heading),r=s.createElement(a.html.footer),o=s.getElementById(i),u=s.createElement("div"),d=s.createElement("style"),c=function(){VisualJS.getsize(i)
var l=VisualJS.height+("string"==typeof e.footer&&""!==e.footer?14:0),s=VisualJS.width+a.margin,n="iframe{ float: left; width: "+Math.floor((s-t)/2-a.margin)+"px; height:"+l+"px; }"
d.styleSheet?d.styleSheet.cssText=n:d.innerHTML=n,u.style.height=l+"px"}
n.innerHTML="string"==typeof e.title?e.title:"",r.innerHTML="string"==typeof e.footer?e.footer:"",r.style.clear="both",o.appendChild(n),o.appendChild(r),s.getElementsByTagName("head")[0].appendChild(d),u.style.width=t+"px","styleFloat"in u.style?u.style.styleFloat="left":u.style.cssFloat="left"
for(var p=0;2>p;p++){var g=s.createElement("span")
"string"!=typeof e.load[p].id&&(e.load[p].id=a.compareids[p]),g.id=e.load[p].id,o.insertBefore(g,r),VisualJS.iframe(e.load[p],l[p])}o.insertBefore(u,g),c(),void 0!==window.onorientationchange?window.onorientationchange=c:window.onresize=c},load:function(e){if(void 0===VisualJS.setup&&window.alert("Visual: Setup not found (visual.setup.js)!"),"[object Array]"!==Object.prototype.toString.call(e))VisualJS.get(e)
else for(var a=0,t=e.length;t>a;a++)VisualJS.get(e[a])},get:function(e){var a=VisualJS.setup,t=a.html,i=a.canvas,l=t.heading,s=t.footer,n=VisualJS.old||a.func.old("ie9"),r=function(e){return void 0!==e&&"[object Array]"===Object.prototype.toString.call(e)&&2===e.length&&"number"==typeof e[0]&&"number"==typeof e[1]&&e[0]<e[1]?!0:!1}
VisualJS.id="string"==typeof e.id?e.id:a.id,"object"==typeof e.fixed&&(VisualJS.fixed=e.fixed),VisualJS.container[VisualJS.id]="object"==typeof e.unit&&null!==e.unit?{unit:{label:"string"==typeof e.unit.label?e.unit.label:i.unit.label,symbol:"string"==typeof e.unit.symbol?e.unit.symbol:i.unit.symbol,position:"string"==typeof e.unit.position?e.unit.position:i.unit.position}}:{unit:i.unit},VisualJS.container[VisualJS.id].dec="number"==typeof e.dec?e.dec:i.dec,VisualJS.show="boolean"==typeof e.show?e.show:VisualJS.show,VisualJS.autoheading="boolean"==typeof e.autoheading?e.autoheading:i.autoheading,VisualJS.legend="boolean"==typeof e.legend?e.legend:i.legend,VisualJS.lang=e.lang||a.i18n.lang,VisualJS.callback="function"==typeof e.callback?e.callback:VisualJS.callback,VisualJS.range="number"==typeof e.range||r(e.range)?e.range:i.range.hasOwnProperty(e.type)&&"number"==typeof i.range[e.type]?i.range[e.type]:null,VisualJS.grid="object"==typeof e.grid?{border:"number"==typeof e.grid.border?e.grid.border:i.grid.border,shadow:"number"==typeof e.grid.shadow?e.grid.shadow:i.grid.shadow,line:"number"==typeof e.grid.line?e.grid.line:i.grid.line,point:"number"==typeof e.grid.point?e.grid.point:i.grid.point}:i.grid,VisualJS.axis="object"==typeof e.axis?{x:"boolean"==typeof e.axis.x?e.axis.x:i.axis.x,y:"boolean"==typeof e.axis.y?e.axis.y:i.axis.y}:i.axis
var o="#"+VisualJS.id,u=o+" ."+a.canvasclass
if("cmap"===e.type)if(n)document.getElementById(VisualJS.id).innerHTML="<p>"+a.i18n.text.oldbrowser[VisualJS.lang]+"</p>"
else{if("string"!=typeof e.by)return
VisualJS.addJS(a.lib.maps,!0),VisualJS.addJS(a.lib.d3,!0),VisualJS.addJS(a.map[e.by],!0),VisualJS.chart=function(){var t=VisualJS.map[e.by],i=t.area[0],n=t.area[1],r="object"==typeof e.grouped&&"object"==typeof e.grouped.label&&e.grouped.label.length>0&&e.data[0].hasOwnProperty("group"),u=e.data[0].hasOwnProperty("val"),d=r?e.grouped.label.length:u?a.colors.map.max:1,c=a.colorclassprefix,p=VisualJS.func.colors(a.colors.map.base,d,"fill",c,r&&"object"==typeof e.grouped.color&&e.grouped.color.length===e.grouped.label.length?e.grouped.color:[],VisualJS.id),g=d3.select(o),f=d3.geo[t.projection](),S="object"==typeof t.center&&"function"==typeof f.center?f.center(t.center):f,J=S.scale(t.scale).translate([i/2,n/2]),h=d3.geo.path().projection(J),V=d3.select("#"+a.tooltipid)
VisualJS.canvas=function(){g.html("<"+l+"></"+l+"><"+s+"></"+s+">"),d3.select(o+" "+l).html(VisualJS.getHeading(e)),d3.select(o+" "+s).html(VisualJS.atext(e.footer||"")),VisualJS.getsize(VisualJS.id)
var f,S,J,y,m,b=VisualJS.id,x=d3.map(),v=[],w=function(){},k=function(){},j=VisualJS.height/n,E=VisualJS.width/i,T=Math.min(Math.round(i*j),VisualJS.width),H=Math.min(Math.round(n*E),VisualJS.height),I=Math.floor((VisualJS.width-T)/2),M=Math.floor((VisualJS.height-H)/2),W=E>j?j:E,z=g.insert("svg:svg",s).attr("width",T).attr("height",H)
r?(f=d3.map(),w=function(e,a){e.set(a.id,a.group)},S=function(e,a,i){return c+(e.get(i[t.id])-1)},J=function(a,i){var l=e.grouped.label[a.get(i[t.id])-1],s=i[t.label]
return void 0!==l&&(s+=" <em>"+l+"</em>"),s}):(u?(S=function(e,a,i,l,s){var n=a.get(i[t.id])
if(l===s)return void 0!==n?c+(d/2).toFixed(0):null
var r=d3.scale.quantize().domain([l,s]).range(d3.range(d).map(function(e){return c+e}))
return r(n)},k=VisualJS.func.legend):S=function(e,a,i){return""!==a.get(i[t.id])?"":c+(d-1)},J=function(e,a){return a[t.label]})
for(var B=0,$=e.data,q=$.length;q>B;B++){var L=$[B]
L.hasOwnProperty("val")?null!==L.val&&(x.set(L.id,L.val),v.push(L.val)):x.set(L.id,""),w(f,L)}v.sort(function(e,a){return e-a})
var O=v[0],F=v[q-1]
"number"==typeof VisualJS.range?(y=d3.quantile(v,VisualJS.range),m=d3.quantile(v,1-VisualJS.range)):(y=VisualJS.range[0],m=VisualJS.range[1]),z.style("margin-left",I+"px"),z.style("margin-top",M+"px"),z.style("margin-bottom",M+"px"),z.append("svg:g").attr("class",a.areaclass).attr("transform","scale("+W+")").selectAll("path").data(t.features).enter().append("svg:path").attr("class",function(e){return S(f,x,e.properties,y,m)}).attr("d",h).on("mousemove",function(e){(u||r||void 0!==x.get(e.properties[t.id]))&&VisualJS.showTooltip(VisualJS.tooltipText(b,J(f,e.properties),x.get(e.properties[t.id])),d3.event.pageX,d3.event.pageY)}).on("mouseout",function(){return V.style("display","none")}),VisualJS.legend&&"object"==typeof t.legend&&k([VisualJS.tooltipText(b,null,y),VisualJS.tooltipText(b,null,m)],[p[p.length-1],p[0]],z,V,t.area,t.legend,[O>y||VisualJS.format(y)===VisualJS.format(O),m>F||VisualJS.format(m)===VisualJS.format(F)])},VisualJS.canvas()}}else{if(VisualJS.addJS(a.lib.jquery,!0)){var d=!1
VisualJS.addJS(a.lib.jquery.flot,!1)}else if(VisualJS.addJS(a.lib.jquery.flot,!0))var d=!1
else var d=!0
n&&VisualJS.addJS(a.lib.excanvas,!0)
var c=function(){},p=[],g=[],f=[],S=e.stacked||!1,J=function(){var t=function(){}
if(S)VisualJS.addJS(a.lib.jquery.flot.stack,d)
else if("tsbar"===e.type){VisualJS.addJS(a.lib.jquery.flot.orderbars,d)
var t=function(e){return e.bars}}return c=function(a,i){VisualJS.ticks=[]
for(var l=0,s=i.length;s>l;l++)g.push([l,i[l]]),VisualJS.ticks.push([l,i[l]])
for(var l=0,s=a.length;s>l;l++){for(var n=[],r=a[l].val,o=r.length,u=0;o>u;u++)n.push([u,r[u]])
"tsbar"!==e.type||S||1===s?p.push({label:a[l].label,data:n}):p.push({label:a[l].label,data:n,bars:{show:!0,barWidth:.2,order:l+1,lineWidth:2}})}for(var l=0,d=p.length;d>l;l++)f.push({data:p[l].data,label:p[l].label,bars:t(p[l]),shadowSize:VisualJS.grid.shadow})
V=d>1},VisualJS.getHeading(e)}
switch(e.type){case"pyram":VisualJS.addJS(a.lib.jquery.flot.pyramid,d),Array.max=function(e){return Math.max.apply(Math,e)}
var h,c=function(e,a,t){h=Math.max(Array.max(e[0].val),Array.max(e[1].val)),p[0]={label:e[0].label,data:[],pyramid:{direction:"L"}},p[1]={label:e[1].label,data:[]}
for(var i=0,l=t.length;l>i;i++)p[0].data[i]=[t[i],e[0].val[i]],p[1].data[i]=[t[i],e[1].val[i]]},V=!0,y=!1,S=!1,m=!1,b=!1,x=!1,v=VisualJS.getHeading(e)
break
case"rank":var w=[],c=function(e){for(var a=0,t=e.length;t>a;a++)g[a]=[a,e[t-a-1][0]],w[a]=[e[t-a-1][1],a]
p={data:w}},V=!1,y=!1,m=!1,b=!1,x=!0,v=VisualJS.getHeading(e)
break
case"bar":VisualJS.addJS(a.lib.jquery.flot.categories,d)
var c=function(e,a,t){if("object"!=typeof t||null===t)for(var i=0,l=e.length;l>i;i++)p[i]=['<span style="padding: 0 2.5em">'+e[i][0]+"</span>",e[i][1]]
else if("number"==typeof e[0])for(var i=0,l=t.length;l>i;i++)p[i]=['<span style="padding: 0 2.5em">'+t[i]+"</span>",e[i]]
V=p.length>1},y=!0,m=!1,b=!1,x=!0,v=VisualJS.getHeading(e)
break
case"tsline":var v=J(),y=null,m=!0,b=!0,x=!1
break
case"tsbar":var v=J(),y=!0,m=!1,b=!1,x=!0}VisualJS.chart=function(){c(e.data,e.time,e.by),$.fn.UseTooltip=function(t){var i=[]
$(this).bind("plothover",function(l,s,n){if(n){if(i!=[n.seriesIndex,n.dataIndex]){i=[n.seriesIndex,n.dataIndex]
var r=n.datapoint[0],o=n.datapoint[1],u="bar"!==e.type?n.series.label:p[r][0],d="rank"!==e.type?u:g[o][1],c="rank"!==e.type&&"bar"!==e.type?S||1===p.length?g[r][1]:"pyram"===e.type?p[s.x<0?0:1].data[n.dataIndex][0]:g[n.dataIndex][1]:!1,f="pyram"===e.type?Math.abs(r):"rank"!==e.type?"tsbar"!==e.type?o:S||1===p.length?p[n.seriesIndex].data[r][1]:o:r
VisualJS.showTooltip(VisualJS.tooltipText(t,c?d+" ("+c+")":d,f),s.pageX,s.pageY)}}else $("#"+a.tooltipid).hide(),i=[]})},V=VisualJS.legend&&V
var t={colors:a.colors.series,series:{stack:y,bars:{show:x,barWidth:.7,align:"center",fill:.9},lines:{show:m,lineWidth:VisualJS.grid.line},points:{show:b,radius:VisualJS.grid.point}},legend:{show:V},grid:{borderWidth:VisualJS.grid.border,hoverable:!0,clickable:!1,mouseActiveRadius:10},xaxis:{show:VisualJS.axis.x},yaxis:{show:VisualJS.axis.y}}
VisualJS.canvas=function(){$(o).html("<"+l+"></"+l+"><"+s+"></"+s+">"),$(o+" "+l).html(v),$(o+" "+s).html(VisualJS.atext(e.footer||"")),VisualJS.getsize(VisualJS.id),$(o+" "+l).after('<div class="'+a.canvasclass+" "+VisualJS.visualsize+'" style="width: '+VisualJS.width+"px; height: "+VisualJS.height+'px;"></div>')
var i=g.length
switch(e.type){case"pyram":t.series.pyramid={show:!0,barWidth:1},t.yaxis.show=VisualJS.height/p[0].data.length>11?VisualJS.axis.y:!1,t.xaxis.max="number"==typeof VisualJS.range?h*VisualJS.range:VisualJS.range[1],t.xaxis.tickFormatter=function(e){return VisualJS.format(e)},$.plot(u,p,t)
break
case"rank":t.series.bars.horizontal=!0,t.yaxis.ticks=VisualJS.height/i>11?g.slice(0):0,"number"==typeof VisualJS.range?t.xaxis.max=e.data[0][1]*VisualJS.range:(t.xaxis.min=VisualJS.range[0],t.xaxis.max=VisualJS.range[1]),t.xaxis.tickFormatter=function(e){return VisualJS.format(e)},t.yaxis.autoscaleMargin=0,t.series.bars.barWidth=.5,$.plot(u,[p],t)
break
case"bar":t.xaxis.mode="categories",t.xaxis.tickLength=0,t.yaxis.tickFormatter=function(e){return VisualJS.format(e)},"number"!=typeof VisualJS.range&&null!==VisualJS.range&&(t.yaxis.min=VisualJS.range[0],t.yaxis.max=VisualJS.range[1]),$.plot(u,[p],t)
break
case"tsline":t.grid.markings=[{color:"#999",lineWidth:.5,yaxis:{from:0,to:0}}]
case"tsbar":t.yaxis.tickFormatter=function(e){return VisualJS.format(e)}
var n=VisualJS.width/i,r=[],d="01"
switch("number"!=typeof VisualJS.range&&null!==VisualJS.range&&(t.yaxis.min=VisualJS.range[0],t.yaxis.max=VisualJS.range[1]),VisualJS.ticks[0][1].length){case 4:if(30>n){for(var c=n>15?2:n>8?3:4,S=0;i>S;S++)r[S]=S%c?[g[S][0],""]:[g[S][0],g[S][1]]
t.xaxis.ticks=r}else t.xaxis.ticks=g
break
case 5:d="1"
case 6:if(35>n){for(var S=0;i>S;S++)r[S]=VisualJS.ticks[S][1].slice(4)!==d?[VisualJS.ticks[S][0],""]:[VisualJS.ticks[S][0],VisualJS.ticks[S][1].slice(0,4)],g[S][1]=VisualJS.tformat(VisualJS.ticks[S][1])
t.xaxis.ticks=r}else{for(var S=0;i>S;S++)g[S][1]=VisualJS.tformat(VisualJS.ticks[S][1])
t.xaxis.ticks=g}break
default:t.xaxis.ticks=g}$.plot(u,f,t)}$(u).UseTooltip(VisualJS.id)},VisualJS.canvas()}}VisualJS.scripts.length&&"object"==typeof LazyLoad?LazyLoad.js(VisualJS.scripts,VisualJS.draw):VisualJS.draw()}}
if("function"!=typeof visual)var visual=VisualJS.load
