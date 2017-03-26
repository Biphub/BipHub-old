import _ from 'lodash'
import Q from 'q'
import base from './base'
import db from '../bookshelf'
import models from './index'

const { bookshelf } = db
const IncomingAction = base.extend({
  tableName: 'incoming_actions',
  hasTimestamps: true,
  app() {
    return this.belongsTo('App')
  },
  incomingActionsFields() {
    return this.hasMany('IncomingActionField')
  },
}, {
  async createOne({ entity, appId }) {
    const fields = _.get(entity, 'fields', null)

    // Delete fields from the entity
    if (fields) {
      delete entity.fields
    }
    entity.app_id = appId
    const incAction = await this.create(entity, null)
    await models.IncomingActionField.createMany({ fields, incomingActionId: incAction.get('id') })
    return true
  },
  async createMany({ incomingActions, appId }) {
    const forgedIncActions = incomingActions.map(entity => this.createOne({ entity, appId }))
    Q.all(forgedIncActions)
  },
  findByEndPoint(endPoint, action) {
    const endPointVariation = `/${endPoint}`
    const actionVariation = `/${action}`
    return this.findOne({ endPoint: endPointVariation, action: actionVariation })
  },
})

const IncomingActions = bookshelf.Collection.extend({
  model: IncomingAction,
})

export default {
  single: bookshelf.model('IncomingAction', IncomingAction),
  collection: bookshelf.collection('IncomingActions', IncomingActions),
}
