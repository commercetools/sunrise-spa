//this is only to demonstrate how it works, you should use a proxy
//  in production:
//  https://github.com/commercetools/sunrise-spa/blob/f7a1b591b05d919cc59f1bbca05adf6095334fe8/composition/useAccessRules.js#L35-L47
import ServerError from 'presentation/components/ServerError/ServerError.vue';
import BaseForm from 'presentation/components/BaseForm/BaseForm.vue';
import LoadingButton from 'presentation/components/LoadingButton/LoadingButton.vue';
import BaseInput from 'presentation/components/BaseInput/BaseInput.vue';
import { useI18n } from 'vue-i18n';
import useCustomerTools from 'hooks/useCustomerTools';
import useResetPasswordForm from 'hooks/useResetPasswordForm';
export default {
  components: {
    BaseForm,
    BaseInput,
    LoadingButton,
    ServerError,
  },
  setup() {
    const { createResetToken, gotoResetToken } =
      useCustomerTools();
    const { t } = useI18n();
    const { form, v } = useResetPasswordForm();
    const createToken = () => {
      return createResetToken(form.value.email).then(
        (result) =>
          gotoResetToken(
            result.data.customerCreatePasswordResetToken
              .value
          )
      );
    };
    const getErrorMessage = ({ code }) => {
      if (code === 'InvalidSubject') {
        return t('invalidSubject');
      }
      return t('unknownError');
    };

    return { createToken, getErrorMessage, form, v, t };
  },
};
