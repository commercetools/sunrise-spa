import Vue from 'vue';
import VueApollo from 'vue-apollo';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { getAuthToken } from '@/auth';
import { createApolloClient } from 'vue-cli-plugin-apollo/graphql-client';
import config from '@/../sunrise.config';
import introspectionQueryResultData from '@/../graphql-fragments.json';

// Install the vue plugin
Vue.use(VueApollo);

function createClient() {
  const authLink = setContext((_, { headers = {} }) => getAuthToken()
    .then(authorization => ({ headers: { ...headers, authorization } })));

  // Matcher for fragments on unions and interfaces
  const fragmentMatcher = new IntrospectionFragmentMatcher({ introspectionQueryResultData });

  const { apolloClient, wsClient } = createApolloClient({
    httpEndpoint: process.env.VUE_APP_GRAPHQL_HTTP || `${config.ct.api.host}/${config.ct.auth.projectKey}/graphql`,
    cache: new InMemoryCache({
      fragmentMatcher,
    }),
    link: authLink,
  });

  apolloClient.wsClient = wsClient;

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
