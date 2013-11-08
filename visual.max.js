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
	version: "0.7.0",
	show: true, //To be used when a callback function is specified: "false" means "don't run VisualJS.chart()", that is, load everything but don't draw.
	old: false, //You can change it to true programmatically if you already know the browser is IE<9
	fixed: null,
	width: 500,
	bwidth: 500, //body width
	height: 500,
	normal: 500, //If less than this value, apply mini style; otherwise, normal style (see setup)

	scripts: [],
	ticks: [],
	map: {},
	container: {}, //To allow multiple direct embeddings, particular features of every container are saved here
	func: {}, //Space for external functions
	callback: null, //Or specify a default callback function when the user hasn't specified one

	/* Functions */
	draw: function(){
		var chart=false;
		if(typeof VisualJS.chart==="function"){ //can be undefined if "cmap" && old browser
			VisualJS.tooltip();
			VisualJS.show && VisualJS.chart();
			window.onresize=function(){
				VisualJS.canvas();
			};
			chart=true;
		}
		if(VisualJS.callback!==null){
			VisualJS.callback.call( {id: VisualJS.id, chart: chart} );
		}
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
			vsetup=VisualJS.setup,
			html=vsetup.html,
			headingElement=html.heading,
			footerElement=html.footer,
			w=window,
			d=document,
			e=d.documentElement,
			g=d.getElementsByTagName("body")[0],
			vis=d.getElementById(id),
			h=vis.getElementsByTagName(headingElement)[0].clientHeight,
			f=vis.getElementsByTagName(footerElement)[0].clientHeight,
			bheight=w.innerHeight || e.clientHeight || g.clientHeight
		;
		if(typeof bheight!=="undefined" && typeof h!=="undefined" && typeof f!=="undefined"){
			if(VisualJS.fixed===null){ //Normal case: full page for visualization (embedded via iframe)
				VisualJS.bwidth=w.innerWidth || e.clientWidth || g.clientWidth;
				VisualJS.width=VisualJS.bwidth-vsetup.padding.w;
				VisualJS.height=bheight-vsetup.padding.h-h-f;
			}else{ //Embed visualization on a page via script
				VisualJS.bwidth=e.clientWidth || g.clientWidth;
				VisualJS.width=VisualJS.fixed[0]-vsetup.padding.w;
				VisualJS.height=VisualJS.fixed[1]-vsetup.padding.h-h-f;
			}
		}

		// We take into account width because height has little impact on label space
		VisualJS.visualsize=(VisualJS.width<VisualJS.normal) ? vsetup.mini : vsetup.normal;
	},

	atext: function (s) {
		return String(s).replace(/&amp;/g, "&"); //More general .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');
	},

	getHeading: function (o) {
		if(VisualJS.autoheading===false){
			return o.title;
		}

		var 
			t=[],
			add=function(s, nw){ 
				if(typeof s==="string"){ 
					if(nw===true){
						s='<span class="'+VisualJS.setup.nowrapclass+'">' + s + "</span>";
					}
					t.push(s);
				}
			}
		;
		if(o.time!==null && typeof o.time==="object"){
			var 
				start=VisualJS.tformat(o.time[0]),
				end=VisualJS.tformat(o.time[o.time.length-1]),
				time=start+"&ndash;"+end
			;
		}else{
			var time=VisualJS.tformat(o.time);
		}

		add(o.title, false);
		add(o.geo, true);
		if(time!==null) {
			add(time, true);
		}
		return  VisualJS.atext(t.join(". "));
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
			visRightLimit=VisualJS.bwidth-VisualJS.setup.margin, //Visual right limit
			pos={} //Final tooltip position
		;
		tt.innerHTML=html;
		tt.style.display="block"; //Paint to get width
		var ttHalfWidth=tt.clientWidth/2; //Half of tooltip width
		//Default: tooltip top and centered
		pos.x=x-ttHalfWidth; 
		pos.y=y-tt.clientHeight-5; //5 to avoid cursor

		if(x + ttHalfWidth > visRightLimit){ //Outside right: --> move to left
			pos.x-= (x + ttHalfWidth)-visRightLimit;
		}else if(pos.x<VisualJS.setup.margin){ //Outside left --> move to right
			pos.x+=VisualJS.setup.margin-pos.x ;
		}//Outside top --> move down
		if(pos.y<VisualJS.setup.margin){
			pos.y+=tt.clientHeight*1.75;
		}//Outside bottom not possible
		tt.style.left=pos.x+"px";
		tt.style.top=pos.y+"px";
	},

	format: function(n){
		if(typeof n==="undefined" || n===null){
			return VisualJS.setup.i18n.text.na[VisualJS.lang];
		}
		if(typeof n==="number"){
			var 
				s=n.toFixed(VisualJS.container[VisualJS.id].dec),
				rgx=/(\d+)(\d{3})/,
				x=s.split("."),
				x1=x[0],
				x2=(x.length>1) ? VisualJS.setup.i18n.text.dec[VisualJS.lang] + x[1] : ""
			;
			while(rgx.test(x1)){
				x1=x1.replace(rgx, "$1" + VisualJS.setup.i18n.text.k[VisualJS.lang] + "$2");
			}
			return x1+x2;
		}
		return "";
	},	

	tformat: function(t){
		if(!t){//undefined, null, "", 0
			return null;
		}
		//Formatted dates are string numbers
		if(isNaN(t)){
			return t;
		}
		switch(t.length){
			case 5:
				var f="quarter";
			break;
			case 6:
				var f="month";
			break;
			default:
				return t;
		}

		var label=VisualJS.setup.i18n.text[f];
		if(typeof label==="undefined"){
			return t;
		}
		var text=label[VisualJS.lang];
		if(typeof text==="undefined"){
			return t;
		}
		return text[t.slice(4)-1]+" <span>"+t.slice(0,4)+"</span>";
	},

	tooltipText: function(id, l, v) {
		var
			lab=" "+VisualJS.container[id].unit.label,
			si=(typeof v==="number") ? VisualJS.container[id].unit.symbol : "",
			va=VisualJS.format(v),
			t=(va!==	VisualJS.setup.i18n.text.na[VisualJS.lang]) ?
				( (VisualJS.container[id].unit.position==="end") ? va+lab+" "+si : si+va+lab )
				: // Value not available
				va
		;
		return l ? "<strong>"+t+"</strong> "+l : t; //no need to atext()
	},

	iframe: function(o, css){
		var
			vsetup=VisualJS.setup,
			clas=(typeof o.clas==="string") ? o.clas : vsetup.clas,
			html="<html><head>",
			old=vsetup.func.old("ie9"),
			create=function(){
				var 
					d=document,
					iframe=d.createElement("iframe"),
					e=d.getElementById(o.id)
				;

				//iframe.seamless="seamless";
				iframe.frameBorder="0";
				iframe.scrolling="no";
				e.parentNode.insertBefore(iframe, e.nextSibling); //we insert iframe after script
				return iframe;				
			},
			content=function(iframe, html){
				if(typeof iframe !=="undefined"){
					var iframeDoc;
					if(iframe.contentDocument){
						iframeDoc=iframe.contentDocument;
					}
					else if(iframe.contentWindow){
						iframeDoc=iframe.contentWindow.document;
					}
					else if(window.frames[iframe.name]){
						iframeDoc=window.frames[iframe.name].document;
					}
					if(iframeDoc){
						iframeDoc.open();
						iframeDoc.write(html);
						iframeDoc.close();
					}
				}
			}
		;

		if(typeof css==="string"){
			if(css.indexOf("{")===-1){ //No "{"? We assume it's a URI
				html+= '<link href="'+ css +'" rel="stylesheet" type="text/css"\/>';
			}else{
				html+= '<style type="text/css">'+ css +'<\/style>';
			}
		}
		html+= '<script type="text/javascript" src="'+ VisualJS.setup.main.visual +'"><\/script>';
		html+= '<script type="text/javascript" src="'+ VisualJS.setup.main.setup +'"><\/script>';
		html+= '<script type="text/javascript" src="'+ VisualJS.setup.main.lazy +'"><\/script>';
		html+= '<\/head><body><div id="'+ o.id +'" class="'+ clas +'"><\/div><script>window.setTimeout(function(){VisualJS.old='+ old +'; visual('+ JSON.stringify(o) +');},1);<\/script><\/body><\/html>';
		content(create(), html);
	},

	/* Draws two charts side by side 
		Input: {
				css : "/styles/visual.css", //CSS file or CSS rules, or array of size 2 of CSS files or CSS rules
				title : "Optional",
				footer : "Optional",
				load : [{},{}]
		}
	*/
	compare: function(o){
		var 
			vsetup=VisualJS.setup,
			sepw=VisualJS.setup.separator,
			id=(typeof o.id==="string") ? o.id : vsetup.id,
			css=
				(Object.prototype.toString.call(o.css)==="[object Array]") ? 
					((o.css.length===0) ? 
						["", ""] 
						: 
						((o.css.length===1) ? 
							[o.css[0], o.css[0]]
							:
							o.css
						)
					)
					: //Not an array (string assumed)
					[o.css, o.css]
				,
			d=document,
			h1=d.createElement(vsetup.html.heading),
			par=d.createElement(vsetup.html.footer),
			div=d.getElementById(id),
			separator=d.createElement("div"),
			style=d.createElement("style"),
			resize=function(){
				VisualJS.getsize(id);
				var 
					height=VisualJS.height+(vsetup.margin*2),
					width=VisualJS.width+(vsetup.margin),
					rule="iframe{ float: left; width: "+Math.floor((width-sepw)/2)+"px; height:"+height+"px; }" //Let's round it down instead of letting browsers use their own criterion
				;
				div.style.height=height+"px";
				div.style.width=width+"px"; 
				if (style.styleSheet){ //IE
					style.styleSheet.cssText=rule;
				}else{
					style.innerHTML=rule;
				}
				separator.style.height=height+"px";
			}
		;

		h1.innerHTML=(typeof o.title==="string") ? o.title : "";
		par.innerHTML=(typeof o.footer==="string") ? o.footer : "";
		par.style.clear="both";
		div.appendChild(h1);
		div.appendChild(par);

		d.getElementsByTagName("head")[0].appendChild(style);
		separator.style.width=sepw+"px";
		if("styleFloat" in separator.style) { //IE
			separator.style.styleFloat="left";
		}else{
			separator.style.cssFloat="left";
		}

		for(var i=0; i<2; i++){
			var span=d.createElement("span");
			if(typeof o.load[i].id!=="string"){
				o.load[i].id=vsetup.compareids[i];
			}
			span.id=o.load[i].id;
			div.insertBefore(span, par);
			VisualJS.iframe(o.load[i], css[i]);
		}	
		div.insertBefore(separator, span);

		resize();
		window.onresize=resize;
	},

	//if o is array, then loop
	load: function (o) {
		if(typeof VisualJS.setup==="undefined"){
			window.alert("Visual: Setup not found (visual.setup.js)!");
		}

		if(Object.prototype.toString.call(o)!=="[object Array]"){
			VisualJS.get(o);
		}else{
			for(var i=0, len=o.length; i<len; i++){
				VisualJS.get(o[i]);
			}
		}
	},

	//o: object passed thru visual(o)
	get: function (o) {
		var
			vsetup=VisualJS.setup,
			html=vsetup.html,
			scanvas=vsetup.canvas,
			headingElement=html.heading,
			footerElement=html.footer,
			ie8=VisualJS.old||vsetup.func.old("ie9") //Means: less than IE9
		;

		VisualJS.id=(typeof o.id==="string") ? o.id : vsetup.id;
		if(typeof o.fixed==="object"){
			VisualJS.fixed=o.fixed;
		}
		if(typeof o.unit==="object"){
			VisualJS.container[VisualJS.id]={
				unit: {
					label: (typeof o.unit.label==="string") ? o.unit.label : scanvas.unit.label,
					symbol: (typeof o.unit.symbol==="string") ? o.unit.symbol: scanvas.unit.symbol,
					position: (typeof o.unit.position==="string") ? o.unit.position : scanvas.unit.position
				}
			};
		}else{
			VisualJS.container[VisualJS.id]={unit: scanvas.unit};
		}

		VisualJS.container[VisualJS.id].dec=(typeof o.dec==="number") ? o.dec : scanvas.dec;
		VisualJS.show=(typeof o.show==="boolean") ? o.show : VisualJS.show;
		VisualJS.autoheading=(typeof o.autoheading==="boolean") ? o.autoheading : scanvas.autoheading;
		VisualJS.legend=(typeof o.legend==="boolean") ? o.legend: scanvas.legend;
		VisualJS.lang=o.lang || vsetup.i18n.lang;
		VisualJS.callback=(typeof o.callback==="function") ? o.callback: VisualJS.callback;

		if(typeof o.grid==="object"){
			VisualJS.grid={
				width: (typeof o.grid.width==="number") ? o.grid.width : scanvas.grid.width
			};
		}else{
			VisualJS.grid=scanvas.grid;
		}
		if(typeof o.axis==="object"){
			VisualJS.axis={
				x: (typeof o.axis.x==="boolean") ? o.axis.x : scanvas.axis.x,
				y: (typeof o.axis.y==="boolean") ? o.axis.y : scanvas.axis.y
			};
		}else{
			VisualJS.axis=scanvas.axis;
		}

		var
			selector="#" + VisualJS.id,
			canvas=selector + " ."+vsetup.canvasclass //Currently, only used in Flot
		;

		if(o.type==="cmap"){
			if(ie8){
				document.getElementById(VisualJS.id).innerHTML="<p>"+vsetup.i18n.text.oldbrowser[VisualJS.lang]+"</p>";
			}else{
				if(typeof o.by!=="string"){
					return;
				}

				VisualJS.addJS( vsetup.lib.maps, true );
				VisualJS.addJS( vsetup.lib.d3, true );
				VisualJS.addJS( vsetup.map[o.by], true );

				///////// CHART
				VisualJS.chart=function(){
					var 
						map=VisualJS.map[o.by],
						mwidth=map.area[0],
						mheight=map.area[1],
						//hasGroup: grouped property exists, is object (array), has content and data seems to include a group property
						hasGroup=(
							typeof o.grouped==="object" &&
							typeof o.grouped.label==="object" &&
							o.grouped.label.length>0 &&
							o.data[0].hasOwnProperty("group")
						),
						hasValues=(!hasGroup && o.data[0].hasOwnProperty("val")),
						num=(hasGroup) ? o.grouped.label.length : ((hasValues) ? vsetup.colors.map.max : 1),
						prefix=vsetup.colorclassprefix,
						colors=VisualJS.func.colors( vsetup.colors.map.base, num, "fill", prefix, 
							(
								(
									hasGroup && 
									typeof o.grouped.color==="object" && 
									o.grouped.color.length===o.grouped.label.length
								) 
								? 
								o.grouped.color
								: 
								[]
							),
							VisualJS.id 
						),
						visual=d3.select(selector),
						projection=d3.geo[map.projection](),
						//Support for projections that don't support the center method (albersUSA, for example).
						proj=(typeof map.center==="object" && typeof projection.center==="function") ? projection.center(map.center) : projection,
						xy=proj
							.scale(map.scale)
							.translate([mwidth/2, mheight/2]),
						path=d3.geo.path().projection(xy),
						tooltip=d3.select("#" + vsetup.tooltipid)
					;

					VisualJS.canvas=function(){
						visual.html("<"+headingElement+"></"+headingElement+"><"+footerElement+"></"+footerElement+">");
						d3.select(selector+" "+headingElement).html(VisualJS.getHeading(o));
						d3.select(selector+" "+footerElement).html(VisualJS.atext(o.footer || ""));
						VisualJS.getsize(VisualJS.id);

						var 
							id=VisualJS.id,
							valors=d3.map(),
							val=[],
							groups, //key: id, value: group
							setGroups=function(){},
							legend=function(){},
							checkGrouped,
							groupLabel,
							min=(typeof o.filter==="number") ? o.filter : scanvas.filter,
							max=1-min,
							inf,
							sup,
							hh=VisualJS.height/mheight,
							ww=VisualJS.width/mwidth,
							width=Math.min(
								Math.round( mwidth*hh ),
								VisualJS.width
							),
							height=Math.min(
								Math.round( mheight*ww ),
								VisualJS.height
							),
							left=Math.floor( (VisualJS.width-width)/2 ),
							topbottom=Math.floor( (VisualJS.height-height)/2 ),
							scale=(hh<ww) ? hh : ww,
							vis=visual
								.insert("svg:svg", footerElement)
								.attr("width", width)
								.attr("height", height)
						;

						if(hasGroup){
							groups=d3.map();
							setGroups=function(g, r){
								g.set(r.id, r.group);
							}; 
							checkGrouped=function(g, v, p){
								return prefix + (g.get(p[map.id])-1);
							};
							groupLabel=function(g, p){
								var 
									em=o.grouped.label[(g.get(p[map.id])-1)],
									ret=p[map.label]
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
										.range(d3.range(num).map(function(i) { return prefix + i; }))
									;
									return quantize(v.get(p[map.id]));
								};
								legend=VisualJS.func.legend;							
							}else{ 
								checkGrouped=function(g, v, p){
									return (v.get(p[map.id])!=="") ? "" : prefix+(num-1);
								};	
							}
							groupLabel=function(g, p){
								return p[map.label];
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

						if(
							Object.prototype.toString.call(o.filter)==="[object Array]" && 
							o.filter.length===2 && 
							typeof o.filter[0]==="number" && 
							typeof o.filter[1]==="number" &&
							o.filter[0]<o.filter[1]
						){
							inf=o.filter[0];
							sup=o.filter[1];
						}else{
							inf=d3.quantile(val, min);
							sup=d3.quantile(val, max);
						}
						
						vis.style("margin-left", left+"px");
						vis.style("margin-top", topbottom+"px");
						vis.style("margin-bottom", topbottom+"px");
						vis.append("svg:g")
							.attr("class", vsetup.areaclass)
							.attr("transform", "scale("+scale+")")
							.selectAll("path")
							.data(map.features)
							.enter().append("svg:path")
							.attr("class", function(d) {
								return checkGrouped(groups, valors, d.properties, inf, sup);
							})
							.attr("d", path)
							.on("mousemove", function(d){
								if(hasValues || typeof valors.get(d.properties[map.id])!=="undefined"){
									VisualJS.showTooltip(
										VisualJS.tooltipText(
											id,
											groupLabel(groups, d.properties),
											valors.get(d.properties[map.id])
										), 
										d3.event.pageX, 
										d3.event.pageY
									);
								}
							})
							.on("mouseout", function(){return tooltip.style("display", "none");})
						;
						if(VisualJS.legend && typeof map.legend==="object") { //If legend specified (array), draw it
							legend(
								id,
								VisualJS.tooltipText(id, null, sup),
								VisualJS.tooltipText(id, null, inf),
								colors[colors.length-1],
								colors[0],
								vis,
								tooltip,
								map.area,
								map.legend
							);
						}
					};
					VisualJS.canvas();
				}
			}
		}else{
			//(o.type==="tsline" || o.type==="tsbar" || o.type==="bar" || o.type==="rank"  || o.type==="pyram")
			if( VisualJS.addJS( vsetup.lib.jquery, true ) ){ //No jQuery? Add Flot without checking
				var hasFlot=false;
				VisualJS.addJS( vsetup.lib.jquery.flot, false );
			}else{ //Has jQuery but not Flot?
				if( VisualJS.addJS( vsetup.lib.jquery.flot, true ) ){
					var hasFlot=false;
				}else{
					var hasFlot=true;
				}
			}

			if(ie8){
				VisualJS.addJS( vsetup.lib.excanvas, true);
			}

			var 
				transform=function(){}, //Local function in load(). It will be redefined.
				series=[],
				ticks=[],
				opt=[],
				stacked=o.stacked || false,
				ts=function(){
					var fbars=function(){
						return; //When stacked an undefined is expected in bars (null or false won't work)
					}
					if(stacked){
						VisualJS.addJS( vsetup.lib.jquery.flot.stack, hasFlot ); //Check plugin only if we have Flot
					}else{
						if(o.type==="tsbar"){
							VisualJS.addJS( vsetup.lib.jquery.flot.orderbars, hasFlot ); //Check plugin only if we have Flot
							var fbars=function(si){
								return si.bars;
							}
						}
					}
					transform=function(d,t){ // Local in load(), not ts().
						for(var i=0, len=t.length; i<len; i++){
							ticks.push([i,t[i]]);
							VisualJS.ticks.push([i,t[i]]); //keep original ticks
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
					return VisualJS.getHeading(o);
				}
			;

			switch(o.type){
				case "pyram":
					VisualJS.addJS( vsetup.lib.jquery.flot.pyramid, hasFlot ); //Check plugin only if we have Flot

					Array.max=function(a){
						return Math.max.apply(Math, a);
					};
					var 
						max,
						transform=function(d,t,b){
							max=Math.max( Array.max(d[0].val) , Array.max(d[1].val) );
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
						heading=VisualJS.getHeading(o)
					;
				break;
				case "rank":
					var 
						data=[],
						transform=function(d){
							for(var i=0, len=d.length; i<len; i++){
								//Include in reverse order
								ticks[i]=[i,d[len-i-1][0]];
								data[i]=[d[len-i-1][1],i];
							}
							series={data: data};
						},
						shlegend=false, //Currently only one series allowed when rank (no series loop)
						stack=false, //See previous line
						lines=false,
						points=false,
						bars=true,
						heading=VisualJS.getHeading(o)
					;
					break;
				case "bar":
					VisualJS.addJS( vsetup.lib.jquery.flot.categories, hasFlot ); //Check plugin only if we have Flot
					var 
						transform=function(d){
							series=d;
							shlegend=(series.length>1);
						},
						stack=true,
						lines=false,
						points=false,
						bars=true,
						heading=VisualJS.getHeading(o)
					;
					break;
				case "tsline":
					var 
						heading=ts(),
						stack=null,
						lines=true,
						points=true,
						bars=false
					;
					break;
				case "tsbar":
					var 
						heading=ts(),
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
													(o.type==="pyram") ? series[pos.x<0 ? 0 : 1].data[item.dataIndex][0] : ticks[item.dataIndex][1] // item.series.yaxis.ticks[item.dataIndex].label won't work in pyram if axis : {y: false}
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
							$("#"+vsetup.tooltipid).hide();
							previousPoint=[];
						}
					});
				};

				shlegend=VisualJS.legend && shlegend;
				var setup={
						colors: vsetup.colors.series,
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
								radius: 1
							}
						},
						legend: {
							show: shlegend
						},
						grid: {
							borderWidth: VisualJS.grid.width,
							hoverable: true,
							clickable: false,
							mouseActiveRadius: 10
						},
						xaxis:{ show: VisualJS.axis.x },
						yaxis:{ show: VisualJS.axis.y }
					}
				;

				VisualJS.canvas=function(){
					$(selector).html("<"+headingElement+"></"+headingElement+"><"+footerElement+"></"+footerElement+">");
					$(selector+" "+headingElement).html(heading);
					$(selector+" "+footerElement).html(VisualJS.atext(o.footer || ""));
					VisualJS.getsize(VisualJS.id);
					$(selector+" "+headingElement).after('<div class="'+vsetup.canvasclass+' '+VisualJS.visualsize+'" style="width: '+VisualJS.width+'px; height: '+VisualJS.height+'px;"></div>');

					var ticklen=ticks.length;
					switch(o.type){
						case "pyram":
							setup.series.pyramid={show: true, barWidth: 1};
							setup.xaxis.max=max*(1.02); //Increase area by 2% of the longest bar
							setup.xaxis.tickFormatter=function(val) {
								return VisualJS.format(val);
							}
							$.plot(
								canvas,
								series,
								setup
							);
						break;
						case "rank":
							setup.series.bars.horizontal=true;
							setup.yaxis.ticks=( (VisualJS.height/ticklen) > 11) ? ticks.slice(0) : 0; //If too many categories and not enough height, remove y-labels
							setup.xaxis.max=o.data[0][1]*(1.02); //Increase area by 2% of the longest bar
							setup.xaxis.tickFormatter=function(val) {
								return VisualJS.format(val);
							}
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
							setup.yaxis.tickFormatter=function(val) {
								return VisualJS.format(val);
							}
							$.plot(
								canvas,
								[series],
								setup
							);
						break;
						//Time series
						case "tsline":
							setup.grid.markings=[ { color: "#999", lineWidth: 1, yaxis: { from: 0, to: 0 } }]; //Zero line in tsline
						case "tsbar":
							setup.yaxis.tickFormatter=function(val) {
								return VisualJS.format(val);
							}
							var 
								ratio=VisualJS.width/ticklen,
								xticks=[],
								digcrit="01" //first month
							;
							switch(VisualJS.ticks[0][1].length){ //Assuming all time periods follow the same pattern
								case 4: //Annual time series (4 digits)
									// Magic rule: Only one year of every two must be displayed if width (mini) is small in comparison with # of ticks
 									if(ratio<30){
										var freq=(ratio>15) ? 2 : ((ratio>8) ? 3 : 4); //if very small, only paint 1 of 3 ticks
										for(var i=0; i<ticklen; i++){
											xticks[i]=(i % freq) ? 
												[ ticks[i][0], "" ]
												:
												[ ticks[i][0], ticks[i][1] ]
											;
										}
										setup.xaxis.ticks=xticks;
									}else{
										setup.xaxis.ticks=ticks;
									}
								break;
								case 5: //quarterly (5 digits)
									digcrit="1"; //first quarter
								case 6: //monthly (6 digits)
									//Magic rule: do not show month/quarter when width is small in comparison with # of ticks
									if(ratio<35){
										for(var i=0; i<ticklen; i++){
											xticks[i]=(VisualJS.ticks[i][1].slice(4)!==digcrit) ?
												[ VisualJS.ticks[i][0], "" ]
												:
												[ VisualJS.ticks[i][0], VisualJS.ticks[i][1].slice(0,4) ]
											//Formatting time
											ticks[i][1]=VisualJS.tformat(VisualJS.ticks[i][1]);
										}
										setup.xaxis.ticks=xticks;
									}else{
										for(var i=0; i<ticklen; i++){
											//Formatting time
											ticks[i][1]=VisualJS.tformat(VisualJS.ticks[i][1]);
										}
										setup.xaxis.ticks=ticks;
									}
								break;
								default: //leave ticks alone
									setup.xaxis.ticks=ticks;
							}

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