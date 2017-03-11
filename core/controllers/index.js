import SocketIO from 'socket.io'
import config from '../config'
import api from './api'
import html from './html'
import webhook from './webhooks'
import apps from './app'
import apiAdapter from '../adapter'
import pubsub from '../pubsub'

const apiVersion = config.get('api:version')

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
  app.use(`/api/${apiVersion}`, api())

	// External webhook router
  app.use('/webhook', webhook())

	// APIs actions controller
  apps.setup()
}

export default setup
