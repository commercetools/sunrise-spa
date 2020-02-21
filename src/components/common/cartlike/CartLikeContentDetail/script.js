import LineItemInfo from '../LineItemInfo/index.vue';
import BasePrice from '../../BasePrice/index.vue';
import LineItemQuantityForm from '../../../cartdetail/LineItemQuantityForm/index.vue';
import LineItemDeleteForm from '../../../cartdetail/LineItemDeleteForm/index.vue';
import { totalPrice } from '../../shared';

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
    totalPrice,
  },
};
