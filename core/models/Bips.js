import bookshelf from '../bookshelf'

const Bips = bookshelf.Model.extend({
  tableName: 'bips',
  hasTimestamps: true,
})

export default Bips
