'use strict';

var express = require('express');
//var controller = require('./sql.controller');
var sql = require('mssql');


exports.propel = function() { 
	var pConfig = { 
	driver: 'msnodesql',
	// user: 'AMR\\jransom', 
	server: 'VMSDDDSE001',
	database: 'PROPEL',
	// password: '***', /// Not necessary with windows auth (trusted Connection)
	pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }, 
	options: {
		trustedConnection: 'Yes', 
		useUTC: 'true'
	}
};
	sql.connect(pConfig, function(err) {
		if (err) {
			console.log("Connection ERROR");
			console.log(err); 
		}
	var secondRequest = new sql.Request(); 
	secondRequest.execute('usp_GetNPIData', function(err, recordsets, returnValue) {
		if(err) {
			console.log(err);
		}
		console.log("SP data set: ")
		console.dir(recordsets[0]);
	});
	}); 
}
exports.queries = function(){
	var config = { 
	driver: 'msnodesql',
	// user: 'AMR\\jransom', 
	server: 'localhost',
	database: 'BossIBR',
	// password: '***', /// Not necessary with windows auth (trusted Connection)
	pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }, 
	options: {
		trustedConnection: 'Yes', 
		useUTC: 'true', 
		instanceName: 'JOSHSQL'
	}
};
	console.log("function Reached");
	
	
	
	//var connection = new sql.Connection(config); 
	sql.connect(config, function(err) {
		if (err) {
			console.log("Connection ERROR");
			console.log(err); 
		}
	
	
	var request = new sql.Request(); 
	
	request.query('select * from Versions', function(err, recordset) {
		if(err) {
			console.log("QUERY ERROR");
			console.log(err); 
			return;
			
		}
		console.log("Simple Data Set: ");
		console.log(recordset);
		return; 
	});
	var secondRequest = new sql.Request(); 
	secondRequest.execute('UspFetchVersions', function(err, recordsets, returnValue) {
		if(err) {
			console.log(err);
		}
		console.log("SP data set: ")
		console.dir(recordsets);
	});
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