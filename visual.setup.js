/*
Copyright (c) 2020 Institut d'Estadistica de Catalunya (Idescat)
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

/*global VisualJS */

VisualJS.setup = { //v.1.2.0
	//Colors for maps and series
	colors: {
		map: {
			max: 100, //If not enough colors, legend is deceiving and it's better to remove it
			base: "#09111a"
		},
		series: ["#2b527b", "#a52a2a", "#008000", "#ffbf00", "#5959ff", "#ff5959", "#9acd32", "#af8d26"]
	},
	//Default options (They can be dynamically modified thru visual().)
	canvas: {
		unit: {
			label: "",
			symbol: "",
			position: "end"
		},
		legend: true,
		position: "ne", //legend position: "ne", "nw", "se" or "sw"
		grid: {
			border: 0, //grid border width
			shadow: 4, //line shadow width
			line: 2, //line width
			point: 1 //point radius
		},
		axis: { //show axes?
			x: true,
			y: true,
			ticks: {
				x: true,
				y: true
			},
			labels: {
				x: true,
				y: true
			}
		},
		dec: null, //Show only needed decimals (remove ending zeros) unless (recommended) valid dec has been specified by user
		autoheading: true,
		range: { //Arrays are not accepted here. "bar", "tsline" and "tsbar" currently don't accept a number.
			//Quantile. No filtering: 0
			cmap: 0.05, //Used in color assignation in maps

			//Multiplier. No filtering: 1
			rank: 1.02, //Increase area horizontally by 2% of the longest bar
			pyram: 1.02 //Increase area horizontally by 2% of the longest bar
		}
	},

	//Internationalization options
	i18n: {
		lang: "ca", //default lang when no lang is specified
		text: {
			dec: { //decimal separator
				ca: ",",
				es: ",",
				en: ".",
				fr: ","
			},
			k: { //thousands separator
				ca: ".",
				es: ".",
				en: ",",
				fr: " "
			},
			month: { //Month axis labels
				ca: ["Gen", "Feb", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Des"],
				es: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
				en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
				fr: ["Jan", "Fev", "Mar", "Avr", "Mai", "Jun", "Jul", "Aou", "Sep", "Oct", "Nov", "Dec"]
			},
			quarter: { //Quarter axis labels
				ca: ["I", "II", "III", "IV"],
				es: ["I", "II", "III", "IV"],
				en: ["Q1", "Q2", "Q3", "Q4"],
				fr: ["Q1", "Q2", "Q3", "Q4"]
			},
			na: { //text in tooltip when value is not available
				ca: "Valor no disponible",
				es: "Valor no disponible",
				en: "Value not available",
				fr: "Valeur non disponible"
			},
			oldbrowser: { //Warning message when IE<9 (maps)
				ca: "Per visualitzar el mapa cal un navegador m&eacute;s modern.",
				es: "Para visualizar el mapa es preciso un navegador m&aacute;s moderno.",
				en: "To view the map you must use a modern browser.",
				fr: "Veuillez utiliser un navigateur moderne pour visualiser la carte."
			},
			// v.1.1.0
			iframetitle: {
				ca: "Visualització de dades",
				es: "Visualización de datos",
				en: "Data visualization",
				fr: "Visualisation de données"
			}
		},
		// v.1.1.0
		template: "{{period}} {{year}}" //Template for time literals (object or string)
		 /* same as
			{
				aaaamm: {
					ca: "{{period}} {{year}}",
					es: "{{period}} {{year}}",
					en: "{{period}} {{year}}",
					fr: "{{period}} {{year}}"
				},
				aaaaq: {
					ca: "{{period}} {{year}}",
					es: "{{period}} {{year}}",
					en: "{{period}} {{year}}",
					fr: "{{period}} {{year}}"
				}
			}
		*/
	},

	//String used in the tooltip between the elements in the second line v.1.1
	tooltipseparator: " / ",

	//Classes and ids of elements created by visual
	id: "visual", //id to style the container
	clas: "visual", //class to style the container
	compareids: ["VisualJSleft", "VisualJSright"], //ids to style each VisualJS.compare containers
	tooltipid: "VisualJSTooltip", //id to style the tooltip
	nowrapclass: "VisualJSnw", //class to define blocks of wrappable content in the title
	canvasclass: "VisualJScanvas", //canvas container (Flot)
	areaclass: "VisualJSarea", //svg:g class (D3 maps)
	legendclass: "VisualJSlegend", //svg:g class (D3 maps)
	footerclass: "VisualJSfooter", //Footer class of the container
	normal: "VisualJSnormal", //Normal size class
	mini: "VisualJSmini", //Small size class
	colorclassprefix: "c", //prefix for color class in maps: cnohover, c0, c1, c2...
	typeclassprefix : "VisualJS", //Meaning a chart of type "tsbar" will have class VisualJStsbar v.1.1.0

	//Markup created by visual
	html: {
		heading: "h1"
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
			exists: function () {
				return typeof d3 === "object";
			}
		},
		jquery: {
			js: "../lib/jquery.1.8.3.js",
			exists: function () {
				return typeof jQuery === "function";
			},

			flot: {
				js: "../lib/jquery.flot.js",
				exists: function () {
					return typeof jQuery.plot === "function";
				},

				stack: {
					js: "../lib/jquery.flot.stack.js",
					exists: function () {
						return typeof jQuery.plot.plugins === "object" && typeof jQuery.plot.plugins[0] === "object" && jQuery.plot.plugins[0].name === "stack";
					}
				},
				orderbars: {
					js: "../lib/jquery.flot.orderbars.js",
					exists: function () {
						return typeof jQuery.plot.plugins === "object" && typeof jQuery.plot.plugins[0] === "object" && jQuery.plot.plugins[0].name === "orderBars";
					}
				},
				pyramid: {
					js: "../lib/jquery.flot.pyramid.js",
					exists: function () {
						return typeof FlotPyramid === "object";
					}
				},
				categories: {
					js: "../lib/jquery.flot.categories.js",
					exists: function () {
						return typeof jQuery.plot.plugins === "object" && typeof jQuery.plot.plugins[0] === "object" && jQuery.plot.plugins[0].name === "categories";
					}
				},
				pie: {
					js: "../lib/jquery.flot.pie.js",
					exists: function () {
						return typeof jQuery.plot.plugins === "object" && typeof jQuery.plot.plugins[0] === "object" && jQuery.plot.plugins[0].name === "pie";
					}
				},
				axisLabels: {
					js: "../lib/jquery.flot.axislabels.js",
					exists: function () {
						return typeof jQuery.plot.plugins === "object" && typeof jQuery.plot.plugins[0] === "object" && jQuery.plot.plugins.map(function (e) {
							return e.name
						}).indexOf("axisLabels") !== -1;
					}
				}
			}
		},
		maps: {
			js: "../maps/visual.maps.js",
			exists: function () {
				return typeof VisualJS.func.colors === "function" && typeof VisualJS.func.legend === "function";
			}
		},
		excanvas: {
			js: "../lib/excanvas.js",
			exists: function () {
				return typeof G_vmlCanvasManager !== "undefined";
			}
		}
	},

	//Maps: path and existence function
	map: {
		mun: {
			js: "../maps/cat2013mun.js",
			exists: function () {
				return typeof VisualJS.map.mun !== "undefined";
			}
		},
		com: {
			js: "../maps/cat2013com.js",
			exists: function () {
				return typeof VisualJS.map.com !== "undefined";
			}
		},
		com2015: {
			js: "../maps/cat2015com.js",
			exists: function () {
				return typeof VisualJS.map.com2015 !== "undefined";
			}
		},
		prov: {
			js: "../maps/cat2013prov.js",
			exists: function () {
				return typeof VisualJS.map.prov !== "undefined";
			}
		},
		usastates: {
			js: "../maps/usa2013states.js",
			exists: function () {
				return typeof VisualJS.map.usastates !== "undefined";
			}
		},
		com01: {
			js: "../maps/com012013mun.js",
			exists: function () {
				return typeof VisualJS.map.com01 !== "undefined";
			}
		},
		com02: {
			js: "../maps/com022013mun.js",
			exists: function () {
				return typeof VisualJS.map.com02 !== "undefined";
			}
		},
		com03: {
			js: "../maps/com032013mun.js",
			exists: function () {
				return typeof VisualJS.map.com03 !== "undefined";
			}
		},
		com04: {
			js: "../maps/com042013mun.js",
			exists: function () {
				return typeof VisualJS.map.com04 !== "undefined";
			}
		},
		com05: {
			js: "../maps/com052013mun.js",
			exists: function () {
				return typeof VisualJS.map.com05 !== "undefined";
			}
		},
		com06: {
			js: "../maps/com062013mun.js",
			exists: function () {
				return typeof VisualJS.map.com06 !== "undefined";
			}
		},
		com07: {
			js: "../maps/com072013mun.js",
			exists: function () {
				return typeof VisualJS.map.com07 !== "undefined";
			}
		},
		com08: {
			js: "../maps/com082013mun.js",
			exists: function () {
				return typeof VisualJS.map.com08 !== "undefined";
			}
		},
		com09: {
			js: "../maps/com092013mun.js",
			exists: function () {
				return typeof VisualJS.map.com09 !== "undefined";
			}
		},
		com10: {
			js: "../maps/com102013mun.js",
			exists: function () {
				return typeof VisualJS.map.com10 !== "undefined";
			}
		},
		com11: {
			js: "../maps/com112013mun.js",
			exists: function () {
				return typeof VisualJS.map.com11 !== "undefined";
			}
		},
		com12: {
			js: "../maps/com122013mun.js",
			exists: function () {
				return typeof VisualJS.map.com12 !== "undefined";
			}
		},
		com13: {
			js: "../maps/com132013mun.js",
			exists: function () {
				return typeof VisualJS.map.com13 !== "undefined";
			}
		},
		com14: {
			js: "../maps/com142013mun.js",
			exists: function () {
				return typeof VisualJS.map.com14 !== "undefined";
			}
		},
		com15: {
			js: "../maps/com152013mun.js",
			exists: function () {
				return typeof VisualJS.map.com15 !== "undefined";
			}
		},
		com16: {
			js: "../maps/com162013mun.js",
			exists: function () {
				return typeof VisualJS.map.com16 !== "undefined";
			}
		},
		com17: {
			js: "../maps/com172013mun.js",
			exists: function () {
				return typeof VisualJS.map.com17 !== "undefined";
			}
		},
		com18: {
			js: "../maps/com182013mun.js",
			exists: function () {
				return typeof VisualJS.map.com18 !== "undefined";
			}
		},
		com19: {
			js: "../maps/com192013mun.js",
			exists: function () {
				return typeof VisualJS.map.com19 !== "undefined";
			}
		},
		com20: {
			js: "../maps/com202013mun.js",
			exists: function () {
				return typeof VisualJS.map.com20 !== "undefined";
			}
		},
		com21: {
			js: "../maps/com212013mun.js",
			exists: function () {
				return typeof VisualJS.map.com21 !== "undefined";
			}
		},
		com22: {
			js: "../maps/com222013mun.js",
			exists: function () {
				return typeof VisualJS.map.com22 !== "undefined";
			}
		},
		com23: {
			js: "../maps/com232013mun.js",
			exists: function () {
				return typeof VisualJS.map.com23 !== "undefined";
			}
		},
		com24: {
			js: "../maps/com242013mun.js",
			exists: function () {
				return typeof VisualJS.map.com24 !== "undefined";
			}
		},
		com25: {
			js: "../maps/com252013mun.js",
			exists: function () {
				return typeof VisualJS.map.com25 !== "undefined";
			}
		},
		com26: {
			js: "../maps/com262013mun.js",
			exists: function () {
				return typeof VisualJS.map.com26 !== "undefined";
			}
		},
		com27: {
			js: "../maps/com272013mun.js",
			exists: function () {
				return typeof VisualJS.map.com27 !== "undefined";
			}
		},
		com28: {
			js: "../maps/com282013mun.js",
			exists: function () {
				return typeof VisualJS.map.com28 !== "undefined";
			}
		},
		com29: {
			js: "../maps/com292013mun.js",
			exists: function () {
				return typeof VisualJS.map.com29 !== "undefined";
			}
		},
		com30: {
			js: "../maps/com302013mun.js",
			exists: function () {
				return typeof VisualJS.map.com30 !== "undefined";
			}
		},
		com31: {
			js: "../maps/com312013mun.js",
			exists: function () {
				return typeof VisualJS.map.com31 !== "undefined";
			}
		},
		com32: {
			js: "../maps/com322013mun.js",
			exists: function () {
				return typeof VisualJS.map.com32 !== "undefined";
			}
		},
		com33: {
			js: "../maps/com332013mun.js",
			exists: function () {
				return typeof VisualJS.map.com33 !== "undefined";
			}
		},
		com34: {
			js: "../maps/com342013mun.js",
			exists: function () {
				return typeof VisualJS.map.com34 !== "undefined";
			}
		},
		com35: {
			js: "../maps/com352013mun.js",
			exists: function () {
				return typeof VisualJS.map.com35 !== "undefined";
			}
		},
		com36: {
			js: "../maps/com362013mun.js",
			exists: function () {
				return typeof VisualJS.map.com36 !== "undefined";
			}
		},
		com37: {
			js: "../maps/com372013mun.js",
			exists: function () {
				return typeof VisualJS.map.com37 !== "undefined";
			}
		},
		com38: {
			js: "../maps/com382013mun.js",
			exists: function () {
				return typeof VisualJS.map.com38 !== "undefined";
			}
		},
		com39: {
			js: "../maps/com392013mun.js",
			exists: function () {
				return typeof VisualJS.map.com39 !== "undefined";
			}
		},
		com40: {
			js: "../maps/com402013mun.js",
			exists: function () {
				return typeof VisualJS.map.com40 !== "undefined";
			}
		},
		com41: {
			js: "../maps/com412013mun.js",
			exists: function () {
				return typeof VisualJS.map.com41 !== "undefined";
			}
		},
		com072015: {
			js: "../maps/com072015mun.js",
			exists: function () {
				return typeof VisualJS.map.com072015 !== "undefined";
			}
		},
		com242015: {
			js: "../maps/com242015mun.js",
			exists: function () {
				return typeof VisualJS.map.com242015 !== "undefined";
			}
		},
		com412015: {
			js: "../maps/com412015mun.js",
			exists: function () {
				return typeof VisualJS.map.com412015 !== "undefined";
			}
		},
		com422015: {
			js: "../maps/com422015mun.js",
			exists: function () {
				return typeof VisualJS.map.com422015 !== "undefined";
			}
		},
		prov08: {
			js: "../maps/prov082013mun.js",
			exists: function () {
				return typeof VisualJS.map.prov08 !== "undefined";
			}
		},
		prov17: {
			js: "../maps/prov172013mun.js",
			exists: function () {
				return typeof VisualJS.map.prov17 !== "undefined";
			}
		},
		prov25: {
			js: "../maps/prov252013mun.js",
			exists: function () {
				return typeof VisualJS.map.prov25 !== "undefined";
			}
		},
		prov43: {
			js: "../maps/prov432013mun.js",
			exists: function () {
				return typeof VisualJS.map.prov43 !== "undefined";
			}
		},
		at: {
			js: "../maps/cat2014at.js",
			exists: function () {
				return typeof VisualJS.map.at !== "undefined";
			}
		},
		spainnuts2: {
			js: "../maps/spain2014nuts2.js",
			exists: function () {
				return typeof VisualJS.map.spainnuts2 !== "undefined";
			}
		},
		spainnuts3: {
			js: "../maps/spain2014nuts3.js",
			exists: function () {
				return typeof VisualJS.map.spainnuts3 !== "undefined";
			}
		},
		norwaymun: {
			js: "../maps/norway2013mun.js",
			exists: function () {
				return typeof VisualJS.map.norwaymun !== "undefined";
			}
		},
		eu28: {
			js: "../maps/eu28.js",
			exists: function () {
				return typeof VisualJS.map.eu28 !== "undefined";
			}
		},
		eu27: {
			js: "../maps/eu272020.js",
			exists: function () {
				return typeof VisualJS.map.eu27 !== "undefined";
			}
		}
	},

	//IE check
	func: {
		old: function (ie) {
			return RegExp("(^|\\s)lt-" + ie + "(\\s|$)").test(document.documentElement.className);
		}
	},

	//Attach event listener? 0.10.*
	listen: false,

	//Margins and paddings used in container
	margin: 10,
	padding: {
		w: 30,
		h: 39
	},
	//VisualJS.compare separator width
	separator: 0
};
