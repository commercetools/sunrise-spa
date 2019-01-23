import gql from 'graphql-tag';
import UpdatableCartInfoFragment from '@/components/UpdatableCartInfo.gql';

export default {
  methods: {
    updateMyCart(actions) {
      return this.$apollo.mutate({
        mutation: gql`
          mutation updateMyCart(
          $actions: [MyCartUpdateAction!]!,
          $id: String!,
          $version: Long!) {
            updateMyCart(id: $id, version: $version, actions: $actions) {
              ...UpdatableCartInfo
            }
          }
        ${UpdatableCartInfoFragment}`,
        variables: {
          id: this.me.activeCart.id,
          version: this.me.activeCart.version,
          actions,
        },
      });
    },
  },
};
