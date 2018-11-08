<template>
  <ProductZoomer data-test="product-image"
                 :base-images="images"
                 :base-zoomer-options="zoomerOptions" />
</template>

<script>
export default {
  props: {
    productImages: {
      type: Array,
      required: true,
    },
  },

  computed: {
    images() {
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
        scroll_items: Math.min(this.productImages.length, 3),
        choosed_thumb_border_color: '#FEC14E',
      };
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
