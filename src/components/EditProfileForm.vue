<template>
  <div v-if="!empty && !loading"
       class="personal-details-edit personal-details-edit-show">
    <form @submit.prevent="save"
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
          <button :disabled="updating"
                  type="submit"
                  class="update-btn"
                  data-test="edit-profile-form-submit">
            <span v-if="updating">
              {{ $t('main.messages.pleaseWait') }}
            </span>
            <span v-else>
              {{ $t('updateBtn') }}
            </span>
          </button>
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
import ServerError from '@/components/ServerError.vue';
import ValidationError from '@/components/ValidationError.vue';

const customerFragment = gql`
  fragment customerFragment on Customer {
    email
    firstName
    lastName
    version
  }`;

export default {
  components: { ValidationError, ServerError },

  data: () => ({
    me: {},
    firstName: null,
    lastName: null,
    email: null,
    updating: false,
    serverError: null,
  }),

  computed: {
    empty: vm => !Object.keys(vm.me).length,

    loading: vm => vm.$apollo.queries.me.loading,

    updateActions() {
      return [
        { changeEmail: { email: this.email } },
        { setFirstName: { firstName: this.firstName } },
        { setLastName: { lastName: this.lastName } },
      ];
    },

    hasFormChanged() {
      const hasEmailChanged = this.email !== this.me.customer.email;
      const hasFirstNameChanged = this.firstName !== this.me.customer.firstName;
      const hasLastNameChanged = this.lastName !== this.me.customer.lastName;
      return hasEmailChanged || hasFirstNameChanged || hasLastNameChanged;
    },
  },

  methods: {
    async save() {
      this.$v.$touch();
      this.serverError = null;
      if (!this.$v.$invalid && this.hasFormChanged) {
        this.updating = true;
        await this.updateCustomer()
          .then(() => {
            this.$emit('close');
          }).catch((error) => {
            this.serverError = error;
          });
        this.updating = false;
      }
    },

    updateCustomer() {
      return this.$apollo.mutate({
        mutation: gql`
          mutation updateMyCustomer($actions: [MyCustomerUpdateAction!]!, $version: Long!) {
            updateMyCustomer(version: $version, actions: $actions) {
              ...customerFragment
            }
          }
          ${customerFragment}`,
        variables: {
          version: this.me.customer.version,
          actions: this.updateActions,
        },
        refetchQueries: ['fetchCustomer'],
      });
    },

    getErrorMessage({ code, field }) {
      if (code === 'DuplicateField' && field === 'email') {
        return this.$t('duplicatedEmail');
      }
      return null;
    },
  },

  watch: {
    me(value) {
      this.firstName = value.customer.firstName;
      this.lastName = value.customer.lastName;
      this.email = value.customer.email;
    },
  },

  apollo: {
    me: {
      query: gql`
        query fetchCustomer {
          me {
            customer {
              ...customerFragment
            }
          }
        }
        ${customerFragment}`,
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

<!-- eslint-disable -->
<i18n>
{
  "en": {
    "title": "Your Personal Details",
    "updateBtn": "Update Details",
    "cancelBtn": "Cancel",
    "firstName": "First Name",
    "lastName": "Last Name",
    "email": "Email Address",
    "subscribeToNewsletter": "Please add me to the Sunrise Newsletter",
    "duplicatedEmail": "A customer with this email already exists"
  },
  "de": {
    "title": "Ihre Benutzerdaten",
    "updateBtn": "Details aktualisieren",
    "cancelBtn": "Abbrechen",
    "firstName": "Vorname",
    "lastName": "Nachname",
    "email": "Email Adresse",
    "subscribeToNewsletter": "Ich möchte den Sunrise Newsletter erhalten.",
    "duplicatedEmail": "Ein Kunde mit dieser E-Mail existiert bereits"
  }
}
</i18n>
