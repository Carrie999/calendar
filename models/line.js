const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({ lines: String ,character: String ,title: String,japanese:String,pic:String});
const Calendar = mongoose.model('lines',schema);

module.exports = Calendar