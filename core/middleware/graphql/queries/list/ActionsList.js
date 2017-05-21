import {
  GraphQLString,
  GraphQLInt,
  GraphQLList
} from 'graphql'
import GraphQLJSON from 'graphql-type-json'
import ActionType from '../../types/ActionType'
import models from '../../../../models'

const ActionsQuery = {
  type: new GraphQLList(ActionType),
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
      type: GraphQLJSON
    }
  },
  resolve (root, args) {
    return models.Action.findAll(args)
  }
}

export default ActionsQuery
