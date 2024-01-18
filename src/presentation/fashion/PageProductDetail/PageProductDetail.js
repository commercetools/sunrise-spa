//@todo: add to shopping list (breadcrumb can go)
// import AddToShoppingList from '../../productoverview/AddToShoppingList/AddToShoppingList.vue';
import { ref } from 'vue';
import useProductTools from 'hooks/useProductTools';
import ProductInfo from './ProductInfo/ProductInfo.vue';
import localMessages from './PageProductDetail.json';
import { useI18n } from 'vue-i18n';

export default {
  name: 'PageProductDetail',
  setup() {
    const { allVariants, currentVariant, sku, error } =
      useProductTools(true);
    const showAddToShoppingList = ref(false);
    const productSku = ref(null);
    const openAddToShoppingList = () => {
      showAddToShoppingList.value = true;
    };
    const closeAddToShoppingList = () => {
      showAddToShoppingList.value = false;
    };
    const { t } = useI18n({messages: localMessages});
    return {
      openAddToShoppingList,
      closeAddToShoppingList,
      productSku,
      allVariants,
      currentVariant,
      error,
      sku,
      t
    };
  },
  components: {
    // Breadcrumb,
    ProductInfo,
    // AddToShoppingList
  },
};
