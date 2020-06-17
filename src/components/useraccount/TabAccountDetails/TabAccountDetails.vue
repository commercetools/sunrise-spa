<i18n src="./TabAccountDetails.txt"></i18n>
<script src="./TabAccountDetails.js"></script>
<style src="./TabAccountDetails.scss" lang="scss" scope></style>

<template>
  <div v-if="me" class="myaccount-content">
    <h3>{{$t('title')}}</h3>
    <div class="account-details-form">
      <BaseForm :onSubmit="updateCustomerProfile" :vuelidate="$v">
        <div class="row">
          <div class="col-lg-6">
            <div class="single-input-item">
              <label for="first-name" class="required">{{ $t('firstName') }}</label>
              <BaseInput
                v-model="form.firstName"
                :vuelidate="$v.form.firstName"
                type="text"
                id="first-name"
              />
            </div>
          </div>
          <div class="col-lg-6">
            <div class="single-input-item">
              <label for="last-name" class="required">{{ $t('lastName') }}</label>
              <BaseInput
                v-model="form.lastName"
                :vuelidate="$v.form.lastName"
                type="text"
                id="last-name"
              />
            </div>
          </div>
        </div>
        <div class="single-input-item pt-30">
          <label for="email" class="required">{{ $t('email') }}</label>
          <BaseInput v-model="form.email" :vuelidate="$v.form.email" type="email" id="email" />
        </div>
        <div class="single-input-item pt-30">
          <button
            type="submit"
            :disabled="$v.$invalid"
            class="check-btn sqr-btn"
            :class="$v.$invalid ? 'disabled' : ''"
          >{{$t('saveBtn')}}</button>
        </div>
      </BaseForm>
    </div>
  </div>
</template>
