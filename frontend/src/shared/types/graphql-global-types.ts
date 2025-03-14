export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type Earthquake = {
  __typename: 'Earthquake';
  date: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  location: Location;
  magnitude: Scalars['String']['output'];
};

export type Location = {
  __typename: 'Location';
  latitude: Scalars['String']['output'];
  longitude: Scalars['String']['output'];
};

export type LocationInput = {
  latitude: Scalars['String']['input'];
  longitude: Scalars['String']['input'];
};

export type Mutation = {
  __typename: 'Mutation';
  addEarthquake: Maybe<Earthquake>;
  deleteEarthquake: Maybe<Scalars['String']['output']>;
  updateEarthquake: Maybe<Earthquake>;
};

export type MutationaddEarthquakeArgs = {
  date: Scalars['String']['input'];
  location: LocationInput;
  magnitude: Scalars['String']['input'];
};

export type MutationdeleteEarthquakeArgs = {
  id: Scalars['ID']['input'];
};

export type MutationupdateEarthquakeArgs = {
  date: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  location: LocationInput;
  magnitude: Scalars['String']['input'];
};

export type Query = {
  __typename: 'Query';
  earthquakes: Maybe<Array<Maybe<Earthquake>>>;
};
