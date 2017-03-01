import client from 'socket.io-client'
import config from './config'

function init() {
  const socket = client('http://localhost:8080/')
  socket.on('connect', () => {
    // console.log('trello connected')
  })

  socket.on('disconnect', () => {
    // console.log('disconnected')
    // TODO: Implement reconnect
  })

  // Register trello Bip
  console.log('emitting!')
  socket.emit('REGISTER_BIP', config)
  socket.emit('REGISTER_BIP2', 'testing!')
}

const getConfig = () => config

export default {
  init,
  getConfig,
}
