import { ref } from '@vue/composition-api';
import useProductQuery from '../../../../composition/useProductQuery';

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  setup(props,ctx) {
    const sku = ref(false)
    const {masterVariant} = useProductQuery(props,ctx,sku,props.id);
    return {masterVariant};
  },
  methods: {
    displayedImageUrl(variant) {
      if (Array.isArray(variant.images) && variant.images.length) {
        return variant.images[0].url;
      }
      return null;
    },

    productRoute(productSlug, sku) {
      return {
        name: 'product',
        params: { productSlug, sku },
      };
    },
  },
};
