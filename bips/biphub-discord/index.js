import client from 'socket.io-client'

function init() {
  const socket = client('http://localhost:8080/')
  socket.on('connect', () => {
  })
  socket.on('testEvent', () => {
  })
  socket.on('disconnect', () => {
  })
}

export default {
  init,
}