const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  username: { type: String, unique: true },
  password: {
    type: String,
    set(val) {
      return require('bcrypt').hashSync(val, 10)
    }
  }
})
const User = mongoose.model('users', schema)

module.exports = User
