import socket from './Socket'

const Server = (io) => {
  io.on('connection', socket)

  setTimeout(() => {
    io.emit('testEvent', 'testing!')
    io.emit('broadcast', 'yoyo!')
  }, 500)
}

export default Server
