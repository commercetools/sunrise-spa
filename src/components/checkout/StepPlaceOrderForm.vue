<template>
  <div>
    <div v-if="order">
      <div class="row thank-you">
        <div class="col-sm-12">
          {{ $t('thankYou') }}
        </div>
      </div>
      <div class="checkout-step-title">
        <span>{{ $t('yourOrder') }}</span>
      </div>
      <CartLikeSummary :cartLike="order"/>
    </div>
    <BaseForm v-else-if="cartExists"
              :vuelidate="$v"
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
      <CartLikeSummary :cart-like="me.activeCart"
                       :editable="true" />
      <div class="complete-order">
        <LoadingButton :state="state"
                       class="complete-order-btn">
          {{ $t('completeMyOrder') }}
        </LoadingButton>
      </div>
    </BaseForm>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import BaseForm from '../common/form/BaseForm.vue';
import cartMixin from '../../mixins/cartMixin';
import ServerError from '../common/form/ServerError.vue';
import LoadingButton from '../common/form/LoadingButton.vue';
import CartLikeSummary from '../common/cartlike/CartLikeSummary.vue';
import CART_FRAGMENT from '../Cart.gql';
import ADDRESS_FRAGMENT from '../Address.gql';
import MONEY_FRAGMENT from '../Money.gql';

export default {
  components: {
    CartLikeSummary,
    LoadingButton,
    ServerError,
    BaseForm,
  },

  mixins: [cartMixin],

  data() {
    return {
      order: null,
    };
  },

  methods: {
    createOrder() {
      return this.createMyOrder().then((result) => {
        this.order = result.data.createMyOrderFromCart;
        window.scrollTo(0, 0);
      });
    },
  },

  watch: {
    me(value) {
      if (value.activeCart) {
        if (!value.activeCart.shippingAddress) {
          this.$router.push({ name: 'checkout' });
        } else if (!value.activeCart.shippingInfo) {
          this.$router.push({ name: 'checkout-shipping-method' });
        }
      }
    },
  },

  apollo: {
    me: {
      query: gql`
        query me($locale: Locale!) {
          me {
            activeCart {
              ...CartFields
            }
          }
        }
        ${CART_FRAGMENT}
        ${MONEY_FRAGMENT}
        ${ADDRESS_FRAGMENT}`,
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

<style lang="scss" scoped>
.thank-you {
  text-transform: uppercase;
  font-weight: bold;
  background: #FFBA27;
  padding: 2em;
  font-size: 16px;
  margin: 1em 0 2em;
}
</style>

<i18n>
en:
  confirmOrder: "Confirm your order"
  completeMyOrder: "Complete My Order"
  thankYou: "Thank you for your order!"
  yourOrder: "Your order details"
  continueShopping: "Continue shopping"
de:
  completeMyOrder: "Zahlungspflichtig bestellen"
  confirmOrder: "Bestätige Ihre Bestellung"
  thankYou: "Vielen Dank für Ihre Bestellung!"
  yourOrder: "Ihre Bestelldetails"
  continueShopping: "Weiter einkaufen"
</i18n>
