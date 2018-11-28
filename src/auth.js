import SdkAuth from '@commercetools/sdk-auth';
import apolloProvider from '@/apollo';
import store from '@/store/store';
import config from '@/../sunrise.config';

const authClient = new SdkAuth(config.ct.auth);
const refreshTokenName = 'refresh-token';

let tokenInfoPromise = null;

function saveSession(requestPromise) {
  tokenInfoPromise = requestPromise;
  return tokenInfoPromise.then((response) => {
    if (response.refresh_token) {
      localStorage.setItem(refreshTokenName, response.refresh_token);
    }
    return store.dispatch('setAuthenticated', true);
  });
}

function removeSession() {
  localStorage.removeItem(refreshTokenName);
  tokenInfoPromise = null;
  return apolloProvider.defaultClient.clearStore()
    .then(() => store.dispatch('setAuthenticated', false))
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error('%cError on cache reset', 'color: orange;', error.message);
    });
}

export async function authenticate() {
  const refreshToken = localStorage.getItem(refreshTokenName);
  if (refreshToken) {
    tokenInfoPromise = authClient.refreshTokenFlow(refreshToken);
    await tokenInfoPromise
      .then(() => store.dispatch('setAuthenticated', true))
      .catch(() => removeSession());
  }
}

export function clientLogin(username, password) {
  return saveSession(authClient.customerPasswordFlow({ username, password }));
}

export function clientLogout() {
  return removeSession();
}

export function getAuthToken() {
  if (tokenInfoPromise === null) {
    tokenInfoPromise = authClient.clientCredentialsFlow();
  }
  return tokenInfoPromise.then(tokenInfo => `${tokenInfo.token_type} ${tokenInfo.access_token}`);
}
