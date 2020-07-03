import gql from 'graphql-tag';

export default {
  props: {
    sku: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    product: null,
  }),
  computed: {
    productImages() {
      return this.product.masterData.current.variant.images;
    },
    productImage() {
      const img = this.product.masterData.current.variant.images[0]?.url;
      if (img) {
        return img.replace(/_medium.jpg$/, '_large.jpg');
      }
      return undefined;
    },
    zoomerImages() {
      const imageInfos = this.productImages.map((image, index) => ({
        id: index,
        url: image.url,
      }));
      return {
        thumbs: imageInfos,
        normal_size: imageInfos,
        // large_size: imageInfos,
      };
    },
    zoomerOptions() {
      return {
        zoomFactor: 3,
        pane: 'container',
        hoverDelay: 300,
        namespace: 'product-gallery',
        move_by_click: true,
        scroll_items: this.galleryThumbnailsCount,
        choosed_thumb_border_color: '#FEC14E',
        scroller_position: 'bottom',
      };
    },
    galleryThumbnailsCount() {
      return Math.min(this.productImages.length, 3);
    },
  },
  watch: {
    product() {
      setTimeout(
        () => {
          $(this.$refs.easyzoom).easyZoom();
        }, 500,
      );
    },
  },
  apollo: {
    product: {
      query: gql`
        query ProductGallery($sku: String!) {
          product(sku: $sku) {
            id
            masterData {
              current {
                variant(sku: $sku) {
                  sku
                  images {
                    url
                  }
                }
              }
            }
          }
        }`,
      variables() {
        return {
          sku: this.sku,
        };
      },
    },
  },
};
