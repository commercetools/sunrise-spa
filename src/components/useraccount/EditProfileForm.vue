<template>
  <div v-if="me"
       class="personal-details-edit personal-details-edit-show">
    <form @submit.prevent="submit"
          id="form-edit-personal-details">
      <ServerError :error="serverError">
        <template slot-scope="{ graphQLError }">
          {{ getErrorMessage(graphQLError) }}
        </template>
      </ServerError>
      <div class="row">
        <div class="col-sm-6">
          <div class="form-sections">
            <span class="form-labels">{{ $t('firstName') }}*</span><br>
            <ValidationError :vuelidate="$v.firstName">
              <input v-model.trim.lazy="$v.firstName.$model"
                     autocomplete="fname"
                     type="text"
                     class="form-inputs"
                     data-test="edit-profile-form-firstname"/>
            </ValidationError>
          </div>

          <div class="form-sections">
            <span class="form-labels">{{ $t('email') }}*</span><br>
            <ValidationError :vuelidate="$v.email">
              <input v-model.trim.lazy="$v.email.$model"
                     autocomplete="email"
                     type="email"
                     class="form-inputs"
                     data-test="edit-profile-form-email"/>
            </ValidationError>
            <br>
            <span class="form-notes"></span>
          </div>

        </div>
        <div class="col-sm-6">
          <div class="form-sections">
            <span class="form-labels">{{ $t('lastName') }}*</span><br>
            <ValidationError :vuelidate="$v.lastName">
              <input v-model.trim.lazy="$v.lastName.$model"
                     autocomplete="lname"
                     type="text"
                     class="form-inputs"
                     data-test="edit-profile-form-lastname"/>
            </ValidationError>
          </div>
        </div>
      </div>
      <hr class="light-grey-hr">
      <!-- <div class="personal-details-newsletter"> -->
        <!-- <span> -->
          <!-- <input name="subscribeToNewsletter" -->
                  <!-- type="checkbox" -->
                  <!-- {{#if personalDetails.personalDetailsForm.subscribeToNewsletter}}checked{{/if}}/> -->
          <!-- {{ $t('personalDetailsForm.subscribeToNewsletter') }} -->
        <!-- </span> -->
      <!-- </div> -->
      <div class="personal-details-edit-btn">
        <span>
          <LoadingButton :buttonState="buttonState"
                         @reset="$emit('close')"
                         type="submit"
                         class="update-btn"
                         data-test="edit-profile-form-submit">
            {{ $t('updateBtn') }}
          </LoadingButton>
          <button @click="$emit('close')"
                  type="button"
                  class="cancel-btn personal-details-edit-hide-btn"
                  data-test="edit-profile-form-cancel">
            {{ $t('cancelBtn') }}
          </button>
        </span>
      </div>
    </form>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';
import gql from 'graphql-tag';
import customerMixin from '@/mixins/customerMixin';
import ServerError from '../common/ServerError.vue';
import ValidationError from '../common/ValidationError.vue';
import LoadingButton from '../common/LoadingButton.vue';

export default {
  components: {
    LoadingButton,
    ValidationError,
    ServerError,
  },

  data: () => ({
    me: null,
    firstName: null,
    lastName: null,
    email: null,
    buttonState: null,
    serverError: null,
  }),

  computed: {
    hasFormChanged() {
      const hasEmailChanged = this.email !== this.me.customer.email;
      const hasFirstNameChanged = this.firstName !== this.me.customer.firstName;
      const hasLastNameChanged = this.lastName !== this.me.customer.lastName;
      return hasEmailChanged || hasFirstNameChanged || hasLastNameChanged;
    },
  },

  methods: {
    async submit() {
      this.$v.$touch();
      this.serverError = null;
      if (!this.$v.$invalid && this.hasFormChanged) {
        this.buttonState = 'loading';
        await this.updateCustomerProfile()
          .then(() => {
            this.buttonState = 'success';
          }).catch((error) => {
            this.serverError = error;
            this.buttonState = null;
          });
      }
    },

    updateCustomerProfile() {
      return this.updateMyCustomer([
        { changeEmail: { email: this.email } },
        { setFirstName: { firstName: this.firstName } },
        { setLastName: { lastName: this.lastName } },
      ]);
    },

    getErrorMessage({ code, field }) {
      if (code === 'DuplicateField' && field === 'email') {
        return this.$t('duplicatedEmail');
      }
      return this.$t('unknownError');
    },
  },

  watch: {
    me(value) {
      this.firstName = value.customer.firstName;
      this.lastName = value.customer.lastName;
      this.email = value.customer.email;
    },
  },

  mixins: [customerMixin],

  apollo: {
    me: {
      query: gql`
        query me {
          me {
            customer {
              id
              version
              email
              firstName
              lastName
            }
          }
        }`,
      skip: vm => !vm.$store.state.authenticated,
    },
  },

  validations: {
    email: {
      required,
      email,
    },
    firstName: {
      required,
    },
    lastName: {
      required,
    },
  },
};
</script>

<i18n>
en:
  title: "Your Personal Details"
  updateBtn: "Update Details"
  cancelBtn: "Cancel"
  firstName: "First Name"
  lastName: "Last Name"
  email: "Email Address"
  subscribeToNewsletter: "Please add me to the Sunrise Newsletter"
  duplicatedEmail: "A customer with this email already exists"
de:
  title: "Ihre Benutzerdaten"
  updateBtn: "Details aktualisieren"
  cancelBtn: "Abbrechen"
  firstName: "Vorname"
  lastName: "Nachname"
  email: "Email Adresse"
  subscribeToNewsletter: "Ich möchte den Sunrise Newsletter erhalten."
  duplicatedEmail: "Ein Kunde mit dieser E-Mail existiert bereits"
</i18n>
