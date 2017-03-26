const fixtures = require('./fixtures/outgoing_action_field_fixture').default

exports.seed = function (knex) {
  return knex('outgoing_action_field').del()
    .then(() => knex('outgoing_action_field').insert(fixtures))
}
