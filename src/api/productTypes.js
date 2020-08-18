/* eslint-disable no-shadow */
/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import {
  withToken, groupFetchJson, makeConfig, baseUrl,
} from './api';

const productTypes = {
  getItem: withToken(
    (accessToken) => groupFetchJson(
      `${baseUrl}/product-types/key=main`,
      makeConfig(accessToken),
    ),
  ),
  translations: () => productTypes.getItem().then(
    (productType) => productType.attributes.reduce(
      (result, { name, label }) => {
        result[name] = {
          ...label,
        };
        return result;
      }, {},
    ),
  ),
};

export default productTypes;
