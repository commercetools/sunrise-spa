import cartMixin from '../../../mixins/cartMixin';

export default {
  props: {
    lineItemId: {
      type: String,
      required: true,
    },
  },
  mixins: [cartMixin],
  methods: {
    removeLineItem() {
      return this.updateMyCart([
        {
          removeLineItem: {
            lineItemId: this.lineItemId,
          },
        },
      ]);
    },
  },
};
