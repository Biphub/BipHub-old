import _ from 'lodash'
import Q from 'q'
import base from './base'
import db from '../bookshelf'

const { bookshelf } = db

const IncomingActionOption = base.extend({
  tableName: 'incoming_action_options',
  outgoingActions () {
    return this.belongsTo('IncomingAction')
  }
}, {
  attributes: ['id', 'name', 'type', 'active', 'incoming_action_id'],
  /**
   * @param options
   * @param incomingActionId
   * @returns {Promise.<*>}
   */
  async createMany ({ options, incomingActionId }) {
    const fns = []
    _.forOwn(options, (option) => {
      option.incoming_action_id = incomingActionId
      fns.push(this.create(option))
    })
    return Q.all(fns)
  }
})

const IncomingActionOptions = bookshelf.Collection.extend({
  model: IncomingActionOption
})

export default {
  single: bookshelf.model('IncomingActionOption', IncomingActionOption),
  collection: bookshelf.collection('IncomingActionOptions', IncomingActionOptions)
}
