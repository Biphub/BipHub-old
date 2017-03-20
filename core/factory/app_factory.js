import _ from 'lodash'
import single from '../models/single'

async function searchBips({ appName, meta }) {
  if (appName && !_.isEmpty(meta)) {
    console.log('app name ', appName, '  meta ', meta)
    const app = await single.App.findOne({ name: appName })
    const incomingAction = await single.IncomingAction.findOne({ app_id: app.id, name: meta.name })
    console.log('incoming action ', incomingAction.id)
    const bips = await single.Bip.findAll({ incoming_actions_id: incomingAction.id })
    return bips.models
  }
}

async function checkIncomingActionCondition(bip) {
  // const incomingActionCondition = await single.
}

async function bip({
  appName,
  incoming_action_payload_meta,
}) {
  const bips = await searchBips({ appName, meta: incoming_action_payload_meta })
  _.forEach(bips, (bip) => {
    checkIncomingActionCondition(bip).then(() => {
      console.log('bip id ', bip.id, ' has check condition')
    })
  })
}

export default {
  searchBips,
	bip,
}
