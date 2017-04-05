# node-samples

A few simple samples using specific aspects and modules of node.js
Focus is in particular on learnign async programming, streams and interaction with a database (SAP HANA specfically).

 * In order to fetch the dependencies, run npm install

## Asynchronous programming

Some experiments with async programming (series, parallel, waterfall) based on the *async* module (see https://github.com/caolan/async)

* Example can invoked via node async-xyz.js (async-series.js, async-parallel.js, async-waterfall.js)

## Processing CSV files

Reads a set of CSV files from a source directory and process them in an asynchronous series.
Processing of the files is done via the *csv* module in a streamed way applying some simple data transformations.
The output is again a CSV file.

* Example can invoked via node csv.js

## Working with Geo-Spatial data

Experimenting with GIS formats like GeoJSON and WKT (well-known-text) using the *terraformer-wkt-parser* module. See https://github.com/Esri/Terraformer.

* Example can invoked via node geojson.js

## Testing with Mocha

Some samples for using unit BDD testing with *mocha* (http://mochajs.org/) in mocha-tests.js

 * Example can invoked via npm test (or grunt test)
 * Requires that grunt-cli is installed (run 'npm install -g grunt.cli')

## Working with SAP HANA (in progress)

Using advanced capabilities of the SAP HANA DB driver for node.js (https://github.com/SAP/node-hdb)

In particular:
 - efficient bulk loading in combination with streaming)
 - examples include streaming weather data / geo informations from source file(s) to SAP HANA


