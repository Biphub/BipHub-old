import SocketIO from 'socket.io'
import api from './api'
import html from './html'
import webhook from './webhooks'
import bips from './bips'
import bipAdapter from '../adapter'
import pubsub from '../pubsub'

/**
 * Initialises routing and websocket portion of express
 * @param app
 */
const setup = (app) => {
	// IO initialized
  const io = SocketIO(app.server)
	// Pubsub used for communication with bips
  pubsub.initialize(io)
	// Bip adapter loads and inits websocket client of all bips
  bipAdapter.initialize(io)

	// html router
  app.use('/', html())

	// api router
  app.use('/api', api())

	// External webhook router
  app.use('/webhook', webhook())

	// Bips actions controller
  bips()
}

export default setup
