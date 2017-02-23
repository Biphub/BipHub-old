import Q from 'q'
import base from './base'
import IncomingActions from '../collection/IncomingActions'
import OutgoingActions from '../collection/OutgoingActions'

const Bip = base.extend({
  tableName: 'bips',
  hasTimestamps: true,
}, {
  async registerBip({ bip, incomingActions }) {
    const savedBip = await this.forge(bip).save(null, null)
    console.log('registering bip! ', savedBip.id)
		// const builtIncomingActions = IncomingActions.forge(incomingActions)
    // const stuff = await Q.all(builtIncomingActions.invoke('save'))
    this.registerIncomingActions()
    return true
  },
  registerIncomingActions() {
    console.log('testing method')
  },
  registerOutgoingActions() {

  },
})

export default Bip
