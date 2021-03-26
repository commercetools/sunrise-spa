import { inject } from 'vue-demi';
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
  setup() {
    const onVariantSelect = inject('onVariantSelect',false);
    return {onVariantSelect};
  },
  computed: {
    selectedValue: {
      get() {
        return this.selected[this.id];
      },
      set(value) {
        const sku = this.variantCombinations.find(
          (combi) => combi[this.id] === value,
        )?.sku;
        if (sku) {
          if(this.onVariantSelect){
            this.onVariantSelect(sku);
            return sku;
          }
          this.$router.push({ path: sku })
        }
      },
    },
  },
};
