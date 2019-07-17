<template>
  <div class="my-account-sidebar">
    <div id="my-account-mobile-content"
         class="my-account-sidebar-items"
         :class="{ active: showTab === 'TabPersonalDetails' }">
      <router-link :to="{ name: 'user' }">
        <button>
          {{ $t("personalDetails") }}
        </button>
      </router-link>
    </div>
    <div class="my-account-sidebar-items"
         :class="{ active: showTab === 'TabOrderDetail' }">
      <router-link :to="{ name: 'orders' }">
        <button data-test="my-orders-button">
          {{ $t("myOrders") }}
        </button>
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
  props: ['showTab'],

  mixins: [authMixin],
};
</script>


<style lang="scss" scoped>
  .my-account-sidebar-items button {
    text-transform: uppercase;
    letter-spacing: 1px;
  }
</style>

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
