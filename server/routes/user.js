let express = require('express');
const {db} = require("../data/db");
let router = express.Router()


router.get('/', (req, res) => {
  const user = db.findUserById(req["userId"])
  if(user){
    res.status(200).json({id: user.id, email: user.email})
  } else {
    res.sendStatus(204)
  }
})

module.exports = router
