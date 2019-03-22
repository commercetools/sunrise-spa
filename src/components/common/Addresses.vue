<template>
  <div class="row">
    <div v-if="shippingAddress"
         class="col-sm-6">
      <div class="my-orders-order-dark-box">
        <div class="my-orders-order-dark-box-title">{{ $t('shippingAddress') }}</div>
        <div>
          {{ shippingAddress.title }}
          {{ shippingAddress.firstName }}
          {{ shippingAddress.lastName }}
        </div>
        <div>{{ shippingAddress.streetName }} {{ shippingAddress.streetNumber }}</div>
        <div>{{ shippingAddress.additionalStreetInfo }}</div>
        <div>{{ shippingAddress.city }}</div>
        <div>{{ shippingAddress.postalCode }} {{ shippingAddress.region }}</div>
        <div>{{ shippingAddress.country }}</div>
        <br>
        <div>{{ shippingAddress.contactInfo.phone }}</div>
        <div>{{ shippingAddress.contactInfo.email }}</div>
      </div>
    </div>
    <div v-if="billingAddress"
         class="col-sm-6">
      <div class="my-orders-order-dark-box">
        <div class="my-orders-order-dark-box-title">{{ $t('billingAddress') }}</div>
        <div>
          {{ billingAddress.title }}
          {{ billingAddress.firstName }}
          {{ billingAddress.lastName }}
        </div>
        <div>{{ billingAddress.streetName }} {{ billingAddress.streetNumber }}</div>
        <div>{{ billingAddress.additionalStreetInfo }}</div>
        <div>{{ billingAddress.city }}</div>
        <div>{{ billingAddress.postalCode }} {{ billingAddress.region }}</div>
        <div>{{ billingAddress.country }}</div>
        <br>
        <div>{{ billingAddress.contactInfo.phone }}</div>
        <div>{{ billingAddress.contactInfo.email }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    shippingAddress: {
      type: Object,
      required: true,
    },
    billingAddress: {
      type: Object,
      required: true,
    },
  },
};
</script>

<i18n>
en:
  shippingAddress: "Shipping address"
  billingAddress: "Billing address"
de:
  shippingAddress: "Lieferanschrift"
  billingAddress: "Rechnungsadresse"
</i18n>
