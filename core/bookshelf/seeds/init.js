const Q = require('q')
const appFixture = require('./fixtures/apps_fixture')
const bipFixture = require('./fixtures/bips_fixture')

exports.seed = function (knex) {
  return Q.allSettled([
    knex('apps').del()
      .then(() => knex('apps').insert(appFixture)),
    knex('bips').del()
      .then(() => knex('bips').insert(bipFixture)),
  ])
}
