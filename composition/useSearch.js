import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const useSearch = () => {
  const route = useRoute();
  const router = useRouter();
  const search = computed(() => route?.query?.q || '');
  const setSearch = (q) =>
    router.push({
      ...route,
      query: {
        ...route.query,
        q,
      },
    });

  return {
    search,
    setSearch,
  };
};
export default useSearch;
