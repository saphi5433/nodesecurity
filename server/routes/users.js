
let db = require('../data/db')
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(db.getLessons()).status(200);
});

module.exports = router;
