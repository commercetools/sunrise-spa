import {
  withToken, groupFetchJson, makeConfig, baseUrl,
} from './api';

const productTypes = {
  getItem: withToken(
    (key, { access_token: accessToken }) => groupFetchJson(
      `${baseUrl}/product-types/key=${key}`,
      makeConfig(accessToken),
    ),
  ),
};

export default productTypes;
