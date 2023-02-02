var express = require('express');
var router = express.Router();
const argon2 = require("argon2");
const validatePassword = require("../data/password-validation");
const {randomBytes} = require("../data/security.utils");
const {db, sessionStore} = require("../data/db");

/* GET home page. */
router.post('/register', function(req, res, next) {
  const credentials = req.body;

  const passwordErrors = validatePassword(credentials.password)

  if(passwordErrors.length > 0){
    res.status(400).json({passwordErrors})
    return
  }

  createUserAndSession(res, credentials)
});

router.post('/login', function(req, res, next) {
  const credentials = req.body;

  const user = db.findUserByEmail(credentials.email)



  if(!user){
    res.sendStatus(403)
  } else {

    loginAndBuildReponse(res, credentials, user)

  }
});

router.post('/logout', function(req, res, next) {
  const sessionId = req.cookies["SESSIONID"]

  sessionStore.destroySession(sessionId)

  res.clearCookie("SESSIONID")

  res.json("session cookie deleted").sendStatus(200)
});










async function attempLogin(credentials, user)  {
  const isPasswordValid = await argon2.verify(user.passwordDigest, credentials.password)

  if(!isPasswordValid){
    throw new Error("Password Invalid")
  }

  const sessionId = await randomBytes(32).then(bytes => bytes.toString('hex'))

  sessionStore.createSession(sessionId, user)

  return sessionId

}

async function loginAndBuildReponse(res, credentials, user){
  try {
    const sessionId = await attempLogin(credentials, user)

    res.cookie("SESSIONID", sessionId, {httpOnly: true, secure: true})
    res.status(200).json({id: user.id, email: user.email})

  } catch(err){res.sendStatus(403)}
}


async function createUserAndSession(res, credentials){
  const passwordDigest = await argon2.hash(credentials.password)

  const user = db.createUser(credentials.email, passwordDigest)

  console.log(db.getUsers())

  const sessionId = await randomBytes(32).then(bytes => bytes.toString('hex'))

  sessionStore.createSession(sessionId, user)

  res.cookie("SESSIONID", sessionId, { httpOnly: true , secure: true})

  res.status(200).json({id: user.id, email: user.email})
}

module.exports = router;
