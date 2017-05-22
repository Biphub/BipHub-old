import R from 'ramda'
import createColumn from './03.createColumn'

/**
 * Creates a table
 * @param knex
 * @param tableName
 * @param table
 * @returns {*}
 */
const createTable = (knex, tableName, table) => {
  return knex.schema.createTableIfNotExists(tableName, (transaction) => {
    R.forEachObjIndexed((column, columnName) => {
      createColumn(transaction, columnName, column)
    })(table)
  })
}

export default createTable
