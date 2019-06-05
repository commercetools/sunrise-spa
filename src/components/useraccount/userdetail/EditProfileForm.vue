<template>
  <div v-if="me">
    <div class="personal-details-title">
      <span>{{ $t('title') }}</span>
    </div>
    <div class="personal-details-edit personal-details-edit-show">
      <transition name="fade"
                  mode="out-in">
        <form v-if="showForm"
              @submit.prevent="submit(updateCustomerProfile)"
              id="form-edit-personal-details">
          <ServerError :error="serverError"
                       v-slot="{ graphQLError }">
              {{ getErrorMessage(graphQLError) }}
          </ServerError>
          <div class="row">
            <div class="col-sm-6">
              <div class="form-sections">
                <BaseInput v-model="form.firstName"
                           :vuelidate="$v.form.firstName"
                           :label="$t('firstName')"
                           type="text"
                           autocomplete="fname"
                           class="form-inputs"
                           data-test="edit-profile-form-firstname"/>
              </div>
              <div class="form-sections">
                <BaseInput v-model="form.email"
                           :vuelidate="$v.form.email"
                           :label="$t('email')"
                           type="email"
                           autocomplete="email"
                           class="form-inputs"
                           data-test="edit-profile-form-email"/>
                <br>
                <span class="form-notes"></span>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="form-sections">
                <BaseInput v-model="form.lastName"
                           :vuelidate="$v.form.lastName"
                           :label="$t('lastName')"
                           type="text"
                           autocomplete="lname"
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
              <LoadingButton :buttonState="buttonState"
                             :disabled="formIsClean"
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
        </form>
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
import formMixin from '../../../mixins/formMixin';
import customerMixin from '../../../mixins/customerMixin';
import ServerError from '../../common/ServerError.vue';
import LoadingButton from '../../common/LoadingButton.vue';
import BaseInput from '../../common/BaseInput.vue';

export default {
  components: {
    BaseInput,
    LoadingButton,
    ServerError,
  },

  mixins: [customerMixin, formMixin],

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
      this.showForm = true;
    },

    closeForm() {
      this.showForm = false;
      this.$v.$reset();
    },
  },

  watch: {
    me(value) {
      this.form = { ...value.customer };
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
