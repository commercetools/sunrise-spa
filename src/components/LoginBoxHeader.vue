<template>
  <ul>
    <li v-if="isLoggedIn"
        class="list-item-user">
      <a @click="logout"
         class="link-user">
        <span>{{ $t("main.header.signOut") }}</span>
      </a>
    </li>
    <li v-if="isLoggedIn"
        class="list-item-user">
      <router-link :to="{ name: 'user' }"
                   class="link-user icon-user">
      <span class="hidden-xs hidden-sm">
        User name
      </span>
      </router-link>
    </li>
    <li v-else
        class="list-item-user">
      <router-link :to="{ name: 'login' }"
                   class="link-user icon-user">
      <span class="hidden-xs hidden-sm">
        {{ $t("main.header.signIn") }}
      </span>
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {

  computed: {
    isLoggedIn() {
      return this.$store.state.user.isLoggedIn;
    },
  },

  methods: {
    logout() {
      this.$store.dispatch('logout', this.$apollo);
    },
  },
};
</script>
