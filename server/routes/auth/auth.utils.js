const argon2 = require("argon2");
const {createSessionToken} = require("../../data/security.utils");
const {db} = require("../../data/db");

async function attempLogin(credentials, user)  {
  // verifica che la password corrisponde
  const isPasswordValid = await argon2.verify(user.passwordDigest, credentials.password)


  if(!isPasswordValid){
    throw new Error("Password Invalid")
  }

  return createSessionToken(user.id.toString())

}

async function loginAndBuildResponse(res, credentials, user){
  try {
    // controlla se la password è corretta e genera il jwt
    const sessionToken = await attempLogin(credentials, user)

    setSessionToken(res, sessionToken)
    res.status(200).json({id: user.id, email: user.email})

  } catch(err){res.sendStatus(403)}
}


async function createUserAndSession(res, credentials){
  // crea il digest della password
  const passwordDigest = await argon2.hash(credentials.password)

  // salva l'utente nel db
  const user = db.createUser(credentials.email, passwordDigest)

  console.log(db.getUsers())

  // crea il jwt
  const sessionToken = await createSessionToken(user.id.toString())

  setSessionToken(res, sessionToken)

  res.status(200).json({id: user.id, email: user.email})
}

function setSessionToken (res, sessionToken){
  res.cookie("SESSIONID", sessionToken, { httpOnly: true , secure: true, sameSite: "strict"})
}

module.exports = {createUserAndSession, loginAndBuildResponse}
