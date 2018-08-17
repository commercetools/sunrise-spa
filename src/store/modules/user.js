import gql from 'graphql-tag';
import { apolloProvider } from '@/main';

const SET_IS_LOGGED_IN = 'SET_IS_LOGGED_IN';
const SET_INFO = 'SET_INFO';

export default {
  state: {
    isLoggedIn: false,
    info: {},
  },

  getters: {

  },

  actions: {
    login: ({ commit }, { email, password }) =>
      apolloProvider.defaultClient.mutate({
        mutation: gql`
          mutation login($draft: CustomerSignMeInDraft!) {
            customerSignMeIn(draft: $draft) {
              customer {
                email
                firstName
              }
            }
          }`,
        variables: {
          draft: { email, password },
        },
      }).then((response) => {
        apolloProvider.defaultClient.login(email, password);
        commit(SET_IS_LOGGED_IN, true);
        commit(SET_INFO, response.data.customerSignMeIn.customer);
      }),

    logout: ({ commit }) =>
      apolloProvider.defaultClient.logout()
        .then(() => {
          commit(SET_IS_LOGGED_IN, false);
          commit(SET_INFO, {});
        }),
  },

  mutations: {
    [SET_IS_LOGGED_IN](state, isLoggedIn) {
      state.isLoggedIn = isLoggedIn;
    },

    [SET_INFO](state, customer) {
      state.info = customer;
    },
  },
};
