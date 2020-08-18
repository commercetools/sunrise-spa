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
    showModal: false,
    productSku: null,
  }),
  methods: {
    openModal(productInfo) {
      this.showModal = true;
      this.productSku = productInfo.sku;
    },
    closeModal() {
      this.showModal = false;
      this.productSku = null;
    },
  },
};
