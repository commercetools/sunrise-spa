<template>
  <div>
      <ProductZoomer
        :base-images="images"
        :base-zoomer-options="zoomerOptions" />
  </div>
</template>

<script>
export default {
  props: {
    productImage: {
      type: String,
      required: true,
    },
  },

  data: () => ({
    images: {
      normal_size:
      [
        { id: 1, url: null },
        { id: 2, url: null },
        { id: 3, url: null },
      ],
      // thumbs:
      // [
      //   { id: 3, url: null },
      // ],
    },
    zoomerOptions: {
      zoomFactor: 3,
      pane: 'container-round',
      hoverDelay: 100,
      namespace: 'zoomer',
      move_by_click: false,
      scroll_items: 4,
      choosed_thumb_border_color: 'lightgrey',
    },
  }),

  created() {
    this.images.normal_size[0].url = this.productImage;
    this.images.normal_size[1].url = this.productImage;
    this.images.normal_size[2].url = this.productImage;
    // this.images.thumbs[0].url = this.productImage;
  },
};
</script>
