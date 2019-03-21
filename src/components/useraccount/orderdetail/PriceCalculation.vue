<template>
  <div v-if="me"
       class="my-orders-order-price-summary-wrapper">
    <!-- <div v-if="me.order.discountCodes.length > 0" class="text-right">
      <span class="my-orders-order-promocode-title">
        {{ $t('discountCode') }}:
      </span>
      <span class="my-orders-order-promocode">
        "{{me.order.discountCodes[0].discountCode.code}}"
      </span>
    </div> -->
    <div class="text-right">
      <div class="row">
        <div class="col-sm-10 col-xs-7">
          <div class="text-right subtotal">
            <span class="subtotal-title">{{ $t('subtotal') }}</span>
          </div>
          <!-- <div v-if="me.order.discountCodes.discountCode.isActive"
            class="text-right">
            <span class="order-discount">{{ $t('orderDiscount') }}</span>
          </div>-->
          <div class="text-right delivery-info">
            <span class="delivery-info-title">{{ $t('shipping')}}</span>
          </div>
          <hr class="total-divider">
          <div class="text-right">
            <span>{{ $t('salesTax') }}</span>
          </div>
          <div class="text-right">
            <span class="order-total">{{ $t('total') }}</span>
          </div>
        </div>
        <div class="col-sm-2 col-xs-5 text-right">
          <div data-test="order-subtotal">
            <BaseMoney :money="subtotal"/>
          </div>
          <!-- <div v-if="me.order.discountCodes.discountCode.isActive">
          <span class="order-discount">{{cart.discount}}</span>
          </div>-->
          <div>
            <BaseMoney :money="me.order.shippingInfo.price"/>
          </div>
          <hr>
          <div>
            <BaseMoney :money="me.order.taxedPrice.taxPortions[0].amount"/>
          </div>
          <div class="order-total"
               data-test="order-total">
            <BaseMoney :money="me.order.totalPrice"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import BaseMoney from '../../common/BaseMoney.vue';
import DisplayableMoneyFragment from '@/components/DisplayableMoney.gql';

export default {
  components: { BaseMoney },

  data: () => ({
    me: null,
  }),

  computed: {
    subtotal() {
      const { currencyCode, fractionDigits } = this.me.order.totalPrice;
      return {
        centAmount: this.me.order.lineItems.reduce((acc, li) => acc + li.totalPrice.centAmount, 0),
        currencyCode,
        fractionDigits,
      };
    },

    orderNumber() {
      return this.$route.params.orderNumber;
    },
  },

  apollo: {
    me: {
      query: gql`
        query orderByOrderNumber($orderNumber: String) {
          me {
            order(orderNumber: $orderNumber) {
              lineItems {
                totalPrice {
                  ...DisplayableMoney
                }
              }
              shippingInfo {
                price {
                  ...DisplayableMoney
                }
              }
              discountCodes {
                discountCode {
                  code
                }
              }
              taxedPrice {
                totalGross {
                  ...DisplayableMoney
                }
                taxPortions {
                  amount {
                    ...DisplayableMoney
                  }
                }
              }
              totalPrice {
                ...DisplayableMoney
              }
            }
          }
        }
        ${DisplayableMoneyFragment}`,
      variables() {
        return {
          orderNumber: this.orderNumber,
        };
      },
    },
  },
};
</script>

<i18n>
en:
  subtotal: "Subtotal"
  shipping: "Shipping"
  salesTax: "Sales Tax"
  total: "Total"
de:
  subtotal: "Zwischensumme"
  shipping: "Versand"
  salesTax: "MwSt."
  total: "Gesamtpreis"
</i18n>
