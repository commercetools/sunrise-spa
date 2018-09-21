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
              <span v-if="showEditForm"
                    class="pull-right required-text personal-details-edit-show">
                {{ $t('main.form.required') }}*
              </span>
          </div>
          <EditProfileForm v-if="showEditForm"
                           @close="showEditForm = false"/>
          <div v-else
               class="personal-details-edit-hide">
            <div class="personal-details-box">
              <div>
                <span data-test="user-profile-name">{{ user.firstName }} {{ user.lastName}}</span>
              </div>
              <div data-test="user-profile-email">{{ user.email }}</div>
              <br>
              <!--{{#if content.customerInfo.subscribed}}-->
              <!--<div>{{ $t('subscribedToNewsletter') }}</div>-->
              <!--{{/if}}-->
              <div class="personal-details-box-edit">
                <button @click="showEditForm = true"
                        class="personal-details-edit-show-btn"
                        data-test="edit-profile-form-show">
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
    "welcomeBack": "Welcome back, {name}",
    "welcomeDescription": "for an even better customer service please provide your customer number",
    "subscribedToNewsletter": "Subscribed to weekly newsletter"
  },
  "de": {
    "title": "Ihre Benutzerdaten",
    "welcomeBack": "Willkommen zurück, {name}",
    "welcomeDescription": "Für einen besseren Kundenservice geben Sie bitte Ihre Kundennummer an.",
    "subscribedToNewsletter": "Subscribed to weekly newsletter"
  }
}
</i18n>
