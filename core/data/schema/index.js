async function createTables(connection) {
  const { knex } = connection
  await knex.schema.dropTableIfExists('Bips')
  await knex.schema.createTable('Bips', (table) => {
    table.increments()
    table.string('name')
    table.string('description', 128)
    table.timestamps()
  })

  await knex.schema.dropTableIfExists('IncomingActions')
  await knex.schema.createTable('IncomingActions', (table) => {
    table.increments()
    table.string('name')
    table.string('description', 128)
    table.timestamps()
  }).then(yo => console.log(yo))
  console.log('created inc ac')

  await knex.schema.dropTableIfExists('OutgoingActions')
  await knex.schema.createTable('OutgoingActions', (table) => {
    table.increments()
    table.string('name')
    table.timestamps()
  }).then(yo => console.log(yo))
  console.log('created outgoing')
}

export default {
  createTables,
}
