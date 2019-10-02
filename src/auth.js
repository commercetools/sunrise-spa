import SdkAuth, { TokenProvider } from '@commercetools/sdk-auth';
import store from './store';
import config from '../sunrise.config';

const tokenProvider = new TokenProvider({
  sdkAuth: new SdkAuth(config.ct.auth),
  fetchTokenInfo: sdkAuth => sdkAuth.anonymousFlow(),
  onTokenInfoChanged: tokenInfo => store.dispatch('setTokenInfo', tokenInfo),
}, store.state.tokenInfo);

export function cleanUpSession() {
  tokenProvider.invalidateTokenInfo();
  return store.dispatch('clearAuthentication');
}

export function clientLogin(apolloClient, credentials) {
  return store.dispatch('clearAuthentication').then(() => {
    tokenProvider.fetchTokenInfo = sdkAuth => sdkAuth.customerPasswordFlow(credentials);
    tokenProvider.invalidateTokenInfo();
    return apolloClient.resetStore()
      .then(() => store.dispatch('setAuthenticated', true))
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Error on cache reset during login', error);
        return cleanUpSession();
      });
  });
}

export function clientLogout(apolloClient, redirect) {
  return cleanUpSession()
    .then(() => redirect())
    .then(() => apolloClient.resetStore())
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error('Error on cache reset during logout', error);
    });
}

const buildAuthorizationHeader = () => tokenProvider.getTokenInfo()
  .then(tokenInfo => `${tokenInfo.token_type} ${tokenInfo.access_token}`);

export function getAuthToken() {
  return buildAuthorizationHeader().catch((error) => {
    // eslint-disable-next-line no-console
    console.warn('Could not connect to commercetools, cleaning up session...', error);
    return cleanUpSession().then(() => buildAuthorizationHeader());
  });
}
