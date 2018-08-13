<template>
  <div class="login-box-wrapper">
    <div class="clearfix">
      <div class="pull-left">
        <div class="login-box-title">{{ $t('title') }}</div>
      </div>
      <div class="pull-right">
        <div class="login-box-required">{{ $t('required') }}*</div>
      </div>
    </div>
    <hr class="login-box-hr">
    <div class="login-box-description">{{ $t('description') }}</div>
    <div class="login-box-input-wrapper">
      <form @submit.prevent="login">
        <div v-if="serverError"
             class="error">
          <div v-if="hasInvalidCredentialsError">{{ $t('invalidCredentials') }}</div>
          <div v-else-if="serverError.networkError">{{ $t('main.messages.networkError') }}</div>
          <div v-else>{{ $t('main.messages.unknownError') }}</div>
        </div>
        <div class="login-box-input">
          <span>{{ $t('email') }}*</span><br>
          <div v-if="$v.email.$error"
               class="error">
            <div v-if="!$v.email.required">{{ $t('main.messages.requiredField') }}</div>
            <div v-if="!$v.email.email">{{ $t('main.messages.requiredEmail') }}</div>
          </div>
          <input v-model.trim.lazy="$v.email.$model"
                 autocomplete="username"
                 type="email"
                 data-test="login-form-email" />
        </div>
        <div class="login-box-input">
          <span>{{ $t('password') }}*</span><br>
          <div v-if="$v.password.$error"
               class="error">
            <div v-if="!$v.password.required">{{ $t('main.messages.requiredField') }}</div>
            <div v-if="!$v.password.minLength">{{ $t('passwordMinLength') }}</div>
          </div>
          <input v-model.trim.lazy="$v.password.$model"
                 autocomplete="current-password"
                 type="password"
                 data-test="login-form-password" />
        </div>
        <div class="clearfix">
          <div class="pull-left">
            <div class="login-box-remember-me">
              <!--<input id="form-login-remember-me" type="checkbox" name="rememberMe" value="true" -->
              <!--{{#if form.rememberMe}}checked{{/if}}>-->
              <!--<label for="form-login-remember-me">{{ $t('rememberMe') }}</label>-->
            </div>
          </div>
          <div class="pull-right">
            <div class="login-box-forgot-password">
              <!--<a href="{{@root.meta._links.recoveryEmail.href}}">-->
              <!--{{ $t('forgotPassword') }}-->
              <!--</a>-->
            </div>
          </div>
        </div>
        <button :disabled="loading || $v.$anyError"
                class="login-box-sign-in-btn"
                data-test="login-form-submit" >
          <span v-if="loading">
            {{ $t('main.messages.pleaseWait') }}
          </span>
          <span v-else>
            {{ $t('signIn') }}
          </span>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators';

export default {
  data: () => ({
    email: null,
    password: null,
    loading: false,
    serverError: null,
  }),

  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(5),
    },
  },

  computed: {
    hasInvalidCredentialsError() {
      return this.serverError && Array.isArray(this.serverError.graphQLErrors)
        && this.serverError.graphQLErrors.some(error => error.code === 'InvalidCredentials');
    },

    credentials() {
      return {
        email: this.email,
        password: this.password,
      };
    },
  },

  methods: {
    login() {
      this.$v.$touch();
      this.serverError = null;
      if (!this.$v.$invalid) {
        this.loading = true;
        this.$store.dispatch('login', this.credentials)
          .catch((error) => {
            this.serverError = error;
          }).finally(() => {
            this.loading = false;
          });
      }
    },
  },
};
</script>

<!-- eslint-disable -->
<i18n>
{
  "en": {
    "title": "Returning Customer Sign In",
    "required": "Required Fields",
    "description": "If you have an account, please sign in for a faster checkout",
    "email": "Email",
    "password": "Password",
    "rememberMe": "Remember Me",
    "forgotPassword": "Forgot Password",
    "signIn": "Sign In",
    "passwordMinLength": "Password should contain at least 5 characters",
    "invalidCredentials": "Invalid credentials"
  },
  "de": {
    "title": "Kundenanmeldung",
    "required": "Pflichtfeld",
    "description": "Für einen schnelleren Checkout Prozess, melden Sie sich bitte mit Ihrem persönlichen Kundenkonto ein.",
    "email": "E-Mail",
    "password": "Passwort",
    "rememberMe": "Angemeldet bleiben",
    "forgotPassword": "Passwort vergessen",
    "signIn": "Anmelden",
    "passwordMinLength": "Das Passwort sollte mindestens 5 Zeichen enthalten",
    "invalidCredentials": "Ungültige Anmeldeinformationen"
  }
}
</i18n>
