<template>
  <div>
    <span v-if="!hasDiscount">
      <BaseMoney :money="originalPrice"/>
    </span>

    <span v-else>
      <span data-test="product-old-price"
            class="old-price">
        <BaseMoney :money="originalPrice"/>
      </span>

      <span data-test="product-new-price"
            class="new-price">
        <BaseMoney :money="discountedPrice"/>
      </span>
    </span>
  </div>
</template>

<script>
import BaseMoney from './BaseMoney.vue';

export default {
  components: {
    BaseMoney,
  },

  props: { price: Object },

  computed: {
    hasDiscount() {
      return this.price.discounted;
    },

    discountedPrice() {
      return this.price.discounted.value;
    },

    originalPrice() {
      return this.price.value;
    },
  },
};
</script>

<style scoped>
 .old-price {
    text-decoration: line-through;
 }
</style>
