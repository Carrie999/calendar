const router = require('koa-router')()
const User = require('../models/user.js')
const jwt = require('jsonwebtoken')
const SECRET = 'comics'

// router.get('/', async (ctx, next) => {
//   await ctx.render('index', {
//     title: 'Hello Koa 2!'
//   })
// })

router.post('/login', async (ctx, next) => {
  const user = await User.findOne({ username: ctx.request.body.username })
  if (!user) {
    return (ctx.body = ctx.error('用户名不存在'))
  }

  const isPasswordValid = require('bcrypt').compareSync(
    ctx.request.body.password,
    user.password
  )
  if (!isPasswordValid) {
    return (ctx.body = ctx.error('密码不正确'))
  }

  ctx.body = ctx.success(res)
})

router.post('/register', async (ctx, next) => {
  const postData = ctx.request.body
  res = await User.create({
    username: postData.username,
    password: postData.password
  })
  const token = jwt.sign({ id: String(res._id) }, SECRET)
  ctx.body = ctx.success({ res, token })
})

module.exports = router
