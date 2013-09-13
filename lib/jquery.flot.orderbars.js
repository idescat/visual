/*
 * Flot plugin to order bars side by side.
 * 
 * Released under the MIT license by Benjamin BUFFET, 20-Sep-2010.
 *
 * This plugin is an alpha version.
 *
 * To activate the plugin you must specify the parameter "order" for the specific serie :
 *
 *  $.plot($("#placeholder"), [{ data: [ ... ], bars :{ order = null or integer }])
 *
 * If 2 series have the same order param, they are ordered by the position in the array;
 *
 * The plugin adjust the point by adding a value depanding of the barwidth
 * Exemple for 3 series (barwidth : 0.1) :
 *
 *          first bar décalage : -0.15
 *          second bar décalage : -0.05
 *          third bar décalage : 0.05
 *
 */
!function(a){function b(a){function h(a,d,f){var g=null;if(i(d)&&(p(d),j(a),l(a),o(d),c>=2)){var h=q(d),k=0,m=r();k=s(h)?-1*t(b,h-1,Math.floor(c/2)-1)-m:t(b,Math.ceil(c/2),h-2)+m+2*e,g=u(f,d,k),f.points=g}return g}function i(a){return null!=a.bars&&a.bars.show&&null!=a.bars.order}function j(a){var b=g?a.getPlaceholder().innerHeight():a.getPlaceholder().innerWidth(),c=g?k(a.getData(),1):k(a.getData(),0),d=c[1]-c[0];f=d/b}function k(a,b){for(var c=new Array,d=0;d<a.length;d++)c[0]=a[d].data[0][b],c[1]=a[d].data[a[d].data.length-1][b];return c}function l(a){b=m(a.getData()),c=b.length}function m(a){for(var b=new Array,c=0;c<a.length;c++)null!=a[c].bars.order&&a[c].bars.show&&b.push(a[c]);return b.sort(n)}function n(a,b){var c=a.bars.order,d=b.bars.order;return d>c?-1:c>d?1:0}function o(a){d=a.bars.lineWidth?a.bars.lineWidth:2,e=d*f}function p(a){a.bars.horizontal&&(g=!0)}function q(a){for(var c=0,d=0;d<b.length;++d)if(a==b[d]){c=d;break}return c+1}function r(){var a=0;return 0!=c%2&&(a=b[Math.ceil(c/2)].bars.barWidth/2),a}function s(a){return a<=Math.ceil(c/2)}function t(a,b,c){for(var d=0,f=b;c>=f;f++)d+=a[f].bars.barWidth+2*e;return d}function u(a,b,c){for(var d=a.pointsize,e=a.points,f=0,h=g?1:0;h<e.length;h+=d)e[h]+=c,b.data[f][3]=e[h],f++;return e}var b,c,d,e,f=1,g=!1;a.hooks.processDatapoints.push(h)}var c={series:{bars:{order:null}}};a.plot.plugins.push({init:b,options:c,name:"orderBars",version:"0.2"})}(jQuery);