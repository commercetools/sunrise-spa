// this is only to demonstrate how it works, you should use a proxy
//  in production:
//  https://github.com/commercetools/sunrise-spa/blob/f7a1b591b05d919cc59f1bbca05adf6095334fe8/composition/useAccessRules.js#L35-L47
<i18n src="./ForgotPassword.txt" lang="yaml"></i18n>
<script src="./ForgotPassword.js"></script>
<style src="./ForgotPassword.scss" lang="scss"></style>

<template>
  <div class="my-account">
    <div class="container">
      <div class="my-account-title">
        <span class="my-account-title-text icon-user">{{
          t('myAccount')
        }}</span>
      </div>
      <div class="row my-account-content">
        <div class="col-sm-12 my-account-tab">
          <div class="checkout-form-step">
            <div class="personal-details-title">
              <span>{{ t('forgotPassword') }}</span>
            </div>
            <BaseForm
              :vuelidate="v"
              :onSubmit="createToken"
              #default="{ error, state }"
              id="form-forgot-password"
            >
              <ServerError
                :error="error"
                #default="{ graphQLError }"
              >
                {{ getErrorMessage(graphQLError) }}
              </ServerError>
              <div class="row">
                <div class="col-sm-4">
                  <div class="form-sections">
                    <BaseInput
                      v-model="v.email.$model"
                      :vuelidate="v.email"
                      :label="t('email')"
                      type="email"
                      class="form-inputs"
                      data-test="forgot-password-email"
                    />
                  </div>
                </div>
              </div>
              <hr class="light-grey-hr" />
              <div class="personal-details-edit-btn">
                <span>
                  <!-- :disabled="!$v.$anyDirty" -->
                  <LoadingButton
                    :state="state"
                    type="submit"
                    data-test="forgot-password-form-submit"
                  >
                    {{ t('submit') }}
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
