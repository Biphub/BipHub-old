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
    label: {
      type: GraphQLString
    },
    icon: {
      type: GraphQLString
    },
    instructions: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    }
  },
  resolve (root, args) {
    // Collection of App
    return models.App.findAll(args)
  }
}

export default AppsQuery
