import db from './db/connection'
import schema from './schema'
import seed from './seed'

const connection = db(() => {

})
// schema.createTables(connection)

/*
setTimeout(() => {
  seed.seedDB()
}, 1500)
*/

export default connection.bookshelf
