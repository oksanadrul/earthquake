import { mutationResolvers } from './mutations/_index';
import { queryResolvers } from './queries/_index';

export const graphResolvers = {
  query: {
    ...queryResolvers,
  },
  mutation: {
    ...mutationResolvers,
  },
};
