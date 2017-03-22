import _ from 'lodash'
import pubsub from '../../pubsub'
import config from '../../config'
import single from '../../models/single'
import appFactory from '../../factory/app_factory'

/**
 * Setup pubsub subscribers for communication with Apps
 */
const setup = () => {
	/**
	 * Registers any apps.
	 * TODO: Check that query contains requires data. query.bipName must be present
	 */
  pubsub.subscribe(config.get('actions:register_app:event'), ({ payload }) => {
		// Run payload validation

		// Register an app with incoming and outgoing actions
    single.App.createOne(payload).then((result) => {
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
  pubsub.subscribe(config.get('actions:incoming_action:event'), ({ payload, query, socket }) => {
    const appName = _.get(query, 'appName', null)

    if (appName) {
      // Search an app in DB using app name
			// Search an associated incoming action using the app id
			// Search for bips using incoming action id
			// Broadcast condition check to incoming actions
			// Receive condition pass or fail
			// If passed, get bip's outgoing action id
      /* appFactory.searchBips({ appName, meta: payload.meta })
				.then(() => {
				})*/
      appFactory.bip({ appName, incoming_action_payload: payload, socket })
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
