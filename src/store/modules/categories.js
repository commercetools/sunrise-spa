import { apolloProvider } from '@/main';
import gql from 'graphql-tag';

const SET_ITEMS = 'SET_ITEMS';

export function obtainItemsBySlug(categories) {
  const itemsBySlug = {};
  if (Array.isArray(categories)) {
    categories.forEach(({
      id, name, slug, ancestors, children,
    }) => {
      itemsBySlug[slug] = ({
        id, name, slug, ancestors,
      });
      Object.assign(itemsBySlug, obtainItemsBySlug(children));
    });
  }
  return itemsBySlug;
}

export default {
  state: {
    items: [],
  },

  getters: {
    hasCategories: state => state.items.length > 0,
    categoryTree: state => state.items,
    categoryBySlug: state => obtainItemsBySlug(state.items),
  },

  actions: {
    fetchCategories: ({ commit }, locale) =>
      apolloProvider.defaultClient.query({
        query: gql`
          query fetchAllCategories($locale: Locale!) {
            categories(limit: 10, where: "parent is not defined", sort: "orderHint asc") {
              results {
                ...printCategory
                children {
                  ...printCategory
                  children {
                    ...printCategory
                  }
                }
              }
            }
          }
  
          fragment printCategory on Category {
            id
            externalId
            name(locale: $locale)
            slug(locale: $locale)
            ancestors {
              name(locale: $locale)
              slug(locale: $locale)
            }
          }`,
        variables: { locale },
      }).then((response) => {
        commit(SET_ITEMS, response.data.categories.results);
      }),
  },

  mutations: {
    [SET_ITEMS](state, items) {
      state.items = items;
    },
  },
};
