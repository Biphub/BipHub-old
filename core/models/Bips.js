function createModel(bookshelf) {
  const Bips = bookshelf.Model.extend({
    tableName: 'Bips',
    hasTimestamps: true,
  })
  return Bips
}

export default createModel
