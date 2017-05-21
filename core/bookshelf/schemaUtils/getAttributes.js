import _ from 'lodash'
import schema from '../schema'

/**
 * get attributes from table
 * It is used to define required attributes in bookshelf models
 * @param tableName
 * @returns {Array}
 */
const getAttributes = (tableName) => {
  const attrs = []
  const table = _.get(schema, tableName, [])
  _.forOwn(table, (_, columnName) => {
    attrs.push(columnName)
  })
  return attrs
}

export default {
  getAttributes
}
