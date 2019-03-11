<template>
  <span>
    {{ formattedDate }}
  </span>
</template>

<script>
export default {
  props: {
    dateObj: {
      type: Object,
      required: true,
    },
  },

  computed: {
    formattedDate() {
      return this.$d(new Date(this.dateObj.date), this.dateObj.format, this.$store.state.country);
    },
  },
};
</script>
