<template>
  <span class="form-field">
    <BaseLabel v-if="label"
               :vuelidate="vuelidate"
               :label="label"/>
    <SelectBoxIt :options="options"
                 v-model="model"
                 v-bind="$attrs"
                 :class="{ 'error': vuelidate.$error }"/>
    <ValidationError :vuelidate="vuelidate"
                     :customErrors="customErrors"/>
  </span>
</template>

<script>
import ValidationError from './ValidationError.vue';
import SelectBoxIt from './SelectBoxIt.vue';
import BaseLabel from './BaseLabel.vue';

export default {
  inheritAttrs: false,

  components: {
    BaseLabel,
    SelectBoxIt,
    ValidationError,
  },

  props: {
    value: {
      type: [String, Number, Boolean],
    },
    vuelidate: {
      type: Object,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
    label: {
      type: String,
    },
    customErrors: {
      type: Object,
    },
  },

  computed: {
    model: {
      get() {
        return this.value;
      },
      set(value) {
        this.vuelidate.$touch();
        this.$emit('input', value);
      },
    },
  },
};
</script>

<style scoped>
.error {
  border-color: rgba(206, 65, 65, 0.6);
}
</style>
