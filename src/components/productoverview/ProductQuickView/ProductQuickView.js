import BasePrice from '../../common/BasePrice/BasePrice.vue';
import ProductGallery from '../../productdetail/ProductGallery/ProductGallery.vue';
import { addLine } from '../../common/shared';
import cartMixin from '../../../mixins/cartMixin';
import useProductQuery from '../../../composition/useProductQuery';

export default {
  mixins: [cartMixin],
  data: () => ({
    product: null,
    quantity: 1,
  }),
  components: {
    BasePrice,
    ProductGallery,
  },
  props: {
    showModal: Boolean,
    productSku: String,
  },
  setup(props,ctx){
    return useProductQuery(props,ctx);
  },
  watch: {
    showModal() {
      if (this.showModal === true) {
        this.$modal.show('quickView');
      }
    },
  },
  methods: {
    closeModal() {
      this.$modal.hide('quickView');
      this.$emit('close-modal');
      this.quantity = 1;
    },
    async addToCart() {
      return addLine(this)
        .then(() => { 
          this.closeModal(); this.$store.dispatch('openMiniCart'); 
        });

    },
  },
  computed: {
    sku() {//needed for addLine to work
      return this.productSku;
    }
  },
};
