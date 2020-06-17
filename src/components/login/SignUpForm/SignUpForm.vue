<style src="./SignUpForm.scss" lang="scss"></style>
<i18n src="./SignUpForm.txt"></i18n>
<script src="./SignUpForm.js"></script>

<template>
  <div class="login-register-wrap register-wrap">
    <h3>{{ $t('title') }}</h3>
    <BaseForm :vuelidate="$v" :onSubmit="customerSignMeUp" #default="{ error, state }">
      <ServerError :error="error" v-slot="{ graphQLError }">{{ getErrorMessage(graphQLError) }}</ServerError>
      <div class="login-register-form">
        <div class="row">
          <div class="col-sm-6 sin-login-register">
            <BaseInput
              v-model="form.firstName"
              :vuelidate="$v.form.firstName"
              :label="$t('firstName')"
              type="text"
              autocomplete="fname"
              data-test="signup-form-firstname"
            />
          </div>
          <div class="col-sm-6 sin-login-register">
            <BaseInput
              v-model="form.lastName"
              :vuelidate="$v.form.lastName"
              :label="$t('secondName')"
              type="text"
              autocomplete="lname"
              data-test="signup-form-lastname"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 sin-login-register">
            <BaseInput
              v-model="form.email"
              :vuelidate="$v.form.email"
              :label="$t('email')"
              type="email"
              autocomplete="username"
              data-test="signup-form-email"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-sm-6 sin-login-register">
            <BaseInput
              v-model="form.password"
              :vuelidate="$v.form.password"
              :label="$t('password')"
              type="password"
              autocomplete="off"
              data-test="signup-form-password"
            />
          </div>
          <div class="col-sm-6 sin-login-register">
            <BaseInput
              v-model="form.repeatPassword"
              :vuelidate="$v.form.repeatPassword"
              :label="$t('repeatPassword')"
              :customErrors="{ sameAsPassword: $t('repeatPasswordError') }"
              type="password"
              autocomplete="off"
              data-test="signup-form-repeatpassword"
            />
          </div>
        </div>
        <!--<div class="signup-box-newsletter">-->
        <!--<input type="checkbox" name="joinNewsletter" value="true" -->
        <!--{{#if form.subscribeToNewsletter}}checked{{/if}}>-->
        <!--<span>{{ $t('pleaseAddMe') }} <a href="">{{ $t('newsletter') }}</a></span>-->
        <!--</div>-->
        <div class="row">
          <div class="col-sm-12 agree-to-terms">
            <BaseInput
              v-model="form.agreeToTerms"
              :vuelidate="$v.form.agreeToTerms"
              :label="$t('agreeTo')"
              :customErrors="{ mustBeAgreed: $t('agreeToTermsError') }"
              type="checkbox"
              autocomplete="off"
              data-test="signup-form-agreetoterms"
            />
          </div>
        </div>
        <div class="login-register-btn">
          <button data-test="signup-form-submit">{{ $t('registerNow') }}</button>
        </div>
      </div>
    </BaseForm>
  </div>
</template>
