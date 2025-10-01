import {
  ApolloClient,
  createHttpLink,
  from,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { BACKEND_ENDPOINT } from '@/utils/constants';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import {
  OnTokenEvent,
  OnWooSessionTokenEvent,
} from '@/modules/auth/auth-events';
import { createUploadLink } from 'apollo-upload-client';

export const clientUploadLink = createUploadLink({
  uri: `${BACKEND_ENDPOINT}`,
});

const httpLink = createHttpLink({
  uri: BACKEND_ENDPOINT,
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

export function createApolloClient(
  wooSessionRefreshToken = '',
  jwtAuthToken = '',
): ApolloClient<NormalizedCacheObject> {
  const authLink = setContext((_, { headers: _headers }) => {
    // get the authentication token from event storage if it exists
    const jwtAuthTokenEvent = jwtAuthToken || OnTokenEvent.get()?.token;
    const wooSessionEvent =
      wooSessionRefreshToken || OnWooSessionTokenEvent.get()?.token;
    // return the headers to the context so httpLink can read them

    let headers = {
      ..._headers,
      'Content-Type': 'application/json',
    };

    if (wooSessionEvent) {
      headers = {
        ...headers,
        'woocommerce-session': wooSessionEvent
          ? `Session ${wooSessionEvent}`
          : '',
      };
    }

    if (jwtAuthTokenEvent) {
      headers = {
        ...headers,
        authorization: jwtAuthTokenEvent ? `Bearer ${jwtAuthTokenEvent}` : '',
      };
    }

    return {
      headers,
    };
  });
  const link = from([authLink, errorLink, httpLink]);

  return new ApolloClient({
    link,
    cache: new InMemoryCache(),
  });
}

export const clientUpload = new ApolloClient({
  link: clientUploadLink,
  cache: new InMemoryCache(),
});
