'use strict';

var _ = require('lodash');
var Sql = require('./sql.model');
var mssql = require('mssql');
var config = require('./build/sqlConfig.json'); // Config file will not be included in repository
// Config Spec (for Windows Auth): 
//  { 
// 	"driver": "msnodesql",
	
// 	"server": "SERVER_NAME",
// 	"database": "DB_NAME",
// 	"pool": {
//         "max": 20,
//         "min": 0,
//         "idleTimeoutMillis": 30000
//     }, 
// 	"options": {
// 		"trustedConnection": "Yes", 
// 		"useUTC": "true"
// 	}
// }

// Get list of sqls
exports.index = function(req, res) {
	mssql.connect(config, function(err) {
		if (err) console.log(err); 
	var request = new mssql.Request(); 
	request.execute('usp_GetNPIData', function(err, recordsets, returnValue) {
		if(err) console.log(err);
    else {
      return res.json(200, recordsets)
    }
	});
	}); 
}; 

// TODO-maybe Add streaming for large datasets. 
// exports.index = function(req, res) {
// 	mssql.connect(config, function(err) {
// 		if (err) console.log(err); 
// 	var request = new mssql.Request(); 
// 	request.execute('usp_GetNPIData'); 
		
//     request.on('error', function(err) {
//       console.log(err); 
//     }); 
    
//     request.on('recordset', function(columns) {
//       return res.json(201, columns); 
//     });
    
//     request.on('row', function(row) {
//       return res.json(200, row);
//     })
    
//     request.on('done', function(returnValue) {
//       return res.json(203, returnValue);
//     })

// 	}); 
// }; 


// Get a single sql
exports.show = function(req, res) {
  Sql.findById(req.params.id, function (err, sql) {
    if(err) { return handleError(res, err); }
    if(!sql) { return res.status(404).send('Not Found'); }
    return res.json(sql);
  });
};

// Creates a new sql in the DB.
exports.create = function(req, res) {
  Sql.create(req.body, function(err, sql) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(sql);
  });
};

// Updates an existing sql in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Sql.findById(req.params.id, function (err, sql) {
    if (err) { return handleError(res, err); }
    if(!sql) { return res.status(404).send('Not Found'); }
    var updated = _.merge(sql, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(sql);
    });
  });
};

// Deletes a sql from the DB.
exports.destroy = function(req, res) {
  Sql.findById(req.params.id, function (err, sql) {
    if(err) { return handleError(res, err); }
    if(!sql) { return res.status(404).send('Not Found'); }
    sql.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}