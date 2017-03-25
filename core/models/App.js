import _ from 'lodash'
import base from './base'
import bookshelf from '../bookshelf'
import IncomingAction from './IncomingAction'
import OutgoingAction from './OutgoingAction'
import arrayHelper from '../helpers/array'

const App = base.extend({
  tableName: 'apps',
  hasTimestamps: true,
  incomingActions() {
    return this.hasMany('IncomingAction')
  },
  outgoingActions() {
    return this.hasMany('OutgoingAction')
  },
}, {
  async createOne(data) {
    const app = {
      name: data.name,
      description: data.description,
    }
    const incomingActions = []
    const outgoingActions = []

		// Creates an array of incomingActions
    _.forOwn(data.incomingActions, (val) => {
      val.conditions = arrayHelper.toString(val.conditions)
      incomingActions.push(val)
    })

		// Creates an array of outgoingActions
    _.forOwn(data.outgoingActions, (val) => {
      outgoingActions.push(val)
    })

    const savedApp = await this.create(app, null)
    IncomingAction.createMany({ incomingActions, apiId: savedApp.id })
    OutgoingAction.createMany({ outgoingActions, apiId: savedApp.id })
    return savedApp
  },
  async setActive(appId) {
    const foundApp = await this.findOne({ id: appId })
    foundApp.set({ active: true })
    return this.update(foundApp.attributes)
  },
  async setInactive(appId) {
    const foundApp = await this.findOne({ id: appId })
    foundApp.set({ ative: false })
    return this.update(foundApp.attributes)
  },
  async listAll() {
    return this.collection().fetch()
  },
})

const Apps = bookshelf.Collection.extend({
  model: App,
})

export default {
  App: bookshelf.model('App', App),
  Apps: bookshelf.collection('Apps', Apps),
}
