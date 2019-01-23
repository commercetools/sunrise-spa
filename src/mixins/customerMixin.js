import gql from 'graphql-tag';
import UpdatableCustomerInfoFragment from '@/components/UpdatableCustomerInfo.gql';

export default {
  methods: {
    updateMyCustomer(actions) {
      return this.$apollo.mutate({
        mutation: gql`
          mutation updateMyCustomer($actions: [MyCustomerUpdateAction!]!, $version: Long!) {
            updateMyCustomer(version: $version, actions: $actions) {
              ...UpdatableCustomerInfo
            }
          }
        ${UpdatableCustomerInfoFragment}`,
        variables: {
          version: this.me.customer.version,
          actions,
        },
      });
    },
  },
};
