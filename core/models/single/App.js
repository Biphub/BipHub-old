import base from './base'
import IncomingAction from './IncomingAction'
import OutgoingAction from './OutgoingAction'

const App = base.extend({
  tableName: 'apps',
  hasTimestamps: true,
}, {
  async registerApp({ app, incomingActions, outgoingActions }) {
    const savedApp = await this.create(app, null)
    IncomingAction.registerIncomingActions({ incomingActions, apiId: savedApp.id })
    OutgoingAction.registerOutgoingActions({ outgoingActions, apiId: savedApp.id })
    return savedApp
  },
  async setAppActive(appId) {
    const foundApp = await this.findOne({ id: appId })
    foundApp.attributes.active = true
    return this.update(foundApp.attributes)
  },
  async setAppInactive(appId) {
    const foundApp = await this.findOne({ id: appId })
    foundApp.attributes.ative = false
    return this.update(foundApp.attributes)
  },
})

export default App
