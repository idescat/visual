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

var VisualJS={
	version: "0.2.3",
	id: "visual",
	symbol : {
		text: "", 
		position: "end"
	},
	
	//Used in maps
	dec: 0, //Used in the map legend
	filter: 0.05, //Used in color assignation in maps
	fixed: null,
	width: 500,
	bwidth: 500, //body width
	height: 500,
	hwmin: 500,
	normal: 500, //If less than this value, apply mini style; otherwise, normal style (see setup)
	scripts: [],
	container: {}, //To allow multiple direct embedding, particular features of every container are saved here
	func: {}, //Space for external functions

	/* Functions */
	draw: function(){
		VisualJS.tooltip();
		VisualJS.chart();
		window.onresize=function(){
			VisualJS.canvas();
		};
	},

	tooltip: function(){
		var d=document;
		if(!d.getElementById(VisualJS.setup.tooltipid)){
			var tt=d.createElement("div");
			tt.id=VisualJS.setup.tooltipid;
			tt.style.display="none";
			d.body.appendChild(tt);
		}
	},

	getsize: function(id){
		var	
			w=window,
			d=document,
			e=d.documentElement,
			g=d.getElementsByTagName('body')[0],
			vis=d.getElementById(id),
			h1=vis.getElementsByTagName('h1')[0],
			h2=vis.getElementsByTagName('h2')[0],
			hh1=h1.clientHeight,
			hh2=h2.clientHeight,
			bheight=w.innerHeight || e.clientHeight || g.clientHeight
		;
		if(typeof bheight!=="undefined" && typeof hh1!=="undefined" && typeof hh2!=="undefined"){
			if(VisualJS.fixed===null){ //Normal case: full page for visualization (embedded via iframe)
				VisualJS.bwidth=w.innerWidth || e.clientWidth || g.clientWidth;
				VisualJS.width=VisualJS.bwidth-VisualJS.setup.padding.w;
				VisualJS.height=bheight-VisualJS.setup.padding.h-hh1-hh2;
			}else{ //Embed visualization on a page via script
				VisualJS.bwidth=e.clientWidth || g.clientWidth;
				VisualJS.width=VisualJS.fixed[0]-VisualJS.setup.padding.w;
				VisualJS.height=VisualJS.fixed[1]-VisualJS.setup.padding.h-hh1-hh2;
			}
		}
		
		VisualJS.hwmin=Math.min(VisualJS.width,VisualJS.height);
		// We take into account width instead of hwmin because height has little impact on label space
		VisualJS.visualsize=(VisualJS.width<VisualJS.normal) ? VisualJS.setup.mini : VisualJS.setup.normal;
	},

	atext: function (s) {
		return String(s).replace(/&amp;/g, "&"); //More general .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');
	},

	getTitle: function (o) {
		var t=(typeof o.time === "string") ? o.title+". "+o.geo+'. <span class="'+VisualJS.setup.nowrapclass+'">'+o.time+"</span>" : o.title+". "+o.geo+'. <span class="'+VisualJS.setup.nowrapclass+'">'+o.time[0]+"&ndash;"+o.time[o.time.length-1]+"</span>";
		return VisualJS.atext(t);
	},

	// Add "script" to scripts' array 
	// check: false adds script without verifying its existance (used when a parent lib is already missing and existing conditions cannot be met).
	addJS: function (script, check) {
		if(!check || !script.exists.call()) {
			VisualJS.scripts.push(script.js);
			return true;
		}
		return false;
	},

	/* html: tooltip html content
		x, y: mouse coordinates
		Returns: posTT (tooltip coordinates [x,y])
	*/		
	showTooltip: function(html, x, y) {
		var	
			tt=document.getElementById(VisualJS.setup.tooltipid),
			visRightLimit=VisualJS.bwidth - VisualJS.setup.margin, //Visual right limit
			pos={} //Final tooltip position
		;
		tt.innerHTML=html;
		tt.style.display="block"; //Paint to get width
		var ttHalfWidth=tt.clientWidth/2; //Half of tooltip width
		//Default: tooltip top and centered
		pos.x=x - ttHalfWidth; 
		pos.y=y - tt.clientHeight - 5; //5 to avoid cursor

		if(x + ttHalfWidth > visRightLimit){ //Outside right: --> move to left
			pos.x -=  (x + ttHalfWidth) - visRightLimit;
		}else if (pos.x < VisualJS.setup.margin){ //Outside left --> move to right
			pos.x += VisualJS.setup.margin - pos.x ;
		}//Outside top --> move down
		if(pos.y < VisualJS.setup.margin){
			pos.y += tt.clientHeight*1.75;
		}//Outside bottom not possible
		tt.style.left=pos.x + 'px';
		tt.style.top=pos.y + 'px';
	},

	format: function(n){
		if(typeof n==="undefined" || n===null){
			return VisualJS.setup.i18n.text.na[VisualJS.lang];
		}
		n+="";
		var 
			rgx=/(\d+)(\d{3})/,
			x=n.split("."),
			x1=x[0],
			x2=(x.length>1) ? VisualJS.setup.i18n.text.dec[VisualJS.lang] + x[1] : ""
		;
		while (rgx.test(x1)) {
			x1=x1.replace(rgx, "$1" + VisualJS.setup.i18n.text.k[VisualJS.lang] + "$2");
		}
		return x1+x2;
	},	

	tooltipText: function(id, l, v) {
		var 
			si=(v) ? VisualJS.container[id].symbol.text : "",
			va=(l) ? VisualJS.format(v) : v,
			t=(VisualJS.container[id].symbol.position==="end") ? va+ " "+si : si+" "+va
		;
		return l ? "<strong>"+t+"</strong> "+l : t; //no need to atext()
	},	
	
	//o is array, then loop
	load: function (o) {
		function isArray(o) {
			return Object.prototype.toString.call(o) === "[object Array]";
		}

		if(typeof VisualJS.setup==="undefined"){
			window.alert("Visual: Setup not found (visual.setup.js)!");
		}

		if(!isArray(o)){
			VisualJS.get(o);
		}else{
			for(var i=0, len=o.length; i<len; i++){
				VisualJS.get(o[i]);
			}
		}
	},

	//o: object passed thru visual(o)
	get: function (o) {
		if(typeof o.id!=="undefined") {
			VisualJS.id=o.id;
		}
		if(typeof o.fixed!=="undefined"){
			VisualJS.fixed=o.fixed;
		}
		if(typeof o.symbol!=="undefined"){
			VisualJS.container[VisualJS.id]={
				symbol: {
					text: (typeof o.symbol.text!=="undefined") ? o.symbol.text : VisualJS.symbol.text,
					position: (typeof o.symbol.position!=="undefined") ? o.symbol.position : VisualJS.symbol.position
				}
			};
		}else{
			VisualJS.container[VisualJS.id]={symbol: VisualJS.symbol};
		}
		VisualJS.lang=o.lang || VisualJS.setup.i18n.lang;

		var
			selector="#" + VisualJS.id,
			canvas=selector + " .vis", //Currently, only used in Flot
			ie8=VisualJS.setup.func.old("ie9") //Means: less than IE9
		;

		if(o.type==="cmap"){
			if(ie8){
				document.getElementById(VisualJS.id).innerHTML="<p>"+VisualJS.setup.i18n.text.oldbrowser[VisualJS.lang]+"</p>";
			}else{
				if(typeof o.by!=="string"){
					return;
				}

				VisualJS.addJS( VisualJS.setup.lib.maps, true );
				VisualJS.addJS( VisualJS.setup.lib.d3, true );
				VisualJS.addJS( VisualJS.setup.map[o.by], true );

				///////// CHART
				VisualJS.chart=function(){
					var 
						min=(typeof o.filter!=="undefined") ? o.filter : VisualJS.filter,
						max=1-min,
						//hasGroup: grouped property exists, is object (array), has content and data seems to include a group property
						hasGroup=(typeof o.grouped==="object" && o.grouped.length>0 && o.data[0].hasOwnProperty("group")),
						hasValues=(!hasGroup && o.data[0].hasOwnProperty("val")),
						num=(hasGroup) ? o.grouped.length : ((hasValues) ? VisualJS.setup.colors.map.max : 1),
						colors=VisualJS.func.colors( VisualJS.setup.colors.map.base, num, "fill", "q" ),
						visual=d3.select(selector),
						xy=d3.geo.mercator()
							.center(VisualJS.map.center)
							.scale(VisualJS.map.scale)
							.translate([250, 250]), //500/2
						path=d3.geo.path().projection(xy),
						tooltip=d3.select("#" + VisualJS.setup.tooltipid)
					;

					if (typeof o.dec!=="undefined"){
						VisualJS.dec=o.dec;
					}

					VisualJS.canvas=function(){
						visual.html('<h1></h1><h2></h2>');
						d3.select(selector+" h1").html(VisualJS.getTitle(o));
						d3.select(selector+" h2").html(VisualJS.atext(o.source));
						VisualJS.getsize(VisualJS.id);

						var 
							left=Math.round((VisualJS.width-VisualJS.hwmin)/2),
							valors=d3.map(),
							val=[],
							groups, //key: id, value: group
							setGroups=function(g,r){},
							legend=function(){},
							checkGrouped,
							groupLabel,
							inf,
							sup,
							vis=visual
								.insert("svg:svg", "h2")
								.attr("width", VisualJS.hwmin)
								.attr("height", VisualJS.hwmin)
						;

						if(hasGroup){
							groups=d3.map();
							setGroups=function(g, r){
								g.set(r.id, r.group);
							}; 
							checkGrouped=function(g, v, p, inf, sup){
								return "q" + (g.get(p[VisualJS.map.id])-1);
							};
							groupLabel=function(g, p){
								var 
									em=o.grouped[(g.get(p[VisualJS.map.id])-1)],
									ret=p[VisualJS.map.label]
								;
								if(typeof em!=="undefined"){
									ret+=" <em>" + em + "</em>";
								}
								return ret;
							};
							
						}else{
							if(hasValues){
								checkGrouped=function(g, v, p, inf, sup){
									var quantize=d3.scale.quantize()
										.domain([inf, sup])
										.range(d3.range(num).map(function(i) { return "q" + i; }))
									;
									return quantize(v.get(p[VisualJS.map.id]));
								};
								legend=VisualJS.func.legend;							
							}else{ 
								checkGrouped=function(g, v, p, inf, sup){
									return (v.get(p[VisualJS.map.id])!=="") ? "" : "q"+(num-1);
								};	
							}
							groupLabel=function(g, p){
								return p[VisualJS.map.label];
							};
						}

						for (var i=0, odata=o.data, len=odata.length; i<len; i++){
							var r=odata[i];
							if(r.hasOwnProperty("val")){
								valors.set(r.id, r.val);
							}else{ //If no val property on data (for example, grouped info), then do not print value on tooltip.
								valors.set(r.id, "");
							}
							val.push(r.val);
							setGroups(groups, r); //Does nothing if no groups
						}
						val.sort(function(a, b) {
							return a-b;
						});
						
						var
							inf=d3.quantile(val, min).toFixed(VisualJS.dec),
							sup=d3.quantile(val, max).toFixed(VisualJS.dec)
						;

						vis.style("margin-left", left+"px");
						vis.append("svg:g")
							.attr("class", "area")
							.attr("transform", "scale("+(VisualJS.hwmin/500)+")")
							.selectAll("path")
							.data(VisualJS.map.features)
							.enter().append("svg:path")
							.attr("class", function(d) {
								return checkGrouped(groups, valors, d.properties, inf, sup);
							})
							.attr("d", path)
							.on("mousemove", function(d){
								if(hasValues || typeof valors.get(d.properties[VisualJS.map.id])!=="undefined"){
									VisualJS.showTooltip(
										VisualJS.tooltipText(
											VisualJS.id,
											groupLabel(groups, d.properties),
											valors.get(d.properties[VisualJS.map.id])
										), 
										d3.event.pageX, 
										d3.event.pageY
									);
								}
							})
							.on("mouseout", function(){return tooltip.style("display", "none");})
						;
						legend(VisualJS.id, VisualJS.format(sup), VisualJS.format(inf), colors[colors.length-1], colors[0], vis, tooltip, VisualJS.hwmin);
					};
					VisualJS.canvas();
				}
			}
		}else{
			//(o.type==="tsline" || o.type==="tsbar" || o.type==="bar" || o.type==="rank"  || o.type==="pyram")
			if( VisualJS.addJS( VisualJS.setup.lib.jquery, true ) ){ //No jQuery? Add Flot without checking
				var hasFlot=false;
				VisualJS.addJS( VisualJS.setup.lib.jquery.flot, false );
			}else{ //Has jQuery but not Flot?
				if( VisualJS.addJS( VisualJS.setup.lib.jquery.flot, true ) ){
					var hasFlot=false;
				}else{
					var hasFlot=true;
				}
			}

			if(ie8){
				VisualJS.addJS( VisualJS.setup.lib.excanvas, true);
			}

			var 
				transform=function(){}, //Local function in load(). It will be redefined.
				series=[],
				ticks=[],
				opt=[],
				stacked=o.stacked || false,
				ts=function(){
					var fbars=function(si){
						return; //When stacked an undefined is expected in bars (null or false won't work)
					}
					if(stacked){
						VisualJS.addJS( VisualJS.setup.lib.jquery.flot.stack, hasFlot ); //Check plugin only if we have Flot
					}else{
						if(o.type==="tsbar"){
							VisualJS.addJS( VisualJS.setup.lib.jquery.flot.orderbars, hasFlot ); //Check plugin only if we have Flot
							var fbars=function(si){
								return si.bars;
							}
						}
					}
					transform=function(d,t,b){ // Local in load(), not ts().
						for(var i=0, len=t.length; i<len; i++){
							ticks.push([i,t[i]]);
						}
						for(var i=0, len=d.length; i<len; i++){
							for(var data=[], v=d[i].val, vlen=v.length, j=0; j<vlen; j++){
								data.push([j,v[j]]);
							}
							if(o.type!=="tsbar" || stacked || len===1){//if tsbar with one series (len===1) must be treated like stacked (even though it's not)
								series.push({label: d[i].label, data: data});
							}else{
								series.push({label: d[i].label, data: data, bars: { show: true, barWidth: 0.2, order: i+1, lineWidth: 2 }}); //barWidth should probably be computed dynamically considering number of series (this value allows only for a max of 3 series)
							}
						}
						for (var i=0, slen=series.length; i<slen; i++){
							opt.push(
								{
									data: series[i].data,
									label: series[i].label,
									bars: fbars(series[i]),
									shadowSize: 4
								}
							);
						}
						shlegend=(slen>1);
					};
					return VisualJS.getTitle(o);
				}
			;

			switch(o.type){
				case "pyram":
					VisualJS.addJS( VisualJS.setup.lib.jquery.flot.pyramid, hasFlot ); //Check plugin only if we have Flot

					Array.max=function(a){
						return Math.max.apply(Math, a);
					};
					var 
						transform=function(d,t,b){
							max=Math.max( Array.max(d[0].val) , Array.max(d[1].val) ),
							series[0]={label: d[0].label, data: [], pyramid: {direction: "L"}};
							series[1]={label: d[1].label, data: []};
							for(var i=0, len=b.length; i<len; i++){
								series[0].data[i]=[ b[i] , d[0].val[i] ];
								series[1].data[i]=[ b[i] , d[1].val[i] ];
							}
						},
						shlegend=true,
						stack=false,
						lines=false,
						points=false,
						bars=false,
						title=VisualJS.getTitle(o)
					;
				break;
				case "rank":
					var 
						data=[],
						transform=function(d,t,b){
							for(var i=0, len=d.length; i<len; i++){
								//cal incorporar en ordre invers
								ticks[i]=[i,d[len-i-1][0]];
								data[i]=[d[len-i-1][1],i];
							}
							series={data: data};
						},
						shlegend=false, //Currently only one series aloowed when rank (no series loop)
						stack=false, //See previous line
						lines=false,
						points=false,
						bars=true,
						title=VisualJS.getTitle(o)
					;
					break;
				case "bar":
					VisualJS.addJS( VisualJS.setup.lib.jquery.flot.categories, hasFlot ); //Check plugin only if we have Flot
					var 
						transform=function(d,t,b){
							series=d;
							shlegend=(series.length>1);
						},
						stack=true,
						lines=false,
						points=false,
						bars=true,
						title=VisualJS.getTitle(o)
					;
					break;
				case "tsline":
					var 
						title=ts(),
						stack=null,
						lines=true,
						points=true,
						bars=false
					;
					break;
				case "tsbar":
					var 
						title=ts(),
						stack=true,
						lines=false,
						points=false,
						bars=true
					;
					break;
			}

			VisualJS.chart=function(){
				transform(o.data, o.time, o.by);

				$.fn.UseTooltip=function (id) {
					var previousPoint=[];
					
					$(this).bind("plothover", function (event, pos, item) {
						if (item) {
							if (previousPoint!=[item.seriesIndex, item.dataIndex]) {
								previousPoint=[item.seriesIndex, item.dataIndex];
								var 
									x=item.datapoint[0], 
									y=item.datapoint[1],
									itemlab=(o.type!=="bar") ? item.series.label : series[x][0],
									label=(o.type!=="rank") ? itemlab : ticks[y][1],
									tick=(o.type!=="rank" && o.type!=="bar") ? 
										(
											(stacked || series.length===1) ? 
												ticks[x][1]
												:
												(
													(o.type==="pyram") ? item.series.yaxis.ticks[item.dataIndex].label : ticks[item.dataIndex][1]
												)
										)
										: false
									,
									val=(o.type==="pyram") ? Math.abs(x) :
										(o.type!=="rank") ? 
										(
											(o.type!=="tsbar") ? 
												y : 
													(stacked || series.length===1) ? series[item.seriesIndex].data[x][1] : y
										)
										: x
								;
								VisualJS.showTooltip(
									VisualJS.tooltipText(
										id,
										(tick) ? label+" ("+tick+")" : label, 
										val
									), 
									pos.pageX, //item.pageX
									pos.pageY  //item.pageY
								); 
							}
						}else{
							$("#"+VisualJS.setup.tooltipid).hide();
							previousPoint=[];
						}
					});
				};
				
				var setup={
						colors: VisualJS.setup.colors.series,
						series: {
							stack: stack,
							bars: {
								show: bars,
								barWidth: 0.7,
								align: "center",
								fill: 0.9 
							},
							lines: {
								show: lines
							},
							points: {
								show: points,
								radius: 2 //We use radius for real values (interpolated values will be shown without it)
							}
						},
						legend: {
							show: shlegend
						},
						grid: {
							borderWidth: 1,
							hoverable: true, 
							clickable: false, 
							mouseActiveRadius: 10
						},
						xaxis:{ },
						yaxis:{ }
					}
				;

				VisualJS.canvas=function(){
					$(selector).html('<h1></h1><h2></h2>');
					$(selector+" h1").html(title);
					$(selector+" h2").html(VisualJS.atext(o.source));
					VisualJS.getsize(VisualJS.id);
					$(selector+" h1").after('<div class="vis '+VisualJS.visualsize+'" style="width: '+VisualJS.width+'px; height: '+VisualJS.height+'px;"></div>');

					switch(o.type){
						case "pyram":
							setup.series.pyramid={show: true, barWidth: 1};
							setup.xaxis.max=max*(1.02); //Increase area by 2% of the longest bar
							$.plot(
								canvas,
								series,
								setup
							);
						break;
						case "rank":
							setup.series.bars.horizontal=true;
							setup.yaxis.ticks=( (VisualJS.height/ticks.length) > 11) ? ticks : null; //If too many categories and not enough height, remove y-labels
							setup.xaxis.max=o.data[0][1]*(1.02); //Increase area by 2% of the longest bar
							setup.yaxis.autoscaleMargin=0;
							setup.series.bars.barWidth=0.5;
							$.plot(
								canvas,
								[series],
								setup
							);
							break;
						case "bar":
							setup.xaxis.mode="categories";
							setup.xaxis.tickLength=0;
							$.plot(
								canvas,
								[series],
								setup
							);
							break;
						default:
							setup.xaxis.ticks=ticks;
							$.plot(
								canvas,
								opt,
								setup
							);
					}
					$(canvas).UseTooltip(VisualJS.id);		
				}
				VisualJS.canvas();
			}
		}

		if(VisualJS.scripts.length && typeof LazyLoad==="object"){
			LazyLoad.js(VisualJS.scripts, VisualJS.draw);
		}else{ //If no Lazyload, user must manually include the required libs
			VisualJS.draw();
		}
	}
};

if(typeof visual!=="function"){
	//Create the visual alias
	var visual=VisualJS.load;
} //If you already have a visual() function, use VisualJS.load({...});