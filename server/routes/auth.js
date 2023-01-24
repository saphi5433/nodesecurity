var express = require('express');
var router = express.Router();
let db = require('../data/db')
const argon2 = require("argon2");
const validatePassword = require("../data/password-validation");

/* GET home page. */
router.post('/register', function(req, res, next) {
  const credentials = req.body;

  const passwordErrors = validatePassword(credentials.password)

  if(passwordErrors.length > 0){
    res.status(400).json({passwordErrors})
    return
  }

  argon2.hash(credentials.password)
    .then(passwordDigest => {
      const user = db.createUser(credentials.email, passwordDigest)

      console.log(db.getUsers())

      res.status(200).json({id: user.id, email: user.email})
    })




});

module.exports = router;
