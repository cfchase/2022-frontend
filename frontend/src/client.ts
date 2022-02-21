import { ApolloLink, ApolloClient, InMemoryCache, HttpLink, Observable } from '@apollo/client/core';
import { WebSocketLink } from "@apollo/client/link/ws";
import { print } from 'graphql';
import { createClient, ClientOptions, Client } from 'graphql-ws';

const uri = 'http://localhost:8080/graphql';

import { locationVar } from './router';

// export const link = new HttpLink({ uri });

class WebSocketLink extends ApolloLink {
  private client: Client;

  constructor(options: ClientOptions) {
    super();
    this.client = createClient(options);
  }

  public request(operation: Operation): Observable<FetchResult> {
    return new Observable((sink) => {
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
  url: 'ws://locahost:8080/graphql',
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
