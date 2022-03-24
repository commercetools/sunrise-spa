import { computed } from 'vue';
import { useRoute } from 'vue-router';
import useLocale from './useLocale';
import useMyOrderBasic from './ct/useMyOrder';

function useMyOrder() {
  const { locale } = useLocale();
  const route = useRoute();
  const id = computed(() => route.params.id);
  const { loading, error, order } = useMyOrderBasic({
    locale,
    id,
  });

  return { loading, error, order };
}
export default useMyOrder;
