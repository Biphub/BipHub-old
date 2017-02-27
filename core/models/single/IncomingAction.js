import Q from 'q'
import base from './base'

const IncomingAction = base.extend({
  tableName: 'incoming_actions',
  hasTimestamps: true,
  bip() {
    return this.belongsTo('Bips')
  },
}, {
  registerIncomingActions({ incomingActions, bipId }) {
    const forgedIncActions = incomingActions.map((incomingAction) => {
      incomingAction.bip_id = bipId
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
