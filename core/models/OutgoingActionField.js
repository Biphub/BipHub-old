import base from './base'
import bookshelf from '../bookshelf'

const OutgoingActionField = base.extend({
  tableName: 'outgoing_action_field',
  hasTimestamps: true,
  outgoingAction() {
    return this.belongsTo('OutgoingAction')
  },
})

const OutgoingActionFields = bookshelf.Collection.extend({
  model: OutgoingActionField,
})

export default {
  single: bookshelf.model('OutgoingActionField', OutgoingActionField),
  collection: bookshelf.collection('OutgoingActionFields', OutgoingActionFields),
}
