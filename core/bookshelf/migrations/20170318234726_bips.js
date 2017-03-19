const Q = require('q')

exports.up = function (knex) {
  return Q.allSettled([
    knex.schema.createTableIfNotExists('bips', (table) => {
      table.increments()
      table.boolean('active')
      table.string('incoming_action_condition')
      table.timestamps()
      table.integer('incoming_actions_id').references('bips.id')
      table.integer('outgoing_actions_id').references('bips.id')
    }),
    knex.schema.createTableIfNotExists('apps', (table) => {
      table.increments()
      table.string('name')
      table.string('auth_type')
      table.string('description', 128)

      table.boolean('active')
      table.timestamps()
    }),
    knex.schema.createTableIfNotExists('incoming_actions', (table) => {
      table.increments()
      table.string('type')
      table.string('endpoint')
      table.string('conditions')  // JS array serialized into an array TODO: Find a better way
      table.string('name')
      table.timestamps()
      table.integer('api_id').references('apis.id')
    }),
    knex.schema.createTableIfNotExists('outgoing_actions', (table) => {
      table.increments()
      table.string('name')
      table.timestamps()
      table.integer('api_id').references('apis.id')
    }),
  ])
}

exports.down = function (knex) {
  return Q.allSettled([
    knex.schema.dropTableIfExists('bips'),
    knex.schema.dropTableIfExists('apps'),
    knex.schema.dropTableIfExists('incoming_actions'),
    knex.schema.dropTableIfExists('outgoing_actions'),
  ])
}
