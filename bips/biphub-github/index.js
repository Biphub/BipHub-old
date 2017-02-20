import client from 'socket.io-client'

function init() {
  const socket = client('http://localhost:8080/bips')
  socket.on('connect', () => {
  })
  socket.on('testEvent', (data) => {
  })
  socket.on('disconnect', () => {
  })
}

export default {
  init,
}
