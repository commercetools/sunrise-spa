import { createAuthMiddlewareForClientCredentialsFlow }
  from '@commercetools/sdk-middleware-auth/dist/commercetools-sdk-middleware-auth.cjs';
import Vue from 'vue';
import VueApollo from 'vue-apollo';
import { setContext } from 'apollo-link-context/lib/index';
import { createUploadLink } from 'apollo-upload-client/lib/main/index';
import { InMemoryCache } from 'apollo-cache-inmemory/lib/index';
import { HttpLink } from 'apollo-link-http/lib/index';
import { split } from 'apollo-link/lib/index';
import { ApolloClient } from 'apollo-client';
import { createPersistedQueryLink } from 'apollo-link-persisted-queries';

// Install the vue plugin
Vue.use(VueApollo);

// Import commercetools configuration for SPA
const ctConfiguration = require('../../ct-configuration.json');

// Config
const options = {
  base: process.env.VUE_APP_GRAPHQL_ENDPOINT || `${ctConfiguration.api.host}/${ctConfiguration.auth.projectKey}`,
  endpoints: {
    graphql: process.env.VUE_APP_GRAPHQL_PATH || '/graphql',
    subscription: process.env.VUE_APP_GRAPHQL_SUBSCRIPTIONS_PATH || '/graphql',
  },
  persisting: false,
};

// Create commercetools authentication middleware
const authMiddleware = createAuthMiddlewareForClientCredentialsFlow(ctConfiguration.auth);

function addAuthHeader(request) {
  return new Promise(success => authMiddleware(requestWithAuth => success(requestWithAuth))(request, {}));
}

// Create the apollo client
function createApolloClient({ base, endpoints, persisting }) {
  console.log('Creating apollo client');

  let link = new HttpLink({
    // You should use an absolute URL here
    uri: base + endpoints.graphql,
  });

  // HTTP Auth header injection
  const asyncAuthLink = setContext(request => addAuthHeader(request));

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

// Create apollo client
export const apolloClient = createApolloClient(options);

// Create vue apollo provider
export const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});
