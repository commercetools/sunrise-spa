<template>
  <div v-if="me && me.activeCart">
    <div class="order-summary">
      <span class="text-uppercase order-summary-title">{{ $t("checkout:orderSummary") }}:</span>
      <!--<span class="checkout-total-items">{{ $t("checkout:itemsTotal" count=content.cart.totalItems) }}</span>-->
    </div>
    <div class="order">
      <VuePerfectScrollbar>
        <div class="order-summary-items">
          <div v-for="lineItem in sortedLineItems"
               :key="lineItem.id"
               class="order-summary-item">
            <div class="row">
              <div class="col-xs-4">
                <div class="order-summary-img">
                  <img :src="displayedImageUrl(lineItem.variant)"
                       :alt="lineItem.name"
                       class="img-responsive"/>
                </div>
              </div>
              <div class="col-xs-8">
                <div class="summary-item-info">
                  <span class="checkout-product-name">
                    {{ lineItem.name }}
                  </span>
                </div>
                <div class="sku-code">
                  <span>{{ lineItem.variant.sku }}</span>
                </div>
                <!--<div class="checkout-attributes">-->
                  <!--<div class="checkout-attribute-field">-->
                    <!--{{#each attributes}}-->
                    <!--<span class="checkout-attribute">{{name}}</span>{{#unless @last}}<br>{{/unless}}-->
                    <!--{{/each}}-->
                  <!--</div>-->
                  <!--<div class="checkout-attribute-field">-->
                    <!--{{#each attributes}}-->
                    <!--<span>{{value}}</span>{{#unless @last}}<br>{{/unless}}-->
                    <!--{{/each}}-->
                  <!--</div>-->
                <!--</div>-->
              </div>
            </div>
            <div class="order-item-price">
              <div class="row">
                <div class="col-xs-4">
                  <div class="text-right">
                    <span class="text-uppercase pricing-titles">{{ $t("main:common.quantity") }}</span>
                    <br>
                    <span>{{ lineItem.quantity }} x</span>
                  </div>
                </div>
                <div class="col-xs-4">
                  <div class="text-right order-item-value">
                    <span class="text-uppercase pricing-titles">{{ $t("main:common.price") }}</span>
                    <br>
                    <BasePrice :price="lineItem.price"/>
                  </div>
                </div>
                <div class="col-xs-4">
                  <div class="text-right order-item-value">
                    <span class="text-uppercase pricing-titles">{{ $t("checkout:total") }}</span><br>
                    <BaseMoney :money="lineItem.totalPrice"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </VuePerfectScrollbar>
      <CartLikePriceDetail :cart-like="me.activeCart"/>
      <!--<div class="checkout-total-price">-->
        <!--<div class="row">-->
          <!--<div class="col-lg-8 col-md-7 col-sm-7 col-xs-7">-->
            <!--<div class="text-right checkout-promo-code">-->
              <!--<span class="text-uppercase">{{ $t("checkout:promoCodeApplied") }}</span>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="col-lg-4 col-md-5 col-sm-5 col-xs-5">-->
            <!--<div class="text-right checkout-promo-code">-->
              <!--&lt;!&ndash;{{#each content.cart.discountCodes}}&ndash;&gt;-->
              <!--&lt;!&ndash;<span class="text-uppercase">{{name}}</span><br>&ndash;&gt;-->
              <!--&lt;!&ndash;{{/each}}&ndash;&gt;-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="row">-->
          <!--<div class="col-lg-8 col-md-7 col-sm-7 col-xs-7">-->
            <!--<div class="text-right checkout-price-text">-->
              <!--<span>{{ $t("checkout:subtotal") }}</span><br>-->
              <!--<span>{{ $t("checkout:shipping") }}</span>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="col-lg-4 col-md-5 col-sm-5 col-xs-5">-->
            <!--<div class="text-right checkout-price-digits">-->
              <!--<span>{{content.cart.subtotalPrice}}</span><br>-->
              <!--<span>{{content.cart.shippingMethod.price}}</span>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="row">-->
        <!--<div class="col-lg-8 col-md-7 col-sm-7 col-xs-7">-->
          <!--<div class="text-right order-tax-total-text">-->
            <!--<span>{{ $t("main:common.salesTax") }}</span><br>-->
            <!--<span class="total-order-value">{{ $t("checkout:total") }}</span>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="col-lg-4 col-md-5 col-sm-5 col-xs-5">-->
          <!--<div class="text-right order-tax-total-digits">-->
            <!--<span>{{content.cart.salesTax}}</span><br>-->
            <!--<span class="total-order-value">{{content.cart.totalPrice}}</span>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="row">-->
        <!--<div class="col-sm-12">-->
          <!--<div>-->
          <!--<span class="text-uppercase pull-right edit-quantity-order">-->
              <!--&lt;!&ndash;<a href="{{@root.meta._links.cart.href}}">
              {{ $t("checkout:editMyCart") }}</a>&ndash;&gt;-->
          <!--</span>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import BasePrice from '../common/BasePrice.vue';
import BaseMoney from '../common/BaseMoney.vue';
import productMixin from '@/mixins/productMixin';
import DisplayableMoneyFragment from '@/components/DisplayableMoney.gql';
import CartLikePriceDetail from '../common/CartLikePriceDetail.vue';

export default {
  components: {
    CartLikePriceDetail,
    BasePrice,
    BaseMoney,
    VuePerfectScrollbar,
  },

  mixins: [productMixin],

  data: () => ({
    me: null,
  }),

  computed: {
    sortedLineItems() {
      if (this.me && this.me.activeCart) {
        const { lineItems } = this.me.activeCart;
        return lineItems.reverse();
      }
      return [];
    },
  },

  apollo: {
    me: {
      query: gql`
        query me($locale: Locale!) {
          me {
            activeCart {
              id
              version
              lineItems {
                id
                quantity
                name(locale: $locale)
                productSlug(locale: $locale)
                variant {
                  sku
                  images {
                    url
                  }
                }
                totalPrice {
                  ...DisplayableMoney
                }
              }
              totalPrice {
                ...DisplayableMoney
              }
            }
          }
        }
        ${DisplayableMoneyFragment}`,
      variables() {
        return {
          locale: this.$i18n.locale,
        };
      },
    },
  },
};
</script>

<!-- eslint-disable max-len -->
<i18n>
  en:
    addToNewsletter: "Please add me to the"
    agreeToTermsHtml: "I agree to the Terms and Conditions"
    billingAddress: "Billing Address"
    completeMyOrder: "Complete My Order"
    continueCheckout: "Continue Checkout"
    continueShopping: "Continue Shopping"
    discountApply: "apply"
    discountTooltip: "Discount options additional information..."
    discountPromoInfo: "PROMOTIONAL DISCOUNT INFO"
    editMyCart: "Edit my shopping cart"
    itemsTotal: "__count__ item in total"
    itemsTotal_plural: "__count__ items in total"
    needHelpCustomerService: "Need help? Customer Service"
    orderDate: "Order Date"
    orderDiscount: "Order Discount"
    orderNumber: "Order Number"
    orderSummary: "Order Summary"
    paymentInformation: "Payment Details"
    promoCodeApplied: "Promotional Code Applied"
    returningCustomer: "Returning Customer"
    rememberMe: "Save my details to create my personal account at SUNRISE"
    shippingAddress: "Shipping Address"
    shippingInformation: "Shipping Information"
    shippingMethod: "Shipping Method"
    subtotal: "Subtotal"
    total: "Total"
    yourBag: "Your Bag"
    cartDetailPage:
      title: "Your Cart"
    signInPage:
      title: "Secure Checkout - Sign In"
    shippingPage:
      title: "Secure Checkout - Shipping"
      differentBillingAddressCheckboxLabel: "Use a different address for billing"
      emailInfo: "We require your email address to send your shipping and order confirmation"
      telNumberInfo: "Please provide your telephone number so the shipper can contact you during delivery"
    paymentPage:
      title: "Secure Checkout - Payment"
      cardName: "Name on credit card"
      cardNumber: "Credit card number"
      expiryDateTitle: "Expiry data"
      paymentOptionsTitle: "Please provide one of the following payment options"
      securityCode: "Security Code"
      securityCodeTooltip: "normally you find it on the back of your card"
    confirmationPage:
      title: "Secure Checkout - Confirmation"
    thankYouPage:
      title: "Thank you for your order!"
      emailSentToStart: "An email has been sent to"
      emailSentToEnd: "as a copy of this confirmation purchase"
      yourOrderDetails: "Your order details"
  de:
    addToNewsletter: "Bitte senden Sie mir den"
    agreeToTermsHtml: "Ich stimme den AGB zu"
    billingAddress: "Zahlungsadresse"
    completeMyOrder: "Zahlungspflichtig bestellen"
    continueCheckout: "Weiter"
    continueShopping: "Weiter einkaufen"
    discountApply: "Anwenden"
    discountTooltip: "Weitere Rabatt Informationen..."
    discountPromoInfo: "Rabatte"
    editMyCart: "Warenkorb bearbeiten"
    itemsTotal: "__count__ Artikel im Warenkorb"
    needHelpCustomerService: "Brauchen Sie Hilfe? Kundenservice"
    orderDate: "Bestelldatum"
    orderDiscount: "Bestelldiscount"
    orderNumber: "Bestellnummer"
    orderSummary: "Bestellübersicht"
    paymentInformation: "Zahlungsdetails"
    promoCodeApplied: "Gutschein eingelöst"
    returningCustomer: "Wiederkehrender Besucher"
    rememberMe: "Meine Daten speichern für einen Account"
    shippingAddress: "Versandadresse"
    shippingInformation: "Versand Information"
    shippingMethod: "Versandart"
    subtotal: "Zwischensumme"
    total: "Gesamtpreis"
    yourBag: "Ihr Einkaufswagen"
    cartDetailPage:
      title: "Ihr Einkaufswagen"
    signInPage:
      title: "Sicherer Bestellprozess - Anmeldung"
    shippingPage:
      title: "Sicherer Bestellprozess - Versand"
      differentBillingAddressCheckboxLabel: "Abweichende Adresse als Rechnungsadresse verwenden."
      emailInfo: "Bitte geben Sie Ihre E-Mail-Adresse an, damit wir Sie über den Status und Versand Ihrer Bestellung informieren können."
      telNumberInfo: "Bitte geben Sie Ihre Telefonnummer an, damit unser Lieferant Sie über den Liefertermin informieren kann."
    paymentPage:
      title: "Sicherer Bestellprozess - Bezahlung"
      cardName: "Name auf der Kreditkarte"
      cardNumber: "Kreditkartennummer"
      expiryDateTitle: "Gültig bis"
      paymentOptionsTitle: "Bitte wählen Sie eine Zahlungsart aus"
      securityCode: "Prüfnummer"
      securityCodeTooltip: "Normalerweise befindet sich der Code auf der Rückseite."
    confirmationPage:
      title: "Sicherer Bestellprozess - Versand"
    thankYouPage:
      title: "Vielen Dank für Ihre Bestellung!"
      emailSentToStart: "Eine Email wurde versandt"
      emailSentToEnd: "als Bestellbestätigung."
      yourOrderDetails: "Ihre Bestelldetails"
</i18n>
