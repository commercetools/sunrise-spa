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
      <form @submit="logIn">
        <div class="login-box-input">
          <span>{{ $t('myAccount.login.loginBox.email') }}*</span><br>
          <input v-model.trim="username"
                 type="email"/>
          <div class="error" v-if="!$v.username.required">Field is required</div>
          <div class="error" v-if="!$v.username.email">It should be an email</div>
        </div>
        <div class="login-box-input">
          <span>{{ $t('myAccount.login.loginBox.password') }}*</span><br>
          <input v-model.trim="password"
                 type="password"/>
          <div class="error" v-if="!$v.password.required">Field is required</div>
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
import { onLogin, onLogout } from '@/apollo';
import UserInfo from '@/components/UserInfo.vue';
import { required, email } from 'vuelidate/lib/validators';

export default {
  components: {
    UserInfo,
  },

  data: () => ({
    username: null,
    password: null,
    isLoggedIn: false,
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
    logIn() {
      if (!this.$v.invalid) {
        onLogin(this.$apollo.provider.clients.me, this.username, this.password)
          .then(() => {
            this.isLoggedIn = true;
          });
      }
    },
    logOut() {
      this.isLoggedIn = false;
      onLogout(this.$apollo.provider.clients.me);
    },
  },
};
</script>
