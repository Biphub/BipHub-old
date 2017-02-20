import connection from '../db/connection'

async function createTable() {
  connection.knex.schema.createTableIfNotExists('bips', (table) => {
    table.increments()
    table.string('name')
    table.string('description', 128)
    table.timestamps()
  }).then(() => Promise.resolve())
  return Promise.reject()
}

export default {
  createTable,
}
