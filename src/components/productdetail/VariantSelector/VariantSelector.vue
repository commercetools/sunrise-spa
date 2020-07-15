<script src="./VariantSelector.js"></script>

<template>
  <div v-if="product">
    <ul class="list-inline"
        data-test="variant-selector-list">
      <li v-for="([name,id,values]) in attributes"
          :key="name">
        <AttributeSelect
          :product="product"
          :values="values"
          :sku="sku"
          :name="name"
          :id="id"
          :selected="selected"
          :variantCombinations="variantCombinations"
        />
      </li>
    </ul>
  </div>

</template>
