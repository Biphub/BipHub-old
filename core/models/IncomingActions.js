import bookshelf from '../bookshelf'

const IncomingActions = bookshelf.Model.extend({
  tableName: 'incoming_actions',
  hasTimestamps: true,
  bip() {
    return this.belongsTo('Bips')
  },
})

export default IncomingActions
