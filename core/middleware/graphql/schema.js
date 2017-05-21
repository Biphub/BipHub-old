import {
  GraphQLObjectType,
  GraphQLSchema
} from 'graphql'

// Queries
import AppsList from './queries/list/AppsList'
import ActionsList from './queries/list/ActionsList'

const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'Root query object',

  fields: () => {
    return {
      apps: AppsList,
      actions: ActionsList
    }
  }
})

const Schema = new GraphQLSchema({
  query: Query
})

export default Schema
