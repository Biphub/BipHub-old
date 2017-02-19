import socketServer from './SocketServer'
import bipLoader from './BipLoader'

const initialize = (io) => {
  // Pass io object into socket server module
  socketServer.handleConnections(io)

  // Invokes init function of each bip
  bipLoader().initBips()

	/**
   * Emits action to all sockets
	 * @param action
	 * @param data
	 */
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
