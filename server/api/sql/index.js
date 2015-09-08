'use strict';

var express = require('express');
var controller = require('./sql.controller');
var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/save', controller.update);
router.put('/', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;