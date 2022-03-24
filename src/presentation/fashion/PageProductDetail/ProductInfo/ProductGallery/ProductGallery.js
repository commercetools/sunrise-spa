import { computed } from 'vue';

export default {
  name: 'ProductGallery',
  props: {
    currentVariant: {
      type: Object,
      required: true,
    },
    quickview: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const productImages = computed(() => {
      return props.currentVariant.images;
    });
    const productImage = computed(() => {
      const img = props.currentVariant?.images?.[0]?.url;
      if (img) {
        return img.replace(/_medium.jpg$/, '_large.jpg');
      }
      return undefined;
    });
    const zoomerImages = computed(() => {
      const imageInfos = productImages.value.map(
        (image, index) => ({
          id: index,
          url: image.url,
        })
      );
      return {
        thumbs: imageInfos,
        normal_size: imageInfos,
        // large_size: imageInfos,
      };
    });
    const zoomerOptions = computed(() => {
      return {
        zoomFactor: 3,
        pane: 'container',
        hoverDelay: 300,
        namespace: 'product-gallery',
        move_by_click: true,
        scroll_items: galleryThumbnailsCount.value,
        choosed_thumb_border_color: '#FEC14E',
        scroller_position: 'bottom',
      };
    });
    const galleryThumbnailsCount = computed(() => {
      return Math.min(productImages.value.length, 3);
    });
    return {
      productImages,
      productImage,
      zoomerImages,
      zoomerOptions,
      galleryThumbnailsCount,
    };
  },
};
