<i18n src="./LoginForm.txt" lang="yaml"></i18n>
<script src="./LoginForm.js" lang="yaml"></script>

<template>
  <div class="login-register-wrap">
    <h3>{{ t('signIn') }}</h3>
    <div class="login-register-form">
      <BaseForm
        :vuelidate="v"
        :onSubmit="customerSignMeIn"
        #default="{ error }"
      >
        <div class="sin-login-register">
          <BaseInput
            v-model="v.email.$model"
            :vuelidate="v.email"
            :label="t('email')"
            type="email"
            autocomplete="username"
            data-test="login-form-email"
          />
        </div>
        <div class="sin-login-register">
          <BaseInput
            v-model="v.password.$model"
            :vuelidate="v.password"
            :label="t('password')"
            type="password"
            autocomplete="current-password"
            data-test="login-form-password"
          />
        </div>
        <div class="lost-password mb-20">
          <router-link
            :to="{ name: 'forgot-password' }"
            v-if="showResetPassword"
            >{{ t('forgotPassword') }}</router-link
          >
        </div>

        <div class="login-register-btn-remember">
          <div class="login-register-btn">
            <button data-test="login-form-submit">
              {{ t('signIn') }}
            </button>
          </div>
        </div>
        <ServerError
          class="mb-20"
          :error="error"
          v-slot="{ graphQLError }"
          >{{ getErrorMessage(graphQLError) }}</ServerError
        >
      </BaseForm>
    </div>
  </div>
</template>
