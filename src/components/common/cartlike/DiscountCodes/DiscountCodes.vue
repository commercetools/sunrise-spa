<style src="./style.css" scoped></style>
<i18n src="./DiscountCodes.txt"></i18n>
<script src="./DiscountCodes.js"></script>

<template>
  <div>
    <div class="row text-right">
      <div class="applied-discounts col-sm-12">
        {{ $t('appliedDiscounts') }}:
      </div>
    </div>
    <div v-for="discountInfo in cartLike.discountCodes"
         :key='discountInfo.discountCode.id'
         class="row text-right"
         data-test="discount-code-list">
      <div class="col-sm-12"
           data-test="discount-code-name">
        <span class="discount-code">{{ discountInfo.discountCode.code }}</span>
        <span v-if="discountInfo.discountCode.name"> ({{ discountInfo.discountCode.name }})</span>
        <RemoveDiscountCodeForm v-if="editable"
                                :codeId='discountInfo.discountCode.id'/>
      </div>
    </div>
  </div>

</template>
