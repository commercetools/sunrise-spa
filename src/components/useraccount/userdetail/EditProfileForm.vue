<template>
  <div v-if="me"
       class="personal-details-edit personal-details-edit-show">
    <form @submit.prevent="submit(updateCustomerProfile)"
          id="form-edit-personal-details">
      <ServerError :error="serverError">
        <template slot-scope="{ graphQLError }">
          {{ getErrorMessage(graphQLError) }}
        </template>
      </ServerError>
      <div class="row">
        <div class="col-sm-6">
          <div class="form-sections">
            <BaseFormField :vuelidate="$v.me.customer.firstName"
                           :label="$t('firstName')">
              <input v-model.trim="$v.me.customer.firstName.$model"
                     autocomplete="fname"
                     type="text"
                     class="form-inputs"
                     data-test="edit-profile-form-firstname"/>
            </BaseFormField>
          </div>

          <div class="form-sections">
            <BaseFormField :vuelidate="$v.me.customer.email"
                           :label="$t('email')">
              <input v-model.trim="$v.me.customer.email.$model"
                     autocomplete="email"
                     type="email"
                     class="form-inputs"
                     data-test="edit-profile-form-email"/>
            </BaseFormField>
            <br>
            <span class="form-notes"></span>
          </div>

        </div>
        <div class="col-sm-6">
          <div class="form-sections">
            <BaseFormField :vuelidate="$v.me.customer.lastName"
                           :label="$t('lastName')">
              <input v-model.trim="$v.me.customer.lastName.$model"
                     autocomplete="lname"
                     type="text"
                     class="form-inputs"
                     data-test="edit-profile-form-lastname"/>
            </BaseFormField>
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
                         :disabled="!$v.$anyDirty"
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
import formMixin from '../../../mixins/formMixin';
import customerMixin from '../../../mixins/customerMixin';
import ServerError from '../../common/ServerError.vue';
import LoadingButton from '../../common/LoadingButton.vue';
import BaseFormField from '../../common/BaseFormField.vue';

export default {
  components: {
    BaseFormField,
    LoadingButton,
    ServerError,
  },

  mixins: [customerMixin, formMixin],

  data: () => ({
    me: null,
  }),

  methods: {
    updateCustomerProfile() {
      return this.updateMyCustomer([
        { changeEmail: { email: this.me.customer.email } },
        { setFirstName: { firstName: this.me.customer.firstName } },
        { setLastName: { lastName: this.me.customer.lastName } },
      ]);
    },

    getErrorMessage({ code, field }) {
      if (code === 'DuplicateField' && field === 'email') {
        return this.$t('duplicatedEmail');
      }
      return this.$t('unknownError');
    },
  },

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
    me: {
      customer: {
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
