import events from 'events'

/**
 * Intializes IO
 * @param io
 */
const initialize = (io) => {
  console.log('global io ', global.io)
  if (typeof global.io === 'undefined') {
    io.on('connection', (socket) => {
      console.log('io connected')

      socket.on('*', (event, data) => {
				console.log('Received new event ', event, '  ', data)
      })
    })
    global.io = io
  }
}

const publish = (action, data) => {
  const { io } = global
  io.emit(action, data)
}

const subscribe = (action) => {

}

const unsubscribe = (action) => {

}

export default {
  initialize,
  publish,
  subscribe,
  unsubscribe,
}
