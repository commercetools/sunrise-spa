<template>
  <div class="quantity-spinner">
    <span @click="quantity -= 1"
          data-test="cart-line-item-quantity-dec"
          class="change-quantity-button input-number-decrement">–</span>
    <input v-model.trim.number="$v.quantity.$model"
           data-test="cart-line-item-quantity"
           type="text"
           class="input-number"/>
    <span @click="quantity += 1"
          data-test="cart-line-item-quantity-inc"
          class="change-quantity-button input-number-increment">+</span>
  </div>
</template>

<script>
import debounce from 'lodash.debounce';
import { required, minValue, numeric } from 'vuelidate/lib/validators';

export default {
  props: {
    lineItem: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    quantity: null,
  }),

  methods: {
    submit() {
      this.$emit('submit', this.lineItem.id, this.quantity);
    },
  },

  created() {
    this.quantity = this.lineItem.quantity;
    this.debouncedSubmit = debounce(this.submit, 500);
  },

  watch: {
    quantity(newValue, oldValue) {
      if (oldValue !== null) {
        this.$v.$touch();
        if (newValue !== oldValue && !this.$v.$invalid) {
          this.debouncedSubmit();
        }
      }
    },
  },

  validations: {
    quantity: {
      required,
      numeric,
      minValue: minValue(1),
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
