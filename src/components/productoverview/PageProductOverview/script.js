import ProductList from '../ProductList/index.vue';
import Breadcrumb from '../../common/Breadcrumb/index.vue';

export default {
  components: {
    ProductList,
    Breadcrumb,
  },
  props: {
    categorySlug: String,
    page: {
      type: Number,
      default: 1,
    },
  },
};
