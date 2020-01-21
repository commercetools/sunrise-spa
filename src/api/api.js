/* eslint-disable import/prefer-default-export */
import config from '../../sunrise.config';

export const withPage = ({
  page = 1,
  pageSize = 20,
  ...query
}) => ({
  page,
  pageSize,
  ...query,
});
const fetchJson = (...args) => fetch(...args).then((result) => {
  if (result.status === 401) {
    // eslint-disable-next-line no-throw-literal
    throw { statusCode: 401 };
  }
  return result.json();
});
const group = (fn) => {
  const groups = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    const existing = groups.get(key);
    if (existing) {
      return existing;
    }
    const result = fn(...args);
    groups.set(key, result);
    return result;
  };
};
export const groupFetchJson = group(fetchJson);
const getToken = (refresh = false) => {
  const storageToken = JSON.parse(
    localStorage.getItem('session'),
  )?.tokenInfo;
  return storageToken && !refresh
    ? Promise.resolve(storageToken)
    : fetch(
      `${config.ct.auth.host}/oauth/${config.ct.auth.projectKey}/anonymous/token`,
      {
        headers: {
          accept: '*/*',
          authorization: `Basic ${btoa(
            `${config.ct.auth.credentials.clientId}:${config.ct.auth.credentials.clientSecret}`,
          )}`,
          'content-type':
                        'application/x-www-form-urlencoded',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'cross-site',
        },
        body: `grant_type=client_credentials&scope=${config.ct.auth.scopes}`,
        method: 'POST',
        mode: 'cors',
      },
    )
      .then(r => r.json())
      .then((tokenInfo) => {
        const session = JSON.parse(
          localStorage.getItem('session'),
        );
        localStorage.setItem(
          'session',
          JSON.stringify({
            ...session,
            tokenInfo,
          }),
        );
        return tokenInfo;
      });
};
export const baseUrl = `${config.ct.api}/${config.ct.auth.projectKey}`;
export const withToken = (() => {
  let token = getToken();
  return (fn) => {
    const doRequest = (...args) => token
      .then(tk => fn(...args.concat(tk)))
      .catch((err) => {
        if (err.statusCode === 401) {
          token = getToken(true);
          return doRequest(...args);
        }
        throw err;
      });
    return doRequest;
  };
})();
export const makeConfig = token => ({
  headers: {
    accept: '*/*',
    authorization: `Bearer ${token}`,
    'content-type': 'application/json',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'cross-site',
  },
  mode: 'cors',
});

export const toUrl = (
  base,
  { query: { pageSize, page, ...query } },
) => {
  const queryParams = Object.entries(query);
  queryParams.push(['limit', pageSize]);
  queryParams.push(['offset', pageSize * (page - 1)]);
  return (
    base
    + (queryParams.length ? '?' : '')
    + queryParams
      .reduce(
        (q, [key, value]) => {
          q.set(key, value);
          return q;
        },
        new URLSearchParams(),
      )
      .toString()
  );
};
