<style lang="scss" src="./style.scss" scoped></style>
<script src="./BaseInput.js"></script>

<template>
  <BaseLabel :vuelidate="vuelidate" :label="label" :customErrors="customErrors">
    <input v-model="model" v-bind="$attrs" :class="errorClass" />
  </BaseLabel>
</template>
