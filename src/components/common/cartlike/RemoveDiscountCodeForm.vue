<template>
  <button @click="removeDiscountCode"
          class="discount-code-delete"
          data-test="remove-discount-button">
    <img src="../../../assets/img/delete-1.png"
         class="cart-action-icon">
  </button>
</template>

<script>
import cartMixin from '../../../mixins/cartMixin';

export default {
  props: {
    codeId: {
      type: String,
      required: true,
    },
  },

  methods: {
    removeDiscountCode() {
      return this.updateMyCart([{
        removeDiscountCode: {
          discountCode: {
            typeId: 'discount-code',
            id: this.codeId,
          },
        },
      }]);
    },
  },

  mixins: [cartMixin],
};
</script>
