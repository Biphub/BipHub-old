import db from './db/connection'
import schema from './schema'

const connection = db()
schema.createTables(connection)
console.log('outside now!')

export default connection.bookshelf
