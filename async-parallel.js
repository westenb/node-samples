/*
  Async programming with parallel processing
  
  Parallel processing allows to process async tasks in parallel
  In order to limit number of parallel executions (e.g. due to limited resources such as DB connections, fs handles, etc.)
  the parallelLimit variant can be used.
  
  Pitfalls:
   - Always ensure that callback is invoked
   
   See https://github.com/caolan/async#parallel
 
  (c) EW, 2014
*/
var async = require('async');

var cnt = 0;
var limit = 3;
var max = 20;

// async task
function logWithDelay(text, callback) {
    cnt ++;
	setTimeout( function() { console.log(text); callback(); }, 500);
}

// final callback
function final (err, results) {
    console.log('Finish');
};

var tasks = [];
for (var i=0; i<max; i++) {
   tasks.push( function(callback) {
		console.log('Start ' + cnt);
        logWithDelay('Finish ' + cnt, callback);
   });
}

if (limit)
	async.parallelLimit(tasks, limit, final);
else
	async.parallel(tasks, final);
