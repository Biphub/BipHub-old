import forOwn from 'lodash/forOwn'
import get from 'lodash/get'
import pubsub from '../../pubsub'
import config from '../../config'
import single from '../../models/single'
import arrayHelper from '../../helpers/array'

/**
 * Setup pubsub subscribers for communication with Apps
 */
const setup = () => {
	/**
   * Registers any apps.
   * TODO: Check duplicates
   * TODO: Check that query contains requires data. query.bipName must be present
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
      val.conditions = arrayHelper.toString(val.conditions)
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
   * All payload must be formatted as
   * payload = {
   *  payload // contains actual data
   *  meta // contains meta data, incoming action name, app name
   * }
   *
   * query: contains name of bip, retrieved from socket's query string
	 */
  pubsub.subscribe(config.get('actions:incoming_action:event'), ({ payload, query }) => {
    const bipName = get(query, 'bipName', null)
    if (bipName) {
      // Using bipname and event name, search for a bip
      // TODO: Implement seeding
      console.log('incoming action received! from ', query.bipName, '  ', payload)
    }
  })

	/**
   * Accepts ping check
   * TODO: Clarify what todo if ping constantly fails
	 */
  pubsub.subscribe(config.get('actions:ping:event'), (payload) => {
    console.log('Ping from ', payload)
  })
}

export default {
  setup,
}
