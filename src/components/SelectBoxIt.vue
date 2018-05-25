<template>
  <select id="language-select" class="select location-select">
    <option v-for="option in options" :value="option.id" :key="option.id">{{ option.name }}</option>
  </select>
</template>

<script>
export default {
  name: 'SelectBoxIt',
  props: ['options', 'value'],

  mounted() {
    const vm = this;
    $(this.$el)
      .selectBoxIt()
      .val(this.value)
      .trigger('change')
      // emit event on change.
      .on('change', function emitEvent() {
        vm.$emit('input', this.value);
      });
  },
  watch: {
    value(value) {
      // update value
      $(this.$el).val(value).trigger('change');
    },
  },
};
</script>
