import { graphResolvers } from './resolvers/_index';

export const resolvers = {
  Query: {
    ...graphResolvers.query,
  },
  Mutation: {
    ...graphResolvers.mutation,
  },
};