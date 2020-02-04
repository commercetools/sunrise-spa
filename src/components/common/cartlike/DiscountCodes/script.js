import RemoveDiscountCodeForm from '../RemoveDiscountCodeForm/index.vue';

export default {
  components: { RemoveDiscountCodeForm },
  props: {
    cartLike: {
      type: Object,
      required: true,
    },
    editable: {
      type: Boolean,
      default: false,
    },
  },
};
