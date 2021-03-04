<i18n src="./CartLikeSummary.txt"></i18n>
<script src="./CartLikeSummary.js"></script>

<template>
  <div v-if="cartLike">
    <div class="row">
      <div class="col-sm-6">
        <div class="my-orders-order-dark-box">
          <div class="my-orders-order-dark-box-title">
            {{ $t('shippingAddress') }}
            <router-link v-if="editable"
                         :to="{ name: 'checkout' }"
                         class="checkout-summary-edit-icon pull-right"
                         data-test="summary-shipping-address-edit">
              <img src="../../../../assets/img/edit-1.png" class="checkout-summary-edit-icon"/>
              {{ $t('edit') }}
            </router-link>
          </div>
          <BaseAddress :address="shippingAddress"
                       data-test="summary-shipping-address"/>
        </div>
      </div>
      <div class="col-sm-6">
        <div class="my-orders-order-dark-box">
          <div class="my-orders-order-dark-box-title">
            {{ $t('billingAddress') }}
            <router-link v-if="editable"
                         :to="{ name: 'checkout-billing-address' }"
                         class="checkout-summary-edit-icon pull-right"
                         data-test="summary-billing-address-edit">
              <img src="../../../../assets/img/edit-1.png" class="checkout-summary-edit-icon"/>
              {{ $t('edit') }}
            </router-link>
          </div>
          <BaseAddress :address="billingAddress"
                       data-test="summary-billing-address"/>
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
                         class="checkout-summary-edit-icon pull-right"
                         data-test="summary-shipping-method-edit">
              <img src="../../../../assets/img/edit-1.png" class="checkout-summary-edit-icon"/>
              {{ $t('edit') }}
            </router-link>
          </div>
          <div v-if="shippingMethod"
               data-test="summary-shipping-method">
            {{ shippingMethod.name }}
            <span v-if="shippingMethod.localizedDescription">- {{ shippingMethod.localizedDescription }}</span>
          </div>
        </div>
      </div>
      <div class="col-sm-6">
        <div class="my-orders-order-dark-box">
          <div class="my-orders-order-dark-box-title">
            {{ $t('paymentDetails') }}
            <router-link v-if="editable"
                         :to="{ name: 'checkout-payment-method' }"
                         class="checkout-summary-edit-icon pull-right"
                         data-test="summary-payment-method-edit">
              <img src="../../../../assets/img/edit-1.png" class="checkout-summary-edit-icon"/>
              {{ $t('edit') }}
            </router-link>
          </div>
          <div v-if="payments"
               data-test="summary-payment-method">
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
