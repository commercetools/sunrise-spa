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
const facets = (query = {}) => config.facetSearches
  .reduce(
    (result, { name, type }) => {
    // eslint-disable-next-line no-prototype-builtins
      if (query.hasOwnProperty(name) && query[name] !== undefined) {
        result['filter.query'] = result['filter.query'] || [];
        result['filter.query'].push(
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
const setCategory = ({ category, ...query }) => (category
  ? {
    ...query,
    'filter.query': `categories.id:subtree("${category}")`,
  }
  : query);


const products = {
  get: withToken(
    (
      [query, routeQuery, totalFacets = []],
      { access_token: accessToken },
    ) => {
      query = setCategory(query);
      return groupFetchJson(
        toUrl(
          `${baseUrl}/product-projections/search`,
          [
            ...Object.entries(query),
            ...Object.entries(facets(routeQuery)),
            ...totalFacets.map(
              ({ name, type }) => [
                'facet',
                `${asAttribute(name, type)} counting products`,
              ],
            ),
          ],
        ),
        makeConfig(accessToken),
      ).then(
        ({ facets, ...result }) => ({
          ...result,
          facets: config.facetSearches.map(
            ({ name, type }) => {
              const facet = facets[asAttribute(name, type)];
              return ({
                ...facet,
                name,
                type,
                terms: [...(facet?.terms || [])].sort(
                  (a, b) => a.term.localeCompare(b.term),
                ),
              });
            },
          ),
        }),
      );
    },
  ),
  facets: (query, routeQuery) => {
    query = {
      ...setCategory(query),
      page: 1,
      pageSize: 0,
    };
    return Promise.all(
      config.facetSearches.map(
        ({ name }) => {
          const newRouteQuery = { ...routeQuery };
          delete newRouteQuery[name];
          return products.get([
            query,
            newRouteQuery,
            config.facetSearches.filter(
              f => f.name === name,
            ),
          ])
            .then(
              ({ facets }) => facets
                .find(f => f.name === name),
            );
        },
      ),
    );
  },
};

export default products;
