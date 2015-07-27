'use strict';

var _ = require('lodash');
var Sql = require('./sql.model');

// Get list of sqls
exports.index = function(req, res) {
  Sql.find(function (err, sqls) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(sqls);
  });
};

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