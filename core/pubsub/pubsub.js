import Events from 'events'
import _ from 'lodash'
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
      _.forOwn(actions, (value) => {
        const { event } = value
        socket.on(event, (payload) => {
          const { query } = socket.handshake
          events.emit(event, { payload, query, socket })
        })
      })
    })
  }
}

/**
 * Promisified publish
 * @param action
 * @param data
 * @param socket
 */
const publish = ({ action, data, socket }) => new Promise((resolve) => {
  const { io } = root
  if (io && !socket) {
    io.emit(action, data)
  } else {
    socket.emit(action, data, result => resolve(result))
  }
})

/**
 * Promisified subscribe
 * @param action
 * @param callback
 */
const subscribe = (action, callback) => {
  events.on(action, callback)
}

export default {
  initialize,
  publish,
  subscribe,
}
