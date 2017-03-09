import Q from 'q'
import base from './base'

const IncomingAction = base.extend({
  tableName: 'incoming_actions',
  hasTimestamps: true,
  api() {
    return this.belongsTo('Apis')
  },
}, {
  registerIncomingActions({ incomingActions, apiId }) {
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

export default IncomingAction
