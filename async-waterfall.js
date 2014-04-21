/*
  Async programming with a waterfall
  
  Waterfall allows to pass results of one async call automatically to the next call
  
  Pitfalls:
   - Always ensure that callback is invoked
   - Order is callback(err, results)
   
   See https://github.com/caolan/async#waterfall
 
  (c) EW, 2014
*/
var async = require('async');

function init(cb) {
  console.log('Init');
  cb(null, 0);
}

function logWithDelay(i, cb) {
  console.log('logWithDelay: ' + i);
  setTimeout( function() { console.log(i); cb(null, ++i); }, 500);
}

// final  callback
function final (err, results) {
    console.log('Finish');
};

// Create array of tasks
var tasks = [ init ];
for (var i=0; i<5; i++) {
   tasks.push( logWithDelay );
}

async.waterfall(tasks, final);
