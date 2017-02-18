import socketServer from './socketServer'
import loader from './BipLoader'

const initialize = (io) => {
  // Hub and Socket
  io.on('connection', socketServer)

  // Invokes init function of each bip
  loader.initBips()

  setTimeout(() => {
    io.emit('testEvent', 'testing!')
  }, 500)
}

export default {
  initialize,
}
