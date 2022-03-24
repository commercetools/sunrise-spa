<style src="./AddDiscountCodeForm.scss" lang="scss"></style>
<i18n src="./AddDiscountCodeForm.txt" lang="yaml"></i18n>
<script src="./AddDiscountCodeForm.js"></script>

<template>
  <BaseForm
    :vuelidate="v"
    :onSubmit="applyDiscount"
    #default="{ error }"
  >
    <div class="discount-code">
      <BaseInput
        v-model="v.code.$model"
        :vuelidate="v.code"
        :placeholder="t('code')"
        type="text"
        id="promo-code"
        data-test="discount-code-input"
      />
      <button
        class="coupon-btn"
        type="submit"
        data-test="apply-discount-code-button"
      >
        {{ t('apply') }}
      </button>
    </div>
    <ServerError
      :error="error"
      v-slot="{ graphQLError }"
      class="server-error"
      >{{ getErrorMessage(graphQLError) }}</ServerError
    >
  </BaseForm>
</template>
