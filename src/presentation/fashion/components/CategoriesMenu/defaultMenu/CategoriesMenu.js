import { ref } from 'vue';
import { useRoute } from 'vue-router';
import useCategories from 'hooks/useCategories';
import localMessages from './CategoriesMenu.json';
import { useI18n } from 'vue-i18n';

export default {
  name: 'CategoriesMenu',
  setup() {
    const route = useRoute();
    const { categories } = useCategories({
      rootOnly: ref(true),
      sort: ref(['orderHint asc']),
    });
    const { t } = useI18n({messages: localMessages});
    const isActive = (slug) =>
      slug === route.params.categorySlug;
    return {
      categories,
      isActive,
      t
    };
  },
};
