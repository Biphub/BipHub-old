import _ from 'lodash'
import Q from 'q'
import base from './base'
import db from '../bookshelf'
import schemaUtils from '../bookshelf/schemaUtils'

const { bookshelf } = db
const tableName = 'incoming_action_options'

const ActionOption = base.extend({
  tableName,
  actions () {
    return this.belongsTo('Action')
  }
}, {
  attributes: schemaUtils.getAttributes(tableName),
  /**
   * @param options
   * @param actionId
   * @returns {Promise.<*>}
   */
  async createMany ({ options, actionId }) {
    const fns = []
    _.forOwn(options, (option) => {
      option.action_id = actionId
      fns.push(this.create(option))
    })
    return Q.all(fns)
  }
})

const ActionOptions = bookshelf.Collection.extend({
  model: ActionOption
})

export default {
  single: bookshelf.model('ActionOption', ActionOption),
  collection: bookshelf.collection('ActionOptions', ActionOptions)
}
