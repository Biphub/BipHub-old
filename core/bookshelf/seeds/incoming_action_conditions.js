let incomingActionConditionsFixture = require('./fixtures/incoming_action_conditions_fixture').default

exports.seed = function (knex) {
  return knex('incoming_action_conditions').del()
    .then(() => {
      incomingActionConditionsFixture = incomingActionConditionsFixture.map(
        (item) => {
          const payload = item.condition_payload
          item.condition_payload = JSON.stringify(payload)
          return item
        })
      return knex('incoming_action_conditions').insert(incomingActionConditionsFixture)
    })
}
