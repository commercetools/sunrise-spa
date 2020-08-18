<script src="./ProductQuickView.js"></script>
<style lang="scss" src="./ProductQuickView.scss"></style>
<i18n src="./ProductQuickView.txt"></i18n>

<template>
  <div>
    <modal
      styles="border-radius: 0"
      name="quickView"
      width="1000"
      height="500"
      @closed="closeModal"
    >
      <div class="modal-body">
        <button
          type="button"
          class="close"
          @click="closeModal"
          aria-label="Close"
        >
          <span class="dl-icon-close"></span>
        </button>
        <div class="row no-gutters">
          <div class="col-lg-5 col-md-12 col-sm-12 col-xs-12">
            <ProductGallery :sku="productSku" :quickview="true" />
          </div>
          <div v-if="product" class="col-lg-7 col-md-12 col-sm-12 col-xs-12">
            <div class="product-details-content">
              <h2>{{ currentProduct.name }}</h2>
              <h3><BasePrice :price="matchingVariant.price" /></h3>
              <div class="product-dec-action-wrap">
                <div class="quality-cart-wrap">
                  <div class="quality-wrap">
                    <input
                      class="input-text qty"
                      type="text"
                      maxlength="12"
                      v-model="quantity"
                    />
                  </div>
                  <div class="pro-cart-wrap">
                    <a href @click.prevent="addToCart">{{ $t('addToCart') }}</a>
                  </div>
                </div>
              </div>
              <div class="pt-30">
                <ul class="product-features-list">
                  <li
                    v-for="attribute in productAttributes"
                    data-test="product-attributes-list"
                    :key="attribute.name"
                  >
                    <span class="attribute-name">{{ attribute.name }}:</span>
                    {{ attribute.label || attribute.value }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>
