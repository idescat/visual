var
	year=new Date().getFullYear().toString(),

	defaults={
		lang: VisualJS.setup.i18n.lang,
		autoheading: VisualJS.setup.canvas.autoheading,
		legend: VisualJS.setup.canvas.legend,
		dec: VisualJS.setup.canvas.dec,
		stacked: false
	},

	title={
		range: {
			"rank": "[min, max] or multiplier (default, "+VisualJS.setup.canvas.range.rank+"; cancel with 1)",
			"pyram": "[0, max] or multiplier (default, "+VisualJS.setup.canvas.range.pyram+"; cancel with 1)",
			"cmap":  "[min, max] or quantile (default, "+VisualJS.setup.canvas.range.cmap+"; cancel with 0)",
			"xy":  "{'x': [min, max], 'y': [min, max]}",
			"bar":  "[min, max] or [null, null]",
			"tsline":  "[min, max] or [null, null]",
			"tsbar":  "[min, max] or [null, null]"
		},
		units:{
			default: ["0","[label]","[symbol]"],
			xy: ["{'x': 0, 'y': 0}","{'x': '[x-label]', 'y': '[y-label]'}","{'x': '[x-symbol]', 'y': '[y-symbol]'}"]
		}
	},

	simple=["lang", "title", "geo", "footer", "dec", "autoheading", "legend", "stacked", "range", "grouped", "type", "by", "time", "data"],

	custom={
		bar: {
			time: year,
			data: [ ["A", 7329], ["B", 30231], ["C", 6485] ],
			by: ""
		},
		pie: {
			time: year,
			data: [ ["A", 7329], ["B", 30231], ["C", 6485] ],
			by: null
		},
		rank: {
			time: year,
			data: [ ["A", 30231], ["B", 17329], ["C", 6485], ["D", 3478], ["E", 1585], ["F", 1402], ["G", 1056], ["H", 986] ],
			by: null
		},
		tsline: {
			time: ["1998", "1999", "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012"],
			data: [ { label: "A", val: [ 27147, 27890, 33796, 36694, 37275, 37648, 39485, 42703, 47218, 49679, 50515, 41461, 48871, 54999, 58321 ] }, { label: "B", val: [ 36203, 40316, 48761, 50497, 51891, 54344, 60731, 67813, 74787, 80363, 77233, 57663, 67621, 72280, 69343 ] } ],
			by: null
		},
		xy: {
			time: "1998&ndash;2016",
			data: [
				{
					label: "Some country",
					by: ["1998", "1999", "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016"],
					x: {
					  label: "Imports",
					  val: [78349.40,76988.20,72908.70,67859.80,70323.90,72173.20,67621.10,57663.80,77233.90,80337.70,74787.80,67813.30,60731.00,54344.70,51891.80,50497.90,48761.70,40316.50,36203.70]
					},
				  y: {
					  label: "Exports",
					  val: [65160.60,63906.30,60313.70,58981.30,58880.70,54989.20,48871.60,41461.70,50515.70,49678.40,47216.00,42703.40,39485.10,37648.50,37275.90,36694.50,33796.50,27890.60,27147.80]
				  },
			  }
			],
			by: null
		},
		tsbar: {
			time: ["1998", "1999", "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012"],
			data: [ { label: "A", val: [ 3002684, 3035497, 3058628, 3115336, 3201029, 3309850, 3366329, 3468235, 3543706, 3578176, 3661028, 3713765, 3724515, 3732196, 3741628 ] }, { label: "B", val: [ 3144926, 3173320, 3203371, 3246029, 3305411, 3394296, 3446990, 3526971, 3590991, 3632332, 3703050, 3761655, 3787866, 3807422,3829280 ] } ],
			by: null
		},
		pyram: {
			time: year,
			data: [ { label: "Men", val: [1302329, 1328460, 1090872, 1158983, 1339972, 1667557, 2072016, 2117802, 1945472, 1746832, 1521581, 1282107, 1173175, 990405, 800274, 732383, 477597, 241915, 69987, 15332, 2060] }, { label: "Women", val: [1224757, 1129454, 1030163, 1084773, 1220879, 1527463, 1960767, 2043411, 1904849, 1747880, 1551797, 1330712, 1262386, 1107169, 980444, 994168, 764408, 475115,171929, 40284, 5498] } ],
			by: ["0-4","5-9","10-14","15-19","20-24","25-29","30-34","35-39","40-44","45-49","50-54","55-59","60-64","65-69","70-74","75-79","80-84","85-89","90-94","95-99","100+"]
		},
		cmap: {
			time: year,
			data: [{id: "01", val: 85.50}, {id: "02", val: 79.40}, {id: "03", val: 80.91}, {id: "04", val: 86.50}, {id: "05", val: 83.01}, {id: "06", val: 79.04}, {id: "07", val: 82.74}, {id: "08", val: 77.31}, {id: "09", val: 86.48}, {id: "10", val: 79.94}, {id: "11", val: 65.79}, {id: "12", val: 73.04}, {id: "13", val: 70.35}, {id: "14", val: 89.96}, {id: "15", val: 84.79}, {id: "16", val: 91.06}, {id: "17", val: 75.31}, {id: "18", val: 92.95}, {id: "19", val: 89.95}, {id: "20", val: 82.50}, {id: "21", val: 77.03}, {id: "22", val: 86.48}, {id: "23", val: 90.73}, {id: "24", val: 86.06}, {id: "25", val: 88.94}, {id: "26", val: 91.67}, {id: "27", val: 88.38}, {id: "28", val: 88.68}, {id: "29", val: 92.49}, {id: "30", val: 90.66}, {id: "31", val: 88.24}, {id: "32", val: 86.17}, {id: "33", val: 83.71}, {id: "34", val: 77.71}, {id: "35", val: 90.53}, {id: "36", val: 74.20}, {id: "37", val: 91.87}, {id: "38", val: 88.66}, {id: "39", val: 77.98}, {id: "40", val: 71.31}, {id: "41", val: 75.56}, {id: "42", val: 74.62}, {id: "43", val: 79.42}],
			by: "com2023",
			grouped: ""
		}
	}
;
