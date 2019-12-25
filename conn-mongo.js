const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/calendar', {
  ensureIndex: true,
  useNewUrlParser: true
})
mongoose.connection.once('open', function() {
  console.log('数据库链接成功')
})
