import { inject, provide, ref } from "@vue/composition-api";
import  { SHOPPING_LIST } from '../../../composition/useShoppingList';
import ProductQuickView from '../ProductQuickView/ProductQuickView.vue'
export default {
  data: () => ({
    quantity: 1,
  }),
  components: {
    ProductQuickView,
  },
  props: {
    showModal: Boolean,
    productSku: String,
  },
  setup(){
    const name = ref('')
    // eslint-disable-next-line no-unused-vars
    const shoppingList = inject(SHOPPING_LIST);
    const onAdd = (sku,quantity)=>{
      // eslint-disable-next-line no-console
      console.log('need to add',sku,quantity,name.value)
    }
    provide('ADD_TO_SHOPPING_LIST',{
      onAdd,
      name,
      addCaption:"addToShoppingList"
    });
  },
  // watch: {
  // },
  methods: {
    closeModal() {
      this.$emit('close-modal');
    }
  },
};
