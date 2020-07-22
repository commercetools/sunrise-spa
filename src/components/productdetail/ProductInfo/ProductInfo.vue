<style src="./ProductInfo.scss" lang="scss" scoped></style>
<i18n src="./ProductInfo.txt"></i18n>
<script src="./ProductInfo.js"></script>

<template>
  <div class="row" v-if="product">
    <div class="col-lg-5">
      <div class="product-details-tab">
        <ProductGallery :sku="sku" />
      </div>
    </div>
    <div class="col-lg-7">
      <div class="product-details-content product-details-ptb">
        <h2>{{ currentProduct.name }}</h2>
        <h3>
          <BasePrice :price="matchingVariant.price" />
        </h3>
        <VariantSelector :sku="sku" />
        <AddToCartForm :sku="sku" />
        <DetailsSection :sku="sku" />
        <!-- <SocialMediaLinks/> -->

        <!-- <div class="store-delivery-wrap">
          <a href="#"><i class="fa fa-map-marker"></i>Find store near you</a>
          <a href="#"><i class="fa fa-exchange"></i>Delivery and return</a>
        </div>-->
        <!-- <div class="product-dec-peragraph">
          <p>Linen and cotton mix. Straight design. Classic collar. Sleeveless. Removable belt at the waist. Two patch
            pockets on the front. Button fastening on the front section.</p>
        </div>-->
        <!-- <div class="product-dec-meta">
          <span>Categories: <a href="#">Women</a></span>
          <span>Tags: <a href="#">Fashion</a>, <a href="#">Lookbook</a></span>
        </div>-->
        <!-- <div class="product-social">
          <span>Share with</span>
          <ul>
            <li><a data-toggle="tooltip" title="Share this post on Facebook" href="#"><i
                  class="fa fa-facebook"></i></a></li>
            <li><a data-toggle="tooltip" title="Share this post on Twitter" href="#"><i class="fa fa-twitter"></i></a>
            </li>
            <li><a data-toggle="tooltip" title="Share this post on Pinterest" href="#"><i
                  class="fa fa-pinterest-p"></i></a></li>
            <li><a data-toggle="tooltip" title="Share this post on Google Plus" href="#"><i
                  class="fa fa-google-plus"></i></a></li>
          </ul>
        </div>-->
      </div>
    </div>
  </div>
</template>
