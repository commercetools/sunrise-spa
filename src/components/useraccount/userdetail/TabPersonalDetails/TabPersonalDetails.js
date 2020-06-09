import gql from 'graphql-tag';
import EditProfileForm from '../EditProfileForm/EditProfileForm.vue';

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
