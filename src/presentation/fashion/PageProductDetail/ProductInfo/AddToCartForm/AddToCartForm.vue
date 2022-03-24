<style src="./AddToCartForm.scss" lang="scss"></style>
<i18n src="./AddToCartForm.txt" lang="yaml"></i18n>
<script src="./AddToCartForm.js"></script>

<template>
  <div class="product-dec-action-wrap pro-dec-action-2">
    <BaseForm
      v-if="isOnStock"
      :vuelidate="v"
      :onSubmit="addLineItem"
      #default="{ error }"
    >
      <ServerError :error="error" class="server-error">{{
        'unknownError'
      }}</ServerError>
      <div class="quality-cart-wrap">
        <div class="quality-wrap">
          <BaseInput
            v-model="v.quantity.$model"
            :vuelidate="v.quantity"
            class="input-text qty"
            type="number"
            min="1"
            name="qty"
            maxlength="12"
            data-test="add-to-cart-amount"
            title="Qty"
          />
        </div>
        <div class="quality-wrap">
          <input
            data-test="add-to-cart-button"
            type="submit"
            :value="t(addCaption)"
          />
        </div>
      </div>
      <div
        class="mt-2"
        style="color: red"
        v-if="showQuantityError"
      >
        {{
          t('quantityError', {
            quantity: availableQuantity,
          })
        }}
      </div>
    </BaseForm>

    <div v-else>
      <div class="pro-cart-wrap">
        {{ t('notInStock') }}
      </div>
    </div>
  </div>
</template>
