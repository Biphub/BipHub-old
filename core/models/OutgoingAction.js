import Q from 'q'
import base from './base'
import db from '../bookshelf'

const { bookshelf } = db
const OutgoingAction = base.extend({
  tableName: 'outgoing_actions',
  hasTimestamps: true,
  app() {
    return this.belongsTo('App')
  },
  OutgoingActionFields() {
    return this.hasMany('OutgoingActionField')
  },
}, {
  createMany({ outgoingActions, appId }) {
    const forgedOutActions = outgoingActions.map((outgoingAction) => {
      outgoingAction.app_id = appId
      return this.create(outgoingAction, null)
    })
    Q.allSettled(forgedOutActions)
  },
})

const OutgoingActions = bookshelf.Collection.extend({
  model: OutgoingAction,
})

export default {
  single: bookshelf.model('OutgoingAction', OutgoingAction),
  collection: bookshelf.collection('OutgoingActions', OutgoingActions),
}
