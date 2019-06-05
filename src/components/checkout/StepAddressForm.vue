<template>
  <div></div>
    <!--<div class="row different-billing-row">-->
      <!--<div class="col-sm-12">-->
        <!--<div class="different-for-billing input-block">-->
          <!--<label for="different-billing-checkbox">-->
          <!--<span>-->
            <!--<input id="different-billing-checkbox" type="checkbox" value="true"
            name="billingAddressDifferentToBillingAddress"
            {{#if addressForm.billingAddressDifferentToBillingAddress}} checked{{/if}}>-->
          <!--</span>-->
            <!--<span>{{ $t('checkout:shippingPage.differentBillingAddressCheckboxLabel') }}</span>-->
          <!--</label>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
    <!--<div class="row">-->
      <!--<div class="col-sm-12">-->
        <!--<div id="different-billing-address">-->
          <!--<div class="row">-->
            <!--<div class="row">-->
              <!--<div class="col-sm-4">-->
                <!--{{> form/choose-title containerClass="title" selectId="billing-title-select"
                 selectName="titleBilling" options=settings.titleBilling}}-->
              <!--</div>-->
            <!--</div>-->
            <!--<div class="row">-->
              <!--{{> form/input-text columnWidth=6 name="firstNameBilling" labelKey="form.firstName"
              required=true value=addressForm.firstNameBilling settings=settings.firstNameBilling}}-->
              <!--{{> form/input-text columnWidth=6 name="lastNameBilling" labelKey="form.lastName"
              required=true value=addressForm.lastNameBilling settings=settings.lastNameBilling}}-->
              <!--{{> form/input-text columnWidth=12 name="streetNameBilling" labelKey="form.addressOne"
               required=true value=addressForm.streetNameBilling settings=settings.streetNameBilling}}-->
              <!--{{> form/input-text columnWidth=12 name="additionalStreetInfoBilling" labelKey="form.addressTwo"
               required=false value=addressForm.additionalStreetInfoBilling
               settings=settings.additionalStreetInfoBilling}}-->
              <!--{{> form/input-text columnWidth=8 name="cityBilling" labelKey="form.city"
              required=true value=addressForm.cityBilling settings=settings.cityBilling}}-->
              <!--{{> form/input-text columnWidth=4 name="postalCodeBilling" labelKey="form.postCode"
              required=true value=addressForm.postalCodeBilling settings=settings.postalCodeBilling}}-->
              <!--<div class="col-sm-6">-->
                <!--{{> form/choose-country containerClass="country" selectId="billing-country-select"
                selectName="countryBilling" options=settings.countriesBilling}}-->
              <!--</div>-->
              <!--{{> form/input-text columnWidth=6 name="regionBilling" labelKey="form.region" required=false
              value=addressForm.regionBilling settings=settings.regionBilling}}-->
            <!--</div>-->
            <!--<hr>-->
            <!--<div class="row">-->
              <!--{{> form/input-text columnWidth=6 name="phoneBilling" labelKey="form.phone" required=false
               value=addressForm.phoneBilling settings=settings.phoneBilling}}-->
              <!--{{> form/input-text columnWidth=6 name="emailBilling" labelKey="form.email" required=true
               value=addressForm.emailBilling settings=settings.emailBilling}}-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
    <!--{{> checkout/continue-checkout-button}}-->
</template>

<script>
export default {
};
</script>

<i18n>
en:
  shippingAddress: "Shipping Address"
  billingAddress: "Billing Address"
  title: "Secure Checkout - Shipping"
  differentBillingAddressCheckboxLabel: "Use a different address for billing"
de:
  billingAddress: "Zahlungsadresse"
  shippingAddress: "Versandadresse"
  title: "Sicherer Bestellprozess - Versand"
  differentBillingAddressCheckboxLabel: "Abweichende Adresse als Rechnungsadresse verwenden."
</i18n>
