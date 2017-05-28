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
  async createMany (fields, actionId) {
    // TODO: Below code is redundant, move it to the base model
    console.log('creating many action conditions ', fields, '  act id ', actionId)
    return R.compose(
      (fns) => fns ? Q.all(fns) : null,
      R.map(x => this.create(x)),
      R.values,
      R.map(R.assoc('action_id', actionId))
    )(fields)
  }
})

const ActionConditions = bookshelf.Collection.extend({
  model: ActionCondition
})

export default {
  single: bookshelf.model('ActionCondition', ActionCondition),
  collection: bookshelf.collection('ActionConditions', ActionConditions)
}
