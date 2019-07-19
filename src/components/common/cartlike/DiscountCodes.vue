<template>
  <div class="row text-right">
    <div class="applied-discounts col-sm-12">
      {{ $t('appliedDiscounts') }}:
    </div>
    <div v-for="discountInfo in cartLike.discountCodes"
         :key='discountInfo.discountCode.id'
         class="row"
         data-test="discount-code-list">
      <div class="col-sm-12"
           data-test="discount-code-name">
        <span class="discount-code">{{ discountInfo.discountCode.code }}</span>
        <span v-if="discountInfo.discountCode.name"> ({{ discountInfo.discountCode.name }})</span>
        <RemoveDiscountCodeForm v-if="isCart"
                                :codeId='discountInfo.discountCode.id'/>
      </div>
    </div>
  </div>
</template>

<script>
import RemoveDiscountCodeForm from './RemoveDiscountCodeForm.vue';

export default {
  components: { RemoveDiscountCodeForm },

  props: {
    cartLike: {
      type: Object,
      required: true,
    },
  },

  computed: {
    isCart() {
      return this.cartLike.__typename === 'Cart';
    },
  },
};
</script>

<style scoped>
  .applied-discounts {
    margin-bottom: 1em;
  }

  .discount-code {
    font-weight: bold
  }
</style>

<i18n>
en:
  appliedDiscounts: "Applied discounts"
de:
  appliedDiscounts: "Angewandte Rabatte"
</i18n>
