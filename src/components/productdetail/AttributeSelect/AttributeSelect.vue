<script src="./AttributeSelect.js"></script>
<style lang="scss" src="./AttributeSelect.scss"></style>

<template>
  <div class="pro-details-size">
    <span style="margin-left: 3px">{{ name }}</span>
    <select
      v-model="selectedValue"
      class="select-product-detail"
      :data-test="`attribute-select-${this.name}`"
    >
      <option
        v-for="value in values"
        data-test="attribute-select-option"
        :key="value"
      >
        {{ value }}
      </option>
    </select>
  </div>
</template>
