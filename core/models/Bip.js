import base from './base'
import db from '../bookshelf'

const { bookshelf } = db
const Bip = base.extend({
  tableName: 'bips',
  attributes: [],
  incomingAction () {
    return this.belongsTo('IncomingAction')
  },
  outgoingAction () {
    return this.belongsTo('OutgoingAction')
  }
}, {
  attributes: [
    'id', 'active', 'incoming_action_options_values',
    'outgoing_action_options_values', 'incoming_action_fields_values',
    'outgoing_action_fields_values', 'fields_mapping', 'incoming_action_condition_id',
    'incoming_actions_id', 'outgoing_actions_id']
})

const Bips = bookshelf.Collection.extend({
  model: Bip
})

export default {
  single: bookshelf.model('Bip', Bip),
  collection: bookshelf.collection('Bips', Bips)
}
