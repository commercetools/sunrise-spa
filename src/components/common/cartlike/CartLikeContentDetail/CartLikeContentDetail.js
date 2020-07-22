import LineItemInfo from '../LineItemInfo/LineItemInfo.vue';
import BasePrice from '../../BasePrice/BasePrice.vue';
import LineItemQuantityForm from '../../../cartdetail/LineItemQuantityForm/LineItemQuantityForm.vue';
import LineItemDeleteForm from '../../../cartdetail/LineItemDeleteForm/LineItemDeleteForm.vue';
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
      default: true,
    },
  },
  methods: {
    totalPrice,
  },
};
