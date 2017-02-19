import connection from '../data/db/connection'

const Bips = connection.bookshelf.Model.extend({
  tableName: 'bips',
  hasTimestamps: true,

})

export default Bips
