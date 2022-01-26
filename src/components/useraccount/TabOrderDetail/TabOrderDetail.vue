<i18n src="./TabOrderDetail.txt"></i18n>
<script src="./TabOrderDetail.js"></script>
<style lang="scss" src="./TabOrderDetail.scss"></style>

<template>
  <div class="myaccount-content">
    <div v-if="me">
      <h3>{{ $t("title") }}</h3>
      <div class="row your-order-details">
        <div class="col-md-3">
          <span v-if="me.order.orderNumber"
            >{{ $t("orderNumber") }}
            <br />
          </span>
          {{ $t("date") }}
        </div>
        <div class="col-md-3">
          <span v-if="me.order.orderNumber" data-test="details-order-number"
            >{{ me.order.orderNumber }}
            <br />
          </span>
          <BaseDate
            :date="me.order.createdAt"
            :format="'short'"
            data-test="details-order-date"
          />
        </div>
        <div class="col-md-5">
          <router-link :to="{ name: 'return', params: { id: me.order.id } }">
            <button data-test="return-button" class="float-right">
              {{ $t("return") }}
            </button>
          </router-link>
        </div>
      </div>
      <div class="row pt-30">
        <div class="col-md-5 address-detail">
          <b>{{ $t("shippingAddress") }}</b>
          <BaseAddress
            class="mt-15"
            :address="me.order.shippingAddress"
            data-test="summary-shipping-address"
          />
        </div>
        <div class="col-md-1"></div>
        <div class="col-md-5 address-detail">
          <b>{{ $t("billingAddress") }}</b>
          <BaseAddress
            class="mt-15"
            :address="me.order.billingAddress"
            data-test="summary-billing-address"
          />
        </div>
      </div>
      <div class="row pt-30">
        <div class="col-md-5 address-detail">
          <b>{{ $t("shippingMethod") }}</b>
          <p class="mt-15">
            {{ me.order.shippingInfo.shippingMethod.name }} -
            {{ me.order.shippingInfo.shippingMethod.localizedDescription }}
          </p>
        </div>
        <div class="col-md-1"></div>
        <div class="col-md-5 address-detail">
          <b>{{ $t('paymentDetails') }}</b>
          <p class="mt-15">{{ paymentInfo }}</p>
        </div>
      </div>
      <div class="mt-40">
        <CartLikeContentDetail :editable="false" :cartLike="lineItems" />
      </div>
      <div class="offset-md-6 text-right subtotal-price">
        <div class="row">
          <span class="col-md-6 title">{{ $t("subtotal") }}</span>
          <span class="col-md-6 title">
            <BaseMoney :money="subtotal" data-test="order-subtotal-price" />
          </span>
        </div>
        <div class="row">
          <p class="col-md-6">{{ $t("shipping") }}</p>
          <span class="col-md-6">
            <BaseMoney
              :money="me.order.shippingInfo.price"
              data-test="cart-shipping-price"
            />
          </span>
        </div>
        <div v-if="me.order.discountCodes.length > 0" class="row">
          <p class="col-md-6">{{ $t("appliedDiscounts") }}</p>
          <p
            v-for="discount in me.order.discountCodes"
            :key="discount.discountCode.id"
            class="col-md-6"
          >
            {{ discount.discountCode.name }}
          </p>
        </div>
      </div>
      <div class="offset-md-6 text-right total-price">
        <div class="row">
          <span class="col-md-6 title">{{ $t("total") }}</span>
          <span class="col-md-6 title">
            <BaseMoney
              :money="me.order.totalPrice"
              data-test="cart-total-price"
            />
          </span>
        </div>
      </div>
    </div>
    <div class="pt-50 pb-55" v-if="!$apollo.loading && !me">
      <h1 class="text-center">{{ $t("notFound") }}</h1>
    </div>
  </div>
</template>
