<script src="./AttributeSelect.js"></script>

<template>
  <select
    v-model="selectedValue"
    class="select-product-detail"
    :data-test="`attribute-select-${this.name}`">
      <option
        v-for="value in values"
        data-test="attribute-select-option"
        :key="value">
        {{value}}
      </option>
  </select>
</template>
