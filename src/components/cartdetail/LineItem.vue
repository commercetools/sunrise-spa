<template>
  <div data-test="cart-line-item"
       class="row single-cart-item">
    <div class="col-sm-1 col-xs-4 product-img-col">
      <img :src="imageUrl"
           :alt="lineItem.name"
           class="img-responsive cart-item-img">
    </div>
    <div class="col-sm-3 col-xs-8 product-info-text">
      <p class="cart-item-name">
        <router-link data-test="cart-line-item-link"
                     :to="{
                     name: 'product',
                     params: { productSlug: lineItem.productSlug, sku: lineItem.variant.sku }}">
          {{ lineItem.name }}
        </router-link>
      </p>
      <p class="grey-p"
         data-test="cart-line-item-sku">
        {{ lineItem.variant.sku }}
      </p>
      <!--<p class="cart-attributes">-->
        <!--{{#each attributes}}-->
        <!--{{name}}-->
        <!--<span class="black-p" data-model="cartItem.{{key}}">{{value}}</span>-->
        <!--{{#unless @last}}<br>{{/unless}}-->
        <!--{{/each}}-->
      <!--</p>-->
      <!--<p class="cart-item-availability grey-p">-->
        <!--<span class="glyphicon glyphicon-ok-sign"></span>{{ $t('catalog:availability.available') }}-->
      <!--</p>-->
    </div>

    <div v-if="editable">
      <div class="col-sm-2 col-xs-12 cart-edit-delete">
        <div class="edit-section-options">
          <div class="edit-delete-section">
            <button @click="removeLineItem"
                    data-test="cart-line-item-delete">
              <img src="../../assets/img/delete-1.png"
                   class="cart-action-icon"
                   alt="delete">
              {{ $t('delete') }}
            </button>
          </div>
        </div>
      </div>
      <div class="col-sm-2 col-xs-12 clearfix">
        <div class="sm-pull-right visible-xs">
          <button class="quantity-submit-btn">
            <span class="glyphicon glyphicon-refresh"></span>
          </button>
        </div>
        <div class="sm-pull-right quantity-spinner">
          <span @click="quantity -= 1"
                data-test="cart-line-item-quantity-dec"
                class="change-quantity-button input-number-decrement">–</span>
          <input v-model.trim.number="$v.quantity.$model"
                 data-test="cart-line-item-quantity"
                 type="text"
                 class="input-number"/>
          <span @click="quantity += 1"
                data-test="cart-line-item-quantity-inc"
                class="change-quantity-button input-number-increment">+</span>
        </div>
      </div>
    </div>
    <div v-else
         class="col-sm-2 col-sm-offset-2 col-xs-12 text-center quantity-counter">
      <span class="visible-xs">{{ $t('quantity') }}:</span>
      <span data-test="cart-line-item-quantity"
            class="quantity-number">
        {{ lineItem.quantity }}
      </span>
    </div>

    <div :class="editable ? 'col-xs-12 sm-pull-right' : 'col-xs-7'"
         class="col-sm-2">
      <div class="text-right cart-item-price">
        <span class="visible-xs xs-price-title">{{ $t('price') }}</span>
        <span v-if="!hasDiscount"
              data-test="cart-line-item-price">
            {{ formatPrice(originalPrice) }}
        </span>
        <span v-else>
          <span data-test="cart-line-item-discounted-price"
                class="discounted-price">
            {{ formatPrice(originalPrice) }}
          </span>
          <span data-test="cart-line-item-price">
            {{ formatPrice(discountedPrice) }}
          </span>
        </span>
      </div>
    </div>
    <div :class="editable ? 'col-xs-12 sm-pull-right' : 'col-xs-5'"
         class="col-sm-2">
      <div class="text-right cart-item-price">
        <span class="visible-xs xs-price-title">{{ $t('total') }}</span>
        <span data-test="cart-line-item-total-price">
          {{ formatPrice(lineItem.totalPrice) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import debounce from 'lodash.debounce';
import priceMixin from '@/mixins/priceMixin';
import { required, minValue, numeric } from 'vuelidate/lib/validators';

export default {
  mixins: [priceMixin],

  props: {
    lineItem: {
      type: Object,
      required: true,
    },
    editable: {
      type: Boolean,
      default: () => false,
    },
  },

  data: () => ({
    quantity: null,
  }),

  computed: {
    hasDiscount() {
      return this.lineItem.price.discounted;
    },

    originalPrice() {
      return this.lineItem.price.value;
    },

    discountedPrice() {
      return this.lineItem.price.discounted.value;
    },

    imageUrl() {
      const { images } = this.lineItem.variant;
      if (Array.isArray(images) && images.length) {
        return this.lineItem.variant.images[0].url;
      }
      return null;
    },
  },

  methods: {
    changeLineItemQuantity() {
      this.$emit('changeLineItemQuantity', this.lineItem.id, this.quantity);
    },

    removeLineItem() {
      this.$emit('removeLineItem', this.lineItem.id);
    },
  },

  created() {
    this.quantity = this.lineItem.quantity;
    this.debouncedChangeQuantity = debounce(this.changeLineItemQuantity, 500);
  },

  watch: {
    quantity(newValue, oldValue) {
      this.$v.$touch();
      if (newValue !== oldValue && !this.$v.$invalid) {
        this.debouncedChangeQuantity();
      }
    },
  },

  validations: {
    quantity: {
      required,
      numeric,
      minValue: minValue(1),
    },
  },
};
</script>

<style scoped>
  .change-quantity-button {
    margin: 1px;
    border: 0;
  }
</style>

<!-- eslint-disable -->
<i18n>
{
  "en": {
    "delete": "Delete",
    "quantity": "Quantity",
    "price": "Price",
    "total": "Total"
  },
  "de": {
    "delete": "Löschen",
    "quantity": "Menge",
    "price": "Preis",
    "total": "Gesamtpreis"
  }
}
</i18n>
