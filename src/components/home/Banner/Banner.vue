<script src="./Banner.js"></script>
<i18n src="./Banner.txt"></i18n>

<template>
  <div class="slider-area">
    <carousel
      animateIn="fadeIn"
      animateOut="fadeOut"
      :autoplayHoverPause="false"
      :nav="false"
      :autoplay="true"
      :items="1"
      class="slider-active-1 nav-style-2"
    >
      <div
        class="single-slider bg-img slider-height-2 align-items-center custom-d-flex"
        style="background-image:url(assets/img/banner_new.jpeg);"
      >
        <div class="container">
          <div class="row height-100-percent align-items-center">
            <div class="col-lg-12 col-md-12 col-sm-12 col-12">
              <div class="slider-content-8 slider-animated-1 text-center">
                <h3 class="animated">{{$t("midSeasonSale")}}</h3>
                <h1 class="animated">{{$t("up50")}}</h1>
                <div class="slider-btn-1">
                  <router-link
                    :to="{ name: 'products', params: { categorySlug: 'sale' } }"
                    class="animated"
                    >{{$t("shopNow")}}</router-link
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="single-slider bg-img slider-height-2 align-items-center custom-d-flex"
        style="background-image:url(assets/img/banner_new2.jpeg);"
      >
        <div class="container">
          <div class="row height-100-percent align-items-center">
            <div class="col-lg-12 col-md-12 col-sm-12 col-12">
              <div class="slider-content-9 slider-animated-1">
                <h1 class="animated"><span>{{$t("checkout")}} </span> {{$t("newCollection")}}</h1>
                <div class="slider-btn-1 text-center">
                  <router-link
                    :to="{ name: 'products', params: { categorySlug: 'new' } }"
                    class="animated"
                    >{{$t("shopNow")}}</router-link
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </carousel>
  </div>
</template>
