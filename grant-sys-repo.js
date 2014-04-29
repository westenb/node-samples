/*
  Give technical _SYS_REPO user in SAP HANA appropriate priviledges on a set of user schemas
  
  Background: upon activation of certain objects (e.g. column views) in SAP HANA, the _SYS_REPO user requires
  SELECT privileges (with grant option) to the involved catalog objects. In the standard case of tables in
  a DB user schema, this user needs to grant the rights to _SYS_REPO. In order to automize this for a set of
  users, this node programm reads a configuration file with host, port and set of users + passwords from a JSON
  file and uses the HANA DB driver for node.js for executing the DCL statements.

  (c) EW, 2014
*/
var hdb    = require('hdb')
  , async  = require('async')
  , fs   = require('fs')
  , path = require('path')
  , filename = path.join(__dirname, 'input', 'config_sys_repo')
  , options  = JSON.parse(fs.readFileSync(filename));
  
var errorCount = 0;

function process(user, cb) {
	var client = null;

	function connect(cb) {
	  client.connect(cb);
	  console.log('connect');
	}
	
	function execute(cb) {
	  var sql = 'GRANT SELECT ON SCHEMA ' + user.name + ' TO _SYS_REPO WITH GRANT OPTION';
	  console.log(sql);
	  client.exec( sql, cb);
	  console.log('execute');
	}
	
	function disconnect(cb) {
	  client.end(cb);
	  console.log('disconnect');
	}

	client = hdb.createClient( {
		host: options.host,
		port: options.port,
		user: user.name,
		password: user.password
	});
	
	async.series([ connect, execute, disconnect ], function(err) {
		if (err) {
         console.error('Error:', err);
		 errorCount++;
       } else {
	     console.log('Successfully processed user ' + user.name );
	   }
	   cb(null);
	});
}  

  
async.eachSeries( options.users, process, function (err) {
	if (err) {
		console.log('Error:', err);
	} else if (errorCount > 0 ) {
		console.log('Successfully granted priviledges to  ' + ( options.users.length - errorCount) + ' out of ' + options.users.length + 'users');
	} else {
		console.log('Successfully granted priviledges to  ' + options.users.length + ' users');
	}
	//process.exit();
});
