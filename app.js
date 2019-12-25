const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
// const logger = require('koa-logger')

const index = require('./routes/index')
const users = require('./routes/users')
const lines = require('./routes/lines')
const cors = require('koa-cors')

const log4js = require('log4js')
log4js.configure({
  appenders: { cheese: { type: 'file', filename: 'access.log' } },
  categories: { default: { appenders: ['cheese'], level: 'trace' } }
})
const logger = log4js.getLogger('cheese')
// logger.trace('Entering cheese testing')
// logger.debug('Got cheese.')
// logger.info('Cheese is Comté.')
// logger.warn('Cheese is quite smelly.')
// logger.error('Cheese is too ripe!')
// logger.fatal('Cheese was breeding ground for listeria.')

require('./conn-mongo.js')

// error handler
// onerror(app)
app.use(cors())
// app.use(accessLogger()) //中间件
// middlewares
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text']
  })
)

app.use(
  views(__dirname + '/views', {
    extension: 'ejs'
  })
)

const errorHandler = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.response.status = err.statusCode || err.status || 500
    ctx.response.body = {
      code: ctx.response.status,
      msg: err.message
    }
  }
}

app.use(errorHandler)

// success error handle
app.use(async (ctx, next) => {
  ctx.success = data => ({ code: 200, data })
  ctx.error = msg => ({ code: 400, msg })
  await next()
})
// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
  logger.trace(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(lines.routes(), lines.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
  logger.error('server error', err, ctx)
})

app.listen(3000)
module.exports = app
