import RemoveDiscountCodeForm from '../RemoveDiscountCodeForm/RemoveDiscountCodeForm.vue';

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
