<template>
  <div>
    <span v-if="!hasDiscount">
      <BaseMoney :money="originalPrice"/>
    </span>

    <span v-else>
      <span data-test="price-old-value"
            class="old-price">
        <BaseMoney :money="originalPrice"/>
      </span>

      <span data-test="price-new-value"
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
