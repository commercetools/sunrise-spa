<i18n src="./CheckoutTopSection.txt"></i18n>
<script src="./CheckoutTopSection.js"></script>

<template>
  <span>
    <div v-if="!authenticated" class="customer-zone mb-20">
      <p class="cart-page-title">
        {{ $t('returningCustomer') }}
        <a
          class="checkout-click"
          href
          @click.prevent="showLogin = !showLogin"
          >{{ $t('login') }}</a
        >
      </p>
      <div v-if="showLogin" class="checkout-login-info">
        <p>
          {{ $t('loginDetails') }}
        </p>
        <form @submit.prevent="login">
          <div class="row">
            <div class="col-lg-6 col-md-6">
              <div class="sin-checkout-login">
                <label>
                  Email
                  <span>*</span>
                </label>
                <input v-model="email" type="email" name="user-email" />
              </div>
            </div>
            <div class="col-lg-6 col-md-6">
              <div class="sin-checkout-login">
                <label>
                  {{ $t('password') }}
                  <span>*</span>
                </label>
                <input
                  v-model="password"
                  type="password"
                  name="user-password"
                />
              </div>
            </div>
          </div>
          <div class="button-remember-wrap">
            <button class="button" type="submit">
              {{ $t('loginBtn') }}
            </button>
            <div class="checkout-login-toggle-btn">
              <input type="checkbox" />
              <label>{{ $t('remember') }}</label>
            </div>
          </div>
          <div class="lost-password">
            <a href="#">{{ $t('lostPassword') }}</a>
          </div>
        </form>
      </div>
    </div>
    <div class="customer-zone mb-30">
      <p class="cart-page-title">
        {{ $t('haveCoupon') }}
        <a
          class="checkout-click-2"
          href
          @click.prevent="showCoupon = !showCoupon"
          >{{ $t('enterCode') }}</a
        >
      </p>
      <div v-if="showCoupon" class="checkout-login-info-2">
        <p>{{ $t('couponDetails') }}</p>
        <form action="#">
          <input type="text" placeholder="Coupon code" />
          <input type="submit" value="Apply Coupon" />
        </form>
      </div>
    </div>
  </span>
</template>
