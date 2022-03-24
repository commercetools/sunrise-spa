<script src="./VariantSelector.js"></script>
<i18n src="./VariantSelector.txt" lang="yaml"></i18n>

<template>
  <div>
    <ul
      class="list-inline"
      data-test="variant-selector-list"
    >
      <li
        v-for="[label, variants] in variants"
        :key="label"
      >
        <div class="pro-details-size">
          <span style="margin-left: 3px">{{
            t(label)
          }}</span>
          <select
            v-on:change="changeAndSet(label, $event)"
            class="select-product-detail"
            :data-test="`attribute-select-${label}`"
          >
            <option
              v-for="variant in variants"
              :key="variant"
              :value="variant"
              :selected="isSelected(label, variant)"
              data-test="attribute-select-option"
            >
              {{ variant }}
            </option>
          </select>
        </div>
      </li>
    </ul>
  </div>
</template>
