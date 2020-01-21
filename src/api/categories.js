import {
  withToken, baseUrl, groupFetchJson, makeConfig,
  toUrl, withPage,
} from './api';

const categories = {
  get: withToken(
    ({ access_token: accessToken }) => {
      const pageSize = 500;
      const recur = (query, ret) => {
        const url = toUrl(
          `${baseUrl}/categories`,
          { query },
        );
        return groupFetchJson(
          url,
          makeConfig(accessToken),
        ).then(({ results, total }) => {
          const newResult = ret.concat(results);
          if (newResult.length < total) {
            return recur(
              { ...query, page: query.page + 1 },
              newResult,
            );
          }
          return { results: newResult, total };
        });
      };
      return recur(withPage({ pageSize }), []);
    },
  ),
  getItem: query => query,
};

export default categories;
