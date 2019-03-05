<template>
  <div class="my-account-sidebar">
    <div id="my-account-mobile-content"
          class="my-account-sidebar-items"
          :class="{ active: showTab.showPersonalDetails }">
          <router-link to="/user">
      <button>
        {{ $t("personalDetails") }}
      </button>
      </router-link>
    </div>
    <div data-test="my-orders-button"
         class="my-account-sidebar-items"
         :class="{ active: showTab.showMyOrders }">
         <router-link to="/user/orders">
      <button>
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
import { clientLogout } from '@/auth';

export default {
  props: ['showTab'],

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


<!-- eslint-disable -->
<i18n>
{
  "en": {
    "personalDetails": "Personal Details",
    "addressBook": "Address Book",
    "paymentDetails": "Payment Details",
    "myOrders": "My Orders",
    "returnsExchange": "Returns / Exchange",
    "wishlist": "Wishlist",
    "signOut": "Sign Out",
    "changePassword": "Change password"
  },
  "de": {
    "personalDetails": "Meine Benutzerdaten",
    "addressBook": "Adressbuch",
    "paymentDetails": "Meine Zahlungdaten",
    "myOrders": "Meine Bestellungen",
    "returnsExchange": "Meine Retouren",
    "wishlist": "Wunschliste",
    "signOut": "Abmelden",
    "changePassword": "Passwort ändern"
  }
}
</i18n>
