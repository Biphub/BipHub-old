function createModel(bookshelf) {
  const IncomingActions = bookshelf.Model.extend({
    tableName: 'IncomingActions',
    hasTimestamps: true,
  })
  return IncomingActions
}

export default createModel
