const fixtures = require('./fixtures/incoming_action_field_fixture').default

exports.seed = function (knex) {
  return knex('incoming_action_field').del()
    .then(() => knex('table_name').insert(fixtures))
}
