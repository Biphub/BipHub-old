import bookshelf from '../bookshelf'

const OutgoingActions = bookshelf.Model.extend({
  tableName: 'outgoing_actions',
  hasTimestamps: true,
  bip() {
    return this.belongsTo('Bips')
  },
})

export default OutgoingActions
