import Vue from 'vue';
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import { inject, computed } from '@vue/composition-api';
import { SHOPPING_LIST } from '../../../composition/useShoppingList';
import useLocale from '../../../composition/useLocale';
import ShoppingListProduct from './ShoppingListProduct/ShoppingListProduct.vue'
export default {
  components: {
    VuePerfectScrollbar,
    ShoppingListProduct
  },
  setup() {
    const {shoppingList, removeLineItem} = inject(SHOPPING_LIST);
    const locale = useLocale()
    const totalShoppingCartItems = computed(() => {
      return (shoppingList.value?.lineItems || []).reduce(
        (total, { quantity }) => total + quantity,
        0
      );
    });
    const listNotEmpty = computed(() => {
      return totalShoppingCartItems.value > 0
    });
    const lineItems = computed(() => {
      return (shoppingList.value?.lineItems||[]).map(
        item=>({
          ...item,
          name: item.name[locale.value]
        })
      )
    });
    return {
      shoppingList,
      totalShoppingCartItems,
      listNotEmpty,
      lineItems,
      removeLineItem
    };
  },

  computed: {
    show() {
      return this.$store.state.shoppingListOpen;
    },
  },
  methods: {
    open() {
      this.$store.dispatch('openShoppingList');
    },
    close() {
      this.$store.dispatch('closeShoppingList');
    },
    removeItem(itemId) {
      this.removeLineItem(
        itemId,
        this.shoppingList.id,
        this.shoppingList.version
      )
    }
 },
  watch: {
    show(newValue, oldValue) {
      if (newValue && !oldValue) {
        Vue.nextTick(() => $('.nav-minicart section').scrollTop(0));
      }
    },
  },
};
