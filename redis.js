var redis = require('redis'),
  client = redis.createClient(6379, '127.0.0.1', {})

client.on('error', function(err) {
  console.log('Error ' + err)
})

// 1 键值对
client.set('color', 'red', redis.print)
client.get('color', function(err, value) {
  if (err) throw err
  console.log('Got: ' + value)
  // client.quit()
})
client.on('error', function(err) {
  console.log('Error ' + err)
})

client.set('string key', 'string val', redis.print)
client.hset('hash key', 'hashtest 1', 'some value', redis.print)
client.hset(['hash key', 'hashtest 2', 'some other value'], redis.print)
client.hkeys('hash key', function(err, replies) {
  console.log(replies.length + ' replies:')
  replies.forEach(function(reply, i) {
    console.log('    ' + i + ': ' + reply)
  })
  client.quit()
})
