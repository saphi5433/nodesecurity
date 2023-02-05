let LessonsData = require('./LessonsData')
let UsersData = require('./UsersData')
const {toNumbers} = require("@angular/compiler-cli/src/version_helpers");

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

  findUserById(id) {
    return UsersData.find(user => user.id === toNumbers(id));
  }
}



const db = new InMemoryDb()


module.exports = {db}

