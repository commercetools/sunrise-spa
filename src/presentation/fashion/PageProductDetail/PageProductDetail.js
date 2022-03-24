//@todo: add to shopping list (breadcrumb can go)
// import AddToShoppingList from '../../productoverview/AddToShoppingList/AddToShoppingList.vue';
import { ref } from 'vue';
import useProductTools from 'hooks/useProductTools';
import ProductInfo from './ProductInfo/ProductInfo.vue';

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
    return {
      openAddToShoppingList,
      closeAddToShoppingList,
      productSku,
      allVariants,
      currentVariant,
      error,
      sku,
    };
  },
  components: {
    // Breadcrumb,
    ProductInfo,
    // AddToShoppingList
  },
};
