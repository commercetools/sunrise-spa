import SdkAuth, { TokenProvider } from '@commercetools/sdk-auth';
import store from './store';
import config from '../sunrise.config';

const tokenInfoStorageName = 'token';
const isAuthenticatedStorageName = 'auth';
let storedTokenInfo;

try {
  storedTokenInfo = JSON.parse(localStorage.getItem(tokenInfoStorageName));
  const isAuthenticated = localStorage.getItem(isAuthenticatedStorageName);
  if (storedTokenInfo && isAuthenticated) {
    store.dispatch('setAuthenticated', true);
  }
} catch (error) {
  // eslint-disable-next-line no-console
  console.error('Could not retrieve token from local storage', error);
}

const tokenProvider = new TokenProvider({
  sdkAuth: new SdkAuth(config.ct.auth),
  fetchTokenInfo: sdkAuth => sdkAuth.anonymousFlow(),
  onTokenInfoChanged: tokenInfo => localStorage.setItem(tokenInfoStorageName, JSON.stringify(tokenInfo)),
}, storedTokenInfo);

export function cleanUpSession() {
  tokenProvider.invalidateTokenInfo();
  localStorage.removeItem(tokenInfoStorageName);
  localStorage.removeItem(isAuthenticatedStorageName);
  return store.dispatch('setAuthenticated', false);
}

export function clientLogin(apolloClient, credentials) {
  localStorage.removeItem(tokenInfoStorageName);
  tokenProvider.fetchTokenInfo = sdkAuth => sdkAuth.customerPasswordFlow(credentials);
  tokenProvider.invalidateTokenInfo();
  return apolloClient.resetStore()
    .then(() => {
      localStorage.setItem(isAuthenticatedStorageName, true);
      return store.dispatch('setAuthenticated', true);
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error('Error on cache reset during login', error);
      return cleanUpSession();
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
