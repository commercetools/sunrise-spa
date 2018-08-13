<template>
  <li class="list-item-user">
    <ul class="nav-list">
      <li v-if="isLoggedIn"
          class="list-item-user">
        <a @click="logout"
           class="link-user"
           data-test="logout-button">
          <span>{{ $t("main.header.signOut") }}</span>
        </a>
      </li>
      <li v-if="isLoggedIn"
          class="list-item-user"
          data-test="login-info-name">
        <router-link :to="{ name: 'user' }"
                     class="link-user icon-user">
        <span class="hidden-xs hidden-sm">{{ firstName }}</span>
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
import { mapState } from 'vuex';

export default {
  computed: mapState({
    isLoggedIn: state => state.user.isLoggedIn,
    firstName: state => state.user.info.firstName,
  }),

  methods: {
    logout() {
      this.$store.dispatch('logout');
    },
  },
};
</script>
