import base from './base'
import bookshelf from '../bookshelf'

const IncomingActionConditions = base.extend({
  tableName: 'incoming_action_conditions',
  hasTimestamp: true,
})

export default bookshelf.model('IncomingActionConditions', IncomingActionConditions)
