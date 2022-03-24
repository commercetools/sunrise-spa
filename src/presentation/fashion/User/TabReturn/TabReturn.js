import BaseMoney from 'presentation/components/BaseMoney/BaseMoney.vue';
import BaseDate from 'presentation/components/BaseDate/BaseDate.vue';
import LineItemInfo from 'presentation/CartDetail/CartLikeContentDetail/LineItemInfo/LineItemInfo.vue';
import CartLikeContentDetail from 'presentation/CartDetail/CartLikeContentDetail/CartLikeContentDetail.vue';
import BaseAddress from 'presentation/components/BaseAddress/BaseAddress.vue';
import { shallowRef } from 'vue';
import { useI18n } from 'vue-i18n';
import useCustomerTools from 'hooks/useCustomerTools';

export default {
  components: {
    CartLikeContentDetail,
    BaseDate,
    BaseMoney,
    BaseAddress,
    LineItemInfo,
  },
  setup() {
    const { t } = useI18n();
    const selectedItems = shallowRef([]);
    const tools = useCustomerTools();
    const { loading, order } = tools.useMyOrder();
    function updateSelectedItems(items) {
      selectedItems.value = items;
    }
    function submitReturn() {
      if (selectedItems.value.length === 0) {
        alert(t('alert'));
      } else {
        return tools.returnItems(
          order.value.id,
          order.value.version,
          selectedItems.value
        );
      }
    }
    return {
      t,
      updateSelectedItems,
      submitReturn,
      loading,
      order,
    };
  },
};
