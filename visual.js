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
var VisualJS={version:"0.9.5",show:!0,old:!1,fixed:null,width:500,bwidth:500,height:500,normal:500,scripts:[],map:{},container:{},func:{},callback:null,draw:function(){var a=!1
"function"==typeof VisualJS.chart&&(VisualJS.tooltip(),VisualJS.show&&VisualJS.chart(),void 0!==window.onorientationchange?window.onorientationchange=VisualJS.canvas:window.onresize=VisualJS.canvas,a=!0),null!==VisualJS.callback&&VisualJS.callback.call({id:VisualJS.id,chart:a})},tooltip:function(){var a=document
if(!a.getElementById(VisualJS.setup.tooltipid)){var e=a.createElement("div")
e.id=VisualJS.setup.tooltipid,e.style.display="none",a.body.appendChild(e)}},getsize:function(a){var e=VisualJS.setup,t=e.html,i=t.heading,l=t.footer,s=window,n=document,r=n.documentElement,o=n.getElementsByTagName("body")[0],u=n.getElementById(a),d=u.getElementsByTagName(i)[0].clientHeight,c=u.getElementsByTagName(l)[0].clientHeight,p=s.innerHeight||r.clientHeight||o.clientHeight,g=0
d||(g+=11),c||(g+=11),void 0!==p&&void 0!==d&&void 0!==c&&(null===VisualJS.fixed?(VisualJS.bwidth=s.innerWidth||r.clientWidth||o.clientWidth,VisualJS.width=VisualJS.bwidth-e.padding.w,VisualJS.height=p-e.padding.h-d-c+g):(VisualJS.bwidth=r.clientWidth||o.clientWidth,VisualJS.width=VisualJS.fixed[0]-e.padding.w,VisualJS.height=VisualJS.fixed[1]-e.padding.h-d-c+g)),VisualJS.visualsize=VisualJS.width<VisualJS.normal?e.mini:e.normal},atext:function(a){return(a+"").replace(/&amp;/g,"&")},getHeading:function(a){if(VisualJS.autoheading===!1)return a.title
var e=[],t=function(a,t){"string"==typeof a&&""!==a&&(t===!0&&(a='<span class="'+VisualJS.setup.nowrapclass+'">'+a+"</span>"),e.push(a))}
if(null!==a.time&&"object"==typeof a.time)var i=VisualJS.tformat(a.time[0],VisualJS.id),l=VisualJS.tformat(a.time[a.time.length-1],VisualJS.id),s=i+"&ndash;"+l
else var s=VisualJS.tformat(a.time,VisualJS.id)
return t(a.title,!1),t(a.geo,!0),t(s,!0),VisualJS.atext(e.join(". "))},addJS:function(a,e){return e&&a.exists.call()?!1:(VisualJS.scripts.push(a.js),!0)},showTooltip:function(a,e,t){var i=document.getElementById(VisualJS.setup.tooltipid),l=VisualJS.bwidth-VisualJS.setup.margin,s={}
i.innerHTML=a,i.style.display="block"
var n=i.clientWidth/2
s.x=e-n,s.y=t-i.clientHeight-5,e+n>l?s.x-=e+n-l:s.x<VisualJS.setup.margin&&(s.x+=VisualJS.setup.margin-s.x),s.y<VisualJS.setup.margin&&(s.y+=1.75*i.clientHeight),i.style.left=s.x+"px",i.style.top=s.y+"px"},format:function(a,e){if(void 0===a||null===a)return VisualJS.setup.i18n.text.na[VisualJS.container[e].lang]
if("number"==typeof a){for(var t=a.toFixed(VisualJS.container[e].dec),i=/(\d+)(\d{3})/,l=t.split("."),s=l[0],n=l.length>1?VisualJS.setup.i18n.text.dec[VisualJS.container[e].lang]+l[1]:"";i.test(s);)s=s.replace(i,"$1"+VisualJS.setup.i18n.text.k[VisualJS.container[e].lang]+"$2")
return s+n}return""},tformat:function(a,e){if(!a)return null
if(isNaN(a))return a
switch(a.length){case 5:var t="quarter"
break
case 6:var t="month"
break
default:return a}var i=VisualJS.setup.i18n.text[t]
if(void 0===i)return a
var l=i[VisualJS.container[e].lang]
if(void 0===l)return a
var s=l[a.slice(4)-1]
return void 0===s?a:s+" <span>"+a.slice(0,4)+"</span>"},tooltipText:function(a,e,t){var i="number"==typeof t?" "+VisualJS.container[a].unit.label:"",l="number"==typeof t?VisualJS.container[a].unit.symbol:"",s=VisualJS.format(t,a),n=s!==VisualJS.setup.i18n.text.na[VisualJS.container[a].lang]?"end"===VisualJS.container[a].unit.position?s+i+" "+l:l+s+i:s
return e?"<strong>"+n+"</strong> "+e:n},iframe:function(a,e){var t=VisualJS.setup,i="string"==typeof a.clas?a.clas:t.clas,l='<!DOCTYPE html>\n<!--[if lt IE 7]><html class="lt-ie9 lt-ie8 lt-ie7"> <![endif]-->\n<!--[if IE 7]><html class="lt-ie9 lt-ie8"> <![endif]-->\n<!--[if IE 8]><html class="lt-ie9"> <![endif]-->\n<!--[if gt IE 8]><!--> <html> <!--<![endif]-->\n<head>',s=function(){var e=document,t=e.createElement("iframe"),i=e.getElementById(a.id)
return t.frameBorder="0",t.scrolling="no",i.parentNode.insertBefore(t,i.nextSibling),t},n=function(a,e){if(void 0!==a){var t
a.contentDocument?t=a.contentDocument:a.contentWindow?t=a.contentWindow.document:window.frames[a.name]&&(t=window.frames[a.name].document),t&&(t.open(),t.write(e),t.close())}}
"string"==typeof e&&(l+=-1===e.indexOf("{")?'<link href="'+e+'" rel="stylesheet" type="text/css"/>':'<style type="text/css">'+e+"</style>"),l+='<script type="text/javascript" src="'+VisualJS.setup.main.visual+'"></script>',l+='<script type="text/javascript" src="'+VisualJS.setup.main.setup+'"></script>',l+='<script type="text/javascript" src="'+VisualJS.setup.main.lazy+'"></script>',l+='</head><body><div id="'+a.id+'" class="'+i+'"></div><script>window.setTimeout(function(){visual('+JSON.stringify(a)+");},1);</script></body></html>",n(s(),l)},compare:function(a){var e=VisualJS.setup,t=VisualJS.setup.separator,i="string"==typeof a.id?a.id:e.id,l="[object Array]"===Object.prototype.toString.call(a.css)?0===a.css.length?["",""]:1===a.css.length?[a.css[0],a.css[0]]:a.css:[a.css,a.css],s=document,n=s.createElement(e.html.heading),r=s.createElement(e.html.footer),o=s.getElementById(i),u=s.createElement("div"),d=s.createElement("style"),c=function(){VisualJS.getsize(i)
var l=VisualJS.height+("string"==typeof a.footer&&""!==a.footer?14:0),s=VisualJS.width+e.margin,n="iframe{ float: left; width: "+Math.floor((s-t)/2-e.margin)+"px; height:"+l+"px; }"
d.styleSheet?d.styleSheet.cssText=n:d.innerHTML=n,u.style.height=l+"px"}
n.innerHTML="string"==typeof a.title?a.title:"",r.innerHTML="string"==typeof a.footer?a.footer:"",r.style.clear="both",o.appendChild(n),o.appendChild(r),s.getElementsByTagName("head")[0].appendChild(d),u.style.width=t+"px","styleFloat"in u.style?u.style.styleFloat="left":u.style.cssFloat="left"
for(var p=0;2>p;p++){var g=s.createElement("span")
"string"!=typeof a.load[p].id&&(a.load[p].id=e.compareids[p]),g.id=a.load[p].id,o.insertBefore(g,r),VisualJS.iframe(a.load[p],l[p])}o.insertBefore(u,g),c(),void 0!==window.onorientationchange?window.onorientationchange=c:window.onresize=c},load:function(a){if(void 0===VisualJS.setup&&window.alert("Visual: Setup not found (visual.setup.js)!"),"[object Array]"!==Object.prototype.toString.call(a))VisualJS.get(a)
else for(var e=0,t=a.length;t>e;e++)VisualJS.get(a[e])},get:function(a){var e=VisualJS.setup,t=e.html,i=e.canvas,l=t.heading,s=t.footer,n=VisualJS.old||e.func.old("ie9"),r=function(a){return void 0!==a&&"[object Array]"===Object.prototype.toString.call(a)&&2===a.length&&"number"==typeof a[0]&&"number"==typeof a[1]&&a[0]<a[1]?!0:!1}
VisualJS.id="string"==typeof a.id?a.id:e.id,"object"==typeof a.fixed&&(VisualJS.fixed=a.fixed),VisualJS.container[VisualJS.id]="object"==typeof a.unit&&null!==a.unit?{unit:{label:"string"==typeof a.unit.label?a.unit.label:i.unit.label,symbol:"string"==typeof a.unit.symbol?a.unit.symbol:i.unit.symbol,position:"string"==typeof a.unit.position?a.unit.position:i.unit.position}}:{unit:i.unit},VisualJS.container[VisualJS.id].dec="number"==typeof a.dec?a.dec:i.dec,VisualJS.show="boolean"==typeof a.show?a.show:VisualJS.show,VisualJS.autoheading="boolean"==typeof a.autoheading?a.autoheading:i.autoheading,VisualJS.legend="boolean"==typeof a.legend?a.legend:i.legend,VisualJS.lang=a.lang||e.i18n.lang,VisualJS.container[VisualJS.id].lang=a.lang||e.i18n.lang,VisualJS.callback="function"==typeof a.callback?a.callback:VisualJS.callback,VisualJS.range="number"==typeof a.range||r(a.range)?a.range:i.range.hasOwnProperty(a.type)&&"number"==typeof i.range[a.type]?i.range[a.type]:null,VisualJS.grid="object"==typeof a.grid?{border:"number"==typeof a.grid.border?a.grid.border:i.grid.border,shadow:"number"==typeof a.grid.shadow?a.grid.shadow:i.grid.shadow,line:"number"==typeof a.grid.line?a.grid.line:i.grid.line,point:"number"==typeof a.grid.point?a.grid.point:i.grid.point}:i.grid,VisualJS.axis="object"==typeof a.axis?{x:"boolean"==typeof a.axis.x?a.axis.x:i.axis.x,y:"boolean"==typeof a.axis.y?a.axis.y:i.axis.y}:i.axis
var o="#"+VisualJS.id,u=o+" ."+e.canvasclass
if("cmap"===a.type)if(n)document.getElementById(VisualJS.id).innerHTML="<p>"+e.i18n.text.oldbrowser[VisualJS.container[VisualJS.id].lang]+"</p>"
else{if("string"!=typeof a.by)return
VisualJS.addJS(e.lib.maps,!0),VisualJS.addJS(e.lib.d3,!0),VisualJS.addJS(e.map[a.by],!0),VisualJS.chart=function(){var t=VisualJS.map[a.by],i=t.area[0],n=t.area[1],r="object"==typeof a.grouped&&"object"==typeof a.grouped.label&&a.grouped.label.length>0&&a.data[0].hasOwnProperty("group"),u=a.data[0].hasOwnProperty("val"),d=r?a.grouped.label.length:u?e.colors.map.max:1,c=e.colorclassprefix,p=VisualJS.func.colors(e.colors.map.base,d,"fill",c,r&&"object"==typeof a.grouped.color&&a.grouped.color.length===a.grouped.label.length?a.grouped.color:[],VisualJS.id),g=d3.select(o),f=d3.geo[t.projection](),S="object"==typeof t.center&&"function"==typeof f.center?f.center(t.center):f,J=S.scale(t.scale).translate([i/2,n/2]),h=d3.geo.path().projection(J),V=d3.select("#"+e.tooltipid)
VisualJS.canvas=function(){g.html("<"+l+"></"+l+"><"+s+"></"+s+">"),d3.select(o+" "+l).html(VisualJS.getHeading(a)),d3.select(o+" "+s).html(VisualJS.atext(a.footer||"")),VisualJS.getsize(VisualJS.id)
var f,S,J,y,m,b=VisualJS.id,x=d3.map(),v=[],w=function(){},k=function(){},j=VisualJS.height/n,E=VisualJS.width/i,T=Math.min(Math.round(i*j),VisualJS.width),H=Math.min(Math.round(n*E),VisualJS.height),I=Math.floor((VisualJS.width-T)/2),M=Math.floor((VisualJS.height-H)/2),W=E>j?j:E,z=g.insert("svg:svg",s).attr("width",T).attr("height",H)
r?(f=d3.map(),w=function(a,e){a.set(e.id,e.group)},S=function(a,e,i){return c+(a.get(i[t.id])-1)},J=function(e,i){var l=a.grouped.label[e.get(i[t.id])-1],s=i[t.label]
return void 0!==l&&(s+=" <em>"+l+"</em>"),s}):(u?(S=function(a,e,i,l,s){var n=e.get(i[t.id])
if(l===s)return void 0!==n?c+(d/2).toFixed(0):null
var r=d3.scale.quantize().domain([l,s]).range(d3.range(d).map(function(a){return c+a}))
return r(n)},k=VisualJS.func.legend):S=function(a,e,i){return""!==e.get(i[t.id])?"":c+(d-1)},J=function(a,e){return e[t.label]})
for(var B=0,$=a.data,q=$.length;q>B;B++){var L=$[B]
L.hasOwnProperty("val")?null!==L.val&&(x.set(L.id,L.val),v.push(L.val)):x.set(L.id,""),w(f,L)}v.sort(function(a,e){return a-e})
var O=v[0],F=v[q-1]
"number"==typeof VisualJS.range?(y=d3.quantile(v,VisualJS.range),m=d3.quantile(v,1-VisualJS.range)):(y=VisualJS.range[0],m=VisualJS.range[1]),z.style("margin-left",I+"px"),z.style("margin-top",M+"px"),z.style("margin-bottom",M+"px"),z.append("svg:g").attr("class",e.areaclass).attr("transform","scale("+W+")").selectAll("path").data(t.features).enter().append("svg:path").attr("class",function(a){return S(f,x,a.properties,y,m)}).attr("d",h).on("mousemove",function(a){(u||r||void 0!==x.get(a.properties[t.id]))&&VisualJS.showTooltip(VisualJS.tooltipText(b,J(f,a.properties),x.get(a.properties[t.id])),d3.event.pageX,d3.event.pageY)}).on("mouseout",function(){return V.style("display","none")}),VisualJS.legend&&"object"==typeof t.legend&&k([VisualJS.tooltipText(b,null,y),VisualJS.tooltipText(b,null,m)],[p[p.length-1],p[0]],z,V,t.area,t.legend,[O>y||VisualJS.format(y,b)===VisualJS.format(O,b),m>F||VisualJS.format(m,b)===VisualJS.format(F,b)])},VisualJS.canvas()}}else{if(VisualJS.addJS(e.lib.jquery,!0)){var d=!1
VisualJS.addJS(e.lib.jquery.flot,!1)}else if(VisualJS.addJS(e.lib.jquery.flot,!0))var d=!1
else var d=!0
n&&VisualJS.addJS(e.lib.excanvas,!0)
var c=function(){},p=[],g=[],f=[],S=a.stacked||!1,J=function(){var t=function(){}
if(S)VisualJS.addJS(e.lib.jquery.flot.stack,d)
else if("tsbar"===a.type){VisualJS.addJS(e.lib.jquery.flot.orderbars,d)
var t=function(a){return a.bars}}return c=function(e,i){VisualJS.ticks=[]
for(var l=0,s=i.length;s>l;l++)g.push([l,i[l]]),VisualJS.ticks.push([l,i[l]])
for(var l=0,s=e.length;s>l;l++){for(var n=[],r=e[l].val,o=r.length,u=0;o>u;u++)n.push([u,r[u]])
"tsbar"!==a.type||S||1===s?p.push({label:e[l].label,data:n}):p.push({label:e[l].label,data:n,bars:{show:!0,barWidth:.2,order:l+1,lineWidth:2}})}for(var l=0,d=p.length;d>l;l++)f.push({data:p[l].data,label:p[l].label,bars:t(p[l]),shadowSize:VisualJS.grid.shadow})
V=d>1},VisualJS.getHeading(a)}
switch(a.type){case"pyram":VisualJS.addJS(e.lib.jquery.flot.pyramid,d),Array.max=function(a){return Math.max.apply(Math,a)}
var h,c=function(a,e,t){h=Math.max(Array.max(a[0].val),Array.max(a[1].val)),p[0]={label:a[0].label,data:[],pyramid:{direction:"L"}},p[1]={label:a[1].label,data:[]}
for(var i=0,l=t.length;l>i;i++)p[0].data[i]=[t[i],a[0].val[i]],p[1].data[i]=[t[i],a[1].val[i]]},V=!0,y=!1,S=!1,m=!1,b=!1,x=!1,v=VisualJS.getHeading(a)
break
case"rank":var w=[],c=function(a){for(var e=0,t=a.length;t>e;e++)g[e]=[e,a[t-e-1][0]],w[e]=[a[t-e-1][1],e]
p={data:w}},V=!1,y=!1,m=!1,b=!1,x=!0,v=VisualJS.getHeading(a)
break
case"bar":VisualJS.addJS(e.lib.jquery.flot.categories,d)
var c=function(a,e,t){if("object"!=typeof t||null===t)for(var i=0,l=a.length;l>i;i++)p[i]=['<span style="padding: 0 2.5em">'+a[i][0]+"</span>",a[i][1]]
else if("number"==typeof a[0])for(var i=0,l=t.length;l>i;i++)p[i]=['<span style="padding: 0 2.5em">'+t[i]+"</span>",a[i]]
V=p.length>1},y=!0,m=!1,b=!1,x=!0,v=VisualJS.getHeading(a)
break
case"tsline":var v=J(),y=null,m=!0,b=!0,x=!1
break
case"tsbar":var v=J(),y=!0,m=!1,b=!1,x=!0}VisualJS.chart=function(){c(a.data,a.time,a.by),$.fn.UseTooltip=function(t){var i=[]
$(this).bind("plothover",function(l,s,n){if(n){if(i!=[n.seriesIndex,n.dataIndex]){i=[n.seriesIndex,n.dataIndex]
var r=n.datapoint[0],o=n.datapoint[1],u="bar"!==a.type?n.series.label:p[r][0],d="rank"!==a.type?u:g[o][1],c="rank"!==a.type&&"bar"!==a.type?S||1===p.length?g[r][1]:"pyram"===a.type?p[s.x<0?0:1].data[n.dataIndex][0]:g[n.dataIndex][1]:!1,f="pyram"===a.type?Math.abs(r):"rank"!==a.type?"tsbar"!==a.type?o:S||1===p.length?p[n.seriesIndex].data[r][1]:o:r
VisualJS.showTooltip(VisualJS.tooltipText(t,c?d+" ("+c+")":d,f),s.pageX,s.pageY)}}else $("#"+e.tooltipid).hide(),i=[]})},V=VisualJS.legend&&V
var t={colors:e.colors.series,series:{stack:y,bars:{show:x,barWidth:.7,align:"center",fill:.9},lines:{show:m,lineWidth:VisualJS.grid.line},points:{show:b,radius:VisualJS.grid.point}},legend:{show:V},grid:{borderWidth:VisualJS.grid.border,hoverable:!0,clickable:!1,mouseActiveRadius:10},xaxis:{show:VisualJS.axis.x},yaxis:{show:VisualJS.axis.y}}
VisualJS.canvas=function(){var i=VisualJS.id,n=g.length
switch($(o).html("<"+l+"></"+l+"><"+s+"></"+s+">"),$(o+" "+l).html(v),$(o+" "+s).html(VisualJS.atext(a.footer||"")),VisualJS.getsize(i),$(o+" "+l).after('<div class="'+e.canvasclass+" "+VisualJS.visualsize+'" style="width: '+VisualJS.width+"px; height: "+VisualJS.height+'px;"></div>'),a.type){case"pyram":t.series.pyramid={show:!0,barWidth:1},t.yaxis.show=VisualJS.height/p[0].data.length>11?VisualJS.axis.y:!1,t.xaxis.max="number"==typeof VisualJS.range?h*VisualJS.range:VisualJS.range[1],t.xaxis.tickFormatter=function(a){return VisualJS.format(a,i)},$.plot(u,p,t)
break
case"rank":t.series.bars.horizontal=!0,t.yaxis.ticks=VisualJS.height/n>11?g.slice(0):0,"number"==typeof VisualJS.range?t.xaxis.max=a.data[0][1]*VisualJS.range:(t.xaxis.min=VisualJS.range[0],t.xaxis.max=VisualJS.range[1]),t.xaxis.tickFormatter=function(a){return VisualJS.format(a,i)},t.yaxis.autoscaleMargin=0,t.series.bars.barWidth=.5,$.plot(u,[p],t)
break
case"bar":t.xaxis.mode="categories",t.xaxis.tickLength=0,t.yaxis.tickFormatter=function(a){return VisualJS.format(a,i)},"number"!=typeof VisualJS.range&&null!==VisualJS.range&&(t.yaxis.min=VisualJS.range[0],t.yaxis.max=VisualJS.range[1]),$.plot(u,[p],t)
break
case"tsline":t.grid.markings=[{color:"#999",lineWidth:.5,yaxis:{from:0,to:0}}]
case"tsbar":t.yaxis.tickFormatter=function(a){return VisualJS.format(a,i)}
var r=VisualJS.width/n,d=[],c="01"
switch("number"!=typeof VisualJS.range&&null!==VisualJS.range&&(t.yaxis.min=VisualJS.range[0],t.yaxis.max=VisualJS.range[1]),VisualJS.ticks[0][1].length){case 4:if(30>r){for(var S=r>15?2:r>8?3:4,J=0;n>J;J++)d[J]=J%S?[g[J][0],""]:[g[J][0],g[J][1]]
t.xaxis.ticks=d}else t.xaxis.ticks=g
break
case 5:c="1"
case 6:if(35>r){for(var J=0;n>J;J++)d[J]=VisualJS.ticks[J][1].slice(4)!==c?[VisualJS.ticks[J][0],""]:[VisualJS.ticks[J][0],VisualJS.ticks[J][1].slice(0,4)],g[J][1]=VisualJS.tformat(VisualJS.ticks[J][1],VisualJS.id)
t.xaxis.ticks=d}else{for(var J=0;n>J;J++)g[J][1]=VisualJS.tformat(VisualJS.ticks[J][1],VisualJS.id)
t.xaxis.ticks=g}break
default:t.xaxis.ticks=g}$.plot(u,f,t)}$(u).UseTooltip(VisualJS.id)},VisualJS.canvas()}}VisualJS.scripts.length&&"object"==typeof LazyLoad?LazyLoad.js(VisualJS.scripts,VisualJS.draw):VisualJS.draw()}}
if("function"!=typeof visual)var visual=VisualJS.load
