import { createAuthMiddlewareForClientCredentialsFlow } from '@commercetools/sdk-middleware-auth/dist/commercetools-sdk-middleware-auth.cjs';
import Vue from 'vue';
import VueApollo from 'vue-apollo';
import createApolloClient from './apollo';

// Install the vue plugin
Vue.use(VueApollo);

// Import commercetools configuration for SPA
const ctConfiguration = require('../ct-configuration.json');

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
export const authMiddleware = createAuthMiddlewareForClientCredentialsFlow(ctConfiguration.auth);

// Create apollo client
export const apolloClient = createApolloClient(options);

// Create vue apollo provider
export const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});
