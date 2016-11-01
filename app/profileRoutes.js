const express = require('express');
// const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const functions = require('../functions');

const router = express.Router();

router.get('/', functions.check, (req, res) => {
  res.send('Profile');
});

module.exports = router;
