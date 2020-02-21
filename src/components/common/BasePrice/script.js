import BaseMoney from '../BaseMoney/index.vue';

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
