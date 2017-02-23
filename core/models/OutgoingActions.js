import base from './base'

const OutgoingActions = base.extend({
  tableName: 'outgoing_actions',
  hasTimestamps: true,
  bip() {
    return this.belongsTo('Bips')
  },
})

export default OutgoingActions
