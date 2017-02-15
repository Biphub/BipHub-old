import socketServer from './socketServer'
import supervisor from './supervisor'

const initialize = (io) => {
  // Hub and Socket
  io.on('connection', socketServer)
  supervisor.initBips()
}

export default {
	initialize,
}
