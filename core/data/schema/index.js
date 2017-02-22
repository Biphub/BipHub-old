async function createTables(connection) {
  const { knex } = connection
  await knex.schema.dropTableIfExists('bips')
  await knex.schema.createTable('bips', (table) => {
    table.increments()
    table.string('name')
    table.string('description', 128)
    table.timestamps()
  })

  await knex.schema.dropTableIfExists('incoming_actions')
  await knex.schema.createTable('incoming_actions', (table) => {
    table.increments()
    table.string('name')
    table.string('description', 128)
    table.timestamps()
		table.integer('bips_id').references('bips.id')
  }).then(yo => console.log(yo))
  console.log('created inc ac')

  await knex.schema.dropTableIfExists('outgoing_actions')
  await knex.schema.createTable('outgoing_actions', (table) => {
    table.increments()
    table.string('name')
    table.timestamps()
		table.integer('bips_id').references('bips.id')
  }).then(yo => console.log(yo))
  console.log('created outgoing')
}

export default {
  createTables,
}
