const router = require('koa-router')()
const Calendar = require('../models/line.js')
const auth = require('../auth.js')

router.prefix('/lines')

router.get('/', async (ctx, next) => {
  const query = ctx.request.query
  let res = []
  if (query.today) {
    const currentYear = new Date().getFullYear().toString()
    // 今天减今年的第一天（xxxx年01月01日）
    const hasTimestamp = new Date() - new Date(currentYear)

    // 86400000 = 24 * 60 * 60 * 1000
    // console.log('今天是%s年中的第%s天', currentYear, hasDays)
    let hasDays = Math.ceil(hasTimestamp / 86400000)
    //获取当前年份(2位)
    let count = Calendar.find().count()
    if (count < hasDays) {
      hasDays = hasDays % count
    }

    res = await Calendar.find()
      .skip(hasDays - 1)
      .limit(1)
  } else {
    res = await Calendar.find(ctx.query, '-__v')
  }

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
  if (!res.md5) {
    ctx.body = ctx.error({ msg: '需要图片md5' })
    return
  }
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
