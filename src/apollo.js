import { createAuthMiddlewareForClientCredentialsFlow, createAuthMiddlewareForPasswordFlow }
  from '@commercetools/sdk-middleware-auth/dist/commercetools-sdk-middleware-auth.cjs';
import Vue from 'vue';
import VueApollo from 'vue-apollo';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { createApolloClient, restartWebsockets } from 'vue-cli-plugin-apollo/graphql-client';
import config from '@/../sunrise.config';
import introspectionQueryResultData from '@/../graphql-fragments.json';

// Install the vue plugin
Vue.use(VueApollo);

// Matcher for fragments on unions and interfaces
const fragmentMatcher = new IntrospectionFragmentMatcher({ introspectionQueryResultData });

// Config
const defaultOptions = {
  httpEndpoint: process.env.VUE_APP_GRAPHQL_HTTP || `${config.ct.api.host}/${config.ct.auth.projectKey}/graphql`,
  cache: new InMemoryCache({ fragmentMatcher }),
};

// Create commercetools authentication middlewares
const clientCredentialsFlowMiddleware = createAuthMiddlewareForClientCredentialsFlow(config.ct.auth);
let passwordFlowMiddleware;

function createAuthLink(getAuthMiddleware) {
  return setContext((_, prevContext) => {
    const authMiddleware = getAuthMiddleware();
    return new Promise((success, reject) => {
      if (authMiddleware) {
        authMiddleware(newContext => success(newContext))(prevContext);
      } else {
        reject(new Error('Could not authenticate, probably you are not logged in'));
      }
    });
  });
}

export default function createProvider(options = {}) {
  const defaultClient = createApolloClient({
    ...defaultOptions,
    ...options,
    link: createAuthLink(() => clientCredentialsFlowMiddleware),
  }).apolloClient;

  const meClient = createApolloClient({
    ...defaultOptions,
    ...options,
    link: createAuthLink(() => passwordFlowMiddleware),
  }).apolloClient;

  // Create vue apollo provider
  return new VueApollo({
    defaultClient,
    clients: {
      me: meClient,
    },
    errorHandler(error) {
      // eslint-disable-next-line no-console
      console.error(error.message);
    },
  });
}

export async function onLogin(apolloClient, username, password) {
  passwordFlowMiddleware = createAuthMiddlewareForPasswordFlow({
    ...config.ct.auth,
    credentials: {
      ...config.ct.auth.credentials,
      user: { username, password },
    },
  });
  if (apolloClient.wsClient) restartWebsockets(apolloClient.wsClient);
  try {
    await apolloClient.resetStore();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('%cError on cache reset (login)', 'color: orange;', e.message);
  }
}

export async function onLogout(apolloClient) {
  passwordFlowMiddleware = null;
  if (apolloClient.wsClient) restartWebsockets(apolloClient.wsClient);
  try {
    await apolloClient.resetStore();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('%cError on cache reset (logout)', 'color: orange;', e.message);
  }
}
