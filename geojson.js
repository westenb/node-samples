/*
  Working with GIS formats: GeoJSON and WKT (well-known-text)
  
  Data is read from a JSON source file and processed asynchronously
  In particular conversion to WKT is done via the terraformer-wkt-parser module.
  
  Note: WKT can be used to insert data also to SAP HANA Geo-spatial support
  
  See: https://github.com/isellsoap/deutschlandGeoJSON 
 
  (c) EW, 2014
*/

var  async  = require('async')
   , fs  = require('fs')
   , path  = require('path')
   , wkt = require('terraformer-wkt-parser');

   
var infile   = path.join( __dirname , 'input' , '2_hoch.geojson' );   

/*
  Async processing of a GeoJSON feature object
  
  Here only the following results are plotted to console
  - properties of feature
  - first 20 characters in WKT format
*/ 
function processFeature(feature, cb) {
	console.log( [ feature.properties.NAME_1, feature.properties.NAME_2, feature.properties.NAME_3 ].join(','));
	switch ( feature.geometry.type) {
	  case 'Polygon':  console.log ('Polygon with ' + feature.geometry.coordinates[0].length + ' points' ); break;
	  case 'MultiPolygon':  console.log ('Multi Polygon with ' + feature.geometry.coordinates[0].length + ' polygons' ); break;
	};
	
	console.log(wkt.convert(feature.geometry).substring(0,20));
	cb();
}

console.time('Completed');
var geoJSON = {}; 
try {
  geoJSON = JSON.parse( fs.readFileSync( infile ) );
} catch (e) {
  console.log('Cannot parse JSON file: ' + e);
  process.exit(1);
}

if ( geoJSON.type == 'FeatureCollection' ) {
  async.eachSeries( geoJSON.features, processFeature, function finish( err ) {
	if ( err ) return console.log(err);
	
	console.log('Completed processing file.');
	console.timeEnd('Completed');
  });
} else {
	console.log('Cannot process type: ' + geoJSON.type );
	process.exit(1);
}