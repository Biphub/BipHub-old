import _ from 'lodash'
// import createType from './02.createType'

const createList = ({ schema }) => {
  _.forOwn(schema, (table, tableName) => {
    // const Type = createType(table, tableName)
  })
}

export default createList
