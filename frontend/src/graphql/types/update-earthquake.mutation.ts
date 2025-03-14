import * as Types from '@/shared/types/graphql-global-types';

export type UpdateEarthquake_updateEarthquake_Earthquake_location_Location = {
  __typename: 'Location';
  longitude: string;
  latitude: string;
};

export type UpdateEarthquake_updateEarthquake_Earthquake = {
  __typename: 'Earthquake';
  id: string;
  magnitude: string;
  date: string;
  location: UpdateEarthquake_updateEarthquake_Earthquake_location_Location;
};

export type UpdateEarthquake_Mutation = {
  updateEarthquake: UpdateEarthquake_updateEarthquake_Earthquake | null;
};

export type UpdateEarthquakeVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
  location: Types.LocationInput;
  magnitude: Types.Scalars['String']['input'];
  date: Types.Scalars['String']['input'];
}>;

export type UpdateEarthquake = UpdateEarthquake_Mutation;
