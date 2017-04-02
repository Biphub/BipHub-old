const Q = require('q')

exports.up = function (knex) {
  return Q.allSettled([
    knex.schema.createTableIfNotExists('apps', (table) => {
      table.increments()
      table.string('name')
      table.string('auth_type')
      table.string('description', 128)
      table.boolean('active')
      table.timestamps()
    }),
    // Bip represents a integration between two apps
    knex.schema.createTableIfNotExists('bips', (table) => {
      table.increments()
      table.boolean('active')
      // Contains options
      /**
       * Example of payload after message received
       * { data: 'tests',
          meta:
           { type: 'webhook/ws',
             name: 'message',
             conditions: [ 'matches', 'contains' ],
             fields: { content: [Object] },
             options: { channel: [Object] } } }

       */
      // Below jsonb field represents actual bip and its values
      // IncomingActionField and IncomingActionOptions, they represents schema
      // which will be used for frontend UI
      // Example: ['matches']
      table.jsonb('incoming_action_conditions_values')
      // Example: [{ channelName: 'general' }]
      table.jsonb('incoming_action_options_values')
      // Example: [{ channelName: 'everyone' }]
      table.jsonb('outgoing_action_options_values')
      // Mapping between fields
      // [0] incoming action field id, [1] outgoing action field id
      // Example: [{ [1,2], [3,4] }]
      table.jsonb('fields_mapping')
      table.timestamps()
      table.integer('incoming_action_condition_id').references('incoming_action_conditions.id')
      table.integer('incoming_actions_id').references('incoming_actions.id')
      table.integer('outgoing_actions_id').references('outgoing_actions.id')
    }),
    knex.schema.createTableIfNotExists('incoming_actions', (table) => {
      table.increments()
      table.string('type')
      table.string('endpoint')
      table.jsonb('conditions')  // JS array serialized into an array TODO: Find a better way
      table.string('name')
      table.timestamps()
      table.integer('app_id').references('apps.id')
    }),
    knex.schema.createTableIfNotExists('incoming_action_conditions', (table) => {
      table.increments()
      table.boolean('active')
      table.string('name')
      table.jsonb('condition_payload')
      table.timestamps()
      table.integer('incoming_action_id').references('incoming_actions.id')
    }),
    knex.schema.createTableIfNotExists('outgoing_actions', (table) => {
      table.increments()
      table.string('type')
      table.string('name')
      table.timestamps()
      table.integer('app_id').references('apps.id')
    }),
    knex.schema.createTableIfNotExists('incoming_action_fields', (table) => {
      table.increments()
      table.string('name')
      table.string('type')
      table.timestamps()
      table.integer('incoming_action_id').references('incoming_actions.id')
    }),
    knex.schema.createTableIfNotExists('outgoing_action_fields', (table) => {
      table.increments()
      table.string('name')
      table.string('type')
      table.timestamps()
      table.integer('outgoing_action_id').references('ougoing_actions.id')
    }),
    knex.schema.createTableIfNotExists('incoming_action_options', (table) => {
      table.increments()
      table.string('name')
      table.string('type')
      table.boolean('active')
      table.integer('incoming_action_id').references('incoming_actions.id')
    }),
    knex.schema.createTableIfNotExists('outgoing_action_options', (table) => {
      table.increments()
      table.string('name')
      table.string('type')
      table.boolean('active')
      table.integer('outgoing_action_id').references('outgoing_actions.id')
    }),
  ])
}

exports.down = function (knex) {
  return Q.allSettled([
    knex.schema.dropTableIfExists('bips'),
    knex.schema.dropTableIfExists('apps'),
    knex.schema.dropTableIfExists('incoming_actions'),
    knex.schema.dropTableIfExists('outgoing_actions'),
    knex.schema.dropTableIfExists('incoming_action_condition'),
    knex.schema.dropTableIfExists('incoming_action_fields'),
    knex.schema.dropTableIfExists('outgoing_action_fields'),
    knex.schema.dropTableIfExists('incoming_action_options'),
    knex.schema.dropTableIfExists('outgoing_action_options'),
  ])
}
