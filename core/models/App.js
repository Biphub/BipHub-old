import base from './base'
import db from '../bookshelf'
import models from './index'
import collectionHelper from '../helpers/collection'
import schemaUtils from '../bookshelf/schemaUtils'

const { bookshelf } = db
const tableName = 'apps'
const App = base.extend({
  tableName,
	/**
   * get incoming actions
	 * @returns {*|Collection}
	 */
  incomingActions () {
    return this.hasMany(models.IncomingAction)
  },
	/**
   * get outgoing actions
	 * @returns {*|Collection}
	 */
  outgoingActions () {
    return this.hasMany(models.OutgoingAction)
  }
}, {
  attributes: schemaUtils.getAttributes(tableName),
	/**
   * Register an app
   * It prevents users from registering duplicate app
	 * @param appData
	 * @returns {Promise.<*>}
	 */
  async createOne (appData) {
    const foundApp = await this.findOne({ name: appData.name })
    // Do not register already existing app
    if (foundApp) {
      return foundApp
    }
    const incomingActions = collectionHelper.flatForOwn(appData.incomingActions)
    const outgoingActions = collectionHelper.flatForOwn(appData.outgoingActions)

    const savedApp = await this.create(appData, null)
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
  async registerAppActions ({ incomingActions, outgoingActions, appId }) {
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
  async setActive ({ appId, active }) {
    const foundApp = await this.findOne({ id: appId })
    foundApp.set({ active })
    return this.update(foundApp.attributes)
  }
})

const Apps = bookshelf.Collection.extend({
  model: App
})

export default {
  single: bookshelf.model('App', App),
  collection: bookshelf.collection('Apps', Apps)
}
