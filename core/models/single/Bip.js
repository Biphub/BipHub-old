import Q from 'q'
import Promise from 'bluebird'
import base from './base'
import IncomingAction from './IncomingAction'

const Bip = base.extend({
  tableName: 'bips',
  hasTimestamps: true,
}, {
  async registerBip({ bip, incomingActions }) {
    const savedBip = await this.forge(bip).save(null, null)
    IncomingAction.registerIncomingActions({ incomingActions, bipId: savedBip.id })
    return true
  },
  registerOutgoingActions() {

  },
})

export default Bip
