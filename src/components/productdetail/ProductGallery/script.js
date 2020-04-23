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
      const selected = this.product.masterData.staged || this.product.masterData.current;
      return selected.variant.images;
    },
    baseSku() {
      const selected = this.product.masterData.staged || this.product.masterData.current;
      return selected.variant.sku;
    },
    zoomerImages() {
      const imageInfos = this.productImages.map((image, index) => ({
        id: index,
        url: image.url,
      }));
      return {
        thumbs: imageInfos,
        normal_size: imageInfos,
        large_size: imageInfos,
      };
    },
    zoomerOptions() {
      return {
        zoomFactor: 4,
        pane: 'pane',
        hoverDelay: 300,
        namespace: 'product-gallery',
        move_by_click: true,
        scroll_items: this.galleryThumbnailsCount,
        choosed_thumb_border_color: '#FEC14E',
      };
    },
    galleryThumbnailsCount() {
      return Math.min(this.productImages.length, 3);
    },
  },
  apollo: {
    product: {
      query: gql`
        query ProductGallery($sku: String!, $preview: Boolean!) {
          product(sku: $sku) {
            id
            masterData {
              current @skip(if: $preview) {
                variant(sku: $sku) {
                  ...variantFields
                }
              }

              staged @include(if: $preview) {
                variant(sku: $sku) {
                  ...variantFields
                }
              }
            }
          }
        }
        
        fragment variantFields on ProductVariant {
          sku
          images {
            url
          }
        }`,
      variables() {
        return {
          sku: this.sku,
          preview: this.$route.query.preview === 'true' || false,
        };
      },
    },
  },
};
