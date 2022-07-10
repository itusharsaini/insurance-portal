import 'dotenv/config';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { HttpLink } from 'apollo-link-http';
import fetch from 'isomorphic-unfetch';


const authLink = setContext((_, {headers}) => {
  return {
    headers: {
      ...headers,
      "x-hasura-admin-secret": process.env.HASURA_GRAPHQL_ADMIN_SECRET,
    },
  };
});

const httpLink = new HttpLink({
  uri: process.env.GQL_URI,
  fetch,
});

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});
