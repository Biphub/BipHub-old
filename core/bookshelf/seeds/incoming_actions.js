const incActionFixtures = require('./fixtures/incoming_actions_fixture').default

exports.seed = function (knex) {
  return knex('incoming_actions').del()
		.then(() => knex('incoming_actions').insert(incActionFixtures))
}
