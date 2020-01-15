<template>
<div class="my-account">
  <div class="container">
    <div class="my-account-title">
      <span class="my-account-title-text icon-user">{{ $t('title') }}</span>
    </div>
      <div class="row my-account-content">
        <div class="col-sm-12">
          <div class="checkout-form-step">
            <div class="personal-details-title">
              <span>{{ $t('forgotPassword') }}</span>
            </div>
            <BaseForm :vuelidate="$v"
                      :onSubmit="sendRecoveryEmail"
                      #default="{ error, state }"
                      id="form-forgot-password">
              <ServerError :error="error"
                          #default="{ graphQLError }">
                {{ getErrorMessage(graphQLError) }}
              </ServerError>
              <div class="row">
                <div class="col-sm-4">
                  <div class="form-sections">
                    <BaseInput v-model="email"
                              :vuelidate="$v.email"
                              :label="$t('email')"
                              type="email"
                              class="form-inputs"
                              data-test="forgot-password-email"/>
                  </div>
                </div>
              </div>
              <hr class="light-grey-hr">
              <div class="personal-details-edit-btn">
                <span>
                  <LoadingButton :state="state"
                                 :disabled="!$v.$anyDirty"
                                 type="submit"
                                 data-test="forgot-password-form-submit">
                    {{ $t('submit') }}
                  </LoadingButton>
                </span>
              </div>
            </BaseForm>
          </div>
        </div>
      </div>
  </div>
</div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import axios from 'axios';
import ServerError from '../common/form/ServerError.vue';
import LoadingButton from '../common/form/LoadingButton.vue';
import BaseInput from '../common/form/BaseInput.vue';
import BaseForm from '../common/form/BaseForm.vue';

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
        { email: this.email, baseUrl: window.location.origin });
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

</script>

<i18n>
en:
  title: "My Account"
  forgotPassword: "Forgot Password"
  email: "Email"
  submit: "Submit"
  invalidSubject: "Customer with this email was not found"

de:
  title: "Mein Konto"
  forgotPassword: "Passwort vergessen"
  email: "Email"
  submit: "Weiter"
  invalidSubject: "Kunde mit dieser E-Mail wurde nicht gefunden"
</i18n>
