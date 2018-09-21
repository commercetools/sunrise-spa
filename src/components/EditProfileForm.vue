<template>
<div>
  <div class="personal-details-edit personal-details-edit-show">
    <form @submit.prevent="save"
          id="form-edit-personal-details">
      <ServerError :error="serverError" />
      <div class="row">
        <div class="col-sm-6">
          <div class="form-sections">
            <span class="form-labels">{{ $t('firstName') }}*</span><br>
            <ValidationError :vuelidate="$v.firstName" />
            <input v-model.trim.lazy="$v.firstName.$model"
                   autocomplete="fname"
                   type="text"
                   class="form-inputs"
                   data-test="edit-profile-form-firstname"/>
          </div>

          <div class="form-sections">
            <span class="form-labels">{{ $t('email') }}*</span><br>
            <ValidationError :vuelidate="$v.email" />
            <input v-model.trim.lazy="$v.email.$model"
                   autocomplete="email"
                   type="email"
                   class="form-inputs"
                   data-test="edit-profile-form-email"/>
            <br>
            <span class="form-notes"></span>
          </div>

        </div>
        <div class="col-sm-6">
          <div class="form-sections">
            <span class="form-labels">{{ $t('lastName') }}*</span><br>
            <ValidationError :vuelidate="$v.lastName" />
            <input v-model.trim.lazy="$v.lastName.$model"
                   autocomplete="lname"
                   type="text"
                   class="form-inputs"
                   data-test="edit-profile-form-lastname"/>
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
          <button :disabled="loading"
                  type="submit"
                  class="update-btn"
                  data-test="edit-profile-form-submit">
            <span v-if="loading">
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
</div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';
import ServerError from '@/components/ServerError.vue';
import ValidationError from '@/components/ValidationError.vue';
import { mapGetters } from 'vuex';

export default {
  components: { ValidationError, ServerError },

  data: () => ({
    firstName: null,
    lastName: null,
    email: null,
    loading: false,
    serverError: null,
  }),

  created() {
    this.email = this.user.email;
    this.firstName = this.user.firstName;
    this.lastName = this.user.lastName;
  },

  computed: {
    ...mapGetters(['user']),

    updateActions() {
      return [
        { changeEmail: { email: this.email } },
        { setFirstName: { firstName: this.firstName } },
        { setLastName: { lastName: this.lastName } },
      ];
    },

    hasFormChanged() {
      const hasEmailChanged = this.email !== this.user.email;
      const hasFirstNameChanged = this.firstName !== this.user.firstName;
      const hasLastNameChanged = this.lastName !== this.user.lastName;
      return hasEmailChanged || hasFirstNameChanged || hasLastNameChanged;
    },
  },

  methods: {
    async save() {
      this.$v.$touch();
      this.serverError = null;
      if (!this.$v.$invalid && this.hasFormChanged) {
        this.loading = true;
        await this.$store.dispatch('updateCustomer', this.updateActions)
          .then(() => {
            this.$emit('close');
          }).catch((error) => {
            this.serverError = error;
          });
        this.loading = false;
      }
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
    "subscribeToNewsletter": "Please add me to the Sunrise Newsletter"
  },
  "de": {
    "title": "Ihre Benutzerdaten",
    "updateBtn": "Details aktualisieren",
    "cancelBtn": "Abbrechen",
    "firstName": "Vorname",
    "lastName": "Nachname",
    "email": "Email Adresse",
    "subscribeToNewsletter": "Ich möchte den Sunrise Newsletter erhalten."
  }
}
</i18n>
