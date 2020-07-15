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
    id: {
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
    selectedValue: {
      get() {
        return this.selected[this.id];
      },
      set(value) {
        const sku = this.variantCombinations.find(
          combi => combi[this.id] === value,
        )?.sku;
        if (sku) this.$router.push({ path: sku });
      },
    },
  },
};
