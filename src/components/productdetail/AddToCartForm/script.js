import { required, numeric, between } from 'vuelidate/lib/validators';
import cartMixin from '../../../mixins/cartMixin';
import ServerError from '../../common/form/ServerError/index.vue';
import LoadingButton from '../../common/form/LoadingButton/index.vue';
import BaseSelect from '../../common/form/BaseSelect/index.vue';
import BaseForm from '../../common/form/BaseForm/index.vue';
import AddToList from '../AddToList/index.vue';

const MAX_QUANTITY = 10;
export default {
  props: {
    sku: {
      type: String,
      required: true,
    },
  },
  components: {
    BaseForm,
    BaseSelect,
    LoadingButton,
    ServerError,
    AddToList,
  },
  mixins: [cartMixin],
  data: () => ({
    form: {
      quantity: 1,
    },
  }),
  computed: {
    isLoading() {
      return this.$apollo.loading;
    },
    quantities() {
      return [...Array(MAX_QUANTITY).keys()].map(i => ({ id: i + 1, name: i + 1 }));
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
      return this.updateMyCart({
        addLineItem: {
          sku: this.sku,
          quantity: this.form.quantity,
        },
      }).then(() => this.$store.dispatch('openMiniCart'));
    },
  },
  validations() {
    return {
      form: {
        quantity: { required, numeric, between: between(1, MAX_QUANTITY) },
      },
    };
  },
};
