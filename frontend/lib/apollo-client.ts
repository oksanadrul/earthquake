import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql', // Backend URL
  credentials: 'same-origin', // Include credentials like cookies if needed
});

// Create Apollo Client
export const client = new ApolloClient({
  ssrMode: typeof window === 'undefined', // Disable force-fetching on the server (so queries are not run twice)
  link: httpLink,
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});
