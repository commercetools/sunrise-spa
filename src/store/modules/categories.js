import { apolloClient } from '@/setup/apollo-setup';
import fetchAllCategoriesQuery from '@/graphql/FetchAllCategories.gql';

const SET_CATEGORIES = 'setCategories';

function extractCategories(response) {
  const result = response.data.categories;
  if (result.total > result.count) {
    console.warn(`Categories limited to ${result.count}, increase the limit if you want to fetch all ${result.total}.`);
  }
  return result.results;
}

export default {
  state: {
    items: [],
  },

  getters: {

  },

  actions: {
    fetchCategories(context, locale) {
      return new Promise((resolve, reject) => {
        apolloClient.query({
          query: fetchAllCategoriesQuery,
          variables: {
            locale,
          },
        }).then((response) => {
          const categories = extractCategories(response);
          context.commit(SET_CATEGORIES, categories);
          resolve();
        }).catch((error) => {
          console.error('Could not fetch categories.', error);
          reject(error);
        });
      });
    },
  },

  mutations: {
    [SET_CATEGORIES](state, categories) {
      state.items = categories;
      console.log(`Set category tree with ${categories.length} root categories.`);
    },
  },
};
