import { addEarthquakeMutation } from './addEarthquakeMutation';
import { deleteEarthquakeMutation } from './deleteEarthquakeMutation';
import { updateEarthquakeMutation } from './updateEarthquakeMutation';

export const mutationResolvers = {
  ...addEarthquakeMutation.Mutation,
  ...deleteEarthquakeMutation.Mutation,
  ...updateEarthquakeMutation.Mutation,
};
