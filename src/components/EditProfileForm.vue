<template>
<div>
  <div class="personal-details-edit personal-details-edit-show">
<<<<<<< HEAD
    <form @submit.prevent="save"
          id="form-edit-personal-details">
      <ServerError :error="serverError" />
      <!-- <input type="hidden" name="csrfToken"/> -->
      <!-- <div class="row"> -->
        <!-- {{> form/global-messages messages=content.personalDetailsForm.messages}} -->
        <!-- {{> form/global-errors errors=content.personalDetailsForm.errors}} -->
      <!-- </div> -->
      <!-- <div class="row"> -->
        <!-- <div class="col-sm-12"> -->
          <!-- <ChooseTitle  /> -->
          <!-- {{> form/choose-title containerClass="form-sections" -->
          <!-- selectId="personal-details-title-select" -->
          <!-- selectName="title" -->
          <!-- options=content.personalDetailsFormSettings.title}} -->
        <!-- </div> -->
      <!-- </div> -->
      <div class="row">
        <div class="col-sm-6">
          <div class="form-sections">
            <span class="form-labels">{{ $t('firstName') }}*</span>
            <br>
            <div v-if="$v.firstName.$error"
                 data-test="edit-form-firstname-error"
                 class="error">
              <div v-if="!$v.firstName.required">{{ $t('main.messages.requiredField') }}</div>
            </div>
            <input  v-model.trim.lazy="$v.firstName.$model"
                    autocomplete="fname"
                    type="text"
                    class="form-inputs"
                    data-test="edit-form-firstName"/>
          </div>

          <div class="form-sections">
            <span class="form-labels">{{ $t('email') }}*</span>
            <br>
            <div v-if="$v.email.$error"
                  data-test="edit-form-email-errors"
                  class="error">
              <div v-if="!$v.email.required">{{ $t('main.messages.requiredField') }}</div>
              <div v-if="!$v.email.email">{{ $t('main.messages.requiredEmail') }}</div>
            </div>
            <input  v-model.trim.lazy="$v.email.$model"
                    autocomplete="email"
                    type="email"
                    class="form-inputs"
                    data-test="edit-form-email"/>
            <br>
            <span class="form-notes"></span>
          </div>

        </div>
        <div class="col-sm-6">
          <div class="form-sections">
            <span class="form-labels">{{ $t('lastName') }}*</span>
            <br>
            <div v-if="$v.lastName.$error"
                  data-test="edit-form-lastname-error"
                  class="error">
              <div v-if="!$v.lastName.required">{{ $t('main.messages.requiredField') }}</div>
            </div>
            <input  v-model.trim.lazy="$v.lastName.$model"
                    autocomplete="lname"
                    type="text"
                    class="form-inputs"
                    data-test="edit-form-lastName"/>
          </div>
        </div>
      </div>
      <hr class="light-grey-hr">
=======
    <form @submit.prevent="edit"
          id="form-edit-personal-details">
          <ServerError :error="serverError" />

      <!-- <input type="hidden" name="csrfToken"/> -->
        <!-- <div class="row"> -->
          <!-- {{> form/global-messages messages=content.personalDetailsForm.messages}} -->
          <!-- {{> form/global-errors errors=content.personalDetailsForm.errors}} -->
        <!-- </div> -->

        <!-- <div class="row"> -->
          <!-- <div class="col-sm-12"> -->
            <!-- <ChooseTitle  /> -->
            <!-- {{> form/choose-title containerClass="form-sections" -->
            <!-- selectId="personal-details-title-select" -->
            <!-- selectName="title" -->
            <!-- options=content.personalDetailsFormSettings.title}} -->
          <!-- </div> -->
        <!-- </div> -->

        <div class="row">
          <div class="col-sm-6">
            <div class="form-sections">
              <span class="form-labels">
                {{ $t('firstName') }}*
              </span>
              <br>

              <input  v-model.trim.lazy="$v.firstName.$model"
                      autocomplete="fname"
                      type="text"
                      class="form-inputs"/>
            </div>

            <div class="form-sections">
              <span class="form-labels">
                {{ $t('email') }}*
              </span>
              <br>

              <input  v-model.trim.lazy="$v.email.$model"
                      autocomplete="email"
                      type="email"
                      class="form-inputs"/>
              <br>
              <span class="form-notes"></span>
            </div>
          </div>

          <div class="col-sm-6">
            <div class="form-sections">
              <span class="form-labels">
                {{ $t('lastName') }}*
              </span>
              <br>

              <input  v-model.trim.lazy="$v.lastName.$model"
                      autocomplete="lname"
                      type="text"
                      class="form-inputs"/>
            </div>
          </div>
        </div>

      <hr class="light-grey-hr">

>>>>>>> Implement dummy profile edit form component
      <!-- <div class="personal-details-newsletter"> -->
        <!-- <span> -->
          <!-- <input name="subscribeToNewsletter" -->
                  <!-- type="checkbox" -->
                  <!-- {{#if personalDetails.personalDetailsForm.subscribeToNewsletter}}checked{{/if}}/> -->
          <!-- {{ $t('personalDetailsForm.subscribeToNewsletter') }} -->
        <!-- </span> -->
      <!-- </div> -->
<<<<<<< HEAD
=======

>>>>>>> Implement dummy profile edit form component
      <div class="personal-details-edit-btn">
        <span>
          <button :disabled="loading"
                  type="submit"
<<<<<<< HEAD
                  class="update-btn"
                  data-test="edit-form-submit">
=======
                  class="update-btn">
>>>>>>> Implement dummy profile edit form component
            <span v-if="loading">
              {{ $t('main.messages.pleaseWait') }}
            </span>
            <span v-else>
              {{ $t('updateBtn') }}
            </span>
          </button>
<<<<<<< HEAD
=======

>>>>>>> Implement dummy profile edit form component
          <button @click="$emit('close')"
                  type="button"
                  class="cancel-btn personal-details-edit-hide-btn">
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
<<<<<<< HEAD
import { mapGetters } from 'vuex';
=======
>>>>>>> Implement dummy profile edit form component

export default {
  components: { ServerError },

  data: () => ({
    firstName: null,
    lastName: null,
    email: null,
    loading: false,
    serverError: null,
  }),

<<<<<<< HEAD
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

=======
>>>>>>> Implement dummy profile edit form component
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
<<<<<<< HEAD
=======

  methods: {
    edit() {
      console.log('Edit form method');
    },
  },
>>>>>>> Implement dummy profile edit form component
};
</script>

<!-- eslint-disable -->
<i18n>
{
  "en": {
    "title": "Your Personal Details",
    "updateBtn": "Update Details",
    "cancelBtn": "Cancel",
    "title": "Title",
    "firstName": "First Name",
    "lastName": "Last Name",
    "phone": "Telephone Number",
    "email": "Email Address",
    "password": "Password",
    "confirmPassword": "Confirm Password",
    "subscribeToNewsletter": "Please add me to the Sunrise Newsletter"
  },
  "de": {
    "title": "Ihre Benutzerdaten",
    "updateBtn": "Details aktualisieren",
    "cancelBtn": "Abbrechen",
    "title": "Title",
<<<<<<< HEAD
    "firstName": "Vorname",
    "lastName": "Nachname",
    "phone": "Telefonnummer",
    "email": "Email Adresse",
    "password": "Passwort",
    "confirmPassword": "Passwort bestätigen",
    "subscribeToNewsletter": "Ich möchte den Sunrise Newsletter erhalten."
=======
    "firstName": "First Name",
    "lastName": "Last Name",
    "phone": "Telephone Number",
    "email": "Email Address",
    "password": "Password",
    "confirmPassword": "Confirm Password",
    "subscribeToNewsletter": "Please add me to the Sunrise Newsletter"
>>>>>>> Implement dummy profile edit form component
  }
}
</i18n>
