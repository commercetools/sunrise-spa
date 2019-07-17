<template>
    <div class="row">
      <div class="col-sm-12">
        <div id="appliedDiscounts"
             class="text-right col-sm-12">
          {{ $t('appliedDiscounts') }}:
        </div>
        <div v-for="discountInfo in cartLike.discountCodes"
             :key='discountInfo.discountCode.id'
             class="text-right col-sm-offset-6"
             data-test="discount-code-list">
          <div id="discountCodeName"
               class="col-sm-8"
               data-test="discount-code-name">
            {{ discountInfo.discountCode.code }}
          </div>
          <div class="col-sm-3">{{ discountInfo.discountCode.name }}</div>
          <RemoveDiscountCodeForm v-if="isCart"
                                  :codeId='discountInfo.discountCode.id'/>
        </div>
      </div>
    </div>
</template>

<script>
import RemoveDiscountCodeForm from './cartlike/RemoveDiscountCodeForm.vue';

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

<style>
  #appliedDiscounts {
    margin-bottom: 7px;
  }
  #discountCodeName {
    font-weight: bold
  }
  #deleteButton {
    cursor: pointer
  }
</style>

<i18n>
en:
  appliedDiscounts: "Applied discounts"
de:
  appliedDiscounts: "Angewandte Rabatte"
</i18n>
