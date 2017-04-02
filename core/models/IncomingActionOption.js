import base from './base'
import db from '../bookshelf'

const { bookshelf } = db

const IncomingActionOption = base.extend({
  tableName: 'outgoing_action_options',
  outgoingActions() {
    return this.belongsTo('IncomingAction')
  },
}, {
  attributes: ['id', 'name', 'type', 'active', 'outgoing_action_id'],
})

const IncomingActionOptions = bookshelf.Collection.extend({
  model: IncomingActionOption,
})

export default {
  single: bookshelf.model('IncomingActionOption', IncomingActionOption),
  collection: bookshelf.collection('IncomingActionOptions', IncomingActionOptions),
}
