import gql from 'graphql-tag';
import DisplayableMoneyFragment from '@/components/DisplayableMoney.gql';

export default {
  computed: {
    totalItems() {
      if (this.me?.activeCart) {
        return this.me.activeCart.lineItems.reduce((acc, li) => acc + li.quantity, 0);
      }
      return 0;
    },

    sortedLineItems() {
      if (this.me?.activeCart) {
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
            }
          }
          ${DisplayableMoneyFragment}`,
        variables: {
          actions,
          id: this.me?.activeCart?.id,
          version: this.me?.activeCart?.version,
          locale: this.$i18n.locale,
        },
      });
    },

    createMyCart(draft) {
      return this.$apollo.mutate({
        mutation: gql`
          mutation createMyCart($draft: MyCartDraft!) {
            createMyCart(draft: $draft) {
              id
              version
            }
          }`,
        variables: { draft },
        update: (store, { data: { createMyCart } }) => {
          const query = gql`
            query me {
              me {
                activeCart {
                  id
                  version
                }
              }
            }`;
          const data = store.readQuery({ query });
          data.me.activeCart = createMyCart;
          store.writeQuery({ query, data });
        },
      });
    },
  },

  apollo: {
    me: {
      query: gql`
        query me {
          me {
            activeCart {
              id
              version
            }
          }
        }`,
      skip: vm => !vm.$store.state.authenticated,
    },
  },
};
