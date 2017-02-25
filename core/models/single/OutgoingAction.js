import Q from 'q'
import base from './base'

const OutgoingAction = base.extend({
  tableName: 'outgoing_actions',
  hasTimestamps: true,
  bip() {
    return this.belongsTo('Bips')
  },
}, {
  registerOutgoingActions({ outgoingActions, bipId }) {
    const forgedOutActions = outgoingActions.map((outgoingAction) => {
      outgoingAction.bip_id = bipId
      return this.create(outgoingAction, null)
    })
    Q.allSettled(forgedOutActions)
  },
})

export default OutgoingAction
