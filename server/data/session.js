let moment = require('moment')

class Session {
  static VALIDITY_MNUTES = 2;
  validUntil
  sessionId
  user

  constructor (sessionId, user) {
    this.sessionId = sessionId
    this.user = user

    this.validUntil = moment().add(Session.VALIDITY_MNUTES, 'minutes')
  }

  isValid(){
    return moment().diff(this.validUntil, 'minutes') <= 0
  }
}

module.exports = Session
