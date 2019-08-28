<template>
  <picture>
    <source :srcset="src" media="(min-width: 1200px)">
    <source :srcset="src" media="(min-width: 768px)">
    <img :src="src" class="img-responsive">
  </picture>
</template>

<script>
export default {
  props: ['file'],

  computed: {
    src() {
      try {
        // eslint-disable-next-line import/no-dynamic-require, global-require
        return require(`@/assets/img/banners/${this.$store.state.locale}/${this.file}`);
      } catch (e) {
        // eslint-disable-next-line import/no-dynamic-require, global-require
        return require(`@/assets/img/banners/${this.file}`);
      }
    },
  },
};
</script>
