const router = require('koa-router')()
const Calendar = require('../models/line.js')
const auth = require('../auth.js')

router.prefix('/lines')

router.get('/', async (ctx, next) => {
  const res = await Calendar.find(ctx.query, '-__v')
  if (res) {
    ctx.body = ctx.success(res)
  } else {
    ctx.body = ctx.error(err)
  }
})

router.put('/', auth, async (ctx, next) => {
  const postData = ctx.request.body
  const res = await Calendar.update(
    {
      _id: postData._id
    },
    postData
  )
  if (res) {
    ctx.body = ctx.success(res)
  } else {
    ctx.body = ctx.error(err)
  }
})

router.post('/', async (ctx, next) => {
  const postData = ctx.request.body
  let res = await Calendar.create(postData)
  if (res._id) {
    ctx.body = ctx.success(res)
  } else {
    ctx.body = ctx.error(err)
  }
})

router.delete('/', async (ctx, next) => {
  const postData = ctx.request.body
  const res = await Calendar.remove({ _id: postData._id })
  if (res) {
    ctx.body = ctx.success(res)
  } else {
    ctx.body = ctx.error(err)
  }
})

module.exports = router
