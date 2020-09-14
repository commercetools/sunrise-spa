import cartMixin from '../../../mixins/cartMixin';
// import ServerError from '../../common/form/ServerError/index.vue';
// import LoadingButton from '../../common/form/LoadingButton/index.vue';
// import BaseSelect from '../../common/form/BaseSelect/index.vue';
// import BaseForm from '../../common/form/BaseForm/index.vue';

export default {
  props: {
    sku: {
      type: String,
      required: true,
    },
  },
  components: {
    // BaseForm,
    // BaseSelect,
    // LoadingButton,
    // ServerError,
  },
  mixins: [cartMixin],
  data: () => ({
    quantity: 1,
  }),
  computed: {
    isLoading() {
      return this.$apollo.loading;
    },
  },
  methods: {
    async addLineItem() {
      if (!this.cartExists) {
        await this.createMyCart({
          currency: this.$store.state.currency,
          country: this.$store.state.country,
          shippingAddress: { country: this.$store.state.country },
        });
      }
      const supplyChannel = this.$store.state.channel ? {
        supplyChannel: { id: this.$store.state.channel.id },
      } : {};
      return this.updateMyCart({
        addLineItem: {
          sku: this.sku,
          quantity: Number(this.quantity),
          ...supplyChannel,
        },
      }).then(() => this.$store.dispatch('openMiniCart'));
    },
  },
};
