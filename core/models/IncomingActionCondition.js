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
  IncomingActionCondition: bookshelf.model('IncomingActionCondition', IncomingActionCondition),
  IncomingActionConditions: bookshelf.collection('IncomingActionConditions', IncomingActionConditions),
}
