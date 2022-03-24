<script src="./Home.js" />
<style src="./Home.scss" lang="scss"></style>
<i18n src="./Home.txt" lang="yaml"></i18n>

<template>
  <span>
    <Banner />
    <div class="banner-area pt-30">
      <div class="custom-container">
        <div class="row">
          <div class="col-lg-4 col-md-4 col-xs-12">
            <div
              class="banner-wrap mb-30 wow fadeIn"
              data-wow-duration="1s"
              data-wow-delay="0.2s"
            >
              <div
                class="banner-img banner-hover banner-zoom"
              >
                <router-link
                  :to="{
                    //TODO: Change to the proper link with proper categorySlug
                    name: 'home',
                    //params: { categorySlug: 'accessories' },
                  }"
                >
                  <img
                    src="../assets/img/jeans1.jpg"
                    alt="banner"
                  />
                  <div class="banner-content">
                    <h3>{{ t('w_jeans') }}</h3>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-4 col-xs-12">
            <div
              class="banner-wrap mb-30 wow fadeIn"
              data-wow-duration="1s"
              data-wow-delay="0.2s"
            >
              <div
                class="banner-img banner-hover banner-zoom"
              >
                <router-link
                  :to="{
                    //TODO: Change to the proper link with proper categorySlug
                    name: 'home',
                    //params: { categorySlug: 'accessories' },
                  }"
                >
                  <img
                    src="../assets/img/sho3.jpg"
                    alt="banner"
                  />
                  <div class="banner-content">
                    <h3>{{ t('sneakers') }}</h3>
                  </div>
                </router-link>
              </div>
            </div>
            <div
              class="banner-wrap mb-30 wow fadeIn"
              data-wow-duration="1s"
              data-wow-delay="0.3s"
            >
              <div
                class="banner-img banner-hover banner-zoom"
              >
                <router-link
                  :to="{
                    //TODO: Change to the proper link with proper categorySlug
                    name: 'home',
                    //params: { categorySlug: 'accessories' },
                  }"
                >
                  <img
                    src="../assets/img/acc.jpg"
                    alt="banner"
                  />
                  <div class="banner-content">
                    <h3>{{ t('accessories') }}</h3>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-4 col-xs-12">
            <div
              class="banner-wrap mb-30 wow fadeIn"
              data-wow-duration="1s"
              data-wow-delay="0.2s"
            >
              <div
                class="banner-img banner-hover banner-zoom"
              >
                <router-link
                  :to="{
                    //TODO: Change to the proper link with proper categorySlug
                    name: 'home',
                    //params: { categorySlug: 'accessories' },
                  }"
                >
                  <img
                    src="../assets/img/s3.jpg"
                    alt="banner"
                  />
                  <div class="banner-content">
                    <h3>{{ t('bathing_suits') }}</h3>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="service-area pt-70 pb-70">
      <div class="container">
        <div class="row">
          <div class="col-lg-3 col-md-6 col-sm-6">
            <div
              class="service-wrap mb-30 wow fadeInUp"
              data-wow-delay="0.1s"
            >
              <div class="service-icon">
                <i class="las la-shipping-fast"></i>
              </div>
              <div class="service-content">
                <h6>{{ t('free_shipping_head') }}</h6>
                <p>
                  {{ t('free_shipping_body') }}&nbsp;
                  <BaseMoney
                    :money="{
                      centAmount: 10000,
                      fractionDigits: 2,
                    }"
                  />
                </p>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6">
            <div
              class="service-wrap mb-30 wow fadeInUp"
              data-wow-delay="0.2s"
            >
              <div class="service-icon">
                <i class="las la-coins"></i>
              </div>
              <div class="service-content">
                <h6>{{ t('return_head') }}</h6>
                <p>{{ t('return_body') }}</p>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6">
            <div
              class="service-wrap mb-30 wow fadeInUp"
              data-wow-delay="0.3s"
            >
              <div class="service-icon">
                <i class="las la-headphones"></i>
              </div>
              <div class="service-content">
                <h6>{{ t('support_head') }}</h6>
                <p>{{ t('support_body') }}</p>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6">
            <div
              class="service-wrap mb-30 wow fadeInUp"
              data-wow-delay="0.4s"
            >
              <div class="service-icon">
                <i class="las la-shield-alt"></i>
              </div>
              <div class="service-content">
                <h6>{{ t('secure_checkout_head') }}</h6>
                <p>{{ t('secure_checkout_body') }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </span>
</template>
