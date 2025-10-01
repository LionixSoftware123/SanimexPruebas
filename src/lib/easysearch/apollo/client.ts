import {
  ApolloClient,
  createHttpLink,
  from,
  InMemoryCache,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { EASY_SEARCH_ENDPOINT } from '@/lib/easysearch/constants';

const httpLink = createHttpLink({
  uri: EASY_SEARCH_ENDPOINT,
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const link = from([errorLink, httpLink]);

export const easySearchApolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
