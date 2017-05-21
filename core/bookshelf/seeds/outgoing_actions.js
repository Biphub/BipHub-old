const outgoingActionsFixture = require('./fixtures/outgoing_actions_fixture').default

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('outgoing_actions').del()
    .then(() => knex('outgoing_actions').insert(outgoingActionsFixture))
}
