<template>
  <ProductZoomer v-if="product"
                 :base-images="zoomerImages"
                 :base-zoomer-options="zoomerOptions"
                 :key="productImages"
                 data-test="product-image" />
</template>

<script>
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
        query ProductGallery($sku: String!) {
          product(sku: $sku) {
            id
            masterData {
              current {
                variant(sku: $sku) {
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
</script>

<style>
  .product-gallery-zoomer-box .control svg {
    display: block;
    margin: auto;
  }

  .product-gallery-zoomer-box .thumb-list img {
    max-height: 100px;
    width: auto;
    margin: 2px;
  }
</style>
