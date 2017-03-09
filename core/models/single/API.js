import base from './base'
import IncomingAction from './IncomingAction'
import OutgoingAction from './OutgoingAction'

const API = base.extend({
  tableName: 'apis',
  hasTimestamps: true,
}, {
  async registerAPI({ api, incomingActions, outgoingActions }) {
    const savedAPI = await this.create(api, null)
    IncomingAction.registerIncomingActions({ incomingActions, apiId: savedAPI.id })
    OutgoingAction.registerOutgoingActions({ outgoingActions, apiId: savedAPI.id })
    return savedAPI
  },
  async setAPIActive(apiId) {
    const foundAPI = await this.findOne({ id: apiId })
    foundAPI.attributes.active = true
    return this.update(foundAPI.attributes)
  },
  async setAPIInactive(apiId) {
    const foundAPI = await this.findOne({ id: apiId })
    foundAPI.attributes.ative = false
    return this.update(foundAPI.attributes)
  },
})

export default API
