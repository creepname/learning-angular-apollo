import { NgModule } from '@angular/core';
import { APOLLO_FLAGS, APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions, ApolloLink, InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { onError } from '@apollo/client/link/error';

const uri = 'https://graphql-voter-app.herokuapp.com/';

const errorLink = onError(({ graphQLErrors, networkError, operation, response }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  }

  if (networkError) {
    console.log(`[Network error]: ${JSON.stringify(networkError)}`);
  }
});

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  return {
    link: errorLink.concat(httpLink.create({ uri })),
    cache: new InMemoryCache()
  };
}

@NgModule({
  providers: [
    {
      provide: APOLLO_FLAGS,
      useValue: {
        useInitialLoading: true
      }
    },
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink]
    }
  ]
})
export class GraphQLModule {}
