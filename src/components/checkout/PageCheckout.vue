<template>
  <div class="checkout-shipping">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <div class="secure-payment">
            <span>
              <img src="../../assets/img/credit-card-lock.png"
                   class="secure-payment-icon"
                   :alt="$t('securePayment')">
            </span>
            <span class="text-uppercase secure-payment-title">
              {{ $t("secureCheckout") }}
            </span>
          </div>
        </div>
        <div class="col-md-6">
          <div class="checkout-steps text-right">
            <div>
              <span class="step-number">1</span>
              <span class="text-uppercase step-title">{{ $t("shipping") }}</span>
            </div>
            <div>
              <span class="step-number">2</span>
              <span class="text-uppercase step-title">{{ $t("payment") }}</span>
            </div>
            <div>
              <span class="step-number">3</span>
              <span class="text-uppercase step-title">{{ $t("confirmation") }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12">
          <div class="checkout">
            <div class="row">
              <div class="col-sm-7">
                <router-view class="checkout-form-step"/>
              </div>
              <div class="col-sm-5">
                <CartOverview/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CartOverview from './CartOverview.vue';

export default {
  components: {
    CartOverview,
  },

  props: ['showStep'],
};
</script>

<style lang="scss">
.checkout-form-step {
  margin: 0.5em 1em;

  .selectboxit {
    background: url('../../assets/img/arrow-67-filled.png') no-repeat 90% 50% #fff;
    background-size: 12px;
    border: 1px solid #D6D6D6;
    border-radius: 1px;
  }
  .selectboxit, .selectboxit-options {
    width: 100% !important;
  }

  .checkout-step-title {
    margin: 1em 0;
    padding-bottom: 1em;
    border-bottom: 1px solid #D6D6D6;

    span {
      text-transform: uppercase;
      font-size: 1.1em;
      letter-spacing: 0.1em;
      padding-bottom: 1em;
      margin: 15px 0 20px;
    }
  }

  .checkout-form-option {
    background: lighten(#D6D6D6, 10%);
    border-radius: 2px;
    padding: 1.5em;
    margin: 0.1em 0;

    .option-name {
      text-transform: uppercase;
      font-weight: 400;
    }

    .option-description {
      text-transform: none;
      padding-left: 1em;
    }

    .option-price {
      text-align: right;
      float: right;
    }
  }
}
</style>

<i18n>
en:
  secureCheckout: "Secure Checkout"
  securePayment: "Secure payment"
  shipping: "Shipping"
  payment: "Payment"
  confirmation: "Confirmation"

  completeMyOrder: "Complete My Order"
  continueCheckout: "Continue Checkout"
  needHelpCustomerService: "Need help? Customer Service"
  orderDate: "Order Date"
  orderDiscount: "Order Discount"
  orderNumber: "Order Number"
  paymentInformation: "Payment Details"
  shippingInformation: "Shipping Information"
  shippingMethod: "Shipping Method"
  paymentPage:
  cardName: "Name on credit card"
  cardNumber: "Credit card number"
  expiryDateTitle: "Expiry data"
  paymentOptionsTitle: "Please provide one of the following payment options"
  securityCode: "Security Code"
  securityCodeTooltip: "normally you find it on the back of your card"
  thankYouPage:
  title: "Thank you for your order!"
  emailSentToStart: "An email has been sent to"
  emailSentToEnd: "as a copy of this confirmation purchase"
  yourOrderDetails: "Your order details"
  shippingAddress: "Shipping Address"
  billingAddress: "Billing Address"
  differentBillingAddressCheckboxLabel: "Use a different address for billing"
de:
  secureCheckout: "Sicherer Bestellprozess"
  securePayment: "Sichere Bezahlung"
  shipping: "Versand"
  payment: "Zahlung"
  confirmation: "Bestätigung"

  completeMyOrder: "Zahlungspflichtig bestellen"
  continueCheckout: "Weiter"
  needHelpCustomerService: "Brauchen Sie Hilfe? Kundenservice"
  orderDate: "Bestelldatum"
  orderDiscount: "Bestelldiscount"
  orderNumber: "Bestellnummer"
  paymentInformation: "Zahlungsdetails"
  shippingInformation: "Versand Information"
  shippingMethod: "Versandart"
  paymentPage:
  cardName: "Name auf der Kreditkarte"
  cardNumber: "Kreditkartennummer"
  expiryDateTitle: "Gültig bis"
  paymentOptionsTitle: "Bitte wählen Sie eine Zahlungsart aus"
  securityCode: "Prüfnummer"
  securityCodeTooltip: "Normalerweise befindet sich der Code auf der Rückseite."
  thankYouPage:
  title: "Vielen Dank für Ihre Bestellung!"
  emailSentToStart: "Eine Email wurde versandt"
  emailSentToEnd: "als Bestellbestätigung."
  yourOrderDetails: "Ihre Bestelldetails"
  billingAddress: "Zahlungsadresse"
  shippingAddress: "Versandadresse"
  differentBillingAddressCheckboxLabel: "Abweichende Adresse als Rechnungsadresse verwenden."
</i18n>
