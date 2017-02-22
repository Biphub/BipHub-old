
function createModel(bookshelf) {
  const OutgoingActions = bookshelf.Model.extend({
    tableName: 'outgoing_actions',
    hasTimestamps: true,
    bip() {
      return this.belongsTo('Bips')
    },
  })
  return OutgoingActions
}

export default createModel
