import Q from 'q'
import connection from '../db/connection'

function createTables() {
  const { knex } = connection()

  // If schema is already built, do not build it again.
  if (typeof global.schemaFinished !== 'undefined') { return false }

  Q.allSettled([
    knex.schema.dropTableIfExists('bips'),
    knex.schema.createTableIfNotExists('bips', (table) => {
      table.increments()
      table.string('name')
      table.string('description', 128)
      table.timestamps()
    }),
    knex.schema.dropTableIfExists('incoming_actions'),
    knex.schema.createTableIfNotExists('incoming_actions', (table) => {
      table.increments()
      table.string('name')
      table.string('type')
      table.string('endpoint')
      table.timestamps()
      table.integer('bips_id').references('bips.id')
    }),
    knex.schema.dropTableIfExists('outgoing_actions'),
    knex.schema.createTableIfNotExists('outgoing_actions', (table) => {
      table.increments()
      table.string('name')
      table.timestamps()
      table.integer('bips_id').references('bips.id')
    }),
  ])
  global.schemaFinished = true
  return true
}

export default {
  createTables,
}
