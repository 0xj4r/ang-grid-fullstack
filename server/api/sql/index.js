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

module.exports = function(){
	var config = { 
	user: 'jransom', 
	password: 'Mordillo??123', 
	server: 'localhost', 
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
	}); 
	
	var request = new sql.Request(); 
	request.input('VersionId', sql.Int, 35); 
	request.execute('UspFetchSolveGroupsByVersionId', function(err, recordsets, returnValue) {
		if(err) {
			console.log(err);
			return; 
		}
		console.log(returnValue); 
		
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