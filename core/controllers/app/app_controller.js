import _ from 'lodash';
import Joi from 'joi';
import pubsub from '../../pubsub';
import models from '../../models';
import logger from '../../logger';
import bipActions from '../../actions/bip_actions';

/**
 * Setup pubsub subscribers for communication with Apps
 */
const setup = () => {
	/**
	 * Registers any apps.
	 * name: REGISTER_APP
	 * TODO: Check that query contains requires data. query.bipName must be present
	 */
  pubsub.subscribe('REGISTER_APP', ({ payload }) => {
		// Register an app with incoming and outgoing actions
    models.App.createOne(payload).then((app) => {
      app.related('incomingActions').fetch().then((model) => {
        logger.info(`Register app successful for ${model.get('name')}`);
      });
    }).catch(() => {
      logger.error(`Register app failed for ${payload.name}`);
    });
  });

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
    const schema = {
      payload: Joi.object().keys({
        data: Joi.any().required(),
        meta: Joi.object().keys({
          type: Joi.string().required(),
          name: Joi.string().required(),
          description: Joi.string().required(),
          conditions: Joi.array().required(),
          fields: Joi.object().required(),
          options: Joi.object().required()
        }).required()
      }),
      queryString: Joi.object().keys({
        appName: Joi.string().required()
      }).required(),
      socket: Joi.object().isRequired()
    };
    const schemaValidResult = Joi.validate({ payload, queryString }, schema);
    if (!schemaValidResult.error) {
      // Search an app in DB using app name
			// Search an associated incoming action using the app id
			// Search for bips using incoming action id
			// Broadcast condition check to incoming actions
			// Receive condition pass or fail
			// If passed, get bip's outgoing action id
      const appName = _.get(queryString, 'appName', null);
      bipActions.bip({ appName, incomingActionPayload: payload, socket });
    }
  });

	/**
	 * Accepts ping check
	 * TODO: Clarify what todo if ping constantly fails
	 */
  pubsub.subscribe('PING', (payload) => {
    logger.info('Ping from ', payload);
  });
};

export default {
  setup
};
