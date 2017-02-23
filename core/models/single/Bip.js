import base from './base'
import IncomingActions from '../collection/IncomingActions'
import OutgoingActions from '../collection/OutgoingActions'

const Bip = base.extend({
  tableName: 'bips',
  hasTimestamps: true,
}, {
  async registerBip({ bip }) {
    const savedBip = await this.forge(bip).save(null, null)
    console.log('registering bip! ', savedBip.id)
    return true
  },
  registerIncomingActions() {

  },
  registerOutgoingActions() {

  },
})

export default Bip
