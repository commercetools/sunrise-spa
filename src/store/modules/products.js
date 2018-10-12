import gql from 'graphql-tag';
import apolloProvider from '@/apollo';

const SET_PRODUCT = 'SET_PRODUCT';

export default {
  state: {
    product: {},
  },

  getters: {
    hasProduct: state => state.product,
  },

  actions: {
    fetchProduct: ({ commit }) =>
      apolloProvider.defaultClient.query({
        query: gql`
          query Product {
            product(sku: "M0E20000000EATE") {
              key
              id
              masterData {
                staged {
                  nameAllLocales {
                    locale
                    value
                  }
                  descriptionAllLocales {
                    locale
                    value
                  }
                  masterVariant{
                    prices {
                      value {
                        currencyCode
                        centAmount
                      }
                      discounted {
                        value{
                          currencyCode
                          centAmount
                        }
                      }
                    }
                  }
                  skus        
                }
              }
            }
          }`,
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
