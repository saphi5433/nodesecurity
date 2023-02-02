let express = require('express');
const {sessionStore} = require("../data/db");
let router = express.Router()


router.get('/', (req, res) => {
  const sessionId = req.cookies['SESSIONID']

  const user = sessionStore.findUserBySessionId(sessionId)

  if(user){
    res.status(200).json(user)
  } else {
    res.sendStatus(204)
  }
})

module.exports = router
