import { required, sameAs } from 'vuelidate/lib/validators';
import gql from 'graphql-tag';
import customerMixin from '../../../../mixins/customerMixin';
import authMixin from '../../../../mixins/authMixin';
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
  mixins: [customerMixin, authMixin],
  data: () => ({
    me: null,
    form: {},
  }),
  methods: {
    updateCustomerPassword() {
      return this.updateMyCustomerPassword(this.form.currentPassword, this.form.newPassword)
        .then(() => {
          this.login(this.me.customer.email, this.form.newPassword);
          this.form = {};
          this.$v.$reset();
        });
    },
    getErrorMessage({ code }) {
      if (code === 'InvalidCurrentPassword') {
        return this.$t('invalidPassword');
      }
      return this.$t('unknownError');
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
            }
          }
        }`,
      skip: vm => !vm.$store.state.authenticated,
    },
  },
  validations: {
    form: {
      currentPassword: { required },
      newPassword: { required },
      newPasswordConfirm: { sameAsPassword: sameAs('newPassword') },
    },
  },
};
