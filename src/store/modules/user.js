import gql from 'graphql-tag';

const SET_IS_LOGGED_IN = 'SET_IS_LOGGED_IN';
const SET_EMAIL = 'SET_EMAIL';

export default {
  state: {
    isLoggedIn: false,
    email: null,
  },

  getters: {

  },

  actions: {
    login: ({ commit }, { apollo, username, password }) => {
      apollo.provider.defaultClient.login(username, password)
        .then(() => apollo.provider.defaultClient.query({
          query: gql`
            query fetchCustomer {
              me {
                customer {
                  email
                }
              }
            }`,
        }).then((response) => {
          commit(SET_IS_LOGGED_IN, true);
          commit(SET_EMAIL, response.data.me.customer.email);
        }));
    },

    logout: ({ commit }, apollo) => {
      apollo.provider.defaultClient.logout()
        .then(() => {
          commit(SET_IS_LOGGED_IN, false);
          commit(SET_EMAIL, null);
        });
    },
  },

  mutations: {
    [SET_IS_LOGGED_IN](state, isLoggedIn) {
      state.isLoggedIn = isLoggedIn;
    },

    [SET_EMAIL](state, email) {
      state.email = email;
    },
  },
};
