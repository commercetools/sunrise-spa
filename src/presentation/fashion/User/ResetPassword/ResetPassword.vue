<i18n src="./ResetPassword.txt" lang="yaml"></i18n>
<script src="./ResetPassword.js"></script>

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
              <span>{{ t('resetPassword') }}</span>
            </div>
            <BaseForm
              :vuelidate="v"
              :onSubmit="resetPassword"
              #default="{ error, state }"
              id="form-reset-password"
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
                      v-model="v.newPassword.$model"
                      :vuelidate="v.newPassword"
                      :label="t('newPassword')"
                      type="password"
                      class="form-inputs"
                      data-test="reset-new-password"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-4">
                  <div class="form-sections">
                    <BaseInput
                      v-model="v.confirmPassword.$model"
                      :vuelidate="v.confirmPassword"
                      :label="t('confirmPassword')"
                      type="password"
                      class="form-inputs"
                      data-test="reset-confirm-password"
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
                    data-test="reset-password-submit"
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
