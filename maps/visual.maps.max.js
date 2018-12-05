/*
colors, legend, groupLegend (1.1.0)
Copyright (c) 2018 Institut d'Estadistica de Catalunya (Idescat)
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
/* global VisualJS, d3 */
VisualJS.func.colors=function(cHexa, rang, atribut, clas, custcolors, id){
	var
		d=document,
		HueToRgb=function (m1, m2, hue) {
			var v;
			if (hue<0) {hue += 1;}
			else if (hue > 1) {	hue -= 1;}
			if (6 * hue < 1) {v=m1 + (m2 - m1) * hue * 6;}
			else if (2 * hue < 1) {v=m2;}
			else if (3 * hue < 2){v=m1 + (m2 - m1) * (2/3 - hue) * 6;}
			else {v=m1;}
			return 255 * v;
		},
		hsl2rgb=function (hsl) {
			var
				h=hsl.h,
				s=hsl.s/100,
				l=hsl.l/100,
				m1, m2, hue, r, g, b
			;
			if (s == 0) {r=g=b=(l * 255);}
			else {
				if (l <= 0.5) {m2=l * (s + 1);}
				else {m2=l + s - l * s;}
				m1=l * 2 - m2;
				hue=h / 360;
				r=HueToRgb(m1, m2, hue + 1/3);
				g=HueToRgb(m1, m2, hue);
				b=HueToRgb(m1, m2, hue - 1/3);
			}
			return {r: Math.round(r), g: Math.round(g), b: Math.round(b)};
		},
		hex2Dec=function (h){
			return parseInt(h,16);
		},
		hex2rgb=function (c){
			c=c.replace("#","");
			return {
				r: hex2Dec(c.substr(0,2)),
				g: hex2Dec(c.substr(2,2)),
				b: hex2Dec(c.substr(4,2))
			};
		},
		rgb2hsl=function (rgb){
			var
				r=rgb.r/255,
				g=rgb.g/255,
				b=rgb.b/255,
				max=Math.max(r, g, b), min=Math.min(r, g, b),
				h, s, l=(max + min) / 2
			;

			if(max===min){
				h=s=0; // achromatic
			}else{
				var df=max - min;
				s=l > 0.5 ? df / (2 - max - min) : df / (max + min);
				switch(max){
					case r: h=(g - b) / df + (g < b ? 6 : 0); break;
					case g: h=(b - r) / df + 2; break;
					case b: h=(r - g) / df + 4; break;
				}
				h /= 6;
			}
			return {h:Math.floor(h * 360), s:Math.floor(s * 100), l:Math.floor(l * 100)};
		},
		stylesheet=d.createElement("style"),
		colors=[],
		hsl=rgb2hsl(hex2rgb(cHexa))
	;

	stylesheet.setAttribute("type", "text/css");
	d.getElementsByTagName("head")[0].appendChild(stylesheet);
	var
		incr=(97-hsl.l)/--rang,
		len=(typeof custcolors==="undefined") ? 0 : custcolors.length,
		rules="",
		rgb, i
	;
	id=(typeof id==="undefined") ? "" : "#"+id;
	if(len>0){ //Custom colors
		for(i=0; i<len; i++){
			rules+= id+" ."+clas+i+"{" + atribut + ": "+custcolors[i]+"} ";
		}
	}else{
		for(i=0; i<=rang; i++){
			rgb=hsl2rgb (hsl);
			colors[i]={r:rgb.r, g:rgb.g, b:rgb.b};
			rules+= id+" ."+clas+(rang-i)+"{" + atribut + ": rgb("+rgb.r+","+rgb.g+","+rgb.b+")}";
			hsl.l += incr;
		}
	}
	stylesheet.innerHTML = rules;
	return colors;
};

VisualJS.func.legend=function(infsup, colors, vis, tooltip, height, strict, lab) { //Requires Visual v. 1.0.0
	var
		showValLimit=250, // height/width less than this value -> don't show text legend
		minLimit = 170,
		size=30, //square size (15x15)
		ratio=1/4,
		bb = d3.select(".VisualJSfooter")[0][0].getClientRects()[0],
		width,
		margin= 12,
		x,y,hor,
		hwmin=Math.min(vis.attr("width"), vis.attr("height")),
		leg=vis.append("svg:g").attr("class", VisualJS.setup.legendclass),
		defs,
		info=[ // Values in the legend
			{	//greater than
				text: (strict[1] ? "" :  "\u2265 ") + infsup[1]
			},
			{  //less than
				text: (strict[0] ? "" :  "\u2264 ") + infsup[0]
			},
		]
	;

	//To preserve height even when no label is provided
	if(lab===""){
		lab="\xa0";
	}

	if(hwmin>minLimit){  //Show legend
		//color gradient
		defs = leg.append("defs")
			.append("linearGradient")
			.attr("id","legendGradient")
			.attr("x1","100%")
			.attr("y1","0%")
			.attr("x2","0%")
			.attr("y2","0%")
		;
		defs
			.selectAll("stop")
			.data(colors)
			.enter()
			.append("stop")
			.attr("offset", function(d,i){
				var len = colors.length;
				return String(Math.round((100*i/(len-1))))+"%";
			})
			.attr("stop-color",function(d){
				return "rgb(" + d.r + "," + d.g + "," + d.b + ")";
			})
		;
		//Unit text
		bb = d3.select("svg")[0][0].getBBox();
		width = bb.width;
		height = bb.height;
		leg.selectAll(".values")
			.data(info)
			.enter()
			.append("svg:text")
			.attr("class","values")
			.attr("x",function(d,i){
				return (i === 0) ? bb.width - margin/8 : margin/8;
			}) //Horizontal space of 5px between square and text
			.attr("y", bb.height + (1+1.5)*margin)
			.attr("width", width)
			.attr("text-anchor",function(d,i){
				if(i === 0){
					return "end";
				}
			})
			.text(function(d){return d.text;})
		;
		//squares
		bb = d3.select("text")[0][0].getBBox();
		leg.append("svg:rect")
			.attr("x", 0)
			.attr("y", bb.y + bb.height + margin/4 )
			.attr("width", width)
			.attr("height", bb.height)
			.attr("fill", "url(#legendGradient)");

		//lines
		bb = d3.select("svg>g>rect")[0][0].getBBox();
		hor = function (d,i){
			if(i === 0){
				return width;
			}
		};
		leg.selectAll(".line")
			.data([1,2])
			.enter()
			.append("line")
			.classed("line",true)
			.attr("x1", hor)
			.attr("x2", hor)
			.attr("y1", bb.y - margin/2 )
			.attr("y2", bb.y)
		;
		//Align text to square horizontally
		//text
		leg.append("svg:text")
			.attr("x", 0)
			.attr("y", bb.y + bb.height + margin )
			.text(lab)
		;
		bb = vis.select(".VisualJSlegend")[0][0].getBBox();
		vis.attr("viewBox", "0 0 "+Math.round(bb.width)+" "+Math.round(bb.y+bb.height));
	}
};

VisualJS.func.groupLegend=function(infsup, vis, tooltip, height, strict, o, scanvas, colorOrder) {
	var
		showValLimit=250, // height/width less than this value -> don't show text legend
		size=15, //square size (15x15)
		margin = 12,
		minLimit = 170,
		hwmin=Math.min(vis.attr("width"), vis.attr("height")),
		el = d3.select("."+VisualJS.setup.legendclass),
		bb = d3.select("#visual.visual>svg")[0][0].getBBox(),
		rect = d3.select("#visual.visual>h1")[0][0].getClientRects()[0],
		pos = {
			top: bb.y,
			left: rect.left,
			width: rect.width,
			height: VisualJS.height,
		},
		leg,
		info = [],
		aux,
		table,
		icon = {
			data: ["&times;","&plus;"],
			state: false,
		},
		i, icolor, increment
	;
	//icolor is :
	//	- equal to 0 : 1. when the user includes an array of colors in the "grouped" property, ex: grouped: [label: ["XXXXX","YYYYY"], color: ["#eb4d44" , "#2a488a"]]
	// 								 2. when the user does not include an array of colors in the "grouped" property and o.data[0][0] < o.data[last][0]
	//	- greather than 0 : colorOrder is not equal to 'false' and the user does not include an array of colors in the "grouped" property and o.data[0][0] > o.data[last][0]
	icolor = ((typeof colorOrder !== "undefined" && colorOrder === false) || !o.grouped.color[0].r) ? 0 : o.grouped.color.length-1;
	increment = (icolor == 0);

	for(i=0;i<o.grouped.label.length;i++){
		info.push(
			{  //less than
				color : ( o.grouped.color[icolor].r ? "rgb("+o.grouped.color[icolor].r+","+o.grouped.color[icolor].g+","+o.grouped.color[icolor].b+")":
				o.grouped.color[icolor]),
				text : o.grouped.label[i]
			}
		);
		if(increment){
			icolor++;
		}else{
			icolor--;
		}
	}

	if(hwmin>minLimit){  //Show legend
		var y, x;
		leg = d3.select("#visual.visual");
		//get position
		if(scanvas.position[0] === "s"){
			y = "bottom";
			pos.y = 6;
		}
		else{
			aux =
			Number(getComputedStyle(d3.select("#visual.visual")[0][0]).getPropertyValue("margin-bottom").replace("px",""));
			y = "top";
			pos.y = rect.top + rect.height + aux;
		}
		if(scanvas.position[1] === "w"){
			x = "left";
			pos.x = pos.left;
		}
		else{
			x = "right";
			pos.x = pos.left;
		}
		//draw legend
		table = leg.append("div").classed(VisualJS.setup.legendclass,true)
			.attr("style", "position:absolute;"+y+":"+pos.y+"px; "+x+":"+pos.x+"px; display: inline-block;");
		//draw legend
		aux = table
			.append("table")
			.selectAll(".category")
			.data(info).enter()
			.append("tr").attr("class","category");
		aux
			.append("td").attr("class","legendColorBox")
			.append("div").attr("style","border:1px solid #ccc; padding:1px")
			.append("div").attr("style",function(d){return "width 4px; border: 5px solid "+d.color+"; overflow:hidden";});
		aux
			.append("td").attr("class","legendLabel")
			.text(function(d){return d.text;});

		//Now that it have size, move it to adjust
		if(y === "bottom" && el){
			el = d3.select(".VisualJSfooter")[0][0];
			rect = el.getClientRects()[0];
			aux =
			Number(getComputedStyle(d3.select("#visual.visual")[0][0]).getPropertyValue("margin-bottom").replace("px",""));
			table
				.style(y, aux + rect.height + margin + "px");
		}
		leg.selectAll("#visual.visual>svg").on("mousemove",function(d,i){
			var
				el = leg.select("."+VisualJS.setup.legendclass),
				categories = el[0][0].getClientRects()[0],
				margin = 12
			;
			if(
				(
					(
						d3.event.pageX > categories.left - margin &&
						d3.event.pageX < categories.left + categories.width + margin
					)
				)&&
				(
					(
						d3.event.pageY < categories.top + categories.height + margin &&
						d3.event.pageY > categories.top - margin
					)
				)
			){
				el.style("visibility", "hidden");
			}
			else{
				el.style("visibility", "initial");
			}
		});
		leg.selectAll("#visual.visual>svg").on("mouseout",function(d,i){
				leg.select("."+VisualJS.setup.legendclass)
				.style("visibility", "initial");
		});

	}
};
