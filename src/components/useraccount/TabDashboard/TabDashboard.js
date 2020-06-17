import gql from 'graphql-tag';
import authMixin from '../../../mixins/authMixin';

export default {
  data: () => ({
    me: null,
  }),
  mixins: [authMixin],
  apollo: {
    me: {
      query: gql`
        query me {
          me {
            customer {
              id
              firstName
              lastName
              customerNumber
            }
          }
        }`,
    },
  },
};
