/*
Visual
Copyright (c) 2019 Institut d'Estadistica de Catalunya (Idescat)
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

/*global d3, LazyLoad*/

var VisualJS={
	version: "1.1.1",
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
		var
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
				if (typeof getComputedStyle === 'function') {
					return getComputedStyle(el)[prop];
				}else{
					return el.currentStyle[prop];
				}
			},
			getNode=function(sel){
				var el=selector(sel);
				return (el[0] instanceof Element) ? el[0] : (el[0] && el[0][0] ? el[0][0] : undefined);
			},
			outerHeight=function(el) {
				if(el){
					var
						h=el.offsetHeight,
						style=computedStyle(el)
					;

					h += Math.round(parseFloat(computedStyle(el,"marginTop")) + parseFloat(computedStyle(el,"marginBottom")));
					return h;
				}else{
					return 0;
				}
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
		return (VisualJS.width > 10 && VisualJS.height > 10);
	},
	arr2html: function (arr, html){
		var ret="";
		if(typeof arr === "undefined"){}
		else if(Array.isArray(arr)){
			arr.forEach(function(el){
				if(typeof el === "string" && el !== "")
					ret += "<"+html.footer+">"+el+"</"+html.footer+">";
			});
		}
		else if(typeof arr === "string" && arr !== ""){
			ret += "<"+html.footer+">"+arr+"</"+html.footer+">";
		}
		return ret;
	},
	iframe: function(o, css){
		var
			vsetup=VisualJS.setup,
			clas=(typeof o.clas==="string") ? o.clas : vsetup.clas,
			html='<!DOCTYPE html>\n<!--[if lt IE 7]><html class="lt-ie9 lt-ie8 lt-ie7"> <![endif]-->\n<!--[if IE 7]><html class="lt-ie9 lt-ie8"> <![endif]-->\n<!--[if IE 8]><html class="lt-ie9"> <![endif]-->\n<!--[if gt IE 8]><!--> <html> <!--<![endif]-->\n<head>',
			create=function(){
				var
					d=document,
					iframe=d.createElement("iframe"),
					e=d.getElementById(o.id)
				;

				//accessibility
				iframe.setAttribute("title",o.title ? VisualJS.setup.i18n.text.iframetitle[o.lang]+": "+o.title : VisualJS.setup.i18n.text.iframetitle[o.lang]);
				iframe.setAttribute("aria-hidden","true");
				iframe.setAttribute("role","widget");

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
		html+= '<\/head><body><div id="'+ o.id +'" class="'+ clas +'"><\/div><script>window.setTimeout(function(){visual('+ JSON.stringify(o) +');},1);<\/script><\/body><\/html>';
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
					[o.css, o.css],
			d=document,
			h1=d.createElement(vsetup.html.heading),
			h1Content=(typeof o.title==="string") ? o.title : "",
			par=d.createElement(vsetup.html.footer),
			html = vsetup.html,
			parContent=(typeof o.footer==="string") ? VisualJS.arr2html(o.footer, html) : "",
			div=d.getElementById(id),
			separator=d.createElement("div"),
			style=d.createElement("style"),
			resize=function(){
				//It returns false when not enough space to draw a chart
				if(!VisualJS.getSize(id)){return;}
				var
					height=VisualJS.height+((typeof o.footer==="string" && o.footer!=="") ? 14 : 0),
					width=VisualJS.width+vsetup.margin,
					rule="iframe{ float: left; width: "+Math.floor(((width-sepw)/2)-vsetup.margin)+"px; height:"+height+"px; }" //Let's round it down instead of letting browsers use their own criterion
				;
				if(style.styleSheet){ //IE
					style.styleSheet.cssText=rule;
				}else{
					style.innerHTML=rule;
				}
				separator.style.height=height+"px";
			},
			span
		;

		h1.innerHTML=h1Content;
		h1.style.overflow="auto";
		par.innerHTML= parContent;
		par.style.overflow="auto";
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

		if(window.addEventListener){
			window.addEventListener('resize', resize, false);
		}else if(window.attachEvent){
			window.attachEvent('onresize', resize);
		}else{
			window.onresize=resize; //Warning: it will destroy any other attachment
		}
	},

	//if o is array, then loop
	load: function (o) {
		var
			listener=function(event){
				var
					message,
					post=function(obj){
						event.source.postMessage(JSON.stringify(obj), "*");
					}
				;

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
							var
								id=message.id || VisualJS.id,
								vis=VisualJS.container[id] || VisualJS.container[id]
							;
							if(vis){
								if(vis.type==="cmap" && !vis.data[0].hasOwnProperty("label")){
									var	label=[]; // key: "id", val:"label"
									for(var m=VisualJS.map[vis.by], i=m.features.length; i--;){
										label[m.features[i].properties[m.id]]=m.features[i].properties[m.label];
									}

									//add 'label' to data
									for(var data=vis.data, j=data.length; j--;){
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
			for(var i=0, len=o.length; i<len; i++){
				VisualJS.get(o[i]);
			}
		}

		if(VisualJS.container[VisualJS.id].listen){
			if(window.addEventListener){
				window.addEventListener("message", listener, false);
			}else{
				window.attachEvent("onmessage", listener);
			}
		}

	},

	//o: object passed thru visual(o)
	get: function (o) {
		var
			vsetup=VisualJS.setup,
			html=vsetup.html,
			scanvas=vsetup.canvas,
			max,
			aux,
			headingElement=html.heading,
			footerElement= "."+VisualJS.setup.footerclass,
			ie8=VisualJS.old||vsetup.func.old("ie9"), //Means: less than IE9
			isRange=function(r){
				if (
						typeof r!=="undefined" &&
						Object.prototype.toString.call(r)==="[object Array]" &&
						r.length===2 &&
						typeof r[0]==="number" &&
						typeof r[1]==="number" &&
						r[0]<r[1]
					){
					return true;
				}else{
					return false;
				}
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
			getNestedParam=function( o, path ){
				var tmp=o;
				for(var i=0; i < path.length; i++){
					if(typeof tmp[path[i]] !== "undefined"){
						tmp=tmp[path[i]];
					}else{
						tmp=undefined;
						break;
					}
				}
				return tmp;
			},
			setNestedParam=function( o, path, val ){
				//Objects are referenced. Strings are not.
				//Therefore we set the value on the parent object.
				var
					tmp=o,
					aux
				;
				for(var i=0; i <= path.length - 2; i++){
					aux=tmp[path[i]];
					if(typeof aux === "undefined"){
						tmp[path[i]]={};
					}
					tmp=tmp[path[i]];
				}
				tmp[path[path.length - 1]]=val;
			},
			safeGet=function(o){
				return (typeof o!=="undefined" ? o : "");
			},
			isObject=function(o){
				return typeof o==="object" && o!==null;
			},
			getDataType=function(){
				var ret="invalid";
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
				var
					type=getDataType(),
					el
				;
				//From new format to old when required
				for(var property in obj){
					if(obj.hasOwnProperty(property)){
						el=obj[property];
						if(o.type === "xy"){}
						else if(o.type === "rank" || o.type === "pyram"){
							if(el && typeof el.x !== "undefined")
								obj[property]=el.x;
							else if(typeof el === "string")
								obj[property]=el;
							else
								obj[property]="";
						}
						else{
							if(el && typeof el.y !== "undefined")
								obj[property]=el.y;
							else if(typeof el === "string")
								obj[property]=el;
							else
								obj[property]="";
						}
					}
				}
				return obj;
			},
			retrieveMinMaxValues=function(){
				var aux=[];
				o.data.forEach(function(el){
					aux=aux.concat(el.val);
				});
				return [Math.min.apply( null, aux), Math.max.apply( null, aux)];
			},
			correctRange=function(obj){
				var
					range,
					type=getDataType(),
					min, max
				;
				//From new format to old when required
				if(typeof obj === "object" && obj !== null && !Array.isArray(obj) &&
					(type === "array" || type === "object")
				){
					if(o.type === "xy"){}
					else if(o.type === "rank" || o.type === "pyram"){
						obj=obj.x;
					}
					else{
						obj=obj.y;
					}
				}

				//null null case, old format
				if(
					Array.isArray(obj) && obj.length === 2 &&
					obj[0] === null && obj[1] === null
				){
					//Check if null null
					if(o.data){
						if(type === "object"){
							range = retrieveMinMaxValues();
							if( range[0] >= 0 && range[1] >= 0 ){
								obj=[ 0, null ];
							}else if( range[0] <= 0 && range[1] <= 0){
								obj=[ null, 0 ];
							}
						}
					}
				}
				//null null case, new format
				else if(typeof obj === "object" && !Array.isArray(obj) && obj !== null &&
						((Array.isArray(obj.x) && obj.x[0] === null && obj.x[1] === null)||(Array.isArray(obj.y) && obj.y[0] === null && obj.y[1] === null))){
						aux={ x : [], y : [] };
						min={ x : [], y : [] };
						max={ x : [], y : [] };

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

						//calculate min/max
						min.x=Math.min.apply( null, aux.x);
						max.x=Math.max.apply( null, aux.x);
						min.y=Math.min.apply( null, aux.y);
						max.y=Math.max.apply( null, aux.y);
						if(Array.isArray(obj.x) && obj.x[0]===null && obj.x[1]===null){
							if( min.x >= 0 && max.x >= 0 ){
								obj.x=[ 0, null ];
							}else if( min.x <= 0 && max.x <= 0){
								obj.x=[ null, 0 ];
							}else{
								obj.x=[ null, null ];
							}
						}
						if(Array.isArray(obj.y) && obj.y[0]===null && obj.y[1]===null){
							if( min.y >= 0 && max.y >= 0 ){
								obj.y=[ 0, null ];
							}else if( min.y <= 0 && max.y <= 0){
								obj.y=[ null, 0 ];
							}else{
								obj.y=[ null, null ];
							}
						}
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
		for(var i=0; i<nts.length; i++){
			validate(nts[i][0], nts[i][1], nts[i][2]);
		}

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
		if( !(typeof o.range==="number" || isRange(o.range)) ){
			//Range 2D
			if(typeof o.range === "object" &&  o.range !== null && !Array.isArray(o.range)){
			}
			else{
			o.range= ( typeof o.range === "number" || (Array.isArray(o.range) && o.range.length === 2) ) ?
				o.range :
				(
					( scanvas.range.hasOwnProperty(o.type) && typeof scanvas.range[o.type]==="number" ) ?
						scanvas.range[o.type]
						:
						null
				) // Only possible if "bar", "tbar", tsline" as setup does not provide a default value (number)
			;
			}
		}
		//Correct unit when needed
		o.unit=correctUnit(o.unit);
		//Verify tooltipseparator is defined and filled with a string type, else is setted white-space
		o.tooltipseparator = (vsetup.tooltipseparator && typeof(vsetup.tooltipseparator) === "string") ? vsetup.tooltipseparator : " / ";

		//add object o
		VisualJS.container[VisualJS.id]=o;

		var
			selector="#" + VisualJS.id,
			canvasSel=selector + " ."+vsetup.canvasclass, //Currently, only used in Flot,
			container=VisualJS.container[VisualJS.id],
			tformatobj = null,
			getHeading=function(){
				if(container.autoheading===false){
					return container.title || ""; //1.0.2
				}

				var
					t=[],
					add=function(s, nw){
						if(typeof s==="string" && s!==""){
							if(nw===true){
								s='<span class="'+VisualJS.setup.nowrapclass+'">' + s + "</span>";
							}
							t.push(s);
						}
					},
					time
				;
				if(container.time!==null && typeof container.time==="object"){
					var
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
				var chart=false;
				if(typeof VisualJS.chart==="function"){ //can be undefined if "cmap" && old browser
					tooltip();
					container.show && VisualJS.chart();

					if(window.addEventListener){
						window.addEventListener('resize', canvas, false);
					}else if(window.attachEvent){
						window.attachEvent('onresize', canvas);
					}else{
						window.onresize=canvas; //Warning: it will destroy any other attachment
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
			addJS=function (script, check) {
				if(!check || !script.exists.call()) {
					VisualJS.scripts.push(script.js);
					return true;
				}
				return false;
			},
			tooltipText=function(id, l, v) {
				var
					lab=(typeof v==="number" && VisualJS.container[id].unit.label!=="") ? " "+VisualJS.container[id].unit.label : "",
					si=(typeof v==="number") ? VisualJS.container[id].unit.symbol : "",
					va=format(v,id),
					t=(va!==VisualJS.setup.i18n.text.na[VisualJS.container[id].lang]) ?
						( (VisualJS.container[id].unit.position==="end") ? va+lab+(si!==""?" "+si:si) : si+va+lab )
						: // Value not available
						va
				;
				return l ? "<strong>"+t+"</strong> "+l : t; //no need to atext()
			},
			legendText=function(id, l, v) {
				var
					lab= "",
					si=(typeof v==="number") ? VisualJS.container[id].unit.symbol : "",
					va=format(v,id),
					t=(va!==VisualJS.setup.i18n.text.na[VisualJS.container[id].lang]) ?
						( (VisualJS.container[id].unit.position==="end") ? va+lab+(si!==""?" "+si:si) : si+va+lab )
						: // Value not available
						va
				;
				return l ? "<strong>"+t+"</strong> "+l : t; //no need to atext()
			},
			tickFormatterGenerator=function(n, id, axis,f){
				if(o.axis.labels[axis]){
					if(typeof f === "function")
						return f(n, id, axis);
					else
						return format(n,id, axis);
				}else{
					return "";
				}
			},
			labelStrip=function(arr){
				var	ret=[];

				for(var i=0; i<arr.length; i++){
					if(Array.isArray(arr[i]))
						ret.push([arr[i][0],""]);
					else
						ret.push([arr[i],""]);
				}

				return ret;
			},
			format=function( n, id, axis ){
				if(typeof n === "undefined" || n===null){
					return VisualJS.setup.i18n.text.na[VisualJS.container[id].lang];
				}
				if(typeof n==="number"){
					var
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
						x=s.split("."),
						x1=x[0],
						x2=(x.length>1) ? VisualJS.setup.i18n.text.dec[VisualJS.container[id].lang] + x[1] : ""
					;
					while(rgx.test(x1)){
						x1=x1.replace(rgx, "$1" + VisualJS.setup.i18n.text.k[VisualJS.container[id].lang] + "$2");
					}
					return x1+x2;
				}
				return "";
			},
			tformat=function( t, id ){
				var label, period, year, template;

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

				if(typeof tformatobj.label==="undefined"){
					return t;
				}
				if(typeof tformatobj.text==="undefined"){
					return t;
				}
				period=tformatobj.text[t.slice(4)-1];
				if(typeof period==="undefined"){
					return t;
				}
				year=t.slice(0,4);

				return tformatobj.template.replace("{{period}}", period).replace("{{year}}",year);
			},
			//Return the template defined in the setup file by tcode("aaaamm" or "aaaaq") and lang,
			//anything else "{{period}} {{year}}"
			getTemplateTFormat=function(tcode, lang){
				var vsetuptemplate = vsetup.i18n.template;
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
			tooltip=function(){
				var d=document;
				if(!d.getElementById(VisualJS.setup.tooltipid)){
					var tt=d.createElement("div");
					tt.setAttribute("role", "tooltip");
					tt.id=VisualJS.setup.tooltipid;
					tt.style.display="none";
					d.body.appendChild(tt);
				}
			},
			canvas
		;

		if(o.type==="cmap"){
			if(ie8){
				document.getElementById(VisualJS.id).innerHTML="<p>"+vsetup.i18n.text.oldbrowser[container.lang]+"</p>";
			}else{
				if(typeof o.by!=="string"){
					return;
				}

				addJS( vsetup.lib.maps, true );
				addJS( vsetup.lib.d3, true );
				addJS( vsetup.map[o.by], true );


				///////// CHART
				VisualJS.chart=function(){
					var
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
						num=(hasGroups) ? o.grouped.label.length : ((hasValues) ? vsetup.colors.map.max : 1),
						prefix=vsetup.colorclassprefix,
						//If hasGroup & hasValue then the colour array is ignored
						colors=VisualJS.func.colors( vsetup.colors.map.base, num, "fill", prefix,
							((hasGroups && !hasValues && typeof o.grouped.color==="object" && o.grouped.color.length===o.grouped.label.length) ?
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
					canvas=function(){
						var
							footerCont=atext(VisualJS.arr2html(o.footer, html) || "")
						;
						visual.html("<"+headingElement+" style=\"overflow:auto;\"></"+headingElement+"><div class=\""+VisualJS.setup.footerclass+"\" style=\"overflow:auto;\"></div>");

						d3.select(selector+" "+headingElement).html(heading);
						d3.select(selector+" "+footerElement).html(footerCont);
						//It returns false when not enough space to draw a chart
						if(!VisualJS.getSize(VisualJS.id)){return;}
						var
							id=VisualJS.id,
							valors=d3.map(),
							labels=d3.map(),
							hasLabels=o.data[0].hasOwnProperty("label"),
							val=[],
							groups, //key: id, value: group
							setGroups=function(){},
							legend=function(){},
							getAreaLabel,
							colorClass,
							inf,
							sup,
							aux,
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
								.attr("height", height),
							colorOrderAsc = true;

						if(hasGroups && hasValues){
							aux=[];
							[ 1, o.grouped.label.length].forEach(function(el){
								for(var i=0;i<o.data.length;i++){
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
						else if(hasGroups){
							if(o.grouped.color)
								colors=o.grouped.color;
						}

						if(hasGroups){
							groups=d3.map();
							setGroups=function(g, r){
								g.set(r.id, r.group);
							};
							VisualJS.groupedLabelSize = null;//How many label items are defined in the grouped element
							colorClass=function(g, v, p){
								if(hasValues && !colorOrderAsc){
									if(!VisualJS.groupedLabelSize){
										var temp = {};
										for (var i = 0; i < d3.values(g).length; i++) {
										    temp[d3.values(g)[i]] = 1+ (temp[d3.values(g)[i]] || 0);
										}
										VisualJS.groupedLabelSize = Object.keys(temp).length;
									}
									return prefix + (	VisualJS.groupedLabelSize-(g.get(p[map.id])));
								}else{
									return prefix + (g.get(p[map.id])-1);
								}
							};
							getAreaLabel=function(g, p){
								var
									em=o.grouped.label[(g.get(p[map.id])-1)],
									ret=(hasLabels) ? labels.get(p[map.id]) : p[map.label]
								;

								if(typeof em!=="undefined"){
									ret+=" <em>" + em + "</em>";
								}
								return ret;
							};
							legend=VisualJS.func.legend;
						}else{
							if(hasValues){
								colorClass=function(g, v, p, inf, sup){
									var value=v.get(p[map.id]);
									if(typeof value==="undefined"){
										return "";
									}
									if(inf===sup){ //No variation in the data: use centered color (quantize would return undefined)
										return prefix + (num/2).toFixed(0);
									}
									var
										quantize=d3.scale.quantize()
											.domain([inf, sup])
											.range(d3.range(num).map(function(i) { return prefix + i; }))
									;
									return quantize(value);
								};
								legend=VisualJS.func.legend;
							}else{
								colorClass=function(g, v, p){
									return (v.get(p[map.id])!=="") ? "" : prefix+(num-1);
								};
							}
							getAreaLabel=function(g, p){
								return (hasLabels) ? labels.get(p[map.id]) : p[map.label];
							};
						}

						for (var i=0, odata=o.data, nobs=odata.length; i<nobs; i++){
							var r=odata[i];
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
						}
						val.sort(function(a, b) {
							return a-b;
						});

						var
							minval=val[0],
							maxval=val[nobs-1]
						;

						if( typeof container.range==="number" ){ //Number
							inf=d3.quantile(val, container.range);
							sup=d3.quantile(val, 1-container.range);
						}else{ //isRange (can't be null)
							inf=container.range[0];
							sup=container.range[1];
						}
						/*
						o.data.forEach(function(el,i){
							if(typeof el.label)
								map.features[i];
						});
						*/

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
							.attr("d", path)
							.on("mousemove", function(d){
								if(d.properties[map.id]!=="" && d.properties[map.label]!=="" &&//Polygon is not relevant
									(hasValues || hasGroups || typeof valors.get(d.properties[map.id])!=="undefined")){
										showTooltip(
											tooltipText(
												id,
												getAreaLabel(groups, d.properties),
												valors.get(d.properties[map.id])
											),
											d3.event.pageX,
											d3.event.pageY
										);
								}
							})
							.on("mouseout", function(){return tooltip.style("display", "none");})
						;

						//Draw the legend
						if( hasValues || hasGroups ){ //No grouped nor highlighted-area map
							var
								infsup=[
									tooltipText(id, null, inf),
									tooltipText(id, null, sup)
								],
								lightdark=[
									colors[colors.length-1], //lighter color
									colors[0] //darker color
								],
								strict=[
									inf<minval || format(inf,id)===format(minval,id),
									sup>maxval || format(sup,id)===format(maxval,id)
								]
							;

							if( container.legend ){ //If map.legend specified (area array), draw it
								if( hasGroups ){ //No grouped nor highlighted-area map
									VisualJS.pub[VisualJS.id].legend={
										color: lightdark,
									};
									//If hasGroup & hasValue then the colour array is ignored
									if(hasValues || typeof o.grouped.color === "undefined") o.grouped.color=colors;

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
					};
			}
		}else{
			var hasFlot;
			//(o.type==="tsline" || o.type==="tsbar" || o.type==="bar" || o.type==="rank"  || o.type==="pyram")
			if( addJS( vsetup.lib.jquery, true ) ){ //No jQuery? Add Flot without checking
				hasFlot=false;
				addJS( vsetup.lib.jquery.flot, false );
			}else{ //Has jQuery but not Flot?
				if( addJS( vsetup.lib.jquery.flot, true ) ){
					hasFlot=false;
				}else{
					hasFlot=true;
				}
			}

			if(ie8){
				addJS( vsetup.lib.excanvas, true);
			}

			var
				transform=function(){}, //Local function in load(). It will be redefined.
				series=[],
				ticks=[],
				opt=[],
				stacked=o.stacked || false,
				ts=function(){
					//If autoheading, check for leading and trailing zeros
					if(container.autoheading){
						var
							tlen=o.time.length,
							dlen=o.data.length,
							d, t, u, n, nuls, ulen
						;

						//trim leading nulls
						if(o.data[0].val[0]===null){

							for(t=0, n=true, nuls=[]; t<tlen; t++){
								for(d=0; d<dlen; d++){
									n=n && (o.data[d].val[t]===null);
								}
								if(!n){
									break;
								}
								nuls.push(n);
							}
							ulen=nuls.length;
							for(u=0; u<ulen; u++){
								if(nuls[u]){
									o.time.shift();
									for(d=0; d<dlen; d++){
										o.data[d].val.shift();
									}
								}
							}
							tlen=o.time.length; //update
						}

						//trim trailing nulls (same routine in reverse order)
						if(o.data[0].val[tlen-1]===null){
							for(t=tlen, n=true, nuls=[]; t--;){
								for(d=0, dlen=o.data.length; d<dlen; d++){
									n=n && (o.data[d].val[t]===null);
								}
								if(!n){
									break;
								}
								nuls.push(n);
							}

							for(u=nuls.length; u--;){
								if(nuls[u]){
									o.time.pop();
									for(d=0; d<dlen; d++){
										o.data[d].val.pop();
									}
								}
							}
						}
					}

					var fbars=function(){
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
						var i, len;
						for(i=0, len=t.length; i<len; i++){
							ticks.push([i,t[i]]);
							VisualJS.ticks.push([i,t[i]]); //keep original ticks
						}
						for(i=0, len=d.length; i<len; i++){
							for(var data=[], v=d[i].val, vlen=v.length, j=0; j<vlen; j++){
								data.push([j,v[j]]);
							}
							if(o.type!=="tsbar" || stacked || len===1){//if tsbar with one series (len===1) must be treated like stacked (even though it's not)
								series.push({label: d[i].label, data: data});
							}else{
								series.push({label: d[i].label, data: data, bars: { show: true, barWidth: 0.2, order: i+1, lineWidth: 2 }}); //barWidth should probably be computed dynamically considering number of series (this value allows only for a max of 3 series)
							}
						}
						var slen=series.length;
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
				},
				shlegend, stack, lines, points, bars, pie, heading
			;

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
					transform=function(d,t,b){
						var
							group2series=function(group){
								var
									ret={
										label: group.label,
										data: [],
										by: (Array.isArray(group.by) && typeof group.by[0] === "string") ? group.by : null,
									},
									i
								;
								if(typeof group.x === "object" && typeof group.y === "object"){
									//Convertir a punts
									vsetup.canvas.axis.labelsText={
										x: group.x.label,
										y: group.y.label
									};
									for(i=0;i<group.x.val.length;i++){
										ret.data.push([group.x.val[i], group.y.val[i]]);
									}
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
							for(var i=0; i<d.length; i++){
								series.push(group2series(d[i]));
							}
						}
					};
					shlegend=true;
				break;

				case "pyram":
					addJS( vsetup.lib.jquery.flot.pyramid, hasFlot ); //Check plugin only if we have Flot
					points=false;
					bars=false;
					heading=getHeading();
					transform=function(d,t,b){
						max=Math.max( Array.max(d[0].val) , Array.max(d[1].val) );
						series[0]={label: d[0].label, data: [], pyramid: {direction: "L"}};
						series[1]={label: d[1].label, data: []};
						for(var i=0, len=b.length; i<len; i++){
							series[0].data[i]=[ b[i] , d[0].val[i] ];
							series[1].data[i]=[ b[i] , d[1].val[i] ];
							// ticks[i]=b[i]; ticks are not used
						}
					};
					shlegend=true;
					stack=false;
					stacked=false; //if stacked was included when pyram, false it
					lines=false;
				break;

				case "rank":
					var data=[];
					lines=false;
					points=false;
					bars=true;
					heading=getHeading();
					transform=function(d,t,b){
						var values=[];
						for(var i=0, len=d.length; i<len; i++){
							//Include in reverse order
							ticks[i]=[i, (typeof d[len-i-1][0] !== "undefined") ?  d[len-i-1][0] : b[len-i-1] ];
							var val= (typeof d[len-i-1][1] !== "undefined") ? d[len-i-1][1] : d[len-i-1];
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
					transform=function(d,t,b){
						var i, len;
						if(typeof b!=="object" || b===null){  //Without "by": simplified call
							//was simply series=d
							len=d.length;
							for(i=0; i<len; i++){
								if(d[i][1]!==null){
									series.push({ label: d[i][0], data: d[i][1] });
								}
							}
						}else{
							//An array without "label" and "val"
							if(typeof d[0]==="number"){
								len=b.length;
								for(i=0; i<len; i++){
									if(d[i]!==null){
										series.push({ label: b[i], data: d[i] });
									}
								}
							}
						}
					};
					shlegend=true;
				break;

				case "bar":
					addJS( vsetup.lib.jquery.flot.categories, hasFlot ); //Check plugin only if we have Flot
					points=false;
					bars=true;
					heading=getHeading();
					lines=false;
					transform=function(d,t,b){
						var i, len;
						if(typeof b!=="object" || b===null){  //Without "by": simplified call
							//was simply series=d
							len=d.length;
							for(i=0; i<len; i++){
								if(d[i][1]!==null){
									series.push([ '<span>'+d[i][0]+'</span>' , d[i][1] ]); //span: temporary solution to avoid x-axis label overlapping
								}
							}
						}else{
							//An array without "label" and "val"
							if(typeof d[0]==="number"){
								len=b.length;
								for(i=0; i<len; i++){
									if(d[i]!==null){
										series.push([ '<span>'+b[i]+'</span>' , d[i] ]); //span: temporary solution to avoid x-axis label overlapping
									}
								}
							}
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
					var previousPoint=[];

					$(this).bind("plothover", function (event, pos, item) {
						var x, y, itemlab, label, tick, val, unitPosition, pre={}, post={}, el, csymbol, clabel, tooltipmsg;
						if (item) {
							if (previousPoint!=[item.seriesIndex, item.dataIndex]) {
								previousPoint=[item.seriesIndex, item.dataIndex];
								if(o.type==="xy"){
									unitPosition={
										x : (typeof VisualJS.container[id].unit.position.x!=="undefined" && VisualJS.container[id].unit.position.x==="start") ? true : false,
										y : (typeof VisualJS.container[id].unit.position.y!=="undefined" && VisualJS.container[id].unit.position.y==="start") ? true : false,
										z : (typeof VisualJS.container[id].unit.position.z!=="undefined" && VisualJS.container[id].unit.position.z==="start") ? true : false,
									};
									for(var property in unitPosition){
										el=unitPosition[property];
										if(unitPosition.hasOwnProperty(property)){
											csymbol=VisualJS.container[id].unit.symbol && typeof VisualJS.container[id].unit.symbol[property]==="string" ? VisualJS.container[id].unit.symbol[property] : "";
											clabel=VisualJS.container[id].unit.label && typeof VisualJS.container[id].unit.label[property]==="string" ? VisualJS.container[id].unit.label[property] : "";
											if(el){
												pre[property]=csymbol;
												post[property]=clabel;
												post[property]=(post[property] !== "") ? " " + post[property] : "";
											}else{
												pre[property]="";
												post[property]=" " + clabel + " " + csymbol;
												post[property]=(post[property]!=="") ? " " + post[property] : "";
											}
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
									x=item.datapoint[0];
									y=item.datapoint[1];
									itemlab=(o.type==="bar" && !Boolean(o.data[0].val))  ? (series.length > 1 ? series[x][0] : series[0][x][0]) : item.series.label;
									label=(o.type!=="rank") ? itemlab : ticks[y][1];
									tick=( (o.type!=="rank" && o.type!=="pie" && o.type!=="bar") || ( o.type === "bar" && Boolean(o.data[0].val) ) ) ?
										(
											(stacked || series.length===1) ?
												(Array.isArray(ticks) && ticks.length > 0 ? ticks[x][1] : false)
												:
												(
													(o.type==="pyram") ? series[pos.x<0 ? 0 : 1].data[item.dataIndex][0] : ticks[item.dataIndex][1] // item.series.yaxis.ticks[item.dataIndex].label won't work in pyram if axis : {y: false}
												)
										)
										: false
									;
									val=(o.type==="pyram") ? Math.abs(x) :
										(o.type!=="rank") ?
										(
											(o.type!=="tsbar") ?
													(
														o.type==="pie" ?
															y[0][1]
															:
															y
													)
													:
													(stacked || series.length===1) ? series[item.seriesIndex].data[x][1] : y
										)
										:
										x
									;

									if(o.type === "bar" && o.by){
										tooltipmsg = (tick) ? tick + (label ? VisualJS.container[id].tooltipseparator + label : "") : (label ? label : "");
										showTooltip(
											tooltipText(
												id,
												tooltipmsg,
												val
											),
											pos.pageX, //item.pageX
											pos.pageY  //item.pageY
										);
									}else{
										tooltipmsg = (tick) ? (label ? label + VisualJS.container[id].tooltipseparator + tick : tick) : (label ? label : "");
										showTooltip(
											tooltipText(
												id,
												tooltipmsg,
												val
											),
											pos.pageX, //item.pageX
											pos.pageY  //item.pageY
										);
									}
								}
							}
						}else{
							$("#"+vsetup.tooltipid).hide();
							previousPoint=[];
						}
					});
				};

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
							axisLabel: (typeof getNestedParam(vsetup.canvas.axis,["labelsText","x"]) !== "undefined"? vsetup.canvas.axis.labelsText.x : undefined),
							axisLabelUseCanvas: true,
							axisLabelFontSizePixels: ( aux=Number($("."+VisualJS.setup.clas).css("font-size").replace("px",""))),
							axisLabelFontFamily: $("."+VisualJS.setup.clas).css("font-family") ,
							axisLabelPadding: aux,
							axisLabelColour: "#545454"
						},
						yaxis:{
							show: container.axis.y,
							axisLabel: (typeof getNestedParam(vsetup.canvas.axis,["labelsText","y"]) !== "undefined" ? vsetup.canvas.axis.labelsText.y : undefined),
							axisLabelUseCanvas: true,
							axisLabelFontSizePixels: aux,
							axisLabelFontFamily: $("."+VisualJS.setup.clas).css("font-family") ,
							axisLabelPadding: aux,
							axisLabelColour: "#545454"
						}
				};

				canvas=function(){
					var
						id=VisualJS.id,
						ticklen=ticks.length,
						i,
						offset,
						footerCont=atext(VisualJS.arr2html(o.footer, html) || ""),
						visualJsType
					;

					$(selector).html("<"+headingElement+" style=\"overflow:auto;\">"+heading+"</"+headingElement+"><div class=\""+VisualJS.setup.footerclass+"\" style=\"overflow:auto;\">"+footerCont+"</div>");

					//It returns false when not enough space to draw a chart
					if(!VisualJS.getSize(id)){return;}

					visualJsType = vsetup.typeclassprefix+o.type;

					$(selector+" "+headingElement).after('<div class="'+vsetup.canvasclass+' '+visualJsType+' '+VisualJS.visualsize+'" style="width: '+VisualJS.width+'px; height: '+VisualJS.height+'px;"></div>');

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
									var axes=plot.getXAxes()[0];
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
							setup.yaxis.show=( (VisualJS.height/series[0].data.length) > 11 ) ? container.axis.y : false; //If too many categories and not enough height, remove y-labels

							setup.xaxis.max=(typeof container.range==="number") ? max*container.range : (Array.isArray(container.range) ? container.range[1] : null); //isRange (can't be null). min is ignored. If max is lower than actual max it will be discarded (but increase in VisualJS.range won't be applied). Otherwise: Increase area using VisualJS.range in the longest bar
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
							setup.yaxis.tickLength=null;
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
							if(o.by && o.by.length && typeof o.data[0] === "object"){
								ticks=[];
								//Create the legend
								series=[];
								for(i=0; i<o.by.length; i++){
									series.push({label : o.by[i], data : []});
								}
								//Generate the bars, with a blank space between groups
								offset=0;
								for(i=0; i<o.data.length; i++){
									if(o.data[i].val.length % 2 === 0){
										ticks.push([(offset+((o.data[i].val.length-1)/2)), o.data[i].label]);
									}else{
										ticks.push([Math.floor(offset+((o.data[i].val.length)/2)), o.data[i].label]);
									}
									for(var j=0; j<o.data[i].val.length; j++){
										series[j].data.push([offset, o.data[i].val[j]]);
										offset++;
									}
									offset+=2;
								}

								//plumbing time
								setup.xaxis.ticks=ticks;
								if(o.axis.labels.x === false){
									setup.xaxis.ticks=labelStrip(setup.xaxis.ticks);
								}
								setup.bars={show: true};
							}else{
								setup.xaxis.mode="categories";
								series=[series];

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
							if(o.axis.labels.x===false || o.axis.labels.y===false){
								aux="<style>";
								if(o.axis.labels.x === false){
									aux += canvasSel+" .flot-x-axis .flot-tick-label{"+
										"display:none;"+
									"}";
								}
								if(o.axis.labels.y===false){
									aux += canvasSel+" .flot-y-axis .flot-tick-label{"+
										"display:none;"+
									"}";
								}
								aux += "</style>";
								$(canvasSel).append(aux);
							}
						break;

						//Time series
						case "tsline":
							if(setup.grid.markings===null){
								//Zero line
								setup.grid.markings=[{color: "#333333", lineWidth: 1, yaxis: {from: 0, to: 0}}];
							}
						case "tsbar":
							if(o.type==="tsbar"){
								setup.xaxis.tickLength=0;
							}
							setup.yaxis.tickFormatter=function(val) {
								return tickFormatterGenerator(val,id, "y", format);
							};
							var
								ratio=VisualJS.width/ticklen,
								xticks=[],
								freq,
								digcrit="01" //first month
							;

							if(typeof container.range!=="number" && container.range!==null){ //isRange
								setup.yaxis.min=container.range[0]; //we don't check if min provided is lower than actual min
								setup.yaxis.max=container.range[1]; //we don't check if max provided is greater than actual max
							}else if(typeof container.range === "number"){
								setup.yaxis.min=null; //we don't check if min provided is lower than actual min
								setup.yaxis.max=container.range; //we don't check if max provided is greater than actual max
							}

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
									digcrit="1"; //first quarter
								case 6: //monthly (6 digits)
									//Magic rule: do not show month/quarter when width is small in comparison with # of ticks
									if(ratio<56){
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
					}
					$(canvasSel).UseTooltip(VisualJS.id);
					VisualJS.pub[VisualJS.id].heading=heading;
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
