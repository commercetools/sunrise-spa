<template>
  <button v-if="cartExists"
          @click="removeLineItem"
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

export default {
  props: {
    lineItemId: {
      type: String,
      required: true,
    },
  },

  mixins: [cartMixin],

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
};
</script>

<i18n>
en:
  delete: "Delete"
de:
  delete: "Löschen"
</i18n>
