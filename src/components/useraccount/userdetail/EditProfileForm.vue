<template>
  <div v-if="me">
    <div class="personal-details-title">
      <span>{{ $t('title') }}</span>
    </div>
    <div class="personal-details-edit personal-details-edit-show">
      <transition name="fade"
                  mode="out-in">
        <BaseForm v-if="showForm"
                  :vuelidate="$v"
                  :onSubmit="updateCustomerProfile"
                  #default="{ error, state }"
                  id="form-edit-personal-details">
          <ServerError :error="error"
                       #default="{ graphQLError }">
            {{ getErrorMessage(graphQLError) }}
          </ServerError>
          <div class="row">
            <div class="col-sm-6">
              <BaseInput v-model="form.firstName"
                         :vuelidate="$v.form.firstName"
                         :label="$t('firstName')"
                         type="text"
                         autocomplete="fname"
                         data-test="edit-profile-form-firstname"/>
            </div>
            <div class="col-sm-6">
              <BaseInput v-model="form.lastName"
                         :vuelidate="$v.form.lastName"
                         :label="$t('lastName')"
                         type="text"
                         autocomplete="lname"
                         data-test="edit-profile-form-lastname"/>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12">
              <BaseInput v-model="form.email"
                         :vuelidate="$v.form.email"
                         :label="$t('email')"
                         type="email"
                         autocomplete="email"
                         data-test="edit-profile-form-email"/>
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
              <LoadingButton :state="state"
                             :disabled="!$v.$anyDirty"
                             @reset="closeForm"
                             type="submit"
                             class="update-btn"
                             data-test="edit-profile-form-submit">
                {{ $t('updateBtn') }}
              </LoadingButton>
              <button @click="closeForm"
                      type="button"
                      class="cancel-btn personal-details-edit-hide-btn"
                      data-test="edit-profile-form-cancel">
                {{ $t('cancelBtn') }}
              </button>
            </span>
          </div>
        </BaseForm>
        <div v-else
             class="personal-details-edit-hide">
          <div class="personal-details-box">
            <div>
              <span data-test="user-profile-name">{{ me.customer.firstName }} {{ me.customer.lastName }}</span>
            </div>
            <div data-test="user-profile-email">{{ me.customer.email }}</div>
            <br>
            <!--{{#if content.customerInfo.subscribed}}-->
            <!--<div>{{ $t('subscribedToNewsletter') }}</div>-->
            <!--{{/if}}-->
            <div class="personal-details-box-edit">
              <button @click="openForm"
                      class="personal-details-edit-show-btn"
                      data-test="edit-profile-form-show">
                <img src="../../../assets/img/edit-1.png" alt="edit icon">
                {{ $t('editBtn') }}
              </button>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';
import gql from 'graphql-tag';
import customerMixin from '../../../mixins/customerMixin';
import ServerError from '../../common/form/ServerError.vue';
import LoadingButton from '../../common/form/LoadingButton.vue';
import BaseInput from '../../common/form/BaseInput.vue';
import BaseForm from '../../common/form/BaseForm.vue';

export default {
  components: {
    BaseForm,
    BaseInput,
    LoadingButton,
    ServerError,
  },

  mixins: [customerMixin],

  data: () => ({
    me: null,
    form: {},
    showForm: false,
  }),

  methods: {
    updateCustomerProfile() {
      return this.updateMyCustomer([
        { changeEmail: { email: this.form.email } },
        { setFirstName: { firstName: this.form.firstName } },
        { setLastName: { lastName: this.form.lastName } },
      ]);
    },

    getErrorMessage({ code, field }) {
      if (code === 'DuplicateField' && field === 'email') {
        return this.$t('duplicatedEmail');
      }
      return this.$t('unknownError');
    },

    openForm() {
      this.form = { ...this.me.customer };
      delete this.form.__typename;
      this.showForm = true;
    },

    closeForm() {
      this.showForm = false;
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
    },
  },

  validations: {
    form: {
      email: { required, email },
      firstName: { required },
      lastName: { required },
    },
  },
};
</script>

<i18n>
en:
  title: "Your Personal Details"
  editBtn: "Edit"
  updateBtn: "Update Details"
  cancelBtn: "Cancel"
  firstName: "First Name"
  lastName: "Last Name"
  email: "Email Address"
  subscribeToNewsletter: "Please add me to the Sunrise Newsletter"
  duplicatedEmail: "A customer with this email already exists"
de:
  title: "Ihre Benutzerdaten"
  editBtn: "Bearbeiten"
  updateBtn: "Details aktualisieren"
  cancelBtn: "Abbrechen"
  firstName: "Vorname"
  lastName: "Nachname"
  email: "Email Adresse"
  subscribeToNewsletter: "Ich möchte den Sunrise Newsletter erhalten."
  duplicatedEmail: "Ein Kunde mit dieser E-Mail existiert bereits"
</i18n>
