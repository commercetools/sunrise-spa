<i18n src="./LineItemDeleteForm.txt"></i18n>
<script src="./LineItemDeleteForm.js"></script>

<template>
  <div class="cart-delete">
    <a
      href="javascript:;"
      v-if="cartExists"
      @click="removeLineItem"
      data-test="cart-line-item-delete"
      class="edit-delete-section"
    >
      <i class="fa fa-trash-o"></i>
    </a>
  </div>
</template>
