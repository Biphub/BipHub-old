import forOwn from 'lodash/forOwn'
import pubsub from '../../pubsub'
import config from '../../config'
import single from '../../models/single'

/**
 * Setup pubsub subscribers for communication with Apps
 */
const setup = () => {
	/**
   * Registers any apps.
   * TODO: Check duplicates
	 */
  pubsub.subscribe(config.get('actions:register_app:event'), ({ payload }) => {
    // TODO: Implement schema validator
    const app = {
      name: payload.name,
      description: payload.description,
    }
    const incomingActions = []
    const outgoingActions = []

    // TODO: Think about refactoring this section. Does it belong to controllers?
    // Creates an array of incomingActions
    forOwn(payload.incomingActions, (val) => {
      incomingActions.push(val)
    })

    // Creates an array of outgoingActions
    forOwn(payload.outgoingActions, (val) => {
      outgoingActions.push(val)
    })

    // Register an app with incoming and outgoing actions
    single.App.registerApp({ app, incomingActions, outgoingActions }).then((result) => {
      console.log('successfully registered an App ', result.attributes.name)
    })
  })

	/**
   * Accepts any incoming actions from Apps
	 */
  pubsub.subscribe(config.get('actions:incoming_action:event'), ({ payload, query }) => {
    console.log('incoming action received! from ', query.bipName, '  ', payload)
  })

	/**
   * Accepts pings
   * TODO: Clarify what todo if ping constantly fails
	 */
  pubsub.subscribe(config.get('actions:ping:event'), (payload) => {
    console.log('Ping from ', payload)
  })
}

export default {
  setup,
}
