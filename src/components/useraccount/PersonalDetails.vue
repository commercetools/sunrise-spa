<template>
  <div class="col-sm-6">
    <div v-if="me"
         class="personal-details col-sm-12">
      <div class="personal-details-text-one">
        <span>{{ $t('welcomeBack', { name: me.customer.firstName }) }}</span>
      </div>
      <div class="personal-details-text-two">
        {{ $t('welcomeDescription') }}
        <br>
        <span class="customer-number">{{ me.customer.customerNumber }}</span>
      </div>
      <div class="personal-details-title">
        <span>{{ $t('title') }}</span>
        <span v-if="showEditForm"
              class="pull-right required-text personal-details-edit-show">
          {{ $t('main.form.required') }}
        </span>
      </div>
      <transition name="fade"
                  mode="out-in">
        <EditProfileForm v-if="showEditForm"
                        @close="showEditForm = false"/>
        <div v-else
             class="personal-details-edit-hide">
          <div class="personal-details-box">
            <div>
              <span data-test="user-profile-name">{{ me.customer.firstName }} {{ me.customer.lastName}}</span>
            </div>
            <div data-test="user-profile-email">{{ me.customer.email }}</div>
            <br>
            <!--{{#if content.customerInfo.subscribed}}-->
            <!--<div>{{ $t('subscribedToNewsletter') }}</div>-->
            <!--{{/if}}-->
            <div class="personal-details-box-edit">
              <button @click="showEditForm = true"
                      class="personal-details-edit-show-btn"
                      data-test="edit-profile-form-show">
                <img src="../../assets/img/edit-1.png" alt="edit icon">
                {{ $t('main.form.edit') }}
              </button>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>

import gql from 'graphql-tag';
import EditProfileForm from './EditProfileForm.vue';

export default {
  components: { EditProfileForm },
  data: () => ({
    me: null,
    showEditForm: false,
  }),

  apollo: {
    me: {
      query: gql`
        query me {
          me {
            customer {
              id
              email
              firstName
              lastName
              customerNumber
            }
          }
        }`,
      skip: vm => !vm.$store.state.authenticated,
    },
  },
};
</script>

<i18n>
en:
  title: "Your Personal Details"
  welcomeBack: "Welcome back, {name}"
  welcomeDescription: "for an even better customer service please provide your customer number"
  subscribedToNewsletter: "Subscribed to weekly newsletter"
de:
  title: "Ihre Benutzerdaten"
  welcomeBack: "Willkommen zurück, {name}"
  welcomeDescription: "Für einen besseren Kundenservice geben Sie bitte Ihre Kundennummer an."
  subscribedToNewsletter: "Subscribed to weekly newsletter"
</i18n>
