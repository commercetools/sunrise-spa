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
        <ServerError :error="serverError">
          <template slot-scope="{ graphQLError }">
            {{ getErrorMessage(graphQLError) }}
          </template>
        </ServerError>
        <div class="login-box-input">
          <span>{{ $t('email') }}*</span><br>
          <ValidationError :vuelidate="$v.email">
            <input v-model.trim.lazy="$v.email.$model"
                   autocomplete="username"
                   type="email"
                   data-test="login-form-email" />
          </ValidationError>
        </div>
        <div class="login-box-input">
          <span>{{ $t('password') }}*</span><br>
          <ValidationError :vuelidate="$v.password">
            <input v-model.trim.lazy="$v.password.$model"
                   autocomplete="current-password"
                   type="password"
                   data-test="login-form-password" />            
          </ValidationError>
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
        <button :disabled="loading"
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
import { required, email } from 'vuelidate/lib/validators';
import ServerError from '@/components/ServerError.vue';
import ValidationError from '@/components/ValidationError.vue';

export default {
  components: { ServerError, ValidationError },

  data: () => ({
    email: null,
    password: null,
    loading: false,
    serverError: null,
  }),

  computed: {
    credentials() {
      return {
        email: this.email,
        password: this.password,
      };
    },
  },

  methods: {
    async login() {
      this.$v.$touch();
      this.serverError = null;
      if (!this.$v.$invalid) {
        this.loading = true;
        await this.$store.dispatch('login', this.credentials)
          .then(() => {
            this.$router.push({ name: 'user' });
          }).catch((error) => {
            this.serverError = error;
          });
        this.loading = false;
      }
    },

    getErrorMessage({ code }) {
      if (code === 'InvalidCredentials') {
        return this.$t('invalidCredentials');
      }
      return null;
    },
  },

  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
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
    "invalidCredentials": "Ungültige Anmeldeinformationen"
  }
}
</i18n>
