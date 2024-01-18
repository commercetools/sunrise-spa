import VariantSelector from './VariantSelector/VariantSelector.vue';
import BasePrice from 'presentation/components/BasePrice/BasePrice.vue';
import AddToCartForm from './AddToCartForm/AddToCartForm.vue';
import DetailsSection from './DetailsSection/DetailsSection.vue';
import ProductGallery from './ProductGallery/ProductGallery.vue';
import localMessages from './ProductInfo.json';
import { useI18n } from 'vue-i18n';

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
    const { t } = useI18n({messages: localMessages});
    return { openAddToShoppingList, t };
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
