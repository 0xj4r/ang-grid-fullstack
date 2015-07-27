'use strict';

var express = require('express');
//var controller = require('./sql.controller');
var sql = require('mssql');






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
	user: 'AMR\jransom', 
	password: 'Mordillo??1446', 
	server: 'JOSHSQL', 
	database: 'BossIBR', 
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