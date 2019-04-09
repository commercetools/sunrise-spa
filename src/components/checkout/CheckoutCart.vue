<template>
  <div v-if="me && me.activeCart">
    <div class="order-summary">
      <span class="text-uppercase order-summary-title">{{ $t("orderSummary") }}:</span>
      <span class="checkout-total-items">
        {{ $tc('itemsTotal', totalItems) }}
      </span>
    </div>
    <div class="checkout-order">
      <VuePerfectScrollbar>
        <div class="order-summary-items">
          <div v-for="lineItem in sortedLineItems"
               :key="lineItem.id"
               class="order-summary-item">
            <LineItemInfo :line-item="lineItem"
                          class="col-sm-12"/>
            <div class="order-item-price">
              <div class="row">
                <div class="col-xs-4">
                  <div class="text-right">
                    <span class="text-uppercase pricing-titles">{{ $t("quantity") }}</span>
                    <br>
                    <span>{{ lineItem.quantity }}</span>
                  </div>
                </div>
                <div class="col-xs-4">
                  <div class="text-right order-item-value">
                    <span class="text-uppercase pricing-titles">{{ $t("price") }}</span>
                    <br>
                    <BasePrice :price="lineItem.price"/>
                  </div>
                </div>
                <div class="col-xs-4">
                  <div class="text-right order-item-value">
                    <span class="text-uppercase pricing-titles">{{ $t("total") }}</span>
                    <br>
                    <BaseMoney :money="lineItem.totalPrice"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </VuePerfectScrollbar>
      <CartLikePriceDetail :cart-like="me.activeCart"/>
      <div class="row">
        <span class="text-uppercase pull-right edit-quantity-order">
          <router-link :to="{ name: 'cart' }">{{ $t("editMyCart") }}</router-link>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import BasePrice from '../common/BasePrice.vue';
import BaseMoney from '../common/BaseMoney.vue';
import productMixin from '../../mixins/productMixin';
import cartMixin from '../../mixins/cartMixin';
import DisplayableMoneyFragment from '@/components/DisplayableMoney.gql';
import CartLikePriceDetail from '../common/CartLikePriceDetail.vue';
import LineItemInfo from '../common/LineItemInfo.vue';

export default {
  components: {
    LineItemInfo,
    CartLikePriceDetail,
    BasePrice,
    BaseMoney,
    VuePerfectScrollbar,
  },

  mixins: [productMixin, cartMixin],

  data: () => ({
    me: null,
  }),

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
                price {
                  value {
                    ...DisplayableMoney
                  }
                  discounted {
                    value {
                      ...DisplayableMoney
                    }
                  }
                }
                totalPrice {
                  ...DisplayableMoney
                }
              }
              totalPrice {
                ...DisplayableMoney
              }
              shippingInfo {
                price {
                  ...DisplayableMoney
                }
              }
              taxedPrice {
                totalGross {
                  ...DisplayableMoney
                }
                totalNet {
                  ...DisplayableMoney
                }
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
    itemsTotal: "{n} item in total | {n} items in total"
    editMyCart: "Edit my shopping cart"
    orderSummary: "Order Summary"
    quantity: "Quantity"
    price: "Price"
    total: "Total"

    billingAddress: "Billing Address"
    completeMyOrder: "Complete My Order"
    continueCheckout: "Continue Checkout"
    needHelpCustomerService: "Need help? Customer Service"
    orderDate: "Order Date"
    orderDiscount: "Order Discount"
    orderNumber: "Order Number"
    paymentInformation: "Payment Details"
    promoCodeApplied: "Promotional Code Applied"
    rememberMe: "Save my details to create my personal account at SUNRISE"
    shippingAddress: "Shipping Address"
    shippingInformation: "Shipping Information"
    shippingMethod: "Shipping Method"
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
    itemsTotal: "{n} Artikel im Warenkorb"
    editMyCart: "Warenkorb bearbeiten"
    orderSummary: "Bestellübersicht"
    quantity: "Menge"
    price: "Preis"
    total: "Gesamtpreis"

    billingAddress: "Zahlungsadresse"
    completeMyOrder: "Zahlungspflichtig bestellen"
    continueCheckout: "Weiter"
    needHelpCustomerService: "Brauchen Sie Hilfe? Kundenservice"
    orderDate: "Bestelldatum"
    orderDiscount: "Bestelldiscount"
    orderNumber: "Bestellnummer"
    paymentInformation: "Zahlungsdetails"
    promoCodeApplied: "Gutschein eingelöst"
    rememberMe: "Meine Daten speichern für einen Account"
    shippingAddress: "Versandadresse"
    shippingInformation: "Versand Information"
    shippingMethod: "Versandart"
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
