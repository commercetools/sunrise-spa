<i18n src="./TabChangePassword.txt"></i18n>
<script src="./TabChangePassword.js"></script>
<style src="./TabChangePassword.scss" lang="scss" scope></style>

<template>
  <div v-if="me" class="myaccount-content">
    <h3>{{$t('title')}}</h3>
    <div class="account-details-form">
      <BaseForm :vuelidate="$v" :onSubmit="updateCustomerPassword" #default="{ error}">
        <ServerError :error="error" #default="{ graphQLError }">{{ getErrorMessage(graphQLError) }}</ServerError>
        <div class="single-input-item">
          <label for="current-pwd" class="required">{{$t('currentPassword')}}</label>
          <BaseInput
            v-model="form.currentPassword"
            :vuelidate="$v.form.currentPassword"
            type="password"
            data-test="change-password-form-currentpassword"
          />
        </div>
        <div class="row">
          <div class="col-lg-6 pt-30">
            <div class="single-input-item">
              <label for="new-pwd" class="required">{{$t('newPassword')}}</label>
              <BaseInput
                v-model="form.newPassword"
                :vuelidate="$v.form.newPassword"
                type="password"
                data-test="change-password-form-newpassword"
              />
            </div>
          </div>
          <div class="col-lg-6 pt-30">
            <div class="single-input-item">
              <label for="confirm-pwd" class="required">{{$t('newPasswordConfirm')}}</label>
              <BaseInput
                v-model="form.newPasswordConfirm"
                :vuelidate="$v.form.newPasswordConfirm"
                :customErrors="{ sameAsPassword: $t('newPasswordConfirmError') }"
                type="password"
                data-test="change-password-form-newpasswordconfirm"
              />
            </div>
          </div>
        </div>
        <div class="single-input-item pt-30">
          <button
            :disabled="$v.$invalid"
            type="submit"
            class="check-btn sqr-btn"
            :class="$v.$invalid ? 'disabled' : ''"
            data-test="change-password-submit"
          >{{$t('updateBtn')}}</button>
        </div>
      </BaseForm>
    </div>
  </div>
</template>
