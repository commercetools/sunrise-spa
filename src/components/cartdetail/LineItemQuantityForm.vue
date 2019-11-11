<template>
  <BaseForm v-if="cartExists"
            :vuelidate="$v"
            :onSubmit="changeLineItemQuantity"
            #default="{ error }"
            ref="form"
            class="quantity-spinner">
    <ServerError :error="error"/>
    <span @click="decrement"
          data-test="cart-line-item-quantity-dec"
          class="change-quantity-button input-number-decrement">–</span>
    <BaseInput v-model.number="form.quantity"
               :vuelidate="$v.form.quantity"
               type="text"
               class="input-number"
               data-test="cart-line-item-quantity" />
    <span @click="increment"
          data-test="cart-line-item-quantity-inc"
          class="change-quantity-button input-number-increment">+</span>
  </BaseForm>
</template>

<script>
import debounce from 'lodash.debounce';
import { required, minValue, numeric } from 'vuelidate/lib/validators';
import BaseInput from '../common/form/BaseInput.vue';
import cartMixin from '../../mixins/cartMixin';
import BaseForm from '../common/form/BaseForm.vue';
import ServerError from '../common/form/ServerError.vue';

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
</script>

<style lang="scss">
.quantity-spinner {
  .change-quantity-button {
    margin: 1px;
    border: 0;
  }

  .form-field {
    display: inline;
  }

  .form-error-message {
    display: none;
  }
}
</style>
