<style src="./OrderOverview.scss" lang="scss" scoped></style>
<i18n src="./OrderOverview.txt" lang="yaml"></i18n>
<script src="./OrderOverview.js"></script>

<template>
  <div v-if="cart" class="your-order-area">
    <h3>{{ t('orderSummary') }}</h3>
    <div class="your-order-wrap gray-bg-4">
      <div class="your-order-info-wrap">
        <div class="your-order-info">
          <ul>
            <li class="bold-text">
              {{ t('product') }}
              <span>{{ t('total') }}</span>
            </li>
          </ul>
        </div>
        <div class="your-order-middle">
          <div
            v-for="lineItem in cart.lineItems"
            :key="lineItem.id"
            class="single-order-middle"
          >
            <div class="single-order-content">
              <h5>
                {{ lineItem.name }}
                {{ lineItemAttr(lineItem) }}
                <span>× {{ lineItem.quantity }}</span>
              </h5>
            </div>
            <div class="single-order-price">
              <span
                ><BasePrice :price="total(lineItem)"
              /></span>
            </div>
          </div>
        </div>
        <div class="your-order-info order-subtotal">
          <ul>
            <li>
              <b class="bold-text">{{ t('subtotal') }}</b>
              <span
                ><BasePrice :price="subTotal(cart)"
              /></span>
            </li>
          </ul>
        </div>
      </div>
      <!-- if you have adyen payment then you can't cahnge -->
      <!-- shipping method after you paid -->
      <!-- v-if="!paid" -->
      <div class="checkout-shipping-content">
        <div class="shipping-content-left">
          <span class="bold-text">{{ t('shipping') }}</span>
        </div>
        <ShippingMethod
          @update-shipping="updateShippingMethod"
          :cart="cart"
          data-test="shipping-methods"
        />
      </div>
      <PaymentMethod
        data-test="payment-methods"
        v-bind:amount="cart.totalPrice"
        v-on:card-paid="cardPaid"
        :paymentMethod="paymentMethod"
        @payment-changed="paymentChanged"
        :key="cart.totalPrice.centAmount"
      />
      <div class="your-order-info order-total">
        <ul>
          <li class="bold-text">
            {{ t('total') }}
            <span
              ><BasePrice
                :price="{
                  value: cart.totalPrice,
                }"
            /></span>
          </li>
        </ul>
      </div>

      <!-- <div class="condition-wrap">
        <p>
          Your personal data will be used to process your order, support your
          experience throughout this website, and for other purposes described
          in our
          <a href="#">privacy policy</a>.
        </p>
        <div class="condition-form mb-25">
          <input type="checkbox" />
          <span>
            I have read and agree to the website
            <a href="#">terms and conditions</a>
            <span class="star">*</span>
          </span>
        </div>
      </div> -->
    </div>
    <div class="Place-order mt-30" v-if="paid">
      <a
        @click.prevent="placeOrder"
        data-test="place-order"
        href
      >
        {{ t('placeOrder') }}
      </a>
    </div>
    <div v-if="showError" class="error-message mt-10">
      * Please fill in all required data
    </div>
  </div>
</template>
