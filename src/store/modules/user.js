import gql from 'graphql-tag';
import apolloProvider from '@/apollo';

const SET_INFO = 'SET_INFO';

const customerInfoFragment = gql`
  fragment printCustomerInfo on Customer {
    email
    firstName
    lastName
    customerNumber
    version
  }
`;

export default {
  state: {
    info: null,
  },

  getters: {
    user: state => state.info || {},
    isAuthenticated: state => !!state.info,
  },

  actions: {
    fetchCustomer: ({ commit }) =>
      apolloProvider.defaultClient.query({
        query: gql`
          query fetchCustomer {
            me {
              customer {
                ...printCustomerInfo
              }
            }
          }
          ${customerInfoFragment}`,
      }).then((response) => {
        commit(SET_INFO, response.data.me.customer);
      }),

    signup: ({ commit }, draft) =>
      apolloProvider.defaultClient.mutate({
        mutation: gql`
          mutation signup($draft: CustomerSignMeUpDraft!) {
            customerSignMeUp(draft: $draft) {
              customer {
                ...printCustomerInfo
              }
            }
          }
          ${customerInfoFragment}`,
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
                ...printCustomerInfo
              }
            }
          }
          ${customerInfoFragment}`,
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
              ...printCustomerInfo
            }
          }
          ${customerInfoFragment}`,
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
