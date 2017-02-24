import Q from 'q'
import base from './base'

const IncomingAction = base.extend({
  tableName: 'incoming_actions',
  hasTimestamps: true,
  bip() {
    return this.belongsTo('Bips')
  },
}, {
  async registerIncomingActions({ incomingActions, bipId }) {
    const forgedIncActions = incomingActions.map((incomingAction) => {
      incomingAction.bip_id = bipId
      return this.forge(incomingAction).save()
    })
    Q.allSettled(forgedIncActions)
  },
})

export default IncomingAction
