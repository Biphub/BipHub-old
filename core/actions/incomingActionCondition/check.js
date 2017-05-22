import Q from 'q'
import pubsub from '../../pubsub'

/**
 *
 * @param appName
 * @param incomingActionName
 * @param incomingActionConditionPayload
 * @param incomingActionConditionName
 * @param incomingActionPayload
 * @param socket
 * @returns {Promise.<{result: *}>}
 */
async function checkIncomingActionCondition ({
	appName, incomingActionName, incomingActionConditionPayload,
  incomingActionConditionName, incomingActionPayload, socket
}) {
  const messageName = `${appName}_${incomingActionName}_${incomingActionConditionName}`
  const conditionResult = await pubsub.publish({
    socket,
    action: messageName,
    data: {
      payload: incomingActionPayload,
      incomingActionConditionPayload
    }
  })
  return {
    result: conditionResult
  }
}

/**
 *
 * @param app
 * @param incomingAction
 * @param incomingActionPayload
 * @param incomingActionCondition
 * @param bips
 * @param socket
 * @returns {Promise.<void>}
 */
async function checkAllIncomingActionConditions ({
  app, incomingAction, incomingActionPayload, incomingActionCondition, bips, socket
}) {
  // TODO: Get conditionPayload from bip
  // TODO: Get incomingActionPayload from websocket payload
  const conditionCheckFuncs = bips.map((bip) => {
    const appName = app.name
    const incomingActionName = incomingAction.name
    const incomingActionConditionPayload = incomingActionCondition.condition_payload
    const incomingActionConditionName = incomingActionCondition.name
    return checkIncomingActionCondition({
      appName,
      incomingActionName,
      incomingActionConditionPayload,
      incomingActionConditionName,
      incomingActionPayload,
      socket
    })
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

export default {
  checkAllIncomingActionConditions,
  checkIncomingActionCondition
}
