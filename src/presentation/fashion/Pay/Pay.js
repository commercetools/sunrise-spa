import { shallowRef, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import useCart from '../../../../composition/useCart';
import useCartTools from '../../../../composition/useCartTools';

export default {
  setup() {
    const { t } = useI18n();
    const orderComplete = shallowRef(false);
    const route = useRoute();
    const { cart } = useCart();
    const cartTools = useCartTools();
    const saved = shallowRef(false);

    watch([cart, saved], ([cart, s]) => {
      if (cart && !s) {
        saved.value = true;
        cartTools
          .createMyOrderFromCart({
            method: route.params.method,
            cart,
          })
          .then(() => {
            orderComplete.value = true;
          })
          .catch((error) => console.warn('error:', error));
      }
    });

    return { t, orderComplete };
  },
};
