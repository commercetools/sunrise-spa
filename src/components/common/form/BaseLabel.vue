<template>
  <label class="field-label">
    <span class="text">{{ label }}</span>
    <span v-if="required"
          :title="$t('required')"
          class="field-required"
          data-test="form-label-required">
      *
    </span>
    <slot></slot>
  </label>
</template>

<script>
export default {
  props: {
    vuelidate: {
      type: Object,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },

  computed: {
    required() {
      return this.vuelidate.$params?.required;
    },
  },
};
</script>

<style scoped>
label {
  width: 100%;
  padding-top: 15px;
}

label .text {
  text-transform: uppercase
}

.field-required {
  color: #D54D4D;
  cursor: default;
}
</style>

<i18n>
en:
  required: "Required field"
de:
  required: "Pflichtfeld"
</i18n>
