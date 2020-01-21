/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
import {
  withToken, groupFetchJson, makeConfig, toUrl, baseUrl,
} from './api';

const products = {
  get: withToken(
    (query, { access_token: accessToken }) => {
      if (query.category) {
        query.filter = `categories.id:subtree("${query.category}")`;
        delete query.category;
      }
      return groupFetchJson(
        toUrl(
          `${baseUrl}/product-projections/search`,
          { query },
        ),
        makeConfig(accessToken),
      );
    },
  ),
  getItem: query => query,
};

export default products;
