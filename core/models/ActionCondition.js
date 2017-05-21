import base from './base'
import db from '../bookshelf'
import schemaUtils from '../bookshelf/schemaUtils'

const { bookshelf } = db
const tableName = 'action_conditions'

const ActionCondition = base.extend({
  tableName
}, {
  attributes: schemaUtils.getAttributes(tableName)
})

const ActionConditions = bookshelf.Collection.extend({
  model: ActionCondition
})

export default {
  single: bookshelf.model('ActionCondition', ActionCondition),
  collection: bookshelf.collection('ActionConditions', ActionConditions)
}
