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
    <form @submit.prevent="signup">
      <ServerError :error="serverError">
        <template slot-scope="{ graphQLError }">
          {{ getErrorMessage(graphQLError) }}
        </template>
      </ServerError>
      <div class="row">
        <div class="col-sm-6">
          <div class="signup-box-input">
            <span>{{ $t('firstName') }}*</span><br>
            <ValidationError :vuelidate="$v.firstName" />
            <input v-model.trim.lazy="$v.firstName.$model"
                   autocomplete="fname"
                   type="text"
                   data-test="signup-form-firstname" />
          </div>
        </div>
        <div class="col-sm-6">
          <div class="signup-box-input">
            <span>{{ $t('secondName') }}*</span><br>
            <ValidationError :vuelidate="$v.lastName" />
            <input v-model.trim.lazy="$v.lastName.$model"
                   autocomplete="lname"
                   type="text"
                   data-test="signup-form-lastname" >
          </div>
        </div>
      </div>
      <hr class="signup-box-hr">
      <div class="signup-box-input">
        <span>{{ $t('email') }}*</span><br>
        <ValidationError :vuelidate="$v.email" />
        <input v-model.trim.lazy="$v.email.$model"
               autocomplete="username"
               type="email"
               data-test="signup-form-email" />
      </div>
      <div class="row">
        <div class="col-sm-6">
          <div class="signup-box-input">
            <span>{{ $t('password') }}*</span><br/>
            <ValidationError :vuelidate="$v.password" />
            <input v-model.trim.lazy="$v.password.$model"
                   autocomplete="off"
                   type="password"
                   data-test="signup-form-password" />
          </div>
        </div>
        <div class="col-sm-6">
          <div class="signup-box-input">
            <span>{{ $t('repeatPassword') }}*</span><br>
            <ValidationError :vuelidate="$v.repeatPassword"
                             :customMessages="{ sameAsPassword: $t('repeatPasswordError') }"/>
            <input v-model.trim.lazy="$v.repeatPassword.$model"
                   autocomplete="off"
                   type="password"
                   data-test="signup-form-repeatpassword" />
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
        <ValidationError :vuelidate="$v.agreeToTerms"
                         :customMessages="{ mustBeAgreed: $t('agreeToTermsError') }"/>
        <input v-model.trim.lazy="$v.agreeToTerms.$model"
               autocomplete="off"
               type="checkbox"
               data-test="signup-form-agreetoterms" />
        <span>{{ $t('agreeTo') }} <a href="#">{{ $t('termsAndConditions') }}</a></span>
      </div>
      <div class="signup-box-policy">{{ $t('personalInfo') }} <a href="#">{{ $t('privacyPolicy') }}</a></div>
      <button :disabled="loading"
              class="signup-register-btn"
              data-test="signup-form-submit">
        <span v-if="loading">
            {{ $t('main.messages.pleaseWait') }}
          </span>
        <span v-else>
            {{ $t('registerNow') }}
        </span>
      </button>
    </form>
  </div>
</template>

<script>
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators';
import ServerError from '@/components/ServerError.vue';
import ValidationError from '@/components/ValidationError.vue';

export default {
  name: 'LoginBox',
  components: { ServerError, ValidationError },

  data: () => ({
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    repeatPassword: null,
    agreeToTerms: false,
    loading: false,
    serverError: null,
  }),

  computed: {
    customerDraft() {
      return {
        email: this.email,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName,
      };
    },
  },

  methods: {
    async signup() {
      this.$v.$touch();
      this.serverError = null;
      if (!this.$v.$invalid) {
        this.loading = true;
        await this.$store.dispatch('signup', this.customerDraft)
          .then(() => {
            this.$router.push({ name: 'user' });
          }).catch((error) => {
            this.serverError = error;
          });
        this.loading = false;
      }
    },

    getErrorMessage({ code, field }) {
      if (code === 'DuplicateField' && field === 'email') {
        return this.$t('duplicatedEmail');
      }
      return null;
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
      mustBeAgreed: sameAs(() => true),
    },
  },
};
</script>

<!-- eslint-disable -->
<i18n>
{
  "en": {
    "title": "New Customer Registration",
    "required": "Required Fields",
    "description": "Create an account to store your products, easy checkouts, customer discounts, benefits and more.",
    "titleSelect": "Title",
    "firstName": "First Name",
    "secondName": "Second Name",
    "email": "Email",
    "confirmEmail": "Confirm Email",
    "password": "Password",
    "repeatPassword": "Confirm Password",
    "repeatPasswordError": "Passwords do not match",
    "pleaseAddMe": "Please add me to the",
    "newsletter": "SUNRISE Newsletter",
    "agreeTo": "I agree to the",
    "termsAndConditions": "Terms and Conditions",
    "agreeToTermsError": "You must agree to the terms",
    "personalInfo": "Sunrise does not share or sell personal information. See",
    "privacyPolicy": "Privacy Policy",
    "registerNow": "Register Now",
    "duplicatedEmail": "A customer with this email already exists"
  },
  "de": {
    "title": "Neukunden Resigstrierung",
    "required": "Pflichtfeld",
    "description": "Konto einrichten, um das Shoppen noch einfacher zu machen.",
    "titleSelect": "Titel",
    "firstName": "Vorname",
    "secondName": "Nachname",
    "email": "E-Mail",
    "confirmEmail": "E-Mail bestätigen",
    "password": "Passwort",
    "repeatPassword": "Passwort bestätigen",
    "repeatPasswordError": "Passwörter stimmen nicht überein",
    "pleaseAddMe": "Anmeldung zum",
    "newsletter": "SUNRISE Newsletter",
    "agreeTo": "Ich stimme den \"\" zu.",
    "termsAndConditions": "AGB",
    "agreeToTermsError": "Sie müssen den Bedingungen zustimmen",
    "personalInfo": "Ihre persönliche Daten werden vertaulich behandelt.",
    "privacyPolicy": "Datenschutz",
    "registerNow": "Jetzt registieren",
    "duplicatedEmail": "Ein Kunde mit dieser E-Mail existiert bereits"
  }
}
</i18n>
