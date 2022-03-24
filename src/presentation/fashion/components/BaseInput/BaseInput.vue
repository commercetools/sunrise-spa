<style lang="scss" src="./style.scss" scoped></style>
<script src="./BaseInput.js"></script>

<template>
  <BaseLabel
    :vuelidate="vuelidate"
    :label="label"
    :customErrors="customErrors"
  >
    <input
      :value="value"
      :checked="checked"
      @input="updateValue"
      v-bind="$attrs"
      :class="errorClass"
    />
  </BaseLabel>
</template>
