<style src="./style.css" scoped></style>
<i18n src="./DiscountCodes.txt"></i18n>
<script src="./DiscountCodes.js"></script>

<template>
  <div class="single-grand-total">
    <div class="single-grand-total-left col-sm-6">
      <span>{{ $t('appliedDiscounts') }}</span>
    </div>
    <div
      class="single-grand-total-right col-sm-6"
      data-test="discount-code-name"
    >
      <div
        v-for="discountInfo in cartLike.discountCodes"
        :key="discountInfo.id"
      >
        <b>
          {{ discountInfo.code }}
        </b>
        <span v-if="discountInfo.name">
          ({{ discountInfo.name }})</span
        >
        <span>
          <RemoveDiscountCodeForm
            v-if="editable"
            :codeId="discountInfo.id"
          />
        </span>
      </div>
    </div>
  </div>
</template>
