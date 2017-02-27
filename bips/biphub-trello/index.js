import client from 'socket.io-client'
import config from './config'

function init() {
  const socket = client('http://localhost:8080/bips')
  socket.on('connect', () => {
    // console.log('trello connected')
  })

  socket.on('disconnect', () => {
    // console.log('disconnected')
    // TODO: Implement reconnect
  })

  // Register trello Bip
  socket.emit('REGISTER_BIP', config)
}

const getConfig = () => config

export default {
  init,
  getConfig,
}
