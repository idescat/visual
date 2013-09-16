**Visual** is a Javascript library for data visualization developed by the **Statistical Institute of Catalonia ([Idescat](http://www.idescat.cat/en/))**. It is based on popular open source solutions. **Visual** offers a simple interface that encapsulates the complexity of these solutions for the most common chart types.

# Supported visualizations

**Visual** currently supports the following visualizations:

* Distribution of a categorical variable (vertical bar chart): *bar*
* Stacked/non-stacked time series (vertical bar chart): *tsbar*
* Time series (line chart): *tsline*
* Ranking (horizontal bar chart): *rank*
* Population pyramid: *pyram*
* Choropleth map: *cmap*

# Test

Download the [full source and tests](https://github.com/idescat/visual/archive/master.zip) and try the examples in the [test folder](https://github.com/idescat/visual/tree/master/maps).

# Configuration

Edit [visual.setup.js](https://github.com/idescat/visual/blob/master/visual.setup.js) and [visual.css](https://github.com/idescat/visual/blob/master/visual.css) to meet your needs. You might need to provide your own maps and adapt the *VisualJS.func.legend* function inside [visual.maps.js](https://github.com/idescat/visual/blob/master/maps/visual.maps.max.js) (see the [maps folder](https://github.com/idescat/visual/tree/master/maps)).

# Installation

**Visual** allows two running modes: **webpage** (recommended) and **direct** (experimental). See the examples in the [test folder](https://github.com/idescat/visual/tree/master/maps).

### Webpage mode

In the webpage mode, the visualization is the only content in an html5 page. Use the [webpage template](https://github.com/idescat/visual/blob/master/templates/webpage.html) to build your page. To embed the visualization, use an iframe pointing to your page.

### Direct mode

In the direct mode, the visualization is directly embedded in a page. Use the [direct template](https://github.com/idescat/visual/blob/master/templates/direct.html) as an example. If you are embedding a single visualization, include the same javascripts as in the webpage.html template.

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
String. Required. First level title's text.

#### source
String. Required. Foot text.

#### geo
String. Required. Geographical area.

####  time
String or array. Required. Time period or periods.

#### symbol
Object with two properties: *text* (string) and *position* (string. "start", "end"). Default is no text. *position*'s default is set in [visual.setup.js](https://github.com/idescat/visual/blob/master/visual.setup.js).

Warning: *text* cannot contain HTML entities when *type* is "cmap".

#### type
String ("tsline", "bar", "tsbar", "rank", "pyram", "cmap"). Required. Chart type. It determines the *data* and *time* formats and the specific properties available.

#### data
Array. Required. It includes the data values but also series labels and IDs. The format is determined by *type*.

#### id
String. On [direct mode](#direct-mode), it is the ID of the HTML element where the visualization has to be embedded.

#### fixed
Array. On [direct mode](#direct-mode), it is the *[width, height]* in pixels of the visualization container.

# Dependencies

**Visual** uses internally the following libraries (see the lib folder):

* [LazyLoad](https://github.com/rgrove/lazyload/)
* [D3](http://d3js.org)
* [jQuery](http://jquery.com/), required by Flot
* [Flot](http://www.flotcharts.org) ([stack](https://github.com/flot/flot/blob/master/jquery.flot.stack.js), [categories](https://github.com/flot/flot/blob/master/jquery.flot.categories.js)), [Flot orderBars](http://en.benjaminbuffet.com/labs/flot/), [Flot Pyramid](https://github.com/asis/flot-pyramid)
* [ExplorerCanvas](https://code.google.com/p/explorercanvas/)

These libraries are only loaded when needed.

# Known limitations

[D3](http://d3js.org) requires a modern browser (versions of Internet Explorer prior to 9 are not supported). **Visual** uses D3 for choropleth maps.

The non-stacked time series chart supports a maximum of three series.