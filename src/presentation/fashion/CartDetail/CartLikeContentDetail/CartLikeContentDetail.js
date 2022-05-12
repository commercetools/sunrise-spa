import { useI18n } from 'vue-i18n';
import LineItemInfo from './LineItemInfo/LineItemInfo.vue';
import { shallowRef } from 'vue';
export default {
  components: {
    LineItemInfo,
  },
  props: {
    cart: {
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
    returnedItem: {
      type: Boolean,
      default: false,
    },
  },
  setup(_, { emit }) {
    const { t } = useI18n();
    const selectedReturnItems = shallowRef([]);
    const selectReturnItem = (item) => {
      selectedReturnItems.value = selectedReturnItems.value
        .filter(
          ({ lineItemId }) => lineItemId !== item.lineItemId
        )
        .concat(item);
      emit(
        'update-selected-items',
        selectedReturnItems.value
      );
    };
    const unselectReturnItem = (item) => {
      selectedReturnItems.value =
        selectedReturnItems.value.filter(
          ({ lineItemId }) => lineItemId !== item.lineItemId
        );
      emit(
        'update-selected-items',
        selectedReturnItems.value
      );
    };
    return { selectReturnItem, unselectReturnItem, t };
  },
};
