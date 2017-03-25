import Q from 'q'
import base from './base'
import bookshelf from '../bookshelf'

const OutgoingAction = base.extend({
  tableName: 'outgoing_actions',
  hasTimestamps: true,
  api() {
    return this.belongsTo('Apis')
  },
}, {
  createMany({ outgoingActions, apiId }) {
    const forgedOutActions = outgoingActions.map((outgoingAction) => {
      outgoingAction.api_id = apiId
      return this.create(outgoingAction, null)
    })
    Q.allSettled(forgedOutActions)
  },
})

const OutgoingActions = bookshelf.Collection.extend({
  model: OutgoingAction,
})

export default {
  OutgoingAction: bookshelf.model('OutgoingAction', OutgoingAction),
  OutgoingActions: bookshelf.collection('OutgoingActions', OutgoingActions),
}
