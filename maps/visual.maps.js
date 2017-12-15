/*
colors, legend, groupLegend (1.0.0)
Copyright (c) 2017 Institut d'Estadistica de Catalunya (Idescat)
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
VisualJS.func.colors=function(t,e,r,l,a,n){var o=document,i=function(t,e,r){var l;return 0>r?r+=1:r>1&&(r-=1),l=1>6*r?t+(e-t)*r*6:1>2*r?e:2>3*r?t+(e-t)*(2/3-r)*6:t,255*l},s=function(t){var e,r,l,a,n,o,s=t.h,d=t.s/100,u=t.l/100;return 0==d?a=n=o=255*u:(r=.5>=u?u*(d+1):u+d-u*d,e=2*u-r,l=s/360,a=i(e,r,l+1/3),n=i(e,r,l),o=i(e,r,l-1/3)),{r:Math.round(a),g:Math.round(n),b:Math.round(o)}},d=function(t){return parseInt(t,16)},u=function(t){return t=t.replace("#",""),{r:d(t.substr(0,2)),g:d(t.substr(2,2)),b:d(t.substr(4,2))}},g=function(t){var e,r,l=t.r/255,a=t.g/255,n=t.b/255,o=Math.max(l,a,n),i=Math.min(l,a,n),s=(o+i)/2;if(o===i)e=r=0;else{var d=o-i;switch(r=s>.5?d/(2-o-i):d/(o+i),o){case l:e=(a-n)/d+(n>a?6:0);break;case a:e=(n-l)/d+2;break;case n:e=(l-a)/d+4}e/=6}return{h:Math.floor(360*e),s:Math.floor(100*r),l:Math.floor(100*s)}},p=o.createElement("style"),c=new Array,h=g(u(t));p.setAttribute("type","text/css"),o.getElementsByTagName("head")[0].appendChild(p);var v,f=(97-h.l)/--e,y="undefined"==typeof a?0:a.length,x="";if(n="undefined"==typeof n?"":"#"+n,y>0)for(var b=0;y>b;b++)x+=n+" ."+l+b+"{"+r+": "+a[b]+"} ";else for(var b=0;e>=b;b++)v=s(h),c[b]={r:v.r,g:v.g,b:v.b},x+=n+" ."+l+(e-b)+"{"+r+": rgb("+v.r+","+v.g+","+v.b+")}",h.l+=f;return p.innerHTML=x,c},VisualJS.func.legend=function(t,e,r,l,a,n,o){var i,s,d,u=170,g=d3.select(".VisualJSfooter")[0][0].getClientRects()[0],p=12,c=Math.min(r.attr("width"),r.attr("height")),h=r.append("svg:g").attr("class",VisualJS.setup.legendclass),v=[{text:(n[1]?"":"\u2265 ")+t[1]},{text:(n[0]?"":"\u2264 ")+t[0]}];c>u&&(d=h.append("defs").append("linearGradient").attr("id","legendGradient").attr("x1","100%").attr("y1","0%").attr("x2","0%").attr("y2","0%"),d.selectAll("stop").data(e).enter().append("stop").attr("offset",function(t,r){var l=e.length;return String(Math.round(100*r/(l-1)))+"%"}).attr("stop-color",function(t){return"rgb("+t.r+","+t.g+","+t.b+")"}),g=d3.select("svg")[0][0].getBBox(),i=g.width,a=g.height,h.selectAll(".values").data(v).enter().append("svg:text").attr("class","values").attr("x",function(t,e){return 0===e?g.width-p/8:p/8}).attr("y",g.height+2.5*p).attr("width",i).attr("text-anchor",function(t,e){return 0===e?"end":void 0}).text(function(t){return t.text}),g=d3.select("text")[0][0].getBBox(),h.append("svg:rect").attr("x",0).attr("y",g.y+g.height+p/4).attr("width",i).attr("height",g.height).attr("fill","url(#legendGradient)"),g=d3.select("svg>g>rect")[0][0].getBBox(),s=function(t,e){return 0===e?i:void 0},h.selectAll(".line").data([1,2]).enter().append("line").classed("line",!0).attr("x1",s).attr("x2",s).attr("y1",g.y-p/2).attr("y2",g.y),h.append("svg:text").attr("x",0).attr("y",g.y+g.height+p/4).attr("alignment-baseline","hanging").text(o),g=r.select(".VisualJSlegend")[0][0].getBBox(),r.attr("viewBox","0 0 "+Math.round(g.width)+" "+Math.round(g.y+g.height)))},VisualJS.func.groupLegend=function(t,e,r,l,a,n,o,i){var s,d,u,g,p=12,c=170,h=Math.min(e.attr("width"),e.attr("height")),v=d3.select("."+VisualJS.setup.legendclass),f=d3.select("#visual.visual>svg")[0][0].getBBox(),b=d3.select("#visual.visual>h1")[0][0].getClientRects()[0],m={top:f.y,left:b.left,width:b.width,height:VisualJS.height},w=[];if("undefined"!=typeof i&&i===!1)for(g=n.grouped.label.length-1;g>=0;g--)w.push({color:n.grouped.color[g].r?"rgb("+n.grouped.color[g].r+","+n.grouped.color[g].g+","+n.grouped.color[g].b+")":n.grouped.color[g],text:n.grouped.label[g]});else for(g=0;g<n.grouped.label.length;g++)d=n.grouped.color.length-1-g,w.push({color:n.grouped.color[d].r?"rgb("+n.grouped.color[d].r+","+n.grouped.color[d].g+","+n.grouped.color[d].b+")":n.grouped.color[d],text:n.grouped.label[g]});h>c&&(s=d3.select("#visual.visual"),"s"===o.position[0]?(y="bottom",m.y=6):(d=Number(getComputedStyle(d3.select("#visual.visual")[0][0]).getPropertyValue("margin-bottom").replace("px","")),y="top",m.y=b.top+b.height+d),"w"===o.position[1]?(x="left",m.x=m.left):(x="right",m.x=m.left),u=s.append("div").classed(VisualJS.setup.legendclass,!0).attr("style","position:absolute;"+y+":"+m.y+"px; "+x+":"+m.x+"px; display: inline-block;"),d=u.append("table").selectAll(".category").data(w).enter().append("tr").attr("class","category"),d.append("td").attr("class","legendColorBox").append("div").attr("style","border:1px solid #ccc; padding:1px").append("div").attr("style",function(t){return"width 4px; border: 5px solid "+t.color+"; overflow:hidden"}),d.append("td").attr("class","legendLabel").text(function(t){return t.text}),"bottom"===y&&v&&(v=d3.select(".VisualJSfooter")[0][0],b=v.getClientRects()[0],d=Number(getComputedStyle(d3.select("#visual.visual")[0][0]).getPropertyValue("margin-bottom").replace("px","")),u.style(y,d+b.height+p+"px")),s.selectAll("#visual.visual>svg").on("mousemove",function(){var t=s.select("."+VisualJS.setup.legendclass),e=t[0][0].getClientRects()[0],r=12;d3.event.pageX>e.left-r&&d3.event.pageX<e.left+e.width+r&&d3.event.pageY<e.top+e.height+r&&d3.event.pageY>e.top-r?t.style("visibility","hidden"):t.style("visibility","initial")}),s.selectAll("#visual.visual>svg").on("mouseout",function(){s.select("."+VisualJS.setup.legendclass).style("visibility","initial")}))};