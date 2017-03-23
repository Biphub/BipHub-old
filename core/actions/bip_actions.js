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

async function forwardBip({ bipEntity, data }) {
  if(!_.isEmpty(bipEntity)) {
    const bipAttr = bipEntity.attributes
    const outgoingAction = await single.OutgoingAction.findOne({ id: bipAttr.outgoing_actions_id })
    const app = await single.App.findOne({ id: outgoingAction.attributes.app_id })
    pubsub.publish()
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
      // Incoming action condition check broadcast = appname_incomingActionName_conditionName
      // Checks incoming action condition of each bip (one payload meta + app can be associated with
      // multiple incoming action condition)
      checkIncomingActionCondition({
        app, incomingAction, bipEntity, incomingActionPayload, socket,
      }).then((result) => {
        if (result) {
					forwardBip({ bipEntity }).then()
          // console.log('INFO: Bip passed test ', result, '  ', bipEntity, incomingActionPayload)
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
