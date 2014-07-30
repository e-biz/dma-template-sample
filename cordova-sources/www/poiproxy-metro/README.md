POIProxy-Metro
==============

A multi-platform tiles viewer of Points of Interest with photo from POIProxy

##How to build a development workspace of POIProxy-Metro (Work in progress)

***Pre-requisites***

* NodeJS
* NPM

***Clone this repo***

`git clone https://github.com/Prodevelop/POIProxy-Metro.git`

***Execute this on the root folder***

`npm install`
`bower install`

## Important

bower_dependencies/geolib/dist/geolib.js must be modified!

at the end of the file replace last if with:

```shell
// Node module
	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {

		global.geolib = module.exports = geolib;

	// AMD module
	} 
	// else if (typeof define === "function" && define.amd) {

	// 	define("geolib", [], function () {
	// 		return geolib; 
	// 	});

	// // we're in a browser
	// } 
	else {

		global.geolib = geolib;

	}
´´´
