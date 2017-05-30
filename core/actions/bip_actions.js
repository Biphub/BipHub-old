import R from 'ramda'
import models from '../models'
import pubsub from '../pubsub'

/**
 * Base bip action that reacts to incoming event and forward it to outgoing action
 * @param appName
 * @param payload
 * @param socket
 * @returns {Promise.<void>}
 */
async function bip (appName, payload, socket) {
  const { meta } = payload
  const incActionName = meta.name
  const app = await models.App
    .findOne({
      name: appName
    }, {
      withRelated: ['actions']
    })
  const incomingActions = await app.related('actions')
    .where({
      name: incActionName,
      app_id: app.get('id'),
      type: 'incomingActions'
    })
  // Received incoming action must be unique using action meta.name & app_id & type: incomingActions
  const firstIncActionName = R.head(incomingActions).get('name')
  // Find all bips that is associated with the unique incoming action
  const bips = (
    await models.Bip
    .findAll({
      incoming_action_name: firstIncActionName,
      incoming_app_name: app.get('name')
    })
  ).models
  const bipActions = R.map(x => {
    const bipModel = x.toJSON()
    return bipModel.incoming_action_condition_names
  })(bips)
}

function checkActionCondition (appName, actionName, condName, actionPayload, socket) {
  return new Promise((resolve, reject) => {
    const checkIncActionMessageName = `${appName}_${actionName}_${condName}`
    pubsub.publish({
      action: checkIncActionMessageName,
      payload: actionPayload,
      socket
    }).then((result) => {

    })
  })
}

export default {
  bip
}
