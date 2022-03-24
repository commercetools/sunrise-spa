<script src="./Banner.js" />
<style src="./Banner.scss" lang="scss"></style>
<i18n src="./Banner.txt" lang="yaml"></i18n>

<template>
  <transition name="slide-fade" appear>
    <vueper-slides
      autoplay
      class="slider-area"
      :arrows="false"
      :pause-on-hover="false"
      :fade="true"
      :bulletsOutside="true"
    >
      <vueper-slide v-for="(slide, i) in slides" :key="i">
        <template v-slot:content="">
          <div
            class="single-slider bg-img slider-height-2 align-items-center custom-d-flex"
            :style="`background-image:url(${require(`presentation/assets/img/${slide.content.bgImage}`)});`"
          >
            <div class="container">
              <div
                class="row height-100-percent align-items-center"
              >
                <div
                  class="col-lg-12 col-md-12 col-sm-12 col-12"
                >
                  <div
                    class="slider-content-8 slider-animated-1 text-center"
                  >
                    <!--<h3 class="animated">{{t("midSeasonSale")}}</h3>
                <h1 class="animated">{{t("up50")}}</h1>-->
                    <h3 class="animated">
                      {{ t(slide.content.h3Message) }}
                    </h3>
                    <h1 class="animated">
                      {{ t(slide.content.h1Message) }}
                    </h1>
                    <div class="slider-btn-1">
                      <router-link
                        :to="{ name: 'home' }"
                        class="animated"
                        ><!--{t("shopNow")}}-->
                        {{
                          t(slide.content.bttnText)
                        }}</router-link
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </vueper-slide>
    </vueper-slides>
  </transition>
</template>

<style>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: opacity 2s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
}
</style>
