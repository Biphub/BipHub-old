import connection from '../db/connection'

const createTable = () => {
  connection.knex.schema.createTableIfNotExists('bips', (table) => {
    table.increments()
    table.string('name')
    table.string('description', 128)
		table.timestamps()
  }).then(data => {
    console.log('result')
  })
}

export default {
  createTable,
}
