import SdkAuth from '@commercetools/sdk-auth';
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

export function refreshTokenExists() {
  return localStorage.getItem(refreshTokenName) !== null;
}

export function login(username, password) {
  tokenInfoPromise = authClient.customerPasswordFlow({ username, password });
  return tokenInfoPromise.then(response => saveRefreshToken(response));
}

export function logout() {
  deleteRefreshToken();
  tokenInfoPromise = authClient.clientCredentialsFlow();
  return tokenInfoPromise;
}

export function getAuthToken() {
  if (tokenInfoPromise === null) {
    const refreshToken = getRefreshToken();
    if (refreshToken) {
      tokenInfoPromise = authClient.refreshTokenFlow(refreshToken);
    } else {
      tokenInfoPromise = authClient.clientCredentialsFlow();
    }
  }
  return tokenInfoPromise.then(tokenInfo => `${tokenInfo.token_type} ${tokenInfo.access_token}`);
}
