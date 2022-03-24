<script src="./RemoveDiscountCodeForm.js"></script>

<template>
  <a
    href=""
    class="imgWrap"
    @click.prevent="removeDiscount"
    data-test="remove-discount-button"
  >
    <img
      alt="remove"
      class="deleteImg"
      :src="require('presentation/assets/img/delete-1.png')"
    />
  </a>
</template>
<style lang="scss" scoped>
.deleteImg {
  width: 10px;
}
.imgWrap {
  margin-left: 5px;
}
</style>
