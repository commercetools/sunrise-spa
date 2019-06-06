import gql from 'graphql-tag';
import BASIC_CUSTOMER_QUERY from '../components/BasicCustomer.gql';

export default {
  methods: {
    updateMyCustomer(actions) {
      // Issue with under-fetching on mutations https://github.com/apollographql/apollo-client/issues/3267
      // required any queried field to be fetched in order to update all components using customers
      return this.$apollo.mutate({
        mutation: gql`
          mutation updateMyCustomer($actions: [MyCustomerUpdateAction!]!, $version: Long!) {
            updateMyCustomer(version: $version, actions: $actions) {
              id
              version
              email
              firstName
              lastName
            }
          }`,
        variables: {
          version: this.me.customer?.version,
          actions,
        },
      });
    },
  },

  apollo: {
    me: BASIC_CUSTOMER_QUERY,
  },
};
