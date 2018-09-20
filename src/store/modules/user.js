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
    signup: ({ commit }, draft) =>
      apolloProvider.defaultClient.mutate({
        mutation: gql`
          mutation signup($draft: CustomerSignMeUpDraft!) {
            customerSignMeUp(draft: $draft) {
              customer {
                email
                title
                firstName
                lastName
                customerNumber
              }
            }
          }`,
        variables: { draft },
      }).then((response) => {
        apolloProvider.defaultClient.login(draft.email, draft.password);
        commit(SET_INFO, response.data.customerSignMeUp.customer);
      }),

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
                version
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

    updateCustomer: ({ commit, getters }, actions) =>
      apolloProvider.defaultClient.mutate({
        mutation: gql`
          mutation updateMyCustomer($actions: [MyCustomerUpdateAction!]!, $version: Long!) {
            updateMyCustomer(version: $version, actions: $actions) {
              email
              firstName
              lastName
              version
            }
          }`,
        variables: {
          version: getters.user.version,
          actions,
        },
      }).then((response) => {
        commit(SET_INFO, response.data.updateMyCustomer);
      }),
  },

  mutations: {
    [SET_INFO](state, customer) {
      state.info = customer;
    },
  },
};
