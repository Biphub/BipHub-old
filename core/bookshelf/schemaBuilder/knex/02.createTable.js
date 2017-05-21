import _ from 'lodash'
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
    _.forOwn(table, (column, columnName) => {
      createColumn(transaction, columnName, column)
    })
  })
}

export default createTable
