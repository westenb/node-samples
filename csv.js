/*
  Parses CSV files in the local directory in the format used for daily weather data 
  by the "Deutscher Wetterdienst" (www.dwd.de)
  
  The output is one combined CSV file with some simple mappings and validations performed.
  
  Used techniques:
   - File system interaction
   - CSV stream parsing (pipe and filter approach)
   - Async processing
  
  (c) EW, 2014
*/

var csv = require('csv')
  , fs = require('fs')
  , path = require('path')
  , moment = require('moment')
  , async = require('async');

var prefix = 'produkt_klima_Tageswerte';
var outdir = path.join( __dirname , 'output');
var outfile = path.join( outdir, 'outweather.csv' );
var indir   = path.join( __dirname , 'input' );

function parse(file, cb) {
  console.log('Processing file ' + file);
 
  csv()
    .from.stream(fs.createReadStream(path.join( indir , file )))
    .to.path(outfile, {'flags': 'a'})
    .transform( function(row){
      var date = moment(row[1], "YYYYMMDD");
  
      if ( date.isValid() && row[0] ) {
        return [ row[0].trim(),
                 date.format("YYYY-MM-DD"),
                 (row[6] && row[6] != -999 ? row[6].trim() : 0),
                 (row[8] && row[8] != -999 ? row[8].trim() : 0 ) 
               ];
      }
    })
  .on('end', function(count){
    console.log('Completed processing ' + file + '; Number of records: ' + count);
	cb();
  })
}

console.time('Total time');

// Clear target file
fs.mkdir(outdir);
fs.writeFileSync(outfile, '');

// Detect files in source directory matching to file pattern
var files = fs.readdirSync(indir).filter( function(file) {
    return file.substr(0,prefix.length) == prefix; 
});

// Async processing in series
async.eachSeries(files, parse, function(err){
   if (err) {
	 console.log('Error: ' + err);
   } else {
	 console.log('Successfully processed: ' + files.length + ' files.');
	 console.timeEnd('Total time');
   }
});


