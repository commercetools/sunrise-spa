<style src="./AddDiscountCodeForm.scss" lang="scss"></style>
<i18n src="./AddDiscountCodeForm.txt"></i18n>
<script src="./AddDiscountCodeForm.js"></script>

<template>
  <BaseForm :vuelidate="$v"
            :onSubmit="addDiscountCode"
            #default="{ error, state }">
    <div class="text-right add-discount-code-form">
      <ServerError :error="error"
                   v-slot="{ graphQLError }"
                   class="server-error">
        {{ getErrorMessage(graphQLError) }}
      </ServerError>
      <BaseInput v-model="form.code"
                 :vuelidate="$v.form.code"
                 :label="$t('code')"
                 type="text"
                 id="promo-code"
                 data-test="discount-code-input"/>
      <LoadingButton :state="state"
                     class="submit-button"
                     data-test="apply-discount-code-button">
        {{ $t('apply') }}
      </LoadingButton>
    </div>
  </BaseForm>

</template>
