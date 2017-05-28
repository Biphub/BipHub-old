import R from 'ramda'
import models from '../models'
import pubsub from '../pubsub'

async function checkActionCondition(appName, actionName, condName, actionPayload, socket) {
  const checkIncActionMessageName = `${appName}_${actionName}_${condName}`
  const result = await pubsub.publish({
    action: checkIncActionMessageName,
    payload: actionPayload,
    socket
  })
  return result
}

function forwardBip(bip) {
  // const appName =
}

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
  console.log('finding app!')
  const app = await models.App
    .findOne({
      name: appName
    }, {
      withRelated: ['actions']
    })
  console.log('found an app! ', app.get('name'))
  const incomingActions = await app.related('actions')
    .where({
      name: incActionName,
      app_id: app.get('id'),
      type: 'incomingActions'
    })
  console.log('inc actions ', incomingActions.toJSON())
  // Received incoming action must be unique using action meta.name & app_id & type: incomingActions
  const firstIncActionName = R.head(incomingActions).get('name')
  // Find all bips that is associated with the unique incoming action
  const bips = (
    await models.Bip
    .findAll({
      incoming_action_name: firstIncActionName,
      incoming_app_name: app.get('name')
    })
  ).models // Only interested in bookshelf models
  R.map(model => {
    console.log('bip model ', model.get('action_chain'))
  })(bips)
  /* checkAllIncomingActionConditions({
    app, incomingAction, incomingActionPayload
  })
  const incomingAction = await models.IncomingAction.findOne({ app_id: app.id, name: meta.name })
  const rawBips = (await models.Bip.findAll({ incoming_actions_id: incomingAction.id })).models
  const checkedBips = await checkAllIncomingActionConditions({
    app, incomingAction, bipEntities: rawBips, incomingActionPayload, socket,
  })
  const result = fowardAllBips({ bipEntities: checkedBips, data: incomingActionPayload.data })
  return result */
}

export default {
  bip
}
