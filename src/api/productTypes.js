/* eslint-disable no-shadow */
/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import {
  withToken, groupFetchJson, makeConfig, baseUrl,
} from './api';

const productTypes = {
  getItem: withToken(
    ({ access_token: accessToken }) => groupFetchJson(
      `${baseUrl}/product-types/key=main`,
      makeConfig(accessToken),
    ),
  ),
  translations: () => productTypes.getItem().then(
    productType => productType.attributes.reduce(
      (result, { name, label, type }) => {
        result[name] = {
          ...label,
        };
        Object.entries(label).forEach(
          ([locale, value]) => result[`${value} ... ${locale}`] = name,
        );
        if (type.name === 'lenum') {
          result[name].values = type.values.reduce(
            (result, { key, label }) => {
              result[key] = label;
              Object.entries(label).forEach(
                ([locale, value]) => result[`${value} ... ${locale}`] = key,
              );
              return result;
            }, {},
          );
        }

        return result;
      }, {},
    ),
  ),
};

export default productTypes;
