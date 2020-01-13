let mongodbUrl = 'localhost'
let uploadPath = '/Users/orion/Desktop/images'

if (process.env.NODE_ENV === 'production') {
  mongodbUrl = '10.60.242.105'
  uploadPath = '/data/images'
  console.log('生产环境')
} else {
  console.log('开发环境')
}

exports.mongodbUrl = mongodbUrl
exports.uploadPath = uploadPath
