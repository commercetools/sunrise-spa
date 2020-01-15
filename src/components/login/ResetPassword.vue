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
              <span>{{ $t('resetPassword') }}</span>
            </div>
            <BaseForm :vuelidate="$v"
                      :onSubmit="resetPassword"
                      #default="{ error, state }"
                      id="form-reset-password">
              <ServerError :error="error"
                          #default="{ graphQLError }">
                {{ getErrorMessage(graphQLError) }}
              </ServerError>
              <div class="row">
                <div class="col-sm-4">
                  <div class="form-sections">
                    <BaseInput v-model="newPassword"
                              :vuelidate="$v.newPassword"
                              :label="$t('newPassword')"
                              type="password"
                              class="form-inputs"
                              data-test="reset-new-password"/>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-4">
                  <div class="form-sections">
                    <BaseInput v-model="confirmPassword"
                              :vuelidate="$v.confirmPassword"
                              :label="$t('confirmPassword')"
                              type="password"
                              class="form-inputs"
                              data-test="reset-confirm-password"/>
                  </div>
                </div>
              </div>
              <hr class="light-grey-hr">
              <div class="personal-details-edit-btn">
                <span>
                  <LoadingButton :state="state"
                                 :disabled="!$v.$anyDirty"
                                 type="submit"
                                 data-test="reset-password-submit">
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
import { required, sameAs } from 'vuelidate/lib/validators';
import gql from 'graphql-tag';
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
    newPassword: null,
    confirmPassword: null,
  }),

  methods: {
    resetPassword() {
      const tokenValue = this.$route.params.token;
      return this.$apollo.mutate({
        mutation: gql`
          mutation resetPassword($tokenValue: String!, $newPassword: String!) {
            customerResetPassword(tokenValue: $tokenValue, newPassword: $newPassword) {
              firstName
            }
          }`,
        variables: {
          tokenValue,
          newPassword: this.newPassword,
        },
      });
    },

    getErrorMessage({ code }) {
      if (code === 'InvalidSubject') {
        return this.$t('invalidSubject');
      }
      return this.$t('unknownError');
    },
  },

  validations: {
    newPassword: { required },
    confirmPassword: { required, sameAsPassword: sameAs('newPassword') },
  },
};

</script>

<i18n>
en:
  title: "My Account"
  resetPassword: "Reset Password"
  newPassword: "New Password"
  confirmPassword: "Confirm New Password"
  submit: "Submit"
  invalidSubject: "The token is invalid"

de:
  title: "Mein Konto"
  resetPassword: "Passwort Zurücksetzen"
  newPassword: "Neues Password"
  confirmPassword: "Neues Passwort bestätigen"
  submit: "Weiter"
  invalidSubject: "Das Token ist ungültig"
</i18n>
