import R from 'ramda'
import Joi from 'joi'
import pubsub from '../../pubsub'
import logger from '../../logger'
import appActions from '../../actions/app_actions'
import bipActions from '../../actions/bip_actions'

/**
 * Setup pubsub subscribers for communication with Apps
 */
const setup = () => {
	/**
	 * Registers any apps.
	 * name: REGISTER_APP
	 * TODO: Check that query contains requires data. query.bipName must be present
   * TODO: Refactor below using composeP
	 */
  pubsub.subscribe('REGISTER_APP', ({ payload }) => {
    appActions.registerApp(payload).then((app) => {
      logger.info(`RegiserApp successful for ${app.get('name')}`)
    }).catch(() => {
      logger.error(`Register app failed for ${payload.name}`)
    })
  })

	/**
	 * name: INCOMING_ACTION
	 * Accepts any incoming actions from Apps
	 * All payload must be formatted as
	 * payload = {
   *  payload // contains actual data
   *  meta // contains meta data, incoming action name, app name
   * }
	 *
	 * query: contains name of bip, retrieved from socket's query string
	 */
  pubsub.subscribe('INCOMING_ACTION', ({ payload, queryString, socket }) => {
    logger.log('inc action before checking schema ', payload)
    const schema = {
      payload: Joi.object().keys({
        data: Joi.any().required(),
        meta: Joi.object().keys({
          type: Joi.string().required(),
          name: Joi.string().required(),
          description: Joi.string().required(),
          conditions: Joi.object().required(),
          fields: Joi.object().required(),
          options: Joi.object().required()
        }).required()
      }),
      queryString: Joi.object().keys({
        appName: Joi.string().required()
      }).required(),
      socket: Joi.object().required()
    }
    const schemaValidResult = Joi.validate({ payload, queryString, socket }, schema)
    logger.log('received incoming action')
    logger.log('schema valid ', schemaValidResult)
    if (schemaValidResult.error === null) {
      // Search an app in DB using app name
			// Search an associated incoming action using the app id
			// Search for bips using incoming action id
			// Broadcast condition check to incoming actions
			// Receive condition pass or fail
			// If passed, get bip's outgoing action id
      const appName = R.propOr(null, 'appName', queryString)
      bipActions.bip(appName, payload, socket)
    } else {
      logger.error('Incoming action validation failed! ', schemaValidResult)
    }
  })

	/**
	 * Accepts ping check
	 * TODO: Clarify what todo if ping constantly fails
	 */
  pubsub.subscribe('PING', (payload) => {
    logger.info('Ping from ', payload)
  })
}

export default {
  setup
}
