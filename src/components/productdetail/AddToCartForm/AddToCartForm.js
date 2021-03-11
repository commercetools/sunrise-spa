import cartMixin from '../../../mixins/cartMixin';
import { addLine } from '../../common/shared';
// import ServerError from '../../common/form/ServerError/index.vue';
// import LoadingButton from '../../common/form/LoadingButton/index.vue';
// import BaseSelect from '../../common/form/BaseSelect/index.vue';
// import BaseForm from '../../common/form/BaseForm/index.vue';
export const createCartVariables = (component) => ({
  currency: component.$store.state.currency,
  country: component.$store.state.country,
  shippingAddress: { country: component.$store.state.country },
});
export default {
  props: {
    sku: {
      type: String,
      required: true,
    },
    isOnStock: {
      type: Boolean,
      required: true,
    },
    availableQuantity: {
      type: Number,
      required: false,
    },
  },
  mixins: [cartMixin],
  data: () => ({
    quantity: 1,
  }),
  computed: {
    isLoading() {
      return this.$apollo.loading;
    },
    availableQ() {
      return typeof this.availableQuantity !== "undefined"
    },
  },
  methods: {
    async addLineItem() {
      if(!this.isOnStock){
        return;
      }
      if (!this.cartExists) {
        await this.createMyCart(createCartVariables(this));
      }
      return addLine(this)
        .then(() => this.$store.dispatch('openMiniCart'));
    },
  },
};
