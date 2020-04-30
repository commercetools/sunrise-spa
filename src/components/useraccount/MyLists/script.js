import gql from 'graphql-tag';

export default {
  data: () => ({
    me: null,
  }),
  apollo: {
    me: {
      query: gql`
        query MyLists {
          me {
            shoppingLists {
              results {
                key
                name(locale: "en")
                lineItems {
                  productId
                  name(locale: "en")
                  quantity
                }
              }
            }
          }
        }`,
      variables() {
      },
    },
  },
};
