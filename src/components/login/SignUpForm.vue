<template>
  <div class="signup-box-wrapper">
    <div class="clearfix">
      <div class="pull-left">
        <div class="signup-box-title">{{ $t('title') }}</div>
      </div>
      <div class="pull-right">
        <div class="signup-box-required">{{ $t('required') }}*</div>
      </div>
    </div>
    <hr class="signup-box-hr">
    <div class="signup-box-description">{{ $t('description') }}</div>
    <form @submit.prevent="submit(customerSignMeUp)">
      <ServerError :error="serverError">
        <template slot-scope="{ graphQLError }">
          {{ getErrorMessage(graphQLError) }}
        </template>
      </ServerError>
      <div class="row">
        <div class="col-sm-6">
          <div class="signup-box-input">
            <BaseFormField :vuelidate="$v.firstName"
                           :label="$t('firstName')">
              <input v-model.trim.lazy="$v.firstName.$model"
                     autocomplete="fname"
                     type="text"
                     data-test="signup-form-firstname" />
            </BaseFormField>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="signup-box-input">
            <BaseFormField :vuelidate="$v.lastName"
                           :label="$t('secondName')">
              <input v-model.trim.lazy="$v.lastName.$model"
                     autocomplete="lname"
                     type="text"
                     data-test="signup-form-lastname" >
            </BaseFormField>
          </div>
        </div>
      </div>
      <hr class="signup-box-hr">
      <div class="signup-box-input">
        <BaseFormField :vuelidate="$v.email"
                       :label="$t('email')">
          <input v-model.trim.lazy="$v.email.$model"
                 autocomplete="username"
                 type="email"
                 data-test="signup-form-email" />
        </BaseFormField>
      </div>
      <div class="row">
        <div class="col-sm-6">
          <div class="signup-box-input">
            <BaseFormField :vuelidate="$v.password"
                           :label="$t('password')">
              <input v-model.trim.lazy="$v.password.$model"
                     autocomplete="off"
                     type="password"
                     data-test="signup-form-password" />
            </BaseFormField>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="signup-box-input">
            <BaseFormField :vuelidate="$v.repeatPassword"
                           :label="$t('repeatPassword')"
                           :customMessages="{ sameAsPassword: $t('repeatPasswordError') }">
              <input v-model.trim.lazy="$v.repeatPassword.$model"
                     autocomplete="off"
                     type="password"
                     data-test="signup-form-repeatpassword" />
            </BaseFormField>
          </div>
        </div>
      </div>
      <hr class="signup-box-hr">
      <!--<div class="signup-box-newsletter">-->
        <!--<input type="checkbox" name="joinNewsletter" value="true" -->
               <!--{{#if form.subscribeToNewsletter}}checked{{/if}}>-->
        <!--<span>{{ $t('pleaseAddMe') }} <a href="">{{ $t('newsletter') }}</a></span>-->
      <!--</div>-->
      <div class="signup-box-terms">
        <BaseFormField :vuelidate="$v.agreeToTerms"
                       :label="$t('agreeTo')"
                       :customMessages="{ mustBeAgreed: $t('agreeToTermsError') }">
          <input v-model.trim.lazy="$v.agreeToTerms.$model"
                 autocomplete="off"
                 type="checkbox"
                 data-test="signup-form-agreetoterms" />
        </BaseFormField>
      </div>
      <LoadingButton :buttonState="buttonState"
                     class="signup-register-btn"
                     data-test="signup-form-submit">
        {{ $t('registerNow') }}
      </LoadingButton>
    </form>
  </div>
</template>

<script>
import {
  required, email, minLength, sameAs,
} from 'vuelidate/lib/validators';
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
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    repeatPassword: '',
    agreeToTerms: false,
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
            email: this.email,
            password: this.password,
            firstName: this.firstName,
            lastName: this.lastName,
          },
        },
      }).then(() => clientLogin(this.email, this.password))
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
    firstName: {
      required,
    },
    lastName: {
      required,
    },
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(5),
    },
    repeatPassword: {
      sameAsPassword: sameAs('password'),
    },
    agreeToTerms: {
      required,
      mustBeAgreed: sameAs(() => true),
    },
  },
};
</script>

<i18n>
en:
  title: "New Customer Registration"
  required: "Required Fields"
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
  required: "Pflichtfeld"
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
