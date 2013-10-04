**Visual** is a Javascript library for data visualization developed by the **Statistical Institute of Catalonia ([Idescat](http://www.idescat.cat/en/))**. It is based on popular open source solutions. **Visual** offers a simple interface that encapsulates the complexity of these solutions for the most common chart types.

# Supported visualizations

**Visual** currently supports the following visualizations:

* Distribution of a categorical variable (vertical bar chart): *bar*
* Ranking (horizontal bar chart): *rank*
* Stacked/non-stacked time series (vertical bar chart): *tsbar*
* Time series (line chart): *tsline*
* Population pyramid: *pyram*
* Choropleth map: *cmap*

# Test

Download the [full source and tests](https://github.com/idescat/visual/archive/master.zip) and try the examples in the [test folder](https://github.com/idescat/visual/tree/master/test).

# Configuration

Edit [visual.setup.js](https://github.com/idescat/visual/blob/master/visual.setup.js) and [visual.css](https://github.com/idescat/visual/blob/master/visual.css) to meet your needs. You might need to provide your own maps and adapt the *VisualJS.func.legend* function inside [visual.maps.js](https://github.com/idescat/visual/blob/master/maps/visual.maps.max.js) (see the [maps folder](https://github.com/idescat/visual/tree/master/maps)).

# Installation

**Visual** allows two running modes: **webpage** (recommended) and **direct** (experimental). See the examples in the [test folder](https://github.com/idescat/visual/tree/master/test).

### Webpage mode

In the webpage mode, the visualization is the only content in an html5 page. Use the [webpage template](https://github.com/idescat/visual/blob/master/templates/webpage.html) to build your page. To embed the visualization, use an iframe pointing to your page ([example](https://github.com/idescat/visual/blob/master/test/index.html)).

### Direct mode

In the direct mode, the visualization is directly embedded in a page. Use the [direct template](https://github.com/idescat/visual/blob/master/templates/direct.html) as an example. If you are embedding a single visualization, include the same javascripts as in the webpage template ([example](https://github.com/idescat/visual/blob/master/test/direct.html)).

If you are embedding more than one visualization in the page, LazyLoad will only include the javascripts needed for the first visualization in the **visual** function. Instead, include all the needed javascripts manually. Do not include LazyLoad. You will also need to specify an *id* and its size (in the *fixed* property: *[width, height]*) for each visualization.

# Options

**Visual** is executed by passing a visual object to the *visual* function.

```js
visual( {...} )
```

If you already have a *visual* function defined, you can run **Visual** like this:

```js
VisualJS.load( {...} )
```

The visual object accepts the following properties:

### General properties

#### lang
String ("ca", "es", "en"). Language. Default is set in [visual.setup.js](https://github.com/idescat/visual/blob/master/visual.setup.js).

#### title
String. First level title's text.

#### source
String. Foot text.

#### geo
String. Geographical area.

####  time
String (optional) or array of strings (required). Time period or periods.

Visual will treat the following string time formats using the "quarter" and "month" properties in [visual.setup.js](https://github.com/idescat/visual/blob/master/visual.setup.js): "20131" (first quarter of 2013) and "201301" (January 2013). Any other time pattern will be displayed untreated.

### autoheading
Boolean. It determines if the heading is built by composition from "title", "geo" and "time". If *false*, only "title" will be used as heading. Default is *true*.

### legend
Boolean. It determines if the chart/map legend must be shown. Default is *true*.

#### symbol
Object with two properties: *text* (string) and *position* (string. "start", "end"). Default is no text. *position*'s default is set in [visual.setup.js](https://github.com/idescat/visual/blob/master/visual.setup.js).

Warning: *text* cannot contain HTML entities when *type* is "cmap".

#### type
String ("bar", "rank", "tsbar", "tsline", "pyram", "cmap"). Required. Chart type. It determines the *data* and *time* formats and the specific properties available.

#### data
Array. Required. It includes the data values but also series labels and IDs. The format is determined by *type*.

#### id
String. On [direct mode](#direct-mode), it is the ID of the HTML element where the visualization has to be embedded.

#### fixed
Array. On [direct mode](#direct-mode), it is the *[width, height]* in pixels of the visualization container.

### *bar* properties

Distribution of a categorical variable (vertical bar chart).

```js
visual({
   title: "BAR example",
   geo: "Alt Camp",
   time: "2012",
   source: "The source goes here.",
   symbol: {text: "persones"},
   type: "bar",
   data : [
      ["0-14 anys", 7329],
      ["15-64 anys", 30231],
      ["65-84 anys", 6485],
      ["85 anys o més", 1254]
   ]
});
```

Examples:  [bar.html](https://github.com/idescat/visual/blob/master/test/bar.html)

####  time
String. Time period.

#### data
Array of arrays. Required. The first array contains as many elements as categories. Each element is an array of two elements: a string (label) and a number (value).

### *rank* properties

Ranking (horizontal bar chart).

```js
visual({
   title: "RANK example (40 data)",
   geo: "Catalonia",
   time: "2009",
   source: "The source goes here.",
   symbol: {text: "milers €"},
   type: "rank",
   data : [
      ["Val d'Aran", 20300], 
      ["Pallars Jussà", 19300], 
      ["Ripollès", 19100], 
      ["Urgell", 18900], 
      ["Conca de Barberà", 18800], 
      ["Gironès", 18700], 
      ["Pallars Sobirà", 18700], 
      ["Alta Ribagorça", 18600], 
      ["Cerdanya", 18600], 
      ["Garrotxa", 18600], 
      ["Pla de l'Estany", 18600], 
      ["Barcelonès", 18300], 
      ["Priorat", 18300], 
      ["Ribera d'Ebre", 18200], 
      ["Segrià ", 18100], 
      ["Garrigues", 18000], 
      ["Baix Empordà", 17700], 
      ["Maresme", 17700], 
      ["Alt Camp", 17600], 
      ["Noguera", 17600], 
      ["Tarragonès", 17600], 
      ["Terra Alta", 17600], 
      ["Segarra", 17400], 
      ["Alt Empordà", 17300], 
      ["Baix Penedès", 17300], 
      ["Solsonès", 17300], 
      ["Vallès Occidental", 17300], 
      ["Berguedà", 17200], 
      ["Baix Camp", 17100], 
      ["Pla d'Urgell", 17100], 
      ["Montsià", 17000], 
      ["Alt Penedès", 16900], 
      ["Bages", 16900], 
      ["Baix Ebre", 16900], 
      ["Garraf", 16900], 
      ["Alt Urgell", 16600], 
      ["Selva", 16300], 
      ["Osona", 16200], 
      ["Vallès Oriental", 16200], 
      ["Baix Llobregat", 16000], 
      ["Anoia", 15800]
   ]
});
```

Examples:  [rank.html](https://github.com/idescat/visual/blob/master/test/rank.html), [rank10.html](https://github.com/idescat/visual/blob/master/test/rank10.html)

####  time
String. Time period.

####  data
Array of arrays. Required. The first array contains as many elements as categories. Each element is an array of two elements: a string (label) and a number (value).

### *tsbar* properties

Stacked/non-stacked time series (vertical bar chart).

```js
visual({
   title: "TSBAR example",
   geo: "Catalonia",
   time : [
      "1998", "1999", "2000", "2001", "2002", 
      "2003", "2004", "2005", "2006", "2007", 
      "2008", "2009", "2010", "2011", "2012"
   ],
   source: "The source goes here.",
   symbol: {text: "M €"},
   type: "tsbar",
   data : [ 
      { 
         label: "Exportacions", 
         val: [ 
            27147.8, 27890.6, 33796.5, 36694.5, 37275.9, 
            37648.5, 39485.1, 42703.4, 47218.8, 49679.8, 
            50515.7, 41461.7, 48871.6, null, 58321.7 
         ]
      }, 
      { 
         label: "Importacions", 
         val: [ 
            36203.7, 40316.5, 48761.7, 50497.9, 51891.8, 
            54344.7, 60731, 67813.3, 74787.8, 80363.4, 
            77233.9, 57663.8, 67621.1, null, 69343.1 
         ]
      }
   ]
});
```

Examples:  [tsbar.html](https://github.com/idescat/visual/blob/master/test/tsbar.html), [tsbar2.html](https://github.com/idescat/visual/blob/master/test/tsbar2.html), [tsbarns.html](https://github.com/idescat/visual/blob/master/test/tsbarns.html)

####  time
Array of strings. Required. Time periods.

#### data
Array of objects. Required. The array contains as many elements as series. Each element is an object with two properties: *label* (string) and *val* (array of values).

#### stacked

Boolean. Default: *false*. When bars are not stacked, only three series are allowed.

### *tsline* properties

Time series (line chart).

```js
visual({
   title: "TSLINE example",
   geo: "Catalonia",
   time : [
      "1998", "1999", "2000", "2001", "2002", 
      "2003", "2004", "2005", "2006", "2007", 
      "2008", "2009", "2010", "2011", "2012"
   ],
   source: "The source goes here.",
   symbol: {text: "M €"},
   type: "tsline",
   data : [ 
      { 
         label: "Exportacions", 
         val: [ 
            27147.8, 27890.6, 33796.5, 36694.5, 37275.9, 
            37648.5, 39485.1, 42703.4, 47218.8, 49679.8, 
            50515.7, 41461.7, 48871.6, null, 58321.7 
         ]
      }, 
      {
         label: "Importacions", 
         val: [ 
            36203.7, 40316.5, 48761.7, 50497.9, 51891.8, 
            54344.7, 60731, 67813.3, 74787.8, 80363.4, 
            77233.9, 57663.8, 67621.1, null, 69343.1 
         ]
      }
   ]
});
```

Examples:  [tsline2.html](https://github.com/idescat/visual/blob/master/test/tsline2.html)

####  time
Array of strings. Required. Time periods.

#### data
Array of objects. Required. The array contains as many elements as series. Each element is an object with two properties: *label* (string) and *val* (array of values).

### *pyram* properties

Population pyramid.

```js
visual({
   title: "PYRAM example",
   geo: "Some country",
   time: "2012",
   source: "The source goes here.",
   symbol: {text: "persones"},
   type: "pyram",
   by: [
      "0-4", "5-9", "10-14", "15-19", "20-24", "25-29", 
      "30-34", "35-39", "40-44", "45-49", "50-54", "55-59",
      "60-64", "65-69", "70-74", "75-79", "80-84", "85-89", 
      "90-94", "95-99", "100+"
   ],
   data: [
      { 
         label: "Homes", 
         val: [
            130229, 132460, 109072, 115983, 133972, 166757, 
            207016, 211782, 195472, 176832, 152151, 122107, 
            117375, 99405, 80274, 73283, 47597, 24195, 6997, 1532, 260
         ]
      },
      { 
         label: "Dones", 
         val: [
            124757, 112944, 103163, 104773, 122879, 152743, 
            196767, 193411, 194849, 174780, 155177, 133712, 
            126386, 117169, 98444, 99468, 76448, 47515,17929, 4284, 548
         ]
      }
   ]
});
```

Examples:  [pyram.html](https://github.com/idescat/visual/blob/master/test/pyram.html)

####  time
String. Time period.

#### data
Array of objects. Required. The array contains two elements: one for each sex. Each element is an object with two properties: *label* (string) and *val* (array of values).

#### by
Array of strings. Required. Each element is an age label.

### *cmap* properties

Choropleth map

```js
visual({
   title: "CMAP example with missing data", 
   geo: "Catalonia", 
   time: "2001",
   source: "The source goes here.", 
   symbol: {text: "%"},
   type: "cmap", 
   dec: 2,
   by: "com",
   data: [
      {id: "01", val: 85.50}, 
      {id: "02", val: 79.40}, 
      {id: "03", val: 80.91}, 
      {id: "04", val: 86.50}, 
      {id: "05", val: 83.01}, 
      {id: "06", val: 79.04}, 
      {id: "07", val: 82.74}, 
      {id: "08", val: 77.31}, 
      {id: "09", val: 86.48}, 
      {id: "10", val: 79.94}, 
      {id: "11", val: 65.79}, 
      {id: "12", val: 73.04}, 
      {id: "13", val: 70.35}, 
      {id: "14", val: 89.96}, 
      {id: "15", val: 84.79}, 
      {id: "16", val: 91.06}, 
      {id: "17", val: 75.31}, 
      {id: "18", val: 92.95}, 
      {id: "19", val: 89.95}, 
      {id: "20", val: 82.50}, 
      {id: "21", val: 77.03}, 
      {id: "22", val: 86.48}, 
      {id: "23", val: 90.73}, 
      {id: "24", val: 86.06}, 
      {id: "25", val: 88.94}, 
      {id: "26", val: 91.67}, 
      {id: "27", val: 88.38}, 
      {id: "28", val: 88.68}, 
      {id: "29", val: 92.49}, 
      {id: "30", val: 90.66}, 
      {id: "31", val: 88.24}, 
      {id: "32", val: 86.17}, 
      {id: "33", val: 83.71}, 
      {id: "34", val: 77.71}, 
      {id: "35", val: 90.53}, 
      {id: "36", val: 74.20}, 
      {id: "34", val: 91.87}, 
      {id: "38", val: 88.66}, 
      {id: "39", val: 77.98}, 
      {id: "40", val: 71.31}, 
      {id: "41", val: 75.56}
   ]
});
```

Examples:  [cmap.html](https://github.com/idescat/visual/blob/master/test/cmap.html), [cmap-com.html](https://github.com/idescat/visual/blob/master/test/cmap-com.html), [cmap-f0.html](https://github.com/idescat/visual/blob/master/test/cmap-f0.html), [cmap-f020.html](https://github.com/idescat/visual/blob/master/test/cmap-f020.html), [cmap-groups1.html](https://github.com/idescat/visual/blob/master/test/cmap-groups1.html), [cmap-groups2.html](https://github.com/idescat/visual/blob/master/test/cmap-groups2.html)

####  time
String. Time period.

####  data
Array of objects. Required. The array contains as many elements as map areas. Each element is an object with at least one property: the area *id* (string). In this case, a map  will be created with the included areas highlighted. If *val* (number) is included, it will be used to automatically assigned colors to areas, unless [grouped](#grouped) has been specified. In that case, the *group* property (counter starting with 1) is required and will be used to assign colors, but *val* can still be specified if needed.

####  grouped
Array. Each element is a group label string (first label will be attached to areas with a *group* property of 1 in **data**, and so on).

####  by
String. Required. Selects a certain map. Possible values ("mun", "com", "prov") are set in [visual.setup.js](https://github.com/idescat/visual/blob/master/visual.setup.js).

####  dec
Number. Default: 0. Number of decimals in the data. It is used to assign colors and build the legend.

####  filter
Number between 0 and 0.49. Default: 0.05. It determines the color assignation. For example, 0.05 assigns colors excluding values below the 5th percentile and above the 95th percentile.

# Maps
Sample maps are stored at the [maps folder](https://github.com/idescat/visual/tree/master/maps). A map is a Javascript file that adds a new property (the name of the map) to the VisualJS.map object. The value of this new property is a Visual map object.

### Visual map object

#### GeoJSON properties: features

Geographic information must be provided in the [GeoJSON](http://geojson.org) format: it must be a feature collection object (a GeoJSON object with the type "FeatureCollection"). Just copy the "features" property of the GeoJSON object into the Visual map object.

#### Projection properties: projection, scale, center

"projection" must be a valid [D3 geo projection](https://github.com/mbostock/d3/wiki/Geo-Projections). "scale" is the projection scale (a number) and "center" is the projection center (a coordinate array).

	projection: d3.geo.mercator(),
	scale: 9000,
	center: [1.74, 41.7],

If a projection does not support centering (for example, Albers USA), "center" is optional and, if present, it will be ignored.

Currently, Visual does not support rotation.

#### ID properties: id, label

Use "id" and "label" to specify the properties in "features" that contain the regions' IDs and the regions' labels.

	id: "STATE",
	label: "NAME",

#### Canvas properties: area, legend

Use "area" to provide the canvas size in pixels (width, height) where your projection will be drawn. Use "legend" to specify the location in pixels (width, height) of the map legend in the canvas.

	area: [500, 500],
	legend: [280, 345],

These values will not determine the final size of your map (maps will scale to the available space): they are only important to determine the "scale" and "center" values.

### Map setup

Maps must be declared in [visual.setup.js](https://github.com/idescat/visual/blob/master/visual.setup.js). To include a new map, edit [visual.setup.js](https://github.com/idescat/visual/blob/master/visual.setup.js) and create a new property with the name of the map inside VisualJS.setup.map. This name must match the name in VisualJS.map (in the Javascript map file) and will be used in the [by](#by-1) property. The value of this property must be an object with two properties: the address of the map ("js") and an existence function ("exists").

# Dependencies

**Visual** uses the following libraries internally:

* [LazyLoad](https://github.com/rgrove/lazyload/)
* [D3](http://d3js.org)
* [jQuery](http://jquery.com/), required by Flot
* [Flot](http://www.flotcharts.org) ([stack](https://github.com/flot/flot/blob/master/jquery.flot.stack.js), [categories](https://github.com/flot/flot/blob/master/jquery.flot.categories.js)), [Flot orderBars](http://en.benjaminbuffet.com/labs/flot/), [Flot Pyramid](https://github.com/asis/flot-pyramid)
* [ExplorerCanvas](https://code.google.com/p/explorercanvas/)

These libraries are only loaded when needed.

For convenience, they are included in the [lib folder](https://github.com/idescat/visual/tree/master/lib) but you can use any location (for example, a CDN) in [visual.setup.js](https://github.com/idescat/visual/blob/master/visual.setup.js).

# Known limitations

[D3](http://d3js.org) requires a modern browser (versions of Internet Explorer prior to 9 are not supported). **Visual** uses D3 for choropleth maps.

The non-stacked time series chart supports a maximum of three series.