import client from 'socket.io-client'
import config from './config'

function init() {
  const socket = client('http://localhost:8080/')
  socket.on('connect', () => {
  })
  socket.on('testEvent', () => {
  })
  socket.on('disconnect', () => {
  })
  socket.emit('REGISTER_BIP', config)
}

export default {
  init,
}
