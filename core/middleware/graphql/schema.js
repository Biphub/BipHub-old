import {
  GraphQLObjectType,
  GraphQLSchema
} from 'graphql'

// Queries
import AppsList from './queries/list/AppsList'

const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'Root query object',

  fields: () => {
    return {
      apps: AppsList
    }
  }
})

const Schema = new GraphQLSchema({
  query: Query
})

export default Schema
