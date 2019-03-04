<template>
  <button data-test="add-to-cart-button"
          class="add-to-bag-btn">
    <img class="bag-thumb"
         src="../../assets/img/hand-bag-2-black.png"
         alt="$t('addToCart')">
    {{ $t('addToCart') }}
  </button>
</template>

<script>
export default {
};
</script>

<i18n>
de:
  addToCart: "In den Warenkorb"
en:
  addToCart: "Add to Bag"
</i18n>
