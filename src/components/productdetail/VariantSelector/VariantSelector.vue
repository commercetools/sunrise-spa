<script src="./VariantSelector.js"></script>

<template>
  <div v-if="product && attributeTranslation"
       class="row select-row">
    <ul class="list-inline"
        data-test="variant-selector-list">
      <li v-for="(value, name) in attributes"
          :key="name">
        <AttributeSelect
          :product="product"
          :values="value.values"
          :sku="sku"
          :name="value.name"
          :selected="selected"
          :variantCombinations="variantCombinations"
        />
      </li>
    </ul>
  </div>

</template>
