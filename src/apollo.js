import Vue from 'vue';
import VueApollo from 'vue-apollo';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { fromPromise } from 'apollo-link';
import { createApolloClient } from 'vue-cli-plugin-apollo/graphql-client';
import { getAuthToken, cleanUpSession } from './auth';
import config from '../sunrise.config';
import introspectionQueryResultData from '../graphql-fragments.json';

// Install the vue plugin
Vue.use(VueApollo);

function createClient() {
  const authLink = setContext((_, { headers = {} }) => getAuthToken()
    .then(authorization => ({ headers: { ...headers, authorization } })));

  const errorLink = onError(({ networkError, operation, forward }) => {
    const statusCode = networkError?.statusCode;
    if (statusCode === 401 || statusCode === 403) {
      const { headers } = operation.getContext();
      // eslint-disable-next-line no-console
      console.warn('Unauthorized or forbidden connection to commercetools, cleaning up session...', networkError);
      return fromPromise(cleanUpSession().then(getAuthToken)).flatMap((authorization) => {
        operation.setContext({ headers: { ...headers, authorization } });
        return forward(operation);
      });
    }
    return null;
  });

  // Matcher for fragments on unions and interfaces
  const fragmentMatcher = new IntrospectionFragmentMatcher({ introspectionQueryResultData });

  return createApolloClient({
    httpEndpoint: process.env.VUE_APP_GRAPHQL_HTTP || `${config.ct.api}/${config.ct.auth.projectKey}/graphql`,
    cache: new InMemoryCache({ fragmentMatcher }),
    link: authLink.concat(errorLink),
  }).apolloClient;
}

const apolloProvider = new VueApollo({
  defaultClient: createClient(),
  errorHandler(error) {
    // eslint-disable-next-line no-console
    console.error('An error occurred in a request to commercetools', error);
  },
});
export default apolloProvider;
