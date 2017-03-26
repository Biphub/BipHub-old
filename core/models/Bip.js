import base from './base'
import db from '../bookshelf'

const { bookshelf } = db
const Bip = base.extend({
  tableName: 'bips',
  hasTimestamps: true,
  incomingAction() {
    return this.belongsTo('IncomingAction')
  },
  outgoingAction() {
    return this.belongsTo('OutgoingAction')
  },
})

const Bips = bookshelf.Collection.extend({
  model: Bip,
})

export default {
  single: bookshelf.model('Bip', Bip),
  collection: bookshelf.collection('Bips', Bips),
}
