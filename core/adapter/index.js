import socketServer from './SocketServer'
import loader from './BipLoader'

const initialize = (io) => {
  // Pass io object into socket server module
  socketServer(io)

  // Invokes init function of each bip
  loader.initBips()
}

export default {
  initialize,
}
