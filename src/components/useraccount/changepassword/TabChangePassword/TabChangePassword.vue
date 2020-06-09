<i18n src="./TabChangePassword.txt"></i18n>
<script src="./TabChangePassword.js"></script>

<template>
  <div v-if="me">
    <div class="row">
      <div class="change-password col-md-8 col-sm-12">
        <div class="personal-details-title">
          <span>{{ $t('title') }}</span>
        </div>
        <BaseForm :vuelidate="$v"
                  :onSubmit="updateCustomerPassword"
                  #default="{ error, state }"
                  id="form-change-password">
          <ServerError :error="error"
                       #default="{ graphQLError }">
            {{ getErrorMessage(graphQLError) }}
          </ServerError>
          <div class="row">
            <div class="col-sm-6">
              <div class="form-sections">
                <BaseInput v-model="form.currentPassword"
                           :vuelidate="$v.form.currentPassword"
                           :label="$t('currentPassword')"
                           type="password"
                           class="form-inputs"
                           data-test="change-password-form-currentpassword"/>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-6">
              <div class="form-sections">
                <BaseInput v-model="form.newPassword"
                           :vuelidate="$v.form.newPassword"
                           :label="$t('newPassword')"
                           type="password"
                           class="form-inputs"
                           data-test="change-password-form-newpassword"/>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="form-sections">
                <BaseInput v-model="form.newPasswordConfirm"
                           :vuelidate="$v.form.newPasswordConfirm"
                           :label="$t('newPasswordConfirm')"
                           :customErrors="{ sameAsPassword: $t('newPasswordConfirmError') }"
                           type="password"
                           class="form-inputs"
                           data-test="change-password-form-newpasswordconfirm"/>
              </div>
            </div>
          </div>
          <hr class="light-grey-hr">
          <div class="personal-details-edit-btn">
            <span>
              <LoadingButton :state="state"
                             :disabled="!$v.$anyDirty"
                             type="submit"
                             class="update-btn"
                             data-test="edit-profile-form-submit">
                {{ $t('updateBtn') }}
              </LoadingButton>
            </span>
          </div>
        </BaseForm>
      </div>
    </div>
  </div>

</template>
