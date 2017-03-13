import Events from 'events'
import forOwn from 'lodash/forOwn'
import config from '../config'
import root from '../helpers/root'

const actions = config.get('actions')
let events = root.events

/**
 * Intializes IO
 * @param io
 */
function initialize(io) {
  if (typeof root.io === 'undefined') {
    events = new Events.EventEmitter()

    root.events = events
    root.io = io
    io.on('connection', (socket) => {
      forOwn(actions, (value) => {
        const { event } = value
        socket.on(event, (payload) => {
          const { query } = socket.handshake
          events.emit(event, { payload, query })
				})
      })
    })
  }
}

const publish = (action, data) => {
  const { io } = root
  if (io) {
    io.emit(action, data)
  }
}

const subscribe = (action, callback) => {
  events.on(action, callback)
}

export default {
  initialize,
  publish,
  subscribe,
}
