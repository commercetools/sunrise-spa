import { required, email } from 'vuelidate/lib/validators';
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
      email: '',
      password: '',
    },
  }),
  methods: {
    customerSignMeIn() {
      return this.$apollo.mutate({
        mutation: gql`
          mutation customerSignMeIn($draft: CustomerSignMeInDraft!) {
            customerSignMeIn(draft: $draft) {
              customer {
                id 
                customerGroup {
                  id
                }                
              }
            }
          }`,
        variables: {
          draft: {
            email: this.form.email,
            password: this.form.password,
          },
        },
      }).then(({ data }) => this.login(this.form.email, this.form.password, data))
        .then(() => this.$router.push({ name: 'user' }));
    },
    getErrorMessage({ code }) {
      if (code === 'InvalidCredentials') {
        return this.$t('invalidCredentials');
      }
      return this.$t('unknownError');
    },
  },
  validations: {
    form: {
      email: { required, email },
      password: { required },
    },
  },
};
