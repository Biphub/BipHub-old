import Bookshelf from 'bookshelf'
import connection from '../data/db/connection'

const bookshelfInstance = Bookshelf(connection)

const Bip = bookshelfInstance.Model.extend({
  tableName: 'bips',
})

export default Bip
