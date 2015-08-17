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

// Updates an existing sql in the DB.
exports.update = function (req, res) {
  if (req.body._id) { delete req.body._id; }
  mssql.connect(config, function (err) {
    if (err) console.log(err);
    var request = new mssql.Request(); 
    // Create Table param
    var tvp = new Sql.Table();
    tvp.columns.add('TrendTapeOut', Sql.DateTime);
    tvp.columns.add('TrendTapeOutOverride', Sql.DateTime);
    tvp.columns.add('ImoStartDate', Sql.DateTime);
    tvp.columns.add('FabStartDate', Sql.DateTime);
    tvp.columns.add('SortSiuNeedDate', Sql.DateTime);
    tvp.columns.add('SortStartDate', Sql.DateTime);
    tvp.columns.add('SortStartDateOverride', Sql.DateTime);
    tvp.columns.add('CdpStartDate', Sql.DateTime);
    tvp.columns.add('CdpStartDateOverride', Sql.DateTime);
    tvp.columns.add('NpiID', Sql.Int);
    tvp.columns.add('NpiFabID', Sql.Int);
    tvp.columns.add('NPIGroupID', Sql.Int);
    tvp.columns.add('ProductStatusID', Sql.Int);
    tvp.columns.add('RawEstDpw', Sql.Int);
    tvp.columns.add('DieNameID', Sql.Int);
    tvp.columns.add('Stepping', Sql.NVarChar);
    tvp.columns.add('Revision', Sql.Int);
    tvp.columns.add('ItoSiteID', Sql.Int); // RM JOSH
    tvp.columns.add('Seats', Sql.Int);
    tvp.columns.add('TapeOutOwnerWWID', Sql.Int); // RM Josh
    tvp.columns.add('SramCpuHours', Sql.Int);
    tvp.columns.add('SramDieSize', Sql.Int);
    tvp.columns.add('EVariable', Sql.Decimal);
    tvp.columns.add('AreaOfDatabase', Sql.NVarChar);
    tvp.columns.add('DiskSpaceForecast', Sql.Int);
    tvp.columns.add('DiskSpaceActual', Sql.Int);
    tvp.columns.add('DistComputeActualFE', Sql.Int);
    tvp.columns.add('DistComputeActualBE', Sql.Int);
    tvp.columns.add('SecondTapeOutOwnerWWID', Sql.Int); // RM JOSH
    tvp.columns.add('ImoQueueTime', Sql.Int);
    tvp.columns.add('C4SiteID', Sql.Int);
    tvp.columns.add('FabID', Sql.Int);
    tvp.columns.add('NpiTypeID', Sql.Int);
    tvp.columns.add('ReticleReorder', Sql.Bit);
    tvp.columns.add('FabComplexityID', Sql.Int);
    tvp.columns.add('FabNppWWID', Sql.Int);
    tvp.columns.add('FabPeWWID', Sql.Int);
    tvp.columns.add('FabComment', Sql.NVarChar);
    tvp.columns.add('SortSiteID', Sql.Int);
    tvp.columns.add('SortNppWWID', Sql.Int);
    tvp.columns.add('SortPeWWID', Sql.Int);
    tvp.columns.add('SiuName', Sql.NVarChar);
    tvp.columns.add('DivisionSiuWWID', Sql.Int);
    tvp.columns.add('SortPlatform', Sql.NVarChar);
    tvp.columns.add('SortComment', Sql.NVarChar);
    tvp.columns.add('CdpSiteID', Sql.Int);
    tvp.columns.add('CdpNppWWID', Sql.Int);
    tvp.columns.add('CdpComment', Sql.NVarChar)

    req.rows.forEach(function (row) {
      tvp.rows.add(
        row.TrendTapeOut,
        row.TrendTapeOutOverride
        );

    }); 
    // Load rows into table 
  
    // Insert table as param
    request.input('tvp', tvp);
    request.input('two/, ', tvp); 
  
    // Call update on rows
    request.execute('usp_SaveNpiMaster', function (err, recordsets, returnValue) {
      if (err) console.log(err);
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