<template>
  <div>
    <div class="col-md-4 col-md-offset-1 col-sm-6">
      <!-- {{> catalog/pdp/product-gallery gallery=product.gallery}} -->
    </div>
    <div class="col-sm-6 product-description">
      <div class="row">
        <div class="col-sm-12">

        </div>
      </div>
      <div class="row">
        <div class="col-sm-12">
          <!-- {{> catalog/product-rating }} -->
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12">
          <p class="pdp-product-description view-details more"
            data-text-show="$t('description.show')"
            data-text-hide="$t('description.hide')">
          </p>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12">
          <!-- {{> catalog/product-price}} -->
        </div>
      </div>
      <!-- {{> catalog/add-to-cart}}
      {{> catalog/add-to-wishlist-btn}}
      {{> catalog/reserve-in-store-btn}} -->
      <div class="row">
        <div class="col-sm-12">
          <!-- {{> catalog/product-availability availability=product.availability}} -->
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12">
          <div class="panel-group panel-group-pdp"
               id="accordion-product-info"
               role="tablist"
               aria-multiselectable="true">
            <!-- {{> catalog/pdp/product-details}}
            {{> catalog/pdp/delivery-rates}} -->
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12">
          <!-- {{> catalog/pdp/product-social}} -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

};
</script>

