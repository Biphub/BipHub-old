import R from 'ramda'
import destroyTable from './02.destroyTable'

/**
 * Destroy a schema from database
 * @param knex
 * @param schema
 * @returns {Array}
 */
const destroySchema = ({ knex, schema }) => {
  const forgeDestoryTables = (table, tableName) => destroyTable(knex, tableName, table)
  return R.forEachObjIndexed(forgeDestoryTables)(schema)
}

export default destroySchema
