# node-samples

A few simple samples using specific aspects and modules of node.js

In order to fetch the dependencies, run npm install

## async-series.js, async-parallel.js, async-waterfall.js

Some experiments with async programming (series, parallel, waterfall)

* Example can invoked via node async-xyz.js

## csv.js

Reads a set of CSV files from a source directory and process them in an asynchronous series.
Processing of the files is done via the csv module in a streamed way applying some simple data transformations.
The output is again a CSV file.

* Example can invoked via node csv.js

## unittest.js

Some samples for using unit tests via selenium and vows

Example can invoked via node test

## node-hdb (in progress)

Using advanced capabilities of the SAP HANA DB driver for node.js

## Geo (in progress)

Experimenting with GIS formats like GeoJSON and WKT (also in combination with the HDB driver)