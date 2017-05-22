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

/**
 * Foward all bips to outgoing actions
 */
async function fowardAllBips ({ bipEntities, data }) {
  const bipFoward = R.map((bipEntity) => forwardBip({ bipEntity, data }), bipEntities)
  return Q.all(bipFoward)
}

// Actual composed actions below

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
    { withRelated: ['incomingActions', 'outgoingActions'] }
  )
  const incomingAction = await app.related('incomingActions')
    .where({ name: meta.name })
  // Get first entity's id since meta.name can associate with only one incoming action
  const firstIncActionId = R.head(incomingAction).get('id')
  const bips = await models.Bip.findAll({ incoming_action_id: firstIncActionId }, { withRelated: [] })
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
