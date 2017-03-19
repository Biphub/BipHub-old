import _ from 'lodash'
import single from '../models/single'

async function searchBips({ appName, meta }) {
  if (appName && !_.isEmpty(meta)) {
    const app = await single.App.findOne({ name: appName })
		// Below query must return only one incomingAction
    const incomingAction = await single.IncomingAction.findOne({ app_id: app.id, name: meta.name })
    const bips = await single.Bip.findAll({ incoming_actions_id: incomingAction.id })
    _.each(bips.models, (model) => {
      console.log('found bip ', model.attributes)
    })
    Promise.resolve()
  }
}

export default {
  searchBips,
}
