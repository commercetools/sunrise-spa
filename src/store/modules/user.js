import gql from 'graphql-tag';
import { apolloProvider } from '@/main';

const SET_INFO = 'SET_INFO';

export default {
  state: {
    info: null,
  },

  getters: {
    user: state => state.info || {},

    isAuthenticated: state => !!state.info,
  },

  actions: {
    login: ({ commit }, { email, password }) =>
      apolloProvider.defaultClient.mutate({
        mutation: gql`
          mutation login($draft: CustomerSignMeInDraft!) {
            customerSignMeIn(draft: $draft) {
              customer {
                email
                title
                firstName
                lastName
                customerNumber
              }
            }
          }`,
        variables: {
          draft: { email, password },
        },
      }).then((response) => {
        apolloProvider.defaultClient.login(email, password);
        commit(SET_INFO, response.data.customerSignMeIn.customer);
      }),

    logout: ({ commit }) =>
      apolloProvider.defaultClient.logout()
        .then(() => {
          commit(SET_INFO, null);
        }),
  },

  mutations: {
    [SET_INFO](state, customer) {
      state.info = customer;
    },
  },
};
