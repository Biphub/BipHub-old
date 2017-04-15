import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} from 'graphql'

import models from '../../models'

const App = new GraphQLObjectType({
  name: 'App',
  description: 'This represents an App',
  fields: () => {
    return {
      /**
       * Unique id of an app
       */
      id: {
        type: GraphQLInt,
        resolve (app) {
          return app.get('id')
        }
      },
      /**
       * App name
       */
      name: {
        type: GraphQLString,
        resolve (app) {
          return app.get('name')
        }
      },
      /**
       * Authentication type such as token, oauth
       */
      auth_type: {
        type: GraphQLString,
        resolve (app) {
          return app.get('auth_type')
        }
      },
      /**
       * Determines if app is active or not
       */
      active: {
        type: GraphQLBoolean,
        resolve (app) {
          return app.get('active')
        }
      }
    }
  }
})

const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'Root query object',

  fields: () => {
    return {
      apps: {
        type: new GraphQLList(App),
        args: {
          id: {
            type: GraphQLInt
          },
          name: {
            type: GraphQLString
          }
        },
        resolve (root, args) {
          return models.App.findAll(args)
        }
      }
    }
  }
})

const Schema = new GraphQLSchema({
  query: Query
})

export default Schema
