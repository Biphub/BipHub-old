import client from 'socket.io-client'
import config from './config'

function init() {
  console.log('trellow started')
  const socket = client('http://localhost:8080')
  socket.on('connect', () => {
    console.log('trello connected')
  })

  socket.on()

  socket.on('disconnect', () => {
    console.log('disconnected')
  })

  // Register trello Bip
  socket.emit('REGISTER_BIP', config)
}

export default {
  init,
}
