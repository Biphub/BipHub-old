import Q from 'q'
import connection from '../db/connection'
import root from '../../helpers/root'

function createTables() {
  const { knex } = connection()

  // If schema is already built, do not build it again.
  if (typeof root.schemaFinished !== 'undefined') { return false }

  // TODO: Implement migration
  Q.allSettled([
    knex.schema.dropTableIfExists('bips'),
    knex.schema.createTableIfNotExists('bips', (table) => {
      table.increments()
      table.string('conditions')  // JS array serialized into an array TODO: Find a better way
      table.boolean('active')
      table.timestamps()
      table.integer('incoming_actions_id').references('bips.id')
      table.integer('outgoing_actions_id').references('bips.id')
    }),
    knex.schema.dropTableIfExists('apps'),
    knex.schema.createTableIfNotExists('apps', (table) => {
      table.increments()
      table.string('name')
      table.string('auth_type')
      table.string('description', 128)

      table.boolean('active')
      table.timestamps()
    }),
    knex.schema.dropTableIfExists('incoming_actions'),
    knex.schema.createTableIfNotExists('incoming_actions', (table) => {
      table.increments()
      table.string('type')
      table.string('endpoint')
      table.string('name')
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
  root.schemaFinished = true
  return true
}

export default {
  createTables,
}
