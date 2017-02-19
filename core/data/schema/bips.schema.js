import connection from '../db/connection'

const createTable = () => {
  connection.knex.schema.createTable('bips', (table) => {
    console.log('creating table ', table)
    table.increments()
    table.string('name')
    table.string('description', 128)
  })
  console.log('yyoyoyoyo created bips table')
}

export default {
  createTable,
}
