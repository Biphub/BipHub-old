import Q from 'q'
import base from './base'
import bookshelf from '../bookshelf'

const IncomingAction = base.extend({
  tableName: 'incoming_actions',
  hasTimestamps: true,
  app() {
    return this.belongsTo('App')
  },
  incomingActionsFields() {
    return this.hasMany('IncomingActionField')
  },
}, {
  createOne({ incomingAction, appId }) {
    incomingAction.app_id = appId
    return this.create(incomingAction, null)
  },
  createMany({ incomingActions, appId }) {
    const forgedIncActions = incomingActions.map((incomingAction) => {
      return this.createOne({ incomingAction, appId })
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
  single: bookshelf.model('IncomingAction', IncomingAction),
  collection: bookshelf.collection('IncomingActions', IncomingActions),
}
