import R from 'ramda'
import createTable from './02.createTable'

/**
 * Builds a schema
 * @param knex
 * @param schema
 * @returns {Array}
 */
const createSchema = ({ knex, schema }) => {
  const forgedQueries = []
  R.forEachObjIndexed((table, tableName) => {
    forgedQueries.push(
      createTable(knex, tableName, table)
    )
  })(schema)
  return forgedQueries
}

export default createSchema
