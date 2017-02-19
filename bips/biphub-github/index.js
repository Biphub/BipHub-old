import client from 'socket.io-client'

function init() {
  const socket = client('http://localhost:8080/bips')
  socket.on('connect', () => {
    //console.log('github connected')
    //socket.emit('yoServer', 'hi A')
  })
  socket.on('testEvent', (data) => {
    //console.log('data ', data)
  })
  socket.on('disconnect', () => {
    //console.log('disconnected')
  })
}

export default {
  init,
}
