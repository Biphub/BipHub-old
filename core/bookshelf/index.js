import db from './db/connection'

const connection = db(() => {

})
// schema.createTables(connection)

/*
setTimeout(() => {
  seed.seedDB()
}, 1500)
*/

export default connection.bookshelf
