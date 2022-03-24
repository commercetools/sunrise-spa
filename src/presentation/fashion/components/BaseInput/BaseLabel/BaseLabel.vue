<style src="./BaseLabel.scss" lang="scss" scoped></style>
<i18n src="./BaseLabel.txt" lang="yaml"></i18n>
<script src="./BaseLabel.js"></script>

<template>
  <span>
    <label v-if="label" class="field-label">
      <span
        class="field-label-text"
        data-test="form-label-text"
      >
        {{ label }}
        <span
          v-if="required"
          :title="t('required')"
          class="field-required"
          data-test="form-label-required"
        >
          *
        </span>
      </span>
      <slot />
    </label>
    <slot v-else />
    <span v-if="vuelidate" class="validation-wrapper">
      <ValidationError
        :vuelidate="vuelidate"
        :customErrors="customErrors"
        class="validation-error"
      />
    </span>
  </span>
</template>
