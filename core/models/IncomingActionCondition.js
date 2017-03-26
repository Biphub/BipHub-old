import base from './base'
import bookshelf from '../bookshelf'

const IncomingActionCondition = base.extend({
  tableName: 'incoming_action_conditions',
  hasTimestamp: true,
})

const IncomingActionConditions = bookshelf.Collection.extend({
  model: IncomingActionCondition,
})

export default {
  single: bookshelf.model('IncomingActionCondition', IncomingActionCondition),
  collection: bookshelf.collection('IncomingActionConditions', IncomingActionConditions),
}
