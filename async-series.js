/*
  Async programming with series processing
  
  Series processing allows to process async tasks in sequence
  
  Pitfalls:
   - Always ensure that callback is invoked
   
   See https://github.com/caolan/async#series
 
  (c) EW, 2014
*/
var async = require('async');

var cnt = 0;

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
for (var i=0; i<5; i++) {
   tasks.push( function(callback) {
		console.log('Start ' + cnt);
        logWithDelay('Finish ' + cnt, callback);
   });
}

async.series(tasks, final);
