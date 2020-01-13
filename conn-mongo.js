const { mongodbUrl } = require('./env')
const mongoose = require('mongoose')
mongoose.connect(`mongodb://${mongodbUrl}:27017/calendar`, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true
})
mongoose.connection.once('open', function() {
  console.log('数据库链接成功')
})
