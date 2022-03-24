<style src="./style.css" scoped></style>
<i18n src="./DiscountCodes.txt" lang="yaml"></i18n>
<script src="./DiscountCodes.js"></script>

<template>
  <div class="single-grand-total">
    <div class="single-grand-total-left col-sm-6">
      <span>{{ t('appliedDiscounts') }}</span>
    </div>
    <div
      class="single-grand-total-right col-sm-6"
      data-test="discount-code-name"
    >
      <div
        v-for="discountInfo in cart.discountCodes"
        :key="discountInfo.discountCode.codeId"
      >
        <b>
          {{ discountInfo.discountCode.code }}
        </b>
        <span v-if="discountInfo.discountCode.name">
          ({{ discountInfo.discountCode.name }})</span
        >
        <span>
          <RemoveDiscountCodeForm
            v-if="editable"
            :codeId="discountInfo.discountCode.codeId"
          />
        </span>
      </div>
    </div>
  </div>
</template>
