import connection from '../db/connection'

const createTable = () => new Promise((resolve, reject) => {
  connection.knex.schema.createTableIfNotExists('bips', (table) => {
    table.increments()
    table.string('name')
    table.string('description', 128)
    table.timestamps()
  }).then(() => resolve())
  return reject()
})

export default {
  createTable,
}
