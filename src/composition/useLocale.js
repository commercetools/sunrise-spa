import { inject, ref, watch } from '@vue/composition-api';
import { localeFromString } from '../components/common/shared';

export default () => {
  const localeFromRoute = inject('locale');
  const locale = ref(localeFromString(localeFromRoute.value));
  watch(
    localeFromRoute,
    (loc)=>{
      locale.value = localeFromString(loc)
    }
  );
  return locale;
};
