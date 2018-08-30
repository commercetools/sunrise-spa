<template>
   <div class="my-account-content">
    <div class="row">
      <div class="col-sm-3">
        <!--{{> myaccount/my-account-sidebar myPersonalDetailsTab=true}}-->
      </div>
      <div id="my-account-desktop-content" class="col-sm-9">
        <div class="personal-details">
          <div class="personal-details-text-one">
            <span>{{ $t('welcomeBack', { name: user.firstName }) }}</span>
          </div>
          <div class="personal-details-text-two">
            {{ $t('welcomeDescription') }}
            <br>
            <span class="customer-number">{{ user.customerNumber }}</span>
          </div>
          <div class="personal-details-title">
              <span>{{ $t('title') }}</span>
              <span class="pull-right required-text personal-details-edit-show">
                {{ $t('main.form.required') }}*
              </span>
          </div>

          <EditProfileForm v-if="showEditForm"
                           @close="showEditForm = false"/>

          <div v-else class="personal-details-edit-hide">
            <div class="personal-details-box">
              <div>
                  {{ user.title }} {{ user.firstName }} {{ user.lastName}}
              </div>
              <div>{{ user.email }}</div>
              <br>
              <!--{{#if content.customerInfo.subscribed}}-->
              <!--<div>{{ $t('subscribedToNewsletter') }}</div>-->
              <!--{{/if}}-->
              <div class="personal-details-box-edit">
                <button @click="showEditForm = true"
                        class="personal-details-edit-show-btn">
                  <img src="../assets/img/edit-1.png" alt="edit icon">
                  {{ $t('main.form.edit') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import EditProfileForm from '@/components/EditProfileForm.vue';

export default {
  name: 'UserProfile',

  components: {
    EditProfileForm,
  },

  data: () => ({
    showEditForm: false,
  }),

  computed: {
    ...mapGetters(['user']),
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
    "welcomeBack": "Welcome back, {name}",
    "welcomeDescription": "for an even better customer service please provide your customer number",
    "subscribedToNewsletter": "Subscribed to weekly newsletter",
    "personalDetailsForm": {
      "title": "Title",
      "firstName": "First Name",
      "lastName": "Last Name",
      "phone": "Telephone Number",
      "email": "Email Address",
      "password": "Password",
      "confirmPassword": "Confirm Password",
      "subscribeToNewsletter": "Please add me to the Sunrise Newsletter"
    }
  },
  "de": {
    "title": "Ihre Benutzerdaten",
    "updateBtn": "Details aktualisieren",
    "cancelBtn": "Abbrechen",
    "welcomeBack": "Willkommen zurück, {name}",
    "welcomeDescription": "Für einen besseren Kundenservice geben Sie bitte Ihre Kundennummer an.",
    "subscribedToNewsletter": "Subscribed to weekly newsletter",
    "personalDetailsForm": {
      "title": "Title",
      "firstName": "First Name",
      "lastName": "Last Name",
      "phone": "Telephone Number",
      "email": "Email Address",
      "password": "Password",
      "confirmPassword": "Confirm Password",
      "subscribeToNewsletter": "Please add me to the Sunrise Newsletter"
    }
  }
}
</i18n>
