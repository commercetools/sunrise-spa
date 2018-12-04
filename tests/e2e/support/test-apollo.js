import SdkAuth from '@commercetools/sdk-auth';
import { createApolloClient } from 'vue-cli-plugin-apollo/graphql-client';

const projectKey = Cypress.env('VUE_APP_CT_PROJECT_KEY');
const apiHost = Cypress.env('VUE_APP_CT_API_HOST') || 'https://api.commercetools.com';

const authClient = new SdkAuth({
  projectKey,
  credentials: {
    clientId: Cypress.env('CT_CLIENT_ID'),
    clientSecret: Cypress.env('CT_CLIENT_SECRET'),
  },
  host: Cypress.env('VUE_APP_CT_AUTH_HOST') || 'https://auth.commercetools.com',
});

export default async function createClient() {
  const tokenInfo = await authClient.clientCredentialsFlow();
  return createApolloClient({
    httpEndpoint: `${apiHost}/${projectKey}/graphql`,
    getAuth: () => `${tokenInfo.token_type} ${tokenInfo.access_token}`,
  }).apolloClient;
}
