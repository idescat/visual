/*
Visual
Copyright (c) 2025 Institut d'Estadistica de Catalunya (Idescat)
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

/* 
	Version 1.2.8	fixes the plugin existence check during setup.
   	Version 1.2.9	fixes overlapping stroke in maps.
	Version 1.3.0 	Modernizes the code (var->let+const). 
						Added support for "bar" stacked charts. 
						Fixed axis labels and ticks bugs. 
						Fixed offset in grouped bars charts. 
						Fixed labels offset in tsbar charts.
	Version 1.3.1 	Fixed path order on mouse enter.
*/

/*jshint esversion: 6*/
/*global d3, LazyLoad*/

let VisualJS={
	version: "1.3.1",
	show: true, //To be used when a callback function is specified: "false" means "don't run VisualJS.chart()", that is, load everything but don't draw.
	old: false, //You can change it to true programmatically if you already know the browser is IE<9
	fixed: null,
	width: 500,
	bwidth: 500, //body width
	height: 500,
	normal: 500, //If less than this value, apply mini style; otherwise, normal style (see setup)

	scripts: [],

	map: {},
	container: {}, //To allow multiple direct embeddings, particular features of every container are saved here
	pub: {}, //To expose Visual-generated content to the outside world
	func: {}, //Space for external functions
	callback: null, //Or specify a default callback function when the user hasn't specified one

	/* Public functions */
	getSize: function(id){
		const
			vsetup=VisualJS.setup,
			html=vsetup.html,
			headingElement=html.heading,
			footerElement= "."+VisualJS.setup.footerclass,
			selector=(typeof jQuery !== "undefined" ? jQuery : (typeof d3 !== "undefined" ? d3.select : document.querySelectorAll.bind(document))),
			w=window,
			d=document,
			e=d.documentElement,
			g=d.getElementsByTagName("body")[0],
			vis=d.getElementById(id),
			computedStyle=function(el, prop) {
				return typeof getComputedStyle === 'function' ?
					getComputedStyle(el)[prop] :
					el.currentStyle[prop];
			},
			getNode=function(sel){
				const el=selector(sel);
				return (el[0] instanceof Element) ? el[0] : (el[0] && el[0][0] ? el[0][0] : undefined);
			},
			outerHeight=function(el) {
				return el ? 
					el.offsetHeight + Math.round(parseFloat(computedStyle(el,"marginTop")) + parseFloat(computedStyle(el,"marginBottom"))) : 
					0;
			},
			head=outerHeight(getNode(headingElement)),
			foot= outerHeight(getNode(footerElement)),
			bheight=w.innerHeight || e.clientHeight || g.clientHeight,
			margin=Math.round(parseFloat(computedStyle(vis,"marginTop")) + parseFloat(computedStyle(vis,"marginBottom"))),
			extrapadding=10
		;

		if(typeof bheight!=="undefined" && typeof head!=="undefined" && typeof foot!=="undefined"){
			if(VisualJS.fixed===null){ //Normal case: full page for visualization (embedded via iframe)
				VisualJS.bwidth=w.innerWidth || e.clientWidth || g.clientWidth;
				VisualJS.width=VisualJS.bwidth-vsetup.padding.w;
				VisualJS.height=Math.floor(bheight-head-foot-margin-extrapadding);
			}else{ //Embed visualization on a page via script
				VisualJS.bwidth=e.clientWidth || g.clientWidth;
				VisualJS.width=VisualJS.fixed[0]-vsetup.padding.w;
				VisualJS.height=Math.floor(VisualJS.fixed[1]-head-foot-margin-extrapadding);
			}
		}

		// We take into account width because height has little impact on label space
		VisualJS.visualsize=(VisualJS.width<VisualJS.normal) ? vsetup.mini : vsetup.normal;

		//Return false when not enough space to draw a chart
		return VisualJS.width > 10 && VisualJS.height > 10;
	},
	arr2html: function (arr){
		let ret="";
		if(typeof arr === "undefined"){}
		else if(Array.isArray(arr)){
			arr.forEach(function(el){
				if(typeof el === "string" && el !== "")
					ret += `<p>${el}</p>`; //footer elements
			});
		}
		else if(typeof arr === "string" && arr !== ""){
			ret += `<p>${arr}</p>`;		//footer elements
		}
		return ret;
	},
	iframe: function(o, css){
		let 
			vsetup=VisualJS.setup,
			clas=typeof o.clas==="string" ? o.clas : vsetup.clas,
			html='<!DOCTYPE html>\n<!--[if lt IE 7]><html class="lt-ie9 lt-ie8 lt-ie7"> <![endif]-->\n<!--[if IE 7]><html class="lt-ie9 lt-ie8"> <![endif]-->\n<!--[if IE 8]><html class="lt-ie9"> <![endif]-->\n<!--[if gt IE 8]><!--> <html> <!--<![endif]-->\n<head>'
		;
		const 
			create=function(){
				const
					d=document,
					iframe=d.createElement("iframe"),
					e=d.getElementById(o.id)
				;

				//accessibility
				iframe.setAttribute("title",o.title ? VisualJS.setup.i18n.text.iframetitle[o.lang]+": "+o.title : VisualJS.setup.i18n.text.iframetitle[o.lang]);
				iframe.setAttribute("aria-hidden","true");
				iframe.setAttribute("role","widget");

				iframe.border="none";
				iframe.overflow="hidden";
				e.parentNode.insertBefore(iframe, e.nextSibling); //we insert iframe after script
				return iframe;
			},
			content=function(iframe, html){
				if(typeof iframe !=="undefined"){
					let iframeDoc;
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
				html+= `<link href="${css}" rel="stylesheet" type="text/css"/>`;
			}else{
				html+= `<style type="text/css">'${css}'</style>`;
			}
		}
		html+= `<script type="text/javascript" src="${VisualJS.setup.main.visual}"></script>`;
		html+= `<script type="text/javascript" src="${VisualJS.setup.main.setup}"></script>`;
		html+= `<script type="text/javascript" src="${VisualJS.setup.main.lazy}"></script>`;
		html+= `</head><body><div id="${o.id}" class="${clas}"></div><script>window.setTimeout(function(){visual(${JSON.stringify(o)});},1);</script></body></html>`;
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
		const
			vsetup=VisualJS.setup,
			sepw=VisualJS.setup.separator,
			id=(typeof o.id==="string") ? o.id : vsetup.id,
			css=
				Array.isArray(o.css) ?
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
					[o.css, o.css],
			d=document,
			h1=d.createElement(vsetup.html.heading),
			h1Content=typeof o.title==="string" ? o.title : "",
			par=d.createElement("p"), //footer element
			parContent=typeof o.footer==="string" ? VisualJS.arr2html(o.footer) : "",
			div=d.getElementById(id),
			separator=d.createElement("div"),
			style=d.createElement("style"),
			resize=function(){
				//It returns false when not enough space to draw a chart
				if(!VisualJS.getSize(id)){return;}
				const
					height=VisualJS.height+((typeof o.footer==="string" && o.footer!=="") ? 14 : 0),
					width=VisualJS.width+vsetup.margin,
					rule=`iframe{ float: left; width: ${Math.floor(((width-sepw)/2)-vsetup.margin)}px; height:${height}px; }` //Let's round it down instead of letting browsers use their own criterion
				;
				style.innerHTML=rule;
				separator.style.height=height+"px";
			}
		;
		let span;

		h1.innerHTML=h1Content;
		h1.style.overflow="auto";
		par.innerHTML= parContent;
		par.style.overflow="auto";
		par.style.clear="both";
		div.appendChild(h1);
		div.appendChild(par);
		d.getElementsByTagName("head")[0].appendChild(style);
		separator.style.width=sepw+"px";
		separator.style.cssFloat="left";

		for(let i=0; i<2; i++){
			span=d.createElement("span");
			if(typeof o.load[i].id!=="string"){
				o.load[i].id=vsetup.compareids[i];
			}
			span.id=o.load[i].id;
			div.insertBefore(span, par);
			VisualJS.iframe(o.load[i], css[i]);
		}
		div.insertBefore(separator, span);
		resize();

		if(!VisualJS.fixed){
			if(window.addEventListener){
				window.addEventListener('resize', resize, false);
			}else{
				window.onresize=resize; //Warning: it will destroy any other attachment
			}
		}
	},
	//if o is array, then loop
	load: function (o) {
		const
			listener=function(event){
				let message;
				const post=function(obj){
					event.source.postMessage(JSON.stringify(obj), "*");
				};

				if(typeof event.data === "string"){
					message=JSON.parse(event.data);
				}
				else if(typeof event.data === "object"){
					message=event.data;
				}

				if(message){
					if(typeof message.action==="undefined"){
						post({
							type: "error",
							data: [ {id: "400", label: "\"action\" is required."} ]
						});
					}else{
						if(message.action==="send"){
							const
								id=message.id || VisualJS.id,
								vis=VisualJS.container[id] || VisualJS.container[id]
							;
							if(vis){
								if(vis.type==="cmap" && !vis.data[0].hasOwnProperty("label")){
									const	label=[]; // key: "id", val:"label"
									for(let m=VisualJS.map[vis.by], i=m.features.length; i--;){
										label[m.features[i].properties[m.id]]=m.features[i].properties[m.label];
									}

									//add 'label' to data
									for(let data=vis.data, j=data.length; j--;){
										data[j].label=label[data[j].id];
									}
								}
								post(vis);
							}else{
								post({
									type: "error",
									data: [ {id: "404", label: "A visualisation with the specified \"id\" was not found"} ]
								});
							}
						}else{
							post({
								type: "error",
								data: [ {id: "400", label:"\"action\" value is not correct."} ]
							});
						}
					}
				}
			}
		;

		if(typeof VisualJS.setup==="undefined"){
			window.alert("Visual: Setup not found (visual.setup.js)!");
		}

		if(Object.prototype.toString.call(o)!=="[object Array]"){
			VisualJS.get(o);
		}else{
			for(let i=0, len=o.length; i<len; i++){
				VisualJS.get(o[i]);
			}
		}

		if(VisualJS.container[VisualJS.id].listen && window.addEventListener){
			window.addEventListener("message", listener, {once: true});
		}

	},
	//o: object passed thru visual(o)
	get: function (o) {
		const
			vsetup=VisualJS.setup,
			html=vsetup.html,
			scanvas=vsetup.canvas,
			headingElement=html.heading,
			footerElement= "."+VisualJS.setup.footerclass,
			isRange=function(r){
				return typeof r!=="undefined" &&
					Array.isArray(r) &&
					r.length===2 &&
					typeof r[0]==="number" &&
					typeof r[1]==="number" &&
					r[0]<r[1];
			},
			validate=function(node, type, setup){
				if(typeof node==="string"){
					if(!type.match(typeof o[node])){
						o[node]=setup[node];
					}
				}else{ //node is an array
					if(!type.match(typeof getNestedParam( o, node ))){
						setNestedParam( o, node, getNestedParam( setup, node ) );
					}
				}
			},
			getNestedParam=function(o, path){
				let tmp=o;
				for(let i=0; i < path.length; i++){
					if(typeof tmp[path[i]] !== "undefined"){
						tmp=tmp[path[i]];
					}else{
						tmp=undefined;
						break;
					}
				}
				return tmp;
			},
			setNestedParam=function(o, path, val){
				//Objects are referenced. Strings are not.
				//Therefore we set the value on the parent object.
				let tmp=o;
				let aux;
				for(let i=0; i <= path.length - 2; i++){
					aux=tmp[path[i]];
					if(typeof aux === "undefined"){
						tmp[path[i]]={};
					}
					tmp=tmp[path[i]];
				}
				tmp[path[path.length - 1]]=val;
			},
			isObject=function(o){
				return typeof o==="object" && o!==null;
			},
			getDataType=function(){
				let ret="invalid";
				if(Array.isArray(o.data)){
					if(Array.isArray(o.data[0])){
						ret="array";
					}else{
						if( isObject(o.data[0]) ){
							if( isObject(o.data[0].z) ){
								ret ="xyz";
							}else{
								if( isObject(o.data[0].y) ){
									ret ="xy";
								}else{
									if(typeof o.data[0].x==="undefined" &&
										 typeof o.data[0].y==="undefined" &&
										 Array.isArray(o.data[0].val) &&
										 o.data[0].val[0]!==null &&
										 (o.data[0].val[0].length==2 || o.data[0].val[0].length==3)
									){
										ret="points";
									}else{
										ret="object";
									}
								}
							}
						}
					}
				}
				return ret;
			},
			correctUnit=function(obj){
				//From new format to old when required
				const processProperty = function(property, checkProperty) {
					const el = obj[property];
					if (el && typeof el[checkProperty] !== "undefined") {
					  obj[property] = el[checkProperty];
					} else if (typeof el === "string") {
					  obj[property] = el;
					} else {
					  obj[property] = "";
					}
				};

				if (o.type !== "xy") {
					for(let property in obj){
						if(obj.hasOwnProperty(property))
							processProperty(property, o.type === "rank" || o.type === "pyram" ? "x" : "y");
					}
				}
				return obj;
			},
			retrieveMinMaxValues=function(){
				/*let aux=[];
				o.data.forEach(function(el){
					aux=aux.concat(el.val);
				});
				return [Math.min.apply( null, aux), Math.max.apply( null, aux)];*/

				if (!o.data || o.data.length === 0) {
					return [undefined, undefined]; // Handle empty data
				}

				let 
					min = o.data[0].val[0], // Initialize with the first value
					max = o.data[0].val[0]
				;

				o.data.forEach(el => {
					el.val.forEach(value => {
						min = value < min ? value : min;
						max = value > max ? value : max;
					});
				});

				 return [min, max];
			},
			correctRange=function(obj){
				let type=getDataType();

				//From new format to old when required
				if(typeof obj === "object" && obj !== null && !Array.isArray(obj) &&
					(type === "array" || type === "object")
				){
					if(o.type === "rank" || o.type === "pyram"){
						obj=obj.x;
					}else if(o.type !== "xy"){
						obj=obj.y;
					}
				}

				//null null case, old format
				if(
					Array.isArray(obj) && obj.length === 2 &&
					obj[0] === null && obj[1] === null
				){
					//Check if null null
					if(o.data && type === "object"){
						const range = retrieveMinMaxValues();
						if( range[0] >= 0 && range[1] >= 0 ){
							obj=[ 0, null ];
						}else if( range[0] <= 0 && range[1] <= 0){
							obj=[ null, 0 ];
						}
					}
				}
				//null null case, new format
				else if(typeof obj === "object" && !Array.isArray(obj) && obj !== null &&
					((Array.isArray(obj.x) && obj.x[0] === null && obj.x[1] === null)||
						(Array.isArray(obj.y) && obj.y[0] === null && obj.y[1] === null)))
					{
					
					let aux={ x : [], y : [] };
					
					if(type === "points"){
						o.data.forEach(function(el){
							el.val.forEach(function(arr){
								aux.x.push(arr[0]);
								aux.y.push(arr[1]);
							});
						});
					}
					else if(type === "xy" || type === "xyz"){
						o.data.forEach(function(el){
							aux.x=aux.x.concat(el.x.val);
							aux.y=aux.y.concat(el.y.val);
						});
					}

					const processAxis = function(obj, axis, min, max) {
						if (Array.isArray(obj[axis]) && obj[axis][0] === null && obj[axis][1] === null) {
							if (min[axis] >= 0 && max[axis] >= 0) {
								obj[axis] = [0, null];
							} else if (min[axis] <= 0 && max[axis] <= 0) {
								obj[axis] = [null, 0];
							} else {
								obj[axis] = [null, null];
							}
						}
					};

					//calculate min/max
					let
						min={ x : Math.min(...aux.x), y : Math.min(...aux.y) },
						max={ x : Math.max(...aux.x), y : Math.max(...aux.y) }
					;
					processAxis(obj, "x", min, max);
					processAxis(obj, "y", min, max);
				}
				//Range corrections for the new format
				else if( (type === "xy" || type === "xyz" || type === "points")){
					if(typeof obj === "number" || Array.isArray(obj)){
						obj={
							x: [null,null],
							y: (Array.isArray(obj) ? obj : [null,obj])
						};
					}else if(typeof obj !== "object" || obj === null){
						obj={
							x: [null,null],
							y: [null,null]
						};
					}
				}
				return obj;
			},
			nts=
			[ 	//[node, type, setup]
				//VisualJS
				["show","boolean",VisualJS],
				["callback","function",VisualJS],
				//vsetup
				["id","string",vsetup],
				["listen","boolean",vsetup],
				//scanvas
				["dec","number|object",scanvas],
				["autoheading","boolean",scanvas],
				["legend","boolean",scanvas],
				["grid","object",scanvas],
				[["grid","border"],"number",scanvas],
				[["grid","shadow"],"number",scanvas],
				[["grid","line"],"number",scanvas],
				[["grid","point"],"number",scanvas],
				[["grid","markings"],"object",scanvas],
				["axis","object",scanvas],
				[["axis","x"],"boolean",scanvas],
				[["axis","y"],"boolean",scanvas],
				[["axis","labels", "x"], "boolean",scanvas],
				[["axis","labels", "y"], "boolean",scanvas],
				[["axis","ticks", "x"], "boolean",scanvas],
				[["axis","ticks", "y"], "boolean",scanvas]
			]
		;

		//Normalize input
		//Compatibility with setup < 1.*
		if(typeof scanvas.axis.labels === "undefined"){
			scanvas.axis.labels={ x: true, y: true };
		}
		if(typeof scanvas.axis.ticks === "undefined"){
			scanvas.axis.ticks={ x: true, y: true };
		}
		//validate all nodes
		for(let i=0; i<nts.length; i++){
			validate(nts[i][0], nts[i][1], nts[i][2]);
		}

		VisualJS.scripts=[];
		VisualJS.id=o.id;
		VisualJS.pub[VisualJS.id]={ heading: null, legend: null };
		if(typeof o.fixed==="object"){
			VisualJS.fixed=o.fixed;
		}

		if(typeof o.unit==="object" && o.unit!==null){
			validate(["unit","label"],"string|object",scanvas);
			validate(["unit","symbol"],"string|object",scanvas);
			validate(["unit","position"],"string|object",scanvas);
		}else{
			o.unit=scanvas.unit;
		}

		//range conversion
		o.range=correctRange(o.range);
		o.lang=o.lang || vsetup.i18n.lang;
		if( !(typeof o.range==="number" || isRange(o.range)) && 
			(typeof o.range !== "object" || o.range === null || Array.isArray(o.range)) ){
			o.range= typeof o.range === "number" || (Array.isArray(o.range) && o.range.length === 2) ?
				o.range :
				( scanvas.range.hasOwnProperty(o.type) && typeof scanvas.range[o.type]==="number" ) ?
					scanvas.range[o.type]
					:
					null
				// Only possible if "bar", "tbar", tsline" as setup does not provide a default value (number)
			;
		}
		//Correct unit when needed
		o.unit=correctUnit(o.unit);
		//Verify tooltipseparator is defined and filled with a string type, else is setted white-space
		o.tooltipseparator = (vsetup.tooltipseparator && typeof(vsetup.tooltipseparator) === "string") ? vsetup.tooltipseparator : " / ";

		//add object o
		VisualJS.container[VisualJS.id]=o;

		let 
			max,
			aux,
			canvas,
			tformatobj = null
		;
		const
			selector="#" + VisualJS.id,
			canvasSel=selector + " ."+vsetup.canvasclass, //Currently, only used in Flot,
			container=VisualJS.container[VisualJS.id],
			isTooltipEnabled=function(){
				return container.tooltip === false ? false : true;
			},
			getHeading=function(){
				if(container.autoheading===false){
					return container.title || ""; //1.0.2
				}

				let 
					t=[],
					time
				;
				const add=function(s, nw){
					if(typeof s==="string" && s!==""){
						if(nw===true){
							s='<span class="'+VisualJS.setup.nowrapclass+'">' + s + "</span>";
						}
						t.push(s);
					}
				};

				if(container.time!==null && typeof container.time==="object"){
					const
						start=tformat(container.time[0],VisualJS.id),
						end=tformat(container.time[container.time.length-1],VisualJS.id)
					;
					time=start+"&ndash;"+end;
				}else{
					time=tformat(container.time,VisualJS.id);
				}

				add(container.title, false);
				add(container.geo, true);
				add(time, true);

				return  atext(t.join(". "));
			},
			draw=function(){
				let chart=false;
				if(typeof VisualJS.chart==="function"){ //can be undefined if "cmap" && old browser
					if(isTooltipEnabled()){
						tooltip();
					}

					if(container.show){
						VisualJS.chart();
					}

					if(!VisualJS.fixed){
						if(window.addEventListener){
							window.addEventListener('resize', canvas, false);
						}else{
							window.onresize=canvas; //Warning: it will destroy any other attachment
						}
					}

					chart=true;
				}
				if(container.callback!==null){
					container.callback.call({
						id: VisualJS.id,
						chart: chart,
						heading: VisualJS.pub[VisualJS.id].heading,
						legend: VisualJS.pub[VisualJS.id].legend
					});
				}
			},
			atext=function (s) {
				return String(s).replace(/&amp;/g, "&"); //More general .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');
			},
			// Add "script" to scripts' array
			// check: false adds script without verifying its existance (used when a parent lib is already missing and existing conditions cannot be met).
			addJS=function(script, check){
				if(!check || !script.exists.call()) {
					VisualJS.scripts.push(script.js);
					return true;
				}
				return false;
			},
			tooltipText=function(id, l, v){
				const
					lab=(typeof v==="number" && VisualJS.container[id].unit.label!=="") ? " "+VisualJS.container[id].unit.label : "",
					si=(typeof v==="number") ? VisualJS.container[id].unit.symbol : "",
					va=format(v,id),
					t=(va!==VisualJS.setup.i18n.text.na[VisualJS.container[id].lang]) ?
						( (VisualJS.container[id].unit.position==="end") ? va+lab+(si!==""?" "+si:si) : si+va+lab )
						: // Value not available
						va
				;
				return l ? `<strong>${t}</strong> ${l}` : t; //no need to atext()
			},
			legendText=function(id, l, v){
				const
					lab= "",
					si=(typeof v==="number") ? VisualJS.container[id].unit.symbol : "",
					va=format(v,id),
					t=(va!==VisualJS.setup.i18n.text.na[VisualJS.container[id].lang]) ?
						( (VisualJS.container[id].unit.position==="end") ? va+lab+(si!==""?" "+si:si) : si+va+lab )
						: // Value not available
						va
				;
				return l ? `<strong>${t}</strong> ${l}` : t; //no need to atext()
			},
			tickFormatterGenerator=function(n, id, axis, f){
				if (!o.axis.labels[axis]) {
					return "";
				}
				return typeof f === "function" ? f(n, id, axis) : format(n, id, axis);
			},
			labelStrip=function(arr){
				return arr.map((item) => (Array.isArray(item) ? [item[0], ""] : [item, ""]));
			},
			format=function(n, id, axis){
				if(typeof n === "undefined" || n===null){
					return VisualJS.setup.i18n.text.na[VisualJS.container[id].lang];
				}
				if(typeof n==="number"){
					const
						s= ((
								typeof VisualJS.container[id].dec === "object" && VisualJS.container[id].dec !== null &&
								typeof axis === "string" &&
								typeof VisualJS.container[id].dec[axis] === "number"
							) ?
							n.toFixed(VisualJS.container[id].dec[axis])  :
							(
								(typeof VisualJS.container[id].dec === "number") ?
								n.toFixed(VisualJS.container[id].dec) :
								String(n)
							)
						),
						rgx=/(\d+)(\d{3})/,
						x=s.split(".")
					;
					let x1=x[0];
					let x2=(x.length>1) ? VisualJS.setup.i18n.text.dec[VisualJS.container[id].lang] + x[1] : "";

					while(rgx.test(x1)){
						x1=x1.replace(rgx, "$1" + VisualJS.setup.i18n.text.k[VisualJS.container[id].lang] + "$2");
					}
					return x1+x2;
				}
				return "";
			},
			tformat=function( t, id ){
				let label;
				let template;

				if(!tformatobj){
					if(!t){//undefined, null, "", 0
						return null;
					}
					//Formatted dates are string numbers
					if(isNaN(t)){
						return t;
					}

					switch(t.length){
						case 5:
							label = VisualJS.setup.i18n.text.quarter;
							template = getTemplateTFormat("aaaaq", o.lang);
						break;
						case 6:
							label = VisualJS.setup.i18n.text.month;
							template = getTemplateTFormat("aaaamm", o.lang) ;
						break;
						default:
						return t;
					}

					tformatobj = {
						"label" : label,
						"text" : label[VisualJS.container[id].lang],
						"template" : template//getTemplateYearFormatted(template)
					};
				}

				if(typeof tformatobj.label==="undefined" || typeof tformatobj.text==="undefined"){
					return t;
				}

				const period=tformatobj.text[t.slice(4)-1];
				if(typeof period==="undefined"){
					return t;
				}

				const year=t.slice(0,4);

				return tformatobj.template.replace("{{period}}", period).replace("{{year}}",year);
			},
			//Return the template defined in the setup file by tcode("aaaamm" or "aaaaq") and lang,
			//anything else "{{period}} {{year}}"
			getTemplateTFormat=function(tcode, lang){
				const vsetuptemplate = vsetup.i18n.template;
				if(vsetuptemplate){
					if(typeof(vsetuptemplate) === "string"){
						return vsetuptemplate;
					}else if(typeof(vsetuptemplate) === "object"){
						if(vsetuptemplate[tcode] && typeof(vsetuptemplate[tcode][lang]) === "string"){
							return vsetuptemplate[tcode][lang];
						}
					}
				}
				return "{{period}} {{year}}";//Default value
			},
			/* html: tooltip html content
				x, y: mouse coordinates
				Returns: posTT (tooltip coordinates [x,y])
			*/
			showTooltip=function(html, x, y) {
				const
					tt=document.getElementById(VisualJS.setup.tooltipid),
					visRightLimit=VisualJS.bwidth-VisualJS.setup.margin, //Visual right limit
					pos={}, //Final tooltip position
					ttHalfWidth=tt.clientWidth/2 //Half of tooltip width
				;
				tt.innerHTML=html;
				tt.style.display="block"; //Paint to get width
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
			tooltip=function() {
				const d=document;
				if(!d.getElementById(VisualJS.setup.tooltipid)){
					const tt=d.createElement("div");
					tt.setAttribute("role", "tooltip");
					tt.id=VisualJS.setup.tooltipid;
					tt.style.display="none";
					d.body.appendChild(tt);
				}
			}
		;

		if(o.type==="cmap"){
			if(typeof o.by!=="string"){
				return;
			}

			addJS( vsetup.lib.maps, true );
			addJS( vsetup.lib.d3, true );
			addJS( vsetup.map[o.by], true );

			///////// CHART
			VisualJS.chart=function(){
				const
					heading=getHeading(),
					map=VisualJS.map[o.by],
					mwidth=map.area[0],
					mheight=map.area[1],
					//hasGroups: grouped property exists, is object (array), has content and data seems to include a group property
					hasGroups=(
						o.grouped !== null &&
						typeof o.grouped === "object" &&
						Array.isArray(o.grouped.label) &&
						o.grouped.label.length>0 &&
						o.data[0].hasOwnProperty("group")
					),
					hasValues=o.data[0].hasOwnProperty("val"),
					num=hasGroups ? o.grouped.label.length : (hasValues ? vsetup.colors.map.max : 1),
					prefix=vsetup.colorclassprefix,
					//If hasGroup & hasValue then the colour array is ignored
					visual=d3.select(selector),
					projection=d3.geo[map.projection](),
					//Support for projections that don't support the center method (albersUSA, for example).
					proj=(typeof map.center==="object" && typeof projection.center==="function") ? projection.center(map.center) : projection,
					xy=proj.scale(map.scale).translate([mwidth/2, mheight/2]),
					path=d3.geo.path().projection(xy),
					tooltip=d3.select("#" + vsetup.tooltipid)
				;
				let colors=VisualJS.func.colors( vsetup.colors.map.base, num, "fill", prefix,
					(hasGroups && !hasValues && typeof o.grouped.color==="object" && o.grouped.color.length===o.grouped.label.length) ? 
					o.grouped.color : 
					[],
					VisualJS.id
				);
				canvas=function(){
					const footerCont=atext(VisualJS.arr2html(o.footer) || "");
					visual.html("<header><"+headingElement+" id=\"ARIAtitle\" style=\"overflow:auto;\" ></"+headingElement+"></header><footer class=\""+VisualJS.setup.footerclass+"\" style=\"overflow:auto;\"></footer>");

					d3.select(selector+" "+headingElement).html(heading);
					d3.select(selector+" "+footerElement).html(footerCont);
					//It returns false when not enough space to draw a chart
					if(!VisualJS.getSize(VisualJS.id)){return;}
					const
						id=VisualJS.id,
						valors=d3.map(),
						labels=d3.map(),
						hasLabels=o.data[0].hasOwnProperty("label"),
						val=[],
						hh=VisualJS.height/mheight,
						ww=VisualJS.width/mwidth,
						width=Math.min(
							Math.round( mwidth*hh ),
							VisualJS.width
						),
						height =
						Math.min(
							Math.round( mheight*ww ),
							VisualJS.height
						),
						left=Math.floor( (VisualJS.width-width)/2 ),
						topbottom=Math.floor( (VisualJS.height-height)/2 ),
						scale=(hh<ww) ? hh : ww,
						vis=visual
							.insert("svg:svg", footerElement)
							.attr("viewBox", "0 0 "+width+" "+height)
							.attr("width", width)
							.attr("height", height)
							.attr("role", "img")
							.attr("aria-labelledby", "ARIAtitle")
					;
					let 
						legend=function(){},
						setGroups=function(){},
						colorOrderAsc = true,
						groups, //key: id, value: group
						getAreaLabel,
						colorClass,
						inf,
						sup,
						aux
					;

					if(hasGroups && hasValues){
						aux=[];
						[1, o.grouped.label.length].forEach(function(el){
							for(let i=0;i<o.data.length;i++){
								if(o.data[i].group===el){
									aux.push(o.data[i].val);
									break;
								}
							}
						});
						if(aux[0]>aux[1]){
							colorOrderAsc = false;
						}
					}
					else if(hasGroups && o.grouped.color) {
						colors=o.grouped.color;
					}

					if(hasGroups){
						groups=d3.map();
						setGroups=function(g, r){g.set(r.id, r.group);};
						VisualJS.groupedLabelSize = null;//How many label items are defined in the grouped element
						colorClass=function(g, _, p){
							if(hasValues && !colorOrderAsc){
								if(!VisualJS.groupedLabelSize){
									const temp = d3.values(g).reduce((acc, val) => {
										acc[val] = 1 + (acc[val] || 0);
										return acc;
									}, {});
									VisualJS.groupedLabelSize = Object.keys(temp).length;
								}
								return prefix + (	VisualJS.groupedLabelSize-(g.get(p[map.id])));
							}else{
								return prefix + (g.get(p[map.id])-1);
							}
						};
						getAreaLabel=function(g, p){
							const	em=o.grouped.label[(g.get(p[map.id])-1)];
							let ret=(hasLabels) ? labels.get(p[map.id]) : p[map.label];

							if(typeof em!=="undefined"){
								ret+=` <em>${em}</em>`;
							}
							return ret;
						};
						legend=VisualJS.func.legend;
					}else if(hasValues){
						colorClass=function(_, v, p, inf, sup){
							const value=v.get(p[map.id]);
							if(typeof value==="undefined"){
								return "";
							}
							if(inf===sup){ //No variation in the data: use centered color (quantize would return undefined)
								return prefix + (num/2).toFixed(0);
							}
							const
								quantize=d3.scale.quantize()
									.domain([inf, sup])
									.range(d3.range(num).map(function(i) { return prefix + i; }))
							;
							return quantize(value);
						};
						legend=VisualJS.func.legend;
					}else{
						colorClass=function(_, v, p){
							return v.get(p[map.id])!=="" ? "" : prefix+(num-1);
						};
					}
					getAreaLabel=function(g, p){
						return hasLabels ? labels.get(p[map.id]) : p[map.label];
					};
					
					o.data.forEach(r => {
						if(r.hasOwnProperty("val")){
							if(r.val!==null){ //Remove regions with val: null
								valors.set(r.id, r.val);
								val.push(r.val);
							}
						}else{ //If no val property on data (for example, grouped info), then do not print value on tooltip.
							valors.set(r.id, "");
						}
						if(hasLabels){//key=id, value=label
							labels.set(r.id, r.label);
						}
						setGroups(groups, r); //Does nothing if no groups
					});
					val.sort(function(a, b) {
						return a-b;
					});

					const
						minval=val[0],
						maxval=val[val.length-1],
						showTooltipRegion=function(d, posX, posY){
							if(d.properties[map.id]!=="" && d.properties[map.label]!=="" &&//Polygon is not relevant
								(hasValues || hasGroups || typeof valors.get(d.properties[map.id])!=="undefined")){
									showTooltip(
										tooltipText(
											id,
											getAreaLabel(groups, d.properties),
											valors.get(d.properties[map.id])
										),
										posX,
										posY
									);
							}
						}
					;
					let 
						mouseDown=false,
						pageX=null,
						pageY=null,
						bc=null
					;

					if( typeof container.range==="number" ){ //Number
						inf=d3.quantile(val, container.range);
						sup=d3.quantile(val, 1-container.range);
					}else{ //isRange (can't be null)
						inf=container.range[0];
						sup=container.range[1];
					}

					//if user didn't provide a callback function to be executed on enter/click, void function
					if(typeof container.click!=="function"){
						container.click=function(){};
					}

					vis.style("margin-left", left+"px");
					vis.style("margin-top", topbottom+"px");
					vis.style("margin-bottom", topbottom+"px");
					vis.append("g")
						.attr("class", vsetup.areaclass)
						.attr("transform", "scale("+scale+")")
						.selectAll("path")
						.data(map.features)
						.enter().append("svg:path")
						.attr("class", function(d) {
							if(d.properties[map.id]==="" || d.properties[map.label]==="" || //Polygon is not relevant
							(!hasValues && typeof valors.get(d.properties[map.id])==="undefined")){ //Don't hover non-highlighted areas
								return prefix + "nohover";
							}
							return colorClass(groups, valors, d.properties, inf, sup);
						})
						.attr("tabindex", function(){return d3.select(this).classed(prefix + "nohover") ? "-1" : "0";})
						.attr("role", "presentation")
						.attr("d", path)
						.on("mousemove", function(d, event){showTooltipRegion(d, d3.event.pageX, d3.event.pageY);})
						.on("mouseout", function(){return tooltip.style("display", "none");})
						.on("mousedown", function(){mouseDown = true;})
						.on("mouseup", function(){mouseDown = false;})
						.on("focusout", function(){return tooltip.style("display", "none");})
						.on("focusin", function(d){
							if(mouseDown){
								let callFunction=true;
								const currentTime=new Date().getTime();
								if(container.priv && container.priv.click){
									if(currentTime - container.priv.click > 500){
										container.priv.click = currentTime;
									} else {
										callFunction = false;
									}
								}else{
									container.priv = {click: currentTime};
								}
								if(callFunction){
									container.click.apply(null,
										[{
											id: d.properties[map.id],
											label: !hasLabels ? d.properties[map.label] : (typeof labels.get(d.properties[map.id])!=="undefined" ? labels.get(d.properties[map.id]) : null),
											position:{x: d3.event.pageX, y: d3.event.pageY},
											group: hasGroups && typeof groups.get(d.properties[map.id])!=="undefined" ? {num: groups.get(d.properties[map.id]), label: container.grouped.label[(groups.get(d.properties[map.id])-1)]}	: null,
											value: hasValues && typeof valors.get(d.properties[map.id])!=="undefined"	?	valors.get(d.properties[map.id]): null
										}]
									);
								}
								pageX=d3.event.pageX;
								pageY=d3.event.pageY;
							}else{
								bc =d3.select(this).node().getBoundingClientRect();
								pageX=(bc.left+bc.right)/2;
								pageY=(bc.top+bc.bottom)/2;
							}
							showTooltipRegion(d, pageX, pageY);
						})
						.on("keyup", function(d){
							if(d3.event.key==="Enter"){
								let bc =d3.select(this).node().getBoundingClientRect();
								container.click.apply(null,
										[{
											id: d.properties[map.id],
											label: !hasLabels ? d.properties[map.label] : (typeof labels.get(d.properties[map.id])!=="undefined" ? labels.get(d.properties[map.id]) : null),
											position: {x: bc.left, y: bc.top},
											group: hasGroups && typeof groups.get(d.properties[map.id])!=="undefined"	? {num: groups.get(d.properties[map.id]), label: container.grouped.label[(groups.get(d.properties[map.id])-1)]}	: null,
											value: hasValues && typeof valors.get(d.properties[map.id])!=="undefined"	?	valors.get(d.properties[map.id]) : null
										}]
								);
							}
					})
					;

					//Draw the legend
					if( hasValues || hasGroups ){ //No grouped nor highlighted-area map
						let infsup=[
								tooltipText(id, null, inf),
								tooltipText(id, null, sup)
							];
						const
							lightdark=[
								colors[colors.length-1], //lighter color
								colors[0] //darker color
							],
							strict=[
								inf<minval || format(inf,id)===format(minval,id),
								sup>maxval || format(sup,id)===format(maxval,id)
							]
						;

						if( hasGroups ){ //No grouped nor highlighted-area map
							//If hasGroup & hasValue then the colour array is ignored
							if(hasValues || typeof o.grouped.color === "undefined") {
								o.grouped.color=colors;
							}

							VisualJS.pub[VisualJS.id].legend={
								color: o.grouped.color,
								text: o.grouped.label
							};

							if(container.legend){
								VisualJS.func.groupLegend(
									infsup,
									vis,
									tooltip,
									height,
									strict,
									o,
									scanvas,
									colorOrderAsc
								);
							}
						}
						else if(hasValues){
							infsup=[
								legendText(id, null, inf),
								legendText(id, null, sup)
							];
							VisualJS.pub[VisualJS.id].legend={
								color: lightdark,
								text: infsup,
								symbol: [
									(strict[0] ? "==" :  "<="),
									(strict[1] ? "==" :  ">=")
								]
							};
							if(container.legend){
								VisualJS.func.legend(
									infsup,
									colors,
									vis,
									tooltip,
									height,
									strict,
									o.unit.label
								);
							}
						}
					}

					VisualJS.pub[VisualJS.id].heading=heading;
				};
				canvas();

				document.querySelectorAll('.visual .VisualJSarea path').forEach(function(path) {
					path.addEventListener('mouseenter', function() {
						let parent = this.parentNode;
						/* Version 1.3.1 */
						if (this !== parent.lastElementChild) {
							parent.appendChild(this);
						}
					});
				});
			};
		}else{
			let hasFlot = true;
			//(o.type==="tsline" || o.type==="tsbar" || o.type==="bar" || o.type==="rank"  || o.type==="pyram")
			if( addJS( vsetup.lib.jquery, true ) ){ //No jQuery? Add Flot without checking
				hasFlot=false;
				addJS( vsetup.lib.jquery.flot, false );
			}else if( addJS( vsetup.lib.jquery.flot, true ) ){ //Has jQuery but not Flot?
				hasFlot=false;
			}

			const 
				opt=[],
				ts=function(){
					//If autoheading, check for leading and trailing zeros
					if(container.autoheading){
						let 
							tlen=o.time.length,  
							t, 
							nuls
						;

						//trim leading nulls
						const checkAllNull = (data, index) => data.every(dataItem => dataItem.val[index] === null);
						if(o.data[0].val[0]===null){
							for(t=0, nuls=[]; t<tlen; t++){
								let allNull = checkAllNull(o.data, t);
								if (!allNull) {
									break;
								}
								nuls.push(true);
							}
							if (nuls.length > 0) { // Check if nuls has elements to avoid issues
								o.time.splice(0, nuls.length);
								o.data.forEach(dataItem => dataItem.val.splice(0, nuls.length));
							}
							tlen=o.time.length; //update
						}

						//trim trailing nulls (same routine in reverse order)
						if(o.data[0].val[tlen-1]===null){
							for(t=tlen, nuls=[]; t--;){
								let allNull = checkAllNull(o.data, t);
								if (!allNull) {
									break;
								}
								nuls.push(true);
							}

							if (nuls.length > 0) {
								o.time.splice(-nuls.length);
								o.data.forEach(dataItem => dataItem.val.splice(-nuls.length));
							}
						}
					}

					let fbars=function(){
						return; //When stacked an undefined is expected in bars (null or false won't work)
					};
					if(stacked){
						addJS( vsetup.lib.jquery.flot.stack, hasFlot ); //Check plugin only if we have Flot
					}else{
						if(o.type==="tsbar"){
							addJS( vsetup.lib.jquery.flot.orderbars, hasFlot ); //Check plugin only if we have Flot
							fbars=function(si){
								return si.bars;
							};
						}
					}
					transform=function(d,t){ // Local in load(), not ts().
						VisualJS.ticks=[];
						let i, nseries=t.length, nvalues=d.length,
							barWidth= (container.grid && container.grid.bar && (typeof container.grid.bar === "number")) ? container.grid.bar : (nseries >= 2 && nvalues > 4  ? 0.18 : 0.2)
						;
						for(i=0; i<nseries; i++){
							if(o.type==="tsbar"){
								let xCentre = i - (nvalues > 1 ? barWidth / 2 : 0);
								ticks.push([xCentre,t[i]]);
								VisualJS.ticks.push([xCentre,t[i]]); //keep original ticks
							} else {
								ticks.push([i,t[i]]);
								VisualJS.ticks.push([i,t[i]]); //keep original ticks
							}
						}
						for(i=0; i<nvalues; i++){
							let data = [];
							for(let v=d[i].val, vlen=v.length, j=0; j<vlen; j++){
								data.push([j,v[j]]);
							}
							if(o.type!=="tsbar" || stacked || nvalues===1){//if tsbar with one series (nvalues===1) must be treated like stacked (even though it's not)
								series.push({label: d[i].label, data: data});
							}else{
								series.push({label: d[i].label, data: data, bars: { show: true, barWidth: barWidth, order: i+1, lineWidth: 2, align: "center" }}); //barWidth should probably be computed dynamically considering number of series (this value allows only for a max of 3 series)
							}
						}
						const slen=series.length;
						for (i=0; i<slen; i++){
							opt.push({
								data: series[i].data,
								label: series[i].label,
								bars: fbars(series[i]),
								shadowSize: container.grid.shadow
							});
						}
						shlegend=(slen>1);
					};
					return getHeading();
				}
			;
			let shlegend, stack, lines, points, bars, pie, heading, series=[], ticks=[];
			let transform=function(){}; //Local function in load(). It will be redefined.
			let stacked=o.stacked || false;

			Array.max=function(a){
				return Math.max.apply(Math, a);
			};

			switch(o.type){

				case "xy":
					addJS( vsetup.lib.jquery.flot.axisLabels, hasFlot ); //Check plugin only if we have Flot
					points=true;
					bars=false;
					lines=false;
					heading=getHeading();
					transform=function(d,_t,_b){
						const
							group2series=function(group){
								const ret={
									label: group.label,
									data: [],
									by: Array.isArray(group.by) && typeof group.by[0] === "string" ? group.by : null,
								};
								if(typeof group.x === "object" && typeof group.y === "object"){
									//Convertir a punts
									vsetup.canvas.axis.labelsText={
										x: group.x.label,
										y: group.y.label
									};
									ret.data = group.x.val.map((xVal, i) => [xVal, group.y.val[i]]);
								}else if(group.val && group.val.length >=1 && group.val[0].length == 2){
									vsetup.canvas.axis.labelsText={
										x: group.x,
										y: group.y
									};
									ret.data=group.val;
								}
								return ret;
							}
						;
						if(Array.isArray(d) && Array.isArray(d[0])){
							series=[d];
						}
						else if(Array.isArray(d) && typeof d[0] === "object" && !Array.isArray(d[0])){
							series = d.map(item => group2series(item));
						}
					};
					shlegend=true;
				break;

				case "pyram":
					addJS( vsetup.lib.jquery.flot.pyramid, hasFlot ); //Check plugin only if we have Flot
					points=false;
					bars=false;
					heading=getHeading();
					transform=function(d,_,b){
						max=Math.max( Array.max(d[0].val) , Array.max(d[1].val) );
						series[0]={label: d[0].label, data: [], pyramid: {direction: "L"}};
						series[1]={label: d[1].label, data: []};
						b.forEach((value, i) => {
							series[0].data[i] = [value, d[0].val[i]];
							series[1].data[i] = [value, d[1].val[i]];
						});
					};
					shlegend=true;
					stack=false;
					stacked=false; //if stacked was included when pyram, false it
					lines=false;
				break;

				case "rank":
					let data=[];
					lines=false;
					points=false;
					bars=true;
					heading=getHeading();
					transform=function(d,_,b){
						const values=[];
						for(let i=0, len=d.length; i<len; i++){
							//Include in reverse order
							const reverseI = len-i-1;
							ticks[i]=[i, typeof d[reverseI][0] !== "undefined" ?  d[reverseI][0] : b[reverseI] ];
							const val= typeof d[reverseI][1] !== "undefined" ? d[reverseI][1] : d[reverseI];
							values.push(val);
							data[i]=[val,i];
						}
						series={data: data};
						max=Array.max(values);
					};
					shlegend=false; //Currently only one series allowed when rank (no series loop)
					stack=false; //See previous line
				break;

				case "pie":
					addJS( vsetup.lib.jquery.flot.pie, hasFlot ); //Check plugin only if we have Flot
					pie=true;
					lines=false;
					points=false;
					bars=false;
					heading=getHeading();
					transform=function(d,_,b){
						if(typeof b!=="object" || b===null){  //Without "by": simplified call
							//was simply series=d
							series = d.filter(item => item[1] !== null).map(item => ({label: item[0],data: item[1]}));
						}else{
							//An array without "label" and "val"
							if(typeof d[0]==="number"){
								series = b.filter((_, i) => d[i] !== null).map((label, i) => ({label, data: d[i]}));
							}
						}
					};
					shlegend=true;
				break;

				case "bar":
					let fbars=function(){
						return; //When stacked an undefined is expected in bars (null or false won't work)
					};
					if(stacked){
						addJS( vsetup.lib.jquery.flot.stack, hasFlot ); //Check plugin only if we have Flot
						fbars=function(si){
							return si.bars;
						};
					} else {
						addJS( vsetup.lib.jquery.flot.categories, hasFlot ); //Check plugin only if we have Flot
					}
					points=false;
					bars=true;
					heading=getHeading();
					lines=false;
					transform=function(d,_,b){
						if(typeof b!=="object" || b===null){  //Without "by": simplified call
							//was simply series=d
							series = d.filter(item => item[1] !== null).map(item => [`<span>${item[0]}</span>`, item[1]]); // span: temporary solution to avoid x-axis label overlapping
							series=[series];
						} else if(stacked){
							VisualJS.ticks=[];
							let i, len;
							for(i=0, len=d.length; i<len; i++){
								ticks.push([i,d[i].label]);
								VisualJS.ticks.push([i,d[i].label]); //keep original ticks
							}
							for(i=0, len=b.length; i<len; i++){
								let data = [];
								for(let j=0; j<d.length; j++){
									let v=d[j].val;
									data.push([j,v[i]]);
								}
								series.push({label: b[i], data: data});
							}
							const slen=series.length;
							for (i=0; i<slen; i++){
								opt.push({
									data: series[i].data,
									label: series[i].label,
									bars: fbars(series[i]),
									shadowSize: container.grid.shadow
								});
							}
						} else if(o.by && o.by.length && typeof o.data[0] === "object"){
							//Create the legend
							series = o.by.map(item => ({label: item, data: []}));
							//Generate the bars, with a blank space between groups
							let offset=0;
							o.data.forEach(currentData => {
								const dataPoints = currentData.val;
								ticks.push([
									dataPoints.length % 2 === 0 ?
									  offset + (dataPoints.length - 1) / 2 :
									  Math.floor(offset + dataPoints.length / 2),
									  currentData.label,
								]);
								dataPoints.forEach((value, index) => {
									series[index].data.push([offset, value]);
									offset++;
								});
								offset++;
							});
						} else {
							//An array without "label" and "val"
							if(typeof d[0]==="number"){
								series = b.filter((_, i) => d[i] !== null).map((label, i) => [`<span>${label}</span>`, d[i]]);
							}
							series=[series];
						}
					};
					shlegend=true;
					stack=true;
				break;

				case "tsline":
					heading=ts();
					stack=null;
					points=true;
					bars=false;
					lines=true;
				break;

				case "tsbar":
					heading=ts();
					stack=true;
					points=false;
					bars=true;
					lines=false;
				break;

			}

			VisualJS.chart=function(){
				transform(o.data, o.time, o.by);
				$.fn.UseTooltip=function (id) {
					let previousPoint=[];
					$(this).bind("plothover", function (_, pos, item) {
						let val; 
						if (item) {
							if (previousPoint!=[item.seriesIndex, item.dataIndex]) {
								previousPoint=[item.seriesIndex, item.dataIndex];
								if(o.type==="xy"){
									const 
										pre={}, 
										post={},
										unit = VisualJS.container[id].unit,
										unitPosition={
											x : unit.position.x==="start",
											y : unit.position.y==="start",
											z : unit.position.z==="start",
										}
									;

									for(let property in unitPosition){
										const 
											el=unitPosition[property],
											csymbol=unit.symbol && typeof unit.symbol[property]==="string" ? unit.symbol[property] : "",
											clabel=unit.label && typeof unit.label[property]==="string" ? unit.label[property] : ""
										;
										if(el){
											pre[property]=csymbol;
											post[property]=clabel;
											post[property]=(post[property] !== "") ? " " + post[property] : "";
										}else{
											pre[property]="";
											post[property]="  " + clabel + " " + csymbol;
										}
									}
									val=
										"<div>"+
											"<strong>"+pre.x+format(item.datapoint[0],id,"x")+post.x+"</strong> "+
											(typeof setup.xaxis.axisLabel != "undefined" ? setup.xaxis.axisLabel : "x")+
										"</div>"+
										"<div>"+
											"<strong>"+pre.y+format(item.datapoint[1],id,"y")+post.y+"</strong> "+
											(typeof setup.yaxis.axisLabel != "undefined" ? setup.yaxis.axisLabel : "y")+
										"</div>"
									;
									val+=
										( Array.isArray(series[item.seriesIndex].by) && typeof series[item.seriesIndex].by[item.dataIndex] === "string" && series[item.seriesIndex].by[item.dataIndex] !== "" ?
												series[item.seriesIndex].by[item.dataIndex]+
												( typeof series[item.seriesIndex].label === "string" && series[item.seriesIndex].label !== "" ?
														" ("+series[item.seriesIndex].label+")" :
														""
												)
												:
												""
										)
									;

									showTooltip(
										val,
										pos.pageX, //item.pageX
										pos.pageY  //item.pageY
									);
								}else{
									const 
										x=item.datapoint[0],
										y=item.datapoint[1],
										itemlab= o.type==="bar" && !Boolean(o.data[0].val)  ? (series.length > 1 ? series[x][0] : series[0][x][0]) : item.series.label,
										label=o.type!=="rank" ? itemlab : ticks[y][1],
										tick= (o.type!=="rank" && o.type!=="pie" && o.type!=="bar") || (o.type === "bar" && Boolean(o.data[0].val) ) ?
										(stacked || series.length===1 ?
												(Array.isArray(ticks) && ticks.length > 0 ? ticks[x][1] : false)
												:
												(o.type==="pyram" ? series[pos.x<0 ? 0 : 1].data[item.dataIndex][0] : ticks[item.dataIndex][1])
													// item.series.yaxis.ticks[item.dataIndex].label won't work in pyram if axis : {y: false}
										)
										: false,
										createTooltipMessage = function(tick, label, separator, isBarBy) {
											if (isBarBy) {
												return tick ? `${tick}${label ? separator + label : ""}` : label || "";
											} else {
												return tick ? `${label ? label + separator + tick : tick}` : label || "";
											}
										},
										tooltipmsg = createTooltipMessage(
											tick,
											label,
											VisualJS.container[id].tooltipseparator,
											o.type === "bar" && o.by
										)
									;
									
									if (o.type === "pyram") {
										val = Math.abs(x);
									} else if (o.type === "rank") {
										val = x;
									} else if (o.type === "tsbar" || (o.type === "bar" && stacked)) {
										const isStackedOrSingleSeries = stacked || series.length === 1;
										val = isStackedOrSingleSeries ? series[item.seriesIndex].data[x][1] : y;
									} else if (o.type === "pie") {
										val = y[0][1];
									} else {
										val = y;
									}
										
									showTooltip(tooltipText(id, tooltipmsg, val), pos.pageX, pos.pageY);
								}
							}
						}else{
							$("#"+vsetup.tooltipid).hide();
							previousPoint=[];
						}
					});
				};

				let setup={
						colors: vsetup.colors.series,
						series: {
							stack: stack,
							bars: {
								show: bars,
								barWidth: 0.7,
								align: "center",
								fill: 0.9
							},
							pie: {
								show: pie,
								label:{
									show:false
								}
							},
							lines: {
								show: lines,
								lineWidth: container.grid.line
							},
							points: {
								show: points,
								radius: container.grid.point,
								fill: 0.85,
								fillColor: null,
							},
						},
						legend: {
							show: container.legend && shlegend,
							position: scanvas.position || "ne"
						},
						grid: {
							borderWidth: container.grid.border,
							hoverable: true,
							clickable: false,
							mouseActiveRadius: 10
						},
						xaxis:{
							show: container.axis.x,
							axisLabel: typeof getNestedParam(vsetup.canvas.axis,["labelsText","x"]) !== "undefined"? vsetup.canvas.axis.labelsText.x : undefined,
							axisLabelUseCanvas: true,
							axisLabelFontSizePixels: (aux=Number($("."+VisualJS.setup.clas).css("font-size").replace("px",""))),
							axisLabelFontFamily: $("."+VisualJS.setup.clas).css("font-family") ,
							axisLabelPadding: aux,
							axisLabelColour: "#545454",
							labelWidth: 28
						},
						yaxis:{
							show: container.axis.y,
							axisLabel: typeof getNestedParam(vsetup.canvas.axis,["labelsText","y"]) !== "undefined" ? vsetup.canvas.axis.labelsText.y : undefined,
							axisLabelUseCanvas: true,
							axisLabelFontSizePixels: aux,
							axisLabelFontFamily: $("."+VisualJS.setup.clas).css("font-family") ,
							axisLabelPadding: aux,
							axisLabelColour: "#545454"
						}
				};

				canvas=function(){
					const
						id=VisualJS.id,
						ticklen=ticks.length,
						footerCont=atext(VisualJS.arr2html(o.footer) || "")
					;

					$(selector).html(`<header><${headingElement} id="ARIAtitle" style="overflow:auto;">${heading}</${headingElement}></header><footer class=${VisualJS.setup.footerclass} style="overflow:auto;">${footerCont}</footer>`);
	
					//It returns false when not enough space to draw a chart
					if(!VisualJS.getSize(id)){return;}

					const visualJsType = vsetup.typeclassprefix+o.type;

					$(selector+" header").after('<main class="'+vsetup.canvasclass+' '+visualJsType+' '+VisualJS.visualsize+'" style="width: '+VisualJS.width+'px; height: '+VisualJS.height+'px; display: block;"></main>'); //'display: block;' added for visualization correctly in all browsers

					setup.xaxis.tickFormatter=function(val) {
						return tickFormatterGenerator(val,id, "x");
					};

					setup.yaxis.tickFormatter=function(val) {
						return tickFormatterGenerator(val, id, "y");
					};

					setup.xaxis.tickLength=(o.axis.ticks.x) ? null : 0;
					setup.yaxis.tickLength=(o.axis.ticks.y) ? null : 0;
					setup.grid.markings=o.grid.markings || null;

					switch(o.type){

						case "xy":
							//rang 2D
							if(o.range){
								if(o.range.x){
									if(Array.isArray(o.range.x)){
										setup.xaxis.min=o.range.x[0];
										setup.xaxis.max=o.range.x[1];
									}else{
										setup.xaxis.min=0;
										setup.xaxis.max=o.range.x;
									}
								}else{
									setup.xaxis.min=null;
									setup.xaxis.max=null;
								}
								if(o.range.y){
									if(Array.isArray(o.range.x)){
										setup.yaxis.min=o.range.y[0];
										setup.yaxis.max=o.range.y[1];
									}else{
										setup.yaxis.min=0;
										setup.yaxis.max=o.range.y;
									}
								}else{
									setup.yaxis.min=null;
									setup.yaxis.max=null;
								}
							}else{
								setup.xaxis.min=null;
								setup.yaxis.min=null;
								setup.xaxis.max=null;
								setup.yaxis.max=null;
							}
							setup.hooks={
								drawBackground : function (plot,canvasContext){
									const axes=plot.getXAxes()[0];
									if(typeof axes.ticks !== "undefined" && axes.ticks.length > 0){
									axes.datamin=axes.ticks[0].v;
									axes.datamax=axes.ticks[axes.ticks.length-1].v;
									}
								}
							};
							$.plot(
								canvasSel,
								series,
								setup
							);
						break;

						case "pyram":
							setup.series.pyramid={show: true, barWidth: 1};
							//ticks are undefined for pyramid: we remove the Y-axis if too many categories. Instead of ticklen, series[0].data.length is used.
							setup.yaxis.show=(VisualJS.height/series[0].data.length) > 11 && o.axis.labels.y ? container.axis.y : false; //If too many categories and not enough height, remove y-labels

							setup.xaxis.max=typeof container.range==="number" ? max*container.range : (Array.isArray(container.range) ? container.range[1] : null); //isRange (can't be null). min is ignored. If max is lower than actual max it will be discarded (but increase in VisualJS.range won't be applied). Otherwise: Increase area using VisualJS.range in the longest bar
							setup.xaxis.tickFormatter=function(val) {
								return tickFormatterGenerator(val,id, "x", format);
							};
							$.plot(
								canvasSel,
								series,
								setup
							);
						break;

						case "rank":
							//bug plugin flot
							//setup.yaxis.tickLength=0;
							//setup.yaxis.tickLength=null;
							setup.series.bars.horizontal=true;
							setup.yaxis.ticks=( (VisualJS.height/ticklen) > 11) ? ticks.slice(0) : 0; //If too many categories and not enough height, remove y-labels
							if(o.axis.labels.y === false){
								setup.yaxis.ticks=labelStrip(setup.yaxis.ticks);
							}

							if(typeof container.range==="number"){
								setup.xaxis.max=max*container.range;
							}else if(Array.isArray(container.range)){ //isRange (can't be null)
								setup.xaxis.min=container.range[0]; //we don't check if min provided is lower than actual min
								setup.xaxis.max=container.range[1]; //we don't check if max provided is greater than actual max
							}
							setup.xaxis.tickFormatter=function(val) {
								return tickFormatterGenerator(val,id, "x", format);
							};
							setup.yaxis.autoscaleMargin=0;
							setup.series.bars.barWidth=0.5;
							$.plot(
								canvasSel,
								[series],
								setup
							);
						break;

						case "pie":
							$.plot(
								canvasSel,
								series,
								setup
							);
						break;

						case "bar":
							setup.xaxis.tickLength=0;
							if(o.axis.labels.x === false){
								setup.xaxis.ticks=labelStrip(ticks);
								setup.xaxis.show=false;
							}
							if(o.by && o.by.length && typeof o.data[0] === "object"){
								//plumbing time
								setup.xaxis.ticks=ticks;
								// if(o.axis.labels.x === false){
								// 	setup.xaxis.ticks=labelStrip(setup.xaxis.ticks);
								// }
								setup.bars={show: true};
							}else{
								setup.xaxis.mode="categories";
								setup.yaxis.tickFormatter=function(val) {
									return tickFormatterGenerator(val,id, "y", format);
								};
							}
							if(typeof container.range!=="number" && container.range!==null){ //isRange
								setup.yaxis.min=container.range[0]; //we don't check if min provided is lower than actual min
								setup.yaxis.max=container.range[1]; //we don't check if max provided is greater than actual max
							}else if(typeof container.range === "number"){
								setup.yaxis.min=null; //we don't check if min provided is lower than actual min
								setup.yaxis.max=container.range; //we don't check if max provided is greater than actual max
							}
							$.plot(
								canvasSel,
								series,
								setup
							);
						break;

						//Time series
						case "tsline":
						case "tsbar":
							if(o.type==="tsbar"){
								setup.xaxis.tickLength=0;
							} else if(setup.grid.markings===null){
								//Zero line
								setup.grid.markings=[{color: "#333333", lineWidth: 1, yaxis: {from: 0, to: 0}}];
							}

							setup.yaxis.tickFormatter=function(val) {
								return tickFormatterGenerator(val,id, "y", format);
							};
							const
								ratio=VisualJS.width/ticklen,
								xticks=[],
								digcrit= (typeof o.first  === 'string') && o.first ? o.first
									: (VisualJS.ticks[0][1].length === 6 ?
										"01" : //first month
										"1") 	 //first quarter
							;
							let freq;
									
							if(typeof container.range!=="number" && container.range!==null){ //isRange
								setup.yaxis.min=container.range[0]; //we don't check if min provided is lower than actual min
								setup.yaxis.max=container.range[1]; //we don't check if max provided is greater than actual max
							}else if(typeof container.range === "number"){
								setup.yaxis.min=null; //we don't check if min provided is lower than actual min
								setup.yaxis.max=container.range; //we don't check if max provided is greater than actual max
							}

							let i;
							switch(VisualJS.ticks[0][1].length){ //Assuming all time periods follow the same pattern
								case 4: //Annual time series (4 digits)
									// Magic rule: Only one year of every two must be displayed if width (mini) is small in comparison with # of ticks
									if(ratio<33){
										freq=(ratio>16.5) ? 2 : ((ratio>10.5) ? 3 : (ratio>9) ? 4 : 10); //if very small, only paint 1 of 3 ticks
										for(i=0; i<ticklen; i++){
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
									if(o.axis.labels.x===false){
										setup.xaxis.ticks=labelStrip(setup.xaxis.ticks);
									}
								break;
								case 5: //quarterly (5 digits)
								case 6: //monthly (6 digits)
									//Magic rule: do not show month/quarter when width is small in comparison with # of ticks
									if(ratio<56){
											if(ratio<8.5 && ticklen>56){
												$("main").addClass(vsetup.mini);
											}
											for(i=0; i<ticklen; i++){
												xticks[i]=(VisualJS.ticks[i][1].slice(4)!==digcrit) ?
													[ VisualJS.ticks[i][0], "" ]
													:
													[ VisualJS.ticks[i][0], VisualJS.ticks[i][1].slice(0,4) ];
												//Formatting time
												ticks[i][1]=tformat(VisualJS.ticks[i][1],VisualJS.id);
											}
											setup.xaxis.ticks=xticks;
									}else{
										for(i=0; i<ticklen; i++){
											//Formatting time
											ticks[i][1]=tformat(VisualJS.ticks[i][1],VisualJS.id);
										}
										setup.xaxis.ticks=ticks;
									}

									if(o.axis.labels.x===false){
										setup.xaxis.ticks=labelStrip(setup.xaxis.ticks);
									}
								break;
								case 7: //year intervals: 2014/15 (7 digits)
									// Magic rule: Only one year of every two must be displayed if width (mini) is small in comparison with # of ticks
									if(ratio<55){
										freq=(ratio>20) ? 2 : ((ratio>10) ? 3 : 4); //if very small, only paint 1 of 3 ticks
										for(i=0; i<ticklen; i++){
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

									if(o.axis.labels.x===false){
										setup.xaxis.ticks=labelStrip(setup.xaxis.ticks);
									}
								break;

								default: //leave ticks alone
									setup.xaxis.ticks=ticks;

									if(o.axis.labels.x===false){
										setup.xaxis.ticks=labelStrip(setup.xaxis.ticks);
									}
							}

							$.plot(
								canvasSel,
								opt,
								setup
							);
							break;
					}
					if(isTooltipEnabled()){
						$(canvasSel).UseTooltip(VisualJS.id);
					}
					VisualJS.pub[VisualJS.id].heading=heading;
					//ACCESSIBILITY
					$(canvasSel).find("canvas")
						.attr("role","img")
						.attr("aria-labelledBy", "ARIAtitle")
					;
				};
				canvas();
			};
		}

		if(VisualJS.scripts.length && typeof LazyLoad==="object"){
			LazyLoad.js(VisualJS.scripts, draw);
		}else{ //If no Lazyload, user must manually include the required libs
			draw();
		}
	}
};

if (!Array.isArray) {
  Array.isArray = function(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}

if(typeof visual!=="function"){
	//Create the visual alias
	var visual=VisualJS.load;
} //If you already have a visual() function, use VisualJS.load({...});
