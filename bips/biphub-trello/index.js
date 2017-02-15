import client from 'socket.io-client'

function init() {
  console.log('trellow started')
  const socket = client('http://localhost:8080')
  socket.on('connect', () => {
    console.log('connected')
  })
  socket.on('event', (data) => {
    console.log('data ', data)
  })
  socket.on('disconnect', () => {
    console.log('disconnected')
  })
}

export default {
  init,
}
