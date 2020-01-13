const router = require('koa-router')()
const mkdirp = require('mkdirp')
const uuid = require('node-uuid')
const path = require('path')
const fs = require('fs')
const md5 = require('md5')
const Images = require('../models/images.js')
let { uploadPath } = require('../env')

router.post('/upload', async (ctx, next) => {
  const result = await uploadFile(ctx)
  await Images.create(result)
  ctx.body = { code: 200, description: 'SUCCESS', md5: result.md5 }
})

router.get('/download', async (ctx, next) => {
  ctx.body = 'this is a download response'
})

function uploadFile(ctx) {
  console.log('开始上传图片。。。')
  const filename = ctx.request.body.filename || uuid.v4()
  console.log(11121, ctx.request, ctx.request.files)
  const file = ctx.request.files.file
  const ext = file.name.split('.').pop() // 获取上传文件扩展名
  // 创建文件夹
  // const uploadPath = uploadPath // 这是我测试的路径
  const flag = fs.existsSync(uploadPath) // 判断文件夹是否存在
  // 同步创建多级文件夹
  if (!flag) mkdirp.sync(uploadPath)
  // 文件全路径
  const filePath = `${uploadPath}/${filename}.${ext}`
  return new Promise((resolve, reject) => {
    const reader = fs.createReadStream(file.path)
    const upStream = fs.createWriteStream(filePath) // 创建可写流
    // 对写入流进行事件监听
    // upStream.on('open', function () {
    //   console.log("open");
    // });
    // 流写入成功后调用的事件，在这里处理返回结果
    upStream.on('finish', function() {
      console.log('finish')
      // 对图片计算md5值的，你也可以处理自己的逻辑，然后通过 resolve() 函数将处理的结果返回即可
      const buf = fs.readFileSync(filePath)
      const hash = md5(buf)
      resolve({ md5: hash, filePath, files: file })
    })
    // upStream.on('close', function () {
    //   console.log("close");
    // });
    upStream.on('error', function(err) {
      // 有错误的话，在这个里面处理
      console.log('error', err)
      reject(err)
    })
    // 可读流通过管道写入可写流
    reader.pipe(upStream)
  })
}

module.exports = router
