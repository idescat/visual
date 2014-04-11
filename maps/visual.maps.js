/*
colors, legend (0.8.0) (Must be UTF8+BOM for IE)
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
VisualJS.func.colors=function(t,e,r,n,a,o){var l=document,i=function(t,e,r){var n
return 0>r?r+=1:r>1&&(r-=1),n=1>6*r?t+(e-t)*r*6:1>2*r?e:2>3*r?t+(e-t)*(2/3-r)*6:t,255*n},u=function(t){var e,r,n,a,o,l,u=t.h,s=t.s/100,c=t.l/100
return 0==s?a=o=l=255*c:(r=.5>=c?c*(s+1):c+s-c*s,e=2*c-r,n=u/360,a=i(e,r,n+1/3),o=i(e,r,n),l=i(e,r,n-1/3)),{r:Math.round(a),g:Math.round(o),b:Math.round(l)}},s=function(t){return parseInt(t,16)},c=function(t){return t=t.replace("#",""),{r:s(t.substr(0,2)),g:s(t.substr(2,2)),b:s(t.substr(4,2))}},d=function(t){var e,r,n=t.r/255,a=t.g/255,o=t.b/255,l=Math.max(n,a,o),i=Math.min(n,a,o),u=(l+i)/2
if(l===i)e=r=0
else{var s=l-i
switch(r=u>.5?s/(2-l-i):s/(l+i),l){case n:e=(a-o)/s+(o>a?6:0)
break
case a:e=(o-n)/s+2
break
case o:e=(n-a)/s+4}e/=6}return{h:Math.floor(360*e),s:Math.floor(100*r),l:Math.floor(100*u)}},h=l.createElement("style"),f=new Array,g=d(c(t))
h.setAttribute("type","text/css"),l.getElementsByTagName("head")[0].appendChild(h)
var p,b=(97-g.l)/--e,v="undefined"==typeof a?0:a.length,y=""
if(o="undefined"==typeof o?"":"#"+o,v>0)for(var m=0;v>m;m++)y+=o+" ."+n+m+"{"+r+": "+a[m]+"} "
else for(var m=0;e>=m;m++)p=u(g),f[m]={r:p.r,g:p.g,b:p.b},y+=o+" ."+n+(e-m)+"{"+r+": rgb("+p.r+","+p.g+","+p.b+")}",g.l+=b
return h.innerHTML=y,f},VisualJS.func.legend=function(t,e,r,n,a,o,l){var i=a[0],u=a[1],s=250,c=170,d=15,h=4,f=5,g=o[0],p=o[1],b=Math.min(r.attr("width"),r.attr("height")),v=r.append("svg:g").attr("class",VisualJS.setup.legendclass),y=[{color:"fill:rgb("+e[0].r+","+e[0].g+","+e[0].b+"); ",text:(l[0]?"":"≤ ")+t[0]},{color:"fill:rgb("+e[1].r+","+e[1].g+","+e[1].b+")",text:(l[1]?"":"≥ ")+t[1]}],m=function(t){var e=document,r=e.createElement("span")
r.style.whiteSpace="nowrap",r.style.visibility="hidden",r.innerHTML=t,e.body.appendChild(r)
var n=r.getBoundingClientRect()
return r.parentNode.removeChild(r),n},x=m(y[0].text),M=g/i*r.attr("width"),w=p/u*r.attr("height"),A=w
b>c&&(v.selectAll("rect").data(y).enter().append("svg:rect").attr("x",M).attr("y",function(){return A+=d+h}).attr("width",d).attr("height",d).attr("style",function(t){return t.color}),b>s?(A=w+d/2+x.height/4,v.selectAll("text").data(y).enter().append("svg:text").attr("x",M+d+f).attr("y",function(){return A+=d+h}).text(function(t){return t.text})):v.selectAll("rect").on("mousemove",function(t){VisualJS.showTooltip(t.text,d3.event.pageX,d3.event.pageY)}).on("mouseout",function(){n.style("display","none")}))}