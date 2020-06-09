import { required } from 'vuelidate/lib/validators';
import axios from 'axios';
import sunriseConfig from '../../../../sunrise.config';
import ServerError from '../../common/form/ServerError/ServerError.vue';
import LoadingButton from '../../common/form/LoadingButton/LoadingButton.vue';
import BaseInput from '../../common/form/BaseInput/BaseInput.vue';
import BaseForm from '../../common/form/BaseForm/BaseForm.vue';

export default {
  components: {
    BaseForm,
    BaseInput,
    LoadingButton,
    ServerError,
  },
  data: () => ({
    email: null,
  }),
  methods: {
    sendRecoveryEmail() {
      return axios.post('https://a8nroxg8i3.execute-api.eu-west-1.amazonaws.com/dev/email/send',
        { email: this.email, baseUrl: window.location.origin, projectConfig: sunriseConfig.ct });
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
