import gql from 'graphql-tag';
import authMixin from '../../../mixins/authMixin';

export default {
  mixins: [authMixin],
  data: () => ({
    me: null,
  }),
  computed: {
    showLoggedIn: (vm) => vm.$store.state.authenticated && vm.me,
  },
  apollo: {
    me: {
      query: gql`
        query loginButtonMe {
          me {
            customer {
              id
              firstName
            }
          }
        }`,
      skip: (vm) => !vm.$store.state.authenticated,
    },
  },
};
