import ProductQuickView from '../ProductQuickView/ProductQuickView.vue'
export default {
  data: () => ({
    quantity: 1,
  }),
  components: {
    ProductQuickView,
  },
  props: {
    showModal: Boolean,
    productSku: String,
  },
  // setup(props,ctx){

  // },
  // watch: {
  // },
  methods: {
    closeModal() {
      this.$emit('close-modal');
    }
  },
};
