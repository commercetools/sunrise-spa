<template>
  <li class="list-item-user">
    <ul class="nav-list">
      <li v-if="showLoggedIn"
          class="list-item-user hidden-xs">
        <button @click="logout"
                class="link-user"
                data-test="logout-button">
          <span>{{ $t("signOut") }}</span>
        </button>
      </li>
      <li v-if="showLoggedIn"
          class="list-item-user">
        <router-link :to="{ name: 'user' }"
                     data-test="login-info-name"
                     class="link-user icon-user">
          <span class="hidden-xs hidden-sm">{{ me.customer.firstName }}</span>
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
import gql from 'graphql-tag';
import { clientLogout } from '@/auth';

export default {
  data: () => ({
    me: null,
  }),

  computed: {
    showLoggedIn: vm => vm.$store.state.authenticated && vm.me,
  },

  methods: {
    logout() {
      clientLogout().then(() => this.$router.replace({ query: { logout: true } }));
    },
  },

  apollo: {
    me: {
      query: gql`
        query me {
          me {
            customer {
              id
              firstName
            }
          }
        }`,
      skip: vm => !vm.$store.state.authenticated,
    },
  },
};
</script>

<i18n>
en:
  signOut: "Log Out"
  signIn: "Sign In"
de:
  signOut: "Log Out"
  signIn: "Log In"
</i18n>

<style lang="scss">
  .list-item-user > .nav-list > .list-item-user {
    @media screen and (max-width: 767px) {
      width: 100%;
      border: none;
    }
  }
</style>

