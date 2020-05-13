import productMixin from '@/mixins/productMixin';
import LineItemQuantityForm from '../../../cartdetail/LineItemQuantityForm/index.vue';
import Remove from '../../../cartdetail/LineItemQuantityForm/Remove/index.vue';
import BasePrice from '../../BasePrice/index.vue';
import BaseMoney from '../../BaseMoney/index.vue';

export default {
  components: {
    LineItemQuantityForm,
    Remove,
    BasePrice,
    BaseMoney,
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
