<style src="./BaseSelect.scss" lang="scss"></style>
<script src="./BaseSelect.js"></script>

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
