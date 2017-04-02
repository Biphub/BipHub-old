import _ from 'lodash'
import Q from 'q'
import base from './base'
import db from '../bookshelf'

const { bookshelf } = db

const OutgoingActionOption = base.extend({
  tableName: 'outgoing_action_options',
  outgoingActions() {
    return this.belongsTo('OutgoingAction')
  },
}, {
  attributes: ['id', 'name', 'type', 'active', 'outgoing_action_id'],
  /**
   *
   * @param options
   * @param outgoingActionId
   * @returns {Promise.<*>}
   */
  async createMany({ options, outgoingActionId }) {
    const fns = []
    _.forOwn(options, (option) => {
      option.outgoing_action_id = outgoingActionId
      fns.push(this.create(option))
    })
    return Q.all(fns)
  },
})

const OutgoingActionOptions = bookshelf.Collection.extend({
  model: OutgoingActionOption,
})

export default {
  single: bookshelf.model('OutgoingActionOption', OutgoingActionOption),
  collection: bookshelf.collection('OutgoingActionOptions', OutgoingActionOptions),
}
