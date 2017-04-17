import Q from 'q'
import schema from '../schema'
import schemaBuilder from '../schemaBuilder'

exports.up = function (knex) {
  const forgedSchema = schemaBuilder.buildSchema({ knex, schema })
  return Q.allSettled(forgedSchema)
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
    knex.schema.dropTableIfExists('outgoing_action_options')
  ])
}
