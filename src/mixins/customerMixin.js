import gql from 'graphql-tag';

export default {
  methods: {
    updateMyCustomer(actions) {
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
          version: this.me.customer.version,
          actions,
        },
      });
    },
  },
};
