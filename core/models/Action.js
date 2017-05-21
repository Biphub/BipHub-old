import _ from 'lodash'
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
  actionsFields () {
    return this.hasMany('ActionField')
  }
}, {
  attributes: schemaUtils.getAttributes(tableName),
  /**
   * create one incoming action
   * @param entity
   * @param appId
   * @returns {Promise.<boolean>}
   */
  async createOne ({ entity, appId }) {
    const fields = _.get(entity, 'fields', null)
    const options = _.get(entity, 'options', null)
    entity.app_id = appId
    const incAction = await this.create(entity, null)
    const incomingActionId = incAction.get('id')
    const fieldsCreateResult =
      await models.IncomingActionField.createMany({ fields, incomingActionId })
    const optionsCreateResult =
      await models.IncomingActionOption.createMany({ options, incomingActionId })

    return fieldsCreateResult && optionsCreateResult
  },
  /**
   * Creates many incoming actions
   * @param actions
   * @param appId
   * @returns {Promise.<void>}
   */
  async createMany ({ actions, appId }) {
    const forgedActions = actions.map(entity => this.createOne({ entity, appId }))
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
