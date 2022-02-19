import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core';
import { WebSocketLink } from "@apollo/client/link/ws";

import { locationVar } from './router';

const uri =
  '/graphql';

// export const link = new HttpLink({ uri });

export const link = new WebSocketLink({
  uri,
  options: {
    reconnect: true
  }
});

const cache =
  new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          location(): Location {
            return locationVar();
          },
        },
      },
    },
  });

export const client =
  new ApolloClient({ cache, link });
