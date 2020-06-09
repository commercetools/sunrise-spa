import ProductList from '../ProductList/ProductList.vue';
import Breadcrumb from '../../common/Breadcrumb/Breadcrumb.vue';

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
