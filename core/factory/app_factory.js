import _ from 'lodash'
import single from '../models/single'
import pubsub from '../pubsub'

/**
 * Search associated entities to app and payload meta.
 * TODO: Replace below logic with join table
 * @param appName
 * @param meta
 * @returns {Promise.<{app: *, incomingAction: *, bips: (*|Array)}>}
 */
async function searchBipAssociates({ appName, meta }) {
  if (appName && !_.isEmpty(meta)) {
    const app = await single.App.findOne({ name: appName })
    const incomingAction = await single.IncomingAction.findOne({ app_id: app.id, name: meta.name })
    const bips = await single.Bip.findAll({ incoming_actions_id: incomingAction.id })
    return {
      app,
      incomingAction,
      bips: bips.models,
    }
  }
}

/**
 * Check incoming action's conditions by broadcasting.
 * TODO: Put rules in the documentation: only use attributes in functions that actually use them
 * @param app
 * @param incomingAction
 * @param bipEntity
 * @param incoming_action_payload
 * @returns {Promise.<void>}
 */
async function checkIncomingActionCondition({
  app, incomingAction, bipEntity, incoming_action_payload, socket,
}) {
  if (bipEntity && !_.isEmpty(bipEntity)) {
    const incomingActionCondition = await single.IncomingActionConditions.findOne({
      id: bipEntity.attributes.incoming_action_condition_id,
    })
    const appAttr = app.attributes
    const incActionAttr = incomingAction.attributes
    const incActionCondAttr = incomingActionCondition.attributes
    const appName = appAttr.name
    const incActionName = incActionAttr.name
    const conditionName = incActionCondAttr.name
    const condition = incActionCondAttr.condition_payload
    const messageName = `${appName}_${incActionName}_${conditionName}`

    // TODO: subscribe to mesasgeName_result
    pubsub.publish({
      socket,
      action: messageName,
      data: {
        payload: incoming_action_payload,
        condition,
      },
      callback(data) {
        console.log('INFO: app factory received reply for condition check ', data)
      },
    })
  }
}

/**
 * @param appName
 * @param incoming_action_payload
 * @returns {Promise.<void>}
 */
async function bip({
  appName,
  incoming_action_payload,
	socket,
}) {
  if (appName && !_.isEmpty(incoming_action_payload)) {
		// Retrieves app, incoming actions, bips from appname and payload meta
    const {
      app,
      incomingAction,
      bips,
    } = await searchBipAssociates({ appName, meta: incoming_action_payload.meta })

    _.forEach(bips, (bipEntity) => {
      // Incoming action condition check broadcast = appname_incomingActionName_conditionName
      // Checks incoming action condition of each bip (one payload meta + app can be associated with
      // multiple incoming action condition)
      checkIncomingActionCondition({
        app, incomingAction, bipEntity, incoming_action_payload, socket,
      }).then(() => {
        console.log('bip id ', bipEntity.id, ' has check condition')
      })
    })
  }
}


export default {
  bip,
}
