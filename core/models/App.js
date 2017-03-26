import _ from 'lodash'
import base from './base'
import db from '../bookshelf'
import models from './index'
import arrayHelper from '../helpers/array'

const { bookshelf } = db
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
  // Register an app
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
    models.IncomingAction.createMany({ incomingActions, appId: savedApp.id })
    // models.OutgoingAction.createMany({ outgoingActions, appId: savedApp.id })
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
  single: bookshelf.model('App', App),
  collection: bookshelf.collection('Apps', Apps),
}
