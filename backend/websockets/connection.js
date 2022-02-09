const { WebSocket } = require('ws')

const sock = new WebSocket('ws://localhost:8080/game')

sock.on('open', () => {
  const connectionPayload = JSON.stringify({
    type: 'connection',
    data: {}
  })

  sock.send(connectionPayload)
})

sock.on('message', (msg) => {
  // Should be a successful "connection" response
  console.log(msg.toString())
})

sock.on('error', (err) => {
  console.error('websocket error', err)
  process.exit(1)
})

console.log('Press CTRL-C to exit...\n')
