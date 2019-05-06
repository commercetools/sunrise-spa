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
          <div v-if="editable"
               id="deleteButton"
               class="col-sm-1"
               @click="removeDiscountCode(discountInfo.discountCode.id)"
               data-test="remove-discount-button">
            <img src="../../assets/img/delete-1.png"
                 class="cart-action-icon">
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import cartMixin from '@/mixins/cartMixin';

export default {
  props: {
    cartLike: {
      type: Object,
      required: true,
    },
    editable: {
      type: Boolean,
      default: () => false,
    },
  },

  mixins: [cartMixin],

  methods: {
    removeDiscountCode(id) {
      this.$emit('removeDiscountCode', id);
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
