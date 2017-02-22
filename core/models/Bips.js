function createModel(bookshelf) {
  const Bips = bookshelf.Model.extend({
    tableName: 'bips',
    hasTimestamps: true,
  })
  return Bips
}

export default createModel
