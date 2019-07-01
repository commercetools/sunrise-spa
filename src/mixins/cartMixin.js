import gql from 'graphql-tag';
import BASIC_CART_QUERY from '../components/BasicCart.gql';
import DISPLAYABLE_MONEY_FRAGMENT from '../components/DisplayableMoney.gql';

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
          mutation updateMyCart(
          $actions: [MyCartUpdateAction!]!,
          $id: String!,
          $version: Long!,
          $locale: Locale!) {
            updateMyCart(id: $id, version: $version, actions: $actions) {
              id
              version
              totalPrice {
                ...DisplayableMoney
              }
              shippingInfo {
                price {
                  ...DisplayableMoney
                }
              }
              taxedPrice {
                totalGross {
                  ...DisplayableMoney
                }
                totalNet {
                  ...DisplayableMoney
                }
              }
              lineItems {
                id
                quantity
                name(locale: $locale)
                productSlug(locale: $locale)
                variant {
                  sku
                  images {
                    url
                  }
                }
                price {
                  value {
                    ...DisplayableMoney
                  }
                  discounted {
                    value {
                      ...DisplayableMoney
                    }
                  }
                }
                totalPrice {
                  ...DisplayableMoney
                }
              }
              discountCodes {
                discountCode {
                  id
                  code
                  name(locale: $locale)                  
                }
              }
            }
          }
          ${DISPLAYABLE_MONEY_FRAGMENT}`,
        variables: {
          actions,
          id: this.me.activeCart?.id,
          version: this.me.activeCart?.version,
          locale: this.$i18n.locale,
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
  },

  apollo: {
    me: BASIC_CART_QUERY,
  },
};
