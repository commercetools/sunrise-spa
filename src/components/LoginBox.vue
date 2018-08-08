<template>
  <div class="login-box-wrapper">
    <div class="clearfix">
      <div class="pull-left">
        <div class="login-box-title">{{ $t('myAccount.login.loginBox.title') }}</div>
      </div>
      <div class="pull-right">
        <div class="login-box-required">{{ $t('myAccount.login.loginBox.required') }}*</div>
      </div>
    </div>
    <hr class="login-box-hr">
    <div class="login-box-description">{{ $t('myAccount.login.loginBox.description') }}</div>
    <div class="login-box-input-wrapper">
      <form @submit.prevent="login">
        <div class="login-box-input">
          <span>{{ $t('myAccount.login.loginBox.email') }}*</span><br>
          <input v-model.trim="username"
                 type="email"/>
          <div v-if="!$v.username.required" class="error">Field is required</div>
          <div v-if="!$v.username.email" class="error">It should be an email</div>
        </div>
        <div class="login-box-input">
          <span>{{ $t('myAccount.login.loginBox.password') }}*</span><br>
          <input v-model.trim="password"
                 type="password"/>
          <div v-if="!$v.password.required" class="error">Field is required</div>
        </div>
        <div class="clearfix">
          <div class="pull-left">
            <div class="login-box-remember-me">
              <!--<input id="form-login-remember-me" type="checkbox" name="rememberMe" value="true" -->
              <!--{{#if form.rememberMe}}checked{{/if}}>-->
              <!--<label for="form-login-remember-me">{{ $t('myAccount.login.loginBox.rememberMe') }}</label>-->
            </div>
          </div>
          <div class="pull-right">
            <div class="login-box-forgot-password">
              <!--<a href="{{@root.meta._links.recoveryEmail.href}}">-->
              <!--{{ $t('myAccount.login.loginBox.forgotPassword') }}-->
              <!--</a>-->
            </div>
          </div>
        </div>
        <button class="login-box-sign-in-btn">
          {{ $t('myAccount.login.loginBox.signIn') }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';

export default {
  data: () => ({
    username: null,
    password: null,
  }),

  validations: {
    username: {
      required,
      email,
    },
    password: {
      required,
    },
  },

  methods: {
    login() {
      if (!this.$v.$invalid) {
        this.$store.dispatch('login', {
          apollo: this.$apollo,
          username: this.username,
          password: this.password,
        });
      }
    },
  },
};
</script>
