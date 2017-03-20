import _ from 'lodash'
import single from '../models/single'

async function searchBips({ appName, meta }) {
  if (appName && !_.isEmpty(meta)) {
    const app = await single.App.findOne({ name: appName })
    const incomingAction = await single.IncomingAction.findOne({ app_id: app.id, name: meta.name })
    const bips = await single.Bip.findAll({ incoming_actions_id: incomingAction.id })
    return bips.models
  }
}

async function checkIncomingActionCondition(bip) {
  if (bip && !_.isEmpty(bip)) {
    const { attributes } = bip
    const incomingActionCondition = await single.IncomingActionConditions.findOne({
      id: attributes.incoming_action_condition_id,
    })
    console.log('found incoming action condition ! ', incomingActionCondition.attributes)
  }
}

async function bip({
  appName,
  incoming_action_payload_meta,
}) {
  const bips = await searchBips({ appName, meta: incoming_action_payload_meta })
  _.forEach(bips, (bip) => {
    // Incoming action condition check broadcast = appname_incomingActionName_conditionName
    checkIncomingActionCondition(bip).then(() => {
      console.log('bip id ', bip.id, ' has check condition')
    })
  })
}

function buildIncomingActionConditionBroadcastName(appName, incActionName, conditionName) {
  return `${appName}_${incActionName}_${conditionName}`
}

export default {
  searchBips,
  bip,
}
