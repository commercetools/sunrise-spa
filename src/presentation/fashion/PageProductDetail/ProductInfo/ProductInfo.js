import VariantSelector from './VariantSelector/VariantSelector.vue';
import BasePrice from 'presentation/components/BasePrice/BasePrice.vue';
import AddToCartForm from './AddToCartForm/AddToCartForm.vue';
import DetailsSection from './DetailsSection/DetailsSection.vue';
import ProductGallery from './ProductGallery/ProductGallery.vue';

export default {
  name: 'ProductInfo',
  props: {
    sku: {
      type: String,
      required: true,
    },
    currentVariant: {
      type: Object,
      required: true,
    },
    allVariants: {
      type: Array,
      required: true,
    },
  },
  setup(props, { emit }) {
    //@todo: implement open shopping list
    const openAddToShoppingList = () => {
      emit('open-add-shopping-list', {
        slug: props.currentVariant.slug,
        sku: props.currentVariant.sku,
      });
    };
    return { openAddToShoppingList };
  },
  components: {
    DetailsSection,
    ProductGallery,
    // SocialMediaLinks,
    AddToCartForm,
    BasePrice,
    VariantSelector,
  },
};
