<template>
  <div v-if="cartExists">
    <BaseForm :vuelidate="$v"
              :onSubmit="createOrder"
              #default="{ error, state }">
      <div class="checkout-step-title">
        <span>{{ $t('confirmOrder') }}</span>
      </div>
      <div class="row">
        <div class="col-sm-12">
          <ServerError :error="error"/>
        </div>
      </div>
      <CartLikeOrderDetail :cart-like="me.activeCart"
                           :editable="true" />
      <CartLikeContentSummary :cartLike="me.activeCart"/>
      <div class="complete-order">
        <LoadingButton :state="state">{{ $t('completeMyOrder') }}</LoadingButton>
      </div>


      <!--<button id="confirmation-completeorder-btn"-->
      <!--class="btn complete-order-btn">{{ $t('checkout.completeMyOrder') }}</button>-->
      <!--<br>-->
      <!--</div>-->

    </BaseForm>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import BaseForm from '../common/form/BaseForm.vue';
import cartMixin from '../../mixins/cartMixin';
import ServerError from '../common/form/ServerError.vue';
import LoadingButton from '../common/form/LoadingButton.vue';
import CartLikeOrderDetail from '../common/cartlike/CartLikeOrderDetail.vue';
import CartLikeContentSummary from '../common/cartlike/CartLikeContentSummary.vue';
import BASE_ADDRESS_FRAGMENT from '../BaseAddress.gql';
import DISPLAYABLE_MONEY_FRAGMENT from '../DisplayableMoney.gql';

export default {
  components: {
    CartLikeOrderDetail,
    CartLikeContentSummary,
    LoadingButton,
    ServerError,
    BaseForm,
  },

  mixins: [cartMixin],

  methods: {
    createOrder() {
      return this.createMyOrder(this.me.activeCart)
        .then(() => this.$router.push({ name: 'cart' }));
    },
  },

  apollo: {
    me: {
      query: gql`
        query me($locale: Locale!) {
          me {
            activeCart {
              id
              version
              lineItems {
                id
                name(locale: $locale)
                productSlug(locale: $locale)
                quantity
                price {
                  value {
                    ...DisplayableMoney
                  }
                  discounted {
                    value {
                      ...DisplayableMoney
                    }
                  }
                }
                totalPrice {
                  ...DisplayableMoney
                }
                variant {
                  sku
                  images {
                    url
                  }
                }
              }
              totalPrice {
               ...DisplayableMoney
              }
              shippingInfo {
                price {
                  ...DisplayableMoney
                }
              }
              taxedPrice {
                totalGross {
                  ...DisplayableMoney
                }
                totalNet {
                  ...DisplayableMoney
                }
              }
              discountCodes {
                discountCode {
                  id
                  code
                  name(locale: $locale)
                }
              }
              shippingAddress {
                ...BaseAddress
              }
              billingAddress {
                ...BaseAddress
              }
              shippingInfo {
                shippingMethod {
                  name
                  description
                }
              }
            }
          }
        }
        ${DISPLAYABLE_MONEY_FRAGMENT}
        ${BASE_ADDRESS_FRAGMENT}`,
      variables() {
        return {
          locale: this.$i18n.locale,
        };
      },
    },
  },

  validations: {
    form: {},
  },
};
</script>

<i18n>
en:
  confirmOrder: "Confirm your order"
  completeMyOrder: "Complete My Order"
  shippingAddress: "Shipping Address"
  billingAddress: "Billing Address"
  shippingMethod: "Shipping Method"
  paymentInformation: "Payment Details"
de:
  completeMyOrder: "Zahlungspflichtig bestellen"
  confirmOrder: "Bestätige Ihre Bestellung"
  billingAddress: "Zahlungsadresse"
  shippingAddress: "Versandadresse"
  shippingMethod: "Versandart"
  paymentInformation: "Zahlungsdetails"
</i18n>
