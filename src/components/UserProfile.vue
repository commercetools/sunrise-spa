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
          <!--<div class="personal-details-edit personal-details-edit-show-->
            <!--{{#if content.personalDetailsForm.errors}}in{{/if}}">-->
              <!--<form id="form-edit-personal-details"-->
                    <!--action="{{@root.meta._links.editMyPersonalDetails.href}}"-->
                    <!--method="POST">-->
                  <!--<input type="hidden" name="csrfToken" value="{{@root.meta.csrfToken}}"/>-->
                  <!--<div class="row">-->
                    <!--{{> form/global-messages messages=content.personalDetailsForm.messages}}-->
                    <!--{{> form/global-errors errors=content.personalDetailsForm.errors}}-->
                  <!--</div>-->
                  <!--<div class="row">-->
                    <!--<div class="col-sm-12">-->
                      <!--{{> form/choose-title containerClass="form-sections"-->
                      <!--selectId="personal-details-title-select"-->
                      <!--selectName="title"-->
                      <!--options=content.personalDetailsFormSettings.title}}-->
                    <!--</div>-->
                  <!--</div>-->
                  <!--<div class="row">-->
                    <!--<div class="col-sm-6">-->
                      <!--<div class="form-sections">-->
                        <!--<span class="form-labels">{{ $t('personalDetailsForm.firstName') }}*</span><br>-->
                        <!--<input class="form-inputs"-->
                               <!--name="firstName"-->
                               <!--value="{{content.personalDetailsForm.firstName}}"-->
                               <!--type="text">-->
                      <!--</div>-->
                      <!--<div class="form-sections">-->
                        <!--<span class="form-labels">{{ $t('personalDetailsForm.email') }}*</span><br>-->
                        <!--<input class="form-inputs"-->
                               <!--name="email"-->
                               <!--value="{{content.personalDetailsForm.email}}"-->
                               <!--type="email"><br>-->
                        <!--<span class="form-notes"></span>-->
                      <!--</div>-->
                    <!--</div>-->
                    <!--<div class="col-sm-6">-->
                      <!--<div class="form-sections">-->
                        <!--<span class="form-labels">{{ $t('personalDetailsForm.lastName') }}*</span><br>-->
                        <!--<input class="form-inputs"-->
                               <!--name="lastName"-->
                               <!--value="{{content.personalDetailsForm.lastName}}"-->
                               <!--type="text">-->
                      <!--</div>-->
                    <!--</div>-->
                  <!--</div>-->
                <!--<hr class="light-grey-hr">-->
                <!--<div class="personal-details-newsletter">-->
                  <!--<span>-->
                    <!--<input name="subscribeToNewsletter"-->
                           <!--type="checkbox"-->
                           <!--{{#if personalDetails.personalDetailsForm.subscribeToNewsletter}}checked{{/if}}/>-->
                    <!--{{ $t('personalDetailsForm.subscribeToNewsletter') }}-->
                  <!--</span>-->
                <!--</div>-->
                <!--<div class="personal-details-edit-btn">-->
                  <!--<span>-->
                    <!--<button type="submit"-->
                            <!--class="update-btn">-->
                      <!--{{ $t('updateBtn') }}-->
                    <!--</button>-->
                    <!--<button type="button"-->
                            <!--class="cancel-btn personal-details-edit-hide-btn">-->
                      <!--{{ $t('cancelBtn') }}-->
                    <!--</button>-->
                  <!--</span>-->
                <!--</div>-->
              <!--</form>-->
          <!--</div>-->
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
