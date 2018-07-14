import { createAuthMiddlewareForClientCredentialsFlow }
  from '@commercetools/sdk-middleware-auth/dist/commercetools-sdk-middleware-auth.cjs';
import Vue from 'vue';
import VueApollo from 'vue-apollo';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { createApolloClient } from 'vue-cli-plugin-apollo/graphql-client';
import config from '@/../sunrise.config';

// Install the vue plugin
Vue.use(VueApollo);

const httpEndpoint = process.env.VUE_APP_GRAPHQL_HTTP || `${config.ct.api.host}/${config.ct.auth.projectKey}/graphql`;

// Create commercetools authentication middleware
const authMiddleware = createAuthMiddlewareForClientCredentialsFlow(config.ct.auth);

function addAuthHeader(request) {
  return new Promise(success => authMiddleware(requestWithAuth => success(requestWithAuth))(request));
}

const link = setContext(request => addAuthHeader(request)).concat(new HttpLink({ uri: httpEndpoint }));

// Config
const defaultOptions = {
  // You can use `https` for secure connection (recommended in production)
  httpEndpoint,
  // You can use `wss` for secure connection (recommended in production)
  // Use `null` to disable subscriptions
  wsEndpoint: null,
  // Enable Automatic Query persisting with Apollo Engine
  persisting: false,
  // Use websockets for everything (no HTTP)
  // You need to pass a `wsEndpoint` for this to work
  websocketsOnly: false,
  // Is being rendered on the server?
  ssr: false,

  // Override default http link
  link,

  // Override default cache
  // cache: myCache

  // Additional ApolloClient options
  // apollo: { ... }

  // Client local data (see apollo-link-state)
  // clientState: { resolvers: { ... }, defaults: { ... } }
};

export default function createProvider(options = {}) {
  // Create apollo client
  const { apolloClient, wsClient } = createApolloClient({
    ...defaultOptions,
    ...options,
  });
  apolloClient.wsClient = wsClient;

  // Create vue apollo provider
  return new VueApollo({
    defaultClient: apolloClient,
    defaultOptions: {
      $query: {
        // fetchPolicy: 'cache-and-network',
      },
    },
    errorHandler(error) {
      // eslint-disable-next-line no-console
      console.error(error.message);
    },
  });
}
