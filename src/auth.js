import SdkAuth from '@commercetools/sdk-auth';
import apolloProvider from '@/apollo';
import store from '@/store/store';
import config from '@/../sunrise.config';

const authClient = new SdkAuth(config.ct.auth);
const refreshTokenName = 'refresh-token';

let tokenInfoPromise = null;

function getRefreshToken() {
  return localStorage.getItem(refreshTokenName);
}

function saveRefreshToken(response) {
  if (response.refresh_token) {
    localStorage.setItem(refreshTokenName, response.refresh_token);
  }
}

function deleteRefreshToken() {
  localStorage.removeItem(refreshTokenName);
}

export function initialize() {
  if (tokenInfoPromise === null) {
    const refreshToken = getRefreshToken();
    if (refreshToken) {
      tokenInfoPromise = authClient.refreshTokenFlow(refreshToken);
      tokenInfoPromise.then(() => {
        store.dispatch('setAuthenticated', true);
      });
    } else {
      tokenInfoPromise = authClient.clientCredentialsFlow();
    }
  }
  return tokenInfoPromise;
}

export function clientLogin(username, password) {
  tokenInfoPromise = authClient.customerPasswordFlow({ username, password });
  return tokenInfoPromise.then((response) => {
    saveRefreshToken(response);
    return store.dispatch('setAuthenticated', true);
  });
}

export function clientLogout() {
  deleteRefreshToken();
  tokenInfoPromise = authClient.clientCredentialsFlow();
  return apolloProvider.defaultClient.clearStore()
    .then(() => store.dispatch('setAuthenticated', false))
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error('%cError on cache reset', 'color: orange;', error.message);
    });
}

export function getAuthToken() {
  return tokenInfoPromise.then(tokenInfo => `${tokenInfo.token_type} ${tokenInfo.access_token}`);
}
