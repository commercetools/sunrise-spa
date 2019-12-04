<template>
  <div class="signup-box-wrapper">
    <div class="clearfix">
      <div class="pull-left">
        <div class="signup-box-title">{{ $t('title') }}</div>
      </div>
    </div>
    <hr class="signup-box-hr">
    <div class="signup-box-description">{{ $t('description') }}</div>
    <BaseForm :vuelidate="$v"
              :onSubmit="customerSignMeUp"
              #default="{ error, state }">
      <ServerError :error="error"
                   v-slot="{ graphQLError }">
        {{ getErrorMessage(graphQLError) }}
      </ServerError>
      <div class="row">
        <div class="col-sm-6">
          <BaseInput v-model="form.firstName"
                     :vuelidate="$v.form.firstName"
                     :label="$t('firstName')"
                     type="text"
                     autocomplete="fname"
                     data-test="signup-form-firstname" />
        </div>
        <div class="col-sm-6">
          <BaseInput v-model="form.lastName"
                     :vuelidate="$v.form.lastName"
                     :label="$t('secondName')"
                     type="text"
                     autocomplete="lname"
                     data-test="signup-form-lastname" />
        </div>
      </div>
      <hr class="signup-box-hr">
      <div class="row">
        <div class="col-sm-12">
          <BaseInput v-model="form.email"
                     :vuelidate="$v.form.email"
                     :label="$t('email')"
                     type="email"
                     autocomplete="username"
                     data-test="signup-form-email" />
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6">
          <BaseInput v-model="form.password"
                     :vuelidate="$v.form.password"
                     :label="$t('password')"
                     type="password"
                     autocomplete="off"
                     data-test="signup-form-password" />
        </div>
        <div class="col-sm-6">
          <BaseInput v-model="form.repeatPassword"
                     :vuelidate="$v.form.repeatPassword"
                     :label="$t('repeatPassword')"
                     :customErrors="{ sameAsPassword: $t('repeatPasswordError') }"
                     type="password"
                     autocomplete="off"
                     data-test="signup-form-repeatpassword" />
        </div>
      </div>
      <hr class="signup-box-hr">
      <!--<div class="signup-box-newsletter">-->
      <!--<input type="checkbox" name="joinNewsletter" value="true" -->
      <!--{{#if form.subscribeToNewsletter}}checked{{/if}}>-->
      <!--<span>{{ $t('pleaseAddMe') }} <a href="">{{ $t('newsletter') }}</a></span>-->
      <!--</div>-->
      <div class="row">
        <div class="col-sm-12">
          <BaseInput v-model="form.agreeToTerms"
                     :vuelidate="$v.form.agreeToTerms"
                     :label="$t('agreeTo')"
                     :customErrors="{ mustBeAgreed: $t('agreeToTermsError') }"
                     type="checkbox"
                     autocomplete="off"
                     data-test="signup-form-agreetoterms" />
        </div>
      </div>
      <LoadingButton :state="state"
                     class="signup-register-btn"
                     data-test="signup-form-submit">
        {{ $t('registerNow') }}
      </LoadingButton>
    </BaseForm>
  </div>
</template>

<script>
import {
  required, email, minLength, sameAs,
} from 'vuelidate/lib/validators';
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
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      repeatPassword: '',
      agreeToTerms: false,
    },
  }),

  methods: {
    customerSignMeUp() {
      return this.$apollo.mutate({
        mutation: gql`
          mutation customerSignMeUp($draft: CustomerSignMeUpDraft!) {
            customerSignMeUp(draft: $draft) {
              customer {
                id
              }
            }
          }`,
        variables: {
          draft: {
            email: this.form.email,
            password: this.form.password,
            firstName: this.form.firstName,
            lastName: this.form.lastName,
          },
        },
      }).then(() => this.login(this.form.email, this.form.password))
        .then(() => this.$router.push({ name: 'user' }));
    },

    getErrorMessage({ code, field }) {
      if (code === 'DuplicateField' && field === 'email') {
        return this.$t('duplicatedEmail');
      }
      return this.$t('unknownError');
    },
  },

  validations: {
    form: {
      firstName: { required },
      lastName: { required },
      email: { required, email },
      password: { required, minLength: minLength(5) },
      repeatPassword: { sameAsPassword: sameAs('password') },
      agreeToTerms: { required, mustBeAgreed: sameAs(() => true) },
    },
  },
};
</script>

<style lang="scss">
  .signup-box-terms {
    input {
      width: auto;
      margin-top: 0.3em;
    }
    .form-error-message {
      bottom: -15px;
    }
  }
</style>

<i18n>
en:
  title: "New Customer Registration"
  description: "Create an account to store your products, easy checkouts, customer discounts, benefits and more."
  titleSelect: "Title"
  firstName: "First Name"
  secondName: "Second Name"
  email: "Email"
  confirmEmail: "Confirm Email"
  password: "Password"
  repeatPassword: "Confirm Password"
  repeatPasswordError: "Passwords do not match"
  pleaseAddMe: "Please add me to the"
  newsletter: "SUNRISE Newsletter"
  agreeTo: "I agree to the Terms and Conditions"
  agreeToTermsError: "You must agree to the terms"
  registerNow: "Register Now"
  duplicatedEmail: "A customer with this email already exists"
de:
  title: "Neukunden Resigstrierung"
  description: "Konto einrichten, um das Shoppen noch einfacher zu machen."
  titleSelect: "Titel"
  firstName: "Vorname"
  secondName: "Nachname"
  email: "E-Mail"
  confirmEmail: "E-Mail bestätigen"
  password: "Passwort"
  repeatPassword: "Passwort bestätigen"
  repeatPasswordError: "Passwörter stimmen nicht überein"
  pleaseAddMe: "Anmeldung zum"
  newsletter: "SUNRISE Newsletter"
  agreeTo: "Ich stimme den AGB zu"
  agreeToTermsError: "Sie müssen den Bedingungen zustimmen"
  registerNow: "Jetzt registieren"
  duplicatedEmail: "Ein Kunde mit dieser E-Mail existiert bereits"
</i18n>
