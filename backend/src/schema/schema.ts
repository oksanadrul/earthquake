import { gql } from 'graphql-tag';

const typeDefs = gql`
  type Location {
    longitude: String!
    latitude: String!
  }

  input LocationInput {
    longitude: String!
    latitude: String!
  }

  type Earthquake {
    id: ID!
    location: Location!
    magnitude: String!
    date: String!
  }

  type Query {
    earthquakes: [Earthquake]
  }

  type Mutation {
    addEarthquake(location: LocationInput!, magnitude: String!, date: String!): Earthquake
    updateEarthquake(id: ID!, location: LocationInput!, magnitude: String!, date: String!): Earthquake
    deleteEarthquake(id: ID!): String
  }
`;

export { typeDefs };
