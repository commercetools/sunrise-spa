import gql from 'graphql-tag';
import Breadcrumb from '../../common/Breadcrumb/index.vue';
import ProductInfo from '../ProductInfo/index.vue';

export default {
  props: {
    productSlug: {
      type: String,
      required: true,
    },
    sku: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    product: null,
  }),
  computed: {
    categoryId: vm => vm && vm?.product?.masterData.current.categories[0]?.id,
  },
  components: {
    Breadcrumb,
    ProductInfo,
  },
  apollo: {
    product: {
      query: gql`
      query product($sku: String!) {
        product(sku: $sku) {
          id
          masterData {
            current {
              categories {
                id
              }
            }
          }
        }
      }`,
      variables() {
        return {
          sku: this.sku,
        };
      },
    },
  },
};
