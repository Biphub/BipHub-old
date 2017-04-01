import _ from 'lodash'
import Q from 'q'
import base from './base'
import db from '../bookshelf'
import models from './index'

const { bookshelf } = db
const OutgoingAction = base.extend({
  tableName: 'outgoing_actions',
  /*app() {
    return this.belongsTo('App')
  },*/
  OutgoingActionFields() {
    return this.hasMany('OutgoingActionField')
  },
}, {
	/**
   * Create one outgoing action
	 * @param entity
	 * @param appId
	 */
  async createOne({ entity, appId }) {
    const fields = _.get(entity, 'fields', null)
    // Delete fields so bookshelf can save outgoing action
    if (fields) {
      delete entity.fields
    }

    entity.app_id = appId
    const outgoingAction = await this.create(entity)
    await models.OutgoingActionField.createMany({ fields, outgoingActionId: outgoingAction.get('id') })
    return true
  },
	/**
   * create many outgoing actions
	 * @param outgoingActions
	 * @param appId
	 */
  async createMany({ outgoingActions, appId }) {
    const forgedOutActions = outgoingActions.map(entity => this.createOne({ entity, appId }))
    Q.all(forgedOutActions)
  },
})

const OutgoingActions = bookshelf.Collection.extend({
  model: OutgoingAction,
})

export default {
  single: bookshelf.model('OutgoingAction', OutgoingAction),
  collection: bookshelf.collection('OutgoingActions', OutgoingActions),
}
