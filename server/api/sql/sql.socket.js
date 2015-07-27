/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Sql = require('./sql.model');

exports.register = function(socket) {
  Sql.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Sql.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('sql:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('sql:remove', doc);
}