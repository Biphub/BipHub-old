import _ from 'lodash'
import Q from 'q'
import base from './base'
import db from '../bookshelf'

const { bookshelf } = db
const OutgoingActionField = base.extend({
  tableName: 'outgoing_action_fields',
  outgoingAction() {
    return this.belongsTo('OutgoingAction')
  },
}, {
  attributes: ['id', 'name', 'type', 'incoming_action_id'],
	/**
   * Creates many outgoing action
	 * @param fields
	 * @param outgoingActionId
	 * @returns {Promise.<*>}
	 */
  async createMany({ fields, outgoingActionId }) {
    const fns = []
    _.forOwn(fields, (field) => {
      field.outgoing_action_id = outgoingActionId
      fns.push(this.create(field))
    })
    return Q.all(fns)
  },
})

const OutgoingActionFields = bookshelf.Collection.extend({
  model: OutgoingActionField,
})

export default {
  single: bookshelf.model('OutgoingActionField', OutgoingActionField),
  collection: bookshelf.collection('OutgoingActionFields', OutgoingActionFields),
}
