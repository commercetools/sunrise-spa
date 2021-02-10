import { required } from 'vuelidate/lib/validators';
import ServerError from '../../common/form/ServerError/ServerError.vue';
import LoadingButton from '../../common/form/LoadingButton/LoadingButton.vue';
import BaseInput from '../../common/form/BaseInput/BaseInput.vue';
import BaseForm from '../../common/form/BaseForm/BaseForm.vue';
import customers from '../../../api/customers';
import { changeRoute } from '../../common/shared';
//import resetPassword
export default {
  components: {
    BaseForm,
    BaseInput,
    LoadingButton,
    ServerError,
  },
  data: () => ({
    email: 'willy.wonka@commercetools.com',
  }),
  methods: {
    sendRecoveryEmail() {
      //normally the token would be requested through your server
      //  and that server will send the url with the token to the user's email
      //  you need manage_customers scope in you api client
      return customers.createToken({email:this.email}).then(
        result=>{
          changeRoute(`reset-password/${result.value}`,this,false,false);
        }
      )
    },
    getErrorMessage({ code }) {
      if (code === 'InvalidSubject') {
        return this.$t('invalidSubject');
      }
      return this.$t('unknownError');
    },
  },
  validations: {
    email: { required },
  },
};
