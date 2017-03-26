import Q from 'q'

exports.up = function (knex) {
  return Q.allSettled([
    knex.schema.createTableIfNotExists('bip_fields_map', (table) => {
      table.increments()
      table.boolean('active')
      table.timestamps()
      table.integer('bip_id').references('bips.id')
      table.integer('incoming_action_field_id').references('incoming_action_field.id')
      table.integer('outgoing_action_field_id').references('outgoing_action_field.id')
    }),
  ])
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('bip_fields_map')
}
