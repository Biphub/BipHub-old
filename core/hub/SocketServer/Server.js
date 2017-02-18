import Socket from './Socket'

const Server = (io) => {
  io.on('connection', socketServer)
}

export default Server
