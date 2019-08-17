import 'isomorphic-fetch';
import ApolloClient from 'apollo-boost';

export const client = new ApolloClient({
  uri: 'http://localhost:9090/graphql'
});
