import LineItemInfo from '../LineItemInfo/index.vue';
import BasePrice from '../../BasePrice/index.vue';
import LineItemQuantityForm from '../../../cartdetail/LineItemQuantityForm/index.vue';
import LineItemDeleteForm from '../../../cartdetail/LineItemDeleteForm/index.vue';

export default {
  components: {
    LineItemDeleteForm,
    LineItemQuantityForm,
    BasePrice,
    LineItemInfo,
  },
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
  methods: {
    totalPrice(lineItem) {
      const { centAmount: unitCentAmount, ...unitPrice } = lineItem.price.discounted?.value || lineItem.price.value;
      const originalPrice = {
        ...unitPrice,
        centAmount: unitCentAmount * lineItem.quantity,
      };
      const price = { value: { ...originalPrice } };
      if (originalPrice.centAmount !== lineItem.totalPrice.centAmount) {
        price.discounted = { value: { ...lineItem.totalPrice } };
      }
      return price;
    },
  },
};
