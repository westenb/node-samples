/*
  Converting GPX files to GeoJSON using the togeojson module
 
  (c) EW, 2014
*/
var program = require('commander'),
    tj = require('togeojson'),
    fs = require('fs'),
	DOMParser = require('xmldom').DOMParser;

program
  .version('0.1')
  .option('-i, --input [file]', 'Input GPX file')
  .option('-o, --output [file]', 'Output GeoJSON file (optional)')
  .parse(process.argv);

if (program.input) {
  console.log('Converting GPX file ' + program.input + ' to GeoJSON ...');
  console.time('Conversion Time');
  var gpxText = fs.readFileSync(program.input, 'utf8');
  var gpxDom = new DOMParser().parseFromString(gpxText);
  
  var converted = JSON.stringify(tj.gpx(gpxDom));
  if (program.output) {
	fs.writeFileSync(program.output, converted);
  } else {
    console.log('No output file specified. Plotting resulting GeoJSON to console');
	console.log(converted);
  }
  console.log('Done!');
  console.timeEnd('Conversion Time');
} else {
  console.log('No input file specified! Use --help for usage help.');	
}

