import db from './db/connection'
import schema from './schema'

function init() {
  const connection = db()
  schema.createTables(connection)
  return connection
}

export default init()
