const jwt = require('jsonwebtoken')
const User = require('./models/user.js')
const SECRET = 'comics'

const auth = async (ctx, next) => {
  let raw = String(ctx.request.headers['authorization'])
    .split(' ')
    .pop()
  const tokenData = jwt.verify(raw, SECRET)
  const res = await User.findById({
    _id: tokenData.id
  })
  await next().catch(err => {
    let code = 500
    let msg = 'unknown error'
    ctx.body = {
      code,
      msg
    }
  })
}

module.exports = auth
