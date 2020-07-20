import gql from 'graphql-tag';
import authMixin from '../../../mixins/authMixin';

export default {
  mixins: [authMixin],
  data: () => ({
    email: null,
    password: null,
    showLogin: false,
    showCoupon: false,
  }),
  computed: {
    authenticated() {
      return this.$store.state.authenticated;
    },
  },
  methods: {
    login() {
      return this.$apollo.mutate({
        mutation: gql`
          mutation customerSignMeIn($draft: CustomerSignMeInDraft!) {
            customerSignMeIn(draft: $draft) {
              customer {
                id
              }
            }
          }`,
        variables: {
          draft: {
            email: this.email,
            password: this.password,
          },
        },
      }).then(() => this.login(this.email, this.password));
    },
  },
};
