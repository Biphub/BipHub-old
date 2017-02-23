import base from './base'

const IncomingActions = base.extend({
  tableName: 'incoming_actions',
  hasTimestamps: true,
  bip() {
    return this.belongsTo('Bips')
  },
})

export default IncomingActions
