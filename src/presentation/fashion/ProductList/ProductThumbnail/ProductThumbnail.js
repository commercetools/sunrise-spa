import { useI18n } from 'vue-i18n';
import BasePrice from 'presentation/components/BasePrice/BasePrice.vue';
import { computed } from 'vue';

export default {
  name: 'ProductThumbnail',
  components: {
    BasePrice,
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
    addToCart: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const productRoute = (productSlug, sku) => ({
      name: 'product',
      params: {
        productSlug,
        sku,
      },
    });
    const displayedImageUrl = (variant) => {
      if (
        Array.isArray(variant.images) &&
        variant.images.length
      ) {
        return variant.images[0].url;
      }
      return require('presentation/assets/img/missing.svg');
    };
    const { t } = useI18n();
    const hasPrice = computed(
      () => props?.product?.masterVariant?.scopedPrice
    );
    const hasDiscount = computed(
      () =>
        props?.product?.masterVariant?.scopedPrice
          ?.discounted
    );
    return {
      productRoute,
      displayedImageUrl,
      t,
      hasPrice,
      hasDiscount,
    };
  },
};
