import ProductList from '../ProductList/ProductList.vue';
import Breadcrumb from '../../common/Breadcrumb/Breadcrumb.vue';
import ProductQuickView from '../ProductQuickView/ProductQuickView.vue';

export default {
  components: {
    ProductList,
    Breadcrumb,
    ProductQuickView,
  },
  props: {
    categorySlug: String,
    page: {
      type: Number,
      default: 1,
    },
  },
  data: () => ({
    openModal: false,
    productSlug: null,
    productSku: null,
  }),
  methods: {
    showModal(productInfo) {
      this.openModal = true;
      this.productSlug = productInfo.slug;
      this.productSku = productInfo.sku;
    },
  },
};
