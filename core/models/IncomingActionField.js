import _ from 'lodash'
import Q from 'q'
import base from './base'
import db from '../bookshelf'

const { bookshelf } = db
const IncomingActionField = base.extend({
  tableName: 'incoming_action_field',
  hasTimestamps: true,
  IncomingAction() {
    return this.belongsTo('IncomingAction')
  },
}, {
	/**
   * Creates many incoming actions
	 * @param fields
	 * @param incomingActionId
	 * @returns {Promise.<*>}
	 */
  async createMany({ fields, incomingActionId }) {
    const fns = []
    _.forOwn(fields, (field) => {
      field.incoming_action_id = incomingActionId
      fns.push(this.create(field))
    })
    return Q.all(fns)
  },
})

const IncomingActionFields = bookshelf.Collection.extend({
  model: IncomingActionField,
})

export default {
  single: bookshelf.model('IncomingActionField', IncomingActionField),
  collection: bookshelf.collection('IncomingActionFields', IncomingActionFields),
}
