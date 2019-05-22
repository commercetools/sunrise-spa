<template>
  <div class="home-page">
    <div class="home-banner-option-one">
      <div class="container-fluid">
        <div class="row">
          <BannerTopLeft/>
          <BannerTopRight/>
        </div>
      </div>
    </div>
    <div class="home-banner-option-two">
      <div class="container-fluid">
        <div class="row">
          <BannerMiddle/>
        </div>
      </div>
    </div>
    <div class="home-banner-option-three">
      <div class="container-fluid">
        <div class="row">
          <BannerBottomLeft/>
          <BannerBottomRight/>
        </div>
      </div>
    </div>

    <div class="container">
      <!--{{> catalog/home/home-suggestions}}-->
      <div class="home-viewall">
        <!-- Home page -->
        <!--{{> catalog/home/view-products-link}}-->
      </div>
    </div>
  </div>
</template>

<script>
import BannerTopLeft from './BannerTopLeft.vue';
import BannerTopRight from './BannerTopRight.vue';
import BannerMiddle from './BannerMiddle.vue';
import BannerBottomLeft from './BannerBottomLeft.vue';
import BannerBottomRight from './BannerBottomRight.vue';

export default {

  components: {
    BannerTopLeft,
    BannerTopRight,
    BannerMiddle,
    BannerBottomLeft,
    BannerBottomRight,
  },
};
</script>
