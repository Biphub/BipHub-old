import _ from 'lodash'
import Q from 'q'
import base from './base'
import db from '../bookshelf'
import schemaUtils from '../bookshelf/schemaUtils'

const { bookshelf } = db
const tableName = 'incoming_action_options'

const IncomingActionOption = base.extend({
  tableName,
  outgoingActions () {
    return this.belongsTo('IncomingAction')
  }
}, {
  attributes: schemaUtils.getAttributes(tableName),
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
