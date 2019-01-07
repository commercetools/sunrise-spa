<template>
  <div class="container">
    <!--{{> common/messages}}-->

    <div class="my-account-login-page-title">
      <span class="icon-user">{{ $t('pageTitle') }}</span>
    </div>

    <div class="login-signup-box-wrapper">
      <div class="row">
        <div class="col-sm-6">
          <LoginForm/>
        </div>
        <div class="col-sm-6">
          <div class="signup-box-mobile">
            <SignUpForm/>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import LoginForm from './LoginForm.vue';
import SignUpForm from './SignUpForm.vue';

export default {
  components: { LoginForm, SignUpForm },
};
</script>

<!-- eslint-disable -->
<i18n>
{
  "en": {
    "pageTitle": "Customer Sign In"
  },
  "de": {
    "pageTitle": "Kundenanmeldung"
  }
}
</i18n>
