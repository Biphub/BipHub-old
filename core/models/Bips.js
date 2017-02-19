import connection from '../data/db/connection'

const Bips = connection.bookshelf.Model.extend({
  tableName: 'bips',
  hasTimestamps: true,

}, {
  byEmail: function(email) {
    return this.forge().query({ where: { email } }).fetch()
  },
})

export default Bips
