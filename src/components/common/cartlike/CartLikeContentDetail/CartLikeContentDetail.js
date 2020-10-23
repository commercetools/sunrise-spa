import BasePrice from '../../BasePrice/BasePrice.vue';
import LineItemQuantityForm from '../../../cartdetail/LineItemQuantityForm/LineItemQuantityForm.vue';
import LineItemDeleteForm from '../../../cartdetail/LineItemDeleteForm/LineItemDeleteForm.vue';
import LineItemInfo from '../LineItemInfo/LineItemInfo.vue';
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
    selectable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selectedReturnItems: [],
    };
  },
  watch: {
    selectedReturnItems() {
      this.$emit('update-selected-items', this.selectedReturnItems);
    },
  },
  methods: {
    totalPrice,
    selectReturnItem(id) {
      this.selectedReturnItems.push(id);
    },
    unselectReturnItem(id) {
      const i = this.selectedReturnItems.indexOf(id);
      this.selectedReturnItems.splice(i, 1);
    },
  },
};
