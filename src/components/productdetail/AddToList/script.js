import gql from 'graphql-tag';
import LoadingButton from '../../common/form/LoadingButton/index.vue';

export default {
  props: ['sku'],
  data: () => ({
    me: null,
  }),
  components: {
    LoadingButton,
  },
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
