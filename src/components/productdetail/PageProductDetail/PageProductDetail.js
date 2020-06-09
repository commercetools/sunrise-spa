import Breadcrumb from '../../common/Breadcrumb/Breadcrumb.vue';
import ProductInfo from '../ProductInfo/ProductInfo.vue';

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
  components: {
    Breadcrumb,
    ProductInfo,
  },
};
