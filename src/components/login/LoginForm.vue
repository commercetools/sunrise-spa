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
      <form @submit.prevent="submit(customerSignMeIn)">
        <ServerError :error="serverError">
          <template slot-scope="{ graphQLError }">
            {{ getErrorMessage(graphQLError) }}
          </template>
        </ServerError>
        <div class="login-box-input">
          <BaseFormField :vuelidate="$v.email"
                         :label="$t('email')">
            <input v-model.trim.lazy="$v.email.$model"
                   autocomplete="username"
                   type="email"
                   data-test="login-form-email" />
          </BaseFormField>
        </div>
        <div class="login-box-input">
          <BaseFormField :vuelidate="$v.password"
                         :label="$t('password')">
            <input v-model.trim.lazy="$v.password.$model"
                   autocomplete="current-password"
                   type="password"
                   data-test="login-form-password" />
          </BaseFormField>
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
        <LoadingButton :buttonState="buttonState"
                       class="login-box-sign-in-btn"
                       data-test="login-form-submit">
          {{ $t('signIn') }}
        </LoadingButton>
      </form>
    </div>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';
import gql from 'graphql-tag';
import { clientLogin } from '../../auth';
import formMixin from '../../mixins/formMixin';
import ServerError from '../common/ServerError.vue';
import LoadingButton from '../common/LoadingButton.vue';
import BaseFormField from '../common/BaseFormField.vue';

export default {
  components: {
    BaseFormField,
    ServerError,
    LoadingButton,
  },

  mixins: [formMixin],

  data: () => ({
    email: '',
    password: '',
  }),

  methods: {
    customerSignMeIn() {
      return this.$apollo.mutate({
        mutation: gql`
          mutation customerSignMeIn($draft: CustomerSignMeInDraft!) {
            customerSignMeIn(draft: $draft) {
              customer {
                id
              }
            }
          }`,
        variables: {
          draft: {
            email: this.email,
            password: this.password,
          },
        },
      }).then(() => clientLogin(this.email, this.password))
        .then(() => this.$router.push({ name: 'user' }));
    },

    getErrorMessage({ code }) {
      if (code === 'InvalidCredentials') {
        return this.$t('invalidCredentials');
      }
      return this.$t('unknownError');
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

<i18n>
en:
  title: "Returning Customer Sign In"
  required: "Required Fields"
  description: "If you have an account, please sign in for a faster checkout"
  email: "Email"
  password: "Password"
  rememberMe: "Remember Me"
  forgotPassword: "Forgot Password"
  signIn: "Sign In"
  invalidCredentials: "Invalid credentials"
de:
  title: "Kundenanmeldung"
  required: "Pflichtfeld"
  description: "Für einen schnelleren Checkout Prozess, melden Sie sich bitte mit Ihrem persönlichen Kundenkonto ein."
  email: "E-Mail"
  password: "Passwort"
  rememberMe: "Angemeldet bleiben"
  forgotPassword: "Passwort vergessen"
  signIn: "Anmelden"
  invalidCredentials: "Ungültige Anmeldeinformationen"
</i18n>
