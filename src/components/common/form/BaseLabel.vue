<template>
  <label class="field-label">
    <slot v-if="checkbox"></slot>
    <span class="text">{{ label }}</span>
    <span v-if="required"
          :title="$t('required')"
          class="field-required"
          data-test="form-label-required">
      *
    </span>
    <slot v-if="!checkbox"></slot>
  </label>
</template>

<script>
export default {
  props: {
    vuelidate: {
      type: Object,
    },
    label: {
      type: String,
      required: true,
    },
    type: {
      type: String,
    },
  },

  computed: {
    required() {
      return this.vuelidate?.$params?.required;
    },

    checkbox() {
      return this.type === 'checkbox';
    },
  },
};
</script>

<style scoped>
label {
  width: 100%;
  padding-top: 15px;
  position: relative;
}

label .text {
  text-transform: uppercase;
  font-weight: 400;
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
