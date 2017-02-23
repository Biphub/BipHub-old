import base from './base'

const IncomingAction = base.extend({
  tableName: 'incoming_actions',
  hasTimestamps: true,
  bip() {
    return this.belongsTo('Bips')
  },
})

export default IncomingAction
