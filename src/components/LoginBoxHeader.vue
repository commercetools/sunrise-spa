<template>
  <li class="list-item-user">
    <ul class="nav-list">
      <li v-if="isAuthenticated"
          class="list-item-user">
        <button @click="logout"
           class="link-user"
           data-test="logout-button">
          <span>{{ $t("main.header.signOut") }}</span>
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
            {{ $t("main.header.signIn") }}
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
        .then(() => {
          this.$router.replace({ query: { logout: true } });
        });
    },
  },
};
</script>
