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

    saveInfo: ({ commit }, {
      firstName,
      lastName,
      email,
      version,
    }) => {
      apolloProvider.defaultClient.mutate({
        mutation: gql`
          mutation saveInfo($actions: [MyCustomerUpdateAction!]!, $version: Long!) {
            updateMyCustomer(version: $version, actions: $actions) {
              email
              firstName
              lastName
              version
            }
          }`,
        variables: {
          version,
          actions: [
            { changeEmail: { email } },
            { setFirstName: { firstName } },
            { setLastName: { lastName } },
          ],
        },
      }).then((response) => {
        // const customerData = response.data.updateMyCustomer;
        // apolloProvider.defaultClient.saveInfo(
        //   customerData.firstName,
        //   customerData.lastName,
        //   customerData.email,
        //   customerData.version,
        // );
        commit(SET_INFO, response.data.updateMyCustomer);
      });
    },
  },

  mutations: {
    [SET_INFO](state, customer) {
      state.info = customer;
    },
  },
};
