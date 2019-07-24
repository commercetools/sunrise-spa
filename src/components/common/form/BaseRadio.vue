<template>
  <label class="field-label">
    <input v-bind="$attrs"
           :checked="shouldBeChecked"
           :value="value"
           @change="updateInput"
           type="radio"/>
    <slot/>
  </label>
</template>

<script>
export default {
  inheritAttrs: false,

  props: {
    value: {
      type: String,
    },
    modelValue: {
      default: '',
    },
  },

  model: {
    prop: 'modelValue',
    event: 'change',
  },

  computed: {
    shouldBeChecked() {
      return this.modelValue === this.value;
    },
  },
  methods: {
    updateInput() {
      this.$emit('change', this.value);
    },
  },
};
</script>

<style scoped>
label {
  width: 100%;
  margin: 0;
  padding: 0;
}

input[type=radio] {
  float: left;
  width: auto;
  border: 1px solid #D6D6D6;
  border-radius: 1px;
  padding: 0.5em;
  margin-top: 0.3em;
  margin-right: 10px;
}
</style>
