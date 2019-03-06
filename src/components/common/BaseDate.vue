<template>
  <span>
    {{ formattedDate }}
  </span>
</template>

<script>
export default {
  props: {
    date: {
      type: String,
      required: true,
    },
  },

  computed: {
    formattedDate() {
      return this.$d(new Date(this.date), 'short', this.$store.state.country);
    },
  },
};
</script>
