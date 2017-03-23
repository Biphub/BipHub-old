import _ from 'lodash'
import single from '../models/single'
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
    const incomingActionCondition = await single.IncomingActionConditions.findOne({
      id: bipEntity.attributes.incoming_action_condition_id,
    })
    // TODO: Refactor below code
    const appAttr = app.attributes
    const incActionAttr = incomingAction.attributes
    const incActionCondAttr = incomingActionCondition.attributes
    const appName = appAttr.name
    const incActionName = incActionAttr.name
    const conditionName = incActionCondAttr.name
    const condition = incActionCondAttr.condition_payload
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
    return conditionResult
  }
}

/**
 * Forwarding bips to connected apps
 * @param bipEntity
 * @param data
 * @returns {Promise.<void>}
 */
async function forwardBip({ bipEntity, data }) {
  if (!_.isEmpty(bipEntity)) {
    const bipAttr = bipEntity.attributes
    const outgoingAction = await single.OutgoingAction.findOne({ id: bipAttr.outgoing_actions_id })
    const outgoingAttr = outgoingAction.attributes
    const app = await single.App.findOne({ id: outgoingAttr.app_id })
    const appAttr = app.attributes

    console.log('INFO forwarding bip to outgoing action ', outgoingAction.id)
    pubsub.publish({
      action: `${appAttr.name}_${outgoingAttr.name}`,
      data,
    })
  }
}

/**
 *
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
    // TODO: Replace below logic with join table
    const { meta } = incomingActionPayload
    const app = await single.App.findOne({ name: appName })
    const incomingAction = await single.IncomingAction.findOne({ app_id: app.id, name: meta.name })
    const bips = (await single.Bip.findAll({ incoming_actions_id: incomingAction.id })).models
    console.log('outgoing action meta ', meta)
    _.forEach(bips, (bipEntity) => {
      checkIncomingActionCondition({
        app, incomingAction, bipEntity, incomingActionPayload, socket,
      }).then((result) => {
        if (result) {
          // TODO: Fix below incomingActionPayload.data so
          // TODO: it doesn't always assume it passes .data payload.
          forwardBip({ bipEntity, data: incomingActionPayload.data }).then()
        } else {
          console.log('INFO: Bip failed test ', result)
        }
      })
    })
  }
}


export default {
  bip,
}
