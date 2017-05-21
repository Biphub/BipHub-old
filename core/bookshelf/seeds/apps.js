const fixtures = require('./fixtures/apps_fixture').default

exports.seed = function (knex) {
  return knex('apps').del()
		.then(() => knex('apps').insert(fixtures))
}
