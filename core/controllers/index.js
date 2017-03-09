import SocketIO from 'socket.io'
import api from './api'
import html from './html'
import webhook from './webhooks'
import apis from './APIs'
import apiAdapter from '../adapter'
import pubsub from '../pubsub'

/**
 * Initialises routing and websocket portion of express
 * @param app
 */
const setup = (app) => {
	// IO initialized
  const io = SocketIO(app.server)
	// Pubsub used for communication with apis
  pubsub.initialize(io)
	// API adapter loads and inits websocket client of all APIs
  apiAdapter.initialize(io)

	// html router
  app.use('/', html())

	// api router
  app.use('/api', api())

	// External webhook router
  app.use('/webhook', webhook())

	// APIs actions controller
  apis.setup()
}

export default setup
