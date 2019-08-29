<template>
  <div>
    <select v-model="selected[name]"
            @change="updateSelectedCombi"
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
  },

  methods: {
    updateSelectedCombi() {
      this.$emit('updateCombi', this.findExactSelectedCombi() || this.findFallbackSelectedCombi());
    },

    findExactSelectedCombi() {
      return this.variantCombinations.find(combi => isEqual(combi, this.selected));
    },

    findFallbackSelectedCombi() {
      return this.variantCombinations.find(combi => this.selected[this.name] === combi[this.name]);
    },
  },
};
</script>
