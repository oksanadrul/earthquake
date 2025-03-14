import * as Types from '@/shared/types/graphql-global-types';

export type EarthInfo_Earthquake_location_Location = {
  __typename: 'Location';
  longitude: string;
  latitude: string;
};

export type EarthInfo = {
  __typename: 'Earthquake';
  id: string;
  magnitude: string;
  date: string;
  location: EarthInfo_Earthquake_location_Location;
};
