<template>
  <li class="list-item-user">
    <ul class="nav-list">
      <li v-if="isAuthenticated"
          class="list-item-user">
        <button @click="logout"
           class="link-user"
           data-test="logout-button">
          <span>{{ $t("signOut") }}</span>
        </button>
      </li>
      <li v-if="isAuthenticated"
          class="list-item-user">
        <router-link :to="{ name: 'user' }"
                     data-test="login-info-name"
                     class="link-user icon-user">
          <span class="hidden-xs hidden-sm">{{ user.firstName }}</span>
        </router-link>
      </li>
      <li v-else
          class="list-item-user"
          data-test="login-button">
        <router-link :to="{ name: 'login' }"
                     class="link-user icon-user">
          <span class="hidden-xs hidden-sm">
            {{ $t("signIn") }}
          </span>
        </router-link>
      </li>
    </ul>
  </li>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['isAuthenticated', 'user']),
  },

  methods: {
    logout() {
      this.$store.dispatch('logout')
        .then(() => this.$router.push('/'));
    },
  },
};
</script>

<i18n>
 {
  "en": {
    "signOut": "Log Out",
    "signIn": "Sign In"
  },
  "de": {
    "signOut": "Log Out",
    "signIn": "Log In"
  }
 }
</i18n>
