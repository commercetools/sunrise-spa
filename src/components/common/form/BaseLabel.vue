<template>
  <span>
    <label v-if="label"
           class="field-label">
      <span class="field-label-text"
            data-test="form-label-text">
        {{ label }}
        <span v-if="required"
              :title="$t('required')"
              class="field-required"
              data-test="form-label-required">
          *
        </span>
      </span>
      <slot/>
    </label>
    <slot v-else/>
    <span v-if="vuelidate"
          class="validation-wrapper">
      <ValidationError :vuelidate="vuelidate"
                       :customErrors="customErrors"
                       class="validation-error"/>
    </span>
  </span>
</template>

<script>
import ValidationError from './ValidationError.vue';

export default {
  components: { ValidationError },

  props: {
    vuelidate: {
      type: Object,
    },
    label: {
      type: String,
    },
    customErrors: {
      type: Object,
    },
  },

  computed: {
    required() {
      return this.vuelidate?.$params?.required;
    },
  },
};
</script>

<style scoped>
  label {
    width: 100%;
    padding-top: 15px;
  }

  label .field-label-text {
    text-transform: uppercase;
    font-weight: 400;
  }

  .field-required {
    color: #D54D4D;
    cursor: default;
  }

  .validation-wrapper {
    display: block;
    position: relative;
  }

  .validation-error {
    position: absolute;
    margin-left: 1px;
    z-index: 1000;
    left: 0;
    bottom: -14px;
  }
</style>

<i18n>
en:
  required: "Required field"
de:
  required: "Pflichtfeld"
</i18n>
