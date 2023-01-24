let LessonsData = require('./LessonsData')
let UsersData = require('./UsersData')
class InMemoryDb {
  userCounter = 4

  getLessons() {
    return LessonsData
  }

  createUser(email, passwordDigest){
    const id = this.userCounter++;

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
}


const db = new InMemoryDb()

module.exports = db

