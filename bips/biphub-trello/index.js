import client from 'socket.io-client'
import factory from './factory'

function init() {
  console.log('trellow started')
  const socket = client('http://localhost:8080')
  socket.on('connect', () => {
    console.log('trello connected')
  })
  socket.on('testEvent', (data) => {
    console.log('data ', data)
  })
  socket.on('disconnect', () => {
    console.log('disconnected')
  })

  // Register trello Bip
  socket.emit('REGISTER_BIP', factory.getConfig())
}

export default {
  init,
}
