import socket from './Socket'

const handleBipsConnections = (io) => {
  const nspBips = io.of('/bips')
  nspBips.on('connection', socket)
}

const handleConnections = (io) => {
  handleBipsConnections(io)
}

export default {
  handleConnections,
}
