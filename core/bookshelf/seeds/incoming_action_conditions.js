const incomingActionConditionsFixture = require('./fixtures/incoming_action_conditions_fixture').default

exports.seed = function (knex) {
  return knex('incoming_action_conditions').del()
    .then(() => knex('incoming_action_conditions').insert(incomingActionConditionsFixture))
}
