<template>
  <div>
    <div class="row">
      <div class="row text-uppercase hidden-xs cart-items-title">
        <div class="col-sm-6">
          <span>{{ $t('description') }}</span>
        </div>
        <div class="col-sm-2">
          <span>{{ $t('quantity') }}</span>
        </div>
        <div class="col-sm-2 text-right">
          <span>{{ $t('price') }}</span>
        </div>
        <div class="col-sm-2 text-right">
          <span>{{ $t('total') }}</span>
        </div>
      </div>
    </div>
    <div class="row">
      <div v-for="lineItem in cartLike.lineItems"
           :key="lineItem.id"
           data-test="cart-line-item"
           class="row single-cart-item">
        <LineItemInfo :line-item="lineItem"
                      class="col-sm-4 col-xs-12"/>
        <div class="col-sm-4 col-xs-12">
          <slot name="quantity-column"
                :lineItem="lineItem">
            <div class="col-sm-6 col-sm-offset-6 col-xs-12 text-center quantity-counter">
              <span class="visible-xs">{{ $t('quantity') }}:</span>
              <span data-test="cart-line-item-quantity"
                    class="quantity-number">
                {{ lineItem.quantity }}
              </span>
            </div>
          </slot>
        </div>
        <div>
          <div class="col-sm-2 col-xs-12 sm-pull-right">
            <div class="text-right cart-item-price">
              <span class="visible-xs xs-price-title">{{ $t('price') }}</span>
              <BasePrice :price="lineItem.price"/>
            </div>
          </div>
          <div class="col-sm-2 col-xs-12 sm-pull-right">
            <div class="text-right cart-item-price">
              <span class="visible-xs xs-price-title">{{ $t('total') }}</span>
              <span data-test="cart-line-item-total-price">
                <BasePrice :price="totalPrice(lineItem)"/>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <slot name="before-pricing"></slot>
        <CartLikePriceDetail :cartLike="cartLike"
                             class="total-price-calc"/>
      </div>
    </div>
  </div>
</template>

<script>
import LineItemInfo from './LineItemInfo.vue';
import CartLikePriceDetail from './CartLikePriceDetail.vue';
import BasePrice from '../BasePrice.vue';

export default {
  components: {
    BasePrice,
    CartLikePriceDetail,
    LineItemInfo,
  },

  props: {
    cartLike: {
      type: Object,
      required: true,
    },
  },

  methods: {
    totalPrice(lineItem) {
      let price = {};
      if (lineItem.discountedPricePerQuantity.length > 0) {
        price = {
          value: {
            centAmount: (lineItem.price.discounted
              ? lineItem.price.discounted.value.centAmount
              : lineItem.price.value.centAmount) * lineItem.quantity,
            currencyCode: lineItem.price.value.currencyCode,
            fractionDigits: lineItem.price.value.fractionDigits,
          },
          discounted: {
            value: {
              ...lineItem.totalPrice,
            },
          },
        };
      } else {
        price = {
          value: {
            ...lineItem.totalPrice,
          },
        };
      }
      return price;
    },
  },
};
</script>

<i18n>
en:
  description: "Description"
  quantity: "Quantity"
  price: "Price"
  total: "Total"
de:
  description: "Beschreibung"
  quantity: "Menge"
  price: "Preis"
  total: "Gesamtpreis"
</i18n>
