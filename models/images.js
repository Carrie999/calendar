const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  md5: { type: String, required: true },
  files: { type: Object, required: true },
  filePath: { type: String, required: true }
})
const Images = mongoose.model('images', schema)

module.exports = Images
