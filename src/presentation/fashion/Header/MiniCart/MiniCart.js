//@todo: we need this scrollbar for correct style
// import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import { useI18n } from 'vue-i18n';
import BasePrice from 'presentation/components/BasePrice/BasePrice.vue';
import LineItemDeleteForm from 'presentation/components/LineItemQuantityForm/Remove/Remove.vue';
import useMiniCart from 'hooks/useMinicart';
import useCart from 'hooks/useCart';
import useCartTools from 'hooks/useCartTools';

export default {
  name: 'MiniCart',
  components: {
    LineItemDeleteForm,
    // LineItemInfo,
    // VuePerfectScrollbar,
    BasePrice,
  },
  setup() {
    const { open, close, isOpen } = useMiniCart();
    const { cart, loading, error } = useCart();

    //@todo: close minicart if deleting line has empty cart
    //  usecartNotEmpty from CartLike
    const { t } = useI18n();
    return {
      t,
      open,
      close,
      isOpen,
      cart,
      loading,
      error,
      ...useCartTools(),
    };
  },
};
