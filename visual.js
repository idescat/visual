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
var VisualJS={version:"0.10.2",show:true,old:false,fixed:null,width:500,bwidth:500,height:500,normal:500,scripts:[],map:{},container:{},"public":{},func:{},callback:null,getSize:function(e){var t=VisualJS.setup,i=t.html,a=i.heading,n=i.footer,l=window,r=document,s=r.documentElement,o=r.getElementsByTagName("body")[0],u=r.getElementById(e),d=u.getElementsByTagName(a)[0].clientHeight,f=u.getElementsByTagName(n)[0].clientHeight,c=l.innerHeight||s.clientHeight||o.clientHeight,p=0
if(!d)p+=11
if(!f)p+=11
if("undefined"!==typeof c&&"undefined"!==typeof d&&"undefined"!==typeof f)if(null===VisualJS.fixed){VisualJS.bwidth=l.innerWidth||s.clientWidth||o.clientWidth
VisualJS.width=VisualJS.bwidth-t.padding.w
VisualJS.height=c-t.padding.h-d-f+p}else{VisualJS.bwidth=s.clientWidth||o.clientWidth
VisualJS.width=VisualJS.fixed[0]-t.padding.w
VisualJS.height=VisualJS.fixed[1]-t.padding.h-d-f+p}VisualJS.visualsize=VisualJS.width<VisualJS.normal?t.mini:t.normal},iframe:function(e,t){var i=VisualJS.setup,a="string"===typeof e.clas?e.clas:i.clas,n='<!DOCTYPE html>\n<!--[if lt IE 7]><html class="lt-ie9 lt-ie8 lt-ie7"> <![endif]-->\n<!--[if IE 7]><html class="lt-ie9 lt-ie8"> <![endif]-->\n<!--[if IE 8]><html class="lt-ie9"> <![endif]-->\n<!--[if gt IE 8]><!--> <html> <!--<![endif]-->\n<head>',l=function(){var t=document,i=t.createElement("iframe"),a=t.getElementById(e.id)
i.frameBorder="0"
i.scrolling="no"
a.parentNode.insertBefore(i,a.nextSibling)
return i},r=function(e,t){if("undefined"!==typeof e){var i
if(e.contentDocument)i=e.contentDocument
else if(e.contentWindow)i=e.contentWindow.document
else if(window.frames[e.name])i=window.frames[e.name].document
if(i){i.open()
i.write(t)
i.close()}}}
if("string"===typeof t)if(t.indexOf("{")===-1)n+='<link href="'+t+'" rel="stylesheet" type="text/css"/>'
else n+='<style type="text/css">'+t+"</style>"
n+='<script type="text/javascript" src="'+VisualJS.setup.main.visual+'"></script>'
n+='<script type="text/javascript" src="'+VisualJS.setup.main.setup+'"></script>'
n+='<script type="text/javascript" src="'+VisualJS.setup.main.lazy+'"></script>'
n+='</head><body><div id="'+e.id+'" class="'+a+'"></div><script>window.setTimeout(function(){visual('+JSON.stringify(e)+");},1);</script></body></html>"
r(l(),n)},compare:function(e){var t=VisualJS.setup,i=VisualJS.setup.separator,a="string"===typeof e.id?e.id:t.id,n="[object Array]"===Object.prototype.toString.call(e.css)?0===e.css.length?["",""]:1===e.css.length?[e.css[0],e.css[0]]:e.css:[e.css,e.css],l=document,r=l.createElement(t.html.heading),s=l.createElement(t.html.footer),o=l.getElementById(a),u=l.createElement("div"),d=l.createElement("style"),f=function(){VisualJS.getSize(a)
var n=VisualJS.height+("string"===typeof e.footer&&""!==e.footer?14:0),l=VisualJS.width+t.margin,r="iframe{ float: left; width: "+Math.floor((l-i)/2-t.margin)+"px; height:"+n+"px; }"
if(d.styleSheet)d.styleSheet.cssText=r
else d.innerHTML=r
u.style.height=n+"px"}
r.innerHTML="string"===typeof e.title?e.title:""
s.innerHTML="string"===typeof e.footer?e.footer:""
s.style.clear="both"
o.appendChild(r)
o.appendChild(s)
l.getElementsByTagName("head")[0].appendChild(d)
u.style.width=i+"px"
if("styleFloat"in u.style)u.style.styleFloat="left"
else u.style.cssFloat="left"
for(var c=0;c<2;c++){var p=l.createElement("span")
if("string"!==typeof e.load[c].id)e.load[c].id=t.compareids[c]
p.id=e.load[c].id
o.insertBefore(p,s)
VisualJS.iframe(e.load[c],n[c])}o.insertBefore(u,p)
f()
if("undefined"!==typeof window.onorientationchange)window.onorientationchange=f
else window.onresize=f},load:function(e){var t=function(e){var t=JSON.parse(e.data),i=function(t){e.source.postMessage(JSON.stringify(t),"*")}
if("undefined"===typeof t.action)i({type:"error",data:[{id:"400",label:'"action" is required.'}]})
else if("send"===t.action){var a=t.id||VisualJS.id,n=VisualJS.container[a]||VisualJS.container[a]
if(n){if("cmap"===n.type&&!n.data[0].hasOwnProperty("label")){var l=[]
for(var r=VisualJS.map[n.by],s=r.features.length;s--;)l[r.features[s].properties[r.id]]=r.features[s].properties[r.label]
for(var o=n.data,s=o.length;s--;)o[s].label=l[o[s].id]}i(n)}else i({type:"error",data:[{id:"404",label:'A visualisation with the specified "id" was not found'}]})}else i({type:"error",data:[{id:"400",label:'"action" value is not correct.'}]})}
if("undefined"===typeof VisualJS.setup)window.alert("Visual: Setup not found (visual.setup.js)!")
if("[object Array]"!==Object.prototype.toString.call(e))VisualJS.get(e)
else for(var i=0,a=e.length;i<a;i++)VisualJS.get(e[i])
if(VisualJS.container[VisualJS.id].listen)if(window.addEventListener)addEventListener("message",t,false)
else attachEvent("onmessage",t)},get:function(e){var t=VisualJS.setup,i=t.html,a=t.canvas,n=i.heading,l=i.footer,r=VisualJS.old||t.func.old("ie9"),s=function(e){if("undefined"!==typeof e&&"[object Array]"===Object.prototype.toString.call(e)&&2===e.length&&"number"===typeof e[0]&&"number"===typeof e[1]&&e[0]<e[1])return true
else return false},o=function(t,i,a){if("string"===typeof t){if(typeof e[t]!==i)e[t]=a[t]}else if(typeof e[t[0]][t[1]]!==i)e[t[0]][t[1]]=a[t[0]][t[1]]},u=[["show","boolean",VisualJS],["callback","function",VisualJS],["id","string",t],["listen","boolean",t],["dec","number",a],["heading","boolean",a],["legend","boolean",a],["grid","object",a],[["grid","border"],"number",a],[["grid","shadow"],"number",a],[["grid","line"],"number",a],[["grid","point"],"number",a],["axis","object",a],[["axis","x"],"boolean",a],[["axis","y"],"boolean",a]]
for(var d=0;d<u.length;d++)o(u[d][0],u[d][1],u[d][2])
VisualJS.id=e.id
VisualJS.public[VisualJS.id]={heading:null,legend:null}
if("object"===typeof e.fixed)VisualJS.fixed=e.fixed
if("object"===typeof e.unit&&null!==e.unit){o(["unit","label"],"string",a)
o(["unit","symbol"],"string",a)
o(["unit","position"],"string",a)}else e.unit=a.unit
e.lang=e.lang||t.i18n.lang
if(!("number"===typeof e.range||s(e.range)))e.range=a.range.hasOwnProperty(e.type)&&"number"===typeof a.range[e.type]?a.range[e.type]:null
VisualJS.container[VisualJS.id]=e
var f="#"+VisualJS.id,c=f+" ."+t.canvasclass,p=VisualJS.container[VisualJS.id],g=function(){if(false===p.autoheading)return p.title
var e=[],t=function(t,i){if("string"===typeof t&&""!==t){if(true===i)t='<span class="'+VisualJS.setup.nowrapclass+'">'+t+"</span>"
e.push(t)}}
if(null!==p.time&&"object"===typeof p.time)var i=v(p.time[0],VisualJS.id),a=v(p.time[p.time.length-1],VisualJS.id),n=i+"&ndash;"+a
else var n=v(p.time,VisualJS.id)
t(p.title,false)
t(p.geo,true)
t(n,true)
return y(e.join(". "))},h=function(){var e=false
if("function"===typeof VisualJS.chart){V()
p.show&&VisualJS.chart()
if("undefined"!==typeof window.onorientationchange)window.onorientationchange=x
else window.onresize=x
e=true}if(null!==p.callback)p.callback.call({id:VisualJS.id,chart:e,heading:VisualJS.public[VisualJS.id].heading,legend:VisualJS.public[VisualJS.id].legend})},y=function(e){return String(e).replace(/&amp;/g,"&")},m=function(e,t){if(!t||!e.exists.call()){VisualJS.scripts.push(e.js)
return true}return false},b=function(e,t,i){var a="number"===typeof i&&""!==VisualJS.container[e].unit.label?" "+VisualJS.container[e].unit.label:"",n="number"===typeof i?VisualJS.container[e].unit.symbol:"",l=S(i,e),r=l!==VisualJS.setup.i18n.text.na[VisualJS.container[e].lang]?"end"===VisualJS.container[e].unit.position?l+a+(""!==n?" "+n:n):n+l+a:l
return t?"<strong>"+r+"</strong> "+t:r},S=function(e,t){if("undefined"===typeof e||null===e)return VisualJS.setup.i18n.text.na[VisualJS.container[t].lang]
if("number"===typeof e){var i=e.toFixed(VisualJS.container[t].dec),a=/(\d+)(\d{3})/,n=i.split("."),l=n[0],r=n.length>1?VisualJS.setup.i18n.text.dec[VisualJS.container[t].lang]+n[1]:""
while(a.test(l))l=l.replace(a,"$1"+VisualJS.setup.i18n.text.k[VisualJS.container[t].lang]+"$2")
return l+r}return""},v=function(e,t){if(!e)return null
if(isNaN(e))return e
switch(e.length){case 5:var i="quarter"
break
case 6:var i="month"
break
default:return e}var a=VisualJS.setup.i18n.text[i]
if("undefined"===typeof a)return e
var n=a[VisualJS.container[t].lang]
if("undefined"===typeof n)return e
var l=n[e.slice(4)-1]
if("undefined"===typeof l)return e
return l+" <span>"+e.slice(0,4)+"</span>"},J=function(e,t,i){var a=document.getElementById(VisualJS.setup.tooltipid),n=VisualJS.bwidth-VisualJS.setup.margin,l={}
a.innerHTML=e
a.style.display="block"
var r=a.clientWidth/2
l.x=t-r
l.y=i-a.clientHeight-5
if(t+r>n)l.x-=t+r-n
else if(l.x<VisualJS.setup.margin)l.x+=VisualJS.setup.margin-l.x
if(l.y<VisualJS.setup.margin)l.y+=1.75*a.clientHeight
a.style.left=l.x+"px"
a.style.top=l.y+"px"},V=function(){var e=document
if(!e.getElementById(VisualJS.setup.tooltipid)){var t=e.createElement("div")
t.id=VisualJS.setup.tooltipid
t.style.display="none"
e.body.appendChild(t)}},x
if("cmap"===e.type)if(r)document.getElementById(VisualJS.id).innerHTML="<p>"+t.i18n.text.oldbrowser[p.lang]+"</p>"
else{if("string"!==typeof e.by)return
m(t.lib.maps,true)
m(t.lib.d3,true)
m(t.map[e.by],true)
VisualJS.chart=function(){var i=g(),a=VisualJS.map[e.by],r=a.area[0],s=a.area[1],o="object"===typeof e.grouped&&"object"===typeof e.grouped.label&&e.grouped.label.length>0&&e.data[0].hasOwnProperty("group"),u=e.data[0].hasOwnProperty("val"),d=o?e.grouped.label.length:u?t.colors.map.max:1,c=t.colorclassprefix,h=VisualJS.func.colors(t.colors.map.base,d,"fill",c,o&&"object"===typeof e.grouped.color&&e.grouped.color.length===e.grouped.label.length?e.grouped.color:[],VisualJS.id),m=d3.select(f),v=d3.geo[a.projection](),V="object"===typeof a.center&&"function"===typeof v.center?v.center(a.center):v,w=V.scale(a.scale).translate([r/2,s/2]),k=d3.geo.path().projection(w),j=d3.select("#"+t.tooltipid)
x=function(){m.html("<"+n+"></"+n+"><"+l+"></"+l+">")
d3.select(f+" "+n).html(i)
d3.select(f+" "+l).html(y(e.footer||""))
VisualJS.getSize(VisualJS.id)
var g=VisualJS.id,v=d3.map(),V=d3.map(),x=e.data[0].hasOwnProperty("label"),w=[],E,M=function(){},I=function(){},W,z,B,O,T=VisualJS.height/s,$=VisualJS.width/r,L=Math.min(Math.round(r*T),VisualJS.width),q=Math.min(Math.round(s*$),VisualJS.height),H=Math.floor((VisualJS.width-L)/2),N=Math.floor((VisualJS.height-q)/2),A=T<$?T:$,F=m.insert("svg:svg",l).attr("width",L).attr("height",q)
if(o){E=d3.map()
M=function(e,t){e.set(t.id,t.group)}
z=function(e,t,i){return c+(e.get(i[a.id])-1)}
W=function(t,i){var n=e.grouped.label[t.get(i[a.id])-1],l=x?V.get(i[a.id]):i[a.label]
if("undefined"!==typeof n)l+=" <em>"+n+"</em>"
return l}}else{if(u){z=function(e,t,i,n,l){var r=t.get(i[a.id])
if(n===l)return"undefined"!==typeof r?c+(d/2).toFixed(0):null
var s=d3.scale.quantize().domain([n,l]).range(d3.range(d).map(function(e){return c+e}))
return s(r)}
I=VisualJS.func.legend}else z=function(e,t,i){return""!==t.get(i[a.id])?"":c+(d-1)}
W=function(e,t){return x?V.get(t[a.id]):t[a.label]}}for(var P=0,C=e.data,D=C.length;P<D;P++){var Y=C[P]
if(Y.hasOwnProperty("val")){if(null!==Y.val){v.set(Y.id,Y.val)
w.push(Y.val)}}else v.set(Y.id,"")
if(x)V.set(Y.id,Y.label)
M(E,Y)}w.sort(function(e,t){return e-t})
var U=w[0],X=w[D-1]
if("number"===typeof p.range){B=d3.quantile(w,p.range)
O=d3.quantile(w,1-p.range)}else{B=p.range[0]
O=p.range[1]}F.style("margin-left",H+"px")
F.style("margin-top",N+"px")
F.style("margin-bottom",N+"px")
F.append("svg:g").attr("class",t.areaclass).attr("transform","scale("+A+")").selectAll("path").data(a.features).enter().append("svg:path").attr("class",function(e){return z(E,v,e.properties,B,O)}).attr("d",k).on("mousemove",function(e){if(u||o||"undefined"!==typeof v.get(e.properties[a.id]))J(b(g,W(E,e.properties),v.get(e.properties[a.id])),d3.event.pageX,d3.event.pageY)}).on("mouseout",function(){return j.style("display","none")})
if("undefined"!==typeof U){var R=[b(g,null,B),b(g,null,O)],G=[h[h.length-1],h[0]],K=[B<U||S(B,g)===S(U,g),O>X||S(O,g)===S(X,g)]
VisualJS.public[VisualJS.id].legend={color:G,text:R,symbol:[K[0]?"==":"<=",K[1]?"==":">="]}
if(p.legend&&"object"===typeof a.legend)I(R,G,F,j,a.area,a.legend,K)}VisualJS.public[VisualJS.id].heading=i}
x()}}else{if(m(t.lib.jquery,true)){var w=false
m(t.lib.jquery.flot,false)}else if(m(t.lib.jquery.flot,true))var w=false
else var w=true
if(r)m(t.lib.excanvas,true)
var k=function(){},j=[],E=[],M=[],I=e.stacked||false,W=function(){if(p.autoheading){var i=e.time.length,a=e.data.length
if(null===e.data[0].val[0]){for(var n=0,l=true,r=[];n<i;n++){for(var s=0;s<a;s++)l=l&&null===e.data[s].val[n]
if(!l)break
r.push(l)}for(var o=0,u=r.length;o<u;o++)if(r[o]){e.time.shift()
for(var s=0;s<a;s++)e.data[s].val.shift()}i=e.time.length}if(null===e.data[0].val[i-1]){for(var n=i,l=true,r=[];n--;){for(var s=0,a=e.data.length;s<a;s++)l=l&&null===e.data[s].val[n]
if(!l)break
r.push(l)}for(var o=r.length;o--;)if(r[o]){e.time.pop()
for(var s=0;s<a;s++)e.data[s].val.pop()}}}var d=function(){return}
if(I)m(t.lib.jquery.flot.stack,w)
else if("tsbar"===e.type){m(t.lib.jquery.flot.orderbars,w)
var d=function(e){return e.bars}}k=function(t,i){VisualJS.ticks=[]
for(var a=0,n=i.length;a<n;a++){E.push([a,i[a]])
VisualJS.ticks.push([a,i[a]])}for(var a=0,n=t.length;a<n;a++){for(var l=[],r=t[a].val,s=r.length,o=0;o<s;o++)l.push([o,r[o]])
if("tsbar"!==e.type||I||1===n)j.push({label:t[a].label,data:l})
else j.push({label:t[a].label,data:l,bars:{show:true,barWidth:.2,order:a+1,lineWidth:2}})}for(var a=0,u=j.length;a<u;a++)M.push({data:j[a].data,label:j[a].label,bars:d(j[a]),shadowSize:p.grid.shadow})
B=u>1}
return g()}
switch(e.type){case"pyram":m(t.lib.jquery.flot.pyramid,w)
Array.max=function(e){return Math.max.apply(Math,e)}
var z,k=function(e,t,i){z=Math.max(Array.max(e[0].val),Array.max(e[1].val))
j[0]={label:e[0].label,data:[],pyramid:{direction:"L"}}
j[1]={label:e[1].label,data:[]}
for(var a=0,n=i.length;a<n;a++){j[0].data[a]=[i[a],e[0].val[a]]
j[1].data[a]=[i[a],e[1].val[a]]}},B=true,O=false,I=false,T=false,L=false,q=false,H=g()
break
case"rank":var N=[],k=function(e){for(var t=0,i=e.length;t<i;t++){E[t]=[t,e[i-t-1][0]]
N[t]=[e[i-t-1][1],t]}j={data:N}},B=false,O=false,T=false,L=false,q=true,H=g()
break
case"bar":m(t.lib.jquery.flot.categories,w)
var k=function(e,t,i){if("object"!==typeof i||null===i){for(var a=0,n=e.length;a<n;a++)if(null!==e[a][1])j.push(["<span>"+e[a][0]+"</span>",e[a][1]])}else if("number"===typeof e[0])for(var a=0,n=i.length;a<n;a++)if(null!==e[a])j.push(['<span">'+i[a]+"</span>",e[a]])
B=j.length>1},O=true,T=false,L=false,q=true,H=g()
break
case"tsline":var H=W(),O=null,T=true,L=true,q=false
break
case"tsbar":var H=W(),O=true,T=false,L=false,q=true}VisualJS.chart=function(){k(e.data,e.time,e.by)
$.fn.UseTooltip=function(i){var a=[]
$(this).bind("plothover",function(n,l,r){if(r){if(a!=[r.seriesIndex,r.dataIndex]){a=[r.seriesIndex,r.dataIndex]
var s=r.datapoint[0],o=r.datapoint[1],u="bar"!==e.type?r.series.label:j[s][0],d="rank"!==e.type?u:E[o][1],f="rank"!==e.type&&"bar"!==e.type?I||1===j.length?E[s][1]:"pyram"===e.type?j[l.x<0?0:1].data[r.dataIndex][0]:E[r.dataIndex][1]:false,c="pyram"===e.type?Math.abs(s):"rank"!==e.type?"tsbar"!==e.type?o:I||1===j.length?j[r.seriesIndex].data[s][1]:o:s
J(b(i,f?d+" ("+f+")":d,c),l.pageX,l.pageY)}}else{$("#"+t.tooltipid).hide()
a=[]}})}
B=p.legend&&B
var i={colors:t.colors.series,series:{stack:O,bars:{show:q,barWidth:.7,align:"center",fill:.9},lines:{show:T,lineWidth:p.grid.line},points:{show:L,radius:p.grid.point}},legend:{show:B},grid:{borderWidth:p.grid.border,hoverable:true,clickable:false,mouseActiveRadius:10},xaxis:{show:p.axis.x},yaxis:{show:p.axis.y}}
x=function(){var a=VisualJS.id,r=E.length
$(f).html("<"+n+"></"+n+"><"+l+"></"+l+">")
$(f+" "+n).html(H)
$(f+" "+l).html(y(e.footer||""))
VisualJS.getSize(a)
$(f+" "+n).after('<div class="'+t.canvasclass+" "+VisualJS.visualsize+'" style="width: '+VisualJS.width+"px; height: "+VisualJS.height+'px;"></div>')
switch(e.type){case"pyram":i.series.pyramid={show:true,barWidth:1}
i.yaxis.show=VisualJS.height/j[0].data.length>11?p.axis.y:false
i.xaxis.max="number"===typeof p.range?z*p.range:p.range[1]
i.xaxis.tickFormatter=function(e){return S(e,a)}
$.plot(c,j,i)
break
case"rank":i.series.bars.horizontal=true
i.yaxis.ticks=VisualJS.height/r>11?E.slice(0):0
if("number"===typeof p.range)i.xaxis.max=e.data[0][1]*p.range
else{i.xaxis.min=p.range[0]
i.xaxis.max=p.range[1]}i.xaxis.tickFormatter=function(e){return S(e,a)}
i.yaxis.autoscaleMargin=0
i.series.bars.barWidth=.5
$.plot(c,[j],i)
break
case"bar":i.xaxis.mode="categories"
i.xaxis.tickLength=0
i.yaxis.tickFormatter=function(e){return S(e,a)}
if("number"!==typeof p.range&&null!==p.range){i.yaxis.min=p.range[0]
i.yaxis.max=p.range[1]}$.plot(c,[j],i)
break
case"tsline":i.grid.markings=[{color:"#999",lineWidth:.5,yaxis:{from:0,to:0}}]
case"tsbar":i.yaxis.tickFormatter=function(e){return S(e,a)}
var s=VisualJS.width/r,o=[],u="01"
if("number"!==typeof p.range&&null!==p.range){i.yaxis.min=p.range[0]
i.yaxis.max=p.range[1]}switch(VisualJS.ticks[0][1].length){case 4:if(s<30){var d=s>15?2:s>8?3:4
for(var g=0;g<r;g++)o[g]=g%d?[E[g][0],""]:[E[g][0],E[g][1]]
i.xaxis.ticks=o}else i.xaxis.ticks=E
break
case 5:u="1"
case 6:if(s<35){for(var g=0;g<r;g++){o[g]=VisualJS.ticks[g][1].slice(4)!==u?[VisualJS.ticks[g][0],""]:[VisualJS.ticks[g][0],VisualJS.ticks[g][1].slice(0,4)]
E[g][1]=v(VisualJS.ticks[g][1],VisualJS.id)}i.xaxis.ticks=o}else{for(var g=0;g<r;g++)E[g][1]=v(VisualJS.ticks[g][1],VisualJS.id)
i.xaxis.ticks=E}break
default:i.xaxis.ticks=E}$.plot(c,M,i)}$(c).UseTooltip(VisualJS.id)
VisualJS.public[VisualJS.id].heading=H}
x()}}if(VisualJS.scripts.length&&"object"===typeof LazyLoad)LazyLoad.js(VisualJS.scripts,h)
else h()}}
if("function"!==typeof visual)var visual=VisualJS.load
