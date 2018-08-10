import gql from 'graphql-tag';

const SET_IS_LOGGED_IN = 'SET_IS_LOGGED_IN';
const SET_INFO = 'SET_INFO';

export default {
  state: {
    isLoggedIn: false,
    info: null,
  },

  getters: {

  },

  actions: {
    login: ({ commit }, { apollo, email, password }) => apollo.provider.defaultClient.mutate({
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
      apollo.provider.defaultClient.login(email, password);
      commit(SET_IS_LOGGED_IN, true);
      commit(SET_INFO, response.data.customerSignMeIn.customer);
    }),

    logout: ({ commit }, apollo) => apollo.provider.defaultClient.logout()
      .then(() => {
        commit(SET_IS_LOGGED_IN, false);
        commit(SET_INFO, null);
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
