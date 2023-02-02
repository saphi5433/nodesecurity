const util = require('util')
const crypto = require('node:crypto')

const randomBytes = util.promisify(crypto.randomBytes)

module.exports = {randomBytes}
