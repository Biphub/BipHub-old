async function createTables(connection) {
  const { knex } = connection
  await knex.schema.dropTableIfExists('bips')
  await knex.schema.createTableIfNotExists('bips', (table) => {
    table.increments()
    table.string('name')
    table.string('description', 128)
    table.string('testfield', 128)
    table.string('hmm', 128)
    table.timestamps()
  })

  await knex.schema.dropTableIfExists('incoming_actions')
  await knex.schema.createTableIfNotExists('incoming_actions', (table) => {
    table.increments()
    table.string('name')
    table.string('description', 128)
    table.timestamps()
    table.integer('bips_id').references('bips.id')
  }).then(yo => console.log(yo))
  console.log('created inc ac')

  await knex.schema.dropTableIfExists('outgoing_actions')
  await knex.schema.createTableIfNotExists('outgoing_actions', (table) => {
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
