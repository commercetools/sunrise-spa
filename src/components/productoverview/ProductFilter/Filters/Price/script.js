import { debounce } from '../../../../common/shared';

const MIN = 0;
const MAX = 2000;
export default {
  props: ['min', 'max'],
  data: component => ({
    vmin: component.min || MIN,
    vmax: component.max || MAX,
    umin: component.min || MIN,
    umax: component.max || MAX,
  }),
  mounted() {
    const change = debounce((event, ui) => {
      this.vmin = Math.min(...ui.values);
      this.vmax = Math.max(...ui.values);
      this.$emit('pricefilterchanged', { min: this.vmin, max: this.vmax });
    });
    $(this.$refs.slider).slider({
      min: 0,
      max: 2000,
      values: [this.vmin, this.vmax],
      step: 50,
      change,
      slide: (event, ui) => {
        this.umin = Math.min(...ui.values);
        this.umax = Math.max(...ui.values);
      },
    });
  },
  beforeDestroy() {
    $(this.$refs.slider).slider('destroy');
  },
};
