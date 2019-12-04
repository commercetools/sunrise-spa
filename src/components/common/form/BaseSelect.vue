<template>
  <span class="form-field base-select"
        :class="errorClass">
    <BaseLabel :vuelidate="vuelidate"
               :label="label"
               :customErrors="customErrors">
      <SelectBoxIt :options="options"
                   v-model="model"
                   v-bind="$attrs"/>
    </BaseLabel>
  </span>
</template>

<script>
import SelectBoxIt from './SelectBoxIt.vue';
import BaseLabel from './BaseLabel.vue';

export default {
  inheritAttrs: false,

  components: {
    BaseLabel,
    SelectBoxIt,
  },

  props: {
    value: {
      type: [String, Number, Boolean],
      default: null,
    },
    vuelidate: Object,
    options: {
      type: Array,
      required: true,
    },
    label: String,
    customErrors: Object,
  },

  computed: {
    errorClass() {
      return { error: this.vuelidate?.$error };
    },

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

<style lang="scss">
  .form-field.base-select {
    display: inline-block;
    width: 100%;
    position: relative;

    .selectboxit {
      display: block;
    }

    &.error .selectboxit {
      border-color: rgba(206, 65, 65, 0.6) !important;
    }
  }
</style>
