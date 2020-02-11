import gql from 'graphql-tag';
import BASIC_CART_QUERY from './BasicCart.gql';
import CART_FRAGMENT from '../components/Cart.gql';
import ORDER_FRAGMENT from '../components/Order.gql';
import MONEY_FRAGMENT from '../components/Money.gql';
import ADDRESS_FRAGMENT from '../components/Address.gql';

function cartExists(vm) {
  return vm.me?.activeCart;
}

export default {
  computed: {
    cartExists() {
      return cartExists(this);
    },

    cartNotEmpty() {
      return this.me?.activeCart?.lineItems.length > 0;
    },

    totalItems() {
      if (cartExists(this)) {
        return this.me.activeCart.lineItems.reduce((acc, li) => acc + li.quantity, 0);
      }
      return 0;
    },

    sortedLineItems() {
      if (cartExists(this)) {
        return [...this.me.activeCart.lineItems].reverse();
      }
      return [];
    },
  },

  methods: {
    updateMyCart(actions) {
      // Issue with under-fetching on mutations https://github.com/apollographql/apollo-client/issues/3267
      // required any queried field to be fetched in order to update all components using carts, e.g. mini-cart
      return this.$apollo.mutate({
        mutation: gql`
          mutation updateMyCart($id: String!, $version: Long!, $actions: [MyCartUpdateAction!]!, $locale: Locale!) {
            updateMyCart(id: $id, version: $version, actions: $actions) {
              ...CartFields
            }
          }
          ${CART_FRAGMENT}
          ${MONEY_FRAGMENT}
          ${ADDRESS_FRAGMENT}`,
        variables: {
          actions,
          id: this.me.activeCart?.id,
          version: this.me.activeCart?.version,
          locale: this.$store.state.locale,
        },
      });
    },

    createMyCart(draft) {
      return this.$apollo.mutate({
        mutation: gql`
          mutation ($draft: MyCartDraft!) {
            createMyCart(draft: $draft) {
              id
              version
            }
          }`,
        variables: { draft },
        update: (store, { data: { createMyCart } }) => {
          const data = store.readQuery({ query: BASIC_CART_QUERY });
          data.me.activeCart = createMyCart;
          store.writeQuery({ query: BASIC_CART_QUERY, data });
        },
      });
    },

    createMyOrder() {
      return this.$apollo.mutate({
        mutation: gql`
          mutation ($id: String!, $version: Long!, $locale: Locale!) {
            createMyOrderFromCart(draft: { id: $id, version: $version }) {
              ...OrderFields
            }
          }
          ${ORDER_FRAGMENT}
          ${MONEY_FRAGMENT}
          ${ADDRESS_FRAGMENT}`,
        variables: {
          id: this.me.activeCart?.id,
          version: this.me.activeCart?.version,
          locale: this.$store.state.locale,
        },
        update: (store) => {
          const data = store.readQuery({ query: BASIC_CART_QUERY });
          data.me.activeCart = null;
          store.writeQuery({ query: BASIC_CART_QUERY, data });
          // invalidate cached order pages
          Object.keys(store.data.toObject())
            .filter(key => key.startsWith('Order'))
            .forEach(
              key => store.data.delete(key),
            );
        },
      });
    },
  },

  apollo: {
    me: BASIC_CART_QUERY,
  },
};
