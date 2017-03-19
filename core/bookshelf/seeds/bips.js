const bipsFixture = require('./fixtures/bips_fixture').default

exports.seed = function (knex) {
  return knex('bips').del()
		.then(() => knex('bips').insert(bipsFixture))
}
