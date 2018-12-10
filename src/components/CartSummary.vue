<template>
  <div v-if="me && cart">
    <div class="row">
      <div class="row text-uppercase hidden-xs cart-items-title">
        <div class="col-sm-6">
          <span>{{ $t('main.common.description') }}</span>
        </div>
        <div :class="!editable ? 'text-center' : ''"
             class="col-sm-2">
          <span>{{ $t('main.common.quantity') }}</span>
        </div>
        <div class="col-sm-2 text-right">
          <span>{{ $t('main.common.price') }}</span>
        </div>
        <div class="col-sm-2 text-right">
          <span>{{ $t('checkout.total') }}</span>
        </div>
      </div>
    </div>
    <div v-for="lineItem in cart.lineItems"
         :key="lineItem.id"
         class="row single-cart-item">
      <div class="col-sm-1 col-xs-4 product-img-col">
        <img :src="lineItem.variant.images[0].url"
             :alt="lineItem.name"
             class="img-responsive cart-item-img">
      </div>
      <div class="col-sm-3 col-xs-8 product-info-text">
        <p class="cart-item-name">
          <router-link :to="{ name: 'product',
            params: { productSlug: lineItem.productSlug, sku: lineItem.variant.sku }}">
            {{ lineItem.name }}
          </router-link>
        </p>
        <p class="grey-p">{{ lineItem.variant.sku }}</p>
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
              <button @click="deleteLineItem(lineItem)">
                <img src="../assets/img/delete-1.png"
                     class="cart-action-icon"
                     alt="delete">
                {{ $t('main.form.delete') }}
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
            <span class="input-number-decrement">–</span>
            <input :value="lineItem.quantity"
                   name="quantity"
                   class="input-number"
                   type="text"/>
            <span class="input-number-increment">+</span>
          </div>
        </div>
      </div>
      <div v-else
           class="col-sm-2 col-sm-offset-2 col-xs-12 text-center quantity-counter">
        <span class="visible-xs">{{ $t('main.common.quantity') }}:</span>
        <span class="quantity-number">{{ lineItem.quantity }}</span>
      </div>

      <div :class="editable ? 'col-xs-12 sm-pull-right' : 'col-xs-7'"
           class="col-sm-2">
        <div class="text-right cart-item-price">
          <span class="visible-xs xs-price-title">{{ $t('main.common.price') }}</span>
          <span v-if="!hasDiscount(lineItem)"
                data-test="line-item-original-price">
              {{ formatPrice(originalPrice(lineItem)) }}
          </span>
          <span v-else>
            <span data-test="line-item-discounted-price"
                  class="discounted-price">
              {{ formatPrice(originalPrice(lineItem)) }}
            </span>
            <span data-test="line-item-discount-price">
              {{ formatPrice(discountedPrice(lineItem)) }}
            </span>
          </span>
        </div>
      </div>
      <div :class="editable ? 'col-xs-12 sm-pull-right' : 'col-xs-5'"
           class="col-sm-2">
        <div class="text-right cart-item-price">
          <span class="visible-xs xs-price-title">{{ $t('checkout.total') }}</span>
          <span>{{ formatPrice(lineItem.totalPrice) }}</span>
        </div>
      </div>
    </div>
    <!--{{> checkout/order-summary/discount-code-input}}-->
    <!--{{> checkout/order-summary/discount-summary}}-->
    <!--{{#if checkoutConfirmation}}-->
    <!--{{> checkout/order-summary/confirmation-checkboxes}}-->
    <!--{{/if}}-->
    <div class="row">
      <div class="col-sm-12">
        <div class="total-price-calc">
          <div class="row">
            <div class="col-sm-10 col-xs-7">
              <div class="text-right subtotal">
                <span class="subtotal-title">{{ $t('checkout.subtotal') }}</span>
              </div>
              <div class="text-right">
                <!--<span class="order-discount">{{ $t('checkout.orderDiscount') }}</span>-->
              </div>
              <div v-if="cart.shippingInfo"
                   class="text-right delivery-info">
                <span class="delivery-info-title">{{ $t('checkout.shipping') }}</span>
              </div>
              <hr class="total-divider">
              <div v-if="cart.taxedPrice"
                   class="text-right">
                <span>{{ $t('main.common.salesTax') }}</span>
              </div>
              <div class="text-right">
                <span class="order-total">{{ $t('checkout.total') }}</span>
              </div>
            </div>
            <div class="col-sm-2 col-xs-5 text-right">
              <div>
                <span>{{ formatPrice(subtotal) }}</span>
              </div>
              <div>
                <!--<span class="order-discount">{{ cart.discount }}</span>-->
              </div>
              <div>
                <span v-if="cart.shippingInfo">{{ formatPrice(cart.shippingInfo.price) }}</span>
              </div>
              <hr>
              <div>
                <span v-if="cart.taxedPrice">{{ cart.salesTax }}</span>
              </div>
              <div>
                <span class="order-total">{{ formatPrice(cart.totalPrice) }}</span>
              </div>
            </div>

            <!--{{#if checkoutConfirmation}}-->
            <!--<div class="complete-order">-->
              <!--<button id="confirmation-completeorder-btn"-->
                      <!--class="btn complete-order-btn">{{ $t('checkout.completeMyOrder') }}</button>-->
              <!--<br>-->
            <!--</div>-->
            <!--{{/if}}-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import priceMixin from '@/mixins/priceMixin';

const cartSummaryInfoFragment = gql`
  fragment CartSummaryInfo on Cart {
    id
    version
    totalPrice {
      ...CartPriceInfo
    }
    lineItems {
      id
      productSlug(locale: $locale)
      name(locale: $locale)
      quantity
      price {
        value {
          ...CartPriceInfo
        }
        discounted {
          value {
            ...CartPriceInfo
          }
        }
      }
      totalPrice {
        ...CartPriceInfo
      }
      variant {
        sku
        images {
          url
        }
      }
    }
    shippingInfo {
      price {
        ...CartPriceInfo
      }
    }
    taxedPrice {
      totalGross {
        ...CartPriceInfo
      }
      totalNet {
        ...CartPriceInfo
      }
    }
  }
  fragment CartPriceInfo on Money {
    centAmount
    currencyCode
    fractionDigits
  }`;

export default {
  props: {
    editable: {
      type: Boolean,
      default: () => false,
    },
  },

  computed: {
    cart: vm => vm.me.carts.results[0],

    subtotal() {
      const { currencyCode, fractionDigits } = this.cart.totalPrice;
      return {
        centAmount: this.cart.lineItems.reduce((acc, li) => acc + li.totalPrice.centAmount, 0),
        currencyCode,
        fractionDigits,
      };
    },

    taxes() {
      const { currencyCode, fractionDigits } = this.cart.totalPrice;
      return {
        centAmount: this.cart.taxedPrice.totalGross.centAmount - this.cart.taxedPrice.totalNet.centAmount,
        currencyCode,
        fractionDigits,
      };
    },
  },

  methods: {
    hasDiscount(lineItem) {
      return lineItem.price.discounted;
    },

    originalPrice(lineItem) {
      return lineItem.price.value;
    },

    discountedPrice(lineItem) {
      return lineItem.price.discounted.value;
    },

    deleteLineItem(lineItem) {
      return this.$apollo.mutate({
        mutation: gql`
          mutation deleteLineItem($locale: Locale!, $actions: [MyCartUpdateAction!]!, $id: String!, $version: Long!) {
            updateMyCart(id: $id, version: $version, actions: $actions) {
              ...CartSummaryInfo
            }
          }
          ${cartSummaryInfoFragment}`,
        variables: {
          locale: this.$i18n.locale,
          id: this.cart.id,
          version: this.cart.version,
          actions: [
            {
              removeLineItem: {
                lineItemId: lineItem.id,
              },
            },
          ],
        },
      });
    },
  },

  mixins: [priceMixin],

  apollo: {
    me: {
      query: gql`
        query me($locale: Locale!) {
          me {
            carts(limit: 1) {
              results {
                ...CartSummaryInfo
              }
            }
          }
        }
        ${cartSummaryInfoFragment}`,
      variables() {
        return {
          locale: this.$i18n.locale,
        };
      },
    },
  },
};
</script>

<i18n>
{
  "en": {
  },
  "de": {
  }
}
</i18n>
