import SdkAuth from '@commercetools/sdk-auth';
import { createAuthMiddlewareForClientCredentialsFlow, createAuthMiddlewareForPasswordFlow }
  from '@commercetools/sdk-middleware-auth/dist/commercetools-sdk-middleware-auth.cjs';
import Vue from 'vue';
import VueApollo from 'vue-apollo';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { createApolloClient, restartWebsockets } from 'vue-cli-plugin-apollo/graphql-client';
import config from '@/../sunrise.config';
import introspectionQueryResultData from '@/../graphql-fragments.json';
import 'isomorphic-fetch';

// Install the vue plugin
Vue.use(VueApollo);

const params = {
  ...config.ct.auth,
  fetch: window.fetch,
  // fetch: (url, args) => {
  //   console.log(url);
  //   console.log(args);
  //   return window.fetch(url, args).then((x) => {
  //     console.log(x);
  //     return x;
  //   });
  // },
};
const authClient = new SdkAuth(params);
authClient.clientCredentialsFlow().then(x => console.log(x));

// const authClient = new SdkAuth({
//   ...config.ct.auth,
//   fetch,
// });

// Matcher for fragments on unions and interfaces
const fragmentMatcher = new IntrospectionFragmentMatcher({ introspectionQueryResultData });

// Config
const defaultOptions = {
  httpEndpoint: process.env.VUE_APP_GRAPHQL_HTTP || `${config.ct.api.host}/${config.ct.auth.projectKey}/graphql`,
  cache: new InMemoryCache({ fragmentMatcher }),
};

function createAuthLink(getClient) {
  return setContext((_, prevContext) => {
    const { authMiddleware } = getClient();
    return new Promise((resolve, reject) =>
      authMiddleware(newContext => resolve(newContext))(prevContext, { resolve, reject }));
  });
}

function createClient() {
  const defaultAuthMiddleware = createAuthMiddlewareForClientCredentialsFlow(config.ct.auth);

  const { apolloClient, wsClient } = createApolloClient({
    ...defaultOptions,
    link: createAuthLink(() => apolloClient),
  });

  apolloClient.wsClient = wsClient;
  apolloClient.authMiddleware = defaultAuthMiddleware;

  // Add login function
  apolloClient.login = async (username, password) => {
    apolloClient.authMiddleware = createAuthMiddlewareForPasswordFlow({
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
  };

  // Add logout function
  apolloClient.logout = async () => {
    apolloClient.authMiddleware = defaultAuthMiddleware;
    if (apolloClient.wsClient) restartWebsockets(apolloClient.wsClient);
    try {
      await apolloClient.resetStore();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('%cError on cache reset (logout)', 'color: orange;', e.message);
    }
  };

  return apolloClient;
}

const apolloProvider = new VueApollo({
  defaultClient: createClient(),
  errorHandler(error) {
    // eslint-disable-next-line no-console
    console.error(error.message);
  },
});
export default apolloProvider;
