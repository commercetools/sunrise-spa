import debounce from 'lodash.debounce';
import { required, minValue, numeric } from 'vuelidate/lib/validators';
import BaseInput from '../../common/form/BaseInput/BaseInput.vue';
import cartMixin from '../../../mixins/cartMixin';
import BaseForm from '../../common/form/BaseForm/BaseForm.vue';
import ServerError from '../../common/form/ServerError/ServerError.vue';

export default {
  components: {
    ServerError,
    BaseForm,
    BaseInput,
  },
  mixins: [cartMixin],
  props: {
    lineItemId: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  data: () => ({
    form: {
      quantity: null,
    },
  }),
  methods: {
    changeLineItemQuantity(e) {
      return this.updateMyCart([
        {
          changeLineItemQuantity: {
            lineItemId: this.lineItemId,
            quantity: Number(e.target.value),
          },
        },
      ]);
    },
    removeLineItem() {
      return this.updateMyCart([
        {
          removeLineItem: {
            lineItemId: this.lineItemId,
          },
        },
      ]);
    },
    increment() {
      this.form.quantity += 1;
    },
    decrement() {
      if (this.form.quantity > 1) {
        this.form.quantity -= 1;
      } else {
        this.removeLineItem();
      }
    },
  },
  created() {
    this.form.quantity = this.quantity;
    this.debouncedSubmit = debounce(() => {
      if (this.$refs.form) {
        this.$refs.form.submit();
      }
    }, 500);
  },
  watch: {
    'form.quantity': function triggerDebouncedSubmit(newValue, oldValue) {
      if (oldValue !== null && newValue !== oldValue) {
        this.$v.$touch();
        if (!this.$v.$invalid) {
          this.debouncedSubmit();
        }
      }
    },
  },
  validations: {
    form: {
      quantity: { required, numeric, minValue: minValue(1) },
    },
  },
};
