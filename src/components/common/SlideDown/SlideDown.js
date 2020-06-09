/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
const percentage = (val, total) => val / total;
const range = (from, to, percentage) => {
  if (to > from) {
    return (to - from) * percentage;
  }
  return (from - to) * (1 - percentage);
};

const animate = (callback, time) => {
  let start = 0;
  const animationId = { current: {} };
  return (from, to) => {
    const passed = start ? (Date.now() - start) : 0;
    start = Date.now() - passed;
    if (passed !== 0) {
      const progress = percentage(
        Date.now() - start, time,
      );
      // eslint-disable-next-line no-param-reassign
      from = range(from, to, (1 - progress));
    }
    const recur = (from, to, callback, currentAnimationId) => {
      if (currentAnimationId !== animationId.current) {
        return;// do not continue this animation
      }
      const progress = percentage(
        Date.now() - start, time,
      );
      if (progress <= 1 && progress >= 0) {
        requestAnimationFrame(
          () => {
            callback(range(from, to, progress));
            recur(from, to, callback, currentAnimationId);
          },
        );
      } else {
        start = 0;
        callback(to);
      }
    };
    animationId.current = {};
    return recur(from, to, callback, animationId.current);
  };
};

const createSetStyle = ref => (value) => {
  ref.style.maxHeight = `${value}px`;
  ref.style.position = 'inherit';
  ref.style.overflow = 'hidden';
  ref.style.top = '0px';
};
export default {
  data() {
    return {
      animate: null,
      maxHeight: null,
    };
  },
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
  mounted() {
    this.maxHeight = this.$refs.content.clientHeight;
    const setStyle = createSetStyle(this.$refs.content);
    this.animate = animate(
      setStyle,
      300,
    );
  },
  watch: {
    show() {
      if (this.show) {
        this.animate(0, this.maxHeight);
      } else {
        this.animate(this.maxHeight, 0);
      }
    },
  },
};
