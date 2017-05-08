import {
  GraphQLString,
  GraphQLInt,
  GraphQLList
} from 'graphql';
import GraphQLJSON from 'graphql-type-json';
import IncomingActionType from '../../types/IncomingActionType';
import models from '../../../../models';

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
      type: GraphQLJSON
    }
  },
  resolve (root, args) {
    return models.IncomingAction.findAll(args);
  }
};

export default IncomingActionsQuery;
