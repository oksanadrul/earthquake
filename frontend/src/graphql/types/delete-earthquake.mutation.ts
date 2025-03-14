import * as Types from '@/shared/types/graphql-global-types';

export type DeleteEarthquake_Mutation = { deleteEarthquake: string | null };

export type DeleteEarthquakeVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;

export type DeleteEarthquake = DeleteEarthquake_Mutation;
