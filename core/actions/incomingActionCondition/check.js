import _ from 'lodash'
import logger from '../../logger'
import models from '../../models'
import pubsub from '../../pubsub'

/**
 * Check incoming action's conditions by broadcasting.
 * TODO: Put rules in the documentation: only use attributes in functions that actually use them
 * @param app
 * @param incomingAction
 * @param bip
 * @param incomingActionPayload
 * @param socket
 * @returns {Promise.<void>}
 */
async function checkIncomingActionCondition({
	app, incomingAction, bip, incomingActionPayload, socket,
}) {
  if (bip && !_.isEmpty(bip)) {
    const incomingActionCondition = await models.IncomingActionCondition.findOne({
      id: bip.get('incoming_action_condition_id'),
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
      bip,
      result: conditionResult,
    }
  }
}

export default checkIncomingActionCondition
