import {
  required, email, minLength, sameAs,
} from 'vuelidate/lib/validators';
import gql from 'graphql-tag';
import authMixin from '../../../mixins/authMixin';
import ServerError from '../../common/form/ServerError/index.vue';
import LoadingButton from '../../common/form/LoadingButton/index.vue';
import BaseInput from '../../common/form/BaseInput/index.vue';
import BaseForm from '../../common/form/BaseForm/index.vue';

export default {
  components: {
    BaseForm,
    BaseInput,
    ServerError,
    LoadingButton,
  },
  mixins: [authMixin],
  data: () => ({
    form: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      repeatPassword: '',
      agreeToTerms: false,
    },
  }),
  methods: {
    customerSignMeUp() {
      return this.$apollo.mutate({
        mutation: gql`
          mutation customerSignMeUp($draft: CustomerSignMeUpDraft!) {
            customerSignMeUp(draft: $draft) {
              customer {
                id
              }
            }
          }`,
        variables: {
          draft: {
            email: this.form.email,
            password: this.form.password,
            firstName: this.form.firstName,
            lastName: this.form.lastName,
          },
        },
      }).then(() => this.login(this.form.email, this.form.password))
        .then(() => this.$router.push({ name: 'user' }));
    },
    getErrorMessage({ code, field }) {
      if (code === 'DuplicateField' && field === 'email') {
        return this.$t('duplicatedEmail');
      }
      return this.$t('unknownError');
    },
  },
  validations: {
    form: {
      firstName: { required },
      lastName: { required },
      email: { required, email },
      password: { required, minLength: minLength(5) },
      repeatPassword: { sameAsPassword: sameAs('password') },
      agreeToTerms: { required, mustBeAgreed: sameAs(() => true) },
    },
  },
};
