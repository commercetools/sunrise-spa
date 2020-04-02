import { clientLogout, clientLogin } from '../auth';

export default {
  methods: {
    login(username, password, data) {
      return Promise.all([
        this.$store.dispatch('setCustomerGroup', data?.customerSignMeIn?.customer?.customerGroup?.id),
        clientLogin(this.$apolloProvider.defaultClient, { username, password }),
      ]);
    },

    logout() {
      return Promise.all([
        this.$store.dispatch('setCustomerGroup', undefined),
        clientLogout(this.$apolloProvider.defaultClient, () => this.$router.replace({ query: { logout: true } })),
      ]);
    },
  },
};
