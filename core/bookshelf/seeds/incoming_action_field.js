const fixtures = require('./fixtures/incoming_action_field_fixture').default;

exports.seed = function (knex) {
  return knex('incoming_action_field').del()
    .then(() => knex('incoming_action_field').insert(fixtures));
};
