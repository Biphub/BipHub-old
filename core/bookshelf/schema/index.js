import Q from 'q'
import connection from '../db/connection'

function createTables() {
  const { knex } = connection()

  // If schema is already built, do not build it again.
  if (typeof global.schemaFinished !== 'undefined') { return false }

  // TODO: Implement migration
  Q.allSettled([
    knex.schema.dropTableIfExists('apis'),
    knex.schema.createTableIfNotExists('apis', (table) => {
      table.increments()
      table.string('name')
      table.string('description', 128)
      table.boolean('active')
      table.timestamps()
    }),
    knex.schema.dropTableIfExists('incoming_actions'),
    knex.schema.createTableIfNotExists('incoming_actions', (table) => {
      table.increments()
      table.string('type')
      table.string('endpoint')
      table.string('action')
      table.timestamps()
      table.integer('api_id').references('apis.id')
    }),
    knex.schema.dropTableIfExists('outgoing_actions'),
    knex.schema.createTableIfNotExists('outgoing_actions', (table) => {
      table.increments()
      table.string('name')
      table.timestamps()
      table.integer('api_id').references('apis.id')
    }),
  ])
  global.schemaFinished = true
  return true
}

export default {
  createTables,
}
