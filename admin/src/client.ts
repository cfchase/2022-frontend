import {
  ApolloLink,
  ApolloClient,
  InMemoryCache,
  Observable,
  FetchResult,
  Operation,
} from '@apollo/client/core';
import { print } from 'graphql';
import { createClient, ClientOptions, Client } from 'graphql-ws';

import { locationVar } from './router';

class WebSocketLink extends ApolloLink {
  private client: Client;

  constructor(options: ClientOptions) {
    super();
    this.client = createClient(options);
  }

  public request(operation: Operation): Observable<FetchResult> {
    return new Observable(sink => {
      return this.client.subscribe<FetchResult>(
        { ...operation, query: print(operation.query) },
        {
          next: sink.next.bind(sink),
          complete: sink.complete.bind(sink),
          error: sink.error.bind(sink),
        },
      );
    });
  }
}

const link = new WebSocketLink({
  // url: 'ws://localhost:8080/graphql',
  url: 'ws://0.0.0.0:8080/graphql',
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

