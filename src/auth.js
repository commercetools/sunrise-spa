import SdkAuth, { TokenProvider } from '@commercetools/sdk-auth';
import apolloProvider from '@/apollo';
import store from '@/store/store';
import config from '@/../sunrise.config';

const tokenInfoStorageName = 'token';
let storedTokenInfo;

try {
  storedTokenInfo = JSON.parse(localStorage.getItem(tokenInfoStorageName));
  if (storedTokenInfo && storedTokenInfo.refresh_token) {
    store.dispatch('setAuthenticated', true);
  }
} catch (error) {
  console.warn('Could not retrieve token from local storage', error);
}

const tokenProvider = new TokenProvider({
  sdkAuth: new SdkAuth(config.ct.auth),
  fetchTokenInfo: sdkAuth => sdkAuth.clientCredentialsFlow(),
  onTokenInfoChanged: tokenInfo => localStorage.setItem(tokenInfoStorageName, JSON.stringify(tokenInfo)),
}, storedTokenInfo);

export function clientLogout() {
  localStorage.removeItem(tokenInfoStorageName);
  tokenProvider.fetchTokenInfo = sdkAuth => sdkAuth.clientCredentialsFlow();
  tokenProvider.invalidateTokenInfo();
  return apolloProvider.defaultClient.clearStore()
    .then(() => store.dispatch('setAuthenticated', false))
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error('Error on cache reset', error);
    });
}

export function clientLogin(username, password) {
  tokenProvider.fetchTokenInfo = sdkAuth => sdkAuth.customerPasswordFlow({ username, password });
  tokenProvider.invalidateTokenInfo();
  store.dispatch('setAuthenticated', true);
}

const buildAuthorizationHeader = () => tokenProvider.getTokenInfo()
  .then(tokenInfo => `${tokenInfo.token_type} ${tokenInfo.access_token}`);

export function getAuthToken() {
  return buildAuthorizationHeader().catch((error) => {
    // eslint-disable-next-line no-console
    console.warn('Could not connect to commercetools, cleaning up session...', error);
    return clientLogout().then(() => buildAuthorizationHeader());
  });
}
