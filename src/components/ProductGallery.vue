<template>
  <div>
      <ProductZoomer
        :base-images="images"
        :base-zoomer-options="zoomerOptions" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data: () => ({
    images: {
      normal_size:
      [
        { id: 1, url: null },
        { id: 2, url: null },
      ],
      // thumbs:
      // [
      //   { id: 3, url: null },
      //   { id: 4, url: null },
      // ],
    },
    zoomerOptions: {
      zoomFactor: 3,
      pane: 'pane',
      hoverDelay: 100,
      namespace: 'zoomer',
      move_by_click: false,
      scroll_items: 4,
      choosed_thumb_border_color: 'lightgrey',
    },
  }),

  created() {
    this.images.normal_size[0].url = this.productInfo.masterData.current.masterVariant.images[0].url;
    // this.images.thumbs[0].url = this.productInfo.masterData.current.masterVariant.images[0].url;
  },

  computed: {
    ...mapGetters(['productInfo']),
  },
};
</script>
