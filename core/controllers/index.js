import SocketIO from 'socket.io'
import webhook from './webhooks'
import hub from './hub'
import appAdapter from '../adapter'
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
  appAdapter.initialize(io)
	// External webhook router
  // DO WE NEED THIS?
  app.use('/webhook', webhook())

	// APIs actions controller
  hub.setup()
}

export default setup
