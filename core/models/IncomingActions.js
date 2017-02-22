function createModel(bookshelf) {
  const IncomingActions = bookshelf.Model.extend({
    tableName: 'incoming_actions',
    hasTimestamps: true,
    bip() {
      return this.belongsTo('Bips')
    },
  })
  return IncomingActions
}

export default createModel
