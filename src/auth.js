import SdkAuth, { TokenProvider } from '@commercetools/sdk-auth';
import apolloProvider from '@/apollo';
import store from '@/store/store';
import config from '@/../sunrise.config';

const refreshTokenName = 'refresh-token';

const tokenProvider = new TokenProvider({
  sdkAuth: new SdkAuth(config.ct.auth),
  fetchTokenInfo: sdkAuth => sdkAuth.clientCredentialsFlow(),
  onTokenInfoChanged: (newTokenInfo) => {
    if (newTokenInfo.refresh_token) {
      localStorage.setItem(refreshTokenName, newTokenInfo.refresh_token);
    }
  },
});

export function clientLogout() {
  localStorage.removeItem(refreshTokenName);
  tokenProvider.fetchTokenInfo = sdkAuth => sdkAuth.clientCredentialsFlow();
  return apolloProvider.defaultClient.clearStore()
    .then(() => store.dispatch('setAuthenticated', false))
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error('Error on cache reset', error);
    });
}

export function clientLogin(username, password) {
  tokenProvider.fetchTokenInfo = sdkAuth => sdkAuth.customerPasswordFlow({ username, password });
  store.dispatch('setAuthenticated', true);
}

export async function authenticate() {
  const refreshToken = localStorage.getItem(refreshTokenName);
  if (refreshToken) {
    tokenProvider.fetchTokenInfo = sdkAuth => sdkAuth.refreshTokenFlow(refreshToken);
    store.dispatch('setAuthenticated', true);
  }
}

const extractAuthToken = tokenInfo => `${tokenInfo.token_type} ${tokenInfo.access_token}`;

export function getAuthToken() {
  return tokenProvider.getTokenInfo()
    .then(tokenInfo => extractAuthToken(tokenInfo))
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.warn('Could not connect to commercetools, cleaning up session...', error);
      return clientLogout()
        .then(() => tokenProvider.getTokenInfo()
          .then(tokenInfo => extractAuthToken(tokenInfo)));
    });
}
