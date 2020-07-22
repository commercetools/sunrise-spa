<i18n src="./TabOrderDetail.txt"></i18n>
<script src="./TabOrderDetail.js"></script>
<style lang="scss" src="./TabOrderDetail.scss"></style>

<template>
  <div v-if="me" class="myaccount-content">
    <h3>{{ $t('title') }}</h3>
    <div class="row your-order-details">
      <div class="col-md-3">
        <span v-if="me.order.orderNumber"
          >{{ $t('orderNumber') }}
          <br />
        </span>
        {{ $t('date') }}
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
    </div>
    <div class="row pt-30">
      <div class="col-md-5 address-detail">
        <b>Shipping address</b>
        <BaseAddress
          class="mt-15"
          :address="me.order.shippingAddress"
          data-test="summary-shipping-address"
        />
      </div>
      <div class="col-md-1"></div>
      <div class="col-md-5 address-detail">
        <b>Billing address</b>
        <BaseAddress
          class="mt-15"
          :address="me.order.billingAddress"
          data-test="summary-billing-address"
        />
      </div>
    </div>
    <div class="row pt-30">
      <div class="col-md-5 address-detail">
        <b>Shipping method</b>
        <p class="mt-15">
          {{ me.order.shippingInfo.shippingMethod.name }} -
          {{ me.order.shippingInfo.shippingMethod.description }}
        </p>
      </div>
      <div class="col-md-1"></div>
      <div class="col-md-5 address-detail">
        <b>Payment details</b>
        <p class="mt-15">-</p>
      </div>
    </div>
    <div class="mt-40">
      <CartLikeContentDetail :editable="false" :cartLike="me.order" />
    </div>
    <!-- <div class="row text-right">
      <div class="col-md-9">
        <p>Subtotal</p>
        <p>Shipping</p>
      </div>
      <div class="col-md-3">
        <p></p>
        <p></p>
      </div>
    </div> -->
  </div>
  <!-- <div class="myaccount-content">
    <div v-if="me" class="my-orders col-sm-12">
      <div v-if="me.order" class="my-orders-order-content">
        <div class="your-order-details-wrapper">
          <div class="your-order-details-title">
            <h5>{{ $t('title') }}</h5>
          </div>
          <div class="your-order-details">
            <span class="your-order-details-titles">
              {{ $t('orderNumber') }}
              <br />
              {{ $t('date') }}
            </span>
            <span class="your-order-details-info">
              <span data-test="details-order-number">{{
                me.order.orderNumber
              }}</span>
              <br />
              <BaseDate
                :date="me.order.createdAt"
                :format="'short'"
                data-test="details-order-date"
              />
            </span>
          </div>
          <button
            onclick="window.print()"
            class="my-orders-print-receipt-btn hidden-xs"
          >
            {{ $t('print') }}
          </button>
        </div>

      </div>
      <div v-else>
        <h1 class="text-center">{{ $t('notFound') }}</h1>
      </div>
    </div>
  </div> -->
</template>
