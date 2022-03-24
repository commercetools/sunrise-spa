<i18n src="./Login.txt" lang="yaml"></i18n>
<style src="./Login.scss" lang="scss"></style>
<script src="./Login.js"></script>

<template>
  <div
    class="
      login-register-area
      section-padding-1
      pt-50
      pb-100
    "
  >
    <div class="container">
      <div class="row login-register-row">
        <div class="col-lg-6 col-md-6">
          <LoginForm />
        </div>
        <div class="col-lg-6 col-md-6">
          <SignUpForm />
        </div>
      </div>
    </div>
  </div>
</template>
