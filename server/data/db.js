let LessonsData = require('./LessonsData')
let UsersData = require('./UsersData')
let Session = require("./session");
class InMemoryDb {
  userCounter = 4

  getLessons() {
    return LessonsData
  }

  createUser(email, passwordDigest){
    const id = this.userCounter++;

    // TODO: control if email alredy registred

    const user = {
      id,
      email,
      passwordDigest
    }

    UsersData.push(user)

    return user
  }

  getUsers(){
    return UsersData
  }

  findUserByEmail(email) {
    return UsersData.find(user => user.email === email)
  }
}

class SessionStore {
  sessions = {}

  createSession(sessionId, user){
    this.sessions[sessionId] = new Session(sessionId, user)
  }

  findUserBySessionId(sessionId){
    const session = this.sessions[sessionId]

    return this.isSessionValid(sessionId) ? session.user : undefined
  }

  isSessionValid(sessionId) {
    const session = this.sessions[sessionId]

    return session && session.isValid()
  }

  destroySession(sessionId) {
    delete this.sessions[sessionId]
  }
}

const db = new InMemoryDb()
const sessionStore = new SessionStore()

module.exports = {db, sessionStore}

