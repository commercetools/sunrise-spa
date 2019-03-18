<template>
  <div v-if="me">
    <div class="order-list-summary-titles-wrapper">
      <div class="row">
        <div class="col-sm-6">
          <div>{{ $t('description') }}</div>
        </div>
        <div class="col-sm-2">
          <div class="text-right">{{ $t('quantity') }}</div>
        </div>
        <div class="col-sm-2">
          <div class="text-right">{{ $t('price') }}</div>
        </div>
        <div class="col-sm-2">
          <div class="text-right">{{ $t('total') }}</div>
        </div>
      </div>
    </div>
    <div v-for="item in me.order.lineItems" :key="item.id" class="order-detail-wrapper">
      <div class="row">
        <div class="col-sm-1 col-xs-4 product-img-col">
          <img
            class="img-responsive cart-item-img"
            :src="item.variant.images[0].url"
            :alt="item.variant.images[0].label"
          >
        </div>
        <div class="col-sm-3 col-xs-8 product-info-text">
          <p class="cart-item-name">
            <router-link
              :to="{ name: 'product', params: { productSlug: item.productSlug, sku: item.variant.sku } }"
            >
              <span>{{item.name}}</span>
            </router-link>
          </p>
          <p class="grey-p">{{item.variant.sku}}</p>
          <p class="cart-attributes">
            {{ $t('size') }}:
            <span class="black-p">{{item.variant.attributes.size.value}}</span>
            <br>
            {{ $t('color') }}:
            <span
              class="black-p"
            >{{item.variant.attributes.colorFreeDefinition.value}}</span>
          </p>
        </div>
        <div class="col-sm-2 col-sm-offset-2 col-xs-12 text-center quantity-counter">
          <span class="visible-xs">{{ $t('quantity') }}</span>
          <span class="quantity-number">{{item.quantity}}</span>
        </div>

        <div class="col-sm-2 col-xs-7">
          <div class="text-right cart-item-price">
            <span class="visible-xs xs-price-title">{{ $t('price') }}</span>
            <!-- {{#if variant.priceOld}} -->
            <!-- <span v-if="" class="discounted-price">{{variant.priceOld}}</span> -->
            <!-- {{/if}} -->
            <BaseMoney :money="item.price.value"/>
          </div>
        </div>
        <div class="col-sm-2 col-xs-5">
          <div class="text-right cart-item-price">
            <span class="visible-xs xs-price-title">{{ $t('total') }}</span>
            <BaseMoney :money="item.totalPrice"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import BaseMoney from '../../common/BaseMoney.vue';
import priceMixin from '@/mixins/priceMixin';
import DisplayableMoneyFragment from '@/components/DisplayableMoney.gql';

export default {
  components: { BaseMoney },

  data: () => ({
    me: null,
  }),

  computed: {
    orderNumber() {
      return this.$route.params.orderNumber;
    },
  },

  mixins: [priceMixin],

  apollo: {
    me: {
      query: gql`
        query orderByOrderNumber($locale: Locale!, $orderNumber: String, $currency: Currency!) {
          me {
            order(orderNumber: $orderNumber) {
              lineItems {
                id
                quantity
                name(locale: $locale)
                productSlug(locale: $locale)
                totalPrice {
                  ...DisplayableMoney
                }
                price {
                  value {
                    ...DisplayableMoney
                  }
                }
                variant {
                  images {
                    url
                    label
                  }
                  sku
                  price(currency: $currency) {
                    value {
                      ...DisplayableMoney
                    }
                  }
                  attributes {
                    ... on mainProductType {
                      colorFreeDefinition {
                        value(locale: $locale)
                      }
                      size {
                        value
                      }
                    }
                  }
                }
              }
            }
          }
        }
        ${DisplayableMoneyFragment}`,
      variables() {
        return {
          locale: this.$i18n.locale,
          currency: this.currency,
          orderNumber: this.orderNumber,
        };
      },
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
  size: "Size"
  color: "Color"
de:
  description: "Beschreibung"
  quantity: "Menge"
  price: "Preis"
  total: "Gesamtpreis"
  size: "Größe"
  color: "Farbe"
</i18n>
