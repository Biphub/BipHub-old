import base from './base'
import db from '../bookshelf'
import schemaUtils from '../bookshelf/schemaUtils'

const { bookshelf } = db
const tableName = 'incoming_action_conditions'

const IncomingActionCondition = base.extend({
  tableName
}, {
  attributes: schemaUtils.getAttributes(tableName)
})

const IncomingActionConditions = bookshelf.Collection.extend({
  model: IncomingActionCondition
})

export default {
  single: bookshelf.model('IncomingActionCondition', IncomingActionCondition),
  collection: bookshelf.collection('IncomingActionConditions', IncomingActionConditions)
}
