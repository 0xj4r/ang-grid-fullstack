'use strict';

var _ = require('lodash');
var Sql = require('./sql.model');
var mssql = require('mssql');
var config = require('./config.json'); // Config file will not be included in repository
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


// Create Table param


exports.index = function (req, res) {
 var connection = new mssql.Connection(config);
 connection.connect().then(function() {
   var request = new mssql.Request(connection);
   request.execute('usp_GetNPIDataDemo', function (err, recordsets, returnValue) {
      if (err) handleError(res, err);
        return res.json(200, recordsets)
    });
    connection.close(); 
 }).catch(function(err) {
   connection.close(); 
   console.log(err);
   handleError(res, err);  
 }); 
}; 

// Updates an existing sql in the DB.
exports.update = function (req, res) {
  
  console.log("Updating");
  if (req.body._id) { delete req.body._id; }
  // Create Tables for paramater
  var deleteRows = new mssql.Table();
  deleteRows.columns.add('Id', mssql.Int, {nullable: false});
  var tvp = new mssql.Table();
  	tvp.columns.add('NpiID', mssql.Int, {nullable: false});
	tvp.columns.add('NpiFabID', mssql.Int, {nullable: true});
	tvp.columns.add('NPIGroupID', mssql.Int, {nullable: true});
	tvp.columns.add('ProductStatusID', mssql.Int, {nullable: true});
	tvp.columns.add('RawEstDpw', mssql.Int, {nullable: true});
	tvp.columns.add('DieNameID', mssql.Int, {nullable: false});
	tvp.columns.add('Stepping', mssql.Char(1), {nullable: true});
	tvp.columns.add('Revision', mssql.Int, {nullable: true});
	tvp.columns.add('ItoSiteID', mssql.Int, {nullable: true});
	tvp.columns.add('Seats', mssql.Int, {nullable: true});
	tvp.columns.add('TapeOutOwnerWWID', mssql.Int, {nullable: true});
	tvp.columns.add('SramCpuHours', mssql.Int, {nullable: true});
	tvp.columns.add('SramDieSize', mssql.Int, {nullable: true});
	tvp.columns.add('EVariable', mssql.Decimal(6, 3), {nullable: true});
	tvp.columns.add('AreaOfDatabase', mssql.VarChar(100), {nullable: true});
	tvp.columns.add('DiskSpaceForecast', mssql.Int, {nullable: true});
	tvp.columns.add('DiskSpaceActual', mssql.Int, {nullable: true});
	tvp.columns.add('DistComputeActualFE', mssql.Int, {nullable: true});
	tvp.columns.add('DistComputeActualBE', mssql.Int, {nullable: true});
	tvp.columns.add('SecondTapeOutOwnerWWID', mssql.Int, {nullable: true});
	tvp.columns.add('TrendTapeOut', mssql.Date, {nullable: true});
	tvp.columns.add('TrendTapeOutOverride', mssql.Date, {nullable: true});
	tvp.columns.add('ImoQueueTime', mssql.Int, {nullable: true});
	tvp.columns.add('ImoStartDate', mssql.Date, {nullable: true});
	tvp.columns.add('C4SiteID', mssql.Int, {nullable: true});
	tvp.columns.add('FabID', mssql.Int, {nullable: true});
	tvp.columns.add('NpiTypeID', mssql.Int, {nullable: true});
	tvp.columns.add('FabStartDate', mssql.Date, {nullable: true});
	tvp.columns.add('FabStartDateOverride', mssql.Date, {nullable: true});
	tvp.columns.add('ReticleReorder', mssql.Bit, {nullable: true});
	tvp.columns.add('FabComplexityID', mssql.Int, {nullable: true});
	tvp.columns.add('FabNppWWID', mssql.Int, {nullable: true});
	tvp.columns.add('FabPeWWID', mssql.Int, {nullable: true});
	tvp.columns.add('FabComment', mssql.VarChar(300), {nullable: true});
	tvp.columns.add('SortSiteID', mssql.Int, {nullable: true});
	tvp.columns.add('SortSiuNeedDate', mssql.Date, {nullable: true});
	tvp.columns.add('SortStartDate', mssql.Date, {nullable: true});
	tvp.columns.add('SortStartDateOverride', mssql.Date, {nullable: true});
	tvp.columns.add('SortNppWWID', mssql.Int, {nullable: true});
	tvp.columns.add('SortPeWWID', mssql.Int, {nullable: true});
	tvp.columns.add('SiuName', mssql.VarChar(50), {nullable: true});
	tvp.columns.add('DivisionSiuWWID', mssql.Int, {nullable: true});
	tvp.columns.add('SortPlatform', mssql.VarChar(50), {nullable: true});
	tvp.columns.add('SortComment', mssql.VarChar(300), {nullable: true});
	tvp.columns.add('CdpSiteID', mssql.Int, {nullable: true});
	tvp.columns.add('CdpStartDate', mssql.Date, {nullable: true});
	tvp.columns.add('CdpStartDateOverride', mssql.Date, {nullable: true});
	tvp.columns.add('CdpNppWWID', mssql.Int, {nullable: true});
	tvp.columns.add('CdpComment', mssql.VarChar(300), {nullable: true}); 
  
  
  console.log(tvp.columns);
  
   //Load rows into table 
     console.log(req.body.rows) ;
    
    console.log("add rows");
    req.body.rows.forEach(function(row) {
		console.log(row.CdpStartDate);
		
		
    tvp.rows.add(
  	row.NpiID,
	row.NpiFabID,
	row.NpiGroupID,
	row.ProductStatusID,
	row.RawEstDpw,
	row.DieNameID,
	row.Stepping,
	row.Revision,
	null,
	row.Seats,
	null,
	row.SramCpuHours,
	row.SramDieSize,
	row.EVariable,
	row.AreaOfDatabase,
	row.DiskSpaceForecast,
	row.DiskSpaceActual,
	row.DistComputeActualFE,
	row.DistComputeActualBE,
	null,
	formatDate(row.TrendTapeOut),
	formatDate(row.TrendTapeOutOverride),
	row.ImoQueueTime,
	formatDate(row.ImoStartDate),
	row.C4SiteID,
	row.FabID,
	row.NpiTypeID,
	formatDate(row.FabStartDate),
	formatDate(row.FabStartDateOverride),
	row.ReticleReorder,
	row.FabComplexityID,
	row.FabNppWWID,
	row.FabPeWWID,
	row.FabComment,
	row.SortSiteID,
	formatDate(row.SortSiuNeedDate),
	formatDate(row.SortStartDate),
	row.SortStartDateOverride,
	row.SortNppWWID,
	row.SortPeWWID,
	row.SiuName,
	row.DivisionSiuWWID,
	row.SortPlatform,
	row.SortComment,
	row.CdpSiteID,
	formatDate(row.CdpStartDate),
	formatDate(row.CdpStartDateOverride),
	row.CdpNppWWID,
	row.CdpComment
    );                              
}); 
console.log(tvp.rows);

  console.log("config");
  var conn = new mssql.Connection(config); 
  conn.connect().then(function() {
    var request = new mssql.Request(conn); 
    
  // })
  // mssql.connect(config, function (err) {
  //   if (err) console.log(err);
  //   var request = new mssql.Request(); 
  
   
    
    // console.log(tvp.rows) ;
    // tvp.rows = addTableRows(req.body.rows); 
    // console.log(tvp.rows);
    // Insert table as param
    request.input('wwid', 11525873 );
    request.input('update', tvp);
    request.input('delete', deleteRows);
    //   request.input('two/, ', tvp); 
    console.log("execute");
    // Call update on rows
    request.execute('usp_SaveNpiMaster', function (err, recordsets, returnValue) {
      if (err) {
        console.log("err");
        console.log(err);
        console.dir(err);
        return res.json(400, err);
      }
      else {
        console.log("succ");
          
        console.log(returnValue);
		console.log(recordsets);
        return res.json(200, "successfully saved"); 
      }
    });
    conn.close(); 
  }).catch(function(err) {
    conn.close(); 
    console.log(err); 
    handleError(res, err); 
  });
};

function formatDate(date) { 
	if(date)  {
		return new Date(date); 
	}
	return null; 
}; 


// Updates an existing sql in the DB.
exports.update2 = function (req, res) {
  
  console.log("Updating");
  if (req.body._id) { delete req.body._id; }
  // Create Tables for paramater
  var deleteRows = new mssql.Table();
  deleteRows.columns.add('Id', mssql.Int, {nullable: false});
  var tvp = new mssql.Table();
  tvp.columns.add('NpiID', mssql.Int, {nullable: false});
	tvp.columns.add('NpiFabID', mssql.Int, {nullable: true});
	tvp.columns.add('NPIGroupID', mssql.Int, {nullable: true});
	tvp.columns.add('ProductStatusID', mssql.Int, {nullable: true});
	tvp.columns.add('RawEstDpw', mssql.Int, {nullable: true});
	tvp.columns.add('DieNameID', mssql.Int, {nullable: false});
	tvp.columns.add('Stepping', mssql.Char(1), {nullable: true});
	tvp.columns.add('Revision', mssql.Int, {nullable: true});
	tvp.columns.add('ItoSiteID', mssql.Int, {nullable: true});
	tvp.columns.add('Seats', mssql.Int, {nullable: true});
	tvp.columns.add('TapeOutOwnerWWID', mssql.Int, {nullable: true});
	tvp.columns.add('SramCpuHours', mssql.Int, {nullable: true});
	tvp.columns.add('SramDieSize', mssql.Int, {nullable: true});
	tvp.columns.add('EVariable', mssql.Decimal(6, 3), {nullable: true});
	tvp.columns.add('AreaOfDatabase', mssql.VarChar(100), {nullable: true});
	tvp.columns.add('DiskSpaceForecast', mssql.Int, {nullable: true});
	tvp.columns.add('DiskSpaceActual', mssql.Int, {nullable: true});
	tvp.columns.add('DistComputeActualFE', mssql.Int, {nullable: true});
	tvp.columns.add('DistComputeActualBE', mssql.Int, {nullable: true});
	tvp.columns.add('SecondTapeOutOwnerWWID', mssql.Int, {nullable: true});
	tvp.columns.add('TrendTapeOut', mssql.Date, {nullable: true});
	tvp.columns.add('TrendTapeOutOverride', mssql.Date, {nullable: true});
	tvp.columns.add('ImoQueueTime', mssql.Int, {nullable: true});
	tvp.columns.add('ImoStartDate', mssql.Date, {nullable: true});
	tvp.columns.add('C4SiteID', mssql.Int, {nullable: true});
	tvp.columns.add('FabID', mssql.Int, {nullable: true});
	tvp.columns.add('NpiTypeID', mssql.Int, {nullable: true});
	tvp.columns.add('FabStartDate', mssql.Date, {nullable: true});
	tvp.columns.add('FabStartDateOverride', mssql.Date, {nullable: true});
	tvp.columns.add('ReticleReorder', mssql.Bit, {nullable: true});
	tvp.columns.add('FabComplexityID', mssql.Int, {nullable: true});
	tvp.columns.add('FabNppWWID', mssql.Int, {nullable: true});
	tvp.columns.add('FabPeWWID', mssql.Int, {nullable: true});
	tvp.columns.add('FabComment', mssql.VarChar(300), {nullable: true});
	tvp.columns.add('SortSiteID', mssql.Int, {nullable: true});
	tvp.columns.add('SortSiuNeedDate', mssql.Date, {nullable: true});
	tvp.columns.add('SortStartDate', mssql.Date, {nullable: true});
	tvp.columns.add('SortStartDateOverride', mssql.Date, {nullable: true});
	tvp.columns.add('SortNppWWID', mssql.Int, {nullable: true});
	tvp.columns.add('SortPeWWID', mssql.Int, {nullable: true});
	tvp.columns.add('SiuName', mssql.VarChar(50), {nullable: true});
	tvp.columns.add('DivisionSiuWWID', mssql.Int, {nullable: true});
	tvp.columns.add('SortPlatform', mssql.VarChar(50), {nullable: true});
	tvp.columns.add('SortComment', mssql.VarChar(300), {nullable: true});
	tvp.columns.add('CdpSiteID', mssql.Int, {nullable: true});
	tvp.columns.add('CdpStartDate', mssql.Date, {nullable: true});
	tvp.columns.add('CdpStartDateOverride', mssql.Date, {nullable: true});
	tvp.columns.add('CdpNppWWID', mssql.Int, {nullable: true});
	tvp.columns.add('CdpComment', mssql.VarChar(300), {nullable: true}); 
  
  
  console.log(tvp.columns);
  
   //Load rows into table 
     console.log(req.body.rows) ;
    
    console.log("add rows");
    req.body.rows.forEach(function(row) {
    tvp.rows.add(
  row.NpiID,
	row.NpiFabID,
	row.NpiGroupID,
	row.ProductStatusID,
	row.RawEstDpw,
	row.DieNameID,
	row.Stepping,
	row.Revision,
	null,
	row.Seats,
	null,
	row.SramCpuHours,
	row.SramDieSize,
	row.EVariable,
	row.AreaOfDatabase,
	row.DiskSpaceForecast,
	row.DiskSpaceActual,
	row.DistComputeActualFE,
	row.DistComputeActualBE,
	null,
	row.TrendTapeOut,
	row.TrendTapeOutOverride,
	row.ImoQueueTime,
	row.ImoStartDate,
	row.C4SiteID,
	row.FabID,
	row.NpiTypeID,
	row.FabStartDate,
	row.FabStartDateOverride,
	row.ReticleReorder,
	row.FabComplexityID,
	row.FabNppWWID,
	row.FabPeWWID,
	row.FabComment,
	row.SortSiteID,
	row.SortSiuNeedDate,
	row.SortStartDate,
	row.SortStartDateOverride,
	row.SortNppWWID,
	row.SortPeWWID,
	row.SiuName,
	row.DivisionSiuWWID,
	row.SortPlatform,
	row.SortComment,
	row.CdpSiteID,
	row.CdpStartDate,
	row.CdpStartDateOverride,
	row.CdpNppWWID,
	row.CdpComment
    );                              
}); 
console.log(tvp.rows);

  console.log("config");
  var conn = new mssql.Connection(config); 
  conn.connect().then(function() {
    var ps = new mssql.PreparedStatement(conn); 
    ps.input('update', mssql.TVP('tvp_SaveNpiMaster2')); 
    ps.input('delete', mssql.TVP('tvp_SingleId'));
    ps.input('wwid', mssql.Int); 
    ps.prepare('usp_SaveNpiMaster @wwid, @update, @delete', function(err) {
		if (err) handleError(res, err) ;
    ps.execute({
      wwid: 11525873, 
      update: tvp, 
      delete: deleteRows}, function(err, recordset) {
        if(err) { handleError(res, err); } 
          ps.unprepare(function(err) {
            if (err) handleError(res, err); 
          }); 
      }); 
  }); 
    //conn.close(); 
  }).catch(function(err) {
    conn.close(); 
    console.log(err); 
    handleError(res, err); 
  });
};





// Get a single sql
exports.show = function (req, res) {
  Sql.findById(req.params.id, function (err, sql) {
    if (err) { return handleError(res, err); }
    if (!sql) { return res.status(404).send('Not Found'); }
    return res.json(sql);
  });
};

// Creates a new sql in the DB.
exports.create = function (req, res) {
  Sql.create(req.body, function (err, sql) {
    if (err) { return handleError(res, err); }
    return res.status(201).json(sql);
  });
};



// Deletes a sql from the DB.
exports.destroy = function (req, res) {
  Sql.findById(req.params.id, function (err, sql) {
    if (err) { return handleError(res, err); }
    if (!sql) { return res.status(404).send('Not Found'); }
    sql.remove(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
	  console.log(JSON.stringify(err));
  return res.status(500).send(err);

}



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



function addTableRows(updateRows) {
  return updateRows.map(function (row) {
    return [
      // row.TrendTapeOut,
      // row.TrendTapeOutOverride,
      // row.ImoStartDate,
      // row.FabStartDate,
      // row.SortSiuNeedDate,
      // row.SortStartDate,
      // row.SortStartDateOverride,
      // row.CdpStartDate,
      // row.CdpStartDateOverride,
      // row.NpiID,
      // row.NpiFabID,
      // row.NPIGroupID,
      // row.ProductStatusID,
      // row.RawEstDpw,
      // row.DieNameID,
      // row.Stepping,
      // row.Revision,
      // row.ItoSiteID,
      // row.Seats,
      // row.TapeOutOwnerWWID,
      // row.SramCpuHours,
      // row.SramDieSize,
      // row.EVariable,
      // row.AreaOfDatabase,
      // row.DiskSpaceForecast,
      // row.DiskSpaceActual,
      // row.DistComputeActualFE,
      // row.DistComputeActualBE,
      // row.SecondTapeOutOwnerWWID,
      // row.ImoQueueTime,
      // row.C4SiteID,
      // row.FabID,
      // row.NpiTypeID,
      // row.ReticleReorder,
      // row.FabComplexityID,
      // row.FabNppWWID,
      // row.FabPeWWID,
      // row.FabComment,
      // row.SortSiteID,
      // row.SortNppWWID,
      // row.SortPeWWID,
      // row.SiuName,
      // row.DivisionSiuWWID,
      // row.SortPlatform,
      // row.SortComment,
      // row.CdpSiteID,
      // row.CdpNppWWID,
      // row.CdpComment
      ///
      
    ];
  });
}; 
