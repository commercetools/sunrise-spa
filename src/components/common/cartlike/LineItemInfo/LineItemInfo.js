import productMixin from '@/mixins/productMixin';
import LineItemQuantityForm from '../../../cartdetail/LineItemQuantityForm/LineItemQuantityForm.vue';
import LineItemDeleteForm from '../../../cartdetail/LineItemDeleteForm/LineItemDeleteForm.vue';
import Remove from '../../../cartdetail/LineItemQuantityForm/Remove/Remove.vue';
import BasePrice from '../../BasePrice/BasePrice.vue';
import BaseMoney from '../../BaseMoney/BaseMoney.vue';

export default {
  components: {
    LineItemQuantityForm,
    Remove,
    BasePrice,
    BaseMoney,
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
  },
  computed: {
    dump() {
      // console.log(this.lineItem);
      return 22;
    },
  },
  mixins: [productMixin],
};
