import {
  computed,
  onMounted,
  onUnmounted,
  provide,
  shallowRef,
  watch,
} from 'vue';
import { LOCALE } from '../../../../constants';
import { LOCATION } from '../../../../constants';
import { getValue } from '../../../../lib';
import i18n from '../../../../i18n';
import useMiniCart from 'hooks/useMinicart';
import MiniCart from 'presentation/Header/MiniCart/MiniCart.vue';
import useDefaultRouteParams from 'hooks/useDefaultRouteParams';
export default {
  components: {
    MiniCart,
  },
  setup() {
    const { locale, location, setLocale, setLocation } =
      useDefaultRouteParams();
    const { close, isOpen } = useMiniCart();
    const keyUpListener = shallowRef((e) => {
      if (e.key === 'Escape') {
        close();
      }
    });
    provide(LOCALE, { locale, setLocale });
    provide(LOCATION, { location, setLocation });
    const paramsSet = computed(
      () => getValue(locale) && getValue(location)
    );
    watch(paramsSet, (set) => {
      if (set) {
        i18n.global.locale = locale;
      }
    });
    onMounted(() => {
      document.body.addEventListener(
        'keyup',
        keyUpListener.value
      );
    });
    onUnmounted(() => {
      document.body.removeEventListener(
        'keyup',
        keyUpListener.value
      );
    });
    return { paramsSet, isOpen, close };
  },
};
