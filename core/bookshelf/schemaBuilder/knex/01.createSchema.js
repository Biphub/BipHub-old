import _ from 'lodash'
import createTable from './02.createTable'

/**
 * Builds a schema
 * @param knex
 * @param schema
 * @returns {Array}
 */
const createSchema = ({ knex, schema }) => {
  const forgedQueries = []
  _.forOwn(schema, (table, tableName) => {
    forgedQueries.push(
      createTable(knex, tableName, table)
    )
  })
  return forgedQueries
}

export default createSchema
