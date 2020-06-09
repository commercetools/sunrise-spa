<style src="./style.css" scoped></style>
<script src="./BaseRadio.js"></script>

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
