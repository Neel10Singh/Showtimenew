const crypto = require('crypto')

const generateSecret = (length) => {
  return crypto.randomBytes(length).toString('hex')
}

const secret = generateSecret(32) // 32 bytes will give you a 64-character hex string
console.log(secret)
