<template>
  <div class="col-sm-6">
    <div class="my-orders-order-dark-box">
      <div class="my-orders-order-dark-box-title">{{ $t('shippingMethod') }}</div>
      <div>
        {{ shippingMethod.name }}
        <span v-if=" shippingMethod.description">
          - {{ shippingMethod.description }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    shippingMethod: {
      type: Object,
      required: true,
    },
  },
};
</script>

<i18n>
en:
  shippingMethod: "Shipping method"
de:
  shippingMethod: "Versandart"
</i18n>
