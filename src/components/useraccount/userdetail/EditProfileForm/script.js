import { required, email } from 'vuelidate/lib/validators';
import gql from 'graphql-tag';
import customerMixin from '../../../../mixins/customerMixin';
import ServerError from '../../../common/form/ServerError/index.vue';
import LoadingButton from '../../../common/form/LoadingButton/index.vue';
import BaseInput from '../../../common/form/BaseInput/index.vue';
import BaseForm from '../../../common/form/BaseForm/index.vue';

export default {
  components: {
    BaseForm,
    BaseInput,
    LoadingButton,
    ServerError,
  },
  mixins: [customerMixin],
  data: () => ({
    me: null,
    form: {},
    showForm: false,
  }),
  methods: {
    updateCustomerProfile() {
      return this.updateMyCustomer([
        { changeEmail: { email: this.form.email } },
        { setFirstName: { firstName: this.form.firstName } },
        { setLastName: { lastName: this.form.lastName } },
      ]);
    },
    getErrorMessage({ code, field }) {
      if (code === 'DuplicateField' && field === 'email') {
        return this.$t('duplicatedEmail');
      }
      return this.$t('unknownError');
    },
    openForm() {
      this.form = { ...this.me.customer };
      delete this.form.__typename;
      this.showForm = true;
    },
    closeForm() {
      this.showForm = false;
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
