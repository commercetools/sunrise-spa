import { createAuthMiddlewareForClientCredentialsFlow } from '@commercetools/sdk-middleware-auth/dist/commercetools-sdk-middleware-auth.cjs';
import Vue from 'vue';
import VueApollo from 'vue-apollo';
import createApolloClient from './apollo';

// Install the vue plugin
Vue.use(VueApollo);

// API client credentials for SPA
const credentials = require('../credentials.json');

// Config
const options = {
  ssr: false,
  base: process.env.VUE_APP_GRAPHQL_ENDPOINT || `https://api.commercetools.com/${credentials.projectKey}`,
  endpoints: {
    graphql: process.env.VUE_APP_GRAPHQL_PATH || '/graphql',
    subscription: process.env.VUE_APP_GRAPHQL_SUBSCRIPTIONS_PATH || '/graphql',
  },
  persisting: false,
  subscriptions: false,
};

// Create apollo client
const authMiddleware = createAuthMiddlewareForClientCredentialsFlow(credentials);
export const apolloClient = createApolloClient(options, authMiddleware);

// Create vue apollo provider
export const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});
