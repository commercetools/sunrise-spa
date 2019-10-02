<template>
  <div>
    <select v-model="selectedValue"
            class="select-product-detail"
            :data-test="`attribute-select-${this.name}`">
      <option v-for="value in distinctValues"
              data-test="attribute-select-option"
              :key="value">
        {{value}}
      </option>
    </select>
  </div>
</template>

<script>
import isEqual from 'lodash.isequal';

export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    values: {
      type: Array,
      required: true,
    },
    variantCombinations: {
      type: Array,
      required: true,
    },
    selected: {
      type: Object,
      required: true,
    },
  },

  computed: {
    distinctValues() {
      return new Set(this.values);
    },

    selectedValue: {
      get() {
        return this.selected[this.name];
      },
      set(value) {
        const selected = { ...this.selected };
        selected[this.name] = value;
        const selectedCombi = this.findExactSelectedCombi(selected) || this.findFallbackSelectedCombi(selected);
        this.$router.push({ path: selectedCombi.sku });
      },
    },
  },

  methods: {
    findExactSelectedCombi(selected) {
      const { sku: selectedSku, ...selectedAttributes } = selected;
      return this.variantCombinations.find((combi) => {
        const { sku: combiSku, ...combiAttributes } = combi;
        return isEqual(combiAttributes, selectedAttributes);
      });
    },

    findFallbackSelectedCombi(selected) {
      return this.variantCombinations.find(combi => selected[this.name] === combi[this.name]);
    },
  },
};
</script>
