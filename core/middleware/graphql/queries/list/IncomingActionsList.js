import {
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList
} from 'graphql'

import IncomingActionType from '../../types/IncomingActionType'
import models from '../../../../models'

const IncomingActionsQuery = {
  type: new GraphQLList(IncomingActionType),
  args: {
    id: {
      type: GraphQLInt
    },
    name: {
      type: GraphQLString
    },
    type: {
      type: GraphQLString
    },
    endpoint: {
      type: GraphQLString
    },
    conditions: {
      type: GraphQLString
    }
  },
  resolve (root, args) {
    return models.IncomingAction.findAll(args)
  }
}

export default IncomingActionsQuery
