import gql from 'graphql-tag';
import { required, email } from 'vuelidate/lib/validators';
import customerMixin from '../../../mixins/customerMixin';
import BaseInput from '../../common/form/BaseInput/BaseInput.vue';
import BaseForm from '../../common/form/BaseForm/BaseForm.vue';

export default {
  components: {
    BaseInput, BaseForm,
  },
  data: () => ({
    me: null,
    form: {},
  }),
  mixins: [customerMixin],
  methods: {
    updateCustomerProfile() {
      return this.updateMyCustomer([
        { changeEmail: { email: this.form.email } },
        { setFirstName: { firstName: this.form.firstName } },
        { setLastName: { lastName: this.form.lastName } },
      ]);
    },
  },
  watch: {
    me() {
      this.form = { ...this.me.customer };
    },
  },
  apollo: {
    me: {
      query: gql`
        query me {
          me {
            customer {
              id
              version
              email
              firstName
              lastName
            }
          }
        }`,
    },
  },
  validations: {
    form: {
      email: { required, email },
      firstName: { required },
      lastName: { required },
    },
  },
};
