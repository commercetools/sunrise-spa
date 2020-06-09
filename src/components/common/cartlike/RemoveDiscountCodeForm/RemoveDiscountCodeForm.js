import cartMixin from '../../../../mixins/cartMixin';

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
