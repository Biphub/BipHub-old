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
  OutgoingActionField: bookshelf.model('OutgoingActionField', OutgoingActionField),
  OutgoingActionFields: bookshelf.collection('OutgoingActionFields', OutgoingActionFields),
}
