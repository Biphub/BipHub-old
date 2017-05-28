import R from 'ramda'
// TODO: Replace it with native Promise.all or bluebird.all
import Q from 'q'
import base from './base'
import db from '../bookshelf'
import models from './index'
import schemaUtils from '../bookshelf/schemaUtils'

const { bookshelf } = db
const tableName = 'actions'

const Action = base.extend({
  tableName,
  app () {
    return this.belongsTo('App')
  },
  actionFields () {
    return this.hasMany('ActionField')
  },
  actionConditions () {
    return this.hasMany('ActionCondition')
  },
  actionOptions () {
    return this.hasMany('ActionOption')
  }
}, {
  attributes: schemaUtils.getAttributes(tableName),
  /**
   * create one incoming action
   * @param action
   * @param appId
   * @returns {Promise.<boolean>}
   */
  async createOne (action, appId) {
    const newAction = R.assoc('app_id', appId, action)
    const fields = R.propOr(null, 'fields')(action)
    const options = R.propOr(null, 'options')(action)
    const conditions = R.propOr(null, 'conditions')(action)
    const result = await this.create(newAction, null)
    const actionId = result.get('id')
    const fieldsCreateResult = models.ActionField.createMany(fields, actionId)
    const optionsCreateResult = models.ActionOption.createMany(options, actionId)
    const conditionsCreateResult = models.ActionCondition.createMany(conditions, actionId)
    return fieldsCreateResult && optionsCreateResult && conditionsCreateResult
  },
  /**
   * Creates many incoming actions
   * @param actions
   * @param appId
   * @returns {Promise.<void>}
   */
  async createMany (actions, appId) {
    const forgedActions = actions.map(entity => this.createOne(entity, appId))
    Q.all(forgedActions)
  }
})

const Actions = bookshelf.Collection.extend({
  model: Action
})

export default {
  single: bookshelf.model('Action', Action),
  collection: bookshelf.collection('Actions', Actions)
}
