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
    fetchProduct: ({ commit }, {
      locale, currency, sku,
    }) => {
      apolloProvider.defaultClient.query({
        query: gql`
          query Product($locale: Locale!, $sku: String!, $currency: Currency!) {
            product(sku: $sku) {
              id
              masterData {
                current {
                  name(locale: $locale)
                  slug(locale: $locale)
                  masterVariant {
                    images {
                      url
                    }
                    price(currency: $currency) {
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
                  }
                skus
                }
              }
            }
          }`,
        variables: {
          locale,
          currency,
          sku,
        },
      }).then((response) => {
        commit(SET_PRODUCT, response.data.product);
      }).catch(error => console.log(JSON.stringify(error)));
    },
  },

  mutations: {
    [SET_PRODUCT](state, product) {
      state.product = product;
    },
  },
};
