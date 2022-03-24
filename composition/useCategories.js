import useLocale from './useLocale';
import useCategories from './ct/useCategories';
import { ref } from 'vue';
//vue specific useCategories
export default ({
  categorySlug = ref(undefined),
  skip = ref(false),
  rootOnly = ref(false),
  sort = ref([]),
}) => {
  const { locale } = useLocale();
  const { total, categories, loading, error } =
    useCategories({
      locale,
      categorySlug,
      rootOnly,
      sort,
      skip,
    });
  return { total, categories, loading, error };
};
