import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const useSearch = () => {
  const route = useRoute();
  const router = useRouter();
  const search = computed(() => route?.query?.q || '');
  const setSearch = (q) => {
    const params = {
      categorySlug: route?.params?.categorySlug || 'all',
    };
    return router.push({
      ...route,
      name: 'products',
      query: {
        ...route.query,
        q,
      },
      params,
    });
  };

  return {
    search,
    setSearch,
  };
};
export default useSearch;
