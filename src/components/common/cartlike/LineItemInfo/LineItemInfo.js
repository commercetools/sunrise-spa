import productMixin from '@/mixins/productMixin';
import LineItemQuantityForm from '../../../cartdetail/LineItemQuantityForm/LineItemQuantityForm.vue';
import LineItemDeleteForm from '../../../cartdetail/LineItemDeleteForm/LineItemDeleteForm.vue';
import Remove from '../../../cartdetail/LineItemQuantityForm/Remove/Remove.vue';
import BasePrice from '../../BasePrice/BasePrice.vue';
import { totalPrice, variantAttributes, locale } from '../../shared';

export default {
  components: {
    LineItemQuantityForm,
    Remove,
    BasePrice,
    LineItemDeleteForm,
  },
  props: {
    lineItem: {
      type: Object,
      required: true,
    },
    extended: {
      type: Boolean,
      default: () => true,
    },
    editable: {
      type: Boolean,
      default: () => true,
    },
  },
  computed: {
    total() {
      return totalPrice(this.lineItem);
    },
    nameFromLineItem() {
      const attributes = variantAttributes(this.lineItem?.variant, locale(this));
      return `${this.lineItem.name} ${attributes.map(
        ({ name, value }) => `${name}: ${value}`,
      ).join(', ')}`;
    },
  },
  mixins: [productMixin],
};
