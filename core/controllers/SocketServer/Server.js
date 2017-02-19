import socket from './Socket'

const handleBipsConnections = (io) => {
  const nspBips = io.of('/bips')
  nspBips.on('connection', socket)
  setTimeout(() => {
    nspBips.emit('broadcast', 'yoyo!')
  }, 500)
}

const handleConnections = (io) => {
  handleBipsConnections(io)
}

export default {
  handleConnections,
}
