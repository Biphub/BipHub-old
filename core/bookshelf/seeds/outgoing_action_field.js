const fixtures = require('./fixtures/outgoing_action_field_fixture').default

exports.seed = function (knex) {
  return knex('table_name').del()
    .then(() => knex('table_name').insert(fixtures))
}
