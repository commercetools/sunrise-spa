import gql from 'graphql-tag';
import apolloProvider from '@/apollo';

const SET_INFO = 'SET_INFO';

const customerInfoFragment = gql`
  fragment printCustomerInfo on Customer {
    email
    firstName
    lastName
    customerNumber
  }
`;

export default {
  state: {
    info: null,
  },

  actions: {
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
  },

  mutations: {
    [SET_INFO](state, customer) {
      state.info = customer;
    },
  },
};
