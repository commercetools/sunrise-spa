import gql from 'graphql-tag';
import apolloProvider from '@/apollo';

const SET_PRODUCT = 'SET_PRODUCT';

export default {
  state: {
    product: {},
  },

  getters: {
    productInfo: state => state.product,
  },

  actions: {
    fetchProduct: ({ commit }, locale) =>
      apolloProvider.defaultClient.query({
        query: gql`
          query Product($locale: Locale!) {
            product(sku: "M0E20000000FBLQ") {
              id
              masterData {
                current {
                  name(locale: $locale)
                  slug(locale: $locale)
                  masterVariant {
                    price(currency: "EUR") {
                      value {
                        centAmount
                        fractionDigits
                      }
                      discounted {
                        value {
                          centAmount
                          fractionDigits
                        }
                      }
                    }
                    images {
                      url
                    }
                  }
                skus
                }
              }
            }
          }`,
        variables: {
          locale,
        },
      }).then((response) => {
        commit(SET_PRODUCT, response.data.product);
      }),

  },

  mutations: {
    [SET_PRODUCT](state, product) {
      state.product = product;
    },
  },
};
