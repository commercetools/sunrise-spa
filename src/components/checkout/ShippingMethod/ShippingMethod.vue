<i18n src="./ShippingMethod.txt"></i18n>
<script src="./ShippingMethod.js"></script>

<template>
  <div class="payment-method">
    <div
      v-for="shippingMethod in shippingMethodsByLocation"
      :key="shippingMethod.id"
      class="pay-top sin-payment"
    >
      <input
        v-model="selectedShippingMethod"
        class="input-radio"
        type="radio"
        :value="shippingMethod.id"
        name="shipping_method"
      />
      <label>
        {{ shippingMethod.name }}
        <BaseMoney
          :money="price(shippingMethod)"
          class="option-price"
          data-test="checkout-form-shipping-method-price"
        />
      </label>
      <div class="payment-box payment_method_bacs">
        <p>
          {{ shippingMethod.description }}
        </p>
      </div>
    </div>
  </div>
  <!-- <div v-if="cartExists">
    <BaseForm
      :vuelidate="$v"
      :onSubmit="setShippingMethod"
      #default="{ error }"
    >
      <div class="row">
        <div class="col-sm-12">
          <ServerError :error="error" />
        </div>
      </div>
      <BaseLabel
        :vuelidate="$v.form.shippingMethod"
        data-test="checkout-form-shipping-methods"
      >
        <BaseRadio
          v-for="shippingMethod in shippingMethodsByLocation"
          v-model="form.shippingMethod"
          :value="shippingMethod.id"
          :key="shippingMethod.id"
          class="checkout-form-option"
        >
          <span class="option-name">
            <b data-test="checkout-form-shipping-method-name">
              {{ shippingMethod.name }}
            </b>
            <p
              class="option-description"
              data-test="checkout-form-shipping-method-description"
            >
              {{ shippingMethod.description }}
            </p>
          </span>
          <BaseMoney
            :money="price(shippingMethod)"
            class="option-price"
            data-test="checkout-form-shipping-method-price"
          />
        </BaseRadio>
      </BaseLabel>
    </BaseForm>
  </div> -->
</template>
