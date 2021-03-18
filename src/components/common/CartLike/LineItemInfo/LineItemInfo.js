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
    selectable: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
      selected: false,
      item: null,
    };
  },

  beforeMount() {
    if (this.selectable) {
      this.item = { lineItemId: this.lineItem.id, quantity: this.lineItem.quantity, shipmentState: 'Advised' };
    }
  },

  watch: {
    selected() {
      if (this.selected === true) {
        this.$emit('select-return-item', this.item);
      }
      if (this.selected === false) {
        this.$emit('unselect-return-item', this.item);
      }
    },
  },

  computed: {
    total() {
      return totalPrice(this.lineItem);
    },
    lineItemAttr() {
      const attributes = variantAttributes(this.lineItem?.variant, locale(this));
      return `${attributes.map(
        ({ name, value }) => `${name}: ${value.length == 1 ? value[0].label : value}`,
      ).join(', ')}`;
    },
  },
  mixins: [productMixin],
};
