import SdkAuth from '@commercetools/sdk-auth';
import config from '@/../sunrise.config';

const authClient = new SdkAuth(config.ct.auth);
const refreshTokenName = 'refresh-token';

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

let tokenProvider = authClient.tokenProvider({ refreshToken: getRefreshToken() });

export function login(username, password) {
  tokenProvider = authClient.tokenProvider({ username, password });
}

export function logout() {
  deleteRefreshToken();
  tokenProvider = authClient.tokenProvider();
}

export function getAuthToken() {
  return tokenProvider.get().then((tokenInfo) => {
    saveRefreshToken(tokenInfo);
    return `${tokenInfo.token_type} ${tokenInfo.access_token}`;
  });
}
