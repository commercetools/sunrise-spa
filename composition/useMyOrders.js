import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useMyOrdersBasic from './ct/useMyOrders';
import usePaging from './usePaging';

function useMyOrders() {
  const route = useRoute();
  const router = useRouter();
  const page = computed(() =>
    Number(route.params.page || 1)
  );
  const { limit, offset } = usePaging(page);
  const setPage = (page) =>
    router.push({
      ...route,
      params: {
        ...route.params,
        page,
      },
    });
  const { error, loading, orders, total } =
    useMyOrdersBasic({ limit, offset });
  return { page, error, loading, orders, total, setPage };
}
export default useMyOrders;
