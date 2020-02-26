/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
import {
  withToken, groupFetchJson, makeConfig, toUrl, baseUrl,
} from './api';
import config from '../../sunrise.config';

const asAttribute = (name, type) => (['enum', 'lnum'].includes(type)
  ? `variants.attributes.${name}.key`
  : `variants.attributes.${name}`);
// The array of attributes is in config, there are many searchable
//  attributes but only a couple of them will display in UI
const facets = (query = {}) => config.facetSearches.reduce(
  (result, { name, type }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (query.hasOwnProperty(name)) {
      result.filter = result.filter || [];
      result.filter.push(
        `${asAttribute(name, type)}:${
          Array.isArray(query[name])
            ? query[name].map(
              value => `"${value}"`,
            ).join(',')
            : `"${query[name]}"`
        }`,
      );
    }
    return result;
  }, {},
);

const products = {
  get: withToken(
    (query, routeQuery, { access_token: accessToken }) => {
      if (query.category) {
        query.filter = `categories.id:subtree("${query.category}")`;
        delete query.category;
      }
      return groupFetchJson(
        toUrl(
          `${baseUrl}/product-projections/search`,
          [
            ...Object.entries(query),
            ...Object.entries(facets(routeQuery)),
          ],
        ),
        makeConfig(accessToken),
      );
    },
  ),
  getItem: query => query,
};

export default products;
