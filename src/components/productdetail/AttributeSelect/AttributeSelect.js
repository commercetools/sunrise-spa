import isEqual from 'lodash.isequal';
import HooverDropdown from '../../common/HoverDropdown/HoverDropdown.vue';

export default {
  components: {
    HooverDropdown,
  },
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
    selectedValue() {
      return this.selected[this.name];
    },
  },
  methods: {
    setSelectedValue(type, value) {
      const sku = this.variantCombinations.find(
        combi => combi[type] === value,
      )?.sku;
      if (sku) this.$router.push({ path: sku });
    },
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
