import * as Types from '@/shared/types/graphql-global-types';

export type AddEarthquake_addEarthquake_Earthquake_location_Location = {
  __typename: 'Location';
  longitude: string;
  latitude: string;
};

export type AddEarthquake_addEarthquake_Earthquake = {
  __typename: 'Earthquake';
  id: string;
  magnitude: string;
  date: string;
  location: AddEarthquake_addEarthquake_Earthquake_location_Location;
};

export type AddEarthquake_Mutation = {
  addEarthquake: AddEarthquake_addEarthquake_Earthquake | null;
};

export type AddEarthquakeVariables = Types.Exact<{
  location: Types.LocationInput;
  magnitude: Types.Scalars['String']['input'];
  date: Types.Scalars['String']['input'];
}>;

export type AddEarthquake = AddEarthquake_Mutation;
