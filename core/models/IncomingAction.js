import Q from 'q'
import base from './base'
import bookshelf from '../bookshelf'

const IncomingAction = base.extend({
  tableName: 'incoming_actions',
  hasTimestamps: true,
  app() {
    return this.belongsTo('App')
  },
}, {
  createMany({ incomingActions, apiId }) {
    const forgedIncActions = incomingActions.map((incomingAction) => {
      incomingAction.api_id = apiId
      return this.create(incomingAction, null)
    })
    Q.allSettled(forgedIncActions)
  },
  findByEndPoint(endPoint, action) {
    const endPointVariation = `/${endPoint}`
    const actionVariation = `/${action}`
    return this.findOne({ endPoint: endPointVariation, action: actionVariation })
  },
})

const IncomingActions = bookshelf.Collection.extend({
  model: IncomingAction,
})

export default {
  IncomingAction: bookshelf.model('IncomingAction', IncomingAction),
  IncomingActions: bookshelf.collection('IncomingActions', IncomingActions),
}
