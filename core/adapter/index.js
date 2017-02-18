import socketServer from './SocketServer'
import bipLoader from './BipLoader'
import store from '../store'

const initialize = (io) => {
  console.log('getting test from adapter ', store.get('test'))
  // Pass io object into socket server module
  socketServer.handleConnections(io)

  // Invokes init function of each bip
  bipLoader().initBips()

  const emit = (action, data) => {
    io.emit(action, data)
  }

  return {
    emit,
  }
}

export default {
  initialize,
}
