import { apolloClient } from '@/setup/apollo-setup';
import fetchAllCategoriesQuery from '@/graphql/FetchAllCategories.gql';

const SET_CATEGORIES = 'setCategories';

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
          const categories = response.data.categories.results;
          context.commit(SET_CATEGORIES, categories);
          resolve();
        }).catch((error) => {
          reject(error);
        });
      });
    },
  },

  mutations: {
    [SET_CATEGORIES](state, categories) {
      state.items = categories;
    },
  },
};
