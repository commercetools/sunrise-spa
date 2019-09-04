<template>
  <div v-if="me">
    <div class="row">
      <div class="change-password col-md-8 col-sm-12">
        <div class="personal-details-title">
          <span>{{ $t('title') }}</span>
        </div>
        <BaseForm :vuelidate="$v"
                  :onSubmit="updateCustomerPassword"
                  #default="{ error, state }"
                  id="form-change-password">
          <ServerError :error="error"
                       #default="{ graphQLError }">
            {{ getErrorMessage(graphQLError) }}
          </ServerError>
          <div class="row">
            <div class="col-sm-6">
              <div class="form-sections">
                <BaseInput v-model="form.currentPassword"
                           :vuelidate="$v.form.currentPassword"
                           :label="$t('currentPassword')"
                           type="password"
                           class="form-inputs"
                           data-test="change-password-form-currentpassword"/>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-6">
              <div class="form-sections">
                <BaseInput v-model="form.newPassword"
                           :vuelidate="$v.form.newPassword"
                           :label="$t('newPassword')"
                           type="password"
                           class="form-inputs"
                           data-test="change-password-form-newpassword"/>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="form-sections">
                <BaseInput v-model="form.newPasswordConfirm"
                           :vuelidate="$v.form.newPasswordConfirm"
                           :label="$t('newPasswordConfirm')"
                           :customErrors="{ sameAsPassword: $t('newPasswordConfirmError') }"
                           type="password"
                           class="form-inputs"
                           data-test="change-password-form-newpasswordconfirm"/>
              </div>
            </div>
          </div>
          <hr class="light-grey-hr">
          <div class="personal-details-edit-btn">
            <span>
              <LoadingButton :state="state"
                             :disabled="!$v.$anyDirty"
                             type="submit"
                             class="update-btn"
                             data-test="edit-profile-form-submit">
                {{ $t('updateBtn') }}
              </LoadingButton>
            </span>
          </div>
        </BaseForm>
      </div>
    </div>
  </div>
</template>

<script>

import { required, sameAs } from 'vuelidate/lib/validators';
import gql from 'graphql-tag';
import customerMixin from '../../../mixins/customerMixin';
import authMixin from '../../../mixins/authMixin';
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

  mixins: [customerMixin, authMixin],

  data: () => ({
    me: null,
    form: {},
  }),

  methods: {
    updateCustomerPassword() {
      return this.updateMyCustomerPassword(this.form.currentPassword, this.form.newPassword)
        .then(() => {
          this.login(this.me.customer.email, this.form.newPassword);
          this.form = {};
          this.$v.$reset();
        });
    },

    getErrorMessage({ code }) {
      if (code === 'InvalidCurrentPassword') {
        return this.$t('invalidPassword');
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
            }
          }
        }`,
      skip: vm => !vm.$store.state.authenticated,
    },
  },

  validations: {
    form: {
      currentPassword: { required },
      newPassword: { required },
      newPasswordConfirm: { sameAsPassword: sameAs('newPassword') },
    },
  },
};
</script>

<i18n>
en:
  title: "Change your password"
  currentPassword: "Current Password"
  newPassword: "New password"
  newPasswordConfirm: "Confirm new password"
  newPasswordConfirmError: "Passwords do not match"
  updateBtn: "Change password"
  invalidPassword: "Invalid current password"
de:
  title: "Passwort ändern"
  currentPassword: "Aktuelles Passwort"
  newPassword: "Neues Passwort"
  newPasswordConfirm: "Neues Passwort bestätigen"
  newPasswordConfirmError: "Passwörter stimmen nicht überein"
  updateBtn: "Passwort ändern"
  invalidPassword: "Ungültiges aktuelles Passwort"
</i18n>
