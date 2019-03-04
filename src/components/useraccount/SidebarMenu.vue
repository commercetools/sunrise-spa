<template>
  <div class="my-account-sidebar">
    <div id="my-account-mobile-content"
          class="my-account-sidebar-items active">
      <span>Personal Details</span>
    </div>
    <div class="my-account-sidebar-items">
      <button @click="logout">
        <span>
          {{ $t("signOut") }}
        </span>
      </button>
    </div>
  </div>
</template>

<script>
import { clientLogout } from '@/auth';

export default {
  methods: {
    logout() {
      clientLogout().then(() => this.$router.replace({ query: { logout: true } }));
    },
  },
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
