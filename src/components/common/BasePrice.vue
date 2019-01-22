<template>
  <div v-if="price">
    <span v-if="!hasDiscount">
      <BaseMoney :money="originalPrice"/>
    </span>

    <span v-else>
      <span class="old-price">
        <BaseMoney :money="originalPrice"/>
      </span>

      <span class="new-price">
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
