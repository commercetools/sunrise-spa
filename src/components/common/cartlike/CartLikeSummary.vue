<template>
  <div v-if="cartLike">
    <div class="row">
      <div class="col-sm-6">
        <div class="my-orders-order-dark-box">
          <div class="my-orders-order-dark-box-title">
            {{ $t('shippingAddress') }}
            <router-link v-if="editable"
                         :to="{ name: 'checkout' }"
                         class="checkout-summary-edit-icon pull-right">
              <img src="../../../assets/img/edit-1.png" class="checkout-summary-edit-icon"/>
              {{ $t('edit') }}
            </router-link>
          </div>
          <BaseAddress :address="shippingAddress"/>
        </div>
      </div>
      <div class="col-sm-6">
        <div class="my-orders-order-dark-box">
          <div class="my-orders-order-dark-box-title">
            {{ $t('billingAddress') }}
            <router-link v-if="editable"
                         :to="{ name: 'checkout-billing-address' }"
                         class="checkout-summary-edit-icon pull-right">
              <img src="../../../assets/img/edit-1.png" class="checkout-summary-edit-icon"/>
              {{ $t('edit') }}
            </router-link>
          </div>
          <BaseAddress :address="billingAddress"/>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-6">
        <div class="my-orders-order-dark-box">
          <div class="my-orders-order-dark-box-title">
            {{ $t('shippingMethod') }}
            <router-link v-if="editable"
                         :to="{ name: 'checkout-shipping-method' }"
                         class="checkout-summary-edit-icon pull-right">
              <img src="../../../assets/img/edit-1.png" class="checkout-summary-edit-icon"/>
              {{ $t('edit') }}
            </router-link>
          </div>
          <div v-if="shippingMethod">
            {{ shippingMethod.name }}
            <span v-if="shippingMethod.description">- {{ shippingMethod.description }}</span>
          </div>
        </div>
      </div>
      <div class="col-sm-6">
        <div class="my-orders-order-dark-box">
          <div class="my-orders-order-dark-box-title">
            {{ $t('paymentDetails') }}
            <router-link v-if="editable"
                         :to="{ name: 'checkout-payment-method' }"
                         class="checkout-summary-edit-icon pull-right">
              <img src="../../../assets/img/edit-1.png" class="checkout-summary-edit-icon"/>
              {{ $t('edit') }}
            </router-link>
          </div>
          <div v-if="payments">
            <span v-for="payment in payments"
                  :key="payment.id">
              {{ payment.paymentMethodInfo.method }}
            </span>
          </div>
          <span v-else>-</span>
        </div>
      </div>
    </div>
    <CartLikeContentDetail :cartLike="cartLike"/>
    <CartLikePriceDetail :cartLike="cartLike"
                         class="total-price-calc"/>
  </div>
</template>
<script>
import BaseAddress from '../BaseAddress.vue';
import CartLikePriceDetail from './CartLikePriceDetail.vue';
import CartLikeContentDetail from './CartLikeContentDetail.vue';

export default {
  components: {
    CartLikeContentDetail,
    CartLikePriceDetail,
    BaseAddress,
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

  computed: {
    shippingAddress() {
      return this.cartLike.shippingAddress;
    },

    billingAddress() {
      return this.cartLike.billingAddress || this.shippingAddress;
    },

    shippingMethod() {
      return this.cartLike.shippingInfo?.shippingMethod;
    },

    payments() {
      return this.cartLike.paymentInfo?.payments;
    },
  },
};
</script>

<i18n>
en:
  shippingAddress: "Shipping address"
  billingAddress: "Billing address"
  shippingMethod: "Shipping method"
  paymentDetails: "Payment details"
  edit: "Edit"
de:
  paymentDetails: "Zahlungsdetails"
  shippingMethod: "Versandart"
  shippingAddress: "Lieferanschrift"
  billingAddress: "Rechnungsadresse"
  edit: "Bearbeiten"
</i18n>
