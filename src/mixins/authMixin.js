import { clientLogout, clientLogin } from '../auth';

export default {
  methods: {
    login(username, password) {
      return clientLogin(this.$apolloProvider.defaultClient, { username, password });
    },

    logout() {
      return clientLogout(this.$apolloProvider.defaultClient, () => this.$router.replace({ query: { logout: true } }));
    },
  },
};
