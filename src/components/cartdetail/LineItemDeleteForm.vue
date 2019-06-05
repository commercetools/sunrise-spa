<template>
  <button @click="submit(removeLineItem)"
          data-test="cart-line-item-delete"
          class="edit-delete-section">
    <img src="../../assets/img/delete-1.png"
         class="cart-action-icon"
         :alt="$t('delete')">
    <span class="delete-text">{{ $t('delete') }}</span>
  </button>
</template>

<script>
import cartMixin from '../../mixins/cartMixin';
import formMixin from '../../mixins/formMixin';

export default {
  props: {
    lineItemId: {
      type: String,
      required: true,
    },
  },

  mixins: [cartMixin, formMixin],

  methods: {
    removeLineItem() {
      return this.updateMyCart([
        {
          removeLineItem: {
            lineItemId: this.lineItemId,
          },
        },
      ]);
    },
  },

  validations: {},
};
</script>

<i18n>
en:
  delete: "Delete"
de:
  delete: "Löschen"
</i18n>
