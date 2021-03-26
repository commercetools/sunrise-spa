import ProductGallery from '../ProductGallery/ProductGallery.vue';
import SocialMediaLinks from '../SocialMediaLinks/SocialMediaLinks.vue';
import DetailsSection from '../DetailsSection/DetailsSection.vue';
import AddToCartForm from '../AddToCartForm/AddToCartForm.vue';
import BasePrice from '../../common/BasePrice/BasePrice.vue';
import VariantSelector from '../VariantSelector/VariantSelector.vue';
import useProductQuery from '../../../composition/useProductQuery';

export default {
  props: {
    sku: {
      type: String,
      required: true,
    },
  },
  setup(props,ctx){
    return useProductQuery(props,ctx,props=>props.sku);
  },
  components: {
    DetailsSection,
    ProductGallery,
    SocialMediaLinks,
    AddToCartForm,
    BasePrice,
    VariantSelector,
  },
  computed: {
    matchingVariant() {
      return this.currentProduct.variant || {};
    },
    availability() {
      return this.currentProduct
        ?.variant
        ?.availability
        ?.channels
        ?.results?.[0]
        ?.availability;
    },
    isOnStock() {
      const inStock = this.availability?.isOnStock;
      return typeof inStock !== "boolean"
        ? true
        : inStock
    },
    availableQuantity() {
      return this.availability?.availableQuantity;
    },
    availableQ() {
      return typeof this.availableQuantity !== "undefined"
    },

  },
};
