let {db, sessionStore} = require('../data/db')
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {

  const sessionId = req.cookies["SESSIONID"]

  const isSessionValid = sessionStore.isSessionValid(sessionId)

  if (!isSessionValid) {
    res.sendStatus(403)
  } else {
    res.status(200).json({lessons: db.getLessons()});
  }

});

module.exports = router;
