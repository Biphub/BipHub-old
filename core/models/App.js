import _ from 'lodash'
import base from './base'
import db from '../bookshelf'
import models from './index'
import arrayHelper from '../helpers/array'

const { bookshelf } = db
const App = base.extend({
  tableName: 'apps',
  hasTimestamps: true,
	/**
   * get incoming actions
	 * @returns {*|Collection}
	 */
  incomingActions() {
    return this.hasMany('IncomingAction')
  },
	/**
   * get outgoing actions
	 * @returns {*|Collection}
	 */
  outgoingActions() {
    return this.hasMany('OutgoingAction')
  },
}, {
	/**
   * Register an app
   * It prevents users from registering duplicate app
	 * @param data
	 * @returns {Promise.<*>}
	 */
  async createOne(data) {
    const app = {
      name: data.name,
      description: data.description,
    }
    const foundApp = await this.findOne({ name: app.name })
    // Do not register already existing app
    if (foundApp) {
      return foundApp
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
    await this.registerAppActions({ incomingActions, outgoingActions, appId: savedApp.id })
    return savedApp
  },
	/**
   * Register app's incoming and outgoing actions
	 * @param incomingActions
	 * @param outgoingActions
	 * @param appId
	 * @returns {Promise.<*|Promise|Promise.<*>|Promise.<void>>}
	 */
  async registerAppActions({ incomingActions, outgoingActions, appId }) {
    const incCreateResult = await models.IncomingAction.createMany({ incomingActions, appId })
    const outCreateResult = await models.OutgoingAction.createMany({ outgoingActions, appId })
    return incCreateResult && outCreateResult
  },
	/**
   * set active of app
	 * @param appId
	 * @param active
	 * @returns {Promise.<void>}
	 */
  async setActive({ appId, active }) {
    const foundApp = await this.findOne({ id: appId })
    foundApp.set({ active })
    return this.update(foundApp.attributes)
  },
})

const Apps = bookshelf.Collection.extend({
  model: App,
})

export default {
  single: bookshelf.model('App', App),
  collection: bookshelf.collection('Apps', Apps),
}
