<style src="./MiniCart.scss" lang="scss" scoped></style>
<i18n src="./MiniCart.txt"></i18n>
<script src="./MiniCart.js"></script>

<template>
  <span>
    <div
      class="sidebar-cart-active"
      :class="{ inside: show }"
      data-test="mini-cart-content"
    >
      <div class="sidebar-cart-all">
        <a
          class="cart-close"
          href="javascript:;"
          @click="close"
          data-test="mini-cart-close-button"
        >
          <i class="dl-icon-close"></i>
        </a>
        <div class="cart-content">
          <h3>{{ $t('miniCart') }}</h3>
          <span v-if="cartNotEmpty">
            <ul>
              <li
                v-for="lineItem in sortedLineItems"
                :key="lineItem.id"
                data-test="mini-cart-line-item"
                class="single-product-cart"
              >
                <div class="cart-img">
                  <router-link
                    :to="
                      productRoute(lineItem.productSlug, lineItem.variant.sku)
                    "
                  >
                    <img
                      :src="displayedImageUrl(lineItem.variant)"
                      :alt="lineItem.name"
                    />
                  </router-link>
                </div>
                <div class="cart-title">
                  <h4>
                    <router-link
                      :to="
                        productRoute(lineItem.productSlug, lineItem.variant.sku)
                      "
                      data-test="cart-line-item-link"
                    >
                      {{ nameFromLineItem(lineItem) }}
                    </router-link>
                  </h4>
                  <span
                    data-test="cart-line-item-quantity"
                  >
                    {{ lineItem.quantity }} ×
                    <BasePrice :price="totalPrice(lineItem)"
                  /></span>
                </div>
                <LineItemDeleteForm :lineItemId="lineItem.id" />
              </li>
            </ul>
            <div class="cart-total">
              <h4>
                {{ $t('subtotal') }}:
                <BasePrice
                  :price="subtotal"
                  data-test="mini-cart-price"
                />
              </h4>
            </div>
            <div class="cart-checkout-btn">
              <router-link
                :to="{ name: 'cart' }"
                @click="close"
                class="btn-grey"
              >
                {{ $t('viewBag') }}
              </router-link>
              <router-link
                :to="{ name: 'checkout' }"
                data-test="checkout-button"
                @click="close"
                >{{ $t('checkout') }}</router-link
              >
            </div>
          </span>
          <span v-if="!cartNotEmpty">
            <h5>{{ $t('emptyCart') }}</h5>
          </span>
        </div>
      </div>
    </div>
  </span>
</template>
