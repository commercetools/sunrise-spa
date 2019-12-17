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
          <div v-if="editable">
            <LineItemDeleteForm :lineItemId="lineItem.id"
                                class="col-sm-5 cart-edit-delete"/>
            <LineItemQuantityForm :lineItemId="lineItem.id"
                                  :quantity="lineItem.quantity"
                                  class="col-sm-7 clearfix sm-pull-right"/>
          </div>
          <div v-else
               class="col-sm-6 col-sm-offset-6 col-xs-12 text-center quantity-counter">
            <span class="visible-xs">{{ $t('quantity') }}:</span>
            <span data-test="cart-line-item-quantity"
                  class="quantity-number">
              {{ lineItem.quantity }}
            </span>
          </div>
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
  </div>
</template>

<script>
import LineItemInfo from './LineItemInfo.vue';
import BasePrice from '../BasePrice.vue';
import LineItemQuantityForm from '../../cartdetail/LineItemQuantityForm.vue';
import LineItemDeleteForm from '../../cartdetail/LineItemDeleteForm.vue';

export default {
  components: {
    LineItemDeleteForm,
    LineItemQuantityForm,
    BasePrice,
    LineItemInfo,
  },

  props: {
    cartLike: {
      type: Object,
      required: true,
    },
    editable: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    totalPrice(lineItem) {
      const { centAmount: unitCentAmount, ...unitPrice } = lineItem.price.discounted?.value || lineItem.price.value;
      const originalPrice = {
        ...unitPrice,
        centAmount: unitCentAmount * lineItem.quantity,
      };
      const price = { value: { ...originalPrice } };
      if (originalPrice.centAmount !== lineItem.totalPrice.centAmount) {
        price.discounted = { value: { ...lineItem.totalPrice } };
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
