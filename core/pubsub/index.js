import Events from 'events'
import forOwn from 'lodash/forOwn'
import config from '../config'
import root from '../helpers/root'

const actions = config.get('actions')
let events = root.events

console.log('event initiated! ', typeof events)
/**
 * Intializes IO
 * @param io
 */
function initialize(io) {
	/**
   * We shouldn't be using global here
	 */
  if (typeof root.io === 'undefined') {
    events = new Events.EventEmitter()

    root.events = events
    root.io = io
    io.on('connection', (socket) => {
      forOwn(actions, (value) => {
        const { event } = value
        socket.on(event, payload => events.emit(event, payload))
      })
    })
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
