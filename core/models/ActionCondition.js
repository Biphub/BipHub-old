import R from 'ramda'
import Q from 'q'
import base from './base'
import db from '../bookshelf'
import schemaUtils from '../bookshelf/schemaUtils'

const { bookshelf } = db
const tableName = 'action_conditions'

const ActionCondition = base.extend({
  tableName
}, {
  attributes: schemaUtils.getAttributes(tableName),
  /**
   * Creates many incoming actions
   * @param fields
   * @param actionId
   * @returns {Promise.<*>}
   */
  async createMany (conditions, actionId) {
    // TODO: Below code is redundant, move it to the base model
    if (conditions && actionId) {
      return R.compose(
        (fns) => Q.all(fns),
        R.map(x => this.create(x)),
        R.values,
        R.map(R.assoc('active', true)),
        R.map(R.assoc('action_id', actionId))
      )(conditions)
    }
    return null
  }
})

const ActionConditions = bookshelf.Collection.extend({
  model: ActionCondition
})

export default {
  single: bookshelf.model('ActionCondition', ActionCondition),
  collection: bookshelf.collection('ActionConditions', ActionConditions)
}
