import { ApolloClient } from 'apollo-client';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { createUploadLink } from 'apollo-upload-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createPersistedQueryLink } from 'apollo-link-persisted-queries';
import { setContext } from 'apollo-link-context';

// Create the apollo client
export default function createApolloClient({ base, endpoints, persisting }, authMiddleware) {
  let link = new HttpLink({
    // You should use an absolute URL here
    uri: base + endpoints.graphql,
  });

  const asyncAuthHeader = new Promise(success =>
    authMiddleware(headerObj => success(headerObj.headers.Authorization))({}, {}));

  // HTTP Auth header injection
  const asyncAuthLink = setContext((_, { headers }) =>
    asyncAuthHeader.then(authHeader => ({
      headers: {
        ...headers,
        authorization: authHeader,
      },
    })));

  // Concat all the http link parts
  link = asyncAuthLink.concat(link);
  if (persisting) {
    link = createPersistedQueryLink().concat(link);
  }

  // Apollo cache
  const cache = new InMemoryCache();

  // If on the client, recover the injected state
  if (typeof window !== 'undefined') {
    // eslint-disable-next-line no-underscore-dangle
    const state = window.__APOLLO_STATE__;
    if (state) {
      // If you have multiple clients, use `state.<client_id>`
      cache.restore(state.defaultClient);
    }
  }

  // File upload
  const uploadLink = asyncAuthLink.concat(createUploadLink({
    uri: base + endpoints.graphql,
  }));

  // using the ability to split links, you can send data to each link
  // depending on what kind of operation is being sent
  link = split(
    operation => operation.getContext().upload,
    uploadLink,
    link,
  );

  return new ApolloClient({
    link,
    cache,
    // Additional options
    ...({
      // This will temporary disable query force-fetching
      ssrForceFetchDelay: 100,
      // Apollo devtools
      connectToDevTools: process.env.NODE_ENV !== 'production',
    }),
  });
}
