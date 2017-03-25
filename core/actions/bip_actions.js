import _ from 'lodash'
import Q from 'q'
import models from '../models'
import pubsub from '../pubsub'

/**
 * Check incoming action's conditions by broadcasting.
 * TODO: Put rules in the documentation: only use attributes in functions that actually use them
 * @param app
 * @param incomingAction
 * @param bipEntity
 * @param incomingActionPayload
 * @param socket
 * @returns {Promise.<void>}
 */
async function checkIncomingActionCondition({
  app, incomingAction, bipEntity, incomingActionPayload, socket,
}) {
  if (bipEntity && !_.isEmpty(bipEntity)) {
    const incomingActionCondition = await models.IncomingActionConditions.findOne({
      id: bipEntity.get('incoming_action_condition_id'),
    })
    // TODO: Refactor below code
    const appName = app.get('name')
    const incActionName = incomingAction.get('name')
    const conditionName = incomingActionCondition.get('name')
    const condition = incomingActionCondition.get('condition_payload')
    // TODO: Move below code to helper
    const messageName = `${appName}_${incActionName}_${conditionName}`
    const conditionResult = await pubsub.publish({
      socket,
      action: messageName,
      data: {
        payload: incomingActionPayload,
        condition,
      },
    })
    return {
      bip: bipEntity,
      result: conditionResult,
    }
  }
}

/**
 * Check all incoming action conditions.
 * Essentially it calls checkIncomingActionCondition method
 * @param app
 * @param incomingAction
 * @param incomingActionPayload
 * @param bipEntities
 * @param socket
 * @returns {Promise.<*>}
 */
async function checkAllIncomingActionConditions({
  app, incomingAction, incomingActionPayload, bipEntities, socket,
}) {
  const conditionCheckFuncs = []
  _.forEach(bipEntities, (bipEntity) => {
    conditionCheckFuncs.push(checkIncomingActionCondition({
      app, incomingAction, bipEntity, incomingActionPayload, socket,
    }))
  })
  const allResult = await Q.all(conditionCheckFuncs)
  allResult.filter((payload) => {
    if (payload.result) {
      return payload.bipEntity
    }
    return false
  })
  return allResult.map(payload => payload.bip)
}

/**
 * Forwarding bips to connected apps
 * @param bipEntity
 * @param data
 * @returns {Promise.<void>}
 */
async function forwardBip({ bipEntity, data }) {
  if (!_.isEmpty(bipEntity)) {
    const outgoingAction = await models.OutgoingAction.findOne({ id: bipEntity.get('outgoing_actions_id') })
    const app = await models.App.findOne({ id: outgoingAction.get('app_id') })
    pubsub.publish({
      action: `${app.get('name')}_${outgoingAction.get('name')}`,
      data,
    })
  }
}

/**
 * Foward all bips to outgoing actions
 */
async function fowardAllBips({ bipEntities, data }) {
  const bipFoward = []
  _.forEach(bipEntities, (bipEntity) => {
    bipFoward.push(forwardBip({ bipEntity, data }))
  })
  return Q.all(bipFoward)
}

// Actual composed actions below

/**
 * Base bip action that reacts to incoming event and forward it to outgoing action
 * @param appName
 * @param incomingActionPayload
 * @param socket
 * @returns {Promise.<void>}
 */
async function bip({
  appName,
	incomingActionPayload,
	socket,
}) {
  if (appName && !_.isEmpty(incomingActionPayload)) {
    const { meta } = incomingActionPayload
    const app = await models.App.findOne({ name: appName }, { withRelated: ['incoming_actions'] })
    console.log(app.related('incoming_actions'))
    const incomingAction = await models.IncomingAction.findOne({ app_id: app.id, name: meta.name })
    const rawBips = (await models.Bip.findAll({ incoming_actions_id: incomingAction.id })).models
    const checkedBips = await checkAllIncomingActionConditions({
      app, incomingAction, bipEntities: rawBips, incomingActionPayload, socket,
    })
    const result = fowardAllBips({ bipEntities: checkedBips, data: incomingActionPayload.data })
    console.log('INFO: Result after forwarding all bips ', result)
  }
}


export default {
  bip,
}
