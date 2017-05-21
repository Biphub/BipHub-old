import Q from 'q'
import schema from '../schema'
import schemaBuilder from '../schemaBuilder/knex'

exports.up = function (knex) {
  const forgedSchemaCreate = schemaBuilder.createSchema({ knex, schema })
  return Q.allSettled(forgedSchemaCreate)
}

exports.down = function (knex) {
  const forgedSchemaDestroy = schemaBuilder.destroySchema({ knex, schema })
  return Q.allSettled(forgedSchemaDestroy)
}
