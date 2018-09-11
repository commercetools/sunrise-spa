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
            <SignUpForm/>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import LoginBox from '@/components/LoginBox.vue';
import SignUpForm from '@/components/SignUpForm.vue';

export default {
  components: { LoginBox, SignUpForm },
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
