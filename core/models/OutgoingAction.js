import _ from 'lodash'
import Q from 'q'
import base from './base'
import db from '../bookshelf'
import models from './index'
import schemaUtils from '../bookshelf/schemaUtils'

const { bookshelf } = db
const tableName = 'outgoing_actions'

const OutgoingAction = base.extend({
  tableName,
  app () {
    return this.belongsTo('App')
  },
  OutgoingActionFields () {
    return this.hasMany('OutgoingActionField')
  }
}, {
  attributes: schemaUtils.getAttributes(tableName),
	/**
   * Create one outgoing action
	 * @param entity
	 * @param appId
	 */
  async createOne ({ entity, appId }) {
    const fields = _.get(entity, 'fields', null)
    const options = _.get(entity, 'options', null)
    entity.app_id = appId
    const outgoingAction = await this.create(entity)
    const outgoingActionId = outgoingAction.get('id')
    const fieldResult = await models.OutgoingActionField.createMany({ fields, outgoingActionId })
    const optionsResult = await models.OutgoingActionOption.createMany({ options, outgoingActionId })
    return fieldResult && optionsResult
  },
	/**
   * create many outgoing actions
	 * @param outgoingActions
	 * @param appId
	 */
  async createMany ({ outgoingActions, appId }) {
    const forgedOutActions = outgoingActions.map(entity => this.createOne({ entity, appId }))
    Q.all(forgedOutActions)
  }
})

const OutgoingActions = bookshelf.Collection.extend({
  model: OutgoingAction
})

export default {
  single: bookshelf.model('OutgoingAction', OutgoingAction),
  collection: bookshelf.collection('OutgoingActions', OutgoingActions)
}
