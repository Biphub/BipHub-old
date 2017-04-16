import {
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList
} from 'graphql'

import AppType from '../../types/AppType'
import models from '../../../../models'

const AppsQuery = {
  type: new GraphQLList(AppType),
  args: {
    id: {
      type: GraphQLInt
    },
    name: {
      type: GraphQLString
    },
    auth_type: {
      type: GraphQLString
    },
    active: {
      type: GraphQLBoolean
    },
    first: {
      type: GraphQLInt,
      resolve (root, args) {
        console.log('args ', args)
      }
    }
  },
  resolve (root, args) {
    // Collection of App
    return models.App.findAll(args)
  }
}

export default AppsQuery
