import * as Types from '@/shared/types/graphql-global-types';

export type Earthquake_earthquakes_Earthquake_location_Location = {
  __typename: 'Location';
  longitude: string;
  latitude: string;
};

export type Earthquake_earthquakes_Earthquake = {
  __typename: 'Earthquake';
  id: string;
  magnitude: string;
  date: string;
  location: Earthquake_earthquakes_Earthquake_location_Location;
};

export type Earthquake_Query = {
  earthquakes: Array<Earthquake_earthquakes_Earthquake | null> | null;
};

export type EarthquakeVariables = Types.Exact<{ [key: string]: never }>;

export type Earthquake = Earthquake_Query;
