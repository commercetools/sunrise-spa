<style src="./SignUpForm.scss" lang="scss"></style>
<i18n src="./SignUpForm.txt" lang="yaml"></i18n>
<script src="./SignUpForm.js"></script>

<template>
  <div class="login-register-wrap register-wrap">
    <h3>{{ t('title') }}</h3>
    <BaseForm
      :vuelidate="v"
      :onSubmit="customerSignMeUp"
      #default="{ error }"
    >
      <ServerError :error="error" v-slot="{ graphQLError }">
        {{ getErrorMessage(graphQLError) }}
      </ServerError>
      <div class="login-register-form">
        <div class="row">
          <div class="col-sm-6 sin-login-register">
            <BaseInput
              v-model="v.firstName.$model"
              :vuelidate="v.firstName"
              :label="t('firstName')"
              type="text"
              autocomplete="fname"
              data-test="signup-form-firstname"
            />
          </div>
          <div class="col-sm-6 sin-login-register">
            <BaseInput
              v-model="v.lastName.$model"
              :vuelidate="v.lastName"
              :label="t('secondName')"
              type="text"
              autocomplete="lname"
              data-test="signup-form-lastname"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 sin-login-register">
            <BaseInput
              v-model="v.email.$model"
              :vuelidate="v.email"
              @altered="(v) => change('email', v)"
              :label="t('email')"
              type="email"
              autocomplete="username"
              data-test="signup-form-email"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-sm-6 sin-login-register">
            <BaseInput
              v-model="v.password.$model"
              :vuelidate="v.password"
              @altered="(v) => change('password', v)"
              :label="t('password')"
              type="password"
              autocomplete="off"
              data-test="signup-form-password"
            />
          </div>
          <div class="col-sm-6 sin-login-register">
            <BaseInput
              v-model="v.repeatPassword.$model"
              :vuelidate="v.repeatPassword"
              :customErrors="{
                sameAsPassword: t('repeatPasswordError'),
              }"
              @altered="(v) => change('repeatPassword', v)"
              :label="t('repeatPassword')"
              type="password"
              autocomplete="off"
              data-test="signup-form-repeatpassword"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 agree-to-terms">
            <BaseInput
              v-model="v.agreeToTerms.$model"
              :vuelidate="v.agreeToTerms"
              :customErrors="{
                mustBeAgreed: t('agreeToTermsError'),
              }"
              @altered="(v) => change('agreeToTerms', v)"
              :label="t('agreeTo')"
              type="checkbox"
              autocomplete="off"
              data-test="signup-form-agreetoterms"
            />
          </div>
        </div>
        <div
          class="login-register-btn"
          style="padding-top: 20px"
        >
          <button data-test="signup-form-submit">
            {{ t('registerNow') }}
          </button>
        </div>
      </div>
    </BaseForm>
  </div>
</template>
