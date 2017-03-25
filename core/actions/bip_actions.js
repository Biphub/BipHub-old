import _ from 'lodash'
import Q from 'q'
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
  app, incomingAction, bipEntity, incomingActionPayload, socket, getAttributes,
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
    if (getAttributes) {
      return {
        bip: bipEntity.attributes,
        result: conditionResult,
      }
    }
    return {
      bip: bipEntity,
      result: conditionResult,
    }
  }
}

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
  console.log('INFO: bip action compsoed ', allResult)
  /* conditionCheckFuncs.filter((payload) => {
    if (payload.result) {
      return payload.bipEntity
    }
  })*/
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
    pubsub.publish({
      action: `${appAttr.name}_${outgoingAttr.name}`,
      data,
    })
  }
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
    // TODO: Replace below logic with join table
    const { meta } = incomingActionPayload
    const app = await single.App.findOne({ name: appName })
    const incomingAction = await single.IncomingAction.findOne({ app_id: app.id, name: meta.name })
    const bips = (await single.Bip.findAll({ incoming_actions_id: incomingAction.id })).models
    checkAllIncomingActionConditions({
      app, incomingAction, bipEntities: bips, incomingActionPayload, socket,
    }).then()
    // TODO: refactor below code
    /* _.forEach(bips, (bipEntity) => {
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
    })*/
  }
}


export default {
  bip,
}
