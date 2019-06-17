<template>
  <div v-if="cartExists"
       class="quantity-spinner">
    <span @click="form.quantity -= 1"
          data-test="cart-line-item-quantity-dec"
          class="change-quantity-button input-number-decrement">–</span>
    <BaseInput v-model.number="form.quantity"
               :vuelidate="$v.form.quantity"
               type="text"
               class="input-number"
               data-test="cart-line-item-quantity" />
    <span @click="form.quantity += 1"
          data-test="cart-line-item-quantity-inc"
          class="change-quantity-button input-number-increment">+</span>
  </div>
</template>

<script>
import debounce from 'lodash.debounce';
import { required, minValue, numeric } from 'vuelidate/lib/validators';
import BaseInput from '../common/form/BaseInput.vue';
import cartMixin from '../../mixins/cartMixin';
import formMixin from '../../mixins/formMixin';

export default {
  components: {
    BaseInput,
  },

  mixins: [cartMixin, formMixin],

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
    changeLineItemQuantity() {
      return this.updateMyCart([
        {
          changeLineItemQuantity: {
            lineItemId: this.lineItemId,
            quantity: this.form.quantity,
          },
        },
      ]);
    },
  },

  created() {
    this.form.quantity = this.quantity;
    this.debouncedSubmit = debounce(() => this.submit(this.changeLineItemQuantity), 500);
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
</script>

<style scoped>
  .change-quantity-button {
    margin: 1px;
    border: 0;
  }
</style>
