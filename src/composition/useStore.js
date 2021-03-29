import { computed } from '@vue/composition-api';

export default (ctx, selector) => {
  return computed(() => selector(ctx.root.$store.state));
};
