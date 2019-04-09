<template>
  <button @click="submit"
          data-test="cart-line-item-delete"
          class="edit-delete-section">
    <img src="../../assets/img/delete-1.png"
         class="cart-action-icon"
         :alt="$t('delete')">
    <span class="delete-text">{{ $t('delete') }}</span>
  </button>
</template>

<script>
export default {
  props: {
    lineItem: {
      type: Object,
      required: true,
    },
  },

  methods: {
    submit() {
      this.$emit('submit', this.lineItem.id);
    },
  },
};
</script>

<i18n>
en:
  delete: "Delete"
de:
  delete: "Löschen"
</i18n>
