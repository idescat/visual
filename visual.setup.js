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

VisualJS.setup={
	//Classes and ids of elements created by visual
	id: "visual", //id to style the container
	tooltipid: "VisualJSTooltip", //id to style the tooltip
	nowrapclass: "VisualJSnw", //class to define blocks of wrappable content in the title
	normal: "VisualJSnormal", //visualitzation's normal size class
	mini: "VisualJSmini", //visualitzation's small size class

	//Colors for maps and series
	colors: {
		map: {
			max: 100,
			base: "#09111a"
		},
		series: ["#2b527b", "#a52a2a", "#008000", "#ffbf00"]	
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
				ca: "Per visualitzar el mapa cal un navegador més modern.",
				es: "Para visualizar el mapa es preciso un navegador más moderno.",
				en:  "To view the map you must use a modern browser."
			}
		}
	},

	//Libraries: path and existence function
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
	}
}