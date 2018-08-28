<template>
  <div class="container">
    <!--{{> common/messages}}-->

    <div class="my-account-login-page-title">
      <span class="icon-user">{{ $t('pageTitle') }}</span>
    </div>

    <div class="login-signup-box-wrapper">
      <div class="row">
        <div class="col-sm-6">
          <LoginBox/>
        </div>
        <div class="col-sm-6">
          <div class="signup-box-mobile">
            <!--{{> myaccount/signup-box form=content.signUpForm settings=content.signUpFormSettings}}-->
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import LoginBox from '@/components/LoginBox.vue';

export default {
  components: {
    LoginBox,
  },
};
</script>

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
