<template>
  <div class="login-box-wrapper">
    <div class="clearfix">
      <div class="pull-left">
        <div class="login-box-title">{{ $t('title') }}</div>
      </div>
    </div>
    <hr class="login-box-hr">
    <div class="login-box-description">{{ $t('description') }}</div>
    <div class="login-box-input-wrapper">
      <BaseForm :vuelidate="$v"
                :onSubmit="customerSignMeIn"
                #default="{ error, state }">
        <div class="row">
          <div class="col-sm-12">
            <ServerError :error="error"
                         v-slot="{ graphQLError }">
              {{ getErrorMessage(graphQLError) }}
            </ServerError>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <BaseInput v-model="form.email"
                       :vuelidate="$v.form.email"
                       :label="$t('email')"
                       type="email"
                       autocomplete="username"
                       data-test="login-form-email" />
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <BaseInput v-model="form.password"
                       :vuelidate="$v.form.password"
                       :label="$t('password')"
                       type="password"
                       autocomplete="current-password"
                       data-test="login-form-password" />
          </div>
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
            <router-link :to="{ name: 'forgot-password'}">
              {{ $t('forgotPassword') }}
            </router-link>
            </div>
          </div>
        </div>
        <LoadingButton :state="state"
                       class="login-box-sign-in-btn"
                       data-test="login-form-submit">
          {{ $t('signIn') }}
        </LoadingButton>
      </BaseForm>
    </div>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';
import gql from 'graphql-tag';
import authMixin from '../../mixins/authMixin';
import ServerError from '../common/form/ServerError.vue';
import LoadingButton from '../common/form/LoadingButton.vue';
import BaseInput from '../common/form/BaseInput.vue';
import BaseForm from '../common/form/BaseForm.vue';

export default {
  components: {
    BaseForm,
    BaseInput,
    ServerError,
    LoadingButton,
  },

  mixins: [authMixin],

  data: () => ({
    form: {
      email: '',
      password: '',
    },
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
            email: this.form.email,
            password: this.form.password,
          },
        },
      }).then(() => this.login(this.form.email, this.form.password))
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
    form: {
      email: { required, email },
      password: { required },
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
