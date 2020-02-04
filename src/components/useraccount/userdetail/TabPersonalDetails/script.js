import gql from 'graphql-tag';
import EditProfileForm from '../EditProfileForm/index.vue';

export default {
  components: { EditProfileForm },
  data: () => ({
    me: null,
  }),
  apollo: {
    me: {
      query: gql`
        query me {
          me {
            customer {
              id
              firstName
              customerNumber
            }
          }
        }`,
    },
  },
};
