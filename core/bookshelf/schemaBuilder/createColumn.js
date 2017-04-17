import _ from 'lodash'

/**
 * Creates column into transaction (table)
 * @param transaction
 * @param columnName
 * @param column
 */
const createColumn = (transaction, columnName, column) => {
  if (typeof column === 'object') {
    const type = column.type
    if (type === 'increments') {
      transaction.increments()  // Incrementing ID
    } else if (type === 'string') {
      transaction.string(columnName)
    } else if (type === 'jsonb') {
      transaction.jsonb(columnName)
    } else if (type === 'boolean') {
      transaction.boolean(columnName)
    } else if (type === 'integer') {
      const references = _.get(column, 'references', null)
      // If integer field is for relationship
      if (references) {
        transaction.integer(columnName).references(references)
      } else {
        transaction.integer(columnName)
      }
    }
  } else if (typeof column === 'boolean') {
    // If timestamps is enabled
    if (columnName === 'timestamps') {
      transaction.timestamps()
    }
  }
}

export default createColumn
