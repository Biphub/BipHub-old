import Events from 'events'
import forOwn from 'lodash/forOwn'
import config from '../config'

const events = new Events.EventEmitter()
const actions = config.get('actions')

/**
 * Intializes IO
 * @param io
 */
function initialize(io) {
	/**
   * We shouldn't be using global here
	 */
	if (typeof global.io === 'undefined') {
    io.on('connection', (socket) => {
      forOwn(actions, (value) => {
        const { event } = value
        socket.on(event, payload => events.emit(event, payload))
      })
    })
    global.io = io
  }
}

const publish = (action, data) => {
  const { io } = global
  io.emit(action, data)
}

const subscribe = (action, callback) => {
  events.on(action, callback)
}

export default {
  initialize,
  publish,
  subscribe,
}
