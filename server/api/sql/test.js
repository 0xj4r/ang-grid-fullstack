'use strict';

var express = require('express');
//var controller = require('./sql.controller');
var sql = require('mssql');


exports.execute = function() {

var conn_str = "Driver={SQL Server Native Client 10.0};Server=(local);Database=BossIBR;Trusted_Connection={Yes}";

sql.open(conn_str, function (err, conn) { 
if (err) { 
    console.log("Database connection failed!"); 
    return; 
    } 
                       
    conn.queryRaw("SELECT * from Versions", function (err, results) { 
    if (err) { 
    console.log("Error running query!"); return; 
    } 
    for (var i = 0; i < results.rows.length; i++) 
        { 
    console.log("Id: " + results.rows[i][0] + " Name: " + results.rows[i][1]); 
        } 
    }); 
}); 
  

}



//  var request = new sql.Request();
//     request.stream = true; // You can set streaming differently for each request 
//     request.query('select * from Versions'); // or request.execute(procedure); 
    

// 	request.on('row', function(row) {
// 		console.log(row); 
// 	})
// });

exports.go = function(){
	console.log("function Reached");
	var config = { 
	driver: 'msnodesql',
	user: 'AMR\jransom', 
	password: '', 
	server: 'localhost',
	instance: 'JOSHSQL', 
	database: 'BossIBR', 
	trusted: 'YES',
	connectionString: "Driver={SQL Server Native Client 11.0};Server={#{server}\\#{instance}};Database={#{database}};Uid={#{user}};Pwd={#{password}};Trusted_Connection={#{trusted}};",
	pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }
}
	
	var connection = new sql.Connection(config); 
	connection.connect(function(err) {
		if (err) {
			console.log(err); 
			
		}
	
	
	var request = new sql.Request(connection); 
	
	request.query('select * from dbo.Versions', function(err, recordset) {
		if(err) {
			console.log(err); 
			
		}
		console.dir(recordset);
	});
	// request.input('VersionId', sql.Int, 35); 
	// request.execute('UspFetchSolveGroupsByVersionId', function(err, recordsets, returnValue) {
	// 	if(err) {
	// 		console.log("error");
	// 		console.log(err);
	// 		return; 
	// 	}
	// 	console.log("return value");
	// 	console.log(returnValue); 
		
	// });
	}); 
}; 



// var router = express.Router();

// router.get('/', controller.index);
// router.get('/:id', controller.show);
// router.post('/', controller.create);
// router.put('/:id', controller.update);
// router.patch('/:id', controller.update);
// router.delete('/:id', controller.destroy);

// module.exports = router;