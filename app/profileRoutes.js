var express = require('express');
// var mongoose = require('mongoose');
var multer = require('multer');
var path = require('path');
var functions = require('../functions');

var router = express.Router();

router.get('/', functions.check, function(req, res) {

    res.send(functions.hello() + ' - Profile');

});

module.exports = router;