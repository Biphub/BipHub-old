import db from './db/connection'
import schema from './schema'

async function init() {
  const connection = db()
  await schema.createTables(connection)
  return connection.bookshelf
}

export default init
