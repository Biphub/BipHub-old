import client from 'socket.io-client'

const actions = [
  'postIssue',
  'listIssue',
  'deleteIssue',
]

function init() {
  console.log('github started')
  const socket = client('http://localhost:8080')
  socket.on('connect', () => {
    console.log('github connected')
    socket.emit('yoServer', 'hi A')
  })
  socket.on('testEvent', (data) => {
    console.log('data ', data)
  })
  socket.on('disconnect', () => {
    console.log('disconnected')
  })
}

export default {
  init,
}
