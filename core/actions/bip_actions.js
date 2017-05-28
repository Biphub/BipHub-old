import R from 'ramda'
import Q from 'q'
import models from '../models'
import pubsub from '../pubsub'

/**
 * Forwarding bips to connected apps
 * @param bipEntity
 * @param data
 * @returns {Promise.<void>}
 */
async function forwardBip ({ bipEntity, data }) {
  if (!R.isEmpty(bipEntity)) {
    const outgoingAction = await models.OutgoingAction.findOne({ id: bipEntity.get('outgoing_actions_id') })
    const app = await models.App.findOne({ id: outgoingAction.get('app_id') })
    pubsub.publish({
      action: `${app.get('name')}_${outgoingAction.get('name')}`,
      data
    })
  }
}

async function forwardAllBips() {

}

/**
 * Base bip action that reacts to incoming event and forward it to outgoing action
 * @param appName
 * @param payload // Initial payload from incoming action
 * @param socket
 * @returns {Promise.<void>}
 */
async function bip (appName, payload, socket) {
  const { meta } = payload
  const app = await models.App.findOne(
    { name: appName },
    { withRelated: ['actions'] }
  )
  const incomingActions = await app.related('actions')
    .where({ name: meta.name, app_id: app.get('id'), type: 'incomingActions' })
  // Get first entity's id since meta.name can associate with only one incoming action
  // Received incoming action must be unique using action meta.name & app_id & type: incomingActions
  const firstIncActionId = R.head(incomingActions).get('id')
  // Find all bips that is associated with the unique incoming action
  const bips = await models.Bip
    .findAll({ incoming_action_id: firstIncActionId }, { withRelated: [] })
  console.log('found bips ', bips)
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
