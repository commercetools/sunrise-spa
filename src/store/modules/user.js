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
    login: ({ commit }, { apollo, username, password }) => {
      apollo.provider.defaultClient.login(username, password)
        .then(() => apollo.provider.defaultClient.query({
          query: gql`
            query fetchCustomer {
              me {
                customer {
                  email
                  firstName
                }
              }
            }`,
        }).then((response) => {
          commit(SET_IS_LOGGED_IN, true);
          commit(SET_INFO, response.data.me.customer);
        }));
    },

    logout: ({ commit }, apollo) => {
      apollo.provider.defaultClient.logout()
        .then(() => {
          commit(SET_IS_LOGGED_IN, false);
          commit(SET_INFO, null);
        });
    },
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
