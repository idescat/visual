/*
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

VisualJS.setup={ //v.0.7.0
	//Colors for maps and series
	colors: {
		map: {
			max: 100,
			base: "#09111a"
		},
		series: ["#2b527b", "#a52a2a", "#008000", "#ffbf00"]	
	},
	//Default options (They can be dynamically modified thru visual().)
	canvas: {
		unit : {
			label: "", 
			symbol: "",
			position: "end"
		},
		legend: true,
		grid: {
			width: 0
		}, //grid width
		axis: { //show axes?
			x: true,
			y: true
		},
		dec: null, //Show only needed decimals (remove ending zeros) unless (recommended) valid dec has been specified by user
		autoheading: true,
		filter: 0.05 //Used in color assignation in maps
	},

	//Internationalization options
	i18n: {
		lang: "ca", //default lang when no lang is specified
		text: {
			dec: { //decimal separator
				ca: ",",
				es: ",",
				en:  "."
			},
			k: { //thousands separator
				ca: ".",
				es: ".",
				en:  ","
			},
			month: { //Month axis labels
				ca: ["Gen", "Feb", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Des"],
				es:  ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
				en:  ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
			},
			quarter: { //Quarter axis labels
				ca: ["I", "II", "III", "IV"],
				es:  ["I", "II", "III", "IV"],
				en:  ["Q1", "Q2", "Q3", "Q4"]
			},
			na: { //text in tooltip when value is not available 
				ca: "Valor no disponible",
				es: "Valor no disponible",
				en:  "Value not available"
			},
			oldbrowser: { //Warning message when IE<9 (maps)
				ca: "Per visualitzar el mapa cal un navegador m&eacute;s modern.",
				es: "Para visualizar el mapa es preciso un navegador m&aacute;s moderno.",
				en:  "To view the map you must use a modern browser."
			}
		}
	},

	//Classes and ids of elements created by visual
	id: "visual", //id to style the container
	clas: "visual", //class to style the container
	compareids: ["VisualJSleft", "VisualJSright"], //ids to style each VisualJS.compare containers
	tooltipid: "VisualJSTooltip", //id to style the tooltip
	nowrapclass: "VisualJSnw", //class to define blocks of wrappable content in the title
	canvasclass: "VisualJScanvas", //canvas container (Flot)
	areaclass: "VisualJSarea", //svg:g class (D3 maps)
	legendclass: "VisualJSlegend", //svg:g class (D3 maps)
	normal: "VisualJSnormal", //visualitzation's normal size class
	mini: "VisualJSmini", //visualitzation's small size class
	colorclassprefix: "c", //prefix for color class in maps: c0, c1, c2...

	//Markup created by visual
	html: {
		heading: "h1",
		footer: "p" //"footer" element not supported by IE8
	},

	//Libraries: path and existence function
	main: { //Do not use relative paths for main files in production: they'll be relative to the path where VisualJS.iframe is executed.
		visual: "../visual.js",
		setup: "../visual.setup.js",
		lazy: "../lib/lazyload.js"
	},
	lib: {
		d3: {
			js: "../lib/d3.v3.js",
			exists: function(){ return typeof d3==="object"; },
		},
		jquery: {
			js: "../lib/jquery.1.8.3.js",
			exists: function(){ return typeof jQuery==="function"; },

			flot: {
				js: "../lib/jquery.flot.js",
				exists: function(){ return typeof jQuery.plot==="function"; },

				stack: {
					js: "../lib/jquery.flot.stack.js",
					exists: function(){ return typeof jQuery.plot.plugins==="object" && typeof jQuery.plot.plugins[0]==="object" && jQuery.plot.plugins[0].name==="stack";  }//De moment no s'utilitza simultàniament amb cap altre plugin de Flot per tant és el primer.
				},
				orderbars: {
					js: "../lib/jquery.flot.orderbars.js",
					exists: function(){ return typeof jQuery.plot.plugins==="object" && typeof jQuery.plot.plugins[0]==="object" && jQuery.plot.plugins[0].name==="orderBars"; }//De moment no s'utilitza simultàniament amb cap altre plugin de Flot per tant és el primer.
				},
				pyramid: {
					js: "../lib/jquery.flot.pyramid.js",
					exists: function(){ return typeof FlotPyramid==="object"; }
				},
				categories: {
					js: "../lib/jquery.flot.categories.js",
					exists: function(){ return typeof jQuery.plot.plugins==="object" && typeof jQuery.plot.plugins[0]==="object" && jQuery.plot.plugins[0].name==="categories"; } //De moment no s'utilitza simultàniament amb cap altre plugin de Flot per tant és el primer.
				}
			}
		},
		maps: {
			js: "../maps/visual.maps.js",
			exists: function(){ return typeof VisualJS.func.colors==="function" && typeof VisualJS.func.legend==="function";}
		},
		excanvas: {
			js: "../lib/excanvas.js",
			exists: function(){ return typeof G_vmlCanvasManager!=="undefined"; }
		}
	},

	//Maps: path and existence function
	map: {
		mun: {
			js: "../maps/cat2013mun.js",
			exists: function(){ return typeof VisualJS.map.mun!=="undefined" && VisualJS.map.mun.id==="MUNICIPI"; }
		},
		com: {
			js: "../maps/cat2013com.js",
			exists: function(){ return typeof VisualJS.map.com!=="undefined" && VisualJS.map.com.id==="COMARCA"; }
		},
		prov: {
			js: "../maps/cat2013prov.js",
			exists: function(){ return typeof VisualJS.map.prov!=="undefined" && VisualJS.map.prov.id==="PROVINCIA"; }
		},
		usastates: {
			js: "../maps/usa2013states.js",
			exists: function(){ return typeof VisualJS.map.usastates!=="undefined" && VisualJS.map.usastates.id==="STATE"; }
		},
		com01: {
			js: "../maps/com012013mun.js",
			exists: function(){ return typeof VisualJS.map.com01!=="undefined" && VisualJS.map.com01.id==="MUNICIPI"; }
		},
		com02: {
			js: "../maps/com022013mun.js",
			exists: function(){ return typeof VisualJS.map.com02!=="undefined" && VisualJS.map.com02.id==="MUNICIPI"; }
		},
		com03: {
			js: "../maps/com032013mun.js",
			exists: function(){ return typeof VisualJS.map.com03!=="undefined" && VisualJS.map.com03.id==="MUNICIPI"; }
		},
		com04: {
			js: "../maps/com042013mun.js",
			exists: function(){ return typeof VisualJS.map.com04!=="undefined" && VisualJS.map.com04.id==="MUNICIPI"; }
		},
		com05: {
			js: "../maps/com052013mun.js",
			exists: function(){ return typeof VisualJS.map.com05!=="undefined" && VisualJS.map.com05.id==="MUNICIPI"; }
		},
		com06: {
			js: "../maps/com062013mun.js",
			exists: function(){ return typeof VisualJS.map.com06!=="undefined" && VisualJS.map.com06.id==="MUNICIPI"; }
		},
		com07: {
			js: "../maps/com072013mun.js",
			exists: function(){ return typeof VisualJS.map.com07!=="undefined" && VisualJS.map.com07.id==="MUNICIPI"; }
		},
		com08: {
			js: "../maps/com082013mun.js",
			exists: function(){ return typeof VisualJS.map.com08!=="undefined" && VisualJS.map.com08.id==="MUNICIPI"; }
		},
		com09: {
			js: "../maps/com092013mun.js",
			exists: function(){ return typeof VisualJS.map.com09!=="undefined" && VisualJS.map.com09.id==="MUNICIPI"; }
		},
		com10: {
			js: "../maps/com102013mun.js",
			exists: function(){ return typeof VisualJS.map.com10!=="undefined" && VisualJS.map.com10.id==="MUNICIPI"; }
		},
		com11: {
			js: "../maps/com112013mun.js",
			exists: function(){ return typeof VisualJS.map.com11!=="undefined" && VisualJS.map.com11.id==="MUNICIPI"; }
		},
		com12: {
			js: "../maps/com122013mun.js",
			exists: function(){ return typeof VisualJS.map.com12!=="undefined" && VisualJS.map.com12.id==="MUNICIPI"; }
		},
		com13: {
			js: "../maps/com132013mun.js",
			exists: function(){ return typeof VisualJS.map.com13!=="undefined" && VisualJS.map.com13.id==="MUNICIPI"; }
		},
		com14: {
			js: "../maps/com142013mun.js",
			exists: function(){ return typeof VisualJS.map.com14!=="undefined" && VisualJS.map.com14.id==="MUNICIPI"; }
		},
		com15: {
			js: "../maps/com152013mun.js",
			exists: function(){ return typeof VisualJS.map.com15!=="undefined" && VisualJS.map.com15.id==="MUNICIPI"; }
		},
		com16: {
			js: "../maps/com162013mun.js",
			exists: function(){ return typeof VisualJS.map.com16!=="undefined" && VisualJS.map.com16.id==="MUNICIPI"; }
		},
		com17: {
			js: "../maps/com172013mun.js",
			exists: function(){ return typeof VisualJS.map.com17!=="undefined" && VisualJS.map.com17.id==="MUNICIPI"; }
		},
		com18: {
			js: "../maps/com182013mun.js",
			exists: function(){ return typeof VisualJS.map.com18!=="undefined" && VisualJS.map.com18.id==="MUNICIPI"; }
		},
		com19: {
			js: "../maps/com192013mun.js",
			exists: function(){ return typeof VisualJS.map.com19!=="undefined" && VisualJS.map.com19.id==="MUNICIPI"; }
		},		
		com20: {
			js: "../maps/com202013mun.js",
			exists: function(){ return typeof VisualJS.map.com20!=="undefined" && VisualJS.map.com20.id==="MUNICIPI"; }
		},
		com21: {
			js: "../maps/com212013mun.js",
			exists: function(){ return typeof VisualJS.map.com21!=="undefined" && VisualJS.map.com21.id==="MUNICIPI"; }
		},
		com22: {
			js: "../maps/com222013mun.js",
			exists: function(){ return typeof VisualJS.map.com22!=="undefined" && VisualJS.map.com22.id==="MUNICIPI"; }
		},
		com23: {
			js: "../maps/com232013mun.js",
			exists: function(){ return typeof VisualJS.map.com23!=="undefined" && VisualJS.map.com23.id==="MUNICIPI"; }
		},
		com24: {
			js: "../maps/com242013mun.js",
			exists: function(){ return typeof VisualJS.map.com24!=="undefined" && VisualJS.map.com24.id==="MUNICIPI"; }
		},
		com25: {
			js: "../maps/com252013mun.js",
			exists: function(){ return typeof VisualJS.map.com25!=="undefined" && VisualJS.map.com25.id==="MUNICIPI"; }
		},
		com26: {
			js: "../maps/com262013mun.js",
			exists: function(){ return typeof VisualJS.map.com26!=="undefined" && VisualJS.map.com26.id==="MUNICIPI"; }
		},
		com27: {
			js: "../maps/com272013mun.js",
			exists: function(){ return typeof VisualJS.map.com27!=="undefined" && VisualJS.map.com27.id==="MUNICIPI"; }
		},
		com28: {
			js: "../maps/com282013mun.js",
			exists: function(){ return typeof VisualJS.map.com28!=="undefined" && VisualJS.map.com28.id==="MUNICIPI"; }
		},
		com29: {
			js: "../maps/com292013mun.js",
			exists: function(){ return typeof VisualJS.map.com29!=="undefined" && VisualJS.map.com29.id==="MUNICIPI"; }
		},
		com30: {
			js: "../maps/com302013mun.js",
			exists: function(){ return typeof VisualJS.map.com30!=="undefined" && VisualJS.map.com30.id==="MUNICIPI"; }
		},
		com31: {
			js: "../maps/com312013mun.js",
			exists: function(){ return typeof VisualJS.map.com31!=="undefined" && VisualJS.map.com31.id==="MUNICIPI"; }
		},
		com32: {
			js: "../maps/com322013mun.js",
			exists: function(){ return typeof VisualJS.map.com32!=="undefined" && VisualJS.map.com32.id==="MUNICIPI"; }
		},
		com33: {
			js: "../maps/com332013mun.js",
			exists: function(){ return typeof VisualJS.map.com33!=="undefined" && VisualJS.map.com33.id==="MUNICIPI"; }
		},
		com34: {
			js: "../maps/com342013mun.js",
			exists: function(){ return typeof VisualJS.map.com34!=="undefined" && VisualJS.map.com34.id==="MUNICIPI"; }
		},
		com35: {
			js: "../maps/com352013mun.js",
			exists: function(){ return typeof VisualJS.map.com35!=="undefined" && VisualJS.map.com35.id==="MUNICIPI"; }
		},
		com36: {
			js: "../maps/com362013mun.js",
			exists: function(){ return typeof VisualJS.map.com36!=="undefined" && VisualJS.map.com36.id==="MUNICIPI"; }
		},
		com37: {
			js: "../maps/com372013mun.js",
			exists: function(){ return typeof VisualJS.map.com37!=="undefined" && VisualJS.map.com37.id==="MUNICIPI"; }
		},
		com38: {
			js: "../maps/com382013mun.js",
			exists: function(){ return typeof VisualJS.map.com38!=="undefined" && VisualJS.map.com38.id==="MUNICIPI"; }
		},
		com39: {
			js: "../maps/com392013mun.js",
			exists: function(){ return typeof VisualJS.map.com39!=="undefined" && VisualJS.map.com39.id==="MUNICIPI"; }
		},
		com40: {
			js: "../maps/com402013mun.js",
			exists: function(){ return typeof VisualJS.map.com40!=="undefined" && VisualJS.map.com40.id==="MUNICIPI"; }
		},
		com41: {
			js: "../maps/com412013mun.js",
			exists: function(){ return typeof VisualJS.map.com41!=="undefined" && VisualJS.map.com41.id==="MUNICIPI"; }
		}
	},

	//IE check
	func: {
		old: function(ie) { return RegExp("(^|\\s)lt-"+ie+"(\\s|$)").test(document.documentElement.className); }
	},

	//Margins and paddings used in container
	margin: 10,
	padding: {
		w: 30,
		h: 45
	},
	//VisualJS.compare separator width
	separator: 4
};