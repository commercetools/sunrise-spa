<template>
  <div>
    <div id="my-account-mobile-content"
         class="my-account-sidebar-items">
      <router-link :to="{ name: 'user' }">
        {{ $t("personalDetails") }}
      </router-link>
    </div>
    <div class="my-account-sidebar-items">
      <router-link :to="{ name: 'orders' }"
                   data-test="my-orders-button">
          {{ $t("myOrders") }}
      </router-link>
    </div>
    <div class="my-account-sidebar-items">
      <router-link :to="{ name: 'changepassword' }"
                   data-test="change-password-button">
          {{ $t("changePassword") }}
      </router-link>
    </div>
    <div class="my-account-sidebar-items">
      <button @click="logout">
        {{ $t("signOut") }}
      </button>
    </div>
  </div>
</template>

<script>
import authMixin from '../../mixins/authMixin';

export default {
  mixins: [authMixin],
};
</script>

<i18n>
en:
  personalDetails: "Personal Details"
  addressBook: "Address Book"
  paymentDetails: "Payment Details"
  myOrders: "My Orders"
  returnsExchange: "Returns / Exchange"
  wishlist: "Wishlist"
  signOut: "Sign Out"
  changePassword: "Change password"
de:
  personalDetails: "Meine Benutzerdaten"
  addressBook: "Adressbuch"
  paymentDetails: "Meine Zahlungdaten"
  myOrders: "Meine Bestellungen"
  returnsExchange: "Meine Retouren"
  wishlist: "Wunschliste"
  signOut: "Abmelden"
  changePassword: "Passwort ändern"
</i18n>
