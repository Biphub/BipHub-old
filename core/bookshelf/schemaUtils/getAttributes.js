import R from 'ramda'
import schema from '../schema'

/**
 * get attributes from table
 * It is used to define required attributes in bookshelf models
 * @param tableName
 * @returns {Array}
 */
const getAttributes = (tableName) => {
  const attrs = []
  const table = R.propOr([], tableName, schema)
  R.forEachObjIndexed((_, columnName) => {
    attrs.push(columnName)
  })(table)
  return attrs
}

export default {
  getAttributes
}
