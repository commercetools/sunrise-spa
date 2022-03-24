import { ref } from 'vue';
import { useRoute } from 'vue-router';
import useCategories from 'hooks/useCategories';

export default {
  name: 'CategoriesMenu',
  setup() {
    const route = useRoute();
    const { categories } = useCategories({
      rootOnly: ref(true),
      sort: ref(['orderHint asc']),
    });
    const isActive = (slug) =>
      slug === route.params.categorySlug;
    return {
      categories,
      isActive,
    };
  },
};
