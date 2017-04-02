import base from './base'
import db from '../bookshelf'

const { bookshelf } = db

const OutgoingActionOption = base.extend({
  tableName: 'outgoing_action_options',
  outgoingActions() {
    return this.belongsTo('OutgoingAction')
  },
}, {
  attributes: ['id', 'name', 'type', 'active', 'outgoing_action_id'],
})

const OutgoingActionOptions = bookshelf.Collection.extend({
  model: OutgoingActionOption,
})

export default {
  single: bookshelf.model('OutgoingActionOption', OutgoingActionOption),
  collection: bookshelf.collection('OutgoingActionOptions', OutgoingActionOptions),
}
